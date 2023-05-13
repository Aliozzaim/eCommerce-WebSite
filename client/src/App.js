import { Route, Routes } from "react-router-dom";

import Layout from "./components/Navbar/Layout";
import Signin from "./components/pages/Auth/Signin/Signin";
import Signup from "./components/pages/Auth/Signup/Signup";
import Basket from "./components/pages/Basket/Basket";
import Error404 from "./components/pages/Basket/Error404";
import Homepage from "./components/pages/HomePage/Homepage";
import ProductDetail from "./components/pages/ProductDetail/ProductDetail";
import ProductedRoute from "./components/pages/ProductedRoute";
import Products from "./components/pages/Products/Products";
import Profile from "./components/pages/Profile/Profile";
import SuccessLogin from "./components/pages/SuccessLogin";
import SuccessLogout from "./components/pages/SuccessLogout";
import ProtectedAdmin from "./components/pages/Admin/ProtectedAdmin";
import SuccessRegister from "./components/pages/SuccessRegister";
import AdminHome from "./components/pages/Admin/AdminHome/AdminHome";
import Adminss from "./components/pages/Admin/Adminss";
import AdminProducts from "./components/pages/Admin/Products/AdminProducts";
import Orders from "./components/pages/Admin/Orders/Orders";
import AdminproDetail from "./components/pages/Admin/AdminproDetail/AdminproDetail";
import NewProduct from "./components/pages/Admin/Products/NewProduct";

function App() {
  // const navigate = useNavigate()
  // useEffect(() => {
  //   navigate("/homepage")
  // }, [])
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Homepage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:product_id" element={<ProductDetail />} />
          <Route path="/singin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProductedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/successentry" element={<SuccessRegister />} />
          <Route path="/successlogin" element={<SuccessLogin />} />
          <Route path="/successlogout" element={<SuccessLogout />} />
          <Route path="/basket" element={<Basket />} />
          <Route element={<ProtectedAdmin />}>
            <Route path="/admin" element={<Adminss />}>
              <Route path="/admin/home" element={<AdminHome />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/products/:product_id" element={<AdminproDetail />} />
              <Route path="/admin/products/new" element={<NewProduct />} />
            </Route>
          </Route>
          <Route path="/*" element={<Error404 />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
