// GraphQL client and query execution
import { GraphQLClient } from 'graphql-request'
import { GRAPHQL_ENDPOINT } from '../utils/env.js'
import type { GetTermQuery, GetTermQueryVariables } from '../types/graphql.js'

// GraphQL query from plans/query.graphql
const GET_TERM_QUERY = `
  query GetTerm($id: String!) {
    terms(where: { id: { _like: $id } }) {
      id
      atom {
        ...LightAtom
      }
      triple {
        subject {
          ...LightAtom
        }
        predicate {
          ...LightAtom
        }
        object {
          ...LightAtom
        }
      }
    }
  }

  fragment LightAtom on atoms {
    label
    value {
      json_object {
        description: data(path:"description")
      }
    }
  }
`

// Initialize GraphQL client
const client = new GraphQLClient(GRAPHQL_ENDPOINT)

/**
 * Fetch term data (atom or triple) by ID from Intuition GraphQL API
 * @param id - The term ID to fetch (will be wrapped with % for LIKE query)
 * @returns GraphQL query result or null if error occurs
 */
export async function fetchTerm(id: string): Promise<GetTermQuery | null> {
  try {
    // Use LIKE query with wildcards as per plans/query.graphql
    const data = await client.request<GetTermQuery, GetTermQueryVariables>(
      GET_TERM_QUERY,
      { id: `%${id}%` }
    )

    console.log(`GraphQL query successful for ID: ${id}`)
    return data
  } catch (error) {
    console.error(`GraphQL query failed for ID: ${id}`, error)
    return null
  }
}
