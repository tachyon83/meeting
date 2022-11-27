import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'
import { IndexNames } from '../configs/indexMap'
import { CommonEntity } from './CommonEntity'

@Entity()
@Index(IndexNames.PLACE_LOCATION_INDEX, ['location'], { unique: false, spatial: true })
export class Place extends CommonEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    readonly placeId: number

    @Column({ type: 'geometry', nullable: false, spatialFeatureType: 'POINT', srid: 4326 })
    // @Column({ type: 'geometry', nullable: false, spatialFeatureType: 'LineString', srid: 4326 })
    location: string | null
}
