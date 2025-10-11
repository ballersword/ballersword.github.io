 /** ===== 1) 你的数据：随时扩充到 100+ ===== */
     const PHOTOS = [
        {
    title: " 牢不可破的红白蓝",
    subtitle: "Highland • 35mm • f/5.6",
    desc: "<p>多年以后，面对埃菲尔铁塔，我会想起10多年前第一次玩《红色警戒2》苏军在巴黎建起“大型磁暴线圈”的那个下午……</p><p>第一次去欧洲旅行的人们，首站大概率都会来巴黎，而到了巴黎的首站，大概率都会在这个角度观察一下古斯塔夫先生留下的杰作（去到天津也是，解放桥也是埃菲尔设计的）。</p><p>我还记得当时盯着埃菲尔铁塔过了很长时间，有某个瞬间，脑子里面竟奇怪的闪现了好多苏联式建筑。</p><p>似乎塔尖上插上一颗血红的五角星一点也不违和，甚至更添加了些许威武雄壮。然后脑子里回荡的《马赛曲》自然过渡成了《牢不可破的联盟》，红白蓝三色变成了红黄两色，“自由、平等、博爱”变成了“全世界工人阶级联合起来”，站在战神广场上，仿佛身处红场，耳畔响起了阅兵时候苏联军队震耳欲聋的“乌拉！”。</p><p>这个念头一晃而过，苏联也成为过去式，天空还是蓝色的，塔尖也没有红色五角星……</p>",
    tags: ["风光","引导线","清晨"],
    img: "img/bw/1.jpg",
    exif: { focal:"35mm", aperture:"f/5.6", shutter:"1/640s", iso:"ISO 100" }
  },
  {
    title: "斑驳的人性",
    subtitle: "Seascape • 85mm • f/4",
    desc: "<p>那是一次异常成功的避雨。</p><p>记得这时候是17年的初夏，我赶在第一滴雨落在我身上之前冲进了十字路口的一家吉野家。过了不到10秒，身后暴雨应声而落，好险！</p><p>我点了份双拼，坐在了平时最喜欢的面对窗户的位置上，盯着外面的匆匆行人，一种幸灾乐祸的“幸福感”油然而生。人可能就是这样，当你获得了庇护，你就不希望后面来的人也获得同样的庇护，甚至不会影响到你自己也不希望。</p><p>躲过了雨，于是我的兴趣点发生了转移，看到雨点咔咔的敲在玻璃上，像是掌声一样，窗子也因为下雨起了雾气，水滴洒在上面像极了iPhone早期的一个壁纸，斑斑驳驳的也很美……</p>",
    tags: ["海景","极简","留白"],
    img: "img/bw/2.jpg",
    exif: { focal:"85mm", aperture:"f/4", shutter:"1/1000s", iso:"ISO 100" }
  },
  {
    title: "存钱",
    subtitle: "City • 24mm • f/8",
    desc: "<p>那天晚上从公司出来，路上横七竖八不规则的散布着很多氛围灯。</p><p>说实话，我很不适应从脚底下窜上来的灯光，所以如果必须在公司呆到晚上，我都会避免走这条路。自下而上的光很晃眼，而且每次经过总有一种焦化厂的感觉，不知道会不会突然从脚底下窜上来个火柱、毒气什么的。</p><p>所幸的是，那天新买了一个玻璃的小猪存钱罐，我把它蹲在了其中一个灯泡上面，效果还不错……这对它来说基本算是艺术品待遇了。</p><p>新年新愿望，多存钱！！！</p>",
    tags: ["城市","长曝光","夜景"],
    img: "img/bw/3.jpg",
    exif: { focal:"24mm", aperture:"f/8", shutter:"4s", iso:"ISO 64" }
  },
   {
    title: "谣言",
    subtitle: "City • 24mm • f/8",
    desc: "<p>客观的说，这个角度拍什么都会很震撼，但是我拍下这个并不是因为景色有多壮美，是因为发现了一个谣言…</p><p>往来北京的航班航路都是走的北京东边，所以买左侧靠窗位置的机票，总能看到国贸三期中国尊。</p><p>最开始偷着拍下这张照片的时候我还犹豫了一下，远处那是国贸么……拍下来经过放大才确认，没错就是！</p><p>按距离推算我飞机下面垂直投影距离国贸最多也是20km到30km应该还是朝阳通州的交接地带，这个曾经的中国最高建筑就已经很是模糊了，那我曾经深信不疑的“宇航员在太空能看见长城”就更加滑天下之大稽了。</p>",
    tags: ["城市","长曝光","夜景"],
    img: "img/bw/4.jpg",
    exif: { focal:"24mm", aperture:"f/8", shutter:"4s", iso:"ISO 64" }
  },
      ];

      /** ===== 2) 参数 ===== */
      const BATCH_SIZE = 12;
      const USE_INFINITE_SCROLL = true; // 需要关闭无限滚动时改为 false

      /** ===== 3) 简单的 src/srcset 构造（本地文件可直接用 src；如有多尺寸可自行扩展） ===== */
      function buildSrc(urlBase, w = 1200) { return urlBase; }
      function buildSrcSet(urlBase) { return ""; }

      /** ===== 4) 渲染逻辑（分批 + 懒加载 + 视差仅作用于可见项） ===== */
      const gallery = document.getElementById('gallery');
      const tpl = document.getElementById('work-tpl');
      let cursor = 0;

      function renderNextBatch(){
        const frag = document.createDocumentFragment();
        const end = Math.min(cursor + BATCH_SIZE, PHOTOS.length);
        for(let i=cursor; i<end; i++){
          const data = PHOTOS[i];
          const node = tpl.content.cloneNode(true);

          const section = node.querySelector('section.work');
          const bgDiv = node.querySelector('.bg');
          const imgEl = node.querySelector('img');
          const title = node.querySelector('.title');
          const sub = node.querySelector('.sub');
          const desc = node.querySelector('.desc');
          const tags = node.querySelector('.tags');

          // 背景与清晰图
          const bgUrl = buildSrc(data.bg || data.img, 1600);
          section.dataset.bg = bgUrl;              // 供视差使用
          bgDiv.style.backgroundImage = `url("${bgUrl}")`;

          imgEl.src = buildSrc(data.img, 1200);
          imgEl.srcset = buildSrcSet(data.img);
          imgEl.sizes = "(max-width: 920px) 92vw, 600px";
          imgEl.alt = data.title || "";

          // EXIF
          const exif = data.exif || {};
          node.querySelector('.exif .focal').textContent    = exif.focal    || '';
          node.querySelector('.exif .aperture').textContent = exif.aperture || '';
          node.querySelector('.exif .shutter').textContent  = exif.shutter  || '';
          node.querySelector('.exif .iso').textContent      = exif.iso      || '';

          // 文案
          title.textContent = data.title || '';
          sub.textContent   = data.subtitle || '';
          desc.innerHTML    = data.desc || ''; // 允许富文本
          tags.innerHTML    = (data.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('');

          // ✅ 奇偶行切换布局
          if (i % 2 === 0) section.classList.add('layout-left');
          else section.classList.add('layout-right');

          frag.appendChild(node);
        }
        gallery.appendChild(frag);
        cursor = end;

        // 新增元素参与入场动画 & 视差观察
        observeNewItems();
        if(cursor >= PHOTOS.length){
          const btn = document.getElementById('loadMore');
          if (btn) btn.disabled = true;
          if(observerInfinite) observerInfinite.disconnect();
        }
      }

      /** ===== 5) 入场动画：一次性 reveal ===== */
      const ioReveal = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{
          if(e.isIntersecting){
            e.target.classList.add('in-view');
            ioReveal.unobserve(e.target);
          }
        });
      },{threshold:.15, rootMargin:'0px 0px -10% 0px'});

      /** ===== 6) 视差：只对可见区块的 .bg 计算 transform，降低成本 ===== */
      const activeBGs = new Set();
      const ioParallax = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{
          const bg = e.target.querySelector('.bg');
          if(!bg) return;
          if(e.isIntersecting){ activeBGs.add(bg); }
          else { activeBGs.delete(bg); }
        });
      },{root:null, threshold:0, rootMargin:'200px 0px 200px 0px'}); // 提前/滞后一点更顺滑

      function parallax(){
        const scrollY = window.scrollY || window.pageYOffset;
        activeBGs.forEach(bg=>{
          const host = bg.parentElement; // section 或 header/footer
          if (!host) return;
          const rect = host.getBoundingClientRect();
          const elTop = rect.top + scrollY;
          const offset = (scrollY - elTop) * 0.25; // 视差强度
          bg.style.transform = `translateY(${offset}px) scale(1.08)`;
        });
      }
      window.addEventListener('scroll', parallax, {passive:true});
      window.addEventListener('resize', parallax);

      /** ===== 7) 无限滚动（可选） ===== */
      let observerInfinite = null;
      function setupInfiniteScroll(){
        const sentinel = document.getElementById('loadMore');
        observerInfinite = new IntersectionObserver((entries)=>{
          entries.forEach(e=>{
            if(e.isIntersecting && cursor < PHOTOS.length){
              renderNextBatch();
            }
          });
        },{root:null, threshold:0.1});
        observerInfinite.observe(sentinel);
      }

      /** ===== 8) 把新加的项交给观察器 ===== */
      function observeNewItems(){
        // 新增 section：给视差；新增 .reveal：给入场动画
        document.querySelectorAll('section.work:not([data-obs])').forEach(sec=>{
          sec.setAttribute('data-obs','1');
          ioParallax.observe(sec);
          // section 内的 reveal 元素
          sec.querySelectorAll('.reveal:not(.in-view)').forEach(el=> ioReveal.observe(el));
        });
        // 初始刷新一次视差
        parallax();
      }

      /** ===== 9) 头尾背景注入（不参与批量） ===== */
      document.querySelectorAll('header, footer').forEach(el=>{
        const bg = el.querySelector('.bg');
        if(bg && el.dataset.bg){
          bg.style.backgroundImage = `url("${el.dataset.bg}")`;
          // 让头尾也参与视差（可见时才计算）
          ioParallax.observe(el);
        }
      });

      /** ===== 10) 事件：加载更多按钮 ===== */
      document.getElementById('loadMore').addEventListener('click', renderNextBatch);

      /** ===== 11) 首次渲染 & 可选的无限滚动 ===== */
      renderNextBatch(); // 首批
      if(USE_INFINITE_SCROLL) setupInfiniteScroll();




