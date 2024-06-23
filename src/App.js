import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import More from "./page/More.js";

// Components
import Navigation from "./components/Navigation";
import Sort from "./components/Sort";
import Card from "./components/Card";
import SeatChart from "./components/SeatChart";
// ABIs
import TokenMaster from "./abis/TokenMaster.json";
// Config
import config from "./config.json";
import { Consert } from "./page/Consert.js";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [tokenMaster, setTokenMaster] = useState(null);
  const [occasions, setOccasions] = useState([]);
  const [occasion, setOccasion] = useState({});
  const [toggle, setToggle] = useState(false);
  const [sortedOccasions, setSortedOccasions] = useState([]);

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    const network = await provider.getNetwork();
    const tokenMaster = new ethers.Contract(
      config[network.chainId].TokenMaster.address,
      TokenMaster,
      provider
    );
    setTokenMaster(tokenMaster);
    const totalOccasions = await tokenMaster.totalOccasions();
    console.log(totalOccasions);
    const occasions = [];
    for (var i = 1; i <= totalOccasions; i++) {
      const occasion = await tokenMaster.getOccasion(i);
      occasions.push(occasion);
    }
    setOccasions(occasions);
    window.ethereum.on("accountsChanged", async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);
    });
  };
  const handleSort = ({ genre, date, location }) => {
    let sorted = [...occasions];

    if (genre) {
      sorted = sorted.filter(
        (occasion) =>
          occasion.genre.trim().toLowerCase() === genre.trim().toLowerCase()
      );
    }

    if (date) {
      sorted = sorted.filter((occasion) => occasion.date === date);
    }

    if (location) {
      sorted = sorted.filter(
        (occasion) => occasion.location.toLowerCase() === location.toLowerCase()
      );
    }

    setSortedOccasions(sorted);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/page/components" element={<More />} />
        <Route path="/page/concert" element={<Consert />} />
        <Route
          path="/"
          element={
            <div>
              <header>
                <Navigation account={account} setAccount={setAccount} />

                <h2 className="header__title">
                  <strong>Event</strong> Tickets
                </h2>
              </header>
              <Sort occasions={occasions} onSort={handleSort} />
              <div className="cards">
                {sortedOccasions.map((occasion, index) => (
                  <Card
                    occasion={occasion}
                    id={index + 1}
                    tokenMaster={tokenMaster}
                    provider={provider}
                    account={account}
                    toggle={toggle}
                    setToggle={setToggle}
                    setOccasion={setOccasion}
                    key={index}
                  />
                ))}
              </div>
              {toggle && (
                <SeatChart
                  occasion={occasion}
                  tokenMaster={tokenMaster}
                  provider={provider}
                  setToggle={setToggle}
                />
              )}
            </div>
          }
        />
      </Routes>

      {/* Add more routes for other pages if needed */}
    </BrowserRouter>
  );
}

export default App;
