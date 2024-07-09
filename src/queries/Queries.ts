import { gql } from '@apollo/client'


export const GET_POSTS = gql`
    query {
        posts {
            data {
                id
                title
                body
                user {
                    id
                }
            }
        }
}

`

export const GET_USERS_AND_POSTS = gql`
  query {
    users {
      data {
        id
        name
        posts {
          data {
            title
            body
          }
        }
      }
    }
  }
`;