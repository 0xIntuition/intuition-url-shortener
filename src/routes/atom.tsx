// Route handler for /atom/:id
import { Hono } from 'hono'
import { fetchTerm } from '../services/graphql.js'
import { AtomPage } from '../components/AtomPage.js'
import { ErrorPage } from '../components/ErrorPage.js'

export const atomRoute = new Hono()

// Default description for Intuition atoms
const DEFAULT_DESCRIPTION = 'A decentralized protocol that empowers users to control data & digital identities. Using Atoms, Semantic Triples & Signal, it enables trusted information creation, verification & sharing across Web3, enhancing data sovereignty, collaboration & interoperability.'

atomRoute.get('/:id', async (c) => {
  const id = c.req.param('id')

  console.log(`Processing atom request for ID: ${id}`)

  // Fetch data from GraphQL
  const data = await fetchTerm(id)

  // Check for no results
  if (!data?.terms || data.terms.length === 0) {
    console.log(`No atom found for ID: ${id}`)
    return c.html(<ErrorPage />, 404)
  }

  // Check for ambiguous match (multiple results)
  if (data.terms.length > 1) {
    console.log(`Ambiguous match: ${data.terms.length} results found for ID: ${id}`)
    return c.html(<ErrorPage />, 404)
  }

  // Check for wrong type (triple instead of atom)
  if (!data.terms[0].atom) {
    console.log(`Wrong type: Found triple instead of atom for ID: ${id}`)
    return c.html(<ErrorPage />, 404)
  }

  const term = data.terms[0]
  const atom = term.atom!

  // Extract metadata with fallbacks
  const title = atom.label || 'Intuition'
  const description = atom.value?.json_object?.description || DEFAULT_DESCRIPTION
  const url = `https://portal.intuition.systems/explore/atom/${term.id}?tab=overview`
  const imageUrl = `https://portal.intuition.systems/resources/atom-image?id=${term.id}`

  console.log(`Rendering atom page for: ${title}`)

  return c.html(
    <AtomPage
      title={title}
      description={description}
      url={url}
      imageUrl={imageUrl}
    />
  )
})
