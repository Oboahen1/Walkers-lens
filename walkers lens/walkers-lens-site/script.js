/* ========== Walker's Lens: renders the page from data.js and sends enquiries to WhatsApp ========== */
(() => {
  const $ = s => document.querySelector(s);
  const el = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; };
  const money = n => "GHC " + n.toLocaleString("en-US", { minimumFractionDigits: 2 });
  const allPkgs = {};                       // id -> { name, prices }

  /* --- a package block: photo on top, then tier, title, price, checklist and button --- */
  let tier = 0;                                    // tiers count up across the whole page, cheapest collection first
  function pkgBlock(p, group) {
    allPkgs[p.id] = { name: p.label || p.name, prices: p.prices, group };
    const a = el("article", "pkg"); a.id = "pkg-" + p.id;
    if (p.img) {
      const f = el("figure", "pimg"), im = el("img"); im.src = p.img; im.alt = p.alt || p.name; im.loading = "lazy";
      if (p.pos) im.style.objectPosition = p.pos; f.append(im); a.append(f);
    }
    const b = el("div", "pbody");
    b.append(el("p", "tier", "Tier " + String(++tier).padStart(2, "0")), el("h3", "", p.name));
    if (p.crew) b.append(el("p", "crew", p.crew));
    if (p.blurb) b.append(el("p", "blurb", p.blurb));
    const prices = el("div", "prices");
    p.prices.forEach(pr => {
      if (pr.was) prices.append(el("p", "was", money(pr.was)));
      const r = el("p", "price", money(pr.amount)); if (pr.label) r.append(el("span", "per", pr.label));
      if (pr.was) r.append(el("span", "per", "Save " + money(pr.was - pr.amount).replace(".00", "")));
      prices.append(r);
    });
    b.append(prices, el("span", "rule"));
    const list = (title, items) => {
      if (title) b.append(el("h4", "", title));
      const ul = el("ul", "checks"); items.forEach(i => ul.append(el("li", "", i))); b.append(ul);
    };
    if (p.cover) { list("Coverage", p.cover); list("Deliverables", p.deliver); } else list(null, p.deliver);
    const btn = el("a", "btn", "Enquire about this package"); btn.href = "#book";
    btn.addEventListener("click", () => choose(p.id)); b.append(btn);
    a.append(b); return a;
  }

  /* --- building blocks for each collection --- */
  const minOf = pk => Math.min(...pk.flatMap(p => p.prices.map(x => x.amount)));
  function header(no, title, text, from, extra) {
    const h = el("div", "sec coll-head");
    h.append(el("span", "rule"), el("p", "tier", "Collection " + String(no).padStart(2, "0")), el("h2", "", title));
    if (text) h.append(el("p", "", text));
    h.append(el("p", "from", "Packages from " + money(from)));
    (extra || []).forEach(x => h.append(x)); return h;
  }
  function mosaic(images) {
    const m = el("div", "mosaic m" + images.length);
    images.forEach(i => { const f = el("figure"), im = el("img"); im.src = i.src; im.alt = i.alt; im.loading = "lazy"; f.append(im); m.append(f); });
    return m;
  }
  function bleed(src, alt, pos) {
    const f = el("figure", "bleed"), im = el("img"); im.src = src; im.alt = alt; im.loading = "lazy"; if (pos) im.style.objectPosition = pos; f.append(im); return f;
  }
  function flyerBtn(g) {
    const b = el("button", "btn inline", "View the flyer"); b.type = "button";
    b.onclick = () => { $("#lb img").src = g.flyer; $("#lb img").alt = g.flyerAlt; $("#lb").hidden = false; };
    return b;
  }
  function simple(g, no) {                          // graduation and price list: photos, text, three packages
    const s = el("section", "group"); s.id = g.id;
    s.append(mosaic(g.images), header(no, g.title, g.text, minOf(g.packages), [g.note && el("p", "note", g.note), flyerBtn(g)].filter(Boolean)));
    const grid = el("div", "pkgs three"); g.packages.forEach(p => grid.append(pkgBlock(p, g.title))); s.append(grid); return s;
  }

  const C = $("#collections");
  C.append(simple(GRADUATION, 1), simple(PRICELIST, 2));

  /* weddings: every package has its own photo */
  const ws = el("section", "group"); ws.id = "weddings";
  ws.append(bleed("images/groom-suit.jpg", "Man in a black tuxedo with a crystal brooch", "center 32%"),
    header(3, "Wedding Photography", "Photo and video coverage for your traditional or white wedding. Choose the ceremony only, or the ceremony with the reception.", minOf(WEDDINGS.flatMap(g => g.packages))));
  WEDDINGS.forEach(g => {
    const sub = el("div", "sec sub"); sub.append(el("h3", "", g.title), el("p", "", g.text)); ws.append(sub);
    const grid = el("div", "pkgs two"); g.packages.forEach(p => grid.append(pkgBlock(p, g.title))); ws.append(grid);
  });
  C.append(ws);

  /* brunch, lunch or dinner */
  const ds = el("section", "group"); ds.id = "dining";
  ds.append(mosaic(DINING_INFO.images), header(4, DINING_INFO.title, DINING_INFO.text, minOf(DINING)));
  const dg = el("div", "pkgs three"); DINING.forEach(p => dg.append(pkgBlock({ ...p, label: "Dining " + p.name }, DINING_INFO.title))); ds.append(dg);
  C.append(ds);

  $("#minPrice").textContent = money(Math.min(minOf(GRADUATION.packages), minOf(PRICELIST.packages), minOf(DINING), ...WEDDINGS.map(g => minOf(g.packages))));

  /* --- add-ons table --- */
  ADDONS.forEach(g => {
    const box = el("div", "addon-group"); box.append(el("h4", "", g.group));
    g.items.forEach(([n, v]) => { const r = el("div", "addon"); r.append(el("span", "", n), el("span", "amt", money(v))); box.append(r); });
    $("#addonList").append(box);
  });

  /* --- gallery --- */
  [["hero", "Woman in orange sunglasses by a black car"], ["graduation-cap", "Graduate in a cap and red kente dress"], ["groom-suit", "Man in a black tuxedo"],
   ["purple-suit", "Man in a burgundy suit stepping out of a car with a cane"], ["evening-friends", "Two friends in blue evening dresses at a night out"], ["white-blazer", "Woman in a white blazer dress"], ["graduation-stairs", "Graduate on a staircase holding a certificate and medal"],
   ["red-beaded-gown", "Woman in a burgundy beaded gown"], ["striped-dress", "Woman seated on a sofa in a striped dress"], ["plaid-cap", "Person in a plaid shirt and cap"]]
    .forEach(([n, alt]) => {
      const b = el("button", "ph"); b.type = "button"; b.setAttribute("aria-label", "View photo: " + alt);
      const im = el("img"); im.src = `images/${n}.jpg`; im.alt = alt; im.loading = "lazy"; b.append(im);
      b.onclick = () => { $("#lb img").src = im.src; $("#lb img").alt = alt; $("#lb").hidden = false; };
      $("#gallery").append(b);
    });
  $("#lb").onclick = () => { $("#lb").hidden = true; };
  document.addEventListener("keydown", e => { if (e.key === "Escape") { $("#lb").hidden = true; closeMenu(); } });

  /* --- terms --- */
  TERMS.forEach(t => $("#termsList").append(el("li", "", t)));

  /* --- booking form --- */
  const sel = $("#pkg");
  sel.append(new Option("Select a package", ""));
  const addGroup = (label, items) => { const og = document.createElement("optgroup"); og.label = label;
    items.forEach(p => og.append(new Option(p.name + (p.prices.length ? " (" + p.prices.map(x => money(x.amount).replace(".00", "")).join(" / ") + ")" : ""), p.id))); sel.append(og); };
  addGroup(GRADUATION.title, GRADUATION.packages.map(p => ({ ...p, name: p.label })));
  addGroup(PRICELIST.title, PRICELIST.packages.map(p => ({ ...p, name: p.label })));
  WEDDINGS.forEach(g => addGroup(g.title, g.packages));
  addGroup(DINING_INFO.title, DINING.map(p => ({ ...p, name: "Dining " + p.name })));
  sel.append(new Option("Something else / add-ons only", "other"));
  allPkgs.other = { name: "Something else / add-ons only", prices: [], group: "" };

  function daysUi() {
    const p = allPkgs[sel.value], box = $("#daysBox"), d = $("#days");
    d.innerHTML = ""; box.hidden = !(p && p.prices.length > 1);
    if (!box.hidden) p.prices.forEach(x => d.append(new Option(x.label + " (" + money(x.amount) + ")", x.label)));
  }
  function choose(id) { sel.value = id; daysUi(); }
  sel.addEventListener("change", daysUi);
  $("#date").min = new Date().toISOString().slice(0, 10);
  $("#depositNote").textContent = "Weddings: a deposit of " + money(SITE.deposit) + " secures your date. Sessions: half payment secures your booking. We share payment details on WhatsApp once we confirm availability.";

  $("#form").addEventListener("submit", e => {
    e.preventDefault();
    const v = id => $("#" + id).value.trim(), m = $("#msg"), fail = t => { m.className = "msg err"; m.textContent = t; };
    if (!sel.value) return fail("Please choose a package.");
    if (!v("name") || !v("phone") || !$("#date").value) return fail("Please add your name, phone number and event date.");
    if (v("email") && !/\S+@\S+\.\S+/.test(v("email"))) return fail("That email address does not look right.");
    const p = allPkgs[sel.value];
    let pk = p.name; if (p.prices.length === 1) pk += " (" + money(p.prices[0].amount) + ")";
    if (p.prices.length > 1) { const x = p.prices.find(z => z.label === $("#days").value) || p.prices[0]; pk += " – " + x.label + " (" + money(x.amount) + ")"; }
    const contact = [...document.querySelectorAll('input[name="contact"]:checked')].map(c => c.value).join(", ");
    const opt = (k, val) => val ? k + ": " + val : null;
    const body = ["Package: " + pk, "Name: " + v("name"), "Phone: " + v("phone"), opt("Email", v("email")),
      "Event date: " + $("#date").value, opt("Location", v("location")), opt("Preferred contact", contact),
      opt("Instagram", v("insta")), opt("Notes", v("notes"))].filter(x => x !== null);
    const text = "Hello Walker's Lens, I'd like to make an enquiry.\n\n" + body.join("\n");
    const url = "https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent(text);
    m.className = "msg ok"; m.textContent = "Opening WhatsApp… If nothing opens, ";
    const a = el("a", "", "tap here to send your enquiry"); a.href = url; a.target = "_blank"; a.rel = "noopener"; m.append(a, ".");
    window.open(url, "_blank", "noopener");
  });

  /* --- menu, back to top, header --- */
  const menu = $("#menu"), mb = $("#menuBtn");
  function closeMenu() { menu.hidden = true; mb.setAttribute("aria-expanded", "false"); }
  mb.onclick = () => { menu.hidden = !menu.hidden; mb.setAttribute("aria-expanded", String(!menu.hidden)); };
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
  $("#upBtn").onclick = () => scrollTo({ top: 0, behavior: "smooth" });
  const onScroll = () => { document.body.classList.toggle("scrolled", scrollY > 60); $("#upBtn").classList.toggle("show", scrollY > 400); };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  /* hide the floating buttons while the footer is on screen so they never cover the icons */
  if ("IntersectionObserver" in window) new IntersectionObserver(en => document.body.classList.toggle("at-foot", en[0].isIntersecting)).observe($(".foot"));

  /* --- footer links --- */
  const soc = { ph: "tel:+" + SITE.whatsapp, mail: "mailto:" + SITE.email + "?subject=" + encodeURIComponent("Enquiry for Walker's Lens"),
    ig: SITE.instagram, tt: SITE.tiktok, wa: "https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent("Hello Walker's Lens, I found you on your website.") };
  document.querySelectorAll("[data-soc]").forEach(a => { a.href = soc[a.dataset.soc]; if (a.href.startsWith("http")) { a.target = "_blank"; a.rel = "noopener"; } });
  $("#mailLine").href = "mailto:" + SITE.email; $("#mailLine").textContent = SITE.email;
})();
