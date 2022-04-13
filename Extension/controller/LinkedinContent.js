class ContentLinkedIn extends ContentClass {
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
    this.result = "";
    this.target = "";
    this.completed = [];
    this.story = {};
  }

  getItem(item, list, index) {
    if (
      list[index] &&
      list[index].getAttribute("class") &&
      list[index].getAttribute("class").includes(item)
    ) {
      ////console.log(links2[kk].innerText);
      return list[index].innerText;
    }
  }

  scrollLike(num) {
    window.scrollBy(0, 300);
    var counter = 0;
    var vid = parseInt(Math.floor(Math.random() * 6) + 1);

    var username = "none";
    var email = "none";
    var twitter = "none";
    var website = "none";
    var birthday = "none";
    var connected = "none";
    var profile = "none";

    var sales = "";
    var img = "https://instoo.com/logo.png";

    var links = document.getElementsByTagName("span");
    for (var kk = 0; kk < links.length; kk++) {
      if (
        links[kk] &&
        links[kk].getAttribute("class") &&
        links[kk]
          .getAttribute("class")
          .includes("entity-result__title-text ") &&
        !links[kk].innerHTML.includes("<img") &&
        !this.completed.includes(links[kk].getAttribute("href"))
      ) {
        counter++;

        if (counter == vid) {
          this.completed.push(links[kk].getAttribute("href"));

          links[kk].children[0].click();

          if (num > 0) {
            $("#contact").html(result);

            setTimeout(function () {
              if (this.story.StartLinkedinFollow) {
                var links = document.getElementsByTagName("button");

                //data-control-name="search_srp_result"
                for (var kk = 0; kk < links.length; kk++) {
                  if (
                    links[kk] &&
                    links[kk].getAttribute("aria-label") &&
                    links[kk].getAttribute("data-control-name") &&
                    links[kk]
                      .getAttribute("data-control-name")
                      .includes("connect") &&
                    links[kk].getAttribute("aria-label").includes("Connect")
                  ) {
                    links[kk].click();
                    console.log(links[kk].getAttribute("aria-label"));

                    links[kk].click();

                    setTimeout(function () {
                      var links = document.getElementsByTagName("button");

                      //data-control-name="search_srp_result"
                      for (var kk = 0; kk < links.length; kk++) {
                        if (
                          links[kk] &&
                          links[kk].getAttribute("aria-label") &&
                          links[kk]
                            .getAttribute("aria-label")
                            .includes("Send now")
                        ) {
                          links[kk].click();
                        }
                      }
                    }, 2000);

                    var msg_data = {
                      target: target,
                      username: username,
                      url: profile,
                      img: img,
                    };

                    this.SendMessage("DoneLinkedinFollow", "User", msg_data);
                    break;
                  }
                }
              }
            }, 3000);

            if (
              this.story.StartLinkedinLike ||
              this.story.StartLinkedinFollow
            ) {
              setTimeout(
                function () {
                  var links = document.getElementsByTagName("a");

                  //data-control-name="search_srp_result"
                  for (var kk = 0; kk < links.length; kk++) {
                    if (
                      links[kk] &&
                      links[kk].getAttribute("data-control-name") &&
                      links[kk].getAttribute("data-control-name") ==
                        "contact_see_more"
                    ) {
                      ////console.log(links[kk]);

                      links[kk].click();
                      old_link = links[kk];

                      setTimeout(function () {
                        var links = document.getElementsByTagName("div");

                        //data-control-name="search_srp_result" pv-contact-info
                        for (var kk = 0; kk < links.length; kk++) {
                          if (
                            links[kk] &&
                            links[kk].getAttribute("class") &&
                            links[kk]
                              .getAttribute("class")
                              .includes("section-info")
                          ) {
                            ////console.log(links[kk]);
                            if (!this.result.includes(links[kk].outerHTML)) {
                              this.result += links[kk].outerHTML;

                              var links2 = document.getElementsByTagName("h1");

                              for (var kk = 0; kk < links2.length; kk++) {
                                if (
                                  links2[kk] &&
                                  links2[kk].getAttribute("id") &&
                                  links2[kk]
                                    .getAttribute("id")
                                    .includes("pv-contact-info")
                                ) {
                                  ////console.log(links2[kk].innerText);
                                  username = links2[kk].innerText;
                                }
                              }

                              var links2 =
                                document.getElementsByTagName("section");

                              for (var kk = 0; kk < links2.length; kk++) {
                                var tempProfile = this.getItem(
                                  "vanity",
                                  links2,
                                  kk
                                );
                                profile = tempProfile ? tempProfile : profile;

                                var tempEmail = this.getItem(
                                  "email",
                                  links2,
                                  kk
                                );
                                email = tempEmail ? tempEmail : email;

                                var tempBirthday = this.getItem(
                                  "birthday",
                                  links2,
                                  kk
                                );
                                birthday = tempBirthday
                                  ? tempBirthday
                                  : birthday;

                                var tempConnected = this.getItem(
                                  "connected",
                                  links2,
                                  kk
                                );
                                birthday = tempConnected
                                  ? tempConnected
                                  : birthday;

                                var tempTwitter = this.getItem(
                                  "twitter",
                                  links2,
                                  kk
                                );
                                twitter = tempTwitter ? tempTwitter : twitter;

                                var tempWebsite = this.getItem(
                                  "website",
                                  links2,
                                  kk
                                );
                                website = tempWebsite ? tempWebsite : website;
                              }

                              var msg_data = {
                                target: target,
                                sales: 0,
                                email: email,
                                html: "",
                                username: username,
                                birthday: birthday,
                                connected: connected,
                                twitter: twitter,
                                url: profile,
                                img: img,
                              };
                              ////console.log(msg_data);
                              this.SendMessage(
                                "LinkedinLead",
                                "User",
                                msg_data
                              );
                              window.history.back(2);
                            }

                            setTimeout(function () {
                              window.history.back(2);
                              if (num > 0) {
                                setTimeout(function () {
                                  console.log("RESTART");
                                  this.scrollLike(num - 1);
                                }, 10000);
                              }
                            }, 7000);
                          }
                        }
                      }, 7000);
                    }
                  }
                },

                7000
              );
            }

            break;
          }
        }
      }
    }
  }

  OnMessageReceive(msg) {
    console.log(msg);

    if (msg.Tag == "LikeFollow") {
      this.target = msg.story.target;
      this.story = msg.story;
      this.scrollLike(10);
      // SendMessage("DoneLinkedinLike", "User",msg_data);
    }
  }
}

var Comport;
var CurrentUser;

var linkedIn = new ContentLinkedIn({
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
  name: "linkedin",
});

$(document).ready(function () {
  linkedIn.CreateComport();
  if (window.location.href.includes("tag")) {
    window.scrollTo(0, document.body.scrollHeight);

    linkedIn.scrollTop(20);
  }
});
