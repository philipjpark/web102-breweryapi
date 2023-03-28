import React, { useEffect, useState } from "react";

const BreweryInfo = ({ name, state, city, postal}) => {
  const [brewery, setBrewery] = useState(null);

  useEffect(() => {
    const getBrewery = async () => {
      const response = await fetch(
        `https://api.openbrewerydb.org/v1/breweries/search?query=${name}&by_state=${state}&by_city=${city}&by_postal=${postal}`
      );
      const json = await response.json();
      setBrewery(json[0]);
    };

    getBrewery().catch(console.error);
  }, [name, state, city, postal]);

  return (
    <div>
      {brewery ? (

        <ul className="main-list">
        {brewery.name} <span className="tab"></span>
        {brewery.city}, {brewery.state} {brewery.postal_code}
        </ul>
      ) : null}
    </div>
  );
};

export default BreweryInfo;
