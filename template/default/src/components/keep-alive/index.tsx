import React, { useEffect, useState, lazy } from "react";
import { useAppStores } from "appStore";
import KeepAlive from "react-activation";
import { useLocation } from "react-router-dom";
import { LazyComponent } from "components";
import { observer } from "mobx-react";
import { toJS } from "mobx";

interface RouteProps {
  name: string;
  path: string;
  icon: any;
  element: () => Promise<any>;
}

const KeepComponent = observer((props: RouteProps) => {
  const { appStores } = useAppStores();
  const { cacheList } = toJS(appStores);
  const [renderData, setRenderData] = useState<any>(null);
  const location = useLocation();
  const { path } = props;
  useEffect(() => {
    if (cacheList.includes(path)) {
      setRenderData(
        <KeepAlive cacheKey={path} name={path}>
          <LazyComponent {...props}></LazyComponent>
        </KeepAlive>
      );
    } else {
      setRenderData(<LazyComponent {...props}></LazyComponent>);
    }
  }, [location]);

  return renderData;
});
export default KeepComponent;
