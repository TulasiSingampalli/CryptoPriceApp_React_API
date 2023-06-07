import "./styles.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import Coin from "./components/Coin";

function App() {
  const [listOfCoins, setListOfCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(
      (response) => {
        // console.log(response);
        setListOfCoins(response.data.coins);
      }
    );
  }, []);

  const filteredCoins = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="App">
      <div className="cryptoHeader">
        <input
          type="text"
          placeholder="Enter Bitcoin..."
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>
      <div className="cryptoDisplay">
        {filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.name}
              name={coin.name}
              icon={coin.icon}
              price={coin.price}
              symbol={coin.symbol}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
