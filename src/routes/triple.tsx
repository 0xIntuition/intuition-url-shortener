// Route handler for /triple/:id
import { Hono } from 'hono'
import { fetchTerm } from '../services/graphql.js'
import { TriplePage } from '../components/TriplePage.js'
import { ErrorPage } from '../components/ErrorPage.js'

export const tripleRoute = new Hono()

// Default description for Intuition triples
const DEFAULT_DESCRIPTION = 'A decentralized protocol that empowers users to control data & digital identities. Using Atoms, Semantic Triples & Signal, it enables trusted information creation, verification & sharing across Web3, enhancing data sovereignty, collaboration & interoperability.'

tripleRoute.get('/:id', async (c) => {
  const id = c.req.param('id')

  console.log(`Processing triple request for ID: ${id}`)

  // Fetch data from GraphQL
  const data = await fetchTerm(id)

  // Check if triple data exists
  if (!data?.terms?.[0]?.triple) {
    console.log(`No triple found for ID: ${id}`)
    return c.html(<ErrorPage />, 404)
  }

  const triple = data.terms[0].triple

  // Construct title from subject-predicate-object
  const subjectLabel = triple.subject.label || 'Unknown'
  const predicateLabel = triple.predicate.label || 'Unknown'
  const objectLabel = triple.object.label || 'Unknown'
  const title = `${subjectLabel} - ${predicateLabel} - ${objectLabel}`

  // Try to get description from subject or predicate, fallback to default
  const description =
    triple.subject.value?.json_object?.description ||
    triple.predicate.value?.json_object?.description ||
    DEFAULT_DESCRIPTION

  const url = `https://portal.intuition.systems/explore/triple/${id}`
  const imageUrl = `https://portal.intuition.systems/resources/triple-image?id=${id}`

  console.log(`Rendering triple page for: ${title}`)

  return c.html(
    <TriplePage
      title={title}
      description={description}
      url={url}
      imageUrl={imageUrl}
    />
  )
})
