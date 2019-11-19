import React from "react";

const FilterHeader: React.FC<{
  placeholder?: string;
  value: string | null;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}> = ({ placeholder, onKeyUp, value }) => (
  <input
    type="text"
    onKeyUp={onKeyUp}
    placeholder={placeholder}
    defaultValue={value || ""}
  />
);

export default FilterHeader;
