import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activities: Activity[];
  handleCategory: (id: string) => void;
  formClose: () => void;
  deleteActivity: (id: string) => void;
}
export default function ActivityList({
  activities,
  handleCategory,
  formClose,
  deleteActivity,
}: Props) {
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div> {activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => {
                    handleCategory(activity.id);
                    formClose();
                  }}
                  floated='right'
                  color='blue'
                >
                  View
                </Button>
                <Button
                  onClick={() => deleteActivity(activity.id)}
                  floated='right'
                  color='red'
                >
                  Delete
                </Button>
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
