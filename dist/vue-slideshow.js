import { computed as S, createElementBlock as _, createCommentVNode as E, openBlock as h, mergeProps as ve, Fragment as Q, createElementVNode as H, createVNode as z, normalizeStyle as ie, ref as M, reactive as se, onMounted as te, watch as P, withModifiers as B, normalizeClass as J, unref as A, renderList as he, toDisplayString as K, onBeforeUnmount as ue, createBlock as Z, renderSlot as pe, nextTick as le, withCtx as me, resolveDynamicComponent as ge } from "vue";
import { defineStore as ne } from "pinia";
function ye(a = 3e3) {
  return new Promise((e) => setTimeout(e, a));
}
function U(a) {
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
const O = {
  NONE: "none",
  FADE: "fade",
  HORIZONTAL: "horizontal"
}, q = {
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
  return Object.values(O).includes(a.slides.transitionType) || (a.slides.transitionType = O.NONE), Object.values(q).includes(a.slides.captionAnimationType) || (a.slides.captionAnimationType = q.NONE), Object.values(ce).includes(a.style.imageType) || (a.style.imageType = ce.NONE), a;
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
}, D = ne("preference", {
  state: () => ({
    general: void 0,
    slides: void 0,
    style: void 0,
    keyboard: void 0
  }),
  getters: {},
  actions: {
    setup(a) {
      let e = fe(U(we), a);
      e = xe(e), this.general = e.general, this.slides = e.slides, this.style = e.style, this.keyboard = e.keyboard;
    },
    exportData() {
      return U({
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
}), G = ne("slides", {
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
      return this.order.map((a) => U(this.data.get(a)));
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
      ke(r), r.forEach((t, i) => {
        const { key: f, ...u } = t, o = String(f || i + 1);
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
}), oe = ne("language", {
  state: () => ({
    data: /* @__PURE__ */ new Map()
  }),
  getters: {},
  actions: {
    setup(a) {
      const e = Object.assign({}, U(be), a);
      Object.entries(e).forEach(([r, t]) => this.data.set(r, t));
    },
    print(a) {
      return this.data.get(a) || void 0;
    }
  }
}), re = ne("state", {
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
const L = {
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
const Se = ["svg", L, [["path", { d: "m15 18-6-6 6-6" }]]];
/**
 * @license lucide v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Te = ["svg", L, [["path", { d: "m9 18 6-6-6-6" }]]];
/**
 * @license lucide v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ne = [
  "svg",
  L,
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
  L,
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
  L,
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
  L,
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
  L,
  [["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" }]]
];
/**
 * @license lucide v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Oe = [
  "svg",
  L,
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
const Pe = [
  "svg",
  L,
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
const Me = [
  "svg",
  L,
  [
    ["path", { d: "M18 6 6 18" }],
    ["path", { d: "m6 6 12 12" }]
  ]
], F = (a, e) => {
  const r = a.__vccOpts || a;
  for (const [t, i] of e)
    r[t] = i;
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
      Skull: Oe,
      Ghost: Ce,
      CirclePlay: Ne,
      Sun: Pe,
      Moon: Ie,
      Cog: Ae,
      X: Me
    }, t = S(() => {
      let u = r[_e(e.name)];
      if (!u) return null;
      const [o, l, n] = u;
      return i(o, l, n).innerHTML;
    });
    function i(u, o, l = []) {
      const n = document.createElementNS("http://www.w3.org/2000/svg", u);
      return Object.keys(o).forEach((k) => {
        n.setAttribute(k, String(o[k]));
      }), l.length && l.forEach((k) => {
        const m = i(...k);
        n.appendChild(m);
      }), n;
    }
    const f = S(() => {
      let u = {
        style: {}
      };
      return e.color && (u.style["--icon-color"] = e.color), e.size && (u.style["--icon-size"] = e.size), e.stroke && (u.style["--icon-stroke"] = e.stroke), u;
    });
    return (u, o) => t.value ? (h(), _("svg", ve({
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
    }, f.value), null, 16, Le)) : E("", !0);
  }
}, ee = /* @__PURE__ */ F(Xe, [["__scopeId", "data-v-941a542a"]]), $e = { key: 0 }, He = ["src", "alt"], De = {
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
    const r = D(), t = a, i = e, f = S(() => {
      const { imageScale: o, imageType: l } = r.style;
      return {
        "--w": o[0],
        "--h": o[1],
        "--fit": l
      };
    });
    function u() {
      i("error", t.keyName);
    }
    return (o, l) => (h(), _(Q, null, [
      t.error ? (h(), _("p", $e, [
        H("i", null, [
          z(ee, { name: "cloud-rain-wind" })
        ]),
        l[0] || (l[0] = H("span", null, "no image", -1))
      ])) : E("", !0),
      t.loaded ? (h(), _("img", {
        key: 1,
        src: t.src,
        alt: t.alt,
        style: ie(f.value),
        onError: u
      }, null, 44, He)) : E("", !0)
    ], 64));
  }
}, ae = /* @__PURE__ */ F(De, [["__scopeId", "data-v-a9c65d04"]]), Fe = {
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
    const r = D(), t = G(), i = re(), f = e, u = M(), o = M({}), l = M(), n = se({
      items: t.order.reduce((s, y) => {
        const b = t.data.get(y);
        return s[y] = {
          src: b.src,
          alt: b.title,
          loaded: !1,
          error: !1
        }, s;
      }, {}),
      classNameActive: "active",
      classNamePrevActive: "",
      active: "",
      prevActive: "",
      swipePosX: NaN
    }), k = S(() => {
      if (t.order.indexOf(n.active) <= -1) return;
      let s = {};
      switch (r.slides.transitionType) {
        case O.FADE:
          break;
        case O.HORIZONTAL:
          switch (s["--speed-transition"] = `${r.slides.transitionSpeed}ms`, n.prevActive) {
            case "first":
              s["--active-column"] = 0;
              break;
            case "last":
              s["--active-column"] = t.order.length + 1;
              break;
            default:
              t.order.length > 1 ? (s["--active-column"] = w(n.prevActive || n.active), r.slides.loop && s["--active-column"]++) : s["--active-column"] = 0;
              break;
          }
          isNaN(n.swipePosX) || (s["--swipe-pos-x"] = `${n.swipePosX}%`);
          break;
      }
      return s;
    }), m = S(() => {
      if (r.slides.transitionType !== "horizontal" || !r.slides.loop || t.order.length <= 1) return !1;
      const s = n.items[t.order[t.order.length - 1]];
      return {
        src: s.src,
        loaded: s.loaded,
        error: s.error
      };
    }), d = S(() => {
      if (r.slides.transitionType !== "horizontal" || !r.slides.loop || t.order.length <= 1) return !1;
      const s = n.items[t.order[0]];
      return {
        src: s.src,
        loaded: s.loaded,
        error: s.error
      };
    });
    let c = {
      touched: !1,
      dist: 0,
      startX: 0,
      startTime: null
    };
    te(() => {
      n.active = t.active, X(t.order, t.order.indexOf(n.active), r.slides.loop);
    }), P(() => t.active, async (s) => {
      t.order.length <= 1 || await C(s);
    });
    async function C(s) {
      var T;
      const { transitionType: y, loop: b } = r.slides;
      switch (f("transition-start"), y) {
        case O.NONE:
          n.active = s, X(t.order, t.order.indexOf(n.active), b), f("transition-end");
          break;
        case O.FADE:
          t.lock = !0, i.playedSlide = !0, n.prevActive = n.active, n.classNamePrevActive = "fade-out", n.active = s, n.classNameActive = "fade-in hide", await ye(20), n.classNameActive = "fade-in", (T = o.value[n.active]) == null || T.addEventListener("transitionend", g, { once: !0 });
          break;
        case O.HORIZONTAL:
          t.lock = !0, i.playedSlide = !0;
          const N = {
            prev: w(n.active),
            next: w(s)
          };
          b && (N.prev === 0 && N.next >= t.order.length - 1 ? n.prevActive = "first" : N.prev >= t.order.length - 1 && N.next === 0 ? n.prevActive = "last" : n.prevActive = ""), n.active = s, l.value.addEventListener("transitionend", g, { once: !0 });
          break;
      }
    }
    function g() {
      const { transitionType: s, loop: y } = r.slides;
      switch (s) {
        case O.FADE:
          n.prevActive = "", n.classNamePrevActive = "", n.classNameActive = "active", i.playedSlide = !1, t.lock = !1, X(t.order, t.order.indexOf(n.active), y), f("transition-end");
          break;
        case O.HORIZONTAL:
          i.playedSlide = !1, n.prevActive = "", t.lock = !1, X(t.order, t.order.indexOf(n.active), y), f("transition-end");
          break;
      }
    }
    function x() {
      i.playedSlideCancel = !0, l.value.addEventListener("transitionend", p, { once: !0 });
    }
    function p() {
      i.playedSlideCancel = !1;
    }
    function w(s) {
      const y = t.order.indexOf(s);
      return y > -1 ? y : void 0;
    }
    function X(s, y, b, T = 2) {
      const N = s.length;
      for (let $ = 0 - T; $ <= T; $++) {
        let R = y + $;
        if (R < 0)
          if (b) R = N + R;
          else continue;
        else if (R >= N)
          if (b) R = R % N;
          else continue;
        n.items[s[R]] && (n.items[s[R]].loaded = !0);
      }
    }
    function j(s) {
      n.items[s] && (n.items[s].error = !0);
    }
    function V(s) {
      if (s.pointerType === "touch" && (c.touched = !0), i.playedSlide || !r.slides.swipe || r.slides.transitionType !== O.HORIZONTAL || t.order.length <= 2) return;
      c.dist = 0, c.startX = s.clientX || s.pageX;
      const y = 50;
      c.startX < y || c.startX > screen.width - y || (c.startTime = (/* @__PURE__ */ new Date()).getTime(), i.swipe = !0);
    }
    function Y(s) {
      if (!i.swipe || t.order.length <= 2) return;
      c.moveX = s.clientX || s.pageX;
      const y = u.value.offsetWidth, b = c.moveX - c.startX, T = r.slides.loop ? 1 : 0;
      n.swipePosX = b / y * 100 + (0 - 100 * (w(n.active) + T));
    }
    function v(s) {
      if (!i.swipe || t.order.length <= 2) return;
      const y = u.value.offsetWidth;
      c.endX = s.clientX || s.pageX;
      const b = c.startX > c.endX, T = (/* @__PURE__ */ new Date()).getTime() - c.startTime, N = c.endX - c.startX, $ = Math.abs(N) / y * 100;
      if (c.dist = 0, c.startX = void 0, c.startTime = void 0, c.moveX = void 0, c.endX = void 0, i.swipe = !1, n.swipePosX = NaN, T < 60 || $ < 1) {
        i.isClickSlide = !0;
        return;
      }
      if (i.isClickSlide = !1, !r.slides.loop) {
        if (b) {
          if (t.activeIndex === t.data.size - 1) {
            x();
            return;
          }
        } else if (t.activeIndex === 0) {
          x();
          return;
        }
      }
      T > 300 ? $ > 30 ? t[b ? "next" : "prev"]() : x() : $ > 5 ? t[b ? "next" : "prev"]() : x();
    }
    function I() {
      i.swipe && x(), i.swipe = !1, n.swipePosX = NaN;
    }
    function W() {
      i.swipe = !1, n.swipePosX = NaN;
    }
    return (s, y) => {
      var b;
      return h(), _("div", {
        ref_key: "$root",
        ref: u,
        class: J([
          "images",
          `mode--${(b = A(r).slides) == null ? void 0 : b.transitionType}`,
          A(i).playedSlide && "animation-play",
          A(i).playedSlideCancel && "animation-cancel",
          A(i).swipe && "swipe"
        ]),
        style: ie(k.value),
        onPointerdown: B(V, ["stop"]),
        onPointermove: B(Y, ["stop"]),
        onPointerup: B(v, ["stop"]),
        onPointerleave: I,
        onContextmenu: W
      }, [
        H("ul", {
          ref_key: "$body",
          ref: l,
          class: "body"
        }, [
          m.value ? (h(), _("li", Fe, [
            z(ae, {
              "key-name": "first-slide-image",
              loaded: m.value.loaded,
              src: m.value.src,
              error: m.value.error
            }, null, 8, ["loaded", "src", "error"])
          ])) : E("", !0),
          (h(!0), _(Q, null, he(n.items, (T, N) => (h(), _("li", {
            ref_for: !0,
            ref: ($) => {
              o.value[N] = $;
            },
            class: J([
              !!n.classNameActive && n.active === N && n.classNameActive,
              !!n.classNamePrevActive && n.prevActive === N && n.classNamePrevActive
            ])
          }, [
            z(ae, {
              "key-name": N,
              loaded: T.loaded,
              src: T.src,
              alt: T.alt,
              error: T.error,
              onError: j
            }, null, 8, ["key-name", "loaded", "src", "alt", "error"])
          ], 2))), 256)),
          d.value ? (h(), _("li", Re, [
            z(ae, {
              "key-name": "last-slide-image",
              loaded: d.value.loaded,
              src: d.value.src,
              error: d.value.error
            }, null, 8, ["loaded", "src", "error"])
          ])) : E("", !0)
        ], 512),
        y[0] || (y[0] = H("i", {
          class: "overlay",
          draggable: "false"
        }, null, -1))
      ], 38);
    };
  }
}, We = /* @__PURE__ */ F(ze, [["__scopeId", "data-v-6bb3061a"]]);
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
  let r = [], t = 0, i = 0, f = "", u = !0, o = !1, l = 0;
  const n = 1e3 / e.fps;
  function k(d) {
    const c = d - l;
    if (c > n) {
      l = d - c % n;
      let C = f;
      u = !0;
      for (let g = i; g <= t; g++)
        if (r[g] !== 0 && r[g] != null) {
          u = !1;
          const x = r[g];
          let p = "";
          if (Math.abs(x) <= e.moveTrigger) {
            switch (e.randomTextType) {
              case "pattern":
                p = m(e.pattern);
                break;
              case "unicode":
              default:
                const w = Math.min(Math.max(e.text.charCodeAt(g) + x, 33), 126);
                p = String.fromCharCode(w);
                break;
            }
            C += p;
          } else
            C += e.waitChar;
          x > 0 ? r[g] -= 1 : r[g] += 1;
        } else
          i === g - 1 && (i = g, f = e.text.substring(0, i)), C += e.text.charAt(g);
      if (a.textContent = C, t <= e.text.length ? t += e.charSpeed : o = !0, u && o) {
        a.dataset.id && cancelAnimationFrame(parseInt(a.dataset.id)), a.textContent = f, a.dataset.run = "false", e.callback && e.callback();
        return;
      }
    }
    a.dataset.id = requestAnimationFrame(k);
  }
  function m(d) {
    const c = Math.floor(Math.random() * d.length);
    return d.substring(c, c + 1);
  }
  if (e.text || e.text && !e.retry && a.dataset.run !== "true") {
    a.dataset.run = "true", a.textContent = e.waitChar;
    for (let d = 0; d <= e.text.length - 1; d++)
      e.text.charAt(d) !== " " ? r[d] = (e.moveFix + Math.round(Math.random() * e.moveRange)) * (Math.round(Math.random()) - 0.5) * 2 : r[d] = 0;
    t = 0, i = 0, f = "", a.dataset.id && cancelAnimationFrame(Number(a.dataset.id)), a.dataset.id = requestAnimationFrame(k);
  }
}
const je = { key: 0 }, Ve = { key: 1 }, Ye = {
  __name: "caption",
  setup(a) {
    const e = M(), r = M(), t = D(), i = G(), f = se({
      opacity: 1,
      speed: 0
    }), u = S(() => {
      const { captionPosition: m, captionScale: d } = t.style;
      return {
        "--caption-left": m[0],
        "--caption-top": m[1],
        "--caption-scale": d,
        "--caption-opacity": f.opacity,
        "--caption-speed": `${f.speed}ms`
      };
    }), o = S(() => {
      if (!i.data.get(i.active)) return {};
      const { title: m, description: d } = i.data.get(i.active);
      return { title: m, description: d };
    }), l = S(() => t.slides.captionAnimationType);
    let n = {
      title: void 0,
      description: void 0
    };
    te(() => {
      switch (l.value) {
        case q.SHUFFLE:
          k();
          break;
      }
    }), P(() => i.active, (m, d) => {
      switch (l.value) {
        case q.SHUFFLE:
          k();
          break;
      }
    });
    function k() {
      var C;
      const { captionAnimationSpeed: m } = t.slides;
      function d(g, x) {
        try {
          Be(g, {
            text: x,
            fps: m,
            randomTextType: "pattern"
          });
        } catch {
          c();
        }
      }
      function c() {
        var g, x, p, w;
        (x = (g = e.value) == null ? void 0 : g.dataset) != null && x.id && cancelAnimationFrame(Number(e.value.dataset.id)), (w = (p = r.value) == null ? void 0 : p.dataset) != null && w.id && cancelAnimationFrame(Number(r.value.dataset.id)), n.title && clearTimeout(n.title), n.description && clearTimeout(n.description);
      }
      c(), (C = r.value) != null && C.dataset.id && (clearInterval(Number(r.value.dataset.id)), r.value.innerText = ""), o.value.title && (n.title = setTimeout(() => {
        clearTimeout(n.title), n.title = void 0, d(e.value, o.value.title);
      }, 10)), o.value.description && (n.description = setTimeout(() => {
        clearTimeout(n.description), n.description = void 0, d(r.value, o.value.description);
      }, 300));
    }
    return (m, d) => (h(), _("article", {
      class: "caption",
      style: ie(u.value)
    }, [
      l.value === A(q).NONE ? (h(), _(Q, { key: 0 }, [
        o.value.title ? (h(), _("h1", je, K(o.value.title), 1)) : E("", !0),
        o.value.description ? (h(), _("p", Ve, K(o.value.description), 1)) : E("", !0)
      ], 64)) : (h(), _(Q, { key: 1 }, [
        o.value.title ? (h(), _("h1", {
          key: 0,
          ref_key: "$title",
          ref: e
        }, null, 512)) : E("", !0),
        o.value.description ? (h(), _("p", {
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
    const e = D(), r = G(), t = re(), i = oe(), f = S(() => e.slides.loop ? !0 : 0 < r.activeIndex), u = S(() => e.slides.loop ? !0 : r.order.length - 1 > r.activeIndex);
    function o() {
      r.prev();
    }
    function l() {
      r.next();
    }
    return (n, k) => (h(), _("nav", {
      class: J([
        "controller",
        A(t).swipe && "swipe"
      ])
    }, [
      H("button", {
        type: "button",
        title: A(i).print("direction.prev"),
        disabled: !f.value,
        class: "prev",
        onClick: B(o, ["stop"])
      }, [
        z(ee, { name: "chevron-left" })
      ], 8, Ke),
      H("button", {
        type: "button",
        title: A(i).print("direction.next"),
        disabled: !u.value,
        class: "next",
        onClick: B(l, ["stop"])
      }, [
        z(ee, { name: "chevron-right" })
      ], 8, Ue)
    ], 2));
  }
}, qe = /* @__PURE__ */ F(Ge, [["__scopeId", "data-v-9e222bcc"]]), Je = { class: "paginate" }, Qe = {
  __name: "paginate",
  setup(a) {
    const e = G(), r = S(() => e.order.length), t = S(() => e.activeIndex + 1);
    return (i, f) => (h(), _("p", Je, K(t.value) + " / " + K(r.value), 1));
  }
}, et = /* @__PURE__ */ F(Qe, [["__scopeId", "data-v-8e8ad4b5"]]), tt = {
  __name: "index",
  setup(a) {
    const e = D(), r = G(), t = re(), i = M(!t.autoplay), f = M(e.general.hud), u = M(e.general.hud), o = M(!1);
    let l, n = i.value;
    const k = S(() => {
      var p, w;
      return !!((w = (p = e.general) == null ? void 0 : p.hudContents) != null && w.controller) && r.order.length > 1;
    });
    te(() => {
      o.value = !0, m();
    }), ue(() => {
      o.value = !1, d();
    }), P(() => t.autoplay, (p) => {
      i.value = !p, p ? m() : d();
    }), P(() => r.lock, (p) => {
      i.value = p, p ? d() : m();
    }), P(() => t.swipe, (p) => {
      i.value = p, p ? d() : m();
    });
    function m() {
      e.slides.autoplayPauseOnHover && n !== void 0 && (i.value = n), e.slides.autoplay && t.autoplay && !i.value && (d(), l = setTimeout(c, e.slides.autoplayDelay));
    }
    function d() {
      l && (clearTimeout(l), l = void 0);
    }
    function c() {
      if (!t.autoplay) return;
      const { autoplayDirection: p } = e.slides;
      p ? r.next() : r.prev();
    }
    function C() {
      if (!(o != null && o.value)) return;
      const { visibleHudClick: p } = e.general;
      p && (u.value = !1);
      const { autoplayPauseOnHover: w } = e.slides;
      w && (n = !1, m());
    }
    function g() {
      if (!(o != null && o.value)) return;
      const { visibleHudClick: p } = e.general;
      p && (u.value = !0);
      const { autoplayPauseOnHover: w } = e.slides;
      w && (n = !0, d());
    }
    function x() {
      e.general.visibleHudClick && t.isClickSlide && (f.value = !f.value);
    }
    return (p, w) => {
      var X, j, V, Y, v, I, W;
      return h(), _("div", {
        class: "slides",
        onPointerleave: B(C, ["stop"]),
        onPointerenter: g,
        onClick: B(x, ["prevent"])
      }, [
        z(We, { class: "images" }),
        H("div", {
          class: J([
            "hud",
            f.value && "use",
            ((X = A(e).general) == null ? void 0 : X.visibleHudHover) && "hover"
          ])
        }, [
          (V = (j = A(e).general) == null ? void 0 : j.hudContents) != null && V.caption ? (h(), Z(Ze, {
            key: 0,
            class: "slides__caption"
          })) : E("", !0),
          k.value ? (h(), Z(qe, {
            key: 1,
            class: "slides__controller"
          })) : E("", !0),
          (v = (Y = A(e).general) == null ? void 0 : Y.hudContents) != null && v.paginate ? (h(), Z(et, {
            key: 2,
            class: "slides__paginate"
          })) : E("", !0),
          (W = (I = A(e).general) == null ? void 0 : I.hudContents) != null && W.slots ? pe(p.$slots, "default", { key: 3 }, void 0, !0) : E("", !0)
        ], 2)
      ], 32);
    };
  }
}, nt = /* @__PURE__ */ F(tt, [["__scopeId", "data-v-31dee602"]]), rt = { class: "error" }, at = {
  __name: "index",
  props: {
    message: { type: String, default: "Invalid error" }
  },
  setup(a) {
    const e = a, r = oe(), t = S(() => {
      switch (e.message) {
        case "EMPTY_SLIDES":
          return r.print("error.title-empty");
        default:
          return r.print("error.title");
      }
    }), i = S(() => {
      switch (e.message) {
        case "EMPTY_SLIDES":
          return r.print("error.empty");
        default:
          return e.message;
      }
    }), f = S(() => {
      switch (e.message) {
        case "EMPTY_SLIDES":
          return "ghost";
        default:
          return "skull";
      }
    });
    return (u, o) => (h(), _("article", rt, [
      z(ee, { name: f.value }, null, 8, ["name"]),
      H("h1", null, K(t.value), 1),
      H("p", null, K(i.value), 1)
    ]));
  }
}, it = /* @__PURE__ */ F(at, [["__scopeId", "data-v-95b78cd2"]]), st = ["tabindex"], ot = {
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
    const t = D(), i = G(), f = oe(), u = re(), o = M(), l = a, n = se({
      stop: !0,
      error: void 0,
      swipe: !1,
      tabIndex: ""
    }), k = r;
    let m;
    te(() => g()), ue(() => x()), P(() => l.slides, () => p(), { deep: !0 }), P(() => l.preference, () => p(), { deep: !0 }), P(() => String(l.active), (v, I) => {
      v !== i.active && i.change(v);
    }), P(() => i.active, (v) => k("update:active", v)), P(() => l.autoplay, (v) => {
      u.autoplay = v;
    });
    function d() {
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
    function c(v) {
      var W;
      if (!((W = t == null ? void 0 : t.keyboard) != null && W.enable)) return;
      const { keyCode: I } = v;
      switch (I) {
        case 37:
          i.prev();
          break;
        case 39:
          i.next();
          break;
      }
    }
    function C() {
      var v;
      switch (n.tabIndex = "", (v = t.keyboard) == null ? void 0 : v.eventTarget) {
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
      var v;
      if (n.stop)
        try {
          f.setup(l.language), t.setup(l.preference), (v = t.slides) != null && v.autoplay || k("update:autoplay", !1), i.setup(l.slides, String(l.active)), u.setup({
            autoplay: t.slides.autoplay && l.autoplay
          }), await le(), d(), n.stop = !1;
        } catch (I) {
          n.error = I;
        }
    }
    async function x() {
      C(), t.destroy(), i.destroy(), n.stop = !0, n.error = void 0;
    }
    async function p() {
      await x(), await le(), await g();
    }
    function w() {
      i.prev();
    }
    function X() {
      i.next();
    }
    function j(v) {
      v !== i.active && i.change(String(v));
    }
    function V() {
      return U({
        preference: t.exportData(),
        slides: {
          data: i.order.reduce((v, I) => (v.push({
            ...i.data.get(I),
            key: I
          }), v), []),
          active: i.active,
          activeIndex: i.activeIndex
        },
        language: Object.fromEntries(f.data)
      });
    }
    function Y() {
      return U(i.order);
    }
    return e({
      start: g,
      stop: x,
      restart: p,
      prev: w,
      next: X,
      change: j,
      exportData: V,
      getKeys: Y
    }), (v, I) => (h(), _("div", {
      ref_key: "$slideshow",
      ref: o,
      tabindex: n.tabIndex,
      class: J(["slideshow", `theme--${l.theme}`])
    }, [
      n.error ? (h(), Z(it, {
        key: 0,
        message: n.error.message
      }, null, 8, ["message"])) : n.stop ? E("", !0) : (h(), Z(nt, { key: 1 }, {
        default: me(() => [
          pe(v.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      })),
      A(m) ? (h(), Z(ge(A(m)), { key: 2 })) : E("", !0)
    ], 10, st));
  }
}, dt = /* @__PURE__ */ F(ot, [["__scopeId", "data-v-777b39d2"]]);
export {
  dt as default
};
