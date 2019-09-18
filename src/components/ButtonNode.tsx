import React from "react";
import { IMapNode } from "../models/node";

const ButtonNode: React.SFC<{
  nodeKey: string;
  nodeValue: IMapNode;
  onNodeKeySelected: (nodeKey: string) => void;
}> = ({ nodeKey, nodeValue, onNodeKeySelected }) => (
  <button onClick={() => onNodeKeySelected(nodeKey)}>
    {nodeKey}
    <span className="count">({Object.keys(nodeValue).length})</span>
  </button>
);

export default ButtonNode;
