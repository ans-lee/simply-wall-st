import { COUNTRIES } from '../constants/CountryConstants';
import { StocksReq } from '../types/ReqBodyTypes';
import { ScoreWrapperResp } from '../types/RespBodyTypes';
import { SnowflakeData } from '../types/StocksTypes';

export function createStocksPayload(
  isAsc: boolean,
  page: number,
  size: number,
  country: string
): StocksReq {
  const baseRules = [
    ['order_by', 'market_cap', isAsc ? 'asc' : 'desc'],
    ['primary_flag', '=', true],
    ['grid_visible_flag', '=', true],
    ['market_cap', 'is_not_null'],
    ['is_fund', '=', false],
  ];
  const rules =
    country !== COUNTRIES[0].code
      ? JSON.stringify([...baseRules, ['country_name', 'in', [[country]]]])
      : JSON.stringify([...baseRules]);

  return {
    id: '1',
    no_result_if_limit: true,
    offset: page * size,
    size: size,
    state: 'read',
    rules: rules,
  };
}

export function parseSnowflakeData({ data }: ScoreWrapperResp) {
  const { value, future, past, health, income } = data;

  return data;
}

export function convertSnowflakeDataToGraph(data: SnowflakeData) {
  const { value, future, past, health, income } = data;

  return {
    value: value / 6,
    future: future / 6,
    past: past / 6,
    health: health / 6,
    income: income / 6,
  };
}
