import { useState, useEffect } from 'react';
import BreweryInfo from "./Components/breweryInfo";
import './App.css';
// import SideNav from "./Components/sideNav";

function App() {
    const [list, setList] = useState(null);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState(""); 


    useEffect(() => {
      const fetchAllBreweries = async () => {
        const response = await fetch(
          'https://api.openbrewerydb.org/v1/breweries'
        );
        const json = await response.json();
        setList(json);
      };
      fetchAllBreweries().catch(console.error);
    }, []);

    const searchItems = (searchValue) => {
      setSearchInput(searchValue);
      if (searchValue !== "") {
        const filteredData = list.filter((item) =>
          Object.values(item)
            .join("")
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        );
        setFilteredResults(filteredData);
      } else {
        setFilteredResults(list);
      }
    };

  return (
    <div className="whole-page"> 
      {/* <SideNav /> */}
      <h1>🍺Breweries List</h1>
      <h3>Search for breweries by name, city, state or zip code.</h3>
      
      <input
        className="search-bar"
        type="text"
        placeholder="SEARCH"
        onChange={(inputString) => searchItems(inputString.target.value)}
      />
      <br></br>
      <br></br>
      {searchInput.length > 0
        ? filteredResults.map((brewery) => (
            <BreweryInfo
              key={brewery.id}
              name={brewery.name}
              state={brewery.state}
              city={brewery.city}
              postal={brewery.postal_code}
            />
          ))
        : list &&
            list.map((brewery) => (
              <BreweryInfo
                key={brewery.id}
                name={brewery.name}
                state={brewery.state}
                city={brewery.city}
                postal={brewery.postal_code}
              />
            ))}
    </div>
  );
}

export default App;

