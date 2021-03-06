import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import { Fragment } from "react";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useStore } from "../store/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  return (
    <Fragment>
      <Navbar />
      <Container style={{ marginTop: "7em" }}>
        {!activityStore.loadingInital && <ActivityDashboard />}
      </Container>
    </Fragment>
  );
}

export default observer(App);
