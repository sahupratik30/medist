import { useState } from "react";
import Button from "./UI/Button";
import { regexConfig } from "../config/regex-config";
import { errorHandler, showToast } from "../helpers";
import { loginUser } from "../http/http-calls";

const SigninForm = () => {
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  const [isDirty, setIsDirty] = useState({
    email: false,
    password: false,
  });
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });
  const [showPassword, setshowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
                newIsDirty[key] = false;
                newErrors[key] = null;
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

  // function to handle signin
  const _onSignin = async (e) => {
    try {
      if (e) e.preventDefault();

      const newFormFields = { ...formFields };
      const newIsDirty = {
        email: true,
        password: true,
      };

      const isValid = await _validateFormFields({ newFormFields, newIsDirty });

      if (!isValid) return;

      // proceed to signin
      setLoading(true);

      const payload = {
        email: newFormFields["email"],
        password: newFormFields["password"],
      };

      const res = await loginUser(payload);
      console.log(res);
      showToast("Logged in successfully", "success", 2000, "login");
      setLoading(false);
    } catch (error) {
      errorHandler(error);
      setLoading(false);
    }
  };

  const emailInputClasses = errors["email"]
    ? "form-control invalid"
    : "form-control";
  const passwordInputClasses = errors["password"]
    ? "form-control invalid"
    : "form-control";

  return (
    <form className="signin-form" onSubmit={(e) => _onSignin(e)}>
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
          className={`text-dark-grey absolute top-1/2 right-3 -translate-y-1/2 fa-solid ${
            showPassword ? "fa-eye" : "fa-eye-slash"
          } cursor-pointer`}
          onClick={_togglePasswordHandler}
        />
        {errors["password"] && (
          <p className="input-error">{errors["password"]}</p>
        )}
      </div>

      <Button type="submit" disabled={loading} className="primary-btn">
        {loading ? "Sending..." : "Sign In"}
      </Button>
    </form>
  );
};

export default SigninForm;
