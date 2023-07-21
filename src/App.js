import { useState, useEffect } from 'react';
import axios from "axios";


function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const url = "https://restcountries.com/v2/all";
    axios
      .get(url)
      .then((response) => setData(response.data))
      .catch((error) => console.error(error))
  }, [])

  if(!data){
    return <div>Loading...</div>
  }

  const populatedCountries = data.map((country) => {
    return {
      name: country.name,
      population: country.population
    }
  })

  const sortPopulatedCountries = populatedCountries.sort((a,b) => b.population - a.population)

  const tenMostPopulated = sortPopulatedCountries.slice(0, 10);

  const newObj = {name:"world", population: 8037642469}
  tenMostPopulated.unshift(newObj)

  const maxPopulation = tenMostPopulated[0].population;
  const scaleFactor = 500/maxPopulation

  return (
    <div className="App">
      <p className="world">World population</p>
      <p className="populated">Ten most populated countries</p>
      <div className='chart'>
        {tenMostPopulated.map((country, index) => (
          <div key={index} className='bar' style={{width: `${country.population * scaleFactor}px`}}>
              <div className="bar-name">{country.name}</div>
              <div className="bar-label">{country.population.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
