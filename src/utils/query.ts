import { IMapNode } from "../models/node";

export const applyQuery = (root: IMapNode, query: string | null) => {
  if (!query) {
    return root;
  }
  const effectiveQuery = query.toLowerCase();
  const filterRecursively = (node: IMapNode, level: number) => {
    const filteredNode: IMapNode = {};
    const filteredKeys = Object.keys(node).filter(key =>
      key.toLowerCase().includes(effectiveQuery)
    );
    const targetKeys =
      filteredKeys.length > 0 ? filteredKeys : Object.keys(node);
    for (const key of targetKeys) {
      const value = node[key];
      if (key.toLowerCase() === effectiveQuery) {
        filteredNode[key] = value;
        continue;
      }

      if (typeof value === "string") {
        if (key.toLowerCase().includes(effectiveQuery)) {
          filteredNode[key] = value;
        }
      } else {
        const filteredChild = filterRecursively(value, level + 1);
        if (Object.keys(filteredChild).length > 0) {
          filteredNode[key] = filteredChild;
        }
      }
    }
    return filteredNode;
  };
  return filterRecursively(root, 0);
};
