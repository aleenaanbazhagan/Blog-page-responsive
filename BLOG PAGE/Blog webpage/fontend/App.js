import React from 'react';
import './App.css';
import BlogPost from './BlogPost';

function App() {
  return (
    <div className="App">
      <header>
        <h1>My Blog</h1>
        <nav>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      <main className="blog-container">
        <BlogPost
          title="First Blog Post"
          content="This is a simple blog post in React. Responsive layout using CSS." 
        />
        <BlogPost
          title="Another Blog Entry"
          content="Second blog using component. Easy to maintain and reuse." 
        />
      </main>

      <footer>
        <p>&copy; 2025 My Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
