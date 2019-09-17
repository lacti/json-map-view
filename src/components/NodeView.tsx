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
    {Object.keys(model).map(nodeKey => (
      <li key={nodeKey}>
        {typeof model[nodeKey] === "string" ? (
          <TerminalNode text={nodeKey} value={model[nodeKey] as string} />
        ) : (
          <NonTerminalNode
            nodeKey={nodeKey}
            selectedNodeKey={selectedNodeKey}
            onNodeKeySelected={onNodeKeySelected}
          />
        )}
      </li>
    ))}
  </ul>
);

export default NodeView;
