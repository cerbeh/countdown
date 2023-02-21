
import './App.css';

import { Typography, Layout } from 'antd'
import { Countdown } from './components/Game';
import { StoreProvider, Store } from './store';

const { Title } = Typography
const { Header } = Layout

function App() {
  const store = new Store()
  return (
    <div className="App">
      <StoreProvider store={store}>
        <Layout>

          <Header className='App-header'>
            <Title level={1}>Countdown: NUMBERS</Title>
          </Header>

          <Layout className="h-screen">
            <Countdown />
          </Layout>

        </Layout>
      </StoreProvider>
    </div>
  );
}

export default App;
