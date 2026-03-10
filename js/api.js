const API_BASE = 'https://my-portfolio-backend.itsaayanuchiha.workers.dev/api';  // Your live Worker

// Get token from localStorage
function getToken() {
  return localStorage.getItem('token');
}

// Clear token on logout/error
function clearToken() {
  localStorage.removeItem('token');
  window.location = '/auth.html';  // Redirect to auth page
}

// Main API call helper with error handling
export async function apiCall(endpoint, options = {}) {
  const token = getToken();
  if (!token && !endpoint.includes('auth/register') && !endpoint.includes('send-otp')) {
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
    console.error(`API Error ${res.status} on ${endpoint}: ${errorText}`);  // Debug log
    if (res.status === 401) clearToken();  // Auto-logout on auth fail
    throw new Error(errorText || `HTTP ${res.status}`);
  }

  const data = await res.json();
  console.log(`API Success on ${endpoint}:`, data);  // Debug log
  return data;
}

// Usage examples (in HTML scripts):
// apiCall('/auth/login', { method: 'POST', body: JSON.stringify({ phone, password }) }).then(data => { if (data.token) localStorage.setItem('token', data.token); });
// apiCall('/content/project').then(data => console.log(data));
