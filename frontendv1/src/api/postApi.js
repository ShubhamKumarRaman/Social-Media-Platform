const API = import.meta.env.BACKEND_API || '';

export const getPosts = async () => {
  const res = await fetch(`${API}/api/posts`);
  return res.json();
}

export const createPost = async (formData) => {
  const res = await fetch(`${API}/api/posts`, {
    method: 'POST',
    body: formData
  })
  return res.json();
}

export const likePost = async (id) => {
  const res = await fetch(`${API}/api/posts/like/${id}`, {
    method: 'POST',
  })
  return res.json()
}

export const addComment = async (id, text) => {
  const res = await fetch(`${API}/api/posts/comment/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  })
  return res.json();
}