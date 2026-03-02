const { normalizeUrl, extractTags } = require('../src/services/linkService')

describe('normalizeUrl', () => {
  it('returns value unchanged if it already has a protocol', () => {
    expect(normalizeUrl('https://example.com')).toBe('https://example.com/')
  })

  it('prepends https:// if protocol is missing', () => {
    expect(normalizeUrl('example.com')).toBe('https://example.com/')
  })

  it('trims whitespace', () => {
    expect(normalizeUrl('  https://example.com ')).toBe('https://example.com/')
  })

  it('throws err on invalid URL structure', () => {
    expect(() => normalizeUrl('not a url!!')).toThrow('Invalid URL structure')
  })

  it('throws err on null, empty string, and non-string input', () => {
    expect(() => normalizeUrl(null)).toThrow('Invalid URL structure')
    expect(() => normalizeUrl('')).toThrow('Invalid URL structure')
    expect(() => normalizeUrl(444)).toThrow('Invalid URL structure')
  })
  })

describe('extractTags', () => {
  it('returns array of tags from links', () => {
    const links = [{ tag: 'news' }, { tag: 'dev' }]
    expect(extractTags(links)).toEqual(['news', 'dev'])
  })

  it('returns empty array for empty input', () => {
    expect(extractTags([])).toEqual([])
  })
})