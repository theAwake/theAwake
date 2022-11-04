import request from 'request'

export const geocode = (address, callback) => {
    const positionUrl = 'http://api.positionstack.com/v1/forward?access_key=98c336bf62a775f504ad243ab3ad8c2c&query='+encodeURI(address)+'&limit=1'

    request({url: positionUrl, json: true}, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Geolocation service.')
        } else if (body.error) {
            callback('Error :: '+body.error.message)
        } else {
            callback(undefined, {
                lat: body.data[0].latitude,
                long: body.data[0].longitude,
                location: body.data[0].street + ', ' + body.data[0].locality + ', ' + body.data[0].country
            })
        }
    })
}

// {
//     latitude: 38.897675,
//     longitude: -77.036547,
//     type: 'address',
//     name: '1600 Pennsylvania Avenue NW',
//     number: '1600',
//     postal_code: '20500',
//     street: 'Pennsylvania Avenue NW',
//     confidence: 1,
//     region: 'District of Columbia',
//     region_code: 'DC',
//     county: 'District of Columbia',
//     locality: 'Washington',
//     administrative_area: null,
//     neighbourhood: 'White House Grounds',
//     country: 'United States',
//     country_code: 'USA',
//     continent: 'North America',
//     label: '1600 Pennsylvania Avenue NW, Washington, DC, USA'
//   }