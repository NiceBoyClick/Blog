import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './pages/homePage';
import PostPage from './pages/postPage';

function App() {
    return (
        <Router>
            <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/post/:postId" element={<PostPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;