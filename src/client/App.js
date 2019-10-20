import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import themeObj from './theme';
import { getLatestBlocksViaService } from './services/ethereum';
import Home from './scenes/home';
import Details from './scenes/details';
import GlobalStyles from './components/global-styles';
import { getAverageTimePerBlock, getAverageTxPerBlock } from './utils';

function App() {
  const [blocks, setBlocks] = useState([]);
  const [blockStats, setBlockStats] = useState({
    blockAverageSeconds: undefined,
    blockAverageTxNo: undefined,
  });

  const loadInitialBlocks = () => {
    const untilBlock = blocks.length > 0 && blocks[0].number;
    getLatestBlocksViaService(untilBlock).then(newBlocks => {
      if (newBlocks.length > 0) {
        const combinedBlocks = [
          ...newBlocks,
          ...blocks.slice(0, 19),
        ];

        setBlocks(combinedBlocks);
        setBlockStats({
          blockAverageSeconds: getAverageTimePerBlock(combinedBlocks),
          blockAverageTxNo: getAverageTxPerBlock(combinedBlocks),
        });
      }
    });
  };

  useEffect(loadInitialBlocks, []);
  useEffect(() => {
    const interval = setInterval(loadInitialBlocks, 4000);
    return () => clearInterval(interval);
  }, [blocks]);

  return (
    <ThemeProvider theme={themeObj}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route
            path="/block/:number"
            render={
              () => <Details blocks={blocks} />
            }
          />
          <Route path="/" render={() => <Home blocks={blocks} blockStats={blockStats} />} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
