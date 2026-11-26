(function() {
  const img = document.querySelector('.parallax-banner img');
  let current = 0;

  window.addEventListener('scroll', () => {
    // мягкая амплитуда с ограничением
    let offset = window.scrollY * 0.18;

    // ограничиваем, чтобы не уезжала
    if (offset > 40) offset = 40;

    // плавное приближение
    current += (offset - current) * 0.12;

    img.style.transform = `translateY(${current}px)`;
  });
})();

