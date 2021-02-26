import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const data = [];
  const [datas, setData] = useState(data);

  const getData = async () => {
    let result = await fetch("http://localhost:3001/api/locations");
    let data = await result.json();
    console.log(data);
    setData(data);
  };
  useEffect(() => {
    // Update the document title using the browser API
    getData();
  }, []);

  ///setData([data...]);
  return (
    <div className="App">
      <h1>React front koordinaatit:</h1>
      {datas.map((item) => (
        <li key={item.id}>
          Lat: {item.latitude} - Lon: {item.longitude}
        </li>
      ))}
      <ul></ul>
    </div>
  );
}

export default App;
