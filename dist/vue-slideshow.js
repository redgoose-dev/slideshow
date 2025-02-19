import { computed as b, createElementBlock as k, createCommentVNode as E, openBlock as m, mergeProps as he, Fragment as J, createElementVNode as H, createVNode as z, normalizeStyle as se, ref as $, reactive as ie, onMounted as ee, watch as O, normalizeClass as G, unref as A, renderList as ve, toDisplayString as Y, withModifiers as ae, onBeforeUnmount as ue, createBlock as V, renderSlot as pe, nextTick as le, withCtx as me, resolveDynamicComponent as ge } from "vue";
import { defineStore as te } from "pinia";
function ye(a = 3e3) {
  return new Promise((e) => setTimeout(e, a));
}
function Z(a) {
  try {
    if (!a) throw new Error("no src");
    try {
      return structuredClone(a);
    } catch {
      return JSON.parse(JSON.stringify(a));
    }
  } catch {
    return null;
  }
}
function fe(a, e) {
  let r = { ...a };
  for (let t in e)
    e.hasOwnProperty(t) && (typeof e[t] == "object" && e[t] !== null && a[t] ? r[t] = fe(a[t], e[t]) : r[t] = e[t]);
  return r;
}
function _e(a) {
  return a.replace(/(\w)(\w*)(_|-|\s*)/g, (e, r, t) => r.toUpperCase() + t.toLowerCase());
}
const M = {
  NONE: "none",
  FADE: "fade",
  HORIZONTAL: "horizontal"
}, U = {
  NONE: "none",
  SHUFFLE: "shuffle"
}, ce = {
  NONE: "none",
  CONTAIN: "contain",
  COVER: "cover",
  SCALE_DOWN: "scale-down",
  FILL: "fill"
}, de = {
  WINDOW: "window"
};
function xe(a) {
  return Object.values(M).includes(a.slides.transitionType) || (a.slides.transitionType = M.NONE), Object.values(U).includes(a.slides.captionAnimationType) || (a.slides.captionAnimationType = U.NONE), Object.values(ce).includes(a.style.imageType) || (a.style.imageType = ce.NONE), a;
}
function ke(a) {
  if (!Array.isArray(a)) throw new Error("slides data is not array");
  if (!a.length) throw new Error("EMPTY_SLIDES");
  a.forEach((e) => {
    if (!e.src) throw new Error("slide data is not valid");
  });
}
const we = {
  general: {
    // 슬라이드쇼에서 사용하는 각 항목 UI 표시할지에 대한 여부
    hud: !0,
    // 슬라이드쇼에 갖다대면 hud 영역이 등장한다.
    visibleHudHover: !1,
    // 슬라이드쇼를 클릭하면 hud 영역이 나왔다 없어진다.
    visibleHudClick: !1,
    // 특정 항목을 사용할지에 대한 스위치
    hudContents: {
      // 슬라이드쇼 하위 요소들
      slots: !0,
      // 캡션 영역
      caption: !0,
      // 컨트롤러 영역
      controller: !0,
      // 페이지 번호 영역
      paginate: !0
    }
  },
  slides: {
    // 마지막에서 처음으로 되돌리기
    loop: !0,
    // 스와이프 사용여부
    swipe: !0,
    // 트랜지션 종류 (none,fade,horizontal)
    transitionType: "horizontal",
    // 트랜지션 속도 (ms)
    transitionSpeed: 500,
    // none,shuffle
    captionAnimationType: "none",
    // 캡션 애니메이션 속도 (fps)
    captionAnimationSpeed: 40,
    // 자동재생 기능사용 (자동재생이 켜진다는 의미가 아니다)
    autoplay: !1,
    // 자동재생 공백시간
    autoplayDelay: 7e3,
    // next(true), prev(false)
    autoplayDirection: !0,
    // 영역에 갖다댈때 자동재생 일시정지 여부
    autoplayPauseOnHover: !0
  },
  // 스타일
  style: {
    // 이미지 표시 타입 `none,contain,cover,scale-down,fill`
    imageType: "contain",
    // 전체 영역에서 표시되는 이미지 사이즈 `[ width, height ]`
    imageScale: ["100%", "100%"],
    // 캡션 사이즈 퍼센트(%)
    captionScale: 100,
    // 캡션의 위치 [ left, top ]
    captionPosition: ["32px", "30px"]
  },
  // 키보드 이벤트
  keyboard: {
    // 이벤트 객체 `element,window`
    eventTarget: "element",
    // 단축키 사용유무
    enable: !0
  }
}, be = {
  "direction.prev": "Prev Slide",
  "direction.next": "Next Slide",
  "error.title": "Error",
  "error.title-empty": "Empty",
  "error.empty": "No slide data is available."
}, D = te("preference", {
  state: () => ({
    general: void 0,
    slides: void 0,
    style: void 0,
    keyboard: void 0
  }),
  getters: {},
  actions: {
    setup(a) {
      let e = fe(Z(we), a);
      e = xe(e), this.general = e.general, this.slides = e.slides, this.style = e.style, this.keyboard = e.keyboard;
    },
    exportData() {
      return Z({
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
}), K = te("slides", {
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
      return this.order.map((a) => Z(this.data.get(a)));
    },
    images() {
      return this.order.map((a) => {
        const e = this.data.get(a);
        return {
          src: e.src,
          alt: e.title
        };
      });
    },
    activeIndex() {
      return this.order.indexOf(this.active);
    }
  },
  actions: {
    setup(a, e) {
      const r = (a == null ? void 0 : a.length) > 0 ? a : [];
      ke(r), r.forEach((t, s) => {
        const { key: p, ...u } = t, o = String(p || s + 1);
        this.order.push(o), this.data.set(o, u);
      }), e && this.order.includes(e) && (this.active = e), this.active || (this.active = this.order[0]);
    },
    destroy() {
      this.data.clear(), this.order = [];
    },
    prev() {
      var t;
      if (this.lock || ((t = this.order) == null ? void 0 : t.length) <= 1) return;
      const a = D(), e = this.order.indexOf(this.active);
      let r;
      a.slides.loop ? r = (e - 1 + this.order.length) % this.order.length : r = e > 0 ? e - 1 : 0, this.direction = !1, this.active = this.order[r];
    },
    next() {
      var t;
      if (this.lock || ((t = this.order) == null ? void 0 : t.length) <= 1) return;
      const a = D(), e = this.order.indexOf(this.active);
      let r;
      a.slides.loop ? r = (e + 1) % this.order.length : r = e < this.order.length - 1 ? e + 1 : this.order.length - 1, this.direction = !0, this.active = this.order[r];
    },
    /**
     * change slide
     * @param {string} key
     */
    change(a) {
      var t;
      if (this.lock || ((t = this.order) == null ? void 0 : t.length) <= 1 || !a || a === this.active) return;
      const e = this.order.indexOf(this.active), r = this.order.indexOf(a);
      r <= -1 || (this.direction = e < r, this.active = this.active = this.order[r]);
    }
  }
}), oe = te("language", {
  state: () => ({
    data: /* @__PURE__ */ new Map()
  }),
  getters: {},
  actions: {
    setup(a) {
      const e = Object.assign({}, Z(be), a);
      Object.entries(e).forEach(([r, t]) => this.data.set(r, t));
    },
    print(a) {
      return this.data.get(a) || void 0;
    }
  }
}), ne = te("state", {
  state: () => ({
    swipe: !1,
    playedSlide: !1,
    playedSlideCancel: !1,
    autoplay: !0,
    hud: !1,
    isClickSlide: !1
  }),
  actions: {
    setup(a) {
      const e = D();
      a.autoplay !== void 0 && (this.autoplay = a.autoplay), this.hud = e.general.hud;
    }
  }
});
/**
 * @license lucide v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const P = {
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
 * @license lucide v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Se = ["svg", P, [["path", { d: "m15 18-6-6 6-6" }]]];
/**
 * @license lucide v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Te = ["svg", P, [["path", { d: "m9 18 6-6-6-6" }]]];
/**
 * @license lucide v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ne = [
  "svg",
  P,
  [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["polygon", { points: "10 8 16 12 10 16 10 8" }]
  ]
];
/**
 * @license lucide v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ee = [
  "svg",
  P,
  [
    ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
    ["path", { d: "m9.2 22 3-7" }],
    ["path", { d: "m9 13-3 7" }],
    ["path", { d: "m17 13-3 7" }]
  ]
];
/**
 * @license lucide v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ae = [
  "svg",
  P,
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
 * @license lucide v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ce = [
  "svg",
  P,
  [
    ["path", { d: "M9 10h.01" }],
    ["path", { d: "M15 10h.01" }],
    ["path", { d: "M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z" }]
  ]
];
/**
 * @license lucide v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ie = [
  "svg",
  P,
  [["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" }]]
];
/**
 * @license lucide v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Me = [
  "svg",
  P,
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
 * @license lucide v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Oe = [
  "svg",
  P,
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
 * @license lucide v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pe = [
  "svg",
  P,
  [
    ["path", { d: "M18 6 6 18" }],
    ["path", { d: "m6 6 12 12" }]
  ]
], F = (a, e) => {
  const r = a.__vccOpts || a;
  for (const [t, s] of e)
    r[t] = s;
  return r;
}, Le = ["innerHTML"], Xe = {
  __name: "index",
  props: {
    name: String,
    color: String,
    size: String,
    stroke: Number
  },
  setup(a) {
    const e = a, r = {
      ChevronLeft: Se,
      ChevronRight: Te,
      CloudRainWind: Ee,
      Skull: Me,
      Ghost: Ce,
      CirclePlay: Ne,
      Sun: Oe,
      Moon: Ie,
      Cog: Ae,
      X: Pe
    }, t = b(() => {
      let u = r[_e(e.name)];
      if (!u) return null;
      const [o, l, n] = u;
      return s(o, l, n).innerHTML;
    });
    function s(u, o, l = []) {
      const n = document.createElementNS("http://www.w3.org/2000/svg", u);
      return Object.keys(o).forEach((y) => {
        n.setAttribute(y, String(o[y]));
      }), l.length && l.forEach((y) => {
        const v = s(...y);
        n.appendChild(v);
      }), n;
    }
    const p = b(() => {
      let u = {
        style: {}
      };
      return e.color && (u.style["--icon-color"] = e.color), e.size && (u.style["--icon-size"] = e.size), e.stroke && (u.style["--icon-stroke"] = e.stroke), u;
    });
    return (u, o) => t.value ? (m(), k("svg", he({
      key: 0,
      innerHTML: t.value,
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
        `icon--${e.name}`
      ]
    }, p.value), null, 16, Le)) : E("", !0);
  }
}, Q = /* @__PURE__ */ F(Xe, [["__scopeId", "data-v-941a542a"]]), $e = { key: 0 }, He = ["src", "alt"], De = {
  __name: "images-item",
  props: {
    keyName: String,
    loaded: Boolean,
    src: String,
    alt: String,
    error: Boolean
  },
  emits: ["error"],
  setup(a, { emit: e }) {
    const r = D(), t = a, s = e, p = b(() => {
      const { imageScale: o, imageType: l } = r.style;
      return {
        "--w": o[0],
        "--h": o[1],
        "--fit": l
      };
    });
    function u() {
      s("error", t.keyName);
    }
    return (o, l) => (m(), k(J, null, [
      t.error ? (m(), k("p", $e, [
        H("i", null, [
          z(Q, { name: "cloud-rain-wind" })
        ]),
        l[0] || (l[0] = H("span", null, "no image", -1))
      ])) : E("", !0),
      t.loaded ? (m(), k("img", {
        key: 1,
        src: t.src,
        alt: t.alt,
        style: se(p.value),
        onError: u
      }, null, 44, He)) : E("", !0)
    ], 64));
  }
}, re = /* @__PURE__ */ F(De, [["__scopeId", "data-v-a9c65d04"]]), Fe = {
  key: 0,
  class: "slide-first"
}, Re = {
  key: 1,
  class: "slide-last"
}, ze = {
  __name: "images",
  emits: [
    "change",
    "transition-start",
    "transition-end",
    "short-touch"
  ],
  setup(a, { emit: e }) {
    const r = D(), t = K(), s = ne(), p = e, u = $(), o = $({}), l = $(), n = ie({
      items: t.order.reduce((i, _) => {
        const w = t.data.get(_);
        return i[_] = {
          src: w.src,
          alt: w.title,
          loaded: !1,
          error: !1
        }, i;
      }, {}),
      classNameActive: "active",
      classNamePrevActive: "",
      active: "",
      prevActive: "",
      swipePosX: NaN
    }), y = b(() => {
      if (t.order.indexOf(n.active) <= -1) return;
      let i = {};
      switch (r.slides.transitionType) {
        case M.FADE:
          break;
        case M.HORIZONTAL:
          switch (i["--speed-transition"] = `${r.slides.transitionSpeed}ms`, n.prevActive) {
            case "first":
              i["--active-column"] = 0;
              break;
            case "last":
              i["--active-column"] = t.order.length + 1;
              break;
            default:
              t.order.length > 1 ? (i["--active-column"] = S(n.prevActive || n.active), r.slides.loop && i["--active-column"]++) : i["--active-column"] = 0;
              break;
          }
          isNaN(n.swipePosX) || (i["--swipe-pos-x"] = `${n.swipePosX}%`);
          break;
      }
      return i;
    }), v = b(() => {
      if (r.slides.transitionType !== "horizontal" || !r.slides.loop || t.order.length <= 1) return !1;
      const i = n.items[t.order[t.order.length - 1]];
      return {
        src: i.src,
        loaded: i.loaded,
        error: i.error
      };
    }), f = b(() => {
      if (r.slides.transitionType !== "horizontal" || !r.slides.loop || t.order.length <= 1) return !1;
      const i = n.items[t.order[0]];
      return {
        src: i.src,
        loaded: i.loaded,
        error: i.error
      };
    });
    let c = {
      touched: !1,
      dist: 0,
      startX: 0,
      startTime: null
    };
    ee(() => {
      n.active = t.active, L(t.order, t.order.indexOf(n.active), r.slides.loop);
    }), O(() => t.active, async (i) => {
      t.order.length <= 1 || await C(i);
    });
    async function C(i) {
      var T;
      const { transitionType: _, loop: w } = r.slides;
      switch (p("transition-start"), _) {
        case M.NONE:
          n.active = i, L(t.order, t.order.indexOf(n.active), w), p("transition-end");
          break;
        case M.FADE:
          t.lock = !0, s.playedSlide = !0, n.prevActive = n.active, n.classNamePrevActive = "fade-out", n.active = i, n.classNameActive = "fade-in hide", await ye(20), n.classNameActive = "fade-in", (T = o.value[n.active]) == null || T.addEventListener("transitionend", g, { once: !0 });
          break;
        case M.HORIZONTAL:
          t.lock = !0, s.playedSlide = !0;
          const N = {
            prev: S(n.active),
            next: S(i)
          };
          w && (N.prev === 0 && N.next >= t.order.length - 1 ? n.prevActive = "first" : N.prev >= t.order.length - 1 && N.next === 0 ? n.prevActive = "last" : n.prevActive = ""), n.active = i, l.value.addEventListener("transitionend", g, { once: !0 });
          break;
      }
    }
    function g() {
      const { transitionType: i, loop: _ } = r.slides;
      switch (i) {
        case M.FADE:
          n.prevActive = "", n.classNamePrevActive = "", n.classNameActive = "active", s.playedSlide = !1, t.lock = !1, L(t.order, t.order.indexOf(n.active), _), p("transition-end");
          break;
        case M.HORIZONTAL:
          s.playedSlide = !1, n.prevActive = "", t.lock = !1, L(t.order, t.order.indexOf(n.active), _), p("transition-end");
          break;
      }
    }
    function d() {
      s.playedSlideCancel = !0, l.value.addEventListener("transitionend", x, { once: !0 });
    }
    function x() {
      s.playedSlideCancel = !1;
    }
    function S(i) {
      const _ = t.order.indexOf(i);
      return _ > -1 ? _ : void 0;
    }
    function L(i, _, w, T = 2) {
      const N = i.length;
      for (let X = 0 - T; X <= T; X++) {
        let R = _ + X;
        if (R < 0)
          if (w) R = N + R;
          else continue;
        else if (R >= N)
          if (w) R = R % N;
          else continue;
        n.items[i[R]] && (n.items[i[R]].loaded = !0);
      }
    }
    function j(i) {
      n.items[i] && (n.items[i].error = !0);
    }
    function W(i) {
      if (i.stopPropagation(), i.touches && (c.touched = !0), i.touches && i.touches.length > 1 && i.preventDefault(), s.playedSlide || !r.slides.swipe || r.slides.transitionType !== M.HORIZONTAL || t.order.length <= 2) return;
      c.dist = 0, c.startX = i.touches && i.touches[0] ? Math.floor(i.touches[0].clientX) : i.clientX || i.pageX;
      const _ = 50;
      c.startX < _ || c.startX > screen.width - _ || (c.startTime = (/* @__PURE__ */ new Date()).getTime(), s.swipe = !0);
    }
    function B(i) {
      if (i.stopPropagation(), !i.touches && c.touched || !s.swipe || t.order.length <= 2) return;
      c.moveX = i.touches && i.touches[0] ? Math.floor(i.touches[0].clientX) : i.clientX || i.pageX;
      const _ = u.value.offsetWidth, w = c.moveX - c.startX, T = r.slides.loop ? 1 : 0;
      n.swipePosX = w / _ * 100 + (0 - 100 * (S(n.active) + T));
    }
    function h(i) {
      if (i.stopPropagation(), !i.touches && c.touched || !s.swipe || i.touches && i.touches.length > 0 || t.order.length <= 2) return;
      const _ = u.value.offsetWidth;
      c.endX = i.changedTouches && i.changedTouches[0] ? Math.floor(i.changedTouches[0].clientX) : i.clientX || i.pageX;
      const w = c.startX > c.endX, T = (/* @__PURE__ */ new Date()).getTime() - c.startTime, N = c.endX - c.startX, X = Math.abs(N) / _ * 100;
      if (c.dist = 0, c.startX = void 0, c.startTime = void 0, c.moveX = void 0, c.endX = void 0, s.swipe = !1, n.swipePosX = NaN, T < 60 || X < 1) {
        s.isClickSlide = !0;
        return;
      }
      if (s.isClickSlide = !1, !r.slides.loop) {
        if (w) {
          if (t.activeIndex === t.data.size - 1) {
            d();
            return;
          }
        } else if (t.activeIndex === 0) {
          d();
          return;
        }
      }
      T > 300 ? X > 30 ? t[w ? "next" : "prev"]() : d() : X > 5 ? t[w ? "next" : "prev"]() : d();
    }
    function I() {
      s.swipe && d(), s.swipe = !1, n.swipePosX = NaN;
    }
    function q() {
      s.swipe = !1, n.swipePosX = NaN;
    }
    return (i, _) => {
      var w;
      return m(), k("div", {
        ref_key: "$root",
        ref: u,
        class: G([
          "images",
          `mode--${(w = A(r).slides) == null ? void 0 : w.transitionType}`,
          A(s).playedSlide && "animation-play",
          A(s).playedSlideCancel && "animation-cancel",
          A(s).swipe && "swipe"
        ]),
        style: se(y.value),
        onTouchstart: W,
        onTouchmove: B,
        onTouchend: h,
        onMousedown: W,
        onMousemove: B,
        onMouseup: h,
        onMouseleave: I,
        onContextmenu: q
      }, [
        H("ul", {
          ref_key: "$body",
          ref: l,
          class: "body"
        }, [
          v.value ? (m(), k("li", Fe, [
            z(re, {
              "key-name": "first-slide-image",
              loaded: v.value.loaded,
              src: v.value.src,
              error: v.value.error
            }, null, 8, ["loaded", "src", "error"])
          ])) : E("", !0),
          (m(!0), k(J, null, ve(n.items, (T, N) => (m(), k("li", {
            ref_for: !0,
            ref: (X) => {
              o.value[N] = X;
            },
            class: G([
              !!n.classNameActive && n.active === N && n.classNameActive,
              !!n.classNamePrevActive && n.prevActive === N && n.classNamePrevActive
            ])
          }, [
            z(re, {
              "key-name": N,
              loaded: T.loaded,
              src: T.src,
              alt: T.alt,
              error: T.error,
              onError: j
            }, null, 8, ["key-name", "loaded", "src", "alt", "error"])
          ], 2))), 256)),
          f.value ? (m(), k("li", Re, [
            z(re, {
              "key-name": "last-slide-image",
              loaded: f.value.loaded,
              src: f.value.src,
              error: f.value.error
            }, null, 8, ["loaded", "src", "error"])
          ])) : E("", !0)
        ], 512),
        _[0] || (_[0] = H("i", {
          class: "overlay",
          draggable: "false"
        }, null, -1))
      ], 38);
    };
  }
}, We = /* @__PURE__ */ F(ze, [["__scopeId", "data-v-f1c432bd"]]);
function Be(a, e) {
  e = Object.assign({}, {
    text: "",
    // 최종적으로 표시되는 텍스트
    waitChar: "-",
    // 변경되기 전에 표시되는 텍스트
    charSpeed: 1,
    // 한 번에 바뀌는 글자의 개수
    moveFix: 25,
    // 텍스트가 바뀌는 딜레이 시간
    moveRange: 10,
    // 랜덤으로 글자가 바뀌고 있을 때의 시간 관련
    moveTrigger: 25,
    // 랜덤으로 글자가 바뀌고 있을 때의 시간 관련
    fps: 60,
    // 초당 프레임 수
    pattern: "abcdefghijklmnopqrstuvwxyz0123456789-_!@#$%^&*()+~<>",
    // random text pattern
    randomTextType: null,
    // unicode, pattern
    retry: !0,
    // 함수가 실행할 때마다 텍스트가 새로 만들어진다.
    callback: null
    // 애니메이션이 끝나고 실행되는 함수
  }, e), e.text = e.text.trim();
  let r = [], t = 0, s = 0, p = "", u = !0, o = !1, l = 0;
  const n = 1e3 / e.fps;
  function y(f) {
    const c = f - l;
    if (c > n) {
      l = f - c % n;
      let C = p;
      u = !0;
      for (let g = s; g <= t; g++)
        if (r[g] !== 0 && r[g] != null) {
          u = !1;
          const d = r[g];
          let x = "";
          if (Math.abs(d) <= e.moveTrigger) {
            switch (e.randomTextType) {
              case "pattern":
                x = v(e.pattern);
                break;
              case "unicode":
              default:
                const S = Math.min(Math.max(e.text.charCodeAt(g) + d, 33), 126);
                x = String.fromCharCode(S);
                break;
            }
            C += x;
          } else
            C += e.waitChar;
          d > 0 ? r[g] -= 1 : r[g] += 1;
        } else
          s === g - 1 && (s = g, p = e.text.substring(0, s)), C += e.text.charAt(g);
      if (a.textContent = C, t <= e.text.length ? t += e.charSpeed : o = !0, u && o) {
        a.dataset.id && cancelAnimationFrame(parseInt(a.dataset.id)), a.textContent = p, a.dataset.run = "false", e.callback && e.callback();
        return;
      }
    }
    a.dataset.id = requestAnimationFrame(y);
  }
  function v(f) {
    const c = Math.floor(Math.random() * f.length);
    return f.substring(c, c + 1);
  }
  if (e.text || e.text && !e.retry && a.dataset.run !== "true") {
    a.dataset.run = "true", a.textContent = e.waitChar;
    for (let f = 0; f <= e.text.length - 1; f++)
      e.text.charAt(f) !== " " ? r[f] = (e.moveFix + Math.round(Math.random() * e.moveRange)) * (Math.round(Math.random()) - 0.5) * 2 : r[f] = 0;
    t = 0, s = 0, p = "", a.dataset.id && cancelAnimationFrame(Number(a.dataset.id)), a.dataset.id = requestAnimationFrame(y);
  }
}
const je = { key: 0 }, Ve = { key: 1 }, Ye = {
  __name: "caption",
  setup(a) {
    const e = $(), r = $(), t = D(), s = K(), p = ie({
      opacity: 1,
      speed: 0
    }), u = b(() => {
      const { captionPosition: v, captionScale: f } = t.style;
      return {
        "--caption-left": v[0],
        "--caption-top": v[1],
        "--caption-scale": f,
        "--caption-opacity": p.opacity,
        "--caption-speed": `${p.speed}ms`
      };
    }), o = b(() => {
      if (!s.data.get(s.active)) return {};
      const { title: v, description: f } = s.data.get(s.active);
      return { title: v, description: f };
    }), l = b(() => t.slides.captionAnimationType);
    let n = {
      title: void 0,
      description: void 0
    };
    ee(() => {
      switch (l.value) {
        case U.SHUFFLE:
          y();
          break;
      }
    }), O(() => s.active, (v, f) => {
      switch (l.value) {
        case U.SHUFFLE:
          y();
          break;
      }
    });
    function y() {
      var C;
      const { captionAnimationSpeed: v } = t.slides;
      function f(g, d) {
        try {
          Be(g, {
            text: d,
            fps: v,
            randomTextType: "pattern"
          });
        } catch {
          c();
        }
      }
      function c() {
        var g, d, x, S;
        (d = (g = e.value) == null ? void 0 : g.dataset) != null && d.id && cancelAnimationFrame(Number(e.value.dataset.id)), (S = (x = r.value) == null ? void 0 : x.dataset) != null && S.id && cancelAnimationFrame(Number(r.value.dataset.id)), n.title && clearTimeout(n.title), n.description && clearTimeout(n.description);
      }
      c(), (C = r.value) != null && C.dataset.id && (clearInterval(Number(r.value.dataset.id)), r.value.innerText = ""), o.value.title && (n.title = setTimeout(() => {
        clearTimeout(n.title), n.title = void 0, f(e.value, o.value.title);
      }, 10)), o.value.description && (n.description = setTimeout(() => {
        clearTimeout(n.description), n.description = void 0, f(r.value, o.value.description);
      }, 300));
    }
    return (v, f) => (m(), k("article", {
      class: "caption",
      style: se(u.value)
    }, [
      l.value === A(U).NONE ? (m(), k(J, { key: 0 }, [
        o.value.title ? (m(), k("h1", je, Y(o.value.title), 1)) : E("", !0),
        o.value.description ? (m(), k("p", Ve, Y(o.value.description), 1)) : E("", !0)
      ], 64)) : (m(), k(J, { key: 1 }, [
        o.value.title ? (m(), k("h1", {
          key: 0,
          ref_key: "$title",
          ref: e
        }, null, 512)) : E("", !0),
        o.value.description ? (m(), k("p", {
          key: 1,
          ref_key: "$description",
          ref: r
        }, null, 512)) : E("", !0)
      ], 64))
    ], 4));
  }
}, Ze = /* @__PURE__ */ F(Ye, [["__scopeId", "data-v-2e4c1d44"]]), Ke = ["title", "disabled"], Ue = ["title", "disabled"], Ge = {
  __name: "controller",
  setup(a) {
    const e = D(), r = K(), t = ne(), s = oe(), p = b(() => e.slides.loop ? !0 : 0 < r.activeIndex), u = b(() => e.slides.loop ? !0 : r.order.length - 1 > r.activeIndex);
    function o() {
      r.prev();
    }
    function l() {
      r.next();
    }
    return (n, y) => (m(), k("nav", {
      class: G([
        "controller",
        A(t).swipe && "swipe"
      ])
    }, [
      H("button", {
        type: "button",
        title: A(s).print("direction.prev"),
        disabled: !p.value,
        class: "prev",
        onClick: ae(o, ["stop"])
      }, [
        z(Q, { name: "chevron-left" })
      ], 8, Ke),
      H("button", {
        type: "button",
        title: A(s).print("direction.next"),
        disabled: !u.value,
        class: "next",
        onClick: ae(l, ["stop"])
      }, [
        z(Q, { name: "chevron-right" })
      ], 8, Ue)
    ], 2));
  }
}, qe = /* @__PURE__ */ F(Ge, [["__scopeId", "data-v-9e222bcc"]]), Je = { class: "paginate" }, Qe = {
  __name: "paginate",
  setup(a) {
    const e = K(), r = b(() => e.order.length), t = b(() => e.activeIndex + 1);
    return (s, p) => (m(), k("p", Je, Y(t.value) + " / " + Y(r.value), 1));
  }
}, et = /* @__PURE__ */ F(Qe, [["__scopeId", "data-v-8e8ad4b5"]]), tt = {
  __name: "index",
  setup(a) {
    const e = D(), r = K(), t = ne(), s = $(!t.autoplay), p = $(e.general.hud), u = $(e.general.hud);
    let o, l = s.value;
    const n = b(() => {
      var d, x;
      return !!((x = (d = e.general) == null ? void 0 : d.hudContents) != null && x.controller) && r.order.length > 1;
    });
    ee(() => y()), ue(() => v()), O(() => t.autoplay, (d) => {
      s.value = !d, d ? y() : v();
    }), O(() => r.lock, (d) => {
      s.value = d, d ? v() : y();
    }), O(() => t.swipe, (d) => {
      s.value = d, d ? v() : y();
    });
    function y() {
      e.slides.autoplayPauseOnHover && l !== void 0 && (s.value = l), e.slides.autoplay && t.autoplay && !s.value && (v(), o = setTimeout(f, e.slides.autoplayDelay));
    }
    function v() {
      o && (clearTimeout(o), o = void 0);
    }
    function f() {
      if (!t.autoplay) return;
      const { autoplayDirection: d } = e.slides;
      d ? r.next() : r.prev();
    }
    function c(d) {
      d.stopPropagation();
      const { visibleHudClick: x } = e.general;
      x && (u.value = !1);
      const { autoplayPauseOnHover: S } = e.slides;
      S && (l = !1, y());
    }
    function C() {
      const { visibleHudClick: d } = e.general;
      d && (u.value = !0);
      const { autoplayPauseOnHover: x } = e.slides;
      x && (l = !0, v());
    }
    function g() {
      e.general.visibleHudClick && t.isClickSlide && (p.value = !p.value);
    }
    return (d, x) => {
      var S, L, j, W, B, h, I;
      return m(), k("div", {
        class: "slides",
        onMouseleave: c,
        onMouseenter: C,
        onClick: ae(g, ["prevent"])
      }, [
        z(We, { class: "images" }),
        H("div", {
          class: G([
            "hud",
            p.value && "use",
            ((S = A(e).general) == null ? void 0 : S.visibleHudHover) && "hover"
          ])
        }, [
          (j = (L = A(e).general) == null ? void 0 : L.hudContents) != null && j.caption ? (m(), V(Ze, {
            key: 0,
            class: "slides__caption"
          })) : E("", !0),
          n.value ? (m(), V(qe, {
            key: 1,
            class: "slides__controller"
          })) : E("", !0),
          (B = (W = A(e).general) == null ? void 0 : W.hudContents) != null && B.paginate ? (m(), V(et, {
            key: 2,
            class: "slides__paginate"
          })) : E("", !0),
          (I = (h = A(e).general) == null ? void 0 : h.hudContents) != null && I.slots ? pe(d.$slots, "default", { key: 3 }, void 0, !0) : E("", !0)
        ], 2)
      ], 32);
    };
  }
}, nt = /* @__PURE__ */ F(tt, [["__scopeId", "data-v-9b3be34a"]]), rt = { class: "error" }, at = {
  __name: "index",
  props: {
    message: { type: String, default: "Invalid error" }
  },
  setup(a) {
    const e = a, r = oe(), t = b(() => {
      switch (e.message) {
        case "EMPTY_SLIDES":
          return r.print("error.title-empty");
        default:
          return r.print("error.title");
      }
    }), s = b(() => {
      switch (e.message) {
        case "EMPTY_SLIDES":
          return r.print("error.empty");
        default:
          return e.message;
      }
    }), p = b(() => {
      switch (e.message) {
        case "EMPTY_SLIDES":
          return "ghost";
        default:
          return "skull";
      }
    });
    return (u, o) => (m(), k("article", rt, [
      z(Q, { name: p.value }, null, 8, ["name"]),
      H("h1", null, Y(t.value), 1),
      H("p", null, Y(s.value), 1)
    ]));
  }
}, st = /* @__PURE__ */ F(at, [["__scopeId", "data-v-95b78cd2"]]), it = ["tabindex"], ot = {
  __name: "index",
  props: {
    active: [String, Number],
    // 활성된 슬라이드 키
    autoplay: Boolean,
    // 자동재생
    preference: Object,
    // 설정 데이터
    slides: Array,
    // 슬라이드 데이터
    language: Object,
    // 언어 데이터 객체
    theme: { type: String, default: "system" }
    // 컬러테마 (system,light,dark)
  },
  emits: [
    "update:active",
    "update:autoplay"
  ],
  setup(a, { expose: e, emit: r }) {
    const t = D(), s = K(), p = oe(), u = ne(), o = $(), l = a, n = ie({
      stop: !0,
      error: void 0,
      swipe: !1,
      tabIndex: ""
    }), y = r;
    let v;
    ee(() => g()), ue(() => d()), O(() => l.slides, () => x(), { deep: !0 }), O(() => l.preference, () => x(), { deep: !0 }), O(() => String(l.active), (h, I) => {
      h !== s.active && s.change(h);
    }), O(() => s.active, (h) => y("update:active", h)), O(() => l.autoplay, (h) => {
      u.autoplay = h;
    });
    function f() {
      switch (t.keyboard.eventTarget) {
        case de.WINDOW:
          n.tabIndex = "", window.addEventListener("keyup", c);
          break;
        default:
          if (!o.value) return;
          n.tabIndex = "0", o.value.addEventListener("keyup", c);
          break;
      }
    }
    function c(h) {
      var q;
      if (!((q = t == null ? void 0 : t.keyboard) != null && q.enable)) return;
      const { keyCode: I } = h;
      switch (I) {
        case 37:
          s.prev();
          break;
        case 39:
          s.next();
          break;
      }
    }
    function C() {
      var h;
      switch (n.tabIndex = "", (h = t.keyboard) == null ? void 0 : h.eventTarget) {
        case de.WINDOW:
          window.removeEventListener("keyup", c);
          break;
        default:
          if (!o.value) return;
          o.value.removeEventListener("keyup", c);
          break;
      }
    }
    async function g() {
      var h;
      if (n.stop)
        try {
          p.setup(l.language), t.setup(l.preference), (h = t.slides) != null && h.autoplay || y("update:autoplay", !1), s.setup(l.slides, String(l.active)), u.setup({
            autoplay: t.slides.autoplay && l.autoplay
          }), await le(), f(), n.stop = !1;
        } catch (I) {
          n.error = I;
        }
    }
    async function d() {
      C(), t.destroy(), s.destroy(), n.stop = !0, n.error = void 0;
    }
    async function x() {
      await d(), await le(), await g();
    }
    function S() {
      s.prev();
    }
    function L() {
      s.next();
    }
    function j(h) {
      h !== s.active && s.change(String(h));
    }
    function W() {
      return Z({
        preference: t.exportData(),
        slides: {
          data: s.order.reduce((h, I) => (h.push({
            ...s.data.get(I),
            key: I
          }), h), []),
          active: s.active,
          activeIndex: s.activeIndex
        },
        language: Object.fromEntries(p.data)
      });
    }
    function B() {
      return Z(s.order);
    }
    return e({
      start: g,
      stop: d,
      restart: x,
      prev: S,
      next: L,
      change: j,
      exportData: W,
      getKeys: B
    }), (h, I) => (m(), k("div", {
      ref_key: "$slideshow",
      ref: o,
      tabindex: n.tabIndex,
      class: G(["slideshow", `theme--${l.theme}`])
    }, [
      n.error ? (m(), V(st, {
        key: 0,
        message: n.error.message
      }, null, 8, ["message"])) : n.stop ? E("", !0) : (m(), V(nt, { key: 1 }, {
        default: me(() => [
          pe(h.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      })),
      A(v) ? (m(), V(ge(A(v)), { key: 2 })) : E("", !0)
    ], 10, it));
  }
}, dt = /* @__PURE__ */ F(ot, [["__scopeId", "data-v-777b39d2"]]);
export {
  dt as default
};
