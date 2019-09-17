import { IMapNode } from "../models/node";
import { applyFilterFrom } from "./filter";

export const getNodeFrom = (
  body: IMapNode,
  selectedNodeKeys: Array<string | null>,
  filters: Array<string | null>
) => {
  const applyFilter = applyFilterFrom(filters);
  return (level: number) => {
    let node: IMapNode | undefined = applyFilter(body, 0);
    for (let i = 0; i < level; i++) {
      const selectedNodeKey = selectedNodeKeys[i];
      if (!node || !selectedNodeKey) {
        return undefined;
      }
      node = applyFilter(node[selectedNodeKey] as IMapNode, i + 1);
    }
    return node;
  };
};

export const updateSelectedNodeKeysFrom = (
  selectedNodeKeys: Array<string | null>
) => (level: number, newKey: string) =>
  selectedNodeKeys.map((old, index) =>
    index < level ? old : index === level ? newKey : null
  );
