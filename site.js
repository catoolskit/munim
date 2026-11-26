/* MUNIM website — shared header, footer, WhatsApp button, tabs, pricing, small effects */
(function () {
  "use strict";
  var WA = "918427651580";
  var EMAIL = "sumitverma2880@gmail.com";
  var DL_BOOKS = "https://github.com/catoolskit/munim-app/releases/latest/download/MUNIM.exe";
  var doc = document;
  doc.documentElement.classList.add("js");
  var current = doc.body.getAttribute("data-nav") || "";

  // Favicon (gold tile with म)
  var ico = doc.createElement("link");
  ico.rel = "icon";
  ico.href = "data:image/svg+xml," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#F2B705"/>' +
    '<text x="32" y="45" font-size="36" text-anchor="middle" font-family="serif" font-weight="700" fill="#0B1B3F">म</text></svg>');
  doc.head.appendChild(ico);

  // ── Header ──
  var NAV = [
    ["home", "index.html", "Home"],
    ["books", "books.html", "MUNIM Books"],
    ["pro", "pro.html", "MUNIM Pro"],
    ["pricing", "pricing.html", "Pricing"],
    ["story", "story.html", "Our Story"],
    ["support", "contact.html", "Support"]
  ];
  var links = NAV.map(function (n) {
    return '<a href="' + n[1] + '"' + (n[0] === current ? ' class="on" aria-current="page"' : "") + ">" + n[2] + "</a>";
  }).join("");
  var head = doc.getElementById("site-header");
  if (head) {
    head.outerHTML =
      '<header class="site-head"><div class="wrap head-in">' +
      '<a class="brand" href="index.html" aria-label="MUNIM home"><span class="brand-mark">म</span><span class="brand-name">MUNIM<i>.</i></span></a>' +
      '<nav class="nav" id="nav" aria-label="Main">' + links + "</nav>" +
      '<a class="btn btn-gold btn-sm head-cta" href="download.html">Download</a>' +
      '<button class="burger" id="burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
      "</div></header>";
    var burger = doc.getElementById("burger"), nav = doc.getElementById("nav");
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // ── Footer ──
  var foot = doc.getElementById("site-footer");
  if (foot) {
    foot.outerHTML =
      '<footer class="site-foot"><div class="wrap"><div class="foot-grid">' +
      '<div><a class="brand" href="index.html"><span class="brand-mark">म</span><span class="brand-name">MUNIM<i>.</i></span></a>' +
      "<p>Offline accounting, GST and tax software for Indian businesses and tax professionals. Your data stays on your computer — always.</p></div>" +
      '<div><h4>MUNIM Books</h4><a href="books.html">Features</a><a href="books-guide.html">How to use</a><a href="pricing.html">Pricing</a><a href="download.html">Download</a></div>' +
      '<div><h4>MUNIM Pro</h4><a href="pro.html#tax">Tax Pro</a><a href="pro.html#gst">GST Pro</a><a href="pro.html#tds">TDS Pro</a><a href="pricing.html#pro">Pro pricing</a></div>' +
      '<div><h4>Help</h4><a href="contact.html">Support</a><a href="story.html">Our Story</a><a data-wa="Hi, I have a question about MUNIM" href="#">WhatsApp +91 84276 51580</a>' +
      '<a href="mailto:' + EMAIL + '">' + EMAIL + "</a></div>" +
      '</div><div class="foot-bottom"><span>© <span id="yr"></span> MUNIM · Built in Ludhiana, Punjab by Sumit Verma</span>' +
      '<span>Data stays on your computer — always. &nbsp;·&nbsp; <a href="admin-panel.html">Admin</a></span></div></div></footer>';
    var yr = doc.getElementById("yr");
    if (yr) yr.textContent = new Date().getFullYear();
  }

  // ── WhatsApp button (bottom-left) ──
  var fab = doc.createElement("a");
  fab.className = "wa-fab";
  fab.setAttribute("data-wa", "Hi, I have a question about MUNIM");
  fab.setAttribute("aria-label", "Chat with us on WhatsApp");
  fab.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.5L3 21l2-5.5A8.4 8.4 0 1 1 21 11.5z"/><path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01"/></svg>';
  doc.body.appendChild(fab);

  // ── Links filled from one place ──
  doc.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(a.getAttribute("data-wa") || "Hi, I have a question about MUNIM");
    a.target = "_blank";
    a.rel = "noopener";
  });
  doc.querySelectorAll("[data-dl='books']").forEach(function (a) { a.href = DL_BOOKS; });

  // ── Tabs (optional #hash support with data-hash) ──
  var tabGroups = [];
  doc.querySelectorAll("[data-tabs]").forEach(function (box) {
    var tabs = Array.prototype.slice.call(box.querySelectorAll(":scope > .tabbar [data-tab]"));
    var panels = Array.prototype.slice.call(box.querySelectorAll(":scope > [data-panel]"));
    if (!tabs.length) return;
    function show(id, updateHash) {
      tabs.forEach(function (t) {
        var on = t.getAttribute("data-tab") === id;
        t.classList.toggle("on", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
      });
      panels.forEach(function (p) { p.hidden = p.getAttribute("data-panel") !== id; });
      if (updateHash && box.hasAttribute("data-hash")) history.replaceState(null, "", "#" + id);
    }
    function fromHash() {
      var h = location.hash.slice(1);
      var ok = box.hasAttribute("data-hash") && tabs.some(function (t) { return t.getAttribute("data-tab") === h; });
      show(ok ? h : tabs[0].getAttribute("data-tab"), false);
      return ok;
    }
    tabs.forEach(function (t) {
      t.setAttribute("role", "tab");
      t.addEventListener("click", function () { show(t.getAttribute("data-tab"), true); });
    });
    tabGroups.push({ box: box, fromHash: fromHash });
    fromHash();
  });
  window.addEventListener("hashchange", function () {
    tabGroups.forEach(function (g) {
      if (g.fromHash()) g.box.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // ── Screenshot fallback ──
  doc.querySelectorAll(".window img").forEach(function (img) {
    img.addEventListener("error", function () { img.closest(".window").classList.add("noimg"); });
    if (img.complete && img.naturalWidth === 0) img.closest(".window").classList.add("noimg");
  });

  // ── Pricing: 1 / 2 / 3 / 5 years ──
  var DISC = { 1: 0, 2: 0.10, 3: 0.15, 5: 0.25 };
  var yearBtns = doc.querySelectorAll("[data-years]");
  function inr(n) { return "₹" + Math.round(n).toLocaleString("en-IN"); }
  function applyYears(y) {
    yearBtns.forEach(function (b) { b.classList.toggle("on", Number(b.getAttribute("data-years")) === y); });
    doc.querySelectorAll("[data-price]").forEach(function (el) {
      var base = Number(el.getAttribute("data-price"));
      var total = base * y * (1 - DISC[y]);
      var amt = el.querySelector(".amt"), per = el.querySelector(".per"), save = el.querySelector(".save");
      if (amt) amt.textContent = inr(total);
      if (per) per.textContent = y === 1 ? "per year" : "for " + y + " years · " + inr(total / y) + " per year";
      if (save) save.textContent = y === 1 ? "" : "You save " + inr(base * y - total);
    });
  }
  if (yearBtns.length) {
    yearBtns.forEach(function (b) {
      b.addEventListener("click", function () { applyYears(Number(b.getAttribute("data-years"))); });
    });
    applyYears(1);
  }

  // ── Reveal on scroll ──
  var items = doc.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }
})();
