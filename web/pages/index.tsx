import { useQuery, useSubscription } from '@apollo/client';
import { Box, List, ListItem, Text, VStack } from '@chakra-ui/react';
import { memo, useEffect, useState } from 'react';

import Layout from '../components/Layout';
import Hello from '../components/Pages/Home/Hello';
import Links from '../components/Pages/Home/Links';
import Spinner from '../components/Spinner';
import SymbolsTable from '../components/Table/SymbolsTable';
import {
  GET_SYMBOLS,
  MARK_PRICE_DATA_SUBSCRIPTION,
  SYMBOLS_DATA_SUBSCRIPTION,
} from '../gql';
import { useStatusAndUser } from '../utils/hooks';

/**
 * Homepage of the website.
 *
 * @returns React functional component.
 */
const Home = () => {
  const { status } = useStatusAndUser();

  const { data: dataGetSymbols, loading: loadingGetSymbols } =
    useQuery(GET_SYMBOLS);
  const { data: dataMarkPrice, loading: loadingMarkPrice } = useSubscription(
    MARK_PRICE_DATA_SUBSCRIPTION
  );
  const { data: dataSymbolsStats, loading: loadingSymbolStats } =
    useSubscription(SYMBOLS_DATA_SUBSCRIPTION);

  const [symbolsPriceMapState, setSymbolsPriceMapState] = useState<
    Map<string, string>
  >(new Map<string, string>());
  const updatePriceMapState = (key: string, value: string) => {
    setSymbolsPriceMapState((map) => new Map(map.set(key, value)));
  };

  useEffect(() => {
    if (dataMarkPrice) {
      updatePriceMapState(
        dataMarkPrice.markPriceDataSubscription.s,
        dataMarkPrice.markPriceDataSubscription.p
      );
    }
  }, [dataMarkPrice]);

  if (loadingGetSymbols || !dataGetSymbols) return <Spinner />;

  return (
    <Layout title={['Home']}>
      {status && status.isAuthenticated && status.user ? (
        <>
          <Box>
            <SymbolsTable
              symbols={dataGetSymbols.symbols.map(({ symbol }) => symbol)}
              symbolsPriceMap={symbolsPriceMapState}
            />
          </Box>
        </>
      ) : (
        <VStack
          as="section"
          align={['center', 'start', 'start']}
          justify="center"
          w={['full', 'full', '60vw']}
          h="full"
          margin="0 auto"
          p={2}
        >
          <VStack w="full" align="center" spacing={4}>
            <Hello />
            <Links />
          </VStack>
        </VStack>
      )}
    </Layout>
  );
};

export default memo(Home);
