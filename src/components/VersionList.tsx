import { useEffect, useState } from "react";

import { getVersions } from "../store/versionDb";
import type { IVersion } from "../types";

export function VersionList() {
  const [versions, setVersions] = useState<IVersion[]>([]);

  async function getVersionHandler() {
    const data = await getVersions();
    setVersions(data);
  }

  useEffect(() => {
    // fetch versions from db
    getVersionHandler();
  }, []);

  return (
    <select>
      <option>Select version to display</option>

      {versions.map((version) => (
        <option key={version.id}>
          {version.name} ({version.created_at})
        </option>
      ))}
    </select>
  );
}
