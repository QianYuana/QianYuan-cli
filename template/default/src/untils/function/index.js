import { lazy, Suspense } from "react";
const superLazy = (url) => {
  return () => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <div>{url}</div>
      </Suspense>
    );
  };
};
