import React from "react";

const TooltipNode: React.SFC<{ text: string; tooltip: string }> = ({
  text,
  tooltip
}) => <span title={tooltip}>{text}</span>;

export default TooltipNode;
