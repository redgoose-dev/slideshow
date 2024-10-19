import { computed as A, openBlock as v, createElementBlock as y, mergeProps as fe, createCommentVNode as S, Fragment as U, createElementVNode as P, createVNode as H, normalizeStyle as Q, ref as C, reactive as ee, onMounted as K, watch as I, normalizeClass as B, unref as N, renderList as ve, toDisplayString as j, onBeforeUnmount as oe, withModifiers as he, createBlock as R, renderSlot as le, nextTick as se, withCtx as me, resolveDynamicComponent as ge } from "vue";
import { defineStore as Y } from "pinia";
function ye(r = 3e3) {
  return new Promise((e) => setTimeout(e, r));
}
function V(r) {
  try {
    if (!r) throw new Error("no src");
    try {
      return structuredClone(r);
    } catch {
      return JSON.parse(JSON.stringify(r));
    }
  } catch {
    return null;
  }
}
function ce(r, e) {
  let s = { ...r };
  for (let t in e)
    e.hasOwnProperty(t) && (typeof e[t] == "object" && e[t] !== null && r[t] ? s[t] = ce(r[t], e[t]) : s[t] = e[t]);
  return s;
}
function _e(r) {
  return r.replace(/(\w)(\w*)(_|-|\s*)/g, (e, s, t) => s.toUpperCase() + t.toLowerCase());
}
const O = {
  NONE: "none",
  FADE: "fade",
  HORIZONTAL: "horizontal"
}, W = {
  NONE: "none",
  SHUFFLE: "shuffle"
}, ae = {
  NONE: "none",
  CONTAIN: "contain",
  COVER: "cover"
}, ie = {
  ELEMENT: "element",
  WINDOW: "window"
};
function ke(r) {
  return Object.values(O).includes(r.slides.transitionType) || (r.slides.transitionType = O.NONE), Object.values(W).includes(r.slides.captionAnimationType) || (r.slides.captionAnimationType = W.NONE), Object.values(ae).includes(r.style.imageType) || (r.style.imageType = ae.NONE), r;
}
function xe(r) {
  if (!Array.isArray(r)) throw new Error("slides data is not array");
  r.forEach((e) => {
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
    // none,contain,cover
    imageType: "cover",
    // [ width, height ]
    imageScale: ["100%", "100%"],
    // 캡션 사이즈 퍼센트(%)
    captionScale: 100,
    // [ left, top ]
    captionPosition: ["32px", "30px"]
  },
  // 키보드 이벤트
  keyboard: {
    // 이벤트 객체
    eventTarget: "element",
    // 단축키 사용유무
    enable: !0
  }
}, be = {
  "direction.prev": "Prev Slide",
  "direction.next": "Next Slide"
}, M = Y("preference", {
  state: () => ({
    general: void 0,
    slides: void 0,
    style: void 0,
    keyboard: void 0
  }),
  getters: {},
  actions: {
    setup(r) {
      let e = ce(V(we), r);
      e = ke(e), this.general = e.general, this.slides = e.slides, this.style = e.style, this.keyboard = e.keyboard;
    },
    exportData() {
      return V({
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
}), z = Y("slides", {
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
      return this.order.map((r) => V(this.data.get(r)));
    },
    images() {
      return this.order.map((r) => {
        const e = this.data.get(r);
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
    setup(r, e) {
      const s = (r == null ? void 0 : r.length) > 0 ? r : [];
      xe(s), s.forEach((t, i) => {
        const { key: f, ...u } = t, o = String(f || i + 1);
        this.order.push(o), this.data.set(o, u);
      }), e && this.order.includes(e) && (this.active = e), this.active || (this.active = this.order[0]);
    },
    destroy() {
      this.data.clear(), this.order = [];
    },
    prev() {
      if (this.lock) return;
      const r = M(), e = this.order.indexOf(this.active);
      let s;
      r.slides.loop ? s = (e - 1 + this.order.length) % this.order.length : s = e > 0 ? e - 1 : 0, this.direction = !1, this.active = this.order[s];
    },
    next() {
      if (this.lock) return;
      const r = M(), e = this.order.indexOf(this.active);
      let s;
      r.slides.loop ? s = (e + 1) % this.order.length : s = e < this.order.length - 1 ? e + 1 : this.order.length - 1, this.direction = !0, this.active = this.order[s];
    },
    /**
     * change slide
     * @param {string} key
     */
    change(r) {
      if (this.lock || !r || r === this.active) return;
      const e = this.order.indexOf(this.active), s = this.order.indexOf(r);
      s <= -1 || (this.direction = e < s, this.active = this.active = this.order[s]);
    }
  }
}), de = Y("language", {
  state: () => ({
    data: /* @__PURE__ */ new Map()
  }),
  getters: {},
  actions: {
    setup(r) {
      const e = Object.assign({}, V(be), r);
      Object.entries(e).forEach(([s, t]) => this.data.set(s, t));
    },
    print(r) {
      return this.data.get(r) || void 0;
    }
  }
}), q = Y("state", {
  state: () => ({
    swipe: !1,
    playedSlide: !1,
    playedSlideCancel: !1,
    autoplay: !0,
    hud: !1
  }),
  actions: {
    setup(r) {
      const e = M();
      r.autoplay !== void 0 && (this.autoplay = r.autoplay), this.hud = e.general.hud;
    }
  }
});
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G = {
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
const Te = ["svg", G, [["path", { d: "m15 18-6-6 6-6" }]]];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ne = ["svg", G, [["path", { d: "m9 18 6-6-6-6" }]]];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Se = [
  "svg",
  G,
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
const Ae = [
  "svg",
  G,
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
], L = (r, e) => {
  const s = r.__vccOpts || r;
  for (const [t, i] of e)
    s[t] = i;
  return s;
}, Ee = ["innerHTML"], Oe = {
  __name: "index",
  props: {
    name: String,
    color: String,
    size: String,
    stroke: Number
  },
  setup(r) {
    const e = r, s = {
      ChevronLeft: Te,
      ChevronRight: Ne,
      CloudRainWind: Se,
      Skull: Ae
    }, t = A(() => {
      let u = s[_e(e.name)];
      if (!u) return null;
      const [o, l, n] = u;
      return i(o, l, n).innerHTML;
    });
    function i(u, o, l = []) {
      const n = document.createElementNS("http://www.w3.org/2000/svg", u);
      return Object.keys(o).forEach((h) => {
        n.setAttribute(h, String(o[h]));
      }), l.length && l.forEach((h) => {
        const g = i(...h);
        n.appendChild(g);
      }), n;
    }
    const f = A(() => {
      let u = {
        style: {}
      };
      return e.color && (u.style["--icon-color"] = e.color), e.size && (u.style["--icon-size"] = e.size), e.stroke && (u.style["--icon-stroke"] = e.stroke), u;
    });
    return (u, o) => t.value ? (v(), y("svg", fe({
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
    }, f.value), null, 16, Ee)) : S("", !0);
  }
}, Z = /* @__PURE__ */ L(Oe, [["__scopeId", "data-v-9d1b9439"]]), Ie = { key: 0 }, Ce = ["src", "alt"], Pe = {
  __name: "images-item",
  props: {
    keyName: String,
    loaded: Boolean,
    src: String,
    alt: String,
    error: Boolean
  },
  emits: ["error"],
  setup(r, { emit: e }) {
    const s = M(), t = r, i = e, f = A(() => {
      const { imageScale: o, imageType: l } = s.style;
      return {
        "--w": o[0],
        "--h": o[1],
        "--fit": l
      };
    });
    function u() {
      i("error", t.keyName);
    }
    return (o, l) => (v(), y(U, null, [
      t.error ? (v(), y("p", Ie, [
        P("i", null, [
          H(Z, { name: "cloud-rain-wind" })
        ]),
        l[0] || (l[0] = P("span", null, "no image", -1))
      ])) : S("", !0),
      t.loaded ? (v(), y("img", {
        key: 1,
        src: t.src,
        alt: t.alt,
        style: Q(f.value),
        onError: u
      }, null, 44, Ce)) : S("", !0)
    ], 64));
  }
}, J = /* @__PURE__ */ L(Pe, [["__scopeId", "data-v-e33f4bcd"]]), Me = {
  key: 0,
  class: "slide-first"
}, Le = {
  key: 1,
  class: "slide-last"
}, Xe = {
  __name: "images",
  props: {},
  emits: [
    "change",
    "transition-start",
    "transition-end",
    "short-touch"
  ],
  setup(r, { emit: e }) {
    const s = M(), t = z(), i = q(), f = e, u = C(), o = C({}), l = C(), n = ee({
      items: t.order.reduce((a, k) => {
        const x = t.data.get(k);
        return a[k] = {
          src: x.src,
          alt: x.title,
          loaded: !1,
          error: !1
        }, a;
      }, {}),
      classNameActive: "active",
      classNamePrevActive: "",
      active: "",
      prevActive: "",
      swipePosX: NaN
    }), h = A(() => {
      if (t.order.indexOf(n.active) <= -1) return;
      let a = {};
      switch (s.slides.transitionType) {
        case O.FADE:
          break;
        case O.HORIZONTAL:
          switch (a["--speed-transition"] = `${s.slides.transitionSpeed}ms`, n.prevActive) {
            case "first":
              a["--active-column"] = 0;
              break;
            case "last":
              a["--active-column"] = t.order.length + 1;
              break;
            default:
              a["--active-column"] = X(n.prevActive || n.active), s.slides.loop && a["--active-column"]++;
              break;
          }
          isNaN(n.swipePosX) || (a["--swipe-pos-x"] = `${n.swipePosX}%`);
          break;
      }
      return a;
    }), g = A(() => {
      if (s.slides.transitionType !== "horizontal" || !s.slides.loop || t.order.length <= 1) return !1;
      const a = n.items[t.order[t.order.length - 1]];
      return {
        src: a.src,
        loaded: a.loaded,
        error: a.error
      };
    }), p = A(() => {
      if (s.slides.transitionType !== "horizontal" || !s.slides.loop || t.order.length <= 1) return !1;
      const a = n.items[t.order[0]];
      return {
        src: a.src,
        loaded: a.loaded,
        error: a.error
      };
    });
    let d = {
      touched: !1,
      dist: 0,
      startX: 0,
      startTime: null
    };
    K(() => {
      n.active = t.active, m(t.order, t.order.indexOf(n.active), s.slides.loop);
    }), I(() => t.active, async (a) => {
      t.order.length <= 1 || await w(a);
    });
    async function w(a) {
      var T;
      const { transitionType: k, loop: x } = s.slides;
      switch (f("transition-start"), k) {
        case O.NONE:
          n.active = a, m(t.order, t.order.indexOf(n.active), x), f("transition-end");
          break;
        case O.FADE:
          t.lock = !0, i.playedSlide = !0, n.prevActive = n.active, n.classNamePrevActive = "fade-out", n.active = a, n.classNameActive = "fade-in hide", await ye(20), n.classNameActive = "fade-in", (T = o.value[n.active]) == null || T.addEventListener("transitionend", c, { once: !0 });
          break;
        case O.HORIZONTAL:
          t.lock = !0, i.playedSlide = !0;
          const E = {
            prev: X(n.active),
            next: X(a)
          };
          x && (E.prev === 0 && E.next >= t.order.length - 1 ? n.prevActive = "first" : E.prev >= t.order.length - 1 && E.next === 0 ? n.prevActive = "last" : n.prevActive = ""), n.active = a, l.value.addEventListener("transitionend", c, { once: !0 });
          break;
      }
    }
    function c() {
      const { transitionType: a, loop: k } = s.slides;
      switch (a) {
        case O.FADE:
          n.prevActive = "", n.classNamePrevActive = "", n.classNameActive = "active", i.playedSlide = !1, t.lock = !1, m(t.order, t.order.indexOf(n.active), k), f("transition-end");
          break;
        case O.HORIZONTAL:
          i.playedSlide = !1, n.prevActive = "", t.lock = !1, m(t.order, t.order.indexOf(n.active), k), f("transition-end");
          break;
      }
    }
    function _() {
      i.playedSlideCancel = !0, l.value.addEventListener("transitionend", b, { once: !0 });
    }
    function b() {
      i.playedSlideCancel = !1;
    }
    function X(a) {
      const k = t.order.indexOf(a);
      return k > -1 ? k : void 0;
    }
    function m(a, k, x, T = 2) {
      const E = a.length;
      for (let F = 0 - T; F <= T; F++) {
        let D = k + F;
        if (D < 0)
          if (x) D = E + D;
          else continue;
        else if (D >= E)
          if (x) D = D % E;
          else continue;
        n.items[a[D]].loaded = !0;
      }
    }
    function $(a) {
      n.items[a] && (n.items[a].error = !0);
    }
    function te(a) {
      a.stopPropagation(), a.touches && (d.touched = !0), a.touches && a.touches.length > 1 && a.preventDefault(), !i.playedSlide && s.slides.swipe && s.slides.transitionType === O.HORIZONTAL && (t.order.length <= 2 || (d.dist = 0, d.startX = a.touches && a.touches[0] ? Math.floor(a.touches[0].clientX) : a.clientX || a.pageX, d.startTime = (/* @__PURE__ */ new Date()).getTime(), i.swipe = !0));
    }
    function ne(a) {
      if (a.stopPropagation(), !a.touches && d.touched || !i.swipe || t.order.length <= 2) return;
      d.moveX = a.touches && a.touches[0] ? Math.floor(a.touches[0].clientX) : a.clientX || a.pageX;
      const k = u.value.offsetWidth, x = d.moveX - d.startX, T = s.slides.loop ? 1 : 0;
      n.swipePosX = x / k * 100 + (0 - 100 * (X(n.active) + T));
    }
    function re(a) {
      if (a.stopPropagation(), !a.touches && d.touched || !i.swipe || a.touches && a.touches.length > 0 || t.order.length <= 2) return;
      const k = u.value.offsetWidth;
      d.endX = a.changedTouches && a.changedTouches[0] ? Math.floor(a.changedTouches[0].clientX) : a.clientX || a.pageX;
      const x = d.startX > d.endX, T = (/* @__PURE__ */ new Date()).getTime() - d.startTime, E = d.endX - d.startX, F = Math.abs(E) / k * 100;
      if (d.dist = 0, d.startX = void 0, d.startTime = void 0, d.moveX = void 0, d.endX = void 0, i.swipe = !1, n.swipePosX = NaN, !(T < 60 || F < 1)) {
        if (!s.slides.loop) {
          if (x) {
            if (t.activeIndex === t.data.size - 1) {
              _();
              return;
            }
          } else if (t.activeIndex === 0) {
            _();
            return;
          }
        }
        T > 300 ? F > 30 ? t[x ? "next" : "prev"]() : _() : F > 5 ? t[x ? "next" : "prev"]() : _();
      }
    }
    function ue() {
      i.swipe && _(), i.swipe = !1, n.swipePosX = NaN;
    }
    function pe() {
      i.swipe = !1, n.swipePosX = NaN;
    }
    return (a, k) => (v(), y("div", {
      ref_key: "$root",
      ref: u,
      class: B([
        "images",
        `mode--${N(s).slides.transitionType}`,
        N(i).playedSlide && "animation-play",
        N(i).playedSlideCancel && "animation-cancel",
        N(i).swipe && "swipe"
      ]),
      style: Q(h.value),
      onTouchstart: te,
      onTouchmove: ne,
      onTouchend: re,
      onMousedown: te,
      onMousemove: ne,
      onMouseup: re,
      onMouseleave: ue,
      onContextmenu: pe
    }, [
      P("ul", {
        ref_key: "$body",
        ref: l,
        class: "body"
      }, [
        g.value ? (v(), y("li", Me, [
          H(J, {
            "key-name": "first-slide-image",
            loaded: g.value.loaded,
            src: g.value.src,
            error: g.value.error
          }, null, 8, ["loaded", "src", "error"])
        ])) : S("", !0),
        (v(!0), y(U, null, ve(n.items, (x, T) => (v(), y("li", {
          ref_for: !0,
          ref: (E) => {
            o.value[T] = E;
          },
          class: B([
            !!n.classNameActive && n.active === T && n.classNameActive,
            !!n.classNamePrevActive && n.prevActive === T && n.classNamePrevActive
          ])
        }, [
          H(J, {
            "key-name": T,
            loaded: x.loaded,
            src: x.src,
            alt: x.alt,
            error: x.error,
            onError: $
          }, null, 8, ["key-name", "loaded", "src", "alt", "error"])
        ], 2))), 256)),
        p.value ? (v(), y("li", Le, [
          H(J, {
            "key-name": "last-slide-image",
            loaded: p.value.loaded,
            src: p.value.src,
            error: p.value.error
          }, null, 8, ["loaded", "src", "error"])
        ])) : S("", !0)
      ], 512),
      k[0] || (k[0] = P("i", { class: "overlay" }, null, -1))
    ], 38));
  }
}, $e = /* @__PURE__ */ L(Xe, [["__scopeId", "data-v-9263e289"]]);
function He(r, e) {
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
  let s = [], t = 0, i = 0, f = "", u = !0, o = !1, l = 0;
  const n = 1e3 / e.fps;
  function h(p) {
    const d = p - l;
    if (d > n) {
      l = p - d % n;
      let w = f;
      u = !0;
      for (let c = i; c <= t; c++)
        if (s[c] !== 0 && s[c] != null) {
          u = !1;
          const _ = s[c];
          let b = "";
          if (Math.abs(_) <= e.moveTrigger) {
            switch (e.randomTextType) {
              case "pattern":
                b = g(e.pattern);
                break;
              case "unicode":
              default:
                const X = Math.min(Math.max(e.text.charCodeAt(c) + _, 33), 126);
                b = String.fromCharCode(X);
                break;
            }
            w += b;
          } else
            w += e.waitChar;
          _ > 0 ? s[c] -= 1 : s[c] += 1;
        } else
          i === c - 1 && (i = c, f = e.text.substring(0, i)), w += e.text.charAt(c);
      if (r.textContent = w, t <= e.text.length ? t += e.charSpeed : o = !0, u && o) {
        r.dataset.id && cancelAnimationFrame(parseInt(r.dataset.id)), r.textContent = f, r.dataset.run = "false", e.callback && e.callback();
        return;
      }
    }
    r.dataset.id = requestAnimationFrame(h);
  }
  function g(p) {
    const d = Math.floor(Math.random() * p.length);
    return p.substring(d, d + 1);
  }
  if (e.text || e.text && !e.retry && r.dataset.run !== "true") {
    r.dataset.run = "true", r.textContent = e.waitChar;
    for (let p = 0; p <= e.text.length - 1; p++)
      e.text.charAt(p) !== " " ? s[p] = (e.moveFix + Math.round(Math.random() * e.moveRange)) * (Math.round(Math.random()) - 0.5) * 2 : s[p] = 0;
    t = 0, i = 0, f = "", r.dataset.id && cancelAnimationFrame(Number(r.dataset.id)), r.dataset.id = requestAnimationFrame(h);
  }
}
const Fe = { key: 0 }, De = { key: 1 }, Re = {
  __name: "caption",
  setup(r) {
    const e = C(), s = C(), t = M(), i = z(), f = ee({
      opacity: 1,
      speed: 0
    }), u = A(() => {
      const { captionPosition: g, captionScale: p } = t.style;
      return {
        "--caption-left": g[0],
        "--caption-top": g[1],
        "--caption-scale": p,
        "--caption-opacity": f.opacity,
        "--caption-speed": `${f.speed}ms`
      };
    }), o = A(() => {
      if (!i.data.get(i.active)) return {};
      const { title: g, description: p } = i.data.get(i.active);
      return { title: g, description: p };
    }), l = A(() => t.slides.captionAnimationType);
    let n = {
      title: void 0,
      description: void 0
    };
    K(() => {
      switch (l.value) {
        case W.SHUFFLE:
          h();
          break;
      }
    }), I(() => i.active, (g, p) => {
      switch (l.value) {
        case W.SHUFFLE:
          h();
          break;
      }
    });
    function h() {
      const { captionAnimationSpeed: g } = t.slides;
      function p(w, c) {
        try {
          He(w, {
            text: c,
            fps: g,
            randomTextType: "pattern"
          });
        } catch {
          d();
        }
      }
      function d() {
        var w, c, _, b;
        (c = (w = e.value) == null ? void 0 : w.dataset) != null && c.id && cancelAnimationFrame(Number(e.value.dataset.id)), (b = (_ = s.value) == null ? void 0 : _.dataset) != null && b.id && cancelAnimationFrame(Number(s.value.dataset.id)), n.title && clearTimeout(n.title), n.description && clearTimeout(n.description);
      }
      d(), s.value.dataset.id && (clearInterval(Number(s.value.dataset.id)), s.value.innerText = ""), o.value.title && (n.title = setTimeout(() => {
        clearTimeout(n.title), n.title = void 0, p(e.value, o.value.title);
      }, 10)), o.value.description && (n.description = setTimeout(() => {
        clearTimeout(n.description), n.description = void 0, p(s.value, o.value.description);
      }, 300));
    }
    return (g, p) => (v(), y("article", {
      class: "caption",
      style: Q(u.value)
    }, [
      l.value === N(W).NONE ? (v(), y(U, { key: 0 }, [
        o.value.title ? (v(), y("h1", Fe, j(o.value.title), 1)) : S("", !0),
        o.value.description ? (v(), y("p", De, j(o.value.description), 1)) : S("", !0)
      ], 64)) : (v(), y(U, { key: 1 }, [
        o.value.title ? (v(), y("h1", {
          key: 0,
          ref_key: "$title",
          ref: e
        }, null, 512)) : S("", !0),
        o.value.description ? (v(), y("p", {
          key: 1,
          ref_key: "$description",
          ref: s
        }, null, 512)) : S("", !0)
      ], 64))
    ], 4));
  }
}, ze = /* @__PURE__ */ L(Re, [["__scopeId", "data-v-7d03c6b3"]]), We = ["title", "disabled"], Be = ["title", "disabled"], je = {
  __name: "controller",
  setup(r) {
    const e = M(), s = z(), t = q(), i = de(), f = A(() => e.slides.loop ? !0 : 0 < s.activeIndex), u = A(() => e.slides.loop ? !0 : s.order.length - 1 > s.activeIndex);
    function o() {
      s.prev();
    }
    function l() {
      s.next();
    }
    return (n, h) => (v(), y("nav", {
      class: B([
        "controller",
        N(t).swipe && "swipe"
      ])
    }, [
      P("button", {
        type: "button",
        title: N(i).print("direction.prev"),
        disabled: !f.value,
        class: "prev",
        onClick: o
      }, [
        H(Z, { name: "chevron-left" })
      ], 8, We),
      P("button", {
        type: "button",
        title: N(i).print("direction.next"),
        disabled: !u.value,
        class: "next",
        onClick: l
      }, [
        H(Z, { name: "chevron-right" })
      ], 8, Be)
    ], 2));
  }
}, Ve = /* @__PURE__ */ L(je, [["__scopeId", "data-v-090b468b"]]), Ue = { class: "paginate" }, Ze = {
  __name: "paginate",
  setup(r) {
    const e = z(), s = A(() => e.order.length), t = A(() => e.activeIndex + 1);
    return (i, f) => (v(), y("p", Ue, j(t.value) + " / " + j(s.value), 1));
  }
}, Ke = /* @__PURE__ */ L(Ze, [["__scopeId", "data-v-f7df2a3a"]]), Ye = {
  __name: "index",
  setup(r) {
    const e = M(), s = z(), t = q(), i = C(!t.autoplay), f = C(e.general.hud), u = C(e.general.hud);
    let o, l = i.value;
    K(() => n()), oe(() => h()), I(() => t.autoplay, (c) => {
      i.value = !c, c ? n() : h();
    }), I(() => s.lock, (c) => {
      i.value = c, c ? h() : n();
    }), I(() => t.swipe, (c) => {
      i.value = c, c ? h() : n();
    });
    function n() {
      e.slides.autoplayPauseOnHover && l !== void 0 && (i.value = l), e.slides.autoplay && t.autoplay && !i.value && (h(), o = setTimeout(g, e.slides.autoplayDelay));
    }
    function h() {
      o && (clearTimeout(o), o = void 0);
    }
    function g() {
      if (!t.autoplay) return;
      const { autoplayDirection: c } = e.slides;
      c ? s.next() : s.prev();
    }
    function p(c) {
      c.stopPropagation();
      const { visibleHudClick: _ } = e.general;
      _ && (u.value = !1);
      const { autoplayPauseOnHover: b } = e.slides;
      b && (l = !1, n());
    }
    function d() {
      const { visibleHudClick: c } = e.general;
      c && (u.value = !0);
      const { autoplayPauseOnHover: _ } = e.slides;
      _ && (l = !0, h());
    }
    function w() {
      e.general.visibleHudClick && (f.value = !f.value);
    }
    return (c, _) => (v(), y("div", {
      class: "slides",
      onMouseleave: p,
      onMouseenter: d,
      onClick: he(w, ["prevent"])
    }, [
      H($e),
      P("div", {
        class: B([
          "hud",
          f.value && "use",
          N(e).general.visibleHudHover && "hover"
        ])
      }, [
        N(e).general.hudContents.caption ? (v(), R(ze, {
          key: 0,
          class: "slides__caption"
        })) : S("", !0),
        N(e).general.hudContents.controller ? (v(), R(Ve, {
          key: 1,
          class: "slides__controller"
        })) : S("", !0),
        N(e).general.hudContents.paginate ? (v(), R(Ke, {
          key: 2,
          class: "slides__paginate"
        })) : S("", !0),
        N(e).general.hudContents.slots ? le(c.$slots, "default", { key: 3 }, void 0, !0) : S("", !0)
      ], 2)
    ], 32));
  }
}, qe = /* @__PURE__ */ L(Ye, [["__scopeId", "data-v-644c4847"]]), Ge = { class: "error" }, Je = {
  __name: "index",
  props: {
    message: { type: String, default: "Invalid error" }
  },
  setup(r) {
    const e = r;
    return (s, t) => (v(), y("article", Ge, [
      H(Z, { name: "skull" }),
      t[0] || (t[0] = P("h1", null, "Error", -1)),
      P("p", null, j(e.message), 1)
    ]));
  }
}, Qe = /* @__PURE__ */ L(Je, [["__scopeId", "data-v-ec71d4b2"]]), et = ["tabindex"], tt = {
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
  setup(r, { expose: e, emit: s }) {
    const t = M(), i = z(), f = de(), u = q(), o = C(), l = r, n = ee({
      stop: !0,
      error: void 0,
      swipe: !1,
      tabIndex: ""
    }), h = s;
    let g;
    K(() => p()), oe(() => {
      t.destroy(), i.destroy(), d().then();
    }), I(() => l.slides, () => w(), { deep: !0 }), I(() => l.preference, () => w(), { deep: !0 }), I(() => String(l.active), (m, $) => {
      m !== i.active && i.change(m);
    }), I(() => i.active, (m) => h("update:active", m)), I(() => l.autoplay, (m) => {
      u.autoplay = m;
    });
    async function p() {
      if (n.stop)
        try {
          f.setup(l.language), t.setup(l.preference), i.setup(l.slides, String(l.active)), u.setup({
            autoplay: l.autoplay
          }), await se(), _(), n.stop = !1;
        } catch (m) {
          n.error = m;
        }
    }
    async function d() {
      t.destroy(), i.destroy(), X(), n.stop = !0, n.error = void 0;
    }
    async function w() {
      await d(), await se(), await p();
    }
    function c() {
      return V({
        preference: t.exportData(),
        slides: {
          data: i.order.reduce((m, $) => (m.push({
            ...i.data.get($),
            key: $
          }), m), []),
          active: i.active,
          activeIndex: i.activeIndex
        },
        language: Object.fromEntries(f.data)
      });
    }
    function _() {
      switch (t.keyboard.eventTarget) {
        case ie.WINDOW:
          n.tabIndex = "", window.addEventListener("keyup", b);
          break;
        default:
          if (!o.value) return;
          n.tabIndex = "0", o.value.addEventListener("keyup", b);
          break;
      }
    }
    function b(m) {
      if (!t.keyboard.enable) return;
      const { keyCode: $ } = m;
      switch ($) {
        case 37:
          i.prev();
          break;
        case 39:
          i.next();
          break;
      }
    }
    function X() {
      var m;
      switch (n.tabIndex = "", (m = t.keyboard) == null ? void 0 : m.eventTarget) {
        case ie.WINDOW:
          window.removeEventListener("keyup", b);
          break;
        default:
          if (!o.value) return;
          o.value.removeEventListener("keyup", b);
          break;
      }
    }
    return e({
      stop: d,
      start: p,
      restart: w,
      exports: c
    }), (m, $) => (v(), y("div", {
      ref_key: "$slideshow",
      ref: o,
      tabindex: n.tabIndex,
      class: B(["slideshow", `theme--${l.theme}`])
    }, [
      n.error ? (v(), R(Qe, {
        key: 0,
        message: n.error.message
      }, null, 8, ["message"])) : n.stop ? S("", !0) : (v(), R(qe, { key: 1 }, {
        default: me(() => [
          le(m.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      })),
      N(g) ? (v(), R(ge(N(g)), { key: 2 })) : S("", !0)
    ], 10, et));
  }
}, st = /* @__PURE__ */ L(tt, [["__scopeId", "data-v-e6c75b5f"]]);
export {
  st as default
};
