import React, { useEffect, useState } from "react";
import "../styles/UserLogs.css";

const UsageLogs = () => {
  const [logs, setLogs] = useState([]);
  console.log(logs)

  useEffect(() => {
    fetch("http://localhost:4001/logs")
      .then((res) => res.json()) 
      .then((data) => {
        console.log("Logs Data:", data);
        setLogs(data);
      })
      .catch((error) => console.error("Error fetching logs:", error));
  }, []);

  return (
    <div className="logs-container">
      <h2>API Usage Logs</h2>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>API ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <tr key={index}>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
                <td>{log.api_id || "N/A"}</td>
                <td className={log.status === "success" ? "success" : "failure"}>
                  {log.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No logs available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsageLogs;
