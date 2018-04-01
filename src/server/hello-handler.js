import {getLogger} from '../logging'
import oneof from './oneof'

const logger = getLogger()

export default function helloHandler(stream) {
    
    logger.info('server On')
    
    stream.on('data', (data) => {
        oneof(data, {
            start(isStart) {
                logger.info('isStart : ' + isStart)
            },
            data(message) {
                logger.info('message : ' + message.byteLength)
            },
            end(isEnd) {
                logger.info('isEnd : ' + isEnd)
                stream.write({
                    isSuccess: true
                })
            }
        })
    })

    stream.on('end', () => {
        logger.info('Client Sended End! I\'ll try send end to client also ')
        stream.end()
    })

    stream.on('error', (err) => {
        logger.error(err)
    })
}
