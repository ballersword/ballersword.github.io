/** ===== 1) 数据：支持多图 imgs（也兼容单图 img） ===== */
let PHOTOS = [];

fetch('base/photos.json')
  .then(res => res.json())
  .then(data => {
    PHOTOS = data;
    renderNextBatch();
    if (USE_INFINITE_SCROLL) setupInfiniteScroll();
  });

 
 
/** ===== 2) 参数 ===== */
const BATCH_SIZE = 8;
const USE_INFINITE_SCROLL = true;

/** ===== 3) src/srcset（本地图直接用 src；如有多尺寸可扩展） ===== */
function buildSrc(u, w = 1200) {
  return u;
}
function buildSrcSet(u) {
  return "";
}

/** ===== 4) 渲染逻辑（分批 + 懒加载 + 视差仅作用于可见项） ===== */
const gallery = document.getElementById("gallery");
const tpl = document.getElementById("work-tpl");
let cursor = 0;

function createPhotoCard(src, local, altText = "") {
  const card = document.createElement("div");
  card.className = "photo-card reveal";
  card.innerHTML = `
    <div class="photo-zoom" aria-label="悬停放大查看">
      <img
        src="${buildSrc(src, 1200)}"
        srcset="${buildSrcSet(src)}"
        sizes="(max-width: 920px) 92vw, 600px"
        alt="${altText}"
        loading="lazy"
        decoding="async"
        data-full="${src}" />
      <div class="local" role="note"><span>${local}</span></div>
    </div>
  `;
  return card;
}

function renderNextBatch() {
  const frag = document.createDocumentFragment();
  const end = Math.min(cursor + BATCH_SIZE, PHOTOS.length);

  for (let i = cursor; i < end; i++) {
    const data = PHOTOS[i];
    const node = tpl.content.cloneNode(true);
    const section = node.querySelector("section.work");
    const bgDiv = node.querySelector(".bg");
    const title = node.querySelector(".title");
    const sub = node.querySelector(".sub");
    const desc = node.querySelector(".desc");
    const tags = node.querySelector(".tags");
    const group = node.querySelector(".photo-group");

    // 背景（可同图）
    const bgUrl = buildSrc(data.bg || data.img || (data.imgs && data.imgs[0]) || "", 1600);
    section.dataset.bg = bgUrl;
    if (bgUrl) bgDiv.style.backgroundImage = `url("${bgUrl}")`;

    // 文字
    title.textContent = data.title || "";
    sub.textContent = data.subtitle || "";
    desc.innerHTML = data.desc || "";
    tags.innerHTML = (data.tags || []).map((t) => `<span class="tag">${t}</span>`).join("");

    // 照片卡：支持 imgs（多图）或 img（单图）
    const imgs = Array.isArray(data.imgs) && data.imgs.length ? data.imgs : data.img ? [data.img] : [];
    imgs.forEach((src) => group.appendChild(createPhotoCard(src, data.local, data.title || "")));

    // ✅ 奇偶行交错
    if (i % 2 === 0) section.classList.add("layout-left");
    else section.classList.add("layout-right");

    frag.appendChild(node);
  }

  gallery.appendChild(frag);
  cursor = end;

  // 新增元素参与入场动画 & 视差观察
  observeNewItems();
  if (cursor >= PHOTOS.length) {
    const btn = document.getElementById("loadMore");
    if (btn) btn.disabled = true;
    if (observerInfinite) observerInfinite.disconnect();
  }
}

/** ===== 5) 入场动画：一次性 reveal ===== */
const ioReveal = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in-view");
        ioReveal.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
);

/** ===== 6) 视差：只对可见区块的 .bg 计算 transform ===== */
const activeBGs = new Set();
const ioParallax = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      const bg = e.target.querySelector(".bg");
      if (!bg) return;
      if (e.isIntersecting) activeBGs.add(bg);
      else activeBGs.delete(bg);
    });
  },
  { root: null, threshold: 0, rootMargin: "200px 0px 200px 0px" }
);

function parallax() {
  const scrollY = window.scrollY || window.pageYOffset;
  activeBGs.forEach((bg) => {
    const host = bg.parentElement;
    if (!host) return;
    const rect = host.getBoundingClientRect();
    const elTop = rect.top + scrollY;
    const offset = (scrollY - elTop) * 0.25;
    bg.style.transform = `translateY(${offset}px) scale(1.08)`;
  });
}
window.addEventListener("scroll", parallax, { passive: true });
window.addEventListener("resize", parallax);

/** ===== 7) 无限滚动（可选） ===== */
let observerInfinite = null;
function setupInfiniteScroll() {
  const sentinel = document.getElementById("loadMore");
  observerInfinite = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && cursor < PHOTOS.length) renderNextBatch();
      });
    },
    { root: null, threshold: 0.1 }
  );
  observerInfinite.observe(sentinel);
}

/** ===== 8) 交给观察器 ===== */
function observeNewItems() {
  // 观察每个 section（视差）与其中的 .reveal（入场）
  document.querySelectorAll("section.work:not([data-obs])").forEach((sec) => {
    sec.setAttribute("data-obs", "1");
    ioParallax.observe(sec);
    sec.querySelectorAll(".reveal:not(.in-view)").forEach((el) => ioReveal.observe(el));
  });
  parallax();
}

/** ===== 9) 头尾背景也参与视差 ===== */
document.querySelectorAll("header, footer").forEach((el) => {
  const bg = el.querySelector(".bg");
  if (bg && el.dataset.bg) bg.style.backgroundImage = `url("${el.dataset.bg}")`;
  ioParallax.observe(el);
});

/** ===== 10) 事件：加载更多按钮 ===== */
document.getElementById("loadMore").addEventListener("click", renderNextBatch);

/** ===== 11) 首次渲染 & 可选无限滚动 ===== */
renderNextBatch();
if (USE_INFINITE_SCROLL) setupInfiniteScroll();

/** ===== Lightbox（点击图片全屏） ===== */
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lb-img");
const lbCaption = document.getElementById("lb-caption");

function openLightbox(rawSrc, altText) {
  // 若有更大图，这里可以换更大的目标宽度
  const full = buildSrc(rawSrc, 2000);
  const fullSet = buildSrcSet(rawSrc);

  lbImg.src = full;
  if (fullSet) lbImg.srcset = fullSet;
  else lbImg.removeAttribute("srcset");
  lbImg.alt = altText || "";

  lb.classList.add("show");
  lb.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");

  // 可选：显示标题当作说明
  lbCaption.textContent = altText || "";
}

function closeLightbox() {
  lb.classList.remove("show");
  lb.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  // 释放资源（可选）
  lbImg.removeAttribute("src");
  lbImg.removeAttribute("srcset");
}

// 事件代理：点击图片打开
gallery.addEventListener("click", (e) => {
  const zoom = e.target.closest(".photo-zoom");
  if (!zoom) return;
  const img = zoom.querySelector("img");
  if (!img) return;

  const raw = img.getAttribute("data-full") || img.currentSrc || img.src;
  openLightbox(raw, img.alt || "");
});

// 点击空白或“×”关闭；点图本身也可关闭（cursor: zoom-out）
lb.addEventListener("click", (e) => {
  if (e.target === lbImg) return closeLightbox();
  if (e.target.dataset.close === "1") return closeLightbox();
});

// ESC 关闭
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lb.classList.contains("show")) closeLightbox();
});

  
