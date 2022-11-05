import { IServerOptions } from '../common/interfaces/serverOptionInterface'

export const ServerOptions: IServerOptions = {
  aspectLoggerSwitch: false,
  TIMELY_INCOME_REFRESH_TIME_IN_HOURS: 1,
  ACCESS_TOKEN_EXPIRES_IN: '30m',
  REFRESH_TOKEN_EXPIRES_IN: '24h',
}
