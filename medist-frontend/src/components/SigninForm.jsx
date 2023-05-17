import { setToken, setUserName } from "../services/localStorageService";
import useFetch from "../hooks/use-fetch";
import useInput from "../hooks/use-input";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../store/auth-slice";

const SigninForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, sendRequest: sendSigninData } = useFetch();
  const {
    value: enteredUserName,
    changeHandler: userChangeHandler,
    reset: resetUserName,
  } = useInput();
  const {
    value: enteredPassword,
    changeHandler: passwordChangeHandler,
    reset: resetPassword,
  } = useInput();

  function handleSignin(e) {
    e.preventDefault();
    const formData = {
      username: enteredUserName,
      password: enteredPassword,
    };
    sendSigninData(
      {
        url: "http://127.0.0.1:8000/login/",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: formData,
      },
      getSigninResponse
    );
    resetUserName();
    resetPassword();
  }
  function getSigninResponse(data) {
    console.log(data);
    setToken(data);
    setUserName(data);
    dispatch(setAccessToken(data.access));
    navigate("/");
  }
  return (
    <form className="signin-form">
      <div className="form-control">
        <input
          type="text"
          placeholder="Username"
          className="input"
          onChange={userChangeHandler}
          value={enteredUserName}
          required
        />
      </div>

      <div className="form-control">
        <input
          type="password"
          placeholder="Password"
          className="input"
          onChange={passwordChangeHandler}
          value={enteredPassword}
          required
        />
      </div>

      <Button type="submit" className="primary-btn" onClick={handleSignin}>
        Sign In
      </Button>
    </form>
  );
};

export default SigninForm;
