import React from 'react';
import styled from 'styled-components';
import RadarChart from 'react-svg-radar-chart';
import { SnowflakeData } from '../types/StocksTypes';

type SnowflakeScoreProps = {
  data: SnowflakeData;
};

const captions = {
  value: 'Value',
  future: 'Future',
  past: 'Past',
  health: 'Health',
  income: 'Dividend',
};

const options = {
  scaleProps: () => ({
    className: '',
    fill: '#fafafa',
    stroke: '#999',
    strokeWidth: '.2',
  }),
  shapeProps: () => ({
    className: '',
    opacity: '0.8',
    strokeWidth: '.2',
    stroke: 'green',
  }),
};

const ScoreWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SnowflakeScore: React.FC<SnowflakeScoreProps> = ({ data }) => {
  const radarData = [
    {
      data: data,
      meta: { color: '#92e067', stroke: 'green' },
    },
  ];

  return (
    <ScoreWrapper>
      <RadarChart
        captions={captions}
        data={radarData}
        options={options}
        size={150}
      />
    </ScoreWrapper>
  );
};

export default SnowflakeScore;
