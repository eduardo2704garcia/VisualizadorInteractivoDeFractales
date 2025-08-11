// modalHandler.js
import { getInfo } from './info.js';

export function setupModalHandler() {
  const modal = document.getElementById('infoModal');
  const modalTitle = modal.querySelector('.modal-title');
  const modalBody = modal.querySelector('.modal-body');
  const closeBtn = modal.querySelector('.modal-close');
  const overlayClose = modal; // cierra al hacer click fuera

  document.querySelectorAll('.info-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.algorithm; // ej: "sierpinski", "koch", etc.
      const info = getInfo(key);
      if (!info) return;

      modalTitle.textContent = info.title;
      modalBody.innerHTML = `
        <p>${info.description}</p>
        ${info.image ? `<img src="${info.image}" alt="${info.title}" style="max-width:100%;border-radius:8px;margin-top:12px;" />` : ""}
      `;
      modal.classList.add('open');
    });
  });

  const close = () => modal.classList.remove('open');
  closeBtn.addEventListener('click', close);
  overlayClose.addEventListener('click', (e) => {
    if (e.target === overlayClose) close();
  });

  // Escape para cerrar
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}
