import React from "react";
import NonTerminalNode from "./NonTerminalNode";
import TerminalNode from "./TerminalNode";
import { IMapNode } from "../models/node";

const NodeView: React.SFC<{
  model: IMapNode;
  selectedNodeKey: string | null;
  onNodeKeySelected: (nodeKey: string) => void;
}> = ({ model, selectedNodeKey, onNodeKeySelected }) => (
  <ul>
    {Object.entries(model)
      .filter(([, nodeValue]) => typeof nodeValue !== "string")
      .sort((a, b) => Object.keys(b[1]).length - Object.keys(a[1]).length)
      .map(([nodeKey, nodeValue]) => (
        <li key={nodeKey}>
          <NonTerminalNode
            nodeKey={nodeKey}
            nodeValue={nodeValue as IMapNode}
            selectedNodeKey={selectedNodeKey}
            onNodeKeySelected={onNodeKeySelected}
          />
        </li>
      ))}
    {Object.entries(model)
      .filter(([, nodeValue]) => typeof nodeValue === "string")
      .map(([nodeKey, nodeValue]) => (
        <li key={nodeKey}>
          <TerminalNode text={nodeKey} value={nodeValue as string} />
        </li>
      ))}
  </ul>
);

export default NodeView;
