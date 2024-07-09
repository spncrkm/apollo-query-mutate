import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../mutations/Mutations';
import { Button, Form, Alert } from 'react-bootstrap';

const CreatePost: React.FC = () => {
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPost({ variables: { input: { title, body, userId } } });
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <Form onSubmit={handleSubmit}>
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
        <Form.Group controlId="formUserId">
          <Form.Label>User ID</Form.Label>
          <Form.Control
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          Create Post
        </Button>
      </Form>
      {error && <Alert variant="danger">{error.message}</Alert>}
      {data && (
        <Alert variant="success">
          Post created successfully! ID: {data.createPost.id}
        </Alert>
      )}
    </div>
  );
};

export default CreatePost;