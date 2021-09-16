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
  query = req.query.publisher ? query.concat(`+inpublisher:${req.query.publisher}`) : query;
  query = req.query.publisher ? query.concat(`&key=${req.query.key}`) : query;
  console.log(query);

  const searchResult = await axios.get(`https://www.googleapis.com/books/v1/volumes?${query}`);
  const itemsResult = searchResult.data;

  if(itemsResult.items) {
    itemsResult.items.forEach((elem) => {
      if(elem.volumeInfo.publisher){
        const volumeInfo = {
          bookId: elem.id,
          title: elem.volumeInfo.title,
          authors: elem.volumeInfo.authors,
          publisher: elem.volumeInfo.publisher,
          language: elem.volumeInfo.language
        };
        if(!data.items.find(e => e.title == elem.volumeInfo.title)){
          data.items.push(volumeInfo);
        }
      } 
    });
  }

  if(data.items.length !== 0)
    res.send(data);
  else
    res.status(404).send();
});

module.exports = router;