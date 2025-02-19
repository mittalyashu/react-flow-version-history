import Dexie from "dexie";

const db = new Dexie("FlowDB");
db.version(1).stores({
  versions: "++id, name, nodes, edges, created_at",
});

export const saveVersion = async (
  name: string,
  nodes: unknown,
  edges: unknown,
) => {
  // @ts-expect-error - ???
  await db.versions.add({
    name,
    nodes,
    edges,
    created_at: new Date().toJSON(),
  });
};

export const getVersions = async () => {
  // @ts-expect-error - ???
  return await db.versions.toArray();
};

export const getVersionById = async (id: number) => {
  // @ts-expect-error - ???
  return await db.versions.get(id);
};

export default db;
