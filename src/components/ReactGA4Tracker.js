import { useEffect} from "react";
import { useLocation } from "react-router-dom";

import ReactGA4 from 'react-ga4';
export const RouteChangeTracker = () => {
    const location = useLocation();

    useEffect(() => {
        console.log("send GA");
        console.log(location);
        ReactGA4.send({hitType: "pageview",
            path: window.location.pathname,
            location: window.location.href,
            title: location.pathname});
    }, [location]);
};

export const OnclickTracker = (category, label)  => {
    console.log("send onclick GA" + category  + " " + label + " " + window.location.pathname);
    // ReactGA4.send({
    //     hitType: "event",
    //     path: "event-"+label,
    //     location: window.location.href,
    //     title: label
    // });

    ReactGA4.send({
        hitType: "pageview",
        path: window.location.href,
        location: category,
        title: "onclick:" +label + " " +window.location.pathname
    });

    // ReactGA4.event({
    //     category: category,
    //     action: "onclick",
    //     label: label, // optional
    //     value: 99, // optional, must be a number
    //     // nonInteraction: true, // optional, true/false
    //     transport: "xhr", // optional, beacon/xhr/image
    // });
};

export const getCookie = (c_name)  => {
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name)
        {
            return unescape(y);
        }
    }
}


