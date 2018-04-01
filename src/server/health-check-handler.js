import {getLogger} from '../logging'
const logger = getLogger()

export default function healthCheckHandler(call, callback) {
    logger.info('Health Check Request Received')
    callback(null, {
        ok: true
    })
}
