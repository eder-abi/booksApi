const { Router } = require('express');
const router = Router();
const auth = require('./middleware/auth');
const mongodb = require('./sources/mongodb');

// after authorization check the current user will be on req.user
// ============================================================================
// ** Create wishlist
router.post("/wishlist", auth, async (req, res) => {
  // check if wishlist is was created before
  const wishlistFound = await mongodb.getWishlist(req.user, req.body.name);
  if(wishlistFound){
    return res.status(301).send();
  }

  // create a new wishlist
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

// ============================================================================
// ** Delete wishlist
router.delete("/wishlist/:id", auth, async (req, res) => {
  // try to delete wishlist by user if cannot delete then the wishlist doesnt exist or is already deleted
  const wishlist = await mongodb.deleteWishlist(req.user, req.params.id);
  if(wishlist){
    res.status(200).send(wishlist);
  } else{
    const message = {
      message: "Wishlist does not exist or is already deleted"
    }
    res.status(404).send(message);
  }  
});

// ============================================================================
// ** Get All wishlist
router.get("/wishlist", auth, async (req, res) => {
  // retrieve all wishlists or send error not found
  const wishlists = await mongodb.getAllWishlist(req.user);
  if(wishlists){
    res.send(wishlists);
  } else {
    res.status(404).send();
  }  
});

// ============================================================================
// ** Get wishlist
router.get("/wishlist/:id", auth, async (req, res) => {
  // get a wishlist by name otherwise send error not  found
  const wishlist = await mongodb.getWishlist(req.user, req.params.id);
  if(wishlist){
    res.send(wishlist);
  } else {
    res.status(404).send();
  }  
});

// ============================================================================
// ** Add book to wishlist
router.post("/wishlist/:wlname/books", auth, async (req, res) => {
  // first try to find the book by name 
  const wishlist = await mongodb.getWishlist(req.user, req.params.wlname);
  const bookFound = wishlist.books.find(elem => 
    elem.bookId === req.body.bookId 
  );
  // if book was found send not modified
  if(bookFound){
    return res.status(304).send(wishlist);
  }

  //  add book to wishlist
  const addedBook = await mongodb.addBookWishlist(
    req.user, 
    req.params.wlname,
    req.body.bookId,
    req.body.title,
    req.body.authors,
    req.body.publisher,
    req.body.language
  );
  
  // if ok then created book else send error 
  if(addedBook){
    res.status(201).send(addedBook);
  } else {
    res.status(400).send();
  }
});

// ============================================================================
// ** Remove book to wishlist
router.delete("/wishlist/:wlname/books/:bookId", auth, async (req, res) => {
  // first check if wishlist exist
  const wlFound = await mongodb.getWishlist(req.user, req.params.wlname);
  let message;
  if(!wlFound){
    message = {
      message: `Wishlist "${req.params.wlname}" not found.`
    }
    return res.status(404).send(message);
  }

  // try to delete book from wishlist
  const wishlist = await mongodb.removeBookWishlist(
    req.user,
    req.params.wlname,
    req.params.bookId
  );
  
  // if ok then send wishlist with books updated else send error
  if(wishlist){
    return res.send(wishlist);
  } else {
    message = {
      message: "Cannot delete book or is already deleted"
    }
    return res.status(400).send(message);
  } 

});

module.exports = router;