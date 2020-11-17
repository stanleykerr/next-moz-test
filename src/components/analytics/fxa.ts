interface FxADataResult {
  "data-entrypoint": string
  "data-flow-id": string
  "data-flow-begin-time": string
}

export const FxAData = (id: string): FxADataResult => {
  return {
    "data-entrypoint": id,
    "data-flow-id": "",
    "data-flow-begin-time": "",
  }
}

export default FxAData
