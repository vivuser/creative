"use client";
import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  Connection, // Importing Connection type
} from "reactflow";
import "reactflow/dist/style.css";

// --- Custom Node Component with Editable Label ---
interface EditableNodeProps {
  data: {
    label: string;
  };
}

const EditableNode: React.FC<EditableNodeProps> = ({ data }) => {
  const [value, setValue] = useState(data.label || "");
  return (
    <div
      style={{
        padding: 10,
        background: "white",
        border: "1px solid #ddd",
        borderRadius: 5,
        minWidth: 100,
      }}
    >
      <Handle type="target" position={Position.Top} />
      <input
        style={{ width: "100%", border: "none", outline: "none" }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

const nodeTypes = { editableNode: EditableNode };

// --- Initial State ---
const initialNodes = [
  {
    id: "1",
    type: "editableNode",
    data: { label: "Start Node" },
    position: { x: 250, y: 5 },
  },
];

const initialEdges: { id: string; source: string; target: string }[] = [];

export default function FlowPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeCount, setNodeCount] = useState(initialNodes.length + 1);

  const [newLabel, setNewLabel] = useState("");
  const [parentId, setParentId] = useState("1");

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const addNewNode = () => {
    if (!newLabel.trim()) return alert("Please enter a label");

    const newNodeId = `${nodeCount}`;
    const parentNode = nodes.find((n) => n.id === parentId);

    const newNode = {
      id: newNodeId,
      type: "editableNode",
      data: { label: newLabel },
      position: {
        x: (parentNode?.position.x || 0) + Math.random() * 150 - 50,
        y: (parentNode?.position.y || 0) + 150,
      },
    };

    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [
      ...eds,
      { id: `e${parentId}-${newNodeId}`, source: parentId, target: newNodeId },
    ]);
    setNodeCount((count) => count + 1);
    setNewLabel("");
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {/* Node Adding UI */}
      <div
        style={{
          position: "absolute",
          zIndex: 10,
          top: 10,
          left: 10,
          background: "#fff",
          padding: 10,
          border: "1px solid #ccc",
          borderRadius: 5,
        }}
      >
        <input
          type="text"
          placeholder="Node Label"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          style={{ marginRight: 5 }}
        />
        <select
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
          style={{ marginRight: 5 }}
        >
          {nodes.map((n) => (
            <option key={n.id} value={n.id}>
              {n.data.label || n.id}
            </option>
          ))}
        </select>
        <button onClick={addNewNode}>Add Node</button>
      </div>

      {/* React Flow */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
