const { Router } = require('express');
const router = Router();
const auth = require('./middleware/auth');
const mongodb = require('./sources/mongodb');

// ** Create wishlist
router.post("/wishlist", auth, async (req, res) => {
  // req.user
  const wishlistFound = await mongodb.getWishlist(req.user, req.body.name);
  if(wishlistFound){
    return res.status(301).send();
  }

  const wishlist = await mongodb.createWishlist(req.user, req.body.name);
  if(wishlist){
    res.status(201).send(wishlist);
  } else{
    const message = {
      message: "Cannot create a wishlist"
    }
    res.status(400).send(message);
  }  
});

// ** Delete wishlist
router.delete("/wishlist/:id", auth, async (req, res) => {
  // req.user
  const wishlist = await mongodb.deleteWishlist(req.user, req.params.id);
  if(wishlist){
    res.status(200).send(wishlist);
  } else{
    const message = {
      message: "Wishlist is already deleted"
    }
    res.status(404).send(message);
  }  
});

// ** Get All wishlist
router.get("/wishlist", auth, async (req, res) => {
  // req.user
  const wishlists = await mongodb.getAllWishlist(req.user);
  if(wishlists){
    res.send(wishlists);
  } else {
    res.status(404).send();
  }  
});

// ** Get wishlist
router.get("/wishlist/:id", auth, async (req, res) => {
  // req.user
  const wishlist = await mongodb.getWishlist(req.user, req.params.id);
  if(wishlist){
    res.send(wishlist);
  } else {
    res.status(404).send();
  }  
});

// ** Add book to wishlist
router.post("/books/:wlname", auth, async (req, res) => {
  const wishlist = await mongodb.getWishlist(req.user, req.params.wlname);
  const bookFound = wishlist.books.find(elem => 
    elem.bookId === req.body.bookId 
  );

  if(bookFound){
    return res.status(304).send(wishlist);
  }

  const addedBook = await mongodb.addBookWishlist(
    req.user, 
    req.params.wlname,
    req.body.bookId,
    req.body.title,
    req.body.authors,
    req.body.publisher,
    req.body.language
  );

    if(addedBook){
      res.status(201).send(addedBook);
    } else {
      res.status(404).send();
    }
});

// ** Remove book to wishlist
router.delete("/books/:wlname", auth, async (req, res) => {
  const wlFound = await mongodb.getWishlist(req.user, req.params.wlname);
  let message;
  if(!wlFound){
    message = {
      message: `Wishlist "${req.params.wlname}" not found.`
    }
    return res.status(404).send(message);
  }
  const wishlist = await mongodb.removeBookWishlist(
    req.user,
    req.params.wlname,
    req.body.bookId
  );

  if(wishlist){
    return res.send(wishlist);
  } else {
    message = {
      message: "Cannot delete book or is already deleted"
    }
    return res.status(404).send(message);
  } 

});

module.exports = router;