import * as moment from 'moment'

class CommonUtilsCls {
  getNowMoment(): moment.Moment {
    return moment()
  }

  getNowDate() {
    return this.getNowMoment().toDate()
  }

  getNowForMysql() {
    return this.getNowMoment().format('YYYY-MM-DD HH:mm:ss')
  }

  getNowDateToken() {
    return this.getNowMoment().format('YYYY-MM-DD')
  }

  getCorrectedDateToken() {
    // return this.getNowMoment().add(-60 * 9, 'minutes').format('YYYY-MM-DD')
    return this.getNowMoment().format('YYYY-MM-DD')
  }

  locationConverter(location: string): string {
    const p = location
      .split(',')
      .map((v) => v.trim())
      .join(' ')
    return `POINT(${p})`
  }
}

export const CommonUtils = new CommonUtilsCls()
