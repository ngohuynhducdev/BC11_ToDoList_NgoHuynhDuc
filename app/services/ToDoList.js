import { API_URL } from "../config/constants.js";

export default class ToDoList {
  callApi(uri, method, data) {
    return axios({
      url: API_URL + "/" + uri,
      method,
      data,
    });
  }
}
