import request from 'request'

export const forecast = (latitude, longitude, callback) => {
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=e31144b11ac60b5e66b2fef0dbbabea1&query='+encodeURI(latitude+','+longitude)+'&units=f'

    request({url: weatherUrl, json: true}, (error, response, body) => {
        if (error) {
            callback('Unable to connect to weather services.')
        } else if (body.error) {
            callback('Error :: '+body.error.info)
        } else {
            // callback(undefined, {
            //     description: body.current.weather_descriptions[0],
            //     temperature: body.current.temperature,
            //     feelslike: body.current.feelslike
            // })
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently '+ body.current.temperature 
            + ' degress out. But feels like a '+body.current.feelslike)
        }
    })
}