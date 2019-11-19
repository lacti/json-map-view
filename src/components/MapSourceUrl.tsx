import React from "react";

const MapSourceUrl: React.FC<{
  url: string | null;
  setUrl: (newUrl: string) => void;
}> = ({ url, setUrl }) => (
  <div className="sourceUrl">
    <input
      type="text"
      defaultValue={url || ""}
      placeholder="Map JSON URL"
      onKeyPress={event =>
        event.key === "Enter"
          ? setUrl((event.target as HTMLInputElement).value)
          : undefined
      }
    />
  </div>
);

export default MapSourceUrl;
