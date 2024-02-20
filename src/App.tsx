import React, {useState} from 'react';
import './App.css';
import loupe from './loupe.png';
import main from './main.png';
import like from './like.jpg';
import dislike from './dislike.jpg';

function App() {
    const generateRandomCount = () => Math.floor(Math.random() * 100);

    const [likeCount, setLikeCount] = useState(generateRandomCount);
    const [dislikeCount, setDislikeCount] = useState(generateRandomCount);

    return (
        <div className="App">
            <div className='container-1'>
                <h1 className={'title'}>Блог</h1>
                <p>
                    Здесь мы делимся интересными кейсами из наших проектов,
                    пишем про IT, а также переводим зарубежные статьи
                </p>
                <div className='input-container space-between'>
                    <img
                        src={loupe}
                        alt="web-app"
                        className='icon'
                    />
                    <input type="text" placeholder="поиск по названию статьи" className='input-field'/>
                </div>
            </div>
            <div className='container-1 shadow'>
                <img
                    src={main}
                    alt=""
                    className='image-main'
                />
                <div className='container-2 space-between'>
                    <h2 className='title-little'>Что нужно знать об эффективной интернет-рекламе?</h2>
                    <div className='like-dislike-container space-between'>
                        <button
                            className="like-button"
                            onClick={() => setLikeCount(likeCount + 1)}
                            aria-label="Лайк"
                        >
                            <img src={like} alt="" className='like-icon'/>
                        </button>
                        <span>{likeCount}</span>
                        <button
                            className="dislike-button"
                            onClick={() => setDislikeCount(dislikeCount + 1)}
                            aria-label="Дизлайк"
                        >
                            <img src={dislike} alt="" className='dislike-icon'/>
                        </button>
                        <span>{dislikeCount}</span>
                    </div>
                </div>
                <p>
                    Интернет - огромный ресурс, позволяющий продвигать свои услуги практически на любую аудиторию.
                    Ежедневно в сеть выходит более 5 миллиардов людей -
                    каждый из них может увидеть вашу рекламу и стать вашим потенциальным клиентом.
                </p>
                <div className='container-button'>
                    <button className='button'>Читать далее</button>
                </div>
            </div>
            <div className='container-compact space-between'>
                <div className='container-3 shadow'>
                    <img
                        src={main}
                        alt=""
                        className='image-second'
                    />
                    <div className='container-2'>
                        <h2 className='title-little'>Что нужно знать об эффективной интернет-рекламе?</h2>

                    </div>
                    <div className='container-button space-between'>
                        <div className='like-dislike-container'>
                            <button
                                className="like-button"
                                onClick={() => setLikeCount(likeCount + 1)}
                                aria-label="Лайк"
                            >
                                <img src={like} alt="" className='like-icon'/>
                            </button>
                            <span>{likeCount}</span>
                            <button
                                className="dislike-button"
                                onClick={() => setDislikeCount(dislikeCount + 1)}
                                aria-label="Дизлайк"
                            >
                                <img src={dislike} alt="" className='dislike-icon'/>
                            </button>
                            <span>{dislikeCount}</span>
                        </div>
                        <button className='button'>Читать далее</button>
                    </div>
                </div>
                <div className='container-3 shadow'>
                    <img
                        src={main}
                        alt=""
                        className='image-second'
                    />
                    <div className='container-2'>
                        <h2 className='title-little'>Что нужно знать об эффективной интернет-рекламе?</h2>
                    </div>
                    <div className='container-button space-between'>
                        <div className='like-dislike-container'>
                            <button
                                className="like-button"
                                onClick={() => setLikeCount(likeCount + 1)}
                                aria-label="Лайк"
                            >
                                <img src={like} alt="" className='like-icon'/>
                            </button>
                            <span>{likeCount}</span>
                            <button
                                className="dislike-button"
                                onClick={() => setDislikeCount(dislikeCount + 1)}
                                aria-label="Дизлайк"
                            >
                                <img src={dislike} alt="" className='dislike-icon'/>
                            </button>
                            <span>{dislikeCount}</span>
                        </div>
                        <button className='button'>Читать далее</button>
                    </div>
                </div>
            </div>
            <div className='container-compact space-between'>
                <div className='container-3 shadow'>
                    <img
                        src={main}
                        alt=""
                        className='image-second'
                    />
                    <div className='container-2'>
                        <h2 className='title-little'>Что нужно знать об эффективной интернет-рекламе?</h2>

                    </div>
                    <div className='container-button space-between'>
                        <div className='like-dislike-container'>
                            <button
                                className="like-button"
                                onClick={() => setLikeCount(likeCount + 1)}
                                aria-label="Лайк"
                            >
                                <img src={like} alt="" className='like-icon'/>
                            </button>
                            <span>{likeCount}</span>
                            <button
                                className="dislike-button"
                                onClick={() => setDislikeCount(dislikeCount + 1)}
                                aria-label="Дизлайк"
                            >
                                <img src={dislike} alt="" className='dislike-icon'/>
                            </button>
                            <span>{dislikeCount}</span>
                        </div>
                        <button className='button'>Читать далее</button>
                    </div>
                </div>
                <div className='container-3 shadow'>
                    <img
                        src={main}
                        alt=""
                        className='image-second'
                    />
                    <div className='container-2'>
                        <h2 className='title-little'>Что нужно знать об эффективной интернет-рекламе?</h2>
                    </div>
                    <div className='container-button space-between'>
                        <div className='like-dislike-container'>
                            <button
                                className="like-button"
                                onClick={() => setLikeCount(likeCount + 1)}
                                aria-label="Лайк"
                            >
                                <img src={like} alt="" className='like-icon'/>
                            </button>
                            <span>{likeCount}</span>
                            <button
                                className="dislike-button"
                                onClick={() => setDislikeCount(dislikeCount + 1)}
                                aria-label="Дизлайк"
                            >
                                <img src={dislike} alt="" className='dislike-icon'/>
                            </button>
                            <span>{dislikeCount}</span>
                        </div>
                        <button className='button'>Читать далее</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
