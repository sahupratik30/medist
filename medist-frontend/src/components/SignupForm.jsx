import { useState } from "react";
import Button from "./UI/Button";
import { regexConfig } from "./../config/regex-config";
import { errorHandler, showToast } from "../helpers";
import { registerUser } from "../http/http-calls";
import { useNavigate } from "react-router";

const SignupForm = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isDirty, setIsDirty] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
  });
  const [showPassword, setshowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const _togglePasswordHandler = () => {
    setshowPassword((prevState) => !prevState);
  };

  // function to validate form fields
  const _validateFormFields = ({ newFormFields, newIsDirty }) => {
    return new Promise((resolve) => {
      let isFormValid = true;
      const newErrors = { ...errors };

      Object.keys(newFormFields).forEach((key) => {
        if (newIsDirty[key]) {
          switch (key) {
            case "name":
              if (newFormFields[key].length) {
                if (
                  regexConfig.name.test(
                    String(newFormFields[key]).toLowerCase()
                  )
                ) {
                  newIsDirty[key] = false;
                  newErrors[key] = null;
                } else {
                  newErrors[key] =
                    "*Must contain 2-25 characters without digits or special symbols";
                  isFormValid = false;
                }
              } else {
                newErrors[key] = "*Required";
                isFormValid = false;
              }
              break;

            case "email":
              if (newFormFields[key].length) {
                if (
                  regexConfig.email.test(
                    String(newFormFields[key]).toLowerCase()
                  )
                ) {
                  newIsDirty[key] = false;
                  newErrors[key] = null;
                } else {
                  newErrors[key] = "*Please enter a valid email address";
                  isFormValid = false;
                }
              } else {
                newErrors[key] = "*Required";
                isFormValid = false;
              }
              break;

            case "password":
              if (newFormFields[key].length) {
                if (regexConfig.password.test(String(newFormFields[key]))) {
                  newIsDirty[key] = false;
                  newErrors[key] = null;
                } else {
                  newErrors[key] =
                    "*Alteast 8 characters, one uppercase, one lowercase, one digit & one special symbol";
                  isFormValid = false;
                }
              } else {
                newErrors[key] = "*Required";
                isFormValid = false;
              }
              break;

            case "confirmPassword":
              if (newFormFields[key].length) {
                if (newFormFields["password"] === newFormFields[key]) {
                  newIsDirty[key] = false;
                  newErrors[key] = null;
                } else {
                  newErrors[key] = "*Passwords do not match";
                  isFormValid = false;
                }
              } else {
                newErrors[key] = "*Required";
                isFormValid = false;
              }
              break;

            default:
          }
        }
      });

      setErrors((prev) => ({ ...prev, ...newErrors }));
      setIsDirty((prev) => ({ ...prev, ...newIsDirty }));

      resolve(isFormValid);
    });
  };

  // function handle change in form fields
  const _onChangeFormFields = (key, value) => {
    const newFormFields = { ...formFields };

    newFormFields[key] = value;
    setFormFields(newFormFields);
  };

  // function to handle blur in form fields
  const _onBlurFormFields = (key) => {
    const newFormFields = { ...formFields };
    const newIsDirty = { ...isDirty };

    newIsDirty[key] = true;

    _validateFormFields({ newFormFields, newIsDirty });
  };

  // function to handle signup
  const _onSignup = async (e) => {
    try {
      if (e) e.preventDefault();

      const newFormFields = { ...formFields };
      const newIsDirty = {
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
      };

      const isValid = await _validateFormFields({ newFormFields, newIsDirty });

      if (!isValid) return;

      // proceed to signup
      setLoading(true);
      const payload = {
        username: newFormFields["name"],
        email: newFormFields["email"],
        password: newFormFields["password"],
        password2: newFormFields["confirmPassword"],
      };

      const res = await registerUser(payload);
      showToast("Registered Successfully", "success", 2000, "register");
      setLoading(false);
      navigate("/signin");
    } catch (error) {
      errorHandler(error);
      setLoading(false);
    }
  };

  const nameInputClasses = errors["name"]
    ? "form-control invalid"
    : "form-control";
  const emailInputClasses = errors["email"]
    ? "form-control invalid"
    : "form-control";
  const passwordInputClasses = errors["password"]
    ? "form-control invalid"
    : "form-control";
  const confirmPasswordInputClasses = errors["confirmPassword"]
    ? "form-control invalid"
    : "form-control";

  return (
    <form className="signup-form" onSubmit={(e) => _onSignup(e)}>
      <div className={nameInputClasses}>
        <input
          type="text"
          placeholder="Name"
          className="input"
          value={formFields["name"]}
          onChange={(e) => _onChangeFormFields("name", e.target.value)}
          onBlur={() => _onBlurFormFields("name")}
        />
        {errors["name"] && <p className="input-error">{errors["name"]}</p>}
      </div>

      <div className={emailInputClasses}>
        <input
          type="email"
          placeholder="E-mail"
          className="input"
          value={formFields["email"]}
          onChange={(e) => _onChangeFormFields("email", e.target.value)}
          onBlur={() => _onBlurFormFields("email")}
        />
        {errors["email"] && <p className="input-error">{errors["email"]}</p>}
      </div>

      <div className={passwordInputClasses}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="input"
          value={formFields["password"]}
          onChange={(e) => _onChangeFormFields("password", e.target.value)}
          onBlur={() => _onBlurFormFields("password")}
        />
        <i
          className={`fa-solid absolute right-3 top-1/2 -translate-y-1/2 text-dark-grey ${
            showPassword ? "fa-eye" : "fa-eye-slash"
          } cursor-pointer`}
          onClick={_togglePasswordHandler}
        />
        {errors["password"] && (
          <p className="input-error">{errors["password"]}</p>
        )}
      </div>

      <div className={confirmPasswordInputClasses}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          className="input"
          value={formFields["confirmPassword"]}
          onChange={(e) =>
            _onChangeFormFields("confirmPassword", e.target.value)
          }
          onBlur={() => _onBlurFormFields("confirmPassword")}
        />
        <i
          className={`fa-solid absolute right-3 top-1/2 -translate-y-1/2 text-dark-grey ${
            showPassword ? "fa-eye" : "fa-eye-slash"
          } cursor-pointer`}
          onClick={_togglePasswordHandler}
        />
        {errors["confirmPassword"] && (
          <p className="input-error">{errors["confirmPassword"]}</p>
        )}
      </div>

      <Button type="submit" disabled={loading} className="primary-btn">
        {loading ? "Sending..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignupForm;
