import app from "./configs/app"
import { env } from "./configs/environment"
import { CacheManager, DbConnection, Mailer } from "./utils/helpers"


try {
    DbConnection.connect().then(
        () => {
            CacheManager.connect()
            Mailer.connect()
            app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
        }
    )
} catch (err) {
    throw new Error(err.message)
} finally {
    DbConnection.disconnect()
}
