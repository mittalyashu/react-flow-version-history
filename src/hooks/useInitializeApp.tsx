import { useEffect, useRef } from "react";

import db from "../database/versionDb";
import { initialNodes } from "../nodes";
import { initialEdges } from "../edges";
import { useSelectedVersionStore } from "../store/useSelectedVersionStore";

export function useInitializeApp() {
  const isLoaded = useRef<boolean>(false);
  const selectVersion = useSelectedVersionStore((state) => state.update);

  async function init() {
    if (isLoaded.current) return;
    const versionsCount = await db.versions.count();

    // Seed database
    if (versionsCount === 0) {
      await db.versions.add({
        id: 1,
        name: "INITIAL",
        nodes: initialNodes,
        edges: initialEdges,
        created_at: new Date().toJSON(),
      });

      const selectedAt = new Date().toJSON();
      localStorage.setItem(
        "selectedVersion",
        JSON.stringify({ versionId: 1, selectedAt }),
      );
      selectVersion({
        id: 1,
        selectedAt,
        nodes: initialNodes,
        edges: initialEdges,
      });
    } else {
      let versionIdStr: string | undefined = undefined;
      const getSelectedVersion = localStorage.getItem("selectedVersion");
      if (getSelectedVersion) {
        const selectedVersionObject = JSON.parse(getSelectedVersion);
        versionIdStr = selectedVersionObject?.versionId;
      } else {
        const latestVersion = await db.versions.orderBy("created_at").last();
        if (latestVersion) {
          versionIdStr = latestVersion.id.toString();
          const selectedAt = new Date().toJSON();
          localStorage.setItem(
            "selectedVersion",
            JSON.stringify({ versionId: versionIdStr, selectedAt }),
          );
        }
      }

      if (versionIdStr) {
        // get version by ID from db
        const data = await db.versions.get(Number.parseInt(versionIdStr, 10));
        if (data) {
          selectVersion({
            id: data.id,
            selectedAt: new Date().toJSON(),
            nodes: data.nodes,
            edges: data.edges,
          });
        }
      }
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    init();
    isLoaded.current = true;
  }, []);
}
