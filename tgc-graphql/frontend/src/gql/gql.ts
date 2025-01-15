/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query Ad($adId: ID!) {\n    ad(id: $adId) {\n      id\n      title\n      description\n      price\n      picture\n      location\n      category {\n        id\n        name\n      }\n      tags {\n        id\n        name\n      }\n    }\n  }\n": types.AdDocument,
    "\n  query Categories {\n    categories {\n      name\n      id\n    }\n  }\n": types.CategoriesDocument,
    "\n  query GetAllAds {\n    ads {\n      id\n      picture\n      price\n      title\n      tags {\n        id\n        name\n      }\n      category {\n        name\n      }\n    }\n  }\n": types.GetAllAdsDocument,
    "\n  query Ads($categoryIds: [ID!]) {\n    ads(categoryIds: $categoryIds) {\n      id\n      picture\n      price\n      title\n      tags {\n        id\n        name\n      }\n      category {\n        name\n      }\n    }\n  }\n": types.AdsDocument,
    "\n  mutation deleteAd($id: ID!) {\n    deleteAd(id: $id)\n  }\n": types.DeleteAdDocument,
    "\n  mutation updateAd($adData: AdInput!, $updateAdId: ID!) {\n    updateAd(adData: $adData, id: $updateAdId) {\n      title\n      price\n      picture\n      location\n      category {\n        id\n      }\n    }\n  }\n": types.UpdateAdDocument,
    "\n  mutation createAd($adData: AdInput!) {\n    createAd(adData: $adData) {\n      title\n      price\n      picture\n      location\n      category {\n        id\n      }\n    }\n  }\n": types.CreateAdDocument,
    "\n  query Tags {\n    tags {\n      name\n      id\n    }\n  }\n": types.TagsDocument,
    "\n  query userByEmail($email: String!) {\n    userByEmail(email: $email) {\n      id\n      email\n    }\n  }\n": types.UserByEmailDocument,
    "\n  mutation CreateUser($userData: UserCreateInput!) {\n    createUser(userData: $userData) {\n      id\n      email\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      token\n      user {\n        id\n        email\n      }\n    }\n  }\n": types.SignInDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Ad($adId: ID!) {\n    ad(id: $adId) {\n      id\n      title\n      description\n      price\n      picture\n      location\n      category {\n        id\n        name\n      }\n      tags {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query Ad($adId: ID!) {\n    ad(id: $adId) {\n      id\n      title\n      description\n      price\n      picture\n      location\n      category {\n        id\n        name\n      }\n      tags {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Categories {\n    categories {\n      name\n      id\n    }\n  }\n"): (typeof documents)["\n  query Categories {\n    categories {\n      name\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllAds {\n    ads {\n      id\n      picture\n      price\n      title\n      tags {\n        id\n        name\n      }\n      category {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllAds {\n    ads {\n      id\n      picture\n      price\n      title\n      tags {\n        id\n        name\n      }\n      category {\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Ads($categoryIds: [ID!]) {\n    ads(categoryIds: $categoryIds) {\n      id\n      picture\n      price\n      title\n      tags {\n        id\n        name\n      }\n      category {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query Ads($categoryIds: [ID!]) {\n    ads(categoryIds: $categoryIds) {\n      id\n      picture\n      price\n      title\n      tags {\n        id\n        name\n      }\n      category {\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteAd($id: ID!) {\n    deleteAd(id: $id)\n  }\n"): (typeof documents)["\n  mutation deleteAd($id: ID!) {\n    deleteAd(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateAd($adData: AdInput!, $updateAdId: ID!) {\n    updateAd(adData: $adData, id: $updateAdId) {\n      title\n      price\n      picture\n      location\n      category {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation updateAd($adData: AdInput!, $updateAdId: ID!) {\n    updateAd(adData: $adData, id: $updateAdId) {\n      title\n      price\n      picture\n      location\n      category {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createAd($adData: AdInput!) {\n    createAd(adData: $adData) {\n      title\n      price\n      picture\n      location\n      category {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createAd($adData: AdInput!) {\n    createAd(adData: $adData) {\n      title\n      price\n      picture\n      location\n      category {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Tags {\n    tags {\n      name\n      id\n    }\n  }\n"): (typeof documents)["\n  query Tags {\n    tags {\n      name\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query userByEmail($email: String!) {\n    userByEmail(email: $email) {\n      id\n      email\n    }\n  }\n"): (typeof documents)["\n  query userByEmail($email: String!) {\n    userByEmail(email: $email) {\n      id\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUser($userData: UserCreateInput!) {\n    createUser(userData: $userData) {\n      id\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($userData: UserCreateInput!) {\n    createUser(userData: $userData) {\n      id\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      token\n      user {\n        id\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SignIn($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      token\n      user {\n        id\n        email\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;