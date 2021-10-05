require('dotenv').config();
const { inquirerMenu, pause, readInput } = require("./helpers/inquirer");
const Searchs = require("./models/searchs");

const main = async() => {
    let opt;
    const searchs = new Searchs();

    do {
        opt = await inquirerMenu();
        switch(opt) {
            case 1:
                const place = await readInput('City: ');
                await searchs.city(place);

                console.log('\nInformation about the city \n');
                console.log('City: ');
                console.log('Lat: ');
                console.log('Lng: ');
                console.log('Temp: ');
                console.log('Min: ');
                console.log('Max: ');
                break;
            case 2:
                console.log('Loading history...');
            break;
        }

        if(opt !== 0) await pause();
    }while(opt !== 0);

}

main();
