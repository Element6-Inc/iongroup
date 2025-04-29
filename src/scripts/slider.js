document.addEventListener('DOMContentLoaded', () => {
    const logoList = document.getElementById('logoList');
    if (logoList) {
      const clone = logoList.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.id = 'logoListClone';
      logoList.parentNode.appendChild(clone);
    }
  });