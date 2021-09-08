const express = require("express");
const {ApolloServer} = require('apollo-server-express')
const path = require("path");
const db = require("./config/connection");
const cors = require('cors');


const { typeDefs, resolvers} = require('./gql');
const {authMiddleware} = require('./utils/auth');
const { decodeToken } = require("./utils/auth");


const app = express();

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Get the user token from the headers.
    const token = req.headers.authorization || "";
    console.log("context token: ", token);
    // Try to retrieve a user with the token
    const user = token ? decodeToken(token.split(" ").pop().trim()).data : null;
    // Add the user to the context
    return { user };
  },
})

server.start().then(()=>{
  server.applyMiddleware({app})

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());



// if we're in production, serve client/build as static assets

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
})





  db.once("open", () => {
    app.listen(PORT, () =>
      console.log(`🌍 Now listening on localhost:${PORT}`)
    );
  });
});




// const express = require('express');
// const path = require('path');
// const db = require('./config/connection');
// const routes = require('./routes');

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });
