import React, {useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom';
import lope from "../images/loupe.png";
import people from "../images/people.jpg";
import like from "../images/greenLike.jpg";
import greenLike from "../images/like.jpg";
import dislike from "../images/dislike.jpg";
import redDislike from "../images/redDislike.jpg";
import landscape from "../images/landscape.jpg";
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

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export function HomePage() {

    const navigate = useNavigate();


    const [posts, setPosts] = useState<Post[]>([]);
    const images = [landscape, cat, car2, camp2, woman, work, office2, sunset, book, happy];

    const [likeCount, setLikeCount] = useState<Record<number, number>>({});
    const [dislikeCount, setDislikeCount] = useState<Record<number, number>>({});
    const [reactionStatus, setReactionStatus] = useState<Record<number, "like" | "dislike" | null>>({});



    // Загрузка постов
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then((data: Post[])=> {
                setPosts(data);
                // Инициализация лайков и дизлайков случайными значениями
                const initialLikes: Record<number, number> = {};
                const initialDislikes: Record<number, number> = {};
                data.forEach((post: Post) => {
                    initialLikes[post.id] = Math.floor(Math.random() * 50);
                    initialDislikes[post.id] = Math.floor(Math.random() * 50);
                });
                setLikeCount(initialLikes);
                setDislikeCount(initialDislikes);
            });
    }, []);

    const handleLike = (postId: number) => {
        setReactionStatus(prev => {
            const currentReaction = prev[postId];
            if (currentReaction === "like") {
                // Отменяем лайк
                setLikeCount(prevCount => ({ ...prevCount, [postId]: prevCount[postId] - 1 }));
                return { ...prev, [postId]: null };
            } else {
                // Добавляем или переключаем на лайк
                const adjustment = currentReaction === "dislike" ? -1 : 0;
                setLikeCount(prevCount => ({ ...prevCount, [postId]: (prevCount[postId] || 0) + 1 }));
                setDislikeCount(prevCount => ({ ...prevCount, [postId]: Math.max((prevCount[postId] || 0) + adjustment, 0) }));
                return { ...prev, [postId]: "like" };
            }
        });
    };

    const handleDislike = (postId: number) => {
        setReactionStatus(prev => {
            const currentReaction = prev[postId];
            if (currentReaction === "dislike") {
                // Отменяем дизлайк
                setDislikeCount(prevCount => ({ ...prevCount, [postId]: prevCount[postId] - 1 }));
                return { ...prev, [postId]: null };
            } else {
                // Добавляем или переключаем на дизлайк
                const adjustment = currentReaction === "like" ? -1 : 0;
                setDislikeCount(prevCount => ({ ...prevCount, [postId]: (prevCount[postId] || 0) + 1 }));
                setLikeCount(prevCount => ({ ...prevCount, [postId]: Math.max((prevCount[postId] || 0) + adjustment, 0) }));
                return { ...prev, [postId]: "dislike" };
            }
        });
    };


    const handleClick = (postId: number) => {
        navigate(`/post/${postId}`);
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
                    <input type="text" placeholder="поиск по названию статьи" className='input-field'/>
                </div>
            </div>
            {posts.length > 0 && (
                <div className='container-1 shadow'>
                    <img src={people} alt="" className='image-main'/>
                    <div className='container-2 space-between'>
                        <h2 className='title'>{posts[0].title}</h2>
                        <div className='like-dislike-container space-between'>
                            <button
                                className="like-button"
                                onClick={() => handleLike(posts[0].id)}
                                aria-label="Лайк"
                                // style={{ color: likedPosts[post.id] ? 'green' : 'black' }}
                            >
                                <img src={reactionStatus[posts[0].id] === "like" ? like : greenLike} alt="" className='like-icon'/>
                            </button>
                            <span>{likeCount[posts[0].id]}</span>
                            <button
                                className="dislike-button"
                                onClick={() => handleDislike(posts[0].id)}
                                aria-label="Дизлайк"
                            >
                                <img src={reactionStatus[posts[0].id] === "dislike" ? redDislike : dislike} alt="" className='dislike-icon'/>
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
                {posts.slice(1).map((post, index) => (
                    <div key={post.id} className='container-3 shadow'>
                        <img src={images[index % images.length]} alt="" className='image-second'/>
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
                                    <img src={reactionStatus[post.id] === "like" ?  like : greenLike } alt="" className='like-icon'/>
                                </button>
                                <span>{likeCount[post.id]}</span>
                                <button
                                    className="dislike-button"
                                    onClick={() => handleDislike(post.id)}
                                    aria-label="Дизлайк"
                                >
                                    <img src={reactionStatus[post.id] === "dislike" ? redDislike : dislike} alt="" className='dislike-icon'/>
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