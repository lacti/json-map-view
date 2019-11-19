import copy from "clipboard-copy";
import React, { useState } from "react";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import { IMap } from "../models/map";
import {
  getNodeFrom,
  updateSelectedNodeKeysFrom,
  toggleAllSelectedNodeKeysFrom
} from "../utils/node";
import FilterHeader from "./FilterHeader";
import NodeView from "./NodeView";
import { updateFiltersFrom } from "../utils/filter";
import { gotoShareUrl, getStateFromUrl } from "../utils/share";

interface IMapViewState {
  selectedNodeKeys: Array<string[] | null>;
  filters: Array<string | null>;
}

const MapView: React.FC<{ map: IMap }> = ({ map: { headers, body } }) => {
  const newNullArray = () => Array(headers.length).fill(null);
  const stateFromUrl = getStateFromUrl<IMapViewState>();
  console.log(stateFromUrl);
  const [selectedNodeKeys, setSelectedNodeKeys] = useState<
    Array<string[] | null>
  >(stateFromUrl ? stateFromUrl.selectedNodeKeys : newNullArray());
  const [filters, setFilters] = useState<Array<string | null>>(
    stateFromUrl ? stateFromUrl.filters : newNullArray()
  );

  const setSelectedNodeKeysWithState = (
    selectedNodeKeys: IMapViewState["selectedNodeKeys"]
  ) => {
    gotoShareUrl<IMapViewState>({ selectedNodeKeys, filters });
    return setSelectedNodeKeys(selectedNodeKeys);
  };

  const setFiltersWithState = (filters: IMapViewState["filters"]) => {
    gotoShareUrl<IMapViewState>({ selectedNodeKeys, filters });
    return setFilters(filters);
  };

  const shareUrl = () => {
    gotoShareUrl<IMapViewState>({ selectedNodeKeys, filters });
    copy(window.location.href);
    alert(`URL copied!\n` + window.location.href);
  };

  const getNode = getNodeFrom(body, selectedNodeKeys, filters);
  const updateFilters = updateFiltersFrom(filters);
  const toggleSelectedNodeKey = updateSelectedNodeKeysFrom(selectedNodeKeys);
  const toggleSelectedNodeKeys = toggleAllSelectedNodeKeysFrom(
    selectedNodeKeys
  );
  return (
    <div className="row">
      {headers.map((header, level) => {
        const model = getNode(level);
        const selectedNodeKeysOfCurrentLevel = selectedNodeKeys[level];
        const hasSelected =
          selectedNodeKeysOfCurrentLevel !== null &&
          selectedNodeKeysOfCurrentLevel.length > 0;
        const className = hasSelected ? `column selected` : `column`;
        const toggleAll = (selected: boolean) =>
          setSelectedNodeKeysWithState(
            toggleSelectedNodeKeys(level, model, selected)
          );
        return (
          <div key={header} className={className}>
            <FilterHeader
              placeholder={header}
              value={filters[level]}
              onKeyUp={event =>
                setFiltersWithState(
                  updateFilters(level, (event.target as HTMLInputElement).value)
                )
              }
            />
            <ContextMenuTrigger id={`ToggleMenu-${header}`}>
              <NodeView
                model={model}
                selectedNodeKeys={selectedNodeKeysOfCurrentLevel}
                onNodeKeyToggled={nodeKey =>
                  setSelectedNodeKeysWithState(
                    toggleSelectedNodeKey(level, nodeKey)
                  )
                }
              />
            </ContextMenuTrigger>
            <ContextMenu id={`ToggleMenu-${header}`}>
              {level < headers.length - 1 && (
                <React.Fragment>
                  <MenuItem onClick={() => toggleAll(true)}>
                    Select all
                  </MenuItem>
                  <MenuItem onClick={() => toggleAll(false)}>
                    Deselect all
                  </MenuItem>
                </React.Fragment>
              )}
              <MenuItem onClick={shareUrl}>Copy this URL</MenuItem>
            </ContextMenu>
          </div>
        );
      })}
    </div>
  );
};

export default MapView;
