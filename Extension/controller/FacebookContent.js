class FacebookContent extends ContentClass {
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

  scrollLike(num) {
    var t1 = parseInt(Math.floor(Math.random() * 30000) + 1000);

    setTimeout(function () {
      window.scrollTo(0, document.body.scrollHeight);
      var total = 0;
      var videos = document.getElementsByTagName("div");

      for (var kk = 0; kk < videos.length; kk++) {
        //console.log(videos[kk]);
        //console.log(videos[kk].getAttribute("class"));
        if (
          videos[kk] &&
          videos[kk].getAttribute("aria-label") &&
          videos[kk].getAttribute("aria-label").includes("Add Friend")
        ) {
          total++;
        }
      }

      var counter = 0;
      var vid = parseInt(Math.floor(Math.random() * total) + 1);

      for (var kk = 0; kk < videos.length; kk++) {
        //console.log(videos[kk]);
        //console.log(videos[kk].getAttribute("class"));
        if (
          videos[kk] &&
          videos[kk].getAttribute("aria-label") &&
          videos[kk].getAttribute("aria-label").includes("Add Friend")
        ) {
          counter++;
          if (vid == counter) {
            videos[kk].click();
            var msg_data = {
              url:
                "https://facebook.com/" +
                videos[
                  kk
                ].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].children[0].children[0].children[0].getAttribute(
                  "href"
                ),
              username:
                videos[kk].parentNode.parentNode.parentNode.parentNode
                  .parentNode.children[0].innerText,
              img: videos[
                kk
              ].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].children[0].children[0].children[0].children[0].children[0].children[1].children[0].getAttribute(
                "xlink:href"
              ),
            };
            this.SendMessage("DonefacebookFollow", "User", msg_data);
            window.scrollTo(0, document.body.scrollHeight);

            break;
          }
        }
      }

      if (num > 0) {
        this.scrollLike(num - 1);
      }
    }, t1);
  }

  OnMessageReceive(msg) {
    console.log(msg);

    if (msg.Tag == "Updatefacebook") {
      console.log(msg.story);
    } else if (msg.Tag == "LikeFollow") {
      window.scrollTo(0, document.body.scrollHeight);

      if (
        msg.story.StartfacebookFollow &&
        msg.story.FollowedPoolfacebookSize < msg.story.MaxfacebookFollows
      ) {
        this.scrollLike(5);
      }
    }
  }
}

var Comport;
var CurrentUser;
var facebookContent = new FacebookContent({
  Comport:Comport,
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
  name: "facebook",
});

$(document).ready(function () {
  facebookContent.CreateComport();
  console.log("SETUp!");
  if (window.location.href.includes("tag")) {
    window.scrollTo(0, document.body.scrollHeight);

    //  scrollTop(20);
  }
});
