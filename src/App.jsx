import axios from "axios";
import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchedData, setSearchedData] = useState("");
  const fetchCountries = async () => {
    try {
      const res = await axios.get("https://restcountries.com/v3.1/all");
      setData(res.data);
      setSearchedData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const filterCountries = () => {
    if (searchValue) {
      const filteredCountries = data.filter((country) =>
        country.name.common.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchedData(filteredCountries);
    } else {
      setSearchedData(data);
    }
  };
  useEffect(() => {
    fetchCountries();
  }, []);
  useEffect(() => {
    filterCountries();
  }, [searchValue]);
    return (
      <div style={{minHeight:"100vh"}}>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            padding: "1rem",
          }}
        >
          {searchedData.length>0 && searchedData.map((country) => (
            <div
              key={country.name.official}
              style={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid black",
                height: "10rem",
                width: "10rem",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{ height: "4rem", width: "4rem", overflow: "hidden" }}
              >
                <img
                  src={country.flags.png}
                  alt={country.name.common}
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                ></img>
              </div>
              <p>{country.name.common}</p>
            </div>
          ))}
        </div>
      </div>
    );
}

export default App;
