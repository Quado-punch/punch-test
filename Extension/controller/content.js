var ComPort,
  CurrentUser,
  LastUsername = "",
  SharedData = null,
  startedFollowLike = !1,
  UserTag = "._7UhW9",
  StartStory = !1,
  startDM = !1,
  msg_user = "",
  tag_dict = {},
  account_dict = {},
  that = this,
  image_src = "",
  story_set = !1,
  logs = "",
  usern,
  commented,
  pic_url = "";
function pause() {
  SendMessage("Pause", "pause", "");
}
function User(a, n, d, V, M) {
  this.username = a;
  this.user_id = n;
  this.full_name = d;
  this.user_pic_url = "assets/images/icon.png";
  this.followed_time = M;
}
function MediaTag(a, n, d) {
  this.tag_name = a;
  this.cursor_key = n;
  this.eof = d;
}
$(document).ready(function () {
  CreateComPort();
  RetriveUserHeaders();
  0 == story_set &&
    window.location.href.includes("stories") &&
    SendMessage("GetStory", "Error", "No BUttons");
  0 == startDM &&
    window.location.href.includes("direct") &&
    SendMessage("GetDM", "Error", "No BUttons");
});
function getUserData(a) {
  $.get("https://www.instagram.com/" + a + "/?__a=1", function (n, d) {
    SendMessage("userData", "User", n.graphql.user);
  });
}
function getRandomInt(a, n) {
  return Math.floor(Math.random() * (n - a + 1)) + a;
}
function getCookie(a) {
  var n = null;
  if (document.cookie && "" != document.cookie)
    for (var d = document.cookie.split(";"), V = 0; V < d.length; V++) {
      var M = jQuery.trim(d[V]);
      if (M.substring(0, a.length + 1) == a + "=") {
        n = decodeURIComponent(M.substring(a.length + 1));
        break;
      }
    }
  return n;
}
function getSharedData() {}
function CreateComPort() {
  ComPort = chrome.runtime.connect({ name: "instafollow213content" });
  ComPort.onMessage.addListener(OnMessageReceive);
}
function IsUserInWhitelist(a, n) {
  for (var d = 0; d < n.length; d++) if (n[d].username == a) return !0;
  return !1;
}
function SendMessage(a, n, d) {
  a = { Tag: a };
  a[n] = d;
  ComPort.postMessage(a);
}
function OnMessageReceive(a) {
  if ("FollowUser" == a.Tag) FollowUser(a.User);
  else if ("CollectFromAccount" == a.Tag) collectFromAccount(a.account_name);
  else if ("GatherAccountTargets" == a.Tag) {
    for (
      var n = document.getElementsByTagName("body"), d = 0;
      d < n.length;
      d++
    )
      n[d].innerText &&
        n[d].innerText.includes("Sorry, this page isn't available.") &&
        SendMessage("BadTarget", "Media", "");
    d = document.documentElement.innerHTML;
    window.location.href.includes("accounts/emailsignup/") &&
      window.location.replace("https://instoo.com/pause");
    d.includes("It looks like you shared your password") &&
      (SendMessage("blocked", "blocked", "compromised" + window.location.href),
      setTimeout(function () {
        window.location.replace("https://instagram.com/accounts/logout");
      }, 2e4));
    d.includes("entering your password on a website designed") &&
      (SendMessage("blocked", "blocked", "phishing" + window.location.href),
      setTimeout(function () {
        window.location.replace("https://instagram.com/accounts/logout");
      }, 2e4));
    d.includes("unusual activity from your account") &&
      (SendMessage("blocked", "blocked", "unusual" + window.location.href),
      setTimeout(function () {
        window.location.replace("https://instagram.com/accounts/logout");
      }, 2e4));
    d = getRandomInt(1e3, 2500);
    var V = getRandomInt(1e5, 25e4),
      M = getRandomInt(1e5, 25e4),
      B = getRandomInt(1e3, 2500),
      h = getRandomInt(1e3, 1300),
      v = getRandomInt(1800, 9e3),
      C = getRandomInt(1800, 3500),
      O = getRandomInt(1800, 3500),
      ba = getRandomInt(1800, 15e3),
      ia = getRandomInt(9800, 10500);
    getRandomInt(0, 100);
    var W = document.getElementsByTagName("a");
    for (d = 0; d < W.length; d++)
      W[d].getAttribute("href") &&
        W[d].getAttribute("href").includes("followers") &&
        (W[d].click(),
        setTimeout(function () {
          for (var m = 0; m < W.length; m++)
            W[m].getAttribute("href") &&
              W[m].getAttribute("href").includes("mutualFirst") &&
              W[m].click();
          setTimeout(function () {
            for (
              var G = document.getElementsByTagName("div"), A = 0;
              1 > A;
              A++
            )
              for (var H = 0; H < G.length; H++) {
                var N = getRandomInt(1e5, 25e4);
                "undefined" != typeof G[H] &&
                  "undefined" != typeof G[H].children[0] &&
                  "undefined" != typeof G[H].children[0].children[1] &&
                  G[H].getAttribute("role") &&
                  G[H].getAttribute("role").includes("dialog") &&
                  (G[H].children[0].children[1].scrollTop += N);
              }
            setTimeout(function () {
              for (
                var x = document.getElementsByTagName("img"), P = 0;
                P < x.length;
                P++
              )
                if (
                  x[P].parentNode &&
                  "SPAN" == x[P].parentNode.nodeName &&
                  x[P].getAttribute("alt")
                ) {
                  var z = x[P].getAttribute("alt").split("'")[0];
                  z &&
                    (z.includes("Foto del perfil de") &&
                      (z = z.split("Foto del perfil de ").join("")),
                    z.includes("s Profilbild") &&
                      (z = z.split("s Profilbild").join("")),
                    z.includes("Photo de profil de ") &&
                      (z = z.split("Photo de profil de ").join("")),
                    z.includes("Immagine del profilo di ") &&
                      (z = z.split("Immagine del profilo di ").join("")),
                    SendMessage("addStory", "story", {
                      username: z,
                      user_id: 0,
                      full_name: "",
                      user_pic_url: "assets/images/icon.png",
                      target: a.CurrentUser,
                    }));
                }
            }, O);
          }, ba);
        }, v));
  } else if ("gatherHashtags" == a.Tag)
    for (W = document.getElementsByTagName("img"), d = 0; d < W.length; d++) {
      if (
        W[d].getAttribute("alt") &&
        W[d].getAttribute("alt").includes("@") &&
        (n = W[d].getAttribute("alt"))
      ) {
        n = n.split(" ");
        for (
          var ra = 0, ja = 0;
          ja < n.length &&
          (!n[ja].includes("@") ||
            (SendMessage(
              "AddHashAccount",
              "account",
              n[ja].split(",").join(" ")
            ),
            ra++,
            5 != ra));
          ja++
        );
      }
    }
  else if ("GetTopFollowers" == a.Tag) GetTopFollowers(a.user);
  else if ("RetriveUserHeaders" == a.Tag) RetriveUserHeaders();
  else if ("Timer" == a.Tag)
    $("#timer").html(a.Time.toFixed(0) + " seconds till next action");
  else if ("CollectStoriesFromTag" == a.Tag) collectStoriesFromTag(a.variables);
  else if ("CollectStoriesFromAccount" == a.Tag)
    collectStoriesFromAccount(a.variables);
  else if ("DoCollectJob" == a.Tag) DoCollectJob(a.Job);
  else if ("DODM" == a.Tag)
    (startDM = !0),
      (d = getRandomInt(1800, 2500)),
      (V = getRandomInt(1800, 2500)),
      (M = getRandomInt(1800, 2500)),
      (B = getRandomInt(1800, 2500)),
      (h = getRandomInt(1100, 1300)),
      (v = getRandomInt(1800, 2500)),
      (C = getRandomInt(1300, 1800)),
      (O = getRandomInt(1300, 1800)),
      (ba = getRandomInt(1300, 1800)),
      (ia = getRandomInt(9800, 10500)),
      setTimeout(function () {
        for (
          var m = document.getElementsByTagName("button"), G = 0;
          G < m.length;
          G++
        )
          m[G].innerText.includes("Message") &&
            (m[G].click(),
            setTimeout(function () {
              for (
                var A = document.getElementsByTagName("div"), H = 0, N = 0;
                N < A.length;
                N++
              )
                A[N].getAttribute("style") &&
                  A[N].getAttribute("style").includes("min-height") &&
                  H++;
              if (0 == H)
                for (
                  A = document.getElementsByTagName("textarea"), N = 0;
                  N < A.length;
                  N++
                )
                  if (
                    A[N].getAttribute("placeholder") &&
                    A[N].getAttribute("placeholder").includes("Message") &&
                    0 < a.story.CommentPool.length
                  ) {
                    H = getRandomInt(0, a.story.CommentPool.length - 1);
                    var x = ":)";
                    "undefined" != typeof a.story.CommentPool[H] &&
                      (x = a.story.CommentPool[H].tag_name);
                    for (
                      var P, z, I = new RegExp(/{([^{}]+?)}/);
                      null !== (H = I.exec(x));

                    )
                      H[1] &&
                        ((P = H[1].split("|")),
                        (z = Math.floor(Math.random() * P.length)),
                        (x = x.replace(H[0], P[z])));
                    A[N].value = x;
                    H = document.createEvent("HTMLEvents");
                    H.initEvent("change", !0, !1);
                    A[N].dispatchEvent(H);
                    setTimeout(function () {
                      for (
                        var Q = document.getElementsByTagName("button"), b = 0;
                        b < Q.length;
                        b++
                      )
                        if (Q[b].innerText.includes("Send")) {
                          Q[b].click();
                          var c = document.getElementsByTagName("img");
                          for (b = 0; b < c.length; b++)
                            if (
                              a.story.username &&
                              c[b]
                                .getAttribute("alt")
                                .includes(a.story.username.split("/").join(""))
                            ) {
                              SendMessage("CommentedMedia", "Media", {
                                caption: x,
                                shortcode: "/" + a.story.storyUser,
                                media_src: "assets/images/icon.png",
                              });
                              setTimeout(function () {
                                for (
                                  var D =
                                      document.getElementsByTagName("button"),
                                    k = 0;
                                  k < D.length;
                                  k++
                                )
                                  D[k].textContent &&
                                    (D[k].textContent.includes("Report") ||
                                      D[k].textContent.includes("Informar") ||
                                      D[k].textContent.includes("Rapporto") ||
                                      D[k].textContent.includes("Bericht")) &&
                                    (SendMessage(
                                      "blocked",
                                      "blocked",
                                      JSON.stringify(a.story)
                                    ),
                                    D[k].click(),
                                    setTimeout(function () {
                                      window.location.replace(
                                        "https://instagram.com/accounts/logout"
                                      );
                                    }, 2e3));
                              }, 5e3);
                              break;
                            }
                        }
                    }, C);
                  }
            }, O));
      }, ba);
  else if ("GetUserData" == a.Tag) getUserData(a.username);
  else if ("validateInstagramFollowers" == a.Tag)
    RetriveCurrentUserInfoManual(1);
  else if ("CheckRank" == a.Tag) CheckRank(a.account);
  else if ("LikeStory" == a.Tag)
    (W = document.getElementsByTagName("a")), W[4].click();
  else if ("UpdateAccountTargets" == a.Tag)
    (d = getRandomInt(3800, 4500)),
      (V = getRandomInt(3800, 4500)),
      (M = getRandomInt(1e3, 1500)),
      (B = getRandomInt(2800, 3500)),
      setTimeout(function () {
        for (
          var m = document.getElementsByTagName("a"), G = 0;
          G < m.length;
          G++
        )
          m[G].getAttribute("href") &&
            (m[G].getAttribute("href").includes("followers") ||
              m[G].getAttribute("href").includes("seguidores")) &&
            (m[G].click(),
            setTimeout(function () {
              for (
                var A = document.getElementsByTagName("div"), H = 0;
                10 > H;
                H++
              )
                for (var N = 0; N < A.length; N++)
                  "undefined" != typeof A[N] &&
                    "undefined" != typeof A[N].children[1] &&
                    A[N].getAttribute("role") &&
                    A[N].getAttribute("role").includes("dialog") &&
                    ((A[N].scrollTop += 1e10),
                    (A[N].children[1].scrollTop += 1e10));
              A = document.getElementsByTagName("a");
              for (H = 0; H < A.length; H++)
                A[H].getAttribute("href") &&
                  A[H].getAttribute("href").includes("mutualFirst") &&
                  (A[H].click(),
                  setTimeout(function () {
                    for (
                      var x = document.getElementsByTagName("div"), P = 0;
                      10 > P;
                      P++
                    )
                      for (var z = 0; z < x.length; z++)
                        "undefined" != typeof x[z] &&
                          "undefined" != typeof x[z].children[1] &&
                          x[z].getAttribute("role") &&
                          x[z].getAttribute("role").includes("dialog") &&
                          ((x[z].scrollTop += 1e10),
                          (x[z].children[1].scrollTop += 1e10));
                    setTimeout(function () {
                      for (
                        var I = document.getElementsByTagName("div"), Q = 0;
                        10 > Q;
                        Q++
                      )
                        for (var b = 0; b < I.length; b++)
                          "undefined" != typeof I[b] &&
                            "undefined" != typeof I[b].children[1] &&
                            I[b].getAttribute("role") &&
                            I[b].getAttribute("role").includes("dialog") &&
                            ((I[b].scrollTop += 1e10),
                            (I[b].children[1].scrollTop += 1e10));
                      setTimeout(function () {
                        for (
                          var c = document.getElementsByTagName("div"), D = 0;
                          10 > D;
                          D++
                        )
                          for (var k = 0; k < c.length; k++)
                            "undefined" != typeof c[k] &&
                              "undefined" != typeof c[k].children[1] &&
                              c[k].getAttribute("role") &&
                              c[k].getAttribute("role").includes("dialog") &&
                              ((c[k].scrollTop += 1e10),
                              (c[k].children[1].scrollTop += 1e10));
                        setTimeout(function () {
                          for (
                            var q = document.getElementsByTagName("div"), r = 0;
                            10 > r;
                            r++
                          )
                            for (var u = 0; u < q.length; u++)
                              "undefined" != typeof q[u] &&
                                "undefined" != typeof q[u].children[1] &&
                                q[u].getAttribute("role") &&
                                q[u].getAttribute("role").includes("dialog") &&
                                ((q[u].scrollTop += 1e10),
                                (q[u].children[1].scrollTop += 1e10));
                          setTimeout(function () {
                            for (
                              var t = document.getElementsByTagName("div"),
                                f = 0;
                              10 > f;
                              f++
                            )
                              for (var e = 0; e < t.length; e++)
                                "undefined" != typeof t[e] &&
                                  "undefined" != typeof t[e].children[1] &&
                                  t[e].getAttribute("role") &&
                                  t[e]
                                    .getAttribute("role")
                                    .includes("dialog") &&
                                  ((t[e].scrollTop += 1e10),
                                  (t[e].children[1].scrollTop += 1e10));
                            setTimeout(function () {
                              for (
                                var l = document.getElementsByTagName("div"),
                                  p = 0;
                                10 > p;
                                p++
                              )
                                for (var g = 0; g < l.length; g++)
                                  "undefined" != typeof l[g] &&
                                    "undefined" != typeof l[g].children[1] &&
                                    l[g].getAttribute("role") &&
                                    l[g]
                                      .getAttribute("role")
                                      .includes("dialog") &&
                                    ((l[g].scrollTop += 1e10),
                                    (l[g].children[1].scrollTop += 1e10));
                              l = document.getElementsByTagName("span");
                              for (p = 0; p < l.length; p++)
                                "undefined" != typeof l[p] &&
                                  l[p].getAttribute("role") &&
                                  "link" == l[p].getAttribute("role") &&
                                  l[p].firstElementChild.getAttribute("alt") &&
                                  (g = l[p].firstElementChild
                                    .getAttribute("alt")
                                    .split("'")[0]) &&
                                  (g.includes("Profilbild") &&
                                    (g = g.split("s Profilbild")[0]),
                                  g.includes("Foto del perfil") &&
                                    (g = g.split("Foto del perfil de ")[1]),
                                  g.includes("Immagine del profilo di ") &&
                                    (g = g.split(
                                      "Immagine del profilo di "
                                    )[1]),
                                  g.includes("Photo de profil de ") &&
                                    (g = g.split("Photo de profil de ")[1]),
                                  SendMessage("addStory", "story", {
                                    username: g,
                                    user_id: 0,
                                    full_name: "",
                                    user_pic_url: "assets/images/icon.png",
                                  }));
                            }, M);
                          }, M);
                        }, M);
                      }, M);
                    }, M);
                  }, M));
              setTimeout(function () {
                for (
                  var x = document.getElementsByTagName("div"), P = 0;
                  10 > P;
                  P++
                )
                  for (var z = 0; z < x.length; z++)
                    "undefined" != typeof x[z] &&
                      "undefined" != typeof x[z].children[1] &&
                      x[z].getAttribute("role") &&
                      x[z].getAttribute("role").includes("dialog") &&
                      ((x[z].scrollTop += 1e10),
                      (x[z].children[1].scrollTop += 1e10));
                setTimeout(function () {
                  for (
                    var I = document.getElementsByTagName("div"), Q = 0;
                    10 > Q;
                    Q++
                  )
                    for (var b = 0; b < I.length; b++)
                      "undefined" != typeof I[b] &&
                        "undefined" != typeof I[b].children[1] &&
                        I[b].getAttribute("role") &&
                        I[b].getAttribute("role").includes("dialog") &&
                        ((I[b].scrollTop += 1e10),
                        (I[b].children[1].scrollTop += 1e10));
                  setTimeout(function () {
                    for (
                      var c = document.getElementsByTagName("div"), D = 0;
                      10 > D;
                      D++
                    )
                      for (var k = 0; k < c.length; k++)
                        "undefined" != typeof c[k] &&
                          "undefined" != typeof c[k].children[1] &&
                          c[k].getAttribute("role") &&
                          c[k].getAttribute("role").includes("dialog") &&
                          ((c[k].scrollTop += 1e10),
                          (c[k].children[1].scrollTop += 1e10));
                    setTimeout(function () {
                      for (
                        var q = document.getElementsByTagName("div"), r = 0;
                        10 > r;
                        r++
                      )
                        for (var u = 0; u < q.length; u++)
                          "undefined" != typeof q[u] &&
                            "undefined" != typeof q[u].children[1] &&
                            q[u].getAttribute("role") &&
                            q[u].getAttribute("role").includes("dialog") &&
                            ((q[u].scrollTop += 1e10),
                            (q[u].children[1].scrollTop += 1e10));
                      setTimeout(function () {
                        for (
                          var t = document.getElementsByTagName("div"), f = 0;
                          10 > f;
                          f++
                        )
                          for (var e = 0; e < t.length; e++)
                            "undefined" != typeof t[e] &&
                              "undefined" != typeof t[e].children[1] &&
                              t[e].getAttribute("role") &&
                              t[e].getAttribute("role").includes("dialog") &&
                              ((t[e].scrollTop += 1e10),
                              (t[e].children[1].scrollTop += 1e10));
                        setTimeout(function () {
                          for (
                            var l = document.getElementsByTagName("div"), p = 0;
                            10 > p;
                            p++
                          )
                            for (var g = 0; g < l.length; g++)
                              "undefined" != typeof l[g] &&
                                "undefined" != typeof l[g].children[1] &&
                                l[g].getAttribute("role") &&
                                l[g].getAttribute("role").includes("dialog") &&
                                ((l[g].scrollTop += 1e10),
                                (l[g].children[1].scrollTop += 1e10));
                          setTimeout(function () {
                            for (
                              var E = document.getElementsByTagName("div"),
                                F = 0;
                              10 > F;
                              F++
                            )
                              for (var y = 0; y < E.length; y++)
                                "undefined" != typeof E[y] &&
                                  "undefined" != typeof E[y].children[1] &&
                                  E[y].getAttribute("role") &&
                                  E[y]
                                    .getAttribute("role")
                                    .includes("dialog") &&
                                  ((E[y].scrollTop += 1e10),
                                  (E[y].children[1].scrollTop += 1e10));
                            setTimeout(function () {
                              for (
                                var J = document.getElementsByTagName("div"),
                                  K = 0;
                                10 > K;
                                K++
                              )
                                for (var w = 0; w < J.length; w++)
                                  "undefined" != typeof J[w] &&
                                    "undefined" != typeof J[w].children[1] &&
                                    J[w].getAttribute("role") &&
                                    J[w]
                                      .getAttribute("role")
                                      .includes("dialog") &&
                                    ((J[w].scrollTop += 1e10),
                                    (J[w].children[1].scrollTop += 1e10));
                              J = document.getElementsByTagName("span");
                              for (K = 0; K < J.length; K++)
                                "undefined" != typeof J[K] &&
                                  J[K].getAttribute("role") &&
                                  "link" == J[K].getAttribute("role") &&
                                  J[K].firstElementChild.getAttribute("alt") &&
                                  (w = J[K].firstElementChild
                                    .getAttribute("alt")
                                    .split("'")[0]) &&
                                  (w.includes("Profilbild") &&
                                    (w = w.split("s Profilbild")[0]),
                                  w.includes("Foto del perfil") &&
                                    (w = w.split("Foto del perfil de ")[1]),
                                  w.includes("Immagine del profilo di ") &&
                                    (w = w.split(
                                      "Immagine del profilo di "
                                    )[1]),
                                  w.includes("Photo de profil de ") &&
                                    (w = w.split("Photo de profil de ")[1]),
                                  (w = {
                                    username: w,
                                    user_id: 0,
                                    full_name: "",
                                    user_pic_url: "assets/images/icon.png",
                                    target: window.location.href.split("/")[3],
                                  }),
                                  SendMessage("addStory", "story", w));
                            }, M);
                          }, M);
                        }, M);
                      }, M);
                    }, M);
                  }, M);
                }, M);
              }, M);
            }, V));
      }, d);
  else if ("RunFollowLike" == a.Tag) {
    story_set = !0;
    var ha = "temp";
    window.location.href && (ha = window.location.href.split("/")[3]);
    d = getRandomInt(2e3, 4500);
    V = getRandomInt(2e3, 4500);
    var wa = getRandomInt(8500, 12500);
    M = getRandomInt(2e3, 4500);
    B = getRandomInt(2e3, 4500);
    h = getRandomInt(2e3, 2300);
    v = getRandomInt(2e3, 6500);
    C = getRandomInt(2e3, 4500);
    O = getRandomInt(2e3, 4500);
    ba = getRandomInt(2e3, 4500);
    ia = getRandomInt(9800, 10500);
    getRandomInt(1e3, 2200);
    getRandomInt(1e3, 2200);
    getRandomInt(1e3, 2200);
    getRandomInt(1e3, 2200);
    var ma = getRandomInt(5e3, 1e4);
    getRandomInt(5e3, 1e4);
    getRandomInt(5e3, 1e4);
    getRandomInt(5e3, 1e4);
    var na = getRandomInt(2e3, 4e3);
    getRandomInt(2e3, 4e3);
    getRandomInt(2e3, 4e3);
    getRandomInt(2e3, 4e3);
    var oa = Math.floor(20 * Math.random());
    d = document.documentElement.innerHTML;
    window.location.href.includes("accounts/emailsignup/") &&
      window.location.replace("https://instoo.com/pause");
    d.includes("It looks like you shared your password") &&
      (SendMessage("blocked", "blocked", "compromised" + window.location.href),
      setTimeout(function () {
        window.location.replace("https://instagram.com/accounts/logout");
      }, 2e4));
    d.includes("entering your password on a website designed") &&
      (SendMessage("blocked", "blocked", "phishing" + window.location.href),
      setTimeout(function () {
        window.location.replace("https://instagram.com/accounts/logout");
      }, 2e4));
    d.includes("unusual activity from your account") &&
      (SendMessage("blocked", "blocked", "unusual" + window.location.href),
      setTimeout(function () {
        window.location.replace("https://instagram.com/accounts/logout");
      }, 2e4));
    var sa = a.story.doactions.dolike,
      ta = a.story.doactions.dounfollow,
      ua = a.story.doactions.dofollow,
      ka = a.story.doactions.dodm;
    document.getElementsByTagName("img");
    var ca =
      "Current speed: " +
      ["fast", "fast", "medium", "slow"][a.story.currentSpeed] +
      "<br>";
    a.story.StartFollow &&
      (ca +=
        5 < ua && a.story.StartFollow
          ? "Following " + a.story.storyUser
          : "Randomly skipped Following " +
            a.story.storyUser +
            " to appear human.<br>");
    a.story.StartLike &&
      (ca +=
        4 < sa && a.story.StartLike
          ? "<br>Liking " + a.story.storyUser
          : "<br>Randomly skipped Liking " +
            a.story.storyUser +
            "'s photo to appear human.<br>");
    a.story.StartUnfollow &&
      (ca +=
        7 <= ta && a.story.StartUnfollow
          ? "<br>Unfollowing"
          : "<br>Randomly skipped Unfollowing to appear human.<br>");
    a.story.StartComment &&
      (ca +=
        8 <= ka && a.story.StartComment
          ? "<br>Sending Auto-dm"
          : "<br>Randomly skipped sending auto-dm to appear human.<br>");
    a.story.StartReact &&
      (ca +=
        16 < oa && a.story.StartReact
          ? "<br>Reacting to Story"
          : "<br>Randomly skipped reacting to story to appear human.<br>");
    a.story.getStats &&
      (ca =
        "Gathering user follower stats first. <br>Starting automation on next story.");
    $("#inject").html(ca);
    30 > Math.floor(100 * Math.random()) &&
      SendMessage("ErrorStory", "Error", "No BUttons");
    ca += "<br>This profile came from an account target: " + a.story.target;
    setTimeout(function () {
      var m = document.getElementsByTagName("main");
      startedFollowLike = !0;
      for (
        var G = !1,
          A = "",
          H = document.getElementsByTagName("img"),
          N = "",
          x = 0;
        x < H.length;
        x++
      )
        if (
          H[x] &&
          H[x].getAttribute("alt") &&
          H[x].getAttribute("alt").includes("May be a")
        ) {
          var P = H[x].getAttribute("alt").split("May be a")[1];
          N += P;
          for (var z = 0; z < a.story.filters.length; z++)
            P.toLowerCase().includes(a.story.filters[z]) &&
              ((G = !0),
              (A =
                "Blocked interacting with this profile due to image content:" +
                a.story.filters[z]));
        }
      ca += "<br>Images content:" + N;
      $("#inject").html(ca);
      if (!G)
        for (z = 0; z < a.story.filters.length; z++)
          "undefined" != typeof m[0] &&
            m[0].firstElementChild &&
            m[0].firstElementChild.innerText
              .toLowerCase()
              .includes(a.story.filters[z]) &&
            ((G = !0),
            (A =
              "Blocked interacting with this profile due to bio text:" +
              a.story.filters[z]));
      !G &&
        H.length < a.story.minPhotos &&
        ((G = !0),
        (A =
          "Blocked interacting with this profile due threshhold for minimum photos:" +
          a.story.minPhotos));
      if (!G)
        for (m = document.getElementsByTagName("a"), x = 0; x < m.length; x++)
          m[x] &&
            "undefined" != typeof m[x] &&
            m[x].firstElementChild &&
            m[x].getAttribute("href") &&
            m[x].getAttribute("href").includes("followers") &&
            m[x].firstElementChild.getAttribute("title") &&
            1 < m[x].firstElementChild.getAttribute("title").length &&
            ((H = parseInt(
              m[x].firstElementChild
                .getAttribute("title")
                .split(",")
                .join("")
                .split(".")
                .join("")
            )),
            H > a.story.maxFollowers &&
              ((G = !0),
              (A =
                "Blocked interacting with this profile due to max follower threshhold:" +
                a.story.maxFollowers +
                ", " +
                H)),
            H < a.story.minFollowers &&
              ((G = !0),
              (A =
                "Blocked interacting with this profile due to min follower threshhold:" +
                a.story.minFollowing +
                ", " +
                H))),
            m[x] &&
              "undefined" != typeof m[x] &&
              m[x].firstElementChild &&
              m[x].getAttribute("href") &&
              m[x].getAttribute("href").includes("following") &&
              m[x].firstElementChild.getAttribute("title") &&
              1 < m[x].firstElementChild.getAttribute("title").length &&
              ((H = parseInt(
                m[x].firstElementChild
                  .getAttribute("title")
                  .split(",")
                  .join("")
                  .split(".")
                  .join("")
              )),
              H > a.story.maxFollowing &&
                ((G = !0),
                (A =
                  "Blocked interacting with this profile due to max following threshhold:" +
                  a.story.maxFollowing +
                  ", " +
                  H)),
              H < a.story.minFollowing &&
                ((G = !0),
                (A =
                  "Blocked interacting with this profile due to min following threshhold:" +
                  a.story.minFollowing +
                  ", " +
                  H)));
      commented = !1;
      SendMessage("SkipFollowStory", "text", ca + "  " + A);
      var I = "temp";
      window.location.href && (I = window.location.href.split("/")[3]);
      if (0 == a.story.EnableFilters || !G) {
        a.story.StartComment &&
          8 <= ka &&
          a.story.CommentedMedia &&
          20 > a.story.CommentedMedia.length &&
          (setTimeout(function () {
            var b = document.getElementsByTagName("button");
            if ("undefined" != typeof b)
              for (var c = 0; c < b.length; c++)
                if (
                  (b[c] && b[c].innerText.includes("Follow")) ||
                  b[c].innerText.includes("Seguir") ||
                  b[c].innerText.includes("S'abonner") ||
                  b[c].innerText.includes("Segui") ||
                  b[c].innerText.includes("Abonnieren") ||
                  b[c].innerText.includes("F\u00f8lg") ||
                  b[c].innerText.includes("Follow")
                ) {
                  b[c].click();
                  b = document.getElementsByTagName("img");
                  var D = "assets/images/icon.png";
                  if ("length" != typeof b)
                    for (c = 0; c < b.length; c++)
                      b[c].getAttribute("data-testid") &&
                        "user-avatar" == b[c].getAttribute("data-testid") &&
                        b[c].getAttribute("alt").includes(a.story.storyUser) &&
                        (D = b[c].getAttribute("src"));
                  if (
                    (I = a.story.storyUser) &&
                    "undefined" != typeof I &&
                    0 == I.length
                  )
                    break;
                  SendMessage("FollowedUserStory", "User", {
                    followed_time: 0,
                    full_name: "",
                    user_id: "0",
                    user_pic_url: "assets/images/icon.png",
                    username: I,
                  });
                  pic_url = D;
                  break;
                }
            setTimeout(function () {
              var k = document.getElementsByTagName("button");
              if ("undefined" != typeof k)
                for (var q = 0; q < k.length; q++)
                  k[q] &&
                    k[q].innerText.includes("Message") &&
                    (k[q].click(),
                    setTimeout(function () {
                      var r = document.getElementsByTagName("div"),
                        u = 0;
                      if ("undefined" != typeof r)
                        for (var t = 0; t < r.length; t++)
                          r[t].getAttribute("style") &&
                            r[t].getAttribute("style").includes("min-height") &&
                            u++;
                      if (
                        0 == u &&
                        ((r = document.getElementsByTagName("textarea")),
                        "undefined" != typeof r)
                      )
                        for (t = 0; t < r.length; t++)
                          if (
                            r[t].getAttribute("placeholder") &&
                            r[t]
                              .getAttribute("placeholder")
                              .includes("Message") &&
                            "undefined" != typeof a.story.CommentPool &&
                            0 < a.story.CommentPool.length
                          ) {
                            u = getRandomInt(0, a.story.CommentPool.length - 1);
                            var f = "";
                            "undefined" != typeof a.story.CommentPool[u] &&
                              (f = a.story.CommentPool[u].tag_name);
                            for (
                              var e, l, p = new RegExp(/{([^{}]+?)}/);
                              null !== (u = p.exec(f));

                            )
                              u[1] &&
                                ((e = u[1].split("|")),
                                "undefined" != typeof e &&
                                  ((l = Math.floor(Math.random() * e.length)),
                                  (f = f.replace(u[0], e[l]))));
                            r[t].value = f;
                            u = document.createEvent("HTMLEvents");
                            u.initEvent("change", !0, !1);
                            r[t].dispatchEvent(u);
                            setTimeout(function () {
                              var g = document.getElementsByTagName("button");
                              if ("undefined" != typeof g)
                                for (var E = 0; E < g.length; E++)
                                  if (g[E] && g[E].innerText.includes("Send")) {
                                    g[E].click();
                                    document.getElementsByTagName("img");
                                    SendMessage("CommentedMedia", "Media", {
                                      caption: f,
                                      shortcode: "/" + I,
                                      media_src: "assets/images/icon.png",
                                    });
                                    commented = !0;
                                    setTimeout(function () {
                                      var F =
                                        document.getElementsByTagName("button");
                                      if ("undefined" != typeof F)
                                        for (var y = 0; y < F.length; y++)
                                          F[y].textContent &&
                                            (F[y].textContent.includes(
                                              "Report"
                                            ) ||
                                              F[y].textContent.includes(
                                                "Informar"
                                              ) ||
                                              F[y].textContent.includes(
                                                "Rapporto"
                                              ) ||
                                              F[y].textContent.includes(
                                                "Bericht"
                                              )) &&
                                            (SendMessage(
                                              "blocked",
                                              "blocked",
                                              JSON.stringify(a.story)
                                            ),
                                            F[y].click(),
                                            setTimeout(function () {
                                              window.location.replace(
                                                "https://instagram.com/accounts/logout"
                                              );
                                            }, na));
                                    }, ma);
                                    break;
                                  }
                            }, C);
                            break;
                          }
                    }, O));
            }, ba);
            setTimeout(function () {
              for (
                var k = document.getElementsByTagName("button"), q = 0;
                q < k.length;
                q++
              )
                k[q].textContent &&
                  (k[q].textContent.includes("Report") ||
                    k[q].textContent.includes("Informar") ||
                    k[q].textContent.includes("Rapporto") ||
                    k[q].textContent.includes("Bericht")) &&
                  (SendMessage("blocked", "blocked", JSON.stringify(a.story)),
                  k[q].click(),
                  setTimeout(function () {
                    window.location.replace(
                      "https://instagram.com/accounts/logout"
                    );
                  }, 3e3));
            }, 5e3);
          }, 2e3),
          commented ||
            setTimeout(function () {
              for (
                var b = document.getElementsByTagName("button"), c = 0;
                c < b.length;
                c++
              )
                b[c] &&
                  b[c].innerText.includes("Message") &&
                  (b[c].click(),
                  setTimeout(function () {
                    for (
                      var D = document.getElementsByTagName("div"),
                        k = 0,
                        q = 0;
                      q < D.length;
                      q++
                    )
                      D[q].getAttribute("style") &&
                        D[q].getAttribute("style").includes("min-height") &&
                        k++;
                    if (0 == k)
                      for (
                        D = document.getElementsByTagName("textarea"), q = 0;
                        q < D.length;
                        q++
                      )
                        if (
                          D[q].getAttribute("placeholder") &&
                          D[q]
                            .getAttribute("placeholder")
                            .includes("Message") &&
                          0 < a.story.CommentPool.length
                        ) {
                          k = getRandomInt(0, a.story.CommentPool.length - 1);
                          var r = ":)";
                          "undefined" != typeof a.story.CommentPool[k] &&
                            (r = a.story.CommentPool[k].tag_name);
                          for (
                            var u, t, f = new RegExp(/{([^{}]+?)}/);
                            null !== (k = f.exec(r));

                          )
                            k[1] &&
                              ((u = k[1].split("|")),
                              (t = Math.floor(Math.random() * u.length)),
                              (r = r.replace(k[0], u[t])));
                          D[q].value = r;
                          k = document.createEvent("HTMLEvents");
                          k.initEvent("change", !0, !1);
                          D[q].dispatchEvent(k);
                          setTimeout(function () {
                            for (
                              var e = document.getElementsByTagName("button"),
                                l = 0;
                              l < e.length;
                              l++
                            )
                              if (e[l] && e[l].innerText.includes("Send")) {
                                e[l].click();
                                document.getElementsByTagName("img");
                                SendMessage("CommentedMedia", "Media", {
                                  caption: r,
                                  shortcode: "/" + I,
                                  media_src: "assets/images/icon.png",
                                });
                                setTimeout(function () {
                                  for (
                                    var p =
                                        document.getElementsByTagName("button"),
                                      g = 0;
                                    g < p.length;
                                    g++
                                  )
                                    p[g].textContent &&
                                      (p[g].textContent.includes("Report") ||
                                        p[g].textContent.includes("Informar") ||
                                        p[g].textContent.includes("Rapporto") ||
                                        p[g].textContent.includes("Bericht")) &&
                                      (SendMessage(
                                        "blocked",
                                        "blocked",
                                        JSON.stringify(a.story)
                                      ),
                                      p[g].click(),
                                      setTimeout(function () {
                                        window.location.replace(
                                          "https://instagram.com/accounts/logout"
                                        );
                                      }, na));
                                }, ma);
                                break;
                              }
                          }, C);
                        }
                  }, O));
            }, ba));
        var Q = !1;
        a.story.StartFollow &&
          5 < ua &&
          a.story.FollowPoolSize < a.story.maxFollows &&
          200 > a.story.FollowPoolSize &&
          setTimeout(function () {
            for (
              var b = document.getElementsByTagName("button"), c = 0;
              c < b.length;
              c++
            )
              if (
                (((b[c] && b[c].innerText.includes("Seguir")) ||
                  b[c].innerText.includes("S'abonner") ||
                  b[c].innerText.includes("Segui") ||
                  b[c].innerText.includes("Abonnieren") ||
                  b[c].innerText.includes("F\u00f8lg")) &&
                  SendMessage("setLanguage", "story", "window.location.href"),
                (0 == Q && b[c] && b[c].innerText.includes("Follow")) ||
                  b[c].innerText.includes("Seguir") ||
                  b[c].innerText.includes("S'abonner") ||
                  b[c].innerText.includes("Segui") ||
                  b[c].innerText.includes("Abonnieren") ||
                  b[c].innerText.includes("F\u00f8lg"))
              ) {
                b[c].click();
                Q = !0;
                b = document.getElementsByTagName("img");
                for (c = 0; c < b.length; c++)
                  b[c].getAttribute("data-testid") &&
                    "user-avatar" == b[c].getAttribute("data-testid") &&
                    b[c].getAttribute("alt").includes(a.story.storyUser) &&
                    b[c].getAttribute("src");
                I = window.location.href.split("/")[3];
                if (0 == I.length) break;
                SendMessage("FollowedUserStory", "User", {
                  followed_time: 0,
                  full_name: "",
                  user_id: "0",
                  user_pic_url: "assets/images/icon.png",
                  username: I,
                });
                break;
              }
            setTimeout(function () {
              for (
                var D = document.getElementsByTagName("button"), k = 0;
                k < D.length;
                k++
              )
                D[k].textContent &&
                  (D[k].textContent.includes("Report") ||
                    D[k].textContent.includes("Informar") ||
                    D[k].textContent.includes("Rapporto") ||
                    D[k].textContent.includes("Bericht")) &&
                  (SendMessage("blocked", "blocked", JSON.stringify(a.story)),
                  D[k].click(),
                  setTimeout(function () {
                    window.location.replace(
                      "https://instagram.com/accounts/logout"
                    );
                  }, 3e3));
            }, h);
          }, v);
        ((a.story.StartUnfollow &&
          7 <= ta &&
          200 > a.story.UnfollowPoolSize &&
          a.story.UnfollowPoolSize < a.story.maxUnfollows) ||
          a.story.getStats) &&
          setTimeout(function () {
            for (
              var b = document.getElementsByTagName("a"), c = 0;
              c < b.length;
              c++
            )
              if (
                b[c] &&
                "undefined" != typeof b[c] &&
                b[c].firstElementChild &&
                b[c].getAttribute("href") &&
                b[c].getAttribute("href").includes("followers") &&
                b[c].firstElementChild.getAttribute("title") &&
                1 < b[c].firstElementChild.getAttribute("title").length
              ) {
                var D = parseInt(
                  b[c].firstElementChild
                    .getAttribute("title")
                    .split(",")
                    .join("")
                    .split(".")
                    .join("")
                );
                if (1e3 < D && 1e5 > D) {
                  SendMessage("IdealTarget", "target", {
                    username: ha,
                    followers: D,
                  });
                  break;
                }
              }
            D = document.getElementsByTagName("img");
            for (c = 0; c < D.length; c++)
              D[c].getAttribute("alt") &&
                D[c].getAttribute("alt").includes(a.story.username) &&
                (D[c].click(),
                setTimeout(function () {
                  for (
                    var k = document.getElementsByTagName("a"), q = 0;
                    q < k.length;
                    q++
                  )
                    if (
                      k[q].getAttribute("href") &&
                      k[q].getAttribute("href").includes(a.story.username)
                    ) {
                      k[q].click();
                      setTimeout(function () {
                        if (a.story.getStats)
                          for (
                            var r = document.getElementsByTagName("a"), u = 0;
                            u < r.length;
                            u++
                          )
                            if (
                              r[u] &&
                              "undefined" != typeof b[u] &&
                              "undefined" !=
                                typeof r[u].parentNode.parentNode.children[2] &&
                              "undefined" !=
                                typeof r[u].parentNode.parentNode.children[0] &&
                              r[u].firstElementChild &&
                              r[u].getAttribute("href") &&
                              r[u].firstElementChild.getAttribute("title") &&
                              r[u].parentNode.parentNode.children[2]
                                .firstElementChild.firstElementChild &&
                              r[u].parentNode.parentNode.children[2]
                                .firstElementChild.firstElementChild
                                .innerText &&
                              r[u].parentNode.parentNode.children[0] &&
                              r[u].parentNode.parentNode.children[0]
                                .firstElementChild &&
                              r[u].parentNode.parentNode.children[0]
                                .firstElementChild.firstElementChild
                                .innerText &&
                              (r[u]
                                .getAttribute("href")
                                .includes("followers") ||
                                r[u]
                                  .getAttribute("href")
                                  .includes("seguidores"))
                            ) {
                              a.story.getStats &&
                                SendMessage("gotStats", "followers", {
                                  CurrentUser: CurrentUser,
                                  followers: r[u].firstElementChild
                                    .getAttribute("title")
                                    .split(" ")
                                    .join("")
                                    .split(",")
                                    .join("")
                                    .split(".")
                                    .join(""),
                                  following: r[
                                    u
                                  ].parentNode.parentNode.children[2].firstElementChild.firstElementChild.innerText
                                    .split(" ")
                                    .join("")
                                    .split(",")
                                    .join("")
                                    .split(".")
                                    .join(""),
                                  posts: r[
                                    u
                                  ].parentNode.parentNode.children[0].firstElementChild.firstElementChild.innerText
                                    .split(" ")
                                    .join("")
                                    .split(",")
                                    .join("")
                                    .split(".")
                                    .join(""),
                                });
                              if (a.story.StartComment && 8 <= ka) {
                                var t = a.story.recents,
                                  f = a.story.RankedTargets;
                                1 == a.story.backgroundDMs
                                  ? -1 == a.story.recents.indexOf(f[0]) &&
                                    0 < f.length &&
                                    (t.push(f[0]),
                                    (msg_user = f[0]),
                                    SendMessage("Recents", "recents", t),
                                    SendMessage("DODM", "username", f[0]))
                                  : a.story.StartComment &&
                                    8 <= ka &&
                                    (r[u].click(),
                                    setTimeout(function () {
                                      for (
                                        var l =
                                            document.getElementsByTagName(
                                              "div"
                                            ),
                                          p = 0;
                                        p < l.length;
                                        p++
                                      )
                                        "undefined" != typeof l[p] &&
                                          "undefined" !=
                                            typeof l[p].children[1] &&
                                          l[p] &&
                                          l[p].getAttribute("role") &&
                                          l[p]
                                            .getAttribute("role")
                                            .includes("dialog") &&
                                          ((l[p].scrollTop = 1e6),
                                          (l[p].children[1].scrollTop = 1e6));
                                      setTimeout(function () {
                                        for (
                                          var g =
                                              document.getElementsByTagName(
                                                "a"
                                              ),
                                            E = a.story.recents,
                                            F = 0;
                                          F < g.length;
                                          F++
                                        )
                                          if (
                                            g[F].getAttribute("class") &&
                                            g[F].getAttribute("class").includes(
                                              "notranslate"
                                            ) &&
                                            -1 ==
                                              a.story.recents.indexOf(
                                                g[F].getAttribute("href")
                                              )
                                          ) {
                                            E.push(g[F].getAttribute("href"));
                                            msg_user =
                                              g[F].getAttribute("href");
                                            SendMessage(
                                              "Recents",
                                              "recents",
                                              E
                                            );
                                            g[F].click();
                                            setTimeout(function () {
                                              for (
                                                var y =
                                                    document.getElementsByTagName(
                                                      "button"
                                                    ),
                                                  J = 0;
                                                J < y.length;
                                                J++
                                              )
                                                y[J] &&
                                                  y[J].innerText.includes(
                                                    "Message"
                                                  ) &&
                                                  (y[J].click(),
                                                  setTimeout(function () {
                                                    for (
                                                      var K =
                                                          document.getElementsByTagName(
                                                            "div"
                                                          ),
                                                        w = 0,
                                                        L = 0;
                                                      L < K.length;
                                                      L++
                                                    )
                                                      K[L].getAttribute(
                                                        "style"
                                                      ) &&
                                                        K[L].getAttribute(
                                                          "style"
                                                        ).includes(
                                                          "min-height"
                                                        ) &&
                                                        w++;
                                                    if (0 == w)
                                                      for (
                                                        K =
                                                          document.getElementsByTagName(
                                                            "textarea"
                                                          ),
                                                          L = 0;
                                                        L < K.length;
                                                        L++
                                                      )
                                                        if (
                                                          K[L].getAttribute(
                                                            "placeholder"
                                                          ) &&
                                                          K[L].getAttribute(
                                                            "placeholder"
                                                          ).includes(
                                                            "Message"
                                                          ) &&
                                                          0 <
                                                            a.story.CommentPool
                                                              .length
                                                        ) {
                                                          w = getRandomInt(
                                                            0,
                                                            a.story.CommentPool
                                                              .length - 1
                                                          );
                                                          var R = ":)";
                                                          "undefined" !=
                                                            typeof a.story
                                                              .CommentPool[w] &&
                                                            (R =
                                                              a.story
                                                                .CommentPool[w]
                                                                .tag_name);
                                                          for (
                                                            var X,
                                                              S,
                                                              aa = new RegExp(
                                                                /{([^{}]+?)}/
                                                              );
                                                            null !==
                                                            (w = aa.exec(R));

                                                          )
                                                            w[1] &&
                                                              ((X =
                                                                w[1].split(
                                                                  "|"
                                                                )),
                                                              (S = Math.floor(
                                                                Math.random() *
                                                                  X.length
                                                              )),
                                                              (R = R.replace(
                                                                w[0],
                                                                X[S]
                                                              )));
                                                          K[L].value = R;
                                                          w =
                                                            document.createEvent(
                                                              "HTMLEvents"
                                                            );
                                                          w.initEvent(
                                                            "change",
                                                            !0,
                                                            !1
                                                          );
                                                          K[L].dispatchEvent(w);
                                                          setTimeout(
                                                            function () {
                                                              for (
                                                                var da =
                                                                    document.getElementsByTagName(
                                                                      "button"
                                                                    ),
                                                                  T = 0;
                                                                T < da.length;
                                                                T++
                                                              )
                                                                if (
                                                                  da[T] &&
                                                                  da[
                                                                    T
                                                                  ].innerText.includes(
                                                                    "Send"
                                                                  )
                                                                ) {
                                                                  da[T].click();
                                                                  var Y =
                                                                    document.getElementsByTagName(
                                                                      "img"
                                                                    );
                                                                  for (
                                                                    T = 0;
                                                                    T <
                                                                    Y.length;
                                                                    T++
                                                                  )
                                                                    if (
                                                                      that.msg_user &&
                                                                      Y[
                                                                        T
                                                                      ].getAttribute(
                                                                        "alt"
                                                                      ).includes(
                                                                        that.msg_user
                                                                          .split(
                                                                            "/"
                                                                          )
                                                                          .join(
                                                                            ""
                                                                          )
                                                                      )
                                                                    ) {
                                                                      SendMessage(
                                                                        "CommentedMedia",
                                                                        "Media",
                                                                        {
                                                                          caption:
                                                                            R,
                                                                          shortcode:
                                                                            that.msg_user,
                                                                          media_src:
                                                                            "assets/images/icon.png",
                                                                        }
                                                                      );
                                                                      setTimeout(
                                                                        function () {
                                                                          for (
                                                                            var U =
                                                                                document.getElementsByTagName(
                                                                                  "button"
                                                                                ),
                                                                              Z = 0;
                                                                            Z <
                                                                            U.length;
                                                                            Z++
                                                                          )
                                                                            U[Z]
                                                                              .textContent &&
                                                                              (U[
                                                                                Z
                                                                              ].textContent.includes(
                                                                                "Report"
                                                                              ) ||
                                                                                U[
                                                                                  Z
                                                                                ].textContent.includes(
                                                                                  "Informar"
                                                                                ) ||
                                                                                U[
                                                                                  Z
                                                                                ].textContent.includes(
                                                                                  "Rapporto"
                                                                                ) ||
                                                                                U[
                                                                                  Z
                                                                                ].textContent.includes(
                                                                                  "Bericht"
                                                                                )) &&
                                                                              (SendMessage(
                                                                                "blocked",
                                                                                "blocked",
                                                                                JSON.stringify(
                                                                                  a.story
                                                                                )
                                                                              ),
                                                                              U[
                                                                                Z
                                                                              ].click(),
                                                                              setTimeout(
                                                                                function () {
                                                                                  window.location.replace(
                                                                                    "https://instagram.com/accounts/logout"
                                                                                  );
                                                                                },
                                                                                na
                                                                              ));
                                                                        },
                                                                        ma
                                                                      );
                                                                      break;
                                                                    }
                                                                }
                                                            },
                                                            C
                                                          );
                                                        }
                                                  }, O));
                                            }, ba);
                                            break;
                                          }
                                      }, C);
                                    }, B));
                              }
                              break;
                            }
                        if (a.story.StartUnfollow)
                          for (
                            r = document.getElementsByTagName("a"), u = 0;
                            u < r.length;
                            u++
                          )
                            if (
                              r[u].getAttribute("href") &&
                              r[u].getAttribute("href").includes("following") &&
                              !r[u].getAttribute("href").includes("hashtag")
                            ) {
                              r[u].click();
                              var e = "";
                              setTimeout(function () {
                                for (
                                  var l = document.getElementsByTagName("a"),
                                    p = 0;
                                  p < l.length;
                                  p++
                                )
                                  if (
                                    l[p].getAttribute("class") &&
                                    11 < l[p].getAttribute("class").length &&
                                    l[p].getAttribute("title") &&
                                    l[p]
                                      .getAttribute("class")
                                      .includes("notranslate") &&
                                    !IsUserInWhitelist(
                                      l[p].getAttribute("title"),
                                      a.story.Whitelist
                                    ) &&
                                    (!a.story.unfollowInstoo ||
                                      (a.story.unfollowInstoo &&
                                        a.story.blacklist.includes(
                                          l[p].getAttribute("title")
                                        )))
                                  ) {
                                    e = l[p].getAttribute("title");
                                    l[p].parentNode.parentNode.parentNode &&
                                      l[p].parentNode.parentNode.parentNode
                                        .nextSibling &&
                                      "undefined" !=
                                        typeof l[p].parentNode.parentNode
                                          .parentNode.nextSibling &&
                                      l[
                                        p
                                      ].parentNode.parentNode.parentNode.nextSibling.firstElementChild.click();
                                    l[p].parentNode.parentNode.parentNode
                                      .nextSibling &&
                                      l[p].parentNode.parentNode.parentNode
                                        .parentNode &&
                                      l[p].parentNode.parentNode.parentNode
                                        .parentNode.nextSibling &&
                                      "undefined" !=
                                        typeof l[p].parentNode.parentNode
                                          .parentNode.parentNode.nextSibling &&
                                      l[
                                        p
                                      ].parentNode.parentNode.parentNode.parentNode.nextSibling.firstElementChild.click();
                                    l[p].parentNode.parentNode.parentNode
                                      .parentNode.parentNode &&
                                      l[p].parentNode.parentNode.parentNode
                                        .parentNode.parentNode.nextSibling &&
                                      "undefined" !=
                                        typeof l[p].parentNode.parentNode
                                          .parentNode.parentNode.parentNode
                                          .nextSibling &&
                                      l[
                                        p
                                      ].parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.firstElementChild.click();
                                    l[p].parentNode.parentNode.parentNode
                                      .parentNode &&
                                      l[p].parentNode.parentNode.parentNode
                                        .parentNode.nextSibling &&
                                      "undefined" !=
                                        typeof l[p].parentNode.parentNode
                                          .parentNode.parentNode.nextSibling &&
                                      l[
                                        p
                                      ].parentNode.parentNode.parentNode.parentNode.nextSibling.firstElementChild.click();
                                    setTimeout(function () {
                                      for (
                                        var g =
                                            document.getElementsByTagName(
                                              "button"
                                            ),
                                          E = 0;
                                        E < g.length;
                                        E++
                                      )
                                        if (
                                          ("undefined" !=
                                            typeof g[E].parentNode.parentNode &&
                                            g[E].parentNode.parentNode &&
                                            g[E].parentNode.parentNode
                                              .firstElementChild &&
                                            g[E].parentNode.parentNode
                                              .firstElementChild
                                              .firstElementChild &&
                                            g[E].parentNode.parentNode
                                              .firstElementChild
                                              .firstElementChild
                                              .firstElementChild &&
                                            g[E].parentNode.parentNode
                                              .firstElementChild
                                              .firstElementChild
                                              .firstElementChild
                                              .firstElementChild &&
                                            g[E] &&
                                            g[E].innerText.includes(
                                              "Non seguire"
                                            )) ||
                                          g[E].innerText.includes("folgen") ||
                                          g[E].innerText.includes("Unfollow") ||
                                          g[E].innerText.includes("seguir")
                                        )
                                          g[
                                            E
                                          ].parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild.firstElementChild.getAttribute(
                                            "src"
                                          ),
                                            g[E].click(),
                                            document.getElementsByTagName("a"),
                                            SendMessage(
                                              "UnfollowedUser",
                                              "User",
                                              {
                                                username: e,
                                                user_id: e,
                                                full_name: e,
                                                user_pic_url:
                                                  "assets/images/icon.png",
                                              }
                                            ),
                                            setTimeout(function () {
                                              for (
                                                var F =
                                                    document.getElementsByTagName(
                                                      "button"
                                                    ),
                                                  y = 0;
                                                y < F.length;
                                                y++
                                              )
                                                F[y].textContent &&
                                                  (F[y].textContent.includes(
                                                    "Report"
                                                  ) ||
                                                    F[y].textContent.includes(
                                                      "Informar"
                                                    ) ||
                                                    F[y].textContent.includes(
                                                      "Rapporto"
                                                    ) ||
                                                    F[y].textContent.includes(
                                                      "Bericht"
                                                    )) &&
                                                  (SendMessage(
                                                    "blocked",
                                                    "blocked",
                                                    JSON.stringify(a.story)
                                                  ),
                                                  F[y].click(),
                                                  setTimeout(function () {
                                                    window.location.replace(
                                                      "https://instagram.com/accounts/logout"
                                                    );
                                                  }, 2e3));
                                            }, M);
                                    }, V);
                                    break;
                                  }
                              }, O);
                              break;
                            }
                      }, ba);
                      break;
                    }
                }, v));
          }, 2 * ia);
        0 == a.story.getStats &&
          a.story.StartLike &&
          4 < sa &&
          256 > a.story.LikePoolSize &&
          a.story.LikePoolSize < a.story.maxLikes &&
          setTimeout(function () {
            for (
              var b = document.getElementsByTagName("a"), c = 0;
              c < b.length;
              c++
            )
              if (
                b[c] &&
                "undefined" != typeof b[c] &&
                b[c].firstElementChild &&
                b[c].firstElementChild.getAttribute("title") &&
                b[c].getAttribute("href") &&
                b[c].getAttribute("href").includes("followers") &&
                b[c].firstElementChild.getAttribute("title") &&
                1 < b[c].firstElementChild.getAttribute("title").length
              ) {
                var D = parseInt(
                  b[c].firstElementChild
                    .getAttribute("title")
                    .split(",")
                    .join("")
                    .split(".")
                    .join("")
                );
                1e3 < D &&
                  1e5 > D &&
                  SendMessage("IdealTarget", "target", {
                    username: ha,
                    followers: D,
                  });
              }
            b = document.getElementsByTagName("img");
            for (c = 0; c < b.length; c++) {
              1 < b[c].src.length && (image_src = b[c].src);
              if (
                b[c] &&
                b[c].getAttribute("style") &&
                b[c].getAttribute("style").includes("object-fit: cover")
              ) {
                b[c].click();
                break;
              }
              if (
                b[c] &&
                b[c].getAttribute("decoding") &&
                b[c].getAttribute("decoding").includes("auto")
              ) {
                b[c].click();
                break;
              }
            }
            setTimeout(function () {
              var k = !1,
                q = document.getElementsByTagName("svg"),
                r = 0,
                u = 0;
              u = 0;
              q = document.getElementsByTagName("svg");
              for (var t = 0; t < q.length; t++)
                if (
                  (0 == k && "Like" == q[t].getAttribute("aria-label")) ||
                  "Gef\u00e4llt mir" == q[t].getAttribute("aria-label") ||
                  "Mi piace" == q[t].getAttribute("aria-label") ||
                  "To se mi l\u00edb\u00ed" ==
                    q[t].getAttribute("aria-label") ||
                  "J\u2019aime" == q[t].getAttribute("aria-label") ||
                  "Gilla" == q[t].getAttribute("aria-label") ||
                  "Me gusta" == q[t].getAttribute("aria-label") ||
                  "Vind ik leuk" == q[t].getAttribute("aria-label") ||
                  "Gosto" == q[t].getAttribute("aria-label")
                ) {
                  q[t].parentNode.click();
                  u++;
                  k = !0;
                  t = {
                    caption: "",
                    is_video: !1,
                    media_id: a.story.LikePoolSize,
                    media_src: "assets/images/icon.png",
                    shortcode: ha,
                  };
                  SendMessage("LikedMedia", "Media", t);
                  k = !0;
                  setTimeout(function () {
                    for (
                      var f = document.getElementsByTagName("button"), e = 0;
                      e < f.length;
                      e++
                    )
                      f[e].textContent &&
                        (f[e].textContent.includes("Report") ||
                          f[e].textContent.includes("Informar") ||
                          f[e].textContent.includes("Rapporto") ||
                          f[e].textContent.includes("Bericht")) &&
                        (SendMessage(
                          "blocked",
                          "blocked",
                          JSON.stringify(a.story)
                        ),
                        f[e].click(),
                        setTimeout(function () {
                          window.location.replace(
                            "https://instagram.com/accounts/logout"
                          );
                        }, 2e3));
                  }, 5e3);
                  break;
                }
              if (0 == k)
                for (t = 0; t < q.length; t++)
                  if (
                    !q[t].parentNode.nodeName.includes("A") &&
                    "undefined" != typeof q[t] &&
                    q[t].firstElementChild &&
                    ("M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z" ==
                      q[t].firstElementChild.getAttribute("d") ||
                      "M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z" ==
                        q[t].firstElementChild.getAttribute("d") ||
                      "M34.3 3.5C27.2 3.5 24 8.8 24 8.8s-3.2-5.3-10.3-5.3C6.4 3.5.5 9.9.5 17.8s6.1 12.4 12.2 17.8c9.2 8.2 9.8 8.9 11.3 8.9s2.1-.7 11.3-8.9c6.2-5.5 12.2-10 12.2-17.8 0-7.9-5.9-14.3-13.2-14.3zm-1 29.8c-5.4 4.8-8.3 7.5-9.3 8.1-1-.7-4.6-3.9-9.3-8.1-5.5-4.9-11.2-9-11.2-15.6 0-6.2 4.6-11.3 10.2-11.3 4.1 0 6.3 2 7.9 4.2 3.6 5.1 1.2 5.1 4.8 0 1.6-2.2 3.8-4.2 7.9-4.2 5.6 0 10.2 5.1 10.2 11.3 0 6.7-5.7 10.8-11.2 15.6z" ==
                        q[t].firstElementChild.getAttribute("d")) &&
                    (r++, "24" == q[t].getAttribute("width"))
                  ) {
                    q[t].parentNode.click();
                    u++;
                    t = {
                      caption: "",
                      is_video: !1,
                      media_id: a.story.LikePoolSize,
                      media_src: "assets/images/icon.png",
                      shortcode: ha,
                    };
                    k = !0;
                    SendMessage("LikedMedia", "Media", t);
                    setTimeout(function () {
                      for (
                        var f = document.getElementsByTagName("button"), e = 0;
                        e < f.length;
                        e++
                      )
                        f[e].textContent &&
                          (f[e].textContent.includes("Report") ||
                            f[e].textContent.includes("Informar") ||
                            f[e].textContent.includes("Rapporto") ||
                            f[e].textContent.includes("Bericht")) &&
                          (SendMessage(
                            "blocked",
                            "blocked",
                            JSON.stringify(a.story)
                          ),
                          f[e].click(),
                          setTimeout(function () {
                            window.location.replace(
                              "https://instagram.com/accounts/logout"
                            );
                          }, 2e3));
                    }, 2e3);
                    break;
                  }
            }, 4e3);
          }, wa);
      }
    }, M);
  } else if ("UpdateStory" == a.Tag && 0 == story_set) {
    story_set = !0;
    n = document.getElementsByTagName("body");
    for (d = 0; d < n.length; d++)
      n[d] &&
        n[d].innerText &&
        n[d].innerText.includes("Sorry, this page isn't available.") &&
        SendMessage("BadTarget", "Media", "");
    d = document.documentElement.innerHTML;
    window.location.href.includes("accounts/emailsignup/") &&
      window.location.replace("https://instoo.com/pause");
    d.includes("It looks like you shared your password") &&
      (SendMessage("blocked", "blocked", "compromised" + window.location.href),
      setTimeout(function () {
        window.location.replace("https://instagram.com/accounts/logout");
      }, 2e4));
    d.includes("entering your password on a website designed") &&
      (SendMessage("blocked", "blocked", "phishing" + window.location.href),
      setTimeout(function () {
        window.location.replace("https://instagram.com/accounts/logout");
      }, 2e4));
    d.includes("unusual activity from your account") &&
      (SendMessage("blocked", "blocked", "unusual" + window.location.href),
      setTimeout(function () {
        window.location.replace("https://instagram.com/accounts/logout");
      }, 2e4));
    d = getRandomInt(2e3, 4500);
    V = getRandomInt(2e3, 4500);
    M = getRandomInt(2e3, 4500);
    B = getRandomInt(2e3, 4500);
    h = getRandomInt(2e3, 2300);
    v = getRandomInt(2e3, 4500);
    C = getRandomInt(2e3, 4500);
    O = getRandomInt(2e3, 4500);
    ba = getRandomInt(2e3, 4500);
    ia = getRandomInt(9800, 10500);
    getRandomInt(1e3, 2200);
    getRandomInt(1e3, 2200);
    getRandomInt(1e3, 2200);
    getRandomInt(1e3, 2200);
    oa = Math.floor(20 * Math.random());
    setTimeout(function () {
      var m = document.getElementsByTagName("a"),
        G = "";
      m[1] && (G = m[1].text);
      m = document.getElementsByTagName("button");
      for (var A = 0; A < m.length; A++)
        m[A] &&
          m[A].innerText &&
          (m[A].innerText.includes("View Story") ||
            m[A].innerText.includes("jouer") ||
            m[A].innerText.includes("Tap") ||
            m[A].innerText.includes("Toca") ||
            m[A].innerText.includes("Zum") ||
            m[A].innerText.includes("Tocca")) &&
          m[A].click();
      m = document.getElementsByTagName("div");
      for (A = 0; A < m.length; A++)
        m[A] &&
          m[A].innerText &&
          (m[A].innerText.includes("View Story") ||
            m[A].innerText.includes("jouer") ||
            m[A].innerText.includes("Tap") ||
            m[A].innerText.includes("Toca") ||
            m[A].innerText.includes("Zum") ||
            m[A].innerText.includes("Tocca")) &&
          m[A].click();
      setTimeout(function () {
        for (
          var I = document.getElementsByTagName("textarea"), Q = 0;
          Q < I.length;
          Q++
        )
          if (
            I[Q].getAttribute("placeholder") &&
            I[Q].getAttribute("placeholder").includes("Reply")
          ) {
            I[Q].click();
            I[Q].focus();
            I[Q].selectionEnd = 0;
            var b = document.createEvent("HTMLEvents");
            b.initEvent("change", !0, !1);
            I[Q].dispatchEvent(b);
            b = document.createEvent("HTMLEvents");
            b.initEvent("click", !0, !1, window);
            I[Q].dispatchEvent(b);
            b = new MouseEvent("focus", {
              bubbles: !0,
              cancelable: !1,
              view: window,
            });
            I[Q].dispatchEvent(b);
            setTimeout(function () {
              if ("undefined" != typeof a.story.reacts) {
                parseInt(
                  a.story.reacts[
                    Math.floor(
                      Math.random() * (a.story.reacts.length - 1 + 1)
                    ) + 0
                  ]
                );
                for (
                  var c = document.getElementsByTagName("button"), D = 0;
                  D < c.length;
                  D++
                );
              }
            }, 1e3);
          }
      }, 1e3);
      var H = Math.floor(10 * Math.random()),
        N = Math.floor(10 * Math.random()),
        x = Math.floor(10 * Math.random()),
        P = Math.floor(10 * Math.random());
      document.getElementsByTagName("img");
      var z =
        "Current speed: " +
        ["fast", "fast", "medium", "slow"][a.story.currentSpeed] +
        "<br>";
      a.story.StartFollow &&
        (z +=
          5 < x && a.story.StartFollow
            ? "Following " + a.story.storyUser
            : "Randomly skipped Following " +
              a.story.storyUser +
              " to appear human.<br>");
      a.story.StartLike &&
        (z +=
          4 < H && a.story.StartLike
            ? "<br>Liking " + a.story.storyUser
            : "<br>Randomly skipped Liking " +
              a.story.storyUser +
              "'s photo to appear human.<br>");
      a.story.StartUnfollow &&
        (z +=
          7 <= N && a.story.StartUnfollow
            ? "<br>Unfollowing"
            : "<br>Randomly skipped Unfollowing to appear human.<br>");
      a.story.StartComment &&
        (z +=
          8 <= P && a.story.StartComment
            ? "<br>Sending Auto-dm"
            : "<br>Randomly skipped sending auto-dm to appear human.<br>");
      a.story.StartReact &&
        (z +=
          16 < oa && a.story.StartReact
            ? "<br>Reacting to Story"
            : "<br>Randomly skipped reacting to story to appear human.<br>");
      a.story.getStats &&
        (z =
          "Gathering user follower stats first. <br>Starting automation on next story.");
      $("#inject").html(z);
      SendMessage("SkipFollowStory", "text", z);
      30 > Math.floor(100 * Math.random()) &&
        SendMessage("ErrorStory", "Error", "No BUttons");
      z += "<br>This profile came from an account target: " + a.story.target;
      if (
        (a.story.StartFollow &&
          5 < x &&
          a.story.FollowPoolSize < a.story.maxFollows &&
          200 > a.story.FollowPoolSize) ||
        (a.story.StartLike &&
          4 < H &&
          a.story.LikePoolSize < a.story.maxLikes) ||
        (a.story.StartUnfollow &&
          7 <= N &&
          200 > a.story.UnfollowPoolSize &&
          a.story.UnfollowPoolSize < a.story.maxUnfollows) ||
        a.story.getStats ||
        (a.story.StartComment && 8 <= P)
      )
        (m = window.location.href.split("/")[4]),
          SendMessage("GetFollowLike", "User", {
            dofollow: x,
            dolike: H,
            dounfollow: N,
            dodm: P,
          }),
          (window.location.href = "https://instagram.com/" + m),
          (backgroundwindow = !0),
          setTimeout(function () {
            var I = !1;
            if (window.location.href.includes("stories")) {
              var Q = window.location.href.split("/")[4];
              SendMessage("GetFollowLike", "User", {
                dofollow: x,
                dolike: H,
                dounfollow: N,
                dodm: P,
              });
              I = !0;
              window.location.href = "https://instagram.com/" + Q;
            }
            setTimeout(function () {
              if (!I) {
                var b = document.getElementsByTagName("main");
                startedFollowLike = !0;
                for (
                  var c = !1,
                    D = "",
                    k = document.getElementsByTagName("img"),
                    q = "",
                    r = 0;
                  r < k.length;
                  r++
                )
                  if (
                    k[r].getAttribute("alt") &&
                    k[r].getAttribute("alt").includes("May be a")
                  ) {
                    var u = k[r].getAttribute("alt").split("May be a")[1];
                    q += u;
                    for (var t = 0; t < a.story.filters.length; t++)
                      u.toLowerCase().includes(a.story.filters[t]) &&
                        ((c = !0),
                        (D =
                          "Blocked interacting with this profile due to image content:" +
                          a.story.filters[t]));
                  }
                z += "<br>Images content:" + q;
                $("#inject").html(z);
                if (!c)
                  for (t = 0; t < a.story.filters.length; t++)
                    b[0] &&
                      "undefined" != typeof b[0] &&
                      b[0].firstElementChild.innerText
                        .toLowerCase()
                        .includes(a.story.filters[t]) &&
                      ((c = !0),
                      (D =
                        "Blocked interacting with this profile due to bio text:" +
                        a.story.filters[t]));
                !c &&
                  k.length < a.story.minPhotos &&
                  ((c = !0),
                  (D =
                    "Blocked interacting with this profile due threshhold for minimum photos:" +
                    a.story.minPhotos));
                if (!c)
                  for (
                    b = document.getElementsByTagName("a"), r = 0;
                    r < b.length;
                    r++
                  )
                    b[r] &&
                      b[r].firstElementChild &&
                      b[r].firstElementChild.getAttribute("title") &&
                      b[r].getAttribute("href") &&
                      b[r].getAttribute("href").includes("followers") &&
                      b[r].firstElementChild.getAttribute("title") &&
                      1 < b[r].firstElementChild.getAttribute("title").length &&
                      ((k = parseInt(
                        b[r].firstElementChild
                          .getAttribute("title")
                          .split(",")
                          .join("")
                          .split(".")
                          .join("")
                      )),
                      k > a.story.maxFollowers &&
                        ((c = !0),
                        (D =
                          "Blocked interacting with this profile due to max follower threshhold:" +
                          a.story.maxFollowers +
                          ", " +
                          k)),
                      k < a.story.minFollowers &&
                        ((c = !0),
                        (D =
                          "Blocked interacting with this profile due to min follower threshhold:" +
                          a.story.minFollowing +
                          ", " +
                          k))),
                      b[r] &&
                        b[r].firstElementChild &&
                        b[r].firstElementChild.getAttribute("title") &&
                        b[r].getAttribute("href") &&
                        b[r].getAttribute("href").includes("following") &&
                        b[r].firstElementChild.getAttribute("title") &&
                        1 <
                          b[r].firstElementChild.getAttribute("title").length &&
                        ((k = parseInt(
                          b[r].firstElementChild
                            .getAttribute("title")
                            .split(",")
                            .join("")
                            .split(".")
                            .join("")
                        )),
                        k > a.story.maxFollowing &&
                          ((c = !0),
                          (D =
                            "Blocked interacting with this profile due to max following threshhold:" +
                            a.story.maxFollowing +
                            ", " +
                            k)),
                        k < a.story.minFollowing &&
                          ((c = !0),
                          (D =
                            "Blocked interacting with this profile due to min following threshhold:" +
                            a.story.minFollowing +
                            ", " +
                            k)));
                c && 1 == a.story.EnableFilters && $("#inject").html(D);
                (0 != a.story.EnableFilters && c) ||
                  (a.story.StartFollow &&
                    5 < x &&
                    a.story.FollowPoolSize < a.story.maxFollows &&
                    200 > a.story.FollowPoolSize &&
                    setTimeout(function () {
                      for (
                        var f = document.getElementsByTagName("button"), e = 0;
                        e < f.length;
                        e++
                      )
                        if (
                          (f[e] && f[e].innerText.includes("Follow")) ||
                          f[e].innerText.includes("Seguir") ||
                          f[e].innerText.includes("S'abonner") ||
                          f[e].innerText.includes("Segui") ||
                          f[e].innerText.includes("Abonnieren") ||
                          f[e].innerText.includes("F\u00f8lg") ||
                          f[e].innerText.includes("Follow")
                        ) {
                          f[e].click();
                          document.getElementsByTagName("img");
                          "undefined" !=
                            typeof f[e].parentNode.parentNode.parentNode
                              .parentNode.parentNode.parentNode.parentNode
                              .parentNode.parentNode &&
                            "undefined" !=
                              typeof f[e].parentNode.parentNode.parentNode
                                .parentNode.parentNode.parentNode.parentNode
                                .parentNode.parentNode.children[0] &&
                            "undefined" !=
                              typeof f[e].parentNode.parentNode.parentNode
                                .parentNode.parentNode.parentNode.parentNode
                                .parentNode.parentNode.children[0]
                                .children[0] &&
                            "undefined" !=
                              typeof f[e].parentNode.parentNode.parentNode
                                .parentNode.parentNode.parentNode.parentNode
                                .parentNode.parentNode.children[0].children[0]
                                .children[1] &&
                            f[
                              e
                            ].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].children[0].children[1].children[0].getAttribute(
                              "src"
                            );
                          f = "temp";
                          if (
                            window.location.href &&
                            (f = window.location.href.split("/")[3])
                          ) {
                            if (0 == f.length) break;
                            f.includes("Profilbild") &&
                              (f = f.split("s Profilbild")[0]);
                            f.includes("Foto del perfil") &&
                              (f = f.split("Foto del perfil de ")[1]);
                            f.includes("Immagine del profilo di ") &&
                              (f = f.split("Immagine del profilo di ")[1]);
                            f.includes("Photo de profil de ") &&
                              (f = f.split("Photo de profil de ")[1]);
                          }
                          SendMessage("FollowedUserStory", "User", {
                            followed_time: 0,
                            full_name: "",
                            user_id: "0",
                            user_pic_url: "assets/images/icon.png",
                            username: f,
                          });
                          break;
                        }
                      setTimeout(function () {
                        for (
                          var l = document.getElementsByTagName("button"),
                            p = 0;
                          p < l.length;
                          p++
                        )
                          l[p].textContent &&
                            (l[p].textContent.includes("Report") ||
                              l[p].textContent.includes("Informar") ||
                              l[p].textContent.includes("Rapporto") ||
                              l[p].textContent.includes("Bericht")) &&
                            (SendMessage(
                              "blocked",
                              "blocked",
                              JSON.stringify(a.story)
                            ),
                            l[p].click(),
                            setTimeout(function () {
                              window.location.replace(
                                "https://instagram.com/accounts/logout"
                              );
                            }, 2e3));
                      }, 5e3);
                    }, 2e3),
                  ((a.story.StartUnfollow &&
                    7 <= N &&
                    200 > a.story.UnfollowPoolSize &&
                    a.story.UnfollowPoolSize < a.story.maxUnfollows) ||
                    a.story.getStats) &&
                    setTimeout(function () {
                      for (
                        var f = document.getElementsByTagName("a"), e = 0;
                        e < f.length;
                        e++
                      )
                        if (
                          f[e] &&
                          f[e].firstElementChild &&
                          f[e].firstElementChild.getAttribute("title") &&
                          f[e].getAttribute("href") &&
                          f[e].getAttribute("href").includes("followers") &&
                          f[e].firstElementChild.getAttribute("title") &&
                          1 <
                            f[e].firstElementChild.getAttribute("title").length
                        ) {
                          var l = parseInt(
                            f[e].firstElementChild
                              .getAttribute("title")
                              .split(",")
                              .join("")
                              .split(".")
                              .join("")
                          );
                          if (1e3 < l && 1e5 > l) {
                            SendMessage("IdealTarget", "target", {
                              username: G,
                              followers: l,
                            });
                            break;
                          }
                        }
                      f = document.getElementsByTagName("img");
                      for (e = 0; e < f.length; e++)
                        f[e].getAttribute("alt") &&
                          f[e].getAttribute("alt").includes(a.story.username) &&
                          (f[e].click(),
                          setTimeout(function () {
                            for (
                              var p = document.getElementsByTagName("a"), g = 0;
                              g < p.length;
                              g++
                            )
                              if (
                                p[g].getAttribute("href") &&
                                p[g]
                                  .getAttribute("href")
                                  .includes(a.story.username)
                              ) {
                                p[g].click();
                                setTimeout(function () {
                                  if (a.story.getStats)
                                    for (
                                      var E =
                                          document.getElementsByTagName("a"),
                                        F = 0;
                                      F < E.length;
                                      F++
                                    )
                                      if (
                                        E[F].getAttribute("href") &&
                                        E[F].firstElementChild &&
                                        E[F].firstElementChild.getAttribute(
                                          "title"
                                        ) &&
                                        E[F].parentNode.parentNode.children[2]
                                          .firstElementChild
                                          .firstElementChild &&
                                        E[F].parentNode.parentNode.children[2]
                                          .firstElementChild.firstElementChild
                                          .innerText &&
                                        E[F].parentNode.parentNode.children[0]
                                          .firstElementChild
                                          .firstElementChild &&
                                        E[F].parentNode.parentNode.children[0]
                                          .firstElementChild.firstElementChild
                                          .innerText &&
                                        (E[F].getAttribute("href").includes(
                                          "followers"
                                        ) ||
                                          E[F].getAttribute("href").includes(
                                            "seguidores"
                                          ))
                                      ) {
                                        a.story.getStats &&
                                          SendMessage("gotStats", "followers", {
                                            CurrentUser: CurrentUser,
                                            followers: E[F].firstElementChild
                                              .getAttribute("title")
                                              .split(" ")
                                              .join("")
                                              .split(",")
                                              .join("")
                                              .split(".")
                                              .join(""),
                                            following: E[
                                              F
                                            ].parentNode.parentNode.children[2].firstElementChild.firstElementChild.innerText
                                              .split(" ")
                                              .join("")
                                              .split(",")
                                              .join("")
                                              .split(".")
                                              .join(""),
                                            posts: E[
                                              F
                                            ].parentNode.parentNode.children[0].firstElementChild.firstElementChild.innerText
                                              .split(" ")
                                              .join("")
                                              .split(",")
                                              .join("")
                                              .split(".")
                                              .join(""),
                                          });
                                        if (a.story.StartComment && 8 <= P) {
                                          var y = a.story.recents,
                                            J = a.story.RankedTargets;
                                          1 == a.story.backgroundDMs
                                            ? -1 ==
                                                a.story.recents.indexOf(J[0]) &&
                                              0 < J.length &&
                                              (y.push(J[0]),
                                              (msg_user = J[0]),
                                              SendMessage(
                                                "Recents",
                                                "recents",
                                                y
                                              ),
                                              SendMessage(
                                                "DODM",
                                                "username",
                                                J[0]
                                              ))
                                            : a.story.StartComment &&
                                              8 <= P &&
                                              (E[F].click(),
                                              setTimeout(function () {
                                                for (
                                                  var w =
                                                      document.getElementsByTagName(
                                                        "div"
                                                      ),
                                                    L = 0;
                                                  L < w.length;
                                                  L++
                                                )
                                                  "undefined" != typeof w[L] &&
                                                    "undefined" !=
                                                      typeof w[L].children[1] &&
                                                    w[L].getAttribute("role") &&
                                                    w[L].getAttribute(
                                                      "role"
                                                    ).includes("dialog") &&
                                                    ((w[L].scrollTop = 1e6),
                                                    (w[
                                                      L
                                                    ].children[1].scrollTop = 1e6));
                                                setTimeout(function () {
                                                  for (
                                                    var R =
                                                        document.getElementsByTagName(
                                                          "a"
                                                        ),
                                                      X = a.story.recents,
                                                      S = 0;
                                                    S < R.length;
                                                    S++
                                                  )
                                                    if (
                                                      R[S].getAttribute(
                                                        "class"
                                                      ) &&
                                                      R[S].getAttribute(
                                                        "class"
                                                      ).includes(
                                                        "notranslate"
                                                      ) &&
                                                      -1 ==
                                                        a.story.recents.indexOf(
                                                          R[S].getAttribute(
                                                            "href"
                                                          )
                                                        )
                                                    ) {
                                                      X.push(
                                                        R[S].getAttribute(
                                                          "href"
                                                        )
                                                      );
                                                      msg_user =
                                                        R[S].getAttribute(
                                                          "href"
                                                        );
                                                      SendMessage(
                                                        "Recents",
                                                        "recents",
                                                        X
                                                      );
                                                      R[S].click();
                                                      setTimeout(function () {
                                                        for (
                                                          var aa =
                                                              document.getElementsByTagName(
                                                                "button"
                                                              ),
                                                            da = 0;
                                                          da < aa.length;
                                                          da++
                                                        )
                                                          aa[
                                                            da
                                                          ].innerText.includes(
                                                            "Message"
                                                          ) &&
                                                            (aa[da].click(),
                                                            setTimeout(
                                                              function () {
                                                                for (
                                                                  var T =
                                                                      document.getElementsByTagName(
                                                                        "div"
                                                                      ),
                                                                    Y = 0,
                                                                    U = 0;
                                                                  U < T.length;
                                                                  U++
                                                                )
                                                                  T[
                                                                    U
                                                                  ].getAttribute(
                                                                    "style"
                                                                  ) &&
                                                                    T[
                                                                      U
                                                                    ].getAttribute(
                                                                      "style"
                                                                    ).includes(
                                                                      "min-height"
                                                                    ) &&
                                                                    Y++;
                                                                if (0 == Y)
                                                                  for (
                                                                    T =
                                                                      document.getElementsByTagName(
                                                                        "textarea"
                                                                      ),
                                                                      U = 0;
                                                                    U <
                                                                    T.length;
                                                                    U++
                                                                  )
                                                                    if (
                                                                      T[
                                                                        U
                                                                      ].getAttribute(
                                                                        "placeholder"
                                                                      ) &&
                                                                      T[
                                                                        U
                                                                      ].getAttribute(
                                                                        "placeholder"
                                                                      ).includes(
                                                                        "Message"
                                                                      ) &&
                                                                      0 <
                                                                        a.story
                                                                          .CommentPool
                                                                          .length
                                                                    ) {
                                                                      Y =
                                                                        getRandomInt(
                                                                          0,
                                                                          a
                                                                            .story
                                                                            .CommentPool
                                                                            .length -
                                                                            1
                                                                        );
                                                                      var Z =
                                                                        ":)";
                                                                      "undefined" !=
                                                                        typeof a
                                                                          .story
                                                                          .CommentPool[
                                                                          Y
                                                                        ] &&
                                                                        (Z =
                                                                          a
                                                                            .story
                                                                            .CommentPool[
                                                                            Y
                                                                          ]
                                                                            .tag_name);
                                                                      for (
                                                                        var pa,
                                                                          va,
                                                                          xa =
                                                                            new RegExp(
                                                                              /{([^{}]+?)}/
                                                                            );
                                                                        null !==
                                                                        (Y =
                                                                          xa.exec(
                                                                            Z
                                                                          ));

                                                                      )
                                                                        Y[1] &&
                                                                          ((pa =
                                                                            Y[1].split(
                                                                              "|"
                                                                            )),
                                                                          (va =
                                                                            Math.floor(
                                                                              Math.random() *
                                                                                pa.length
                                                                            )),
                                                                          (Z =
                                                                            Z.replace(
                                                                              Y[0],
                                                                              pa[
                                                                                va
                                                                              ]
                                                                            )));
                                                                      T[
                                                                        U
                                                                      ].value =
                                                                        Z;
                                                                      Y =
                                                                        document.createEvent(
                                                                          "HTMLEvents"
                                                                        );
                                                                      Y.initEvent(
                                                                        "change",
                                                                        !0,
                                                                        !1
                                                                      );
                                                                      T[
                                                                        U
                                                                      ].dispatchEvent(
                                                                        Y
                                                                      );
                                                                      setTimeout(
                                                                        function () {
                                                                          for (
                                                                            var qa =
                                                                                document.getElementsByTagName(
                                                                                  "button"
                                                                                ),
                                                                              la = 0;
                                                                            la <
                                                                            qa.length;
                                                                            la++
                                                                          )
                                                                            if (
                                                                              qa[
                                                                                la
                                                                              ].innerText.includes(
                                                                                "Send"
                                                                              )
                                                                            ) {
                                                                              qa[
                                                                                la
                                                                              ].click();
                                                                              document.getElementsByTagName(
                                                                                "img"
                                                                              );
                                                                              SendMessage(
                                                                                "CommentedMedia",
                                                                                "Media",
                                                                                {
                                                                                  caption:
                                                                                    Z,
                                                                                  shortcode:
                                                                                    "/" +
                                                                                    a
                                                                                      .story
                                                                                      .storyUser,
                                                                                  media_src:
                                                                                    "assets/images/icon.png",
                                                                                }
                                                                              );
                                                                              setTimeout(
                                                                                function () {
                                                                                  for (
                                                                                    var fa =
                                                                                        document.getElementsByTagName(
                                                                                          "button"
                                                                                        ),
                                                                                      ea = 0;
                                                                                    ea <
                                                                                    fa.length;
                                                                                    ea++
                                                                                  )
                                                                                    fa[
                                                                                      ea
                                                                                    ]
                                                                                      .textContent &&
                                                                                      (fa[
                                                                                        ea
                                                                                      ].textContent.includes(
                                                                                        "Report"
                                                                                      ) ||
                                                                                        fa[
                                                                                          ea
                                                                                        ].textContent.includes(
                                                                                          "Informar"
                                                                                        ) ||
                                                                                        fa[
                                                                                          ea
                                                                                        ].textContent.includes(
                                                                                          "Rapporto"
                                                                                        ) ||
                                                                                        fa[
                                                                                          ea
                                                                                        ].textContent.includes(
                                                                                          "Bericht"
                                                                                        )) &&
                                                                                      (SendMessage(
                                                                                        "blocked",
                                                                                        "blocked",
                                                                                        JSON.stringify(
                                                                                          a.story
                                                                                        )
                                                                                      ),
                                                                                      fa[
                                                                                        ea
                                                                                      ].click(),
                                                                                      setTimeout(
                                                                                        function () {
                                                                                          window.location.replace(
                                                                                            "https://instagram.com/accounts/logout"
                                                                                          );
                                                                                        },
                                                                                        2e3
                                                                                      ));
                                                                                },
                                                                                5e3
                                                                              );
                                                                              break;
                                                                            }
                                                                        },
                                                                        C
                                                                      );
                                                                    }
                                                              },
                                                              O
                                                            ));
                                                      }, ba);
                                                      break;
                                                    }
                                                }, C);
                                              }, B));
                                        }
                                        break;
                                      }
                                  if (a.story.StartUnfollow)
                                    for (
                                      E = document.getElementsByTagName("a"),
                                        F = 0;
                                      F < E.length;
                                      F++
                                    )
                                      if (
                                        E[F].getAttribute("href") &&
                                        E[F].getAttribute("href").includes(
                                          "following"
                                        ) &&
                                        !E[F].getAttribute("href").includes(
                                          "hashtag"
                                        )
                                      ) {
                                        E[F].click();
                                        var K = "";
                                        setTimeout(function () {
                                          for (
                                            var w =
                                                document.getElementsByTagName(
                                                  "a"
                                                ),
                                              L = 0;
                                            L < w.length;
                                            L++
                                          )
                                            if (
                                              w[L].getAttribute("class") &&
                                              11 <
                                                w[L].getAttribute("class")
                                                  .length &&
                                              w[L].getAttribute("title") &&
                                              w[L].getAttribute(
                                                "class"
                                              ).includes("notranslate") &&
                                              !IsUserInWhitelist(
                                                w[L].getAttribute("title"),
                                                a.story.Whitelist
                                              ) &&
                                              (!a.story.unfollowInstoo ||
                                                (a.story.unfollowInstoo &&
                                                  a.story.blacklist.includes(
                                                    w[L].getAttribute("title")
                                                  )))
                                            ) {
                                              K = w[L].getAttribute("title");
                                              w[L].parentNode.parentNode
                                                .parentNode &&
                                                w[L].parentNode.parentNode
                                                  .parentNode.nextSibling &&
                                                w[
                                                  L
                                                ].parentNode.parentNode.parentNode.nextSibling.firstElementChild.click();
                                              w[L].parentNode.parentNode
                                                .parentNode.nextSibling &&
                                                w[L].parentNode.parentNode
                                                  .parentNode.parentNode &&
                                                w[L].parentNode.parentNode
                                                  .parentNode.parentNode
                                                  .nextSibling &&
                                                w[
                                                  L
                                                ].parentNode.parentNode.parentNode.parentNode.nextSibling.firstElementChild.click();
                                              w[L].parentNode.parentNode
                                                .parentNode.parentNode
                                                .parentNode &&
                                                w[L].parentNode.parentNode
                                                  .parentNode.parentNode
                                                  .parentNode.nextSibling &&
                                                w[
                                                  L
                                                ].parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.firstElementChild.click();
                                              w[L].parentNode.parentNode
                                                .parentNode.parentNode &&
                                                w[L].parentNode.parentNode
                                                  .parentNode.parentNode
                                                  .nextSibling &&
                                                w[
                                                  L
                                                ].parentNode.parentNode.parentNode.parentNode.nextSibling.firstElementChild.click();
                                              setTimeout(function () {
                                                for (
                                                  var R =
                                                      document.getElementsByTagName(
                                                        "button"
                                                      ),
                                                    X = 0;
                                                  X < R.length;
                                                  X++
                                                )
                                                  if (
                                                    R[X].innerText.includes(
                                                      "Non seguire"
                                                    ) ||
                                                    R[X].innerText.includes(
                                                      "folgen"
                                                    ) ||
                                                    R[X].innerText.includes(
                                                      "Unfollow"
                                                    ) ||
                                                    R[X].innerText.includes(
                                                      "seguir"
                                                    )
                                                  )
                                                    R[
                                                      X
                                                    ].parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild.firstElementChild.getAttribute(
                                                      "src"
                                                    ),
                                                      R[X].click(),
                                                      document.getElementsByTagName(
                                                        "a"
                                                      ),
                                                      SendMessage(
                                                        "UnfollowedUser",
                                                        "User",
                                                        {
                                                          username: K,
                                                          user_id: K,
                                                          full_name: K,
                                                          user_pic_url:
                                                            "assets/images/icon.png",
                                                        }
                                                      ),
                                                      setTimeout(function () {
                                                        for (
                                                          var S =
                                                              document.getElementsByTagName(
                                                                "button"
                                                              ),
                                                            aa = 0;
                                                          aa < S.length;
                                                          aa++
                                                        )
                                                          S[aa].textContent &&
                                                            (S[
                                                              aa
                                                            ].textContent.includes(
                                                              "Report"
                                                            ) ||
                                                              S[
                                                                aa
                                                              ].textContent.includes(
                                                                "Informar"
                                                              ) ||
                                                              S[
                                                                aa
                                                              ].textContent.includes(
                                                                "Rapporto"
                                                              ) ||
                                                              S[
                                                                aa
                                                              ].textContent.includes(
                                                                "Bericht"
                                                              )) &&
                                                            (SendMessage(
                                                              "blocked",
                                                              "blocked",
                                                              JSON.stringify(
                                                                a.story
                                                              )
                                                            ),
                                                            S[aa].click(),
                                                            setTimeout(
                                                              function () {
                                                                window.location.replace(
                                                                  "https://instagram.com/accounts/logout"
                                                                );
                                                              },
                                                              2e3
                                                            ));
                                                      }, 5e3);
                                              }, 2e3);
                                              break;
                                            }
                                        }, O);
                                      }
                                }, ba);
                                break;
                              }
                          }, 2e3));
                    }, ia),
                  0 == a.story.getStats &&
                    a.story.StartLike &&
                    4 < H &&
                    256 > a.story.LikePoolSize &&
                    a.story.LikePoolSize < a.story.maxLikes &&
                    setTimeout(function () {
                      for (
                        var f = document.getElementsByTagName("a"), e = 0;
                        e < f.length;
                        e++
                      )
                        if (
                          f[e] &&
                          f[e].firstElementChild &&
                          f[e].firstElementChild.getAttribute("title") &&
                          f[e].getAttribute("href") &&
                          f[e].getAttribute("href").includes("followers") &&
                          f[e].firstElementChild.getAttribute("title") &&
                          1 <
                            f[e].firstElementChild.getAttribute("title").length
                        ) {
                          var l = parseInt(
                            f[e].firstElementChild
                              .getAttribute("title")
                              .split(",")
                              .join("")
                              .split(".")
                              .join("")
                          );
                          1e3 < l &&
                            1e5 > l &&
                            SendMessage("IdealTarget", "target", {
                              username: G,
                              followers: l,
                            });
                        }
                      f = document.getElementsByTagName("img");
                      for (e = 0; e < f.length; e++) {
                        1 < f[e].src.length && (image_src = f[e].src);
                        if (
                          f[e] &&
                          f[e].getAttribute("style") &&
                          f[e]
                            .getAttribute("style")
                            .includes("object-fit: cover")
                        ) {
                          f[e].click();
                          break;
                        }
                        if (
                          f[e] &&
                          f[e].getAttribute("decoding") &&
                          f[e].getAttribute("decoding").includes("auto")
                        ) {
                          f[e].click();
                          break;
                        }
                      }
                      setTimeout(function () {
                        var p = !1,
                          g = document.getElementsByTagName("svg"),
                          E = 0,
                          F = 0;
                        F = 0;
                        g = document.getElementsByTagName("svg");
                        for (var y = 0; y < g.length; y++)
                          if (
                            "Like" == g[y].getAttribute("aria-label") ||
                            "Gef\u00e4llt mir" ==
                              g[y].getAttribute("aria-label") ||
                            "Mi piace" == g[y].getAttribute("aria-label") ||
                            "To se mi l\u00edb\u00ed" ==
                              g[y].getAttribute("aria-label") ||
                            "J\u2019aime" == g[y].getAttribute("aria-label") ||
                            "Gilla" == g[y].getAttribute("aria-label") ||
                            "Me gusta" == g[y].getAttribute("aria-label") ||
                            "Vind ik leuk" == g[y].getAttribute("aria-label") ||
                            "Gosto" == g[y].getAttribute("aria-label")
                          ) {
                            g[y].parentNode.click();
                            F++;
                            p = !0;
                            y = {
                              caption: "",
                              is_video: !1,
                              media_id: a.story.LikePoolSize,
                              media_src: image_src,
                              shortcode: G,
                            };
                            SendMessage("LikedMedia", "Media", y);
                            setTimeout(function () {
                              for (
                                var J = document.getElementsByTagName("button"),
                                  K = 0;
                                K < J.length;
                                K++
                              )
                                J[K].textContent &&
                                  (J[K].textContent.includes("Report") ||
                                    J[K].textContent.includes("Informar") ||
                                    J[K].textContent.includes("Rapporto") ||
                                    J[K].textContent.includes("Bericht")) &&
                                  (SendMessage(
                                    "blocked",
                                    "blocked",
                                    JSON.stringify(a.story)
                                  ),
                                  J[K].click(),
                                  setTimeout(function () {
                                    window.location.replace(
                                      "https://instagram.com/accounts/logout"
                                    );
                                  }, 2e3));
                            }, 5e3);
                            break;
                          }
                        if (0 == p)
                          for (y = 0; y < g.length; y++)
                            if (
                              !g[y].parentNode.nodeName.includes("A") &&
                              g[y].firstElementChild &&
                              ("M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z" ==
                                g[y].firstElementChild.getAttribute("d") ||
                                "M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z" ==
                                  g[y].firstElementChild.getAttribute("d") ||
                                "M34.3 3.5C27.2 3.5 24 8.8 24 8.8s-3.2-5.3-10.3-5.3C6.4 3.5.5 9.9.5 17.8s6.1 12.4 12.2 17.8c9.2 8.2 9.8 8.9 11.3 8.9s2.1-.7 11.3-8.9c6.2-5.5 12.2-10 12.2-17.8 0-7.9-5.9-14.3-13.2-14.3zm-1 29.8c-5.4 4.8-8.3 7.5-9.3 8.1-1-.7-4.6-3.9-9.3-8.1-5.5-4.9-11.2-9-11.2-15.6 0-6.2 4.6-11.3 10.2-11.3 4.1 0 6.3 2 7.9 4.2 3.6 5.1 1.2 5.1 4.8 0 1.6-2.2 3.8-4.2 7.9-4.2 5.6 0 10.2 5.1 10.2 11.3 0 6.7-5.7 10.8-11.2 15.6z" ==
                                  g[y].firstElementChild.getAttribute("d")) &&
                              (E++, "24" == g[y].getAttribute("width"))
                            ) {
                              g[y].parentNode.click();
                              F++;
                              y = {
                                caption: "",
                                is_video: !1,
                                media_id: a.story.LikePoolSize,
                                media_src: image_src,
                                shortcode: G,
                              };
                              p = !0;
                              SendMessage("LikedMedia", "Media", y);
                              setTimeout(function () {
                                for (
                                  var J =
                                      document.getElementsByTagName("button"),
                                    K = 0;
                                  K < J.length;
                                  K++
                                )
                                  J[K].textContent &&
                                    (J[K].textContent.includes("Report") ||
                                      J[K].textContent.includes("Informar") ||
                                      J[K].textContent.includes("Rapporto") ||
                                      J[K].textContent.includes("Bericht")) &&
                                    (SendMessage(
                                      "blocked",
                                      "blocked",
                                      JSON.stringify(a.story)
                                    ),
                                    J[K].click(),
                                    setTimeout(function () {
                                      window.location.replace(
                                        "https://instagram.com/accounts/logout"
                                      );
                                    }, 2e3));
                              }, 5e3);
                              break;
                            }
                      }, 4e3);
                    }, V));
              }
            }, 2e3);
          }, 2e3);
    }, h);
  } else
    "DoGetJob" == a.Tag
      ? DoGetJob(a.Job)
      : "userLogin" == a.Tag
      ? ((ha = ""),
        (W = document.getElementsByTagName("a")),
        (d = getCookie("csrftoken")),
        (n = getCookie("ds_user_id")),
        (CurrentUser = { CSRF: d }),
        (h = getRandomInt(1e3, 3500)),
        (v = getRandomInt(1e3, 3500)),
        (user_id = n),
        (CurrentUser.user_id = n),
        (CurrentUser.user_pic_url = "assets/images/icon.png"),
        (CurrentUser.username = window.location.href.split("/")[3]),
        SendMessage("CurrentUserUpdate", "User", CurrentUser),
        setTimeout(function () {
          for (
            var m = document.getElementsByTagName("a"), G = 0;
            G < m.length;
            G++
          )
            if (
              m[G].firstElementChild &&
              "undefined" != typeof m[G].parentNode.parentNode &&
              m[G].getAttribute("href") &&
              m[G].firstElementChild.getAttribute("title") &&
              m[G].parentNode.parentNode.children[2].firstElementChild
                .firstElementChild &&
              m[G].parentNode.parentNode.children[2].firstElementChild
                .firstElementChild.innerText &&
              m[G].parentNode.parentNode.children[0].firstElementChild
                .firstElementChild &&
              m[G].parentNode.parentNode.children[0].firstElementChild
                .firstElementChild.innerText &&
              (m[G].getAttribute("href").includes("followers") ||
                m[G].getAttribute("href").includes("seguidores"))
            ) {
              SendMessage("gotStats", "followers", {
                CurrentUser: CurrentUser,
                followers: m[G].firstElementChild
                  .getAttribute("title")
                  .split(" ")
                  .join("")
                  .split(",")
                  .join("")
                  .split(".")
                  .join(""),
                following: m[
                  G
                ].parentNode.parentNode.children[2].firstElementChild.firstElementChild.innerText
                  .split(" ")
                  .join("")
                  .split(",")
                  .join("")
                  .split(".")
                  .join(""),
                posts: m[
                  G
                ].parentNode.parentNode.children[0].firstElementChild.firstElementChild.innerText
                  .split(" ")
                  .join("")
                  .split(",")
                  .join("")
                  .split(".")
                  .join(""),
              });
              break;
            }
        }, 5e3))
      : "CollectJobStatus" == a.Tag
      ? OnReceiveCollectJobStatus(a.Status)
      : "SendUserHeader" == a.Tag
      ? RetriveCurrentUserInfo(a.firstTime)
      : "DoCollectFollowings" == a.Tag
      ? DoCollectFollowings(a.Job)
      : "UnfollowUser" == a.Tag
      ? UnfollowUser(a.User)
      : "DoCollectMediaFromTag" == a.Tag
      ? DoCollectMediaFromTag(a.MediaTag)
      : "AddUserToWhitelistName" == a.Tag
      ? ((d = new User(
          a.username,
          "-1",
          a.username,
          "assets/images/icon.png",
          0
        )),
        SendMessage("AddUserToWhitelistContent", "user", d))
      : "DoCollectMediaFromLocation" == a.Tag
      ? DoCollectMediaFromLocation(a.MediaTag)
      : "DoCollectMediaFromAccount" != a.Tag &&
        ("DoLikeMedia" == a.Tag
          ? DoLikeMedia(a.Media)
          : "DoCommentMedia" == a.Tag && DoCommentMedia(a.Media));
}
function OnReceiveCollectJobStatus(a) {
  $("#instabaiter-inject");
  var n = $("#collect-followers-instafollow");
  a
    ? ($(n).attr("insta", "true"), $(n).text("Stop Grabbing Followers"))
    : ($(n).attr("insta", "false"), $(n).text("Grab Followers"));
  $(n).prop("disabled", !1);
}
function CreateCollectFollowersButton() {
  $("#instabaiter-inject").remove();
  var a = $("#collect-followers-instafollow");
  $(a).click(OnClickCollectFollowers);
}
function OnClickCollectFollowers() {
  var a = $(UserTag).text();
  GetCurrentPageUserData(a, function (n) {
    var d = $("#collect-followers-instafollow");
    $(d).prop("disabled", !0);
    "false" == $(d).attr("insta")
      ? ((d = {}),
        (d.user_id = n.user_id),
        (d.cursor_key = null),
        (d.user = n),
        SendMessage("AddCollectJob", "Job", d))
      : SendMessage("RemoveCollectJob", "user_id", n.user_id);
    SendMessage("RequestCollectJobStatus", "user_id", n.user_id);
  });
}
function DoLikeMedia(a) {
  LikeMedia(a);
}
function DoCommentMedia(a) {
  CommentMedia(a);
}
function DoCollectMediaFromTag(a) {
  CollectMediaFromTag(a, function (n) {
    0 < n.length && SendMessage("AddMedia", "Medias", n);
  });
}
function DoCollectMediaFromLocation(a) {
  CollectMediaFromLocation(a, function (n) {
    0 < n.length && SendMessage("AddMedia", "Medias", n);
  });
}
function DoCollectMediaFromAccount(a) {}
function DoGetJob(a) {
  CollectUsersFromOnce(a, function (n) {
    0 < n.length && SendMessage("GotFollowers", "Users", n);
  });
}
function DoCollectJob(a) {
  CollectUsersFrom(a, function (n) {
    0 < n.length && SendMessage("AddUsers", "Users", n);
  });
}
var user_id;
function RetriveUserHeaders() {
  var a = getCookie("csrftoken"),
    n = getCookie("ds_user_id");
  CurrentUser = { CSRF: a };
  SendMessage("GetUserHeader", "User", n);
  user_id = n;
}
function DoCollectFollowings(a) {
  CollectFollowings(a.user_id, a.cursor_key, function (n) {
    n && 0 < n.length && SendMessage("AddFollowings", "Users", n);
  });
}
function GetCurrentPageUserData(a, n) {
  n(null);
}
function RetriveCurrentUserInfo(a) {
  var n = "",
    d = document.getElementsByTagName("a");
  a = getCookie("csrftoken");
  var V = getCookie("ds_user_id");
  CurrentUser = { CSRF: a };
  var M = getRandomInt(1e3, 3500);
  a = getRandomInt(1e3, 3500);
  user_id = V;
  window.location.href.includes("stories") &&
    (window.location.href = "https://instagram.com");
  for (var B = 0; B < d.length; B++)
    if (d[B].getAttribute("href") && "/" == d[B].getAttribute("href")) {
      "undefined" != typeof d[B].parentNode.parentNode.parentNode &&
        "undefined" !=
          typeof d[B].parentNode.parentNode.parentNode.children[0] &&
        "undefined" !=
          typeof d[B].parentNode.parentNode.parentNode.children[0]
            .children[2] &&
        "undefined" !=
          typeof d[B].parentNode.parentNode.parentNode.children[0].children[2]
            .children[0] &&
        "undefined" !=
          typeof d[B].parentNode.parentNode.parentNode.children[0].children[2]
            .children[0].children[4] &&
        "undefined" !=
          typeof d[B].parentNode.parentNode.parentNode.children[0].children[2]
            .children[0].children[4].children[1] &&
        d[
          B
        ].parentNode.parentNode.parentNode.children[0].children[2].children[0].children[4].children[1].click();
      "undefined" != typeof d[B].parentNode.parentNode.parentNode &&
        "undefined" !=
          typeof d[B].parentNode.parentNode.parentNode.children[0] &&
        "undefined" !=
          typeof d[B].parentNode.parentNode.parentNode.children[0]
            .children[2] &&
        "undefined" !=
          typeof d[B].parentNode.parentNode.parentNode.children[0].children[2]
            .children[0] &&
        "undefined" !=
          typeof d[B].parentNode.parentNode.parentNode.children[0].children[2]
            .children[0].children[4] &&
        "undefined" !=
          d[B].parentNode.parentNode.parentNode.children[0].children[2]
            .children[0].children[4].children[1] &&
        "undefined" !=
          typeof d[B].parentNode.parentNode.parentNode.children[0].children[2]
            .children[0].children[4].children[1].children[0] &&
        d[
          B
        ].parentNode.parentNode.parentNode.children[0].children[2].children[0].children[4].children[1].children[0].getAttribute(
          "src"
        );
      setTimeout(function () {
        setTimeout(function () {
          for (
            var h = document.getElementsByTagName("a"), v = 0;
            v < h.length;
            v++
          )
            if (
              ((h = document.getElementsByTagName("a")),
              h[v].getAttribute("href") && "/" == h[v].getAttribute("href"))
            ) {
              "undefined" != typeof h[v].parentNode.parentNode.parentNode &&
                "undefined" !=
                  typeof h[v].parentNode.parentNode.parentNode.children[0] &&
                "undefined" !=
                  typeof h[v].parentNode.parentNode.parentNode.children[0]
                    .children[2] &&
                "undefined" !=
                  typeof h[v].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4] &&
                "undefined" !=
                  typeof h[v].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4].children[2] &&
                "undefined" !=
                  typeof h[v].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4].children[2]
                    .children[0] &&
                "undefined" !=
                  typeof h[v].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4].children[2].children[0]
                    .children[1] &&
                "undefined" !=
                  typeof h[v].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4].children[2].children[0]
                    .children[1].children[1] &&
                "undefined" !=
                  typeof h[v].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4].children[2].children[0]
                    .children[1].children[1].children[0] &&
                h[
                  v
                ].parentNode.parentNode.parentNode.children[0].children[2].children[0].children[4].children[2].children[0].children[1].children[1].children[0].getAttribute(
                  "href"
                ) &&
                h[v].parentNode.parentNode.parentNode.children[0].children[2]
                  .children[0].children[4].children[2].children[0].children[1]
                  .children[1].children[0] &&
                h[
                  v
                ].parentNode.parentNode.parentNode.children[0].children[2].children[0].children[4].children[2].children[0].children[1].children[1].children[0].getAttribute(
                  "href"
                ) &&
                (n = h[
                  v
                ].parentNode.parentNode.parentNode.children[0].children[2].children[0].children[4].children[2].children[0].children[1].children[1].children[0]
                  .getAttribute("href")
                  .split("/")
                  .join(""));
              "undefined" != typeof h[v].parentNode.parentNode.parentNode &&
                "undefined" !=
                  typeof h[v].parentNode.parentNode.parentNode.children[0] &&
                "undefined" !=
                  typeof h[v].parentNode.parentNode.parentNode.children[0]
                    .children[2] &&
                "undefined" !=
                  typeof h[v].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0] &&
                "undefined" !=
                  typeof h[v].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4] &&
                "undefined" !=
                  typeof h[v].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4].children[2] &&
                "undefined" !=
                  typeof h[v].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4].children[2]
                    .children[0] &&
                "undefined" !=
                  typeof h[v].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4].children[2].children[0]
                    .children[1] &&
                "undefined" !=
                  typeof h[v].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4].children[2].children[0]
                    .children[1].children[1] &&
                "undefined" !=
                  typeof h[v].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4].children[2].children[0]
                    .children[1].children[1].children[0] &&
                h[
                  v
                ].parentNode.parentNode.parentNode.children[0].children[2].children[0].children[4].children[2].children[0].children[1].children[1].children[0].getAttribute(
                  "href"
                ) &&
                h[v].parentNode.parentNode.parentNode.children[0].children[2]
                  .children[0].children[4].children[2].children[0].children[1]
                  .children[1].children[0] &&
                h[
                  v
                ].parentNode.parentNode.parentNode.children[0].children[2].children[0].children[4].children[2].children[0].children[1].children[1].children[0].getAttribute(
                  "href"
                ) &&
                ((n = h[
                  v
                ].parentNode.parentNode.parentNode.children[0].children[2].children[0].children[4].children[2].children[0].children[1].children[1].children[0]
                  .getAttribute("href")
                  .split("/")
                  .join("")),
                h[
                  v
                ].parentNode.parentNode.parentNode.children[0].children[2].children[0].children[4].children[2].children[0].children[1].children[1].children[0].click());
              if (0 < n.length) {
                CurrentUser.user_id = V;
                CurrentUser.user_pic_url = "assets/images/icon.png";
                CurrentUser.username = n;
                SendMessage("CurrentUserUpdate", "User", CurrentUser);
                break;
              }
              setTimeout(function () {
                for (
                  var C = document.getElementsByTagName("a"), O = 0;
                  O < C.length;
                  O++
                )
                  if (
                    C[O].firstElementChild &&
                    "undefined" != typeof C[O].parentNode.parentNode &&
                    C[O].getAttribute("href") &&
                    C[O].firstElementChild.getAttribute("title") &&
                    C[O].parentNode.parentNode.children[2].firstElementChild
                      .firstElementChild &&
                    C[O].parentNode.parentNode.children[2].firstElementChild
                      .firstElementChild.innerText &&
                    C[O].parentNode.parentNode.children[0].firstElementChild
                      .firstElementChild &&
                    C[O].parentNode.parentNode.children[0].firstElementChild
                      .firstElementChild.innerText &&
                    (C[O].getAttribute("href").includes("followers") ||
                      C[O].getAttribute("href").includes("seguidores"))
                  ) {
                    SendMessage("gotStats", "followers", {
                      CurrentUser: CurrentUser,
                      followers: C[O].firstElementChild
                        .getAttribute("title")
                        .split(" ")
                        .join("")
                        .split(",")
                        .join("")
                        .split(".")
                        .join(""),
                      following: C[
                        O
                      ].parentNode.parentNode.children[2].firstElementChild.firstElementChild.innerText
                        .split(" ")
                        .join("")
                        .split(",")
                        .join("")
                        .split(".")
                        .join(""),
                      posts: C[
                        O
                      ].parentNode.parentNode.children[0].firstElementChild.firstElementChild.innerText
                        .split(" ")
                        .join("")
                        .split(",")
                        .join("")
                        .split(".")
                        .join(""),
                    });
                    break;
                  }
              }, 3e3);
              break;
            }
        }, M);
        setTimeout(function () {
          for (var h = 0; h < d.length; h++)
            if (d[h].getAttribute("href") && "/" == d[h].getAttribute("href")) {
              "undefined" != typeof d[h].parentNode.parentNode.parentNode &&
                "undefined" !=
                  typeof d[h].parentNode.parentNode.parentNode.children[0] &&
                "undefined" !=
                  typeof d[h].parentNode.parentNode.parentNode.children[0]
                    .children[2] &&
                "undefined" !=
                  typeof d[h].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4] &&
                "undefined" !=
                  typeof d[h].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4].children[2] &&
                "undefined" !=
                  typeof d[h].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4].children[2]
                    .children[1] &&
                "undefined" !=
                  typeof d[h].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4].children[2].children[1]
                    .children[1] &&
                "undefined" !=
                  typeof d[h].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4].children[2].children[1]
                    .children[1].children[0] &&
                d[
                  h
                ].parentNode.parentNode.parentNode.children[0].children[2].children[0].children[4].children[2].children[1].children[1].children[0].getAttribute(
                  "href"
                ) &&
                d[h].parentNode.parentNode.parentNode.children[0].children[2]
                  .children[0].children[4].children[2].children[1].children[1]
                  .children[0] &&
                d[
                  h
                ].parentNode.parentNode.parentNode.children[0].children[2].children[0].children[4].children[2].children[1].children[1].children[0].getAttribute(
                  "href"
                ) &&
                (n = d[
                  h
                ].parentNode.parentNode.parentNode.children[0].children[2].children[0].children[4].children[2].children[1].children[1].children[0]
                  .getAttribute("href")
                  .split("/")
                  .join(""));
              if (
                0 < n.length &&
                "undefined" !=
                  typeof d[h].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4].children[2].children[1]
                    .children[1].children[0] &&
                "undefined" !=
                  typeof d[h].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4].children[2].children[1]
                    .children[1] &&
                "undefined" !=
                  typeof d[h].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4].children[2]
                    .children[1] &&
                "undefined" !=
                  typeof d[h].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4].children[2] &&
                "undefined" !=
                  typeof d[h].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4] &&
                "undefined" !=
                  typeof d[h].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0] &&
                "undefined" !=
                  typeof d[h].parentNode.parentNode.parentNode.children[0]
                    .children[2] &&
                "undefined" !=
                  typeof d[h].parentNode.parentNode.parentNode.children[0] &&
                "undefined" != typeof d[h].parentNode.parentNode.parentNode
              ) {
                CurrentUser.user_id = V;
                CurrentUser.user_pic_url = "assets/images/icon.png";
                CurrentUser.username = n;
                SendMessage("CurrentUserUpdate", "User", CurrentUser);
                d[
                  h
                ].parentNode.parentNode.parentNode.children[0].children[2].children[0].children[4].children[2].children[1].children[1].children[0].click();
                setTimeout(function () {
                  for (
                    var v = document.getElementsByTagName("a"), C = 0;
                    C < v.length;
                    C++
                  )
                    if (
                      "undefined" != typeof v[C].parentNode.parentNode &&
                      v[C] &&
                      v[C].getAttribute("href") &&
                      v[C].firstElementChild &&
                      v[C].firstElementChild.getAttribute("title") &&
                      "undefined" != typeof v[C].parentNode.parentNode &&
                      v[C].parentNode.parentNode.children[2].firstElementChild
                        .firstElementChild &&
                      v[C].parentNode.parentNode.children[2].firstElementChild
                        .firstElementChild.innerText &&
                      v[C].parentNode.parentNode.children[0].firstElementChild
                        .firstElementChild &&
                      v[C].parentNode.parentNode.children[0].firstElementChild
                        .firstElementChild.innerText &&
                      (v[C].getAttribute("href").includes("followers") ||
                        v[C].getAttribute("href").includes("seguidores")) &&
                      v[C].firstElementChild
                    ) {
                      SendMessage("gotStats", "followers", {
                        CurrentUser: CurrentUser,
                        followers: v[C].firstElementChild
                          .getAttribute("title")
                          .split(" ")
                          .join("")
                          .split(",")
                          .join("")
                          .split(".")
                          .join(""),
                        following: v[
                          C
                        ].parentNode.parentNode.children[2].firstElementChild.firstElementChild.innerText
                          .split(" ")
                          .join("")
                          .split(",")
                          .join("")
                          .split(".")
                          .join(""),
                        posts: v[
                          C
                        ].parentNode.parentNode.children[0].firstElementChild.firstElementChild.innerText
                          .split(" ")
                          .join("")
                          .split(",")
                          .join("")
                          .split(".")
                          .join(""),
                      });
                      break;
                    }
                }, 3e3);
                break;
              }
              break;
            }
        }, 500);
      }, a);
      break;
    }
}
function RetriveCurrentUserInfoManual(a) {
  var n = "";
  a = document.getElementsByTagName("a");
  var d = getCookie("csrftoken"),
    V = getCookie("ds_user_id");
  CurrentUser = { CSRF: d };
  d = !1;
  window.location.href.includes("stories") &&
    (window.location.href = "https://instagram.com");
  for (
    var M = 0;
    M < a.length &&
    (!a[M].getAttribute("href") ||
      "/" != a[M].getAttribute("href") ||
      ("undefined" !=
        typeof a[M].parentNode.parentNode.parentNode.children[0].children[2]
          .children[0].children[4].children[1] &&
        "undefined" !=
          typeof a[M].parentNode.parentNode.parentNode.children[0].children[2]
            .children[0].children[4] &&
        "undefined" !=
          typeof a[M].parentNode.parentNode.parentNode.children[0].children[2]
            .children[0] &&
        "undefined" !=
          typeof a[M].parentNode.parentNode.parentNode.children[0]
            .children[2] &&
        "undefined" !=
          typeof a[M].parentNode.parentNode.parentNode.children[0] &&
        "undefined" != typeof a[M].parentNode.parentNode.parentNode &&
        (a[
          M
        ].parentNode.parentNode.parentNode.children[0].children[2].children[0].children[4].children[1].click(),
        (d = !0)),
      a[M].parentNode.parentNode.parentNode.children[0].children[2].children[0]
        .children[4].children[1].children[0] &&
        "undefined" !=
          typeof a[M].parentNode.parentNode.parentNode.children[0].children[2]
            .children[0].children[4].children[1].children[0] &&
        a[
          M
        ].parentNode.parentNode.parentNode.children[0].children[2].children[0].children[4].children[1].children[0].getAttribute(
          "src"
        ),
      setTimeout(function () {
        setTimeout(function () {
          for (
            var B = document.getElementsByTagName("a"), h = 0;
            h < B.length;
            h++
          )
            if (
              ((B = document.getElementsByTagName("a")),
              B[h].getAttribute("href") && "/" == B[h].getAttribute("href"))
            ) {
              B[h].parentNode.parentNode.parentNode.children[0].children[2]
                .children[0].children[4].children[2].children[0].children[1]
                .children[1].children[0] &&
                "undefined" != typeof B[h].parentNode.parentNode.parentNode &&
                "undefined" !=
                  typeof B[h].parentNode.parentNode.parentNode.children[0] &&
                "undefined" !=
                  typeof B[h].parentNode.parentNode.parentNode.children[0]
                    .children[2] &&
                "undefined" !=
                  typeof B[h].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4] &&
                "undefined" !=
                  typeof B[h].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4].children[2] &&
                "undefined" !=
                  typeof B[h].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4].children[2]
                    .children[0] &&
                "undefined" !=
                  typeof B[h].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4].children[2].children[0]
                    .children[1] &&
                "undefined" !=
                  typeof B[h].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4].children[2].children[0]
                    .children[1].children[1] &&
                "undefined" !=
                  typeof B[h].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4].children[2].children[0]
                    .children[1].children[1].children[0] &&
                B[
                  h
                ].parentNode.parentNode.parentNode.children[0].children[2].children[0].children[4].children[2].children[0].children[1].children[1].children[0].getAttribute(
                  "href"
                ) &&
                B[h].parentNode.parentNode.parentNode.children[0].children[2]
                  .children[0].children[4].children[2].children[0].children[1]
                  .children[1].children[0] &&
                (n = B[
                  h
                ].parentNode.parentNode.parentNode.children[0].children[2].children[0].children[4].children[2].children[0].children[1].children[1].children[0]
                  .getAttribute("href")
                  .split("/")
                  .join(""));
              B[h].parentNode.parentNode.parentNode.children[0].children[2]
                .children[0].children[4].children[2].children[0].children[1]
                .children[1].children[0] &&
                "undefined" != typeof B[h].parentNode.parentNode.parentNode &&
                "undefined" !=
                  typeof B[h].parentNode.parentNode.parentNode.children[0] &&
                "undefined" !=
                  typeof B[h].parentNode.parentNode.parentNode.children[0]
                    .children[2] &&
                "undefined" !=
                  typeof B[h].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0] &&
                "undefined" !=
                  typeof B[h].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4] &&
                "undefined" !=
                  typeof B[h].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4].children[2] &&
                "undefined" !=
                  typeof B[h].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4].children[2]
                    .children[0] &&
                "undefined" !=
                  typeof B[h].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4].children[2].children[0]
                    .children[1] &&
                "undefined" !=
                  typeof B[h].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4].children[2].children[0]
                    .children[1].children[1] &&
                "undefined" !=
                  typeof B[h].parentNode.parentNode.parentNode.children[0]
                    .children[2].children[0].children[4].children[2].children[0]
                    .children[1].children[1].children[0] &&
                B[
                  h
                ].parentNode.parentNode.parentNode.children[0].children[2].children[0].children[4].children[2].children[0].children[1].children[1].children[0].getAttribute(
                  "href"
                ) &&
                B[h].parentNode.parentNode.parentNode.children[0].children[2]
                  .children[0].children[4].children[2].children[0].children[1]
                  .children[1].children[0] &&
                ((n = B[
                  h
                ].parentNode.parentNode.parentNode.children[0].children[2].children[0].children[4].children[2].children[0].children[1].children[1].children[0]
                  .getAttribute("href")
                  .split("/")
                  .join("")),
                B[
                  h
                ].parentNode.parentNode.parentNode.children[0].children[2].children[0].children[4].children[2].children[0].children[1].children[1].children[0].click());
              0 < n.length &&
                ((CurrentUser.user_id = V),
                (CurrentUser.user_pic_url = "assets/images/icon.png"),
                (CurrentUser.username = n),
                SendMessage("CurrentUserUpdate", "User", CurrentUser));
              setTimeout(function () {
                for (
                  var v = document.getElementsByTagName("a"), C = 0;
                  C < v.length;
                  C++
                )
                  v[C].firstElementChild &&
                    v[C].getAttribute("href") &&
                    v[C].firstElementChild.getAttribute("title") &&
                    v[C].parentNode.parentNode.children[2].firstElementChild
                      .firstElementChild &&
                    v[C].parentNode.parentNode.children[2].firstElementChild
                      .firstElementChild.innerText &&
                    v[C].parentNode.parentNode.children[0].firstElementChild
                      .firstElementChild &&
                    v[C].parentNode.parentNode.children[0].firstElementChild
                      .firstElementChild.innerText &&
                    (v[C].getAttribute("href").includes("followers") ||
                      v[C].getAttribute("href").includes("seguidores")) &&
                    SendMessage("gotStats", "followers", {
                      CurrentUser: CurrentUser,
                      followers: v[C].firstElementChild
                        .getAttribute("title")
                        .split(" ")
                        .join("")
                        .split(",")
                        .join("")
                        .split(".")
                        .join(""),
                      following: v[
                        C
                      ].parentNode.parentNode.children[2].firstElementChild.firstElementChild.innerText
                        .split(" ")
                        .join("")
                        .split(",")
                        .join("")
                        .split(".")
                        .join(""),
                      posts: v[
                        C
                      ].parentNode.parentNode.children[0].firstElementChild.firstElementChild.innerText
                        .split(" ")
                        .join("")
                        .split(",")
                        .join("")
                        .split(".")
                        .join(""),
                    });
              }, 3e3);
              break;
            }
        }, 500);
      }, 1e3),
      !d));
    M++
  );
}