import React from "react";

interface EmptyStateProps {
  title?: string;
}
const EmptyState = ({ title = "No  data available at the moment." }: EmptyStateProps) => {
  return <div className="text-center py-8 text-gray-500">{title}</div>;
};

export default EmptyState;
