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
    <div className="container flex items-center justify-center  md:justify-between mb-4  mt-14">
      <div className="w-1/2 items-center hidden md:flex">
        <img src={signupImage} alt="Two doctors standing" className="w-5/6" />
      </div>

      <div className="md:w-1/2 flex flex-col items-end">
        <div>
          <h1 className="w-full text-center sm:text-left text-2xl xs:text-3xl md:text-4xl font-bold mb-2.5">
            Sign Up
          </h1>

          <p className="text-center sm:text-left text-sm xs:text-base text-dark-grey mb-6 sm:mb-10">
            Create your account now and start availing our services
          </p>

          <SignupForm />

          <p className="text-sm xs:text-base mt-3 sm:mt-4">
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
