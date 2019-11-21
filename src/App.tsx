import React, { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import "./App.css";
import MapView from "./components/MapView";
import { IMap } from "./models/map";
import MapSourceUrl from "./components/MapSourceUrl";
import { getMapUrlFromQueryString } from "./utils/parameter";
import QueryHeader from "./components/QueryHeader";
import { IViewState } from "./models/state";
import { useStateFromUrl } from "./utils/share";
import { viewStateStore } from "./utils/state";

const App: React.FC = () => {
  const [map, setMap] = useState<IMap | null>(null);

  const [viewState, setViewState] = useStateFromUrl<IViewState>();
  const useViewState = viewStateStore(viewState, setViewState);
  const [query, setQuery] = useViewState("query", () => "");
  const [url, setUrl] = useViewState("mapUrl", getMapUrlFromQueryString);

  const [debouncedQuery] = useDebouncedCallback(
    (newQuery: string) => setQuery(newQuery),
    200
  );

  useEffect(() => {
    if (url) {
      fetch(url)
        .then(r => r.json())
        .then(data => setMap(data))
        .catch(error => {
          setMap(null);
          console.error(error);
          alert(error.message);
        });
    }
  }, [url]);
  return (
    <div className="app">
      <MapSourceUrl url={url} setUrl={setUrl} />
      {map && (
        <React.Fragment>
          <QueryHeader
            placeholder="Query"
            value={query}
            onKeyUp={event =>
              debouncedQuery((event.target as HTMLInputElement).value)
            }
          />
          <MapView map={map} {...{ viewState, setViewState }} />
        </React.Fragment>
      )}
    </div>
  );
};

export default App;
