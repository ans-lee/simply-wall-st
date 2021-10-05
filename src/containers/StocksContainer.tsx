import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { StocksData } from '../types/StocksTypes';
import { COUNTRIES } from '../constants/CountryConstants';
import { getStocks } from '../api';
import StocksGrid from '../components/StocksGrid';
import { createStocksPayload, parseSnowflakeData } from '../utils/StocksUtil';

const TILES_PER_PAGE = 12;

const StyledSelect = styled(Select)`
  margin-top: 0.5rem;
  margin-bottom: 2rem;
`;

const StocksContainer: React.FC = () => {
  const [stockData, setStockData] = useState([]);
  const [sortVal, setSortVal] = useState('desc');
  const [country, setCountry] = useState(COUNTRIES[0].code);
  const [page, setPage] = useState(0);
  const [totalStocks, setTotalStocks] = useState(0);

  const payload = createStocksPayload(
    sortVal === 'asc',
    page,
    TILES_PER_PAGE,
    country
  );
  const { isLoading } = useQuery(
    ['stocks', payload],
    () => getStocks(payload),
    {
      onSuccess: (result) => {
        setTotalStocks(result.meta.total_records);
        setStockData(
          result.data.map((item) => ({
            company: item.name,
            uniqueSymbol: item.unique_symbol,
            score: parseSnowflakeData(item.score),
          }))
        );
      },
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  const data = React.useMemo((): StocksData[] => stockData, [stockData]);

  const TableOptions = () => (
    <Fragment>
      <InputLabel id="lblMarketCapSort">Market Cap Sort</InputLabel>
      <StyledSelect
        labelId="lblMarketCapSort"
        id="marketCapSort"
        value={sortVal}
        onChange={(event) => setSortVal(event.target.value as string)}>
        <MenuItem value="asc">Ascending</MenuItem>
        <MenuItem value="desc">Descending</MenuItem>
      </StyledSelect>
      <InputLabel id="lblCountryFilter">Country</InputLabel>
      <StyledSelect
        labelId="lblCountryFilter"
        id="countryFilter"
        value={country}
        onChange={(event) => {
          setPage(0);
          setCountry(event.target.value as string);
        }}>
        {COUNTRIES.map((item, i) => (
          <MenuItem value={item.code} key={i}>
            {item.country}
          </MenuItem>
        ))}
      </StyledSelect>
    </Fragment>
  );

  return (
    <Fragment>
      <TableOptions />
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <StocksGrid
          data={data}
          count={totalStocks}
          page={page + 1}
          tilesPerPage={TILES_PER_PAGE}
          setPage={setPage}
        />
      )}
    </Fragment>
  );
};

export default StocksContainer;
