// connect-redis version must be somewhere around 3.#.#
// now upgraded to 5.0.0
import redis from 'redis'
import redisSetting from '../settings/redis.setting.js'
const redisClient = redis.createClient({ port: redisSetting.port, host: redisSetting.host })

// ***********************   to use with password   ***********************
// redisClient.auth(redisSetting.password, function (err) {
//     console.log('redis authorized')
//     if (err) throw err
// })

redisClient.on('error', function (err) {
    console.log('[REDIS]: Error Occurred:' + err)
    console.log()
})

export default redisClient
