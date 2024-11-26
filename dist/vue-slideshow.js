import { computed as b, openBlock as v, createElementBlock as _, mergeProps as he, createCommentVNode as E, Fragment as J, createElementVNode as $, createVNode as F, normalizeStyle as se, ref as X, reactive as ie, onMounted as ee, watch as O, normalizeClass as q, unref as N, renderList as ve, toDisplayString as Z, withModifiers as ae, onBeforeUnmount as ue, createBlock as Y, renderSlot as pe, nextTick as le, withCtx as me, resolveDynamicComponent as ge } from "vue";
import { defineStore as te } from "pinia";
function ye(a = 3e3) {
  return new Promise((e) => setTimeout(e, a));
}
function K(a) {
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
const I = {
  NONE: "none",
  FADE: "fade",
  HORIZONTAL: "horizontal"
}, G = {
  NONE: "none",
  SHUFFLE: "shuffle"
}, ce = {
  NONE: "none",
  CONTAIN: "contain",
  COVER: "cover"
}, de = {
  ELEMENT: "element",
  WINDOW: "window"
};
function xe(a) {
  return Object.values(I).includes(a.slides.transitionType) || (a.slides.transitionType = I.NONE), Object.values(G).includes(a.slides.captionAnimationType) || (a.slides.captionAnimationType = G.NONE), Object.values(ce).includes(a.style.imageType) || (a.style.imageType = ce.NONE), a;
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
    // 이미지 표시 타입 `none,contain,cover`
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
}, H = te("preference", {
  state: () => ({
    general: void 0,
    slides: void 0,
    style: void 0,
    keyboard: void 0
  }),
  getters: {},
  actions: {
    setup(a) {
      let e = fe(K(we), a);
      e = xe(e), this.general = e.general, this.slides = e.slides, this.style = e.style, this.keyboard = e.keyboard;
    },
    exportData() {
      return K({
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
}), U = te("slides", {
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
      return this.order.map((a) => K(this.data.get(a)));
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
      if (this.lock) return;
      const a = H(), e = this.order.indexOf(this.active);
      let r;
      a.slides.loop ? r = (e - 1 + this.order.length) % this.order.length : r = e > 0 ? e - 1 : 0, this.direction = !1, this.active = this.order[r];
    },
    next() {
      if (this.lock) return;
      const a = H(), e = this.order.indexOf(this.active);
      let r;
      a.slides.loop ? r = (e + 1) % this.order.length : r = e < this.order.length - 1 ? e + 1 : this.order.length - 1, this.direction = !0, this.active = this.order[r];
    },
    /**
     * change slide
     * @param {string} key
     */
    change(a) {
      if (this.lock || !a || a === this.active) return;
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
      const e = Object.assign({}, K(be), a);
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
      const e = H();
      a.autoplay !== void 0 && (this.autoplay = a.autoplay), this.hud = e.general.hud;
    }
  }
});
/**
 * @license lucide v0.461.0 - ISC
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
 * @license lucide v0.461.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Se = ["svg", P, [["path", { d: "m15 18-6-6 6-6" }]]];
/**
 * @license lucide v0.461.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Te = ["svg", P, [["path", { d: "m9 18 6-6-6-6" }]]];
/**
 * @license lucide v0.461.0 - ISC
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
 * @license lucide v0.461.0 - ISC
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
 * @license lucide v0.461.0 - ISC
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
 * @license lucide v0.461.0 - ISC
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
 * @license lucide v0.461.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Me = [
  "svg",
  P,
  [["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" }]]
];
/**
 * @license lucide v0.461.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ie = [
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
 * @license lucide v0.461.0 - ISC
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
 * @license lucide v0.461.0 - ISC
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
], D = (a, e) => {
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
      Skull: Ie,
      Ghost: Ce,
      CirclePlay: Ne,
      Sun: Oe,
      Moon: Me,
      Cog: Ae,
      X: Pe
    }, t = b(() => {
      let u = r[_e(e.name)];
      if (!u) return null;
      const [o, c, n] = u;
      return s(o, c, n).innerHTML;
    });
    function s(u, o, c = []) {
      const n = document.createElementNS("http://www.w3.org/2000/svg", u);
      return Object.keys(o).forEach((m) => {
        n.setAttribute(m, String(o[m]));
      }), c.length && c.forEach((m) => {
        const g = s(...m);
        n.appendChild(g);
      }), n;
    }
    const p = b(() => {
      let u = {
        style: {}
      };
      return e.color && (u.style["--icon-color"] = e.color), e.size && (u.style["--icon-size"] = e.size), e.stroke && (u.style["--icon-stroke"] = e.stroke), u;
    });
    return (u, o) => t.value ? (v(), _("svg", he({
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
}, Q = /* @__PURE__ */ D(Xe, [["__scopeId", "data-v-905b7142"]]), $e = { key: 0 }, He = ["src", "alt"], De = {
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
    const r = H(), t = a, s = e, p = b(() => {
      const { imageScale: o, imageType: c } = r.style;
      return {
        "--w": o[0],
        "--h": o[1],
        "--fit": c
      };
    });
    function u() {
      s("error", t.keyName);
    }
    return (o, c) => (v(), _(J, null, [
      t.error ? (v(), _("p", $e, [
        $("i", null, [
          F(Q, { name: "cloud-rain-wind" })
        ]),
        c[0] || (c[0] = $("span", null, "no image", -1))
      ])) : E("", !0),
      t.loaded ? (v(), _("img", {
        key: 1,
        src: t.src,
        alt: t.alt,
        style: se(p.value),
        onError: u
      }, null, 44, He)) : E("", !0)
    ], 64));
  }
}, re = /* @__PURE__ */ D(De, [["__scopeId", "data-v-a9c65d04"]]), Fe = {
  key: 0,
  class: "slide-first"
}, Re = {
  key: 1,
  class: "slide-last"
}, ze = {
  __name: "images",
  props: {},
  emits: [
    "change",
    "transition-start",
    "transition-end",
    "short-touch"
  ],
  setup(a, { emit: e }) {
    const r = H(), t = U(), s = ne(), p = e, u = X(), o = X({}), c = X(), n = ie({
      items: t.order.reduce((i, x) => {
        const k = t.data.get(x);
        return i[x] = {
          src: k.src,
          alt: k.title,
          loaded: !1,
          error: !1
        }, i;
      }, {}),
      classNameActive: "active",
      classNamePrevActive: "",
      active: "",
      prevActive: "",
      swipePosX: NaN
    }), m = b(() => {
      if (t.order.indexOf(n.active) <= -1) return;
      let i = {};
      switch (r.slides.transitionType) {
        case I.FADE:
          break;
        case I.HORIZONTAL:
          switch (i["--speed-transition"] = `${r.slides.transitionSpeed}ms`, n.prevActive) {
            case "first":
              i["--active-column"] = 0;
              break;
            case "last":
              i["--active-column"] = t.order.length + 1;
              break;
            default:
              i["--active-column"] = M(n.prevActive || n.active), r.slides.loop && i["--active-column"]++;
              break;
          }
          isNaN(n.swipePosX) || (i["--swipe-pos-x"] = `${n.swipePosX}%`);
          break;
      }
      return i;
    }), g = b(() => {
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
    let d = {
      touched: !1,
      dist: 0,
      startX: 0,
      startTime: null
    };
    ee(() => {
      n.active = t.active, L(t.order, t.order.indexOf(n.active), r.slides.loop);
    }), O(() => t.active, async (i) => {
      t.order.length <= 1 || await S(i);
    });
    async function S(i) {
      var T;
      const { transitionType: x, loop: k } = r.slides;
      switch (p("transition-start"), x) {
        case I.NONE:
          n.active = i, L(t.order, t.order.indexOf(n.active), k), p("transition-end");
          break;
        case I.FADE:
          t.lock = !0, s.playedSlide = !0, n.prevActive = n.active, n.classNamePrevActive = "fade-out", n.active = i, n.classNameActive = "fade-in hide", await ye(20), n.classNameActive = "fade-in", (T = o.value[n.active]) == null || T.addEventListener("transitionend", l, { once: !0 });
          break;
        case I.HORIZONTAL:
          t.lock = !0, s.playedSlide = !0;
          const C = {
            prev: M(n.active),
            next: M(i)
          };
          k && (C.prev === 0 && C.next >= t.order.length - 1 ? n.prevActive = "first" : C.prev >= t.order.length - 1 && C.next === 0 ? n.prevActive = "last" : n.prevActive = ""), n.active = i, c.value.addEventListener("transitionend", l, { once: !0 });
          break;
      }
    }
    function l() {
      const { transitionType: i, loop: x } = r.slides;
      switch (i) {
        case I.FADE:
          n.prevActive = "", n.classNamePrevActive = "", n.classNameActive = "active", s.playedSlide = !1, t.lock = !1, L(t.order, t.order.indexOf(n.active), x), p("transition-end");
          break;
        case I.HORIZONTAL:
          s.playedSlide = !1, n.prevActive = "", t.lock = !1, L(t.order, t.order.indexOf(n.active), x), p("transition-end");
          break;
      }
    }
    function y() {
      s.playedSlideCancel = !0, c.value.addEventListener("transitionend", w, { once: !0 });
    }
    function w() {
      s.playedSlideCancel = !1;
    }
    function M(i) {
      const x = t.order.indexOf(i);
      return x > -1 ? x : void 0;
    }
    function L(i, x, k, T = 2) {
      const C = i.length;
      for (let B = 0 - T; B <= T; B++) {
        let j = x + B;
        if (j < 0)
          if (k) j = C + j;
          else continue;
        else if (j >= C)
          if (k) j = j % C;
          else continue;
        n.items[i[j]].loaded = !0;
      }
    }
    function V(i) {
      n.items[i] && (n.items[i].error = !0);
    }
    function R(i) {
      i.stopPropagation(), i.touches && (d.touched = !0), i.touches && i.touches.length > 1 && i.preventDefault(), !s.playedSlide && r.slides.swipe && r.slides.transitionType === I.HORIZONTAL && (t.order.length <= 2 || (d.dist = 0, d.startX = i.touches && i.touches[0] ? Math.floor(i.touches[0].clientX) : i.clientX || i.pageX, d.startTime = (/* @__PURE__ */ new Date()).getTime(), s.swipe = !0));
    }
    function z(i) {
      if (i.stopPropagation(), !i.touches && d.touched || !s.swipe || t.order.length <= 2) return;
      d.moveX = i.touches && i.touches[0] ? Math.floor(i.touches[0].clientX) : i.clientX || i.pageX;
      const x = u.value.offsetWidth, k = d.moveX - d.startX, T = r.slides.loop ? 1 : 0;
      n.swipePosX = k / x * 100 + (0 - 100 * (M(n.active) + T));
    }
    function h(i) {
      if (i.stopPropagation(), !i.touches && d.touched || !s.swipe || i.touches && i.touches.length > 0 || t.order.length <= 2) return;
      const x = u.value.offsetWidth;
      d.endX = i.changedTouches && i.changedTouches[0] ? Math.floor(i.changedTouches[0].clientX) : i.clientX || i.pageX;
      const k = d.startX > d.endX, T = (/* @__PURE__ */ new Date()).getTime() - d.startTime, C = d.endX - d.startX, B = Math.abs(C) / x * 100;
      if (d.dist = 0, d.startX = void 0, d.startTime = void 0, d.moveX = void 0, d.endX = void 0, s.swipe = !1, n.swipePosX = NaN, T < 60 || B < 1) {
        s.isClickSlide = !0;
        return;
      }
      if (s.isClickSlide = !1, !r.slides.loop) {
        if (k) {
          if (t.activeIndex === t.data.size - 1) {
            y();
            return;
          }
        } else if (t.activeIndex === 0) {
          y();
          return;
        }
      }
      T > 300 ? B > 30 ? t[k ? "next" : "prev"]() : y() : B > 5 ? t[k ? "next" : "prev"]() : y();
    }
    function A() {
      s.swipe && y(), s.swipe = !1, n.swipePosX = NaN;
    }
    function W() {
      s.swipe = !1, n.swipePosX = NaN;
    }
    return (i, x) => (v(), _("div", {
      ref_key: "$root",
      ref: u,
      class: q([
        "images",
        `mode--${N(r).slides.transitionType}`,
        N(s).playedSlide && "animation-play",
        N(s).playedSlideCancel && "animation-cancel",
        N(s).swipe && "swipe"
      ]),
      style: se(m.value),
      onTouchstart: R,
      onTouchmove: z,
      onTouchend: h,
      onMousedown: R,
      onMousemove: z,
      onMouseup: h,
      onMouseleave: A,
      onContextmenu: W
    }, [
      $("ul", {
        ref_key: "$body",
        ref: c,
        class: "body"
      }, [
        g.value ? (v(), _("li", Fe, [
          F(re, {
            "key-name": "first-slide-image",
            loaded: g.value.loaded,
            src: g.value.src,
            error: g.value.error
          }, null, 8, ["loaded", "src", "error"])
        ])) : E("", !0),
        (v(!0), _(J, null, ve(n.items, (k, T) => (v(), _("li", {
          ref_for: !0,
          ref: (C) => {
            o.value[T] = C;
          },
          class: q([
            !!n.classNameActive && n.active === T && n.classNameActive,
            !!n.classNamePrevActive && n.prevActive === T && n.classNamePrevActive
          ])
        }, [
          F(re, {
            "key-name": T,
            loaded: k.loaded,
            src: k.src,
            alt: k.alt,
            error: k.error,
            onError: V
          }, null, 8, ["key-name", "loaded", "src", "alt", "error"])
        ], 2))), 256)),
        f.value ? (v(), _("li", Re, [
          F(re, {
            "key-name": "last-slide-image",
            loaded: f.value.loaded,
            src: f.value.src,
            error: f.value.error
          }, null, 8, ["loaded", "src", "error"])
        ])) : E("", !0)
      ], 512),
      x[0] || (x[0] = $("i", { class: "overlay" }, null, -1))
    ], 38));
  }
}, We = /* @__PURE__ */ D(ze, [["__scopeId", "data-v-3ae9bac8"]]);
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
  let r = [], t = 0, s = 0, p = "", u = !0, o = !1, c = 0;
  const n = 1e3 / e.fps;
  function m(f) {
    const d = f - c;
    if (d > n) {
      c = f - d % n;
      let S = p;
      u = !0;
      for (let l = s; l <= t; l++)
        if (r[l] !== 0 && r[l] != null) {
          u = !1;
          const y = r[l];
          let w = "";
          if (Math.abs(y) <= e.moveTrigger) {
            switch (e.randomTextType) {
              case "pattern":
                w = g(e.pattern);
                break;
              case "unicode":
              default:
                const M = Math.min(Math.max(e.text.charCodeAt(l) + y, 33), 126);
                w = String.fromCharCode(M);
                break;
            }
            S += w;
          } else
            S += e.waitChar;
          y > 0 ? r[l] -= 1 : r[l] += 1;
        } else
          s === l - 1 && (s = l, p = e.text.substring(0, s)), S += e.text.charAt(l);
      if (a.textContent = S, t <= e.text.length ? t += e.charSpeed : o = !0, u && o) {
        a.dataset.id && cancelAnimationFrame(parseInt(a.dataset.id)), a.textContent = p, a.dataset.run = "false", e.callback && e.callback();
        return;
      }
    }
    a.dataset.id = requestAnimationFrame(m);
  }
  function g(f) {
    const d = Math.floor(Math.random() * f.length);
    return f.substring(d, d + 1);
  }
  if (e.text || e.text && !e.retry && a.dataset.run !== "true") {
    a.dataset.run = "true", a.textContent = e.waitChar;
    for (let f = 0; f <= e.text.length - 1; f++)
      e.text.charAt(f) !== " " ? r[f] = (e.moveFix + Math.round(Math.random() * e.moveRange)) * (Math.round(Math.random()) - 0.5) * 2 : r[f] = 0;
    t = 0, s = 0, p = "", a.dataset.id && cancelAnimationFrame(Number(a.dataset.id)), a.dataset.id = requestAnimationFrame(m);
  }
}
const je = { key: 0 }, Ve = { key: 1 }, Ye = {
  __name: "caption",
  setup(a) {
    const e = X(), r = X(), t = H(), s = U(), p = ie({
      opacity: 1,
      speed: 0
    }), u = b(() => {
      const { captionPosition: g, captionScale: f } = t.style;
      return {
        "--caption-left": g[0],
        "--caption-top": g[1],
        "--caption-scale": f,
        "--caption-opacity": p.opacity,
        "--caption-speed": `${p.speed}ms`
      };
    }), o = b(() => {
      if (!s.data.get(s.active)) return {};
      const { title: g, description: f } = s.data.get(s.active);
      return { title: g, description: f };
    }), c = b(() => t.slides.captionAnimationType);
    let n = {
      title: void 0,
      description: void 0
    };
    ee(() => {
      switch (c.value) {
        case G.SHUFFLE:
          m();
          break;
      }
    }), O(() => s.active, (g, f) => {
      switch (c.value) {
        case G.SHUFFLE:
          m();
          break;
      }
    });
    function m() {
      const { captionAnimationSpeed: g } = t.slides;
      function f(S, l) {
        try {
          Be(S, {
            text: l,
            fps: g,
            randomTextType: "pattern"
          });
        } catch {
          d();
        }
      }
      function d() {
        var S, l, y, w;
        (l = (S = e.value) == null ? void 0 : S.dataset) != null && l.id && cancelAnimationFrame(Number(e.value.dataset.id)), (w = (y = r.value) == null ? void 0 : y.dataset) != null && w.id && cancelAnimationFrame(Number(r.value.dataset.id)), n.title && clearTimeout(n.title), n.description && clearTimeout(n.description);
      }
      d(), r.value.dataset.id && (clearInterval(Number(r.value.dataset.id)), r.value.innerText = ""), o.value.title && (n.title = setTimeout(() => {
        clearTimeout(n.title), n.title = void 0, f(e.value, o.value.title);
      }, 10)), o.value.description && (n.description = setTimeout(() => {
        clearTimeout(n.description), n.description = void 0, f(r.value, o.value.description);
      }, 300));
    }
    return (g, f) => (v(), _("article", {
      class: "caption",
      style: se(u.value)
    }, [
      c.value === N(G).NONE ? (v(), _(J, { key: 0 }, [
        o.value.title ? (v(), _("h1", je, Z(o.value.title), 1)) : E("", !0),
        o.value.description ? (v(), _("p", Ve, Z(o.value.description), 1)) : E("", !0)
      ], 64)) : (v(), _(J, { key: 1 }, [
        o.value.title ? (v(), _("h1", {
          key: 0,
          ref_key: "$title",
          ref: e
        }, null, 512)) : E("", !0),
        o.value.description ? (v(), _("p", {
          key: 1,
          ref_key: "$description",
          ref: r
        }, null, 512)) : E("", !0)
      ], 64))
    ], 4));
  }
}, Ze = /* @__PURE__ */ D(Ye, [["__scopeId", "data-v-7d03c6b3"]]), Ke = ["title", "disabled"], Ue = ["title", "disabled"], Ge = {
  __name: "controller",
  setup(a) {
    const e = H(), r = U(), t = ne(), s = oe(), p = b(() => e.slides.loop ? !0 : 0 < r.activeIndex), u = b(() => e.slides.loop ? !0 : r.order.length - 1 > r.activeIndex);
    function o() {
      r.prev();
    }
    function c() {
      r.next();
    }
    return (n, m) => (v(), _("nav", {
      class: q([
        "controller",
        N(t).swipe && "swipe"
      ])
    }, [
      $("button", {
        type: "button",
        title: N(s).print("direction.prev"),
        disabled: !p.value,
        class: "prev",
        onClick: ae(o, ["stop"])
      }, [
        F(Q, { name: "chevron-left" })
      ], 8, Ke),
      $("button", {
        type: "button",
        title: N(s).print("direction.next"),
        disabled: !u.value,
        class: "next",
        onClick: ae(c, ["stop"])
      }, [
        F(Q, { name: "chevron-right" })
      ], 8, Ue)
    ], 2));
  }
}, qe = /* @__PURE__ */ D(Ge, [["__scopeId", "data-v-9e222bcc"]]), Je = { class: "paginate" }, Qe = {
  __name: "paginate",
  setup(a) {
    const e = U(), r = b(() => e.order.length), t = b(() => e.activeIndex + 1);
    return (s, p) => (v(), _("p", Je, Z(t.value) + " / " + Z(r.value), 1));
  }
}, et = /* @__PURE__ */ D(Qe, [["__scopeId", "data-v-8e8ad4b5"]]), tt = {
  __name: "index",
  setup(a) {
    const e = H(), r = U(), t = ne(), s = X(!t.autoplay), p = X(e.general.hud), u = X(e.general.hud);
    let o, c = s.value;
    ee(() => n()), ue(() => m()), O(() => t.autoplay, (l) => {
      s.value = !l, l ? n() : m();
    }), O(() => r.lock, (l) => {
      s.value = l, l ? m() : n();
    }), O(() => t.swipe, (l) => {
      s.value = l, l ? m() : n();
    });
    function n() {
      e.slides.autoplayPauseOnHover && c !== void 0 && (s.value = c), e.slides.autoplay && t.autoplay && !s.value && (m(), o = setTimeout(g, e.slides.autoplayDelay));
    }
    function m() {
      o && (clearTimeout(o), o = void 0);
    }
    function g() {
      if (!t.autoplay) return;
      const { autoplayDirection: l } = e.slides;
      l ? r.next() : r.prev();
    }
    function f(l) {
      l.stopPropagation();
      const { visibleHudClick: y } = e.general;
      y && (u.value = !1);
      const { autoplayPauseOnHover: w } = e.slides;
      w && (c = !1, n());
    }
    function d() {
      const { visibleHudClick: l } = e.general;
      l && (u.value = !0);
      const { autoplayPauseOnHover: y } = e.slides;
      y && (c = !0, m());
    }
    function S() {
      e.general.visibleHudClick && t.isClickSlide && (p.value = !p.value);
    }
    return (l, y) => {
      var w, M, L, V, R, z, h, A, W;
      return v(), _("div", {
        class: "slides",
        onMouseleave: f,
        onMouseenter: d,
        onClick: ae(S, ["prevent"])
      }, [
        F(We, { class: "images" }),
        $("div", {
          class: q([
            "hud",
            p.value && "use",
            ((w = N(e).general) == null ? void 0 : w.visibleHudHover) && "hover"
          ])
        }, [
          (L = (M = N(e).general) == null ? void 0 : M.hudContents) != null && L.caption ? (v(), Y(Ze, {
            key: 0,
            class: "slides__caption"
          })) : E("", !0),
          (R = (V = N(e).general) == null ? void 0 : V.hudContents) != null && R.controller ? (v(), Y(qe, {
            key: 1,
            class: "slides__controller"
          })) : E("", !0),
          (h = (z = N(e).general) == null ? void 0 : z.hudContents) != null && h.paginate ? (v(), Y(et, {
            key: 2,
            class: "slides__paginate"
          })) : E("", !0),
          (W = (A = N(e).general) == null ? void 0 : A.hudContents) != null && W.slots ? pe(l.$slots, "default", { key: 3 }, void 0, !0) : E("", !0)
        ], 2)
      ], 32);
    };
  }
}, nt = /* @__PURE__ */ D(tt, [["__scopeId", "data-v-fa018419"]]), rt = { class: "error" }, at = {
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
    return (u, o) => (v(), _("article", rt, [
      F(Q, { name: p.value }, null, 8, ["name"]),
      $("h1", null, Z(t.value), 1),
      $("p", null, Z(s.value), 1)
    ]));
  }
}, st = /* @__PURE__ */ D(at, [["__scopeId", "data-v-95b78cd2"]]), it = ["tabindex"], ot = {
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
    const t = H(), s = U(), p = oe(), u = ne(), o = X(), c = a, n = ie({
      stop: !0,
      error: void 0,
      swipe: !1,
      tabIndex: ""
    }), m = r;
    let g;
    ee(() => l()), ue(() => y()), O(() => c.slides, () => w(), { deep: !0 }), O(() => c.preference, () => w(), { deep: !0 }), O(() => String(c.active), (h, A) => {
      h !== s.active && s.change(h);
    }), O(() => s.active, (h) => m("update:active", h)), O(() => c.autoplay, (h) => {
      u.autoplay = h;
    });
    function f() {
      switch (t.keyboard.eventTarget) {
        case de.WINDOW:
          n.tabIndex = "", window.addEventListener("keyup", d);
          break;
        default:
          if (!o.value) return;
          n.tabIndex = "0", o.value.addEventListener("keyup", d);
          break;
      }
    }
    function d(h) {
      var W;
      if (!((W = t == null ? void 0 : t.keyboard) != null && W.enable)) return;
      const { keyCode: A } = h;
      switch (A) {
        case 37:
          s.prev();
          break;
        case 39:
          s.next();
          break;
      }
    }
    function S() {
      var h;
      switch (n.tabIndex = "", (h = t.keyboard) == null ? void 0 : h.eventTarget) {
        case de.WINDOW:
          window.removeEventListener("keyup", d);
          break;
        default:
          if (!o.value) return;
          o.value.removeEventListener("keyup", d);
          break;
      }
    }
    async function l() {
      var h;
      if (n.stop)
        try {
          p.setup(c.language), t.setup(c.preference), (h = t.slides) != null && h.autoplay || m("update:autoplay", !1), s.setup(c.slides, String(c.active)), u.setup({
            autoplay: t.slides.autoplay && c.autoplay
          }), await le(), f(), n.stop = !1;
        } catch (A) {
          n.error = A;
        }
    }
    async function y() {
      S(), t.destroy(), s.destroy(), n.stop = !0, n.error = void 0;
    }
    async function w() {
      await y(), await le(), await l();
    }
    function M() {
      s.prev();
    }
    function L() {
      s.next();
    }
    function V(h) {
      h !== s.active && s.change(String(h));
    }
    function R() {
      return K({
        preference: t.exportData(),
        slides: {
          data: s.order.reduce((h, A) => (h.push({
            ...s.data.get(A),
            key: A
          }), h), []),
          active: s.active,
          activeIndex: s.activeIndex
        },
        language: Object.fromEntries(p.data)
      });
    }
    function z() {
      return K(s.order);
    }
    return e({
      start: l,
      stop: y,
      restart: w,
      prev: M,
      next: L,
      change: V,
      exportData: R,
      getKeys: z
    }), (h, A) => (v(), _("div", {
      ref_key: "$slideshow",
      ref: o,
      tabindex: n.tabIndex,
      class: q(["slideshow", `theme--${c.theme}`])
    }, [
      n.error ? (v(), Y(st, {
        key: 0,
        message: n.error.message
      }, null, 8, ["message"])) : n.stop ? E("", !0) : (v(), Y(nt, { key: 1 }, {
        default: me(() => [
          pe(h.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      })),
      N(g) ? (v(), Y(ge(N(g)), { key: 2 })) : E("", !0)
    ], 10, it));
  }
}, dt = /* @__PURE__ */ D(ot, [["__scopeId", "data-v-777b39d2"]]);
export {
  dt as default
};
