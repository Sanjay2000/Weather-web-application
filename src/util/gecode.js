const request = require("request")

const gecode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +  encodeURIComponent(address) + '.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiYW5kcmV3MSIsImEiOiJja2V2NGhnNmowNzI3MnJucDg0ajQxaG9kIn0.aGKFvN3TfRCiNjSkCPDsPg&limit=1'

    request({ url, json: true }, (error, {body}) => {

        if (error) {
            callback('Unable to connect to location service',undefined)

        }else if (body.features.length === 0){
            callback({"error":'Unable to search location. Try another search!'},undefined)
        }else{
            callback(undefined,{
                latittude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
                
            })
        }

    })
}

module.exports = gecode