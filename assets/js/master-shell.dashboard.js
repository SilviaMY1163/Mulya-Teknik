/* ================= MASTER SHELL JS (EXTRACTED FROM dashboard.html) ================= */
/* Sidebar + Toggle + Overlay + Active menu + Submenu + Burger scroll transparency */

(function () {
  function initBurgerScrollTransparency() {
    const btn = document.getElementById('toggleBtn');
    if (!btn) return;

    const handleScroll = () => {
      if (window.scrollY > 10) btn.classList.add('scrolled');
      else btn.classList.remove('scrolled');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
  }

  function initSidebarToggle() {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("toggleBtn");
    const mobileCloseBtn = document.getElementById("mobileCloseBtn");
    const overlay = document.getElementById("overlay");

    if (!sidebar) return;

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          sidebar.classList.add("active");
          if (overlay) overlay.classList.add("active");
        } else {
          sidebar.classList.toggle("collapsed");
        }
      });
    }

    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener("click", () => {
        sidebar.classList.remove("active");
        if (overlay) overlay.classList.remove("active");
      });
    }

    if (overlay) {
      overlay.addEventListener("click", () => {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
      });
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        sidebar.classList.remove("active");
        if (overlay) overlay.classList.remove("active");
      }
    });
  }

  function initSidebarSubmenuToggle() {
    document.querySelectorAll(".sidebar .has-submenu > a").forEach(trigger => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        const li = trigger.parentElement;
        const isOpen = li.classList.contains("open");
        if (isOpen) li.classList.remove("open");
        else li.classList.add("open");
      });
    });
  }

  function setActiveMenu() {
    const path = window.location.pathname;
    const currentPage = path.split('/').pop() || 'dashboard.html';

    const allMainItems = document.querySelectorAll('.sidebar .menu > li');
    const allSubItems = document.querySelectorAll('.sidebar .submenu li');

    allMainItems.forEach(li => li.classList.remove('active', 'open'));
    allSubItems.forEach(li => li.classList.remove('active'));

    document.querySelectorAll('.sidebar .menu a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('javascript')) return;

      const page = href.split('/').pop();
      if (page === currentPage) {
        const li = a.parentElement;
        if (!li) return;

        if (li.parentElement && li.parentElement.classList.contains('submenu')) {
          li.classList.add('active');
          const parentLi = li.closest('.has-submenu');
          if (parentLi) parentLi.classList.add('active', 'open');
        } else {
          li.classList.add('active');
        }
      }
    });
  }

  // OPTIONAL: global debounce 3 detik untuk semua button
  function initGlobalButtonDebounce() {
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('button');
      if (!btn) return;

      if (btn.dataset.debouncing === 'true') {
        e.stopImmediatePropagation();
        e.preventDefault();
        return;
      }

      btn.dataset.debouncing = 'true';
      btn.classList.add('is-waiting');

      setTimeout(() => {
        btn.dataset.debouncing = 'false';
        btn.classList.remove('is-waiting');
      }, 3000);
    }, true);
  }

  document.addEventListener("DOMContentLoaded", () => {
    initSidebarToggle();
    initSidebarSubmenuToggle();
    initBurgerScrollTransparency();
    setActiveMenu();

    // kalau kamu mau debounce global ikut master:
    // initGlobalButtonDebounce();
  });

  // expose kalau dibutuhkan halaman lain
  window.MasterShell = {
    setActiveMenu,
    initGlobalButtonDebounce
  };
})();
