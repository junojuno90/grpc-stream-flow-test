import fs from 'fs'
import {getLogger} from '../logging'

const logger = getLogger()

export function startRequest(stream, tickMs = 1000) {

    const buffer = fs.readFileSync(__dirname + '/../../audio/test.wav', null).buffer
    logger.info('FILE BUFFER :) ' + buffer.byteLength)

    // let count = 0
    let idx = 0

    const interval = setInterval(() => {
        
        if (idx > buffer.byteLength) {
            stream.write({
                data: buffer.slice(idx, buffer.byteLength - 1)
            })
            stream.write({
                end: true
            })
            clearInterval(interval)
        } else {
            stream.write({
                data: buffer.slice(idx, idx + 3000)
            })
    
            idx += 3000
        }
    }, tickMs)

}