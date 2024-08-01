'use server'

import { createClient, type MicroCMSDate, type MicroCMSListResponse } from 'microcms-js-sdk'

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN || 'local'
const apiKey = process.env.MICROCMS_API_KEY || 'microcms'

const client = createClient({
  serviceDomain,
  apiKey,
})

export async function getContent<T>(endpoint: string): Promise<(T & MicroCMSDate) | undefined> {
  try {
    const response = await client.getObject<T>({
      endpoint,
    })
    return response
  } catch (e) {
    console.error(e)
  }
}

export async function searchContents<T>(endpoint: string): Promise<MicroCMSListResponse<T>> {
  try {
    const response = await client.getList<T>({
      endpoint,
    })
    return response
  } catch (e) {
    console.error(e)
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
