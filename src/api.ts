import {TypePost} from "./types/TypePost";

export const getAllPosts = async (): Promise<TypePost[]> => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
             Error('Failed to fetch posts');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

export const getPostById = async (postId: number): Promise<TypePost> => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        if (!response.ok) {
            Error('Failed to fetch post');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error; // Лучше пробросить ошибку дальше, чтобы можно было обработать её в компоненте
    }
}