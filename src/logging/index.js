import bunyan from 'bunyan'
import PrettyStream from 'bunyan-prettystream'

export const getLogger = () => {
    const prettyStream = new PrettyStream()
    prettyStream.pipe(process.stdout)
    return bunyan.createLogger({
        name: 'For Pleasure',
        streams: [{
            // path: __dirname + '/../../log/info.log',
            level: 'info',
            stream: prettyStream
        }]
    }) 
}
