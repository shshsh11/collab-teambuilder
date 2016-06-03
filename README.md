#Pokemon Collaborative Teambuilder

"google docs" style teambuilder for Smogon formats, as in anyone in the "room" can see changes made to the team

data such as Pokemon, moves, items, formats, are taken from pokemonshowdown
sprites are from Smogon


#To run locally:

Make sure you have NodeJS. You also need Mongo, MongoLab (mlab.com) gives you a free 500 MB database. Then create a file called "env.js" in your main folder with 

process.env["DBURI"] = "your URI"
