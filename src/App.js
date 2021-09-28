import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RouteName from "./config/Route";
import { AuthProvider } from "./contexts/AuthContext";
import EditProfile from "./pages/Customer/EditProfile";
import Login from "./pages/Customer/Login";
import DetailProduct from "./pages/DetailProduct";
import Error404 from "./pages/Error/Error404";
import Home from "./pages/Home";
import AddProduct from "./pages/Seller/AddProduct";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path={RouteName.home} component={Home} />
          <Route exact path={"/seller/addproduct"} component={AddProduct} />
          <Route exact path={"/product/guitar"} component={DetailProduct} />
          <Route
            exact
            path={"/customer/edit-profile"}
            component={EditProfile}
          />
          <Route exact path={RouteName.login} component={Login} />
          <Route path='*' component={Error404} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
