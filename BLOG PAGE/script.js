const postForm = document.getElementById('postForm');
const postsContainer = document.getElementById('posts');
const imageInput = document.getElementById('imageInput');

const BACKEND_URL = 'http://localhost:3000/api';

// Function to load posts from backend
async function loadPosts() {
  const res = await fetch(`${BACKEND_URL}/posts`);
  const posts = await res.json();

  postsContainer.innerHTML = '';

  posts.forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    postDiv.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      ${post.image ? `<img src="${post.image}" />` : ''}
    `;

    // Comment section
    const commentSection = document.createElement('div');
    commentSection.classList.add('comment-section');

    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Add a comment...';

    const commentButton = document.createElement('button');
    commentButton.innerText = 'Post Comment';

    const commentList = document.createElement('div');
    commentList.classList.add('comments');

    post.comments.forEach(c => {
      const comment = document.createElement('div');
      comment.classList.add('comment');
      comment.innerText = c;
      commentList.appendChild(comment);
    });

    commentButton.addEventListener('click', async () => {
      const commentText = commentInput.value.trim();
      if (!commentText) return;

      // Send comment to backend
      await fetch(`${BACKEND_URL}/posts/${post._id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: commentText })
      });

      loadPosts(); // reload posts
    });

    commentSection.appendChild(commentInput);
    commentSection.appendChild(commentButton);
    commentSection.appendChild(commentList);

    postDiv.appendChild(commentSection);
    postsContainer.appendChild(postDiv);
  });
}

// Handle form submit to post blog
postForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();
  const imageFile = imageInput.files[0];

  if (!title || !content) return;

  let imageBase64 = '';

  if (imageFile) {
    const reader = new FileReader();
    reader.onloadend = async () => {
      imageBase64 = reader.result;

      await fetch(`${BACKEND_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, imageBase64 })
      });

      postForm.reset();
      loadPosts();
    };
    reader.readAsDataURL(imageFile);
  } else {
    await fetch(`${BACKEND_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, imageBase64 })
    });

    postForm.reset();
    loadPosts();
  }
});

loadPosts(); // initial load
