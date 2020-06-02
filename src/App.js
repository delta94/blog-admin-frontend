import React, { useState } from 'react';
import './styles/style.css';
import LogInForm from './components/sign-in-form/LogInForm';
import CreatePostForm from './components/CreatePostForm/CreatePostForm';
import PostList from './components/PostList/PostList';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import auth from './services/auth';
import { useHistory } from 'react-router-dom';

// render={(props) => <PropsPage {...props} title={`Props through render`} />}
function App() {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
    const history = useHistory();
    const handleLogOut = () => {
        setCurrentUser('');
        auth.logOut();
        history.push('/log-in');
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
                                    <a href="/log-in">Log in</a>
                                </li>
                            )}
                        </ul>
                    </nav>
                </header>
                {!currentUser && <Route path="/log-in" component={LogInForm} />}
                <Switch>
                    <Route
                        path="/home"
                        exact
                        render={(props) => <PostList {...props} currentUser={currentUser} />}
                    />
                    <Route path="/create" exact component={CreatePostForm} />;
                </Switch>
            </Router>
        </>
    );
}

export default App;
