class User {
  constructor() {
    this.UserPool = [];
    this.TagPool = [];
    this.TagPoolPinterest = [];
    this.linkedin_data = [];
    this.user_stats = [];
    this.TotalPinterests = [];
    this.pinterest_data = [];
    this.CommentPoolPinterest = [];
    this.PinterestTime;
    this.PinterestTargets = [];
    this.twitter_data = [];
    this.TagPoolLinkedin = [];
    this.CommentPoolLinkedin = [];
    this.timing_model = { min: 0, max: 0, long: 0 };
    this.TotalLinkedins = [];
    this.loopAccounts = "";
    this.LinkedinTargets = [];
    this.TagPoolTinder = [];
    this.CommentPoolTinder = [];
    this.allow_local = !1;
    this.hoursLeft = 8;
    this.TagPoolTwitter = [];
    this.CommentPoolTwitter = [];
    this.instagram_data = [];
    this.round_robin_twitter = 0;
    this.round_robin_linkedin = 0;
    this.loopCount = 0;
    this.blocked = !1;
    this.cloud_db = [];
    this.StartTinderFollow = !1;
    this.FollowedPoolTinder = [];
    this.StartTwitterFollow = !1;
    this.StartTwitterLike = !1;
    this.MaxTwitterLikes = 300;
    this.MaxTwitterFollows = 300;
    this.unfollowInstoo = !0;
    this.maxPinterests = 300;
    this.round_robin_facebook = 0;
    this.StartPinterestFollow = !1;
    this.StartPinterestLike = !1;
    this.MaxPinterestLikes = 300;
    this.MaxPinterestFollows = 300;
    this.last_story = "";
    this.StartLinkedinFollow = !1;
    this.StartLinkedinLike = !1;
    this.MaxLinkedinLikes = 300;
    this.MaxLinkedinFollows = 300;
    this.firstTime = !0;
    this.MaxTinderFollows = 300;
    this.TinderTargets = [];
    this.CommentedMediaTinder = [];
    this.StartTinderComment = !1;
    this.StartTinderLike = !1;
    this.MaxTinderLikes = 300;
    this.MaxTinderComments = 300;
    this.round_robin_hashtag = 0;
    this.round_robin_account = 0;
    this.last_tab;
    this.addIdeal = !1;
    this.CommentPool = [];
    this.AccountPool = [];
    this.FollowedPool = [];
    this.AccountPoolfacebook = [];
    this.FollowedPoolPinterest = [];
    this.LikedMediaPinterest = [];
    this.FollowedPoolLinkedin = [];
    this.LikedMediaLinkedin = [];
    this.CommentedPoolTinder = [];
    this.LikedMediaTinder = [];
    this.FollowedPoolTwitter = [];
    this.LikedMediaTwitter = [];
    this.EnableFilters = !1;
    this.minPhotos = 1;
    this.minFollowers = 100;
    this.minFollowing = 100;
    this.maxFollowers = 1e5;
    this.maxFollowing = 1e5;
    this.UnfollowedPool = [];
    this.currentSpeed = 1;
    this.currentSpeedTwi;
    er = 1;
    this.currentSpeedLinkedin = 1;
    this.currentSpeedPinterest = 1;
    this.currentSpeedTinder = 1;
    this.instagram_tabf;
  }
}
