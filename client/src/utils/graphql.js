import {

    ApolloClient,

    InMemoryCache,

    ApolloProvider,

    useQuery,

    gql

} from "@apollo/client";

 

const client = new ApolloClient({

    uri: 'http://localhost:3001/graphql',

    cache: new InMemoryCache()

});

 

const tempGetSingleUserQuery = gql`

query TempSavedQuery($username: String!) {

    getSingleUser(username: $username) {

        username, email

    }

}

`;

 

export const tempGetMe = (username) => {

    console.log("\ntempGetMe tempSavedQuery: ", tempGetSingleUserQuery);

    client.query({

        query: tempGetSingleUserQuery,

        variables: { username: username },

 

    }).then((result) => {

        console.log("\ntempGetMe result: ", result);

        var tempData = null;

        if (result) {

            tempData = result.data.saved;

            console.log("\ntempGetMe data:\n", tempData);

        }

        return tempData;

    },

        (err) => {

            console.log("\ntempGetMe err: ", err);

        });

};