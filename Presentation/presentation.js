import {pageLogic} from '../PageLogic/cards-logic.js';

export function Renderer() {
    this.newLogic = new pageLogic();
    this.pageData = null;
    this.cardData = null;
    this.userData = null;
    this.userId = null;
    this.cardFilterData = null;
    let self = this;
    var validationStatus = Boolean;
    

    this.init = async function() {
        this.pageData = await this.newLogic.getCardData()
    }
  

        let formValidation = function() {
            let inputBtn = document.getElementById("user")
            inputBtn.addEventListener("input", () =>{
                let inputTxt = document.getElementById("user").value;
                let checkTxt =  /^[A-Z]/.test(inputTxt.charAt(0)); 
                if(checkTxt == false) {
                    let getErr = document.getElementById("errorMsg");
                    getErr.classList = "checkErr2";
                    getErr.innerHTML = "First letter has to be uppercase!";
                    validationStatus = false;
                }
                if(inputTxt.length < 3 ) {
                   let getErr = document.getElementById("errorMsg");
                   getErr.classList = "checkErr2";
                   getErr.innerHTML = "You need to have more than 3 characters";
                   validationStatus = false;
                }if(inputTxt.length >= 3 && checkTxt == true) {
                    let getErr = document.getElementById("errorMsg");
                    getErr.classList = "checkErr1";
                    getErr.innerHTML = "Seems Ok!";
                    validationStatus = true;
                }
            })
        }

      formValidation()


      let registerUser = function() {
        if(validationStatus == true) {
            let createLoader = document.createElement("div");
            createLoader.classList = "page-loader";
            document.body.appendChild(createLoader);
            setTimeout(function(){createLoader.remove()}, 4000);
            let ulTypeList = document.getElementById("type-list");
            let ulFilters = document.getElementById("filterslist");
            let colorList = document.getElementById("colorlist");
            let ulCardTable = document.getElementById("cardTable");
            ulFilters.classList = "filters";
            colorList.classList = "color-list";
            ulCardTable.classList = "cardTable";
            ulTypeList.classList = "type-list";
            let inputTxt = document.getElementById("user").value
            let userData = self.newLogic.postUser(inputTxt);
            let formHide = document.getElementById("formId")
            formHide.classList = "hide-form";
            this.userId = self.newLogic.getUser(inputTxt); 
            let headerElement = document.getElementById("header");
            headerElement.innerHTML = `Welcome ${this.userId}`;
        } else {
            console.log("netocno", validationStatus);
        }
      }

      let submitBtn = document.getElementById("userSubmit");
      submitBtn.addEventListener('click', registerUser);

       
      

      this.searchCard = async function() {
       let searchVal = document.getElementById("search-bar").value;
       let cardTable = document.getElementById("cardTable");
       this.cardData = await self.newLogic.getSingleCard(searchVal);
       let clearDivs = document.getElementsByClassName("cardDiv");
       let createLoader = document.createElement("div");
       document.body.appendChild(createLoader);
       createLoader.classList = "page-loader";
       setTimeout(function(){createLoader.remove()}, 4000);
            let counter = 0;
            while(clearDivs.length) {
                clearDivs[counter].parentNode.removeChild(clearDivs[counter]);
            }
            for (let i = 0; i < 30; i++) {
                let cardTable = document.getElementById("cardTable");
                let cardDiv = document.createElement("div");
                cardDiv.classList = "cardDiv";
                cardTable.appendChild(cardDiv);
                let imageElement = document.createElement("img");
                cardDiv.appendChild(imageElement);
                imageElement.src = this.cardData.results.cards[i].imageUrl
                let nameSpan = document.createElement("span");
                cardDiv.appendChild(nameSpan);
                nameSpan.innerHTML = "Name: " + this.cardData.results.cards[i].name
                let typeSpan = document.createElement("span");
                cardDiv.appendChild(typeSpan);
                typeSpan.innerHTML = "Type: " + this.cardData.results.cards[i].type
                let setNameSpan = document.createElement("span");
                cardDiv.appendChild(setNameSpan);
                setNameSpan.innerHTML ="Set Name: " +  this.cardData.results.cards[i].setName
                let colorSpan = document.createElement("span");
                cardDiv.appendChild(colorSpan);
                colorSpan.innerHTML = "Color: " + this.cardData.results.cards[i].colors
        }
      }

      let searchBtn = document.getElementById("search-button")
      searchBtn.addEventListener('click', this.searchCard);


        this.checkFilters = async function() {
            let cardType = document.getElementsByClassName("type");
            let cardColor = document.getElementsByClassName("color");
            let cardTypeArray = [];
            let cardColorArray = [];
            for(let i=0; i < cardType.length; i++) {
                if(cardType[i].checked == true) {
                    cardTypeArray.push(cardType[i].name)
                }
            }
            for(let i=0 ; i < cardColor.length; i++) {
                if(cardColor[i].checked == true) {
                    cardColorArray.push(cardColor[i].name)
                }
            }
            this.cardFilterData = await self.newLogic.getCardFilters(cardTypeArray, cardColorArray)
            let createLoader = document.createElement("div");
            document.body.appendChild(createLoader);
            createLoader.classList = "page-loader";
            setTimeout(function(){createLoader.remove()}, 4000);
            let clearDivs = document.getElementsByClassName("cardDiv");
            let counter = 0;
            while(clearDivs.length) {
                clearDivs[counter].parentNode.removeChild(clearDivs[counter]);
            }
            for (let i = 0; i < 30; i++) {
                let cardTable = document.getElementById("cardTable");
                let cardDiv = document.createElement("div");
                cardDiv.classList = "cardDiv";
                cardTable.appendChild(cardDiv);
                let imageElement = document.createElement("img");
                cardDiv.appendChild(imageElement);
                imageElement.src = this.cardFilterData.results.cards[i].imageUrl
                if(imageElement.src == undefined) {
                    imageElement.src = "../undefined.jpg";
                }
                let nameSpan = document.createElement("span");
                cardDiv.appendChild(nameSpan);
                nameSpan.innerHTML = "Name: " + this.cardFilterData.results.cards[i].name
                let typeSpan = document.createElement("span");
                cardDiv.appendChild(typeSpan);
                typeSpan.innerHTML = "Type: " + this.cardFilterData.results.cards[i].type
                let setNameSpan = document.createElement("span");
                cardDiv.appendChild(setNameSpan);
                setNameSpan.innerHTML ="Set Name: " +  this.cardFilterData.results.cards[i].setName
                let colorSpan = document.createElement("span");
                cardDiv.appendChild(colorSpan);
                colorSpan.innerHTML = "Color: " + this.cardFilterData.results.cards[i].colors
        }
    }
      

      let filterTypes = document.getElementById("type-submit");
      filterTypes.addEventListener('click', this.checkFilters);



      this.renderCardUi = async function () {
          this.pageData = await self.newLogic.getCardData()
          for (let i = 0; i < 30; i++) {
          let cardTable = document.getElementById("cardTable");
          let cardDiv = document.createElement("div");
          cardDiv.classList = "cardDiv";
          cardTable.appendChild(cardDiv);
          let imageElement = document.createElement("img");
          cardDiv.appendChild(imageElement);
          let nameSpan = document.createElement("span");
          cardDiv.appendChild(nameSpan);
          nameSpan.innerHTML = "Name: " + this.pageData.results.cards[i].name
          let typeSpan = document.createElement("span");
          cardDiv.appendChild(typeSpan);
          typeSpan.innerHTML = "Type: " + this.pageData.results.cards[i].type
          let setNameSpan = document.createElement("span");
          cardDiv.appendChild(setNameSpan);
          setNameSpan.innerHTML ="Set Name: " +  this.pageData.results.cards[i].setName
          let colorSpan = document.createElement("span");
          cardDiv.appendChild(colorSpan);
          colorSpan.innerHTML = "Color: " + this.pageData.results.cards[i].colors
          if(imageElement.src == undefined) {
            imageElement.src = 'https://en.wikipedia.org/wiki/Magic:_The_Gathering#/media/File:Magic_the_gathering-card_back.jpg';
        }
        imageElement.src = this.pageData.results.cards[i].imageUrl;
          }
      }

      let filterBtn = document.getElementById("drop-down")
      filterBtn.addEventListener("click", () => {
          let cardList = document.getElementById("card-list");
          if(cardList.className == "cards") {
              cardList.classList = "hide-drop";
          }else {
              cardList.classList = "cards";
          }
      })

this.renderCardUi()
     
}