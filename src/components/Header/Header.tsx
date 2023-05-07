import Link from "next/link";

import headerClassNames from "./headerClassNames";

const Header = () => {
  const {
    contactUs,
    container,
    header,
    li,
    link,
    logo,
    logoContainer,
    nav,
    ul,
  } = headerClassNames;

  return (
    <header className={header}>
      <div className={container}>
        <Link className={logoContainer} href="/">
          <h3>Logo</h3>
        </Link>

        <nav className={nav}>
          <ul className={ul}>
            <li className={li}>
              <Link className={link} href="/">
                Home
              </Link>
            </li>
            <li className={li}>
              <Link className={link} href="/about">
                About Us
              </Link>
            </li>
            <li className={li}>
              <Link className={link} href="/shop">
                Shop
              </Link>
            </li>
            <li className={li}>
              <Link className={link} href="/blog">
                Blog
              </Link>
            </li>
            <li className={li}>
              <Link className={contactUs} href="/contact">
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
