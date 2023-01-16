import Button from "../UI/Button";

const SigninForm = () => {
  return (
    <form className="signin-form">
      <div className="form-control">
        <input type="email" placeholder="E-mail" className="input" />
      </div>
      <div className="form-control">
        <input type="password" placeholder="Password" className="input" />
      </div>
      <div className="flex gap-2">
        <input type="checkbox" id="remember" className="accent-primary" />
        <label
          htmlFor="remember"
          className="cursor-pointer text-sm xs:text-base"
        >
          Remember Me
        </label>
      </div>
      <Button type="submit" className="primary-btn">
        Sign In
      </Button>
    </form>
  );
};

export default SigninForm;
