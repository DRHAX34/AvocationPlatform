import BaseService from "@/services/baseService";
import { AxiosResponse } from "axios";
import ServiceOptions from "./serviceOptions";

export default class ApiService extends BaseService {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static install(Vue: any, options: ServiceOptions) {
    const ApiServiceInstance = new ApiService(options);
    Vue.prototype["$ApiService"] = ApiServiceInstance;
  }

  constructor(options: ServiceOptions) {
    super(options);
  }

  async Get(
    controller: string,
    rq: unknown
  ): Promise<AxiosResponse<unknown, unknown>> {
    return await this.httpService.get(
      controller + "/Get",
      await this.getDefaultHeaders()
    );
  }

  async InsertUpdate(
    controller: string,
    rq: unknown
  ): Promise<AxiosResponse<unknown, unknown>> {
    return await this.httpService.post(
      controller + "/InsertUpdate",
      rq,
      await this.getDefaultHeaders()
    );
  }

  async Delete(
    controller: string,
    Id: string
  ): Promise<AxiosResponse<unknown, unknown>> {
    return await this.httpService.delete(controller + "/Delete", {
      ...(await this.getDefaultHeaders()),
      params: {
        Id,
      },
    });
  }
}
