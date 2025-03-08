import {AxiosRequestConfig} from "axios";
import {http} from "~/services/core/http.ts";

export const fetchWithEtag = async (url: string, axiosConfig?: AxiosRequestConfig) => {
  const etagKey = axiosConfig?.params ? url + JSON.stringify(axiosConfig?.params) : url

  const etag = localStorage.getItem(`etag_${etagKey}`);
  console.log('etag', etag)

  const headers: Record<string, string> = {};
  if (etag) {
    headers["If-None-Match"] = etag;
  }

  try {
    const response = await http.get(url, { ...axiosConfig, headers: {...headers, ...axiosConfig?.headers} });
    console.log('response', response)

    if (response.status === 304) {
      console.log("Using cached data");
      return JSON.parse(localStorage.getItem(`data_${etagKey}`) || "{}");
    }

    const newEtag = response.headers["etag"];
    if (newEtag) {
      localStorage.setItem(`etag_${etagKey}`, newEtag);
    }

    localStorage.setItem(`data_${etagKey}`, JSON.stringify(response.data));

    return response.data;
  } catch (error: any) {
    if (error.response?.status === 304) {
      console.log("Using cached data");
      return JSON.parse(localStorage.getItem(`data_${etagKey}`) || "{}");
    }
    throw error;
  }
};