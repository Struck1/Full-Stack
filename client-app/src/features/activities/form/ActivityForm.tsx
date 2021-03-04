import React, { useState } from "react";
import { ChangeEvent } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity | undefined;
  formClose: () => void;
}

export default function ActivityForm({ activity, formClose }: Props) {
  const initalState = activity ?? {
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
    console.log(firstValue);
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
          value={firstValue.date}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='Category'
          value={firstValue.category}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='Venue'
          value={firstValue.venue}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='City'
          value={firstValue.city}
          onChange={handleInputChange}
        />
        <Button floated='right' positive type='submit' content='Submit' />
        <Button
          floated='right'
          type='button'
          content='Cancel'
          onClick={() => formClose()}
        />
      </Form>
    </Segment>
  );
}
