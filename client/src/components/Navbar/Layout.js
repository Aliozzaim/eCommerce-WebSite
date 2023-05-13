import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import styles from "./styles.module.css";
import { useAuth } from "../contexts/AutContext";
import { Logout } from "../../api";

import { useNavigate } from "react-router-dom";
import { useBasket } from "../contexts/BasketContext";

function Layout() {
  const { items } = useBasket();
  const navigate = useNavigate();

  const { setLoggedIn, setUser, user } = useAuth();

  const { loggedIn } = useAuth();

  const LogoutProfile = async () => {
    await Logout();

    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");

    navigate("/successlogout");

    setTimeout(() => {
      setLoggedIn(false);
      setUser(null);
      navigate("/homepage");
    }, 5000);
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <NavLink to="/homepage">eCommerce</NavLink>
          </div>
          <ul className={styles.menu}>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
          </ul>
        </div>
        <div className={styles.right}>
          {!loggedIn && (
            <>
              <NavLink to="/singin">
                <Button colorScheme="pink">Login</Button>
              </NavLink>
              <NavLink to="/signup">
                <Button colorScheme="pink">Register</Button>
              </NavLink>
            </>
          )}
          {loggedIn && user?.role !== "admin" && (
            <>
              {items.length > 0 && (
                <NavLink to="/basket">
                  <Button colorScheme="green">Basket ({items.length})</Button>
                </NavLink>
              )}

              <NavLink to="/profile">
                <Button>Profile</Button>
              </NavLink>
              <Button onClick={LogoutProfile} colorScheme="red">
                Logout
              </Button>
            </>
          )}
          {user?.role === "admin" && (
            <>
              <NavLink to={"/admin"}>
                <Button colorScheme="green">Admin</Button>
              </NavLink>
              <NavLink to="/profile">
                <Button>Profile</Button>
              </NavLink>
              <Button onClick={LogoutProfile} colorScheme="red">
                Logout
              </Button>
            </>
          )}
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default Layout;
