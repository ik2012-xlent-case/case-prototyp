/*!
 * Fuse.js v3.4.2 - Lightweight fuzzy-search (http://fusejs.io)
 *
 * Copyright (c) 2012-2017 Kirollos Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */
!(function(e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define("Fuse", [], t)
    : "object" == typeof exports
    ? (exports.Fuse = t())
    : (e.Fuse = t());
})(this, function() {
  var e = Math.min;
  return (function(e) {
    function t(r) {
      if (n[r]) return n[r].exports;
      var o = (n[r] = { i: r, l: !1, exports: {} });
      return e[r].call(o.exports, o, o.exports, t), (o.l = !0), o.exports;
    }
    var n = {};
    return (
      (t.m = e),
      (t.c = n),
      (t.d = function(e, n, r) {
        t.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: r });
      }),
      (t.r = function(e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (t.t = function(e, n) {
        if ((1 & n && (e = t(e)), 8 & n)) return e;
        if (4 & n && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (
          (t.r(r),
          Object.defineProperty(r, "default", { enumerable: !0, value: e }),
          2 & n && "string" != typeof e)
        )
          for (var o in e)
            t.d(
              r,
              o,
              function(t) {
                return e[t];
              }.bind(null, o)
            );
        return r;
      }),
      (t.n = function(e) {
        var n =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return t.d(n, "a", n), n;
      }),
      (t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (t.p = ""),
      t((t.s = 1))
    );
  })([
    function(e) {
      e.exports = function(e) {
        return Array.isArray
          ? Array.isArray(e)
          : "[object Array]" === Object.prototype.toString.call(e);
      };
    },
    function(t, n, r) {
      function o(e) {
        return (o =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function(e) {
                return typeof e;
              }
            : function(e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              })(e);
      }
      function i(e, t) {
        for (var n, r = 0; r < t.length; r++)
          ((n = t[r]).enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n);
      }
      var a = r(2),
        s = r(8),
        c = r(0),
        h = (function() {
          function t(e, n) {
            var r = n.location,
              o = void 0 === r ? 0 : r,
              i = n.distance,
              a = void 0 === i ? 100 : i,
              c = n.threshold,
              h = void 0 === c ? 0.6 : c,
              l = n.maxPatternLength,
              u = void 0 === l ? 32 : l,
              f = n.caseSensitive,
              d = n.tokenSeparator,
              p = void 0 === d ? / +/g : d,
              v = n.findAllMatches,
              g = n.minMatchCharLength,
              y = void 0 === g ? 1 : g,
              m = n.id,
              k = void 0 === m ? null : m,
              S = n.keys,
              x = void 0 === S ? [] : S,
              b = n.shouldSort,
              M = n.getFn,
              _ = void 0 === M ? s : M,
              L = n.sortFn,
              w =
                void 0 === L
                  ? function(e, t) {
                      return e.score - t.score;
                    }
                  : L,
              A = n.tokenize,
              C = n.matchAllTokens,
              I = n.includeMatches,
              O = n.includeScore,
              j = n.verbose;
            (function(e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, t),
              (this.options = {
                location: o,
                distance: a,
                threshold: h,
                maxPatternLength: u,
                isCaseSensitive: void 0 !== f && f,
                tokenSeparator: p,
                findAllMatches: void 0 !== v && v,
                minMatchCharLength: y,
                id: k,
                keys: x,
                includeMatches: void 0 !== I && I,
                includeScore: void 0 !== O && O,
                shouldSort: void 0 === b || b,
                getFn: _,
                sortFn: w,
                verbose: void 0 !== j && j,
                tokenize: void 0 !== A && A,
                matchAllTokens: void 0 !== C && C
              }),
              this.setCollection(e);
          }
          return (
            (function(e, t, n) {
              t && i(e.prototype, t), n && i(e, n);
            })(t, [
              {
                key: "setCollection",
                value: function(e) {
                  return (this.list = e), e;
                }
              },
              {
                key: "search",
                value: function(e) {
                  var t =
                    1 < arguments.length && void 0 !== arguments[1]
                      ? arguments[1]
                      : { limit: !1 };
                  this._log('---------\nSearch pattern: "'.concat(e, '"'));
                  var n = this._prepareSearchers(e),
                    r = n.tokenSearchers,
                    o = n.fullSearcher,
                    i = this._search(r, o),
                    a = i.weights,
                    s = i.results;
                  return (
                    this._computeScore(a, s),
                    this.options.shouldSort && this._sort(s),
                    t.limit &&
                      "number" == typeof t.limit &&
                      (s = s.slice(0, t.limit)),
                    this._format(s)
                  );
                }
              },
              {
                key: "_prepareSearchers",
                value: function() {
                  var e =
                      0 < arguments.length && void 0 !== arguments[0]
                        ? arguments[0]
                        : "",
                    t = [];
                  if (this.options.tokenize)
                    for (
                      var n = e.split(this.options.tokenSeparator),
                        r = 0,
                        o = n.length;
                      r < o;
                      r += 1
                    )
                      t.push(new a(n[r], this.options));
                  return {
                    tokenSearchers: t,
                    fullSearcher: new a(e, this.options)
                  };
                }
              },
              {
                key: "_search",
                value: function() {
                  var e =
                      0 < arguments.length && void 0 !== arguments[0]
                        ? arguments[0]
                        : [],
                    t = 1 < arguments.length ? arguments[1] : void 0,
                    n = this.list,
                    r = {},
                    o = [];
                  if ("string" == typeof n[0]) {
                    for (var i = 0, a = n.length; i < a; i += 1)
                      this._analyze(
                        { key: "", value: n[i], record: i, index: i },
                        {
                          resultMap: r,
                          results: o,
                          tokenSearchers: e,
                          fullSearcher: t
                        }
                      );
                    return { weights: null, results: o };
                  }
                  for (var s, c = {}, h = 0, l = n.length; h < l; h += 1) {
                    s = n[h];
                    for (
                      var u, f = 0, d = this.options.keys.length;
                      f < d;
                      f += 1
                    ) {
                      if ("string" != typeof (u = this.options.keys[f])) {
                        if (
                          ((c[u.name] = { weight: 1 - u.weight || 1 }),
                          0 >= u.weight || 1 < u.weight)
                        )
                          throw new Error("Key weight has to be > 0 and <= 1");
                        u = u.name;
                      } else c[u] = { weight: 1 };
                      this._analyze(
                        {
                          key: u,
                          value: this.options.getFn(s, u),
                          record: s,
                          index: h
                        },
                        {
                          resultMap: r,
                          results: o,
                          tokenSearchers: e,
                          fullSearcher: t
                        }
                      );
                    }
                  }
                  return { weights: c, results: o };
                }
              },
              {
                key: "_analyze",
                value: function(e, t) {
                  var n = e.key,
                    r = e.arrayIndex,
                    o = void 0 === r ? -1 : r,
                    i = e.value,
                    a = e.record,
                    s = e.index,
                    h = t.tokenSearchers,
                    l = void 0 === h ? [] : h,
                    u = t.fullSearcher,
                    f = void 0 === u ? [] : u,
                    d = t.resultMap,
                    p = void 0 === d ? {} : d,
                    v = t.results,
                    g = void 0 === v ? [] : v;
                  if (null != i) {
                    var y = !1,
                      m = -1,
                      k = 0;
                    if ("string" == typeof i) {
                      this._log("\nKey: ".concat("" === n ? "-" : n));
                      var S = f.search(i);
                      if (
                        (this._log(
                          'Full text: "'.concat(i, '", score: ').concat(S.score)
                        ),
                        this.options.tokenize)
                      ) {
                        for (
                          var x,
                            b = i.split(this.options.tokenSeparator),
                            M = [],
                            _ = 0;
                          _ < l.length;
                          _ += 1
                        ) {
                          (x = l[_]),
                            this._log('\nPattern: "'.concat(x.pattern, '"'));
                          for (var L = !1, w = 0; w < b.length; w += 1) {
                            var A = b[w],
                              C = x.search(A),
                              I = {};
                            C.isMatch
                              ? ((I[A] = C.score),
                                (y = !0),
                                (L = !0),
                                M.push(C.score))
                              : ((I[A] = 1),
                                !this.options.matchAllTokens && M.push(1)),
                              this._log(
                                'Token: "'.concat(A, '", score: ').concat(I[A])
                              );
                          }
                          L && (k += 1);
                        }
                        m = M[0];
                        for (var O = M.length, j = 1; j < O; j += 1) m += M[j];
                        (m /= O), this._log("Token score average:", m);
                      }
                      var P = S.score;
                      -1 < m && (P = (P + m) / 2),
                        this._log("Score average:", P);
                      var F =
                        !(
                          this.options.tokenize && this.options.matchAllTokens
                        ) || k >= l.length;
                      if (
                        (this._log("\nCheck Matches: ".concat(F)),
                        (y || S.isMatch) && F)
                      ) {
                        var T = p[s];
                        T
                          ? T.output.push({
                              key: n,
                              arrayIndex: o,
                              value: i,
                              score: P,
                              matchedIndices: S.matchedIndices
                            })
                          : ((p[s] = {
                              item: a,
                              output: [
                                {
                                  key: n,
                                  arrayIndex: o,
                                  value: i,
                                  score: P,
                                  matchedIndices: S.matchedIndices
                                }
                              ]
                            }),
                            g.push(p[s]));
                      }
                    } else if (c(i))
                      for (var z = 0, E = i.length; z < E; z += 1)
                        this._analyze(
                          {
                            key: n,
                            arrayIndex: z,
                            value: i[z],
                            record: a,
                            index: s
                          },
                          {
                            resultMap: p,
                            results: g,
                            tokenSearchers: l,
                            fullSearcher: f
                          }
                        );
                  }
                }
              },
              {
                key: "_computeScore",
                value: function(t, n) {
                  this._log("\n\nComputing score:\n");
                  for (var r = 0, o = n.length; r < o; r += 1) {
                    for (
                      var i = n[r].output, a = i.length, s = 1, c = 1, h = 0;
                      h < a;
                      h += 1
                    ) {
                      var l = t ? t[i[h].key].weight : 1,
                        u = (1 === l ? i[h].score : i[h].score || 0.001) * l;
                      1 === l ? ((i[h].nScore = u), (s *= u)) : (c = e(c, u));
                    }
                    (n[r].score = 1 === c ? s : c), this._log(n[r]);
                  }
                }
              },
              {
                key: "_sort",
                value: function(e) {
                  this._log("\n\nSorting...."), e.sort(this.options.sortFn);
                }
              },
              {
                key: "_format",
                value: function(e) {
                  var t = [];
                  if (this.options.verbose) {
                    var n = [];
                    this._log(
                      "\n\nOutput:\n\n",
                      JSON.stringify(e, function(e, t) {
                        if ("object" === o(t) && null !== t) {
                          if (-1 !== n.indexOf(t)) return;
                          n.push(t);
                        }
                        return t;
                      })
                    ),
                      (n = null);
                  }
                  var r = [];
                  this.options.includeMatches &&
                    r.push(function(e, t) {
                      var n = e.output;
                      t.matches = [];
                      for (var r, o = 0, i = n.length; o < i; o += 1)
                        if (0 !== (r = n[o]).matchedIndices.length) {
                          var a = { indices: r.matchedIndices, value: r.value };
                          r.key && (a.key = r.key),
                            r.hasOwnProperty("arrayIndex") &&
                              -1 < r.arrayIndex &&
                              (a.arrayIndex = r.arrayIndex),
                            t.matches.push(a);
                        }
                    }),
                    this.options.includeScore &&
                      r.push(function(e, t) {
                        t.score = e.score;
                      });
                  for (var i, a = 0, s = e.length; a < s; a += 1)
                    if (
                      ((i = e[a]),
                      this.options.id &&
                        (i.item = this.options.getFn(
                          i.item,
                          this.options.id
                        )[0]),
                      r.length)
                    ) {
                      for (
                        var c = { item: i.item }, h = 0, l = r.length;
                        h < l;
                        h += 1
                      )
                        r[h](i, c);
                      t.push(c);
                    } else t.push(i.item);
                  return t;
                }
              },
              {
                key: "_log",
                value: function() {
                  var e;
                  this.options.verbose && (e = console).log.apply(e, arguments);
                }
              }
            ]),
            t
          );
        })();
      t.exports = h;
    },
    function(e, t, n) {
      function r(e, t) {
        for (var n, r = 0; r < t.length; r++)
          ((n = t[r]).enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n);
      }
      var o = n(3),
        i = n(4),
        a = n(7),
        s = (function() {
          function e(t, n) {
            var r = n.location,
              o = void 0 === r ? 0 : r,
              i = n.distance,
              s = void 0 === i ? 100 : i,
              c = n.threshold,
              h = void 0 === c ? 0.6 : c,
              l = n.maxPatternLength,
              u = void 0 === l ? 32 : l,
              f = n.isCaseSensitive,
              d = n.tokenSeparator,
              p = void 0 === d ? / +/g : d,
              v = n.findAllMatches,
              g = n.minMatchCharLength,
              y = void 0 === g ? 1 : g;
            (function(e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, e),
              (this.options = {
                location: o,
                distance: s,
                threshold: h,
                maxPatternLength: u,
                isCaseSensitive: void 0 !== f && f,
                tokenSeparator: p,
                findAllMatches: void 0 !== v && v,
                minMatchCharLength: y
              }),
              (this.pattern = this.options.isCaseSensitive
                ? t
                : t.toLowerCase()),
              this.pattern.length <= u &&
                (this.patternAlphabet = a(this.pattern));
          }
          return (
            (function(e, t, n) {
              t && r(e.prototype, t), n && r(e, n);
            })(e, [
              {
                key: "search",
                value: function(e) {
                  if (
                    (this.options.isCaseSensitive || (e = e.toLowerCase()),
                    this.pattern === e)
                  )
                    return {
                      isMatch: !0,
                      score: 0,
                      matchedIndices: [[0, e.length - 1]]
                    };
                  var t = this.options,
                    n = t.maxPatternLength,
                    r = t.tokenSeparator;
                  if (this.pattern.length > n) return o(e, this.pattern, r);
                  var a = this.options,
                    s = a.location,
                    c = a.distance,
                    h = a.threshold,
                    l = a.findAllMatches,
                    u = a.minMatchCharLength;
                  return i(e, this.pattern, this.patternAlphabet, {
                    location: s,
                    distance: c,
                    threshold: h,
                    findAllMatches: l,
                    minMatchCharLength: u
                  });
                }
              }
            ]),
            e
          );
        })();
      e.exports = s;
    },
    function(e) {
      var t = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;
      e.exports = function(e, n) {
        var r =
            2 < arguments.length && void 0 !== arguments[2]
              ? arguments[2]
              : / +/g,
          o = new RegExp(n.replace(t, "\\$&").replace(r, "|")),
          i = e.match(o),
          a = !!i,
          s = [];
        if (a)
          for (var c, h = 0, l = i.length; h < l; h += 1)
            (c = i[h]), s.push([e.indexOf(c), c.length - 1]);
        return { score: a ? 0.5 : 1, isMatch: a, matchedIndices: s };
      };
    },
    function(t, n, r) {
      var o = r(5),
        i = r(6);
      t.exports = function(t, n, r, a) {
        for (
          var s = Math.max,
            c = a.location,
            h = void 0 === c ? 0 : c,
            l = a.distance,
            u = void 0 === l ? 100 : l,
            f = a.threshold,
            d = void 0 === f ? 0.6 : f,
            p = a.findAllMatches,
            v = void 0 !== p && p,
            g = a.minMatchCharLength,
            y = void 0 === g ? 1 : g,
            m = h,
            k = t.length,
            S = d,
            x = t.indexOf(n, m),
            b = n.length,
            M = [],
            _ = 0;
          _ < k;
          _ += 1
        )
          M[_] = 0;
        if (-1 !== x) {
          var L = o(n, {
            errors: 0,
            currentLocation: x,
            expectedLocation: m,
            distance: u
          });
          if (((S = e(L, S)), -1 !== (x = t.lastIndexOf(n, m + b)))) {
            var w = o(n, {
              errors: 0,
              currentLocation: x,
              expectedLocation: m,
              distance: u
            });
            S = e(w, S);
          }
        }
        x = -1;
        for (var A = [], C = 1, I = b + k, O = 0; O < b; O += 1) {
          for (var j = 0, P = I; j < P; ) {
            o(n, {
              errors: O,
              currentLocation: m + P,
              expectedLocation: m,
              distance: u
            }) <= S
              ? (j = P)
              : (I = P),
              (P = Math.floor((I - j) / 2 + j));
          }
          I = P;
          var F = s(1, m - P + 1),
            T = v ? k : e(m + P, k) + b,
            z = Array(T + 2);
          z[T + 1] = (1 << O) - 1;
          for (var E = T; E >= F; E -= 1) {
            var K = E - 1,
              $ = r[t.charAt(K)];
            if (
              ($ && (M[K] = 1),
              (z[E] = (1 | (z[E + 1] << 1)) & $),
              0 != O && (z[E] |= 1 | ((A[E + 1] | A[E]) << 1) | A[E + 1]),
              z[E] & (1 << (b - 1)) &&
                (C = o(n, {
                  errors: O,
                  currentLocation: K,
                  expectedLocation: m,
                  distance: u
                })) <= S)
            ) {
              if (((S = C), (x = K) <= m)) break;
              F = s(1, 2 * m - x);
            }
          }
          if (
            o(n, {
              errors: O + 1,
              currentLocation: m,
              expectedLocation: m,
              distance: u
            }) > S
          )
            break;
          A = z;
        }
        return {
          isMatch: 0 <= x,
          score: 0 === C ? 0.001 : C,
          matchedIndices: i(M, y)
        };
      };
    },
    function(e) {
      e.exports = function(e, t) {
        var n = t.errors,
          r = void 0 === n ? 0 : n,
          o = t.currentLocation,
          i = void 0 === o ? 0 : o,
          a = t.expectedLocation,
          s = void 0 === a ? 0 : a,
          c = t.distance,
          h = void 0 === c ? 100 : c,
          l = r / e.length,
          u = Math.abs(s - i);
        return h ? l + u / h : u ? 1 : l;
      };
    },
    function(e) {
      e.exports = function() {
        for (
          var e,
            t =
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : [],
            n =
              1 < arguments.length && void 0 !== arguments[1]
                ? arguments[1]
                : 1,
            r = [],
            o = -1,
            i = -1,
            a = 0,
            s = t.length;
          a < s;
          a += 1
        )
          (e = t[a]) && -1 == o
            ? (o = a)
            : !e &&
              -1 != o &&
              ((i = a - 1) - o + 1 >= n && r.push([o, i]), (o = -1));
        return t[a - 1] && a - o >= n && r.push([o, a - 1]), r;
      };
    },
    function(e) {
      e.exports = function(e) {
        for (var t = {}, n = e.length, r = 0; r < n; r += 1) t[e.charAt(r)] = 0;
        for (var o = 0; o < n; o += 1) t[e.charAt(o)] |= 1 << (n - o - 1);
        return t;
      };
    },
    function(e, t, n) {
      var r = n(0);
      e.exports = function(e, t) {
        return (function e(t, n, o) {
          if (n) {
            var i = n.indexOf("."),
              a = n,
              s = null;
            -1 !== i && ((a = n.slice(0, i)), (s = n.slice(i + 1)));
            var c = t[a];
            if (null != c)
              if (s || ("string" != typeof c && "number" != typeof c))
                if (r(c))
                  for (var h = 0, l = c.length; h < l; h += 1) e(c[h], s, o);
                else s && e(c, s, o);
              else o.push(c.toString());
          } else o.push(t);
          return o;
        })(e, t, []);
      };
    }
  ]);
});