import { IMapNode } from "../models/node";

export const applyQuery = (root: IMapNode, fullQuery: string | null) => {
  if (!fullQuery) {
    return root;
  }
  const filterRecursively = (
    keyword: string,
    node: IMapNode,
    level: number,
    parentSelected: boolean
  ) => {
    const filteredNode: IMapNode = {};
    const filteredKeys = Object.keys(node).filter(key =>
      key.toLowerCase().includes(keyword)
    );
    const targetKeys =
      filteredKeys.length > 0 ? filteredKeys : Object.keys(node);
    for (const key of targetKeys) {
      const value = node[key];
      if (key.toLowerCase() === keyword) {
        filteredNode[key] = value;
        continue;
      }

      if (typeof value === "string") {
        if (key.toLowerCase().includes(keyword)) {
          filteredNode[key] = value;
        }
      } else {
        const filteredChild = filterRecursively(
          keyword,
          value,
          level + 1,
          filteredKeys.length > 0
        );
        if (Object.keys(filteredChild).length > 0) {
          filteredNode[key] = filteredChild;
        }
      }
    }
    if (parentSelected && Object.keys(filteredNode).length === 0) {
      return node;
    }
    return filteredNode;
  };
  return fullQuery
    .toLowerCase()
    .split(/\s+/)
    .reduce(
      (intermediate, keyword) =>
        filterRecursively(keyword, intermediate, 0, false),
      root
    );
};
