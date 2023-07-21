import { useState, useEffect } from 'react';
import './App.css';
import { useState } from 'react';

function App() {
  const [data, setData] = useState(null)

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

  return (
    <div className="App">

    </div>
  );
}

export default App;
