import { openBlock as l, createElementBlock as g, createElementVNode as S, createCommentVNode as b, ref as D, reactive as ka, computed as u, onMounted as Pa, watch as za, normalizeClass as R, unref as F, normalizeStyle as qa, createVNode as V, Fragment as Ua, renderList as _a, mergeProps as Ea, provide as W, inject as Na, onUnmounted as Ia, nextTick as E, createBlock as N, toDisplayString as Ga } from "vue";
import { defineStore as $ } from "pinia";
function Xa(c = 3e3) {
  return new Promise((p) => setTimeout(p, c));
}
function O(c) {
  try {
    if (!c) throw new Error("no src");
    try {
      return structuredClone(c);
    } catch {
      return JSON.parse(JSON.stringify(c));
    }
  } catch {
    return null;
  }
}
function Ba(c, p) {
  let e = { ...c };
  for (let h in p)
    p.hasOwnProperty(h) && (typeof p[h] == "object" && p[h] !== null && c[h] ? e[h] = Ba(c[h], p[h]) : e[h] = p[h]);
  return e;
}
function Wa(c) {
  return c.replace(/(\w)(\w*)(_|-|\s*)/g, (p, e, h) => e.toUpperCase() + h.toLowerCase());
}
const y = {
  NONE: "none",
  FADE: "fade",
  HORIZONTAL: "horizontal"
}, Y = {
  NONE: "none",
  SHUFFLE: "shuffle"
}, j = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
}, a1 = {
  NONE: "none",
  CONTAIN: "contain",
  COVER: "cover"
};
function $a(c) {
  return Object.values(y).includes(c.slides.transitionType) || (c.slides.transitionType = y.NONE), Object.values(Y).includes(c.slides.captionAnimationType) || (c.slides.captionAnimationType = Y.NONE), Object.values(j).includes(c.style.displayTheme) || (c.style.displayTheme = j.SYSTEM), Object.values(a1).includes(c.style.imageType) || (c.style.imageType = a1.NONE), c;
}
const Ka = {
  general: {
    language: "en",
    // en,ko
    hud: !0,
    visibleHudHover: !1,
    visibleHudClick: !1,
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
    initialKey: "",
    transitionType: "horizontal",
    // none,fade,horizontal
    transitionSpeed: 500,
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
    displayTheme: "system",
    // dark,light,system
    imageType: "none",
    // none,contain,cover
    imageScale: ["75%", "75%"],
    // [ width, height ]
    captionScale: 100,
    // (%)
    captionPosition: ["32px", "30px"]
    // [ left, top ]
  },
  keyboard: {
    enabled: !0
  }
}, P = $("preference", {
  state: () => ({
    general: void 0,
    slides: void 0,
    style: void 0,
    keyboard: void 0
  }),
  getters: {},
  actions: {
    setup(c, p = !1) {
      const e = O(p ? Ka : this.exportData());
      let h = Ba(e, c);
      h = $a(h), this.general = h.general, this.slides = h.slides, this.style = h.style, this.keyboard = h.keyboard;
    },
    exportData() {
      return O({
        general: this.general,
        slides: this.slides,
        style: this.style,
        keyboard: this.keyboard
      });
    },
    destroy() {
      this.general = void 0, this.slides = void 0, this.style = void 0, this.keyboard = void 0;
    }
  }
}), q = $("slides", {
  state: () => ({
    data: /* @__PURE__ */ new Map(),
    order: [],
    active: "",
    direction: !0,
    // true: 정방향, false: 역방향
    lock: !1
    // 애니메이션 중일때 값이 바뀌면 안될때가 있으니 그것을 위한 값이다.
  }),
  getters: {
    items() {
      return this.order.map((c) => O(this.data.get(c)));
    },
    images() {
      return this.order.map((c) => {
        const p = this.data.get(c);
        return {
          src: p.src,
          alt: p.title
        };
      });
    }
  },
  actions: {
    setup(c) {
      const p = P();
      ((c == null ? void 0 : c.length) > 0 ? c : []).forEach((s, r) => {
        const { key: v, ...x } = s, d = String(v || `key-${r}`);
        this.order.push(d), this.data.set(d, x);
      });
      const { initialKey: h } = p.slides;
      h && this.order.includes(h) && (this.active = h), this.active || (this.active = this.order[0]);
    },
    exportData() {
      return O(this.data);
    },
    destroy() {
      this.data.clear(), this.order = [], this.active = void 0;
    },
    prev() {
      if (this.lock) return;
      const c = P(), p = this.order.indexOf(this.active);
      let e;
      c.slides.loop ? e = (p - 1 + this.order.length) % this.order.length : e = p > 0 ? p - 1 : 0, this.direction = !1, this.active = this.order[e];
    },
    next() {
      if (this.lock) return;
      const c = P(), p = this.order.indexOf(this.active);
      let e;
      c.slides.loop ? e = (p + 1) % this.order.length : e = p < this.order.length - 1 ? p + 1 : this.order.length - 1, this.direction = !0, this.active = this.order[e];
    },
    change(c) {
      if (this.lock || c === this.active) return;
      const p = this.order.indexOf(this.active), e = this.order.indexOf(c);
      e <= -1 || (this.direction = p < e, this.active = this.active = this.order[e]);
    }
  }
}), Ta = $("state", {
  state: () => ({
    swipe: !1,
    playedSlide: !1,
    playedSlideCancel: !1
  })
}), H = (c, p) => {
  const e = c.__vccOpts || c;
  for (const [h, s] of p)
    e[h] = s;
  return e;
}, Ja = { key: 0 }, Qa = ["src", "alt"], Ya = {
  __name: "images-item",
  props: {
    keyName: String,
    loaded: Boolean,
    src: String,
    alt: String,
    error: Boolean
  },
  emits: ["error"],
  setup(c, { emit: p }) {
    const e = c, h = p;
    function s() {
      e.key && h("error", e.keyName);
    }
    return (r, v) => e.error ? (l(), g("p", Ja, v[0] || (v[0] = [
      S("i", null, "icon", -1),
      S("strong", null, "message", -1)
    ]))) : e.loaded ? (l(), g("img", {
      key: 1,
      src: e.src,
      alt: e.alt,
      onError: s
    }, null, 40, Qa)) : b("", !0);
  }
}, I = /* @__PURE__ */ H(Ya, [["__scopeId", "data-v-fcc64c7d"]]), ja = {
  key: 0,
  class: "slide-first"
}, at = {
  key: 1,
  class: "slide-last"
}, tt = {
  __name: "images",
  props: {},
  emits: [
    "change"
  ],
  setup(c, { emit: p }) {
    const e = P(), h = q(), s = Ta(), r = D(), v = D({}), x = D(), d = ka({
      items: h.order.reduce((t, o) => {
        const i = h.data.get(o);
        return t[o] = {
          src: i.src,
          alt: i.title,
          loaded: !1,
          error: !1
        }, t;
      }, {}),
      classNameActive: "active",
      classNamePrevActive: "",
      active: "",
      prevActive: "",
      swipePosX: NaN
    }), M = u(() => {
      const { slides: t, style: o } = e;
      return {
        loop: t.loop || !1,
        transitionType: t.transitionType || y.NONE,
        transitionSpeed: t.transitionSpeed || 500,
        imageType: o.imageType || "none",
        imageScale: o.imageScale || ["100%", "100%"]
      };
    }), C = u(() => {
      if (h.order.indexOf(d.active) <= -1) return;
      let t = {};
      switch (t["--size-width"] = M.value.imageScale[0], t["--size-height"] = M.value.imageScale[1], M.value.transitionType) {
        case y.FADE:
          break;
        case y.HORIZONTAL:
          switch (t["--speed-transition"] = `${M.value.transitionSpeed}ms`, d.prevActive) {
            case "first":
              t["--active-column"] = -1;
              break;
            case "last":
              t["--active-column"] = h.order.length;
              break;
            default:
              t["--active-column"] = z(d.prevActive || d.active);
              break;
          }
          isNaN(d.swipePosX) || (t["--swipe-pos-x"] = `${d.swipePosX}%`);
          break;
      }
      return t;
    }), Z = u(() => {
      if (M.value.transitionType !== "horizontal" || !M.value.loop || h.order.length <= 1) return !1;
      const t = d.items[h.order[h.order.length - 1]];
      return {
        src: t.src,
        loaded: t.loaded,
        error: t.error
      };
    }), k = u(() => {
      if (M.value.transitionType !== "horizontal" || !M.value.loop || h.order.length <= 1) return !1;
      const t = d.items[h.order[0]];
      return {
        src: t.src,
        loaded: t.loaded,
        error: t.error
      };
    });
    let n = {
      touched: !1,
      dist: 0,
      startX: 0,
      startTime: null
    };
    Pa(() => {
      const { initialKey: t } = e.slides;
      t && h.order.includes(t) ? d.active = t : d.active = h.order[0], B(h.order, h.order.indexOf(d.active), M.value.loop);
    }), za(() => h.active, async (t) => {
      h.order.length <= 1 || await w(t);
    });
    async function w(t) {
      var o;
      switch (M.value.transitionType) {
        case y.NONE:
          d.active = t, B(h.order, h.order.indexOf(d.active), M.value.loop);
          break;
        case y.FADE:
          h.lock = !0, s.playedSlide = !0, d.prevActive = d.active, d.classNamePrevActive = "fade-out", d.active = t, d.classNameActive = "fade-in hide", await Xa(20), d.classNameActive = "fade-in", (o = v.value[d.active]) == null || o.addEventListener("transitionend", U, { once: !0 });
          break;
        case y.HORIZONTAL:
          h.lock = !0, s.playedSlide = !0;
          const i = {
            prev: z(d.active),
            next: z(t)
          };
          M.value.loop && (i.prev === 0 && i.next >= h.order.length - 1 ? d.prevActive = "first" : i.prev >= h.order.length - 1 && i.next === 0 ? d.prevActive = "last" : d.prevActive = ""), d.active = t, x.value.addEventListener("transitionend", U, { once: !0 });
          break;
      }
    }
    function U() {
      switch (M.value.transitionType) {
        case y.FADE:
          d.prevActive = "", d.classNamePrevActive = "", d.classNameActive = "active", s.playedSlide = !1, h.lock = !1, B(h.order, h.order.indexOf(d.active), M.value.loop);
          break;
        case y.HORIZONTAL:
          s.playedSlide = !1, d.prevActive = "", h.lock = !1, B(h.order, h.order.indexOf(d.active), M.value.loop);
          break;
      }
    }
    function _() {
      s.playedSlideCancel = !0, x.value.addEventListener("transitionend", Da, { once: !0 });
    }
    function Da() {
      s.playedSlideCancel = !1;
    }
    function z(t) {
      const o = h.order.indexOf(t);
      return o > -1 ? o : void 0;
    }
    function B(t, o, i, m = 2) {
      const A = t.length;
      for (let f = 0 - m; f <= m; f++) {
        let L = o + f;
        if (L < 0)
          if (i) L = A + L;
          else continue;
        else if (L >= A)
          if (i) L = L % A;
          else continue;
        d.items[t[L]].loaded = !0;
      }
    }
    function Fa(t) {
      d.items[t] && (d.items[t].error = !0);
    }
    function K(t) {
      t.stopPropagation(), t.touches && (n.touched = !0), t.touches && t.touches.length > 1 && t.preventDefault(), !s.playedSlide && e.slides.swipe && e.slides.transitionType === y.HORIZONTAL && (h.order.length <= 2 || (n.dist = 0, n.startX = t.touches && t.touches[0] ? Math.floor(t.touches[0].clientX) : t.clientX || t.pageX, n.startTime = (/* @__PURE__ */ new Date()).getTime(), s.swipe = !0));
    }
    function J(t) {
      if (t.stopPropagation(), !t.touches && n.touched || !s.swipe || h.order.length <= 2) return;
      n.moveX = t.touches && t.touches[0] ? Math.floor(t.touches[0].clientX) : t.clientX || t.pageX;
      const o = r.value.offsetWidth, i = n.moveX - n.startX;
      d.swipePosX = i / o * 100 + (0 - 100 * (z(d.active) + 1));
    }
    function Q(t) {
      if (t.stopPropagation(), !t.touches && n.touched || !s.swipe || t.touches && t.touches.length > 0 || h.order.length <= 2) return;
      const o = r.value.offsetWidth;
      n.endX = t.changedTouches && t.changedTouches[0] ? Math.floor(t.changedTouches[0].clientX) : t.clientX || t.pageX;
      const i = n.startX > n.endX, m = (/* @__PURE__ */ new Date()).getTime() - n.startTime, A = n.endX - n.startX, f = Math.abs(A) / o * 100;
      if (n.dist = 0, n.startX = void 0, n.startTime = void 0, n.moveX = void 0, n.endX = void 0, s.swipe = !1, d.swipePosX = NaN, m < 60 || f < 1) {
        console.log("짧은터치");
        return;
      }
      m > 300 ? f > 30 ? h[i ? "next" : "prev"]() : _() : f > 5 ? h[i ? "next" : "prev"]() : _();
    }
    function ba(t) {
      s.swipe && _(), s.swipe = !1, d.swipePosX = NaN;
    }
    function Ra(t) {
    }
    function Oa(t) {
      s.swipe = !1, d.swipePosX = NaN;
    }
    return (t, o) => (l(), g("div", {
      ref_key: "$root",
      ref: r,
      class: R([
        "images",
        `style--${M.value.imageType}`,
        `mode--${M.value.transitionType}`,
        F(s).playedSlide && "animation-play",
        F(s).playedSlideCancel && "animation-cancel",
        F(s).swipe && "swipe"
      ]),
      style: qa(C.value),
      onTouchstart: K,
      onTouchmove: J,
      onTouchend: Q,
      onMousedown: K,
      onMousemove: J,
      onMouseup: Q,
      onMouseleave: ba,
      onMouseenter: Ra,
      onContextmenu: Oa
    }, [
      S("ul", {
        ref_key: "$body",
        ref: x,
        class: "body"
      }, [
        Z.value ? (l(), g("li", ja, [
          V(I, {
            "key-name": "first-slide-image",
            loaded: Z.value.loaded,
            src: Z.value.src,
            error: Z.value.error
          }, null, 8, ["loaded", "src", "error"])
        ])) : b("", !0),
        (l(!0), g(Ua, null, _a(d.items, (i, m) => (l(), g("li", {
          ref_for: !0,
          ref: (A) => {
            v.value[m] = A;
          },
          class: R([
            !!d.classNameActive && d.active === m && d.classNameActive,
            !!d.classNamePrevActive && d.prevActive === m && d.classNamePrevActive
          ])
        }, [
          V(I, {
            "key-name": m,
            loaded: i.loaded,
            src: i.src,
            alt: i.alt,
            error: i.error,
            onError: Fa
          }, null, 8, ["key-name", "loaded", "src", "alt", "error"])
        ], 2))), 256)),
        k.value ? (l(), g("li", at, [
          V(I, {
            "key-name": "last-slide-image",
            loaded: k.value.loaded,
            src: k.value.src,
            error: k.value.error
          }, null, 8, ["loaded", "src", "error"])
        ])) : b("", !0)
      ], 512),
      o[0] || (o[0] = S("i", { class: "overlay" }, null, -1))
    ], 38));
  }
}, ht = /* @__PURE__ */ H(tt, [["__scopeId", "data-v-238f62d6"]]);
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const a = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dt = [
  "svg",
  a,
  [
    ["path", { d: "M3.5 13h6" }],
    ["path", { d: "m2 16 4.5-9 4.5 9" }],
    ["path", { d: "M18 7v9" }],
    ["path", { d: "m14 12 4 4 4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pt = [
  "svg",
  a,
  [
    ["path", { d: "M3.5 13h6" }],
    ["path", { d: "m2 16 4.5-9 4.5 9" }],
    ["path", { d: "M18 16V7" }],
    ["path", { d: "m14 11 4-4 4 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ct = [
  "svg",
  a,
  [
    ["path", { d: "M21 14h-5" }],
    ["path", { d: "M16 16v-3.5a2.5 2.5 0 0 1 5 0V16" }],
    ["path", { d: "M4.5 13h6" }],
    ["path", { d: "m3 16 4.5-9 4.5 9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const et = [
  "svg",
  a,
  [
    ["circle", { cx: "16", cy: "4", r: "1" }],
    ["path", { d: "m18 19 1-7-6 1" }],
    ["path", { d: "m5 8 3-3 5.5 3-2.36 3.5" }],
    ["path", { d: "M4.24 14.5a5 5 0 0 0 6.88 6" }],
    ["path", { d: "M13.76 17.5a5 5 0 0 0-6.88-6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const st = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mt = [
  "svg",
  a,
  [
    ["path", { d: "M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" }],
    ["path", { d: "M6 8h12" }],
    ["path", { d: "M18.3 17.7a2.5 2.5 0 0 1-3.16 3.83 2.53 2.53 0 0 1-1.14-2V12" }],
    ["path", { d: "M6.6 15.6A2 2 0 1 0 10 17v-5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rt = [
  "svg",
  a,
  [
    ["path", { d: "M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" }],
    ["path", { d: "m12 15 5 6H7Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const t1 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "13", r: "8" }],
    ["path", { d: "M5 3 2 6" }],
    ["path", { d: "m22 6-3-3" }],
    ["path", { d: "M6.38 18.7 4 21" }],
    ["path", { d: "M17.64 18.67 20 21" }],
    ["path", { d: "m9 13 2 2 4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h1 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "13", r: "8" }],
    ["path", { d: "M5 3 2 6" }],
    ["path", { d: "m22 6-3-3" }],
    ["path", { d: "M6.38 18.7 4 21" }],
    ["path", { d: "M17.64 18.67 20 21" }],
    ["path", { d: "M9 13h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nt = [
  "svg",
  a,
  [
    ["path", { d: "M6.87 6.87a8 8 0 1 0 11.26 11.26" }],
    ["path", { d: "M19.9 14.25a8 8 0 0 0-9.15-9.15" }],
    ["path", { d: "m22 6-3-3" }],
    ["path", { d: "M6.26 18.67 4 21" }],
    ["path", { d: "m2 2 20 20" }],
    ["path", { d: "M4 4 2 6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const d1 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "13", r: "8" }],
    ["path", { d: "M5 3 2 6" }],
    ["path", { d: "m22 6-3-3" }],
    ["path", { d: "M6.38 18.7 4 21" }],
    ["path", { d: "M17.64 18.67 20 21" }],
    ["path", { d: "M12 10v6" }],
    ["path", { d: "M9 13h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vt = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "13", r: "8" }],
    ["path", { d: "M12 9v4l2 2" }],
    ["path", { d: "M5 3 2 6" }],
    ["path", { d: "m22 6-3-3" }],
    ["path", { d: "M6.38 18.7 4 21" }],
    ["path", { d: "M17.64 18.67 20 21" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ot = [
  "svg",
  a,
  [
    ["path", { d: "M11 21c0-2.5 2-2.5 2-5" }],
    ["path", { d: "M16 21c0-2.5 2-2.5 2-5" }],
    ["path", { d: "m19 8-.8 3a1.25 1.25 0 0 1-1.2 1H7a1.25 1.25 0 0 1-1.2-1L5 8" }],
    ["path", { d: "M21 3a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a1 1 0 0 1 1-1z" }],
    ["path", { d: "M6 21c0-2.5 2-2.5 2-5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const it = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
    ["polyline", { points: "11 3 11 11 14 8 17 11 17 3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lt = [
  "svg",
  a,
  [
    ["path", { d: "M2 12h20" }],
    ["path", { d: "M10 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4" }],
    ["path", { d: "M10 8V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4" }],
    ["path", { d: "M20 16v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1" }],
    ["path", { d: "M14 8V7c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gt = [
  "svg",
  a,
  [
    ["path", { d: "M12 2v20" }],
    ["path", { d: "M8 10H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h4" }],
    ["path", { d: "M16 10h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4" }],
    ["path", { d: "M8 20H7a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h1" }],
    ["path", { d: "M16 14h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xt = [
  "svg",
  a,
  [
    ["line", { x1: "21", x2: "3", y1: "6", y2: "6" }],
    ["line", { x1: "17", x2: "7", y1: "12", y2: "12" }],
    ["line", { x1: "19", x2: "5", y1: "18", y2: "18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yt = [
  "svg",
  a,
  [
    ["rect", { width: "6", height: "16", x: "4", y: "2", rx: "2" }],
    ["rect", { width: "6", height: "9", x: "14", y: "9", rx: "2" }],
    ["path", { d: "M22 22H2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mt = [
  "svg",
  a,
  [
    ["rect", { width: "16", height: "6", x: "2", y: "4", rx: "2" }],
    ["rect", { width: "9", height: "6", x: "9", y: "14", rx: "2" }],
    ["path", { d: "M22 22V2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ht = [
  "svg",
  a,
  [
    ["rect", { width: "6", height: "14", x: "4", y: "5", rx: "2" }],
    ["rect", { width: "6", height: "10", x: "14", y: "7", rx: "2" }],
    ["path", { d: "M17 22v-5" }],
    ["path", { d: "M17 7V2" }],
    ["path", { d: "M7 22v-3" }],
    ["path", { d: "M7 5V2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ut = [
  "svg",
  a,
  [
    ["rect", { width: "6", height: "14", x: "4", y: "5", rx: "2" }],
    ["rect", { width: "6", height: "10", x: "14", y: "7", rx: "2" }],
    ["path", { d: "M10 2v20" }],
    ["path", { d: "M20 2v20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vt = [
  "svg",
  a,
  [
    ["rect", { width: "6", height: "14", x: "4", y: "5", rx: "2" }],
    ["rect", { width: "6", height: "10", x: "14", y: "7", rx: "2" }],
    ["path", { d: "M4 2v20" }],
    ["path", { d: "M14 2v20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wt = [
  "svg",
  a,
  [
    ["rect", { width: "6", height: "14", x: "2", y: "5", rx: "2" }],
    ["rect", { width: "6", height: "10", x: "16", y: "7", rx: "2" }],
    ["path", { d: "M12 2v20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ct = [
  "svg",
  a,
  [
    ["rect", { width: "6", height: "14", x: "2", y: "5", rx: "2" }],
    ["rect", { width: "6", height: "10", x: "12", y: "7", rx: "2" }],
    ["path", { d: "M22 2v20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const At = [
  "svg",
  a,
  [
    ["rect", { width: "6", height: "14", x: "6", y: "5", rx: "2" }],
    ["rect", { width: "6", height: "10", x: "16", y: "7", rx: "2" }],
    ["path", { d: "M2 2v20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ft = [
  "svg",
  a,
  [
    ["rect", { width: "6", height: "10", x: "9", y: "7", rx: "2" }],
    ["path", { d: "M4 22V2" }],
    ["path", { d: "M20 22V2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lt = [
  "svg",
  a,
  [
    ["rect", { width: "6", height: "14", x: "3", y: "5", rx: "2" }],
    ["rect", { width: "6", height: "10", x: "15", y: "7", rx: "2" }],
    ["path", { d: "M3 2v20" }],
    ["path", { d: "M21 2v20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const St = [
  "svg",
  a,
  [
    ["line", { x1: "3", x2: "21", y1: "6", y2: "6" }],
    ["line", { x1: "3", x2: "21", y1: "12", y2: "12" }],
    ["line", { x1: "3", x2: "21", y1: "18", y2: "18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zt = [
  "svg",
  a,
  [
    ["line", { x1: "21", x2: "3", y1: "6", y2: "6" }],
    ["line", { x1: "15", x2: "3", y1: "12", y2: "12" }],
    ["line", { x1: "17", x2: "3", y1: "18", y2: "18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kt = [
  "svg",
  a,
  [
    ["line", { x1: "21", x2: "3", y1: "6", y2: "6" }],
    ["line", { x1: "21", x2: "9", y1: "12", y2: "12" }],
    ["line", { x1: "21", x2: "7", y1: "18", y2: "18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pt = [
  "svg",
  a,
  [
    ["rect", { width: "6", height: "16", x: "4", y: "6", rx: "2" }],
    ["rect", { width: "6", height: "9", x: "14", y: "6", rx: "2" }],
    ["path", { d: "M22 2H2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zt = [
  "svg",
  a,
  [
    ["rect", { width: "9", height: "6", x: "6", y: "14", rx: "2" }],
    ["rect", { width: "16", height: "6", x: "6", y: "4", rx: "2" }],
    ["path", { d: "M2 2v20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bt = [
  "svg",
  a,
  [
    ["path", { d: "M22 17h-3" }],
    ["path", { d: "M22 7h-5" }],
    ["path", { d: "M5 17H2" }],
    ["path", { d: "M7 7H2" }],
    ["rect", { x: "5", y: "14", width: "14", height: "6", rx: "2" }],
    ["rect", { x: "7", y: "4", width: "10", height: "6", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tt = [
  "svg",
  a,
  [
    ["rect", { width: "14", height: "6", x: "5", y: "14", rx: "2" }],
    ["rect", { width: "10", height: "6", x: "7", y: "4", rx: "2" }],
    ["path", { d: "M2 20h20" }],
    ["path", { d: "M2 10h20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dt = [
  "svg",
  a,
  [
    ["rect", { width: "14", height: "6", x: "5", y: "14", rx: "2" }],
    ["rect", { width: "10", height: "6", x: "7", y: "4", rx: "2" }],
    ["path", { d: "M2 14h20" }],
    ["path", { d: "M2 4h20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ft = [
  "svg",
  a,
  [
    ["rect", { width: "14", height: "6", x: "5", y: "16", rx: "2" }],
    ["rect", { width: "10", height: "6", x: "7", y: "2", rx: "2" }],
    ["path", { d: "M2 12h20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bt = [
  "svg",
  a,
  [
    ["rect", { width: "14", height: "6", x: "5", y: "12", rx: "2" }],
    ["rect", { width: "10", height: "6", x: "7", y: "2", rx: "2" }],
    ["path", { d: "M2 22h20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rt = [
  "svg",
  a,
  [
    ["rect", { width: "14", height: "6", x: "5", y: "16", rx: "2" }],
    ["rect", { width: "10", height: "6", x: "7", y: "6", rx: "2" }],
    ["path", { d: "M2 2h20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ot = [
  "svg",
  a,
  [
    ["rect", { width: "10", height: "6", x: "7", y: "9", rx: "2" }],
    ["path", { d: "M22 20H2" }],
    ["path", { d: "M22 4H2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qt = [
  "svg",
  a,
  [
    ["rect", { width: "14", height: "6", x: "5", y: "15", rx: "2" }],
    ["rect", { width: "10", height: "6", x: "7", y: "3", rx: "2" }],
    ["path", { d: "M2 21h20" }],
    ["path", { d: "M2 3h20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ut = [
  "svg",
  a,
  [
    ["path", { d: "M10 10H6" }],
    ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" }],
    [
      "path",
      {
        d: "M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14"
      }
    ],
    ["path", { d: "M8 8v4" }],
    ["path", { d: "M9 18h6" }],
    ["circle", { cx: "17", cy: "18", r: "2" }],
    ["circle", { cx: "7", cy: "18", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _t = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M17.5 12c0 4.4-3.6 8-8 8A4.5 4.5 0 0 1 5 15.5c0-6 8-4 8-8.5a3 3 0 1 0-6 0c0 3 2.5 8.5 12 13"
      }
    ],
    ["path", { d: "M16 12h3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Et = [
  "svg",
  a,
  [
    [
      "path",
      { d: "M10 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5" }
    ],
    [
      "path",
      { d: "M22 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5" }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nt = [
  "svg",
  a,
  [
    ["path", { d: "M10 2v5.632c0 .424-.272.795-.653.982A6 6 0 0 0 6 14c.006 4 3 7 5 8" }],
    ["path", { d: "M10 5H8a2 2 0 0 0 0 4h.68" }],
    ["path", { d: "M14 2v5.632c0 .424.272.795.652.982A6 6 0 0 1 18 14c0 4-3 7-5 8" }],
    ["path", { d: "M14 5h2a2 2 0 0 1 0 4h-.68" }],
    ["path", { d: "M18 22H6" }],
    ["path", { d: "M9 2h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const It = [
  "svg",
  a,
  [
    ["path", { d: "M12 22V8" }],
    ["path", { d: "M5 12H2a10 10 0 0 0 20 0h-3" }],
    ["circle", { cx: "12", cy: "5", r: "3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gt = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M16 16s-1.5-2-4-2-4 2-4 2" }],
    ["path", { d: "M7.5 8 10 9" }],
    ["path", { d: "m14 9 2.5-1" }],
    ["path", { d: "M9 10h.01" }],
    ["path", { d: "M15 10h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xt = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M8 15h8" }],
    ["path", { d: "M8 9h2" }],
    ["path", { d: "M14 9h2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wt = [
  "svg",
  a,
  [
    ["path", { d: "M2 12 7 2" }],
    ["path", { d: "m7 12 5-10" }],
    ["path", { d: "m12 12 5-10" }],
    ["path", { d: "m17 12 5-10" }],
    ["path", { d: "M4.5 7h15" }],
    ["path", { d: "M12 16v6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $t = [
  "svg",
  a,
  [
    ["path", { d: "M7 10H6a4 4 0 0 1-4-4 1 1 0 0 1 1-1h4" }],
    ["path", { d: "M7 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1 7 7 0 0 1-7 7H8a1 1 0 0 1-1-1z" }],
    ["path", { d: "M9 12v5" }],
    ["path", { d: "M15 12v5" }],
    ["path", { d: "M5 20a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kt = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "m14.31 8 5.74 9.94" }],
    ["path", { d: "M9.69 8h11.48" }],
    ["path", { d: "m7.38 12 5.74-9.94" }],
    ["path", { d: "M9.69 16 3.95 6.06" }],
    ["path", { d: "M14.31 16H2.83" }],
    ["path", { d: "m16.62 12-5.74 9.94" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jt = [
  "svg",
  a,
  [
    ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }],
    ["path", { d: "M6 8h.01" }],
    ["path", { d: "M10 8h.01" }],
    ["path", { d: "M14 8h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qt = [
  "svg",
  a,
  [
    ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }],
    ["path", { d: "M10 4v4" }],
    ["path", { d: "M2 8h20" }],
    ["path", { d: "M6 4v4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yt = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"
      }
    ],
    ["path", { d: "M10 2c1 .5 2 2 2 5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jt = [
  "svg",
  a,
  [
    ["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1" }],
    ["path", { d: "M4 8v11a2 2 0 0 0 2 2h2" }],
    ["path", { d: "M20 8v11a2 2 0 0 1-2 2h-2" }],
    ["path", { d: "m9 15 3-3 3 3" }],
    ["path", { d: "M12 12v9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ah = [
  "svg",
  a,
  [
    ["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1" }],
    ["path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" }],
    ["path", { d: "m9.5 17 5-5" }],
    ["path", { d: "m9.5 12 5 5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const th = [
  "svg",
  a,
  [
    ["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1" }],
    ["path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" }],
    ["path", { d: "M10 12h4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hh = [
  "svg",
  a,
  [
    ["path", { d: "M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" }],
    [
      "path",
      {
        d: "M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"
      }
    ],
    ["path", { d: "M5 18v2" }],
    ["path", { d: "M19 18v2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dh = [
  "svg",
  a,
  [
    ["path", { d: "M15 5H9" }],
    ["path", { d: "M15 9v3h4l-7 7-7-7h4V9z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ph = [
  "svg",
  a,
  [["path", { d: "M15 6v6h4l-7 7-7-7h4V6h6z" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ch = [
  "svg",
  a,
  [
    ["path", { d: "M19 15V9" }],
    ["path", { d: "M15 15h-3v4l-7-7 7-7v4h3v6z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eh = [
  "svg",
  a,
  [["path", { d: "M18 15h-6v4l-7-7 7-7v4h6v6z" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sh = [
  "svg",
  a,
  [
    ["path", { d: "M5 9v6" }],
    ["path", { d: "M9 9h3V5l7 7-7 7v-4H9V9z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mh = [
  "svg",
  a,
  [["path", { d: "M6 9h6V5l7 7-7 7v-4H6V9z" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rh = [
  "svg",
  a,
  [
    ["path", { d: "M9 19h6" }],
    ["path", { d: "M9 15v-3H5l7-7 7 7h-4v3H9z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nh = [
  "svg",
  a,
  [["path", { d: "M9 18v-6H5l7-7 7 7h-4v6H9z" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vh = [
  "svg",
  a,
  [
    ["path", { d: "m3 16 4 4 4-4" }],
    ["path", { d: "M7 20V4" }],
    ["rect", { x: "15", y: "4", width: "4", height: "6", ry: "2" }],
    ["path", { d: "M17 20v-6h-2" }],
    ["path", { d: "M15 20h4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oh = [
  "svg",
  a,
  [
    ["path", { d: "m3 16 4 4 4-4" }],
    ["path", { d: "M7 20V4" }],
    ["path", { d: "M17 10V4h-2" }],
    ["path", { d: "M15 10h4" }],
    ["rect", { x: "15", y: "14", width: "4", height: "6", ry: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const p1 = [
  "svg",
  a,
  [
    ["path", { d: "m3 16 4 4 4-4" }],
    ["path", { d: "M7 20V4" }],
    ["path", { d: "M20 8h-5" }],
    ["path", { d: "M15 10V6.5a2.5 2.5 0 0 1 5 0V10" }],
    ["path", { d: "M15 14h5l-5 6h5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ih = [
  "svg",
  a,
  [
    ["path", { d: "M19 3H5" }],
    ["path", { d: "M12 21V7" }],
    ["path", { d: "m6 15 6 6 6-6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lh = [
  "svg",
  a,
  [
    ["path", { d: "M17 7 7 17" }],
    ["path", { d: "M17 17H7V7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gh = [
  "svg",
  a,
  [
    ["path", { d: "m3 16 4 4 4-4" }],
    ["path", { d: "M7 20V4" }],
    ["path", { d: "M11 4h4" }],
    ["path", { d: "M11 8h7" }],
    ["path", { d: "M11 12h10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xh = [
  "svg",
  a,
  [
    ["path", { d: "m7 7 10 10" }],
    ["path", { d: "M17 7v10H7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yh = [
  "svg",
  a,
  [
    ["path", { d: "M12 2v14" }],
    ["path", { d: "m19 9-7 7-7-7" }],
    ["circle", { cx: "12", cy: "21", r: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mh = [
  "svg",
  a,
  [
    ["path", { d: "M12 17V3" }],
    ["path", { d: "m6 11 6 6 6-6" }],
    ["path", { d: "M19 21H5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hh = [
  "svg",
  a,
  [
    ["path", { d: "m3 16 4 4 4-4" }],
    ["path", { d: "M7 20V4" }],
    ["path", { d: "m21 8-4-4-4 4" }],
    ["path", { d: "M17 4v16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const c1 = [
  "svg",
  a,
  [
    ["path", { d: "m3 16 4 4 4-4" }],
    ["path", { d: "M7 20V4" }],
    ["path", { d: "M11 4h10" }],
    ["path", { d: "M11 8h7" }],
    ["path", { d: "M11 12h4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const e1 = [
  "svg",
  a,
  [
    ["path", { d: "m3 16 4 4 4-4" }],
    ["path", { d: "M7 4v16" }],
    ["path", { d: "M15 4h5l-5 6h5" }],
    ["path", { d: "M15 20v-3.5a2.5 2.5 0 0 1 5 0V20" }],
    ["path", { d: "M20 18h-5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const uh = [
  "svg",
  a,
  [
    ["path", { d: "M12 5v14" }],
    ["path", { d: "m19 12-7 7-7-7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vh = [
  "svg",
  a,
  [
    ["path", { d: "m9 6-6 6 6 6" }],
    ["path", { d: "M3 12h14" }],
    ["path", { d: "M21 19V5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wh = [
  "svg",
  a,
  [
    ["path", { d: "M8 3 4 7l4 4" }],
    ["path", { d: "M4 7h16" }],
    ["path", { d: "m16 21 4-4-4-4" }],
    ["path", { d: "M20 17H4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ch = [
  "svg",
  a,
  [
    ["path", { d: "M3 19V5" }],
    ["path", { d: "m13 6-6 6 6 6" }],
    ["path", { d: "M7 12h14" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ah = [
  "svg",
  a,
  [
    ["path", { d: "m12 19-7-7 7-7" }],
    ["path", { d: "M19 12H5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fh = [
  "svg",
  a,
  [
    ["path", { d: "M3 5v14" }],
    ["path", { d: "M21 12H7" }],
    ["path", { d: "m15 18 6-6-6-6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lh = [
  "svg",
  a,
  [
    ["path", { d: "m16 3 4 4-4 4" }],
    ["path", { d: "M20 7H4" }],
    ["path", { d: "m8 21-4-4 4-4" }],
    ["path", { d: "M4 17h16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sh = [
  "svg",
  a,
  [
    ["path", { d: "M17 12H3" }],
    ["path", { d: "m11 18 6-6-6-6" }],
    ["path", { d: "M21 5v14" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zh = [
  "svg",
  a,
  [
    ["path", { d: "M5 12h14" }],
    ["path", { d: "m12 5 7 7-7 7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kh = [
  "svg",
  a,
  [
    ["path", { d: "m3 8 4-4 4 4" }],
    ["path", { d: "M7 4v16" }],
    ["rect", { x: "15", y: "4", width: "4", height: "6", ry: "2" }],
    ["path", { d: "M17 20v-6h-2" }],
    ["path", { d: "M15 20h4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ph = [
  "svg",
  a,
  [
    ["path", { d: "m3 8 4-4 4 4" }],
    ["path", { d: "M7 4v16" }],
    ["path", { d: "M17 10V4h-2" }],
    ["path", { d: "M15 10h4" }],
    ["rect", { x: "15", y: "14", width: "4", height: "6", ry: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const s1 = [
  "svg",
  a,
  [
    ["path", { d: "m3 8 4-4 4 4" }],
    ["path", { d: "M7 4v16" }],
    ["path", { d: "M20 8h-5" }],
    ["path", { d: "M15 10V6.5a2.5 2.5 0 0 1 5 0V10" }],
    ["path", { d: "M15 14h5l-5 6h5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zh = [
  "svg",
  a,
  [
    ["path", { d: "m21 16-4 4-4-4" }],
    ["path", { d: "M17 20V4" }],
    ["path", { d: "m3 8 4-4 4 4" }],
    ["path", { d: "M7 4v16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bh = [
  "svg",
  a,
  [
    ["path", { d: "m5 9 7-7 7 7" }],
    ["path", { d: "M12 16V2" }],
    ["circle", { cx: "12", cy: "21", r: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Th = [
  "svg",
  a,
  [
    ["path", { d: "m18 9-6-6-6 6" }],
    ["path", { d: "M12 3v14" }],
    ["path", { d: "M5 21h14" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dh = [
  "svg",
  a,
  [
    ["path", { d: "M7 17V7h10" }],
    ["path", { d: "M17 17 7 7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const M1 = [
  "svg",
  a,
  [
    ["path", { d: "m3 8 4-4 4 4" }],
    ["path", { d: "M7 4v16" }],
    ["path", { d: "M11 12h4" }],
    ["path", { d: "M11 16h7" }],
    ["path", { d: "M11 20h10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fh = [
  "svg",
  a,
  [
    ["path", { d: "M7 7h10v10" }],
    ["path", { d: "M7 17 17 7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bh = [
  "svg",
  a,
  [
    ["path", { d: "M5 3h14" }],
    ["path", { d: "m18 13-6-6-6 6" }],
    ["path", { d: "M12 7v14" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rh = [
  "svg",
  a,
  [
    ["path", { d: "m3 8 4-4 4 4" }],
    ["path", { d: "M7 4v16" }],
    ["path", { d: "M11 12h10" }],
    ["path", { d: "M11 16h7" }],
    ["path", { d: "M11 20h4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const r1 = [
  "svg",
  a,
  [
    ["path", { d: "m3 8 4-4 4 4" }],
    ["path", { d: "M7 4v16" }],
    ["path", { d: "M15 4h5l-5 6h5" }],
    ["path", { d: "M15 20v-3.5a2.5 2.5 0 0 1 5 0V20" }],
    ["path", { d: "M20 18h-5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Oh = [
  "svg",
  a,
  [
    ["path", { d: "m5 12 7-7 7 7" }],
    ["path", { d: "M12 19V5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qh = [
  "svg",
  a,
  [
    ["path", { d: "m4 6 3-3 3 3" }],
    ["path", { d: "M7 17V3" }],
    ["path", { d: "m14 6 3-3 3 3" }],
    ["path", { d: "M17 17V3" }],
    ["path", { d: "M4 21h16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Uh = [
  "svg",
  a,
  [
    ["path", { d: "M12 6v12" }],
    ["path", { d: "M17.196 9 6.804 15" }],
    ["path", { d: "m6.804 9 10.392 6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _h = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "4" }],
    ["path", { d: "M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Eh = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "1" }],
    [
      "path",
      {
        d: "M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"
      }
    ],
    [
      "path",
      {
        d: "M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nh = [
  "svg",
  a,
  [
    ["path", { d: "M2 10v3" }],
    ["path", { d: "M6 6v11" }],
    ["path", { d: "M10 3v18" }],
    ["path", { d: "M14 8v7" }],
    ["path", { d: "M18 5v13" }],
    ["path", { d: "M22 10v3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ih = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gh = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"
      }
    ],
    ["circle", { cx: "12", cy: "8", r: "6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xh = [
  "svg",
  a,
  [
    ["path", { d: "m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9" }],
    ["path", { d: "M15 13 9 7l4-4 6 6h3a8 8 0 0 1-7 7z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const n1 = [
  "svg",
  a,
  [
    ["path", { d: "M4 4v16h16" }],
    ["path", { d: "m4 20 7-7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wh = [
  "svg",
  a,
  [
    ["path", { d: "M9 12h.01" }],
    ["path", { d: "M15 12h.01" }],
    ["path", { d: "M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" }],
    [
      "path",
      {
        d: "M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $h = [
  "svg",
  a,
  [
    ["path", { d: "M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" }],
    ["path", { d: "M8 10h8" }],
    ["path", { d: "M8 18h8" }],
    ["path", { d: "M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6" }],
    ["path", { d: "M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kh = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      }
    ],
    ["line", { x1: "12", x2: "12", y1: "8", y2: "12" }],
    ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jh = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      }
    ],
    ["path", { d: "M12 7v10" }],
    ["path", { d: "M15.4 10a4 4 0 1 0 0 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const v1 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      }
    ],
    ["path", { d: "m9 12 2 2 4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qh = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      }
    ],
    ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" }],
    ["path", { d: "M12 18V6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yh = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      }
    ],
    ["path", { d: "M7 12h5" }],
    ["path", { d: "M15 9.4a4 4 0 1 0 0 5.2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jh = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      }
    ],
    ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }],
    ["line", { x1: "12", x2: "12.01", y1: "17", y2: "17" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const a4 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      }
    ],
    ["path", { d: "M8 8h8" }],
    ["path", { d: "M8 12h8" }],
    ["path", { d: "m13 17-5-1h1a4 4 0 0 0 0-8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const t4 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      }
    ],
    ["line", { x1: "12", x2: "12", y1: "16", y2: "12" }],
    ["line", { x1: "12", x2: "12.01", y1: "8", y2: "8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h4 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      }
    ],
    ["path", { d: "m9 8 3 3v7" }],
    ["path", { d: "m12 11 3-3" }],
    ["path", { d: "M9 12h6" }],
    ["path", { d: "M9 16h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const d4 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      }
    ],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const p4 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      }
    ],
    ["path", { d: "m15 9-6 6" }],
    ["path", { d: "M9 9h.01" }],
    ["path", { d: "M15 15h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const c4 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      }
    ],
    ["line", { x1: "12", x2: "12", y1: "8", y2: "16" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const e4 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      }
    ],
    ["path", { d: "M8 12h4" }],
    ["path", { d: "M10 16V9.5a2.5 2.5 0 0 1 5 0" }],
    ["path", { d: "M8 16h7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const s4 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      }
    ],
    ["path", { d: "M9 16h5" }],
    ["path", { d: "M9 12h5a2 2 0 1 0 0-4h-3v9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const M4 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      }
    ],
    ["path", { d: "M11 17V8h4" }],
    ["path", { d: "M11 12h3" }],
    ["path", { d: "M9 16h4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const r4 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      }
    ],
    ["line", { x1: "15", x2: "9", y1: "9", y2: "15" }],
    ["line", { x1: "9", x2: "15", y1: "9", y2: "15" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const n4 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const v4 = [
  "svg",
  a,
  [
    ["path", { d: "M22 18H6a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2" }],
    ["path", { d: "M17 14V4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v10" }],
    ["rect", { width: "13", height: "8", x: "8", y: "6", rx: "1" }],
    ["circle", { cx: "18", cy: "20", r: "2" }],
    ["circle", { cx: "9", cy: "20", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const o4 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "m4.9 4.9 14.2 14.2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const i4 = [
  "svg",
  a,
  [
    ["path", { d: "M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5" }],
    [
      "path",
      {
        d: "M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const l4 = [
  "svg",
  a,
  [
    ["path", { d: "M10 10.01h.01" }],
    ["path", { d: "M10 14.01h.01" }],
    ["path", { d: "M14 10.01h.01" }],
    ["path", { d: "M14 14.01h.01" }],
    ["path", { d: "M18 6v11.5" }],
    ["path", { d: "M6 6v12" }],
    ["rect", { x: "2", y: "6", width: "20", height: "12", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const g4 = [
  "svg",
  a,
  [
    ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2" }],
    ["circle", { cx: "12", cy: "12", r: "2" }],
    ["path", { d: "M6 12h.01M18 12h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x4 = [
  "svg",
  a,
  [
    ["path", { d: "M3 5v14" }],
    ["path", { d: "M8 5v14" }],
    ["path", { d: "M12 5v14" }],
    ["path", { d: "M17 5v14" }],
    ["path", { d: "M21 5v14" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y4 = [
  "svg",
  a,
  [
    ["path", { d: "M4 20h16" }],
    ["path", { d: "m6 16 6-12 6 12" }],
    ["path", { d: "M8 12h8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const m4 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"
      }
    ],
    ["line", { x1: "10", x2: "8", y1: "5", y2: "7" }],
    ["line", { x1: "2", x2: "22", y1: "12", y2: "12" }],
    ["line", { x1: "7", x2: "7", y1: "19", y2: "21" }],
    ["line", { x1: "17", x2: "17", y1: "19", y2: "21" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const H4 = [
  "svg",
  a,
  [
    ["path", { d: "M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" }],
    ["path", { d: "M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1" }],
    ["path", { d: "m11 7-3 5h4l-3 5" }],
    ["line", { x1: "22", x2: "22", y1: "11", y2: "13" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const u4 = [
  "svg",
  a,
  [
    ["rect", { width: "16", height: "10", x: "2", y: "7", rx: "2", ry: "2" }],
    ["line", { x1: "22", x2: "22", y1: "11", y2: "13" }],
    ["line", { x1: "6", x2: "6", y1: "11", y2: "13" }],
    ["line", { x1: "10", x2: "10", y1: "11", y2: "13" }],
    ["line", { x1: "14", x2: "14", y1: "11", y2: "13" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const V4 = [
  "svg",
  a,
  [
    ["rect", { width: "16", height: "10", x: "2", y: "7", rx: "2", ry: "2" }],
    ["line", { x1: "22", x2: "22", y1: "11", y2: "13" }],
    ["line", { x1: "6", x2: "6", y1: "11", y2: "13" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const w4 = [
  "svg",
  a,
  [
    ["rect", { width: "16", height: "10", x: "2", y: "7", rx: "2", ry: "2" }],
    ["line", { x1: "22", x2: "22", y1: "11", y2: "13" }],
    ["line", { x1: "6", x2: "6", y1: "11", y2: "13" }],
    ["line", { x1: "10", x2: "10", y1: "11", y2: "13" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C4 = [
  "svg",
  a,
  [
    ["path", { d: "M10 17h.01" }],
    ["path", { d: "M10 7v6" }],
    ["path", { d: "M14 7h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" }],
    ["path", { d: "M22 11v2" }],
    ["path", { d: "M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const A4 = [
  "svg",
  a,
  [
    ["rect", { width: "16", height: "10", x: "2", y: "7", rx: "2", ry: "2" }],
    ["line", { x1: "22", x2: "22", y1: "11", y2: "13" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const f4 = [
  "svg",
  a,
  [
    ["path", { d: "M4.5 3h15" }],
    ["path", { d: "M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" }],
    ["path", { d: "M6 14h12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const L4 = [
  "svg",
  a,
  [
    ["path", { d: "M9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22a13.96 13.96 0 0 0 9.9-4.1" }],
    ["path", { d: "M10.75 5.093A6 6 0 0 1 22 8c0 2.411-.61 4.68-1.683 6.66" }],
    ["path", { d: "M5.341 10.62a4 4 0 0 0 6.487 1.208M10.62 5.341a4.015 4.015 0 0 1 2.039 2.04" }],
    ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S4 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M10.165 6.598C9.954 7.478 9.64 8.36 9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22c7.732 0 14-6.268 14-14a6 6 0 0 0-11.835-1.402Z"
      }
    ],
    ["path", { d: "M5.341 10.62a4 4 0 1 0 5.279-5.28" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z4 = [
  "svg",
  a,
  [
    ["path", { d: "M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" }],
    ["path", { d: "M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" }],
    ["path", { d: "M12 4v6" }],
    ["path", { d: "M2 18h20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k4 = [
  "svg",
  a,
  [
    ["path", { d: "M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8" }],
    ["path", { d: "M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" }],
    ["path", { d: "M3 18h18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const P4 = [
  "svg",
  a,
  [
    ["path", { d: "M2 4v16" }],
    ["path", { d: "M2 8h18a2 2 0 0 1 2 2v10" }],
    ["path", { d: "M2 17h20" }],
    ["path", { d: "M6 8v9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z4 = [
  "svg",
  a,
  [
    ["circle", { cx: "12.5", cy: "8.5", r: "2.5" }],
    [
      "path",
      {
        d: "M12.5 2a6.5 6.5 0 0 0-6.22 4.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3A6.5 6.5 0 0 0 12.5 2Z"
      }
    ],
    [
      "path",
      {
        d: "m18.5 6 2.19 4.5a6.48 6.48 0 0 1 .31 2 6.49 6.49 0 0 1-2.6 5.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B4 = [
  "svg",
  a,
  [
    ["path", { d: "M13 13v5" }],
    ["path", { d: "M17 11.47V8" }],
    ["path", { d: "M17 11h1a3 3 0 0 1 2.745 4.211" }],
    ["path", { d: "m2 2 20 20" }],
    ["path", { d: "M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3" }],
    ["path", { d: "M7.536 7.535C6.766 7.649 6.154 8 5.5 8a2.5 2.5 0 0 1-1.768-4.268" }],
    [
      "path",
      {
        d: "M8.727 3.204C9.306 2.767 9.885 2 11 2c1.56 0 2 1.5 3 1.5s1.72-.5 2.5-.5a1 1 0 1 1 0 5c-.78 0-1.5-.5-2.5-.5a3.149 3.149 0 0 0-.842.12"
      }
    ],
    ["path", { d: "M9 14.6V18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const T4 = [
  "svg",
  a,
  [
    ["path", { d: "M17 11h1a3 3 0 0 1 0 6h-1" }],
    ["path", { d: "M9 12v6" }],
    ["path", { d: "M13 12v6" }],
    [
      "path",
      {
        d: "M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z"
      }
    ],
    ["path", { d: "M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const D4 = [
  "svg",
  a,
  [
    ["path", { d: "M19.4 14.9C20.2 16.4 21 17 21 17H3s3-2 3-9c0-3.3 2.7-6 6-6 .7 0 1.3.1 1.9.3" }],
    ["path", { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0" }],
    ["circle", { cx: "18", cy: "8", r: "3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const F4 = [
  "svg",
  a,
  [
    ["path", { d: "M18.8 4A6.3 8.7 0 0 1 20 9" }],
    ["path", { d: "M9 9h.01" }],
    ["circle", { cx: "9", cy: "9", r: "7" }],
    ["rect", { width: "10", height: "6", x: "4", y: "16", rx: "2" }],
    ["path", { d: "M14 19c3 0 4.6-1.6 4.6-1.6" }],
    ["circle", { cx: "20", cy: "16", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const b4 = [
  "svg",
  a,
  [
    ["path", { d: "M18.4 12c.8 3.8 2.6 5 2.6 5H3s3-2 3-9c0-3.3 2.7-6 6-6 1.8 0 3.4.8 4.5 2" }],
    ["path", { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0" }],
    ["path", { d: "M15 8h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R4 = [
  "svg",
  a,
  [
    ["path", { d: "M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0 .6 5" }],
    ["path", { d: "M17 17H3s3-2 3-9a4.67 4.67 0 0 1 .3-1.7" }],
    ["path", { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0" }],
    ["path", { d: "m2 2 20 20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O4 = [
  "svg",
  a,
  [
    ["path", { d: "M19.3 14.8C20.1 16.4 21 17 21 17H3s3-2 3-9c0-3.3 2.7-6 6-6 1 0 1.9.2 2.8.7" }],
    ["path", { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0" }],
    ["path", { d: "M15 8h6" }],
    ["path", { d: "M18 5v6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const q4 = [
  "svg",
  a,
  [
    ["path", { d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" }],
    ["path", { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0" }],
    ["path", { d: "M4 2C2.8 3.7 2 5.7 2 8" }],
    ["path", { d: "M22 8c0-2.3-.8-4.3-2-6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U4 = [
  "svg",
  a,
  [
    ["path", { d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" }],
    ["path", { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const o1 = [
  "svg",
  a,
  [
    ["rect", { width: "13", height: "7", x: "3", y: "3", rx: "1" }],
    ["path", { d: "m22 15-3-3 3-3" }],
    ["rect", { width: "13", height: "7", x: "3", y: "14", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const i1 = [
  "svg",
  a,
  [
    ["rect", { width: "13", height: "7", x: "8", y: "3", rx: "1" }],
    ["path", { d: "m2 9 3 3-3 3" }],
    ["rect", { width: "13", height: "7", x: "8", y: "14", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _4 = [
  "svg",
  a,
  [
    ["rect", { width: "7", height: "13", x: "3", y: "3", rx: "1" }],
    ["path", { d: "m9 22 3-3 3 3" }],
    ["rect", { width: "7", height: "13", x: "14", y: "3", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const E4 = [
  "svg",
  a,
  [
    ["rect", { width: "7", height: "13", x: "3", y: "8", rx: "1" }],
    ["path", { d: "m15 2-3 3-3-3" }],
    ["rect", { width: "7", height: "13", x: "14", y: "8", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const N4 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M12.409 13.017A5 5 0 0 1 22 15c0 3.866-4 7-9 7-4.077 0-8.153-.82-10.371-2.462-.426-.316-.631-.832-.62-1.362C2.118 12.723 2.627 2 10 2a3 3 0 0 1 3 3 2 2 0 0 1-2 2c-1.105 0-1.64-.444-2-1"
      }
    ],
    ["path", { d: "M15 14a5 5 0 0 0-7.584 2" }],
    ["path", { d: "M9.964 6.825C8.019 7.977 9.5 13 8 15" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I4 = [
  "svg",
  a,
  [
    ["circle", { cx: "18.5", cy: "17.5", r: "3.5" }],
    ["circle", { cx: "5.5", cy: "17.5", r: "3.5" }],
    ["circle", { cx: "15", cy: "5", r: "1" }],
    ["path", { d: "M12 17.5V14l-3-3 4-3 2 3h2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G4 = [
  "svg",
  a,
  [
    ["rect", { x: "14", y: "14", width: "4", height: "6", rx: "2" }],
    ["rect", { x: "6", y: "4", width: "4", height: "6", rx: "2" }],
    ["path", { d: "M6 20h4" }],
    ["path", { d: "M14 10h4" }],
    ["path", { d: "M6 14h2v6" }],
    ["path", { d: "M14 4h2v6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X4 = [
  "svg",
  a,
  [
    ["path", { d: "M10 10h4" }],
    ["path", { d: "M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3" }],
    [
      "path",
      {
        d: "M20 21a2 2 0 0 0 2-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2z"
      }
    ],
    ["path", { d: "M 22 16 L 2 16" }],
    [
      "path",
      {
        d: "M4 21a2 2 0 0 1-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2z"
      }
    ],
    ["path", { d: "M9 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const W4 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "11.9", r: "2" }],
    ["path", { d: "M6.7 3.4c-.9 2.5 0 5.2 2.2 6.7C6.5 9 3.7 9.6 2 11.6" }],
    ["path", { d: "m8.9 10.1 1.4.8" }],
    ["path", { d: "M17.3 3.4c.9 2.5 0 5.2-2.2 6.7 2.4-1.2 5.2-.6 6.9 1.5" }],
    ["path", { d: "m15.1 10.1-1.4.8" }],
    ["path", { d: "M16.7 20.8c-2.6-.4-4.6-2.6-4.7-5.3-.2 2.6-2.1 4.8-4.7 5.2" }],
    ["path", { d: "M12 13.9v1.6" }],
    ["path", { d: "M13.5 5.4c-1-.2-2-.2-3 0" }],
    ["path", { d: "M17 16.4c.7-.7 1.2-1.6 1.5-2.5" }],
    ["path", { d: "M5.5 13.9c.3.9.8 1.8 1.5 2.5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $4 = [
  "svg",
  a,
  [
    ["path", { d: "M16 7h.01" }],
    ["path", { d: "M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" }],
    ["path", { d: "m20 7 2 .5-2 .5" }],
    ["path", { d: "M10 18v3" }],
    ["path", { d: "M14 17.75V21" }],
    ["path", { d: "M7 18a6 6 0 0 0 3.84-10.61" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const K4 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J4 = [
  "svg",
  a,
  [
    ["circle", { cx: "9", cy: "9", r: "7" }],
    ["circle", { cx: "15", cy: "15", r: "7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Q4 = [
  "svg",
  a,
  [
    ["path", { d: "M3 3h18" }],
    ["path", { d: "M20 7H8" }],
    ["path", { d: "M20 11H8" }],
    ["path", { d: "M10 19h10" }],
    ["path", { d: "M8 15h12" }],
    ["path", { d: "M4 3v14" }],
    ["circle", { cx: "4", cy: "19", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y4 = [
  "svg",
  a,
  [
    ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1" }],
    [
      "path",
      {
        d: "M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j4 = [
  "svg",
  a,
  [
    ["path", { d: "m7 7 10 10-5 5V2l5 5L7 17" }],
    ["line", { x1: "18", x2: "21", y1: "12", y2: "12" }],
    ["line", { x1: "3", x2: "6", y1: "12", y2: "12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const a5 = [
  "svg",
  a,
  [
    ["path", { d: "m17 17-5 5V12l-5 5" }],
    ["path", { d: "m2 2 20 20" }],
    ["path", { d: "M14.5 9.5 17 7l-5-5v4.5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const t5 = [
  "svg",
  a,
  [
    ["path", { d: "m7 7 10 10-5 5V2l5 5L7 17" }],
    ["path", { d: "M20.83 14.83a4 4 0 0 0 0-5.66" }],
    ["path", { d: "M18 12h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h5 = [
  "svg",
  a,
  [["path", { d: "m7 7 10 10-5 5V2l5 5L7 17" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const d5 = [
  "svg",
  a,
  [["path", { d: "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const p5 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
      }
    ],
    ["circle", { cx: "12", cy: "12", r: "4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const c5 = [
  "svg",
  a,
  [
    ["circle", { cx: "11", cy: "13", r: "9" }],
    [
      "path",
      { d: "M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.4 0l1.6 1.6a2.4 2.4 0 0 1 0 3.4l-1.95 1.95" }
    ],
    ["path", { d: "m22 2-1.5 1.5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const e5 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const s5 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
      }
    ],
    ["path", { d: "m8 13 4-7 4 7" }],
    ["path", { d: "M9.1 11h5.7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const M5 = [
  "svg",
  a,
  [
    ["path", { d: "M12 6v7" }],
    ["path", { d: "M16 8v3" }],
    [
      "path",
      {
        d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
      }
    ],
    ["path", { d: "M8 8v3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const r5 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
      }
    ],
    ["path", { d: "m9 9.5 2 2 4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const n5 = [
  "svg",
  a,
  [
    ["path", { d: "M2 16V4a2 2 0 0 1 2-2h11" }],
    [
      "path",
      {
        d: "M22 18H11a2 2 0 1 0 0 4h10.5a.5.5 0 0 0 .5-.5v-15a.5.5 0 0 0-.5-.5H11a2 2 0 0 0-2 2v12"
      }
    ],
    ["path", { d: "M5 14H4a2 2 0 1 0 0 4h1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const l1 = [
  "svg",
  a,
  [
    ["path", { d: "M12 17h2" }],
    ["path", { d: "M12 22h2" }],
    ["path", { d: "M12 2h2" }],
    ["path", { d: "M18 22h1a1 1 0 0 0 1-1" }],
    ["path", { d: "M18 2h1a1 1 0 0 1 1 1v1" }],
    ["path", { d: "M20 15v2h-2" }],
    ["path", { d: "M20 8v3" }],
    ["path", { d: "M4 11V9" }],
    ["path", { d: "M4 19.5V15" }],
    ["path", { d: "M4 5v-.5A2.5 2.5 0 0 1 6.5 2H8" }],
    ["path", { d: "M8 22H6.5a1 1 0 0 1 0-5H8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const v5 = [
  "svg",
  a,
  [
    ["path", { d: "M12 13V7" }],
    [
      "path",
      {
        d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
      }
    ],
    ["path", { d: "m9 10 3 3 3-3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const o5 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
      }
    ],
    ["path", { d: "M8 12v-2a4 4 0 0 1 8 0v2" }],
    ["circle", { cx: "15", cy: "12", r: "1" }],
    ["circle", { cx: "9", cy: "12", r: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const i5 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M16 8.2A2.22 2.22 0 0 0 13.8 6c-.8 0-1.4.3-1.8.9-.4-.6-1-.9-1.8-.9A2.22 2.22 0 0 0 8 8.2c0 .6.3 1.2.7 1.6A226.652 226.652 0 0 0 12 13a404 404 0 0 0 3.3-3.1 2.413 2.413 0 0 0 .7-1.7"
      }
    ],
    [
      "path",
      {
        d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const l5 = [
  "svg",
  a,
  [
    ["path", { d: "m20 13.7-2.1-2.1a2 2 0 0 0-2.8 0L9.7 17" }],
    [
      "path",
      {
        d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
      }
    ],
    ["circle", { cx: "10", cy: "8", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const g5 = [
  "svg",
  a,
  [
    ["path", { d: "m19 3 1 1" }],
    ["path", { d: "m20 2-4.5 4.5" }],
    ["path", { d: "M20 8v13a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }],
    ["path", { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H14" }],
    ["circle", { cx: "14", cy: "8", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x5 = [
  "svg",
  a,
  [
    ["path", { d: "M18 6V4a2 2 0 1 0-4 0v2" }],
    ["path", { d: "M20 15v6a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }],
    ["path", { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H10" }],
    ["rect", { x: "12", y: "6", width: "8", height: "5", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y5 = [
  "svg",
  a,
  [
    ["path", { d: "M10 2v8l3-3 3 3V2" }],
    [
      "path",
      {
        d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const m5 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
      }
    ],
    ["path", { d: "M9 10h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const H5 = [
  "svg",
  a,
  [
    ["path", { d: "M12 21V7" }],
    ["path", { d: "m16 12 2 2 4-4" }],
    [
      "path",
      {
        d: "M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const u5 = [
  "svg",
  a,
  [
    ["path", { d: "M12 7v14" }],
    ["path", { d: "M16 12h2" }],
    ["path", { d: "M16 8h2" }],
    [
      "path",
      {
        d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
      }
    ],
    ["path", { d: "M6 12h2" }],
    ["path", { d: "M6 8h2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const V5 = [
  "svg",
  a,
  [
    ["path", { d: "M12 7v14" }],
    [
      "path",
      {
        d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const w5 = [
  "svg",
  a,
  [
    ["path", { d: "M12 7v6" }],
    [
      "path",
      {
        d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
      }
    ],
    ["path", { d: "M9 10h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C5 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
      }
    ],
    ["path", { d: "M8 11h8" }],
    ["path", { d: "M8 7h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const A5 = [
  "svg",
  a,
  [
    ["path", { d: "M10 13h4" }],
    ["path", { d: "M12 6v7" }],
    ["path", { d: "M16 8V6H8v2" }],
    [
      "path",
      {
        d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const f5 = [
  "svg",
  a,
  [
    ["path", { d: "M12 13V7" }],
    ["path", { d: "M18 2h1a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }],
    ["path", { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2" }],
    ["path", { d: "m9 10 3-3 3 3" }],
    ["path", { d: "m9 5 3-3 3 3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const L5 = [
  "svg",
  a,
  [
    ["path", { d: "M12 13V7" }],
    [
      "path",
      {
        d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
      }
    ],
    ["path", { d: "m9 10 3-3 3 3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S5 = [
  "svg",
  a,
  [
    ["path", { d: "M15 13a3 3 0 1 0-6 0" }],
    [
      "path",
      {
        d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
      }
    ],
    ["circle", { cx: "12", cy: "8", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z5 = [
  "svg",
  a,
  [
    ["path", { d: "m14.5 7-5 5" }],
    [
      "path",
      {
        d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
      }
    ],
    ["path", { d: "m9.5 7 5 5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k5 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const P5 = [
  "svg",
  a,
  [
    ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" }],
    ["path", { d: "m9 10 2 2 4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z5 = [
  "svg",
  a,
  [
    ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" }],
    ["line", { x1: "15", x2: "9", y1: "10", y2: "10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B5 = [
  "svg",
  a,
  [
    ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" }],
    ["line", { x1: "12", x2: "12", y1: "7", y2: "13" }],
    ["line", { x1: "15", x2: "9", y1: "10", y2: "10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const T5 = [
  "svg",
  a,
  [
    ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" }],
    ["path", { d: "m14.5 7.5-5 5" }],
    ["path", { d: "m9.5 7.5 5 5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const D5 = [
  "svg",
  a,
  [["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const F5 = [
  "svg",
  a,
  [
    ["path", { d: "M4 9V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" }],
    ["path", { d: "M8 8v1" }],
    ["path", { d: "M12 8v1" }],
    ["path", { d: "M16 8v1" }],
    ["rect", { width: "20", height: "12", x: "2", y: "9", rx: "2" }],
    ["circle", { cx: "8", cy: "15", r: "2" }],
    ["circle", { cx: "16", cy: "15", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const b5 = [
  "svg",
  a,
  [
    ["path", { d: "M12 6V2H8" }],
    ["path", { d: "m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z" }],
    ["path", { d: "M2 12h2" }],
    ["path", { d: "M9 11v2" }],
    ["path", { d: "M15 11v2" }],
    ["path", { d: "M20 12h2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R5 = [
  "svg",
  a,
  [
    ["path", { d: "M13.67 8H18a2 2 0 0 1 2 2v4.33" }],
    ["path", { d: "M2 14h2" }],
    ["path", { d: "M20 14h2" }],
    ["path", { d: "M22 22 2 2" }],
    ["path", { d: "M8 8H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 1.414-.586" }],
    ["path", { d: "M9 13v2" }],
    ["path", { d: "M9.67 4H12v2.33" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O5 = [
  "svg",
  a,
  [
    ["path", { d: "M12 8V4H8" }],
    ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2" }],
    ["path", { d: "M2 14h2" }],
    ["path", { d: "M20 14h2" }],
    ["path", { d: "M15 13v2" }],
    ["path", { d: "M9 13v2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const q5 = [
  "svg",
  a,
  [
    ["path", { d: "M5 3a2 2 0 0 0-2 2" }],
    ["path", { d: "M19 3a2 2 0 0 1 2 2" }],
    ["path", { d: "M21 19a2 2 0 0 1-2 2" }],
    ["path", { d: "M5 21a2 2 0 0 1-2-2" }],
    ["path", { d: "M9 3h1" }],
    ["path", { d: "M9 21h1" }],
    ["path", { d: "M14 3h1" }],
    ["path", { d: "M14 21h1" }],
    ["path", { d: "M3 9v1" }],
    ["path", { d: "M21 9v1" }],
    ["path", { d: "M3 14v1" }],
    ["path", { d: "M21 14v1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U5 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
      }
    ],
    ["path", { d: "m3.3 7 8.7 5 8.7-5" }],
    ["path", { d: "M12 22V12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _5 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"
      }
    ],
    ["path", { d: "m7 16.5-4.74-2.85" }],
    ["path", { d: "m7 16.5 5-3" }],
    ["path", { d: "M7 16.5v5.17" }],
    [
      "path",
      {
        d: "M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"
      }
    ],
    ["path", { d: "m17 16.5-5-3" }],
    ["path", { d: "m17 16.5 4.74-2.85" }],
    ["path", { d: "M17 16.5v5.17" }],
    [
      "path",
      {
        d: "M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"
      }
    ],
    ["path", { d: "M12 8 7.26 5.15" }],
    ["path", { d: "m12 8 4.74-2.85" }],
    ["path", { d: "M12 13.5V8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const g1 = [
  "svg",
  a,
  [
    ["path", { d: "M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" }],
    ["path", { d: "M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const E5 = [
  "svg",
  a,
  [
    ["path", { d: "M16 3h3v18h-3" }],
    ["path", { d: "M8 21H5V3h3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const N5 = [
  "svg",
  a,
  [
    [
      "path",
      { d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" }
    ],
    ["path", { d: "M9 13a4.5 4.5 0 0 0 3-4" }],
    ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5" }],
    ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396" }],
    ["path", { d: "M6 18a4 4 0 0 1-1.967-.516" }],
    ["path", { d: "M12 13h4" }],
    ["path", { d: "M12 18h6a2 2 0 0 1 2 2v1" }],
    ["path", { d: "M12 8h8" }],
    ["path", { d: "M16 8V5a2 2 0 0 1 2-2" }],
    ["circle", { cx: "16", cy: "13", r: ".5" }],
    ["circle", { cx: "18", cy: "3", r: ".5" }],
    ["circle", { cx: "20", cy: "21", r: ".5" }],
    ["circle", { cx: "20", cy: "8", r: ".5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I5 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M12 5a3 3 0 1 0-5.997.142 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588 4 4 0 0 0 7.636 2.106 3.2 3.2 0 0 0 .164-.546c.028-.13.306-.13.335 0a3.2 3.2 0 0 0 .163.546 4 4 0 0 0 7.636-2.106 4 4 0 0 0 .556-6.588 4 4 0 0 0-2.526-5.77A3 3 0 1 0 12 5"
      }
    ],
    ["path", { d: "M17.599 6.5a3 3 0 0 0 .399-1.375" }],
    ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5" }],
    ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396" }],
    ["path", { d: "M19.938 10.5a4 4 0 0 1 .585.396" }],
    ["path", { d: "M6 18a4 4 0 0 1-1.967-.516" }],
    ["path", { d: "M19.967 17.484A4 4 0 0 1 18 18" }],
    ["circle", { cx: "12", cy: "12", r: "3" }],
    ["path", { d: "m15.7 10.4-.9.4" }],
    ["path", { d: "m9.2 13.2-.9.4" }],
    ["path", { d: "m13.6 15.7-.4-.9" }],
    ["path", { d: "m10.8 9.2-.4-.9" }],
    ["path", { d: "m15.7 13.5-.9-.4" }],
    ["path", { d: "m9.2 10.9-.9-.4" }],
    ["path", { d: "m10.5 15.7.4-.9" }],
    ["path", { d: "m13.1 9.2.4-.9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G5 = [
  "svg",
  a,
  [
    [
      "path",
      { d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" }
    ],
    [
      "path",
      { d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" }
    ],
    ["path", { d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" }],
    ["path", { d: "M17.599 6.5a3 3 0 0 0 .399-1.375" }],
    ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5" }],
    ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396" }],
    ["path", { d: "M19.938 10.5a4 4 0 0 1 .585.396" }],
    ["path", { d: "M6 18a4 4 0 0 1-1.967-.516" }],
    ["path", { d: "M19.967 17.484A4 4 0 0 1 18 18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X5 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M12 9v6" }],
    ["path", { d: "M16 15v6" }],
    ["path", { d: "M16 3v6" }],
    ["path", { d: "M3 15h18" }],
    ["path", { d: "M3 9h18" }],
    ["path", { d: "M8 15v6" }],
    ["path", { d: "M8 3v6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const W5 = [
  "svg",
  a,
  [
    ["path", { d: "M12 12h.01" }],
    ["path", { d: "M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" }],
    ["path", { d: "M22 13a18.15 18.15 0 0 1-20 0" }],
    ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $5 = [
  "svg",
  a,
  [
    ["path", { d: "M10 20v2" }],
    ["path", { d: "M14 20v2" }],
    ["path", { d: "M18 20v2" }],
    ["path", { d: "M21 20H3" }],
    ["path", { d: "M6 20v2" }],
    ["path", { d: "M8 16V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12" }],
    ["rect", { x: "4", y: "6", width: "16", height: "10", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const K5 = [
  "svg",
  a,
  [
    ["path", { d: "M12 11v4" }],
    ["path", { d: "M14 13h-4" }],
    ["path", { d: "M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" }],
    ["path", { d: "M18 6v14" }],
    ["path", { d: "M6 6v14" }],
    ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J5 = [
  "svg",
  a,
  [
    ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" }],
    ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Q5 = [
  "svg",
  a,
  [
    ["rect", { x: "8", y: "8", width: "8", height: "8", rx: "2" }],
    ["path", { d: "M4 10a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2" }],
    ["path", { d: "M14 20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y5 = [
  "svg",
  a,
  [
    ["path", { d: "m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" }],
    [
      "path",
      {
        d: "M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j5 = [
  "svg",
  a,
  [
    ["path", { d: "M15 7.13V6a3 3 0 0 0-5.14-2.1L8 2" }],
    ["path", { d: "M14.12 3.88 16 2" }],
    ["path", { d: "M22 13h-4v-2a4 4 0 0 0-4-4h-1.3" }],
    ["path", { d: "M20.97 5c0 2.1-1.6 3.8-3.5 4" }],
    ["path", { d: "m2 2 20 20" }],
    ["path", { d: "M7.7 7.7A4 4 0 0 0 6 11v3a6 6 0 0 0 11.13 3.13" }],
    ["path", { d: "M12 20v-8" }],
    ["path", { d: "M6 13H2" }],
    ["path", { d: "M3 21c0-2.1 1.7-3.9 3.8-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ad = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M12.765 21.522a.5.5 0 0 1-.765-.424v-8.196a.5.5 0 0 1 .765-.424l5.878 3.674a1 1 0 0 1 0 1.696z"
      }
    ],
    ["path", { d: "M14.12 3.88 16 2" }],
    ["path", { d: "M18 11a4 4 0 0 0-4-4h-4a4 4 0 0 0-4 4v3a6.1 6.1 0 0 0 2 4.5" }],
    ["path", { d: "M20.97 5c0 2.1-1.6 3.8-3.5 4" }],
    ["path", { d: "M3 21c0-2.1 1.7-3.9 3.8-4" }],
    ["path", { d: "M6 13H2" }],
    ["path", { d: "M6.53 9C4.6 8.8 3 7.1 3 5" }],
    ["path", { d: "m8 2 1.88 1.88" }],
    ["path", { d: "M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const td = [
  "svg",
  a,
  [
    ["path", { d: "m8 2 1.88 1.88" }],
    ["path", { d: "M14.12 3.88 16 2" }],
    ["path", { d: "M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" }],
    ["path", { d: "M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" }],
    ["path", { d: "M12 20v-9" }],
    ["path", { d: "M6.53 9C4.6 8.8 3 7.1 3 5" }],
    ["path", { d: "M6 13H2" }],
    ["path", { d: "M3 21c0-2.1 1.7-3.9 3.8-4" }],
    ["path", { d: "M20.97 5c0 2.1-1.6 3.8-3.5 4" }],
    ["path", { d: "M22 13h-4" }],
    ["path", { d: "M17.2 17c2.1.1 3.8 1.9 3.8 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hd = [
  "svg",
  a,
  [
    ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" }],
    ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" }],
    ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" }],
    ["path", { d: "M10 6h4" }],
    ["path", { d: "M10 10h4" }],
    ["path", { d: "M10 14h4" }],
    ["path", { d: "M10 18h4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dd = [
  "svg",
  a,
  [
    ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", ry: "2" }],
    ["path", { d: "M9 22v-4h6v4" }],
    ["path", { d: "M8 6h.01" }],
    ["path", { d: "M16 6h.01" }],
    ["path", { d: "M12 6h.01" }],
    ["path", { d: "M12 10h.01" }],
    ["path", { d: "M12 14h.01" }],
    ["path", { d: "M16 10h.01" }],
    ["path", { d: "M16 14h.01" }],
    ["path", { d: "M8 10h.01" }],
    ["path", { d: "M8 14h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pd = [
  "svg",
  a,
  [
    ["path", { d: "M4 6 2 7" }],
    ["path", { d: "M10 6h4" }],
    ["path", { d: "m22 7-2-1" }],
    ["rect", { width: "16", height: "16", x: "4", y: "3", rx: "2" }],
    ["path", { d: "M4 11h16" }],
    ["path", { d: "M8 15h.01" }],
    ["path", { d: "M16 15h.01" }],
    ["path", { d: "M6 19v2" }],
    ["path", { d: "M18 21v-2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cd = [
  "svg",
  a,
  [
    ["path", { d: "M8 6v6" }],
    ["path", { d: "M15 6v6" }],
    ["path", { d: "M2 12h19.6" }],
    [
      "path",
      {
        d: "M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"
      }
    ],
    ["circle", { cx: "7", cy: "18", r: "2" }],
    ["path", { d: "M9 18h5" }],
    ["circle", { cx: "16", cy: "18", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ed = [
  "svg",
  a,
  [
    ["path", { d: "M10 3h.01" }],
    ["path", { d: "M14 2h.01" }],
    ["path", { d: "m2 9 20-5" }],
    ["path", { d: "M12 12V6.5" }],
    ["rect", { width: "16", height: "10", x: "4", y: "12", rx: "3" }],
    ["path", { d: "M9 12v5" }],
    ["path", { d: "M15 12v5" }],
    ["path", { d: "M4 17h16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sd = [
  "svg",
  a,
  [
    ["path", { d: "M17 21v-2a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1" }],
    ["path", { d: "M19 15V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V9" }],
    ["path", { d: "M21 21v-2h-4" }],
    ["path", { d: "M3 5h4V3" }],
    ["path", { d: "M7 5a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1V3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Md = [
  "svg",
  a,
  [
    ["circle", { cx: "9", cy: "7", r: "2" }],
    ["path", { d: "M7.2 7.9 3 11v9c0 .6.4 1 1 1h16c.6 0 1-.4 1-1v-9c0-2-3-6-7-8l-3.6 2.6" }],
    ["path", { d: "M16 13H3" }],
    ["path", { d: "M16 17H3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rd = [
  "svg",
  a,
  [
    ["path", { d: "M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" }],
    ["path", { d: "M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" }],
    ["path", { d: "M2 21h20" }],
    ["path", { d: "M7 8v3" }],
    ["path", { d: "M12 8v3" }],
    ["path", { d: "M17 8v3" }],
    ["path", { d: "M7 4h.01" }],
    ["path", { d: "M12 4h.01" }],
    ["path", { d: "M17 4h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nd = [
  "svg",
  a,
  [
    ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2" }],
    ["line", { x1: "8", x2: "16", y1: "6", y2: "6" }],
    ["line", { x1: "16", x2: "16", y1: "14", y2: "18" }],
    ["path", { d: "M16 10h.01" }],
    ["path", { d: "M12 10h.01" }],
    ["path", { d: "M8 10h.01" }],
    ["path", { d: "M12 14h.01" }],
    ["path", { d: "M8 14h.01" }],
    ["path", { d: "M12 18h.01" }],
    ["path", { d: "M8 18h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vd = [
  "svg",
  a,
  [
    ["path", { d: "m14 18 4 4 4-4" }],
    ["path", { d: "M16 2v4" }],
    ["path", { d: "M18 14v8" }],
    ["path", { d: "M21 11.354V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.343" }],
    ["path", { d: "M3 10h18" }],
    ["path", { d: "M8 2v4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const od = [
  "svg",
  a,
  [
    ["path", { d: "m14 18 4-4 4 4" }],
    ["path", { d: "M16 2v4" }],
    ["path", { d: "M18 22v-8" }],
    ["path", { d: "M21 11.343V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9" }],
    ["path", { d: "M3 10h18" }],
    ["path", { d: "M8 2v4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const id = [
  "svg",
  a,
  [
    ["path", { d: "M8 2v4" }],
    ["path", { d: "M16 2v4" }],
    ["path", { d: "M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" }],
    ["path", { d: "M3 10h18" }],
    ["path", { d: "m16 20 2 2 4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ld = [
  "svg",
  a,
  [
    ["path", { d: "M8 2v4" }],
    ["path", { d: "M16 2v4" }],
    ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2" }],
    ["path", { d: "M3 10h18" }],
    ["path", { d: "m9 16 2 2 4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gd = [
  "svg",
  a,
  [
    ["path", { d: "M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" }],
    ["path", { d: "M16 2v4" }],
    ["path", { d: "M8 2v4" }],
    ["path", { d: "M3 10h5" }],
    ["path", { d: "M17.5 17.5 16 16.3V14" }],
    ["circle", { cx: "16", cy: "16", r: "6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xd = [
  "svg",
  a,
  [
    ["path", { d: "m15.2 16.9-.9-.4" }],
    ["path", { d: "m15.2 19.1-.9.4" }],
    ["path", { d: "M16 2v4" }],
    ["path", { d: "m16.9 15.2-.4-.9" }],
    ["path", { d: "m16.9 20.8-.4.9" }],
    ["path", { d: "m19.5 14.3-.4.9" }],
    ["path", { d: "m19.5 21.7-.4-.9" }],
    ["path", { d: "M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" }],
    ["path", { d: "m21.7 16.5-.9.4" }],
    ["path", { d: "m21.7 19.5-.9-.4" }],
    ["path", { d: "M3 10h18" }],
    ["path", { d: "M8 2v4" }],
    ["circle", { cx: "18", cy: "18", r: "3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yd = [
  "svg",
  a,
  [
    ["path", { d: "M8 2v4" }],
    ["path", { d: "M16 2v4" }],
    ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2" }],
    ["path", { d: "M3 10h18" }],
    ["path", { d: "M8 14h.01" }],
    ["path", { d: "M12 14h.01" }],
    ["path", { d: "M16 14h.01" }],
    ["path", { d: "M8 18h.01" }],
    ["path", { d: "M12 18h.01" }],
    ["path", { d: "M16 18h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const md = [
  "svg",
  a,
  [
    ["path", { d: "M8 2v4" }],
    ["path", { d: "M16 2v4" }],
    ["path", { d: "M21 17V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11Z" }],
    ["path", { d: "M3 10h18" }],
    ["path", { d: "M15 22v-4a2 2 0 0 1 2-2h4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hd = [
  "svg",
  a,
  [
    ["path", { d: "M3 10h18V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7" }],
    ["path", { d: "M8 2v4" }],
    ["path", { d: "M16 2v4" }],
    [
      "path",
      {
        d: "M21.29 14.7a2.43 2.43 0 0 0-2.65-.52c-.3.12-.57.3-.8.53l-.34.34-.35-.34a2.43 2.43 0 0 0-2.65-.53c-.3.12-.56.3-.79.53-.95.94-1 2.53.2 3.74L17.5 22l3.6-3.55c1.2-1.21 1.14-2.8.19-3.74Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ud = [
  "svg",
  a,
  [
    ["path", { d: "M8 2v4" }],
    ["path", { d: "M16 2v4" }],
    ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2" }],
    ["path", { d: "M3 10h18" }],
    ["path", { d: "M10 16h4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vd = [
  "svg",
  a,
  [
    ["path", { d: "M16 19h6" }],
    ["path", { d: "M16 2v4" }],
    ["path", { d: "M21 15V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5" }],
    ["path", { d: "M3 10h18" }],
    ["path", { d: "M8 2v4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wd = [
  "svg",
  a,
  [
    ["path", { d: "M4.2 4.2A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18" }],
    ["path", { d: "M21 15.5V6a2 2 0 0 0-2-2H9.5" }],
    ["path", { d: "M16 2v4" }],
    ["path", { d: "M3 10h7" }],
    ["path", { d: "M21 10h-5.5" }],
    ["path", { d: "m2 2 20 20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cd = [
  "svg",
  a,
  [
    ["path", { d: "M8 2v4" }],
    ["path", { d: "M16 2v4" }],
    ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2" }],
    ["path", { d: "M3 10h18" }],
    ["path", { d: "M10 16h4" }],
    ["path", { d: "M12 14v4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ad = [
  "svg",
  a,
  [
    ["path", { d: "M8 2v4" }],
    ["path", { d: "M16 2v4" }],
    ["path", { d: "M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" }],
    ["path", { d: "M3 10h18" }],
    ["path", { d: "M16 19h6" }],
    ["path", { d: "M19 16v6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fd = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2" }],
    ["path", { d: "M16 2v4" }],
    ["path", { d: "M3 10h18" }],
    ["path", { d: "M8 2v4" }],
    ["path", { d: "M17 14h-6" }],
    ["path", { d: "M13 18H7" }],
    ["path", { d: "M7 14h.01" }],
    ["path", { d: "M17 18h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ld = [
  "svg",
  a,
  [
    ["path", { d: "M16 2v4" }],
    ["path", { d: "M21 11.75V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.25" }],
    ["path", { d: "m22 22-1.875-1.875" }],
    ["path", { d: "M3 10h18" }],
    ["path", { d: "M8 2v4" }],
    ["circle", { cx: "18", cy: "18", r: "3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sd = [
  "svg",
  a,
  [
    ["path", { d: "M8 2v4" }],
    ["path", { d: "M16 2v4" }],
    ["path", { d: "M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" }],
    ["path", { d: "M3 10h18" }],
    ["path", { d: "m17 22 5-5" }],
    ["path", { d: "m17 17 5 5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zd = [
  "svg",
  a,
  [
    ["path", { d: "M8 2v4" }],
    ["path", { d: "M16 2v4" }],
    ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2" }],
    ["path", { d: "M3 10h18" }],
    ["path", { d: "m14 14-4 4" }],
    ["path", { d: "m10 14 4 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kd = [
  "svg",
  a,
  [
    ["path", { d: "M8 2v4" }],
    ["path", { d: "M16 2v4" }],
    ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2" }],
    ["path", { d: "M3 10h18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pd = [
  "svg",
  a,
  [
    ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }],
    ["path", { d: "M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16" }],
    ["path", { d: "M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5" }],
    ["path", { d: "M14.121 15.121A3 3 0 1 1 9.88 10.88" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zd = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"
      }
    ],
    ["circle", { cx: "12", cy: "13", r: "3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bd = [
  "svg",
  a,
  [
    [
      "path",
      { d: "M5.7 21a2 2 0 0 1-3.5-2l8.6-14a6 6 0 0 1 10.4 6 2 2 0 1 1-3.464-2 2 2 0 1 0-3.464-2Z" }
    ],
    ["path", { d: "M17.75 7 15 2.1" }],
    ["path", { d: "M10.9 4.8 13 9" }],
    ["path", { d: "m7.9 9.7 2 4.4" }],
    ["path", { d: "M4.9 14.7 7 18.9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Td = [
  "svg",
  a,
  [
    ["path", { d: "m8.5 8.5-1 1a4.95 4.95 0 0 0 7 7l1-1" }],
    ["path", { d: "M11.843 6.187A4.947 4.947 0 0 1 16.5 7.5a4.947 4.947 0 0 1 1.313 4.657" }],
    ["path", { d: "M14 16.5V14" }],
    ["path", { d: "M14 6.5v1.843" }],
    ["path", { d: "M10 10v7.5" }],
    [
      "path",
      { d: "m16 7 1-5 1.367.683A3 3 0 0 0 19.708 3H21v1.292a3 3 0 0 0 .317 1.341L22 7l-5 1" }
    ],
    [
      "path",
      { d: "m8 17-1 5-1.367-.683A3 3 0 0 0 4.292 21H3v-1.292a3 3 0 0 0-.317-1.341L2 17l5-1" }
    ],
    ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dd = [
  "svg",
  a,
  [
    ["path", { d: "m9.5 7.5-2 2a4.95 4.95 0 1 0 7 7l2-2a4.95 4.95 0 1 0-7-7Z" }],
    ["path", { d: "M14 6.5v10" }],
    ["path", { d: "M10 7.5v10" }],
    ["path", { d: "m16 7 1-5 1.37.68A3 3 0 0 0 19.7 3H21v1.3c0 .46.1.92.32 1.33L22 7l-5 1" }],
    ["path", { d: "m8 17-1 5-1.37-.68A3 3 0 0 0 4.3 21H3v-1.3a3 3 0 0 0-.32-1.33L2 17l5-1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fd = [
  "svg",
  a,
  [
    ["path", { d: "M12 22v-4" }],
    [
      "path",
      {
        d: "M7 12c-1.5 0-4.5 1.5-5 3 3.5 1.5 6 1 6 1-1.5 1.5-2 3.5-2 5 2.5 0 4.5-1.5 6-3 1.5 1.5 3.5 3 6 3 0-1.5-.5-3.5-2-5 0 0 2.5.5 6-1-.5-1.5-3.5-3-5-3 1.5-1 4-4 4-6-2.5 0-5.5 1.5-7 3 0-2.5-.5-5-2-7-1.5 2-2 4.5-2 7-1.5-1.5-4.5-3-7-3 0 2 2.5 5 4 6"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bd = [
  "svg",
  a,
  [
    ["path", { d: "M10.5 5H19a2 2 0 0 1 2 2v8.5" }],
    ["path", { d: "M17 11h-.5" }],
    ["path", { d: "M19 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2" }],
    ["path", { d: "m2 2 20 20" }],
    ["path", { d: "M7 11h4" }],
    ["path", { d: "M7 15h2.5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x1 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "14", x: "3", y: "5", rx: "2", ry: "2" }],
    ["path", { d: "M7 15h4M15 15h2M7 11h2M13 11h4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rd = [
  "svg",
  a,
  [
    ["path", { d: "m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8" }],
    ["path", { d: "M7 14h.01" }],
    ["path", { d: "M17 14h.01" }],
    ["rect", { width: "18", height: "8", x: "3", y: "10", rx: "2" }],
    ["path", { d: "M5 18v2" }],
    ["path", { d: "M19 18v2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Od = [
  "svg",
  a,
  [
    ["path", { d: "M10 2h4" }],
    ["path", { d: "m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8" }],
    ["path", { d: "M7 14h.01" }],
    ["path", { d: "M17 14h.01" }],
    ["rect", { width: "18", height: "8", x: "3", y: "10", rx: "2" }],
    ["path", { d: "M5 18v2" }],
    ["path", { d: "M19 18v2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qd = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"
      }
    ],
    ["circle", { cx: "7", cy: "17", r: "2" }],
    ["path", { d: "M9 17h6" }],
    ["circle", { cx: "17", cy: "17", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ud = [
  "svg",
  a,
  [
    ["path", { d: "M18 19V9a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a2 2 0 0 0 2 2h2" }],
    ["path", { d: "M2 9h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2" }],
    ["path", { d: "M22 17v1a1 1 0 0 1-1 1H10v-9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v9" }],
    ["circle", { cx: "8", cy: "19", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _d = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7zM8.64 14l-2.05-2.04M15.34 15l-2.46-2.46"
      }
    ],
    ["path", { d: "M22 9s-1.33-2-3.5-2C16.86 7 15 9 15 9s1.33 2 3.5 2S22 9 22 9z" }],
    ["path", { d: "M15 2s-2 1.33-2 3.5S15 9 15 9s2-1.84 2-3.5C17 3.33 15 2 15 2z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ed = [
  "svg",
  a,
  [
    ["circle", { cx: "7", cy: "12", r: "3" }],
    ["path", { d: "M10 9v6" }],
    ["circle", { cx: "17", cy: "12", r: "3" }],
    ["path", { d: "M14 7v8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nd = [
  "svg",
  a,
  [
    ["path", { d: "m3 15 4-8 4 8" }],
    ["path", { d: "M4 13h6" }],
    ["circle", { cx: "18", cy: "12", r: "3" }],
    ["path", { d: "M21 9v6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Id = [
  "svg",
  a,
  [
    ["path", { d: "m3 15 4-8 4 8" }],
    ["path", { d: "M4 13h6" }],
    ["path", { d: "M15 11h4.5a2 2 0 0 1 0 4H15V7h4a2 2 0 0 1 0 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gd = [
  "svg",
  a,
  [
    ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }],
    ["circle", { cx: "8", cy: "10", r: "2" }],
    ["path", { d: "M8 12h8" }],
    ["circle", { cx: "16", cy: "10", r: "2" }],
    ["path", { d: "m6 20 .7-2.9A1.4 1.4 0 0 1 8.1 16h7.8a1.4 1.4 0 0 1 1.4 1l.7 3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xd = [
  "svg",
  a,
  [
    ["path", { d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" }],
    ["path", { d: "M2 12a9 9 0 0 1 8 8" }],
    ["path", { d: "M2 16a5 5 0 0 1 4 4" }],
    ["line", { x1: "2", x2: "2.01", y1: "20", y2: "20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wd = [
  "svg",
  a,
  [
    ["path", { d: "M22 20v-9H2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z" }],
    ["path", { d: "M18 11V4H6v7" }],
    ["path", { d: "M15 22v-4a3 3 0 0 0-3-3a3 3 0 0 0-3 3v4" }],
    ["path", { d: "M22 11V9" }],
    ["path", { d: "M2 11V9" }],
    ["path", { d: "M6 4V2" }],
    ["path", { d: "M18 4V2" }],
    ["path", { d: "M10 4V2" }],
    ["path", { d: "M14 4V2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $d = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"
      }
    ],
    ["path", { d: "M8 14v.5" }],
    ["path", { d: "M16 14v.5" }],
    ["path", { d: "M11.25 16.25h1.5L12 17l-.75-.75Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kd = [
  "svg",
  a,
  [
    [
      "path",
      { d: "M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97" }
    ],
    [
      "path",
      {
        d: "M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z"
      }
    ],
    ["path", { d: "M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15" }],
    ["path", { d: "M2 21v-4" }],
    ["path", { d: "M7 9h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y1 = [
  "svg",
  a,
  [
    ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
    [
      "path",
      {
        d: "M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const m1 = [
  "svg",
  a,
  [
    ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
    ["rect", { x: "7", y: "13", width: "9", height: "4", rx: "1" }],
    ["rect", { x: "7", y: "5", width: "12", height: "4", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jd = [
  "svg",
  a,
  [
    ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
    ["path", { d: "M7 11h8" }],
    ["path", { d: "M7 16h3" }],
    ["path", { d: "M7 6h12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qd = [
  "svg",
  a,
  [
    ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
    ["path", { d: "M7 11h8" }],
    ["path", { d: "M7 16h12" }],
    ["path", { d: "M7 6h3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yd = [
  "svg",
  a,
  [
    ["path", { d: "M11 13v4" }],
    ["path", { d: "M15 5v4" }],
    ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
    ["rect", { x: "7", y: "13", width: "9", height: "4", rx: "1" }],
    ["rect", { x: "7", y: "5", width: "12", height: "4", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const H1 = [
  "svg",
  a,
  [
    ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
    ["path", { d: "M7 16h8" }],
    ["path", { d: "M7 11h12" }],
    ["path", { d: "M7 6h3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const u1 = [
  "svg",
  a,
  [
    ["path", { d: "M9 5v4" }],
    ["rect", { width: "4", height: "6", x: "7", y: "9", rx: "1" }],
    ["path", { d: "M9 15v2" }],
    ["path", { d: "M17 3v2" }],
    ["rect", { width: "4", height: "8", x: "15", y: "5", rx: "1" }],
    ["path", { d: "M17 13v3" }],
    ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const V1 = [
  "svg",
  a,
  [
    ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
    ["rect", { x: "15", y: "5", width: "4", height: "12", rx: "1" }],
    ["rect", { x: "7", y: "8", width: "4", height: "9", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jd = [
  "svg",
  a,
  [
    ["path", { d: "M13 17V9" }],
    ["path", { d: "M18 17v-3" }],
    ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
    ["path", { d: "M8 17V5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const w1 = [
  "svg",
  a,
  [
    ["path", { d: "M13 17V9" }],
    ["path", { d: "M18 17V5" }],
    ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
    ["path", { d: "M8 17v-3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const a3 = [
  "svg",
  a,
  [
    ["path", { d: "M11 13H7" }],
    ["path", { d: "M19 9h-4" }],
    ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
    ["rect", { x: "15", y: "5", width: "4", height: "12", rx: "1" }],
    ["rect", { x: "7", y: "8", width: "4", height: "9", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C1 = [
  "svg",
  a,
  [
    ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
    ["path", { d: "M18 17V9" }],
    ["path", { d: "M13 17V5" }],
    ["path", { d: "M8 17v-3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const t3 = [
  "svg",
  a,
  [
    ["path", { d: "M10 6h8" }],
    ["path", { d: "M12 16h6" }],
    ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
    ["path", { d: "M8 11h7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const A1 = [
  "svg",
  a,
  [
    ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
    ["path", { d: "m19 9-5 5-4-4-3 3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h3 = [
  "svg",
  a,
  [
    ["path", { d: "m13.11 7.664 1.78 2.672" }],
    ["path", { d: "m14.162 12.788-3.324 1.424" }],
    ["path", { d: "m20 4-6.06 1.515" }],
    ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
    ["circle", { cx: "12", cy: "6", r: "2" }],
    ["circle", { cx: "16", cy: "12", r: "2" }],
    ["circle", { cx: "9", cy: "15", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const d3 = [
  "svg",
  a,
  [
    ["path", { d: "M12 20V10" }],
    ["path", { d: "M18 20v-4" }],
    ["path", { d: "M6 20V4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const f1 = [
  "svg",
  a,
  [
    ["line", { x1: "12", x2: "12", y1: "20", y2: "10" }],
    ["line", { x1: "18", x2: "18", y1: "20", y2: "4" }],
    ["line", { x1: "6", x2: "6", y1: "20", y2: "16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const L1 = [
  "svg",
  a,
  [
    ["line", { x1: "18", x2: "18", y1: "20", y2: "10" }],
    ["line", { x1: "12", x2: "12", y1: "20", y2: "4" }],
    ["line", { x1: "6", x2: "6", y1: "20", y2: "14" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const p3 = [
  "svg",
  a,
  [
    ["path", { d: "M12 16v5" }],
    ["path", { d: "M16 14v7" }],
    ["path", { d: "M20 10v11" }],
    ["path", { d: "m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" }],
    ["path", { d: "M4 18v3" }],
    ["path", { d: "M8 14v7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S1 = [
  "svg",
  a,
  [
    ["path", { d: "M8 6h10" }],
    ["path", { d: "M6 12h9" }],
    ["path", { d: "M11 18h7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z1 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"
      }
    ],
    ["path", { d: "M21.21 15.89A10 10 0 1 1 8 2.83" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k1 = [
  "svg",
  a,
  [
    ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor" }],
    ["circle", { cx: "18.5", cy: "5.5", r: ".5", fill: "currentColor" }],
    ["circle", { cx: "11.5", cy: "11.5", r: ".5", fill: "currentColor" }],
    ["circle", { cx: "7.5", cy: "16.5", r: ".5", fill: "currentColor" }],
    ["circle", { cx: "17.5", cy: "14.5", r: ".5", fill: "currentColor" }],
    ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const c3 = [
  "svg",
  a,
  [
    ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16" }],
    ["path", { d: "M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const e3 = [
  "svg",
  a,
  [
    ["path", { d: "M18 6 7 17l-5-5" }],
    ["path", { d: "m22 10-7.5 7.5L13 16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const s3 = ["svg", a, [["path", { d: "M20 6 9 17l-5-5" }]]];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const M3 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"
      }
    ],
    ["path", { d: "M6 17h12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const r3 = [
  "svg",
  a,
  [
    ["path", { d: "M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z" }],
    ["path", { d: "M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z" }],
    ["path", { d: "M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12" }],
    ["path", { d: "M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const n3 = ["svg", a, [["path", { d: "m6 9 6 6 6-6" }]]];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const v3 = [
  "svg",
  a,
  [
    ["path", { d: "m17 18-6-6 6-6" }],
    ["path", { d: "M7 6v12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const o3 = [
  "svg",
  a,
  [
    ["path", { d: "m7 18 6-6-6-6" }],
    ["path", { d: "M17 6v12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const i3 = ["svg", a, [["path", { d: "m15 18-6-6 6-6" }]]];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const l3 = ["svg", a, [["path", { d: "m9 18 6-6-6-6" }]]];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const g3 = ["svg", a, [["path", { d: "m18 15-6-6-6 6" }]]];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x3 = [
  "svg",
  a,
  [
    ["path", { d: "m7 20 5-5 5 5" }],
    ["path", { d: "m7 4 5 5 5-5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y3 = [
  "svg",
  a,
  [
    ["path", { d: "m7 6 5 5 5-5" }],
    ["path", { d: "m7 13 5 5 5-5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const m3 = [
  "svg",
  a,
  [
    ["path", { d: "m18 8 4 4-4 4" }],
    ["path", { d: "m6 8-4 4 4 4" }],
    ["path", { d: "M8 12h.01" }],
    ["path", { d: "M12 12h.01" }],
    ["path", { d: "M16 12h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const H3 = [
  "svg",
  a,
  [
    ["path", { d: "m9 7-5 5 5 5" }],
    ["path", { d: "m15 7 5 5-5 5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const u3 = [
  "svg",
  a,
  [
    ["path", { d: "m11 17-5-5 5-5" }],
    ["path", { d: "m18 17-5-5 5-5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const V3 = [
  "svg",
  a,
  [
    ["path", { d: "m20 17-5-5 5-5" }],
    ["path", { d: "m4 17 5-5-5-5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const w3 = [
  "svg",
  a,
  [
    ["path", { d: "m6 17 5-5-5-5" }],
    ["path", { d: "m13 17 5-5-5-5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C3 = [
  "svg",
  a,
  [
    ["path", { d: "m7 15 5 5 5-5" }],
    ["path", { d: "m7 9 5-5 5 5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const A3 = [
  "svg",
  a,
  [
    ["path", { d: "m17 11-5-5-5 5" }],
    ["path", { d: "m17 18-5-5-5 5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const f3 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["circle", { cx: "12", cy: "12", r: "4" }],
    ["line", { x1: "21.17", x2: "12", y1: "8", y2: "8" }],
    ["line", { x1: "3.95", x2: "8.54", y1: "6.06", y2: "14" }],
    ["line", { x1: "10.88", x2: "15.46", y1: "21.94", y2: "14" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const L3 = [
  "svg",
  a,
  [
    ["path", { d: "M10 9h4" }],
    ["path", { d: "M12 7v5" }],
    ["path", { d: "M14 22v-4a2 2 0 0 0-4 0v4" }],
    [
      "path",
      {
        d: "M18 22V5.618a1 1 0 0 0-.553-.894l-4.553-2.277a2 2 0 0 0-1.788 0L6.553 4.724A1 1 0 0 0 6 5.618V22"
      }
    ],
    [
      "path",
      {
        d: "m18 7 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.618a1 1 0 0 1 .553-.894L6 7"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S3 = [
  "svg",
  a,
  [
    ["path", { d: "M12 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h13" }],
    ["path", { d: "M18 8c0-2.5-2-2.5-2-5" }],
    ["path", { d: "m2 2 20 20" }],
    ["path", { d: "M21 12a1 1 0 0 1 1 1v2a1 1 0 0 1-.5.866" }],
    ["path", { d: "M22 8c0-2.5-2-2.5-2-5" }],
    ["path", { d: "M7 12v4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z3 = [
  "svg",
  a,
  [
    ["path", { d: "M17 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14" }],
    ["path", { d: "M18 8c0-2.5-2-2.5-2-5" }],
    ["path", { d: "M21 16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" }],
    ["path", { d: "M22 8c0-2.5-2-2.5-2-5" }],
    ["path", { d: "M7 12v4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const P1 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["line", { x1: "12", x2: "12", y1: "8", y2: "12" }],
    ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z1 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M12 8v8" }],
    ["path", { d: "m8 12 4 4 4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B1 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M16 12H8" }],
    ["path", { d: "m12 8-4 4 4 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const T1 = [
  "svg",
  a,
  [
    ["path", { d: "M2 12a10 10 0 1 1 10 10" }],
    ["path", { d: "m2 22 10-10" }],
    ["path", { d: "M8 22H2v-6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const D1 = [
  "svg",
  a,
  [
    ["path", { d: "M12 22a10 10 0 1 1 10-10" }],
    ["path", { d: "M22 22 12 12" }],
    ["path", { d: "M22 16v6h-6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const F1 = [
  "svg",
  a,
  [
    ["path", { d: "M2 8V2h6" }],
    ["path", { d: "m2 2 10 10" }],
    ["path", { d: "M12 2A10 10 0 1 1 2 12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const b1 = [
  "svg",
  a,
  [
    ["path", { d: "M22 12A10 10 0 1 1 12 2" }],
    ["path", { d: "M22 2 12 12" }],
    ["path", { d: "M16 2h6v6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R1 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M8 12h8" }],
    ["path", { d: "m12 16 4-4-4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O1 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "m16 12-4-4-4 4" }],
    ["path", { d: "M12 16V8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const q1 = [
  "svg",
  a,
  [
    ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335" }],
    ["path", { d: "m9 11 3 3L22 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U1 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "m9 12 2 2 4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _1 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "m16 10-4 4-4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const E1 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "m14 16-4-4 4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const N1 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "m10 8 4 4-4 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I1 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "m8 14 4-4 4 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k3 = [
  "svg",
  a,
  [
    ["path", { d: "M10.1 2.182a10 10 0 0 1 3.8 0" }],
    ["path", { d: "M13.9 21.818a10 10 0 0 1-3.8 0" }],
    ["path", { d: "M17.609 3.721a10 10 0 0 1 2.69 2.7" }],
    ["path", { d: "M2.182 13.9a10 10 0 0 1 0-3.8" }],
    ["path", { d: "M20.279 17.609a10 10 0 0 1-2.7 2.69" }],
    ["path", { d: "M21.818 10.1a10 10 0 0 1 0 3.8" }],
    ["path", { d: "M3.721 6.391a10 10 0 0 1 2.7-2.69" }],
    ["path", { d: "M6.391 20.279a10 10 0 0 1-2.69-2.7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G1 = [
  "svg",
  a,
  [
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12" }],
    ["line", { x1: "12", x2: "12", y1: "16", y2: "16" }],
    ["line", { x1: "12", x2: "12", y1: "8", y2: "8" }],
    ["circle", { cx: "12", cy: "12", r: "10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const P3 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" }],
    ["path", { d: "M12 18V6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z3 = [
  "svg",
  a,
  [
    ["path", { d: "M10.1 2.18a9.93 9.93 0 0 1 3.8 0" }],
    ["path", { d: "M17.6 3.71a9.95 9.95 0 0 1 2.69 2.7" }],
    ["path", { d: "M21.82 10.1a9.93 9.93 0 0 1 0 3.8" }],
    ["path", { d: "M20.29 17.6a9.95 9.95 0 0 1-2.7 2.69" }],
    ["path", { d: "M13.9 21.82a9.94 9.94 0 0 1-3.8 0" }],
    ["path", { d: "M6.4 20.29a9.95 9.95 0 0 1-2.69-2.7" }],
    ["path", { d: "M2.18 13.9a9.93 9.93 0 0 1 0-3.8" }],
    ["path", { d: "M3.71 6.4a9.95 9.95 0 0 1 2.7-2.69" }],
    ["circle", { cx: "12", cy: "12", r: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B3 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["circle", { cx: "12", cy: "12", r: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const T3 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M17 12h.01" }],
    ["path", { d: "M12 12h.01" }],
    ["path", { d: "M7 12h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const D3 = [
  "svg",
  a,
  [
    ["path", { d: "M7 10h10" }],
    ["path", { d: "M7 14h10" }],
    ["circle", { cx: "12", cy: "12", r: "10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const F3 = [
  "svg",
  a,
  [
    ["path", { d: "M12 2a10 10 0 0 1 7.38 16.75" }],
    ["path", { d: "m16 12-4-4-4 4" }],
    ["path", { d: "M12 16V8" }],
    ["path", { d: "M2.5 8.875a10 10 0 0 0-.5 3" }],
    ["path", { d: "M2.83 16a10 10 0 0 0 2.43 3.4" }],
    ["path", { d: "M4.636 5.235a10 10 0 0 1 .891-.857" }],
    ["path", { d: "M8.644 21.42a10 10 0 0 0 7.631-.38" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const b3 = [
  "svg",
  a,
  [
    ["path", { d: "M12 2a10 10 0 0 1 7.38 16.75" }],
    ["path", { d: "M12 8v8" }],
    ["path", { d: "M16 12H8" }],
    ["path", { d: "M2.5 8.875a10 10 0 0 0-.5 3" }],
    ["path", { d: "M2.83 16a10 10 0 0 0 2.43 3.4" }],
    ["path", { d: "M4.636 5.235a10 10 0 0 1 .891-.857" }],
    ["path", { d: "M8.644 21.42a10 10 0 0 0 7.631-.38" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X1 = [
  "svg",
  a,
  [
    ["path", { d: "M15.6 2.7a10 10 0 1 0 5.7 5.7" }],
    ["circle", { cx: "12", cy: "12", r: "2" }],
    ["path", { d: "M13.4 10.6 19 5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const W1 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }],
    ["path", { d: "M12 17h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $1 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M8 12h8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R3 = [
  "svg",
  a,
  [
    ["path", { d: "m2 2 20 20" }],
    ["path", { d: "M8.35 2.69A10 10 0 0 1 21.3 15.65" }],
    ["path", { d: "M19.08 19.08A10 10 0 1 1 4.92 4.92" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const K1 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "m5 5 14 14" }],
    ["path", { d: "M13 13a3 3 0 1 0 0-6H9v2" }],
    ["path", { d: "M9 17v-2.34" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J1 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M9 17V7h4a3 3 0 0 1 0 6H9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Q1 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["line", { x1: "10", x2: "10", y1: "15", y2: "9" }],
    ["line", { x1: "14", x2: "14", y1: "15", y2: "9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y1 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "m15 9-6 6" }],
    ["path", { d: "M9 9h.01" }],
    ["path", { d: "M15 15h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j1 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["polygon", { points: "10 8 16 12 10 16 10 8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const a2 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M8 12h8" }],
    ["path", { d: "M12 8v8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const t2 = [
  "svg",
  a,
  [
    ["path", { d: "M12 7v4" }],
    ["path", { d: "M7.998 9.003a5 5 0 1 0 8-.005" }],
    ["circle", { cx: "12", cy: "12", r: "10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h2 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M22 2 2 22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O3 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["line", { x1: "9", x2: "15", y1: "15", y2: "9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const d2 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["rect", { x: "9", y: "9", width: "6", height: "6", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const p2 = [
  "svg",
  a,
  [
    ["path", { d: "M18 20a6 6 0 0 0-12 0" }],
    ["circle", { cx: "12", cy: "10", r: "4" }],
    ["circle", { cx: "12", cy: "12", r: "10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const c2 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["circle", { cx: "12", cy: "10", r: "3" }],
    ["path", { d: "M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const e2 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "m15 9-6 6" }],
    ["path", { d: "m9 9 6 6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const q3 = ["svg", a, [["circle", { cx: "12", cy: "12", r: "10" }]]];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U3 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M11 9h4a2 2 0 0 0 2-2V3" }],
    ["circle", { cx: "9", cy: "9", r: "2" }],
    ["path", { d: "M7 21v-4a2 2 0 0 1 2-2h4" }],
    ["circle", { cx: "15", cy: "15", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _3 = [
  "svg",
  a,
  [
    [
      "path",
      { d: "M21.66 17.67a1.08 1.08 0 0 1-.04 1.6A12 12 0 0 1 4.73 2.38a1.1 1.1 0 0 1 1.61-.04z" }
    ],
    ["path", { d: "M19.65 15.66A8 8 0 0 1 8.35 4.34" }],
    ["path", { d: "m14 10-5.5 5.5" }],
    ["path", { d: "M14 17.85V10H6.15" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const E3 = [
  "svg",
  a,
  [
    ["path", { d: "M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" }],
    ["path", { d: "m6.2 5.3 3.1 3.9" }],
    ["path", { d: "m12.4 3.4 3.1 4" }],
    ["path", { d: "M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const N3 = [
  "svg",
  a,
  [
    ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" }],
    ["path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }],
    ["path", { d: "m9 14 2 2 4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I3 = [
  "svg",
  a,
  [
    ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" }],
    ["path", { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" }],
    ["path", { d: "M16 4h2a2 2 0 0 1 2 2v4" }],
    ["path", { d: "M21 14H11" }],
    ["path", { d: "m15 10-4 4 4 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G3 = [
  "svg",
  a,
  [
    ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" }],
    ["path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }],
    ["path", { d: "M12 11h4" }],
    ["path", { d: "M12 16h4" }],
    ["path", { d: "M8 11h.01" }],
    ["path", { d: "M8 16h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X3 = [
  "svg",
  a,
  [
    ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" }],
    ["path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }],
    ["path", { d: "M9 14h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const W3 = [
  "svg",
  a,
  [
    ["path", { d: "M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z" }],
    [
      "path",
      {
        d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M16 4h2a2 2 0 0 1 2 2v2M11 14h10"
      }
    ],
    ["path", { d: "m17 10 4 4-4 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const s2 = [
  "svg",
  a,
  [
    ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1" }],
    ["path", { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5" }],
    ["path", { d: "M16 4h2a2 2 0 0 1 1.73 1" }],
    ["path", { d: "M8 18h1" }],
    [
      "path",
      {
        d: "M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const M2 = [
  "svg",
  a,
  [
    ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1" }],
    ["path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5" }],
    ["path", { d: "M4 13.5V6a2 2 0 0 1 2-2h2" }],
    [
      "path",
      {
        d: "M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $3 = [
  "svg",
  a,
  [
    ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" }],
    ["path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }],
    ["path", { d: "M9 14h6" }],
    ["path", { d: "M12 17v-6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const K3 = [
  "svg",
  a,
  [
    ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" }],
    ["path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }],
    ["path", { d: "M9 12v-1h6v1" }],
    ["path", { d: "M11 17h2" }],
    ["path", { d: "M12 11v6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J3 = [
  "svg",
  a,
  [
    ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" }],
    ["path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }],
    ["path", { d: "m15 11-6 6" }],
    ["path", { d: "m9 11 6 6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Q3 = [
  "svg",
  a,
  [
    ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" }],
    ["path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y3 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["polyline", { points: "12 6 12 12 14.5 8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j3 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["polyline", { points: "12 6 12 12 8 10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ap = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["polyline", { points: "12 6 12 12 9.5 8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tp = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["polyline", { points: "12 6 12 12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hp = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["polyline", { points: "12 6 12 12 16 10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dp = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["polyline", { points: "12 6 12 12 16.5 12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pp = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["polyline", { points: "12 6 12 12 16 14" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cp = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["polyline", { points: "12 6 12 12 14.5 16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ep = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["polyline", { points: "12 6 12 12 12 16.5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sp = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["polyline", { points: "12 6 12 12 9.5 16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mp = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["polyline", { points: "12 6 12 12 8 14" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rp = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["polyline", { points: "12 6 12 12 7.5 12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const np = [
  "svg",
  a,
  [
    ["path", { d: "M12 6v6l4 2" }],
    ["path", { d: "M16 21.16a10 10 0 1 1 5-13.516" }],
    ["path", { d: "M20 11.5v6" }],
    ["path", { d: "M20 21.5h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vp = [
  "svg",
  a,
  [
    ["path", { d: "M12.338 21.994A10 10 0 1 1 21.925 13.227" }],
    ["path", { d: "M12 6v6l2 1" }],
    ["path", { d: "m14 18 4 4 4-4" }],
    ["path", { d: "M18 14v8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const op = [
  "svg",
  a,
  [
    ["path", { d: "M13.228 21.925A10 10 0 1 1 21.994 12.338" }],
    ["path", { d: "M12 6v6l1.562.781" }],
    ["path", { d: "m14 18 4-4 4 4" }],
    ["path", { d: "M18 22v-8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ip = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["polyline", { points: "12 6 12 12 16 14" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lp = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "17", r: "3" }],
    ["path", { d: "M4.2 15.1A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2" }],
    ["path", { d: "m15.7 18.4-.9-.3" }],
    ["path", { d: "m9.2 15.9-.9-.3" }],
    ["path", { d: "m10.6 20.7.3-.9" }],
    ["path", { d: "m13.1 14.2.3-.9" }],
    ["path", { d: "m13.6 20.7-.4-1" }],
    ["path", { d: "m10.8 14.3-.4-1" }],
    ["path", { d: "m8.3 18.6 1-.4" }],
    ["path", { d: "m14.7 15.8 1-.4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const r2 = [
  "svg",
  a,
  [
    ["path", { d: "M12 13v8l-4-4" }],
    ["path", { d: "m12 21 4-4" }],
    ["path", { d: "M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gp = [
  "svg",
  a,
  [
    ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
    ["path", { d: "M8 19v1" }],
    ["path", { d: "M8 14v1" }],
    ["path", { d: "M16 19v1" }],
    ["path", { d: "M16 14v1" }],
    ["path", { d: "M12 21v1" }],
    ["path", { d: "M12 16v1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xp = [
  "svg",
  a,
  [
    ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
    ["path", { d: "M16 17H7" }],
    ["path", { d: "M17 21H9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yp = [
  "svg",
  a,
  [
    ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
    ["path", { d: "M16 14v2" }],
    ["path", { d: "M8 14v2" }],
    ["path", { d: "M16 20h.01" }],
    ["path", { d: "M8 20h.01" }],
    ["path", { d: "M12 16v2" }],
    ["path", { d: "M12 22h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mp = [
  "svg",
  a,
  [
    ["path", { d: "M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" }],
    ["path", { d: "m13 12-3 5h4l-3 5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hp = [
  "svg",
  a,
  [
    ["path", { d: "M10.188 8.5A6 6 0 0 1 16 4a1 1 0 0 0 6 6 6 6 0 0 1-3 5.197" }],
    ["path", { d: "M11 20v2" }],
    ["path", { d: "M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24" }],
    ["path", { d: "M7 19v2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const up = [
  "svg",
  a,
  [
    ["path", { d: "M10.188 8.5A6 6 0 0 1 16 4a1 1 0 0 0 6 6 6 6 0 0 1-3 5.197" }],
    ["path", { d: "M13 16a3 3 0 1 1 0 6H7a5 5 0 1 1 4.9-6Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vp = [
  "svg",
  a,
  [
    ["path", { d: "m2 2 20 20" }],
    ["path", { d: "M5.782 5.782A7 7 0 0 0 9 19h8.5a4.5 4.5 0 0 0 1.307-.193" }],
    ["path", { d: "M21.532 16.5A4.5 4.5 0 0 0 17.5 10h-1.79A7.008 7.008 0 0 0 10 5.07" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wp = [
  "svg",
  a,
  [
    ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
    ["path", { d: "m9.2 22 3-7" }],
    ["path", { d: "m9 13-3 7" }],
    ["path", { d: "m17 13-3 7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cp = [
  "svg",
  a,
  [
    ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
    ["path", { d: "M16 14v6" }],
    ["path", { d: "M8 14v6" }],
    ["path", { d: "M12 16v6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ap = [
  "svg",
  a,
  [
    ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
    ["path", { d: "M8 15h.01" }],
    ["path", { d: "M8 19h.01" }],
    ["path", { d: "M12 17h.01" }],
    ["path", { d: "M12 21h.01" }],
    ["path", { d: "M16 15h.01" }],
    ["path", { d: "M16 19h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fp = [
  "svg",
  a,
  [
    ["path", { d: "M12 2v2" }],
    ["path", { d: "m4.93 4.93 1.41 1.41" }],
    ["path", { d: "M20 12h2" }],
    ["path", { d: "m19.07 4.93-1.41 1.41" }],
    ["path", { d: "M15.947 12.65a4 4 0 0 0-5.925-4.128" }],
    ["path", { d: "M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24" }],
    ["path", { d: "M11 20v2" }],
    ["path", { d: "M7 19v2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lp = [
  "svg",
  a,
  [
    ["path", { d: "M12 2v2" }],
    ["path", { d: "m4.93 4.93 1.41 1.41" }],
    ["path", { d: "M20 12h2" }],
    ["path", { d: "m19.07 4.93-1.41 1.41" }],
    ["path", { d: "M15.947 12.65a4 4 0 0 0-5.925-4.128" }],
    ["path", { d: "M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const n2 = [
  "svg",
  a,
  [
    ["path", { d: "M12 13v8" }],
    ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
    ["path", { d: "m8 17 4-4 4 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sp = [
  "svg",
  a,
  [["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zp = [
  "svg",
  a,
  [
    ["path", { d: "M17.5 21H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" }],
    ["path", { d: "M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.702.5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kp = [
  "svg",
  a,
  [
    ["path", { d: "M16.17 7.83 2 22" }],
    [
      "path",
      {
        d: "M4.02 12a2.827 2.827 0 1 1 3.81-4.17A2.827 2.827 0 1 1 12 4.02a2.827 2.827 0 1 1 4.17 3.81A2.827 2.827 0 1 1 19.98 12a2.827 2.827 0 1 1-3.81 4.17A2.827 2.827 0 1 1 12 19.98a2.827 2.827 0 1 1-4.17-3.81A1 1 0 1 1 4 12"
      }
    ],
    ["path", { d: "m7.83 7.83 8.34 8.34" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pp = [
  "svg",
  a,
  [
    [
      "path",
      { d: "M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z" }
    ],
    ["path", { d: "M12 17.66L12 22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const v2 = [
  "svg",
  a,
  [
    ["path", { d: "m18 16 4-4-4-4" }],
    ["path", { d: "m6 8-4 4 4 4" }],
    ["path", { d: "m14.5 4-5 16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zp = [
  "svg",
  a,
  [
    ["polyline", { points: "16 18 22 12 16 6" }],
    ["polyline", { points: "8 6 2 12 8 18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bp = [
  "svg",
  a,
  [
    ["polygon", { points: "12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" }],
    ["line", { x1: "12", x2: "12", y1: "22", y2: "15.5" }],
    ["polyline", { points: "22 8.5 12 15.5 2 8.5" }],
    ["polyline", { points: "2 15.5 12 8.5 22 15.5" }],
    ["line", { x1: "12", x2: "12", y1: "2", y2: "8.5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tp = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
      }
    ],
    ["polyline", { points: "7.5 4.21 12 6.81 16.5 4.21" }],
    ["polyline", { points: "7.5 19.79 7.5 14.6 3 12" }],
    ["polyline", { points: "21 12 16.5 14.6 16.5 19.79" }],
    ["polyline", { points: "3.27 6.96 12 12.01 20.73 6.96" }],
    ["line", { x1: "12", x2: "12", y1: "22.08", y2: "12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dp = [
  "svg",
  a,
  [
    ["path", { d: "M10 2v2" }],
    ["path", { d: "M14 2v2" }],
    [
      "path",
      {
        d: "M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"
      }
    ],
    ["path", { d: "M6 2v2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fp = [
  "svg",
  a,
  [
    ["path", { d: "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" }],
    ["path", { d: "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" }],
    ["path", { d: "M12 2v2" }],
    ["path", { d: "M12 22v-2" }],
    ["path", { d: "m17 20.66-1-1.73" }],
    ["path", { d: "M11 10.27 7 3.34" }],
    ["path", { d: "m20.66 17-1.73-1" }],
    ["path", { d: "m3.34 7 1.73 1" }],
    ["path", { d: "M14 12h8" }],
    ["path", { d: "M2 12h2" }],
    ["path", { d: "m20.66 7-1.73 1" }],
    ["path", { d: "m3.34 17 1.73-1" }],
    ["path", { d: "m17 3.34-1 1.73" }],
    ["path", { d: "m11 13.73-4 6.93" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bp = [
  "svg",
  a,
  [
    ["circle", { cx: "8", cy: "8", r: "6" }],
    ["path", { d: "M18.09 10.37A6 6 0 1 1 10.34 18" }],
    ["path", { d: "M7 6h1v4" }],
    ["path", { d: "m16.71 13.88.7.71-2.82 2.82" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const o2 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M12 3v18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const i2 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M9 3v18" }],
    ["path", { d: "M15 3v18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rp = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M7.5 3v18" }],
    ["path", { d: "M12 3v18" }],
    ["path", { d: "M16.5 3v18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Op = [
  "svg",
  a,
  [
    ["path", { d: "M10 18H5a3 3 0 0 1-3-3v-1" }],
    ["path", { d: "M14 2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2" }],
    ["path", { d: "M20 2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2" }],
    ["path", { d: "m7 21 3-3-3-3" }],
    ["rect", { x: "14", y: "14", width: "8", height: "8", rx: "2" }],
    ["rect", { x: "2", y: "2", width: "8", height: "8", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qp = [
  "svg",
  a,
  [["path", { d: "M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Up = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"
      }
    ],
    ["circle", { cx: "12", cy: "12", r: "10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _p = [
  "svg",
  a,
  [
    ["path", { d: "M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z" }],
    ["path", { d: "m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z" }],
    ["path", { d: "M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z" }],
    ["path", { d: "m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ep = [
  "svg",
  a,
  [
    ["rect", { width: "14", height: "8", x: "5", y: "2", rx: "2" }],
    ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2" }],
    ["path", { d: "M6 18h2" }],
    ["path", { d: "M12 18h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Np = [
  "svg",
  a,
  [
    ["path", { d: "M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z" }],
    ["path", { d: "M20 16a8 8 0 1 0-16 0" }],
    ["path", { d: "M12 4v4" }],
    ["path", { d: "M10 4h4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ip = [
  "svg",
  a,
  [
    ["path", { d: "m20.9 18.55-8-15.98a1 1 0 0 0-1.8 0l-8 15.98" }],
    ["ellipse", { cx: "12", cy: "19", rx: "9", ry: "3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gp = [
  "svg",
  a,
  [
    ["rect", { x: "2", y: "6", width: "20", height: "8", rx: "1" }],
    ["path", { d: "M17 14v7" }],
    ["path", { d: "M7 14v7" }],
    ["path", { d: "M17 3v3" }],
    ["path", { d: "M7 3v3" }],
    ["path", { d: "M10 14 2.3 6.3" }],
    ["path", { d: "m14 6 7.7 7.7" }],
    ["path", { d: "m8 6 8 8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const l2 = [
  "svg",
  a,
  [
    ["path", { d: "M16 2v2" }],
    ["path", { d: "M17.915 22a6 6 0 0 0-12 0" }],
    ["path", { d: "M8 2v2" }],
    ["circle", { cx: "12", cy: "12", r: "4" }],
    ["rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xp = [
  "svg",
  a,
  [
    ["path", { d: "M16 2v2" }],
    ["path", { d: "M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" }],
    ["path", { d: "M8 2v2" }],
    ["circle", { cx: "12", cy: "11", r: "3" }],
    ["rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wp = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z"
      }
    ],
    ["path", { d: "M10 21.9V14L2.1 9.1" }],
    ["path", { d: "m10 14 11.9-6.9" }],
    ["path", { d: "M14 19.8v-8.1" }],
    ["path", { d: "M18 17.5V9.4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $p = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M12 18a6 6 0 0 0 0-12v12z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kp = [
  "svg",
  a,
  [
    ["path", { d: "M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" }],
    ["path", { d: "M8.5 8.5v.01" }],
    ["path", { d: "M16 15.5v.01" }],
    ["path", { d: "M12 12v.01" }],
    ["path", { d: "M11 17v.01" }],
    ["path", { d: "M7 14v.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jp = [
  "svg",
  a,
  [
    ["path", { d: "M2 12h20" }],
    ["path", { d: "M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" }],
    ["path", { d: "m4 8 16-4" }],
    ["path", { d: "m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qp = [
  "svg",
  a,
  [
    ["path", { d: "m12 15 2 2 4-4" }],
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yp = [
  "svg",
  a,
  [
    ["line", { x1: "12", x2: "18", y1: "15", y2: "15" }],
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jp = [
  "svg",
  a,
  [
    ["line", { x1: "15", x2: "15", y1: "12", y2: "18" }],
    ["line", { x1: "12", x2: "18", y1: "15", y2: "15" }],
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const a6 = [
  "svg",
  a,
  [
    ["line", { x1: "12", x2: "18", y1: "18", y2: "12" }],
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const t6 = [
  "svg",
  a,
  [
    ["line", { x1: "12", x2: "18", y1: "12", y2: "18" }],
    ["line", { x1: "12", x2: "18", y1: "18", y2: "12" }],
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h6 = [
  "svg",
  a,
  [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const d6 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M9.17 14.83a4 4 0 1 0 0-5.66" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const p6 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M14.83 14.83a4 4 0 1 1 0-5.66" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const c6 = [
  "svg",
  a,
  [
    ["polyline", { points: "9 10 4 15 9 20" }],
    ["path", { d: "M20 4v7a4 4 0 0 1-4 4H4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const e6 = [
  "svg",
  a,
  [
    ["polyline", { points: "15 10 20 15 15 20" }],
    ["path", { d: "M4 4v7a4 4 0 0 0 4 4h12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const s6 = [
  "svg",
  a,
  [
    ["polyline", { points: "14 15 9 20 4 15" }],
    ["path", { d: "M20 4h-7a4 4 0 0 0-4 4v12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const M6 = [
  "svg",
  a,
  [
    ["polyline", { points: "14 9 9 4 4 9" }],
    ["path", { d: "M20 20h-7a4 4 0 0 1-4-4V4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const r6 = [
  "svg",
  a,
  [
    ["polyline", { points: "10 15 15 20 20 15" }],
    ["path", { d: "M4 4h7a4 4 0 0 1 4 4v12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const n6 = [
  "svg",
  a,
  [
    ["polyline", { points: "10 9 15 4 20 9" }],
    ["path", { d: "M4 20h7a4 4 0 0 0 4-4V4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const v6 = [
  "svg",
  a,
  [
    ["polyline", { points: "9 14 4 9 9 4" }],
    ["path", { d: "M20 20v-7a4 4 0 0 0-4-4H4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const o6 = [
  "svg",
  a,
  [
    ["polyline", { points: "15 14 20 9 15 4" }],
    ["path", { d: "M4 20v-7a4 4 0 0 1 4-4h12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const i6 = [
  "svg",
  a,
  [
    ["rect", { width: "16", height: "16", x: "4", y: "4", rx: "2" }],
    ["rect", { width: "6", height: "6", x: "9", y: "9", rx: "1" }],
    ["path", { d: "M15 2v2" }],
    ["path", { d: "M15 20v2" }],
    ["path", { d: "M2 15h2" }],
    ["path", { d: "M2 9h2" }],
    ["path", { d: "M20 15h2" }],
    ["path", { d: "M20 9h2" }],
    ["path", { d: "M9 2v2" }],
    ["path", { d: "M9 20v2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const l6 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M10 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1" }],
    ["path", { d: "M17 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const g6 = [
  "svg",
  a,
  [
    ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2" }],
    ["line", { x1: "2", x2: "22", y1: "10", y2: "10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x6 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "m4.6 13.11 5.79-3.21c1.89-1.05 4.79 1.78 3.71 3.71l-3.22 5.81C8.8 23.16.79 15.23 4.6 13.11Z"
      }
    ],
    [
      "path",
      { d: "m10.5 9.5-1-2.29C9.2 6.48 8.8 6 8 6H4.5C2.79 6 2 6.5 2 8.5a7.71 7.71 0 0 0 2 4.83" }
    ],
    ["path", { d: "M8 6c0-1.55.24-4-2-4-2 0-2.5 2.17-2.5 4" }],
    [
      "path",
      {
        d: "m14.5 13.5 2.29 1c.73.3 1.21.7 1.21 1.5v3.5c0 1.71-.5 2.5-2.5 2.5a7.71 7.71 0 0 1-4.83-2"
      }
    ],
    ["path", { d: "M18 16c1.55 0 4-.24 4 2 0 2-2.17 2.5-4 2.5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y6 = [
  "svg",
  a,
  [
    ["path", { d: "M6 2v14a2 2 0 0 0 2 2h14" }],
    ["path", { d: "M18 22V8a2 2 0 0 0-2-2H2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const m6 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const H6 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["line", { x1: "22", x2: "18", y1: "12", y2: "12" }],
    ["line", { x1: "6", x2: "2", y1: "12", y2: "12" }],
    ["line", { x1: "12", x2: "12", y1: "6", y2: "2" }],
    ["line", { x1: "12", x2: "12", y1: "22", y2: "18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const u6 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"
      }
    ],
    ["path", { d: "M5 21h14" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const V6 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "m21.12 6.4-6.05-4.06a2 2 0 0 0-2.17-.05L2.95 8.41a2 2 0 0 0-.95 1.7v5.82a2 2 0 0 0 .88 1.66l6.05 4.07a2 2 0 0 0 2.17.05l9.95-6.12a2 2 0 0 0 .95-1.7V8.06a2 2 0 0 0-.88-1.66Z"
      }
    ],
    ["path", { d: "M10 22v-8L2.25 9.15" }],
    ["path", { d: "m10 14 11.77-6.87" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const w6 = [
  "svg",
  a,
  [
    ["path", { d: "m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8" }],
    ["path", { d: "M5 8h14" }],
    ["path", { d: "M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0" }],
    ["path", { d: "m12 8 1-6h2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C6 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "8" }],
    ["line", { x1: "3", x2: "6", y1: "3", y2: "6" }],
    ["line", { x1: "21", x2: "18", y1: "3", y2: "6" }],
    ["line", { x1: "3", x2: "6", y1: "21", y2: "18" }],
    ["line", { x1: "21", x2: "18", y1: "21", y2: "18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const A6 = [
  "svg",
  a,
  [
    ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3" }],
    ["path", { d: "M3 5v14a9 3 0 0 0 18 0V5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const f6 = [
  "svg",
  a,
  [
    ["path", { d: "M11 11.31c1.17.56 1.54 1.69 3.5 1.69 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" }],
    ["path", { d: "M11.75 18c.35.5 1.45 1 2.75 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" }],
    ["path", { d: "M2 10h4" }],
    ["path", { d: "M2 14h4" }],
    ["path", { d: "M2 18h4" }],
    ["path", { d: "M2 6h4" }],
    ["path", { d: "M7 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1L10 4a1 1 0 0 0-1-1z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const L6 = [
  "svg",
  a,
  [
    ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3" }],
    ["path", { d: "M3 12a9 3 0 0 0 5 2.69" }],
    ["path", { d: "M21 9.3V5" }],
    ["path", { d: "M3 5v14a9 3 0 0 0 6.47 2.88" }],
    ["path", { d: "M12 12v4h4" }],
    ["path", { d: "M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S6 = [
  "svg",
  a,
  [
    ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3" }],
    ["path", { d: "M3 5V19A9 3 0 0 0 15 21.84" }],
    ["path", { d: "M21 5V8" }],
    ["path", { d: "M21 12L18 17H22L19 22" }],
    ["path", { d: "M3 12A9 3 0 0 0 14.59 14.87" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z6 = [
  "svg",
  a,
  [
    ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3" }],
    ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5" }],
    ["path", { d: "M3 12A9 3 0 0 0 21 12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k6 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"
      }
    ],
    ["path", { d: "m12 9 6 6" }],
    ["path", { d: "m18 9-6 6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const P6 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "4", r: "2" }],
    [
      "path",
      {
        d: "M10.2 3.2C5.5 4 2 8.1 2 13a2 2 0 0 0 4 0v-1a2 2 0 0 1 4 0v4a2 2 0 0 0 4 0v-4a2 2 0 0 1 4 0v1a2 2 0 0 0 4 0c0-4.9-3.5-9-8.2-9.8"
      }
    ],
    ["path", { d: "M3.2 14.8a9 9 0 0 0 17.6 0" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z6 = [
  "svg",
  a,
  [
    ["circle", { cx: "19", cy: "19", r: "2" }],
    ["circle", { cx: "5", cy: "5", r: "2" }],
    ["path", { d: "M6.48 3.66a10 10 0 0 1 13.86 13.86" }],
    ["path", { d: "m6.41 6.41 11.18 11.18" }],
    ["path", { d: "M3.66 6.48a10 10 0 0 0 13.86 13.86" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B6 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z"
      }
    ],
    ["path", { d: "M8 12h8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const g2 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0Z"
      }
    ],
    ["path", { d: "M9.2 9.2h.01" }],
    ["path", { d: "m14.5 9.5-5 5" }],
    ["path", { d: "M14.7 14.8h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const T6 = [
  "svg",
  a,
  [
    ["path", { d: "M12 8v8" }],
    [
      "path",
      {
        d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z"
      }
    ],
    ["path", { d: "M8 12h8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const D6 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const F6 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
    ["path", { d: "M12 12h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const b6 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
    ["path", { d: "M15 9h.01" }],
    ["path", { d: "M9 15h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R6 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
    ["path", { d: "M16 8h.01" }],
    ["path", { d: "M12 12h.01" }],
    ["path", { d: "M8 16h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O6 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
    ["path", { d: "M16 8h.01" }],
    ["path", { d: "M8 8h.01" }],
    ["path", { d: "M8 16h.01" }],
    ["path", { d: "M16 16h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const q6 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
    ["path", { d: "M16 8h.01" }],
    ["path", { d: "M8 8h.01" }],
    ["path", { d: "M8 16h.01" }],
    ["path", { d: "M16 16h.01" }],
    ["path", { d: "M12 12h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U6 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
    ["path", { d: "M16 8h.01" }],
    ["path", { d: "M16 12h.01" }],
    ["path", { d: "M16 16h.01" }],
    ["path", { d: "M8 8h.01" }],
    ["path", { d: "M8 12h.01" }],
    ["path", { d: "M8 16h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _6 = [
  "svg",
  a,
  [
    ["rect", { width: "12", height: "12", x: "2", y: "10", rx: "2", ry: "2" }],
    ["path", { d: "m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6" }],
    ["path", { d: "M6 18h.01" }],
    ["path", { d: "M10 14h.01" }],
    ["path", { d: "M15 6h.01" }],
    ["path", { d: "M18 9h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const E6 = [
  "svg",
  a,
  [
    ["path", { d: "M12 3v14" }],
    ["path", { d: "M5 10h14" }],
    ["path", { d: "M5 21h14" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const N6 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["circle", { cx: "12", cy: "12", r: "4" }],
    ["path", { d: "M12 12h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I6 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M6 12c0-1.7.7-3.2 1.8-4.2" }],
    ["circle", { cx: "12", cy: "12", r: "2" }],
    ["path", { d: "M18 12c0 1.7-.7 3.2-1.8 4.2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G6 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["circle", { cx: "12", cy: "12", r: "5" }],
    ["path", { d: "M12 12h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X6 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["circle", { cx: "12", cy: "12", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const W6 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "6", r: "1" }],
    ["line", { x1: "5", x2: "19", y1: "12", y2: "12" }],
    ["circle", { cx: "12", cy: "18", r: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $6 = [
  "svg",
  a,
  [
    ["path", { d: "M15 2c-1.35 1.5-2.092 3-2.5 4.5L14 8" }],
    ["path", { d: "m17 6-2.891-2.891" }],
    ["path", { d: "M2 15c3.333-3 6.667-3 10-3" }],
    ["path", { d: "m2 2 20 20" }],
    ["path", { d: "m20 9 .891.891" }],
    ["path", { d: "M22 9c-1.5 1.35-3 2.092-4.5 2.5l-1-1" }],
    ["path", { d: "M3.109 14.109 4 15" }],
    ["path", { d: "m6.5 12.5 1 1" }],
    ["path", { d: "m7 18 2.891 2.891" }],
    ["path", { d: "M9 22c1.35-1.5 2.092-3 2.5-4.5L10 16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const K6 = [
  "svg",
  a,
  [
    ["path", { d: "m10 16 1.5 1.5" }],
    ["path", { d: "m14 8-1.5-1.5" }],
    ["path", { d: "M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" }],
    ["path", { d: "m16.5 10.5 1 1" }],
    ["path", { d: "m17 6-2.891-2.891" }],
    ["path", { d: "M2 15c6.667-6 13.333 0 20-6" }],
    ["path", { d: "m20 9 .891.891" }],
    ["path", { d: "M3.109 14.109 4 15" }],
    ["path", { d: "m6.5 12.5 1 1" }],
    ["path", { d: "m7 18 2.891 2.891" }],
    ["path", { d: "M9 22c1.798-1.998 2.518-3.995 2.807-5.993" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J6 = [
  "svg",
  a,
  [
    ["path", { d: "M2 8h20" }],
    ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }],
    ["path", { d: "M6 16h12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Q6 = [
  "svg",
  a,
  [
    ["path", { d: "M11.25 16.25h1.5L12 17z" }],
    ["path", { d: "M16 14v.5" }],
    [
      "path",
      {
        d: "M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309"
      }
    ],
    ["path", { d: "M8 14v.5" }],
    [
      "path",
      {
        d: "M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y6 = [
  "svg",
  a,
  [
    ["line", { x1: "12", x2: "12", y1: "2", y2: "22" }],
    ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j6 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M20.5 10a2.5 2.5 0 0 1-2.4-3H18a2.95 2.95 0 0 1-2.6-4.4 10 10 0 1 0 6.3 7.1c-.3.2-.8.3-1.2.3"
      }
    ],
    ["circle", { cx: "12", cy: "12", r: "3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ac = [
  "svg",
  a,
  [
    ["path", { d: "M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" }],
    ["path", { d: "M2 20h20" }],
    ["path", { d: "M14 12v.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tc = [
  "svg",
  a,
  [
    ["path", { d: "M13 4h3a2 2 0 0 1 2 2v14" }],
    ["path", { d: "M2 20h3" }],
    ["path", { d: "M13 20h9" }],
    ["path", { d: "M10 12v.01" }],
    [
      "path",
      {
        d: "M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hc = ["svg", a, [["circle", { cx: "12.1", cy: "12.1", r: "1" }]]];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dc = [
  "svg",
  a,
  [
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }],
    ["polyline", { points: "7 10 12 15 17 10" }],
    ["line", { x1: "12", x2: "12", y1: "15", y2: "3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pc = [
  "svg",
  a,
  [
    ["path", { d: "m12.99 6.74 1.93 3.44" }],
    ["path", { d: "M19.136 12a10 10 0 0 1-14.271 0" }],
    ["path", { d: "m21 21-2.16-3.84" }],
    ["path", { d: "m3 21 8.02-14.26" }],
    ["circle", { cx: "12", cy: "5", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cc = [
  "svg",
  a,
  [
    ["path", { d: "M10 11h.01" }],
    ["path", { d: "M14 6h.01" }],
    ["path", { d: "M18 6h.01" }],
    ["path", { d: "M6.5 13.1h.01" }],
    ["path", { d: "M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3" }],
    ["path", { d: "M17.4 9.9c-.8.8-2 .8-2.8 0" }],
    [
      "path",
      {
        d: "M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7"
      }
    ],
    ["path", { d: "M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ec = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" }],
    ["path", { d: "M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" }],
    ["path", { d: "M8.56 2.75c4.37 6 6 9.42 8 17.72" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sc = [
  "svg",
  a,
  [
    ["path", { d: "M14 9c0 .6-.4 1-1 1H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9c.6 0 1 .4 1 1Z" }],
    ["path", { d: "M18 6h4" }],
    ["path", { d: "M14 4h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3" }],
    ["path", { d: "m5 10-2 8" }],
    ["path", { d: "M12 10v3c0 .6-.4 1-1 1H8" }],
    ["path", { d: "m7 18 2-8" }],
    ["path", { d: "M5 22c-1.7 0-3-1.3-3-3 0-.6.4-1 1-1h7c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mc = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rc = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"
      }
    ],
    [
      "path",
      {
        d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nc = [
  "svg",
  a,
  [
    ["path", { d: "m2 2 8 8" }],
    ["path", { d: "m22 2-8 8" }],
    ["ellipse", { cx: "12", cy: "9", rx: "10", ry: "5" }],
    ["path", { d: "M7 13.4v7.9" }],
    ["path", { d: "M12 14v8" }],
    ["path", { d: "M17 13.4v7.9" }],
    ["path", { d: "M2 9v8a10 5 0 0 0 20 0V9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vc = [
  "svg",
  a,
  [
    ["path", { d: "M15.4 15.63a7.875 6 135 1 1 6.23-6.23 4.5 3.43 135 0 0-6.23 6.23" }],
    ["path", { d: "m8.29 12.71-2.6 2.6a2.5 2.5 0 1 0-1.65 4.65A2.5 2.5 0 1 0 8.7 18.3l2.59-2.59" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oc = [
  "svg",
  a,
  [
    ["path", { d: "M14.4 14.4 9.6 9.6" }],
    [
      "path",
      {
        d: "M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z"
      }
    ],
    ["path", { d: "m21.5 21.5-1.4-1.4" }],
    ["path", { d: "M3.9 3.9 2.5 2.5" }],
    [
      "path",
      {
        d: "M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ic = [
  "svg",
  a,
  [
    ["path", { d: "M6 18.5a3.5 3.5 0 1 0 7 0c0-1.57.92-2.52 2.04-3.46" }],
    ["path", { d: "M6 8.5c0-.75.13-1.47.36-2.14" }],
    ["path", { d: "M8.8 3.15A6.5 6.5 0 0 1 19 8.5c0 1.63-.44 2.81-1.09 3.76" }],
    ["path", { d: "M12.5 6A2.5 2.5 0 0 1 15 8.5M10 13a2 2 0 0 0 1.82-1.18" }],
    ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lc = [
  "svg",
  a,
  [
    ["path", { d: "M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0" }],
    ["path", { d: "M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gc = [
  "svg",
  a,
  [
    ["path", { d: "M7 3.34V5a3 3 0 0 0 3 3" }],
    ["path", { d: "M11 21.95V18a2 2 0 0 0-2-2 2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" }],
    ["path", { d: "M21.54 15H17a2 2 0 0 0-2 2v4.54" }],
    ["path", { d: "M12 2a10 10 0 1 0 9.54 13" }],
    ["path", { d: "M20 6V4a2 2 0 1 0-4 0v2" }],
    ["rect", { width: "8", height: "5", x: "14", y: "6", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x2 = [
  "svg",
  a,
  [
    ["path", { d: "M21.54 15H17a2 2 0 0 0-2 2v4.54" }],
    [
      "path",
      { d: "M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" }
    ],
    ["path", { d: "M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" }],
    ["circle", { cx: "12", cy: "12", r: "10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xc = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M12 2a7 7 0 1 0 10 10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yc = [
  "svg",
  a,
  [
    ["circle", { cx: "11.5", cy: "12.5", r: "3.5" }],
    [
      "path",
      {
        d: "M3 8c0-3.5 2.5-6 6.5-6 5 0 4.83 3 7.5 5s5 2 5 6c0 4.5-2.5 6.5-7 6.5-2.5 0-2.5 2.5-6 2.5s-7-2-7-5.5c0-3 1.5-3 1.5-5C3.5 10 3 9 3 8Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mc = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M6.399 6.399C5.362 8.157 4.65 10.189 4.5 12c-.37 4.43 1.27 9.95 7.5 10 3.256-.026 5.259-1.547 6.375-3.625"
      }
    ],
    [
      "path",
      {
        d: "M19.532 13.875A14.07 14.07 0 0 0 19.5 12c-.36-4.34-3.95-9.96-7.5-10-1.04.012-2.082.502-3.046 1.297"
      }
    ],
    ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hc = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M12 22c6.23-.05 7.87-5.57 7.5-10-.36-4.34-3.95-9.96-7.5-10-3.55.04-7.14 5.66-7.5 10-.37 4.43 1.27 9.95 7.5 10z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y2 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "1" }],
    ["circle", { cx: "12", cy: "5", r: "1" }],
    ["circle", { cx: "12", cy: "19", r: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const m2 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "1" }],
    ["circle", { cx: "19", cy: "12", r: "1" }],
    ["circle", { cx: "5", cy: "12", r: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const uc = [
  "svg",
  a,
  [
    ["line", { x1: "5", x2: "19", y1: "9", y2: "9" }],
    ["line", { x1: "5", x2: "19", y1: "15", y2: "15" }],
    ["line", { x1: "19", x2: "5", y1: "5", y2: "19" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vc = [
  "svg",
  a,
  [
    ["line", { x1: "5", x2: "19", y1: "9", y2: "9" }],
    ["line", { x1: "5", x2: "19", y1: "15", y2: "15" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wc = [
  "svg",
  a,
  [
    [
      "path",
      { d: "m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" }
    ],
    ["path", { d: "M22 21H7" }],
    ["path", { d: "m5 11 9 9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cc = [
  "svg",
  a,
  [
    [
      "path",
      { d: "m15 20 3-3h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2l3 3z" }
    ],
    ["path", { d: "M6 8v1" }],
    ["path", { d: "M10 8v1" }],
    ["path", { d: "M14 8v1" }],
    ["path", { d: "M18 8v1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ac = [
  "svg",
  a,
  [
    ["path", { d: "M4 10h12" }],
    ["path", { d: "M4 14h9" }],
    [
      "path",
      { d: "M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2" }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fc = [
  "svg",
  a,
  [
    ["path", { d: "m21 21-6-6m6 6v-4.8m0 4.8h-4.8" }],
    ["path", { d: "M3 16.2V21m0 0h4.8M3 21l6-6" }],
    ["path", { d: "M21 7.8V3m0 0h-4.8M21 3l-6 6" }],
    ["path", { d: "M3 7.8V3m0 0h4.8M3 3l6 6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lc = [
  "svg",
  a,
  [
    ["path", { d: "M15 3h6v6" }],
    ["path", { d: "M10 14 21 3" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sc = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"
      }
    ],
    ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242" }],
    [
      "path",
      {
        d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"
      }
    ],
    ["path", { d: "m2 2 20 20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zc = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
      }
    ],
    ["circle", { cx: "12", cy: "12", r: "3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kc = [
  "svg",
  a,
  [["path", { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pc = [
  "svg",
  a,
  [
    [
      "path",
      { d: "M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" }
    ],
    ["path", { d: "M17 18h1" }],
    ["path", { d: "M12 18h1" }],
    ["path", { d: "M7 18h1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zc = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z"
      }
    ],
    ["path", { d: "M12 12v.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bc = [
  "svg",
  a,
  [
    ["polygon", { points: "13 19 22 12 13 5 13 19" }],
    ["polygon", { points: "2 19 11 12 2 5 2 19" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tc = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z"
      }
    ],
    ["path", { d: "M16 8 2 22" }],
    ["path", { d: "M17.5 15H9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dc = [
  "svg",
  a,
  [
    ["path", { d: "M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z" }],
    ["path", { d: "M6 8h4" }],
    ["path", { d: "M6 18h4" }],
    ["path", { d: "m12 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z" }],
    ["path", { d: "M14 8h4" }],
    ["path", { d: "M14 18h4" }],
    ["path", { d: "m20 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fc = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "2" }],
    ["path", { d: "M12 2v4" }],
    ["path", { d: "m6.8 15-3.5 2" }],
    ["path", { d: "m20.7 7-3.5 2" }],
    ["path", { d: "M6.8 9 3.3 7" }],
    ["path", { d: "m20.7 17-3.5-2" }],
    ["path", { d: "m9 22 3-8 3 8" }],
    ["path", { d: "M8 22h8" }],
    ["path", { d: "M18 18.7a9 9 0 1 0-12 0" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bc = [
  "svg",
  a,
  [
    ["path", { d: "M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" }],
    ["path", { d: "M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" }],
    ["path", { d: "M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" }],
    ["path", { d: "M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" }],
    ["path", { d: "M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rc = [
  "svg",
  a,
  [
    ["path", { d: "M10 12v-1" }],
    ["path", { d: "M10 18v-2" }],
    ["path", { d: "M10 7V6" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M15.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 .274 1.01" }],
    ["circle", { cx: "10", cy: "20", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Oc = [
  "svg",
  a,
  [
    ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v2" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["circle", { cx: "3", cy: "17", r: "1" }],
    ["path", { d: "M2 17v-3a4 4 0 0 1 8 0v3" }],
    ["circle", { cx: "9", cy: "17", r: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qc = [
  "svg",
  a,
  [
    ["path", { d: "M17.5 22h.5a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    [
      "path",
      {
        d: "M2 19a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 1 1-4 0v-1a2 2 0 1 1 4 0"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const H2 = [
  "svg",
  a,
  [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "m8 18 4-4" }],
    ["path", { d: "M8 10v8h8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Uc = [
  "svg",
  a,
  [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
    ["circle", { cx: "12", cy: "10", r: "3" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "m14 12.5 1 5.5-3-1-3 1 1-5.5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _c = [
  "svg",
  a,
  [
    ["path", { d: "M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M5 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" }],
    ["path", { d: "M7 16.5 8 22l-3-1-3 1 1-5.5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ec = [
  "svg",
  a,
  [
    ["path", { d: "M14.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    [
      "path",
      {
        d: "M3 13.1a2 2 0 0 0-1 1.76v3.24a2 2 0 0 0 .97 1.78L6 21.7a2 2 0 0 0 2.03.01L11 19.9a2 2 0 0 0 1-1.76V14.9a2 2 0 0 0-.97-1.78L8 11.3a2 2 0 0 0-2.03-.01Z"
      }
    ],
    ["path", { d: "M7 17v5" }],
    ["path", { d: "M11.7 14.2 7 17l-4.7-2.8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const u2 = [
  "svg",
  a,
  [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M8 18v-2" }],
    ["path", { d: "M12 18v-4" }],
    ["path", { d: "M16 18v-6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const V2 = [
  "svg",
  a,
  [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M8 18v-1" }],
    ["path", { d: "M12 18v-6" }],
    ["path", { d: "M16 18v-3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const w2 = [
  "svg",
  a,
  [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "m16 13-3.5 3.5-2-2L8 17" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C2 = [
  "svg",
  a,
  [
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3.5" }],
    ["path", { d: "M4.017 11.512a6 6 0 1 0 8.466 8.475" }],
    [
      "path",
      {
        d: "M9 16a1 1 0 0 1-1-1v-4c0-.552.45-1.008.995-.917a6 6 0 0 1 4.922 4.922c.091.544-.365.995-.917.995z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nc = [
  "svg",
  a,
  [
    ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "m3 15 2 2 4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ic = [
  "svg",
  a,
  [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "m9 15 2 2 4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gc = [
  "svg",
  a,
  [
    ["path", { d: "M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["circle", { cx: "8", cy: "16", r: "6" }],
    ["path", { d: "M9.5 17.5 8 16.25V14" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xc = [
  "svg",
  a,
  [
    ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "m5 12-3 3 3 3" }],
    ["path", { d: "m9 18 3-3-3-3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wc = [
  "svg",
  a,
  [
    ["path", { d: "M10 12.5 8 15l2 2.5" }],
    ["path", { d: "m14 12.5 2 2.5-2 2.5" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const A2 = [
  "svg",
  a,
  [
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "m3.2 12.9-.9-.4" }],
    ["path", { d: "m3.2 15.1-.9.4" }],
    ["path", { d: "M4.677 21.5a2 2 0 0 0 1.313.5H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v2.5" }],
    ["path", { d: "m4.9 11.2-.4-.9" }],
    ["path", { d: "m4.9 16.8-.4.9" }],
    ["path", { d: "m7.5 10.3-.4.9" }],
    ["path", { d: "m7.5 17.7-.4-.9" }],
    ["path", { d: "m9.7 12.5-.9.4" }],
    ["path", { d: "m9.7 15.5-.9-.4" }],
    ["circle", { cx: "6", cy: "14", r: "3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $c = [
  "svg",
  a,
  [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
    ["path", { d: "M9 10h6" }],
    ["path", { d: "M12 13V7" }],
    ["path", { d: "M9 17h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kc = [
  "svg",
  a,
  [
    ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["rect", { width: "4", height: "6", x: "2", y: "12", rx: "2" }],
    ["path", { d: "M10 12h2v6" }],
    ["path", { d: "M10 18h4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jc = [
  "svg",
  a,
  [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M12 18v-6" }],
    ["path", { d: "m9 15 3 3 3-3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qc = [
  "svg",
  a,
  [
    ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v2" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    [
      "path",
      {
        d: "M10.29 10.7a2.43 2.43 0 0 0-2.66-.52c-.29.12-.56.3-.78.53l-.35.34-.35-.34a2.43 2.43 0 0 0-2.65-.53c-.3.12-.56.3-.79.53-.95.94-1 2.53.2 3.74L6.5 18l3.6-3.55c1.2-1.21 1.14-2.8.19-3.74Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yc = [
  "svg",
  a,
  [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["circle", { cx: "10", cy: "12", r: "2" }],
    ["path", { d: "m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jc = [
  "svg",
  a,
  [
    ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M2 15h10" }],
    ["path", { d: "m9 18 3-3-3-3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const a8 = [
  "svg",
  a,
  [
    ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M4 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1" }],
    ["path", { d: "M8 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const t8 = [
  "svg",
  a,
  [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1" }],
    ["path", { d: "M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h8 = [
  "svg",
  a,
  [
    ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v6" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["circle", { cx: "4", cy: "16", r: "2" }],
    ["path", { d: "m10 10-4.5 4.5" }],
    ["path", { d: "m9 11 1 1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const d8 = [
  "svg",
  a,
  [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
    ["circle", { cx: "10", cy: "16", r: "2" }],
    ["path", { d: "m16 10-4.5 4.5" }],
    ["path", { d: "m15 11 1 1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const p8 = [
  "svg",
  a,
  [
    ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v1" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["rect", { width: "8", height: "5", x: "2", y: "13", rx: "1" }],
    ["path", { d: "M8 13v-2a2 2 0 1 0-4 0v2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const c8 = [
  "svg",
  a,
  [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
    ["rect", { width: "8", height: "6", x: "8", y: "12", rx: "1" }],
    ["path", { d: "M10 12v-2a2 2 0 1 1 4 0v2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const e8 = [
  "svg",
  a,
  [
    ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M3 15h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const s8 = [
  "svg",
  a,
  [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M9 15h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const M8 = [
  "svg",
  a,
  [
    ["circle", { cx: "14", cy: "16", r: "2" }],
    ["circle", { cx: "6", cy: "18", r: "2" }],
    ["path", { d: "M4 12.4V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-7.5" }],
    ["path", { d: "M8 18v-7.7L16 9v7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const r8 = [
  "svg",
  a,
  [
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M4 7V4a2 2 0 0 1 2-2 2 2 0 0 0-2 2" }],
    ["path", { d: "M4.063 20.999a2 2 0 0 0 2 1L18 22a2 2 0 0 0 2-2V7l-5-5H6" }],
    ["path", { d: "m5 11-3 3" }],
    ["path", { d: "m5 17-3-3h10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const f2 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2"
      }
    ],
    [
      "path",
      {
        d: "M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
      }
    ],
    ["path", { d: "M8 18h1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const L2 = [
  "svg",
  a,
  [
    ["path", { d: "M12.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v9.5" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    [
      "path",
      {
        d: "M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const n8 = [
  "svg",
  a,
  [
    ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M3 15h6" }],
    ["path", { d: "M6 12v6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const v8 = [
  "svg",
  a,
  [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M9 15h6" }],
    ["path", { d: "M12 18v-6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const o8 = [
  "svg",
  a,
  [
    ["path", { d: "M12 17h.01" }],
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" }],
    ["path", { d: "M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const i8 = [
  "svg",
  a,
  [
    ["path", { d: "M20 10V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M16 14a2 2 0 0 0-2 2" }],
    ["path", { d: "M20 14a2 2 0 0 1 2 2" }],
    ["path", { d: "M20 22a2 2 0 0 0 2-2" }],
    ["path", { d: "M16 22a2 2 0 0 1-2-2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const l8 = [
  "svg",
  a,
  [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["circle", { cx: "11.5", cy: "14.5", r: "2.5" }],
    ["path", { d: "M13.3 16.3 15 18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const g8 = [
  "svg",
  a,
  [
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M4.268 21a2 2 0 0 0 1.727 1H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3" }],
    ["path", { d: "m9 18-1.5-1.5" }],
    ["circle", { cx: "5", cy: "14", r: "3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x8 = [
  "svg",
  a,
  [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M8 12h8" }],
    ["path", { d: "M10 11v2" }],
    ["path", { d: "M8 17h8" }],
    ["path", { d: "M14 16v2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y8 = [
  "svg",
  a,
  [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M8 13h2" }],
    ["path", { d: "M14 13h2" }],
    ["path", { d: "M8 17h2" }],
    ["path", { d: "M14 17h2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const m8 = [
  "svg",
  a,
  [
    ["path", { d: "M21 7h-3a2 2 0 0 1-2-2V2" }],
    [
      "path",
      { d: "M21 6v6.5c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-9c0-.8.7-1.5 1.5-1.5H17Z" }
    ],
    ["path", { d: "M7 8v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H15" }],
    ["path", { d: "M3 12v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H11" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const H8 = [
  "svg",
  a,
  [
    ["path", { d: "m10 18 3-3-3-3" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    [
      "path",
      { d: "M4 11V4a2 2 0 0 1 2-2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7" }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const u8 = [
  "svg",
  a,
  [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "m8 16 2-2-2-2" }],
    ["path", { d: "M12 18h4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const V8 = [
  "svg",
  a,
  [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M10 9H8" }],
    ["path", { d: "M16 13H8" }],
    ["path", { d: "M16 17H8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const w8 = [
  "svg",
  a,
  [
    ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M2 13v-1h6v1" }],
    ["path", { d: "M5 12v6" }],
    ["path", { d: "M4 18h2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C8 = [
  "svg",
  a,
  [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M9 13v-1h6v1" }],
    ["path", { d: "M12 12v6" }],
    ["path", { d: "M11 18h2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const A8 = [
  "svg",
  a,
  [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M12 12v6" }],
    ["path", { d: "m15 15-3-3-3 3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const f8 = [
  "svg",
  a,
  [
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M15 18a3 3 0 1 0-6 0" }],
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" }],
    ["circle", { cx: "12", cy: "13", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const L8 = [
  "svg",
  a,
  [
    ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["rect", { width: "8", height: "6", x: "2", y: "12", rx: "1" }],
    ["path", { d: "m10 15.5 4 2.5v-6l-4 2.5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S8 = [
  "svg",
  a,
  [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "m10 11 5 3-5 3v-6Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z8 = [
  "svg",
  a,
  [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M8 15h.01" }],
    ["path", { d: "M11.5 13.5a2.5 2.5 0 0 1 0 3" }],
    ["path", { d: "M15 12a5 5 0 0 1 0 6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k8 = [
  "svg",
  a,
  [
    ["path", { d: "M11 11a5 5 0 0 1 0 6" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M4 6.765V4a2 2 0 0 1 2-2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-.93-.23" }],
    [
      "path",
      {
        d: "M7 10.51a.5.5 0 0 0-.826-.38l-1.893 1.628A1 1 0 0 1 3.63 12H2.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h1.129a1 1 0 0 1 .652.242l1.893 1.63a.5.5 0 0 0 .826-.38z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const P8 = [
  "svg",
  a,
  [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
    ["path", { d: "M12 9v4" }],
    ["path", { d: "M12 17h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z8 = [
  "svg",
  a,
  [
    ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "m8 12.5-5 5" }],
    ["path", { d: "m3 12.5 5 5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B8 = [
  "svg",
  a,
  [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "m14.5 12.5-5 5" }],
    ["path", { d: "m9.5 12.5 5 5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const T8 = [
  "svg",
  a,
  [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const D8 = [
  "svg",
  a,
  [
    ["path", { d: "M20 7h-3a2 2 0 0 1-2-2V2" }],
    ["path", { d: "M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z" }],
    ["path", { d: "M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const F8 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M7 3v18" }],
    ["path", { d: "M3 7.5h4" }],
    ["path", { d: "M3 12h18" }],
    ["path", { d: "M3 16.5h4" }],
    ["path", { d: "M17 3v18" }],
    ["path", { d: "M17 7.5h4" }],
    ["path", { d: "M17 16.5h4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const b8 = [
  "svg",
  a,
  [
    ["path", { d: "M13.013 3H2l8 9.46V19l4 2v-8.54l.9-1.055" }],
    ["path", { d: "m22 3-5 5" }],
    ["path", { d: "m17 3 5 5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R8 = [
  "svg",
  a,
  [["polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O8 = [
  "svg",
  a,
  [
    ["path", { d: "M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" }],
    ["path", { d: "M14 13.12c0 2.38 0 6.38-1 8.88" }],
    ["path", { d: "M17.29 21.02c.12-.6.43-2.3.5-3.02" }],
    ["path", { d: "M2 12a10 10 0 0 1 18-6" }],
    ["path", { d: "M2 16h.01" }],
    ["path", { d: "M21.8 16c.2-2 .131-5.354 0-6" }],
    ["path", { d: "M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" }],
    ["path", { d: "M8.65 22c.21-.66.45-1.32.57-2" }],
    ["path", { d: "M9 6.8a6 6 0 0 1 9 5.2v2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const q8 = [
  "svg",
  a,
  [
    ["path", { d: "M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5" }],
    ["path", { d: "M9 18h8" }],
    ["path", { d: "M18 3h-3" }],
    ["path", { d: "M11 3a6 6 0 0 0-6 6v11" }],
    ["path", { d: "M5 13h4" }],
    ["path", { d: "M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U8 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M18 12.47v.03m0-.5v.47m-.475 5.056A6.744 6.744 0 0 1 15 18c-3.56 0-7.56-2.53-8.5-6 .348-1.28 1.114-2.433 2.121-3.38m3.444-2.088A8.802 8.802 0 0 1 15 6c3.56 0 6.06 2.54 7 6-.309 1.14-.786 2.177-1.413 3.058"
      }
    ],
    [
      "path",
      {
        d: "M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33m7.48-4.372A9.77 9.77 0 0 1 16 6.07m0 11.86a9.77 9.77 0 0 1-1.728-3.618"
      }
    ],
    [
      "path",
      {
        d: "m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98M8.53 3h5.27a2 2 0 0 1 1.98 1.67l.23 1.4M2 2l20 20"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _8 = [
  "svg",
  a,
  [["path", { d: "M2 16s9-15 20-4C11 23 2 8 2 8" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const E8 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"
      }
    ],
    ["path", { d: "M18 12v.5" }],
    ["path", { d: "M16 17.93a9.77 9.77 0 0 1 0-11.86" }],
    [
      "path",
      {
        d: "M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33"
      }
    ],
    ["path", { d: "M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4" }],
    ["path", { d: "m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const N8 = [
  "svg",
  a,
  [
    ["path", { d: "M8 2c3 0 5 2 8 2s4-1 4-1v11" }],
    ["path", { d: "M4 22V4" }],
    ["path", { d: "M4 15s1-1 4-1 5 2 8 2" }],
    ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I8 = [
  "svg",
  a,
  [["path", { d: "M17 22V2L7 7l10 5" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G8 = [
  "svg",
  a,
  [["path", { d: "M7 22V2l10 5-10 5" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X8 = [
  "svg",
  a,
  [
    ["path", { d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" }],
    ["line", { x1: "4", x2: "4", y1: "22", y2: "15" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const W8 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M12 2c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 17 10a5 5 0 1 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C8 4.5 11 2 12 2Z"
      }
    ],
    ["path", { d: "m5 22 14-4" }],
    ["path", { d: "m5 18 14 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $8 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const K8 = [
  "svg",
  a,
  [
    ["path", { d: "M16 16v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10c0-2-2-2-2-4" }],
    ["path", { d: "M7 2h11v4c0 2-2 2-2 4v1" }],
    ["line", { x1: "11", x2: "18", y1: "6", y2: "6" }],
    ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J8 = [
  "svg",
  a,
  [
    ["path", { d: "M18 6c0 2-2 2-2 4v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10c0-2-2-2-2-4V2h12z" }],
    ["line", { x1: "6", x2: "18", y1: "6", y2: "6" }],
    ["line", { x1: "12", x2: "12", y1: "12", y2: "12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Q8 = [
  "svg",
  a,
  [
    ["path", { d: "M10 10 4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-1.272-2.542" }],
    ["path", { d: "M10 2v2.343" }],
    ["path", { d: "M14 2v6.343" }],
    ["path", { d: "M8.5 2h7" }],
    ["path", { d: "M7 16h9" }],
    ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y8 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"
      }
    ],
    ["path", { d: "M8.5 2h7" }],
    ["path", { d: "M7 16h10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j8 = [
  "svg",
  a,
  [
    ["path", { d: "M10 2v7.31" }],
    ["path", { d: "M14 9.3V1.99" }],
    ["path", { d: "M8.5 2h7" }],
    ["path", { d: "M14 9.3a6.5 6.5 0 1 1-4 0" }],
    ["path", { d: "M5.52 16h12.96" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ae = [
  "svg",
  a,
  [
    ["path", { d: "m3 7 5 5-5 5V7" }],
    ["path", { d: "m21 7-5 5 5 5V7" }],
    ["path", { d: "M12 20v2" }],
    ["path", { d: "M12 14v2" }],
    ["path", { d: "M12 8v2" }],
    ["path", { d: "M12 2v2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const te = [
  "svg",
  a,
  [
    ["path", { d: "M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3" }],
    ["path", { d: "M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3" }],
    ["path", { d: "M12 20v2" }],
    ["path", { d: "M12 14v2" }],
    ["path", { d: "M12 8v2" }],
    ["path", { d: "M12 2v2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const he = [
  "svg",
  a,
  [
    ["path", { d: "m17 3-5 5-5-5h10" }],
    ["path", { d: "m17 21-5-5-5 5h10" }],
    ["path", { d: "M4 12H2" }],
    ["path", { d: "M10 12H8" }],
    ["path", { d: "M16 12h-2" }],
    ["path", { d: "M22 12h-2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const de = [
  "svg",
  a,
  [
    ["path", { d: "M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3" }],
    ["path", { d: "M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3" }],
    ["path", { d: "M4 12H2" }],
    ["path", { d: "M10 12H8" }],
    ["path", { d: "M16 12h-2" }],
    ["path", { d: "M22 12h-2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pe = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"
      }
    ],
    ["circle", { cx: "12", cy: "8", r: "2" }],
    ["path", { d: "M12 10v12" }],
    ["path", { d: "M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z" }],
    ["path", { d: "M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ce = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "3" }],
    [
      "path",
      {
        d: "M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5"
      }
    ],
    ["path", { d: "M12 7.5V9" }],
    ["path", { d: "M7.5 12H9" }],
    ["path", { d: "M16.5 12H15" }],
    ["path", { d: "M12 16.5V15" }],
    ["path", { d: "m8 8 1.88 1.88" }],
    ["path", { d: "M14.12 9.88 16 8" }],
    ["path", { d: "m8 16 1.88-1.88" }],
    ["path", { d: "M14.12 14.12 16 16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ee = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "3" }],
    ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }],
    ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }],
    ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }],
    ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const se = [
  "svg",
  a,
  [
    ["path", { d: "M2 12h6" }],
    ["path", { d: "M22 12h-6" }],
    ["path", { d: "M12 2v2" }],
    ["path", { d: "M12 8v2" }],
    ["path", { d: "M12 14v2" }],
    ["path", { d: "M12 20v2" }],
    ["path", { d: "m19 9-3 3 3 3" }],
    ["path", { d: "m5 15 3-3-3-3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Me = [
  "svg",
  a,
  [
    ["path", { d: "M12 22v-6" }],
    ["path", { d: "M12 8V2" }],
    ["path", { d: "M4 12H2" }],
    ["path", { d: "M10 12H8" }],
    ["path", { d: "M16 12h-2" }],
    ["path", { d: "M22 12h-2" }],
    ["path", { d: "m15 19-3-3-3 3" }],
    ["path", { d: "m15 5-3 3-3-3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const re = [
  "svg",
  a,
  [
    ["circle", { cx: "15", cy: "19", r: "2" }],
    [
      "path",
      {
        d: "M20.9 19.8A2 2 0 0 0 22 18V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h5.1"
      }
    ],
    ["path", { d: "M15 11v-1" }],
    ["path", { d: "M15 17v-2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ne = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      }
    ],
    ["path", { d: "m9 13 2 2 4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ve = [
  "svg",
  a,
  [
    ["circle", { cx: "16", cy: "16", r: "6" }],
    [
      "path",
      {
        d: "M7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2"
      }
    ],
    ["path", { d: "M16 14v2l1 1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oe = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      }
    ],
    ["path", { d: "M2 10h20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ie = [
  "svg",
  a,
  [
    ["path", { d: "M10 10.5 8 13l2 2.5" }],
    ["path", { d: "m14 10.5 2 2.5-2 2.5" }],
    [
      "path",
      {
        d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S2 = [
  "svg",
  a,
  [
    ["circle", { cx: "18", cy: "18", r: "3" }],
    [
      "path",
      {
        d: "M10.3 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v3.3"
      }
    ],
    ["path", { d: "m21.7 19.4-.9-.3" }],
    ["path", { d: "m15.2 16.9-.9-.3" }],
    ["path", { d: "m16.6 21.7.3-.9" }],
    ["path", { d: "m19.1 15.2.3-.9" }],
    ["path", { d: "m19.6 21.7-.4-1" }],
    ["path", { d: "m16.8 15.3-.4-1" }],
    ["path", { d: "m14.3 19.6 1-.4" }],
    ["path", { d: "m20.7 16.8 1-.4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const le = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
      }
    ],
    ["circle", { cx: "12", cy: "13", r: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ge = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      }
    ],
    ["path", { d: "M12 10v6" }],
    ["path", { d: "m15 13-3 3-3-3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xe = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5"
      }
    ],
    ["circle", { cx: "13", cy: "12", r: "2" }],
    ["path", { d: "M18 19c-2.8 0-5-2.2-5-5v8" }],
    ["circle", { cx: "20", cy: "19", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ye = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "13", r: "2" }],
    [
      "path",
      {
        d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      }
    ],
    ["path", { d: "M14 13h3" }],
    ["path", { d: "M7 13h3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const me = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M11 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v1.5"
      }
    ],
    [
      "path",
      {
        d: "M13.9 17.45c-1.2-1.2-1.14-2.8-.2-3.73a2.43 2.43 0 0 1 3.44 0l.36.34.34-.34a2.43 2.43 0 0 1 3.45-.01c.95.95 1 2.53-.2 3.74L17.5 21Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const He = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1"
      }
    ],
    ["path", { d: "M2 13h10" }],
    ["path", { d: "m9 16 3-3-3-3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ue = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
      }
    ],
    ["path", { d: "M8 10v4" }],
    ["path", { d: "M12 10v2" }],
    ["path", { d: "M16 10v6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ve = [
  "svg",
  a,
  [
    ["circle", { cx: "16", cy: "20", r: "2" }],
    [
      "path",
      {
        d: "M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2"
      }
    ],
    ["path", { d: "m22 14-4.5 4.5" }],
    ["path", { d: "m21 15 1 1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const we = [
  "svg",
  a,
  [
    ["rect", { width: "8", height: "5", x: "14", y: "17", rx: "1" }],
    [
      "path",
      {
        d: "M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2.5"
      }
    ],
    ["path", { d: "M20 17v-2a2 2 0 1 0-4 0v2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ce = [
  "svg",
  a,
  [
    ["path", { d: "M9 13h6" }],
    [
      "path",
      {
        d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ae = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"
      }
    ],
    ["circle", { cx: "14", cy: "15", r: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fe = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Le = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M2 7.5V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-1.5"
      }
    ],
    ["path", { d: "M2 13h10" }],
    ["path", { d: "m5 10-3 3 3 3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z2 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M2 11.5V5a2 2 0 0 1 2-2h3.9c.7 0 1.3.3 1.7.9l.8 1.2c.4.6 1 .9 1.7.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9.5"
      }
    ],
    [
      "path",
      {
        d: "M11.378 13.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Se = [
  "svg",
  a,
  [
    ["path", { d: "M12 10v6" }],
    ["path", { d: "M9 13h6" }],
    [
      "path",
      {
        d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ze = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
      }
    ],
    ["circle", { cx: "12", cy: "13", r: "2" }],
    ["path", { d: "M12 15v5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ke = [
  "svg",
  a,
  [
    ["circle", { cx: "11.5", cy: "12.5", r: "2.5" }],
    [
      "path",
      {
        d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      }
    ],
    ["path", { d: "M13.3 14.3 15 16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pe = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M10.7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v4.1"
      }
    ],
    ["path", { d: "m21 21-1.9-1.9" }],
    ["circle", { cx: "17", cy: "17", r: "3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ze = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7"
      }
    ],
    ["path", { d: "m8 16 3-3-3-3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Be = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v.5"
      }
    ],
    ["path", { d: "M12 10v4h4" }],
    ["path", { d: "m12 14 1.535-1.605a5 5 0 0 1 8 1.5" }],
    ["path", { d: "M22 22v-4h-4" }],
    ["path", { d: "m22 18-1.535 1.605a5 5 0 0 1-8-1.5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Te = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"
      }
    ],
    [
      "path",
      {
        d: "M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"
      }
    ],
    ["path", { d: "M3 5a2 2 0 0 0 2 2h3" }],
    ["path", { d: "M3 3v13a2 2 0 0 0 2 2h3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const De = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      }
    ],
    ["path", { d: "M12 10v6" }],
    ["path", { d: "m9 13 3-3 3 3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fe = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      }
    ],
    ["path", { d: "m9.5 10.5 5 5" }],
    ["path", { d: "m14.5 10.5-5 5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const be = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Re = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M20 17a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.9a2 2 0 0 1-1.69-.9l-.81-1.2a2 2 0 0 0-1.67-.9H8a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2Z"
      }
    ],
    ["path", { d: "M2 8v11a2 2 0 0 0 2 2h14" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Oe = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"
      }
    ],
    [
      "path",
      {
        d: "M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"
      }
    ],
    ["path", { d: "M16 17h4" }],
    ["path", { d: "M4 13h4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qe = [
  "svg",
  a,
  [
    ["path", { d: "M12 12H5a2 2 0 0 0-2 2v5" }],
    ["circle", { cx: "13", cy: "19", r: "2" }],
    ["circle", { cx: "5", cy: "19", r: "2" }],
    ["path", { d: "M8 19h3m5-17v17h6M6 12V7c0-1.1.9-2 2-2h3l5 5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ue = [
  "svg",
  a,
  [
    ["polyline", { points: "15 17 20 12 15 7" }],
    ["path", { d: "M4 18v-2a4 4 0 0 1 4-4h12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _e = [
  "svg",
  a,
  [
    ["line", { x1: "22", x2: "2", y1: "6", y2: "6" }],
    ["line", { x1: "22", x2: "2", y1: "18", y2: "18" }],
    ["line", { x1: "6", x2: "6", y1: "2", y2: "22" }],
    ["line", { x1: "18", x2: "18", y1: "2", y2: "22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ee = [
  "svg",
  a,
  [["path", { d: "M5 16V9h14V2H5l14 14h-7m-7 0 7 7v-7m-7 0h7" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ne = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M16 16s-1.5-2-4-2-4 2-4 2" }],
    ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9" }],
    ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ie = [
  "svg",
  a,
  [
    ["line", { x1: "3", x2: "15", y1: "22", y2: "22" }],
    ["line", { x1: "4", x2: "14", y1: "9", y2: "9" }],
    ["path", { d: "M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18" }],
    [
      "path",
      { d: "M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5" }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ge = [
  "svg",
  a,
  [
    ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }],
    ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }],
    ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }],
    ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }],
    ["rect", { width: "10", height: "8", x: "7", y: "8", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xe = [
  "svg",
  a,
  [
    ["path", { d: "M2 7v10" }],
    ["path", { d: "M6 5v14" }],
    ["rect", { width: "12", height: "18", x: "10", y: "3", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const We = [
  "svg",
  a,
  [
    ["path", { d: "M2 3v18" }],
    ["rect", { width: "12", height: "18", x: "6", y: "3", rx: "2" }],
    ["path", { d: "M22 3v18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $e = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "14", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M4 21h1" }],
    ["path", { d: "M9 21h1" }],
    ["path", { d: "M14 21h1" }],
    ["path", { d: "M19 21h1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ke = [
  "svg",
  a,
  [
    ["path", { d: "M7 2h10" }],
    ["path", { d: "M5 6h14" }],
    ["rect", { width: "18", height: "12", x: "3", y: "10", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Je = [
  "svg",
  a,
  [
    ["path", { d: "M3 2h18" }],
    ["rect", { width: "18", height: "12", x: "3", y: "6", rx: "2" }],
    ["path", { d: "M3 22h18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qe = [
  "svg",
  a,
  [
    ["line", { x1: "6", x2: "10", y1: "11", y2: "11" }],
    ["line", { x1: "8", x2: "8", y1: "9", y2: "13" }],
    ["line", { x1: "15", x2: "15.01", y1: "12", y2: "12" }],
    ["line", { x1: "18", x2: "18.01", y1: "10", y2: "10" }],
    [
      "path",
      {
        d: "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ye = [
  "svg",
  a,
  [
    ["line", { x1: "6", x2: "10", y1: "12", y2: "12" }],
    ["line", { x1: "8", x2: "8", y1: "10", y2: "14" }],
    ["line", { x1: "15", x2: "15.01", y1: "13", y2: "13" }],
    ["line", { x1: "18", x2: "18.01", y1: "11", y2: "11" }],
    ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const je = [
  "svg",
  a,
  [
    ["path", { d: "m12 14 4-4" }],
    ["path", { d: "M3.34 19a10 10 0 1 1 17.32 0" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const a7 = [
  "svg",
  a,
  [
    ["path", { d: "m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8" }],
    ["path", { d: "m16 16 6-6" }],
    ["path", { d: "m8 8 6-6" }],
    ["path", { d: "m9 7 8 8" }],
    ["path", { d: "m21 11-8-8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const t7 = [
  "svg",
  a,
  [
    ["path", { d: "M6 3h12l4 6-10 13L2 9Z" }],
    ["path", { d: "M11 3 8 9l4 13 4-13-3-6" }],
    ["path", { d: "M2 9h20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h7 = [
  "svg",
  a,
  [
    ["path", { d: "M9 10h.01" }],
    ["path", { d: "M15 10h.01" }],
    ["path", { d: "M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const d7 = [
  "svg",
  a,
  [
    ["rect", { x: "3", y: "8", width: "18", height: "4", rx: "1" }],
    ["path", { d: "M12 8v13" }],
    ["path", { d: "M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" }],
    [
      "path",
      { d: "M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const p7 = [
  "svg",
  a,
  [
    ["path", { d: "M6 3v12" }],
    ["path", { d: "M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" }],
    ["path", { d: "M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" }],
    ["path", { d: "M15 6a9 9 0 0 0-9 9" }],
    ["path", { d: "M18 15v6" }],
    ["path", { d: "M21 18h-6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const c7 = [
  "svg",
  a,
  [
    ["line", { x1: "6", x2: "6", y1: "3", y2: "15" }],
    ["circle", { cx: "18", cy: "6", r: "3" }],
    ["circle", { cx: "6", cy: "18", r: "3" }],
    ["path", { d: "M18 9a9 9 0 0 1-9 9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k2 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "3" }],
    ["line", { x1: "3", x2: "9", y1: "12", y2: "12" }],
    ["line", { x1: "15", x2: "21", y1: "12", y2: "12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const e7 = [
  "svg",
  a,
  [
    ["path", { d: "M12 3v6" }],
    ["circle", { cx: "12", cy: "12", r: "3" }],
    ["path", { d: "M12 15v6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const s7 = [
  "svg",
  a,
  [
    ["circle", { cx: "5", cy: "6", r: "3" }],
    ["path", { d: "M12 6h5a2 2 0 0 1 2 2v7" }],
    ["path", { d: "m15 9-3-3 3-3" }],
    ["circle", { cx: "19", cy: "18", r: "3" }],
    ["path", { d: "M12 18H7a2 2 0 0 1-2-2V9" }],
    ["path", { d: "m9 15 3 3-3 3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const M7 = [
  "svg",
  a,
  [
    ["circle", { cx: "18", cy: "18", r: "3" }],
    ["circle", { cx: "6", cy: "6", r: "3" }],
    ["path", { d: "M13 6h3a2 2 0 0 1 2 2v7" }],
    ["path", { d: "M11 18H8a2 2 0 0 1-2-2V9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const r7 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "18", r: "3" }],
    ["circle", { cx: "6", cy: "6", r: "3" }],
    ["circle", { cx: "18", cy: "6", r: "3" }],
    ["path", { d: "M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" }],
    ["path", { d: "M12 12v3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const n7 = [
  "svg",
  a,
  [
    ["circle", { cx: "5", cy: "6", r: "3" }],
    ["path", { d: "M5 9v6" }],
    ["circle", { cx: "5", cy: "18", r: "3" }],
    ["path", { d: "M12 3v18" }],
    ["circle", { cx: "19", cy: "6", r: "3" }],
    ["path", { d: "M16 15.7A9 9 0 0 0 19 9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const v7 = [
  "svg",
  a,
  [
    ["circle", { cx: "18", cy: "18", r: "3" }],
    ["circle", { cx: "6", cy: "6", r: "3" }],
    ["path", { d: "M6 21V9a9 9 0 0 0 9 9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const o7 = [
  "svg",
  a,
  [
    ["circle", { cx: "5", cy: "6", r: "3" }],
    ["path", { d: "M5 9v12" }],
    ["circle", { cx: "19", cy: "18", r: "3" }],
    ["path", { d: "m15 9-3-3 3-3" }],
    ["path", { d: "M12 6h5a2 2 0 0 1 2 2v7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const i7 = [
  "svg",
  a,
  [
    ["circle", { cx: "6", cy: "6", r: "3" }],
    ["path", { d: "M6 9v12" }],
    ["path", { d: "m21 3-6 6" }],
    ["path", { d: "m21 9-6-6" }],
    ["path", { d: "M18 11.5V15" }],
    ["circle", { cx: "18", cy: "18", r: "3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const l7 = [
  "svg",
  a,
  [
    ["circle", { cx: "5", cy: "6", r: "3" }],
    ["path", { d: "M5 9v12" }],
    ["path", { d: "m15 9-3-3 3-3" }],
    ["path", { d: "M12 6h5a2 2 0 0 1 2 2v3" }],
    ["path", { d: "M19 15v6" }],
    ["path", { d: "M22 18h-6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const g7 = [
  "svg",
  a,
  [
    ["circle", { cx: "6", cy: "6", r: "3" }],
    ["path", { d: "M6 9v12" }],
    ["path", { d: "M13 6h3a2 2 0 0 1 2 2v3" }],
    ["path", { d: "M18 15v6" }],
    ["path", { d: "M21 18h-6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x7 = [
  "svg",
  a,
  [
    ["circle", { cx: "18", cy: "18", r: "3" }],
    ["circle", { cx: "6", cy: "6", r: "3" }],
    ["path", { d: "M18 6V5" }],
    ["path", { d: "M18 11v-1" }],
    ["line", { x1: "6", x2: "6", y1: "9", y2: "21" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y7 = [
  "svg",
  a,
  [
    ["circle", { cx: "18", cy: "18", r: "3" }],
    ["circle", { cx: "6", cy: "6", r: "3" }],
    ["path", { d: "M13 6h3a2 2 0 0 1 2 2v7" }],
    ["line", { x1: "6", x2: "6", y1: "9", y2: "21" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const m7 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
      }
    ],
    ["path", { d: "M9 18c-4.51 2-5-2-7-2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const H7 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const u7 = [
  "svg",
  a,
  [
    ["path", { d: "M15.2 22H8.8a2 2 0 0 1-2-1.79L5 3h14l-1.81 17.21A2 2 0 0 1 15.2 22Z" }],
    ["path", { d: "M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const V7 = [
  "svg",
  a,
  [
    ["circle", { cx: "6", cy: "15", r: "4" }],
    ["circle", { cx: "18", cy: "15", r: "4" }],
    ["path", { d: "M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2" }],
    ["path", { d: "M2.5 13 5 7c.7-1.3 1.4-2 3-2" }],
    ["path", { d: "M21.5 13 19 7c-.7-1.3-1.5-2-3-2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const w7 = [
  "svg",
  a,
  [
    ["path", { d: "M15.686 15A14.5 14.5 0 0 1 12 22a14.5 14.5 0 0 1 0-20 10 10 0 1 0 9.542 13" }],
    ["path", { d: "M2 12h8.5" }],
    ["path", { d: "M20 6V4a2 2 0 1 0-4 0v2" }],
    ["rect", { width: "8", height: "5", x: "14", y: "6", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C7 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" }],
    ["path", { d: "M2 12h20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const A7 = [
  "svg",
  a,
  [
    ["path", { d: "M12 13V2l8 4-8 4" }],
    ["path", { d: "M20.561 10.222a9 9 0 1 1-12.55-5.29" }],
    ["path", { d: "M8.002 9.997a5 5 0 1 0 8.9 2.02" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const f7 = [
  "svg",
  a,
  [
    ["path", { d: "M18 11.5V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4" }],
    ["path", { d: "M14 10V8a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" }],
    ["path", { d: "M10 9.9V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5" }],
    ["path", { d: "M6 14a2 2 0 0 0-2-2a2 2 0 0 0-2 2" }],
    ["path", { d: "M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8 2 2 0 1 1 4 0" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const L7 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"
      }
    ],
    ["path", { d: "M22 10v6" }],
    ["path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S7 = [
  "svg",
  a,
  [
    ["path", { d: "M22 5V2l-5.89 5.89" }],
    ["circle", { cx: "16.6", cy: "15.89", r: "3" }],
    ["circle", { cx: "8.11", cy: "7.4", r: "3" }],
    ["circle", { cx: "12.35", cy: "11.65", r: "3" }],
    ["circle", { cx: "13.91", cy: "5.85", r: "3" }],
    ["circle", { cx: "18.15", cy: "10.09", r: "3" }],
    ["circle", { cx: "6.56", cy: "13.2", r: "3" }],
    ["circle", { cx: "10.8", cy: "17.44", r: "3" }],
    ["circle", { cx: "5", cy: "19", r: "3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z7 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3"
      }
    ],
    ["path", { d: "m16 19 2 2 4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k7 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3"
      }
    ],
    ["path", { d: "M16 19h6" }],
    ["path", { d: "M19 22v-6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const P7 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3"
      }
    ],
    ["path", { d: "m16 16 5 5" }],
    ["path", { d: "m16 21 5-5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const P2 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M3 12h18" }],
    ["path", { d: "M12 3v18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M3 9h18" }],
    ["path", { d: "M3 15h18" }],
    ["path", { d: "M9 3v18" }],
    ["path", { d: "M15 3v18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z7 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "9", r: "1" }],
    ["circle", { cx: "19", cy: "9", r: "1" }],
    ["circle", { cx: "5", cy: "9", r: "1" }],
    ["circle", { cx: "12", cy: "15", r: "1" }],
    ["circle", { cx: "19", cy: "15", r: "1" }],
    ["circle", { cx: "5", cy: "15", r: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B7 = [
  "svg",
  a,
  [
    ["circle", { cx: "9", cy: "12", r: "1" }],
    ["circle", { cx: "9", cy: "5", r: "1" }],
    ["circle", { cx: "9", cy: "19", r: "1" }],
    ["circle", { cx: "15", cy: "12", r: "1" }],
    ["circle", { cx: "15", cy: "5", r: "1" }],
    ["circle", { cx: "15", cy: "19", r: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const T7 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "5", r: "1" }],
    ["circle", { cx: "19", cy: "5", r: "1" }],
    ["circle", { cx: "5", cy: "5", r: "1" }],
    ["circle", { cx: "12", cy: "12", r: "1" }],
    ["circle", { cx: "19", cy: "12", r: "1" }],
    ["circle", { cx: "5", cy: "12", r: "1" }],
    ["circle", { cx: "12", cy: "19", r: "1" }],
    ["circle", { cx: "19", cy: "19", r: "1" }],
    ["circle", { cx: "5", cy: "19", r: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const D7 = [
  "svg",
  a,
  [
    ["path", { d: "M3 7V5c0-1.1.9-2 2-2h2" }],
    ["path", { d: "M17 3h2c1.1 0 2 .9 2 2v2" }],
    ["path", { d: "M21 17v2c0 1.1-.9 2-2 2h-2" }],
    ["path", { d: "M7 21H5c-1.1 0-2-.9-2-2v-2" }],
    ["rect", { width: "7", height: "5", x: "7", y: "7", rx: "1" }],
    ["rect", { width: "7", height: "5", x: "10", y: "12", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const F7 = [
  "svg",
  a,
  [
    ["path", { d: "m11.9 12.1 4.514-4.514" }],
    [
      "path",
      {
        d: "M20.1 2.3a1 1 0 0 0-1.4 0l-1.114 1.114A2 2 0 0 0 17 4.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 17.828 7h1.344a2 2 0 0 0 1.414-.586L21.7 5.3a1 1 0 0 0 0-1.4z"
      }
    ],
    ["path", { d: "m6 16 2 2" }],
    [
      "path",
      {
        d: "M8.2 9.9C8.7 8.8 9.8 8 11 8c2.8 0 5 2.2 5 5 0 1.2-.8 2.3-1.9 2.8l-.9.4A2 2 0 0 0 12 18a4 4 0 0 1-4 4c-3.3 0-6-2.7-6-6a4 4 0 0 1 4-4 2 2 0 0 0 1.8-1.2z"
      }
    ],
    ["circle", { cx: "11.5", cy: "12.5", r: ".5", fill: "currentColor" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const b7 = [
  "svg",
  a,
  [
    ["path", { d: "M13.144 21.144A7.274 10.445 45 1 0 2.856 10.856" }],
    [
      "path",
      { d: "M13.144 21.144A7.274 4.365 45 0 0 2.856 10.856a7.274 4.365 45 0 0 10.288 10.288" }
    ],
    [
      "path",
      {
        d: "M16.565 10.435 18.6 8.4a2.501 2.501 0 1 0 1.65-4.65 2.5 2.5 0 1 0-4.66 1.66l-2.024 2.025"
      }
    ],
    ["path", { d: "m8.5 16.5-1-1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R7 = [
  "svg",
  a,
  [
    ["path", { d: "m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9" }],
    ["path", { d: "m18 15 4-4" }],
    [
      "path",
      {
        d: "m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O7 = [
  "svg",
  a,
  [
    ["path", { d: "M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" }],
    [
      "path",
      {
        d: "m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"
      }
    ],
    ["path", { d: "m2 16 6 6" }],
    ["circle", { cx: "16", cy: "9", r: "2.9" }],
    ["circle", { cx: "6", cy: "5", r: "3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const q7 = [
  "svg",
  a,
  [
    ["path", { d: "M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" }],
    [
      "path",
      {
        d: "m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"
      }
    ],
    ["path", { d: "m2 15 6 6" }],
    [
      "path",
      {
        d: "M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z2 = [
  "svg",
  a,
  [
    ["path", { d: "M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14" }],
    [
      "path",
      {
        d: "m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"
      }
    ],
    ["path", { d: "m2 13 6 6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U7 = [
  "svg",
  a,
  [
    ["path", { d: "M18 12.5V10a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4" }],
    ["path", { d: "M14 11V9a2 2 0 1 0-4 0v2" }],
    ["path", { d: "M10 10.5V5a2 2 0 1 0-4 0v9" }],
    [
      "path",
      {
        d: "m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _7 = [
  "svg",
  a,
  [
    ["path", { d: "M12 3V2" }],
    ["path", { d: "M5 10a7.1 7.1 0 0 1 14 0" }],
    ["path", { d: "M4 10h16" }],
    ["path", { d: "M2 14h12a2 2 0 1 1 0 4h-2" }],
    [
      "path",
      {
        d: "m15.4 17.4 3.2-2.8a2 2 0 0 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2L5 18"
      }
    ],
    ["path", { d: "M5 14v7H2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const E7 = [
  "svg",
  a,
  [
    ["path", { d: "M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" }],
    ["path", { d: "M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" }],
    ["path", { d: "M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" }],
    [
      "path",
      {
        d: "M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const N7 = [
  "svg",
  a,
  [
    ["path", { d: "m11 17 2 2a1 1 0 1 0 3-3" }],
    [
      "path",
      {
        d: "m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"
      }
    ],
    ["path", { d: "m21 3 1 11h-2" }],
    ["path", { d: "M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" }],
    ["path", { d: "M3 4h8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I7 = [
  "svg",
  a,
  [
    ["path", { d: "M12 2v8" }],
    ["path", { d: "m16 6-4 4-4-4" }],
    ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2" }],
    ["path", { d: "M6 18h.01" }],
    ["path", { d: "M10 18h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G7 = [
  "svg",
  a,
  [
    ["path", { d: "m16 6-4-4-4 4" }],
    ["path", { d: "M12 2v8" }],
    ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2" }],
    ["path", { d: "M6 18h.01" }],
    ["path", { d: "M10 18h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X7 = [
  "svg",
  a,
  [
    ["line", { x1: "22", x2: "2", y1: "12", y2: "12" }],
    [
      "path",
      {
        d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
      }
    ],
    ["line", { x1: "6", x2: "6.01", y1: "16", y2: "16" }],
    ["line", { x1: "10", x2: "10.01", y1: "16", y2: "16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const W7 = [
  "svg",
  a,
  [
    ["path", { d: "M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z" }],
    ["path", { d: "M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" }],
    ["path", { d: "M4 15v-3a6 6 0 0 1 6-6" }],
    ["path", { d: "M14 6a6 6 0 0 1 6 6v3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $7 = [
  "svg",
  a,
  [
    ["line", { x1: "4", x2: "20", y1: "9", y2: "9" }],
    ["line", { x1: "4", x2: "20", y1: "15", y2: "15" }],
    ["line", { x1: "10", x2: "8", y1: "3", y2: "21" }],
    ["line", { x1: "16", x2: "14", y1: "3", y2: "21" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const K7 = [
  "svg",
  a,
  [
    ["path", { d: "m5.2 6.2 1.4 1.4" }],
    ["path", { d: "M2 13h2" }],
    ["path", { d: "M20 13h2" }],
    ["path", { d: "m17.4 7.6 1.4-1.4" }],
    ["path", { d: "M22 17H2" }],
    ["path", { d: "M22 21H2" }],
    ["path", { d: "M16 13a4 4 0 0 0-8 0" }],
    ["path", { d: "M12 5V2.5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J7 = [
  "svg",
  a,
  [
    [
      "path",
      { d: "M22 9a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1l2 2h12l2-2h1a1 1 0 0 0 1-1Z" }
    ],
    ["path", { d: "M7.5 12h9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Q7 = [
  "svg",
  a,
  [
    ["path", { d: "M4 12h8" }],
    ["path", { d: "M4 18V6" }],
    ["path", { d: "M12 18V6" }],
    ["path", { d: "m17 12 3-2v8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y7 = [
  "svg",
  a,
  [
    ["path", { d: "M4 12h8" }],
    ["path", { d: "M4 18V6" }],
    ["path", { d: "M12 18V6" }],
    ["path", { d: "M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j7 = [
  "svg",
  a,
  [
    ["path", { d: "M4 12h8" }],
    ["path", { d: "M4 18V6" }],
    ["path", { d: "M12 18V6" }],
    ["path", { d: "M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2" }],
    ["path", { d: "M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const as = [
  "svg",
  a,
  [
    ["path", { d: "M4 12h8" }],
    ["path", { d: "M4 18V6" }],
    ["path", { d: "M12 18V6" }],
    ["path", { d: "M17 10v4h4" }],
    ["path", { d: "M21 10v8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ts = [
  "svg",
  a,
  [
    ["path", { d: "M4 12h8" }],
    ["path", { d: "M4 18V6" }],
    ["path", { d: "M12 18V6" }],
    ["path", { d: "M17 13v-3h4" }],
    ["path", { d: "M17 17.7c.4.2.8.3 1.3.3 1.5 0 2.7-1.1 2.7-2.5S19.8 13 18.3 13H17" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hs = [
  "svg",
  a,
  [
    ["path", { d: "M4 12h8" }],
    ["path", { d: "M4 18V6" }],
    ["path", { d: "M12 18V6" }],
    ["circle", { cx: "19", cy: "16", r: "2" }],
    ["path", { d: "M20 10c-2 2-3 3.5-3 6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ds = [
  "svg",
  a,
  [
    ["path", { d: "M6 12h12" }],
    ["path", { d: "M6 20V4" }],
    ["path", { d: "M18 20V4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ps = [
  "svg",
  a,
  [
    ["path", { d: "M21 14h-1.343" }],
    ["path", { d: "M9.128 3.47A9 9 0 0 1 21 12v3.343" }],
    ["path", { d: "m2 2 20 20" }],
    ["path", { d: "M20.414 20.414A2 2 0 0 1 19 21h-1a2 2 0 0 1-2-2v-3" }],
    [
      "path",
      { d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 2.636-6.364" }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cs = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const es = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"
      }
    ],
    ["path", { d: "M21 16v2a4 4 0 0 1-4 4h-5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ss = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
      }
    ],
    ["path", { d: "m12 13-1-1 2-2-3-3 2-2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ms = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
      }
    ],
    [
      "path",
      {
        d: "M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"
      }
    ],
    ["path", { d: "m18 15-2-2" }],
    ["path", { d: "m15 18-2-2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rs = [
  "svg",
  a,
  [
    ["line", { x1: "2", y1: "2", x2: "22", y2: "22" }],
    ["path", { d: "M16.5 16.5 12 21l-7-7c-1.5-1.45-3-3.2-3-5.5a5.5 5.5 0 0 1 2.14-4.35" }],
    [
      "path",
      {
        d: "M8.76 3.1c1.15.22 2.13.78 3.24 1.9 1.5-1.5 2.74-2 4.5-2A5.5 5.5 0 0 1 22 8.5c0 2.12-1.3 3.78-2.67 5.17"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ns = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
      }
    ],
    ["path", { d: "M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vs = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const os = [
  "svg",
  a,
  [
    ["path", { d: "M11 8c2-3-2-3 0-6" }],
    ["path", { d: "M15.5 8c2-3-2-3 0-6" }],
    ["path", { d: "M6 10h.01" }],
    ["path", { d: "M6 14h.01" }],
    ["path", { d: "M10 16v-4" }],
    ["path", { d: "M14 16v-4" }],
    ["path", { d: "M18 16v-4" }],
    ["path", { d: "M20 6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3" }],
    ["path", { d: "M5 20v2" }],
    ["path", { d: "M19 20v2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const is = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ls = [
  "svg",
  a,
  [
    ["path", { d: "m9 11-6 6v3h9l3-3" }],
    ["path", { d: "m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gs = [
  "svg",
  a,
  [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }],
    ["path", { d: "M3 3v5h5" }],
    ["path", { d: "M12 7v5l4 2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xs = [
  "svg",
  a,
  [
    ["path", { d: "M10.82 16.12c1.69.6 3.91.79 5.18.85.28.01.53-.09.7-.27" }],
    [
      "path",
      { d: "M11.14 20.57c.52.24 2.44 1.12 4.08 1.37.46.06.86-.25.9-.71.12-1.52-.3-3.43-.5-4.28" }
    ],
    ["path", { d: "M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .7-.26" }],
    [
      "path",
      { d: "M17.99 5.52a20.83 20.83 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-1.17.1-2.5.02-3.9-.25" }
    ],
    ["path", { d: "M20.57 11.14c.24.52 1.12 2.44 1.37 4.08.04.3-.08.59-.31.75" }],
    [
      "path",
      {
        d: "M4.93 4.93a10 10 0 0 0-.67 13.4c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.85.85 0 0 0 .48-.24"
      }
    ],
    [
      "path",
      { d: "M5.52 17.99c1.05.95 2.91 2.42 4.5 3.15a.8.8 0 0 0 1.13-.68c.2-2.34-.33-5.3-1.57-8.28" }
    ],
    ["path", { d: "M8.35 2.68a10 10 0 0 1 9.98 1.58c.43.35.4.96-.12 1.17-1.5.6-4.3.98-6.07 1.05" }],
    ["path", { d: "m2 2 20 20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ys = [
  "svg",
  a,
  [
    [
      "path",
      { d: "M10.82 16.12c1.69.6 3.91.79 5.18.85.55.03 1-.42.97-.97-.06-1.27-.26-3.5-.85-5.18" }
    ],
    [
      "path",
      {
        d: "M11.5 6.5c1.64 0 5-.38 6.71-1.07.52-.2.55-.82.12-1.17A10 10 0 0 0 4.26 18.33c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.88.88 0 0 0 .73-.74c.3-2.14-.15-3.5-.61-4.88"
      }
    ],
    [
      "path",
      { d: "M15.62 16.95c.2.85.62 2.76.5 4.28a.77.77 0 0 1-.9.7 16.64 16.64 0 0 1-4.08-1.36" }
    ],
    [
      "path",
      { d: "M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .96-.96 17.68 17.68 0 0 0-.9-4.87" }
    ],
    [
      "path",
      { d: "M16.94 15.62c.86.2 2.77.62 4.29.5a.77.77 0 0 0 .7-.9 16.64 16.64 0 0 0-1.36-4.08" }
    ],
    [
      "path",
      { d: "M17.99 5.52a20.82 20.82 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-2.33.2-5.3-.32-8.27-1.57" }
    ],
    ["path", { d: "M4.93 4.93 3 3a.7.7 0 0 1 0-1" }],
    [
      "path",
      {
        d: "M9.58 12.18c1.24 2.98 1.77 5.95 1.57 8.28a.8.8 0 0 1-1.13.68 20.82 20.82 0 0 1-4.5-3.15"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ms = [
  "svg",
  a,
  [
    ["path", { d: "M12 6v4" }],
    ["path", { d: "M14 14h-4" }],
    ["path", { d: "M14 18h-4" }],
    ["path", { d: "M14 8h-4" }],
    ["path", { d: "M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" }],
    ["path", { d: "M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hs = [
  "svg",
  a,
  [
    ["path", { d: "M10 22v-6.57" }],
    ["path", { d: "M12 11h.01" }],
    ["path", { d: "M12 7h.01" }],
    ["path", { d: "M14 15.43V22" }],
    ["path", { d: "M15 16a5 5 0 0 0-6 0" }],
    ["path", { d: "M16 11h.01" }],
    ["path", { d: "M16 7h.01" }],
    ["path", { d: "M8 11h.01" }],
    ["path", { d: "M8 7h.01" }],
    ["rect", { x: "4", y: "2", width: "16", height: "20", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const us = [
  "svg",
  a,
  [
    ["path", { d: "M5 22h14" }],
    ["path", { d: "M5 2h14" }],
    ["path", { d: "M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" }],
    ["path", { d: "M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vs = [
  "svg",
  a,
  [
    ["path", { d: "M10 12V8.964" }],
    ["path", { d: "M14 12V8.964" }],
    ["path", { d: "M15 12a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2a1 1 0 0 1 1-1z" }],
    [
      "path",
      {
        d: "M8.5 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-2"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ws = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M13.22 2.416a2 2 0 0 0-2.511.057l-7 5.999A2 2 0 0 0 3 10v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7.354"
      }
    ],
    ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" }],
    ["path", { d: "M15 6h6" }],
    ["path", { d: "M18 3v6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B2 = [
  "svg",
  a,
  [
    ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" }],
    [
      "path",
      {
        d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const T2 = [
  "svg",
  a,
  [
    [
      "path",
      { d: "M12 17c5 0 8-2.69 8-6H4c0 3.31 3 6 8 6m-4 4h8m-4-3v3M5.14 11a3.5 3.5 0 1 1 6.71 0" }
    ],
    ["path", { d: "M12.14 11a3.5 3.5 0 1 1 6.71 0" }],
    ["path", { d: "M15.5 6.5a3.5 3.5 0 1 0-7 0" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const D2 = [
  "svg",
  a,
  [
    ["path", { d: "m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11" }],
    ["path", { d: "M17 7A5 5 0 0 0 7 7" }],
    ["path", { d: "M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cs = [
  "svg",
  a,
  [
    ["path", { d: "M16 10h2" }],
    ["path", { d: "M16 14h2" }],
    ["path", { d: "M6.17 15a3 3 0 0 1 5.66 0" }],
    ["circle", { cx: "9", cy: "11", r: "2" }],
    ["rect", { x: "2", y: "5", width: "20", height: "14", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const As = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"
      }
    ],
    ["path", { d: "m14 19 3 3v-5.5" }],
    ["path", { d: "m17 22 3-3" }],
    ["circle", { cx: "9", cy: "9", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fs = [
  "svg",
  a,
  [
    ["path", { d: "M21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" }],
    ["line", { x1: "16", x2: "22", y1: "5", y2: "5" }],
    ["circle", { cx: "9", cy: "9", r: "2" }],
    ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ls = [
  "svg",
  a,
  [
    ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }],
    ["path", { d: "M10.41 10.41a2 2 0 1 1-2.83-2.83" }],
    ["line", { x1: "13.5", x2: "6", y1: "13.5", y2: "21" }],
    ["line", { x1: "18", x2: "21", y1: "12", y2: "15" }],
    ["path", { d: "M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59" }],
    ["path", { d: "M21 15V5a2 2 0 0 0-2-2H9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ss = [
  "svg",
  a,
  [
    ["path", { d: "m11 16-5 5" }],
    ["path", { d: "M11 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6.5" }],
    [
      "path",
      {
        d: "M15.765 22a.5.5 0 0 1-.765-.424V13.38a.5.5 0 0 1 .765-.424l5.878 3.674a1 1 0 0 1 0 1.696z"
      }
    ],
    ["circle", { cx: "9", cy: "9", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zs = [
  "svg",
  a,
  [
    ["path", { d: "M16 5h6" }],
    ["path", { d: "M19 2v6" }],
    ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5" }],
    ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" }],
    ["circle", { cx: "9", cy: "9", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ks = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"
      }
    ],
    ["path", { d: "m14 19.5 3-3 3 3" }],
    ["path", { d: "M17 22v-5.5" }],
    ["circle", { cx: "9", cy: "9", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ps = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
    ["circle", { cx: "9", cy: "9", r: "2" }],
    ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zs = [
  "svg",
  a,
  [
    ["path", { d: "M18 22H4a2 2 0 0 1-2-2V6" }],
    ["path", { d: "m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18" }],
    ["circle", { cx: "12", cy: "8", r: "2" }],
    ["rect", { width: "16", height: "16", x: "6", y: "2", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bs = [
  "svg",
  a,
  [
    ["path", { d: "M12 3v12" }],
    ["path", { d: "m8 11 4 4 4-4" }],
    ["path", { d: "M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ts = [
  "svg",
  a,
  [
    ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12" }],
    [
      "path",
      {
        d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const F2 = [
  "svg",
  a,
  [
    ["polyline", { points: "7 8 3 12 7 16" }],
    ["line", { x1: "21", x2: "11", y1: "12", y2: "12" }],
    ["line", { x1: "21", x2: "11", y1: "6", y2: "6" }],
    ["line", { x1: "21", x2: "11", y1: "18", y2: "18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const b2 = [
  "svg",
  a,
  [
    ["polyline", { points: "3 8 7 12 3 16" }],
    ["line", { x1: "21", x2: "11", y1: "12", y2: "12" }],
    ["line", { x1: "21", x2: "11", y1: "6", y2: "6" }],
    ["line", { x1: "21", x2: "11", y1: "18", y2: "18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ds = [
  "svg",
  a,
  [
    ["path", { d: "M6 3h12" }],
    ["path", { d: "M6 8h12" }],
    ["path", { d: "m6 13 8.5 8" }],
    ["path", { d: "M6 13h3" }],
    ["path", { d: "M9 13c6.667 0 6.667-10 0-10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fs = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bs = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M12 16v-4" }],
    ["path", { d: "M12 8h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rs = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M7 7h.01" }],
    ["path", { d: "M17 7h.01" }],
    ["path", { d: "M7 17h.01" }],
    ["path", { d: "M17 17h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Os = [
  "svg",
  a,
  [
    ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5" }],
    ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }],
    ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qs = [
  "svg",
  a,
  [
    ["line", { x1: "19", x2: "10", y1: "4", y2: "4" }],
    ["line", { x1: "14", x2: "5", y1: "20", y2: "20" }],
    ["line", { x1: "15", x2: "9", y1: "4", y2: "20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Us = [
  "svg",
  a,
  [
    ["path", { d: "M20 10c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8h8" }],
    ["polyline", { points: "16 14 20 18 16 22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _s = [
  "svg",
  a,
  [
    ["path", { d: "M4 10c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8H4" }],
    ["polyline", { points: "8 22 4 18 8 14" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Es = [
  "svg",
  a,
  [
    ["path", { d: "M12 9.5V21m0-11.5L6 3m6 6.5L18 3" }],
    ["path", { d: "M6 15h12" }],
    ["path", { d: "M6 11h12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ns = [
  "svg",
  a,
  [
    ["path", { d: "M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2Z" }],
    ["path", { d: "M6 15v-2" }],
    ["path", { d: "M12 15V9" }],
    ["circle", { cx: "12", cy: "6", r: "3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Is = [
  "svg",
  a,
  [
    ["path", { d: "M6 5v11" }],
    ["path", { d: "M12 5v6" }],
    ["path", { d: "M18 5v14" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gs = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
      }
    ],
    ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xs = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M12.4 2.7a2.5 2.5 0 0 1 3.4 0l5.5 5.5a2.5 2.5 0 0 1 0 3.4l-3.7 3.7a2.5 2.5 0 0 1-3.4 0L8.7 9.8a2.5 2.5 0 0 1 0-3.4z"
      }
    ],
    ["path", { d: "m14 7 3 3" }],
    [
      "path",
      {
        d: "m9.4 10.6-6.814 6.814A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ws = [
  "svg",
  a,
  [
    ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" }],
    ["path", { d: "m21 2-9.6 9.6" }],
    ["circle", { cx: "7.5", cy: "15.5", r: "5.5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $s = [
  "svg",
  a,
  [
    ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }],
    ["path", { d: "M6 8h4" }],
    ["path", { d: "M14 8h.01" }],
    ["path", { d: "M18 8h.01" }],
    ["path", { d: "M2 12h20" }],
    ["path", { d: "M6 12v4" }],
    ["path", { d: "M10 12v4" }],
    ["path", { d: "M14 12v4" }],
    ["path", { d: "M18 12v4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ks = [
  "svg",
  a,
  [
    ["path", { d: "M 20 4 A2 2 0 0 1 22 6" }],
    ["path", { d: "M 22 6 L 22 16.41" }],
    ["path", { d: "M 7 16 L 16 16" }],
    ["path", { d: "M 9.69 4 L 20 4" }],
    ["path", { d: "M14 8h.01" }],
    ["path", { d: "M18 8h.01" }],
    ["path", { d: "m2 2 20 20" }],
    ["path", { d: "M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2" }],
    ["path", { d: "M6 8h.01" }],
    ["path", { d: "M8 12h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Js = [
  "svg",
  a,
  [
    ["path", { d: "M10 8h.01" }],
    ["path", { d: "M12 12h.01" }],
    ["path", { d: "M14 8h.01" }],
    ["path", { d: "M16 12h.01" }],
    ["path", { d: "M18 8h.01" }],
    ["path", { d: "M6 8h.01" }],
    ["path", { d: "M7 16h10" }],
    ["path", { d: "M8 12h.01" }],
    ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qs = [
  "svg",
  a,
  [
    ["path", { d: "M12 2v5" }],
    ["path", { d: "M6 7h12l4 9H2l4-9Z" }],
    ["path", { d: "M9.17 16a3 3 0 1 0 5.66 0" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ys = [
  "svg",
  a,
  [
    ["path", { d: "m14 5-3 3 2 7 8-8-7-2Z" }],
    ["path", { d: "m14 5-3 3-3-3 3-3 3 3Z" }],
    ["path", { d: "M9.5 6.5 4 12l3 6" }],
    ["path", { d: "M3 22v-2c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2H3Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const js = [
  "svg",
  a,
  [
    ["path", { d: "M9 2h6l3 7H6l3-7Z" }],
    ["path", { d: "M12 9v13" }],
    ["path", { d: "M9 22h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aM = [
  "svg",
  a,
  [
    ["path", { d: "M11 13h6l3 7H8l3-7Z" }],
    ["path", { d: "M14 13V8a2 2 0 0 0-2-2H8" }],
    ["path", { d: "M4 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4v6Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tM = [
  "svg",
  a,
  [
    ["path", { d: "M11 4h6l3 7H8l3-7Z" }],
    ["path", { d: "M14 11v5a2 2 0 0 1-2 2H8" }],
    ["path", { d: "M4 15h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4v-6Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hM = [
  "svg",
  a,
  [
    ["path", { d: "M8 2h8l4 10H4L8 2Z" }],
    ["path", { d: "M12 12v6" }],
    ["path", { d: "M8 22v-2c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2H8Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dM = [
  "svg",
  a,
  [
    ["path", { d: "m12 8 6-3-6-3v10" }],
    [
      "path",
      {
        d: "m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12"
      }
    ],
    ["path", { d: "m6.49 12.85 11.02 6.3" }],
    ["path", { d: "M17.51 12.85 6.5 19.15" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pM = [
  "svg",
  a,
  [
    ["line", { x1: "3", x2: "21", y1: "22", y2: "22" }],
    ["line", { x1: "6", x2: "6", y1: "18", y2: "11" }],
    ["line", { x1: "10", x2: "10", y1: "18", y2: "11" }],
    ["line", { x1: "14", x2: "14", y1: "18", y2: "11" }],
    ["line", { x1: "18", x2: "18", y1: "18", y2: "11" }],
    ["polygon", { points: "12 2 20 7 4 7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cM = [
  "svg",
  a,
  [
    ["path", { d: "m5 8 6 6" }],
    ["path", { d: "m4 14 6-6 2-3" }],
    ["path", { d: "M2 5h12" }],
    ["path", { d: "M7 2h1" }],
    ["path", { d: "m22 22-5-10-5 10" }],
    ["path", { d: "M14 18h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R2 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "12", x: "3", y: "4", rx: "2", ry: "2" }],
    ["line", { x1: "2", x2: "22", y1: "20", y2: "20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eM = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sM = [
  "svg",
  a,
  [
    ["path", { d: "M7 22a5 5 0 0 1-2-4" }],
    ["path", { d: "M7 16.93c.96.43 1.96.74 2.99.91" }],
    [
      "path",
      { d: "M3.34 14A6.8 6.8 0 0 1 2 10c0-4.42 4.48-8 10-8s10 3.58 10 8a7.19 7.19 0 0 1-.33 2" }
    ],
    ["path", { d: "M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" }],
    [
      "path",
      {
        d: "M14.33 22h-.09a.35.35 0 0 1-.24-.32v-10a.34.34 0 0 1 .33-.34c.08 0 .15.03.21.08l7.34 6a.33.33 0 0 1-.21.59h-4.49l-2.57 3.85a.35.35 0 0 1-.28.14z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const MM = [
  "svg",
  a,
  [
    ["path", { d: "M7 22a5 5 0 0 1-2-4" }],
    [
      "path",
      { d: "M3.3 14A6.8 6.8 0 0 1 2 10c0-4.4 4.5-8 10-8s10 3.6 10 8-4.5 8-10 8a12 12 0 0 1-5-1" }
    ],
    ["path", { d: "M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rM = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z" }],
    ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9" }],
    ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nM = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "m16.02 12 5.48 3.13a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74L7.98 12"
      }
    ],
    [
      "path",
      {
        d: "M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vM = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"
      }
    ],
    [
      "path",
      {
        d: "m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59"
      }
    ],
    [
      "path",
      {
        d: "m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oM = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"
      }
    ],
    ["path", { d: "m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" }],
    ["path", { d: "m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const iM = [
  "svg",
  a,
  [
    ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1" }],
    ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1" }],
    ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1" }],
    ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lM = [
  "svg",
  a,
  [
    ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1" }],
    ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1" }],
    ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1" }],
    ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gM = [
  "svg",
  a,
  [
    ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1" }],
    ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1" }],
    ["path", { d: "M14 4h7" }],
    ["path", { d: "M14 9h7" }],
    ["path", { d: "M14 15h7" }],
    ["path", { d: "M14 20h7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xM = [
  "svg",
  a,
  [
    ["rect", { width: "7", height: "18", x: "3", y: "3", rx: "1" }],
    ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1" }],
    ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yM = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "7", x: "3", y: "3", rx: "1" }],
    ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1" }],
    ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mM = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "7", x: "3", y: "3", rx: "1" }],
    ["rect", { width: "9", height: "7", x: "3", y: "14", rx: "1" }],
    ["rect", { width: "5", height: "7", x: "16", y: "14", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HM = [
  "svg",
  a,
  [
    [
      "path",
      { d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" }
    ],
    ["path", { d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const uM = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M2 22c1.25-.987 2.27-1.975 3.9-2.2a5.56 5.56 0 0 1 3.8 1.5 4 4 0 0 0 6.187-2.353 3.5 3.5 0 0 0 3.69-5.116A3.5 3.5 0 0 0 20.95 8 3.5 3.5 0 1 0 16 3.05a3.5 3.5 0 0 0-5.831 1.373 3.5 3.5 0 0 0-5.116 3.69 4 4 0 0 0-2.348 6.155C3.499 15.42 4.409 16.712 4.2 18.1 3.926 19.743 3.014 20.732 2 22"
      }
    ],
    ["path", { d: "M2 22 17 7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const VM = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M16 12h3a2 2 0 0 0 1.902-1.38l1.056-3.333A1 1 0 0 0 21 6H3a1 1 0 0 0-.958 1.287l1.056 3.334A2 2 0 0 0 5 12h3"
      }
    ],
    ["path", { d: "M18 6V3a1 1 0 0 0-1-1h-3" }],
    ["rect", { width: "8", height: "12", x: "8", y: "10", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wM = [
  "svg",
  a,
  [
    ["path", { d: "M15 12h6" }],
    ["path", { d: "M15 6h6" }],
    ["path", { d: "m3 13 3.553-7.724a.5.5 0 0 1 .894 0L11 13" }],
    ["path", { d: "M3 18h18" }],
    ["path", { d: "M4 11h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CM = [
  "svg",
  a,
  [
    ["rect", { width: "8", height: "18", x: "3", y: "3", rx: "1" }],
    ["path", { d: "M7 3v18" }],
    [
      "path",
      {
        d: "M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AM = [
  "svg",
  a,
  [
    ["path", { d: "m16 6 4 14" }],
    ["path", { d: "M12 6v14" }],
    ["path", { d: "M8 8v12" }],
    ["path", { d: "M4 4v16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fM = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "m4.93 4.93 4.24 4.24" }],
    ["path", { d: "m14.83 9.17 4.24-4.24" }],
    ["path", { d: "m14.83 14.83 4.24 4.24" }],
    ["path", { d: "m9.17 14.83-4.24 4.24" }],
    ["circle", { cx: "12", cy: "12", r: "4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LM = [
  "svg",
  a,
  [
    ["path", { d: "M8 20V8c0-2.2 1.8-4 4-4 1.5 0 2.8.8 3.5 2" }],
    ["path", { d: "M6 12h4" }],
    ["path", { d: "M14 12h2v8" }],
    ["path", { d: "M6 20h4" }],
    ["path", { d: "M14 20h4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const SM = [
  "svg",
  a,
  [
    ["path", { d: "M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5" }],
    ["path", { d: "m2 2 20 20" }],
    ["path", { d: "M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5" }],
    ["path", { d: "M9 18h6" }],
    ["path", { d: "M10 22h4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ZM = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
      }
    ],
    ["path", { d: "M9 18h6" }],
    ["path", { d: "M10 22h4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kM = [
  "svg",
  a,
  [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7" }],
    ["path", { d: "M15 7h2a5 5 0 0 1 4 8" }],
    ["line", { x1: "8", x2: "12", y1: "12", y2: "12" }],
    ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PM = [
  "svg",
  a,
  [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zM = [
  "svg",
  a,
  [
    ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }],
    ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const BM = [
  "svg",
  a,
  [
    [
      "path",
      { d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" }
    ],
    ["rect", { width: "4", height: "12", x: "2", y: "9" }],
    ["circle", { cx: "4", cy: "4", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TM = [
  "svg",
  a,
  [
    ["path", { d: "M11 18H3" }],
    ["path", { d: "m15 18 2 2 4-4" }],
    ["path", { d: "M16 12H3" }],
    ["path", { d: "M16 6H3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DM = [
  "svg",
  a,
  [
    ["path", { d: "m3 17 2 2 4-4" }],
    ["path", { d: "m3 7 2 2 4-4" }],
    ["path", { d: "M13 6h8" }],
    ["path", { d: "M13 12h8" }],
    ["path", { d: "M13 18h8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FM = [
  "svg",
  a,
  [
    ["path", { d: "m3 10 2.5-2.5L3 5" }],
    ["path", { d: "m3 19 2.5-2.5L3 14" }],
    ["path", { d: "M10 6h11" }],
    ["path", { d: "M10 12h11" }],
    ["path", { d: "M10 18h11" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bM = [
  "svg",
  a,
  [
    ["path", { d: "M16 12H3" }],
    ["path", { d: "M16 6H3" }],
    ["path", { d: "M10 18H3" }],
    ["path", { d: "M21 6v10a2 2 0 0 1-2 2h-5" }],
    ["path", { d: "m16 16-2 2 2 2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const RM = [
  "svg",
  a,
  [
    ["path", { d: "M3 6h18" }],
    ["path", { d: "M7 12h10" }],
    ["path", { d: "M10 18h4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const OM = [
  "svg",
  a,
  [
    ["path", { d: "M11 12H3" }],
    ["path", { d: "M16 6H3" }],
    ["path", { d: "M16 18H3" }],
    ["path", { d: "M21 12h-6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qM = [
  "svg",
  a,
  [
    ["path", { d: "M21 15V6" }],
    ["path", { d: "M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" }],
    ["path", { d: "M12 12H3" }],
    ["path", { d: "M16 6H3" }],
    ["path", { d: "M12 18H3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const UM = [
  "svg",
  a,
  [
    ["line", { x1: "10", x2: "21", y1: "6", y2: "6" }],
    ["line", { x1: "10", x2: "21", y1: "12", y2: "12" }],
    ["line", { x1: "10", x2: "21", y1: "18", y2: "18" }],
    ["path", { d: "M4 6h1v4" }],
    ["path", { d: "M4 10h2" }],
    ["path", { d: "M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _M = [
  "svg",
  a,
  [
    ["path", { d: "M11 12H3" }],
    ["path", { d: "M16 6H3" }],
    ["path", { d: "M16 18H3" }],
    ["path", { d: "M18 9v6" }],
    ["path", { d: "M21 12h-6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const EM = [
  "svg",
  a,
  [
    ["path", { d: "M21 6H3" }],
    ["path", { d: "M7 12H3" }],
    ["path", { d: "M7 18H3" }],
    ["path", { d: "M12 18a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14" }],
    ["path", { d: "M11 10v4h4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NM = [
  "svg",
  a,
  [
    ["path", { d: "M16 12H3" }],
    ["path", { d: "M16 18H3" }],
    ["path", { d: "M10 6H3" }],
    ["path", { d: "M21 18V8a2 2 0 0 0-2-2h-5" }],
    ["path", { d: "m16 8-2-2 2-2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const IM = [
  "svg",
  a,
  [
    ["rect", { x: "3", y: "5", width: "6", height: "6", rx: "1" }],
    ["path", { d: "m3 17 2 2 4-4" }],
    ["path", { d: "M13 6h8" }],
    ["path", { d: "M13 12h8" }],
    ["path", { d: "M13 18h8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GM = [
  "svg",
  a,
  [
    ["path", { d: "M21 12h-8" }],
    ["path", { d: "M21 6H8" }],
    ["path", { d: "M21 18h-8" }],
    ["path", { d: "M3 6v4c0 1.1.9 2 2 2h3" }],
    ["path", { d: "M3 10v6c0 1.1.9 2 2 2h3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const XM = [
  "svg",
  a,
  [
    ["path", { d: "M12 12H3" }],
    ["path", { d: "M16 6H3" }],
    ["path", { d: "M12 18H3" }],
    ["path", { d: "m16 12 5 3-5 3v-6Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WM = [
  "svg",
  a,
  [
    ["path", { d: "M11 12H3" }],
    ["path", { d: "M16 6H3" }],
    ["path", { d: "M16 18H3" }],
    ["path", { d: "m19 10-4 4" }],
    ["path", { d: "m15 10 4 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $M = [
  "svg",
  a,
  [
    ["line", { x1: "8", x2: "21", y1: "6", y2: "6" }],
    ["line", { x1: "8", x2: "21", y1: "12", y2: "12" }],
    ["line", { x1: "8", x2: "21", y1: "18", y2: "18" }],
    ["line", { x1: "3", x2: "3.01", y1: "6", y2: "6" }],
    ["line", { x1: "3", x2: "3.01", y1: "12", y2: "12" }],
    ["line", { x1: "3", x2: "3.01", y1: "18", y2: "18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O2 = [
  "svg",
  a,
  [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KM = [
  "svg",
  a,
  [
    ["path", { d: "M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0" }],
    ["path", { d: "M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6" }],
    ["path", { d: "M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6" }],
    ["circle", { cx: "12", cy: "12", r: "10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const JM = [
  "svg",
  a,
  [
    ["path", { d: "M12 2v4" }],
    ["path", { d: "m16.2 7.8 2.9-2.9" }],
    ["path", { d: "M18 12h4" }],
    ["path", { d: "m16.2 16.2 2.9 2.9" }],
    ["path", { d: "M12 18v4" }],
    ["path", { d: "m4.9 19.1 2.9-2.9" }],
    ["path", { d: "M2 12h4" }],
    ["path", { d: "m4.9 4.9 2.9 2.9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QM = [
  "svg",
  a,
  [
    ["line", { x1: "2", x2: "5", y1: "12", y2: "12" }],
    ["line", { x1: "19", x2: "22", y1: "12", y2: "12" }],
    ["line", { x1: "12", x2: "12", y1: "2", y2: "5" }],
    ["line", { x1: "12", x2: "12", y1: "19", y2: "22" }],
    ["circle", { cx: "12", cy: "12", r: "7" }],
    ["circle", { cx: "12", cy: "12", r: "3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const YM = [
  "svg",
  a,
  [
    ["line", { x1: "2", x2: "5", y1: "12", y2: "12" }],
    ["line", { x1: "19", x2: "22", y1: "12", y2: "12" }],
    ["line", { x1: "12", x2: "12", y1: "2", y2: "5" }],
    ["line", { x1: "12", x2: "12", y1: "19", y2: "22" }],
    ["path", { d: "M7.11 7.11C5.83 8.39 5 10.1 5 12c0 3.87 3.13 7 7 7 1.9 0 3.61-.83 4.89-2.11" }],
    ["path", { d: "M18.71 13.96c.19-.63.29-1.29.29-1.96 0-3.87-3.13-7-7-7-.67 0-1.33.1-1.96.29" }],
    ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jM = [
  "svg",
  a,
  [
    ["line", { x1: "2", x2: "5", y1: "12", y2: "12" }],
    ["line", { x1: "19", x2: "22", y1: "12", y2: "12" }],
    ["line", { x1: "12", x2: "12", y1: "2", y2: "5" }],
    ["line", { x1: "12", x2: "12", y1: "19", y2: "22" }],
    ["circle", { cx: "12", cy: "12", r: "7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const q2 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "16", r: "1" }],
    ["rect", { width: "18", height: "12", x: "3", y: "10", rx: "2" }],
    ["path", { d: "M7 10V7a5 5 0 0 1 9.33-2.5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const a9 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "16", r: "1" }],
    ["rect", { x: "3", y: "10", width: "18", height: "12", rx: "2" }],
    ["path", { d: "M7 10V7a5 5 0 0 1 10 0v3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U2 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2" }],
    ["path", { d: "M7 11V7a5 5 0 0 1 9.9-1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const t9 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2" }],
    ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h9 = [
  "svg",
  a,
  [
    ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" }],
    ["polyline", { points: "10 17 15 12 10 7" }],
    ["line", { x1: "15", x2: "3", y1: "12", y2: "12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const d9 = [
  "svg",
  a,
  [
    ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }],
    ["polyline", { points: "16 17 21 12 16 7" }],
    ["line", { x1: "21", x2: "9", y1: "12", y2: "12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const p9 = [
  "svg",
  a,
  [
    ["path", { d: "M13 12h8" }],
    ["path", { d: "M13 18h8" }],
    ["path", { d: "M13 6h8" }],
    ["path", { d: "M3 12h1" }],
    ["path", { d: "M3 18h1" }],
    ["path", { d: "M3 6h1" }],
    ["path", { d: "M8 12h1" }],
    ["path", { d: "M8 18h1" }],
    ["path", { d: "M8 6h1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const c9 = [
  "svg",
  a,
  [
    ["circle", { cx: "11", cy: "11", r: "8" }],
    ["path", { d: "m21 21-4.3-4.3" }],
    ["path", { d: "M11 11a2 2 0 0 0 4 0 4 4 0 0 0-8 0 6 6 0 0 0 12 0" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const e9 = [
  "svg",
  a,
  [
    ["path", { d: "M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2" }],
    ["path", { d: "M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14" }],
    ["path", { d: "M10 20h4" }],
    ["circle", { cx: "16", cy: "20", r: "2" }],
    ["circle", { cx: "8", cy: "20", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const s9 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "m6 15-4-4 6.75-6.77a7.79 7.79 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15"
      }
    ],
    ["path", { d: "m5 8 4 4" }],
    ["path", { d: "m12 15 4 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const M9 = [
  "svg",
  a,
  [
    ["path", { d: "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" }],
    ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }],
    ["path", { d: "m16 19 2 2 4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const r9 = [
  "svg",
  a,
  [
    ["path", { d: "M22 15V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" }],
    ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }],
    ["path", { d: "M16 19h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const n9 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"
      }
    ],
    ["path", { d: "m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const v9 = [
  "svg",
  a,
  [
    ["path", { d: "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" }],
    ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }],
    ["path", { d: "M19 16v6" }],
    ["path", { d: "M16 19h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const o9 = [
  "svg",
  a,
  [
    ["path", { d: "M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5" }],
    ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }],
    ["path", { d: "M18 15.28c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2" }],
    ["path", { d: "M20 22v.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const i9 = [
  "svg",
  a,
  [
    ["path", { d: "M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h7.5" }],
    ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }],
    ["path", { d: "M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" }],
    ["circle", { cx: "18", cy: "18", r: "3" }],
    ["path", { d: "m22 22-1.5-1.5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const l9 = [
  "svg",
  a,
  [
    ["path", { d: "M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5" }],
    ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }],
    ["path", { d: "M20 14v4" }],
    ["path", { d: "M20 22v.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const g9 = [
  "svg",
  a,
  [
    ["path", { d: "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9" }],
    ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }],
    ["path", { d: "m17 17 4 4" }],
    ["path", { d: "m21 17-4 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x9 = [
  "svg",
  a,
  [
    ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }],
    ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y9 = [
  "svg",
  a,
  [
    ["path", { d: "M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z" }],
    ["polyline", { points: "15,9 18,9 18,11" }],
    ["path", { d: "M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2" }],
    ["line", { x1: "6", x2: "7", y1: "10", y2: "10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const m9 = [
  "svg",
  a,
  [
    ["rect", { width: "16", height: "13", x: "6", y: "4", rx: "2" }],
    ["path", { d: "m22 7-7.1 3.78c-.57.3-1.23.3-1.8 0L6 7" }],
    ["path", { d: "M2 8v11c0 1.1.9 2 2 2h14" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const H9 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
      }
    ],
    ["path", { d: "m9 10 2 2 4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const u9 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M19.43 12.935c.357-.967.57-1.955.57-2.935a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32.197 32.197 0 0 0 .813-.728"
      }
    ],
    ["circle", { cx: "12", cy: "10", r: "3" }],
    ["path", { d: "m16 18 2 2 4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const V9 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z"
      }
    ],
    ["path", { d: "M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2" }],
    ["path", { d: "M18 22v-3" }],
    ["circle", { cx: "10", cy: "10", r: "3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const w9 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
      }
    ],
    ["path", { d: "M9 10h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C9 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M18.977 14C19.6 12.701 20 11.343 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738"
      }
    ],
    ["circle", { cx: "12", cy: "10", r: "3" }],
    ["path", { d: "M16 18h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const A9 = [
  "svg",
  a,
  [
    ["path", { d: "M12.75 7.09a3 3 0 0 1 2.16 2.16" }],
    [
      "path",
      {
        d: "M17.072 17.072c-1.634 2.17-3.527 3.912-4.471 4.727a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 1.432-4.568"
      }
    ],
    ["path", { d: "m2 2 20 20" }],
    ["path", { d: "M8.475 2.818A8 8 0 0 1 20 10c0 1.183-.31 2.377-.81 3.533" }],
    ["path", { d: "M9.13 9.13a3 3 0 0 0 3.74 3.74" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const f9 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
      }
    ],
    ["path", { d: "M12 7v6" }],
    ["path", { d: "M9 10h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const L9 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M19.914 11.105A7.298 7.298 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738"
      }
    ],
    ["circle", { cx: "12", cy: "10", r: "3" }],
    ["path", { d: "M16 18h6" }],
    ["path", { d: "M19 15v6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S9 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
      }
    ],
    ["path", { d: "m14.5 7.5-5 5" }],
    ["path", { d: "m9.5 7.5 5 5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z9 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M19.752 11.901A7.78 7.78 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 19 19 0 0 0 .09-.077"
      }
    ],
    ["circle", { cx: "12", cy: "10", r: "3" }],
    ["path", { d: "m21.5 15.5-5 5" }],
    ["path", { d: "m21.5 20.5-5-5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k9 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
      }
    ],
    ["circle", { cx: "12", cy: "10", r: "3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const P9 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0"
      }
    ],
    ["circle", { cx: "12", cy: "8", r: "2" }],
    [
      "path",
      {
        d: "M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z9 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"
      }
    ],
    ["path", { d: "M15 5.764v15" }],
    ["path", { d: "M9 3.236v15" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B9 = [
  "svg",
  a,
  [
    ["path", { d: "M8 22h8" }],
    ["path", { d: "M12 11v11" }],
    ["path", { d: "m19 3-7 8-7-8Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const T9 = [
  "svg",
  a,
  [
    ["polyline", { points: "15 3 21 3 21 9" }],
    ["polyline", { points: "9 21 3 21 3 15" }],
    ["line", { x1: "21", x2: "14", y1: "3", y2: "10" }],
    ["line", { x1: "3", x2: "10", y1: "21", y2: "14" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const D9 = [
  "svg",
  a,
  [
    ["path", { d: "M8 3H5a2 2 0 0 0-2 2v3" }],
    ["path", { d: "M21 8V5a2 2 0 0 0-2-2h-3" }],
    ["path", { d: "M3 16v3a2 2 0 0 0 2 2h3" }],
    ["path", { d: "M16 21h3a2 2 0 0 0 2-2v-3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const F9 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"
      }
    ],
    ["path", { d: "M11 12 5.12 2.2" }],
    ["path", { d: "m13 12 5.88-9.8" }],
    ["path", { d: "M8 7h8" }],
    ["circle", { cx: "12", cy: "17", r: "5" }],
    ["path", { d: "M12 18v-2h-.5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const b9 = [
  "svg",
  a,
  [
    ["path", { d: "M9.26 9.26 3 11v3l14.14 3.14" }],
    ["path", { d: "M21 15.34V6l-7.31 2.03" }],
    ["path", { d: "M11.6 16.8a3 3 0 1 1-5.8-1.6" }],
    ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R9 = [
  "svg",
  a,
  [
    ["path", { d: "m3 11 18-5v12L3 14v-3z" }],
    ["path", { d: "M11.6 16.8a3 3 0 1 1-5.8-1.6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O9 = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["line", { x1: "8", x2: "16", y1: "15", y2: "15" }],
    ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9" }],
    ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const q9 = [
  "svg",
  a,
  [
    ["path", { d: "M6 19v-3" }],
    ["path", { d: "M10 19v-3" }],
    ["path", { d: "M14 19v-3" }],
    ["path", { d: "M18 19v-3" }],
    ["path", { d: "M8 11V9" }],
    ["path", { d: "M16 11V9" }],
    ["path", { d: "M12 11V9" }],
    ["path", { d: "M2 15h20" }],
    [
      "path",
      {
        d: "M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.1a2 2 0 0 0 0 3.837V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5.1a2 2 0 0 0 0-3.837Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U9 = [
  "svg",
  a,
  [
    ["line", { x1: "4", x2: "20", y1: "12", y2: "12" }],
    ["line", { x1: "4", x2: "20", y1: "6", y2: "6" }],
    ["line", { x1: "4", x2: "20", y1: "18", y2: "18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _9 = [
  "svg",
  a,
  [
    ["path", { d: "m8 6 4-4 4 4" }],
    ["path", { d: "M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" }],
    ["path", { d: "m20 22-5-5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const E9 = [
  "svg",
  a,
  [
    ["path", { d: "M10 9.5 8 12l2 2.5" }],
    ["path", { d: "m14 9.5 2 2.5-2 2.5" }],
    ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const N9 = [
  "svg",
  a,
  [
    ["path", { d: "M13.5 3.1c-.5 0-1-.1-1.5-.1s-1 .1-1.5.1" }],
    ["path", { d: "M19.3 6.8a10.45 10.45 0 0 0-2.1-2.1" }],
    ["path", { d: "M20.9 13.5c.1-.5.1-1 .1-1.5s-.1-1-.1-1.5" }],
    ["path", { d: "M17.2 19.3a10.45 10.45 0 0 0 2.1-2.1" }],
    ["path", { d: "M10.5 20.9c.5.1 1 .1 1.5.1s1-.1 1.5-.1" }],
    ["path", { d: "M3.5 17.5 2 22l4.5-1.5" }],
    ["path", { d: "M3.1 10.5c0 .5-.1 1-.1 1.5s.1 1 .1 1.5" }],
    ["path", { d: "M6.8 4.7a10.45 10.45 0 0 0-2.1 2.1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I9 = [
  "svg",
  a,
  [
    ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z" }],
    [
      "path",
      {
        d: "M15.8 9.2a2.5 2.5 0 0 0-3.5 0l-.3.4-.35-.3a2.42 2.42 0 1 0-3.2 3.6l3.6 3.5 3.6-3.5c1.2-1.2 1.1-2.7.2-3.7"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G9 = [
  "svg",
  a,
  [
    ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z" }],
    ["path", { d: "M8 12h.01" }],
    ["path", { d: "M12 12h.01" }],
    ["path", { d: "M16 12h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X9 = [
  "svg",
  a,
  [
    ["path", { d: "M20.5 14.9A9 9 0 0 0 9.1 3.5" }],
    ["path", { d: "m2 2 20 20" }],
    ["path", { d: "M5.6 5.6C3 8.3 2.2 12.5 4 16l-2 6 6-2c3.4 1.8 7.6 1.1 10.3-1.7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const W9 = [
  "svg",
  a,
  [
    ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z" }],
    ["path", { d: "M8 12h8" }],
    ["path", { d: "M12 8v8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $9 = [
  "svg",
  a,
  [
    ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z" }],
    ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }],
    ["path", { d: "M12 17h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const K9 = [
  "svg",
  a,
  [
    ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z" }],
    ["path", { d: "m10 15-3-3 3-3" }],
    ["path", { d: "M7 12h7a2 2 0 0 1 2 2v1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J9 = [
  "svg",
  a,
  [
    ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z" }],
    ["path", { d: "M12 8v4" }],
    ["path", { d: "M12 16h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Q9 = [
  "svg",
  a,
  [
    ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z" }],
    ["path", { d: "m15 9-6 6" }],
    ["path", { d: "m9 9 6 6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y9 = [
  "svg",
  a,
  [["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j9 = [
  "svg",
  a,
  [
    ["path", { d: "M10 7.5 8 10l2 2.5" }],
    ["path", { d: "m14 7.5 2 2.5-2 2.5" }],
    ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ar = [
  "svg",
  a,
  [
    ["path", { d: "M10 17H7l-4 4v-7" }],
    ["path", { d: "M14 17h1" }],
    ["path", { d: "M14 3h1" }],
    ["path", { d: "M19 3a2 2 0 0 1 2 2" }],
    ["path", { d: "M21 14v1a2 2 0 0 1-2 2" }],
    ["path", { d: "M21 9v1" }],
    ["path", { d: "M3 9v1" }],
    ["path", { d: "M5 3a2 2 0 0 0-2 2" }],
    ["path", { d: "M9 3h1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tr = [
  "svg",
  a,
  [
    ["path", { d: "m5 19-2 2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2" }],
    ["path", { d: "M9 10h6" }],
    ["path", { d: "M12 7v6" }],
    ["path", { d: "M9 17h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hr = [
  "svg",
  a,
  [
    ["path", { d: "M11.7 3H5a2 2 0 0 0-2 2v16l4-4h12a2 2 0 0 0 2-2v-2.7" }],
    ["circle", { cx: "18", cy: "6", r: "3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dr = [
  "svg",
  a,
  [
    ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }],
    [
      "path",
      {
        d: "M14.8 7.5a1.84 1.84 0 0 0-2.6 0l-.2.3-.3-.3a1.84 1.84 0 1 0-2.4 2.8L12 13l2.7-2.7c.9-.9.8-2.1.1-2.8"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pr = [
  "svg",
  a,
  [
    ["path", { d: "M19 15v-2a2 2 0 1 0-4 0v2" }],
    ["path", { d: "M9 17H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3.5" }],
    ["rect", { x: "13", y: "15", width: "8", height: "5", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cr = [
  "svg",
  a,
  [
    ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }],
    ["path", { d: "M8 10h.01" }],
    ["path", { d: "M12 10h.01" }],
    ["path", { d: "M16 10h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const er = [
  "svg",
  a,
  [
    ["path", { d: "M21 15V5a2 2 0 0 0-2-2H9" }],
    ["path", { d: "m2 2 20 20" }],
    ["path", { d: "M3.6 3.6c-.4.3-.6.8-.6 1.4v16l4-4h10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sr = [
  "svg",
  a,
  [
    ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }],
    ["path", { d: "M12 7v6" }],
    ["path", { d: "M9 10h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mr = [
  "svg",
  a,
  [
    ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }],
    ["path", { d: "M8 12a2 2 0 0 0 2-2V8H8" }],
    ["path", { d: "M14 12a2 2 0 0 0 2-2V8h-2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rr = [
  "svg",
  a,
  [
    ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }],
    ["path", { d: "m10 7-3 3 3 3" }],
    ["path", { d: "M17 13v-1a2 2 0 0 0-2-2H7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nr = [
  "svg",
  a,
  [
    ["path", { d: "M21 12v3a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h7" }],
    ["path", { d: "M16 3h5v5" }],
    ["path", { d: "m16 8 5-5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vr = [
  "svg",
  a,
  [
    ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }],
    ["path", { d: "M13 8H7" }],
    ["path", { d: "M17 12H7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const or = [
  "svg",
  a,
  [
    ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }],
    ["path", { d: "M12 7v2" }],
    ["path", { d: "M12 13h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ir = [
  "svg",
  a,
  [
    ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }],
    ["path", { d: "m14.5 7.5-5 5" }],
    ["path", { d: "m9.5 7.5 5 5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lr = [
  "svg",
  a,
  [["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gr = [
  "svg",
  a,
  [
    ["path", { d: "M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z" }],
    ["path", { d: "M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xr = [
  "svg",
  a,
  [
    ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }],
    ["path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }],
    ["path", { d: "M5 10v2a7 7 0 0 0 12 5" }],
    ["path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" }],
    ["path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12" }],
    ["line", { x1: "12", x2: "12", y1: "19", y2: "22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _2 = [
  "svg",
  a,
  [
    [
      "path",
      { d: "m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12" }
    ],
    [
      "path",
      {
        d: "M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5"
      }
    ],
    ["circle", { cx: "16", cy: "7", r: "5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yr = [
  "svg",
  a,
  [
    ["path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }],
    ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }],
    ["line", { x1: "12", x2: "12", y1: "19", y2: "22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mr = [
  "svg",
  a,
  [
    ["path", { d: "M18 12h2" }],
    ["path", { d: "M18 16h2" }],
    ["path", { d: "M18 20h2" }],
    ["path", { d: "M18 4h2" }],
    ["path", { d: "M18 8h2" }],
    ["path", { d: "M4 12h2" }],
    ["path", { d: "M4 16h2" }],
    ["path", { d: "M4 20h2" }],
    ["path", { d: "M4 4h2" }],
    ["path", { d: "M4 8h2" }],
    [
      "path",
      {
        d: "M8 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-1.5c-.276 0-.494.227-.562.495a2 2 0 0 1-3.876 0C9.994 2.227 9.776 2 9.5 2z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hr = [
  "svg",
  a,
  [
    ["path", { d: "M6 18h8" }],
    ["path", { d: "M3 22h18" }],
    ["path", { d: "M14 22a7 7 0 1 0 0-14h-1" }],
    ["path", { d: "M9 14h2" }],
    ["path", { d: "M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" }],
    ["path", { d: "M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ur = [
  "svg",
  a,
  [
    ["rect", { width: "20", height: "15", x: "2", y: "4", rx: "2" }],
    ["rect", { width: "8", height: "7", x: "6", y: "8", rx: "1" }],
    ["path", { d: "M18 8v7" }],
    ["path", { d: "M6 19v2" }],
    ["path", { d: "M18 19v2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vr = [
  "svg",
  a,
  [
    ["path", { d: "M12 13v8" }],
    ["path", { d: "M12 3v3" }],
    [
      "path",
      {
        d: "M4 6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h13a2 2 0 0 0 1.152-.365l3.424-2.317a1 1 0 0 0 0-1.635l-3.424-2.318A2 2 0 0 0 17 6z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wr = [
  "svg",
  a,
  [
    ["path", { d: "M8 2h8" }],
    [
      "path",
      {
        d: "M9 2v1.343M15 2v2.789a4 4 0 0 0 .672 2.219l.656.984a4 4 0 0 1 .672 2.22v1.131M7.8 7.8l-.128.192A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3"
      }
    ],
    ["path", { d: "M7 15a6.47 6.47 0 0 1 5 0 6.472 6.472 0 0 0 3.435.435" }],
    ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cr = [
  "svg",
  a,
  [
    ["path", { d: "M8 2h8" }],
    [
      "path",
      {
        d: "M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2"
      }
    ],
    ["path", { d: "M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ar = [
  "svg",
  a,
  [
    ["polyline", { points: "4 14 10 14 10 20" }],
    ["polyline", { points: "20 10 14 10 14 4" }],
    ["line", { x1: "14", x2: "21", y1: "10", y2: "3" }],
    ["line", { x1: "3", x2: "10", y1: "21", y2: "14" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fr = [
  "svg",
  a,
  [
    ["path", { d: "M8 3v3a2 2 0 0 1-2 2H3" }],
    ["path", { d: "M21 8h-3a2 2 0 0 1-2-2V3" }],
    ["path", { d: "M3 16h3a2 2 0 0 1 2 2v3" }],
    ["path", { d: "M16 21v-3a2 2 0 0 1 2-2h3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lr = ["svg", a, [["path", { d: "M5 12h14" }]]];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sr = [
  "svg",
  a,
  [
    ["path", { d: "m9 10 2 2 4-4" }],
    ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }],
    ["path", { d: "M12 17v4" }],
    ["path", { d: "M8 21h8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zr = [
  "svg",
  a,
  [
    ["path", { d: "M12 17v4" }],
    ["path", { d: "m15.2 4.9-.9-.4" }],
    ["path", { d: "m15.2 7.1-.9.4" }],
    ["path", { d: "m16.9 3.2-.4-.9" }],
    ["path", { d: "m16.9 8.8-.4.9" }],
    ["path", { d: "m19.5 2.3-.4.9" }],
    ["path", { d: "m19.5 9.7-.4-.9" }],
    ["path", { d: "m21.7 4.5-.9.4" }],
    ["path", { d: "m21.7 7.5-.9-.4" }],
    ["path", { d: "M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" }],
    ["path", { d: "M8 21h8" }],
    ["circle", { cx: "18", cy: "6", r: "3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kr = [
  "svg",
  a,
  [
    ["circle", { cx: "19", cy: "6", r: "3" }],
    ["path", { d: "M22 12v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9" }],
    ["path", { d: "M12 17v4" }],
    ["path", { d: "M8 21h8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pr = [
  "svg",
  a,
  [
    ["path", { d: "M12 13V7" }],
    ["path", { d: "m15 10-3 3-3-3" }],
    ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }],
    ["path", { d: "M12 17v4" }],
    ["path", { d: "M8 21h8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zr = [
  "svg",
  a,
  [
    ["path", { d: "M17 17H4a2 2 0 0 1-2-2V5c0-1.5 1-2 1-2" }],
    ["path", { d: "M22 15V5a2 2 0 0 0-2-2H9" }],
    ["path", { d: "M8 21h8" }],
    ["path", { d: "M12 17v4" }],
    ["path", { d: "m2 2 20 20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Br = [
  "svg",
  a,
  [
    ["path", { d: "M10 13V7" }],
    ["path", { d: "M14 13V7" }],
    ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }],
    ["path", { d: "M12 17v4" }],
    ["path", { d: "M8 21h8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tr = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25a.75.75 0 0 1-1.142-.64z"
      }
    ],
    ["path", { d: "M12 17v4" }],
    ["path", { d: "M8 21h8" }],
    ["rect", { x: "2", y: "3", width: "20", height: "14", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dr = [
  "svg",
  a,
  [
    ["path", { d: "M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8" }],
    ["path", { d: "M10 19v-3.96 3.15" }],
    ["path", { d: "M7 19h5" }],
    ["rect", { width: "6", height: "10", x: "16", y: "12", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fr = [
  "svg",
  a,
  [
    ["path", { d: "M5.5 20H8" }],
    ["path", { d: "M17 9h.01" }],
    ["rect", { width: "10", height: "16", x: "12", y: "4", rx: "2" }],
    ["path", { d: "M8 6H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4" }],
    ["circle", { cx: "17", cy: "15", r: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const br = [
  "svg",
  a,
  [
    ["path", { d: "M12 17v4" }],
    ["path", { d: "M8 21h8" }],
    ["rect", { x: "2", y: "3", width: "20", height: "14", rx: "2" }],
    ["rect", { x: "9", y: "7", width: "6", height: "6", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rr = [
  "svg",
  a,
  [
    ["path", { d: "m9 10 3-3 3 3" }],
    ["path", { d: "M12 13V7" }],
    ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }],
    ["path", { d: "M12 17v4" }],
    ["path", { d: "M8 21h8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Or = [
  "svg",
  a,
  [
    ["path", { d: "m14.5 12.5-5-5" }],
    ["path", { d: "m9.5 12.5 5-5" }],
    ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }],
    ["path", { d: "M12 17v4" }],
    ["path", { d: "M8 21h8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qr = [
  "svg",
  a,
  [
    ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }],
    ["line", { x1: "8", x2: "16", y1: "21", y2: "21" }],
    ["line", { x1: "12", x2: "12", y1: "17", y2: "21" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ur = [
  "svg",
  a,
  [
    ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9" }],
    ["path", { d: "M20 3v4" }],
    ["path", { d: "M22 5h-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _r = [
  "svg",
  a,
  [["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Er = [
  "svg",
  a,
  [
    ["path", { d: "m8 3 4 8 5-5 5 15H2L8 3z" }],
    ["path", { d: "M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nr = [
  "svg",
  a,
  [["path", { d: "m8 3 4 8 5-5 5 15H2L8 3z" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ir = [
  "svg",
  a,
  [
    ["path", { d: "M12 6v.343" }],
    ["path", { d: "M18.218 18.218A7 7 0 0 1 5 15V9a7 7 0 0 1 .782-3.218" }],
    ["path", { d: "M19 13.343V9A7 7 0 0 0 8.56 2.902" }],
    ["path", { d: "M22 22 2 2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gr = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xr = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M2.034 2.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.944L8.204 7.545a1 1 0 0 0-.66.66l-1.066 3.443a.5.5 0 0 1-.944.033z"
      }
    ],
    ["circle", { cx: "16", cy: "16", r: "6" }],
    ["path", { d: "m11.8 11.8 8.4 8.4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wr = [
  "svg",
  a,
  [
    ["path", { d: "M14 4.1 12 6" }],
    ["path", { d: "m5.1 8-2.9-.8" }],
    ["path", { d: "m6 12-1.9 2" }],
    ["path", { d: "M7.2 2.2 8 5.1" }],
    [
      "path",
      {
        d: "M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $r = [
  "svg",
  a,
  [
    ["path", { d: "M12.586 12.586 19 19" }],
    [
      "path",
      {
        d: "M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kr = [
  "svg",
  a,
  [
    ["rect", { x: "5", y: "2", width: "14", height: "20", rx: "7" }],
    ["path", { d: "M12 6v4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const E2 = [
  "svg",
  a,
  [
    ["path", { d: "M5 3v16h16" }],
    ["path", { d: "m5 19 6-6" }],
    ["path", { d: "m2 6 3-3 3 3" }],
    ["path", { d: "m18 16 3 3-3 3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jr = [
  "svg",
  a,
  [
    ["polyline", { points: "5 11 5 5 11 5" }],
    ["polyline", { points: "19 13 19 19 13 19" }],
    ["line", { x1: "5", x2: "19", y1: "5", y2: "19" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qr = [
  "svg",
  a,
  [
    ["polyline", { points: "13 5 19 5 19 11" }],
    ["polyline", { points: "11 19 5 19 5 13" }],
    ["line", { x1: "19", x2: "5", y1: "5", y2: "19" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yr = [
  "svg",
  a,
  [
    ["path", { d: "M11 19H5V13" }],
    ["path", { d: "M19 5L5 19" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jr = [
  "svg",
  a,
  [
    ["path", { d: "M19 13V19H13" }],
    ["path", { d: "M5 5L19 19" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const an = [
  "svg",
  a,
  [
    ["path", { d: "M8 18L12 22L16 18" }],
    ["path", { d: "M12 2V22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tn = [
  "svg",
  a,
  [
    ["polyline", { points: "18 8 22 12 18 16" }],
    ["polyline", { points: "6 8 2 12 6 16" }],
    ["line", { x1: "2", x2: "22", y1: "12", y2: "12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hn = [
  "svg",
  a,
  [
    ["path", { d: "M6 8L2 12L6 16" }],
    ["path", { d: "M2 12H22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dn = [
  "svg",
  a,
  [
    ["path", { d: "M18 8L22 12L18 16" }],
    ["path", { d: "M2 12H22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pn = [
  "svg",
  a,
  [
    ["path", { d: "M5 11V5H11" }],
    ["path", { d: "M5 5L19 19" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cn = [
  "svg",
  a,
  [
    ["path", { d: "M13 5H19V11" }],
    ["path", { d: "M19 5L5 19" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const en = [
  "svg",
  a,
  [
    ["path", { d: "M8 6L12 2L16 6" }],
    ["path", { d: "M12 2V22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sn = [
  "svg",
  a,
  [
    ["polyline", { points: "8 18 12 22 16 18" }],
    ["polyline", { points: "8 6 12 2 16 6" }],
    ["line", { x1: "12", x2: "12", y1: "2", y2: "22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mn = [
  "svg",
  a,
  [
    ["polyline", { points: "5 9 2 12 5 15" }],
    ["polyline", { points: "9 5 12 2 15 5" }],
    ["polyline", { points: "15 19 12 22 9 19" }],
    ["polyline", { points: "19 9 22 12 19 15" }],
    ["line", { x1: "2", x2: "22", y1: "12", y2: "12" }],
    ["line", { x1: "12", x2: "12", y1: "2", y2: "22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rn = [
  "svg",
  a,
  [
    ["circle", { cx: "8", cy: "18", r: "4" }],
    ["path", { d: "M12 18V2l7 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nn = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "18", r: "4" }],
    ["path", { d: "M16 18V2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vn = [
  "svg",
  a,
  [
    ["path", { d: "M9 18V5l12-2v13" }],
    ["path", { d: "m9 9 12-2" }],
    ["circle", { cx: "6", cy: "18", r: "3" }],
    ["circle", { cx: "18", cy: "16", r: "3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const on = [
  "svg",
  a,
  [
    ["path", { d: "M9 18V5l12-2v13" }],
    ["circle", { cx: "6", cy: "18", r: "3" }],
    ["circle", { cx: "18", cy: "16", r: "3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ln = [
  "svg",
  a,
  [
    ["path", { d: "M9.31 9.31 5 21l7-4 7 4-1.17-3.17" }],
    ["path", { d: "M14.53 8.88 12 2l-1.17 3.17" }],
    ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gn = [
  "svg",
  a,
  [["polygon", { points: "12 2 19 21 12 17 5 21 12 2" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xn = [
  "svg",
  a,
  [
    ["path", { d: "M8.43 8.43 3 11l8 2 2 8 2.57-5.43" }],
    ["path", { d: "M17.39 11.73 22 2l-9.73 4.61" }],
    ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yn = [
  "svg",
  a,
  [["polygon", { points: "3 11 22 2 13 21 11 13 3 11" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mn = [
  "svg",
  a,
  [
    ["rect", { x: "16", y: "16", width: "6", height: "6", rx: "1" }],
    ["rect", { x: "2", y: "16", width: "6", height: "6", rx: "1" }],
    ["rect", { x: "9", y: "2", width: "6", height: "6", rx: "1" }],
    ["path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" }],
    ["path", { d: "M12 12V8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hn = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"
      }
    ],
    ["path", { d: "M18 14h-8" }],
    ["path", { d: "M15 18h-5" }],
    ["path", { d: "M10 6h8v4h-8V6Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const un = [
  "svg",
  a,
  [
    ["path", { d: "M6 8.32a7.43 7.43 0 0 1 0 7.36" }],
    ["path", { d: "M9.46 6.21a11.76 11.76 0 0 1 0 11.58" }],
    ["path", { d: "M12.91 4.1a15.91 15.91 0 0 1 .01 15.8" }],
    ["path", { d: "M16.37 2a20.16 20.16 0 0 1 0 20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vn = [
  "svg",
  a,
  [
    ["path", { d: "M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" }],
    ["path", { d: "M2 6h4" }],
    ["path", { d: "M2 10h4" }],
    ["path", { d: "M2 14h4" }],
    ["path", { d: "M2 18h4" }],
    [
      "path",
      {
        d: "M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wn = [
  "svg",
  a,
  [
    ["path", { d: "M2 6h4" }],
    ["path", { d: "M2 10h4" }],
    ["path", { d: "M2 14h4" }],
    ["path", { d: "M2 18h4" }],
    ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2" }],
    ["path", { d: "M15 2v20" }],
    ["path", { d: "M15 7h5" }],
    ["path", { d: "M15 12h5" }],
    ["path", { d: "M15 17h5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cn = [
  "svg",
  a,
  [
    ["path", { d: "M2 6h4" }],
    ["path", { d: "M2 10h4" }],
    ["path", { d: "M2 14h4" }],
    ["path", { d: "M2 18h4" }],
    ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2" }],
    ["path", { d: "M9.5 8h5" }],
    ["path", { d: "M9.5 12H16" }],
    ["path", { d: "M9.5 16H14" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const An = [
  "svg",
  a,
  [
    ["path", { d: "M2 6h4" }],
    ["path", { d: "M2 10h4" }],
    ["path", { d: "M2 14h4" }],
    ["path", { d: "M2 18h4" }],
    ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2" }],
    ["path", { d: "M16 2v20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fn = [
  "svg",
  a,
  [
    ["path", { d: "M8 2v4" }],
    ["path", { d: "M12 2v4" }],
    ["path", { d: "M16 2v4" }],
    ["path", { d: "M16 4h2a2 2 0 0 1 2 2v2" }],
    ["path", { d: "M20 12v2" }],
    ["path", { d: "M20 18v2a2 2 0 0 1-2 2h-1" }],
    ["path", { d: "M13 22h-2" }],
    ["path", { d: "M7 22H6a2 2 0 0 1-2-2v-2" }],
    ["path", { d: "M4 14v-2" }],
    ["path", { d: "M4 8V6a2 2 0 0 1 2-2h2" }],
    ["path", { d: "M8 10h6" }],
    ["path", { d: "M8 14h8" }],
    ["path", { d: "M8 18h5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ln = [
  "svg",
  a,
  [
    ["path", { d: "M8 2v4" }],
    ["path", { d: "M12 2v4" }],
    ["path", { d: "M16 2v4" }],
    ["rect", { width: "16", height: "18", x: "4", y: "4", rx: "2" }],
    ["path", { d: "M8 10h6" }],
    ["path", { d: "M8 14h8" }],
    ["path", { d: "M8 18h5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sn = [
  "svg",
  a,
  [
    ["path", { d: "M12 4V2" }],
    [
      "path",
      {
        d: "M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592a7.01 7.01 0 0 0 4.125-2.939"
      }
    ],
    ["path", { d: "M19 10v3.343" }],
    [
      "path",
      {
        d: "M12 12c-1.349-.573-1.905-1.005-2.5-2-.546.902-1.048 1.353-2.5 2-1.018-.644-1.46-1.08-2-2-1.028.71-1.69.918-3 1 1.081-1.048 1.757-2.03 2-3 .194-.776.84-1.551 1.79-2.21m11.654 5.997c.887-.457 1.28-.891 1.556-1.787 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4-.74 0-1.461.068-2.15.192"
      }
    ],
    ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zn = [
  "svg",
  a,
  [
    ["path", { d: "M12 4V2" }],
    [
      "path",
      {
        d: "M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592A7.003 7.003 0 0 0 19 14v-4"
      }
    ],
    [
      "path",
      {
        d: "M12 4C8 4 4.5 6 4 8c-.243.97-.919 1.952-2 3 1.31-.082 1.972-.29 3-1 .54.92.982 1.356 2 2 1.452-.647 1.954-1.098 2.5-2 .595.995 1.151 1.427 2.5 2 1.31-.621 1.862-1.058 2.5-2 .629.977 1.162 1.423 2.5 2 1.209-.548 1.68-.967 2-2 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const N2 = [
  "svg",
  a,
  [
    ["path", { d: "M12 16h.01" }],
    ["path", { d: "M12 8v4" }],
    [
      "path",
      {
        d: "M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kn = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z"
      }
    ],
    ["path", { d: "M8 12h8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I2 = [
  "svg",
  a,
  [
    ["path", { d: "M10 15V9" }],
    ["path", { d: "M14 15V9" }],
    [
      "path",
      {
        d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G2 = [
  "svg",
  a,
  [
    ["path", { d: "m15 9-6 6" }],
    [
      "path",
      {
        d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z"
      }
    ],
    ["path", { d: "m9 9 6 6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pn = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zn = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M3 20h4.5a.5.5 0 0 0 .5-.5v-.282a.52.52 0 0 0-.247-.437 8 8 0 1 1 8.494-.001.52.52 0 0 0-.247.438v.282a.5.5 0 0 0 .5.5H21"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bn = [
  "svg",
  a,
  [
    ["path", { d: "M3 3h6l6 18h6" }],
    ["path", { d: "M14 3h7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tn = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "3" }],
    ["circle", { cx: "19", cy: "5", r: "2" }],
    ["circle", { cx: "5", cy: "19", r: "2" }],
    ["path", { d: "M10.4 21.9a10 10 0 0 0 9.941-15.416" }],
    ["path", { d: "M13.5 2.1a10 10 0 0 0-9.841 15.416" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dn = [
  "svg",
  a,
  [
    ["path", { d: "M12 12V4a1 1 0 0 1 1-1h6.297a1 1 0 0 1 .651 1.759l-4.696 4.025" }],
    [
      "path",
      { d: "m12 21-7.414-7.414A2 2 0 0 1 4 12.172V6.415a1.002 1.002 0 0 1 1.707-.707L20 20.009" }
    ],
    [
      "path",
      {
        d: "m12.214 3.381 8.414 14.966a1 1 0 0 1-.167 1.199l-1.168 1.163a1 1 0 0 1-.706.291H6.351a1 1 0 0 1-.625-.219L3.25 18.8a1 1 0 0 1 .631-1.781l4.165.027"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fn = [
  "svg",
  a,
  [
    ["path", { d: "M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" }],
    ["path", { d: "m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" }],
    ["path", { d: "M12 3v6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bn = [
  "svg",
  a,
  [
    ["path", { d: "m16 16 2 2 4-4" }],
    [
      "path",
      {
        d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"
      }
    ],
    ["path", { d: "m7.5 4.27 9 5.15" }],
    ["polyline", { points: "3.29 7 12 12 20.71 7" }],
    ["line", { x1: "12", x2: "12", y1: "22", y2: "12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rn = [
  "svg",
  a,
  [
    ["path", { d: "M16 16h6" }],
    [
      "path",
      {
        d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"
      }
    ],
    ["path", { d: "m7.5 4.27 9 5.15" }],
    ["polyline", { points: "3.29 7 12 12 20.71 7" }],
    ["line", { x1: "12", x2: "12", y1: "22", y2: "12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const On = [
  "svg",
  a,
  [
    ["path", { d: "M12 22v-9" }],
    [
      "path",
      {
        d: "M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z"
      }
    ],
    [
      "path",
      {
        d: "M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13"
      }
    ],
    [
      "path",
      {
        d: "M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qn = [
  "svg",
  a,
  [
    ["path", { d: "M16 16h6" }],
    ["path", { d: "M19 13v6" }],
    [
      "path",
      {
        d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"
      }
    ],
    ["path", { d: "m7.5 4.27 9 5.15" }],
    ["polyline", { points: "3.29 7 12 12 20.71 7" }],
    ["line", { x1: "12", x2: "12", y1: "22", y2: "12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Un = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"
      }
    ],
    ["path", { d: "m7.5 4.27 9 5.15" }],
    ["polyline", { points: "3.29 7 12 12 20.71 7" }],
    ["line", { x1: "12", x2: "12", y1: "22", y2: "12" }],
    ["circle", { cx: "18.5", cy: "15.5", r: "2.5" }],
    ["path", { d: "M20.27 17.27 22 19" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _n = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"
      }
    ],
    ["path", { d: "m7.5 4.27 9 5.15" }],
    ["polyline", { points: "3.29 7 12 12 20.71 7" }],
    ["line", { x1: "12", x2: "12", y1: "22", y2: "12" }],
    ["path", { d: "m17 13 5 5m-5 0 5-5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const En = [
  "svg",
  a,
  [
    ["path", { d: "m7.5 4.27 9 5.15" }],
    [
      "path",
      {
        d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
      }
    ],
    ["path", { d: "m3.3 7 8.7 5 8.7-5" }],
    ["path", { d: "M12 22V12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nn = [
  "svg",
  a,
  [
    ["path", { d: "m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z" }],
    ["path", { d: "m5 2 5 5" }],
    ["path", { d: "M2 13h15" }],
    ["path", { d: "M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const In = [
  "svg",
  a,
  [
    ["rect", { width: "16", height: "6", x: "2", y: "2", rx: "2" }],
    ["path", { d: "M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" }],
    ["rect", { width: "4", height: "6", x: "8", y: "16", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X2 = [
  "svg",
  a,
  [
    ["path", { d: "M10 2v2" }],
    ["path", { d: "M14 2v4" }],
    ["path", { d: "M17 2a1 1 0 0 1 1 1v9H6V3a1 1 0 0 1 1-1z" }],
    [
      "path",
      {
        d: "M6 12a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h2a1 1 0 0 1 1 1v2.9a2 2 0 1 0 4 0V17a1 1 0 0 1 1-1h2a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gn = [
  "svg",
  a,
  [
    ["path", { d: "m14.622 17.897-10.68-2.913" }],
    [
      "path",
      {
        d: "M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z"
      }
    ],
    [
      "path",
      {
        d: "M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xn = [
  "svg",
  a,
  [
    ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor" }],
    ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor" }],
    ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor" }],
    ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor" }],
    [
      "path",
      {
        d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wn = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M3 15h18" }],
    ["path", { d: "m15 8-3 3-3-3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const W2 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M14 15h1" }],
    ["path", { d: "M19 15h2" }],
    ["path", { d: "M3 15h2" }],
    ["path", { d: "M9 15h1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $n = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M3 15h18" }],
    ["path", { d: "m9 10 3-3 3 3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kn = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M3 15h18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $2 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M9 3v18" }],
    ["path", { d: "m16 15-3-3 3-3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const K2 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M9 14v1" }],
    ["path", { d: "M9 19v2" }],
    ["path", { d: "M9 3v2" }],
    ["path", { d: "M9 9v1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J2 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M9 3v18" }],
    ["path", { d: "m14 9 3 3-3 3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Q2 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M9 3v18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jn = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M15 3v18" }],
    ["path", { d: "m8 9 3 3-3 3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y2 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M15 14v1" }],
    ["path", { d: "M15 19v2" }],
    ["path", { d: "M15 3v2" }],
    ["path", { d: "M15 9v1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qn = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M15 3v18" }],
    ["path", { d: "m10 15-3-3 3-3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yn = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M15 3v18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jn = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M3 9h18" }],
    ["path", { d: "m9 16 3-3 3 3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j2 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M14 9h1" }],
    ["path", { d: "M19 9h2" }],
    ["path", { d: "M3 9h2" }],
    ["path", { d: "M9 9h1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const av = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M3 9h18" }],
    ["path", { d: "m15 14-3 3-3-3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tv = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M3 9h18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hv = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M9 3v18" }],
    ["path", { d: "M9 15h12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dv = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M3 15h12" }],
    ["path", { d: "M15 3v18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const a0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M3 9h18" }],
    ["path", { d: "M9 21V9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pv = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cv = [
  "svg",
  a,
  [
    ["path", { d: "M8 21s-4-3-4-9 4-9 4-9" }],
    ["path", { d: "M16 3s4 3 4 9-4 9-4 9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ev = [
  "svg",
  a,
  [
    ["path", { d: "M9 9a3 3 0 1 1 6 0" }],
    ["path", { d: "M12 12v3" }],
    ["path", { d: "M11 15h2" }],
    [
      "path",
      { d: "M19 9a7 7 0 1 0-13.6 2.3C6.4 14.4 8 19 8 19h8s1.6-4.6 2.6-7.7c.3-.8.4-1.5.4-2.3" }
    ],
    ["path", { d: "M12 19v3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sv = [
  "svg",
  a,
  [
    ["path", { d: "M5.8 11.3 2 22l10.7-3.79" }],
    ["path", { d: "M4 3h.01" }],
    ["path", { d: "M22 8h.01" }],
    ["path", { d: "M15 2h.01" }],
    ["path", { d: "M22 20h.01" }],
    [
      "path",
      {
        d: "m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"
      }
    ],
    ["path", { d: "m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17" }],
    ["path", { d: "m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7" }],
    [
      "path",
      {
        d: "M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mv = [
  "svg",
  a,
  [
    ["rect", { x: "14", y: "4", width: "4", height: "16", rx: "1" }],
    ["rect", { x: "6", y: "4", width: "4", height: "16", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rv = [
  "svg",
  a,
  [
    ["circle", { cx: "11", cy: "4", r: "2" }],
    ["circle", { cx: "18", cy: "8", r: "2" }],
    ["circle", { cx: "20", cy: "16", r: "2" }],
    [
      "path",
      {
        d: "M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nv = [
  "svg",
  a,
  [
    ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2" }],
    ["path", { d: "M15 14h.01" }],
    ["path", { d: "M9 6h6" }],
    ["path", { d: "M9 10h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const t0 = [
  "svg",
  a,
  [
    ["path", { d: "M12 20h9" }],
    [
      "path",
      {
        d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vv = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982"
      }
    ],
    ["path", { d: "m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353" }],
    ["path", { d: "m2 2 20 20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ov = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"
      }
    ],
    [
      "path",
      {
        d: "m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"
      }
    ],
    ["path", { d: "m2.3 2.3 7.286 7.286" }],
    ["circle", { cx: "11", cy: "11", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h0 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const iv = [
  "svg",
  a,
  [
    ["path", { d: "M12 20h9" }],
    [
      "path",
      {
        d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"
      }
    ],
    ["path", { d: "m15 5 3 3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lv = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982"
      }
    ],
    ["path", { d: "m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353" }],
    ["path", { d: "m15 5 4 4" }],
    ["path", { d: "m2 2 20 20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gv = [
  "svg",
  a,
  [
    ["path", { d: "M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13" }],
    ["path", { d: "m8 6 2-2" }],
    ["path", { d: "m18 16 2-2" }],
    ["path", { d: "m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17" }],
    [
      "path",
      {
        d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
      }
    ],
    ["path", { d: "m15 5 4 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xv = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
      }
    ],
    ["path", { d: "m15 5 4 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yv = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mv = [
  "svg",
  a,
  [
    ["line", { x1: "19", x2: "5", y1: "5", y2: "19" }],
    ["circle", { cx: "6.5", cy: "6.5", r: "2.5" }],
    ["circle", { cx: "17.5", cy: "17.5", r: "2.5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hv = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "5", r: "1" }],
    ["path", { d: "m9 20 3-6 3 6" }],
    ["path", { d: "m6 8 6 2 6-2" }],
    ["path", { d: "M12 10v4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const uv = [
  "svg",
  a,
  [
    ["path", { d: "M20 11H4" }],
    ["path", { d: "M20 7H4" }],
    ["path", { d: "M7 21V4a1 1 0 0 1 1-1h4a1 1 0 0 1 0 12H7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vv = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      }
    ],
    ["path", { d: "M14.05 2a9 9 0 0 1 8 7.94" }],
    ["path", { d: "M14.05 6A5 5 0 0 1 18 10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wv = [
  "svg",
  a,
  [
    ["polyline", { points: "18 2 22 6 18 10" }],
    ["line", { x1: "14", x2: "22", y1: "6", y2: "6" }],
    [
      "path",
      {
        d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cv = [
  "svg",
  a,
  [
    ["polyline", { points: "16 2 16 8 22 8" }],
    ["line", { x1: "22", x2: "16", y1: "2", y2: "8" }],
    [
      "path",
      {
        d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Av = [
  "svg",
  a,
  [
    ["line", { x1: "22", x2: "16", y1: "2", y2: "8" }],
    ["line", { x1: "16", x2: "22", y1: "2", y2: "8" }],
    [
      "path",
      {
        d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fv = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"
      }
    ],
    ["line", { x1: "22", x2: "2", y1: "2", y2: "22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lv = [
  "svg",
  a,
  [
    ["polyline", { points: "22 8 22 2 16 2" }],
    ["line", { x1: "16", x2: "22", y1: "8", y2: "2" }],
    [
      "path",
      {
        d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sv = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zv = [
  "svg",
  a,
  [
    ["line", { x1: "9", x2: "9", y1: "4", y2: "20" }],
    ["path", { d: "M4 7c0-1.7 1.3-3 3-3h13" }],
    ["path", { d: "M18 20c-1.7 0-3-1.3-3-3V4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kv = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M18.5 8c-1.4 0-2.6-.8-3.2-2A6.87 6.87 0 0 0 2 9v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8.5C22 9.6 20.4 8 18.5 8"
      }
    ],
    ["path", { d: "M2 14h20" }],
    ["path", { d: "M6 14v4" }],
    ["path", { d: "M10 14v4" }],
    ["path", { d: "M14 14v4" }],
    ["path", { d: "M18 14v4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pv = [
  "svg",
  a,
  [
    ["path", { d: "M14.531 12.469 6.619 20.38a1 1 0 1 1-3-3l7.912-7.912" }],
    [
      "path",
      {
        d: "M15.686 4.314A12.5 12.5 0 0 0 5.461 2.958 1 1 0 0 0 5.58 4.71a22 22 0 0 1 6.318 3.393"
      }
    ],
    [
      "path",
      {
        d: "M17.7 3.7a1 1 0 0 0-1.4 0l-4.6 4.6a1 1 0 0 0 0 1.4l2.6 2.6a1 1 0 0 0 1.4 0l4.6-4.6a1 1 0 0 0 0-1.4z"
      }
    ],
    [
      "path",
      {
        d: "M19.686 8.314a12.501 12.501 0 0 1 1.356 10.225 1 1 0 0 1-1.751-.119 22 22 0 0 0-3.393-6.319"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zv = [
  "svg",
  a,
  [
    ["path", { d: "M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4" }],
    ["rect", { width: "10", height: "7", x: "12", y: "13", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bv = [
  "svg",
  a,
  [
    ["path", { d: "M8 4.5v5H3m-1-6 6 6m13 0v-3c0-1.16-.84-2-2-2h-7m-9 9v2c0 1.05.95 2 2 2h3" }],
    ["rect", { width: "10", height: "7", x: "12", y: "13.5", ry: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tv = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"
      }
    ],
    ["path", { d: "M2 9v1c0 1.1.9 2 2 2h1" }],
    ["path", { d: "M16 11h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dv = [
  "svg",
  a,
  [
    ["path", { d: "M14 3v11" }],
    ["path", { d: "M14 9h-3a3 3 0 0 1 0-6h9" }],
    ["path", { d: "M18 3v11" }],
    ["path", { d: "M22 18H2l4-4" }],
    ["path", { d: "m6 22-4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fv = [
  "svg",
  a,
  [
    ["path", { d: "M10 3v11" }],
    ["path", { d: "M10 9H7a1 1 0 0 1 0-6h8" }],
    ["path", { d: "M14 3v11" }],
    ["path", { d: "m18 14 4 4H2" }],
    ["path", { d: "m22 18-4 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bv = [
  "svg",
  a,
  [
    ["path", { d: "M13 4v16" }],
    ["path", { d: "M17 4v16" }],
    ["path", { d: "M19 4H9.5a4.5 4.5 0 0 0 0 9H13" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rv = [
  "svg",
  a,
  [
    ["path", { d: "M18 11h-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4" }],
    ["path", { d: "M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7" }],
    ["rect", { width: "16", height: "5", x: "4", y: "2", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ov = [
  "svg",
  a,
  [
    ["path", { d: "m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" }],
    ["path", { d: "m8.5 8.5 7 7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qv = [
  "svg",
  a,
  [
    ["path", { d: "M12 17v5" }],
    ["path", { d: "M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89" }],
    ["path", { d: "m2 2 20 20" }],
    ["path", { d: "M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Uv = [
  "svg",
  a,
  [
    ["path", { d: "M12 17v5" }],
    [
      "path",
      {
        d: "M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _v = [
  "svg",
  a,
  [
    ["path", { d: "m2 22 1-1h3l9-9" }],
    ["path", { d: "M3 21v-3l9-9" }],
    [
      "path",
      {
        d: "m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ev = [
  "svg",
  a,
  [
    ["path", { d: "M15 11h.01" }],
    ["path", { d: "M11 15h.01" }],
    ["path", { d: "M16 16h.01" }],
    ["path", { d: "m2 16 20 6-6-20A20 20 0 0 0 2 16" }],
    ["path", { d: "M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nv = [
  "svg",
  a,
  [
    ["path", { d: "M2 22h20" }],
    [
      "path",
      {
        d: "M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.49.88-.06 1.98-1.06 2.1l-1.18.15c-.47.06-.95-.02-1.37-.24L4.29 11.15a2 2 0 0 1-.52-.38Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Iv = [
  "svg",
  a,
  [
    ["path", { d: "M2 22h20" }],
    [
      "path",
      {
        d: "M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gv = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xv = ["svg", a, [["polygon", { points: "6 3 20 12 6 21 6 3" }]]];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wv = [
  "svg",
  a,
  [
    ["path", { d: "M9 2v6" }],
    ["path", { d: "M15 2v6" }],
    ["path", { d: "M12 17v5" }],
    ["path", { d: "M5 8h14" }],
    ["path", { d: "M6 11V8h12v3a6 6 0 1 1-12 0Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const d0 = [
  "svg",
  a,
  [
    ["path", { d: "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z" }],
    ["path", { d: "m2 22 3-3" }],
    ["path", { d: "M7.5 13.5 10 11" }],
    ["path", { d: "M10.5 16.5 13 14" }],
    ["path", { d: "m18 3-4 4h6l-4 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $v = [
  "svg",
  a,
  [
    ["path", { d: "M12 22v-5" }],
    ["path", { d: "M9 8V2" }],
    ["path", { d: "M15 8V2" }],
    ["path", { d: "M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kv = [
  "svg",
  a,
  [
    ["path", { d: "M5 12h14" }],
    ["path", { d: "M12 5v14" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jv = [
  "svg",
  a,
  [
    ["path", { d: "M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2" }],
    ["path", { d: "M18 6h.01" }],
    ["path", { d: "M6 18h.01" }],
    ["path", { d: "M20.83 8.83a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z" }],
    ["path", { d: "M18 11.66V22a4 4 0 0 0 4-4V6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qv = [
  "svg",
  a,
  [
    ["path", { d: "M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z" }],
    ["polyline", { points: "8 10 12 14 16 10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yv = [
  "svg",
  a,
  [
    ["path", { d: "M16.85 18.58a9 9 0 1 0-9.7 0" }],
    ["path", { d: "M8 14a5 5 0 1 1 8 0" }],
    ["circle", { cx: "12", cy: "11", r: "1" }],
    ["path", { d: "M13 17a1 1 0 1 0-2 0l.5 4.5a.5.5 0 1 0 1 0Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jv = [
  "svg",
  a,
  [
    ["path", { d: "M10 4.5V4a2 2 0 0 0-2.41-1.957" }],
    ["path", { d: "M13.9 8.4a2 2 0 0 0-1.26-1.295" }],
    ["path", { d: "M21.7 16.2A8 8 0 0 0 22 14v-3a2 2 0 1 0-4 0v-1a2 2 0 0 0-3.63-1.158" }],
    [
      "path",
      {
        d: "m7 15-1.8-1.8a2 2 0 0 0-2.79 2.86L6 19.7a7.74 7.74 0 0 0 6 2.3h2a8 8 0 0 0 5.657-2.343"
      }
    ],
    ["path", { d: "M6 6v8" }],
    ["path", { d: "m2 2 20 20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ao = [
  "svg",
  a,
  [
    ["path", { d: "M22 14a8 8 0 0 1-8 8" }],
    ["path", { d: "M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2" }],
    ["path", { d: "M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1" }],
    ["path", { d: "M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10" }],
    [
      "path",
      {
        d: "M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const to = [
  "svg",
  a,
  [
    ["path", { d: "M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4" }],
    ["path", { d: "M10 22 9 8" }],
    ["path", { d: "m14 22 1-14" }],
    [
      "path",
      {
        d: "M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ho = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M18.6 14.4c.8-.8.8-2 0-2.8l-8.1-8.1a4.95 4.95 0 1 0-7.1 7.1l8.1 8.1c.9.7 2.1.7 2.9-.1Z"
      }
    ],
    ["path", { d: "m22 22-5.5-5.5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const po = [
  "svg",
  a,
  [
    ["path", { d: "M18 7c0-5.333-8-5.333-8 0" }],
    ["path", { d: "M10 7v14" }],
    ["path", { d: "M6 21h12" }],
    ["path", { d: "M6 13h10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const co = [
  "svg",
  a,
  [
    ["path", { d: "M18.36 6.64A9 9 0 0 1 20.77 15" }],
    ["path", { d: "M6.16 6.16a9 9 0 1 0 12.68 12.68" }],
    ["path", { d: "M12 2v4" }],
    ["path", { d: "m2 2 20 20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eo = [
  "svg",
  a,
  [
    ["path", { d: "M12 2v10" }],
    ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const so = [
  "svg",
  a,
  [
    ["path", { d: "M2 3h20" }],
    ["path", { d: "M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" }],
    ["path", { d: "m7 21 5-5 5 5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mo = [
  "svg",
  a,
  [
    ["path", { d: "M13.5 22H7a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v.5" }],
    ["path", { d: "m16 19 2 2 4-4" }],
    ["path", { d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2" }],
    ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ro = [
  "svg",
  a,
  [
    ["path", { d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" }],
    ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" }],
    ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const no = [
  "svg",
  a,
  [
    ["path", { d: "M5 7 3 5" }],
    ["path", { d: "M9 6V3" }],
    ["path", { d: "m13 7 2-2" }],
    ["circle", { cx: "9", cy: "13", r: "3" }],
    [
      "path",
      { d: "M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17" }
    ],
    ["path", { d: "M16 16h2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vo = [
  "svg",
  a,
  [
    ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }],
    ["path", { d: "M12 9v11" }],
    ["path", { d: "M2 9h13a2 2 0 0 1 2 2v9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oo = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const io = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M2.5 16.88a1 1 0 0 1-.32-1.43l9-13.02a1 1 0 0 1 1.64 0l9 13.01a1 1 0 0 1-.32 1.44l-8.51 4.86a2 2 0 0 1-1.98 0Z"
      }
    ],
    ["path", { d: "M12 2v20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lo = [
  "svg",
  a,
  [
    ["rect", { width: "5", height: "5", x: "3", y: "3", rx: "1" }],
    ["rect", { width: "5", height: "5", x: "16", y: "3", rx: "1" }],
    ["rect", { width: "5", height: "5", x: "3", y: "16", rx: "1" }],
    ["path", { d: "M21 16h-3a2 2 0 0 0-2 2v3" }],
    ["path", { d: "M21 21v.01" }],
    ["path", { d: "M12 7v3a2 2 0 0 1-2 2H7" }],
    ["path", { d: "M3 12h.01" }],
    ["path", { d: "M12 3h.01" }],
    ["path", { d: "M12 16v.01" }],
    ["path", { d: "M16 12h1" }],
    ["path", { d: "M21 12v.01" }],
    ["path", { d: "M12 21v-1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const go = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"
      }
    ],
    [
      "path",
      {
        d: "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xo = [
  "svg",
  a,
  [
    ["path", { d: "M13 16a3 3 0 0 1 2.24 5" }],
    ["path", { d: "M18 12h.01" }],
    [
      "path",
      {
        d: "M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3"
      }
    ],
    ["path", { d: "M20 8.54V4a2 2 0 1 0-4 0v3" }],
    ["path", { d: "M7.612 12.524a3 3 0 1 0-1.6 4.3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yo = [
  "svg",
  a,
  [
    ["path", { d: "M19.07 4.93A10 10 0 0 0 6.99 3.34" }],
    ["path", { d: "M4 6h.01" }],
    ["path", { d: "M2.29 9.62A10 10 0 1 0 21.31 8.35" }],
    ["path", { d: "M16.24 7.76A6 6 0 1 0 8.23 16.67" }],
    ["path", { d: "M12 18h.01" }],
    ["path", { d: "M17.99 11.66A6 6 0 0 1 15.77 16.67" }],
    ["circle", { cx: "12", cy: "12", r: "2" }],
    ["path", { d: "m13.41 10.59 5.66-5.66" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mo = [
  "svg",
  a,
  [
    ["path", { d: "M12 12h.01" }],
    [
      "path",
      {
        d: "M7.5 4.2c-.3-.5-.9-.7-1.3-.4C3.9 5.5 2.3 8.1 2 11c-.1.5.4 1 1 1h5c0-1.5.8-2.8 2-3.4-1.1-1.9-2-3.5-2.5-4.4z"
      }
    ],
    [
      "path",
      {
        d: "M21 12c.6 0 1-.4 1-1-.3-2.9-1.8-5.5-4.1-7.1-.4-.3-1.1-.2-1.3.3-.6.9-1.5 2.5-2.6 4.3 1.2.7 2 2 2 3.5h5z"
      }
    ],
    [
      "path",
      {
        d: "M7.5 19.8c-.3.5-.1 1.1.4 1.3 2.6 1.2 5.6 1.2 8.2 0 .5-.2.7-.8.4-1.3-.5-.9-1.4-2.5-2.5-4.3-1.2.7-2.8.7-4 0-1.1 1.8-2 3.4-2.5 4.3z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ho = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M3 12h3.28a1 1 0 0 1 .948.684l2.298 7.934a.5.5 0 0 0 .96-.044L13.82 4.771A1 1 0 0 1 14.792 4H21"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const uo = [
  "svg",
  a,
  [
    ["path", { d: "M5 16v2" }],
    ["path", { d: "M19 16v2" }],
    ["rect", { width: "20", height: "8", x: "2", y: "8", rx: "2" }],
    ["path", { d: "M18 12h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vo = [
  "svg",
  a,
  [
    ["path", { d: "M4.9 16.1C1 12.2 1 5.8 4.9 1.9" }],
    ["path", { d: "M7.8 4.7a6.14 6.14 0 0 0-.8 7.5" }],
    ["circle", { cx: "12", cy: "9", r: "2" }],
    ["path", { d: "M16.2 4.8c2 2 2.26 5.11.8 7.47" }],
    ["path", { d: "M19.1 1.9a9.96 9.96 0 0 1 0 14.1" }],
    ["path", { d: "M9.5 18h5" }],
    ["path", { d: "m8 22 4-11 4 11" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wo = [
  "svg",
  a,
  [
    ["path", { d: "M4.9 19.1C1 15.2 1 8.8 4.9 4.9" }],
    ["path", { d: "M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" }],
    ["circle", { cx: "12", cy: "12", r: "2" }],
    ["path", { d: "M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" }],
    ["path", { d: "M19.1 4.9C23 8.8 23 15.1 19.1 19" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Co = [
  "svg",
  a,
  [
    ["path", { d: "M20.34 17.52a10 10 0 1 0-2.82 2.82" }],
    ["circle", { cx: "19", cy: "19", r: "2" }],
    ["path", { d: "m13.41 13.41 4.18 4.18" }],
    ["circle", { cx: "12", cy: "12", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ao = [
  "svg",
  a,
  [
    ["path", { d: "M5 15h14" }],
    ["path", { d: "M5 9h14" }],
    ["path", { d: "m14 20-5-5 6-6-5-5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fo = [
  "svg",
  a,
  [
    ["path", { d: "M22 17a10 10 0 0 0-20 0" }],
    ["path", { d: "M6 17a6 6 0 0 1 12 0" }],
    ["path", { d: "M10 17a2 2 0 0 1 4 0" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lo = [
  "svg",
  a,
  [
    [
      "path",
      { d: "M17 5c0-1.7-1.3-3-3-3s-3 1.3-3 3c0 .8.3 1.5.8 2H11c-3.9 0-7 3.1-7 7c0 2.2 1.8 4 4 4" }
    ],
    [
      "path",
      {
        d: "M16.8 3.9c.3-.3.6-.5 1-.7 1.5-.6 3.3.1 3.9 1.6.6 1.5-.1 3.3-1.6 3.9l1.6 2.8c.2.3.2.7.2 1-.2.8-.9 1.2-1.7 1.1 0 0-1.6-.3-2.7-.6H17c-1.7 0-3 1.3-3 3"
      }
    ],
    ["path", { d: "M13.2 18a3 3 0 0 0-2.2-5" }],
    ["path", { d: "M13 22H4a2 2 0 0 1 0-4h12" }],
    ["path", { d: "M16 9h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const So = [
  "svg",
  a,
  [
    ["rect", { width: "12", height: "20", x: "6", y: "2", rx: "2" }],
    ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zo = [
  "svg",
  a,
  [
    ["path", { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" }],
    ["path", { d: "M12 6.5v11" }],
    ["path", { d: "M15 9.4a4 4 0 1 0 0 5.2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ko = [
  "svg",
  a,
  [
    ["path", { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" }],
    ["path", { d: "M8 12h5" }],
    ["path", { d: "M16 9.5a4 4 0 1 0 0 5.2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Po = [
  "svg",
  a,
  [
    ["path", { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" }],
    ["path", { d: "M8 7h8" }],
    ["path", { d: "M12 17.5 8 15h1a4 4 0 0 0 0-8" }],
    ["path", { d: "M8 11h8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zo = [
  "svg",
  a,
  [
    ["path", { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" }],
    ["path", { d: "m12 10 3-3" }],
    ["path", { d: "m9 7 3 3v7.5" }],
    ["path", { d: "M9 11h6" }],
    ["path", { d: "M9 15h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bo = [
  "svg",
  a,
  [
    ["path", { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" }],
    ["path", { d: "M8 13h5" }],
    ["path", { d: "M10 17V9.5a2.5 2.5 0 0 1 5 0" }],
    ["path", { d: "M8 17h7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const To = [
  "svg",
  a,
  [
    ["path", { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" }],
    ["path", { d: "M8 15h5" }],
    ["path", { d: "M8 11h5a2 2 0 1 0 0-4h-3v10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Do = [
  "svg",
  a,
  [
    ["path", { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" }],
    ["path", { d: "M10 17V7h5" }],
    ["path", { d: "M10 11h4" }],
    ["path", { d: "M8 15h5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fo = [
  "svg",
  a,
  [
    ["path", { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" }],
    ["path", { d: "M14 8H8" }],
    ["path", { d: "M16 12H8" }],
    ["path", { d: "M13 16H8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bo = [
  "svg",
  a,
  [
    ["path", { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" }],
    ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" }],
    ["path", { d: "M12 17.5v-11" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const p0 = [
  "svg",
  a,
  [
    ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2" }],
    ["path", { d: "M12 12h.01" }],
    ["path", { d: "M17 12h.01" }],
    ["path", { d: "M7 12h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ro = [
  "svg",
  a,
  [["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Oo = [
  "svg",
  a,
  [["rect", { width: "12", height: "20", x: "6", y: "2", rx: "2" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qo = [
  "svg",
  a,
  [
    ["path", { d: "M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" }],
    ["path", { d: "M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" }],
    ["path", { d: "m14 16-3 3 3 3" }],
    ["path", { d: "M8.293 13.596 7.196 9.5 3.1 10.598" }],
    [
      "path",
      {
        d: "m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"
      }
    ],
    ["path", { d: "m13.378 9.633 4.096 1.098 1.097-4.096" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Uo = [
  "svg",
  a,
  [
    ["path", { d: "m15 14 5-5-5-5" }],
    ["path", { d: "M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _o = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "17", r: "1" }],
    ["path", { d: "M21 7v6h-6" }],
    ["path", { d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Eo = [
  "svg",
  a,
  [
    ["path", { d: "M21 7v6h-6" }],
    ["path", { d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const No = [
  "svg",
  a,
  [
    ["path", { d: "M3 2v6h6" }],
    ["path", { d: "M21 12A9 9 0 0 0 6 5.3L3 8" }],
    ["path", { d: "M21 22v-6h-6" }],
    ["path", { d: "M3 12a9 9 0 0 0 15 6.7l3-2.7" }],
    ["circle", { cx: "12", cy: "12", r: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Io = [
  "svg",
  a,
  [
    ["path", { d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }],
    ["path", { d: "M3 3v5h5" }],
    ["path", { d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" }],
    ["path", { d: "M16 16h5v5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Go = [
  "svg",
  a,
  [
    ["path", { d: "M21 8L18.74 5.74A9.75 9.75 0 0 0 12 3C11 3 10.03 3.16 9.13 3.47" }],
    ["path", { d: "M8 16H3v5" }],
    ["path", { d: "M3 12C3 9.51 4 7.26 5.64 5.64" }],
    ["path", { d: "m3 16 2.26 2.26A9.75 9.75 0 0 0 12 21c2.49 0 4.74-1 6.36-2.64" }],
    ["path", { d: "M21 12c0 1-.16 1.97-.47 2.87" }],
    ["path", { d: "M21 3v5h-5" }],
    ["path", { d: "M22 22 2 2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xo = [
  "svg",
  a,
  [
    ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }],
    ["path", { d: "M21 3v5h-5" }],
    ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }],
    ["path", { d: "M8 16H3v5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wo = [
  "svg",
  a,
  [
    ["path", { d: "M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z" }],
    ["path", { d: "M5 10h14" }],
    ["path", { d: "M15 7v6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $o = [
  "svg",
  a,
  [
    ["path", { d: "M17 3v10" }],
    ["path", { d: "m12.67 5.5 8.66 5" }],
    ["path", { d: "m12.67 10.5 8.66-5" }],
    ["path", { d: "M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ko = [
  "svg",
  a,
  [
    ["path", { d: "M4 7V4h16v3" }],
    ["path", { d: "M5 20h6" }],
    ["path", { d: "M13 4 8 20" }],
    ["path", { d: "m15 15 5 5" }],
    ["path", { d: "m20 15-5 5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jo = [
  "svg",
  a,
  [
    ["path", { d: "m17 2 4 4-4 4" }],
    ["path", { d: "M3 11v-1a4 4 0 0 1 4-4h14" }],
    ["path", { d: "m7 22-4-4 4-4" }],
    ["path", { d: "M21 13v1a4 4 0 0 1-4 4H3" }],
    ["path", { d: "M11 10h1v4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qo = [
  "svg",
  a,
  [
    ["path", { d: "m2 9 3-3 3 3" }],
    ["path", { d: "M13 18H7a2 2 0 0 1-2-2V6" }],
    ["path", { d: "m22 15-3 3-3-3" }],
    ["path", { d: "M11 6h6a2 2 0 0 1 2 2v10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yo = [
  "svg",
  a,
  [
    ["path", { d: "m17 2 4 4-4 4" }],
    ["path", { d: "M3 11v-1a4 4 0 0 1 4-4h14" }],
    ["path", { d: "m7 22-4-4 4-4" }],
    ["path", { d: "M21 13v1a4 4 0 0 1-4 4H3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jo = [
  "svg",
  a,
  [
    ["path", { d: "M14 14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2" }],
    ["path", { d: "M14 4a2 2 0 0 1 2-2" }],
    ["path", { d: "M16 10a2 2 0 0 1-2-2" }],
    ["path", { d: "M20 14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2" }],
    ["path", { d: "M20 2a2 2 0 0 1 2 2" }],
    ["path", { d: "M22 8a2 2 0 0 1-2 2" }],
    ["path", { d: "m3 7 3 3 3-3" }],
    ["path", { d: "M6 10V5a 3 3 0 0 1 3-3h1" }],
    ["rect", { x: "2", y: "14", width: "8", height: "8", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ai = [
  "svg",
  a,
  [
    ["path", { d: "M14 4a2 2 0 0 1 2-2" }],
    ["path", { d: "M16 10a2 2 0 0 1-2-2" }],
    ["path", { d: "M20 2a2 2 0 0 1 2 2" }],
    ["path", { d: "M22 8a2 2 0 0 1-2 2" }],
    ["path", { d: "m3 7 3 3 3-3" }],
    ["path", { d: "M6 10V5a3 3 0 0 1 3-3h1" }],
    ["rect", { x: "2", y: "14", width: "8", height: "8", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ti = [
  "svg",
  a,
  [
    ["polyline", { points: "7 17 2 12 7 7" }],
    ["polyline", { points: "12 17 7 12 12 7" }],
    ["path", { d: "M22 18v-2a4 4 0 0 0-4-4H7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hi = [
  "svg",
  a,
  [
    ["polyline", { points: "9 17 4 12 9 7" }],
    ["path", { d: "M20 18v-2a4 4 0 0 0-4-4H4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const di = [
  "svg",
  a,
  [
    ["polygon", { points: "11 19 2 12 11 5 11 19" }],
    ["polygon", { points: "22 19 13 12 22 5 22 19" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pi = [
  "svg",
  a,
  [
    ["path", { d: "M12 11.22C11 9.997 10 9 10 8a2 2 0 0 1 4 0c0 1-.998 2.002-2.01 3.22" }],
    ["path", { d: "m12 18 2.57-3.5" }],
    ["path", { d: "M6.243 9.016a7 7 0 0 1 11.507-.009" }],
    ["path", { d: "M9.35 14.53 12 11.22" }],
    [
      "path",
      {
        d: "M9.35 14.53C7.728 12.246 6 10.221 6 7a6 5 0 0 1 12 0c-.005 3.22-1.778 5.235-3.43 7.5l3.557 4.527a1 1 0 0 1-.203 1.43l-1.894 1.36a1 1 0 0 1-1.384-.215L12 18l-2.679 3.593a1 1 0 0 1-1.39.213l-1.865-1.353a1 1 0 0 1-.203-1.422z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ci = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
      }
    ],
    [
      "path",
      {
        d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"
      }
    ],
    ["path", { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" }],
    ["path", { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ei = [
  "svg",
  a,
  [
    ["polyline", { points: "3.5 2 6.5 12.5 18 12.5" }],
    ["line", { x1: "9.5", x2: "5.5", y1: "12.5", y2: "20" }],
    ["line", { x1: "15", x2: "18.5", y1: "12.5", y2: "20" }],
    ["path", { d: "M2.75 18a13 13 0 0 0 18.5 0" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const si = [
  "svg",
  a,
  [
    ["path", { d: "M6 19V5" }],
    ["path", { d: "M10 19V6.8" }],
    ["path", { d: "M14 19v-7.8" }],
    ["path", { d: "M18 5v4" }],
    ["path", { d: "M18 19v-6" }],
    ["path", { d: "M22 19V9" }],
    ["path", { d: "M2 19V9a4 4 0 0 1 4-4c2 0 4 1.33 6 4s4 4 6 4a4 4 0 1 0-3-6.65" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const c0 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2"
      }
    ],
    ["path", { d: "m15.194 13.707 3.814 1.86-1.86 3.814" }],
    [
      "path",
      {
        d: "M19 15.57c-1.804.885-4.274 1.43-7 1.43-5.523 0-10-2.239-10-5s4.477-5 10-5c4.838 0 8.873 1.718 9.8 4"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mi = [
  "svg",
  a,
  [
    ["path", { d: "M20 9V7a2 2 0 0 0-2-2h-6" }],
    ["path", { d: "m15 2-3 3 3 3" }],
    ["path", { d: "M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ri = [
  "svg",
  a,
  [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }],
    ["path", { d: "M3 3v5h5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ni = [
  "svg",
  a,
  [
    ["path", { d: "M12 5H6a2 2 0 0 0-2 2v3" }],
    ["path", { d: "m9 8 3-3-3-3" }],
    ["path", { d: "M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vi = [
  "svg",
  a,
  [
    ["path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" }],
    ["path", { d: "M21 3v5h-5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oi = [
  "svg",
  a,
  [
    ["circle", { cx: "6", cy: "19", r: "3" }],
    ["path", { d: "M9 19h8.5c.4 0 .9-.1 1.3-.2" }],
    ["path", { d: "M5.2 5.2A3.5 3.53 0 0 0 6.5 12H12" }],
    ["path", { d: "m2 2 20 20" }],
    ["path", { d: "M21 15.3a3.5 3.5 0 0 0-3.3-3.3" }],
    ["path", { d: "M15 5h-4.3" }],
    ["circle", { cx: "18", cy: "5", r: "3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ii = [
  "svg",
  a,
  [
    ["circle", { cx: "6", cy: "19", r: "3" }],
    ["path", { d: "M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" }],
    ["circle", { cx: "18", cy: "5", r: "3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const li = [
  "svg",
  a,
  [
    ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2" }],
    ["path", { d: "M6.01 18H6" }],
    ["path", { d: "M10.01 18H10" }],
    ["path", { d: "M15 10v4" }],
    ["path", { d: "M17.84 7.17a4 4 0 0 0-5.66 0" }],
    ["path", { d: "M20.66 4.34a8 8 0 0 0-11.31 0" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const e0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M3 12h18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const s0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M21 9H3" }],
    ["path", { d: "M21 15H3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gi = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M21 7.5H3" }],
    ["path", { d: "M21 12H3" }],
    ["path", { d: "M21 16.5H3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xi = [
  "svg",
  a,
  [
    ["path", { d: "M4 11a9 9 0 0 1 9 9" }],
    ["path", { d: "M4 4a16 16 0 0 1 16 16" }],
    ["circle", { cx: "5", cy: "19", r: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yi = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"
      }
    ],
    ["path", { d: "m14.5 12.5 2-2" }],
    ["path", { d: "m11.5 9.5 2-2" }],
    ["path", { d: "m8.5 6.5 2-2" }],
    ["path", { d: "m17.5 15.5 2-2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mi = [
  "svg",
  a,
  [
    ["path", { d: "M6 11h8a4 4 0 0 0 0-8H9v18" }],
    ["path", { d: "M6 15h8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hi = [
  "svg",
  a,
  [
    ["path", { d: "M22 18H2a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4Z" }],
    ["path", { d: "M21 14 10 2 3 14h18Z" }],
    ["path", { d: "M10 2v16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ui = [
  "svg",
  a,
  [
    ["path", { d: "M7 21h10" }],
    ["path", { d: "M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" }],
    [
      "path",
      {
        d: "M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1"
      }
    ],
    ["path", { d: "m13 12 4-4" }],
    ["path", { d: "M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vi = [
  "svg",
  a,
  [
    ["path", { d: "M3 11v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3" }],
    [
      "path",
      { d: "M12 19H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3.83" }
    ],
    ["path", { d: "m3 11 7.77-6.04a2 2 0 0 1 2.46 0L21 11H3Z" }],
    ["path", { d: "M12.97 19.77 7 15h12.5l-3.75 4.5a2 2 0 0 1-2.78.27Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wi = [
  "svg",
  a,
  [
    ["path", { d: "M4 10a7.31 7.31 0 0 0 10 10Z" }],
    ["path", { d: "m9 15 3-3" }],
    ["path", { d: "M17 13a6 6 0 0 0-6-6" }],
    ["path", { d: "M21 13A10 10 0 0 0 11 3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ci = [
  "svg",
  a,
  [
    ["path", { d: "M13 7 9 3 5 7l4 4" }],
    ["path", { d: "m17 11 4 4-4 4-4-4" }],
    ["path", { d: "m8 12 4 4 6-6-4-4Z" }],
    ["path", { d: "m16 8 3-3" }],
    ["path", { d: "M9 21a6 6 0 0 0-6-6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ai = [
  "svg",
  a,
  [
    ["path", { d: "M10 2v3a1 1 0 0 0 1 1h5" }],
    ["path", { d: "M18 18v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6" }],
    ["path", { d: "M18 22H4a2 2 0 0 1-2-2V6" }],
    [
      "path",
      {
        d: "M8 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 22 6.828V16a2 2 0 0 1-2.01 2z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fi = [
  "svg",
  a,
  [
    ["path", { d: "M13 13H8a1 1 0 0 0-1 1v7" }],
    ["path", { d: "M14 8h1" }],
    ["path", { d: "M17 21v-4" }],
    ["path", { d: "m2 2 20 20" }],
    ["path", { d: "M20.41 20.41A2 2 0 0 1 19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 .59-1.41" }],
    ["path", { d: "M29.5 11.5s5 5 4 5" }],
    ["path", { d: "M9 3h6.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V15" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Li = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
      }
    ],
    ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" }],
    ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const M0 = [
  "svg",
  a,
  [
    ["circle", { cx: "19", cy: "19", r: "2" }],
    ["circle", { cx: "5", cy: "5", r: "2" }],
    ["path", { d: "M5 7v12h12" }],
    ["path", { d: "m5 19 6-6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Si = [
  "svg",
  a,
  [
    ["path", { d: "m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" }],
    ["path", { d: "m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" }],
    ["path", { d: "M7 21h10" }],
    ["path", { d: "M12 3v18" }],
    ["path", { d: "M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zi = [
  "svg",
  a,
  [
    ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }],
    ["path", { d: "M14 15H9v-5" }],
    ["path", { d: "M16 3h5v5" }],
    ["path", { d: "M21 3 9 15" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ki = [
  "svg",
  a,
  [
    ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }],
    ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }],
    ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }],
    ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }],
    ["path", { d: "M8 7v10" }],
    ["path", { d: "M12 7v10" }],
    ["path", { d: "M17 7v10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pi = [
  "svg",
  a,
  [
    ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }],
    ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }],
    ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }],
    ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }],
    ["circle", { cx: "12", cy: "12", r: "1" }],
    [
      "path",
      {
        d: "M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zi = [
  "svg",
  a,
  [
    ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }],
    ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }],
    ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }],
    ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }],
    ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2" }],
    ["path", { d: "M9 9h.01" }],
    ["path", { d: "M15 9h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bi = [
  "svg",
  a,
  [
    ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }],
    ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }],
    ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }],
    ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }],
    ["path", { d: "M7 12h10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ti = [
  "svg",
  a,
  [
    ["path", { d: "M17 12v4a1 1 0 0 1-1 1h-4" }],
    ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }],
    ["path", { d: "M17 8V7" }],
    ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }],
    ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }],
    ["path", { d: "M7 17h.01" }],
    ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }],
    ["rect", { x: "7", y: "7", width: "5", height: "5", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Di = [
  "svg",
  a,
  [
    ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }],
    ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }],
    ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }],
    ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }],
    ["circle", { cx: "12", cy: "12", r: "3" }],
    ["path", { d: "m16 16-1.9-1.9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fi = [
  "svg",
  a,
  [
    ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }],
    ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }],
    ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }],
    ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }],
    ["path", { d: "M7 8h8" }],
    ["path", { d: "M7 12h10" }],
    ["path", { d: "M7 16h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bi = [
  "svg",
  a,
  [
    ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2" }],
    ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2" }],
    ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2" }],
    ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ri = [
  "svg",
  a,
  [
    ["path", { d: "M14 22v-4a2 2 0 1 0-4 0v4" }],
    ["path", { d: "m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" }],
    ["path", { d: "M18 5v17" }],
    ["path", { d: "m4 6 8-4 8 4" }],
    ["path", { d: "M6 5v17" }],
    ["circle", { cx: "12", cy: "9", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Oi = [
  "svg",
  a,
  [
    ["path", { d: "M5.42 9.42 8 12" }],
    ["circle", { cx: "4", cy: "8", r: "2" }],
    ["path", { d: "m14 6-8.58 8.58" }],
    ["circle", { cx: "4", cy: "16", r: "2" }],
    ["path", { d: "M10.8 14.8 14 18" }],
    ["path", { d: "M16 12h-2" }],
    ["path", { d: "M22 12h-2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qi = [
  "svg",
  a,
  [
    ["circle", { cx: "6", cy: "6", r: "3" }],
    ["path", { d: "M8.12 8.12 12 12" }],
    ["path", { d: "M20 4 8.12 15.88" }],
    ["circle", { cx: "6", cy: "18", r: "3" }],
    ["path", { d: "M14.8 14.8 20 20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ui = [
  "svg",
  a,
  [
    ["path", { d: "M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3" }],
    ["path", { d: "M8 21h8" }],
    ["path", { d: "M12 17v4" }],
    ["path", { d: "m22 3-5 5" }],
    ["path", { d: "m17 3 5 5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _i = [
  "svg",
  a,
  [
    ["path", { d: "M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3" }],
    ["path", { d: "M8 21h8" }],
    ["path", { d: "M12 17v4" }],
    ["path", { d: "m17 8 5-5" }],
    ["path", { d: "M17 3h5v5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ei = [
  "svg",
  a,
  [
    ["path", { d: "M15 12h-5" }],
    ["path", { d: "M15 8h-5" }],
    ["path", { d: "M19 17V5a2 2 0 0 0-2-2H4" }],
    [
      "path",
      {
        d: "M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ni = [
  "svg",
  a,
  [
    ["path", { d: "M19 17V5a2 2 0 0 0-2-2H4" }],
    [
      "path",
      {
        d: "M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ii = [
  "svg",
  a,
  [
    ["path", { d: "m8 11 2 2 4-4" }],
    ["circle", { cx: "11", cy: "11", r: "8" }],
    ["path", { d: "m21 21-4.3-4.3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gi = [
  "svg",
  a,
  [
    ["path", { d: "m13 13.5 2-2.5-2-2.5" }],
    ["path", { d: "m21 21-4.3-4.3" }],
    ["path", { d: "M9 8.5 7 11l2 2.5" }],
    ["circle", { cx: "11", cy: "11", r: "8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xi = [
  "svg",
  a,
  [
    ["path", { d: "m13.5 8.5-5 5" }],
    ["circle", { cx: "11", cy: "11", r: "8" }],
    ["path", { d: "m21 21-4.3-4.3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wi = [
  "svg",
  a,
  [
    ["path", { d: "m13.5 8.5-5 5" }],
    ["path", { d: "m8.5 8.5 5 5" }],
    ["circle", { cx: "11", cy: "11", r: "8" }],
    ["path", { d: "m21 21-4.3-4.3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $i = [
  "svg",
  a,
  [
    ["circle", { cx: "11", cy: "11", r: "8" }],
    ["path", { d: "m21 21-4.3-4.3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ki = [
  "svg",
  a,
  [
    ["path", { d: "M16 5a4 3 0 0 0-8 0c0 4 8 3 8 7a4 3 0 0 1-8 0" }],
    ["path", { d: "M8 19a4 3 0 0 0 8 0c0-4-8-3-8-7a4 3 0 0 1 8 0" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const r0 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"
      }
    ],
    ["path", { d: "M6 12h16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ji = [
  "svg",
  a,
  [
    ["rect", { x: "14", y: "14", width: "8", height: "8", rx: "2" }],
    ["rect", { x: "2", y: "2", width: "8", height: "8", rx: "2" }],
    ["path", { d: "M7 14v1a2 2 0 0 0 2 2h1" }],
    ["path", { d: "M14 7h1a2 2 0 0 1 2 2v1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qi = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"
      }
    ],
    ["path", { d: "m21.854 2.147-10.94 10.939" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yi = [
  "svg",
  a,
  [
    ["line", { x1: "3", x2: "21", y1: "12", y2: "12" }],
    ["polyline", { points: "8 8 12 4 16 8" }],
    ["polyline", { points: "16 16 12 20 8 16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ji = [
  "svg",
  a,
  [
    ["line", { x1: "12", x2: "12", y1: "3", y2: "21" }],
    ["polyline", { points: "8 8 4 12 8 16" }],
    ["polyline", { points: "16 16 20 12 16 8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const al = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "3" }],
    ["path", { d: "M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5" }],
    [
      "path",
      { d: "M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5" }
    ],
    ["path", { d: "M6 6h.01" }],
    ["path", { d: "M6 18h.01" }],
    ["path", { d: "m15.7 13.4-.9-.3" }],
    ["path", { d: "m9.2 10.9-.9-.3" }],
    ["path", { d: "m10.6 15.7.3-.9" }],
    ["path", { d: "m13.6 15.7-.4-1" }],
    ["path", { d: "m10.8 9.3-.4-1" }],
    ["path", { d: "m8.3 13.6 1-.4" }],
    ["path", { d: "m14.7 10.8 1-.4" }],
    ["path", { d: "m13.4 8.3-.3.9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tl = [
  "svg",
  a,
  [
    ["path", { d: "M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" }],
    ["path", { d: "M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2" }],
    ["path", { d: "M6 6h.01" }],
    ["path", { d: "M6 18h.01" }],
    ["path", { d: "m13 6-4 6h6l-4 6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hl = [
  "svg",
  a,
  [
    ["path", { d: "M7 2h13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-5" }],
    ["path", { d: "M10 10 2.5 2.5C2 2 2 2.5 2 5v3a2 2 0 0 0 2 2h6z" }],
    ["path", { d: "M22 17v-1a2 2 0 0 0-2-2h-1" }],
    ["path", { d: "M4 14a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16.5l1-.5.5.5-8-8H4z" }],
    ["path", { d: "M6 18h.01" }],
    ["path", { d: "m2 2 20 20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dl = [
  "svg",
  a,
  [
    ["rect", { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2" }],
    ["rect", { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2" }],
    ["line", { x1: "6", x2: "6.01", y1: "6", y2: "6" }],
    ["line", { x1: "6", x2: "6.01", y1: "18", y2: "18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pl = [
  "svg",
  a,
  [
    ["path", { d: "M20 7h-9" }],
    ["path", { d: "M14 17H5" }],
    ["circle", { cx: "17", cy: "17", r: "3" }],
    ["circle", { cx: "7", cy: "7", r: "3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cl = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
      }
    ],
    ["circle", { cx: "12", cy: "12", r: "3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const el = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z"
      }
    ],
    ["rect", { x: "3", y: "14", width: "7", height: "7", rx: "1" }],
    ["circle", { cx: "17.5", cy: "17.5", r: "3.5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sl = [
  "svg",
  a,
  [
    ["circle", { cx: "18", cy: "5", r: "3" }],
    ["circle", { cx: "6", cy: "12", r: "3" }],
    ["circle", { cx: "18", cy: "19", r: "3" }],
    ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49" }],
    ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ml = [
  "svg",
  a,
  [
    ["path", { d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" }],
    ["polyline", { points: "16 6 12 2 8 6" }],
    ["line", { x1: "12", x2: "12", y1: "2", y2: "15" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rl = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
    ["line", { x1: "3", x2: "21", y1: "9", y2: "9" }],
    ["line", { x1: "3", x2: "21", y1: "15", y2: "15" }],
    ["line", { x1: "9", x2: "9", y1: "9", y2: "21" }],
    ["line", { x1: "15", x2: "15", y1: "9", y2: "21" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nl = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M14 11a2 2 0 1 1-4 0 4 4 0 0 1 8 0 6 6 0 0 1-12 0 8 8 0 0 1 16 0 10 10 0 1 1-20 0 11.93 11.93 0 0 1 2.42-7.22 2 2 0 1 1 3.16 2.44"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vl = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
      }
    ],
    ["path", { d: "M12 8v4" }],
    ["path", { d: "M12 16h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ol = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
      }
    ],
    ["path", { d: "m4.243 5.21 14.39 12.472" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const il = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
      }
    ],
    ["path", { d: "m9 12 2 2 4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ll = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
      }
    ],
    ["path", { d: "M8 12h.01" }],
    ["path", { d: "M12 12h.01" }],
    ["path", { d: "M16 12h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gl = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
      }
    ],
    ["path", { d: "M12 22V2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xl = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
      }
    ],
    ["path", { d: "M9 12h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yl = [
  "svg",
  a,
  [
    ["path", { d: "m2 2 20 20" }],
    [
      "path",
      {
        d: "M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71"
      }
    ],
    [
      "path",
      {
        d: "M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ml = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
      }
    ],
    ["path", { d: "M9 12h6" }],
    ["path", { d: "M12 9v6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hl = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
      }
    ],
    ["path", { d: "M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3" }],
    ["path", { d: "M12 17h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const n0 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
      }
    ],
    ["path", { d: "m14.5 9.5-5 5" }],
    ["path", { d: "m9.5 9.5 5 5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ul = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vl = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "8" }],
    ["path", { d: "M12 2v7.5" }],
    ["path", { d: "m19 5-5.23 5.23" }],
    ["path", { d: "M22 12h-7.5" }],
    ["path", { d: "m19 19-5.23-5.23" }],
    ["path", { d: "M12 14.5V22" }],
    ["path", { d: "M10.23 13.77 5 19" }],
    ["path", { d: "M9.5 12H2" }],
    ["path", { d: "M10.23 10.23 5 5" }],
    ["circle", { cx: "12", cy: "12", r: "2.5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wl = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
      }
    ],
    ["path", { d: "M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76" }],
    ["path", { d: "M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" }],
    ["path", { d: "M12 10v4" }],
    ["path", { d: "M12 2v3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cl = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Al = [
  "svg",
  a,
  [
    ["path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" }],
    ["path", { d: "M3 6h18" }],
    ["path", { d: "M16 10a4 4 0 0 1-8 0" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fl = [
  "svg",
  a,
  [
    ["path", { d: "m15 11-1 9" }],
    ["path", { d: "m19 11-4-7" }],
    ["path", { d: "M2 11h20" }],
    ["path", { d: "m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" }],
    ["path", { d: "M4.5 15.5h15" }],
    ["path", { d: "m5 11 4-7" }],
    ["path", { d: "m9 11 1 9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ll = [
  "svg",
  a,
  [
    ["circle", { cx: "8", cy: "21", r: "1" }],
    ["circle", { cx: "19", cy: "21", r: "1" }],
    [
      "path",
      { d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sl = [
  "svg",
  a,
  [
    ["path", { d: "M2 22v-5l5-5 5 5-5 5z" }],
    ["path", { d: "M9.5 14.5 16 8" }],
    ["path", { d: "m17 2 5 5-.5.5a3.53 3.53 0 0 1-5 0s0 0 0 0a3.53 3.53 0 0 1 0-5L17 2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zl = [
  "svg",
  a,
  [
    ["path", { d: "m4 4 2.5 2.5" }],
    ["path", { d: "M13.5 6.5a4.95 4.95 0 0 0-7 7" }],
    ["path", { d: "M15 5 5 15" }],
    ["path", { d: "M14 17v.01" }],
    ["path", { d: "M10 16v.01" }],
    ["path", { d: "M13 13v.01" }],
    ["path", { d: "M16 10v.01" }],
    ["path", { d: "M11 20v.01" }],
    ["path", { d: "M17 14v.01" }],
    ["path", { d: "M20 11v.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kl = [
  "svg",
  a,
  [
    ["path", { d: "m15 15 6 6m-6-6v4.8m0-4.8h4.8" }],
    ["path", { d: "M9 19.8V15m0 0H4.2M9 15l-6 6" }],
    ["path", { d: "M15 4.2V9m0 0h4.8M15 9l6-6" }],
    ["path", { d: "M9 4.2V9m0 0H4.2M9 9 3 3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pl = [
  "svg",
  a,
  [
    ["path", { d: "M12 22v-7l-2-2" }],
    ["path", { d: "M17 8v.8A6 6 0 0 1 13.8 20H10A6.5 6.5 0 0 1 7 8a5 5 0 0 1 10 0Z" }],
    ["path", { d: "m14 14-2 2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zl = [
  "svg",
  a,
  [
    ["path", { d: "M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" }],
    ["path", { d: "m18 2 4 4-4 4" }],
    ["path", { d: "M2 6h1.9c1.5 0 2.9.9 3.6 2.2" }],
    ["path", { d: "M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" }],
    ["path", { d: "m18 14 4 4-4 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bl = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tl = [
  "svg",
  a,
  [
    ["path", { d: "M2 20h.01" }],
    ["path", { d: "M7 20v-4" }],
    ["path", { d: "M12 20v-8" }],
    ["path", { d: "M17 20V8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dl = [
  "svg",
  a,
  [
    ["path", { d: "M2 20h.01" }],
    ["path", { d: "M7 20v-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fl = [
  "svg",
  a,
  [
    ["path", { d: "M2 20h.01" }],
    ["path", { d: "M7 20v-4" }],
    ["path", { d: "M12 20v-8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bl = ["svg", a, [["path", { d: "M2 20h.01" }]]];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rl = [
  "svg",
  a,
  [
    ["path", { d: "M2 20h.01" }],
    ["path", { d: "M7 20v-4" }],
    ["path", { d: "M12 20v-8" }],
    ["path", { d: "M17 20V8" }],
    ["path", { d: "M22 4v16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ol = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "m21 17-2.156-1.868A.5.5 0 0 0 18 15.5v.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1c0-2.545-3.991-3.97-8.5-4a1 1 0 0 0 0 5c4.153 0 4.745-11.295 5.708-13.5a2.5 2.5 0 1 1 3.31 3.284"
      }
    ],
    ["path", { d: "M3 21h18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ql = [
  "svg",
  a,
  [
    ["path", { d: "M10 9H4L2 7l2-2h6" }],
    ["path", { d: "M14 5h6l2 2-2 2h-6" }],
    ["path", { d: "M10 22V4a2 2 0 1 1 4 0v18" }],
    ["path", { d: "M8 22h8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ul = [
  "svg",
  a,
  [
    ["path", { d: "M12 13v8" }],
    ["path", { d: "M12 3v3" }],
    [
      "path",
      {
        d: "M18 6a2 2 0 0 1 1.387.56l2.307 2.22a1 1 0 0 1 0 1.44l-2.307 2.22A2 2 0 0 1 18 13H6a2 2 0 0 1-1.387-.56l-2.306-2.22a1 1 0 0 1 0-1.44l2.306-2.22A2 2 0 0 1 6 6z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _l = [
  "svg",
  a,
  [
    ["path", { d: "M7 18v-6a5 5 0 1 1 10 0v6" }],
    ["path", { d: "M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z" }],
    ["path", { d: "M21 12h1" }],
    ["path", { d: "M18.5 4.5 18 5" }],
    ["path", { d: "M2 12h1" }],
    ["path", { d: "M12 2v1" }],
    ["path", { d: "m4.929 4.929.707.707" }],
    ["path", { d: "M12 12v6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const El = [
  "svg",
  a,
  [
    ["polygon", { points: "19 20 9 12 19 4 19 20" }],
    ["line", { x1: "5", x2: "5", y1: "19", y2: "5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nl = [
  "svg",
  a,
  [
    ["polygon", { points: "5 4 15 12 5 20 5 4" }],
    ["line", { x1: "19", x2: "19", y1: "5", y2: "19" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Il = [
  "svg",
  a,
  [
    ["path", { d: "m12.5 17-.5-1-.5 1h1z" }],
    [
      "path",
      {
        d: "M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z"
      }
    ],
    ["circle", { cx: "15", cy: "12", r: "1" }],
    ["circle", { cx: "9", cy: "12", r: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gl = [
  "svg",
  a,
  [
    ["rect", { width: "3", height: "8", x: "13", y: "2", rx: "1.5" }],
    ["path", { d: "M19 8.5V10h1.5A1.5 1.5 0 1 0 19 8.5" }],
    ["rect", { width: "3", height: "8", x: "8", y: "14", rx: "1.5" }],
    ["path", { d: "M5 15.5V14H3.5A1.5 1.5 0 1 0 5 15.5" }],
    ["rect", { width: "8", height: "3", x: "14", y: "13", rx: "1.5" }],
    ["path", { d: "M15.5 19H14v1.5a1.5 1.5 0 1 0 1.5-1.5" }],
    ["rect", { width: "8", height: "3", x: "2", y: "8", rx: "1.5" }],
    ["path", { d: "M8.5 5H10V3.5A1.5 1.5 0 1 0 8.5 5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xl = ["svg", a, [["path", { d: "M22 2 2 22" }]]];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wl = [
  "svg",
  a,
  [
    ["path", { d: "m8 14-6 6h9v-3" }],
    ["path", { d: "M18.37 3.63 8 14l3 3L21.37 6.63a2.12 2.12 0 1 0-3-3Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $l = [
  "svg",
  a,
  [
    ["line", { x1: "21", x2: "14", y1: "4", y2: "4" }],
    ["line", { x1: "10", x2: "3", y1: "4", y2: "4" }],
    ["line", { x1: "21", x2: "12", y1: "12", y2: "12" }],
    ["line", { x1: "8", x2: "3", y1: "12", y2: "12" }],
    ["line", { x1: "21", x2: "16", y1: "20", y2: "20" }],
    ["line", { x1: "12", x2: "3", y1: "20", y2: "20" }],
    ["line", { x1: "14", x2: "14", y1: "2", y2: "6" }],
    ["line", { x1: "8", x2: "8", y1: "10", y2: "14" }],
    ["line", { x1: "16", x2: "16", y1: "18", y2: "22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const v0 = [
  "svg",
  a,
  [
    ["line", { x1: "4", x2: "4", y1: "21", y2: "14" }],
    ["line", { x1: "4", x2: "4", y1: "10", y2: "3" }],
    ["line", { x1: "12", x2: "12", y1: "21", y2: "12" }],
    ["line", { x1: "12", x2: "12", y1: "8", y2: "3" }],
    ["line", { x1: "20", x2: "20", y1: "21", y2: "16" }],
    ["line", { x1: "20", x2: "20", y1: "12", y2: "3" }],
    ["line", { x1: "2", x2: "6", y1: "14", y2: "14" }],
    ["line", { x1: "10", x2: "14", y1: "8", y2: "8" }],
    ["line", { x1: "18", x2: "22", y1: "16", y2: "16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kl = [
  "svg",
  a,
  [
    ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2" }],
    ["path", { d: "M12.667 8 10 12h4l-2.667 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jl = [
  "svg",
  a,
  [
    ["rect", { width: "7", height: "12", x: "2", y: "6", rx: "1" }],
    ["path", { d: "M13 8.32a7.43 7.43 0 0 1 0 7.36" }],
    ["path", { d: "M16.46 6.21a11.76 11.76 0 0 1 0 11.58" }],
    ["path", { d: "M19.91 4.1a15.91 15.91 0 0 1 .01 15.8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ql = [
  "svg",
  a,
  [
    ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2" }],
    ["path", { d: "M12 18h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yl = [
  "svg",
  a,
  [
    ["path", { d: "M22 11v1a10 10 0 1 1-9-10" }],
    ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2" }],
    ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9" }],
    ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9" }],
    ["path", { d: "M16 5h6" }],
    ["path", { d: "M19 2v6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jl = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2" }],
    ["line", { x1: "9", x2: "9.01", y1: "9", y2: "9" }],
    ["line", { x1: "15", x2: "15.01", y1: "9", y2: "9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ag = [
  "svg",
  a,
  [
    ["path", { d: "M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0" }],
    ["circle", { cx: "10", cy: "13", r: "8" }],
    ["path", { d: "M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6" }],
    ["path", { d: "M18 3 19.1 5.2" }],
    ["path", { d: "M22 3 20.9 5.2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tg = [
  "svg",
  a,
  [
    ["line", { x1: "2", x2: "22", y1: "12", y2: "12" }],
    ["line", { x1: "12", x2: "12", y1: "2", y2: "22" }],
    ["path", { d: "m20 16-4-4 4-4" }],
    ["path", { d: "m4 8 4 4-4 4" }],
    ["path", { d: "m16 4-4 4-4-4" }],
    ["path", { d: "m8 20 4-4 4 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hg = [
  "svg",
  a,
  [
    ["path", { d: "M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" }],
    [
      "path",
      {
        d: "M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"
      }
    ],
    ["path", { d: "M4 18v2" }],
    ["path", { d: "M20 18v2" }],
    ["path", { d: "M12 4v9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dg = [
  "svg",
  a,
  [
    ["path", { d: "M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" }],
    ["path", { d: "M7 21h10" }],
    ["path", { d: "M19.5 12 22 6" }],
    ["path", { d: "M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62" }],
    ["path", { d: "M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62" }],
    ["path", { d: "M6.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.74 1.62" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pg = [
  "svg",
  a,
  [["path", { d: "M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cg = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M5 9c-1.5 1.5-3 3.2-3 5.5A5.5 5.5 0 0 0 7.5 20c1.8 0 3-.5 4.5-2 1.5 1.5 2.7 2 4.5 2a5.5 5.5 0 0 0 5.5-5.5c0-2.3-1.5-4-3-5.5l-7-7-7 7Z"
      }
    ],
    ["path", { d: "M12 18v4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eg = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const o0 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
      }
    ],
    ["path", { d: "M20 3v4" }],
    ["path", { d: "M22 5h-4" }],
    ["path", { d: "M4 17v2" }],
    ["path", { d: "M5 18H3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sg = [
  "svg",
  a,
  [
    ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2" }],
    ["path", { d: "M12 6h.01" }],
    ["circle", { cx: "12", cy: "14", r: "4" }],
    ["path", { d: "M12 14h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mg = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20"
      }
    ],
    ["path", { d: "M19.8 17.8a7.5 7.5 0 0 0 .003-10.603" }],
    ["path", { d: "M17 15a3.5 3.5 0 0 0-.025-4.975" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rg = [
  "svg",
  a,
  [
    ["path", { d: "m6 16 6-12 6 12" }],
    ["path", { d: "M8 12h8" }],
    [
      "path",
      {
        d: "M4 21c1.1 0 1.1-1 2.3-1s1.1 1 2.3 1c1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ng = [
  "svg",
  a,
  [
    ["path", { d: "m6 16 6-12 6 12" }],
    ["path", { d: "M8 12h8" }],
    ["path", { d: "m16 20 2 2 4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vg = [
  "svg",
  a,
  [
    ["circle", { cx: "19", cy: "5", r: "2" }],
    ["circle", { cx: "5", cy: "19", r: "2" }],
    ["path", { d: "M5 17A12 12 0 0 1 17 5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const og = [
  "svg",
  a,
  [
    ["path", { d: "M16 3h5v5" }],
    ["path", { d: "M8 3H3v5" }],
    ["path", { d: "M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" }],
    ["path", { d: "m15 9 6-6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ig = [
  "svg",
  a,
  [
    ["path", { d: "M3 3h.01" }],
    ["path", { d: "M7 5h.01" }],
    ["path", { d: "M11 7h.01" }],
    ["path", { d: "M3 7h.01" }],
    ["path", { d: "M7 9h.01" }],
    ["path", { d: "M3 11h.01" }],
    ["rect", { width: "4", height: "4", x: "15", y: "5" }],
    ["path", { d: "m19 9 2 2v10c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1V11l2-2" }],
    ["path", { d: "m13 14 8-2" }],
    ["path", { d: "m13 19 8-2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lg = [
  "svg",
  a,
  [
    ["path", { d: "M7 20h10" }],
    ["path", { d: "M10 20c5.5-2.5.8-6.4 3-10" }],
    [
      "path",
      {
        d: "M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"
      }
    ],
    [
      "path",
      { d: "M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const i0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M17 12h-2l-2 5-2-10-2 5H7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const l0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "m16 8-8 8" }],
    ["path", { d: "M16 16H8V8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const g0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "m8 8 8 8" }],
    ["path", { d: "M16 8v8H8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M12 8v8" }],
    ["path", { d: "m8 12 4 4 4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "m12 8-4 4 4 4" }],
    ["path", { d: "M16 12H8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const m0 = [
  "svg",
  a,
  [
    ["path", { d: "M13 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6" }],
    ["path", { d: "m3 21 9-9" }],
    ["path", { d: "M9 21H3v-6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const H0 = [
  "svg",
  a,
  [
    ["path", { d: "M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" }],
    ["path", { d: "m21 21-9-9" }],
    ["path", { d: "M21 15v6h-6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const u0 = [
  "svg",
  a,
  [
    ["path", { d: "M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6" }],
    ["path", { d: "m3 3 9 9" }],
    ["path", { d: "M3 9V3h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const V0 = [
  "svg",
  a,
  [
    ["path", { d: "M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" }],
    ["path", { d: "m21 3-9 9" }],
    ["path", { d: "M15 3h6v6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const w0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M8 12h8" }],
    ["path", { d: "m12 16 4-4-4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M8 16V8h8" }],
    ["path", { d: "M16 16 8 8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const A0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M8 8h8v8" }],
    ["path", { d: "m8 16 8-8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const f0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "m16 12-4-4-4 4" }],
    ["path", { d: "M12 16V8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const L0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M12 8v8" }],
    ["path", { d: "m8.5 14 7-4" }],
    ["path", { d: "m8.5 10 7 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S0 = [
  "svg",
  a,
  [
    ["path", { d: "M4 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2" }],
    ["path", { d: "M10 22H8" }],
    ["path", { d: "M16 22h-2" }],
    ["circle", { cx: "8", cy: "8", r: "2" }],
    ["path", { d: "M9.414 9.414 12 12" }],
    ["path", { d: "M14.8 14.8 18 18" }],
    ["circle", { cx: "8", cy: "16", r: "2" }],
    ["path", { d: "m18 6-8.586 8.586" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M9 8h7" }],
    ["path", { d: "M8 12h6" }],
    ["path", { d: "M11 16h5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z0 = [
  "svg",
  a,
  [
    ["path", { d: "M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5" }],
    ["path", { d: "m9 11 3 3L22 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "m9 12 2 2 4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const P0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "m16 10-4 4-4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "m14 16-4-4 4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "m10 8 4 4-4 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const T0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "m8 14 4-4 4 4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const D0 = [
  "svg",
  a,
  [
    ["path", { d: "M10 9.5 8 12l2 2.5" }],
    ["path", { d: "m14 9.5 2 2.5-2 2.5" }],
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gg = [
  "svg",
  a,
  [
    ["path", { d: "M10 9.5 8 12l2 2.5" }],
    ["path", { d: "M14 21h1" }],
    ["path", { d: "m14 9.5 2 2.5-2 2.5" }],
    ["path", { d: "M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2" }],
    ["path", { d: "M9 21h1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xg = [
  "svg",
  a,
  [
    ["path", { d: "M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2" }],
    ["path", { d: "M9 21h1" }],
    ["path", { d: "M14 21h1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const F0 = [
  "svg",
  a,
  [
    ["path", { d: "M8 7v7" }],
    ["path", { d: "M12 7v4" }],
    ["path", { d: "M16 7v9" }],
    ["path", { d: "M5 3a2 2 0 0 0-2 2" }],
    ["path", { d: "M9 3h1" }],
    ["path", { d: "M14 3h1" }],
    ["path", { d: "M19 3a2 2 0 0 1 2 2" }],
    ["path", { d: "M21 9v1" }],
    ["path", { d: "M21 14v1" }],
    ["path", { d: "M21 19a2 2 0 0 1-2 2" }],
    ["path", { d: "M14 21h1" }],
    ["path", { d: "M9 21h1" }],
    ["path", { d: "M5 21a2 2 0 0 1-2-2" }],
    ["path", { d: "M3 14v1" }],
    ["path", { d: "M3 9v1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const b0 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z"
      }
    ],
    ["path", { d: "M5 3a2 2 0 0 0-2 2" }],
    ["path", { d: "M19 3a2 2 0 0 1 2 2" }],
    ["path", { d: "M5 21a2 2 0 0 1-2-2" }],
    ["path", { d: "M9 3h1" }],
    ["path", { d: "M9 21h2" }],
    ["path", { d: "M14 3h1" }],
    ["path", { d: "M3 9v1" }],
    ["path", { d: "M21 9v2" }],
    ["path", { d: "M3 14v1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const R0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12" }],
    ["line", { x1: "12", x2: "12", y1: "16", y2: "16" }],
    ["line", { x1: "12", x2: "12", y1: "8", y2: "8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["circle", { cx: "12", cy: "12", r: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const q0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M7 10h10" }],
    ["path", { d: "M7 14h10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
    ["path", { d: "M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3" }],
    ["path", { d: "M9 11.2h5.7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M8 7v7" }],
    ["path", { d: "M12 7v4" }],
    ["path", { d: "M16 7v9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const E0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M7 7v10" }],
    ["path", { d: "M11 7v10" }],
    ["path", { d: "m15 7 2 10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const N0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M8 16V8l4 4 4-4v8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const I0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M7 8h10" }],
    ["path", { d: "M7 12h10" }],
    ["path", { d: "M7 16h10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M8 12h8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X0 = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z"
      }
    ],
    ["path", { d: "M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const W0 = [
  "svg",
  a,
  [
    ["path", { d: "M3.6 3.6A2 2 0 0 1 5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-.59 1.41" }],
    ["path", { d: "M3 8.7V19a2 2 0 0 0 2 2h10.3" }],
    ["path", { d: "m2 2 20 20" }],
    ["path", { d: "M13 13a3 3 0 1 0 0-6H9v2" }],
    ["path", { d: "M9 17v-2.3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M9 17V7h4a3 3 0 0 1 0 6H9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const T = [
  "svg",
  a,
  [
    ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }],
    [
      "path",
      {
        d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const K0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "m15 9-6 6" }],
    ["path", { d: "M9 9h.01" }],
    ["path", { d: "M15 15h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M7 7h10" }],
    ["path", { d: "M10 7v10" }],
    ["path", { d: "M16 17a2 2 0 0 1-2-2V7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Q0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M12 12H9.5a2.5 2.5 0 0 1 0-5H17" }],
    ["path", { d: "M12 7v10" }],
    ["path", { d: "M16 7v10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "m9 8 6 4-6 4Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j0 = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M8 12h8" }],
    ["path", { d: "M12 8v8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aa = [
  "svg",
  a,
  [
    ["path", { d: "M12 7v4" }],
    ["path", { d: "M7.998 9.003a5 5 0 1 0 8-.005" }],
    ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yg = [
  "svg",
  a,
  [
    ["path", { d: "M7 12h2l2 5 2-10h4" }],
    ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ta = [
  "svg",
  a,
  [
    ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "2" }],
    ["circle", { cx: "8", cy: "8", r: "2" }],
    ["path", { d: "M9.414 9.414 12 12" }],
    ["path", { d: "M14.8 14.8 18 18" }],
    ["circle", { cx: "8", cy: "16", r: "2" }],
    ["path", { d: "m18 6-8.586 8.586" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ha = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M16 8.9V7H8l4 5-4 5h8v-1.9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const da = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["line", { x1: "9", x2: "15", y1: "15", y2: "9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pa = [
  "svg",
  a,
  [
    ["path", { d: "M8 19H5c-1 0-2-1-2-2V7c0-1 1-2 2-2h3" }],
    ["path", { d: "M16 5h3c1 0 2 1 2 2v10c0 1-1 2-2 2h-3" }],
    ["line", { x1: "12", x2: "12", y1: "4", y2: "20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ca = [
  "svg",
  a,
  [
    ["path", { d: "M5 8V5c0-1 1-2 2-2h10c1 0 2 1 2 2v3" }],
    ["path", { d: "M19 16v3c0 1-1 2-2 2H7c-1 0-2-1-2-2v-3" }],
    ["line", { x1: "4", x2: "20", y1: "12", y2: "12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mg = [
  "svg",
  a,
  [
    ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }],
    ["rect", { x: "8", y: "8", width: "8", height: "8", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hg = [
  "svg",
  a,
  [
    ["path", { d: "M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2" }],
    ["path", { d: "M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2" }],
    ["rect", { width: "8", height: "8", x: "14", y: "14", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ea = [
  "svg",
  a,
  [
    ["path", { d: "m7 11 2-2-2-2" }],
    ["path", { d: "M11 13h4" }],
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sa = [
  "svg",
  a,
  [
    ["path", { d: "M18 21a6 6 0 0 0-12 0" }],
    ["circle", { cx: "12", cy: "11", r: "4" }],
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ma = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["circle", { cx: "12", cy: "10", r: "3" }],
    ["path", { d: "M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ra = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
    ["path", { d: "m15 9-6 6" }],
    ["path", { d: "m9 9 6 6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ug = [
  "svg",
  a,
  [["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vg = [
  "svg",
  a,
  [["path", { d: "M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wg = [
  "svg",
  a,
  [
    ["path", { d: "M15.236 22a3 3 0 0 0-2.2-5" }],
    ["path", { d: "M16 20a3 3 0 0 1 3-3h1a2 2 0 0 0 2-2v-2a4 4 0 0 0-4-4V4" }],
    ["path", { d: "M18 13h.01" }],
    [
      "path",
      {
        d: "M18 6a4 4 0 0 0-4 4 7 7 0 0 0-7 7c0-5 4-5 4-10.5a4.5 4.5 0 1 0-9 0 2.5 2.5 0 0 0 5 0C7 10 3 11 3 17c0 2.8 2.2 5 5 5h10"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cg = [
  "svg",
  a,
  [
    ["path", { d: "M5 22h14" }],
    [
      "path",
      {
        d: "M19.27 13.73A2.5 2.5 0 0 0 17.5 13h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.5c0-.66-.26-1.3-.73-1.77Z"
      }
    ],
    ["path", { d: "M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-3-3c-1.66 0-3 1-3 3s1 2 1 3.5V13" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ag = [
  "svg",
  a,
  [["path", { d: "M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fg = [
  "svg",
  a,
  [
    ["path", { d: "M8.34 8.34 2 9.27l5 4.87L5.82 21 12 17.77 18.18 21l-.59-3.43" }],
    ["path", { d: "M18.42 12.76 22 9.27l-6.91-1L12 2l-1.44 2.91" }],
    ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lg = [
  "svg",
  a,
  [
    [
      "polygon",
      {
        points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sg = [
  "svg",
  a,
  [
    ["line", { x1: "18", x2: "18", y1: "20", y2: "4" }],
    ["polygon", { points: "14,20 4,12 14,4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zg = [
  "svg",
  a,
  [
    ["line", { x1: "6", x2: "6", y1: "4", y2: "20" }],
    ["polygon", { points: "10,4 20,12 10,20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kg = [
  "svg",
  a,
  [
    ["path", { d: "M11 2v2" }],
    ["path", { d: "M5 2v2" }],
    ["path", { d: "M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" }],
    ["path", { d: "M8 15a6 6 0 0 0 12 0v-3" }],
    ["circle", { cx: "20", cy: "10", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pg = [
  "svg",
  a,
  [
    ["path", { d: "M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z" }],
    ["path", { d: "M14 3v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M8 13h.01" }],
    ["path", { d: "M16 13h.01" }],
    ["path", { d: "M10 16s.8 1 2 1c1.3 0 2-1 2-1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zg = [
  "svg",
  a,
  [
    ["path", { d: "M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z" }],
    ["path", { d: "M15 3v4a2 2 0 0 0 2 2h4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bg = [
  "svg",
  a,
  [
    ["path", { d: "m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" }],
    ["path", { d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" }],
    ["path", { d: "M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" }],
    ["path", { d: "M2 7h20" }],
    [
      "path",
      {
        d: "M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tg = [
  "svg",
  a,
  [
    ["rect", { width: "20", height: "6", x: "2", y: "4", rx: "2" }],
    ["rect", { width: "20", height: "6", x: "2", y: "14", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dg = [
  "svg",
  a,
  [
    ["rect", { width: "6", height: "20", x: "4", y: "2", rx: "2" }],
    ["rect", { width: "6", height: "20", x: "14", y: "2", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fg = [
  "svg",
  a,
  [
    ["path", { d: "M16 4H9a3 3 0 0 0-2.83 4" }],
    ["path", { d: "M14 12a4 4 0 0 1 0 8H6" }],
    ["line", { x1: "4", x2: "20", y1: "12", y2: "12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bg = [
  "svg",
  a,
  [
    ["path", { d: "m4 5 8 8" }],
    ["path", { d: "m12 5-8 8" }],
    [
      "path",
      {
        d: "M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rg = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "4" }],
    ["path", { d: "M12 4h.01" }],
    ["path", { d: "M20 12h.01" }],
    ["path", { d: "M12 20h.01" }],
    ["path", { d: "M4 12h.01" }],
    ["path", { d: "M17.657 6.343h.01" }],
    ["path", { d: "M17.657 17.657h.01" }],
    ["path", { d: "M6.343 17.657h.01" }],
    ["path", { d: "M6.343 6.343h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Og = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "4" }],
    ["path", { d: "M12 3v1" }],
    ["path", { d: "M12 20v1" }],
    ["path", { d: "M3 12h1" }],
    ["path", { d: "M20 12h1" }],
    ["path", { d: "m18.364 5.636-.707.707" }],
    ["path", { d: "m6.343 17.657-.707.707" }],
    ["path", { d: "m5.636 5.636.707.707" }],
    ["path", { d: "m17.657 17.657.707.707" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qg = [
  "svg",
  a,
  [
    ["path", { d: "M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4" }],
    ["path", { d: "M12 2v2" }],
    ["path", { d: "M12 20v2" }],
    ["path", { d: "m4.9 4.9 1.4 1.4" }],
    ["path", { d: "m17.7 17.7 1.4 1.4" }],
    ["path", { d: "M2 12h2" }],
    ["path", { d: "M20 12h2" }],
    ["path", { d: "m6.3 17.7-1.4 1.4" }],
    ["path", { d: "m19.1 4.9-1.4 1.4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ug = [
  "svg",
  a,
  [
    ["path", { d: "M10 9a3 3 0 1 0 0 6" }],
    ["path", { d: "M2 12h1" }],
    ["path", { d: "M14 21V3" }],
    ["path", { d: "M10 4V3" }],
    ["path", { d: "M10 21v-1" }],
    ["path", { d: "m3.64 18.36.7-.7" }],
    ["path", { d: "m4.34 6.34-.7-.7" }],
    ["path", { d: "M14 12h8" }],
    ["path", { d: "m17 4-3 3" }],
    ["path", { d: "m14 17 3 3" }],
    ["path", { d: "m21 15-3-3 3-3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _g = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "4" }],
    ["path", { d: "M12 2v2" }],
    ["path", { d: "M12 20v2" }],
    ["path", { d: "m4.93 4.93 1.41 1.41" }],
    ["path", { d: "m17.66 17.66 1.41 1.41" }],
    ["path", { d: "M2 12h2" }],
    ["path", { d: "M20 12h2" }],
    ["path", { d: "m6.34 17.66-1.41 1.41" }],
    ["path", { d: "m19.07 4.93-1.41 1.41" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Eg = [
  "svg",
  a,
  [
    ["path", { d: "M12 2v8" }],
    ["path", { d: "m4.93 10.93 1.41 1.41" }],
    ["path", { d: "M2 18h2" }],
    ["path", { d: "M20 18h2" }],
    ["path", { d: "m19.07 10.93-1.41 1.41" }],
    ["path", { d: "M22 22H2" }],
    ["path", { d: "m8 6 4-4 4 4" }],
    ["path", { d: "M16 18a4 4 0 0 0-8 0" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ng = [
  "svg",
  a,
  [
    ["path", { d: "M12 10V2" }],
    ["path", { d: "m4.93 10.93 1.41 1.41" }],
    ["path", { d: "M2 18h2" }],
    ["path", { d: "M20 18h2" }],
    ["path", { d: "m19.07 10.93-1.41 1.41" }],
    ["path", { d: "M22 22H2" }],
    ["path", { d: "m16 6-4 4-4-4" }],
    ["path", { d: "M16 18a4 4 0 0 0-8 0" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ig = [
  "svg",
  a,
  [
    ["path", { d: "m4 19 8-8" }],
    ["path", { d: "m12 19-8-8" }],
    [
      "path",
      {
        d: "M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gg = [
  "svg",
  a,
  [
    ["path", { d: "M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z" }],
    ["path", { d: "M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7" }],
    ["path", { d: "M 7 17h.01" }],
    [
      "path",
      { d: "m11 8 2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8" }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xg = [
  "svg",
  a,
  [
    ["path", { d: "M10 21V3h8" }],
    ["path", { d: "M6 16h9" }],
    ["path", { d: "M10 9.5h7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wg = [
  "svg",
  a,
  [
    ["path", { d: "M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" }],
    ["path", { d: "M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5" }],
    ["circle", { cx: "12", cy: "12", r: "3" }],
    ["path", { d: "m18 22-3-3 3-3" }],
    ["path", { d: "m6 2 3 3-3 3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $g = [
  "svg",
  a,
  [
    ["polyline", { points: "14.5 17.5 3 6 3 3 6 3 17.5 14.5" }],
    ["line", { x1: "13", x2: "19", y1: "19", y2: "13" }],
    ["line", { x1: "16", x2: "20", y1: "16", y2: "20" }],
    ["line", { x1: "19", x2: "21", y1: "21", y2: "19" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kg = [
  "svg",
  a,
  [
    ["polyline", { points: "14.5 17.5 3 6 3 3 6 3 17.5 14.5" }],
    ["line", { x1: "13", x2: "19", y1: "19", y2: "13" }],
    ["line", { x1: "16", x2: "20", y1: "16", y2: "20" }],
    ["line", { x1: "19", x2: "21", y1: "21", y2: "19" }],
    ["polyline", { points: "14.5 6.5 18 3 21 3 21 6 17.5 9.5" }],
    ["line", { x1: "5", x2: "9", y1: "14", y2: "18" }],
    ["line", { x1: "7", x2: "4", y1: "17", y2: "20" }],
    ["line", { x1: "3", x2: "5", y1: "19", y2: "21" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jg = [
  "svg",
  a,
  [
    ["path", { d: "m18 2 4 4" }],
    ["path", { d: "m17 7 3-3" }],
    ["path", { d: "M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" }],
    ["path", { d: "m9 11 4 4" }],
    ["path", { d: "m5 19-3 3" }],
    ["path", { d: "m14 4 6 6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qg = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yg = [
  "svg",
  a,
  [
    ["path", { d: "M12 21v-6" }],
    ["path", { d: "M12 9V3" }],
    ["path", { d: "M3 15h18" }],
    ["path", { d: "M3 9h18" }],
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jg = [
  "svg",
  a,
  [
    ["path", { d: "M12 15V9" }],
    ["path", { d: "M3 15h18" }],
    ["path", { d: "M3 9h18" }],
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ax = [
  "svg",
  a,
  [
    ["path", { d: "M14 14v2" }],
    ["path", { d: "M14 20v2" }],
    ["path", { d: "M14 2v2" }],
    ["path", { d: "M14 8v2" }],
    ["path", { d: "M2 15h8" }],
    ["path", { d: "M2 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2" }],
    ["path", { d: "M2 9h8" }],
    ["path", { d: "M22 15h-4" }],
    ["path", { d: "M22 3h-2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2" }],
    ["path", { d: "M22 9h-4" }],
    ["path", { d: "M5 3v18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tx = [
  "svg",
  a,
  [
    ["path", { d: "M16 12H3" }],
    ["path", { d: "M16 18H3" }],
    ["path", { d: "M16 6H3" }],
    ["path", { d: "M21 12h.01" }],
    ["path", { d: "M21 18h.01" }],
    ["path", { d: "M21 6h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hx = [
  "svg",
  a,
  [
    ["path", { d: "M15 3v18" }],
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M21 9H3" }],
    ["path", { d: "M21 15H3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dx = [
  "svg",
  a,
  [
    ["path", { d: "M14 10h2" }],
    ["path", { d: "M15 22v-8" }],
    ["path", { d: "M15 2v4" }],
    ["path", { d: "M2 10h2" }],
    ["path", { d: "M20 10h2" }],
    ["path", { d: "M3 19h18" }],
    ["path", { d: "M3 22v-6a2 2 135 0 1 2-2h14a2 2 45 0 1 2 2v6" }],
    ["path", { d: "M3 2v2a2 2 45 0 0 2 2h14a2 2 135 0 0 2-2V2" }],
    ["path", { d: "M8 10h2" }],
    ["path", { d: "M9 22v-8" }],
    ["path", { d: "M9 2v4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const px = [
  "svg",
  a,
  [
    ["path", { d: "M12 3v18" }],
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M3 9h18" }],
    ["path", { d: "M3 15h18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cx = [
  "svg",
  a,
  [
    ["rect", { width: "10", height: "14", x: "3", y: "8", rx: "2" }],
    ["path", { d: "M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4" }],
    ["path", { d: "M8 18h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ex = [
  "svg",
  a,
  [
    ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", ry: "2" }],
    ["line", { x1: "12", x2: "12.01", y1: "18", y2: "18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sx = [
  "svg",
  a,
  [
    ["circle", { cx: "7", cy: "7", r: "5" }],
    ["circle", { cx: "17", cy: "17", r: "5" }],
    ["path", { d: "M12 17h10" }],
    ["path", { d: "m3.46 10.54 7.08-7.08" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mx = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"
      }
    ],
    ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rx = [
  "svg",
  a,
  [
    ["path", { d: "m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19" }],
    [
      "path",
      {
        d: "M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z"
      }
    ],
    ["circle", { cx: "6.5", cy: "9.5", r: ".5", fill: "currentColor" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nx = ["svg", a, [["path", { d: "M4 4v16" }]]];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vx = [
  "svg",
  a,
  [
    ["path", { d: "M4 4v16" }],
    ["path", { d: "M9 4v16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ox = [
  "svg",
  a,
  [
    ["path", { d: "M4 4v16" }],
    ["path", { d: "M9 4v16" }],
    ["path", { d: "M14 4v16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ix = [
  "svg",
  a,
  [
    ["path", { d: "M4 4v16" }],
    ["path", { d: "M9 4v16" }],
    ["path", { d: "M14 4v16" }],
    ["path", { d: "M19 4v16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lx = [
  "svg",
  a,
  [
    ["path", { d: "M4 4v16" }],
    ["path", { d: "M9 4v16" }],
    ["path", { d: "M14 4v16" }],
    ["path", { d: "M19 4v16" }],
    ["path", { d: "M22 6 2 18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gx = [
  "svg",
  a,
  [
    ["circle", { cx: "17", cy: "4", r: "2" }],
    ["path", { d: "M15.59 5.41 5.41 15.59" }],
    ["circle", { cx: "4", cy: "17", r: "2" }],
    ["path", { d: "M12 22s-4-9-1.5-11.5S22 12 22 12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xx = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["circle", { cx: "12", cy: "12", r: "6" }],
    ["circle", { cx: "12", cy: "12", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yx = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44"
      }
    ],
    ["path", { d: "m13.56 11.747 4.332-.924" }],
    ["path", { d: "m16 21-3.105-6.21" }],
    [
      "path",
      {
        d: "M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z"
      }
    ],
    ["path", { d: "m6.158 8.633 1.114 4.456" }],
    ["path", { d: "m8 21 3.105-6.21" }],
    ["circle", { cx: "12", cy: "13", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mx = [
  "svg",
  a,
  [
    ["circle", { cx: "4", cy: "4", r: "2" }],
    ["path", { d: "m14 5 3-3 3 3" }],
    ["path", { d: "m14 10 3-3 3 3" }],
    ["path", { d: "M17 14V2" }],
    ["path", { d: "M17 14H7l-5 8h20Z" }],
    ["path", { d: "M8 14v8" }],
    ["path", { d: "m9 14 5 8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hx = [
  "svg",
  a,
  [
    ["path", { d: "M3.5 21 14 3" }],
    ["path", { d: "M20.5 21 10 3" }],
    ["path", { d: "M15.5 21 12 15l-3.5 6" }],
    ["path", { d: "M2 21h20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ux = [
  "svg",
  a,
  [
    ["polyline", { points: "4 17 10 11 4 5" }],
    ["line", { x1: "12", x2: "20", y1: "19", y2: "19" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const na = [
  "svg",
  a,
  [
    ["path", { d: "M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4L17 3" }],
    ["path", { d: "m16 2 6 6" }],
    ["path", { d: "M12 16H4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vx = [
  "svg",
  a,
  [
    ["path", { d: "M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2" }],
    ["path", { d: "M8.5 2h7" }],
    ["path", { d: "M14.5 16h-5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wx = [
  "svg",
  a,
  [
    ["path", { d: "M9 2v17.5A2.5 2.5 0 0 1 6.5 22A2.5 2.5 0 0 1 4 19.5V2" }],
    ["path", { d: "M20 2v17.5a2.5 2.5 0 0 1-2.5 2.5a2.5 2.5 0 0 1-2.5-2.5V2" }],
    ["path", { d: "M3 2h7" }],
    ["path", { d: "M14 2h7" }],
    ["path", { d: "M9 16H4" }],
    ["path", { d: "M20 16h-5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cx = [
  "svg",
  a,
  [
    ["path", { d: "M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1" }],
    ["path", { d: "M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5" }],
    ["path", { d: "M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1" }],
    ["path", { d: "M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7" }],
    ["path", { d: "M9 7v10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ax = [
  "svg",
  a,
  [
    ["path", { d: "M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1" }],
    ["path", { d: "M7 22h1a4 4 0 0 0 4-4v-1" }],
    ["path", { d: "M7 2h1a4 4 0 0 1 4 4v1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fx = [
  "svg",
  a,
  [
    ["path", { d: "M17 6H3" }],
    ["path", { d: "M21 12H8" }],
    ["path", { d: "M21 18H8" }],
    ["path", { d: "M3 12v6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lx = [
  "svg",
  a,
  [
    ["path", { d: "M21 6H3" }],
    ["path", { d: "M10 12H3" }],
    ["path", { d: "M10 18H3" }],
    ["circle", { cx: "17", cy: "15", r: "3" }],
    ["path", { d: "m21 19-1.9-1.9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const va = [
  "svg",
  a,
  [
    ["path", { d: "M5 3a2 2 0 0 0-2 2" }],
    ["path", { d: "M19 3a2 2 0 0 1 2 2" }],
    ["path", { d: "M21 19a2 2 0 0 1-2 2" }],
    ["path", { d: "M5 21a2 2 0 0 1-2-2" }],
    ["path", { d: "M9 3h1" }],
    ["path", { d: "M9 21h1" }],
    ["path", { d: "M14 3h1" }],
    ["path", { d: "M14 21h1" }],
    ["path", { d: "M3 9v1" }],
    ["path", { d: "M21 9v1" }],
    ["path", { d: "M3 14v1" }],
    ["path", { d: "M21 14v1" }],
    ["line", { x1: "7", x2: "15", y1: "8", y2: "8" }],
    ["line", { x1: "7", x2: "17", y1: "12", y2: "12" }],
    ["line", { x1: "7", x2: "13", y1: "16", y2: "16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sx = [
  "svg",
  a,
  [
    ["path", { d: "M17 6.1H3" }],
    ["path", { d: "M21 12.1H3" }],
    ["path", { d: "M15.1 18H3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zx = [
  "svg",
  a,
  [
    ["path", { d: "M2 10s3-3 3-8" }],
    ["path", { d: "M22 10s-3-3-3-8" }],
    ["path", { d: "M10 2c0 4.4-3.6 8-8 8" }],
    ["path", { d: "M14 2c0 4.4 3.6 8 8 8" }],
    ["path", { d: "M2 10s2 2 2 5" }],
    ["path", { d: "M22 10s-2 2-2 5" }],
    ["path", { d: "M8 15h8" }],
    ["path", { d: "M2 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" }],
    ["path", { d: "M14 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kx = [
  "svg",
  a,
  [
    ["path", { d: "M2 12h10" }],
    ["path", { d: "M9 4v16" }],
    ["path", { d: "m3 9 3 3-3 3" }],
    ["path", { d: "M12 6 9 9 6 6" }],
    ["path", { d: "m6 18 3-3 1.5 1.5" }],
    ["path", { d: "M20 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Px = [
  "svg",
  a,
  [
    ["path", { d: "M12 9a4 4 0 0 0-2 7.5" }],
    ["path", { d: "M12 3v2" }],
    ["path", { d: "m6.6 18.4-1.4 1.4" }],
    ["path", { d: "M20 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" }],
    ["path", { d: "M4 13H2" }],
    ["path", { d: "M6.34 7.34 4.93 5.93" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zx = [
  "svg",
  a,
  [["path", { d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bx = [
  "svg",
  a,
  [
    ["path", { d: "M17 14V2" }],
    [
      "path",
      {
        d: "M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tx = [
  "svg",
  a,
  [
    ["path", { d: "M7 10v12" }],
    [
      "path",
      {
        d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dx = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
      }
    ],
    ["path", { d: "m9 12 2 2 4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fx = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
      }
    ],
    ["path", { d: "M9 12h6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bx = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M2 9a3 3 0 1 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 1 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
      }
    ],
    ["path", { d: "M9 9h.01" }],
    ["path", { d: "m15 9-6 6" }],
    ["path", { d: "M15 15h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rx = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
      }
    ],
    ["path", { d: "M9 12h6" }],
    ["path", { d: "M12 9v6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ox = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
      }
    ],
    ["path", { d: "m9.5 14.5 5-5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qx = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
      }
    ],
    ["path", { d: "m9.5 14.5 5-5" }],
    ["path", { d: "m9.5 9.5 5 5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ux = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
      }
    ],
    ["path", { d: "M13 5v2" }],
    ["path", { d: "M13 17v2" }],
    ["path", { d: "M13 11v2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _x = [
  "svg",
  a,
  [
    ["path", { d: "M10.5 17h1.227a2 2 0 0 0 1.345-.52L18 12" }],
    ["path", { d: "m12 13.5 3.75.5" }],
    ["path", { d: "m4.5 8 10.58-5.06a1 1 0 0 1 1.342.488L18.5 8" }],
    ["path", { d: "M6 10V8" }],
    ["path", { d: "M6 14v1" }],
    ["path", { d: "M6 19v2" }],
    ["rect", { x: "2", y: "8", width: "20", height: "13", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ex = [
  "svg",
  a,
  [
    ["path", { d: "m4.5 8 10.58-5.06a1 1 0 0 1 1.342.488L18.5 8" }],
    ["path", { d: "M6 10V8" }],
    ["path", { d: "M6 14v1" }],
    ["path", { d: "M6 19v2" }],
    ["rect", { x: "2", y: "8", width: "20", height: "13", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nx = [
  "svg",
  a,
  [
    ["path", { d: "M10 2h4" }],
    ["path", { d: "M4.6 11a8 8 0 0 0 1.7 8.7 8 8 0 0 0 8.7 1.7" }],
    ["path", { d: "M7.4 7.4a8 8 0 0 1 10.3 1 8 8 0 0 1 .9 10.2" }],
    ["path", { d: "m2 2 20 20" }],
    ["path", { d: "M12 12v-2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ix = [
  "svg",
  a,
  [
    ["path", { d: "M10 2h4" }],
    ["path", { d: "M12 14v-4" }],
    ["path", { d: "M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6" }],
    ["path", { d: "M9 17H4v5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gx = [
  "svg",
  a,
  [
    ["line", { x1: "10", x2: "14", y1: "2", y2: "2" }],
    ["line", { x1: "12", x2: "15", y1: "14", y2: "11" }],
    ["circle", { cx: "12", cy: "14", r: "8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xx = [
  "svg",
  a,
  [
    ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "6", ry: "6" }],
    ["circle", { cx: "8", cy: "12", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wx = [
  "svg",
  a,
  [
    ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "6", ry: "6" }],
    ["circle", { cx: "16", cy: "12", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $x = [
  "svg",
  a,
  [
    ["path", { d: "M21 4H3" }],
    ["path", { d: "M18 8H6" }],
    ["path", { d: "M19 12H9" }],
    ["path", { d: "M16 16h-6" }],
    ["path", { d: "M11 20H9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kx = [
  "svg",
  a,
  [
    ["ellipse", { cx: "12", cy: "11", rx: "3", ry: "2" }],
    ["ellipse", { cx: "12", cy: "12.5", rx: "10", ry: "8.5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jx = [
  "svg",
  a,
  [
    ["path", { d: "M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16" }],
    ["path", { d: "M2 14h12" }],
    ["path", { d: "M22 14h-2" }],
    ["path", { d: "M12 20v-6" }],
    ["path", { d: "m2 2 20 20" }],
    ["path", { d: "M22 16V6a2 2 0 0 0-2-2H10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qx = [
  "svg",
  a,
  [
    ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }],
    ["path", { d: "M2 14h20" }],
    ["path", { d: "M12 20v-6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yx = [
  "svg",
  a,
  [
    ["path", { d: "M18.2 12.27 20 6H4l1.8 6.27a1 1 0 0 0 .95.73h10.5a1 1 0 0 0 .96-.73Z" }],
    ["path", { d: "M8 13v9" }],
    ["path", { d: "M16 22v-9" }],
    ["path", { d: "m9 6 1 7" }],
    ["path", { d: "m15 6-1 7" }],
    ["path", { d: "M12 6V2" }],
    ["path", { d: "M13 2h-2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jx = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "12", x: "3", y: "8", rx: "1" }],
    ["path", { d: "M10 8V5c0-.6-.4-1-1-1H6a1 1 0 0 0-1 1v3" }],
    ["path", { d: "M19 8V5c0-.6-.4-1-1-1h-3a1 1 0 0 0-1 1v3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ay = [
  "svg",
  a,
  [
    ["path", { d: "m10 11 11 .9a1 1 0 0 1 .8 1.1l-.665 4.158a1 1 0 0 1-.988.842H20" }],
    ["path", { d: "M16 18h-5" }],
    ["path", { d: "M18 5a1 1 0 0 0-1 1v5.573" }],
    ["path", { d: "M3 4h8.129a1 1 0 0 1 .99.863L13 11.246" }],
    ["path", { d: "M4 11V4" }],
    ["path", { d: "M7 15h.01" }],
    ["path", { d: "M8 10.1V4" }],
    ["circle", { cx: "18", cy: "18", r: "2" }],
    ["circle", { cx: "7", cy: "15", r: "5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ty = [
  "svg",
  a,
  [
    ["path", { d: "M9.3 6.2a4.55 4.55 0 0 0 5.4 0" }],
    ["path", { d: "M7.9 10.7c.9.8 2.4 1.3 4.1 1.3s3.2-.5 4.1-1.3" }],
    [
      "path",
      {
        d: "M13.9 3.5a1.93 1.93 0 0 0-3.8-.1l-3 10c-.1.2-.1.4-.1.6 0 1.7 2.2 3 5 3s5-1.3 5-3c0-.2 0-.4-.1-.5Z"
      }
    ],
    [
      "path",
      {
        d: "m7.5 12.2-4.7 2.7c-.5.3-.8.7-.8 1.1s.3.8.8 1.1l7.6 4.5c.9.5 2.1.5 3 0l7.6-4.5c.7-.3 1-.7 1-1.1s-.3-.8-.8-1.1l-4.7-2.8"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hy = [
  "svg",
  a,
  [
    ["path", { d: "M2 22V12a10 10 0 1 1 20 0v10" }],
    ["path", { d: "M15 6.8v1.4a3 2.8 0 1 1-6 0V6.8" }],
    ["path", { d: "M10 15h.01" }],
    ["path", { d: "M14 15h.01" }],
    ["path", { d: "M10 19a4 4 0 0 1-4-4v-3a6 6 0 1 1 12 0v3a4 4 0 0 1-4 4Z" }],
    ["path", { d: "m9 19-2 3" }],
    ["path", { d: "m15 19 2 3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dy = [
  "svg",
  a,
  [
    ["path", { d: "M8 3.1V7a4 4 0 0 0 8 0V3.1" }],
    ["path", { d: "m9 15-1-1" }],
    ["path", { d: "m15 15 1-1" }],
    ["path", { d: "M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z" }],
    ["path", { d: "m8 19-2 3" }],
    ["path", { d: "m16 19 2 3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const py = [
  "svg",
  a,
  [
    ["path", { d: "M2 17 17 2" }],
    ["path", { d: "m2 14 8 8" }],
    ["path", { d: "m5 11 8 8" }],
    ["path", { d: "m8 8 8 8" }],
    ["path", { d: "m11 5 8 8" }],
    ["path", { d: "m14 2 8 8" }],
    ["path", { d: "M7 22 22 7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oa = [
  "svg",
  a,
  [
    ["rect", { width: "16", height: "16", x: "4", y: "3", rx: "2" }],
    ["path", { d: "M4 11h16" }],
    ["path", { d: "M12 3v8" }],
    ["path", { d: "m8 19-2 3" }],
    ["path", { d: "m18 22-2-3" }],
    ["path", { d: "M8 15h.01" }],
    ["path", { d: "M16 15h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cy = [
  "svg",
  a,
  [
    ["path", { d: "M3 6h18" }],
    ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }],
    ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }],
    ["line", { x1: "10", x2: "10", y1: "11", y2: "17" }],
    ["line", { x1: "14", x2: "14", y1: "11", y2: "17" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ey = [
  "svg",
  a,
  [
    ["path", { d: "M3 6h18" }],
    ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }],
    ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sy = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M8 19a4 4 0 0 1-2.24-7.32A3.5 3.5 0 0 1 9 6.03V6a3 3 0 1 1 6 0v.04a3.5 3.5 0 0 1 3.24 5.65A4 4 0 0 1 16 19Z"
      }
    ],
    ["path", { d: "M12 19v3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ia = [
  "svg",
  a,
  [
    ["path", { d: "M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4" }],
    ["path", { d: "M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3" }],
    [
      "path",
      {
        d: "M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35"
      }
    ],
    ["path", { d: "M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const My = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z"
      }
    ],
    ["path", { d: "M12 22v-3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ry = [
  "svg",
  a,
  [
    ["path", { d: "M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" }],
    ["path", { d: "M7 16v6" }],
    ["path", { d: "M13 19v3" }],
    [
      "path",
      {
        d: "M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ny = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }],
    ["rect", { width: "3", height: "9", x: "7", y: "7" }],
    ["rect", { width: "3", height: "5", x: "14", y: "7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vy = [
  "svg",
  a,
  [
    ["polyline", { points: "22 17 13.5 8.5 8.5 13.5 2 7" }],
    ["polyline", { points: "16 17 22 17 22 11" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oy = [
  "svg",
  a,
  [
    ["path", { d: "M14.828 14.828 21 21" }],
    ["path", { d: "M21 16v5h-5" }],
    ["path", { d: "m21 3-9 9-4-4-6 6" }],
    ["path", { d: "M21 8V3h-5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const iy = [
  "svg",
  a,
  [
    ["polyline", { points: "22 7 13.5 15.5 8.5 10.5 2 17" }],
    ["polyline", { points: "16 7 22 7 22 13" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const la = [
  "svg",
  a,
  [
    ["path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" }],
    ["path", { d: "M12 9v4" }],
    ["path", { d: "M12 17h.01" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ly = [
  "svg",
  a,
  [["path", { d: "M22 18a2 2 0 0 1-2 2H3c-1.1 0-1.3-.6-.4-1.3L20.4 4.3c.9-.7 1.6-.4 1.6.7Z" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gy = [
  "svg",
  a,
  [["path", { d: "M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xy = [
  "svg",
  a,
  [
    ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6" }],
    ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18" }],
    ["path", { d: "M4 22h16" }],
    ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" }],
    ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" }],
    ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yy = [
  "svg",
  a,
  [
    ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" }],
    ["path", { d: "M15 18H9" }],
    [
      "path",
      { d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" }
    ],
    ["circle", { cx: "17", cy: "18", r: "2" }],
    ["circle", { cx: "7", cy: "18", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const my = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z"
      }
    ],
    ["path", { d: "M4.82 7.9 8 10" }],
    ["path", { d: "M15.18 7.9 12 10" }],
    ["path", { d: "M16.93 10H20a2 2 0 0 1 0 4H2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hy = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25a.75.75 0 0 1-1.142-.64z"
      }
    ],
    ["path", { d: "M7 21h10" }],
    ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ga = [
  "svg",
  a,
  [
    ["path", { d: "M7 21h10" }],
    ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const uy = [
  "svg",
  a,
  [
    ["rect", { width: "20", height: "15", x: "2", y: "7", rx: "2", ry: "2" }],
    ["polyline", { points: "17 2 12 7 7 2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vy = [
  "svg",
  a,
  [["path", { d: "M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wy = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cy = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M14 16.5a.5.5 0 0 0 .5.5h.5a2 2 0 0 1 0 4H9a2 2 0 0 1 0-4h.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V8a2 2 0 0 1-4 0V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-4 0v-.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ay = [
  "svg",
  a,
  [
    ["polyline", { points: "4 7 4 4 20 4 20 7" }],
    ["line", { x1: "9", x2: "15", y1: "20", y2: "20" }],
    ["line", { x1: "12", x2: "12", y1: "4", y2: "20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fy = [
  "svg",
  a,
  [
    ["path", { d: "M12 2v1" }],
    ["path", { d: "M15.5 21a1.85 1.85 0 0 1-3.5-1v-8H2a10 10 0 0 1 3.428-6.575" }],
    ["path", { d: "M17.5 12H22A10 10 0 0 0 9.004 3.455" }],
    ["path", { d: "m2 2 20 20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ly = [
  "svg",
  a,
  [
    ["path", { d: "M22 12a10.06 10.06 1 0 0-20 0Z" }],
    ["path", { d: "M12 12v8a2 2 0 0 0 4 0" }],
    ["path", { d: "M12 2v1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sy = [
  "svg",
  a,
  [
    ["path", { d: "M6 4v6a6 6 0 0 0 12 0V4" }],
    ["line", { x1: "4", x2: "20", y1: "20", y2: "20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zy = [
  "svg",
  a,
  [
    ["path", { d: "M9 14 4 9l5-5" }],
    ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ky = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "17", r: "1" }],
    ["path", { d: "M3 7v6h6" }],
    ["path", { d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Py = [
  "svg",
  a,
  [
    ["path", { d: "M3 7v6h6" }],
    ["path", { d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zy = [
  "svg",
  a,
  [
    ["path", { d: "M16 12h6" }],
    ["path", { d: "M8 12H2" }],
    ["path", { d: "M12 2v2" }],
    ["path", { d: "M12 8v2" }],
    ["path", { d: "M12 14v2" }],
    ["path", { d: "M12 20v2" }],
    ["path", { d: "m19 15 3-3-3-3" }],
    ["path", { d: "m5 9-3 3 3 3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const By = [
  "svg",
  a,
  [
    ["path", { d: "M12 22v-6" }],
    ["path", { d: "M12 8V2" }],
    ["path", { d: "M4 12H2" }],
    ["path", { d: "M10 12H8" }],
    ["path", { d: "M16 12h-2" }],
    ["path", { d: "M22 12h-2" }],
    ["path", { d: "m15 19-3 3-3-3" }],
    ["path", { d: "m15 5-3-3-3 3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ty = [
  "svg",
  a,
  [
    ["rect", { width: "8", height: "6", x: "5", y: "4", rx: "1" }],
    ["rect", { width: "8", height: "6", x: "11", y: "14", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xa = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "10", r: "1" }],
    ["path", { d: "M22 20V8h-4l-6-4-6 4H2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2" }],
    ["path", { d: "M6 17v.01" }],
    ["path", { d: "M6 13v.01" }],
    ["path", { d: "M18 17v.01" }],
    ["path", { d: "M18 13v.01" }],
    ["path", { d: "M14 22v-5a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dy = [
  "svg",
  a,
  [["path", { d: "M15 7h2a5 5 0 0 1 0 10h-2m-6 0H7A5 5 0 0 1 7 7h2" }]]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fy = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71"
      }
    ],
    [
      "path",
      { d: "m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71" }
    ],
    ["line", { x1: "8", x2: "8", y1: "2", y2: "5" }],
    ["line", { x1: "2", x2: "5", y1: "8", y2: "8" }],
    ["line", { x1: "16", x2: "16", y1: "19", y2: "22" }],
    ["line", { x1: "19", x2: "22", y1: "16", y2: "16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const by = [
  "svg",
  a,
  [
    ["path", { d: "m19 5 3-3" }],
    ["path", { d: "m2 22 3-3" }],
    ["path", { d: "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z" }],
    ["path", { d: "M7.5 13.5 10 11" }],
    ["path", { d: "M10.5 16.5 13 14" }],
    ["path", { d: "m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ry = [
  "svg",
  a,
  [
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }],
    ["polyline", { points: "17 8 12 3 7 8" }],
    ["line", { x1: "12", x2: "12", y1: "3", y2: "15" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Oy = [
  "svg",
  a,
  [
    ["circle", { cx: "10", cy: "7", r: "1" }],
    ["circle", { cx: "4", cy: "20", r: "1" }],
    ["path", { d: "M4.7 19.3 19 5" }],
    ["path", { d: "m21 3-3 1 2 2Z" }],
    ["path", { d: "M9.26 7.68 5 12l2 5" }],
    ["path", { d: "m10 14 5 2 3.5-3.5" }],
    ["path", { d: "m18 12 1-1 1 1-1 1Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qy = [
  "svg",
  a,
  [
    ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
    ["circle", { cx: "9", cy: "7", r: "4" }],
    ["polyline", { points: "16 11 18 13 22 9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Uy = [
  "svg",
  a,
  [
    ["circle", { cx: "18", cy: "15", r: "3" }],
    ["circle", { cx: "9", cy: "7", r: "4" }],
    ["path", { d: "M10 15H6a4 4 0 0 0-4 4v2" }],
    ["path", { d: "m21.7 16.4-.9-.3" }],
    ["path", { d: "m15.2 13.9-.9-.3" }],
    ["path", { d: "m16.6 18.7.3-.9" }],
    ["path", { d: "m19.1 12.2.3-.9" }],
    ["path", { d: "m19.6 18.7-.4-1" }],
    ["path", { d: "m16.8 12.3-.4-1" }],
    ["path", { d: "m14.3 16.6 1-.4" }],
    ["path", { d: "m20.7 13.8 1-.4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _y = [
  "svg",
  a,
  [
    ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
    ["circle", { cx: "9", cy: "7", r: "4" }],
    ["line", { x1: "22", x2: "16", y1: "11", y2: "11" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ey = [
  "svg",
  a,
  [
    ["path", { d: "M11.5 15H7a4 4 0 0 0-4 4v2" }],
    [
      "path",
      {
        d: "M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
      }
    ],
    ["circle", { cx: "10", cy: "7", r: "4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ny = [
  "svg",
  a,
  [
    ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
    ["circle", { cx: "9", cy: "7", r: "4" }],
    ["line", { x1: "19", x2: "19", y1: "8", y2: "14" }],
    ["line", { x1: "22", x2: "16", y1: "11", y2: "11" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ya = [
  "svg",
  a,
  [
    ["path", { d: "M2 21a8 8 0 0 1 13.292-6" }],
    ["circle", { cx: "10", cy: "8", r: "5" }],
    ["path", { d: "m16 19 2 2 4-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ma = [
  "svg",
  a,
  [
    ["path", { d: "M2 21a8 8 0 0 1 10.434-7.62" }],
    ["circle", { cx: "10", cy: "8", r: "5" }],
    ["circle", { cx: "18", cy: "18", r: "3" }],
    ["path", { d: "m19.5 14.3-.4.9" }],
    ["path", { d: "m16.9 20.8-.4.9" }],
    ["path", { d: "m21.7 19.5-.9-.4" }],
    ["path", { d: "m15.2 16.9-.9-.4" }],
    ["path", { d: "m21.7 16.5-.9.4" }],
    ["path", { d: "m15.2 19.1-.9.4" }],
    ["path", { d: "m19.5 21.7-.4-.9" }],
    ["path", { d: "m16.9 15.2-.4-.9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ha = [
  "svg",
  a,
  [
    ["path", { d: "M2 21a8 8 0 0 1 13.292-6" }],
    ["circle", { cx: "10", cy: "8", r: "5" }],
    ["path", { d: "M22 19h-6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Iy = [
  "svg",
  a,
  [
    ["path", { d: "M2 21a8 8 0 0 1 10.821-7.487" }],
    [
      "path",
      {
        d: "M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
      }
    ],
    ["circle", { cx: "10", cy: "8", r: "5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ua = [
  "svg",
  a,
  [
    ["path", { d: "M2 21a8 8 0 0 1 13.292-6" }],
    ["circle", { cx: "10", cy: "8", r: "5" }],
    ["path", { d: "M19 16v6" }],
    ["path", { d: "M22 19h-6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gy = [
  "svg",
  a,
  [
    ["circle", { cx: "10", cy: "8", r: "5" }],
    ["path", { d: "M2 21a8 8 0 0 1 10.434-7.62" }],
    ["circle", { cx: "18", cy: "18", r: "3" }],
    ["path", { d: "m22 22-1.9-1.9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Va = [
  "svg",
  a,
  [
    ["path", { d: "M2 21a8 8 0 0 1 11.873-7" }],
    ["circle", { cx: "10", cy: "8", r: "5" }],
    ["path", { d: "m17 17 5 5" }],
    ["path", { d: "m22 17-5 5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wa = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "8", r: "5" }],
    ["path", { d: "M20 21a8 8 0 0 0-16 0" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xy = [
  "svg",
  a,
  [
    ["circle", { cx: "10", cy: "7", r: "4" }],
    ["path", { d: "M10.3 15H7a4 4 0 0 0-4 4v2" }],
    ["circle", { cx: "17", cy: "17", r: "3" }],
    ["path", { d: "m21 21-1.9-1.9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wy = [
  "svg",
  a,
  [
    ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
    ["circle", { cx: "9", cy: "7", r: "4" }],
    ["line", { x1: "17", x2: "22", y1: "8", y2: "13" }],
    ["line", { x1: "22", x2: "17", y1: "8", y2: "13" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $y = [
  "svg",
  a,
  [
    ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }],
    ["circle", { cx: "12", cy: "7", r: "4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ca = [
  "svg",
  a,
  [
    ["path", { d: "M18 21a8 8 0 0 0-16 0" }],
    ["circle", { cx: "10", cy: "8", r: "5" }],
    ["path", { d: "M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ky = [
  "svg",
  a,
  [
    ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
    ["circle", { cx: "9", cy: "7", r: "4" }],
    ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }],
    ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Aa = [
  "svg",
  a,
  [
    ["path", { d: "m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" }],
    ["path", { d: "M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" }],
    ["path", { d: "m2.1 21.8 6.4-6.3" }],
    ["path", { d: "m19 5-7 7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fa = [
  "svg",
  a,
  [
    ["path", { d: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" }],
    ["path", { d: "M7 2v20" }],
    ["path", { d: "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jy = [
  "svg",
  a,
  [
    ["path", { d: "M12 2v20" }],
    ["path", { d: "M2 5h20" }],
    ["path", { d: "M3 3v2" }],
    ["path", { d: "M7 3v2" }],
    ["path", { d: "M17 3v2" }],
    ["path", { d: "M21 3v2" }],
    ["path", { d: "m19 5-7 7-7-7" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qy = [
  "svg",
  a,
  [
    ["path", { d: "M8 21s-4-3-4-9 4-9 4-9" }],
    ["path", { d: "M16 3s4 3 4 9-4 9-4 9" }],
    ["line", { x1: "15", x2: "9", y1: "9", y2: "15" }],
    ["line", { x1: "9", x2: "15", y1: "9", y2: "15" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yy = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor" }],
    ["path", { d: "m7.9 7.9 2.7 2.7" }],
    ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor" }],
    ["path", { d: "m13.4 10.6 2.7-2.7" }],
    ["circle", { cx: "7.5", cy: "16.5", r: ".5", fill: "currentColor" }],
    ["path", { d: "m7.9 16.1 2.7-2.7" }],
    ["circle", { cx: "16.5", cy: "16.5", r: ".5", fill: "currentColor" }],
    ["path", { d: "m13.4 13.4 2.7 2.7" }],
    ["circle", { cx: "12", cy: "12", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jy = [
  "svg",
  a,
  [
    ["path", { d: "M2 2a26.6 26.6 0 0 1 10 20c.9-6.82 1.5-9.5 4-14" }],
    ["path", { d: "M16 8c4 0 6-2 6-6-4 0-6 2-6 6" }],
    ["path", { d: "M17.41 3.6a10 10 0 1 0 3 3" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const am = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7h-5a8 8 0 0 0-5 2 8 8 0 0 0-5-2H2Z"
      }
    ],
    ["path", { d: "M6 11c1.5 0 3 .5 3 2-2 0-3 0-3-2Z" }],
    ["path", { d: "M18 11c-1.5 0-3 .5-3 2 2 0 3 0 3-2Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tm = [
  "svg",
  a,
  [
    ["path", { d: "m2 8 2 2-2 2 2 2-2 2" }],
    ["path", { d: "m22 8-2 2 2 2-2 2 2 2" }],
    ["path", { d: "M8 8v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2" }],
    ["path", { d: "M16 10.34V6c0-.55-.45-1-1-1h-4.34" }],
    ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hm = [
  "svg",
  a,
  [
    ["path", { d: "m2 8 2 2-2 2 2 2-2 2" }],
    ["path", { d: "m22 8-2 2 2 2-2 2 2 2" }],
    ["rect", { width: "8", height: "14", x: "8", y: "5", rx: "1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dm = [
  "svg",
  a,
  [
    ["path", { d: "M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196" }],
    ["path", { d: "M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2" }],
    ["path", { d: "m2 2 20 20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pm = [
  "svg",
  a,
  [
    ["path", { d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" }],
    ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cm = [
  "svg",
  a,
  [
    ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }],
    ["path", { d: "M2 8h20" }],
    ["circle", { cx: "8", cy: "14", r: "2" }],
    ["path", { d: "M8 12h8" }],
    ["circle", { cx: "16", cy: "14", r: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const em = [
  "svg",
  a,
  [
    ["path", { d: "M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" }],
    ["path", { d: "M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" }],
    ["circle", { cx: "12", cy: "12", r: "1" }],
    [
      "path",
      {
        d: "M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sm = [
  "svg",
  a,
  [
    ["circle", { cx: "6", cy: "12", r: "4" }],
    ["circle", { cx: "18", cy: "12", r: "4" }],
    ["line", { x1: "6", x2: "18", y1: "16", y2: "16" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mm = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
      }
    ],
    ["path", { d: "M16 9a5 5 0 0 1 0 6" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rm = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
      }
    ],
    ["path", { d: "M16 9a5 5 0 0 1 0 6" }],
    ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nm = [
  "svg",
  a,
  [
    ["path", { d: "M16 9a5 5 0 0 1 .95 2.293" }],
    ["path", { d: "M19.364 5.636a9 9 0 0 1 1.889 9.96" }],
    ["path", { d: "m2 2 20 20" }],
    [
      "path",
      {
        d: "m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11"
      }
    ],
    ["path", { d: "M9.828 4.172A.686.686 0 0 1 11 4.657v.686" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vm = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
      }
    ],
    ["line", { x1: "22", x2: "16", y1: "9", y2: "15" }],
    ["line", { x1: "16", x2: "22", y1: "9", y2: "15" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const om = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const im = [
  "svg",
  a,
  [
    ["path", { d: "m9 12 2 2 4-4" }],
    ["path", { d: "M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z" }],
    ["path", { d: "M22 19H2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lm = [
  "svg",
  a,
  [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" }],
    [
      "path",
      { d: "M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21" }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const La = [
  "svg",
  a,
  [
    ["path", { d: "M17 14h.01" }],
    ["path", { d: "M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gm = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"
      }
    ],
    ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xm = [
  "svg",
  a,
  [
    ["circle", { cx: "8", cy: "9", r: "2" }],
    [
      "path",
      {
        d: "m9 17 6.1-6.1a2 2 0 0 1 2.81.01L22 15V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2"
      }
    ],
    ["path", { d: "M8 21h8" }],
    ["path", { d: "M12 17v4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sa = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"
      }
    ],
    ["path", { d: "m14 7 3 3" }],
    ["path", { d: "M5 6v4" }],
    ["path", { d: "M19 14v4" }],
    ["path", { d: "M10 2v2" }],
    ["path", { d: "M7 8H3" }],
    ["path", { d: "M21 16h-4" }],
    ["path", { d: "M11 3H9" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ym = [
  "svg",
  a,
  [
    ["path", { d: "M15 4V2" }],
    ["path", { d: "M15 16v-2" }],
    ["path", { d: "M8 9h2" }],
    ["path", { d: "M20 9h2" }],
    ["path", { d: "M17.8 11.8 19 13" }],
    ["path", { d: "M15 9h.01" }],
    ["path", { d: "M17.8 6.2 19 5" }],
    ["path", { d: "m3 21 9-9" }],
    ["path", { d: "M12.2 6.2 11 5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mm = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"
      }
    ],
    ["path", { d: "M6 18h12" }],
    ["path", { d: "M6 14h12" }],
    ["rect", { width: "12", height: "12", x: "6", y: "10" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hm = [
  "svg",
  a,
  [
    ["path", { d: "M3 6h3" }],
    ["path", { d: "M17 6h.01" }],
    ["rect", { width: "18", height: "20", x: "3", y: "2", rx: "2" }],
    ["circle", { cx: "12", cy: "13", r: "5" }],
    ["path", { d: "M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const um = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "12", r: "6" }],
    ["polyline", { points: "12 10 12 12 13 13" }],
    ["path", { d: "m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05" }],
    ["path", { d: "m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vm = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
      }
    ],
    [
      "path",
      {
        d: "M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
      }
    ],
    [
      "path",
      {
        d: "M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wm = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "4.5", r: "2.5" }],
    ["path", { d: "m10.2 6.3-3.9 3.9" }],
    ["circle", { cx: "4.5", cy: "12", r: "2.5" }],
    ["path", { d: "M7 12h10" }],
    ["circle", { cx: "19.5", cy: "12", r: "2.5" }],
    ["path", { d: "m13.8 17.7 3.9-3.9" }],
    ["circle", { cx: "12", cy: "19.5", r: "2.5" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cm = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "10", r: "8" }],
    ["circle", { cx: "12", cy: "10", r: "3" }],
    ["path", { d: "M7 22h10" }],
    ["path", { d: "M12 22v-4" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Am = [
  "svg",
  a,
  [
    ["path", { d: "M17 17h-5c-1.09-.02-1.94.92-2.5 1.9A3 3 0 1 1 2.57 15" }],
    ["path", { d: "M9 3.4a4 4 0 0 1 6.52.66" }],
    ["path", { d: "m6 17 3.1-5.8a2.5 2.5 0 0 0 .057-2.05" }],
    ["path", { d: "M20.3 20.3a4 4 0 0 1-2.3.7" }],
    ["path", { d: "M18.6 13a4 4 0 0 1 3.357 3.414" }],
    ["path", { d: "m12 6 .6 1" }],
    ["path", { d: "m2 2 20 20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fm = [
  "svg",
  a,
  [
    ["path", { d: "M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2" }],
    ["path", { d: "m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06" }],
    ["path", { d: "m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lm = [
  "svg",
  a,
  [
    ["circle", { cx: "12", cy: "5", r: "3" }],
    [
      "path",
      {
        d: "M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sm = [
  "svg",
  a,
  [
    ["path", { d: "m2 22 10-10" }],
    ["path", { d: "m16 8-1.17 1.17" }],
    [
      "path",
      {
        d: "M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"
      }
    ],
    ["path", { d: "m8 8-.53.53a3.5 3.5 0 0 0 0 4.94L9 15l1.53-1.53c.55-.55.88-1.25.98-1.97" }],
    ["path", { d: "M10.91 5.26c.15-.26.34-.51.56-.73L13 3l1.53 1.53a3.5 3.5 0 0 1 .28 4.62" }],
    ["path", { d: "M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" }],
    [
      "path",
      {
        d: "M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"
      }
    ],
    ["path", { d: "m16 16-.53.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.49 3.49 0 0 1 1.97-.98" }],
    ["path", { d: "M18.74 13.09c.26-.15.51-.34.73-.56L21 11l-1.53-1.53a3.5 3.5 0 0 0-4.62-.28" }],
    ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zm = [
  "svg",
  a,
  [
    ["path", { d: "M2 22 16 8" }],
    [
      "path",
      {
        d: "M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"
      }
    ],
    [
      "path",
      { d: "M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" }
    ],
    [
      "path",
      {
        d: "M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"
      }
    ],
    ["path", { d: "M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" }],
    [
      "path",
      {
        d: "M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"
      }
    ],
    [
      "path",
      {
        d: "M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"
      }
    ],
    [
      "path",
      {
        d: "M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const km = [
  "svg",
  a,
  [
    ["circle", { cx: "7", cy: "12", r: "3" }],
    ["path", { d: "M10 9v6" }],
    ["circle", { cx: "17", cy: "12", r: "3" }],
    ["path", { d: "M14 7v8" }],
    ["path", { d: "M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pm = [
  "svg",
  a,
  [
    ["path", { d: "M12 20h.01" }],
    ["path", { d: "M5 12.859a10 10 0 0 1 14 0" }],
    ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zm = [
  "svg",
  a,
  [
    ["path", { d: "M12 20h.01" }],
    ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bm = [
  "svg",
  a,
  [
    ["path", { d: "M12 20h.01" }],
    ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0" }],
    ["path", { d: "M5 12.859a10 10 0 0 1 5.17-2.69" }],
    ["path", { d: "M19 12.859a10 10 0 0 0-2.007-1.523" }],
    ["path", { d: "M2 8.82a15 15 0 0 1 4.177-2.643" }],
    ["path", { d: "M22 8.82a15 15 0 0 0-11.288-3.764" }],
    ["path", { d: "m2 2 20 20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tm = ["svg", a, [["path", { d: "M12 20h.01" }]]];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dm = [
  "svg",
  a,
  [
    ["path", { d: "M12 20h.01" }],
    ["path", { d: "M2 8.82a15 15 0 0 1 20 0" }],
    ["path", { d: "M5 12.859a10 10 0 0 1 14 0" }],
    ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fm = [
  "svg",
  a,
  [
    ["path", { d: "M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" }],
    ["path", { d: "M9.6 4.6A2 2 0 1 1 11 8H2" }],
    ["path", { d: "M12.6 19.4A2 2 0 1 0 14 16H2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bm = [
  "svg",
  a,
  [
    ["path", { d: "M8 22h8" }],
    ["path", { d: "M7 10h3m7 0h-1.343" }],
    ["path", { d: "M12 15v7" }],
    [
      "path",
      {
        d: "M7.307 7.307A12.33 12.33 0 0 0 7 10a5 5 0 0 0 7.391 4.391M8.638 2.981C8.75 2.668 8.872 2.34 9 2h6c1.5 4 2 6 2 8 0 .407-.05.809-.145 1.198"
      }
    ],
    ["line", { x1: "2", x2: "22", y1: "2", y2: "22" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rm = [
  "svg",
  a,
  [
    ["path", { d: "M8 22h8" }],
    ["path", { d: "M7 10h10" }],
    ["path", { d: "M12 15v7" }],
    ["path", { d: "M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Om = [
  "svg",
  a,
  [
    ["rect", { width: "8", height: "8", x: "3", y: "3", rx: "2" }],
    ["path", { d: "M7 11v4a2 2 0 0 0 2 2h4" }],
    ["rect", { width: "8", height: "8", x: "13", y: "13", rx: "2" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qm = [
  "svg",
  a,
  [
    ["path", { d: "m19 12-1.5 3" }],
    ["path", { d: "M19.63 18.81 22 20" }],
    [
      "path",
      {
        d: "M6.47 8.23a1.68 1.68 0 0 1 2.44 1.93l-.64 2.08a6.76 6.76 0 0 0 10.16 7.67l.42-.27a1 1 0 1 0-2.73-4.21l-.42.27a1.76 1.76 0 0 1-2.63-1.99l.64-2.08A6.66 6.66 0 0 0 3.94 3.9l-.7.4a1 1 0 1 0 2.55 4.34z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Um = [
  "svg",
  a,
  [
    ["line", { x1: "3", x2: "21", y1: "6", y2: "6" }],
    ["path", { d: "M3 12h15a3 3 0 1 1 0 6h-4" }],
    ["polyline", { points: "16 16 14 18 16 20" }],
    ["line", { x1: "3", x2: "10", y1: "18", y2: "18" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _m = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Em = [
  "svg",
  a,
  [
    ["path", { d: "M18 6 6 18" }],
    ["path", { d: "m6 6 12 12" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nm = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"
      }
    ],
    ["path", { d: "m10 15 5-3-5-3z" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Im = [
  "svg",
  a,
  [
    ["path", { d: "M10.513 4.856 13.12 2.17a.5.5 0 0 1 .86.46l-1.377 4.317" }],
    ["path", { d: "M15.656 10H20a1 1 0 0 1 .78 1.63l-1.72 1.773" }],
    [
      "path",
      {
        d: "M16.273 16.273 10.88 21.83a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4a1 1 0 0 1-.78-1.63l4.507-4.643"
      }
    ],
    ["path", { d: "m2 2 20 20" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gm = [
  "svg",
  a,
  [
    [
      "path",
      {
        d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
      }
    ]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xm = [
  "svg",
  a,
  [
    ["circle", { cx: "11", cy: "11", r: "8" }],
    ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65" }],
    ["line", { x1: "11", x2: "11", y1: "8", y2: "14" }],
    ["line", { x1: "8", x2: "14", y1: "11", y2: "11" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wm = [
  "svg",
  a,
  [
    ["circle", { cx: "11", cy: "11", r: "8" }],
    ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65" }],
    ["line", { x1: "8", x2: "14", y1: "11", y2: "11" }]
  ]
];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $m = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AArrowDown: dt,
  AArrowUp: pt,
  ALargeSmall: ct,
  Accessibility: et,
  Activity: st,
  ActivitySquare: i0,
  AirVent: Mt,
  Airplay: rt,
  AlarmCheck: t1,
  AlarmClock: vt,
  AlarmClockCheck: t1,
  AlarmClockMinus: h1,
  AlarmClockOff: nt,
  AlarmClockPlus: d1,
  AlarmMinus: h1,
  AlarmPlus: d1,
  AlarmSmoke: ot,
  Album: it,
  AlertCircle: P1,
  AlertOctagon: N2,
  AlertTriangle: la,
  AlignCenter: xt,
  AlignCenterHorizontal: lt,
  AlignCenterVertical: gt,
  AlignEndHorizontal: yt,
  AlignEndVertical: mt,
  AlignHorizontalDistributeCenter: Ht,
  AlignHorizontalDistributeEnd: ut,
  AlignHorizontalDistributeStart: Vt,
  AlignHorizontalJustifyCenter: wt,
  AlignHorizontalJustifyEnd: Ct,
  AlignHorizontalJustifyStart: At,
  AlignHorizontalSpaceAround: ft,
  AlignHorizontalSpaceBetween: Lt,
  AlignJustify: St,
  AlignLeft: Zt,
  AlignRight: kt,
  AlignStartHorizontal: Pt,
  AlignStartVertical: zt,
  AlignVerticalDistributeCenter: Bt,
  AlignVerticalDistributeEnd: Tt,
  AlignVerticalDistributeStart: Dt,
  AlignVerticalJustifyCenter: Ft,
  AlignVerticalJustifyEnd: bt,
  AlignVerticalJustifyStart: Rt,
  AlignVerticalSpaceAround: Ot,
  AlignVerticalSpaceBetween: qt,
  Ambulance: Ut,
  Ampersand: _t,
  Ampersands: Et,
  Amphora: Nt,
  Anchor: It,
  Angry: Gt,
  Annoyed: Xt,
  Antenna: Wt,
  Anvil: $t,
  Aperture: Kt,
  AppWindow: Qt,
  AppWindowMac: Jt,
  Apple: Yt,
  Archive: th,
  ArchiveRestore: jt,
  ArchiveX: ah,
  AreaChart: y1,
  Armchair: hh,
  ArrowBigDown: ph,
  ArrowBigDownDash: dh,
  ArrowBigLeft: eh,
  ArrowBigLeftDash: ch,
  ArrowBigRight: Mh,
  ArrowBigRightDash: sh,
  ArrowBigUp: nh,
  ArrowBigUpDash: rh,
  ArrowDown: uh,
  ArrowDown01: vh,
  ArrowDown10: oh,
  ArrowDownAZ: p1,
  ArrowDownAz: p1,
  ArrowDownCircle: z1,
  ArrowDownFromLine: ih,
  ArrowDownLeft: lh,
  ArrowDownLeftFromCircle: T1,
  ArrowDownLeftFromSquare: m0,
  ArrowDownLeftSquare: l0,
  ArrowDownNarrowWide: gh,
  ArrowDownRight: xh,
  ArrowDownRightFromCircle: D1,
  ArrowDownRightFromSquare: H0,
  ArrowDownRightSquare: g0,
  ArrowDownSquare: x0,
  ArrowDownToDot: yh,
  ArrowDownToLine: mh,
  ArrowDownUp: Hh,
  ArrowDownWideNarrow: c1,
  ArrowDownZA: e1,
  ArrowDownZa: e1,
  ArrowLeft: Ah,
  ArrowLeftCircle: B1,
  ArrowLeftFromLine: Vh,
  ArrowLeftRight: wh,
  ArrowLeftSquare: y0,
  ArrowLeftToLine: Ch,
  ArrowRight: Zh,
  ArrowRightCircle: R1,
  ArrowRightFromLine: fh,
  ArrowRightLeft: Lh,
  ArrowRightSquare: w0,
  ArrowRightToLine: Sh,
  ArrowUp: Oh,
  ArrowUp01: kh,
  ArrowUp10: Ph,
  ArrowUpAZ: s1,
  ArrowUpAz: s1,
  ArrowUpCircle: O1,
  ArrowUpDown: zh,
  ArrowUpFromDot: Bh,
  ArrowUpFromLine: Th,
  ArrowUpLeft: Dh,
  ArrowUpLeftFromCircle: F1,
  ArrowUpLeftFromSquare: u0,
  ArrowUpLeftSquare: C0,
  ArrowUpNarrowWide: M1,
  ArrowUpRight: Fh,
  ArrowUpRightFromCircle: b1,
  ArrowUpRightFromSquare: V0,
  ArrowUpRightSquare: A0,
  ArrowUpSquare: f0,
  ArrowUpToLine: bh,
  ArrowUpWideNarrow: Rh,
  ArrowUpZA: r1,
  ArrowUpZa: r1,
  ArrowsUpFromLine: qh,
  Asterisk: Uh,
  AsteriskSquare: L0,
  AtSign: _h,
  Atom: Eh,
  AudioLines: Nh,
  AudioWaveform: Ih,
  Award: Gh,
  Axe: Xh,
  Axis3D: n1,
  Axis3d: n1,
  Baby: Wh,
  Backpack: $h,
  Badge: n4,
  BadgeAlert: Kh,
  BadgeCent: Jh,
  BadgeCheck: v1,
  BadgeDollarSign: Qh,
  BadgeEuro: Yh,
  BadgeHelp: jh,
  BadgeIndianRupee: a4,
  BadgeInfo: t4,
  BadgeJapaneseYen: h4,
  BadgeMinus: d4,
  BadgePercent: p4,
  BadgePlus: c4,
  BadgePoundSterling: e4,
  BadgeRussianRuble: s4,
  BadgeSwissFranc: M4,
  BadgeX: r4,
  BaggageClaim: v4,
  Ban: o4,
  Banana: i4,
  Bandage: l4,
  Banknote: g4,
  BarChart: f1,
  BarChart2: L1,
  BarChart3: C1,
  BarChart4: w1,
  BarChartBig: V1,
  BarChartHorizontal: H1,
  BarChartHorizontalBig: m1,
  Barcode: x4,
  Baseline: y4,
  Bath: m4,
  Battery: A4,
  BatteryCharging: H4,
  BatteryFull: u4,
  BatteryLow: V4,
  BatteryMedium: w4,
  BatteryWarning: C4,
  Beaker: f4,
  Bean: S4,
  BeanOff: L4,
  Bed: P4,
  BedDouble: Z4,
  BedSingle: k4,
  Beef: z4,
  Beer: T4,
  BeerOff: B4,
  Bell: U4,
  BellDot: D4,
  BellElectric: F4,
  BellMinus: b4,
  BellOff: R4,
  BellPlus: O4,
  BellRing: q4,
  BetweenHorizonalEnd: o1,
  BetweenHorizonalStart: i1,
  BetweenHorizontalEnd: o1,
  BetweenHorizontalStart: i1,
  BetweenVerticalEnd: _4,
  BetweenVerticalStart: E4,
  BicepsFlexed: N4,
  Bike: I4,
  Binary: G4,
  Binoculars: X4,
  Biohazard: W4,
  Bird: $4,
  Bitcoin: K4,
  Blend: J4,
  Blinds: Q4,
  Blocks: Y4,
  Bluetooth: h5,
  BluetoothConnected: j4,
  BluetoothOff: a5,
  BluetoothSearching: t5,
  Bold: d5,
  Bolt: p5,
  Bomb: c5,
  Bone: e5,
  Book: k5,
  BookA: s5,
  BookAudio: M5,
  BookCheck: r5,
  BookCopy: n5,
  BookDashed: l1,
  BookDown: v5,
  BookHeadphones: o5,
  BookHeart: i5,
  BookImage: l5,
  BookKey: g5,
  BookLock: x5,
  BookMarked: y5,
  BookMinus: m5,
  BookOpen: V5,
  BookOpenCheck: H5,
  BookOpenText: u5,
  BookPlus: w5,
  BookTemplate: l1,
  BookText: C5,
  BookType: A5,
  BookUp: L5,
  BookUp2: f5,
  BookUser: S5,
  BookX: Z5,
  Bookmark: D5,
  BookmarkCheck: P5,
  BookmarkMinus: z5,
  BookmarkPlus: B5,
  BookmarkX: T5,
  BoomBox: F5,
  Bot: O5,
  BotMessageSquare: b5,
  BotOff: R5,
  Box: U5,
  BoxSelect: q5,
  Boxes: _5,
  Braces: g1,
  Brackets: E5,
  Brain: G5,
  BrainCircuit: N5,
  BrainCog: I5,
  BrickWall: X5,
  Briefcase: J5,
  BriefcaseBusiness: W5,
  BriefcaseConveyorBelt: $5,
  BriefcaseMedical: K5,
  BringToFront: Q5,
  Brush: Y5,
  Bug: td,
  BugOff: j5,
  BugPlay: ad,
  Building: dd,
  Building2: hd,
  Bus: cd,
  BusFront: pd,
  Cable: sd,
  CableCar: ed,
  Cake: rd,
  CakeSlice: Md,
  Calculator: nd,
  Calendar: kd,
  CalendarArrowDown: vd,
  CalendarArrowUp: od,
  CalendarCheck: ld,
  CalendarCheck2: id,
  CalendarClock: gd,
  CalendarCog: xd,
  CalendarDays: yd,
  CalendarFold: md,
  CalendarHeart: Hd,
  CalendarMinus: Vd,
  CalendarMinus2: ud,
  CalendarOff: wd,
  CalendarPlus: Ad,
  CalendarPlus2: Cd,
  CalendarRange: fd,
  CalendarSearch: Ld,
  CalendarX: Zd,
  CalendarX2: Sd,
  Camera: zd,
  CameraOff: Pd,
  CandlestickChart: u1,
  Candy: Dd,
  CandyCane: Bd,
  CandyOff: Td,
  Cannabis: Fd,
  Captions: x1,
  CaptionsOff: bd,
  Car: qd,
  CarFront: Rd,
  CarTaxiFront: Od,
  Caravan: Ud,
  Carrot: _d,
  CaseLower: Ed,
  CaseSensitive: Nd,
  CaseUpper: Id,
  CassetteTape: Gd,
  Cast: Xd,
  Castle: Wd,
  Cat: $d,
  Cctv: Kd,
  ChartArea: y1,
  ChartBar: H1,
  ChartBarBig: m1,
  ChartBarDecreasing: Jd,
  ChartBarIncreasing: Qd,
  ChartBarStacked: Yd,
  ChartCandlestick: u1,
  ChartColumn: C1,
  ChartColumnBig: V1,
  ChartColumnDecreasing: jd,
  ChartColumnIncreasing: w1,
  ChartColumnStacked: a3,
  ChartGantt: t3,
  ChartLine: A1,
  ChartNetwork: h3,
  ChartNoAxesColumn: L1,
  ChartNoAxesColumnDecreasing: d3,
  ChartNoAxesColumnIncreasing: f1,
  ChartNoAxesCombined: p3,
  ChartNoAxesGantt: S1,
  ChartPie: Z1,
  ChartScatter: k1,
  ChartSpline: c3,
  Check: s3,
  CheckCheck: e3,
  CheckCircle: q1,
  CheckCircle2: U1,
  CheckSquare: Z0,
  CheckSquare2: k0,
  ChefHat: M3,
  Cherry: r3,
  ChevronDown: n3,
  ChevronDownCircle: _1,
  ChevronDownSquare: P0,
  ChevronFirst: v3,
  ChevronLast: o3,
  ChevronLeft: i3,
  ChevronLeftCircle: E1,
  ChevronLeftSquare: z0,
  ChevronRight: l3,
  ChevronRightCircle: N1,
  ChevronRightSquare: B0,
  ChevronUp: g3,
  ChevronUpCircle: I1,
  ChevronUpSquare: T0,
  ChevronsDown: y3,
  ChevronsDownUp: x3,
  ChevronsLeft: u3,
  ChevronsLeftRight: H3,
  ChevronsLeftRightEllipsis: m3,
  ChevronsRight: w3,
  ChevronsRightLeft: V3,
  ChevronsUp: A3,
  ChevronsUpDown: C3,
  Chrome: f3,
  Church: L3,
  Cigarette: Z3,
  CigaretteOff: S3,
  Circle: q3,
  CircleAlert: P1,
  CircleArrowDown: z1,
  CircleArrowLeft: B1,
  CircleArrowOutDownLeft: T1,
  CircleArrowOutDownRight: D1,
  CircleArrowOutUpLeft: F1,
  CircleArrowOutUpRight: b1,
  CircleArrowRight: R1,
  CircleArrowUp: O1,
  CircleCheck: U1,
  CircleCheckBig: q1,
  CircleChevronDown: _1,
  CircleChevronLeft: E1,
  CircleChevronRight: N1,
  CircleChevronUp: I1,
  CircleDashed: k3,
  CircleDivide: G1,
  CircleDollarSign: P3,
  CircleDot: B3,
  CircleDotDashed: z3,
  CircleEllipsis: T3,
  CircleEqual: D3,
  CircleFadingArrowUp: F3,
  CircleFadingPlus: b3,
  CircleGauge: X1,
  CircleHelp: W1,
  CircleMinus: $1,
  CircleOff: R3,
  CircleParking: J1,
  CircleParkingOff: K1,
  CirclePause: Q1,
  CirclePercent: Y1,
  CirclePlay: j1,
  CirclePlus: a2,
  CirclePower: t2,
  CircleSlash: O3,
  CircleSlash2: h2,
  CircleSlashed: h2,
  CircleStop: d2,
  CircleUser: c2,
  CircleUserRound: p2,
  CircleX: e2,
  CircuitBoard: U3,
  Citrus: _3,
  Clapperboard: E3,
  Clipboard: Q3,
  ClipboardCheck: N3,
  ClipboardCopy: I3,
  ClipboardEdit: M2,
  ClipboardList: G3,
  ClipboardMinus: X3,
  ClipboardPaste: W3,
  ClipboardPen: M2,
  ClipboardPenLine: s2,
  ClipboardPlus: $3,
  ClipboardSignature: s2,
  ClipboardType: K3,
  ClipboardX: J3,
  Clock: ip,
  Clock1: Y3,
  Clock10: j3,
  Clock11: ap,
  Clock12: tp,
  Clock2: hp,
  Clock3: dp,
  Clock4: pp,
  Clock5: cp,
  Clock6: ep,
  Clock7: sp,
  Clock8: Mp,
  Clock9: rp,
  ClockAlert: np,
  ClockArrowDown: vp,
  ClockArrowUp: op,
  Cloud: Sp,
  CloudCog: lp,
  CloudDownload: r2,
  CloudDrizzle: gp,
  CloudFog: xp,
  CloudHail: yp,
  CloudLightning: mp,
  CloudMoon: up,
  CloudMoonRain: Hp,
  CloudOff: Vp,
  CloudRain: Cp,
  CloudRainWind: wp,
  CloudSnow: Ap,
  CloudSun: Lp,
  CloudSunRain: fp,
  CloudUpload: n2,
  Cloudy: Zp,
  Clover: kp,
  Club: Pp,
  Code: zp,
  Code2: v2,
  CodeSquare: D0,
  CodeXml: v2,
  Codepen: Bp,
  Codesandbox: Tp,
  Coffee: Dp,
  Cog: Fp,
  Coins: bp,
  Columns: o2,
  Columns2: o2,
  Columns3: i2,
  Columns4: Rp,
  Combine: Op,
  Command: qp,
  Compass: Up,
  Component: _p,
  Computer: Ep,
  ConciergeBell: Np,
  Cone: Ip,
  Construction: Gp,
  Contact: Xp,
  Contact2: l2,
  ContactRound: l2,
  Container: Wp,
  Contrast: $p,
  Cookie: Kp,
  CookingPot: Jp,
  Copy: h6,
  CopyCheck: Qp,
  CopyMinus: Yp,
  CopyPlus: jp,
  CopySlash: a6,
  CopyX: t6,
  Copyleft: d6,
  Copyright: p6,
  CornerDownLeft: c6,
  CornerDownRight: e6,
  CornerLeftDown: s6,
  CornerLeftUp: M6,
  CornerRightDown: r6,
  CornerRightUp: n6,
  CornerUpLeft: v6,
  CornerUpRight: o6,
  Cpu: i6,
  CreativeCommons: l6,
  CreditCard: g6,
  Croissant: x6,
  Crop: y6,
  Cross: m6,
  Crosshair: H6,
  Crown: u6,
  Cuboid: V6,
  CupSoda: w6,
  CurlyBraces: g1,
  Currency: C6,
  Cylinder: A6,
  Dam: f6,
  Database: Z6,
  DatabaseBackup: L6,
  DatabaseZap: S6,
  Delete: k6,
  Dessert: P6,
  Diameter: z6,
  Diamond: D6,
  DiamondMinus: B6,
  DiamondPercent: g2,
  DiamondPlus: T6,
  Dice1: F6,
  Dice2: b6,
  Dice3: R6,
  Dice4: O6,
  Dice5: q6,
  Dice6: U6,
  Dices: _6,
  Diff: E6,
  Disc: X6,
  Disc2: N6,
  Disc3: I6,
  DiscAlbum: G6,
  Divide: W6,
  DivideCircle: G1,
  DivideSquare: R0,
  Dna: K6,
  DnaOff: $6,
  Dock: J6,
  Dog: Q6,
  DollarSign: Y6,
  Donut: j6,
  DoorClosed: ac,
  DoorOpen: tc,
  Dot: hc,
  DotSquare: O0,
  Download: dc,
  DownloadCloud: r2,
  DraftingCompass: pc,
  Drama: cc,
  Dribbble: ec,
  Drill: sc,
  Droplet: Mc,
  Droplets: rc,
  Drum: nc,
  Drumstick: vc,
  Dumbbell: oc,
  Ear: lc,
  EarOff: ic,
  Earth: x2,
  EarthLock: gc,
  Eclipse: xc,
  Edit: T,
  Edit2: h0,
  Edit3: t0,
  Egg: Hc,
  EggFried: yc,
  EggOff: mc,
  Ellipsis: m2,
  EllipsisVertical: y2,
  Equal: Vc,
  EqualNot: uc,
  EqualSquare: q0,
  Eraser: wc,
  EthernetPort: Cc,
  Euro: Ac,
  Expand: fc,
  ExternalLink: Lc,
  Eye: Zc,
  EyeOff: Sc,
  Facebook: kc,
  Factory: Pc,
  Fan: zc,
  FastForward: Bc,
  Feather: Tc,
  Fence: Dc,
  FerrisWheel: Fc,
  Figma: bc,
  File: T8,
  FileArchive: Rc,
  FileAudio: qc,
  FileAudio2: Oc,
  FileAxis3D: H2,
  FileAxis3d: H2,
  FileBadge: _c,
  FileBadge2: Uc,
  FileBarChart: u2,
  FileBarChart2: V2,
  FileBox: Ec,
  FileChartColumn: V2,
  FileChartColumnIncreasing: u2,
  FileChartLine: w2,
  FileChartPie: C2,
  FileCheck: Ic,
  FileCheck2: Nc,
  FileClock: Gc,
  FileCode: Wc,
  FileCode2: Xc,
  FileCog: A2,
  FileCog2: A2,
  FileDiff: $c,
  FileDigit: Kc,
  FileDown: Jc,
  FileEdit: L2,
  FileHeart: Qc,
  FileImage: Yc,
  FileInput: jc,
  FileJson: t8,
  FileJson2: a8,
  FileKey: d8,
  FileKey2: h8,
  FileLineChart: w2,
  FileLock: c8,
  FileLock2: p8,
  FileMinus: s8,
  FileMinus2: e8,
  FileMusic: M8,
  FileOutput: r8,
  FilePen: L2,
  FilePenLine: f2,
  FilePieChart: C2,
  FilePlus: v8,
  FilePlus2: n8,
  FileQuestion: o8,
  FileScan: i8,
  FileSearch: g8,
  FileSearch2: l8,
  FileSignature: f2,
  FileSliders: x8,
  FileSpreadsheet: y8,
  FileStack: m8,
  FileSymlink: H8,
  FileTerminal: u8,
  FileText: V8,
  FileType: C8,
  FileType2: w8,
  FileUp: A8,
  FileUser: f8,
  FileVideo: S8,
  FileVideo2: L8,
  FileVolume: k8,
  FileVolume2: Z8,
  FileWarning: P8,
  FileX: B8,
  FileX2: z8,
  Files: D8,
  Film: F8,
  Filter: R8,
  FilterX: b8,
  Fingerprint: O8,
  FireExtinguisher: q8,
  Fish: E8,
  FishOff: U8,
  FishSymbol: _8,
  Flag: X8,
  FlagOff: N8,
  FlagTriangleLeft: I8,
  FlagTriangleRight: G8,
  Flame: $8,
  FlameKindling: W8,
  Flashlight: J8,
  FlashlightOff: K8,
  FlaskConical: Y8,
  FlaskConicalOff: Q8,
  FlaskRound: j8,
  FlipHorizontal: te,
  FlipHorizontal2: ae,
  FlipVertical: de,
  FlipVertical2: he,
  Flower: ce,
  Flower2: pe,
  Focus: ee,
  FoldHorizontal: se,
  FoldVertical: Me,
  Folder: be,
  FolderArchive: re,
  FolderCheck: ne,
  FolderClock: ve,
  FolderClosed: oe,
  FolderCode: ie,
  FolderCog: S2,
  FolderCog2: S2,
  FolderDot: le,
  FolderDown: ge,
  FolderEdit: Z2,
  FolderGit: ye,
  FolderGit2: xe,
  FolderHeart: me,
  FolderInput: He,
  FolderKanban: ue,
  FolderKey: Ve,
  FolderLock: we,
  FolderMinus: Ce,
  FolderOpen: fe,
  FolderOpenDot: Ae,
  FolderOutput: Le,
  FolderPen: Z2,
  FolderPlus: Se,
  FolderRoot: Ze,
  FolderSearch: Pe,
  FolderSearch2: ke,
  FolderSymlink: ze,
  FolderSync: Be,
  FolderTree: Te,
  FolderUp: De,
  FolderX: Fe,
  Folders: Re,
  Footprints: Oe,
  ForkKnife: fa,
  ForkKnifeCrossed: Aa,
  Forklift: qe,
  FormInput: p0,
  Forward: Ue,
  Frame: _e,
  Framer: Ee,
  Frown: Ne,
  Fuel: Ie,
  Fullscreen: Ge,
  FunctionSquare: U0,
  GalleryHorizontal: We,
  GalleryHorizontalEnd: Xe,
  GalleryThumbnails: $e,
  GalleryVertical: Je,
  GalleryVerticalEnd: Ke,
  Gamepad: Ye,
  Gamepad2: Qe,
  GanttChart: S1,
  GanttChartSquare: X,
  Gauge: je,
  GaugeCircle: X1,
  Gavel: a7,
  Gem: t7,
  Ghost: h7,
  Gift: d7,
  GitBranch: c7,
  GitBranchPlus: p7,
  GitCommit: k2,
  GitCommitHorizontal: k2,
  GitCommitVertical: e7,
  GitCompare: M7,
  GitCompareArrows: s7,
  GitFork: r7,
  GitGraph: n7,
  GitMerge: v7,
  GitPullRequest: y7,
  GitPullRequestArrow: o7,
  GitPullRequestClosed: i7,
  GitPullRequestCreate: g7,
  GitPullRequestCreateArrow: l7,
  GitPullRequestDraft: x7,
  Github: m7,
  Gitlab: H7,
  GlassWater: u7,
  Glasses: V7,
  Globe: C7,
  Globe2: x2,
  GlobeLock: w7,
  Goal: A7,
  Grab: f7,
  GraduationCap: L7,
  Grape: S7,
  Grid: G,
  Grid2X2: P2,
  Grid2x2: P2,
  Grid2x2Check: Z7,
  Grid2x2Plus: k7,
  Grid2x2X: P7,
  Grid3X3: G,
  Grid3x3: G,
  Grip: T7,
  GripHorizontal: z7,
  GripVertical: B7,
  Group: D7,
  Guitar: F7,
  Ham: b7,
  Hammer: R7,
  Hand: E7,
  HandCoins: O7,
  HandHeart: q7,
  HandHelping: z2,
  HandMetal: U7,
  HandPlatter: _7,
  Handshake: N7,
  HardDrive: X7,
  HardDriveDownload: I7,
  HardDriveUpload: G7,
  HardHat: W7,
  Hash: $7,
  Haze: K7,
  HdmiPort: J7,
  Heading: ds,
  Heading1: Q7,
  Heading2: Y7,
  Heading3: j7,
  Heading4: as,
  Heading5: ts,
  Heading6: hs,
  HeadphoneOff: ps,
  Headphones: cs,
  Headset: es,
  Heart: vs,
  HeartCrack: ss,
  HeartHandshake: Ms,
  HeartOff: rs,
  HeartPulse: ns,
  Heater: os,
  HelpCircle: W1,
  HelpingHand: z2,
  Hexagon: is,
  Highlighter: ls,
  History: gs,
  Home: B2,
  Hop: ys,
  HopOff: xs,
  Hospital: ms,
  Hotel: Hs,
  Hourglass: us,
  House: B2,
  HousePlug: Vs,
  HousePlus: ws,
  IceCream: D2,
  IceCream2: T2,
  IceCreamBowl: T2,
  IceCreamCone: D2,
  IdCard: Cs,
  Image: Ps,
  ImageDown: As,
  ImageMinus: fs,
  ImageOff: Ls,
  ImagePlay: Ss,
  ImagePlus: Zs,
  ImageUp: ks,
  Images: zs,
  Import: Bs,
  Inbox: Ts,
  Indent: b2,
  IndentDecrease: F2,
  IndentIncrease: b2,
  IndianRupee: Ds,
  Infinity: Fs,
  Info: bs,
  Inspect: X0,
  InspectionPanel: Rs,
  Instagram: Os,
  Italic: qs,
  IterationCcw: Us,
  IterationCw: _s,
  JapaneseYen: Es,
  Joystick: Ns,
  Kanban: Is,
  KanbanSquare: _0,
  KanbanSquareDashed: F0,
  Key: Ws,
  KeyRound: Gs,
  KeySquare: Xs,
  Keyboard: Js,
  KeyboardMusic: $s,
  KeyboardOff: Ks,
  Lamp: hM,
  LampCeiling: Qs,
  LampDesk: Ys,
  LampFloor: js,
  LampWallDown: aM,
  LampWallUp: tM,
  LandPlot: dM,
  Landmark: pM,
  Languages: cM,
  Laptop: eM,
  Laptop2: R2,
  LaptopMinimal: R2,
  Lasso: MM,
  LassoSelect: sM,
  Laugh: rM,
  Layers: oM,
  Layers2: nM,
  Layers3: vM,
  Layout: a0,
  LayoutDashboard: iM,
  LayoutGrid: lM,
  LayoutList: gM,
  LayoutPanelLeft: xM,
  LayoutPanelTop: yM,
  LayoutTemplate: mM,
  Leaf: HM,
  LeafyGreen: uM,
  Lectern: VM,
  LetterText: wM,
  Library: AM,
  LibraryBig: CM,
  LibrarySquare: E0,
  LifeBuoy: fM,
  Ligature: LM,
  Lightbulb: ZM,
  LightbulbOff: SM,
  LineChart: A1,
  Link: zM,
  Link2: PM,
  Link2Off: kM,
  Linkedin: BM,
  List: $M,
  ListCheck: TM,
  ListChecks: DM,
  ListCollapse: FM,
  ListEnd: bM,
  ListFilter: RM,
  ListMinus: OM,
  ListMusic: qM,
  ListOrdered: UM,
  ListPlus: _M,
  ListRestart: EM,
  ListStart: NM,
  ListTodo: IM,
  ListTree: GM,
  ListVideo: XM,
  ListX: WM,
  Loader: JM,
  Loader2: O2,
  LoaderCircle: O2,
  LoaderPinwheel: KM,
  Locate: jM,
  LocateFixed: QM,
  LocateOff: YM,
  Lock: t9,
  LockKeyhole: a9,
  LockKeyholeOpen: q2,
  LockOpen: U2,
  LogIn: h9,
  LogOut: d9,
  Logs: p9,
  Lollipop: c9,
  Luggage: e9,
  MSquare: N0,
  Magnet: s9,
  Mail: x9,
  MailCheck: M9,
  MailMinus: r9,
  MailOpen: n9,
  MailPlus: v9,
  MailQuestion: o9,
  MailSearch: i9,
  MailWarning: l9,
  MailX: g9,
  Mailbox: y9,
  Mails: m9,
  Map: z9,
  MapPin: k9,
  MapPinCheck: u9,
  MapPinCheckInside: H9,
  MapPinHouse: V9,
  MapPinMinus: C9,
  MapPinMinusInside: w9,
  MapPinOff: A9,
  MapPinPlus: L9,
  MapPinPlusInside: f9,
  MapPinX: Z9,
  MapPinXInside: S9,
  MapPinned: P9,
  Martini: B9,
  Maximize: D9,
  Maximize2: T9,
  Medal: F9,
  Megaphone: R9,
  MegaphoneOff: b9,
  Meh: O9,
  MemoryStick: q9,
  Menu: U9,
  MenuSquare: I0,
  Merge: _9,
  MessageCircle: Y9,
  MessageCircleCode: E9,
  MessageCircleDashed: N9,
  MessageCircleHeart: I9,
  MessageCircleMore: G9,
  MessageCircleOff: X9,
  MessageCirclePlus: W9,
  MessageCircleQuestion: $9,
  MessageCircleReply: K9,
  MessageCircleWarning: J9,
  MessageCircleX: Q9,
  MessageSquare: lr,
  MessageSquareCode: j9,
  MessageSquareDashed: ar,
  MessageSquareDiff: tr,
  MessageSquareDot: hr,
  MessageSquareHeart: dr,
  MessageSquareLock: pr,
  MessageSquareMore: cr,
  MessageSquareOff: er,
  MessageSquarePlus: sr,
  MessageSquareQuote: Mr,
  MessageSquareReply: rr,
  MessageSquareShare: nr,
  MessageSquareText: vr,
  MessageSquareWarning: or,
  MessageSquareX: ir,
  MessagesSquare: gr,
  Mic: yr,
  Mic2: _2,
  MicOff: xr,
  MicVocal: _2,
  Microchip: mr,
  Microscope: Hr,
  Microwave: ur,
  Milestone: Vr,
  Milk: Cr,
  MilkOff: wr,
  Minimize: fr,
  Minimize2: Ar,
  Minus: Lr,
  MinusCircle: $1,
  MinusSquare: G0,
  Monitor: qr,
  MonitorCheck: Sr,
  MonitorCog: Zr,
  MonitorDot: kr,
  MonitorDown: Pr,
  MonitorOff: zr,
  MonitorPause: Br,
  MonitorPlay: Tr,
  MonitorSmartphone: Dr,
  MonitorSpeaker: Fr,
  MonitorStop: br,
  MonitorUp: Rr,
  MonitorX: Or,
  Moon: _r,
  MoonStar: Ur,
  MoreHorizontal: m2,
  MoreVertical: y2,
  Mountain: Nr,
  MountainSnow: Er,
  Mouse: Kr,
  MouseOff: Ir,
  MousePointer: $r,
  MousePointer2: Gr,
  MousePointerBan: Xr,
  MousePointerClick: Wr,
  MousePointerSquareDashed: b0,
  Move: Mn,
  Move3D: E2,
  Move3d: E2,
  MoveDiagonal: Qr,
  MoveDiagonal2: Jr,
  MoveDown: an,
  MoveDownLeft: Yr,
  MoveDownRight: jr,
  MoveHorizontal: tn,
  MoveLeft: hn,
  MoveRight: dn,
  MoveUp: en,
  MoveUpLeft: pn,
  MoveUpRight: cn,
  MoveVertical: sn,
  Music: on,
  Music2: rn,
  Music3: nn,
  Music4: vn,
  Navigation: yn,
  Navigation2: gn,
  Navigation2Off: ln,
  NavigationOff: xn,
  Network: mn,
  Newspaper: Hn,
  Nfc: un,
  Notebook: An,
  NotebookPen: Vn,
  NotebookTabs: wn,
  NotebookText: Cn,
  NotepadText: Ln,
  NotepadTextDashed: fn,
  Nut: Zn,
  NutOff: Sn,
  Octagon: Pn,
  OctagonAlert: N2,
  OctagonMinus: kn,
  OctagonPause: I2,
  OctagonX: G2,
  Omega: zn,
  Option: Bn,
  Orbit: Tn,
  Origami: Dn,
  Outdent: F2,
  Package: En,
  Package2: Fn,
  PackageCheck: bn,
  PackageMinus: Rn,
  PackageOpen: On,
  PackagePlus: qn,
  PackageSearch: Un,
  PackageX: _n,
  PaintBucket: Nn,
  PaintRoller: In,
  Paintbrush: Gn,
  Paintbrush2: X2,
  PaintbrushVertical: X2,
  Palette: Xn,
  Palmtree: ia,
  PanelBottom: Kn,
  PanelBottomClose: Wn,
  PanelBottomDashed: W2,
  PanelBottomInactive: W2,
  PanelBottomOpen: $n,
  PanelLeft: Q2,
  PanelLeftClose: $2,
  PanelLeftDashed: K2,
  PanelLeftInactive: K2,
  PanelLeftOpen: J2,
  PanelRight: Yn,
  PanelRightClose: Jn,
  PanelRightDashed: Y2,
  PanelRightInactive: Y2,
  PanelRightOpen: Qn,
  PanelTop: tv,
  PanelTopClose: jn,
  PanelTopDashed: j2,
  PanelTopInactive: j2,
  PanelTopOpen: av,
  PanelsLeftBottom: hv,
  PanelsLeftRight: i2,
  PanelsRightBottom: dv,
  PanelsTopBottom: s0,
  PanelsTopLeft: a0,
  Paperclip: pv,
  Parentheses: cv,
  ParkingCircle: J1,
  ParkingCircleOff: K1,
  ParkingMeter: ev,
  ParkingSquare: $0,
  ParkingSquareOff: W0,
  PartyPopper: sv,
  Pause: Mv,
  PauseCircle: Q1,
  PauseOctagon: I2,
  PawPrint: rv,
  PcCase: nv,
  Pen: h0,
  PenBox: T,
  PenLine: t0,
  PenOff: vv,
  PenSquare: T,
  PenTool: ov,
  Pencil: xv,
  PencilLine: iv,
  PencilOff: lv,
  PencilRuler: gv,
  Pentagon: yv,
  Percent: mv,
  PercentCircle: Y1,
  PercentDiamond: g2,
  PercentSquare: K0,
  PersonStanding: Hv,
  PhilippinePeso: uv,
  Phone: Sv,
  PhoneCall: Vv,
  PhoneForwarded: wv,
  PhoneIncoming: Cv,
  PhoneMissed: Av,
  PhoneOff: fv,
  PhoneOutgoing: Lv,
  Pi: Zv,
  PiSquare: J0,
  Piano: kv,
  Pickaxe: Pv,
  PictureInPicture: Bv,
  PictureInPicture2: zv,
  PieChart: Z1,
  PiggyBank: Tv,
  Pilcrow: bv,
  PilcrowLeft: Dv,
  PilcrowRight: Fv,
  PilcrowSquare: Q0,
  Pill: Ov,
  PillBottle: Rv,
  Pin: Uv,
  PinOff: qv,
  Pipette: _v,
  Pizza: Ev,
  Plane: Gv,
  PlaneLanding: Nv,
  PlaneTakeoff: Iv,
  Play: Xv,
  PlayCircle: j1,
  PlaySquare: Y0,
  Plug: $v,
  Plug2: Wv,
  PlugZap: d0,
  PlugZap2: d0,
  Plus: Kv,
  PlusCircle: a2,
  PlusSquare: j0,
  Pocket: Qv,
  PocketKnife: Jv,
  Podcast: Yv,
  Pointer: ao,
  PointerOff: jv,
  Popcorn: to,
  Popsicle: ho,
  PoundSterling: po,
  Power: eo,
  PowerCircle: t2,
  PowerOff: co,
  PowerSquare: aa,
  Presentation: so,
  Printer: ro,
  PrinterCheck: Mo,
  Projector: no,
  Proportions: vo,
  Puzzle: oo,
  Pyramid: io,
  QrCode: lo,
  Quote: go,
  Rabbit: xo,
  Radar: yo,
  Radiation: mo,
  Radical: Ho,
  Radio: wo,
  RadioReceiver: uo,
  RadioTower: Vo,
  Radius: Co,
  RailSymbol: Ao,
  Rainbow: fo,
  Rat: Lo,
  Ratio: So,
  Receipt: bo,
  ReceiptCent: Zo,
  ReceiptEuro: ko,
  ReceiptIndianRupee: Po,
  ReceiptJapaneseYen: zo,
  ReceiptPoundSterling: Bo,
  ReceiptRussianRuble: To,
  ReceiptSwissFranc: Do,
  ReceiptText: Fo,
  RectangleEllipsis: p0,
  RectangleHorizontal: Ro,
  RectangleVertical: Oo,
  Recycle: qo,
  Redo: Eo,
  Redo2: Uo,
  RedoDot: _o,
  RefreshCcw: Io,
  RefreshCcwDot: No,
  RefreshCw: Xo,
  RefreshCwOff: Go,
  Refrigerator: Wo,
  Regex: $o,
  RemoveFormatting: Ko,
  Repeat: Yo,
  Repeat1: Jo,
  Repeat2: Qo,
  Replace: ai,
  ReplaceAll: jo,
  Reply: hi,
  ReplyAll: ti,
  Rewind: di,
  Ribbon: pi,
  Rocket: ci,
  RockingChair: ei,
  RollerCoaster: si,
  Rotate3D: c0,
  Rotate3d: c0,
  RotateCcw: ri,
  RotateCcwSquare: Mi,
  RotateCw: vi,
  RotateCwSquare: ni,
  Route: ii,
  RouteOff: oi,
  Router: li,
  Rows: e0,
  Rows2: e0,
  Rows3: s0,
  Rows4: gi,
  Rss: xi,
  Ruler: yi,
  RussianRuble: mi,
  Sailboat: Hi,
  Salad: ui,
  Sandwich: Vi,
  Satellite: Ci,
  SatelliteDish: wi,
  Save: Li,
  SaveAll: Ai,
  SaveOff: fi,
  Scale: Si,
  Scale3D: M0,
  Scale3d: M0,
  Scaling: Zi,
  Scan: bi,
  ScanBarcode: ki,
  ScanEye: Pi,
  ScanFace: zi,
  ScanLine: Bi,
  ScanQrCode: Ti,
  ScanSearch: Di,
  ScanText: Fi,
  ScatterChart: k1,
  School: Ri,
  School2: xa,
  Scissors: qi,
  ScissorsLineDashed: Oi,
  ScissorsSquare: ta,
  ScissorsSquareDashedBottom: S0,
  ScreenShare: _i,
  ScreenShareOff: Ui,
  Scroll: Ni,
  ScrollText: Ei,
  Search: $i,
  SearchCheck: Ii,
  SearchCode: Gi,
  SearchSlash: Xi,
  SearchX: Wi,
  Section: Ki,
  Send: Qi,
  SendHorizonal: r0,
  SendHorizontal: r0,
  SendToBack: Ji,
  SeparatorHorizontal: Yi,
  SeparatorVertical: ji,
  Server: dl,
  ServerCog: al,
  ServerCrash: tl,
  ServerOff: hl,
  Settings: cl,
  Settings2: pl,
  Shapes: el,
  Share: Ml,
  Share2: sl,
  Sheet: rl,
  Shell: nl,
  Shield: ul,
  ShieldAlert: vl,
  ShieldBan: ol,
  ShieldCheck: il,
  ShieldClose: n0,
  ShieldEllipsis: ll,
  ShieldHalf: gl,
  ShieldMinus: xl,
  ShieldOff: yl,
  ShieldPlus: ml,
  ShieldQuestion: Hl,
  ShieldX: n0,
  Ship: wl,
  ShipWheel: Vl,
  Shirt: Cl,
  ShoppingBag: Al,
  ShoppingBasket: fl,
  ShoppingCart: Ll,
  Shovel: Sl,
  ShowerHead: Zl,
  Shrink: kl,
  Shrub: Pl,
  Shuffle: zl,
  Sidebar: Q2,
  SidebarClose: $2,
  SidebarOpen: J2,
  Sigma: Bl,
  SigmaSquare: ha,
  Signal: Rl,
  SignalHigh: Tl,
  SignalLow: Dl,
  SignalMedium: Fl,
  SignalZero: bl,
  Signature: Ol,
  Signpost: Ul,
  SignpostBig: ql,
  Siren: _l,
  SkipBack: El,
  SkipForward: Nl,
  Skull: Il,
  Slack: Gl,
  Slash: Xl,
  SlashSquare: da,
  Slice: Wl,
  Sliders: v0,
  SlidersHorizontal: $l,
  SlidersVertical: v0,
  Smartphone: Ql,
  SmartphoneCharging: Kl,
  SmartphoneNfc: Jl,
  Smile: jl,
  SmilePlus: Yl,
  Snail: ag,
  Snowflake: tg,
  Sofa: hg,
  SortAsc: M1,
  SortDesc: c1,
  Soup: dg,
  Space: pg,
  Spade: cg,
  Sparkle: eg,
  Sparkles: o0,
  Speaker: sg,
  Speech: Mg,
  SpellCheck: ng,
  SpellCheck2: rg,
  Spline: vg,
  Split: og,
  SplitSquareHorizontal: pa,
  SplitSquareVertical: ca,
  SprayCan: ig,
  Sprout: lg,
  Square: ug,
  SquareActivity: i0,
  SquareArrowDown: x0,
  SquareArrowDownLeft: l0,
  SquareArrowDownRight: g0,
  SquareArrowLeft: y0,
  SquareArrowOutDownLeft: m0,
  SquareArrowOutDownRight: H0,
  SquareArrowOutUpLeft: u0,
  SquareArrowOutUpRight: V0,
  SquareArrowRight: w0,
  SquareArrowUp: f0,
  SquareArrowUpLeft: C0,
  SquareArrowUpRight: A0,
  SquareAsterisk: L0,
  SquareBottomDashedScissors: S0,
  SquareChartGantt: X,
  SquareCheck: k0,
  SquareCheckBig: Z0,
  SquareChevronDown: P0,
  SquareChevronLeft: z0,
  SquareChevronRight: B0,
  SquareChevronUp: T0,
  SquareCode: D0,
  SquareDashedBottom: xg,
  SquareDashedBottomCode: gg,
  SquareDashedKanban: F0,
  SquareDashedMousePointer: b0,
  SquareDivide: R0,
  SquareDot: O0,
  SquareEqual: q0,
  SquareFunction: U0,
  SquareGanttChart: X,
  SquareKanban: _0,
  SquareLibrary: E0,
  SquareM: N0,
  SquareMenu: I0,
  SquareMinus: G0,
  SquareMousePointer: X0,
  SquareParking: $0,
  SquareParkingOff: W0,
  SquarePen: T,
  SquarePercent: K0,
  SquarePi: J0,
  SquarePilcrow: Q0,
  SquarePlay: Y0,
  SquarePlus: j0,
  SquarePower: aa,
  SquareRadical: yg,
  SquareScissors: ta,
  SquareSigma: ha,
  SquareSlash: da,
  SquareSplitHorizontal: pa,
  SquareSplitVertical: ca,
  SquareSquare: mg,
  SquareStack: Hg,
  SquareTerminal: ea,
  SquareUser: Ma,
  SquareUserRound: sa,
  SquareX: ra,
  Squircle: Vg,
  Squirrel: wg,
  Stamp: Cg,
  Star: Lg,
  StarHalf: Ag,
  StarOff: fg,
  Stars: o0,
  StepBack: Sg,
  StepForward: Zg,
  Stethoscope: kg,
  Sticker: Pg,
  StickyNote: zg,
  StopCircle: d2,
  Store: Bg,
  StretchHorizontal: Tg,
  StretchVertical: Dg,
  Strikethrough: Fg,
  Subscript: bg,
  Subtitles: x1,
  Sun: _g,
  SunDim: Rg,
  SunMedium: Og,
  SunMoon: qg,
  SunSnow: Ug,
  Sunrise: Eg,
  Sunset: Ng,
  Superscript: Ig,
  SwatchBook: Gg,
  SwissFranc: Xg,
  SwitchCamera: Wg,
  Sword: $g,
  Swords: Kg,
  Syringe: Jg,
  Table: px,
  Table2: Qg,
  TableCellsMerge: Yg,
  TableCellsSplit: jg,
  TableColumnsSplit: ax,
  TableOfContents: tx,
  TableProperties: hx,
  TableRowsSplit: dx,
  Tablet: ex,
  TabletSmartphone: cx,
  Tablets: sx,
  Tag: Mx,
  Tags: rx,
  Tally1: nx,
  Tally2: vx,
  Tally3: ox,
  Tally4: ix,
  Tally5: lx,
  Tangent: gx,
  Target: xx,
  Telescope: yx,
  Tent: Hx,
  TentTree: mx,
  Terminal: ux,
  TerminalSquare: ea,
  TestTube: Vx,
  TestTube2: na,
  TestTubeDiagonal: na,
  TestTubes: wx,
  Text: Sx,
  TextCursor: Ax,
  TextCursorInput: Cx,
  TextQuote: fx,
  TextSearch: Lx,
  TextSelect: va,
  TextSelection: va,
  Theater: Zx,
  Thermometer: zx,
  ThermometerSnowflake: kx,
  ThermometerSun: Px,
  ThumbsDown: Bx,
  ThumbsUp: Tx,
  Ticket: Ux,
  TicketCheck: Dx,
  TicketMinus: Fx,
  TicketPercent: bx,
  TicketPlus: Rx,
  TicketSlash: Ox,
  TicketX: qx,
  Tickets: Ex,
  TicketsPlane: _x,
  Timer: Gx,
  TimerOff: Nx,
  TimerReset: Ix,
  ToggleLeft: Xx,
  ToggleRight: Wx,
  Tornado: $x,
  Torus: Kx,
  Touchpad: Qx,
  TouchpadOff: Jx,
  TowerControl: Yx,
  ToyBrick: jx,
  Tractor: ay,
  TrafficCone: ty,
  Train: oa,
  TrainFront: dy,
  TrainFrontTunnel: hy,
  TrainTrack: py,
  TramFront: oa,
  Trash: ey,
  Trash2: cy,
  TreeDeciduous: sy,
  TreePalm: ia,
  TreePine: My,
  Trees: ry,
  Trello: ny,
  TrendingDown: vy,
  TrendingUp: iy,
  TrendingUpDown: oy,
  Triangle: gy,
  TriangleAlert: la,
  TriangleRight: ly,
  Trophy: xy,
  Truck: yy,
  Turtle: my,
  Tv: uy,
  Tv2: ga,
  TvMinimal: ga,
  TvMinimalPlay: Hy,
  Twitch: Vy,
  Twitter: wy,
  Type: Ay,
  TypeOutline: Cy,
  Umbrella: Ly,
  UmbrellaOff: fy,
  Underline: Sy,
  Undo: Py,
  Undo2: Zy,
  UndoDot: ky,
  UnfoldHorizontal: zy,
  UnfoldVertical: By,
  Ungroup: Ty,
  University: xa,
  Unlink: Fy,
  Unlink2: Dy,
  Unlock: U2,
  UnlockKeyhole: q2,
  Unplug: by,
  Upload: Ry,
  UploadCloud: n2,
  Usb: Oy,
  User: $y,
  User2: wa,
  UserCheck: qy,
  UserCheck2: ya,
  UserCircle: c2,
  UserCircle2: p2,
  UserCog: Uy,
  UserCog2: ma,
  UserMinus: _y,
  UserMinus2: Ha,
  UserPen: Ey,
  UserPlus: Ny,
  UserPlus2: ua,
  UserRound: wa,
  UserRoundCheck: ya,
  UserRoundCog: ma,
  UserRoundMinus: Ha,
  UserRoundPen: Iy,
  UserRoundPlus: ua,
  UserRoundSearch: Gy,
  UserRoundX: Va,
  UserSearch: Xy,
  UserSquare: Ma,
  UserSquare2: sa,
  UserX: Wy,
  UserX2: Va,
  Users: Ky,
  Users2: Ca,
  UsersRound: Ca,
  Utensils: fa,
  UtensilsCrossed: Aa,
  UtilityPole: Jy,
  Variable: Qy,
  Vault: Yy,
  Vegan: jy,
  VenetianMask: am,
  Verified: v1,
  Vibrate: hm,
  VibrateOff: tm,
  Video: pm,
  VideoOff: dm,
  Videotape: cm,
  View: em,
  Voicemail: sm,
  Volume: om,
  Volume1: Mm,
  Volume2: rm,
  VolumeOff: nm,
  VolumeX: vm,
  Vote: im,
  Wallet: gm,
  Wallet2: La,
  WalletCards: lm,
  WalletMinimal: La,
  Wallpaper: xm,
  Wand: ym,
  Wand2: Sa,
  WandSparkles: Sa,
  Warehouse: mm,
  WashingMachine: Hm,
  Watch: um,
  Waves: Vm,
  Waypoints: wm,
  Webcam: Cm,
  Webhook: fm,
  WebhookOff: Am,
  Weight: Lm,
  Wheat: Zm,
  WheatOff: Sm,
  WholeWord: km,
  Wifi: Dm,
  WifiHigh: Pm,
  WifiLow: zm,
  WifiOff: Bm,
  WifiZero: Tm,
  Wind: Fm,
  Wine: Rm,
  WineOff: bm,
  Workflow: Om,
  Worm: qm,
  WrapText: Um,
  Wrench: _m,
  X: Em,
  XCircle: e2,
  XOctagon: G2,
  XSquare: ra,
  Youtube: Nm,
  Zap: Gm,
  ZapOff: Im,
  ZoomIn: Xm,
  ZoomOut: Wm
}, Symbol.toStringTag, { value: "Module" })), Km = ["innerHTML"], Jm = {
  __name: "index",
  props: {
    name: String,
    color: String,
    size: String,
    stroke: Number,
    animation: String,
    animationSpeed: String
  },
  setup(c) {
    const p = c, e = u(() => {
      let r = $m[Wa(p.name)];
      if (!r) return null;
      const [v, x, d] = r;
      return h(v, x, d).innerHTML;
    });
    function h(r, v, x = []) {
      const d = document.createElementNS("http://www.w3.org/2000/svg", r);
      return Object.keys(v).forEach((M) => {
        d.setAttribute(M, String(v[M]));
      }), x.length && x.forEach((M) => {
        const C = h(...M);
        d.appendChild(C);
      }), d;
    }
    const s = u(() => {
      let r = {
        style: {}
      };
      return p.color && (r.style["--icon-color"] = p.color), p.size && (r.style["--icon-size"] = p.size), p.stroke && (r.style["--icon-stroke"] = p.stroke), p.animationSpeed && (r.style["--icon-animation-speed"] = p.animationSpeed), r;
    });
    return (r, v) => e.value ? (l(), g("svg", Ea({
      key: 0,
      innerHTML: e.value,
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      class: [
        "icon",
        `icon--${p.name}`,
        p.animation && `icon--animation-${p.animation}`
      ]
    }, s.value), null, 16, Km)) : b("", !0);
  }
}, Za = /* @__PURE__ */ H(Jm, [["__scopeId", "data-v-1fa2d036"]]), Qm = ["disabled"], Ym = ["disabled"], jm = {
  __name: "controller",
  setup(c) {
    const p = q(), e = Ta(), h = u(() => !0), s = u(() => !0);
    function r() {
      p.prev();
    }
    function v() {
      p.next();
    }
    return (x, d) => (l(), g("nav", {
      class: R([
        "controller",
        F(e).swipe && "swipe"
      ])
    }, [
      S("button", {
        type: "button",
        title: "prev slide",
        disabled: !h.value,
        class: "prev",
        onClick: r
      }, [
        V(Za, { name: "chevron-left" })
      ], 8, Qm),
      S("button", {
        type: "button",
        title: "next slide",
        disabled: !s.value,
        class: "next",
        onClick: v
      }, [
        V(Za, { name: "chevron-right" })
      ], 8, Ym)
    ], 2));
  }
}, aH = /* @__PURE__ */ H(jm, [["__scopeId", "data-v-9a1f3098"]]), tH = {};
function hH(c, p) {
  return l(), g("p", null, ".paginate");
}
const dH = /* @__PURE__ */ H(tH, [["render", hH]]), pH = { class: "slides" }, cH = {
  __name: "index",
  setup(c) {
    P(), q();
    const p = D();
    W("slides", {
      change: e
      // next,
      // prev,
    });
    function e(h) {
      console.log("change slide", h);
    }
    return (h, s) => (l(), g("div", pH, [
      V(ht, {
        ref_key: "$images",
        ref: p
      }, null, 512),
      V(aH),
      V(dH)
    ]));
  }
}, eH = /* @__PURE__ */ H(cH, [["__scopeId", "data-v-dbbe9a68"]]), sH = { class: "container" }, MH = {
  __name: "index",
  setup(c) {
    return Na("preference"), (p, e) => (l(), g("div", sH, [
      V(eH)
    ]));
  }
}, rH = /* @__PURE__ */ H(MH, [["__scopeId", "data-v-5c7168b6"]]), nH = {};
function vH(c, p) {
  return l(), g("div", null, " loading... ");
}
const oH = /* @__PURE__ */ H(nH, [["render", vH]]), iH = {};
function lH(c, p) {
  return l(), g("p", null, ".error");
}
const gH = /* @__PURE__ */ H(iH, [["render", lH]]), xH = {
  class: /* @__PURE__ */ R([
    "slideshow"
  ])
}, yH = { class: "debug" }, mH = {
  __name: "index",
  props: {
    preference: Object,
    slides: Array
  },
  emits: [
    "update-preference",
    "update-slides"
  ],
  setup(c, { expose: p, emit: e }) {
    const h = P(), s = q(), r = c, v = ka({
      loading: !0,
      error: void 0,
      swipe: !1
    }), x = e, d = u(() => ({
      active: s.active
    }));
    W("preference", { updatePreference: k }), W("slides", { updateSlides: n }), Pa(() => {
      h.setup(r.preference, !0), M().then();
    }), Ia(() => {
      h.destroy(), s.destroy(), C().then();
    }), za(() => r.slides, (w) => {
    }, { deep: !1 }), p({
      stop: C,
      start: M,
      restart: Z
    });
    async function M() {
      s.setup(r.slides), await E(), v.loading = !1;
    }
    async function C() {
      s.destroy(), await E(), v.loading = !0;
    }
    async function Z() {
      await C(), await E(), await M();
    }
    function k(w) {
      w && h.setup(w), x("update-preference", h.exportData());
    }
    function n() {
      const w = s.exportData();
      x("update-slides", w);
    }
    return (w, U) => (l(), g("div", xH, [
      v.loading ? (l(), N(oH, { key: 0 })) : v.error ? (l(), N(gH, { key: 1 })) : (l(), N(rH, { key: 2 })),
      S("pre", yH, Ga(d.value), 1)
    ]));
  }
}, VH = /* @__PURE__ */ H(mH, [["__scopeId", "data-v-c4e7456f"]]);
export {
  VH as default
};
