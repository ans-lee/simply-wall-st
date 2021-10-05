export type Column = {
  header: string;
  accessor: string;
  Cell?: Function;
};

export type StocksData = {
  company: string;
  uniqueSymbol: string;
  score: SnowflakeData;
};

export type SnowflakeData = {
  value: number;
  future: number;
  past: number;
  health: number;
  income: number;
};
