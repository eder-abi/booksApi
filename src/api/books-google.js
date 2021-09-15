const { Router } = require('express');
const router = Router();
const auth = require('./middleware/auth');
const axios = require('axios');

// Search Books
router.get("/search/:q", auth, async (req, res) => {
  let data = {
    items: []
  };
  let query = `q=${req.params.q}`
  query = req.query.author ? query.concat(`+inauthor:${req.query.author}`) : query;
  console.log(query);

  const searchResult = await axios.get(`https://www.googleapis.com/books/v1/volumes?${query}&key=${process.env.GOOGLE_BOOKS_API_KEY}`);
  const itemsResult = searchResult.data;
  itemsResult.items.forEach(function (elem) {
    if(elem.volumeInfo.language === "es"){
      const volumeInfo = {
        bookId: elem.id,
        title: elem.volumeInfo.title,
        authors: elem.volumeInfo.authors
      };
      if(!data.items.find(e => e.title == elem.volumeInfo.title)){
        data.items.push(volumeInfo);
      }
    } 
  });

  res.send(data);
});

module.exports = router;