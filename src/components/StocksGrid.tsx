import React from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import { StocksData } from '../types/StocksTypes';
import StocksTile from './StocksTile';
import Pagination from '@mui/material/Pagination';

type StocksGridProps = {
  data: StocksData[];
  count: number;
  page: number;
  tilesPerPage: number;
  setPage: Function;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledPagination = styled(Pagination)`
  margin-top: 1rem;
`;

const StocksGrid: React.FC<StocksGridProps> = ({
  data,
  count,
  page,
  tilesPerPage,
  setPage,
}) => {
  return (
    <Wrapper>
      <Grid
        container
        spacing={{ xs: 2, md: 2, lg: 2 }}
        columns={{ xs: 2, md: 3, lg: 4 }}>
        {data.map((item, i) => (
          <Grid item xs={1} md={1} lg={1} key={i}>
            <StocksTile
              company={item.company}
              uniqueSymbol={item.uniqueSymbol}
              score={item.score}
            />
          </Grid>
        ))}
      </Grid>
      <StyledPagination
        count={
          count % tilesPerPage === 0 && count !== tilesPerPage
            ? count / tilesPerPage - 1
            : Math.ceil(count / tilesPerPage)
        }
        page={page}
        onChange={(event, value) => setPage(value - 1)}
      />
    </Wrapper>
  );
};

export default StocksGrid;
