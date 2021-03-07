import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import { useParams } from "react-router";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/store/store";

export default observer(function ActivityForm() {
  const { id } = useParams<{ id: string }>();
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loadActivity } = activityStore;

  const [firstValue, setFirstValue] = useState({
    id: "",
    title: "",
    date: "",
    description: "",
    category: "",
    city: "",
    venue: "",
  });

  console.log(firstValue);
  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setFirstValue(activity!));
  }, [id, loadActivity]);

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
        <Button floated='right' type='button' content='Cancel' />
      </Form>
    </Segment>
  );
});
