import { useState } from "react";
import Button from "./UI/Button";

const SignupForm = () => {
  const [showPassword, setshowPassword] = useState(false);

  const _togglePasswordHandler = () => {
    setshowPassword((prevState) => !prevState);
  };

  const nameInputClasses = false
    ? "form-control invalid"
    : "form-control";
  const emailInputClasses = false
    ? "form-control invalid"
    : "form-control";
  const passwordInputClasses = false
    ? "form-control relative invalid"
    : "form-control relative";

  return (
    <form className="signup-form">
      <div className={nameInputClasses}>
        <input type="text" placeholder="Username" className="input" />
        {/* {nameHasError && <p className="input-error">**Name is required</p>} */}
      </div>

      <div className={emailInputClasses}>
        <input type="email" placeholder="E-mail" className="input" />
        {/* {emailHasError && <p className="input-error">**Enter a valid email</p>} */}
      </div>

      <div className={passwordInputClasses}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="input"
        />
        <i
          className={`text-dark-grey absolute top-1/2 right-3 -translate-y-1/2 fa-solid ${
            showPassword ? "fa-eye" : "fa-eye-slash"
          } cursor-pointer`}
          onClick={_togglePasswordHandler}
        ></i>
      </div>

      {/* {passwordHasError && (
        <ul className="password-error">
          <li>Should be atleast 8 characters</li>
          <li>Must contain one uppercase character</li>
          <li>Must contain one lowercase character</li>
          <li>Must contain one number</li>
          <li>Must contain a special symbol</li>
        </ul>
      )} */}

      <Button type="submit" className="primary-btn">
        Sign Up
      </Button>
    </form>
  );
};

export default SignupForm;
