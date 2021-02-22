import {Chat} from "./components/Chat";
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import { SubscriptionClient } from 'subscriptions-transport-ws'

const client = new GraphQLClient({
  url: '/graphql',
  subscriptionClient: new SubscriptionClient('ws://localhost:5000/graphql', {
    /* additional config options */
  })
})

function App() {
  return (
    <ClientContext.Provider value={client}>
      <Chat/>
    </ClientContext.Provider>
  );
}

export default App;
