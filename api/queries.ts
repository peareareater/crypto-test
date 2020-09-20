import { gql } from '@apollo/client';

const GET_ROBOTS = gql`
  query GetRobots($limit: Int, $offset: Int) {
    robots(limit: $limit, offset: $offset) {
      code
      id
      settings
    }
  }
`;

export { GET_ROBOTS }