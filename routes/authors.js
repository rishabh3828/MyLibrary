const express = require('express');
const router = express.Router();
const Author = require('../models/author.js');
const author = require('../models/author.js');

// All Authors Route
router.get('/', async (request, response) =>{
    let searchOptions = {};
    if (request.query.name != null || request.query.name !== '') {
        searchOptions.name = new RegExp(request.query.name, 'i');
    }
    try{
        const authors = await Author.find(searchOptions);
        response.render('authors/index', {authors : authors, searchOptions : request.query});        
    }
    catch{
        response.redirect('/');
    }
}); 

// New Author Route
router.get('/new', (request, response) =>{
    response.render('authors/new', {author : new Author()});
});

//Create Author Route 
router.post('/', async (request, response) =>{
    const author = new Author({
        name : request.body.name
    });

    try{
        const newAuthor = await author.save();
        response.redirect('authors');

    } catch(err){
        response.render('authors/new', {
            author : author,
            errorMessage : 'error creating author'
    });
}});

module.exports = router;