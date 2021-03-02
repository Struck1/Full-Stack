import "./App.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { List } from "semantic-ui-react";
import { Header } from "semantic-ui-react";

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then((res) => {
      setActivities(res.data);
    });
  }, []);

  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities' />
      <List>
        {activities.map((act: any, index) => (
          <List.Item key={index}>{act.title}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
