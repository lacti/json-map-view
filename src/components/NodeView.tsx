import React from "react";
import NonTerminalNode from "./NonTerminalNode";
import TerminalNode from "./TerminalNode";
import { IMapNode } from "../models/node";

const NodeView: React.FC<{
  model: IMapNode;
  selectedNodeKeys: string[] | null;
  onNodeKeyToggled: (nodeKey: string) => void;
}> = ({ model, selectedNodeKeys, onNodeKeyToggled }) => (
  <ul>
    {Object.entries(model)
      .filter(([, nodeValue]) => typeof nodeValue !== "string")
      .sort(compare)
      .map(([nodeKey, nodeValue], index) => (
        <li key={`${index}_${nodeKey}`}>
          <NonTerminalNode
            nodeKey={nodeKey}
            nodeValue={nodeValue as IMapNode}
            selectedNodeKeys={selectedNodeKeys}
            onNodeKeyToggled={onNodeKeyToggled}
          />
        </li>
      ))}
    {Object.entries(model)
      .filter(([, nodeValue]) => typeof nodeValue === "string")
      .sort(compare)
      .map(([nodeKey, nodeValue], index) => (
        <li key={`${nodeKey}_${index}`}>
          <TerminalNode text={nodeKey} value={nodeValue as string} />
        </li>
      ))}
  </ul>
);

type NodeValue = string | IMapNode;
type NodeEntry = [string, NodeValue];
const compare = (a: NodeEntry, b: NodeEntry) =>
  typeof a[1] === "string"
    ? a[0].localeCompare(b[0])
    : count(b[1]) - count(a[1]);

const count = (node: NodeValue) =>
  typeof node === "string" ? node.length : Object.keys(node).length;

export default NodeView;
