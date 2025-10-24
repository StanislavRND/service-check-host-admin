import { NavLink, useLocation } from "react-router-dom";
import { menuItems } from "../config/menuItems";
import styles from "./Menu.module.scss";

export const Menu = () => {
  const location = useLocation();

  return (
    <nav>
      <ul className={styles.menu}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <li key={item.title} className={styles.item}>
              <NavLink
                to={item.path}
                className={[styles.link, isActive ? styles.active : ""].join(
                  " "
                )}
              >
                {item.title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
