import grpc from 'grpc'
import {getLogger} from '../logging'
import {startRequest} from './request'

const PROTO_PATH = __dirname + '/../../protos/index.proto'
const logger = getLogger()

const JunoService = grpc.load(PROTO_PATH).JunoService
let client = new JunoService('localhost:8080', grpc.credentials.createInsecure())

let hello = client.helloStream()

let setCount = 0

hello.on('data', (data) => {
    logger.info('Client Data Received : ' + data)
    if (data.isSuccess) {
        logger.info('Request Success Send Re-Request or End')
        setCount ++
        if (setCount == 5) hello.end()
        else startRequest(hello, 100)
        
    }
})

hello.on('end', () => {
    logger.info('Five Times Done'
)
})

hello.on('error', (err) => {
    logger.error(err)
})

hello.write({
    start: true
})

startRequest(hello, 100)
