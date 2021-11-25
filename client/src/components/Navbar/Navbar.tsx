import classes from "./Navbar.module.css";

const Navbar = () => (
  <header className={classes.Header}>
    <nav>
      <ul>
        <li>
          <a className={classes.active} href="/">Home</a>
        </li>
        <li>
          <a href="/favourites">Favourites</a>
        </li>
      </ul>
    </nav>
  </header>
);

export default Navbar;
