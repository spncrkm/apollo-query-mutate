import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_POSTS } from '../queries/Queries';
import { Alert, Button, Container, Row, Spinner, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DELETE_POST } from '../mutations/Mutations';

interface User {
  id: string;
}

interface Post {
  id: string;
  title: string;
  body: string;
  user: User;
}

interface PostsData {
  posts: {
    data: Post[];
  };
}

const PostListPage: React.FC = () => {
  const { data, loading, error, refetch } = useQuery<PostsData>(GET_POSTS);
  const [show, setShow] = useState(false); // having a show state to implement a button to render on page to show post and user id
  const [deletePost] = useMutation(DELETE_POST);

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

  const handleShow = () => setShow((prevShow) => !prevShow); // setting show state to true --prevShow = false so to set to true !prevShow

  const handleDelete = async (postId: string) => { // i cant simulate the delete button to actually delete it on the page 
    try {
      console.log('Deleting post with ID:', postId);
      const { data: deleteData } = await deletePost({ variables: { id: postId } });
      console.log('Delete Mutation Response:', deleteData);
      await refetch();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <Container>
      <h1>All Posts</h1>
      {/* i know this wasn't asked for but i wanted to practice being able to manipulate the page  */}
      <Button onClick={handleShow}> 
        {show ? 'Hide User and Post IDs' : 'Show User and Post IDs'}
      </Button>
      <Button className="ms-3">
          <Link className='text-white' to={`/user`} >Users
          </Link>
      </Button>
      <ButtonGroup className="mt-3">
        <Link to="/create-post" className="btn btn-primary">
          Create Post
        </Link>
        <Link to="/update-post" className="btn btn-warning">
          Update Post
        </Link>
      </ButtonGroup>
      <Row>
        {data?.posts.data.map(({ id, title, body, user }) => (
          <ul key={id}>
            <li>
              {show && (
                <>
                  <p>Post ID: {id}</p>
                  <p>User ID: {user.id}</p>
                </>
              )}
              <h3>Title: {title}</h3>
              <p><b>Body:</b> {body}</p>
              <Button variant="danger" onClick={() => handleDelete(id)}>
                Delete
              </Button>
            </li>
          </ul>
        ))}
      </Row>
    </Container>
  );
};

export default PostListPage;