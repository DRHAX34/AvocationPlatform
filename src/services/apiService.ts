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

  Picture(controller: string, id: string): string {
    return this.httpService.baseApiUrl + "/" + controller + "/Picture?Id=" + id;
  }

  async PutPicture(
    controller: string,
    id: string,
    PictureFormData: FormData
  ): Promise<AxiosResponse<unknown, unknown>> {
    return await this.httpService.put(
      controller + "/Picture?Id=" + id,
      PictureFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(await this.getDefaultHeaders()).headers,
        },
      }
    );
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
