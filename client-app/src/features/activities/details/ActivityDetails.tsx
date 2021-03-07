import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../app/store/store";

export default observer(function ActivityDetails() {
  const { activityStore } = useStore();
  const {
    selectActivity: activity,
    loadActivity,
    loadingInital,
  } = activityStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadActivity(id);
  }, [id, loadActivity]);

  if (loadingInital || !activity) return <> </>; //Loading componenet eklenecek!

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
          <Button color='blue' as={Link} to={`/manage/${activity.id}`}>
            Edit
          </Button>
          <Button color='red' as={Link} to='/activities'>
            Cancel
          </Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
});
