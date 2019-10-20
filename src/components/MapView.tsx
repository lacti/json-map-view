import React, { useState } from "react";
import { IMap } from "../models/map";
import { getNodeFrom, updateSelectedNodeKeysFrom } from "../utils/node";
import FilterHeader from "./FilterHeader";
import NodeView from "./NodeView";
import { updateFiltersFrom } from "../utils/filter";

const MapView: React.SFC<{ map: IMap }> = ({ map: { headers, body } }) => {
  const newNullArray = () => Array(headers.length).fill(null);
  const [selectedNodeKeys, setSelectedNodeKeys] = useState<
    Array<string[] | null>
  >(newNullArray());
  const [filters, setFilters] = useState<Array<string | null>>(newNullArray());

  const getNode = getNodeFrom(body, selectedNodeKeys, filters);
  const updateFilters = updateFiltersFrom(filters);
  const toggleSelectedNodeKey = updateSelectedNodeKeysFrom(selectedNodeKeys);
  return (
    <div className="row">
      {headers.map((header, level) => {
        const model = getNode(level);
        return (
          <div key={header} className="column">
            <FilterHeader
              placeholder={header}
              onKeyUp={event =>
                setFilters(
                  updateFilters(level, (event.target as HTMLInputElement).value)
                )
              }
            />
            <NodeView
              model={model}
              selectedNodeKeys={selectedNodeKeys[level]}
              onNodeKeyToggled={nodeKey =>
                setSelectedNodeKeys(toggleSelectedNodeKey(level, nodeKey))
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export default MapView;
