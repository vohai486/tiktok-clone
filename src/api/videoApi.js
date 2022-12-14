import axiosClient from "./axiosClient";
const videoApi = {
  getVideo(id) {
    const url = `/api/videos/${id}`;
    return axiosClient.get(url);
  },
  getListVideo(params) {
    const url = `/api/videos`;
    return axiosClient.get(url, { params });
  },
  getListVideoComment(id) {
    const url = `/api/videos/${id}/comments`;
    return axiosClient.get(url);
  },
};
export default videoApi;
