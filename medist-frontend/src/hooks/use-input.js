import { useReducer } from "react";

const defaultInputState = {
  value: "",
  isTouched: false,
};
const inputReducer = (state, action) => {
  if (action.type === "INPUT") {
    return {
      value: action.value,
      isTouched: true,
    };
  }
  if (action.type === "BLUR") {
    return {
      value: state.value,
      isTouched: true,
    };
  }
  if (action.type === "RESET") {
    return {
      value: "",
      isTouched: false,
    };
  }
  return defaultInputState;
};

const useInput = (validateInput) => {
  const [inputState, dispatchInput] = useReducer(
    inputReducer,
    defaultInputState
  );
  const isValid = validateInput
    ? validateInput(inputState.value) && inputState.isTouched
    : null;
  const hasError = !isValid && inputState.isTouched;

  const changeHandler = (event) => {
    dispatchInput({ type: "INPUT", value: event.target.value });
  };
  const blurHandler = () => {
    dispatchInput({ type: "BLUR" });
  };

  const reset = () => {
    dispatchInput({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid,
    hasError,
    changeHandler,
    blurHandler,
    reset,
  };
};

export default useInput;
