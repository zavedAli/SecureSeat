import { ethers } from "ethers";
import { Link, NavLink } from "react-router-dom";
import More from "../page/More";

const Navigation = ({ account, setAccount }) => {
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  };

  return (
    <nav>
      <div className="nav__brand">
        <h1>SecureSeats</h1>

        <input
          className="nav__search"
          type="text"
          placeholder="Find your event here..."
        />

        <ul className="nav__links">
          <li>
            <NavLink to="/page/concert">Concert</NavLink>
          </li>
          <li>
            <a href="/">Sports</a>
          </li>
          <li>
            <a href="/">Arts & Theater</a>
          </li>
          <li>
            <NavLink to="/page/components">More</NavLink>
          </li>
        </ul>
      </div>

      {account ? (
        <button type="button" className="nav__connect">
          {account.slice(0, 6) + "..." + account.slice(38, 42)}
        </button>
      ) : (
        <button type="button" className="nav__connect" onClick={connectHandler}>
          Connect
        </button>
      )}
    </nav>
  );
};

export default Navigation;
