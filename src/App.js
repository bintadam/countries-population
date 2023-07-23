import { useState, useEffect } from 'react';
import {useMediaQuery} from 'react-responsive'
import axios from "axios";
import "./App.css";


function App() {
  const isDesktop = useMediaQuery({query: "(min-width: 1224px)"});
  const isMobile = useMediaQuery({query: "(min-width: 1224px)"});
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
        <h3 className="world">World population</h3>
        <h6 className="populated">Ten most populated countries</h6>
      <div className='chart'>
        {tenMostPopulated.map((country, index) => (
          <div key={index} className='bar' style={{width: `${country.population * scaleFactor}px`}}>
              <p className="bar-name">{country.name}</p>
              <p className="bar-label">{country.population.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
