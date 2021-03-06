import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../app/store/store";

export default function ActivityDetails() {
  const { activityStore } = useStore();
  const {
    openForm,
    cancelSelectedActivity,
    selectActivity: activity,
  } = activityStore;

  if (!activity) return <> </>;

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths='2'>
          <Button color='blue' onClick={() => openForm(activity.id)}>
            Edit
          </Button>
          <Button color='red' onClick={() => cancelSelectedActivity()}>
            Cancel
          </Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
