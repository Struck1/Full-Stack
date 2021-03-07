import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import { Fragment } from "react";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

function App() {
  return (
    <Fragment>
      <Navbar />
      <Container style={{ marginTop: "7em" }}>
        <Route exact path='/' component={HomePage}></Route>
        <Route exact path='/activities' component={ActivityDashboard}></Route>
        <Route path='/activities/:id' component={ActivityDetails}></Route>
        <Route
          path={["/createActivity", "/manage/:id"]}
          component={ActivityForm}
        ></Route>
      </Container>
    </Fragment>
  );
}

export default observer(App);
