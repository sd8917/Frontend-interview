import { useState } from "react";
import useRetryInterval from "./useRetryInterval";

/**
 * Example: API call with retry mechanism
 * - Tries to fetch every 2 seconds
 * - Stops after 3 failures
 * - Shows retry count and error
 */

function RetryExample() {
  const [enabled, setEnabled] = useState(false);
  const [data, setData] = useState<any>(null);
  const [lastSuccess, setLastSuccess] = useState<string | null>(null);

  // Simulated API that fails randomly
  const fetchWithRetry = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 60% chance to fail (for demo)
        if (Math.random() > 0.4) {
          resolve({ message: "Data fetched!", timestamp: new Date().toLocaleTimeString() });
        } else {
          reject(new Error("Network error - trying again..."));
        }
      }, 500);
    });
  };

  const { retries, maxRetries, lastError, isActive, reset } = useRetryInterval({
    callback: fetchWithRetry,
    interval: 2000, // Retry every 2 seconds
    maxRetries: 3,  // Stop after 3 failures
    enabled,
    onSuccess: (result: any) => {
      setData(result);
      setLastSuccess(new Date().toLocaleTimeString());
    },
    onFailure: (error) => {
      console.error("Failed:", error.message);
    },
  });

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc" }}>
      <h2>SetInterval + Retry Mechanism (3 max failures)</h2>

      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? "⏸ Stop" : "▶ Start"} Retrying
      </button>
      <button onClick={reset} style={{ marginLeft: "10px" }}>
        🔄 Reset
      </button>

      <div style={{ marginTop: "20px" }}>
        <p>
          <strong>Status:</strong> {isActive ? "⏳ Active" : "⏹️ Stopped"}
        </p>
        <p>
          <strong>Retries:</strong> {retries}/{maxRetries}
        </p>
        {lastError && (
          <p style={{ color: "red" }}>
            <strong>Last Error:</strong> {lastError.message}
          </p>
        )}
        {data && (
          <p style={{ color: "green" }}>
            <strong>✅ Success!</strong> {data.message} at {data.timestamp}
          </p>
        )}
        {lastSuccess && (
          <p>
            <strong>Last Success:</strong> {lastSuccess}
          </p>
        )}
      </div>

      <div style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
        <p>How it works:</p>
        <ol>
          <li>Click "Start Retrying" to begin</li>
          <li>setInterval fires every 2 seconds</li>
          <li>Each attempt has 60% failure rate (demo)</li>
          <li>Stops after 3 failures OR on success</li>
          <li>Shows retry count and error message</li>
        </ol>
      </div>
    </div>
  );
}

export default RetryExample;
