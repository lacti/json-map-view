import React from "react";
import { IMapNode } from "../models/node";

const SelectedButtonNode: React.SFC<{
  nodeKey: string;
  nodeValue: IMapNode;
}> = ({ nodeKey, nodeValue }) => (
  <button className="selected">
    {nodeKey}
    <span className="count">({Object.keys(nodeValue).length})</span>
  </button>
);

export default SelectedButtonNode;
