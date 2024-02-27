import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import { useReactions } from "../Context";
import like from "../images/greenLike.jpg";
import greenLike from "../images/like.jpg";
import arrowLeft from "../images/arrowLeft.png";
import redDislike from "../images/redDislike.jpg";
import dislike from "../images/dislike.jpg";
import {getPostById} from "../api";
import {TypePost} from "../types/TypePost";
import landscape from "../images/landscape.jpg";
import cat from "../images/cat.jpg";
import car2 from "../images/car2.png";
import camp2 from "../images/camp2.png";
import woman from "../images/woman.png";
import work from "../images/work.png";
import office2 from "../images/office2.png";
import sunset from "../images/sunset.jpg";
import book from "../images/book.jpg";
import happy from "../images/happy.png";


export function PostPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const images = [landscape, cat, car2, camp2, woman, work, office2, sunset, book, happy];
    const { likeCount, handleLike, reactionStatus, handleDislike, dislikeCount } = useReactions();
    const { postId } = useParams();
    const postIdNumber = postId ? parseInt(postId, 10) : null;
    const [post, setPost] = useState<TypePost | null>(null);


    useEffect(() => {
        if (postIdNumber !== null) {
            getPostById(postIdNumber).then(setPost).catch(console.error);
        }
    }, [postIdNumber]);

    // Если пост еще не загружен, можно отобразить индикатор загрузки
    if (!post) {
        return <div>Loading...</div>;
    }

    const handleClick = () => {
        navigate(`/`);
    };

    return (
        <div className="App">
            <div className="container-1">
                <div className='container-2 space-between'>
                    <button className="button-inline" onClick={handleClick}>
                        <img src={arrowLeft} alt="" className='like-icon'/>
                        <p className='text'>
                            Вернуться к статьям
                        </p>
                    </button>
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

            </div>
            <div className="container-1">
                <h1>{post.title}</h1>
                <img src={office2} className='image-main' alt="Post" />
                <p className='text'>{post.body}</p>
            </div>
        </div>
    );
}

export default PostPage;
