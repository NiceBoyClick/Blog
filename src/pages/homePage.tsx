import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useReactions} from '../Context';
import {getAllPosts} from '../api'
import lope from "../images/loupe.png";
import people from "../images/people.jpg";
import like from "../images/greenLike.jpg";
import greenLike from "../images/like.jpg";
import dislike from "../images/dislike.jpg";
import redDislike from "../images/redDislike.jpg";
import landscape from "../images/landscape.jpg";
import {TypePost} from "../types/TypePost";
import cat from "../images/cat.jpg";
import car2 from "../images/car2.png";
import camp2 from "../images/camp2.png";
import woman from "../images/woman.png";
import happy from "../images/happy.png";
import work from "../images/work.png";
import office2 from "../images/office2.png";
import sunset from "../images/sunset.jpg";
import book from "../images/book.jpg";
import '../App.css';
import {logDOM} from "@testing-library/react";

export function HomePage() {
    const navigate = useNavigate();

    const {
        likeCount,
        handleLike,
        reactionStatus,
        handleDislike,
        dislikeCount,
        setLikeCount,
        setDislikeCount
    } = useReactions();

    const [posts, setPosts] = useState<TypePost[]>([]);
    const images = [people, landscape, cat, car2, camp2, woman, work, office2, sunset, book, happy];
    const [searchQuery, setSearchQuery] = useState('');

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const initializeReactions = (posts: TypePost[]) => {
        const likes: Record<number, number> = {};
        const dislikes: Record<number, number> = {};

        posts.forEach(post => {
            likes[post.id] = Math.floor(Math.random() * 50);
            dislikes[post.id] = Math.floor(Math.random() * 50);
        });

        return { likes, dislikes };
    }

    useEffect(() => {
        setLoading(true); // Если вы хотите оставить индикатор загрузки, иначе удалите эту строку
        getAllPosts(searchQuery) // Уберите параметр page
            .then((newPosts) => {
                const updatedPosts = newPosts.map((post) => ({
                    ...post,
                    imageIndex: post.id % images.length
                }));

                setPosts(updatedPosts);
                setLoading(false); // Если вы хотите оставить индикатор загрузки, иначе удалите эту строку

                const { likes, dislikes } = initializeReactions(updatedPosts);
                setLikeCount((prevLikes) => ({ ...prevLikes, ...likes }));
                setDislikeCount((prevDislikes) => ({ ...prevDislikes, ...dislikes }));
            });
    }, [searchQuery]); // Уберите page из массива зависимостей


    const handleClick = (postId: number) => {
        // Поиск поста по ID для получения его imageIndex
        const post = posts.find(p => p.id === postId);
        if (post) {
            localStorage.setItem('currentImageIndex', post.imageIndex.toString());
            navigate(`/post/${postId}`);
        }
    };
    console.log(posts);
    return (
        <div className="App">
            <div className='container-1'>
                <h1 className={'title-main'}>Блог</h1>
                <p className='text'>
                    Здесь мы делимся интересными кейсами из наших проектов,
                    пишем про IT, а также переводим зарубежные статьи
                </p>
                <div className='input-container space-between'>
                    <img src={lope} alt="Поиск" className='icon'/>
                    <input type="text" placeholder="поиск по названию статьи" className='input-field'  value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}/>
                </div>
            </div>
            {posts.length > 0 && (
                <div className='container-1 shadow'>
                    <img src={images[posts[0].imageIndex]} alt="" className='image-main'/>
                    <div className='container-2 space-between'>
                        <h2 className='title'>{posts[0].title}</h2>
                        <div className='like-dislike-container space-between'>
                            <button
                                className="like-button"
                                onClick={() => handleLike(posts[0].id)}
                                aria-label="Лайк"
                            >
                                <img src={reactionStatus[posts[0].id] === "like" ? like : greenLike} alt=""
                                     className='like-icon'/>
                            </button>
                            <span>{likeCount[posts[0].id]}</span>
                            <button
                                className="dislike-button"
                                onClick={() => handleDislike(posts[0].id)}
                                aria-label="Дизлайк"
                            >
                                <img src={reactionStatus[posts[0].id] === "dislike" ? redDislike : dislike} alt=""
                                     className='dislike-icon'/>
                            </button>
                            <span>{dislikeCount[posts[0].id]}</span>
                        </div>
                    </div>
                    <p>{posts[0].body}</p>
                    <div className='container-button'>
                        <button onClick={() => handleClick(posts[0].id)} className='button'>Читать далее</button>
                    </div>
                </div>
            )}
            <div className='container-compact space-between'>
                {posts.slice(1).map((post) => (
                    <div key={post.id} className='container-3 shadow'>
                        <img src={images[post.imageIndex]} alt="" className='image-second'/>
                        <div className='container-2'>
                            <h2 className='title-compact'>{post.title}</h2>
                        </div>
                        <div className='container-button space-between'>
                            <div className='like-dislike-container'>
                                <button
                                    className="like-button"
                                    onClick={() => handleLike(post.id)}
                                    aria-label="Лайк"
                                >
                                    <img src={reactionStatus[post.id] === "like" ? like : greenLike} alt=""
                                         className='like-icon'/>
                                </button>
                                <span>{likeCount[post.id]}</span>
                                <button
                                    className="dislike-button"
                                    onClick={() => handleDislike(post.id)}
                                    aria-label="Дизлайк"
                                >
                                    <img src={reactionStatus[post.id] === "dislike" ? redDislike : dislike} alt=""
                                         className='dislike-icon'/>
                                </button>
                                <span>{dislikeCount[post.id]}</span>
                            </div>
                            <button onClick={() => handleClick(post.id)} className='button'>Читать далее</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;