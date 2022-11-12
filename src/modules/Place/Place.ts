import {Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm'
import { CommonEntity } from '../Common/CommonEntity'

@Entity()
@Index('idx', ['location'], { unique: false, spatial: true })
export class Place extends CommonEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    readonly id: number

    @Column({ type: 'geometry', nullable: false, spatialFeatureType: 'POINT', srid: 4326 })
    // @Column({ type: 'geometry', nullable: false, spatialFeatureType: 'LineString', srid: 4326 })
    location: string | null
}
