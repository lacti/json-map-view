import React from "react";
import { IMapNode } from "../models/node";

const ButtonNode: React.SFC<{
  nodeKey: string;
  nodeValue: IMapNode;
  onNodeKeyToggled: (nodeKey: string) => void;
}> = ({ nodeKey, nodeValue, onNodeKeyToggled }) => {
  const countOfChildren = Object.keys(nodeValue).length;
  return (
    <button
      onClick={() => onNodeKeyToggled(nodeKey)}
      title={`${nodeKey} (${countOfChildren})`}
    >
      {nodeKey}
      <span className="count">({countOfChildren})</span>
    </button>
  );
};

export default ButtonNode;
