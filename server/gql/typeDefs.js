const { ApolloServer, gql } = require("apollo-server-express");

 

const typeDefsStr = `

type Query {

    getSingleUser(username: String): User

}

 

type User {

    username: String

    email: String

    password: String

    savedBooks: [Book]

}

 

type Book {

    authors: [String]

    description: String

    bookId: String

    image: String

    link: String

    title: String

}`;

 

const typeDefs = gql(typeDefsStr);

 

module.exports = typeDefs;