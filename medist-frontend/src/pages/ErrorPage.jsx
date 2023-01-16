import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";

function ErrorPage() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }
  return (
    <div className="container mt-36 flex flex-col items-center gap-2 xs:gap-3 md:gap-4">
      <h1 className="font-bold text-4xl xs:text-5xl md:text-6xl text-black">
        404
      </h1>
      <h2 className="font-semibold text-xl xs:text-2xl md:text-3xl text-dark-grey">
        Oops! Page not found.
      </h2>
      <Button className="primary-btn" onClick={handleClick}>
        Go to Home
      </Button>
    </div>
  );
}

export default ErrorPage;
