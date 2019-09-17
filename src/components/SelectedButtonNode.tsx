import React from "react";

const SelectedButtonNode: React.SFC<{ nodeKey: string }> = ({ nodeKey }) => (
  <button className="selected">{nodeKey}</button>
);

export default SelectedButtonNode;
