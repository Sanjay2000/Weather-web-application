const request = require('request')

const forcast = (latittude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=8ef50f3dd49235dfd7ee8e573870eca9&query=' + latittude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, {body}) => {

        if (error) {
            callback('Unable to conect to weather services', undefined)

        } else if (body.error) {

            callback('Unale to find location', undefined)

        } else {
            console.log(body);
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out. It feelslike " + body.current.feelslike + " degress out. The humdity is " + body.current.humidity + "%.")
        }


    })


}

module.exports = forcast