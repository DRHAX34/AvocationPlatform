import { AxiosRequestConfig } from "axios";
import HttpService from "@/services/HttpService";
import ServiceOptions from "./serviceOptions";

export default class BaseService {
  tokenProvider: () => Promise<string>;
  httpService: HttpService;

  constructor(options: ServiceOptions) {
    this.httpService = new HttpService(options.baseApiUrl, options);
    this.tokenProvider = options.tokenProvider;
  }

  setTokenProvider(tokenProvider: () => Promise<string>): void {
    this.tokenProvider = tokenProvider;
  }

  async getDefaultHeaders(): Promise<AxiosRequestConfig> {
    return {
      headers: {
        Authorization: "Bearer " + (await this.tokenProvider()),
      },
    };
  }
}
