import { IMapNode } from "../models/node";

export const applyFilter = (node: IMapNode, filter: string | null) => {
  if (!filter) {
    return node;
  }
  const effectiveFilter = filter.toLowerCase();
  const filtered: IMapNode = {};
  for (const [key, value] of Object.entries(node)) {
    if (acceptable(key, value, effectiveFilter)) {
      filtered[key] = value;
    }
  }
  return filtered;
};

const acceptable = (key: string, value: string | IMapNode, filter: string) => {
  if (key.toLowerCase().includes(filter)) {
    return true;
  }
  if (typeof value !== "string") {
    return Object.keys(value).some(childKey =>
      childKey.toLowerCase().includes(filter)
    );
  }
  return false;
};

export const updateFiltersFrom = (filters: Array<string | null>) => (
  level: number,
  newValue: string
) => filters.map((old, index) => (index !== level ? old : newValue));
