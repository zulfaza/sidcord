import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RouteName from "./config/Route";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

// Component
import GuestOnlyRoute from "./components/Route/GuestOnlyRoute";
import UserRoute from "./components/Route/UserRoute";
import SellerRoute from "./components/Route/SellerRoute";

// Page
import EditProfile from "./pages/Customer/EditProfile";
import Login from "./pages/Customer/Login";
import Register from "./pages/Customer/Register";
import LoginSeller from "./pages/Seller/Login";
import RegisterSeller from "./pages/Seller/Register";
import DetailProduct from "./pages/DetailProduct";
import Error404 from "./pages/Error/Error404";
import Home from "./pages/Home";
import AddProduct from "./pages/Seller/AddProduct";
import DashboardSeller from "./pages/Seller/DashboardSeller";
import EditProfileSeller from "./pages/Seller/EditProfileSeller";
import TrackingOrder from "./pages/Customer/TrackingOrder";
import { Checkout } from "./pages/Customer/Checkout";
import ShoppingCart from "./pages/Customer/ShoppingCart";
import AddAddress from "./pages/Customer/AddAddress";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Switch>
            <UserRoute
              exact
              path={"/customer/tracking-order"}
              component={TrackingOrder}
            />
            <UserRoute exact path={"/customer/checkout"} component={Checkout} />
            <Route exact path={RouteName.home} component={Home} />
            <UserRoute
              exact
              path={"/customer/shopping-cart"}
              component={ShoppingCart}
            />
            <Route exact path={"/seller/add-product"} component={AddProduct} />
            <SellerRoute
              exact
              path={"/seller/dashboard"}
              component={DashboardSeller}
            />
            <Route exact path={"/customer/add-address"} component={AddAddress} />
            <Route exact path={"/product/:slug"} component={DetailProduct} />
            <UserRoute
              exact
              path={"/customer/edit-profile"}
              component={EditProfile}
            />
            <SellerRoute
              exact
              path={"/seller/edit-profile"}
              component={EditProfileSeller}
            />
            <GuestOnlyRoute exact path={RouteName.login} component={Login} />
            <GuestOnlyRoute
              exact
              path={RouteName.register}
              component={Register}
            />
            <GuestOnlyRoute
              exact
              path={RouteName.sellerLogin}
              component={LoginSeller}
            />
            <Route
              exact
              path={RouteName.sellerRegister}
              component={RegisterSeller}
            />
            <Route path='*' component={Error404} />
          </Switch>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
