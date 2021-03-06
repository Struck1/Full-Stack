import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { ChangeEvent } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/store/store";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loading } = activityStore;

  const initalState = activityStore.selectActivity ?? {
    id: "",
    title: "",
    date: "",
    description: "",
    category: "",
    city: "",
    venue: "",
  };

  const [firstValue, setFirstValue] = useState(initalState);

  function handleSubmit() {
    firstValue.id ? updateActivity(firstValue) : createActivity(firstValue);
  }

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFirstValue({ ...firstValue, [name]: value });
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder='Title'
          name='title'
          value={firstValue.title}
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder='Description'
          name='description'
          value={firstValue.description}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='Date'
          name='date'
          value={firstValue.date}
          onChange={handleInputChange}
          type='date'
        />
        <Form.Input
          placeholder='Category'
          name='category'
          value={firstValue.category}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='Venue'
          name='venue'
          value={firstValue.venue}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='City'
          name='city'
          value={firstValue.city}
          onChange={handleInputChange}
        />
        <Button floated='right' positive type='submit' content='Submit' />
        <Button
          floated='right'
          type='button'
          content='Cancel'
          onClick={() => activityStore.closeForm()}
        />
      </Form>
    </Segment>
  );
});
