import { create } from "zustand";
import type { Edge } from "@xyflow/react";

import db from "../database/versionDb";
import type { VersionsStoreType } from "../types";
import type { AppNode } from "../nodes/types";

export const useVersionsStore = create<VersionsStoreType>((set, get) => ({
  versions: [],
  count: 0,
  first: undefined,
  last: undefined,

  add: async (nodes: AppNode[], edges: Edge[]) => {
    const id = await db.versions.add({
      name: "update",
      nodes,
      edges,
      created_at: new Date().toJSON(),
    });

    if (id) {
      const data = await db.versions.get(id);

      const previousVersionsState = get().versions;
      const list = data ? [data, ...previousVersionsState] : [...previousVersionsState];
      set({
        versions: list,
        count: get().count + 1,
        first: data,
        last: list.length > 0 ? list[list.length - 1] : undefined,
      });

      return id;
    }
    return null;
  },

  getAll: async () => {
    const data = await db.versions.orderBy("created_at").reverse().toArray();
    console.log(data);
    set({
      versions: data,
      count: data.length,
      first: data.length > 0 ? data[0] : undefined,
      last: data.length > 0 ? data[data.length - 1] : undefined,
    });
  },
}));
