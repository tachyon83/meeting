import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'
import { IndexNames } from '../configs/indexMap'
import { CommonEntity } from './CommonEntity'

@Entity()
@Index(IndexNames.USER_EMAIL_UNIQUE_INDEX, ['email'], { unique: true })
export class User extends CommonEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    readonly userId: number

    @Column({ type: 'varchar', nullable: false })
    username: string

    @Column({ type: 'varchar', nullable: false })
    email: string

    @Column({ type: 'varchar', nullable: false })
    password: string
}
