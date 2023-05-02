// components/SymbolsTable.tsx
import {
  Box,
  Flex,
  keyframes,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

const timeframes = ['1m', '5m', '15m', '1h', '4h', '12h', '1d', '3d', '1w'];

interface SymbolsTableProps {
  symbols: string[];
  symbolsPriceMap: Map<string, string>;
}

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const SymbolsTable: React.FC<SymbolsTableProps> = ({
  symbols,
  symbolsPriceMap,
}) => {
  const textColor = useColorModeValue('gray.700', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const positiveColor = useColorModeValue('green.500', 'green.300');
  const negativeColor = useColorModeValue('red.500', 'red.300');

  return (
    <Flex justifyContent="center">
      <Box overflowX="auto">
        <Table variant="simple" size="sm" fontFamily="mono">
          <TableCaption placement="top">
            Symbolscurrency Trading Terminal
          </TableCaption>
          <Thead>
            <Tr>
              <Th color={textColor} borderColor={borderColor}>
                Symbol
              </Th>
              <Th color={textColor} borderColor={borderColor}>
                Price
              </Th>
              <Th color={textColor} borderColor={borderColor}>
                % Change (Daily Open)
              </Th>
              <Th color={textColor} borderColor={borderColor}>
                Volume (USDT)
              </Th>
              {timeframes.map((time) => (
                <Th key={time} color={textColor} borderColor={borderColor}>
                  Vol % Change ({time})
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {symbols.map((item, index) => (
              <Tr key={index}>
                <Td color={textColor} borderColor={borderColor}>
                  {item}
                </Td>
                <Td color={textColor} borderColor={borderColor}>
                  {symbolsPriceMap.get(item) || 0}
                </Td>
                <Td
                  color={0 >= 0 ? positiveColor : negativeColor}
                  borderColor={borderColor}
                >
                  {(0).toFixed(2)}%
                </Td>
                <Td color={textColor} borderColor={borderColor}>
                  {(0).toFixed(2)}
                </Td>
                {timeframes.map((timeframe) => (
                  <Td
                    key={timeframe}
                    color={0 >= 0 ? positiveColor : negativeColor}
                    borderColor={borderColor}
                  >
                    {(0).toFixed(2)}%
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default SymbolsTable;
