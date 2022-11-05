import { AppDataSource } from '../../data-source'
import {Place} from "./Place"
import {Point} from 'geojson'
import {CommonUtils} from "../../utils/CommonUtils";

class PlaceLogicCls {
    private repo = AppDataSource.getRepository(Place)

    async create(data){
        const {location}=data
        const inst = await this.repo.create({location:CommonUtils.locationConverter(location)})
        await this.repo.insert(inst)
    }

    async list(data) {
        const {location, radius}=data
        const [lat, lng]=location.split(',')
        console.log(18, lat, lng, location)
        const origin:Point={
            type:"Point",
            coordinates:[lat, String(lng).substring(1)]
        }

        return await this.repo
            .createQueryBuilder()
            .where(
                // "ST_Distance(geom, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(geom))) <= :radius",
                "ST_Distance(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location))) > 0",
                // "ST_Distance(location, ST_GeomFromGeoJSON(:origin), ST_SRID(location)) > 0",
            )
            // .orderBy({
            //     "ST_Distance(geom, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(geom)))": {order: "ASC"},
            // })
            .setParameters({
                // stringify GeoJSON
                // origin: JSON.stringify(origin),
                origin: origin.coordinates,
                // radius
            })
            .getMany()
    }
}

export const PlaceLogic = new PlaceLogicCls()
