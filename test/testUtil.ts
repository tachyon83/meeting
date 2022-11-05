import * as moment from 'moment'
import { CommonUtils } from '../src/utils/CommonUtils'

jest.setTimeout(20000)

// let setNowMock: any = null

export function setNow(momentParsableString: string = '2020-01-01 00:00:00') {
  const momentToReturn = moment(momentParsableString)
  // setNowMock?.mockRestore()
  // setNowMock = jest.spyOn(CommonUtils, 'getNowMoment').mockImplementation(() => momentToReturn.clone())
  jest
    .spyOn(CommonUtils, 'getNowMoment')
    .mockImplementation(() => momentToReturn.clone())
}
