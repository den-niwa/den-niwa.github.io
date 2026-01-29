(async () => {
  const img = document.getElementById("photo");
  if (!img) throw new Error("Missing element: #photo");

  const counterEl = document.getElementById("counter");

  const res = await fetch("images/list.json");
  if (!res.ok) throw new Error("Missing images/list.json (run workflow once).");

  const files = await res.json();
  const images = files
    .filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f))
    .map((f) => `images/${f}`);

  if (!images.length) throw new Error("No images found in images/list.json");

  img.draggable = false;
  img.addEventListener("dragstart", (e) => e.preventDefault());
  img.addEventListener("contextmenu", (e) => e.preventDefault());

  let _preloadImg = new Image();
  const preload = (src) => {
    if (!src || _preloadImg.src === src) return;
    _preloadImg.src = src;
  };

  let imageIndex = 0; // first image in the list

  const updateCounter = () => {
    if (!counterEl) return;
    counterEl.textContent = String(imageIndex + 1).padStart(2, "0");
  };

  const show = (i) => {
    imageIndex = (i + images.length) % images.length;
    img.src = images[imageIndex];
    preload(images[(imageIndex + 1) % images.length]);
    updateCounter();
  };

  const next = () => show(imageIndex + 1);

  img.addEventListener("click", next);

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(imageIndex - 1);
    if (e.key === "ArrowRight") show(imageIndex + 1);
  });

  let startX = 0;
  window.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
    },
    { passive: true },
  );

  window.addEventListener(
    "touchend",
    (e) => {
      if (Math.abs(e.changedTouches[0].clientX - startX) > 40) next();
    },
    { passive: true },
  );

  show(0); // load first image
})();
