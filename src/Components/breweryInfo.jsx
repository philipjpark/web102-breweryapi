import React, { useEffect, useState } from "react";

const BreweryInfo = ({ name, state, postal }) => {
  const [brewery, setBrewery] = useState(null);

  useEffect(() => {
    const getBrewery = async () => {
      const response = await fetch(
        `https://api.openbrewerydb.org/breweries/search?query=${name}&by_state=${state}&by_postal=${postal}`
      );
      const json = await response.json();
      setBrewery(json[0]);
    };

    getBrewery().catch(console.error);
  }, [name, state, postal]);

  return (
    <div>
      {brewery ? (
        <li className="main-list">
          {brewery.name} <span className="tab"></span> {brewery.city}{" "}
          <span className="tab"></span> {brewery.state}{" "}
          <span className="tab"></span> {brewery.postal_code}
        </li>
      ) : null}
    </div>
  );
};

export default BreweryInfo;
