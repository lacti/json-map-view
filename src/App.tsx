import React, { useState, useEffect } from "react";
import "./App.css";
import MapView from "./components/MapView";
import { IMap } from "./models/map";
import MapSourceUrl from "./components/MapSourceUrl";
import { getMapUrlFromQueryString } from "./utils/parameter";

const App: React.SFC = () => {
  const [url, setUrl] = useState<string | null>(getMapUrlFromQueryString());
  const [map, setMap] = useState<IMap | null>(null);
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
      {map && <MapView map={map} />}
    </div>
  );
};

export default App;
