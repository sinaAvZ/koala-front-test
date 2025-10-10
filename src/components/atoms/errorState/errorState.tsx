import React from "react";

interface ErrorStateProps {
  title?: string;
}
const ErrorState: React.FC<ErrorStateProps> = ({ title = "Failed to load  data. Please try again later." }) => {
  return <div className="text-center py-8 text-red-500">{title}</div>;
};

export default ErrorState;
