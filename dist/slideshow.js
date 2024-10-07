import { computed as T, openBlock as h, createElementBlock as g, mergeProps as de, createCommentVNode as b, Fragment as z, createElementVNode as $, createVNode as O, normalizeStyle as G, ref as L, reactive as ie, onMounted as Y, watch as A, normalizeClass as Z, unref as I, renderList as ue, toDisplayString as B, onBeforeUnmount as pe, onUnmounted as fe, nextTick as te, createBlock as V, renderSlot as ve, resolveDynamicComponent as he } from "vue";
import { defineStore as J } from "pinia";
function me(n = 3e3) {
  return new Promise((e) => setTimeout(e, n));
}
function U(n) {
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
function ye(n) {
  return n.replace(/(\w)(\w*)(_|-|\s*)/g, (e, r, t) => r.toUpperCase() + t.toLowerCase());
}
const N = {
  NONE: "none",
  FADE: "fade",
  HORIZONTAL: "horizontal"
}, H = {
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
function ge(n) {
  return Object.values(N).includes(n.slides.transitionType) || (n.slides.transitionType = N.NONE), Object.values(H).includes(n.slides.captionAnimationType) || (n.slides.captionAnimationType = H.NONE), Object.values(ne).includes(n.style.displayTheme) || (n.style.displayTheme = ne.SYSTEM), Object.values(re).includes(n.style.imageType) || (n.style.imageType = re.NONE), n;
}
const _e = {
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
    transitionType: "horizontal",
    // 트랜지션 종류 (none,fade,horizontal)
    transitionSpeed: 500,
    // 트랜지션 속도 (ms)
    captionAnimationType: "none",
    // none,shuffle
    captionAnimationDelay: 0,
    // 캡션 애니메이션 딜레이 (ms)
    captionAnimationSpeed: 40,
    // 캡션 애니메이션 속도 (fps)
    autoplay: !1,
    // 자동재생 기능사용 (자동재생이 켜진다는 의미가 아니다)
    autoplayDelay: 7e3,
    // 자동재생 공백시간
    autoplayDirection: !0,
    // next(true), prev(false)
    autoplayPauseOnHover: !0,
    // 영역에 갖다댈때 자동재생 일시정지 여부
    loop: !0,
    // 마지막에서 처음으로 되돌리기
    swipe: !0
    // 스와이프 사용여부
  },
  style: {
    displayTheme: "system",
    // dark,light,system
    imageType: "cover",
    // none,contain,cover
    imageScale: ["100%", "100%"],
    // [ width, height ]
    captionScale: 100,
    // 캡션 사이즈 퍼센트(%)
    captionPosition: ["32px", "30px"]
    // [ left, top ]
  },
  keyboard: {
    enabled: !0
  }
}, P = J("preference", {
  state: () => ({
    general: void 0,
    slides: void 0,
    style: void 0,
    keyboard: void 0
  }),
  getters: {},
  actions: {
    setup(n) {
      let e = ae(U(_e), n);
      e = ge(e), this.general = e.general, this.slides = e.slides, this.style = e.style, this.keyboard = e.keyboard;
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
}), D = J("slides", {
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
      return this.order.map((n) => U(this.data.get(n)));
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
      ((n == null ? void 0 : n.length) > 0 ? n : []).forEach((t, s) => {
        const { key: u, ...o } = t, c = String(u || s + 1);
        this.order.push(c), this.data.set(c, o);
      }), e && this.order.includes(e) && (this.active = e), this.active || (this.active = this.order[0]);
    },
    exportData() {
      return U(this.data);
    },
    destroy() {
      this.data.clear(), this.order = [];
    },
    prev() {
      if (this.lock) return;
      const n = P(), e = this.order.indexOf(this.active);
      let r;
      n.slides.loop ? r = (e - 1 + this.order.length) % this.order.length : r = e > 0 ? e - 1 : 0, this.direction = !1, this.active = this.order[r];
    },
    next() {
      if (this.lock) return;
      const n = P(), e = this.order.indexOf(this.active);
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
}), j = J("state", {
  state: () => ({
    swipe: !1,
    playedSlide: !1,
    playedSlideCancel: !1,
    autoplay: !0
  }),
  actions: {
    setup(n) {
      n.autoplay !== void 0 && (this.autoplay = n.autoplay);
    }
  }
});
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const se = {
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
const xe = ["svg", se, [["path", { d: "m15 18-6-6 6-6" }]]];
/**
 * @license lucide v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ke = ["svg", se, [["path", { d: "m9 18 6-6-6-6" }]]], E = (n, e) => {
  const r = n.__vccOpts || n;
  for (const [t, s] of e)
    r[t] = s;
  return r;
}, Te = ["innerHTML"], we = {
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
      ChevronLeft: xe,
      ChevronRight: ke
    }, t = T(() => {
      let o = r[ye(e.name)];
      if (!o) return null;
      const [c, d, a] = o;
      return s(c, d, a).innerHTML;
    });
    function s(o, c, d = []) {
      const a = document.createElementNS("http://www.w3.org/2000/svg", o);
      return Object.keys(c).forEach((f) => {
        a.setAttribute(f, String(c[f]));
      }), d.length && d.forEach((f) => {
        const m = s(...f);
        a.appendChild(m);
      }), a;
    }
    const u = T(() => {
      let o = {
        style: {}
      };
      return e.color && (o.style["--icon-color"] = e.color), e.size && (o.style["--icon-size"] = e.size), e.stroke && (o.style["--icon-stroke"] = e.stroke), e.animationSpeed && (o.style["--icon-animation-speed"] = e.animationSpeed), o;
    });
    return (o, c) => t.value ? (h(), g("svg", de({
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
    }, u.value), null, 16, Te)) : b("", !0);
  }
}, q = /* @__PURE__ */ E(we, [["__scopeId", "data-v-0ae74bdf"]]), Se = { key: 0 }, be = ["src", "alt"], Ne = {
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
    const r = P(), t = n, s = e, u = T(() => {
      const { imageScale: c, imageType: d } = r.style;
      return {
        "--w": c[0],
        "--h": c[1],
        "--fit": d
      };
    });
    function o() {
      s("error", t.keyName);
    }
    return (c, d) => (h(), g(z, null, [
      t.error ? (h(), g("p", Se, [
        $("i", null, [
          O(q, { name: "x" })
        ]),
        d[0] || (d[0] = $("span", null, "no image", -1))
      ])) : b("", !0),
      t.loaded ? (h(), g("img", {
        key: 1,
        src: t.src,
        alt: t.alt,
        style: G(u.value),
        onError: o
      }, null, 44, be)) : b("", !0)
    ], 64));
  }
}, W = /* @__PURE__ */ E(Ne, [["__scopeId", "data-v-8ee9bee8"]]), Ae = {
  key: 0,
  class: "slide-first"
}, Oe = {
  key: 1,
  class: "slide-last"
}, Ee = {
  __name: "images",
  props: {},
  emits: [
    "change",
    "transition-start",
    "transition-end"
  ],
  setup(n, { emit: e }) {
    const r = P(), t = D(), s = j(), u = e, o = L(), c = L({}), d = L(), a = ie({
      items: t.order.reduce((i, _) => {
        const x = t.data.get(_);
        return i[_] = {
          src: x.src,
          alt: x.title,
          loaded: !1,
          error: !1
        }, i;
      }, {}),
      classNameActive: "active",
      classNamePrevActive: "",
      active: "",
      prevActive: "",
      swipePosX: NaN
    }), f = T(() => {
      if (t.order.indexOf(a.active) <= -1) return;
      let i = {};
      switch (r.slides.transitionType) {
        case N.FADE:
          break;
        case N.HORIZONTAL:
          switch (i["--speed-transition"] = `${r.slides.transitionSpeed}ms`, a.prevActive) {
            case "first":
              i["--active-column"] = 0;
              break;
            case "last":
              i["--active-column"] = t.order.length + 1;
              break;
            default:
              i["--active-column"] = F(a.prevActive || a.active), r.slides.loop && i["--active-column"]++;
              break;
          }
          isNaN(a.swipePosX) || (i["--swipe-pos-x"] = `${a.swipePosX}%`);
          break;
      }
      return i;
    }), m = T(() => {
      if (r.slides.transitionType !== "horizontal" || !r.slides.loop || t.order.length <= 1) return !1;
      const i = a.items[t.order[t.order.length - 1]];
      return {
        src: i.src,
        loaded: i.loaded,
        error: i.error
      };
    }), v = T(() => {
      if (r.slides.transitionType !== "horizontal" || !r.slides.loop || t.order.length <= 1) return !1;
      const i = a.items[t.order[0]];
      return {
        src: i.src,
        loaded: i.loaded,
        error: i.error
      };
    });
    let l = {
      touched: !1,
      dist: 0,
      startX: 0,
      startTime: null
    };
    Y(() => {
      a.active = t.active, R(t.order, t.order.indexOf(a.active), r.slides.loop);
    }), A(() => t.active, async (i) => {
      t.order.length <= 1 || await p(i);
    });
    async function p(i) {
      var k;
      const { transitionType: _, loop: x } = r.slides;
      switch (u("transition-start"), _) {
        case N.NONE:
          a.active = i, R(t.order, t.order.indexOf(a.active), x), u("transition-end");
          break;
        case N.FADE:
          t.lock = !0, s.playedSlide = !0, a.prevActive = a.active, a.classNamePrevActive = "fade-out", a.active = i, a.classNameActive = "fade-in hide", await me(20), a.classNameActive = "fade-in", (k = c.value[a.active]) == null || k.addEventListener("transitionend", y, { once: !0 });
          break;
        case N.HORIZONTAL:
          t.lock = !0, s.playedSlide = !0;
          const w = {
            prev: F(a.active),
            next: F(i)
          };
          x && (w.prev === 0 && w.next >= t.order.length - 1 ? a.prevActive = "first" : w.prev >= t.order.length - 1 && w.next === 0 ? a.prevActive = "last" : a.prevActive = ""), a.active = i, d.value.addEventListener("transitionend", y, { once: !0 });
          break;
      }
    }
    function y() {
      const { transitionType: i, loop: _ } = r.slides;
      switch (i) {
        case N.FADE:
          a.prevActive = "", a.classNamePrevActive = "", a.classNameActive = "active", s.playedSlide = !1, t.lock = !1, R(t.order, t.order.indexOf(a.active), _), u("transition-end");
          break;
        case N.HORIZONTAL:
          s.playedSlide = !1, a.prevActive = "", t.lock = !1, R(t.order, t.order.indexOf(a.active), _), u("transition-end");
          break;
      }
    }
    function S() {
      s.playedSlideCancel = !0, d.value.addEventListener("transitionend", C, { once: !0 });
    }
    function C() {
      s.playedSlideCancel = !1;
    }
    function F(i) {
      const _ = t.order.indexOf(i);
      return _ > -1 ? _ : void 0;
    }
    function R(i, _, x, k = 2) {
      const w = i.length;
      for (let M = 0 - k; M <= k; M++) {
        let X = _ + M;
        if (X < 0)
          if (x) X = w + X;
          else continue;
        else if (X >= w)
          if (x) X = X % w;
          else continue;
        a.items[i[X]].loaded = !0;
      }
    }
    function oe(i) {
      a.items[i] && (a.items[i].error = !0);
    }
    function K(i) {
      i.stopPropagation(), i.touches && (l.touched = !0), i.touches && i.touches.length > 1 && i.preventDefault(), !s.playedSlide && r.slides.swipe && r.slides.transitionType === N.HORIZONTAL && (t.order.length <= 2 || (l.dist = 0, l.startX = i.touches && i.touches[0] ? Math.floor(i.touches[0].clientX) : i.clientX || i.pageX, l.startTime = (/* @__PURE__ */ new Date()).getTime(), s.swipe = !0));
    }
    function Q(i) {
      if (i.stopPropagation(), !i.touches && l.touched || !s.swipe || t.order.length <= 2) return;
      l.moveX = i.touches && i.touches[0] ? Math.floor(i.touches[0].clientX) : i.clientX || i.pageX;
      const _ = o.value.offsetWidth, x = l.moveX - l.startX, k = r.slides.loop ? 1 : 0;
      a.swipePosX = x / _ * 100 + (0 - 100 * (F(a.active) + k));
    }
    function ee(i) {
      if (i.stopPropagation(), !i.touches && l.touched || !s.swipe || i.touches && i.touches.length > 0 || t.order.length <= 2) return;
      const _ = o.value.offsetWidth;
      l.endX = i.changedTouches && i.changedTouches[0] ? Math.floor(i.changedTouches[0].clientX) : i.clientX || i.pageX;
      const x = l.startX > l.endX, k = (/* @__PURE__ */ new Date()).getTime() - l.startTime, w = l.endX - l.startX, M = Math.abs(w) / _ * 100;
      l.dist = 0, l.startX = void 0, l.startTime = void 0, l.moveX = void 0, l.endX = void 0, s.swipe = !1, a.swipePosX = NaN, !(k < 60 || M < 1) && (k > 300 ? M > 30 ? t[x ? "next" : "prev"]() : S() : M > 5 ? t[x ? "next" : "prev"]() : S());
    }
    function le() {
      s.swipe && S(), s.swipe = !1, a.swipePosX = NaN;
    }
    function ce() {
      s.swipe = !1, a.swipePosX = NaN;
    }
    return (i, _) => (h(), g("div", {
      ref_key: "$root",
      ref: o,
      class: Z([
        "images",
        `mode--${I(r).slides.transitionType}`,
        I(s).playedSlide && "animation-play",
        I(s).playedSlideCancel && "animation-cancel",
        I(s).swipe && "swipe"
      ]),
      style: G(f.value),
      onTouchstart: K,
      onTouchmove: Q,
      onTouchend: ee,
      onMousedown: K,
      onMousemove: Q,
      onMouseup: ee,
      onMouseleave: le,
      onContextmenu: ce
    }, [
      $("ul", {
        ref_key: "$body",
        ref: d,
        class: "body"
      }, [
        m.value ? (h(), g("li", Ae, [
          O(W, {
            "key-name": "first-slide-image",
            loaded: m.value.loaded,
            src: m.value.src,
            error: m.value.error
          }, null, 8, ["loaded", "src", "error"])
        ])) : b("", !0),
        (h(!0), g(z, null, ue(a.items, (x, k) => (h(), g("li", {
          ref_for: !0,
          ref: (w) => {
            c.value[k] = w;
          },
          class: Z([
            !!a.classNameActive && a.active === k && a.classNameActive,
            !!a.classNamePrevActive && a.prevActive === k && a.classNamePrevActive
          ])
        }, [
          O(W, {
            "key-name": k,
            loaded: x.loaded,
            src: x.src,
            alt: x.alt,
            error: x.error,
            onError: oe
          }, null, 8, ["key-name", "loaded", "src", "alt", "error"])
        ], 2))), 256)),
        v.value ? (h(), g("li", Oe, [
          O(W, {
            "key-name": "last-slide-image",
            loaded: v.value.loaded,
            src: v.value.src,
            error: v.value.error
          }, null, 8, ["loaded", "src", "error"])
        ])) : b("", !0)
      ], 512),
      _[0] || (_[0] = $("i", { class: "overlay" }, null, -1))
    ], 38));
  }
}, Ce = /* @__PURE__ */ E(Ee, [["__scopeId", "data-v-bb6589e8"]]);
function Ie(n, e) {
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
  let r = [], t = 0, s = 0, u = "", o = !0, c = !1, d = 0;
  const a = 1e3 / e.fps;
  function f(v) {
    const l = v - d;
    if (l > a) {
      d = v - l % a;
      let p = u;
      o = !0;
      for (let y = s; y <= t; y++)
        if (r[y] !== 0 && r[y] != null) {
          o = !1;
          const S = r[y];
          let C = "";
          if (Math.abs(S) <= e.moveTrigger) {
            switch (e.randomTextType) {
              case "pattern":
                C = m(e.pattern);
                break;
              case "unicode":
              default:
                const F = Math.min(Math.max(e.text.charCodeAt(y) + S, 33), 126);
                C = String.fromCharCode(F);
                break;
            }
            p += C;
          } else
            p += e.waitChar;
          S > 0 ? r[y] -= 1 : r[y] += 1;
        } else
          s === y - 1 && (s = y, u = e.text.substring(0, s)), p += e.text.charAt(y);
      if (n.textContent = p, t <= e.text.length ? t += e.charSpeed : c = !0, o && c) {
        n.dataset.id && cancelAnimationFrame(parseInt(n.dataset.id)), n.textContent = u, n.dataset.run = "false", e.callback && e.callback();
        return;
      }
    }
    n.dataset.id = requestAnimationFrame(f);
  }
  function m(v) {
    const l = Math.floor(Math.random() * v.length);
    return v.substring(l, l + 1);
  }
  if (e.text || e.text && !e.retry && n.dataset.run !== "true") {
    n.dataset.run = "true", n.textContent = e.waitChar;
    for (let v = 0; v <= e.text.length - 1; v++)
      e.text.charAt(v) !== " " ? r[v] = (e.moveFix + Math.round(Math.random() * e.moveRange)) * (Math.round(Math.random()) - 0.5) * 2 : r[v] = 0;
    t = 0, s = 0, u = "", n.dataset.id && cancelAnimationFrame(Number(n.dataset.id)), n.dataset.id = requestAnimationFrame(f);
  }
}
const Pe = { key: 0 }, Me = { key: 1 }, Xe = {
  __name: "caption",
  setup(n) {
    const e = L(), r = L(), t = P(), s = D(), u = T(() => {
      const { captionPosition: f, captionScale: m } = t.style;
      return {
        "--caption-left": f[0],
        "--caption-top": f[1],
        "--caption-scale": m
      };
    }), o = T(() => {
      if (!s.data.get(s.active)) return {};
      const { title: f, description: m } = s.data.get(s.active);
      return { title: f, description: m };
    }), c = T(() => t.slides.captionAnimationType);
    let d = {
      title: void 0,
      description: void 0
    };
    Y(() => {
      switch (c.value) {
        case H.SHUFFLE:
          a(0);
          break;
      }
    }), A(() => s.active, (f, m) => {
      switch (c.value) {
        case H.SHUFFLE:
          a(t.slides.captionAnimationDelay);
          break;
      }
    });
    function a(f) {
      const { captionAnimationSpeed: m } = t.slides;
      function v(p, y) {
        try {
          Ie(p, {
            text: y,
            fps: m,
            randomTextType: "pattern"
          });
        } catch {
          l();
        }
      }
      function l() {
        var p, y, S, C;
        (y = (p = e.value) == null ? void 0 : p.dataset) != null && y.id && (cancelAnimationFrame(Number(e.value.dataset.id)), e.value.textContent = ""), (C = (S = r.value) == null ? void 0 : S.dataset) != null && C.id && (cancelAnimationFrame(Number(r.value.dataset.id)), r.value.textContent = ""), d.title && clearTimeout(d.title), d.description && clearTimeout(d.description);
      }
      l(), r.value.dataset.id && (clearInterval(Number(r.value.dataset.id)), r.value.innerText = ""), o.value.title && (d.title = setTimeout(() => {
        clearTimeout(d.title), d.title = void 0, v(e.value, o.value.title);
      }, f)), o.value.description && (d.description = setTimeout(() => {
        clearTimeout(d.description), d.description = void 0, v(r.value, o.value.description);
      }, f + 300));
    }
    return (f, m) => (h(), g("article", {
      class: "caption",
      style: G(u.value)
    }, [
      c.value === I(H).NONE ? (h(), g(z, { key: 0 }, [
        o.value.title ? (h(), g("h1", Pe, B(o.value.title), 1)) : b("", !0),
        o.value.description ? (h(), g("p", Me, B(o.value.description), 1)) : b("", !0)
      ], 64)) : (h(), g(z, { key: 1 }, [
        o.value.title ? (h(), g("h1", {
          key: 0,
          ref_key: "$title",
          ref: e
        }, null, 512)) : b("", !0),
        o.value.description ? (h(), g("p", {
          key: 1,
          ref_key: "$description",
          ref: r
        }, null, 512)) : b("", !0)
      ], 64))
    ], 4));
  }
}, Fe = /* @__PURE__ */ E(Xe, [["__scopeId", "data-v-db7293c8"]]), Le = ["disabled"], $e = ["disabled"], De = {
  __name: "controller",
  setup(n) {
    const e = P(), r = D(), t = j(), s = T(() => e.slides.loop ? !0 : 0 < r.activeIndex), u = T(() => e.slides.loop ? !0 : r.order.length - 1 > r.activeIndex);
    function o() {
      r.prev();
    }
    function c() {
      r.next();
    }
    return (d, a) => (h(), g("nav", {
      class: Z([
        "controller",
        I(t).swipe && "swipe"
      ])
    }, [
      $("button", {
        type: "button",
        title: "prev slide",
        disabled: !s.value,
        class: "prev",
        onClick: o
      }, [
        O(q, { name: "chevron-left" })
      ], 8, Le),
      $("button", {
        type: "button",
        title: "next slide",
        disabled: !u.value,
        class: "next",
        onClick: c
      }, [
        O(q, { name: "chevron-right" })
      ], 8, $e)
    ], 2));
  }
}, He = /* @__PURE__ */ E(De, [["__scopeId", "data-v-39225382"]]), Re = { class: "paginate" }, ze = {
  __name: "paginate",
  setup(n) {
    const e = D(), r = T(() => e.order.length), t = T(() => e.activeIndex + 1);
    return (s, u) => (h(), g("p", Re, B(t.value) + " / " + B(r.value), 1));
  }
}, Be = /* @__PURE__ */ E(ze, [["__scopeId", "data-v-f7df2a3a"]]), Ue = {
  __name: "index",
  setup(n) {
    const e = P(), r = D(), t = j(), s = L(t.autoplay);
    let u, o;
    Y(() => {
      !e.slides.autoplay || !t.autoplay || c();
    }), pe(() => d()), A(() => t.autoplay, (l) => {
      s.value = l, l ? c() : d();
    }), A(() => [r.lock, t.swipe], (l, p) => {
      t.autoplay && (l[0] !== p[0] ? s.value = !l[0] : l[1] !== p[1] && (s.value = !l[1]));
    }), A(() => s.value, (l) => {
      l ? o || c() : d();
    });
    function c() {
      e.slides.autoplay && t.autoplay && s.value && (u = performance.now(), a());
    }
    function d() {
      o && (cancelAnimationFrame(o), o = void 0, u = void 0);
    }
    function a(l) {
      u || (u = l), l - u >= e.slides.autoplayDelay && (f(), u = l), cancelAnimationFrame(o), o = requestAnimationFrame(a);
    }
    function f() {
      if (!(e.slides.autoplay && t.autoplay)) return;
      const { autoplayDirection: l } = e.slides;
      r[l ? "next" : "prev"]();
    }
    function m(l) {
      l.stopPropagation();
      const { autoplayPauseOnHover: p } = e.slides;
      t.autoplay && p && (s.value = !0);
    }
    function v() {
      const { autoplayPauseOnHover: l } = e.slides;
      t.autoplay && l && (s.value = !1);
    }
    return (l, p) => (h(), g("div", {
      class: "slides",
      onMouseleave: m,
      onMouseenter: v
    }, [
      O(Ce),
      O(Fe),
      O(He),
      O(Be)
    ], 32));
  }
}, Ye = /* @__PURE__ */ E(Ue, [["__scopeId", "data-v-59ccf2fb"]]), je = {};
function Ve(n, e) {
  return h(), g("p", null, ".error");
}
const We = /* @__PURE__ */ E(je, [["render", Ve]]), Ze = {
  key: 0,
  class: "slideshow"
}, qe = {
  __name: "index",
  props: {
    active: [String, Number],
    autoplay: Boolean,
    preference: Object,
    slides: Array
  },
  emits: [
    "update:active",
    "update:autoplay"
  ],
  setup(n, { expose: e, emit: r }) {
    const t = P(), s = D(), u = j(), o = n, c = ie({
      stop: !0,
      error: void 0,
      swipe: !1
    }), d = r;
    let a;
    Y(() => {
      f().then();
    }), fe(() => {
      t.destroy(), s.destroy(), m().then();
    }), A(() => o.slides, () => v(), { deep: !0 }), A(() => o.preference, () => v(), { deep: !0 }), A(() => String(o.active), (p, y) => {
      p !== s.active && s.change(p);
    }), A(() => s.active, (p) => {
      d("update:active", p);
    }), A(() => o.autoplay, (p) => {
      u.autoplay = p;
    });
    async function f() {
      if (c.stop)
        try {
          t.setup(o.preference), s.setup(o.slides, String(o.active)), u.setup({
            autoplay: o.autoplay
          }), await te(), c.stop = !1;
        } catch (p) {
          c.error = p;
        }
    }
    async function m() {
      t.destroy(), s.destroy(), c.stop = !0, c.error = void 0;
    }
    async function v() {
      await m(), await te(), await f();
    }
    function l() {
    }
    return e({
      stop: m,
      start: f,
      restart: v,
      exportData: l
    }), (p, y) => c.stop ? b("", !0) : (h(), g("div", Ze, [
      c.error ? (h(), V(We, { key: 0 })) : (h(), V(Ye, { key: 1 })),
      ve(p.$slots, "default", {}, void 0, !0),
      I(a) ? (h(), V(he(I(a)), { key: 2 })) : b("", !0)
    ]));
  }
}, Ke = /* @__PURE__ */ E(qe, [["__scopeId", "data-v-fd7b1a9d"]]);
export {
  Ke as default
};
