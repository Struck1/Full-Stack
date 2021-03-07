import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";

export default function Navbar() {
  return (
    <div>
      <Menu inverted fixed='top'>
        <Container>
          <Menu.Item as={NavLink} to='/' exact header>
            <img
              src='/assets/logo.png'
              alt='logo'
              style={{ marginRight: 10 }}
            />
            Reactivities
          </Menu.Item>
          <Menu.Item name='Activities' as={NavLink} to='/activities' />
          <Menu.Item>
            <Button positive as={NavLink} to='/createActivity'>
              Create Activity
            </Button>
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
}
