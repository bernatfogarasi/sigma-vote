import { useEffect, useState } from "react";

const useLocalStorage = (initial, key) => {
  const [value, setValue] = useState(initial);
  const [first, setFirst] = useState(true);

  useEffect(() => {
    const value = window.localStorage.getItem(key);
    setValue(value ? JSON.parse(value) : initial);
  }, []);

  useEffect(() => {
    if (first) return setFirst(false);
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;
