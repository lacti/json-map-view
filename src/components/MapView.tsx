import copy from "clipboard-copy";
import React from "react";
import {
  ContextMenu,
  ContextMenuTrigger,
  MenuItem,
  SubMenu
} from "react-contextmenu";
import { useDebouncedCallback } from "use-debounce";
import { IMap } from "../models/map";
import {
  getNodeFrom,
  updateSelectedNodeKeysFrom,
  toggleAllSelectedNodeKeysFrom
} from "../utils/node";
import FilterHeader from "./FilterHeader";
import NodeView from "./NodeView";
import { updateFiltersFrom } from "../utils/filter";
import { IViewState } from "../models/state";
import { viewStateStore } from "../utils/state";

const MapView: React.FC<{
  map: IMap;
  viewState: IViewState | null;
  setViewState: (newState: Partial<IViewState>) => void;
}> = ({ map: { headers, body }, viewState, setViewState }) => {
  const useViewState = viewStateStore(viewState, setViewState);
  const newNullArray = () => Array(headers.length).fill(null);
  const [selectedNodeKeys, setSelectedNodeKeys] = useViewState(
    "selectedNodeKeys",
    newNullArray
  );
  const [filters, setFilters] = useViewState("filters", newNullArray);
  const [skipReferenceLevel, setSkipReferenceLevel] = useViewState(
    "skipReferenceLevel",
    () => 0
  );

  const [debouncedFilter] = useDebouncedCallback(
    ({ level, value }: { level: number; value: string }) =>
      setFilters(updateFilters(level, value)),
    100
  );

  const shareUrl = () => {
    copy(window.location.href);
    alert(`URL copied!\n` + window.location.href);
  };

  const getNode = getNodeFrom(
    body,
    selectedNodeKeys,
    filters,
    viewState ? viewState.query : null,
    skipReferenceLevel
  );
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
          setSelectedNodeKeys(toggleSelectedNodeKeys(level, model, selected));
        return (
          <div key={header} className={className}>
            <FilterHeader
              placeholder={header}
              value={filters[level]}
              onKeyUp={event =>
                debouncedFilter({
                  level,
                  value: (event.target as HTMLInputElement).value
                })
              }
            />
            <ContextMenuTrigger id={`ToggleMenu-${header}`}>
              <NodeView
                model={model}
                selectedNodeKeys={selectedNodeKeysOfCurrentLevel}
                onNodeKeyToggled={nodeKey =>
                  setSelectedNodeKeys(toggleSelectedNodeKey(level, nodeKey))
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
              {level === headers.length - 1 && (
                <SubMenu title="Skip Reference Level">
                  {Array(headers.length - 1)
                    .fill(0)
                    .map((_, index) => (
                      <MenuItem
                        key={`skipRefLevel_${index}`}
                        disabled={skipReferenceLevel === index}
                        onClick={() => setSkipReferenceLevel(index)}
                      >
                        {index}
                      </MenuItem>
                    ))}
                </SubMenu>
              )}
            </ContextMenu>
          </div>
        );
      })}
    </div>
  );
};

export default MapView;
