const API_BASE = '/api';  // Change to your Worker URL if separate (e.g., 'https://your-worker.workers.dev/api')

// Get token from localStorage
function getToken() {
  return localStorage.getItem('token');
}

// Clear token on logout/error
function clearToken() {
  localStorage.removeItem('token');
  window.location = '/auth.html';  // Redirect to auth
}

// Main API call helper
export async function apiCall(endpoint, options = {}) {
  const token = getToken();
  if (!token && !endpoint.includes('/auth/register') && !endpoint.includes('/send-otp')) {
    throw new Error('No token - login required');
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : undefined,
      ...options.headers
    }
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`API Error ${res.status}: ${errorText}`);  // Debug log
    throw new Error(errorText || `HTTP ${res.status}`);
  }

  return res.json();
}

// Usage examples:
// apiCall('/auth/login', { method: 'POST', body: JSON.stringify({ phone, password }) }).then(data => { if (data.token) localStorage.setItem('token', data.token); });
// apiCall('/content/project').then(data => console.log(data));
