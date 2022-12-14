import { Route, Redirect } from "react-router-dom";
import { checkJWT } from "./../../helper/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  checkJWT();
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("id") && localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/admin/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
