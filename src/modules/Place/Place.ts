import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CommonEntity } from '../Common/CommonEntity'

@Entity()
export class Place extends CommonEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    readonly id: number

    @Column({ type: 'geometry', nullable: false, spatialFeatureType: 'POINT', srid: 4326 })
    // @Column({ type: 'geometry', nullable: false, spatialFeatureType: 'LineString', srid: 4326 })
    location: string | null
}
