import React from "react";
import LinkNode from "./LinkNode";
import TooltipNode from "./TooltipNode";

const TerminalNode: React.FC<{ text: string; value: string }> = ({
  text,
  value
}) =>
  /^(http|\/|\.)/i.test(value) ? (
    <LinkNode text={text} link={value} />
  ) : (
    <TooltipNode text={text} tooltip={value} />
  );

export default TerminalNode;
