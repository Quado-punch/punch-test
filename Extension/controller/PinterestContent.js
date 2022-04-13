class PinterestContent extends ContentClass {
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

    if (msg.Tag == "UpdatePinterest") {
      //console.log(msg.story);
      if (true) {
        //console.log("Start");

        var videos = document.getElementsByTagName("a");
        for (var kk = 0; kk < videos.length; kk++) {
          //console.log(videos[kk]);
          //console.log(videos[kk].getAttribute("class"));
          if (videos[kk].getAttribute("class").includes("result-item")) {
            //console.log(videos[kk].getAttribute("href"));

            this.SendMessage(
              "PinterestTarget",
              "target",
              videos[kk].getAttribute("href")
            );
          }
        }
      }
    } else if (msg.Tag == "LikeFollow") {
      //console.log(msg.story);
      this.SendMessage("DonePinterest", "target", "window.location.href");
      var vid = parseInt(Math.floor(Math.random() * 20) + 1);
      //console.log(vid);
      var counter = 0;
      var videos = document.getElementsByTagName("a");
      for (var kk = 0; kk < videos.length; kk++) {
        //console.log(counter);
        if (
          videos[kk].getAttribute("href") &&
          videos[kk].getAttribute("href").includes("/pin/")
        ) {
          counter++;
          if (counter == vid) {
            videos[kk].click();

            setTimeout(function () {
              var username = window.location.href.split("/")[3];
              //  //console.log(window.location.href.split("/"));
              var url = window.location.href;

              var img = "https://instoo.com/logo.png";
              var videos = document.getElementsByTagName("img");
              var counter = 0;
              for (var kk = 0; kk < videos.length; kk++) {
                if (
                  videos[kk].getAttribute("src") &&
                  videos[kk].getAttribute("src").includes("pinimg")
                ) {
                  counter++;
                  if (counter == 2) {
                    img = videos[kk].src;

                    break;
                  }
                }
              }
              //   //console.log(img);

              var videos = document.getElementsByTagName("div");
              for (var kk = 0; kk < videos.length; kk++) {
                if (
                  videos[kk].getAttribute("data-test-id") &&
                  videos[kk]
                    .getAttribute("data-test-id")
                    .includes("creator-profile-name")
                ) {
                  username = videos[kk].innerText;
                  break;
                }
              }
              //   //console.log(username);
              var msg_data = {
                url: url,
                username: username,
                img: img,
                website: "none",
                twitter: "none",
                sales: 0,
                email: "none",
                connected: "none",
              };
              console.log(msg_data);
              this.SendMessage("DonePinterestData", "User", msg_data);

              if (
                msg.story.StartPinterestFollow &&
                msg.story.FollowedPoolPinterestSize <
                  msg.story.MaxPinterestFollows
              ) {
                //setTimeout(function() {
                var buttons = document.getElementsByTagName("button");
                //console.log(buttons);
                for (var jj = 0; jj < buttons.length; jj++) {
                  if (
                    buttons[jj].innerText.includes("Follow") &&
                    !buttons[jj].innerText.includes("Following")
                  ) {
                    buttons[jj].click();
                    break;
                  }
                }

                //data-test-id="creator-profile-name"

                var url = window.location.href;

                //console.log(img);
                //console.log(username);
                var msg_data = {
                  url: url,
                  username: username,
                  img: img,
                };
                this.SendMessage("DonePinterestFollow", "User", msg_data);

                //}, 2000);
              }

              if (
                msg.story.StartPinterestLike &&
                msg.story.LikedMediaPinterestSize < msg.story.MaxPinterestLikes
              ) {
                setTimeout(function () {
                  var buttons = document.getElementsByTagName("div");
                  //console.log(buttons);
                  for (var jj = 0; jj < buttons.length; jj++) {
                    if (
                      buttons[jj].getAttribute("class") &&
                      buttons[jj]
                        .getAttribute("class")
                        .includes("engagement-icon")
                    ) {
                      buttons[jj].click();
                      break;
                    }
                  }
                  var buttons = document.getElementsByTagName("button");
                  //console.log(buttons);
                  for (var jj = 0; jj < buttons.length; jj++) {
                    if (
                      buttons[jj].getAttribute("aria-label") &&
                      buttons[jj]
                        .getAttribute("aria-label")
                        .includes("reaction")
                    ) {
                      buttons[jj].click();
                      break;
                    }
                  }
                  var url = window.location.href;

                  //console.log(img);
                  //console.log(username);
                  var msg_data = {
                    url: url,
                    username: username,
                    img: img,
                  };

                  this.SendMessage("DonePinterestLike", "User", msg_data);
                }, 4000);
              }
            }, 5000);

            break;
          }
        }
      }
    }
  }
}

var ComPort;
var CurrentUser;
var pinterestContent = new PinterestContent({
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
  story_sect: false,
  name: "pinterest",
});

$(document).ready(function () {
  pinterestContent.CreateComPort();
  console.log("SETUp!");
  if (window.location.href.includes("videos")) {
    window.scrollTo(0, document.body.scrollHeight);
    pinterest.SendMessage("GetPinterest", "target", "");

    //  scrollTop(20);
  }
});
