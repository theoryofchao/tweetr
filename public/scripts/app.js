/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$( () => {
var tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};


let createTweetElement = (tweetData) => {
  let $article = $("<article>", {"class": "tweet"});
  let $header = $("<header>");
  let $tweetpic = $("<div>", {"class": "tweet-pic"});
  let $img = $("<img>");
  let $username = $("<div>", {"class": "tweet-username"}).text(tweetData.user.name);
  let $userhandle = $("<div>", {"class": "tweet-userhandle"}).text(tweetData.user.handle);
  let $content = $("<div>", {"class": "tweet-body"}).text(tweetData.content.text);
  let $footer = $("<footer>");
  let date = new Date(tweetData.created_at);
  let $date = $("<div>", {"class": "tweet-date"}).text(date.toDateString());
  let $symbols = $("<div>", {"class": "tweet-icons"})
          .append($("<i>", {"class": "fa fa-flag"}))
          .append($("<i>", {"class": "fa fa-retweet"}))
          .append($("<i>", {"class": "fa fa-heart"}));

  $img.attr("src", tweetData.user.avatars.small);
  $tweetpic.append($img);
  $header.append($tweetpic).append($username).append($userhandle);
  $footer.append($date).append($symbols);
  $article.append($header).append($content).append($footer);
  return $article;
};

var $tweet = createTweetElement(tweetData);

$('#tweets-container').append($tweet);

});
