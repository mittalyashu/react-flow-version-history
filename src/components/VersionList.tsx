import { useEffect, useState } from "react";

import { getVersions } from "../store/versionDb";
import type { IVersion, IVersionSelected } from "../types";

export function VersionList() {
  const [versions, setVersions] = useState<IVersion[]>([]);
  const [selectedVersion, setSelectedVersion] =
    useState<IVersionSelected | null>(null);

  async function getVersionHandler() {
    const data = await getVersions();
    setVersions(data);
  }

  useEffect(() => {
    const getSelectedVersion = localStorage.getItem("selectedVersion");
    if (getSelectedVersion) {
      setSelectedVersion(JSON.parse(getSelectedVersion));
    }

    // fetch versions from db
    getVersionHandler();
  }, []);

  async function selectHandler(e) {
    localStorage.setItem(
      "selectedVersion",
      JSON.stringify({
        versionId: e.target.value,
        selected_at: new Date().toJSON(),
      }),
    );
  }

  return (
    <select onChange={selectHandler} value={selectedVersion?.versionId}>
      <option>Select version to display</option>

      {versions.map((version) => (
        <option key={version.id} value={version.id}>
          {version.name} ({version.created_at})
        </option>
      ))}
    </select>
  );
}
