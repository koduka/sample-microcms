type NewContents<T> = {
  id: string
  status: string[]
  draftKey: string | null
  publishValue: T
}

export function toNewContents<T>(object: never): NewContents<T> {
  const contents = object['contents']
  return {
    id: contents['new']['id'],
    status: contents['new']['status'],
    draftKey: contents['new']['draftKey'],
    publishValue: contents['new']['publishValue'],
  }
}
