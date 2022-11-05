import axios from 'axios'
import * as qs from 'query-string'
import { SSO_PROVIDER } from '../enums'
import { ISSOHandler } from './SSO_handler_interface'

export class KakaoOauthHandler implements ISSOHandler {
  code
  grant_type = 'authorization_code'
  rest_api_key = process.env.KAKAO_REST_API_KEY
  token_auth_url = process.env.KAKAO_OAUTH_URL
  user_info_url = process.env.KAKAO_OAUTH_USER_INFO_URL
  redirect_uri = process.env.KAKAO_OAUTH_REDIRECT_URI
  client_secret = process.env.KAKAO_OAUTH_CLIENT_SECRET
  headers = {
    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  }
  access_token = null
  kakao_user_id

  constructor(code) {
    this.code = code
  }

  async tokenGetter() {
    const data = qs.stringify({
      grant_type: this.grant_type,
      client_id: this.rest_api_key,
      redirect_uri: this.redirect_uri,
      code: this.code,
      client_secret: this.client_secret,
    })

    const response = await axios.post(this.token_auth_url, data, {
      headers: this.headers,
    })

    if (response.status === 200) {
      this.access_token = response.data.access_token
      return this.access_token
    }
  }
  async userIdGetter() {
    if (!this.access_token) await this.tokenGetter()

    const { data: userInfo } = await axios.get(this.user_info_url, {
      headers: {
        Authorization: `Bearer ${this.access_token}`,
      },
    })

    this.kakao_user_id = userInfo.id
    return `${SSO_PROVIDER.KAKAO}_${this.kakao_user_id}`
  }
}
