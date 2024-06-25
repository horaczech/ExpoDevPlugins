import {ScrollView, StyleSheet, Text, View, Image} from "react-native";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  useQuery,
  gql,
} from "@apollo/client";
import { useApolloClientDevTools } from "@dev-plugins/apollo-client";

const client = new ApolloClient({
  uri: "https://flyby-router-demo.herokuapp.com/",
  cache: new InMemoryCache(),
});

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
}

const Main = () => {
  useApolloClientDevTools(client);
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  const contents = data?.locations.map(({ id, name, description, photo }) => (
      <View key={id} style={styles.item}>
        <Text style={styles.name}>{name}</Text>
        <Image source={{ uri: photo }} style={styles.photo} />
        <Text style={styles.aboutCaption}>About this location:</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
  ));

  return <ScrollView>{contents}</ScrollView>;
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  aboutCaption: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5
  }
});
