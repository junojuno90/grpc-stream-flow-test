

describe('#getGoogle()', () => {
    it('should load user data', async () => {
        
      const httpReq = () => {
        let i = 0;
        for (i = 0 ; i < 10000 ; i++) {

        }

        return i
        // const req = http.request(options, (res) => {
        //     return res.statusCode
        //   })

        //   req.write(
        //       '{"text": "testString"}'
        //   )

        //   req.end()
      }

      const retCode = await httpReq()

      expect(retCode).toEqual(404)
      
       
    })
})



