// TypeScript types matching the GraphQL schema from plans/query.graphql

export interface LightAtom {
  label: string | null
  value: {
    json_object: {
      description: string | null
    } | null
  } | null
}

export interface Triple {
  subject: LightAtom
  predicate: LightAtom
  object: LightAtom
}

export interface Term {
  id: string
  atom: LightAtom | null
  triple: Triple | null
}

export interface GetTermQuery {
  terms: Term[]
}

export interface GetTermQueryVariables {
  id: string
}

export interface MetaData {
  title: string
  description: string
  url: string
  imageUrl: string
}
