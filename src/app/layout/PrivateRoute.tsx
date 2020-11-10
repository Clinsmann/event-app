import React from "react";
import { RouteProps, RouteComponentProps, Route, Redirect } from "react-router-dom";
import { RootStoreContext } from "../store/rootStore";
import { observer } from "mobx-react-lite";

interface IProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>;
}

const PrivateRoute: React.FC<IProps> = ({ component: Component, ...rest }) => {
  const rootStore = React.useContext(RootStoreContext);
  const { isLoggedIn } = rootStore.userStore;
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      }
    />
  );
};

export default observer(PrivateRoute);
