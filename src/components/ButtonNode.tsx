import React from "react";
import { IMapNode } from "../models/node";

const ButtonNode: React.SFC<{
  nodeKey: string;
  nodeValue: IMapNode;
  onNodeKeyToggled: (nodeKey: string) => void;
}> = ({ nodeKey, nodeValue, onNodeKeyToggled }) => (
  <button onClick={() => onNodeKeyToggled(nodeKey)}>
    {nodeKey}
    <span className="count">({Object.keys(nodeValue).length})</span>
  </button>
);

export default ButtonNode;
