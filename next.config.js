const path = require('path')

module.exports = {
    env: {
        JWT_SECRET_KEY: "53a0d1a4174d2e1b8de701437fe06c08891035ed4fd945aef843a75bed2ade0657b3c4ff7ecd8474cb5180b2666c0688bbe640c9eb3d39bb9f2b724a10f343c6"
    },
    webpack: config => {
        config.resolve.modules.push(path.resolve('./'));

        return config;
    }
}