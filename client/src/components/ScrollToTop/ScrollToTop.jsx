

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PreventBack() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only apply on landing page
    if (location.pathname === "/login") {
      // Push current state to history
      window.history.pushState(null, "", window.location.href);

      const handlePopState = () => {
        // Keep user on landing page
        window.history.pushState(null, "", window.location.href);
      };

      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [location]);

  return null;
}
