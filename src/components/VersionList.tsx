import db from "../database/versionDb";
import { useVersionsStore } from "../store/useVersionsStore";
import { useSelectedVersionStore } from "../store/useSelectedVersionStore";

export function VersionList() {
  const versions = useVersionsStore((state) => state.versions);
  const selectedVersionId = useSelectedVersionStore((state) => state.id);

  // @ts-expect-error - ???
  async function selectHandler(e) {
    const versionId = Number.parseInt(e.target.value || "", 10);
    const data = await db.versions.get(versionId);
    if (data) {
      const selectedAt = new Date().toJSON();
      useSelectedVersionStore.getState().update({
        id: data.id,
        selectedAt,
        nodes: data.nodes,
        edges: data.edges,
      });

      localStorage.setItem(
        "selectedVersion",
        JSON.stringify({
          versionId,
          selectedAt,
        }),
      );
    }
  }

  return (
    <select onChange={selectHandler} value={selectedVersionId || ""}>
      <option>Select version to display</option>

      {versions.map((version) => (
        <option key={version.id} value={version.id}>
          {version.name} ({version.created_at})
        </option>
      ))}
    </select>
  );
}
