import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS_AND_POSTS } from '../queries/Queries';
import { Alert, Button, Container, Row, Spinner, ButtonGroup } from 'react-bootstrap';

interface Post {
  title: string;
  body: string;
}

interface User {
  id: string;
  name: string;
  posts: {
    data: Post[];
  };
}

interface UsersData {
  users: {
    data: User[];
  };
}

const FilterPostsByUser: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { data, loading, error } = useQuery<UsersData>(GET_USERS_AND_POSTS);

  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId);
  };

  if (loading) {
    return <Spinner animation="border" />;
  }
  if (error) {
    return (
      <Alert variant="danger" dismissible>
        <Alert.Heading>Oh no! You got an error!</Alert.Heading>
        <p>{error.message}</p>
      </Alert>
    );
  }

  const selectedUser = data?.users.data.find(user => user.id === selectedUserId);

  return (
    <Container>
      <h1>Filter Posts by User</h1>
      <ButtonGroup className="mt-3">
        {data?.users.data.map((user) => (
          <Button
            key={user.id}
            onClick={() => handleSelectUser(user.id)}
            variant={selectedUserId === user.id ? 'primary' : 'secondary'}
          >
            {user.name}
          </Button>
        ))}
      </ButtonGroup>
      {selectedUserId && selectedUser && (
        <Row className="mt-3">
          {selectedUser.posts.data.map(({ title, body }, index) => (
            <ul key={index}>
              <li>
                <h3>Title: {title}</h3>
                <p><b>Body:</b> {body}</p>
              </li>
            </ul>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default FilterPostsByUser;