import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../store/store";

export default function Navbar() {
  const { activityStore } = useStore();

  return (
    <div>
      <Menu inverted fixed='top'>
        <Container>
          <Menu.Item>
            <img
              src='/assets/logo.png'
              alt='logo'
              style={{ marginRight: 10 }}
            />
            Reactivities
          </Menu.Item>
          <Menu.Item name='Activities' />
          <Menu.Item>
            <Button positive onClick={() => activityStore.openForm()}>
              Create Activity
            </Button>
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
}
