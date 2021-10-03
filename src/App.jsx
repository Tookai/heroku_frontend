import "./App.scss";
import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import UserPage from "./pages/UserPage/UserPage";
import CommentPage from "./pages/CommentPage/CommentPage";
import { QueryClient, QueryClientProvider } from "react-query";
import Cookies from "js-cookie";

function App() {
  const queryClient = new QueryClient();

  // let auth = Cookies.get("user") ? true : false;

  // console.log(auth);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route exact path="/register">
            <RegisterPage />
          </Route>

          <Route exact path="/login">
            <LoginPage />
          </Route>

          {/* <Route path="/user/:id">{!auth ? <Redirect to="/login" /> : <UserPage />}</Route> */}
          <Route path="/user/:id">
            <UserPage />
          </Route>

          {/* <Route path="/id/:id">{!auth ? <Redirect to="/login" /> : <CommentPage />}</Route> */}
          <Route path="/id/:id">
            <CommentPage />
          </Route>

          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
