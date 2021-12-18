export default class ServiceOptions {
  baseApiUrl: string;
  tokenProvider: () => Promise<string>;

  constructor(baseApiUrl: string, tokenProvider: () => Promise<string>) {
    this.baseApiUrl = baseApiUrl;
    this.tokenProvider = tokenProvider;
  }
}
