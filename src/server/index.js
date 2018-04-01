import grpc from 'grpc'
import {getLogger} from '../logging'

const PROTO_PATH = __dirname + '/../../protos/index.proto'

const junoService = grpc.load(PROTO_PATH).JunoService
const server = new grpc.Server()
const logger = getLogger()

server.addService(junoService.service, {
    HelloStream: helloHandler
})

const oneof = (data, handler) => {
    const type = data.type
    const usefulData = data[type]
    handler[type](usefulData)
}

function helloHandler(stream) {
    
    logger.info('server On')
    
    stream.on('data', (data) => {
        oneof(data, {
            start(isStart) {
                logger.info('isStart : ' + isStart)
            },
            data(message) {
                logger.info('message : ' + message)
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

server.bind('0.0.0.0:8080', grpc.ServerCredentials.createInsecure())
server.start()
