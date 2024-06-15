const quoteContainer = document.getElementById("quoteContainer");
const quote = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitter = document.getElementById("twitter");
const newQuot = document.getElementById("newQuote");
const loader = document.getElementById("loader");

//show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//hide loading
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// getting quotes from api
let apiQuotes = [];
//Show in website one by one
function newQuote() {
  loading();
  //pick random quote
  const quot = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //   console.log(quot);

  //   Shrinking smaller font-size of text
  if (quot.text.length > 40) {
    quote.classList.add("longQuote");
  } else {
    quote.classList.remove("longQuote");
  }

  //   changing qotes in html
  quote.textContent = quot.text;
  const authorTmp = quot.author;
  let authorArr = authorTmp.split(",");
  //   getting the author finally
  if (
    authorArr[0] == "NULL" ||
    authorArr[0] == "Null" ||
    authorArr[0] == "null"
  )
    authorArr[0] = "Unknown";
  authorText.textContent = authorArr[0];
  complete();
}

async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();

    const len = apiQuotes.length;
    // for (let i = 0; i < len; i++)
    //     newQuote(apiQuotes[i]);
    newQuote();
    // console.log(apiQuotes);
  } catch (error) {
    //handle errors
    alert(error);
  }
}

// tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} ~ ${authorText.textContent}`;
  //   const twitterUrl = `https://www.facebook.com/dialog/share?text=${quote.textContent} ~ ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Add event listener
newQuot.addEventListener("click", newQuote);
twitter.addEventListener("click", tweetQuote);

//onload
getQuotes();
//loading();
