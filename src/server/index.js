import grpc from 'grpc'
import helloHandler from './hello-handler'
import healthCheckHandler from './health-check-handler'

const PROTO_PATH = __dirname + '/../../protos/index.proto'

const junoService = grpc.load(PROTO_PATH).JunoService
const server = new grpc.Server()

server.addService(junoService.service, {
    HelloStream: helloHandler,
    HealthCheck: healthCheckHandler
})

server.bind('0.0.0.0:8080', grpc.ServerCredentials.createInsecure())
server.start()
