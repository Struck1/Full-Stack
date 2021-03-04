import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface Props {
  formOpen: () => void;

}

export default function Navbar({ formOpen }: Props) {
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
            <Button positive onClick={() => formOpen()}>
              Create Activity
            </Button>
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
}
