import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackVisit } from "../lib/analytics";

function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    trackVisit(location.pathname);
  }, [location.pathname]);

  return null;
}

export default RouteTracker;