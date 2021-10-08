import axios from "axios";
import Cookies from "js-cookie";

const Axios = axios.create({
  baseURL: "https://groupomania-social.herokuapp.com/api",
  headers: { Authorization: `Bearer ${Cookies.get("user") ? JSON.parse(Cookies.get("user")).token : ""}` },
});

// const Axios = axios.create({
//   baseURL: "http://localhost:5500/api",
//   headers: { Authorization: `Bearer ${token}` },
// });

export const createPost = (post) => Axios.post("/post/post", post).then((res) => res.data);

export const selectPost = (param) => Axios.get(`/post${param}`).then((res) => res.data);

export const updatePost = ({ id, content }) => Axios.put(`/post/update/${id}`, content).then((res) => res.data);

export const deletePost = (id) => Axios.delete(`/post/delete/${id}`).then((res) => res.data);

// -----------
// --------------
// -----------

export const createUser = (user) => Axios.post("/user/register", user).then((res) => res.data);

export const loginUser = (user) => Axios.post("/user/login", user).then((res) => res.data);

export const selectAllUsers = () => Axios.get("/user/all").then((res) => res.data);

export const selectOneUser = (id) => Axios.get(`/user/${id}`).then((res) => res.data);

export const updateUserAvatar = ({ id, avatar }) => Axios.put(`/user/update/avatar/${id}`, avatar).then((res) => res.data);

export const updateUserCover = ({ id, cover }) => Axios.put(`/user/update/cover/${id}`, cover).then((res) => res.data);

export const updateUserInfos = ({ id, user }) => Axios.put(`/user/update/infos/${id}`, user).then((res) => res.data);

export const deleteUser = (id) => Axios.delete(`/user/delete/${id}`).then((res) => res.data);

// -----------
// --------------
// -----------

export const whoLiked = (postId) => Axios.get(`/like/${postId}/who`).then((res) => res.data);

export const addLike = ({ postId, userId }) => Axios.post(`/like/${postId}/like/${userId}`).then((res) => res.data);

export const removeLike = ({ postId, userId }) => Axios.delete(`/like/${postId}/dislike/${userId}`).then((res) => res.data);

// -----------
// --------------
// -----------

export const selectCommentsByPost = (postId) => Axios.get(`/comment/${postId}/comments`).then((res) => res.data);

export const createComment = ({ postId, userId, content }) =>
  Axios.post(`/comment/${postId}/post/${userId}`, { content }).then((res) => res.data);

export const deleteComment = ({ postId, commentId }) => Axios.delete(`/comment/${postId}/delete/${commentId}`).then((res) => res.data);
