import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
  handleCategory: (id: string) => void;
  category: Activity | undefined;
  cancelCategory: () => void;
  formOpen: (id: string) => void;
  formClose: () => void;
  edit: boolean;
  deleteActivity: (id: string) => void;
}

export default function ActivityDashboard({
  activities,
  handleCategory,
  category,
  cancelCategory,
  formOpen,
  formClose,
  edit,
  deleteActivity,
}: Props) {
  return (
    <Grid>
      <Grid.Column width='10'>
        <ActivityList
          activities={activities}
          handleCategory={handleCategory}
          formClose={formClose}
          deleteActivity={deleteActivity}
        />
      </Grid.Column>
      <Grid.Column width='6'>
        {category && !edit && (
          <ActivityDetails
            activity={category}
            cancelCategory={cancelCategory}
            formOpen={formOpen}
          />
        )}

        {edit && <ActivityForm formClose={formClose} activity={category} />}
      </Grid.Column>
    </Grid>
  );
}
