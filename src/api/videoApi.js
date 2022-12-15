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
  getUserLikedVideos(id) {
    const url = `/api/users/${id}/liked-videos`;
    return axiosClient.get(url);
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
  createVideo(
    description,
    upload_file,
    thumbnail_time,
    music,
    viewable,
    allows
  ) {
    const data = new FormData();
    data.append("description", description);
    data.append("upload_file", upload_file);
    data.append("thumbnail_time", thumbnail_time);
    data.append("music", music);
    data.append("viewable", viewable);
    data.append("allows", allows);
    return axiosClient.post("/api/videos", data);
  },
};
export default videoApi;
