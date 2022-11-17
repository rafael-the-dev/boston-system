const {ControllerManager} = require('st-ethernet-ip')

class SerialPortClient {
    constructor() {
        const cm = new ControllerManager();

        //addController(ipAddress, slot = 0, rpi = 100, connected = true, retrySP = 3000, opts = {})
        const cont = cm.addController('192.168.86.200');

        cont.connect();

        //addTag(tagname, program = null, arrayDims = 0, arraySize = 0x01)
        cont.addTag('TheInteger')

        cont.on('TagChanged', (tag, prevValue) => {
        console.log(tag.name, ' changed from ', prevValue, ' => ', tag.value)
        })

        cont.on('error', (e) => {
        console.log(e)
        })
    }
}

module.exports = SerialPortClient;