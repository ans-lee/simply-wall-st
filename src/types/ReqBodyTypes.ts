export type StocksReq = {
  id: string;
  no_result_if_limit: boolean;
  offset: number;
  size: number;
  state: string;
  rules: string;
};
