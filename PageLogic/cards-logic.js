import { getServerApi } from '../API - Repo/cardsApi.js';
import { User } from '../Entities/user.js';
import { UserReg } from '../API - Repo/userRepo.js';

export function pageLogic() {
    this.cardsRepo = new getServerApi();
    this.userRepo = new UserReg();



    this.getCardData = async function () {
        let newData = await this.cardsRepo.getCardsApi()

        return newData;
    } 

    this.getSingleCard = async function(cardName) {
        let cardData = await this.cardsRepo.getCardName(cardName)
        
        return cardData;
    }

    this.postUser = function(username) {
        let user = new User(username);
        let postData = this.userRepo.registerUser(user);
        return postData;
    }

    this.getUser = function(username) {
        let getData = this.userRepo.getUser(username);
        if(getData == null) {
            return false
        } else {
            return username
        }
    }



    this.getCardFilters = async function(cardColor, cardTypes) {
        let cardFilterData = this.cardsRepo.getByFilter(cardColor, cardTypes);

        return cardFilterData;
    }
     

}