import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./styles.css"
function Admin() {
  return (
    <>
    <nav >
      <ul className="admin-menu">
        <li>
          <NavLink to="/admin/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/admin/orders">Orders</NavLink>
        </li>
        <li>
          <NavLink to="/admin/products">Products</NavLink>
        </li>
      </ul>
    </nav>
    <Outlet />
    </>
  );
}

export default Admin;
