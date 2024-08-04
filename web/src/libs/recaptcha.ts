type SiteverifyResponse = {
  success: boolean
  challengeTs?: Date // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
  hostname?: string // the hostname of the site where the reCAPTCHA was solved
  score: number
  action: string
  errorCodes?: unknown[] // optional
}

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY!
const GOODLE_BASE_URL = process.env.GOODLE_BASE_URL || 'https://www.google.com'

export async function siteverify(token: string): Promise<SiteverifyResponse> {
  const response = await fetch(`${GOODLE_BASE_URL}/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      secret: RECAPTCHA_SECRET_KEY,
      response: token,
    }),
  })
  const json = await response.json()

  return {
    success: json['success'],
    challengeTs: new Date(json['challenge_ts']),
    hostname: json['hostname'],
    score: json['score'],
    action: json['action'],
    errorCodes: json['error-codes'],
  }
}
