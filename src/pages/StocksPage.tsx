import React from 'react';
import styled from 'styled-components';
import StocksContainer from '../containers/StocksContainer';

const PageWrapper = styled.div`
  margin: 2rem;
`;

const StocksPage: React.FC = () => (
  <PageWrapper>
    <h1>Stocks</h1>
    <StocksContainer />
  </PageWrapper>
);

export default StocksPage;
