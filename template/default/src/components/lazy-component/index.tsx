import React, { useEffect, useState, lazy } from "react";
import { Skeleton } from "antd";
import PrefetchLazyComponent from "./PrefetchLazyComponent";
import { useLocation } from "react-router-dom";

interface RouteProps {
  name: string;
  path: string;
  icon: any;
  element: () => Promise<any>;
}

const RouteWithChildrenSubRoutes = (route: RouteProps) => {
  const _path = route?.element;
  const _keyPath = route?.path;
  const [LazyComponent, setLazyComponent] = useState<any>(null);
  const location = useLocation();
  useEffect(() => {
    if (!PrefetchLazyComponent.get(_keyPath)) {
      console.log(PrefetchLazyComponent.get(_keyPath), _keyPath);
      PrefetchLazyComponent.add(_keyPath, React.lazy(_path));
    }
    console.log(PrefetchLazyComponent.get(_keyPath));
    setLazyComponent(PrefetchLazyComponent.get(_keyPath));
  }, [location]);

  return (
    <React.Suspense
      fallback={
        <div>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </div>
      }
    >
      {LazyComponent !== null ? (
        <LazyComponent />
      ) : (
        <div>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </div>
      )}
    </React.Suspense>
  );
};
export default RouteWithChildrenSubRoutes;
