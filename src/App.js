import React, { useState } from "react";
import SHA256 from "crypto-js/sha256";

function App() {
  const [task, setTask] = useState("");
  const [chain, setChain] = useState([
    {
      index: 1,
      timestamp: Date.now(),
      data: "Genesis Block",
      previousHash: "0",
      hash: "000000"
    }
  ]);

  // ✅ Real SHA-256 hash function
  const hashBlock = (index, timestamp, data, previousHash) => {
    return SHA256(
      index + timestamp + data + previousHash
    ).toString();
  };

  // ✅ Add a new block
  const addBlock = () => {
    if (task.trim() === "") return;

    const lastBlock = chain[chain.length - 1];
    const newIndex = chain.length + 1;
    const newTimestamp = Date.now();
    const prevHash = lastBlock.hash;

    const newHash = hashBlock(newIndex, newTimestamp, task, prevHash);

    const newBlock = {
      index: newIndex,
      timestamp: newTimestamp,
      data: task,
      previousHash: prevHash,
      hash: newHash,
    };

    setChain([...chain, newBlock]);
    setTask("");
  };

  // ✅ Validate the blockchain
  const isValidChain = () => {
    for (let i = 1; i < chain.length; i++) {
      const current = chain[i];
      const previous = chain[i - 1];

      // Recalculate hash
      const recalculatedHash = hashBlock(
        current.index,
        current.timestamp,
        current.data,
        current.previousHash
      );

      // Check hash consistency
      if (current.hash !== recalculatedHash) return false;

      // Check chain linking
      if (current.previousHash !== previous.hash) return false;
    }

    return true;
  };

  return (
    <div style={{ padding: "25px" }}>
      <h1>Blockchain To-Do List</h1>

      <input
        type="text"
        placeholder="Enter task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={{ marginRight: "10px" }}
      />

      <button onClick={addBlock}>Add Task</button>

      {/* Validate Chain Button */}
      <button
        onClick={() =>
          alert(isValidChain() ? "Blockchain is VALID ✔️" : "Blockchain is TAMPERED ❌")
        }
        style={{ marginLeft: "10px" }}
      >
        Validate Blockchain
      </button>

      <h2>Blockchain</h2>

      {chain.map((block) => (
        <div
          key={block.index}
          style={{
            marginTop: "15px",
            padding: "10px",
            border: "1px solid black"
          }}
        >
          <p><strong>Block #{block.index}</strong></p>
          <p>Task: {block.data}</p>
          <p>Timestamp: {block.timestamp}</p>
          <p>Previous Hash: {block.previousHash}</p>
          <p>Hash: {block.hash}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
