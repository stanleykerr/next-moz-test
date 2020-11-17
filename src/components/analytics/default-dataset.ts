interface DefaultDatasetResult {
  "data-server-url": string
  "data-logos-origin": string
  "data-fxa-enabled": string
  "data-fxa-address": string
  "data-utm_source": string
  "data-signed-in-user": string
}

// TODO: Actually use variables here
export const DefaultDataset = (signedIn = false): DefaultDatasetResult => {
  return {
    "data-server-url": "",
    "data-logos-origin": "",
    "data-fxa-enabled": "fxa-enabled",
    "data-fxa-address": "",
    "data-utm_source": "",
    "data-signed-in-user": signedIn.toString(),
  }
}

export default DefaultDataset
