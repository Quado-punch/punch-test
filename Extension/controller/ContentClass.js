class ContentClass {
  constructor({
    Comport,
    CurrrentUser,
    LastUsername,
    SharedData,
    UserTag,
    StarStory,
    msg_user,
    tag_dict,
    account_dict,
    image_src,
    story_sect,
    name,
  }) {
    this.Comport = Comport;
    this.CurrrentUser = CurrrentUser;
    this.LastUsername = LastUsername;
    this.SharedData = SharedData;
    this.UserTag = UserTag;
    this.StarStory = StarStory;
    this.msg_user = msg_user;
    this.tag_dict = tag_dict;
    this.account_dict = account_dict;
    this.image_src = image_src;
    this.story_sect = story_sect;
    this.name = name;
  }

  CreateComport() {
    this.Comport = chrome.runtime.connect({
      name: this.name,
    });
    this.Comport.onMessage.addListener(this.OnMessageReceive);
    window.addEventListener(
      "message",
      function (event) {
        if (event.source != window) return;

        if (event.data && event.data.Tag === "SharedData") {
          this.SharedData = event.data.SharedData;
        }
      },
      false
    );
  }

  SendMessage(tag, msgTag, msg) {
    var sendObj = {
      Tag: tag,
    };
    sendObj[msgTag] = msg;
    this.Comport.postMessage(sendObj);
  }

  scrollTop(starter) {
    if (starter > 0) {
      window.scrollTo(0, document.body.scrollHeight);
      setTimeout(function () {
        scrollTop(starter - 1);
      }, 300);
    }
  }
}

class User {
  constructor(username, user_id, full_name, user_pic_url, followed_time) {
    this.username = username;
    this.user_id = user_id;
    this.full_name = full_name;
    this.user_pic_url = user_pic_url;
    this.followed_time = followed_time;
  }
}

class MediaTag {
  constructor(tag_name, cursor_key, eof) {
    this.tag_name = tag_name;
    this.cursor_key = cursor_key;
    this.eof = eof;
  }
}

//utility functions
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

function IsUserInWhitelist(a, n) {
  for (var d = 0; d < n.length; d++) if (n[d].username == a) return !0;
  return !1;
}

