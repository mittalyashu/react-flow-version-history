import Dexie, { type EntityTable } from "dexie";

import type { IVersion } from "../types";

const db = new Dexie("FlowDB") as Dexie & {
  versions: EntityTable<IVersion, "id">;
};
db.version(3).stores({
  versions: "++id, name, nodes, edges, created_at",
});

export const saveVersion = async (
  name: string,
  nodes: unknown,
  edges: unknown,
) => {
  await db.versions.add({
    name,
    nodes,
    edges,
    created_at: new Date().toJSON(),
  });
};

export const getVersionById = async (id: number) => {
  return await db.versions.get(id);
};

export default db;
