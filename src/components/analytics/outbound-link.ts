interface OutboundLinkResult {
  "data-ga-link": string
  "data-event-category": string
  "data-event-label": string
}

export const OutboundLink = (eventLabel: string): OutboundLinkResult => {
  return {
    "data-ga-link": "",
    "data-event-category": "Utility & Outbound Links",
    "data-event-label": eventLabel,
  }
}

export default OutboundLink
