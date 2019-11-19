import React from "react";
import { nodeNameDelimiter } from "../utils/node";

const LinkNode: React.FC<{ text: string; link: string }> = ({ text, link }) => (
  // eslint-disable-next-line
  <a className="link" href={link} title={link} target="_blank">
    <span className="text">{name(text)}</span>
    {references(text).map(reference => (
      <span key={reference} className="reference">
        {reference}
      </span>
    ))}
  </a>
);

const name = (text: string) =>
  text.includes(nodeNameDelimiter)
    ? text
        .substring(text.indexOf("]") + 1, text.indexOf(nodeNameDelimiter))
        .trim()
    : text.substring(text.indexOf("]") + 1).trim();
const references = (text: string) =>
  text.includes(nodeNameDelimiter)
    ? text
        .substring(text.indexOf(nodeNameDelimiter) + nodeNameDelimiter.length)
        .split(nodeNameDelimiter)
        .map(e => e.trim())
    : [];

export default LinkNode;
