import React, { useEffect, useState } from 'react';
import { getHistoryData } from '../service/service';

function HistoryTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getHistoryData();
      setData(result);
    }

    fetchData();
  }, []);

  // Inline styles
  const containerStyle = {
    width: '80%',
    margin: '20px auto',
    fontFamily: 'Arial, sans-serif',
  };

  const headingStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '10px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  };

  const thStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    border: '1px solid #ddd',
  };

  const tdStyle = {
    padding: '8px',
    border: '1px solid #ddd',
    textAlign: 'center',
  };

  const trHoverStyle = {
    backgroundColor: '#f5f5f5',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>History Table (Last 24 Hours)</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Hour</th>
            <th style={thStyle}>Total In</th>
            <th style={thStyle}>Total Out</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr
              key={index}
              style={index % 2 === 0 ? {} : trHoverStyle} // Zebra stripes effect
            >
              <td style={tdStyle}>{entry.hour}</td>
              <td style={tdStyle}>{entry.in}</td>
              <td style={tdStyle}>{entry.out}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryTable;
