import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Cookie } from "untils";

const interceptRoute = (WrappedComponent: React.FC<{ [x: string]: any }>) => {
  return (props: React.ComponentProps<typeof WrappedComponent>) => {
    const location = useLocation();
    const [renderData, setRenderData] = useState<any>(null);
    useEffect(() => {
      console.log("location", location);

      if (location.pathname !== "/login") {
        setRenderData(navigate());
      } else {
        setRenderData(<WrappedComponent {...props} locationData={location} />);
      }
    }, [location]);
    const navigate = () => {
      if (Cookie.getCookie("token")) {
        return <WrappedComponent {...props} location={location} />;
      } else {
        return <Navigate to={"/login"} replace={true} state={location} />;
      }
    };
    return renderData;
  };
};

export default interceptRoute;
