import { useEffect, useRef } from "react";

import db from "../database/versionDb";
import { initialNodes } from "../nodes";
import { initialEdges } from "../edges";
import { useSelectedVersionStore } from "../store/useSelectedVersionStore";
import { useVersionsStore } from "../store/useVersionsStore.ts";

export function useInitializeApp() {
  const isLoaded = useRef<boolean>(false);

  const latestVersion = useVersionsStore((state) => state.first);
  const getAll = useVersionsStore((state) => state.getAll);
  const selectVersion = useSelectedVersionStore((state) => state.update);

  async function init() {
    if (isLoaded.current) return;

    await getAll();

    const count = useVersionsStore.getState().count;
    // Seed database
    if (count === 0) {
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

      getAll();

      selectVersion({
        id: 1,
        selectedAt,
        nodes: initialNodes,
        edges: initialEdges,
      });
    } else {
      let versionIdStr: number | undefined = undefined;
      const getSelectedVersion = localStorage.getItem("selectedVersion");
      if (getSelectedVersion) {
        const selectedVersionObject = JSON.parse(getSelectedVersion);
        versionIdStr = Number.parseInt(selectedVersionObject?.versionId, 10);
        console.log("versionIdStr:", versionIdStr);
      }

      if (Number.isNaN(versionIdStr)) {
        if (latestVersion) {
          versionIdStr = latestVersion?.id;
          const selectedAt = new Date().toJSON();
          localStorage.setItem(
            "selectedVersion",
            JSON.stringify({ versionId: versionIdStr, selectedAt }),
          );
        }
      }

      if (versionIdStr) {
        // get version by ID from db
        const data = await db.versions.get(versionIdStr);
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
