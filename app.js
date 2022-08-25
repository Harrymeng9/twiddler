$(document).ready(function () {
  var $app = $('#app');
  $app.html('');

  jQuery("time.timeago").timeago();

  // Create an h1 element with the text "Twiddler"
  var $title = $('<h1>Twiddler</h1>');
  // Append the h1 element to the DOM, nested inside of the #app div
  $title.appendTo($app);

  // Set a click event listener on the h1 element
  $title.on("click", function (event) {
    alert('The title of this page is: ' + event.target.innerText);
  });

  // Create the helper function renderFeed and make it reusable
  var renderFeed = function (userInput) {

    var tweetList;
    if (userInput === undefined) {
      tweetList = streams.home;
    } else {
      tweetList = streams.users[userInput];
    }

    var index = tweetList.length - 1;
    while (index >= 0) {
      var tweet = tweetList[index];
      var $tweet = $('<div class="tweet"></div>');

      var $profilePhoto = $('<img class="profile-photo"></div>').attr("src", tweet.profilePhotoURL)
      var $username = $('<div class="username"></div>').text('@' + tweet.user);
      var $message = $('<p class="message"></div>').text(tweet.message);
      var $timestamp = $('<div class="timestamp"></div>').text(jQuery.timeago(tweet.createdAt));

      var $icon = $('<div class="icon"></div>');
      var $comment = $('<i class="comment fa-solid fa-comment"></i>');
      var $retweet = $('<i class="retweet fa-solid fa-retweet"></i>');
      var $like = $('<i class="like fa-solid fa-heart"></i>');
      var $share = $('<i class="share fa-solid fa-share"></i>');

      $profilePhoto.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $icon.appendTo($tweet);

      $comment.appendTo($icon);
      $retweet.appendTo($icon);
      $like.appendTo($icon);
      $share.appendTo($icon);

      $tweet.appendTo($feed);
      index -= 1;
    }

    $(".username").on("click", function (event) {
      $("div").remove(".tweet");
      renderFeed($(this).text().substring(1));
      $updateFeedButton.text("Back");
    });
  }

  // Create a button called "Update Feed"
  var $updateFeedButton = $('<button id="update-feed">Update Feed</button>');
  $updateFeedButton.appendTo($app);

  $updateFeedButton.on("click", function (event) {
    // Remove all previously existing Tweets from the Feed
    $("div").remove(".tweet");
    renderFeed();
    if ($updateFeedButton.text() === 'Back') {
      $updateFeedButton.text('Update Feed');
    }
  })

  // Create a div id is feed and append it
  var $feed = $('<div id="feed"></div>');
  $feed.appendTo($app);
  renderFeed();

});

window.isItBeautifulYet = true;