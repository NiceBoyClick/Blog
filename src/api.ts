import {TypePost} from "./types/TypePost";

export const getAllPosts = async (searchQuery = ''): Promise<TypePost[]> => {
    try {
        let url = `https://jsonplaceholder.typicode.com/posts?`;
        if (searchQuery) {
            url += `&title_like=${encodeURIComponent(searchQuery)}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
};


export const getPostById = async (postId: number): Promise<TypePost> => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        if (!response.ok) {
            Error('Failed to fetch post');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error;
    }
}