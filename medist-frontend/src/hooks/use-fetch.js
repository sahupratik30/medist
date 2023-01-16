import { useState } from "react";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  async function sendRequest(reqConfig, applyData) {
    setIsLoading(true);
    try {
      if (!reqConfig.url) throw new Error("Please provide a url");
      const res = await fetch(reqConfig.url, {
        method: reqConfig.method ? reqConfig.method : "GET",
        headers: reqConfig.headers ? reqConfig.headers : {},
        body: reqConfig.body ? JSON.stringify(reqConfig.body) : null,
      });
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await res.json();
      applyData && applyData(data);
    } catch (error) {
      setError(error.message || "Something went wrong!");
    }
    setIsLoading(false);
  }
  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useFetch;
