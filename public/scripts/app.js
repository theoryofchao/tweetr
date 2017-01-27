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
      $('#tweets-container').empty();
      renderTweets(data);
    },
    () => {
      tweetNotification("Could not load tweets");
    }
  );
};

let tweetNotification = (message, color) => {
  $("#tweet-notification").text(message).css('color', color).fadeTo(1000, 1, () => {
    $("#tweet-notification").fadeTo(1000, 0);       
  });
};

$( () => {
  loadTweets();

  //Ajax For Getting More Tweets
  $('main .new-tweet').on('submit', (event) => {
    //console.log('Performing Ajax Call');
    let text = $('main .new-tweet .new-tweet-input').val();
    if(text.length === 0) {
      tweetNotification("Tweet cannot be empty!", 'red');
      return false;
    }
    else if(text.length > 140) {
      tweetNotification("Tweet cannot exceed 140 characters!", 'red');
      return false;
    }

    $.post("/tweets/", { text: text }).then(
      (data) => {
        $('main .new-tweet .new-tweet-input').val('');
        $('main .counter').text(140);
        loadTweets(); 
        tweetNotification("Tweeted!!", 'white');
      },
      () => {
        //Flash box with error
        tweetNotification("Something went wrong :(", 'red');
      }
    );
  });

  $('.compose').on('click', (event) => {
    $('main .new-tweet').slideToggle("fast", () => {
      $('main .new-tweet .new-tweet-input').focus();
    });
  });

  //Bind to Modals
  $('.register').on('click', (event) => {
    $('#registerModal').toggle();
  });

  $('.login').on('click', (event) => {
    $('#loginModal').toggle();
  });

  //User Registration and Login
  $('#registerModal form').on('submit', (event) => {
    event.preventDefault();
    console.log($('#registeredModal form .username').val());
  });

  $('#loginModal form').on('submit', (event) => {
    event.preventDefault();
    //post request
  });
});
