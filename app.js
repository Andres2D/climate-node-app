require('dotenv').config();
const { inquirerMenu, pause, readInput, listPlaces } = require("./helpers/inquirer");
const Searchs = require("./models/searchs");

const main = async() => {
    let opt;
    const searchs = new Searchs();

    do {
        opt = await inquirerMenu();
        switch(opt) {
            case 1:
                const term = await readInput('City: ');
                const places = await searchs.city(term);
                const id = await listPlaces(places);

                if(id === '0') continue;
                const {name, lat, lng } = places.find( p => p.id === id);

                // Save on DB
                searchs.addHistory(name);
                const {desc, temp, max, min} = await searchs.climate(lat, lng);

                console.log('\nInformation about the city \n'.green);
                console.log('City: ', name.green);
                console.log('Lat: ', lat);
                console.log('Lng: ', lng);
                console.log('Temp: ', temp);
                console.log('Min: ', min);
                console.log('Max: ', max);
                console.log('Description: ', desc.green);
                break;
            case 2:
                searchs.capitalizeHistory.forEach((place, index) => {
                    const idx = `${index + 1}.`.green;
                    console.log(`${idx} ${place}`);
                })
            break;
        }

        if(opt !== 0) await pause();
    }while(opt !== 0);

}

main();
