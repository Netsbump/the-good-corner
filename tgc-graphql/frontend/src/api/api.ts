import { graphql } from '@/gql';

export const GET_AD = graphql(`
  query Ad($adId: ID!) {
    ad(id: $adId) {
      id
      title
      description
      price
      owner
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
`)

export const GET_ALL_CATEGORIES = graphql(`
  query Categories {
    categories {
      name
      id
    }
  }
`);

export const GET_ALL_ADS = graphql(`
  query {
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
mutation updateAd($adData: AdInput!, $updateAdId: ID!) {
  updateAd(adData: $adData, id: $updateAdId) {
    title
    price
    owner
    picture
    location
    category {
      id
    }
  }
}
`);

export const CREATE_AD = graphql(`
mutation createAd($adData: AdInput!) {
  createAd(adData: $adData) {
    title
    owner
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