import React, { useContext } from "react";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import LoginForm from "../user/LoginForm";
import RegisterForm from "../user/RegisterForm";
import { RootStoreContext } from "../../app/store/rootStore";

const HomePage = () => {
  const token = window.localStorage.getItem("jwt");

  const rootStore = useContext(RootStoreContext);
  const { user, isLoggedIn } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image size="massive" src="/assets/logo.png" alt="logo" style={{ marginBottom: 12 }} />
          Reactivities
        </Header>
        {isLoggedIn && user && token ? (
          <>
            <Header as="h2" inverted content={`Welcome back ${user.displayName}`} />
            <Button as={Link} to="/activities" size="huge" inverted>
              Go to activities!
            </Button>
          </>
        ) : (
          <>
            <Header as="h2" inverted content={`Welcome to Reactivitities`} />
            <Button onClick={() => openModal(<LoginForm />)} size="huge" inverted>
              Login
            </Button>
            <Button onClick={() => openModal(<RegisterForm />)} size="huge" inverted>
              Register
            </Button>
          </>
        )}
      </Container>
    </Segment>
  );
};

export default HomePage;
