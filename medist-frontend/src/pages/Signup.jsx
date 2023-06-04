import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import signupImage from "../assets/images/signup.png";
import { SignupForm } from "../components";
import { isUserAuthenticated } from "../guards/auth-guard";

const Signup = () => {
  const navigate = useNavigate();
  const isAuthenticated = isUserAuthenticated();

  // If user is authenticated redirect to home page
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="container mb-4 mt-14 flex  items-center justify-center  md:justify-between">
      <div className="hidden w-1/2 items-center md:flex">
        <img src={signupImage} alt="Two doctors standing" className="w-5/6" />
      </div>

      <div className="flex flex-col items-end md:w-1/2">
        <div>
          <h1 className="mb-2.5 w-full text-center text-2xl font-bold xs:text-3xl sm:text-left md:text-4xl">
            Sign Up
          </h1>

          <p className="mb-6 text-center text-sm text-dark-grey xs:text-base sm:mb-10 sm:text-left">
            Create your account now and start availing our services
          </p>

          <SignupForm />

          <p className="mt-3 text-sm xs:text-base sm:mt-4">
            Already have an account?{" "}
            <Link to="/signin" className="text-primary">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
