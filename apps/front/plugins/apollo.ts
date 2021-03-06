import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import possibleTypes from '@/__generated__/introspection-result'

export default defineNuxtPlugin((nuxtApp) => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql'
  })
  const cache = new InMemoryCache(possibleTypes)

  let apolloClient
  if (process.server) {
    apolloClient = new ApolloClient({
      link: httpLink,
      cache,
      ssrMode: true
    })
    nuxtApp.hook('app:rendered', () => {
      nuxtApp.payload.data['apollo-data'] = apolloClient.extract()
    })
  } else {
    cache.restore(
      JSON.parse(JSON.stringify(nuxtApp.payload.data['apollo-data']))
    )

    apolloClient = new ApolloClient({
      link: httpLink,
      cache,
      ssrForceFetchDelay: 100
    })
  }
  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient)
})
