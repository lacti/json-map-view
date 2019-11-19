import React from "react";
import { IMapNode } from "../models/node";
import NodeKey from "./NodeKey";

const ButtonNode: React.FC<{
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
      <NodeKey nodeKey={nodeKey} />
      <span className="count">({countOfChildren})</span>
    </button>
  );
};

export default ButtonNode;
