import React, { useEffect, useState, lazy } from "react";
import PrefetchLazyComponent from "./PrefetchLazyComponent";

interface RouteProps {
  name: string;
  path: string;
  icon: any;
  element: () => Promise<any>;
}

const RouteWithChildrenSubRoutes = (route: RouteProps) => {
  const _path = route?.element;
  const _keyPath = route?.path;
  if (!PrefetchLazyComponent.get(_keyPath)) {
    PrefetchLazyComponent.add(_keyPath, React.lazy(_path));
  }
  const LazyComponent = PrefetchLazyComponent.get(_keyPath);

  return (
    <React.Suspense fallback={<div>拼命加载中...</div>}>
      <LazyComponent />
    </React.Suspense>
  );
};
export default RouteWithChildrenSubRoutes;
