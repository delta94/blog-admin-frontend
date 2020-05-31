import React from 'react';
import './styles/style.css';
import LogInForm from './components/sign-in-form/LogInForm';
import CreatePostForm from './components/CreatePostForm/CreatePostForm';
import PostList from './components/PostList/PostList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
    return (
        <>
            <PostList />
            <Router>
                <Switch>
                    <Route path="/create" exact component={CreatePostForm} />;
                    <Route path="/" component={LogInForm} />;
                </Switch>
            </Router>
        </>
    );
}

export default App;
