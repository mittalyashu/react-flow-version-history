import { create } from "zustand";

import type { VersionsStoreType } from "../types";
import db from "../database/versionDb";

export const useVersionsStore = create<VersionsStoreType>((set, get) => ({
  versions: [],
  count: 0,
  first: undefined,
  last: undefined,

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
