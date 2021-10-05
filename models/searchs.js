const axios = require('axios');

class Searchs {

    history = ['Medellín', 'Cañasgordas', 'Liverpool'];

    constructor() {
        // TODO: read db if exist 
    }

    get paramsMapBox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5
        }
    }

    async city(place = '') {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapBox
            });

            const resp = await instance.get();
            console.log(resp.data);
    
            return [];
        } catch(err) {
            return [];
        }
    }
}

module.exports = Searchs;