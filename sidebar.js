// 侧边栏动态展开/收起逻辑，支持PC端动态，移动端始终展开
function isMobile() {
  return window.innerWidth <= 768;
}
const sidebar = document.getElementById('sidebar');
const toggle = document.getElementById('sidebar-toggle');
let expanded = false;
let touchStartX = 0;
let touchEndX = 0;
let overlay = null;
function setSidebarState(expand) {
  if (expand) {
    sidebar.classList.add('expanded');
    if (isMobile()) showOverlay();
  } else {
    sidebar.classList.remove('expanded');
    if (isMobile()) hideOverlay();
  }
  expanded = expand;
}
function showOverlay() {
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.zIndex = 99;
    overlay.style.background = 'rgba(0,0,0,0)';
    overlay.onclick = function() { setSidebarState(false); };
    document.body.appendChild(overlay);
  }
  overlay.style.display = 'block';
}
function hideOverlay() {
  if (overlay) overlay.style.display = 'none';
}
function initSidebar() {
  if (!sidebar || !toggle) return;
  if (!isMobile()) {
    setSidebarState(false);
    toggle.onclick = function() {
      setSidebarState(!expanded);
    };
    sidebar.onmouseleave = function() {
      setSidebarState(false);
    };
  } else {
    setSidebarState(false);
    // 监听触摸滑动
    document.addEventListener('touchstart', function(e) {
      touchStartX = e.touches[0].clientX;
    });
    document.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].clientX;
      // 右侧20%区域左滑才触发
      if (!expanded && touchStartX > window.innerWidth * 0.8 && touchStartX - touchEndX > 40) {
        setSidebarState(true);
      }
      // 导航栏区域右滑关闭
      if (expanded && touchStartX < window.innerWidth && touchEndX - touchStartX > 40) {
        setSidebarState(false);
      }
    });
  }
  window.addEventListener('resize', function() {
    if (isMobile()) setSidebarState(false);
    else setSidebarState(false);
  });
}
document.addEventListener('DOMContentLoaded', initSidebar);
