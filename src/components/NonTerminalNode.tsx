import React from "react";
import SelectedButtonNode from "./SelectedButtonNode";
import ButtonNode from "./ButtonNode";

const NonTerminalNode: React.SFC<{
  nodeKey: string;
  selectedNodeKey: string | null;
  onNodeKeySelected: (nodeKey: string) => void;
}> = ({ nodeKey, selectedNodeKey, onNodeKeySelected }) =>
  selectedNodeKey === nodeKey ? (
    <SelectedButtonNode nodeKey={nodeKey} />
  ) : (
    <ButtonNode nodeKey={nodeKey} onNodeKeySelected={onNodeKeySelected} />
  );

export default NonTerminalNode;
