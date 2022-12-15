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
  postComment(uuid, data) {
    const url = `/api/videos/${uuid}/comments`;
    return axiosClient.post(url, data);
  },
  deleteComment(id) {
    const url = `/api/comments/${id}`;
    return axiosClient.delete(url);
  },
  likeAVideo(id) {
    const url = `/api/videos/${id}/like`;
    return axiosClient.post(url);
  },
  unLikeAVideo(id) {
    const url = `/api/videos/${id}/unlike`;
    return axiosClient.post(url);
  },
  likeComment(id) {
    const url = `/api/comments/${id}/like`;
    return axiosClient.post(url);
  },
  unLikeComment(id) {
    const url = `/api/comments/${id}/unlike`;
    return axiosClient.post(url);
  },
};
export default videoApi;
