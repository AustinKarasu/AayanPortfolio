const API_BASE = '/api';

async function sendOTP(phone) {
  try {
    await apiCall('/send-otp', { method: 'POST', body: JSON.stringify({ phone }) });
    alert('OTP sent!');
  } catch (e) {
    alert(e.message);
  }
}

async function verifyOTP(phone, code, action = 'login') {
  try {
    const res = await apiCall('/verify-otp', { method: 'POST', body: JSON.stringify({ phone, code, action }) });
    if (res.token) {
      localStorage.setItem('token', res.token);
      window.location = '/admin.html';
    } else {
      alert('Verified! Proceed to login.');
    }
  } catch (e) {
    alert(e.message);
  }
}

async function login(phone, password, totp = null) {
  try {
    const res = await apiCall('/auth/login', { method: 'POST', body: JSON.stringify({ phone, password, totp }) });
    if (res.token) {
      localStorage.setItem('token', res.token);
      window.location = '/admin.html';
    } else if (res.requires2FA) {
      // Prompt for 2FA
      const totp = prompt('Enter 2FA code:');
      await login(phone, password, totp);
    }
  } catch (e) {
    alert(e.message);
  }
}

async function setup2FA() {
  try {
    const res = await apiCall('/auth/2fa-setup');
    document.getElementById('qrCode').src = `https://quickchart.io/qr?text=${encodeURIComponent(res.otpauthURL)}&size=200`;
    document.getElementById('qrCode').style.display = 'block';
  } catch (e) {
    alert(e.message);
  }
}
