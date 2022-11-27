import moment = require('moment')
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { CommonUtils } from '../utils/CommonUtils'

export abstract class CommonEntity extends BaseEntity {
  // @CreateDateColumn({ type: 'datetime' })
  // createdAt: Date

  // @UpdateDateColumn({ type: 'datetime' })
  // updatedAt: Date

  @Column({ type: 'datetime', comment: '생성 시각' })
  createdAt: Date

  @Column({ type: 'datetime', comment: '업데이트 시각' })
  updatedAt: Date

  @BeforeInsert()
  updateDatesForInsert() {
    const now = CommonUtils.getNowDate()
    this.createdAt = now
    this.updatedAt = now
  }

  @BeforeUpdate()
  updateDatesForUpdate() {
    this.updatedAt = CommonUtils.getNowDate()!
  }
}
