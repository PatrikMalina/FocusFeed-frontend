import {AxiosResponse} from 'axios';
import axiosInstance from './AxiosInstance';

export async function checkMe(): Promise<AxiosResponse> {
  return axiosInstance.get('auth/me');
}

export async function myPosts(): Promise<AxiosResponse> {
  return axiosInstance.get('post/myposts');
}

export async function allPosts(): Promise<AxiosResponse> {
  return axiosInstance.get('post/allposts');
}

export async function postById(id: number): Promise<AxiosResponse> {
  return axiosInstance.get(`post/postbyid/${id}`);
}

export async function likePost(id: number): Promise<AxiosResponse> {
  return axiosInstance.post('post/like', {id});
}

export async function getChats() {
  return axiosInstance.get('chat');
}

export async function getFriends() {
  return axiosInstance.get('friends');
}

export async function addComment(
  id: number,
  text: string,
): Promise<AxiosResponse> {
  return axiosInstance.post('post/comment', {id, text});
}

export async function createPost(
  caption: string,
  picture: string,
  longitude: number | undefined,
  latitude: number | undefined,
): Promise<AxiosResponse> {
  return axiosInstance.post('post/create', {
    caption,
    picture,
    longitude,
    latitude,
  });
}

export async function deletePost(id: number): Promise<AxiosResponse> {
  return axiosInstance.delete(`post/delete/${id}`);
}

export async function updateProfile(data: any): Promise<AxiosResponse> {
  return axiosInstance.put('user/updateuser', {data});
}

export async function getMessages(
  chatId: number,
  paging: number = 1,
  perPage: number = 10,
): Promise<AxiosResponse> {
  return axiosInstance.put('chat/loadMessages', {
    chatId,
    paging,
    perPage,
  });
}
