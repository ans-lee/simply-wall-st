import { StocksReq } from './types/ReqBodyTypes';
import { StocksResp } from './types/RespBodyTypes';

const API_PATH = 'https://api.simplywall.st/api';

export class FetchError extends Error {
  constructor(public res: Response, message?: string) {
    super(message);
  }
}

export async function getStocks(payload: StocksReq): Promise<StocksResp> {
  const resp = await fetch(`${API_PATH}/grid/filter?include=info,score`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    throw new FetchError(resp);
  }
  return resp.json();
}
