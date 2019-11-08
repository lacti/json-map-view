import React from "react";
import { IMapNode } from "../models/node";

const SelectedButtonNode: React.SFC<{
  nodeKey: string;
  nodeValue: IMapNode;
  onNodeKeyToggled: (nodeKey: string) => void;
}> = ({ nodeKey, nodeValue, onNodeKeyToggled }) => {
  const countOfChildren = Object.keys(nodeValue).length;
  return (
    <button
      className="selected"
      onClick={() => onNodeKeyToggled(nodeKey)}
      title={`${nodeKey} (${countOfChildren})`}
    >
      {nodeKey}
      <span className="count">({countOfChildren})</span>
    </button>
  );
};

export default SelectedButtonNode;
