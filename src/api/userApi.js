import axiosClient from "./axiosClient";
const userApi = {
  login(data) {
    const url = "/api/auth/login";
    return axiosClient.post(url, data);
  },
  register(data) {
    const url = "/api/auth/register";
    return axiosClient.post(url, data);
  },
  getSuggestedUser(params) {
    const url = "/api/users/suggested";
    return axiosClient.get(url, { params });
  },
  getInfoUser(nickname) {
    const url = `api/users/@${nickname}`;
    return axiosClient.get(url);
  },

  updateCurrentUser(first_name, last_name, bio, avatar) {
    const data = new FormData();
    data.append("first_name", first_name);
    data.append("last_name", last_name);
    if (avatar) {
      data.append("avatar", avatar);
    }
    data.append("bio", bio);
    return axiosClient.post("/api/auth/me?_method=PATCH", data);
  },
  followAUser(id) {
    const url = `/api/users/${id}/follow`;
    return axiosClient.post(url);
  },
  unFollowAUser(id) {
    const url = `/api/users/${id}/unfollow`;
    return axiosClient.post(url);
  },

  getFollowingsList(params) {
    const url = "/api/me/followings";
    return axiosClient.get(url, { params });
  },
};
export default userApi;
