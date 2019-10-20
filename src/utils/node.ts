import { IMapNode } from "../models/node";
import { applyFilterFrom } from "./filter";

export const nodeNameDelimiter = '$$';

export const getNodeFrom = (
  root: IMapNode,
  allOfSelectedNodeKeys: Array<string[] | null>,
  filters: Array<string | null>
) => {
  const applyFilter = applyFilterFrom(filters);
  return (level: number): IMapNode => {
    let node: IMapNode = applyFilter(root, 0);
    for (let i = 0; i < level; i++) {
      const selectedNodeKeys = allOfSelectedNodeKeys[i];
      if (!selectedNodeKeys) {
        return {};
      }
      node = applyFilter(selectAndMergeNodes(node, selectedNodeKeys), i + 1);
      if (!node) {
        return {};
      }
    }
    return node;
  };
};

const selectAndMergeNodes = (node: IMapNode, selectedNodeKeys: string[]) =>
  mergeNodes(selectedNodeKeys
    .filter(key => !!node && !!node[key])
    .map(key => [key, node![key] as IMapNode]),
    selectedNodeKeys.length > 1);

export const updateSelectedNodeKeysFrom = (
  selectedNodeKeys: Array<string[] | null>
) => (level: number, nodeKey: string) =>
    selectedNodeKeys.map((old, index) =>
      index < level ? old : index > level ? null
        : (old || []).includes(nodeKey)
          ? (old || []).filter(each => each !== nodeKey)
          : [...(old || []), nodeKey]
    );

export const mergeNodes = (parent: [string /* reference */, IMapNode][], multiSelected: boolean): IMapNode => {
  const newNode: IMapNode = {};
  const childKeys = unique(parent.map(([_, node]) => node).flatMap(node => Object.keys(node)));
  for (const childKey of childKeys) {
    const childNodes: [string, IMapNode][] = parent
      .filter(([, node]) => !!node[childKey] && typeof node[childKey] !== 'string')
      .map(([reference, node]) => [reference, node[childKey] as IMapNode]);
    if (childNodes.length > 0) {
      newNode[childKey] = mergeNodes(childNodes, multiSelected);
    }

    const childValues: [string, string][] = parent
      .filter(([, node]) => !!node[childKey] && typeof node[childKey] === 'string')
      .map(([reference, node]) => [reference, node[childKey] as string]);

    if (childValues.length === 1) {
      newNode[multiSelected ? buildNewKey(childKey, childValues[0][0]) : childKey] = childValues[0][1];
    }
    else if (childValues.length > 1) {
      childValues.forEach(([reference, childValue]) =>
        newNode[(buildNewKey(childKey, reference))] = childValue
      );
    }
  }
  return newNode;
}

const buildNewKey = (key: string, reference: string) => [key, reference].join(nodeNameDelimiter);

const unique = <T>(values?: T[]) => [...new Set(values || [])];
