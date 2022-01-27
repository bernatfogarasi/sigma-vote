import { useState } from "react";
import useMessage from "./useMessage";

const useRequest = (callback) => {
  const [response, setResponse] = useState();
  const [json, setJson] = useState();
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(false);

  const { showMessage, clearMessage } = useMessage();

  const request = async (
    path,
    options = {},
    optionsDefault = { redirect: "follow" }
  ) => {
    console.log("REQUEST", path, options);
    setLoading(true);
    showMessage("Loading...", "loading");
    options = { ...optionsDefault, ...options };
    const response = await fetch(path, options);
    setResponse(response);
    setStatus(response.status);
    if (response.status !== 200) setError(json?.error || true);
    const json = await response.json();
    setJson(json);
    if (callback) callback(json);
    if (json?.message) {
      setMessage(json.message);
      showMessage(json.message, response.status === 200 ? "success" : "error");
    }
    setLoading(false);
    console.log("RESPONSE", path, json);
  };

  const get = (path, options) => request(path, options);

  const post = (
    path,
    body,
    options,
    optionsDefault = {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    }
  ) => request(path, { ...options, ...optionsDefault });

  return { get, post, response, status, json, message, error, loading };
};

export default useRequest;
