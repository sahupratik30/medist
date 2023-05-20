import Button from './UI/Button';

const SigninForm = () => {
  return (
    <form className="signin-form">
      <div className="form-control">
        <input type="text" placeholder="Username" className="input" />
      </div>

      <div className="form-control">
        <input type="password" placeholder="Password" className="input" />
      </div>

      <Button type="submit" className="primary-btn">
        Sign In
      </Button>
    </form>
  );
};

export default SigninForm;
