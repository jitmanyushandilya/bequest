import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:8080";

function App() {
  const [data, setData] = useState<string>();
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(API_URL);
    const { data } = await response.json();
    setData(data);
  };

  const updateData = async () => {
    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    await getData();
    setData(''); // Clear the input field by setting data to an empty string
};

const recoverData = async () => {
  const response = await fetch(`${API_URL}/recover`);
  if (response.status === 200) {
    const { data } = await response.json();
    setData(data);
    setMessage("Data has been recovered.");
  } else {
    setMessage("Data recovery failed. Data not found.");
  }
};


const verifyData = async () => {
    const response = await fetch(`${API_URL}/verify`, {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      setMessage("Data is intact");
    } else {
      setMessage("Data has been tampered with");
    }

    setData('');
  };

  return (
    <div
      style={{
        // ... existing styles ...
      }}
    >
<div><b>Enter your new information and click 'Update Data' to send it to the server for storage.</b> </div><br></br>
<div><i>If you want to make sure your data hasn't been changed in any way, simply input the information you saved previously and click 'Verify Data.' The server will then check if your data remains unaltered or if any changes have been made.      
</i></div><br></br>
  <div>Saved Data</div>

 <input
        style={{ fontSize: "30px" }}
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
<br></br>
      <div style={{ display: "flex", gap: "10px" }}>
        <button style={{ fontSize: "20px" }} onClick={updateData}>
          Update Data
        </button>
        <button style={{ fontSize: "20px" }} onClick={verifyData}>
          Verify Data
        </button>
        
        <button style={{ fontSize: "20px" }} onClick={recoverData}>
  Recover Data
</button>

      </div>
      {message && <div style={{ marginTop: "20px", fontSize: "20px" }}>{message}</div>}
    </div>
    
  );
}

export default App;