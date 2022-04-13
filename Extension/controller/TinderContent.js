class TinderContent extends ContentClass {
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
    super({
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
    });
  }

  OnMessageReceive(msg) {
    //console.log(msg);

    if (msg.Tag == "UpdateTinder") {
    } else if (msg.Tag == "LikeFollow") {
      console.log(msg.story);

      console.log(msg);

      if (
        msg.story.StartTinderLike &&
        msg.story.LikedMediaTinderSize < msg.story.MaxTinderLikes
      ) {
        setTimeout(function () {
          var username;
          var img;
          var span = document.getElementsByTagName("span");
          for (var kk = 0; kk < span.length; kk++) {
            if (span[kk].getAttribute("itemprop") == "name") {
              username = span[kk].innerText;
            }
          }

          var span = document.getElementsByTagName("div");
          for (var kk = 0; kk < span.length; kk++) {
            if (
              span[kk].getAttribute("aria-label") == username &&
              span[kk].getAttribute("style")
            ) {
              img = span[kk].getAttribute("style").split('"')[1];
            }
          }
          console.log(img);
          console.log(username);
          var msg_data = { url: "tinder.com", username: username, img: img };
          var buttons = document.getElementsByTagName("button");
          for (var kk = 0; kk < buttons.length; kk++) {
            //Super Like
            console.log(buttons[kk]);
            if (
              buttons[kk].innerHTML.includes("Like") &&
              !buttons[kk].innerHTML.includes("Super Like")
            ) {
              buttons[kk].click();
              console.log(buttons[kk]);
              break;
            }
          }

          this.SendMessage("DoneTinderLike", "User", msg_data);
          setTimeout(function () {
            var buttons = document.getElementsByTagName("button");
            for (var kk = 0; kk < buttons.length; kk++) {
              //Super Like
              //console.log(buttons[kk].innerText);
              if (buttons[kk].innerText.includes("NO THANKS")) {
                buttons[kk].click();
                // console.log(buttons[kk]);
                break;
              }
            }
          }, 5000);
        }, 4000);
      }
    }
  }
}

var Comport;
var CurrentUser;
var tinderContent = new TinderContent({
  Comport: Comport,
  CurrrentUser: CurrentUser,
  LastUsername: "",
  SharedData: null,
  UserTag: "._7UhW9",
  StarStory: false,
  msg_user: "",
  tag_dict: {},
  account_dict: {},
  image_src: "",
  story_sect: {},
  name: "tinder",
});

$(document).ready(function () {
  tinderContent.CreateComport();
  console.log("SETUp!");
  if (window.location.href.includes("tag")) {
    window.scrollTo(0, document.body.scrollHeight);

    tinderContent.scrollTop(20);
  }
});
