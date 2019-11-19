import { IMapNode } from "../models/node";

export const applyFilterFrom = (filters: Array<string | null>) => (
  node: IMapNode,
  currentLevel: number
): IMapNode => {
  if (!node) {
    return {} as IMapNode;
  }
  for (let level = currentLevel; level >= 0; --level) {
    const condition = filters[level];
    if (!condition) {
      continue;
    }
    const result: IMapNode = {};
    for (const nodeKey of Object.keys(node)) {
      if (includes(node, nodeKey, condition)) {
        result[nodeKey] = node[nodeKey];
      }
    }
    return result;
  }
  return node;
};

const includes = (
  node: IMapNode,
  nodeKey: string,
  condition: string
): boolean => {
  if (nodeKey.toLowerCase().includes(condition.toLowerCase())) {
    return true;
  }
  if (typeof node[nodeKey] !== "string") {
    const childNode = node[nodeKey] as IMapNode;
    for (const childNodeKey of Object.keys(childNode)) {
      if (includes(childNode, childNodeKey, condition)) {
        return true;
      }
    }
  }
  return false;
};

export const updateFiltersFrom = (filters: Array<string | null>) => (
  level: number,
  newValue: string
) => filters.map((old, index) => (index !== level ? old : newValue));
