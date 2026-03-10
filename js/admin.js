const API_BASE = '/api';
let token = localStorage.getItem('token');

if (!token) {
  window.location = '/auth.html';
}

async function loadContent(type, containerId) {
  try {
    const res = await fetch(`${API_BASE}/content/${type}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    document.getElementById(containerId).innerHTML = data.map(item => `
      <div class="item">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <button onclick="deleteItem(${item.id}, '${type}')">Delete</button>
      </div>
    `).join('');
  } catch (e) {
    console.error('Load failed', e);
  }
}

async function deleteItem(id, type) {
  try {
    await fetch(`${API_BASE}/content/${type}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    loadContent(type, `${type}List`);  // Reload
  } catch (e) {
    alert('Delete failed');
  }
}

async function loadBanned() {
  try {
    const res = await fetch(`${API_BASE}/admin/banned`, { headers: { Authorization: `Bearer ${token}` } });
    const users = await res.json();
    document.getElementById('bannedList').innerHTML = users.map(u => `
      <li>${u.username} <button onclick="banUser(${u.id})">Ban</button></li>
    `).join('');
  } catch (e) {
    console.error('Banned load failed', e);
  }
}

async function banUser(id) {
  try {
    await fetch(`${API_BASE}/admin/ban`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ userId: id })
    });
    loadBanned();
  } catch (e) {
    alert('Ban failed');
  }
}

// Poll analytics
setInterval(async () => {
  try {
    const res = await fetch(`${API_BASE}/analytics`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    document.getElementById('liveUsers').textContent = `Live: ${data.liveUsers}`;
    document.getElementById('totalUsers').textContent = data.totalUsers;
  } catch (e) {
    console.error('Analytics poll failed', e);
  }
}, 5000);

// Init
loadContent('project', 'projectsList');
loadContent('study', 'studyList');
loadBanned();
