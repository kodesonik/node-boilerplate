import environment from "./environment"
import environmentProd from "./environment.prod"

const production = false
const env = production?environment:environmentProd

export {
    env
}