import {TypePost} from "./types/TypePost";

export const getAllPosts = async (): Promise<TypePost[]> => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        const posts: TypePost[] = await response.json();
        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}