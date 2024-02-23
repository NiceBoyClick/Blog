import React from 'react';
import { useParams } from 'react-router-dom';

export function PostPage() {
    // Получаем id поста из URL
    const { postId } = useParams();

    // Загрузите данные поста используя postId, например, с помощью fetch API

    return (
        <div>
            <h1>Пост {postId}</h1>
            {/* Отобразите содержимое поста здесь */}
        </div>
    );
}

export default PostPage;