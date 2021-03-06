import * as Types from '../../../__generated__/graphqlOperations';

import gql from 'graphql-tag';
export type ProductCardFragment = { __typename?: 'Product', id: string, title: string, description: string, image: string };

export const ProductCardFragmentDoc = gql`
    fragment ProductCard on Product {
  id
  title
  description
  image
}
    `;