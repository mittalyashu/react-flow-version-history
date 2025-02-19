import Dexie, { type EntityTable } from "dexie";

import type { IVersion } from "../types";

const db = new Dexie("FlowDB") as Dexie & {
  versions: EntityTable<IVersion, "id">;
};
db.version(3).stores({
  versions: "++id, name, nodes, edges, created_at",
});

export default db;
