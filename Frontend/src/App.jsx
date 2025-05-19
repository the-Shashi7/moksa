import React from "react";
import LiveTable from "./components/LiveTable";
import HistoryTable from "./components/HistoryTable";

function App() {
  const [activeTab, setActiveTab] = React.useState("live");
  const [customer, setCustomer] = React.useState([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "live":
        return <LiveTable customer={customer} setCustomer={setCustomer} />;
      case "history":
        return <HistoryTable />;
      default:
        return <LiveTable />;
    }
  };

  // Inline styles
  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    margin: '20px 0',
  };

  const buttonBaseStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    border: '2px solid #4CAF50',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: 'white',
    color: '#4CAF50',
    transition: 'all 0.3s ease',
  };

  const activeButtonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
  };

  const hoverStyle = {
    backgroundColor: '#45a049',
    color: 'white',
  };

  // A small helper to merge styles dynamically (since we can't do :hover inline easily, we add a simple onMouseEnter/Leave)
  const [hoveredButton, setHoveredButton] = React.useState(null);

  return (
    <div>
      <nav style={navStyle}>
        {["live", "history"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            onMouseEnter={() => setHoveredButton(tab)}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              ...buttonBaseStyle,
              ...(activeTab === tab ? activeButtonStyle : {}),
              ...(hoveredButton === tab && activeTab !== tab ? hoverStyle : {}),
            }}
          >
            {tab === "live" ? "Live Data" : "History Data"}
          </button>
        ))}
      </nav>
      {renderTabContent()}
    </div>
  );
}

export default App;
