import { IMapNode } from "../models/node";

export const applyFilterFrom = (filters: Array<string | null>) => (
  node: IMapNode,
  level: number
) => {
  if (!node) {
    return node;
  }
  const condition = filters[level];
  if (!condition) {
    return node;
  }
  const result: IMapNode = {};
  for (const nodeKey of Object.keys(node)) {
    if (nodeKey.includes(condition)) {
      result[nodeKey] = node[nodeKey];
    }
  }
  return result;
};

export const updateFiltersFrom = (filters: Array<string | null>) => (
  level: number,
  newValue: string
) => filters.map((old, index) => (index !== level ? old : newValue));