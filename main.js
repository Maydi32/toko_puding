// =========================================
// PUDING LEMBUT — main.js
// Berlaku untuk semua halaman: navbar mobile toggle
// dan menandai menu aktif sesuai halaman saat ini
// =========================================

document.addEventListener('DOMContentLoaded', function () {
  // --- Toggle menu navbar di tampilan mobile ---
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('open');
    });
  }

  // --- Tandai link navbar yang aktif berdasarkan nama file saat ini ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(function (link) {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });

  // --- Tampilkan status login di navbar (jika sudah login) ---
  updateNavbarLoginStatus();
});

function updateNavbarLoginStatus() {
  const loggedInUser = localStorage.getItem('pudingLembut_loggedInUser');
  const loginNavLink = document.getElementById('loginNavLink');

  if (loggedInUser && loginNavLink) {
    loginNavLink.textContent = 'Halo, ' + loggedInUser;
    loginNavLink.setAttribute('href', 'akun.html');
  }
}

// Fungsi global agar tombol "Tambah ke Pesanan" terasa interaktif
// (tidak menyimpan ke server, hanya contoh notifikasi sederhana)
function tambahPesanan(namaProduk) {
  alert('"' + namaProduk + '" berhasil ditambahkan ke pesanan! 🍮');
}
