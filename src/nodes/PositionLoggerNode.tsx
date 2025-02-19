import { useState } from "react";
import { Handle, Position, type NodeProps, useReactFlow } from "@xyflow/react";
import { PencilIcon } from "lucide-react";

import type { PositionLoggerNode as PositionLoggerNodeType } from "./types";

export function PositionLoggerNode({
  positionAbsoluteX,
  positionAbsoluteY,
  data,
  id,
}: NodeProps<PositionLoggerNodeType>) {
  const reactFlow = useReactFlow();
  const [label, setLabel] = useState(data.label);
  const [editing, setIsEditing] = useState(false);

  function updateLabelHandler() {
    reactFlow.updateNode(id, {
      data: {
        label,
      },
    });
    setIsEditing(false);
  }

  const x = `${Math.round(positionAbsoluteX)}px`;
  const y = `${Math.round(positionAbsoluteY)}px`;

  return (
    // We add this class to use the same styles as React Flow's default nodes.
    <div className="react-flow__node-default">
      {data.label && <div>{data.label}</div>}

      <div>
        {x} {y}
      </div>

      <div className="flex items-center">
        <button type="button" onClick={() => setIsEditing(!editing)}>
          <PencilIcon />
        </button>

        {editing ? (
          <div>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
            <button type="button" onClick={updateLabelHandler}>
              save
            </button>
          </div>
        ) : null}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
