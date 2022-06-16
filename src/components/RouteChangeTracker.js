import { useEffect} from "react";
import { useLocation } from "react-router-dom";

import ReactGA4 from 'react-ga4';
const RouteChangeTracker = () => {
    const location = useLocation();

    useEffect(() => {
        console.log("send GA");
        // ReactGA4.send({hitType: "pageview", path: location.pathname, location: location.pathname, title: location.pathname});
        ReactGA4.send({hitType: "pageview",
            path: location.pathname,
            location: location.pathname,
            title: location.pathname});
    }, [location]);
};

export default RouteChangeTracker;
