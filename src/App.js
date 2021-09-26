import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Error404 from "./pages/Error/Error404";
import Home from "./pages/Home";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='*' component={Error404} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
