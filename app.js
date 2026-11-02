(function () {
  const G = window.GUIDE;
  const STORE = "sd2026-picks";
  let picks = {};
  try { picks = JSON.parse(localStorage.getItem(STORE) || "{}") || {}; } catch (e) {}
  const save = () => { try { localStorage.setItem(STORE, JSON.stringify(picks)); } catch (e) {} };

  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  // Content strings may contain a little trusted markup (<strong>, <em>, <a>) from data.js.
  const html = (s) => String(s ?? "");
  const PARTY = { R: "Republican", D: "Democrat", I: "Independent", L: "Libertarian", N: "Nonpartisan" };
  const color = (k) => `var(--${k || "a"})`;
  const part = (h, body, cls = "") => (body ? `<div class="part ${cls}"><div class="h">${h}</div>${body}</div>` : "");
  const paras = (s) => (s ? String(s).trim().split(/\n\s*\n/).map((p) => `<p>${html(p.trim())}</p>`).join("") : "");
  const nat = (n) => (n ? `<div class="part nat"><div class="h">${esc(n.label || "National stakes")}</div>${paras(n.text)}${n.points ? bullets(n.points, "impact") : ""}</div>` : "");
  const bullets = (arr, cls) => (arr && arr.length ? `<ul class="${cls}">${arr.map((x) => `<li>${html(x)}</li>`).join("")}</ul>` : "");

  /* ---------- countdown ---------- */
  (function () {
    const el = document.getElementById("days");
    const open = new Date("2026-11-03T07:00:00-06:00");
    const close = new Date("2026-11-03T19:00:00-06:00");
    const now = new Date();
    if (now < open) {
      const d = Math.ceil((open - now) / 86400000);
      el.innerHTML = d <= 1 ? "Tomorrow" : `${d}<small>days</small>`;
    } else if (now < close) el.innerHTML = "Today";
    else el.innerHTML = "Done";
  })();

  /* ---------- charts ---------- */
  function bars(c) {
    const max = c.max || Math.max(...c.rows.map((r) => r.v)) * 1.08;
    const pct = (v) => Math.min(100, (v / max) * 100);
    const marks = (c.markers || []).map((m) => `<span class="mark" style="left:${pct(m.at)}%"></span>`).join("");
    let out = "";
    if (c.markers && c.markers.length) {
      out += `<div class="brow"><div class="mlabels">${c.markers.map((m) => `<span style="left:${pct(m.at)}%">${esc(m.label)}</span>`).join("")}</div></div>`;
    }
    c.rows.forEach((r) => {
      out += `<div class="brow"><div class="bl">${esc(r.label)}</div><div class="bv" style="color:${r.c === "muted" ? "var(--text-2)" : color(r.c)}">${esc(r.text || `${r.v}%`)}</div>
        <div class="track"><div class="fill ${r.c === "muted" ? "muted" : ""}" style="width:${pct(r.v)}%;--c:${color(r.c)}"></div>${marks}</div></div>`;
    });
    return `<div class="chart"><div class="ct">${esc(c.title)}</div><div class="bars">${out}</div>${c.note ? `<div class="cn">${esc(c.note)}</div>` : ""}</div>`;
  }

  function split(c) {
    const segs = c.segs.map((s) => `<div class="seg ${s.v < 15 ? "sm" : ""}" style="width:${s.v}%;background:${color(s.c)}">${s.v >= 15 ? `${esc(s.label)} ${s.v}%` : `${s.v}%`}</div>`).join("");
    const marks = (c.markers || []).map((m) => `<span class="mark" style="left:${m.at}%"></span>`).join("");
    const m0 = (c.markers || [])[0];
    return `<div class="chart"><div class="ct">${esc(c.title)}</div><div class="split">${segs}${marks}</div>
      <div class="split-legend"><span>${esc(c.segs.slice(1).map((s) => `${s.label} pays ${s.v}%`).join(" · "))}</span>${m0 ? `<span>│ ${esc(m0.label)} at ${m0.at}%</span>` : ""}</div>
      ${c.note ? `<div class="cn">${esc(c.note)}</div>` : ""}</div>`;
  }

  function chart(c) {
    if (!c) return "";
    return c.type === "split" ? split(c) : bars(c);
  }

  function votes(v) {
    const row = (name, [y, n]) => {
      const t = y + n;
      return `<div class="vl">${name}</div>
        <div class="vbar"><i style="width:${(y / t) * 100}%;background:var(--yes)"></i><i style="width:${(n / t) * 100}%;background:var(--no)"></i></div>
        <div class="vn"><span class="y">${y}</span>–<span class="n">${n}</span></div>`;
    };
    return `<div class="chart"><div class="ct">How the Legislature voted to put it on the ballot</div>
      <div class="votes">${row("House", v.house)}${row("Senate", v.senate)}</div>
      ${v.note ? `<div class="cn">${esc(v.note)}</div>` : ""}</div>`;
  }

  /* ---------- the author's pick (small line under "Ask yourself") ---------- */
  function myPick(it) {
    const raw = Array.isArray(it.pick) ? it.pick : it.pick ? [it.pick] : [];
    if (!raw.length) return "";
    const chips = raw.map((v) => {
      const k = it.kind === "measure" ? (/^yes$/i.test(v) ? "yes" : /^no$/i.test(v) ? "no" : "") : ((it.cands || []).find((c) => c.name === v) || {}).party || "";
      return `<span class="mp-v ${k}">${k ? `<span class="dot"></span>` : ""}${esc(v)}</span>`;
    }).join("");
    return `<div class="mypick"><span class="mp-l">${esc(G.meta.picksLabel || "My pick")}${raw.length > 1 ? "s" : ""}</span>${chips}${it.pickWhy ? `<p>${html(it.pickWhy)}</p>` : ""}</div>`;
  }

  /* ---------- item ---------- */
  function optionsFor(it) {
    if (it.kind === "measure") return [{ v: "Yes", cls: "yes" }, { v: "No", cls: "no" }];
    if (it.options) return it.options.map((o) => ({ v: o, cls: "N" }));
    return (it.cands || []).map((c) => ({ v: c.name, cls: c.party }));
  }

  function renderItem(it) {
    let b = "";
    b += `<div class="item-head"><div class="over">${esc(it.sub)}</div><h3>${esc(it.title)}</h3><p class="q">${html(it.q)}</p></div>`;
    b += `<p class="gist">${html(it.gist)}</p>`;

    if (it.kind === "measure") {
      b += `<div class="yn"><div class="y"><div class="v">YES</div><p>${html(it.yes)}</p></div><div class="n"><div class="v">NO</div><p>${html(it.no)}</p></div></div>`;
    }
    if (it.callout) b += `<div class="callout">${html(it.callout)}</div>`;
    if (it.background) b += part("Background", `<div class="bg">${paras(it.background)}</div>`);
    b += nat(it.national);

    if (it.cands) {
      b += part(
        it.cands.length > 1 ? "Candidates" : "Candidate",
        `<ul class="cands">${it.cands
          .map(
            (c) => `<li class="${c.party}">
              <div class="cand-top"><span class="dot"></span><span class="cand-name">${esc(c.name)}</span><span class="ptag">${PARTY[c.party]}</span>${c.note ? `<span class="note">${esc(c.note)}</span>` : ""}${c.site ? `<a class="cand-site" href="${esc(c.site)}" target="_blank" rel="noopener">Site ↗</a>` : ""}</div>
              <p class="cand-line">${html(c.line)}</p>
              ${c.focus ? `<div class="chips">${c.focus.map((f) => `<span class="chip">${esc(f)}</span>`).join("")}</div>` : ""}
              ${c.more ? `<details class="bio"><summary>More on ${esc(c.name.split(" ").slice(-1)[0])}</summary><div>${paras(c.more)}</div></details>` : ""}
            </li>`
          )
          .join("")}</ul>`
      );
    }

    if (it.stats) b += `<div class="part"><div class="stats">${it.stats.map((s) => `<div class="stat"><div class="big">${esc(s.big)}</div><div class="small">${esc(s.small)}</div></div>`).join("")}</div></div>`;
    if (it.chart) b += `<div class="part">${chart(it.chart)}</div>`;
    if (it.contrast) b += part("How they differ", `<p class="contrast">${html(it.contrast)}</p>`);
    if (it.impact) b += part("What it affects", bullets(it.impact, "impact"));

    if (it.pro || it.con) {
      const side = (cls, label, s) => (s ? `<div class="${cls}"><h4>${label}</h4><div class="who">${html(s.who)}</div>${bullets(s.points, "")}</div>` : "");
      b += part("The arguments", `<div class="fa">${side("for", "For", it.pro)}${side("against", "Against", it.con)}</div>`);
    }

    if (it.parties) {
      const p = (k) => {
        const x = it.parties[k];
        if (!x) return "";
        return `<div class="pty ${k}"><div class="who">${PARTY[k]}s</div><div class="stance">${esc(x.stance)}</div><p>${html(x.say)}</p>${x.gain ? `<p><b>Gains:</b> ${html(x.gain)}</p>` : ""}</div>`;
      };
      b += part("The parties", `<div class="parties">${p("R")}${p("D")}</div>`);
    }

    if (it.votes && typeof it.votes === "object") b += `<div class="part">${votes(it.votes)}</div>`;
    if (it.money) b += `<div class="part">${bars({ ...it.money, max: Math.max(...it.money.rows.map((r) => r.v)) * 1.05 })}</div>`;
    if (it.ask) b += part("Ask yourself", bullets(it.ask, "asks"));
    b += myPick(it);

    if (it.take && it.take.trim()) {
      b += `<div class="part take"><div class="h">${esc(G.meta.takeLabel)}</div>${it.take.split(/\n\s*\n/).map((p) => `<p>${html(p)}</p>`).join("")}<div class="by">${esc(G.meta.takeByline)}</div></div>`;
    }

    const opts = optionsFor(it);
    const max = typeof it.votes === "number" ? it.votes : 1;
    b += `<div class="pick"><div class="h"><span>Your pick</span><span>${max > 1 ? `Up to ${max}` : ""}</span></div>
      <div class="opts" data-id="${it.id}">${opts
        .map((o) => `<button type="button" class="opt ${o.cls}" data-opt="${esc(o.v)}" aria-pressed="false"><span class="o"></span>${esc(o.v)}</button>`)
        .join("")}<button type="button" class="opt clear" data-clear hidden>Clear</button></div></div>`;

    let more = "";
    if (it.official) {
      more += `<div class="off"><div class="t">Attorney General's explanation (on the ballot)</div><p><em>${esc(it.official.title)}</em></p>${it.official.text.map((t) => `<p>${esc(t)}</p>`).join("")}</div>`;
    }
    if (it.sources) more += `<ul class="src">${it.sources.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a></li>`).join("")}</ul>`;
    if (more) b += `<details class="more"><summary>${it.official ? "Official text &amp; sources" : "Sources"}</summary>${more}</details>`;

    const el = document.createElement("article");
    el.className = "card item";
    el.id = it.id;
    el.innerHTML = b;
    return el;
  }

  /* ---------- big picture ---------- */
  function seatBar(ch) {
    const pct = (v) => (v / ch.total) * 100;
    const segs = ch.seats.map((s) => `<div class="seg ${pct(s.v) < 12 ? "sm" : ""}" style="width:${pct(s.v)}%;background:${s.c === "muted" ? "#4a4a54" : color(s.c)}">${pct(s.v) >= 12 ? s.v : ""}</div>`).join("");
    const legend = ch.seats.map((s) => `<span><i class="dot ${s.c}" style="${s.c === "muted" ? "--pc:#6a6a74" : ""}"></i>${esc(s.label)} <b>${s.v}</b></span>`).join("");
    return `<div class="chamber"><div class="ch-head"><span class="ch-name">${esc(ch.name)}</span><span class="ch-need">${esc(ch.needLabel || `${ch.need} for control`)}${ch.up ? ` · ${esc(ch.up)}` : ""}</span></div>
      <div class="split seats">${segs}<span class="mark" style="left:${pct(ch.need - 0.5)}%"></span></div>
      <div class="seat-legend">${legend}</div></div>`;
  }

  function renderBig(N) {
    const el = document.getElementById("big");
    if (!N || !el) return;
    let h = `<div class="sec-head"><h2>${esc(N.title)}</h2></div>${N.blurb ? `<p class="sec-blurb">${html(N.blurb)}</p>` : ""}`;

    h += `<div class="card"><div class="part" style="margin-top:0"><div class="h">Who controls Congress now</div>
      <div class="chart">${N.chambers.map(seatBar).join("")}${N.chamberNote ? `<div class="cn">${html(N.chamberNote)}</div>` : ""}</div></div>`;
    if (N.stakes) {
      const s = (k) => { const x = N.stakes[k]; return x ? `<div class="pty ${k}"><div class="who">${esc(x.who)}</div><div class="stance">${esc(x.stance)}</div>${bullets(x.points, "impact")}</div>` : ""; };
      h += part("What the midterm decides", `<div class="parties">${s("R")}${s("D")}</div>${N.stakesNote ? `<p class="contrast" style="margin-top:10px">${html(N.stakesNote)}</p>` : ""}`);
    }
    h += `</div>`;

    if (N.agenda) {
      h += `<div class="card"><div class="part" style="margin-top:0"><div class="h">The Trump agenda, in brief</div>
        ${N.agendaIntro ? `<p class="contrast" style="margin-bottom:6px">${html(N.agendaIntro)}</p>` : ""}
        <ul class="agenda">${N.agenda.map((a) => `<li><details class="ag"><summary><span class="ag-t">${esc(a.title)}</span><span class="ag-s">${html(a.short || "")}</span></summary><div class="ag-body"><p>${html(a.text)}</p>${a.sd ? `<p class="ag-sd"><b>SD tie:</b> ${html(a.sd)}</p>` : ""}${a.sides ? `<div class="ag-sides"><span><b>Supporters:</b> ${html(a.sides[0])}</span><span><b>Critics:</b> ${html(a.sides[1])}</span></div>` : ""}</div></details></li>`).join("")}</ul></div>`;
      if (N.numbers) h += `<div class="part"><div class="stats">${N.numbers.map((s) => `<div class="stat"><div class="big">${esc(s.big)}</div><div class="small">${esc(s.small)}</div></div>`).join("")}</div></div>`;
      if (N.sources) h += `<details class="more"><summary>Sources</summary><ul class="src">${N.sources.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a></li>`).join("")}</ul></details>`;
      h += `</div>`;
    }
    el.innerHTML = h;
  }
  renderBig(G.national);

  /* ---------- where you live (legislature + county races, and some logistics, differ) ---------- */
  const DKEY = "sd2026-district";
  const DISTS = G.meta.districts || [];
  let district = DISTS.length ? DISTS[0].id : "";
  try { district = localStorage.getItem(DKEY) || district; } catch (e) {}
  const qd = new URLSearchParams(location.search).get("d");
  if (qd && DISTS.some((d) => d.id === qd)) { district = qd; try { localStorage.setItem(DKEY, qd); } catch (e) {} }
  if (!DISTS.some((d) => d.id === district) && DISTS.length) district = DISTS[0].id;
  const inArea = (d) => !d || [].concat(d).map(String).includes(district);
  const live = (it) => inArea(it.district);
  const switchHTML = () => (DISTS.length > 1 ? `<div class="dswitch" role="group" aria-label="Where do you live?">${DISTS.map((d) => `<button type="button" data-district="${esc(d.id)}" aria-pressed="false"><b>${esc(d.label)}</b><small>${esc(d.sub)}</small></button>`).join("")}</div>` : "");
  document.querySelectorAll("[data-switch]").forEach((el) => (el.innerHTML = switchHTML()));

  /* ---------- render ---------- */
  const ballot = document.getElementById("ballot");
  const all = [];
  G.sections.forEach((sec) => {
    const s = document.createElement("section");
    s.className = "block";
    s.id = sec.id;
    s.innerHTML = `<div class="sec-head"><span class="sec-kicker"></span><h2>${esc(sec.title)}</h2><span class="count" data-count="${sec.id}"></span></div>${sec.blurb ? `<p class="sec-blurb">${html(sec.blurb)}</p>` : ""}${sec.items.some((i) => i.district) ? switchHTML() : ""}`;
    sec.items.forEach((it) => {
      all.push({ ...it, section: sec });
      const el = renderItem(it);
      if (it.district) el.dataset.district = [].concat(it.district).join(" ");
      s.appendChild(el);
    });
    ballot.appendChild(s);
  });
  const byId = Object.fromEntries(all.map((i) => [i.id, i]));
  const maxFor = (it) => (typeof it.votes === "number" ? it.votes : 1);
  const get = (id) => (Array.isArray(picks[id]) ? picks[id] : []);

  /* ---------- district switch ---------- */
  function applyDistrict() {
    const d = DISTS.find((x) => x.id === district);
    document.querySelectorAll("[data-district]:not(button)").forEach((el) => (el.hidden = !el.dataset.district.split(" ").includes(district)));
    const shown = G.sections.filter((sec) => sec.items.some(live));
    G.sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      el.hidden = !shown.includes(sec);
      el.querySelector(".sec-kicker").textContent = `Ballot · ${shown.indexOf(sec) + 1} of ${shown.length}`;
    });
    document.querySelectorAll(".dswitch button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.district === district));
    if (d) document.querySelectorAll("[data-where]").forEach((el) => (el.textContent = d.where));
    G.sections.forEach((sec) => {
      const n = sec.items.filter(live).length;
      const c = document.querySelector(`[data-count="${sec.id}"]`);
      if (c) c.textContent = `${n} ${sec.id === "amendments" ? (n === 1 ? "question" : "questions") : n === 1 ? "race" : "races"}`;
    });
    document.getElementById("n-items").textContent = all.filter(live).length;
    sync();
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".dswitch button");
    if (!b) return;
    district = b.dataset.district;
    try { localStorage.setItem(DKEY, district); } catch (err) {}
    applyDistrict();
  });

  /* ---------- picks ---------- */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".opts .opt");
    if (!btn) return;
    const id = btn.parentElement.dataset.id;
    const max = maxFor(byId[id]);
    let cur = get(id);
    if (btn.hasAttribute("data-clear")) cur = [];
    else {
      const o = btn.dataset.opt;
      if (cur.includes(o)) cur = cur.filter((x) => x !== o);
      else if (max === 1) cur = [o];
      else if (cur.length < max) cur = [...cur, o];
      else {
        btn.animate([{ transform: "translateX(0)" }, { transform: "translateX(-4px)" }, { transform: "translateX(4px)" }, { transform: "translateX(0)" }], { duration: 220 });
        flash(btn.closest(".pick"), `You can pick up to ${max}. Unselect one first.`);
        return;
      }
    }
    if (cur.length) picks[id] = cur;
    else delete picks[id];
    save();
    sync();
  });

  function flash(where, msg) {
    let n = where.querySelector(".flash");
    if (!n) {
      n = document.createElement("div");
      n.className = "flash";
      n.style.cssText = "font-size:14px;color:var(--no);margin-top:8px";
      where.appendChild(n);
    }
    n.textContent = msg;
    clearTimeout(n._t);
    n._t = setTimeout(() => n.remove(), 2500);
  }

  document.getElementById("reset").addEventListener("click", () => {
    if (!Object.keys(picks).length || !confirm("Clear all your picks?")) return;
    picks = {};
    save();
    sync();
  });

  function partyOf(it, v) {
    if (it.kind === "measure") return v === "Yes" ? "yes" : "no";
    const c = (it.cands || []).find((x) => x.name === v);
    return c ? c.party : "";
  }

  function sync() {
    document.querySelectorAll(".opts").forEach((w) => {
      const cur = get(w.dataset.id);
      w.querySelectorAll(".opt[data-opt]").forEach((b) => b.setAttribute("aria-pressed", cur.includes(b.dataset.opt)));
      w.querySelector("[data-clear]").hidden = !cur.length;
    });
    let h = "";
    G.sections.filter((sec) => sec.items.some(live)).forEach((sec) => {
      h += `<h3>${esc(sec.title)}</h3>`;
      sec.items.filter(live).forEach((it) => {
        const cur = get(it.id);
        const sub = it.kind === "measure" ? it.sub : "";
        h += `<a class="row" href="#${it.id}"><span class="t">${esc(it.title)}${sub ? `<small>${esc(sub)}</small>` : ""}</span><span class="p ${cur.length ? "set" : ""}">${cur.length ? cur.map((v) => { const k = partyOf(it, v); return `${k ? `<span class="dot ${k}"></span>` : ""}${esc(v)}`; }).join(", ") : "—"}<span class="chev">›</span></span></a>`;
      });
    });
    document.getElementById("glance").innerHTML = h;
    const act = all.filter(live);
    const done = act.filter((i) => get(i.id).length).length;
    document.getElementById("pick-count").textContent = `${done}/${act.length}`;
    document.getElementById("glance-count").textContent = `${done} of ${act.length} marked`;
    document.getElementById("progress").style.width = `${(done / act.length) * 100}%`;
  }
  applyDistrict();

  document.getElementById("updated").textContent = `Updated ${G.meta.updated}.`;
})();
