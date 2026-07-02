// =========================================
// PUDING LEMBUT — auth.js
// Logika sederhana login & register memakai localStorage.
// CATATAN: ini hanya untuk simulasi/demo di sisi front-end.
// Untuk aplikasi sungguhan, password harus diproses & disimpan
// di server (database) dengan enkripsi, BUKAN di localStorage.
// =========================================

const STORAGE_KEY_USERS = 'pudingLembut_users';
const STORAGE_KEY_LOGIN = 'pudingLembut_loggedInUser';

function getUsers() {
  const data = localStorage.getItem(STORAGE_KEY_USERS);
  return data ? JSON.parse(data) : [];
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
}

// --- Proses REGISTER ---
function handleRegister(event) {
  event.preventDefault();

  const nama = document.getElementById('regNama').value.trim();
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const password = document.getElementById('regPassword').value;
  const errorBox = document.getElementById('regError');

  errorBox.style.display = 'none';

  if (nama === '' || email === '' || password === '') {
    showError(errorBox, 'Semua kolom wajib diisi.');
    return;
  }

  if (password.length < 6) {
    showError(errorBox, 'Password minimal 6 karakter.');
    return;
  }

  const users = getUsers();
  const sudahAda = users.some(function (u) { return u.email === email; });

  if (sudahAda) {
    showError(errorBox, 'Email ini sudah terdaftar. Silakan login.');
    return;
  }

  users.push({ nama: nama, email: email, password: password });
  saveUsers(users);

  // Tampilkan pesan sukses lalu arahkan ke halaman login
  const successBox = document.getElementById('regSuccess');
  if (successBox) {
    successBox.style.display = 'block';
  }

  setTimeout(function () {
    window.location.href = 'login.html';
  }, 1200);
}

// --- Proses LOGIN ---
function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const password = document.getElementById('loginPassword').value;
  const errorBox = document.getElementById('loginError');

  errorBox.style.display = 'none';

  const users = getUsers();
  const user = users.find(function (u) {
    return u.email === email && u.password === password;
  });

  if (!user) {
    showError(errorBox, 'Email atau password salah.');
    return;
  }

  localStorage.setItem(STORAGE_KEY_LOGIN, user.nama);
  window.location.href = 'index.html';
}

// --- Logout ---
function handleLogout() {
  localStorage.removeItem(STORAGE_KEY_LOGIN);
  window.location.href = 'login.html';
}

function showError(errorBox, message) {
  if (!errorBox) return;
  errorBox.textContent = message;
  errorBox.style.display = 'block';
}

// --- Lindungi halaman akun: jika belum login, lempar ke login.html ---
function requireLogin() {
  const user = localStorage.getItem(STORAGE_KEY_LOGIN);
  if (!user) {
    window.location.href = 'login.html';
  }
  return user;
}
