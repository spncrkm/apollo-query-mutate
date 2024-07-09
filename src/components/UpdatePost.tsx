import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_POST } from '../mutations/Mutations';
import { Button, Form, Alert } from 'react-bootstrap';

const UpdatePost: React.FC = () => {
  const [updatePost, { data, loading, error }] = useMutation(UPDATE_POST);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePost({ variables: { id, input: { title, body } } });
  };

  return (
    <div>
      <h2>Update a Post</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formId">
          <Form.Label>Post ID</Form.Label>
          <Form.Control
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBody">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          Update Post
        </Button>
      </Form>
      {error && <Alert variant="danger">{error.message}</Alert>}
      {data && (
        <Alert variant="success">
          Post updated successfully! ID: {data.updatePost.id}
        </Alert>
      )}
    </div>
  );
};

export default UpdatePost;