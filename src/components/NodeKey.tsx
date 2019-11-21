import React from "react";

const NodeKey: React.FC<{
  nodeKey: string;
}> = ({ nodeKey }) => (
  <React.Fragment>
    {nodeKey.split(" ").map((nodeKeyText, index) =>
      index === 0 ? (
        <span key={index} className="node-text">
          {nodeKeyText}
        </span>
      ) : (
        <React.Fragment key={index}>
          <span className="node-text">{nodeKeyText}</span>
        </React.Fragment>
      )
    )}
  </React.Fragment>
);

export default NodeKey;
