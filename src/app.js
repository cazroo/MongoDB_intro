const fs = require("fs")
const yargs = require(`yargs`);
const connection = require("./db/connections.js");
const {addMovie, listMovies, editMovie, deleteOneMovie} = require(`./utils/index.js`);

const command = process.argv[2];

const app = async (args) => {

    try {
        if (command === `add`) {
            const movieObj = { title: args.title, actor: args.actor};
            await connection(addMovie, movieObj);
        } else if (command === `read`) {
            await connection(listMovies)
        } else if (command === `edit`) {
            const movieObj = { title: args.title, actor: args.actor}
            connection(editMovie, movieObj)
        } else if (command === `delete`) {
            const movieObj = {title: args.title, actor:args.actor};
            await connection(deleteOneMovie, movieObj)
        }
    }catch(error) {
        console.log(error)
    }
}    

app(yargs.argv);