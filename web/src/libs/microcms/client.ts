'use server'

import type { MicroCMSDate, MicroCMSListResponse, MicroCMSQueries } from 'microcms-js-sdk'

import { createClient } from 'microcms-js-sdk'

export type Content<T> = T & MicroCMSDate
export type Page<T> = MicroCMSListResponse<T>
export type SearchQueries = Pick<MicroCMSQueries, 'limit' | 'offset'>

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN || 'local'
const apiKey = process.env.MICROCMS_API_KEY || 'microcms'

const client = createClient({
  serviceDomain,
  apiKey,
})

export async function getContent<T>(endpoint: string): Promise<Content<T> | undefined> {
  try {
    const response = await client.getObject<T>({
      endpoint,
    })
    return response
  } catch (e) {
    console.error(e)
  }
}

export async function searchContents<T>(endpoint: string, queries?: SearchQueries): Promise<Page<T>> {
  try {
    const response = await client.getList<T>({
      endpoint,
      queries,
    })
    return response
  } catch (e) {
    return {
      contents: [],
      totalCount: 0,
      limit: 0,
      offset: 0,
    }
  }
}

export async function createContent<T extends Record<string | number, unknown>>(
  endpoint: string,
  content: T,
): Promise<string | undefined> {
  try {
    const response = await client.create<T>({
      endpoint,
      content,
    })
    return response.id
  } catch (e) {
    console.error(e)
  }
}

export async function updateContent<T extends Record<string | number, unknown>>(
  endpoint: string,
  content: T,
): Promise<string | undefined> {
  try {
    const response = await client.update<T>({
      endpoint,
      content,
    })
    return response.id
  } catch (e) {
    console.error(e)
  }
}

async function deleteContent(endpoint: string, contentId: string) {
  try {
    await client.delete({
      endpoint,
      contentId,
    })
  } catch (e) {
    console.error(e)
  }
}
