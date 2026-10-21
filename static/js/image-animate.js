document.addEventListener("DOMContentLoaded", () => {
  const imgs = document.querySelectorAll('img[src*="kvadrat.png"]');
  imgs.forEach(img => {
    img.classList.add("post-image");
  });
});
