const { error } = require("console");
const fs = require("fs");
const { title } = require("process");

const addMovie = async (collections, movieObj) => {
    try {
        await collections.insertOne(movieObj);
        console.log(`sucessfully added ${movieObj.title}`)
    } catch (error) {
        console.log(error)
    }
}

const listMovies = async (collections) => {
    try {
        const movieArr = await collections
        .find({})
        .project({_id:0})
        .toArray()
        console.log(movieArr) 
    } catch (error) {
        console.log(error)
    }
}

const editMovie = (filterObj, newObj, movieArr) => {
    try {
        let newMovieArr = movieArr
        for (movie in newMovieArr) {
            if (newMovieArr[movie].title === filterObj.title) {
                newMovieArr[movie] = newObj;
                collections.updateOne(filterObj, newObj)
                console.log(newMovieArr)
            } else {
                console.log(error)
            }
        } 
    } catch(error) {
        console.log(error)
    }
}

const deleteOneMovie = (movieArr, filterObj) => {
    try {
        let newArr = movieArr.filter(
            (movie) => movie.title !== filterObj.title
        );
        
        const stringyObj = JSON.stringify(newArr)
        fs.writeFileSync("./storage.json", stringyObj);
        console.log(`Movie successfully deleted`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addMovie,
    listMovies,
    editMovie,
    deleteOneMovie
}