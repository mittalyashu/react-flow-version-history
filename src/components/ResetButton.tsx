import { initialEdges } from "../edges";
import { initialNodes } from "../nodes";
import db from "../database/versionDb";

export function ResetButton() {
  async function clickHandler() {
    localStorage.removeItem("selectedVersion");

    // get initial version
    const initialVersion = await db.versions.get(1);
    
    if (initialVersion) {
      await db.versions.update(1, { nodes: initialNodes, edges: initialEdges }); 
    } else {
      await db.versions.add({
        id: 1,
        name: "initial",
        nodes: initialNodes,
        edges: initialEdges,
        created_at: new Date().toJSON(),
      });
    }
  };
  
  return (
    <button type="button" onClick={clickHandler} className="px-2 bg-red-200 hover:bg-red-500 rounded-md">Reset</button>
  )
}