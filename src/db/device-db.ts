import { Device } from "@prisma/client";
import Query from "./query";

export default class DeviceDb extends Query<Device> {
    constructor() {
        super('device')
    }

    // 
}