import { useContext } from "react";
import { AppContext } from "contexts";

const useMessage = (delay = 3000) => {
  const { message, setMessage, messageTimeout, setMessageTimeout } =
    useContext(AppContext);

  const clearMessage = () => {
    setMessage(undefined);
  };

  const showMessage = (text, type = "success") => {
    if (messageTimeout?.clearTimeout) messageTimeout.clearTimeout();
    setMessage({ text, type });
    const timeout = setTimeout(() => {
      clearMessage();
    }, delay);
    setMessageTimeout(timeout);
  };

  return { message, showMessage, clearMessage };
};

export default useMessage;
