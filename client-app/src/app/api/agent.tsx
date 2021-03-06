import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";

axios.defaults.baseURL = "http://localhost:5000/api/";

const responseBoyd = <T,>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T,>(url: string) => axios.get<T>(url).then(responseBoyd),
  post: <T,>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBoyd),
  put: <T,>(url: string, body: {}) =>
    axios.put<T>(url, body).then(responseBoyd),
  del: <T,>(url: string) => axios.delete<T>(url).then(responseBoyd),
};

const Activities = {
  list: () => request.get<Activity[]>("/activities"),
  details: (id: string) => request.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => request.post<void>("/activities", activity),
  update: (activity: Activity) =>
    request.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => request.del<void>(`/activities/${id}`),
};

const agent = {
  Activities,
};

export default agent;
