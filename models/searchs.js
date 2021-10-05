const fs = require('fs');
const axios = require('axios');
const { join } = require('path');
class Searchs {

    history = [];
    dbPath = './db/database.json';

    constructor() {
        this.readDB();
    }

    get paramsMapBox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5
        }
    }

    get paramsOpenWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric'
        }
    }

    get capitalizeHistory() {
        return this.history.map(place => {
            const info = place.split(' ');
            const capt = info.map( data => {
                return ` ${data.charAt(0).toUpperCase()}${data.slice(1)}`
            })
            return capt.join('');
        });
    }

    async city(place = '') {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapBox
            });

            const resp = await instance.get();
            return resp.data?.features.map( place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }));
        } catch(err) {
            return [];
        }
    }

    async climate(lat, lon) {
        try {

            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsOpenWeather, lat, lon}
            });

            const resp = await instance.get();
            const {weather, main} = resp.data;
            return {
                desc: weather[0].description,
                min: main?.temp_min,
                max: main?.temp_max,
                temp: main?.temp
            }
        }catch(err) {
            console.log(err);
        }
    }

    addHistory(place = '') {
        if(this.history.includes(place.toLowerCase())) {
            return;
        }
        this.history.unshift(place.toLowerCase());
        this.saveDB();
    }

    saveDB() {
        const payload = {
            history: this.history
        };
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    readDB() {
        if(!fs.existsSync(this.dbPath)) {
            return;
        }

        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
        const data = JSON.parse(info);
        this.history = data.history;
    }
}

module.exports = Searchs;