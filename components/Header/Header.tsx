import css from "./Header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.wrapper}>
          <Link href="/" aria-label="Home Page" className={css.logo}>
            <svg width={136} height={16} aria-hidden="true">
              <use href="/sprite.svg#logo" />
            </svg>
          </Link>
          <nav>
            <ul className={css.nav}>
              <li>
                <Link href="/" className={css.navLink}>Home</Link>
              </li>
              <li>
                <Link href="/campers" className={css.navLink}>Catalog</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
