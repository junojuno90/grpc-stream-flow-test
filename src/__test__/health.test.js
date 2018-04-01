import grpc from 'grpc'

const PROTO_PATH = __dirname + '/../../protos/index.proto'

const JunoService = grpc.load(PROTO_PATH).JunoService
let client = new JunoService('localhost:8080', grpc.credentials.createInsecure())

describe('#gRPC Test', () => {
    it('should can check health request', async () => {
      await client.healthCheck({}, function(err, response) {
        console.log(response)
        expect(response.ok).toEqual(true)
      })
    })
})



