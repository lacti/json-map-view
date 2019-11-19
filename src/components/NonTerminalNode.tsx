import React from "react";
import SelectedButtonNode from "./SelectedButtonNode";
import ButtonNode from "./ButtonNode";
import { IMapNode } from "../models/node";

const NonTerminalNode: React.FC<{
  nodeKey: string;
  nodeValue: IMapNode;
  selectedNodeKeys: string[] | null;
  onNodeKeyToggled: (nodeKey: string) => void;
}> = ({ nodeKey, nodeValue, selectedNodeKeys, onNodeKeyToggled }) =>
  !!selectedNodeKeys && selectedNodeKeys.includes(nodeKey) ? (
    <SelectedButtonNode
      nodeKey={nodeKey}
      nodeValue={nodeValue}
      onNodeKeyToggled={onNodeKeyToggled}
    />
  ) : (
    <ButtonNode
      nodeKey={nodeKey}
      nodeValue={nodeValue}
      onNodeKeyToggled={onNodeKeyToggled}
    />
  );

export default NonTerminalNode;
