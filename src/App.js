import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [coinValue, setCoinValue] = useState(0);
  const [select, setSelect] = useState(0);
  useEffect(()=>{
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response) => response.json())
    .then((json) => {
      setCoins(json);
      setLoading(false);
    })
  }, [])
  function onChange(e) {
    setCoinValue(e.target.value);
  }
  function selectOnChange(e) {
    setSelect(e.target.value);
  }

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? <strong>Loading</strong> :  
        <>
        <select onChange={selectOnChange}>
        {coins.map((coin,index) => 
              <option value={coin.quotes.USD.price} key={index}>{coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD</option>)
        }
        </select>
        {select ? <><input 
        type="number"
        onChange={onChange}
        value={coinValue}
        placeholder="How much do you have?(USD)"
      />
        <input
        type="number"
        value={coinValue/select}
        onChange={onChange}
        /></> : null}
       </>               
       }
    </div>
  );
}

export default App;
