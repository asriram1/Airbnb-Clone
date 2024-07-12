import { useEffect } from "react";

import React from "react";

export default function UseOutsideClick({ ref, handler }) {
  useEffect(() => {
    const handleClickOutside = (ev) => {
      if (ref.current && !ref.current.contains(ev.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
}
