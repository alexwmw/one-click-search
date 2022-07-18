import { useEffect, useRef } from "react";

const useOutsideClick = (callback) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) callback();
    };

    document.addEventListener("mouseup", handleClick, true);

    return () => {
      document.removeEventListener("mouseup", handleClick, true);
    };
  }, []);

  return ref;
};

export default useOutsideClick;
