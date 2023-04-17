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
  return axiosInstance.post('post/like', {id})
}

export async function addComment(id: number, text: string): Promise<AxiosResponse> {
  return axiosInstance.post('post/comment', {id, text})
}