import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from '../mutations/Mutations';
import { Button, Form, Alert } from 'react-bootstrap';

const DeletePost: React.FC = () => {
  const [deletePost, { data, loading, error }] = useMutation(DELETE_POST);
  const [id, setId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    deletePost({ variables: { id } });
  };

  return (
    <div>
      <h2>Delete a Post</h2>
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
        <Button variant="danger" type="submit" disabled={loading}>
          Delete Post
        </Button>
      </Form>
      {error && <Alert variant="danger">{error.message}</Alert>}
      {data && (
        <Alert variant="success">
          Post deleted successfully! ID: {id}
        </Alert>
      )}
    </div>
  );
};

export default DeletePost;