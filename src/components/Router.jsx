import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// components
import Home from "./Home/Home";
import Blog from "./Blog/Blog";
import Footer from "./Footer/Footer";

// admin components
import Login from "./auth/Login";
import PrivateRoute from "./ProtectedRoute/ProtectedRoute";
import Tags from "./admin/Tags/Tags";
import Blogs from "./admin/Blog/Blog";
import Create from "./admin/Blog/CreateBlog";

const RouterComponent = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/blog/:id" component={Blog} />
          <Route exact path="/admin/login" component={Login} />
          <PrivateRoute exact path="/admin/tags" component={Tags} />
          <PrivateRoute exact path="/admin/blogs" component={Blogs} />
          <PrivateRoute exact path="/admin/create" component={Create} />
          <PrivateRoute exact path="/admin/create/:id" component={Create} />
        </Switch>
      </Router>
      <Footer />
    </>
  );
};

export default RouterComponent;
