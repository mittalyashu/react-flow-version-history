import { Handle, type NodeProps, Position, useReactFlow } from "@xyflow/react";
import type { DataFlowNode as DataFlowNodeType } from "./types";
import { useState } from "react";
import { PencilIcon } from "lucide-react";

export function DataFlowNode({ data, id }: NodeProps<DataFlowNodeType>) {
  const reactFlow = useReactFlow();
  const [nodeName, setNodeName] = useState(data.nodeName);
    const [editing, setIsEditing] = useState(false);

    function updateLabelHandler() {
      reactFlow.updateNode(id, {
        data: {
          ...data,
          nodeName,
        },
      });
      setIsEditing(false);
    }
  
  return (
    <div className="react-flow__node-default">
      <div className="flex items-center gap-2">
        {data.values.icon ? (
          <img src={data.values.icon} alt="" className="size-4" />
        ) : null}

        <p className="font-medium">{data.nodeName}</p>
      </div>

      <div className="flex items-center">
        <button type="button" onClick={() => setIsEditing(!editing)}>
          <PencilIcon />
        </button>

        {editing ? (
          <div>
            <input
              type="text"
              value={nodeName}
              onChange={(e) => setNodeName(e.target.value)}
            />
            <button type="button" onClick={updateLabelHandler}>
              save
            </button>
          </div>
        ) : null}
      </div>

      <Handle type="target" position={Position.Top} id={id} />
    </div>
  );
}
