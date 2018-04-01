export function startRequest(stream, tickMs = 1000) {
    let count = 0
    const interval = setInterval(() => {
    
        stream.write({
            data: 'String data / ' + count
        })
        count ++
    
        if (count == 10) {
            clearInterval(interval)
            stream.write({
                end: true
            })
        }
    }, tickMs)
}
