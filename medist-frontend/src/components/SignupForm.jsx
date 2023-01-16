import { useState } from "react";
import useFetch from "../hooks/use-fetch";
import useInput from "../hooks/use-input";
import Button from "../UI/Button";

const SignupForm = () => {
  const [showPassword, setshowPassword] = useState(false);
  const { isLoading, error, sendRequest: sendSignupData } = useFetch();
  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    changeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredAge,
    isValid: ageIsValid,
    hasError: ageHasError,
    changeHandler: ageChangeHandler,
    blurHandler: ageBlurHandler,
    reset: resetAge,
  } = useInput(
    (value) => value.trim() !== "" && !isNaN(Number(value)) && Number(value) > 0
  );

  const {
    value: enteredGender,
    isValid: genderIsValid,
    hasError: genderHasError,
    changeHandler: genderChangeHandler,
    blurHandler: genderBlurHandler,
    reset: resetGender,
  } = useInput((value) => value !== "");

  const {
    value: enteredPhoneNumber,
    isValid: phoneNumberIsValid,
    hasError: phoneNumberHasError,
    changeHandler: phoneNumberChangeHandler,
    blurHandler: phoneNumberBlurHandler,
    reset: resetPhoneNumber,
  } = useInput((value) => {
    let regex =
      /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;
    if (value.trim() === "") {
      return false;
    } else if (regex.test(value)) {
      return true;
    } else {
      return false;
    }
  });
  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    changeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => {
    let regex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
    if (value.trim() === "") {
      return false;
    } else if (regex.test(value)) {
      return true;
    } else {
      return false;
    }
  });

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput((value) => {
    let regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (value.trim() === "") {
      return false;
    } else if (regex.test(value)) {
      return true;
    } else {
      return false;
    }
  });

  const formIsValid =
    nameIsValid &&
    ageIsValid &&
    genderIsValid &&
    phoneNumberIsValid &&
    emailIsValid &&
    passwordIsValid;

  const nameInputClasses = nameHasError
    ? "form-control invalid"
    : "form-control";
  const ageInputClasses = ageHasError ? "form-control invalid" : "form-control";
  const genderInputClasses = genderHasError
    ? "form-control invalid"
    : "form-control";
  const phoneNumberInputClasses = phoneNumberHasError
    ? "form-control invalid"
    : "form-control";
  const emailInputClasses = emailHasError
    ? "form-control invalid"
    : "form-control";
  const passwordInputClasses = passwordHasError
    ? "form-control relative invalid"
    : "form-control relative";

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    const formData = {
      fullname: enteredName,
      age: enteredAge,
      gender: enteredGender,
      phonenumber: enteredPhoneNumber,
      email: enteredEmail,
      password: enteredPassword,
    };
    sendSignupData({
      url: "http://127.0.0.1:8000/signup/",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: formData,
    });
    resetName();
    resetAge();
    resetGender();
    resetPhoneNumber();
    resetEmail();
    resetPassword();
  };

  const togglePasswordHandler = () => {
    setshowPassword((prevState) => !prevState);
  };

  return (
    <form className="signup-form" onSubmit={submitHandler}>
      <div className={nameInputClasses}>
        <input
          type="text"
          placeholder="Full Name"
          className="input"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          required
        />
        {nameHasError && <p className="input-error">**Name is required</p>}
      </div>
      <div className="input-wrapper">
        <div className={ageInputClasses}>
          <input
            type="text"
            placeholder="Age"
            value={enteredAge}
            onChange={ageChangeHandler}
            onBlur={ageBlurHandler}
            required
          />
          {ageHasError && <p className="input-error">**Enter a valid age</p>}
        </div>
        <div className={genderInputClasses}>
          <select
            onChange={genderChangeHandler}
            onBlur={genderBlurHandler}
            value={enteredGender}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
          {genderHasError && (
            <p className="input-error">**Please select a gender</p>
          )}
        </div>
      </div>
      <div className={phoneNumberInputClasses}>
        <input
          type="text"
          placeholder="Phone Number"
          className="input"
          onChange={phoneNumberChangeHandler}
          onBlur={phoneNumberBlurHandler}
          value={enteredPhoneNumber}
          required
        />
        {phoneNumberHasError && (
          <p className="input-error">**Enter a valid phone number</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <input
          type="email"
          placeholder="E-mail"
          className="input"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
          required
        />
        {emailHasError && <p className="input-error">**Enter a valid email</p>}
      </div>
      <div className={passwordInputClasses}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="input"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          value={enteredPassword}
          required
        />
        <i
          className={`text-dark-grey absolute top-1/2 right-3 -translate-y-1/2 fa-solid ${
            showPassword ? "fa-eye" : "fa-eye-slash"
          } cursor-pointer`}
          onClick={togglePasswordHandler}
        ></i>
      </div>
      {passwordHasError && (
        <ul className="password-error">
          <li>Should be atleast 8 characters</li>
          <li>Must contain one uppercase character</li>
          <li>Must contain one lowercase character</li>
          <li>Must contain one number</li>
          <li>Must contain a special symbol</li>
        </ul>
      )}
      <Button type="submit" className="primary-btn">
        Sign Up
      </Button>
    </form>
  );
};

export default SignupForm;
