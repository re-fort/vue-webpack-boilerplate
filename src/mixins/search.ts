// Mixin for search
import Vue from 'vue'
import { Component }from 'vue-property-decorator'
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { IRepoAPIResponse, IUserAPIResponse } from 'src/interfaces/api'
import { namespace } from 'src/store/helper'
import { Xhr } from 'src/api/index'

const { State: AuthState } = namespace('Auth')

@Component
export default class SearchMixin extends Vue {
  @AuthState token: string

  errorMessage: string = ''
  items: Array<IRepoAPIResponse | IUserAPIResponse> = []
  isLoading: boolean = false
  page: number = 1

  requestStart() {
    this.errorMessage = ''
    this.items = []
    this.isLoading = true
  }
  async search(url: string, options: AxiosRequestConfig = {}) {
    try {
      this.requestStart()
      const res = this.token ?
        await Xhr.getWithToken(url, options, this.token) : await Xhr.getWithoutToken(url, options)
      this.success(res)
    } catch(e) {
      this.error(e)
    } finally {
      this.requestEnd()
    }
  }
  success(response: AxiosResponse) {
    this.items = response.data.items
    this.page = 1
  }
  error(error: AxiosError) {
    if (!error.response) return
    switch(error.response.status) {
      case 401:
        this.errorMessage = 'Required (re)authentication'
        break
      case 403:
        this.errorMessage = 'API rate limit exceeded'
        break
      default:
        this.errorMessage = error.response.data.errorMessage
    }
  }
  requestEnd() {
    this.isLoading = false
  }
}
