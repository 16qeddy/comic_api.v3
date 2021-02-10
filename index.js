var path = require('path');
const express = require("express");
const cheerio = require("cheerio");
const fetch = require("node-fetch");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;
const address = process.env.PORT ? 'https://fast-bayou-41832.herokuapp.com' : `http://localhost:${port}`;

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

/////////in-browser view endpoint//////////
app.use(express.static(path.join(__dirname, "dist")));
app.use('*', (req, res)=>{
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})


////////////data endpoints////////////////
app.get("/search/:title", async (req, res) => {
  const title = req.params.title;
  const response = await fetch(
    `https://readcomicsonline.ru/search?query=${title}`
  );
  const body = await response.json();

  if (body.suggestions == "") {
    return res.send("Not Found");
  }
  const results = [];

  for (let i = 0; i < body.suggestions.length; i++) {
    const title = body.suggestions[i]["value"];
    let url = `${address}/comic/${body.suggestions[i]["data"]}`;
    const data = body.suggestions[i]["data"];
    const result = {
      title,
      url,
      data
    };
    results.push(result);
  }

  res.send(results);
});

app.get("/comic/:title", async (req, res) => {
  const url = `https://readcomicsonline.ru/comic/${req.params.title}`;
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);

  const title = $(
    ".container > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > h2:nth-child(1)"
  )
    .text()
    .trim();
  const image = `https:${$(".img-responsive")
    .attr("src")
    .trim()}`;
  const type = $(".dl-horizontal > dd:nth-child(2)")
    .text()
    .trim();
  const status = $(".dl-horizontal > dd:nth-child(4)")
    .text()
    .trim();
  const otherName = $(".dl-horizontal > dd:nth-child(6)")
    .text()
    .trim();

  const authors = [];

  $(".dl-horizontal > dd:nth-child(8)").each((i, element) => {
    const item = $(element);
    const name = item.find("a").text();
    const author = {
      name
    };
    authors.push(author);
  });

  const dateRelease = $(".dl-horizontal > dd:nth-child(10)").text();

  const categories = [];

  $(".dl-horizontal > dd:nth-child(12)").each((i, element) => {
    const item = $(element);
    const categoryName = item.find("a").text();
    const category = {
      categoryName
    };
    categories.push(category);
  });

  const views = $(".dl-horizontal > dd:nth-child(17)")
    .text()
    .trim();

  const description = $(".manga > p:nth-child(2)")
    .text()
    .trim();

  const chapters = [];

  $(".chapters li").each((i, element) => {
    const item = $(element);
    const title = item
      .find("h5:nth-child(1) > a:nth-child(1)")
      .text()
      .trim();
    const urlRaw = item.find("h5:nth-child(1) > a:nth-child(1)").attr("href");
    const date = item
      .find("div:nth-child(2) > div:nth-child(1)")
      .text()
      .trim();

    let url = `${address}/comic/${req.params.title}/${urlRaw.substr(urlRaw.lastIndexOf("/") + 1)}`;

    const chapter = {
      title,
      urlRaw,
      url,
      date
    };
    chapters.push(chapter);
  });

  const results = {
    title,
    image,
    type,
    status,
    otherName,
    authors,
    dateRelease,
    categories,
    views,
    description,
    chapters
  };

  res.send(results);
});

app.get("/comic/:title/:chapter", async (req, res) => {
  const url = `https://readcomicsonline.ru/comic/${req.params.title}/${req.params.chapter
    }`;
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);
  const pages = [];

  $("#all img").each((i, element) => {
    const item = $(element);

    const image = item.attr("data-src").trim();

    const page = {
      image
    };

    pages.push(page);
  });

  res.send(pages);
});



///////////////////////////all in one comic info//////////////////////////////
app.get("/api/search-comic/:title", async (req, res) => {
  var comics = [];
  await axios.get(`${address}/search/${req.params.title}`)
    .then(async (series) => {
      for (var i = 0; i < series.data.length; i++) {
        var comicEntry = series.data[i];
        await axios.get(series.data[i].url)
          .then(comic => {
            comicEntry.image = comic['data'].image;
            comicEntry.status = comic['data'].status;
            comicEntry.description = comic['data'].description;
            comicEntry.chapters = comic['data'].chapters;
            comics.push(comicEntry);
          })
          .catch(err => {
            console.log(err);
          })
      }
    })
    .then((data) => {
      res.send(comics);
      console.log(comics);
    })
    .catch((err) => {
      console.log(err);
      res.status(404);
    })
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}...`);
});
