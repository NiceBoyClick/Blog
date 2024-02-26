import React from 'react';
import { useParams } from 'react-router-dom';
import { useReactions } from "../Context";
import like from "../images/greenLike.jpg";
import greenLike from "../images/like.jpg";
import arrowLeft from "../images/arrowLeft.png";
import redDislike from "../images/redDislike.jpg";
import dislike from "../images/dislike.jpg";

export function PostPage() {
    const { likeCount, handleLike, reactionStatus, handleDislike, dislikeCount } = useReactions();
    const { postId } = useParams();
    const postIdNumber = postId ? parseInt(postId, 10) : null; // Преобразование postId в число и обработка undefined
    return (
        <div>
            <div>
                <div>
                    <img src={arrowLeft} alt="" className='like-icon'/>
                    <p className='text'>
                        Вернуться к статьям
                    </p>
                </div>
                <div className='like-dislike-container'>
                    {postIdNumber !== null && ( // Проверка, что postIdNumber не null перед вызовом handleLike и handleDislike
                        <>
                            <button
                                className="like-button"
                                onClick={() => handleLike(postIdNumber)}
                                aria-label="Лайк"
                            >
                                <img src={reactionStatus[postIdNumber] === "like" ? like : greenLike} alt="" className='like-icon'/>
                            </button>
                            <span>{likeCount[postIdNumber]}</span>
                            <button
                                className="dislike-button"
                                onClick={() => handleDislike(postIdNumber)}
                                aria-label="Дизлайк"
                            >
                                <img src={reactionStatus[postIdNumber] === "dislike" ? redDislike : dislike} alt="" className='dislike-icon'/>
                            </button>
                            <span>{dislikeCount[postIdNumber]}</span>
                        </>
                    )}
                </div>
            </div>
            <div>
                <h1>Пост {postIdNumber}</h1>
                {/* Отобразите содержимое поста здесь */}
            </div>
        </div>
    );
}

export default PostPage;
