const API_BASE = '/api';

export async function apiCall(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers
    }
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

// Usage: apiCall('/content/project').then(data => console.log(data));
