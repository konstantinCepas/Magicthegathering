import { Cards } from '../Entities/cards.js';
 
export function getServerApi() {

this.getCardsApi = async function( ) {
    try {
        let response = await fetch("https://api.magicthegathering.io/v1/cards?random=true&pageSize=100&language=English&format=json");
        var data = await response.json()
        return new Cards(data)
    }
    catch(err) {
       return err
    }
}

this.getCardName = async function(cardName) {
    try {
        let response = await fetch("https://api.magicthegathering.io/v1/cards?name="+ cardName +"&format=json");
        let data = await response.json()
        return new Cards(data)
    }
    catch(err) {
       return err
    }
}



this.getByFilter = async function(cardTypes, cardColor) {
    try {
        let response = await fetch("https://api.magicthegathering.io/v1/cards?pageSize=20&language=English&colors="+cardColor+"&types="+cardTypes+"&format=json");
        let data = await response.json()
        return new Cards(data)
    }
    catch(err) {
       return err
    }
}
}
