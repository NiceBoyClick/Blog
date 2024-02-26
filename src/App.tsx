import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { ReactionProvider } from './Context';
import HomePage from './pages/homePage';
import PostPage from './pages/postPage';

function App() {
    return (
        <Router>
            <ReactionProvider>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/post/:postId" element={<PostPage/>}/>
                </Routes>
            </ReactionProvider>
        </Router>
    );
}

export default App;