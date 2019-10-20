import React from "react";
import { nodeNameDelimiter } from "../utils/node";

const LinkNode: React.SFC<{ text: string; link: string }> = ({
  text,
  link
}) => (
    // eslint-disable-next-line
    <a className="link" href={link} title={link} target="_blank">
      {references(text).map(reference => <span key={reference} className="reference">{reference}</span>)}
      <span className="prefix">{prefix(text)}</span>
      <span className="text">{name(text)}</span>
    </a>
  );

const prefix = (text: string) =>
  text.substring(text.indexOf('[') + 1, text.indexOf(']')).trim();
const name = (text: string) =>
  text.includes(nodeNameDelimiter)
    ? text.substring(text.indexOf(']') + 1, text.indexOf(nodeNameDelimiter)).trim()
    : text.substring(text.indexOf(']') + 1).trim();
const references = (text: string) =>
  text.includes(nodeNameDelimiter)
    ? text.substring(text.indexOf(nodeNameDelimiter) + nodeNameDelimiter.length).split(nodeNameDelimiter).map(e => e.trim())
    : [];

export default LinkNode;
