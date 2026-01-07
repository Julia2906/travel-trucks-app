import css from "./Header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home Page">
        TravelTrucks
      </Link>
      <nav>
        <ul className={css.nav}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/campers">Catalog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
