import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import Navbar from "./Navbar";
import { Fragment } from "react";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [category, setCategory] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  const handleCategory = (id: string) => {
    const activity = activities.find((x) => x.id === id);
    setCategory(activity);
  };

  const cancelCategory = () => {
    setCategory(undefined);
  };

  function handleFormOpen(id?: string) {
    id ? handleCategory(id) : cancelCategory();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function deleteActivity(id: string) {
    setActivities([...activities.filter((x) => x.id !== id)]);
  }

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((res) => {
        setActivities(res.data);
      });
  }, []);

  return (
    <Fragment>
      <Navbar formOpen={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          handleCategory={handleCategory}
          cancelCategory={cancelCategory}
          category={category}
          formOpen={handleFormOpen}
          formClose={handleFormClose}
          edit={editMode}
          deleteActivity={deleteActivity}
        />
      </Container>
    </Fragment>
  );
}

export default App;
