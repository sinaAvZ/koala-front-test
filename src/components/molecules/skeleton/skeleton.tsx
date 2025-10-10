import React from "react";

const Skeleton = () => {
  return (
    <div className="animate-pulse bg-gray-100 rounded-lg p-4">
      <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
      <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
    </div>
  );
};

export default Skeleton;
