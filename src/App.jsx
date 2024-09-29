import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import "./styles.css";

function SignUp({ onSignIn, users, setUsers }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      setMessage('User already exists. Please sign in.');
      return;
    }
    // Add new user
    setUsers([...users, { email, password }]);
    setMessage('User created successfully! You can now sign in.');
  };

  return (
    <div className="sign-up">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-signup">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={onSignIn} className="btn-signin">Go to Sign In</button>
    </div>
  );
}

function SignIn({ onSignIn, users }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if user exists and password matches
    const existingUser = users.find(user => user.email === email && user.password === password);
    if (!existingUser) {
      setMessage('Incorrect email or password. Please try again.');
      return;
    }
    onSignIn(); // Call the onSignIn function when the user successfully signs in
  };

  return (
    <div className="sign-in">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-signin">Sign In</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

function Favorites() {
  return (
    <div>
      <h1>Favorite Prints</h1>
      <p>This is where your favorited prints will be displayed.</p>
    </div>
  );
}

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [users, setUsers] = useState([]); // State to store user data

  useEffect(() => {
    document.body.className = isDarkTheme ? "dark-theme" : "light-theme";
  }, [isDarkTheme]);

  function toggleTheme() {
    setIsDarkTheme((prev) => !prev);
  }

  return (
    <Router>
      <div className="title-bar">
        <div className="button-container">
          <Link to="/" className="btn-discover">Discover</Link>
          {isSignedIn ? (
            <Link to="/favorites" className="btn-favorite">Favorite</Link>
          ) : (
            <Link to="/signup" className="btn-favorite">Favorite</Link>
          )}
        </div>
        <div className="title-container">
          <h1 className="page-title">Solar 3D</h1>
        </div>
        <div className="button-container right">
          <Link to="/signup" className="btn-signup">Sign Up</Link>
          <Link to="/signin" className="btn-signin">Sign In</Link>
        </div>
      </div>
      <div className="container">
        <aside className="sidebar">
          <ul>
            {/* Sidebar items can be added here */}
          </ul>
        </aside>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<div>Welcome to Discover!</div>} />
            <Route path="/favorites" element={isSignedIn ? <Favorites /> : <Navigate to="/signup" />} />
            <Route path="/signup" element={<SignUp onSignIn={() => setIsSignedIn(true)} users={users} setUsers={setUsers} />} />
            <Route path="/signin" element={<SignIn onSignIn={() => setIsSignedIn(true)} users={users} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
