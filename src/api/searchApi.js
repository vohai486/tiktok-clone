import axiosClient from "./axiosClient";
const searchApi = {
  searchUser(params) {
    const url = "/api/users/search";
    return axiosClient.get(url, { params });
  },
};
export default searchApi;
