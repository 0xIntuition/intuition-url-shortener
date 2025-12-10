// Utility for extracting metadata from GraphQL term data
import type { Term, MetaData } from '../types/graphql.js'

// Default description for Intuition terms
const DEFAULT_DESCRIPTION = 'A decentralized protocol that empowers users to control data & digital identities. Using Atoms, Semantic Triples & Signal, it enables trusted information creation, verification & sharing across Web3, enhancing data sovereignty, collaboration & interoperability.'

/**
 * Extracts metadata from a term (atom or triple) for use in meta tags and previews
 * @param term - The term object from GraphQL containing either atom or triple data
 * @returns MetaData object with title, description, url, and imageUrl, or null if invalid
 */
export function extractMetadata(term: Term): MetaData | null {
  // Case 1: Atom
  if (term.atom) {
    const atom = term.atom

    return {
      title: atom.label || 'Intuition',
      description: atom.value?.json_object?.description || DEFAULT_DESCRIPTION,
      url: `https://portal.intuition.systems/explore/atom/${term.id}?tab=overview`,
      imageUrl: `https://portal.intuition.systems/resources/atom-image?id=${term.id}`
    }
  }

  // Case 2: Triple
  if (term.triple) {
    const triple = term.triple

    // Construct title from subject-predicate-object
    const subjectLabel = triple.subject.label || 'Unknown'
    const predicateLabel = triple.predicate.label || 'Unknown'
    const objectLabel = triple.object.label || 'Unknown'
    const title = `${subjectLabel} ${predicateLabel} ${objectLabel}`

    const description = ''

    return {
      title,
      description,
      url: `https://portal.intuition.systems/explore/triple/${term.id}`,
      imageUrl: `https://portal.intuition.systems/resources/triple-image?id=${term.id}`
    }
  }

  // Case 3: Malformed data (neither atom nor triple)
  return null
}
