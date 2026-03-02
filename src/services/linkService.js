// const Link = require('../daatabasePersistence/models/Link');

function normalizeUrl(value) {
  if (typeof value !== 'string') {
    throw new Error('Invalid URL structure', { cause: 'ValidationError' })
  }

  const trimmed = value.trim()

  if (trimmed.length === 0) {
    throw new Error('Invalid URL structure', { cause: 'ValidationError' })
  }

  const withProtocol = trimmed.includes('://')
    ? trimmed
    : 'https://' + trimmed

  try {
    return new URL(withProtocol).href
  } catch {
    throw new Error('Invalid URL structure', { cause: 'ValidationError' })
  }
}




function extractTags(links) {
  return links.map(l => l.tag)
}

module.exports = { normalizeUrl, extractTags }

