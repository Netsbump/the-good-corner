/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AdsIndexImport } from './routes/ads.index'
import { Route as AdsAdIdImport } from './routes/ads.$adId'
import { Route as AdNewImport } from './routes/ad.new'

// Create Virtual Routes

const AboutLazyImport = createFileRoute('/about')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const AboutLazyRoute = AboutLazyImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const AdsIndexRoute = AdsIndexImport.update({
  path: '/ads/',
  getParentRoute: () => rootRoute,
} as any)

const AdsAdIdRoute = AdsAdIdImport.update({
  path: '/ads/$adId',
  getParentRoute: () => rootRoute,
} as any)

const AdNewRoute = AdNewImport.update({
  path: '/ad/new',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/ad/new': {
      id: '/ad/new'
      path: '/ad/new'
      fullPath: '/ad/new'
      preLoaderRoute: typeof AdNewImport
      parentRoute: typeof rootRoute
    }
    '/ads/$adId': {
      id: '/ads/$adId'
      path: '/ads/$adId'
      fullPath: '/ads/$adId'
      preLoaderRoute: typeof AdsAdIdImport
      parentRoute: typeof rootRoute
    }
    '/ads/': {
      id: '/ads/'
      path: '/ads'
      fullPath: '/ads'
      preLoaderRoute: typeof AdsIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/about': typeof AboutLazyRoute
  '/ad/new': typeof AdNewRoute
  '/ads/$adId': typeof AdsAdIdRoute
  '/ads': typeof AdsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/about': typeof AboutLazyRoute
  '/ad/new': typeof AdNewRoute
  '/ads/$adId': typeof AdsAdIdRoute
  '/ads': typeof AdsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/about': typeof AboutLazyRoute
  '/ad/new': typeof AdNewRoute
  '/ads/$adId': typeof AdsAdIdRoute
  '/ads/': typeof AdsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/about' | '/ad/new' | '/ads/$adId' | '/ads'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/about' | '/ad/new' | '/ads/$adId' | '/ads'
  id: '__root__' | '/' | '/about' | '/ad/new' | '/ads/$adId' | '/ads/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  AboutLazyRoute: typeof AboutLazyRoute
  AdNewRoute: typeof AdNewRoute
  AdsAdIdRoute: typeof AdsAdIdRoute
  AdsIndexRoute: typeof AdsIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AboutLazyRoute: AboutLazyRoute,
  AdNewRoute: AdNewRoute,
  AdsAdIdRoute: AdsAdIdRoute,
  AdsIndexRoute: AdsIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/ad/new",
        "/ads/$adId",
        "/ads/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/ad/new": {
      "filePath": "ad.new.tsx"
    },
    "/ads/$adId": {
      "filePath": "ads.$adId.tsx"
    },
    "/ads/": {
      "filePath": "ads.index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
