class TwitterContent extends ContentClass {
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
    lastMsg,
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
    this.lastMsg = lastMsg;
  }

  

  scrollLike(num) {
    window.scrollBy(0, 600);

    var links = document.getElementsByTagName("div");

    if (num > 0) {
      var timer = getRandomInt(50000, 120000);

      setTimeout(
        function () {
          this.scrollLike(num - 1);
        },

        timer
      );
    }
    console.log(links);
    for (var kk = 0; kk < links.length; kk++) {
      if (
        links[kk] &&
        links[kk].getAttribute("aria-label") &&
        links[kk].getAttribute("aria-label").includes("Like") &&
        links[kk].getAttribute("data-testid") &&
        links[kk].getAttribute("data-testid") == "like"
      ) {
        console.log(links[kk]);
        links[
          kk
        ].parentNode.parentNode.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild.firstElementChild.focus();
        console.log(
          links[kk].parentNode.parentNode.parentNode.parentNode.parentNode
            .firstElementChild.firstElementChild.firstElementChild
            .firstElementChild.children[0].children[1].children[0].children[1]
        );

        console.log(
          links[kk].parentNode.parentNode.parentNode.parentNode.parentNode
            .firstElementChild.firstElementChild.firstElementChild
            .firstElementChild
        );

        console.log(
          links[
            kk
          ].parentNode.parentNode.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild.firstElementChild
            .getAttribute("href")
            .split("/")
            .join("")
        );
        console.log(
          links[
            kk
          ].parentNode.parentNode.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild.firstElementChild.children[0].children[1].children[0].children[1].getAttribute(
            "src"
          )
        );

        var url = window.location.href;
        var username = links[
          kk
        ].parentNode.parentNode.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild.firstElementChild
          .getAttribute("href")
          .split("/")
          .join("");
        var img =
          links[
            kk
          ].parentNode.parentNode.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild.firstElementChild.children[0].children[1].children[0].children[1].getAttribute(
            "src"
          );
        var msg_data = {
          url: url,
          username: username,
          img: img,
        };
        if (lastMsg.story.StartTwitterLike) {
          links[kk].click();
          this.SendMessage("DoneTwitterLike", "User", msg_data);
        }

        setTimeout(function () {
          console.log(img);
          console.log(username);
          console.log(lastMsg);
          console.log(msg_data);
          console.log(links[kk]);
          console.log(links[kk].parentNode);
          console.log(links[kk].parentNode.parentNode);

          console.log(links[kk].parentNode.parentNode.children[1]);

          console.log(links[kk].parentNode.parentNode.children[1].children[0]);
          links[kk].parentNode.parentNode.children[1].children[0].click();
          setTimeout(function () {
            var links2 = document.getElementsByTagName("div"); //tweetButton testid
            for (var kk = 0; kk < links2.length; kk++) {
              if (
                links2[kk].getAttribute("testid") &&
                links2[kk].getAttribute("testid").includes("tweetButton") &&
                this.lastMsg.story.StartTwitterFollow
              ) {
                console.log("try rewtweet");
                console.log(
                  links[kk].firstElementChild.firstElementChild
                    .firstElementChild
                );
                links2[
                  kk
                ].firstElementChild.firstElementChild.firstElementChild.click();
                this.SendMessage("DoneTwitterRetweet", "User", msg_data);
              }
            }

            var links2 = document.getElementsByTagName("span"); //tweetButton testid
            for (var kk = 0; kk < links2.length; kk++) {
              if (
                links2[kk].innerHTML.includes("Retweet") &&
                lastMsg.story.StartTwitterFollow
              ) {
                console.log("try rewtweet");
                links2[kk].click();
                this.SendMessage("DoneTwitterRetweet", "User", msg_data);
              }
            }
          }, 5000);

          setTimeout(function () {
            var links2 = document.getElementsByTagName("span"); //tweetButton testid
            for (var kk = 0; kk < links2.length; kk++) {
              if (
                links2[kk].innerText.includes("Retweet") &&
                lastMsg.story.StartTwitterFollow
              ) {
                console.log("try rewtweet");
                links2[kk].click();
                this.SendMessage("DoneTwitterRetweet", "User", msg_data);
              }
            }
          }, 5000);
        }, 1000);

        break;

        break;
      }
    }
  }

  onMessageReceive(msg) {
    console.log(msg);
    this.lastMsg = msg;
    if (msg.Tag == "UpdateTwitter") {
      console.log(msg.story);
    } else if (msg.Tag == "LikeFollow") {
      this.scrollLike(3);
    }
  }
}
var ComPort;
var CurrentUser;
var lastMsg;
var twitterContent = new TwitterContent({
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
  name: "twitter",
  lastMsg: lastMsg,
});

$(document).ready(function () {
  this.CreateComPort();
  console.log("SETUp!");
});
