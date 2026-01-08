import React, { useState } from "react";

const EventVisualDemo = () => {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [msg, ...prev]);
  };

  // Event Capturing (Parent ➜ Child)
  const handleCapture = () => {
    addLog("📌 Capturing phase (UL ➜ LI)");
  };

  // Event Bubbling + Delegation (Child ➜ Parent)
  const handleBubbling = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = (e.target as HTMLElement).tagName;
    addLog(`🌊 Bubbling / Delegation phase (target: ${target})`);
  };

  // Individual LI click
  const handleLiClick = (item: string, e: React.MouseEvent) => {
    addLog(`🔹 LI clicked: ${item}`);
    // e.stopPropagation(); // uncomment to block bubbling
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>React Event Phases Visual Demo</h2>
      <ul
        onClickCapture={handleCapture} // Capturing
        onClick={handleBubbling}       // Bubbling / Delegation
        style={{
          border: "2px solid black",
          padding: "20px",
          listStyle: "none",
          width: "200px",
          cursor: "pointer",
        }}
      >
        <li
          onClick={(e) => handleLiClick("Item 1", e)}
          style={{ padding: "10px", margin: "5px", border: "1px solid gray" }}
        >
          Item 1
        </li>
        <li
          onClick={(e) => handleLiClick("Item 2", e)}
          style={{ padding: "10px", margin: "5px", border: "1px solid gray" }}
        >
          Item 2
        </li>
        <li
          onClick={(e) => handleLiClick("Item 3", e)}
          style={{ padding: "10px", margin: "5px", border: "1px solid gray" }}
        >
          Item 3
        </li>
      </ul>

      <h3>Event Logs:</h3>
      <div
        style={{
          height: "200px",
          overflowY: "scroll",
          border: "1px solid black",
          padding: "10px",
          marginTop: "10px",
          background: "#f9f9f9",
        }}
      >
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </div>
  );
};

export default EventVisualDemo;
