export type StocksResp = {
  data: DataResp[];
  meta: MetaResp;
};

export type DataResp = {
  id: number;
  string: string;
  trading_item_id: number;
  name: string;
  slug: string;
  exchange_symbol: string;
  ticker_symbol: string;
  unique_symbol: string;
  primary_ticker: boolean;
  last_updated: number;
  canonical_url: string;
  primary_canonical_url?: string;
  is_searchable: boolean;
  isin_symbol: string;
  score: ScoreWrapperResp;
};

export type ScoreWrapperResp = {
  data: ScoreResp;
};

export type ScoreResp = {
  value: number;
  income: number;
  health: number;
  past: number;
  future: number;
  management: number;
  misc: number;
  total: number;
  sentence: string;
};

export type MetaResp = {
  total_records: number;
  real_total_records: number;
  state: string;
  noResultIfLimit: boolean;
};
