import { Paper, Tooltip } from '@mui/material';
import styled from 'styled-components';
import React, { Fragment } from 'react';
import { SnowflakeData } from '../types/StocksTypes';
import SnowflakeScore from './SnowflakeScore';
import { convertSnowflakeDataToGraph } from '../utils/StocksUtil';

type StocksTileProps = {
  company: string;
  uniqueSymbol: string;
  score: SnowflakeData;
};

const Tile = styled(Paper)`
  min-height: 275px;
  padding: 1rem;
`;

const StyledSnowflakeScore = styled(SnowflakeScore)`
  margin: 10px;
`;

const StocksTile: React.FC<StocksTileProps> = ({
  company,
  uniqueSymbol,
  score,
}) => {
  const TooltipContent = (
    <Fragment>
      <div>{`Value: ${score.value}`}</div>
      <div>{`Future: ${score.future}`}</div>
      <div>{`Past: ${score.past}`}</div>
      <div>{`Health: ${score.health}`}</div>
      <div>{`Dividend: ${score.income}`}</div>
    </Fragment>
  );

  return (
    <Tile>
      <p>{company}</p>
      <p>{uniqueSymbol}</p>
      <Tooltip title={TooltipContent} followCursor>
        <div>
          <StyledSnowflakeScore data={convertSnowflakeDataToGraph(score)} />
        </div>
      </Tooltip>
    </Tile>
  );
};

export default StocksTile;
