/*Constants */
const today = new Date(); 
const weekDays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const cafeListObject = [
    {
        name: "Portafilter",
        image: "./images/cafes/portafilter.jpg",
        placesid: "ChIJk9vL0xaQREgRvI49nyqC_7o",
        address: "88 North Main Street"
    },
    {
        name: "Three Fools Coffee",
        image: "./images/cafes/threefools.jpg",
        placesid: "ChIJudvXdxqQREgRjJWDk-ywgPc",
        address: "Grand Parade"
    },
    {
        name: "Filter",
        image: "./images/cafes/filter.jpg",
        placesid: "ChIJh5de6RqQREgR2jn1JXzZMvs",
        address: "19 Georges Quay"
    },
    {
        name: "Myo Cafe",
        image: "./images/cafes/myo.jpg",
        placesid: "ChIJp6lWZRGQREgRMmC6w1hWLDc",
        address: "34 Popes Quay"
    },
    {
        name: "Cork Coffee Roasters, French Church",
        image: "./images/cafes/ccrfrench.jpg",
        placesid: "ChIJtQP4UhCQREgRMsUvHPZO6fI",
        address: "2 French Church Street"
    },
    {
        name: "Cafe Depeche",
        image: "./images/cafes/depeche.png",
        placesid: "ChIJq4ERkxeQREgRdtS2u-zpZsU",
        address: "19 Lancaster Quay"
    },
    {
        name: "Soma Coffee Company",
        image: "./images/cafes/soma.jpg",
        placesid: "ChIJCVc1oBCQREgR5fMws2OyUC8",
        address: '23 Tuckey Street'
    },
    {
        name: "Alchemy Cork",
        image: "./images/cafes/alchemy.jpg",
        placesid: "ChIJf9xyhBmQREgRuxYbOT8ZGAc",
        address: "123 Barrack Street"
    },
    {
        name: "Priory Coffee Co.",
        image: "./images/cafes/priory.jpg",
        placesid: "ChIJG9LbsBaQREgR9BBXD1EtS8o",
        address: "1 North Main Street"
    },
    {
        name: "Cork Coffee Roasters, Bridge Street",
        image: "./images/cafes/ccrbridge.jpg",
        placesid: "ChIJZQx2URiQREgR-IrnCqqKRQA",
        address: "2 Bridge Street"
    },
    {
        name: "Nectar Coffee",
        image: "./images/cafes/nectar.jpg",
        placesid: "ChIJ71NSoA-QREgRSi5-5BHm3rY",
        address: "26 Parnell Place"
    },
    {
        name: "Dukes Coffee Company",
        image: "./images/cafes/dukes.png",
        placesid: "ChIJgxGCWxCQREgRqp9b9BkEjxs",
        address: "4 Careys Lane"
    },
    {
        name: "The Bookshelf Coffee House",
        image: "./images/cafes/bookshelf.png",
        placesid: "ChIJIT9A9Q-QREgRefkAx34T_Yo",
        address: "78 South Mall"
    },
    {
        name: "Union Grind Espresso Bar",
        image: "./images/cafes/union.png",
        placesid: "ChIJZxVqggWQREgRz_v7tdgcWKE",
        address: "4 Union Quay"
    },
    {
        name: "Café Eco",
        image: "./images/cafes/eco.jpg",
        placesid: "ChIJtYH14A-QREgRxyB6M683veM",
        address: "8 Winthrop Street"
        
    },
    {
        name: "Lab 82",
        image: "./images/cafes/lab82.png",
        placesid: "ChIJcyCyrT2RREgRghyRx0rxxy0",
        address: "82 Lower Glanmire Road"
    },
    {
        name: "Badger & Dodo Boutique Coffee Roasters",
        image: "./images/cafes/bandd.png",
        placesid: "ChIJuyvrIj9fQ0gRq2rKBXJyoDE",
        address: "11 Barrack Street"
    },
    {
        name: "The Bookshelf at the Elysian",
        image: "./images/cafes/elysian.png",
        placesid: "ChIJ_xCpHqCRREgRczFjFdjosmU",
        address: "Unit 5, The Elysian, Eglinton Street"
    },
    {
        name: "Cafe Moly",
        image: "./images/cafes/cafemoly.jpeg",
        placesid: "ChIJQ-gFuIWRREgRRuWGI3MxM58",
        address: "99 Douglas Street"
    },
    {
        name : "Soma 2",
        image: "./images/cafes/soma2.png",
        placesid: "ChIJ16VDDnKRREgRVYnylxMYIMg",
        address: "Anglesea Street"
    },
    {
        name: "Cork Coffee Roasters",
        image: "./images/cafes/ccranglesea.png",
        placesid : "ChIJ8-0VzBCRREgRSaVPbuEld8E",
        address: "Anglesea Street"
    },
    {
        name: "Badger & Dodo Roastery Outlet",
        image: "./images/cafes/bdoutlet.png",
        placesid : "ChIJ_4fsfFSRREgRwZdiw3OXsMY",
        address: "87 South Mall"
    }
];

 /* helper methods */
function disableButton(button){
    button.disabled = true;
}

function enableButton(button){
    button.disabled = false;
}

function sortByRating(a, b){
    if ( a.rating > b.rating ){
        return -1;
      }
      if ( a.rating < b.rating ){
        return 1;
      }
      return 0;    
}

function getHHMMTime(date){
    let hh = String(date.getHours());
    let mm = String(date.getMinutes());
    let timeNow = `${hh}:${mm}`;
    if(timeNow.length < 5){
        timeNow = zeroPad(timeNow);
    }
    return timeNow;
}

// matches rating to star icons
function getStarRating(rating){
    // Rating icons
    let nostar = "<span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star'></span>";
    let halfstar = "<span class='fas fa-star-half-alt checked'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star'></span>";
    let onestar = "<span class='fa fa-star checked'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star'></span>";
    let onehalfstar = "<span class='fa fa-star checked'></span><span class='fas fa-star-half-alt checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star'></span><span class='fa fa-star'></span>";
    let twostars = "<span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star'></span>";
    let twohalfstars = "<span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fas fa-star-half-alt checked'></span><span class='fa fa-star'></span><span class='fa fa-star'></span>";
    let threestars = "<span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star'></span><span class='fa fa-star'></span>";
    let threehalfstars = "<span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fas fa-star-half-alt checked'></span><span class='fa fa-star'></span>";
    let fourstars = "<span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='far fa-star'></span>";
    let fourhalfstars = "<span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fas fa-star-half-alt checked'></span>";
    let fivestars = "<span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span>";

    // Rating ranges
    if(rating < 0.5){
        starRating = nostar;
    } else if(rating >= 0.5 && rating < 1){
        starRating = halfstar;
    } else if(rating >= 1 && rating < 1.5){
        starRating = onestar;
    } else if(rating >= 1.5 && rating < 2){
        starRating = onehalfstar;
    } else if(rating >= 2 && rating < 2.5){
        starRating = twostars;
    } else if(rating >= 2.5 && rating < 3){
        starRating = twohalfstars;
    } else if(rating >= 3 && rating < 3.5){
        starRating = threestars;
    } else if(rating >= 3.5 && rating < 4){
        starRating = threehalfstars;
    } else if(rating >= 4 && rating < 4.5){
        starRating = fourstars;
    } else if(rating >= 4.5 && rating < 5){
        starRating = fourhalfstars;
    } else if(rating = 5){
        starRating = fivestars;
    } else {
        console.log("oops, something went wrong with the rating");
    }
    return starRating;
}