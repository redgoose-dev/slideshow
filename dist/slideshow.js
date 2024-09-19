import { ref as u, inject as P, openBlock as c, createElementBlock as _, createElementVNode as v, reactive as R, provide as w, onMounted as T, onUnmounted as C, watch as S, nextTick as g, createBlock as h } from "vue";
import { defineStore as x } from "pinia";
function D(e = 3e3) {
  return new Promise((n) => setTimeout(n, e));
}
function y(e) {
  try {
    if (!e) throw new Error("no src");
    try {
      return structuredClone(e);
    } catch {
      return JSON.parse(JSON.stringify(e));
    }
  } catch {
    return null;
  }
}
function O(e, n) {
  let r = { ...e };
  for (let t in n)
    n.hasOwnProperty(t) && (typeof n[t] == "object" && n[t] !== null && e[t] ? r[t] = O(e[t], n[t]) : r[t] = n[t]);
  return r;
}
const $ = {
  general: {
    language: "en",
    // en,ko
    hud: !0,
    hoverVisibleHud: !1,
    clickVisibleHud: !1,
    visibleHudContents: {
      menu: !0,
      thumbnail: !1,
      caption: !0,
      controller: !0,
      paginate: !0,
      autoplay: !0,
      group: !0
    }
  },
  slides: {
    initialNumber: 0,
    animationType: "horizontal",
    // none,fade,horizontal
    animationSpeed: 500,
    captionAnimationType: "none",
    // none,shuffle
    captionAnimationSpeed: 40,
    autoplay: !1,
    autoplayDelay: 7e3,
    autoplayDirection: !0,
    // next(true), prev(false)
    autoplayPauseOnHover: !1,
    loop: !0,
    swipe: !0
  },
  style: {
    screenColor: "system",
    // dark,light,system
    imageType: "none",
    // none,contain,cover
    imageScale: ["75%", "75%"],
    // [ width, height ]
    captionScale: 100,
    // %
    captionPosition: ["32px", "30px"]
    // [ left, top ]
  },
  keyboard: {
    enabled: !0
  }
}, E = x("preference", () => {
  const e = u(void 0), n = u(void 0), r = u(void 0), t = u(void 0);
  function a(f, d = !1) {
    const p = y(d ? $ : i()), l = O(p, f);
    e.value = l.general, n.value = l.slides, r.value = l.style, t.value = l.keyboard;
  }
  function o() {
    e.value = void 0, n.value = void 0, r.value = void 0, t.value = void 0;
  }
  function i() {
    return y({
      general: e.value,
      slides: n.value,
      style: r.value,
      keyboard: t.value
    });
  }
  return {
    general: e,
    slides: n,
    style: r,
    keyboard: t,
    setup: a,
    destroy: o,
    exportData: i
  };
}), A = x("slides", () => {
  const e = u({});
  function n(a) {
    const o = y((a == null ? void 0 : a.length) > 0 ? a : []);
    e.value = o;
  }
  function r() {
    e.value = void 0;
  }
  function t() {
    return y(e.value);
  }
  return {
    data: e,
    setup: n,
    destroy: r,
    exportData: t
  };
});
x("navigation", () => {
  const e = u(0), n = u([]);
  return {
    page: e,
    order: n
  };
});
const m = (e, n) => {
  const r = e.__vccOpts || e;
  for (const [t, a] of n)
    r[t] = a;
  return r;
}, B = { class: "container" }, H = {
  __name: "index",
  setup(e) {
    const { updatePreference: n } = P("preference");
    function r() {
      n({
        general: {
          FOOWWW: "BARRRRR"
        }
      });
    }
    return (t, a) => (c(), _("article", B, [
      a[0] || (a[0] = v("p", null, ".container asdasd", -1)),
      v("nav", null, [
        v("button", { onClick: r }, " TRIGGER ")
      ])
    ]));
  }
}, N = /* @__PURE__ */ m(H, [["__scopeId", "data-v-090faf97"]]), V = {};
function I(e, n) {
  return c(), _("div", null, " loading... ");
}
const W = /* @__PURE__ */ m(V, [["render", I]]), G = {};
function J(e, n) {
  return c(), _("p", null, ".error");
}
const M = /* @__PURE__ */ m(G, [["render", J]]), z = { class: "slideshow" }, F = {
  __name: "index",
  props: {
    preference: Object,
    slides: Array
  },
  emits: [
    "update-preference",
    "update-slides"
  ],
  setup(e, { expose: n, emit: r }) {
    const t = E(), a = A(), o = e, i = R({
      loading: !0,
      error: void 0
    }), f = r;
    w("preference", { updatePreference: k }), w("slides", { updateSlides: b }), T(() => {
      d().then();
    }), C(() => {
      t.destroy(), a.destroy(), p().then();
    }), S(() => o.preference, (s) => {
      t.setup(s);
    }, { deep: !0 }), S(() => o.slides, (s) => {
    }, { deep: !1 }), n({
      stop: p,
      start: d,
      restart: l
    }), t.setup(o.preference, !0), k(void 0);
    async function d() {
      a.setup(o.slides), await g(), i.loading = !1;
    }
    async function p() {
      a.destroy(), await g(), i.loading = !0;
    }
    async function l() {
      await p(), await g(), await D(2e3), await d();
    }
    function k(s) {
      s && t.setup(s), f("update-preference", t.exportData());
    }
    function b() {
      const s = a.exportData();
      f("update-slides", s);
    }
    return (s, L) => (c(), _("div", z, [
      i.loading ? (c(), h(W, { key: 0 })) : i.error ? (c(), h(M, { key: 1 })) : (c(), h(N, { key: 2 }))
    ]));
  }
}, K = /* @__PURE__ */ m(F, [["__scopeId", "data-v-c23b30c7"]]);
export {
  K as default
};
