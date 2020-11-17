interface InternalLinkResult {
  "data-ga-link": string
  "data-event-category": string
  "data-event-label": string
}

export const InternalLink = (eventLabel: string): InternalLinkResult => {
  return {
    "data-ga-link": "",
    "data-event-category": "Internal Link",
    "data-event-label": eventLabel,
  }
}

export default InternalLink
