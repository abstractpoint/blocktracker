import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import themeObj from './theme';
import provider from './services/ethereum';
import Home from './scenes/home';
import Details from './scenes/details';
import GlobalStyles from './components/global-styles';

function App() {
  const [blocks, setBlocks] = useState([]);

  const loadInitialBlocks = () => {
    if (blocks.length > 0) {
      return;
    }

    provider.getBlockNumber().then(latestBlockHeight => {
      const blocksToGet = Array(3).fill(true).map((value, i) => latestBlockHeight - i - 1);

      const blockPromises = blocksToGet.map(blockHeight => provider.getBlock(blockHeight));

      Promise.all(blockPromises).then(newBlocks => {
        setBlocks(() => ([
          ...newBlocks,
        ]));
      });
    });
  };

  const clearBlocks = () => {
    setBlocks([]);
  };

  useEffect(loadInitialBlocks, [blocks]);

  return (
    <ThemeProvider theme={themeObj}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route
            path="/block/:number"
            render={
              () => <Details blocks={blocks} clearBlocks={clearBlocks} />
            }
          />
          <Route path="/" render={() => <Home blocks={blocks} />} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
