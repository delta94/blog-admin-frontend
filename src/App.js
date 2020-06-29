import React, { useState } from 'react';
import './styles/style.css';
import LogInForm from './components/sign-in-form/LogInForm';
import CreatePostForm from './components/CreatePostForm/CreatePostForm';
import PostList from './components/PostList/PostList';
import Comments from './components/PostList/Comments';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import auth from './services/auth';
import EditPostForm from './components/CreatePostForm/EditPostForm';

// render={(props) => <PropsPage {...props} title={`Props through render`} />}
function App() {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
    const handleLogOut = () => {
        setCurrentUser('');
        auth.logOut();
    };
    return (
        <>
            <Router>
                <header>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/home">Home</Link>
                            </li>
                            {currentUser ? (
                                <>
                                    <li>
                                        <Link to="/create">Create post</Link>
                                    </li>
                                    <li>
                                        <Link to="/log-in">
                                            <button onClick={handleLogOut}>Log out</button>
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link to="/log-in">Log in</Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                </header>
                {currentUser ? (
                    <h2>Hello {currentUser.username}.</h2>
                ) : (
                    <h2>Log in to create and edit your posts.</h2>
                )}

                {!currentUser && <Route path="/log-in" component={LogInForm} />}
                <Switch>
                    <Route
                        path="/home"
                        exact
                        render={(props) => <PostList {...props} currentUser={currentUser} />}
                    />
                    <Route path="/create" exact component={CreatePostForm} />;
                    <Route
                        path="/post/:id/edit"
                        exact
                        render={(props) => <EditPostForm {...props} />}
                    />
                    <Route path="/post/:id/comments" exact component={Comments} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
