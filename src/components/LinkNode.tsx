import React from "react";

const LinkNode: React.SFC<{ text: string; link: string }> = ({
  text,
  link
}) => (
  // eslint-disable-next-line
  <a className="link" href={link} title={link} target="_blank">
    {text}
  </a>
);

export default LinkNode;
