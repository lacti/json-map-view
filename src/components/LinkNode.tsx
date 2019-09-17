import React from "react";

const LinkNode: React.SFC<{ text: string; link: string }> = ({
  text,
  link
}) => (
  <a href={link} title={link}>
    {text}
  </a>
);

export default LinkNode;
