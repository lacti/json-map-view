import React from "react";

const TooltipNode: React.FC<{ text: string; tooltip: string }> = ({
  text,
  tooltip
}) => (
  <span className="link" title={tooltip}>
    {text}
  </span>
);

export default TooltipNode;
