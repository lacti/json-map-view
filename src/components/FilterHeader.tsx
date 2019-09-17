import React from "react";

const FilterHeader: React.SFC<{
  placeholder?: string;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}> = ({ placeholder, onKeyUp }) => (
  <input type="text" onKeyUp={onKeyUp} placeholder={placeholder} />
);

export default FilterHeader;
