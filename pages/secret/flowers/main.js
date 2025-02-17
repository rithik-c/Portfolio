import { useEffect } from "react";

export default function Main() {
  useEffect(() => {
    const c = setTimeout(() => {
      document.body.classList.remove("not-loaded");
      clearTimeout(c);
    }, 1000);
  }, []);

  return null; // Since there's no UI, return nothing
}
