import { graphql } from '@/gql';

export const GET_AD = graphql(`
  query Ad($adId: ID!) {
    ad(id: $adId) {
      id
      title
      description
      price
      picture
      location
      category {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`);

export const GET_ALL_CATEGORIES = graphql(`
  query Categories {
    categories {
      name
      id
    }
  }
`);

export const GET_ALL_ADS = graphql(`
  query GetAllAds {
    ads {
      id
      picture
      price
      title
      tags {
        id
        name
      }
      category {
        name
      }
    }
  }
`);

export const GET_ADS = graphql(`
  query Ads($categoryIds: [ID!]) {
    ads(categoryIds: $categoryIds) {
      id
      picture
      price
      title
      tags {
        id
        name
      }
      category {
        name
      }
    }
  }
`);

export const DELETE_AD = graphql(`
  mutation deleteAd($id: ID!) {
    deleteAd(id: $id)
  }
`);

export const UPDATE_AD = graphql(`
  mutation updateAd($adData: AdUpdateInput!, $updateAdId: ID!) {
    updateAd(adData: $adData, id: $updateAdId) {
      title
      price
      picture
      location
      category {
        id
      }
    }
  }
`);

export const CREATE_AD = graphql(`
  mutation createAd($adData: AdCreateInput!) {
    createAd(adData: $adData) {
      title
      price
      picture
      location
      category {
        id
      }
    }
  }
`);

export const GET_TAGS = graphql(`
  query Tags {
    tags {
      name
      id
    }
  }
`);

export const GET_USER_BY_EMAIL = graphql(`
  query userByEmail($email: String!) {
    userByEmail(email: $email) {
      id
      email
    }
  }
`);

export const CREATE_USER = graphql(`
  mutation CreateUser($userData: UserCreateInput!) {
    createUser(userData: $userData) {
      id
      email
    }
  }
`);

export const SIGN_IN = graphql(`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`);

export const SIGN_OUT = graphql(`
  mutation SignOut {
    signOut
  }
`);

export const GET_CURRENT_USER = graphql(`
  query Me {
    me {
      id
      email
    }
  }
`);