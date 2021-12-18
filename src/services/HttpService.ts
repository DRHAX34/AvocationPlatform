import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export default class HttpService {
  baseApiUrl: string;
  httpClient: AxiosInstance;
  options = {};

  constructor(baseApiUrl: string, options = {}) {
    this.baseApiUrl = baseApiUrl;
    this.options = options;
    this.httpClient = axios.create({
      baseURL: this.baseApiUrl,
      timeout: 100000,
      transformResponse: [
        function (data) {
          return data;
        },
      ],
    });
  }

  async get(
    url: string,
    config: AxiosRequestConfig<unknown> | undefined
  ): Promise<AxiosResponse<unknown, unknown>> {
    return await this.httpClient.get(
      this.normalize(this.baseApiUrl, url),
      config
    );
  }

  /**
   * @param {String} url
   * @param {Object} data
   * @returns {*|Promise<any>}
   */
  async post(
    url: string,
    data: unknown,
    config: AxiosRequestConfig<unknown> | undefined
  ): Promise<AxiosResponse<unknown, unknown>> {
    return await this.httpClient.post(
      this.normalize(this.baseApiUrl, url),
      data,
      config
    );
  }

  /**
   * @param {String} url
   * @returns {*|Promise<any>}
   */
  async delete(
    url: string,
    config: AxiosRequestConfig<unknown> | undefined
  ): Promise<AxiosResponse<unknown, unknown>> {
    return await this.httpClient.delete(
      this.normalize(this.baseApiUrl, url),
      config
    );
  }

  /**
   * @param {String} start
   * @param {String} end
   * @returns {String}
   */
  normalize(start: string, end: string): string {
    return `${start}/${end}`.replace(/([^:]\/)\/+/g, "$1");
  }
}
