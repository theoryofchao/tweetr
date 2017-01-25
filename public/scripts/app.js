/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
var data = [];

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

let renderTweets = (arrayTweets) => {
  arrayTweets.forEach( (tweet) => {
    $('#tweets-container').append(createTweetElement(tweet));
  });
};

let loadTweets = () => {
  $.get("/tweets/").then(
    (data) => {
      renderTweets(data);
    },
    () => {
      tweetNotification("Could not load tweets");
    }
  );
};

let tweetNotification = (message) => {
  $("#tweet-notification").text(message).fadeTo(2000, 1, () => {
    $("#tweet-notification").fadeTo(2000, 0);       
  });
};

$( () => {
  loadTweets();

  //Ajax For Getting More Tweets
  $('main .new-tweet').on('submit', (event) => {
    //console.log('Performing Ajax Call');
    event.preventDefault();
    let text = $('main .new-tweet .new-tweet-input').val();
    if(text.length === 0) {
      tweetNotification("Tweet cannot be empty!");
      return false;
    }
    else if(text.length > 140) {
      tweetNotification("Tweet cannot exceed 140 characters!");
      return false;
    }

    $.post("/tweets/", { text: text }).then(
      (data) => {
        $('main .new-tweet .new-tweet-input').val('');
        $('main .counter').text(140);
        $('#tweets-container').empty();
        loadTweets(); 
        tweetNotification("Tweeted!!");
      },
      () => {
        //Flash box with error
        tweetNotification("Something went wrong :(");
      }
    );
  });

  $('.compose').on('click', (event) => {
    $('main .new-tweet').slideToggle("fast", () => {
      $('main .new-tweet .new-tweet-input').focus();
    });
  });
});
