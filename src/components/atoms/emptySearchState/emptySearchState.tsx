import React from "react";

interface EmptySearchStateProps {
  search: string;
}

const EmptySearchState: React.FC<EmptySearchStateProps> = ({ search }) => {
  return (
    <div className="text-center py-8 text-gray-500">
      No coins found matching `{search}``. Try a different search term.
    </div>
  );
};

export default EmptySearchState;
