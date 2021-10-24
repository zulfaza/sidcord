import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RouteName from "./config/Route";
import { AuthProvider } from "./contexts/AuthContext";
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
import GuestOnlyRoute from "./components/Route/GuestOnlyRoute";
import UserRoute from "./components/Route/UserRoute";
import SellerRoute from "./components/Route/SellerRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path={RouteName.home} component={Home} />
          <SellerRoute
            exact
            path={"/seller/add-product"}
            component={AddProduct}
          />
          <SellerRoute
            exact
            path={"/seller/dashboard"}
            component={DashboardSeller}
          />
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
    </AuthProvider>
  );
}

export default App;
