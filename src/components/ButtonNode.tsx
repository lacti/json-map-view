import React from "react";

const ButtonNode: React.SFC<{
  nodeKey: string;
  onNodeKeySelected: (nodeKey: string) => void;
}> = ({ nodeKey, onNodeKeySelected }) => (
  <button onClick={() => onNodeKeySelected(nodeKey)}>{nodeKey}</button>
);

export default ButtonNode;
