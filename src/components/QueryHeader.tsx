import React from "react";

const QueryHeader: React.FC<{
  placeholder?: string;
  value: string | null;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}> = ({ placeholder, onKeyUp, value }) => (
  <div className="query">
    <input
      type="text"
      onKeyUp={onKeyUp}
      placeholder={placeholder}
      defaultValue={value || ""}
    />
  </div>
);

export default QueryHeader;
