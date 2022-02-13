import environment from "./environment"
import environmentProd from "./environment.prod"

let production = false
const env = production?environment:environmentProd

export {
    env
}