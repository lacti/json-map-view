import React from "react";

const NodeKey: React.SFC<{
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
          <br />
          <span className="node-text">{nodeKeyText}</span>
        </React.Fragment>
      )
    )}
  </React.Fragment>
);

export default NodeKey;
