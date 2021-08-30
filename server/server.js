const express = require('express');

const path = require('path');

const db = require('./config/connection');

const routes = require('./routes');

const cors = require('cors');

const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = require('./gql/typeDefs');

const resolvers = require('./gql/resolvers');

 

const app = express();

const PORT = process.env.PORT || 3001;

 

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());

 

// if we're in production, serve client/build as static assets

if (process.env.NODE_ENV === 'production') {

  app.use(express.static(path.join(__dirname, '../client/build')));

}

 

 

const apolloServer = new ApolloServer({ typeDefs, resolvers });

apolloServer.start().then(() => {

    apolloServer.applyMiddleware({ app, path: "/graphql" });

    app.use(routes);

 

    db.once('open', () => {

        app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));

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
