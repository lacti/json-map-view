import React from "react";
import SelectedButtonNode from "./SelectedButtonNode";
import ButtonNode from "./ButtonNode";
import { IMapNode } from "../models/node";

const NonTerminalNode: React.SFC<{
  nodeKey: string;
  nodeValue: IMapNode;
  selectedNodeKey: string | null;
  onNodeKeySelected: (nodeKey: string) => void;
}> = ({ nodeKey, nodeValue, selectedNodeKey, onNodeKeySelected }) =>
  selectedNodeKey === nodeKey ? (
    <SelectedButtonNode nodeKey={nodeKey} nodeValue={nodeValue} />
  ) : (
    <ButtonNode nodeKey={nodeKey} nodeValue={nodeValue} onNodeKeySelected={onNodeKeySelected} />
  );

export default NonTerminalNode;
