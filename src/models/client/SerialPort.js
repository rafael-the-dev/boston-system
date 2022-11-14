const  { SerialPort } = require('serialport');

class SerialPortClient {
    constructor() {
        // Create a port
        SerialPort.list().then(ports => {
            ports.forEach((port, index) => {
                console.log(`port ${index}`, port)
            });
        }, err => console.error("port error: ", err));

        this._port = new SerialPort({
            path: '/dev/tty-COM3',
            baudRate: 57600,
        });

        this._port.write('main screen turn on', function(err) {
            if (err) {
                return console.log('Error on write: ', err.message)
            }
            console.log('message written')
        })

        // Open errors will be emitted as an error event
        this._port.on('error', function(err) {
            console.log('Error: ', err.message)
        })
    }
}

module.exports = SerialPortClient;