import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";

const Navbar = () => (
  <header className={classes.Header}>
    <nav>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : "")}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : "")}
            to="/favourites"
          >
            Favourites
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Navbar;
