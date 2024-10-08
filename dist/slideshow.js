import { computed as S, openBlock as v, createElementBlock as y, mergeProps as ue, createCommentVNode as T, Fragment as j, createElementVNode as L, createVNode as X, normalizeStyle as J, ref as P, reactive as ie, onMounted as Y, watch as O, normalizeClass as U, unref as b, renderList as fe, toDisplayString as V, onBeforeUnmount as pe, withModifiers as ve, createBlock as F, renderSlot as se, onUnmounted as he, nextTick as te, withCtx as me, resolveDynamicComponent as ge } from "vue";
import { defineStore as W } from "pinia";
function ye(n = 3e3) {
  return new Promise((e) => setTimeout(e, n));
}
function z(n) {
  try {
    if (!n) throw new Error("no src");
    try {
      return structuredClone(n);
    } catch {
      return JSON.parse(JSON.stringify(n));
    }
  } catch {
    return null;
  }
}
function ae(n, e) {
  let r = { ...n };
  for (let t in e)
    e.hasOwnProperty(t) && (typeof e[t] == "object" && e[t] !== null && n[t] ? r[t] = ae(n[t], e[t]) : r[t] = e[t]);
  return r;
}
function _e(n) {
  return n.replace(/(\w)(\w*)(_|-|\s*)/g, (e, r, t) => r.toUpperCase() + t.toLowerCase());
}
const C = {
  NONE: "none",
  FADE: "fade",
  HORIZONTAL: "horizontal"
}, R = {
  NONE: "none",
  SHUFFLE: "shuffle"
}, ne = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
}, re = {
  NONE: "none",
  CONTAIN: "contain",
  COVER: "cover"
};
function xe(n) {
  return Object.values(C).includes(n.slides.transitionType) || (n.slides.transitionType = C.NONE), Object.values(R).includes(n.slides.captionAnimationType) || (n.slides.captionAnimationType = R.NONE), Object.values(ne).includes(n.style.displayTheme) || (n.style.displayTheme = ne.SYSTEM), Object.values(re).includes(n.style.imageType) || (n.style.imageType = re.NONE), n;
}
const ke = {
  general: {
    // 슬라이드쇼에서 사용하는 각 항목 UI 표시할지에 대한 여부
    hud: !0,
    // 슬라이드쇼에 갖다대면 hud 영역이 등장한다.
    visibleHudHover: !1,
    // 슬라이드쇼를 클릭하면 hud 영역이 나왔다 없어진다.
    visibleHudClick: !1,
    // 특정 항목을 사용할지에 대한 스위치
    visibleHudContents: {
      slots: !0,
      caption: !0,
      controller: !0,
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
    // 캡션 애니메이션 딜레이 (ms)
    captionAnimationDelay: 0,
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
  style: {
    // dark,light,system
    displayTheme: "system",
    // none,contain,cover
    imageType: "cover",
    // [ width, height ]
    imageScale: ["100%", "100%"],
    // 캡션 사이즈 퍼센트(%)
    captionScale: 100,
    // [ left, top ]
    captionPosition: ["32px", "30px"]
  },
  keyboard: {
    enabled: !0
    // TODO
  }
}, we = {
  foo: "bar"
}, E = W("preference", {
  state: () => ({
    general: void 0,
    slides: void 0,
    style: void 0,
    keyboard: void 0
  }),
  getters: {},
  actions: {
    setup(n) {
      let e = ae(z(ke), n);
      e = xe(e), this.general = e.general, this.slides = e.slides, this.style = e.style, this.keyboard = e.keyboard;
    },
    exportData() {
      return z({
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
}), D = W("slides", {
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
      return this.order.map((n) => z(this.data.get(n)));
    },
    images() {
      return this.order.map((n) => {
        const e = this.data.get(n);
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
    setup(n, e) {
      ((n == null ? void 0 : n.length) > 0 ? n : []).forEach((t, a) => {
        const { key: p, ...l } = t, d = String(p || a + 1);
        this.order.push(d), this.data.set(d, l);
      }), e && this.order.includes(e) && (this.active = e), this.active || (this.active = this.order[0]);
    },
    destroy() {
      this.data.clear(), this.order = [];
    },
    prev() {
      if (this.lock) return;
      const n = E(), e = this.order.indexOf(this.active);
      let r;
      n.slides.loop ? r = (e - 1 + this.order.length) % this.order.length : r = e > 0 ? e - 1 : 0, this.direction = !1, this.active = this.order[r];
    },
    next() {
      if (this.lock) return;
      const n = E(), e = this.order.indexOf(this.active);
      let r;
      n.slides.loop ? r = (e + 1) % this.order.length : r = e < this.order.length - 1 ? e + 1 : this.order.length - 1, this.direction = !0, this.active = this.order[r];
    },
    /**
     * change slide
     * @param {string} key
     */
    change(n) {
      if (this.lock || !n || n === this.active) return;
      const e = this.order.indexOf(this.active), r = this.order.indexOf(n);
      r <= -1 || (this.direction = e < r, this.active = this.active = this.order[r]);
    }
  }
}), Te = W("language", {
  state: () => ({
    data: /* @__PURE__ */ new Map()
  }),
  getters: {
    print(n) {
    }
  },
  actions: {
    setup(n) {
      const e = Object.assign({}, z(we), n);
      Object.entries(e).forEach(([r, t]) => {
        this.data.set(r, t);
      });
    }
  }
}), Z = W("state", {
  state: () => ({
    swipe: !1,
    playedSlide: !1,
    playedSlideCancel: !1,
    autoplay: !0,
    hud: !1
  }),
  actions: {
    setup(n) {
      const e = E();
      n.autoplay !== void 0 && (this.autoplay = n.autoplay), this.hud = e.general.hud;
    }
  }
});
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oe = {
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
const be = ["svg", oe, [["path", { d: "m15 18-6-6 6-6" }]]];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Se = ["svg", oe, [["path", { d: "m9 18 6-6-6-6" }]]], I = (n, e) => {
  const r = n.__vccOpts || n;
  for (const [t, a] of e)
    r[t] = a;
  return r;
}, Ne = ["innerHTML"], Ae = {
  __name: "index",
  props: {
    name: String,
    color: String,
    size: String,
    stroke: Number,
    animation: String,
    animationSpeed: String
  },
  setup(n) {
    const e = n, r = {
      ChevronLeft: be,
      ChevronRight: Se
    }, t = S(() => {
      let l = r[_e(e.name)];
      if (!l) return null;
      const [d, c, i] = l;
      return a(d, c, i).innerHTML;
    });
    function a(l, d, c = []) {
      const i = document.createElementNS("http://www.w3.org/2000/svg", l);
      return Object.keys(d).forEach((f) => {
        i.setAttribute(f, String(d[f]));
      }), c.length && c.forEach((f) => {
        const g = a(...f);
        i.appendChild(g);
      }), i;
    }
    const p = S(() => {
      let l = {
        style: {}
      };
      return e.color && (l.style["--icon-color"] = e.color), e.size && (l.style["--icon-size"] = e.size), e.stroke && (l.style["--icon-stroke"] = e.stroke), e.animationSpeed && (l.style["--icon-animation-speed"] = e.animationSpeed), l;
    });
    return (l, d) => t.value ? (v(), y("svg", ue({
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
        `icon--${e.name}`,
        e.animation && `icon--animation-${e.animation}`
      ]
    }, p.value), null, 16, Ne)) : T("", !0);
  }
}, G = /* @__PURE__ */ I(Ae, [["__scopeId", "data-v-0ae74bdf"]]), Ce = { key: 0 }, Oe = ["src", "alt"], Ee = {
  __name: "images-item",
  props: {
    keyName: String,
    loaded: Boolean,
    src: String,
    alt: String,
    error: Boolean
  },
  emits: ["error"],
  setup(n, { emit: e }) {
    const r = E(), t = n, a = e, p = S(() => {
      const { imageScale: d, imageType: c } = r.style;
      return {
        "--w": d[0],
        "--h": d[1],
        "--fit": c
      };
    });
    function l() {
      a("error", t.keyName);
    }
    return (d, c) => (v(), y(j, null, [
      t.error ? (v(), y("p", Ce, [
        L("i", null, [
          X(G, { name: "x" })
        ]),
        c[0] || (c[0] = L("span", null, "no image", -1))
      ])) : T("", !0),
      t.loaded ? (v(), y("img", {
        key: 1,
        src: t.src,
        alt: t.alt,
        style: J(p.value),
        onError: l
      }, null, 44, Oe)) : T("", !0)
    ], 64));
  }
}, q = /* @__PURE__ */ I(Ee, [["__scopeId", "data-v-8ee9bee8"]]), Ie = {
  key: 0,
  class: "slide-first"
}, Pe = {
  key: 1,
  class: "slide-last"
}, Me = {
  __name: "images",
  props: {},
  emits: [
    "change",
    "transition-start",
    "transition-end",
    "short-touch"
  ],
  setup(n, { emit: e }) {
    const r = E(), t = D(), a = Z(), p = e, l = P(), d = P({}), c = P(), i = ie({
      items: t.order.reduce((s, _) => {
        const x = t.data.get(_);
        return s[_] = {
          src: x.src,
          alt: x.title,
          loaded: !1,
          error: !1
        }, s;
      }, {}),
      classNameActive: "active",
      classNamePrevActive: "",
      active: "",
      prevActive: "",
      swipePosX: NaN
    }), f = S(() => {
      if (t.order.indexOf(i.active) <= -1) return;
      let s = {};
      switch (r.slides.transitionType) {
        case C.FADE:
          break;
        case C.HORIZONTAL:
          switch (s["--speed-transition"] = `${r.slides.transitionSpeed}ms`, i.prevActive) {
            case "first":
              s["--active-column"] = 0;
              break;
            case "last":
              s["--active-column"] = t.order.length + 1;
              break;
            default:
              s["--active-column"] = $(i.prevActive || i.active), r.slides.loop && s["--active-column"]++;
              break;
          }
          isNaN(i.swipePosX) || (s["--swipe-pos-x"] = `${i.swipePosX}%`);
          break;
      }
      return s;
    }), g = S(() => {
      if (r.slides.transitionType !== "horizontal" || !r.slides.loop || t.order.length <= 1) return !1;
      const s = i.items[t.order[t.order.length - 1]];
      return {
        src: s.src,
        loaded: s.loaded,
        error: s.error
      };
    }), h = S(() => {
      if (r.slides.transitionType !== "horizontal" || !r.slides.loop || t.order.length <= 1) return !1;
      const s = i.items[t.order[0]];
      return {
        src: s.src,
        loaded: s.loaded,
        error: s.error
      };
    });
    let u = {
      touched: !1,
      dist: 0,
      startX: 0,
      startTime: null
    };
    Y(() => {
      i.active = t.active, B(t.order, t.order.indexOf(i.active), r.slides.loop);
    }), O(() => t.active, async (s) => {
      t.order.length <= 1 || await k(s);
    });
    async function k(s) {
      var w;
      const { transitionType: _, loop: x } = r.slides;
      switch (p("transition-start"), _) {
        case C.NONE:
          i.active = s, B(t.order, t.order.indexOf(i.active), x), p("transition-end");
          break;
        case C.FADE:
          t.lock = !0, a.playedSlide = !0, i.prevActive = i.active, i.classNamePrevActive = "fade-out", i.active = s, i.classNameActive = "fade-in hide", await ye(20), i.classNameActive = "fade-in", (w = d.value[i.active]) == null || w.addEventListener("transitionend", o, { once: !0 });
          break;
        case C.HORIZONTAL:
          t.lock = !0, a.playedSlide = !0;
          const N = {
            prev: $(i.active),
            next: $(s)
          };
          x && (N.prev === 0 && N.next >= t.order.length - 1 ? i.prevActive = "first" : N.prev >= t.order.length - 1 && N.next === 0 ? i.prevActive = "last" : i.prevActive = ""), i.active = s, c.value.addEventListener("transitionend", o, { once: !0 });
          break;
      }
    }
    function o() {
      const { transitionType: s, loop: _ } = r.slides;
      switch (s) {
        case C.FADE:
          i.prevActive = "", i.classNamePrevActive = "", i.classNameActive = "active", a.playedSlide = !1, t.lock = !1, B(t.order, t.order.indexOf(i.active), _), p("transition-end");
          break;
        case C.HORIZONTAL:
          a.playedSlide = !1, i.prevActive = "", t.lock = !1, B(t.order, t.order.indexOf(i.active), _), p("transition-end");
          break;
      }
    }
    function m() {
      a.playedSlideCancel = !0, c.value.addEventListener("transitionend", A, { once: !0 });
    }
    function A() {
      a.playedSlideCancel = !1;
    }
    function $(s) {
      const _ = t.order.indexOf(s);
      return _ > -1 ? _ : void 0;
    }
    function B(s, _, x, w = 2) {
      const N = s.length;
      for (let M = 0 - w; M <= w; M++) {
        let H = _ + M;
        if (H < 0)
          if (x) H = N + H;
          else continue;
        else if (H >= N)
          if (x) H = H % N;
          else continue;
        i.items[s[H]].loaded = !0;
      }
    }
    function le(s) {
      i.items[s] && (i.items[s].error = !0);
    }
    function K(s) {
      s.stopPropagation(), s.touches && (u.touched = !0), s.touches && s.touches.length > 1 && s.preventDefault(), !a.playedSlide && r.slides.swipe && r.slides.transitionType === C.HORIZONTAL && (t.order.length <= 2 || (u.dist = 0, u.startX = s.touches && s.touches[0] ? Math.floor(s.touches[0].clientX) : s.clientX || s.pageX, u.startTime = (/* @__PURE__ */ new Date()).getTime(), a.swipe = !0));
    }
    function Q(s) {
      if (s.stopPropagation(), !s.touches && u.touched || !a.swipe || t.order.length <= 2) return;
      u.moveX = s.touches && s.touches[0] ? Math.floor(s.touches[0].clientX) : s.clientX || s.pageX;
      const _ = l.value.offsetWidth, x = u.moveX - u.startX, w = r.slides.loop ? 1 : 0;
      i.swipePosX = x / _ * 100 + (0 - 100 * ($(i.active) + w));
    }
    function ee(s) {
      if (s.stopPropagation(), !s.touches && u.touched || !a.swipe || s.touches && s.touches.length > 0 || t.order.length <= 2) return;
      const _ = l.value.offsetWidth;
      u.endX = s.changedTouches && s.changedTouches[0] ? Math.floor(s.changedTouches[0].clientX) : s.clientX || s.pageX;
      const x = u.startX > u.endX, w = (/* @__PURE__ */ new Date()).getTime() - u.startTime, N = u.endX - u.startX, M = Math.abs(N) / _ * 100;
      if (u.dist = 0, u.startX = void 0, u.startTime = void 0, u.moveX = void 0, u.endX = void 0, a.swipe = !1, i.swipePosX = NaN, !(w < 60 || M < 1)) {
        if (!r.slides.loop) {
          if (x) {
            if (t.activeIndex === t.data.size - 1) {
              m();
              return;
            }
          } else if (t.activeIndex === 0) {
            m();
            return;
          }
        }
        w > 300 ? M > 30 ? t[x ? "next" : "prev"]() : m() : M > 5 ? t[x ? "next" : "prev"]() : m();
      }
    }
    function ce() {
      a.swipe && m(), a.swipe = !1, i.swipePosX = NaN;
    }
    function de() {
      a.swipe = !1, i.swipePosX = NaN;
    }
    return (s, _) => (v(), y("div", {
      ref_key: "$root",
      ref: l,
      class: U([
        "images",
        `mode--${b(r).slides.transitionType}`,
        b(a).playedSlide && "animation-play",
        b(a).playedSlideCancel && "animation-cancel",
        b(a).swipe && "swipe"
      ]),
      style: J(f.value),
      onTouchstart: K,
      onTouchmove: Q,
      onTouchend: ee,
      onMousedown: K,
      onMousemove: Q,
      onMouseup: ee,
      onMouseleave: ce,
      onContextmenu: de
    }, [
      L("ul", {
        ref_key: "$body",
        ref: c,
        class: "body"
      }, [
        g.value ? (v(), y("li", Ie, [
          X(q, {
            "key-name": "first-slide-image",
            loaded: g.value.loaded,
            src: g.value.src,
            error: g.value.error
          }, null, 8, ["loaded", "src", "error"])
        ])) : T("", !0),
        (v(!0), y(j, null, fe(i.items, (x, w) => (v(), y("li", {
          ref_for: !0,
          ref: (N) => {
            d.value[w] = N;
          },
          class: U([
            !!i.classNameActive && i.active === w && i.classNameActive,
            !!i.classNamePrevActive && i.prevActive === w && i.classNamePrevActive
          ])
        }, [
          X(q, {
            "key-name": w,
            loaded: x.loaded,
            src: x.src,
            alt: x.alt,
            error: x.error,
            onError: le
          }, null, 8, ["key-name", "loaded", "src", "alt", "error"])
        ], 2))), 256)),
        h.value ? (v(), y("li", Pe, [
          X(q, {
            "key-name": "last-slide-image",
            loaded: h.value.loaded,
            src: h.value.src,
            error: h.value.error
          }, null, 8, ["loaded", "src", "error"])
        ])) : T("", !0)
      ], 512),
      _[0] || (_[0] = L("i", { class: "overlay" }, null, -1))
    ], 38));
  }
}, He = /* @__PURE__ */ I(Me, [["__scopeId", "data-v-9263e289"]]);
function Xe(n, e) {
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
  let r = [], t = 0, a = 0, p = "", l = !0, d = !1, c = 0;
  const i = 1e3 / e.fps;
  function f(h) {
    const u = h - c;
    if (u > i) {
      c = h - u % i;
      let k = p;
      l = !0;
      for (let o = a; o <= t; o++)
        if (r[o] !== 0 && r[o] != null) {
          l = !1;
          const m = r[o];
          let A = "";
          if (Math.abs(m) <= e.moveTrigger) {
            switch (e.randomTextType) {
              case "pattern":
                A = g(e.pattern);
                break;
              case "unicode":
              default:
                const $ = Math.min(Math.max(e.text.charCodeAt(o) + m, 33), 126);
                A = String.fromCharCode($);
                break;
            }
            k += A;
          } else
            k += e.waitChar;
          m > 0 ? r[o] -= 1 : r[o] += 1;
        } else
          a === o - 1 && (a = o, p = e.text.substring(0, a)), k += e.text.charAt(o);
      if (n.textContent = k, t <= e.text.length ? t += e.charSpeed : d = !0, l && d) {
        n.dataset.id && cancelAnimationFrame(parseInt(n.dataset.id)), n.textContent = p, n.dataset.run = "false", e.callback && e.callback();
        return;
      }
    }
    n.dataset.id = requestAnimationFrame(f);
  }
  function g(h) {
    const u = Math.floor(Math.random() * h.length);
    return h.substring(u, u + 1);
  }
  if (e.text || e.text && !e.retry && n.dataset.run !== "true") {
    n.dataset.run = "true", n.textContent = e.waitChar;
    for (let h = 0; h <= e.text.length - 1; h++)
      e.text.charAt(h) !== " " ? r[h] = (e.moveFix + Math.round(Math.random() * e.moveRange)) * (Math.round(Math.random()) - 0.5) * 2 : r[h] = 0;
    t = 0, a = 0, p = "", n.dataset.id && cancelAnimationFrame(Number(n.dataset.id)), n.dataset.id = requestAnimationFrame(f);
  }
}
const Le = { key: 0 }, $e = { key: 1 }, Fe = {
  __name: "caption",
  setup(n) {
    const e = P(), r = P(), t = E(), a = D(), p = S(() => {
      const { captionPosition: f, captionScale: g } = t.style;
      return {
        "--caption-left": f[0],
        "--caption-top": f[1],
        "--caption-scale": g
      };
    }), l = S(() => {
      if (!a.data.get(a.active)) return {};
      const { title: f, description: g } = a.data.get(a.active);
      return { title: f, description: g };
    }), d = S(() => t.slides.captionAnimationType);
    let c = {
      title: void 0,
      description: void 0
    };
    Y(() => {
      switch (d.value) {
        case R.SHUFFLE:
          i(0);
          break;
      }
    }), O(() => a.active, (f, g) => {
      switch (d.value) {
        case R.SHUFFLE:
          i(t.slides.captionAnimationDelay);
          break;
      }
    });
    function i(f) {
      const { captionAnimationSpeed: g } = t.slides;
      function h(k, o) {
        try {
          Xe(k, {
            text: o,
            fps: g,
            randomTextType: "pattern"
          });
        } catch {
          u();
        }
      }
      function u() {
        var k, o, m, A;
        (o = (k = e.value) == null ? void 0 : k.dataset) != null && o.id && (cancelAnimationFrame(Number(e.value.dataset.id)), e.value.textContent = ""), (A = (m = r.value) == null ? void 0 : m.dataset) != null && A.id && (cancelAnimationFrame(Number(r.value.dataset.id)), r.value.textContent = ""), c.title && clearTimeout(c.title), c.description && clearTimeout(c.description);
      }
      u(), r.value.dataset.id && (clearInterval(Number(r.value.dataset.id)), r.value.innerText = ""), l.value.title && (c.title = setTimeout(() => {
        clearTimeout(c.title), c.title = void 0, h(e.value, l.value.title);
      }, f)), l.value.description && (c.description = setTimeout(() => {
        clearTimeout(c.description), c.description = void 0, h(r.value, l.value.description);
      }, f + 300));
    }
    return (f, g) => (v(), y("article", {
      class: "caption",
      style: J(p.value)
    }, [
      d.value === b(R).NONE ? (v(), y(j, { key: 0 }, [
        l.value.title ? (v(), y("h1", Le, V(l.value.title), 1)) : T("", !0),
        l.value.description ? (v(), y("p", $e, V(l.value.description), 1)) : T("", !0)
      ], 64)) : (v(), y(j, { key: 1 }, [
        l.value.title ? (v(), y("h1", {
          key: 0,
          ref_key: "$title",
          ref: e
        }, null, 512)) : T("", !0),
        l.value.description ? (v(), y("p", {
          key: 1,
          ref_key: "$description",
          ref: r
        }, null, 512)) : T("", !0)
      ], 64))
    ], 4));
  }
}, De = /* @__PURE__ */ I(Fe, [["__scopeId", "data-v-db7293c8"]]), Re = ["disabled"], ze = ["disabled"], Be = {
  __name: "controller",
  setup(n) {
    const e = E(), r = D(), t = Z(), a = S(() => e.slides.loop ? !0 : 0 < r.activeIndex), p = S(() => e.slides.loop ? !0 : r.order.length - 1 > r.activeIndex);
    function l() {
      r.prev();
    }
    function d() {
      r.next();
    }
    return (c, i) => (v(), y("nav", {
      class: U([
        "controller",
        b(t).swipe && "swipe"
      ])
    }, [
      L("button", {
        type: "button",
        title: "prev slide",
        disabled: !a.value,
        class: "prev",
        onClick: l
      }, [
        X(G, { name: "chevron-left" })
      ], 8, Re),
      L("button", {
        type: "button",
        title: "next slide",
        disabled: !p.value,
        class: "next",
        onClick: d
      }, [
        X(G, { name: "chevron-right" })
      ], 8, ze)
    ], 2));
  }
}, je = /* @__PURE__ */ I(Be, [["__scopeId", "data-v-39225382"]]), Ue = { class: "paginate" }, Ve = {
  __name: "paginate",
  setup(n) {
    const e = D(), r = S(() => e.order.length), t = S(() => e.activeIndex + 1);
    return (a, p) => (v(), y("p", Ue, V(t.value) + " / " + V(r.value), 1));
  }
}, Ye = /* @__PURE__ */ I(Ve, [["__scopeId", "data-v-f7df2a3a"]]), We = {
  __name: "index",
  setup(n) {
    const e = E(), r = D(), t = Z(), a = P(!t.autoplay), p = P(e.general.hud), l = P(e.general.hud);
    let d, c = a.value;
    Y(() => i()), pe(() => f()), O(() => t.autoplay, (o) => {
      a.value = !o;
    }), O(() => r.lock, (o) => {
      a.value = o, o ? f() : i();
    }), O(() => t.swipe, (o) => {
      a.value = o, o ? f() : i();
    });
    function i() {
      c !== void 0 && (a.value = c), e.slides.autoplay && t.autoplay && !a.value && (f(), d = setTimeout(g, e.slides.autoplayDelay));
    }
    function f() {
      d && (clearTimeout(d), d = void 0);
    }
    function g() {
      if (!t.autoplay) return;
      const { autoplayDirection: o } = e.slides;
      o ? r.next() : r.prev();
    }
    function h(o) {
      o.stopPropagation();
      const { visibleHudClick: m } = e.general;
      m && (l.value = !1);
      const { autoplayPauseOnHover: A } = e.slides;
      A && (c = !1, i());
    }
    function u() {
      const { visibleHudClick: o } = e.general;
      o && (l.value = !0);
      const { autoplayPauseOnHover: m } = e.slides;
      m && (c = !0, f());
    }
    function k() {
      e.general.visibleHudClick && (p.value = !p.value);
    }
    return (o, m) => (v(), y("div", {
      class: "slides",
      onMouseleave: h,
      onMouseenter: u,
      onClick: ve(k, ["prevent"])
    }, [
      X(He),
      L("div", {
        class: U([
          "hud",
          p.value && "use",
          b(e).general.visibleHudHover && "hover"
        ])
      }, [
        b(e).general.hudContents.caption ? (v(), F(De, {
          key: 0,
          class: "slides__caption"
        })) : T("", !0),
        b(e).general.hudContents.controller ? (v(), F(je, {
          key: 1,
          class: "slides__controller"
        })) : T("", !0),
        b(e).general.hudContents.paginate ? (v(), F(Ye, {
          key: 2,
          class: "slides__paginate"
        })) : T("", !0),
        b(e).general.hudContents.slots ? se(o.$slots, "default", { key: 3 }, void 0, !0) : T("", !0)
      ], 2)
    ], 32));
  }
}, Ze = /* @__PURE__ */ I(We, [["__scopeId", "data-v-dde3fc16"]]), qe = {};
function Ge(n, e) {
  return v(), y("p", null, ".error");
}
const Je = /* @__PURE__ */ I(qe, [["render", Ge]]), Ke = {
  key: 0,
  class: "slideshow"
}, Qe = {
  __name: "index",
  props: {
    active: [String, Number],
    autoplay: Boolean,
    preference: Object,
    slides: Array,
    language: Object
  },
  emits: [
    "update:active",
    "update:autoplay"
  ],
  setup(n, { expose: e, emit: r }) {
    const t = E(), a = D(), p = Te(), l = Z(), d = n, c = ie({
      stop: !0,
      error: void 0,
      swipe: !1
    }), i = r;
    let f;
    Y(() => {
      g().then();
    }), he(() => {
      t.destroy(), a.destroy(), h().then();
    }), O(() => d.slides, () => u(), { deep: !0 }), O(() => d.preference, () => u(), { deep: !0 }), O(() => String(d.active), (o, m) => {
      o !== a.active && a.change(o);
    }), O(() => a.active, (o) => {
      i("update:active", o);
    }), O(() => d.autoplay, (o) => {
      l.autoplay = o;
    });
    async function g() {
      if (c.stop)
        try {
          t.setup(d.preference), a.setup(d.slides, String(d.active)), p.setup(d.language), l.setup({
            autoplay: d.autoplay
          }), await te(), c.stop = !1;
        } catch (o) {
          c.error = o;
        }
    }
    async function h() {
      t.destroy(), a.destroy(), c.stop = !0, c.error = void 0;
    }
    async function u() {
      await h(), await te(), await g();
    }
    function k() {
      return z({
        preference: t.exportData(),
        slides: {
          data: a.order.reduce((o, m) => (o.push({
            ...a.data.get(m),
            key: m
          }), o), []),
          active: a.active,
          activeIndex: a.activeIndex
        },
        language: Object.fromEntries(p.data)
      });
    }
    return e({
      stop: h,
      start: g,
      restart: u,
      exports: k
    }), (o, m) => c.stop ? T("", !0) : (v(), y("div", Ke, [
      c.error ? (v(), F(Je, { key: 0 })) : (v(), F(Ze, { key: 1 }, {
        default: me(() => [
          se(o.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      })),
      b(f) ? (v(), F(ge(b(f)), { key: 2 })) : T("", !0)
    ]));
  }
}, nt = /* @__PURE__ */ I(Qe, [["__scopeId", "data-v-40ef1d75"]]);
export {
  nt as default
};
