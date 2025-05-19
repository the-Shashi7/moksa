import React, { useEffect, useState } from "react";
import { socket } from "../service/service.js";

function LiveTable({ customer, setCustomer }) {
  useEffect(() => {
    socket.on("customer_event", (message) => {
      setCustomer((prev) => [message, ...prev]); 
    });

    return () => {
      socket.off("customer_event");
    };
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        🟢 Live Customer Traffic
      </h2>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
    
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            tableLayout: "fixed",
          }}
        >
          <thead
            style={{
              backgroundColor: "#f7f7f7",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            <tr>
              <th style={thStyle}>Store ID</th>
              <th style={thStyle}>Customers In</th>
              <th style={thStyle}>Customers Out</th>
              <th style={thStyle}>Timestamp</th>
            </tr>
          </thead>
        </table>

        {/* Scrollable tbody */}
        <div
          style={{
            maxHeight: "400px", // Adjust height to show ~20 rows comfortably
            overflowY: "auto",
            borderTop: "1px solid #ddd",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              tableLayout: "fixed",
            }}
          >
            <tbody>
              {customer?.map((entry, index) => (
                <tr key={index} style={index % 2 === 0 ? rowEven : rowOdd}>
                  <td style={tdStyle}>{entry.store_id}</td>
                  <td style={tdStyle}>{entry.customers_in}</td>
                  <td style={tdStyle}>{entry.customers_out}</td>
                  <td style={tdStyle}>
                    {new Date(entry.time_stamp).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const thStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
  backgroundColor: "#e8e8e8",
  fontWeight: "bold",
  textAlign: "center",
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "10px",
  textAlign: "center",
  borderBottom: "1px solid #f0f0f0",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const rowEven = {
  backgroundColor: "#ffffff",
};

const rowOdd = {
  backgroundColor: "#f9f9f9",
};

export default LiveTable;
