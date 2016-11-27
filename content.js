var checked_for_fake_news = false;

// only run checks if user viewing generic twitter feed (or notifications tab, TBD)
setInterval(function() {
  if ($('div.ProfileCanopy').length == 0 && checked_for_fake_news == false) {
    var tweets = getTweets();
    checkForFakeNews(tweets)
    checked_for_fake_news = true;
  }
}, 500)

function getTweets() {
  return $('li.js-stream-item.stream-item.stream-item');
}

function checkForFakeNews(tweets) {
  tweets.each(function() {
    var tweet = $(this),
        handle = tweet.find('div.tweet').data('screen-name');

    if (sources.indexOf(handle) !== -1) { $(tweet).hide(); console.log('hid news from: ' + handle)}
  })
}

// check for fake news again, if user auto loads more tweets in feed
$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() == $(document).height()) {
     var tweets = getTweets();
     console.log('got new tweets');
     checkForFakeNews(tweets);
   }
});
