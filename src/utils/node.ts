import { IMapNode } from "../models/node";
import { applyFilter } from "./filter";
import { unique } from "./collection";
import { applyQuery } from "./query";

export const nodeNameDelimiter = "$$";

export const getNodeFrom = (
  root: IMapNode,
  allOfSelectedNodeKeys: Array<string[] | null>,
  filters: Array<string | null>,
  query: string | null,
  skipReferenceLevel: number
) => {
  const queriedRoot = applyQuery(root, query);
  const leveledNodes: { [level: number]: IMapNode } = {
    0: applyFilter(queriedRoot, filters[0])
  };

  for (let level = 1; level < allOfSelectedNodeKeys.length; level++) {
    const selectedParentNodeKeys = allOfSelectedNodeKeys[level - 1];
    if (selectedParentNodeKeys === null) {
      break;
    }
    leveledNodes[level] = applyFilter(
      selectAndMergeNodes(
        leveledNodes[level - 1],
        selectedParentNodeKeys,
        level < skipReferenceLevel + 1
      ),
      filters[level]
    );
  }
  return (level: number): IMapNode => leveledNodes[level] || {};
};

const selectAndMergeNodes = (
  node: IMapNode,
  selectedNodeKeys: string[],
  skipReference: boolean
) =>
  mergeNodes(
    selectedNodeKeys
      .filter(key => !!node && !!node[key])
      .map(key => [!skipReference ? key : "", node![key] as IMapNode]),
    selectedNodeKeys.length > 1
  );

export const updateSelectedNodeKeysFrom = (
  selectedNodeKeys: Array<string[] | null>
) => (level: number, nodeKey: string) =>
  selectedNodeKeys.map((old, index) =>
    index < level
      ? old
      : index > level
      ? null
      : (old || []).includes(nodeKey)
      ? (old || []).filter(each => each !== nodeKey)
      : [...(old || []), nodeKey]
  );

export const mergeNodes = (
  parent: [string /* reference */, IMapNode][],
  multiSelected: boolean
): IMapNode => {
  const newNode: IMapNode = {};
  const childKeys = unique(
    parent.map(([_, node]) => node).flatMap(node => Object.keys(node))
  );
  for (const childKey of childKeys) {
    const childNodes: [string, IMapNode][] = parent
      .filter(
        ([, node]) => !!node[childKey] && typeof node[childKey] !== "string"
      )
      .map(([reference, node]) => [reference, node[childKey] as IMapNode]);
    if (childNodes.length > 0) {
      newNode[childKey] = mergeNodes(childNodes, multiSelected);
    }

    const childValues: [string, string][] = parent
      .filter(
        ([, node]) => !!node[childKey] && typeof node[childKey] === "string"
      )
      .map(([reference, node]) => [reference, node[childKey] as string]);

    if (childValues.length === 1) {
      newNode[
        multiSelected ? buildNewKey(childKey, childValues[0][0]) : childKey
      ] = childValues[0][1];
    } else if (childValues.length > 1) {
      childValues.forEach(
        ([reference, childValue]) =>
          (newNode[buildNewKey(childKey, reference)] = childValue)
      );
    }
  }
  return newNode;
};

const buildNewKey = (key: string, reference: string) =>
  !reference ? key : [key, reference].join(nodeNameDelimiter);

export const toggleAllSelectedNodeKeysFrom = (
  selectedNodeKeys: Array<string[] | null>
) => (level: number, model: IMapNode, selected: boolean) =>
  selectedNodeKeys.map((old, index) =>
    index !== level
      ? index < level
        ? old
        : null
      : selected
      ? Object.keys(model)
      : null
  );
