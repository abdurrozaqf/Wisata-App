import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { Availability, Request } from "@/utils/types/api";
import { Property } from "@/utils/apis/stay";

export const getProperty = async (params?: Request) => {
  try {
    const response = await axiosWithConfig.get(`/property?id=${params?.id}`);

    return response.data[params?.id!] as Property;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getAvailability = async (params?: Request) => {
  try {
    let query = "";

    if (params) {
      const queryParams: string[] = [];

      let key: keyof typeof params;
      for (key in params) {
        queryParams.push(`${key}=${params[key]}`);
      }

      query = queryParams.join("&");
    }

    const response = await axiosWithConfig.get(
      `/property/availability/${params?.id}?${query}`
    );

    return response.data as Availability;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
