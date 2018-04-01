
export default function oneof (data, handler) {
    const type = data.type
    const usefulData = data[type]
    handler[type](usefulData)
}
