import { useEffect } from "react";

const useOutsideClick = (ref: React.RefObject<any>, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | KeyboardEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setTimeout(() => {
          callback();
        }, 225);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleClickOutside);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
