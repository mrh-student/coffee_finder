// **********************//
// *** Footer ***
// **********************//
$(document).ready(function(){
    $('#footer').hover(function(){
        $('#arrow').removeClass("fa-angle-up");
        $('#arrow').addClass("fa-angle-down");
    },
    function(){
        $('#arrow').addClass("fa-angle-up");
    });
})

// **********************//
// *** Coffee Search *** //
// **********************//

//list of included cafes. edit to add or remove any
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
        address: null
    },
    {
        name: "Filter",
        image: "./images/cafes/filter.jpg",
        placesid: "ChIJh5de6RqQREgR2jn1JXzZMvs",
        address: null
    },
    {
        name: "Myo Cafe",
        image: "./images/cafes/myo.jpg",
        placesid: "ChIJp6lWZRGQREgRMmC6w1hWLDc",
        address: null
    },
    {
        name: "Cork Coffee Roasters, French Church",
        image: "./images/cafes/ccrfrench.jpg",
        placesid: "ChIJtQP4UhCQREgRMsUvHPZO6fI",
        address: null
    },
    {
        name: "Cafe Depeche",
        image: "./images/cafes/depeche.png",
        placesid: "ChIJq4ERkxeQREgRdtS2u-zpZsU",
        address: null
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
        address: null
    },
    {
        name: "Priory Coffee Co.",
        image: "./images/cafes/priory.jpg",
        placesid: "ChIJG9LbsBaQREgR9BBXD1EtS8o",
        address: null
    },
    {
        name: "Cork Coffee Roasters, Bridge Street",
        image: "./images/cafes/ccrbridge.jpg",
        placesid: "ChIJZQx2URiQREgR-IrnCqqKRQA",
        address: null
    },
    {
        name: "Nectar Coffee",
        image: "./images/cafes/nectar.jpg",
        placesid: "ChIJ71NSoA-QREgRSi5-5BHm3rY",
        address: null
    },
    {
        name: "Dukes Coffee Company",
        image: "./images/cafes/dukes.png",
        placesid: "ChIJgxGCWxCQREgRqp9b9BkEjxs",
        address: null
    },
    {
        name: "The Bookshelf Coffee House",
        image: "./images/cafes/bookshelf.png",
        placesid: "ChIJIT9A9Q-QREgRefkAx34T_Yo",
        address: null
    },
    {
        name: "Union Grind Espresso Bar",
        image: "./images/cafes/union.png",
        placesid: "ChIJZxVqggWQREgRz_v7tdgcWKE",
        address: null
    },
    {
        name: "Café Eco",
        image: "./images/cafes/eco.jpg",
        placesid: "ChIJtYH14A-QREgRxyB6M683veM",
        address: null
        
    },
    {
        name: "Lab 82",
        image: "./images/cafes/lab82.png",
        placesid: "ChIJcyCyrT2RREgRghyRx0rxxy0",
        address: null
    }

];

// called when page opens / refreshes
function runCoffeeSearch(){
    //clear any previous results
    clearHTMLTable()
    
    //show the loading message
    let actionButton = document.getElementById("loadingMessage")
    actionButton.innerText = "Checking what's open, like"
    disableButton(actionButton)
    let loadingText = setInterval(function(){
        actionButton.innerText += '.'
    },1000)

    //show the loading animation
    let loader = document.getElementById("loader")
    loader.hidden = false

    //send the query to google places API
    let queryResults = getResults(cafeListObject)
    
    //each place is queried separately with a break of 350 milliseconds between each call
    //wait 6 seconds before styling & posting results
    setTimeout(function(){
        postResults(styleResults(queryResults, cafeListObject))
        displayOnPage();

        hideLoader(loader)
        enableButton(actionButton)
        actionButton.innerText = "Refresh"
        actionButton.setAttribute("onClick","refreshPage()")
        clearInterval(loadingText)}
    ,6000)
}

// gets data from all shops in cafeListObject from Google Places API
function getResults(cafeListObject){
    
    let requestsList = []
    let queryResults = []
    const map = new google.maps.Map(document.getElementById("map"),{
        center: {lat: 51.903614, lng: -8.468399},
        zoom: 15
    });
    
    // construct query
    for (i=0; i < cafeListObject.length; i++){
        let request = {
            placeId : cafeListObject[i].placesid,
            fields: ['place_id','name', 'rating', 'vicinity', 'opening_hours','utc_offset_minutes']
        }
        requestsList.push(request)
    }
    // query Google Places API with list of requests
    for (i=0; i < requestsList.length; i++){
        (function (i) {
            setTimeout(function (){
                service = new google.maps.places.PlacesService(map);
                service.getDetails(requestsList[i], callback);
            }, 350 * i);
        })(i);
        function callback(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                    queryResults.push(place)
                    console.log(place)
                    console.log(place.place_id + " - " + place.name + " - open now:" + place.opening_hours.isOpen())
            }
        }
    }
    return queryResults
}

// checks if shops are open, styles the output (formatting, images)
function styleResults(queryResults, cafeListObject){
    
    const weekday = getWeekday()
    let styledResults = []
    
    let resultsMap = [{}]
    // loop through list of results. Get name, rating, close time, address, url, image
    for(i=0; i < queryResults.length; i++){

        if(queryResults[i].opening_hours.isOpen()){
            //get id
            const uniqueID = queryResults[i].place_id;
            //get name
            const name = queryResults[i].name;
            //get rating
            const rating = queryResults[i].rating;
            const starRating = getStarRating(rating);
            // get address & image
            for (e = 0; e < cafeListObject.length; e++){
                // match result to shop in cafe list
                if (uniqueID == cafeListObject[e].placesid){
                    // set image
                    var img_url = cafeListObject[e].image;
                    // set address from cafe list where filled out, else use query results 
                    if(cafeListObject[e].address == null){
                        var address = queryResults[i].vicinity.slice(0,-6);
                    }
                    else {
                        var address =  cafeListObject[e].address;
                    }
                }
                else {
                    continue
                }
            }
            // get url
            var url = "https://www.google.com/maps/search/"+name+"+"+address+"+Cork/";
            // get closing time
            if(queryResults[i].opening_hours.periods[0].open.time == "0000" &&
               queryResults[i].opening_hours.periods[0].close == null){
                var close = "Open 24 hrs";
            }
            else if(queryResults[i].opening_hours.periods[weekday] != null){
                var close_raw = queryResults[i].opening_hours.periods[weekday].close.time;
                var close = close_raw.slice(0, 2) + ":" + close_raw.slice(2);
            }
            else {
                var close = queryResults[i].opening_hours.weekday_text[weekday];
            }
               
            // append to list
            styledResults.push(
                {
                    listing_name: name,
                    listing_rating: rating,
                    listing_starRating: starRating,
                    listing_address: address,
                    listing_close: close,
                    listing_url: url,
                    listing_img_url: img_url
                }
            );
        }
        else {
            continue
        }   
    }
    styledResults.sort(function(a,b){
        return b.rating-a.rating;
    })
    console.log(styledResults);
    return styledResults;
    
}

// appends the styled output to html table
function postResults(styledResults){
    for(i=0; i < styledResults.length; i++){
        // create new row, append to main table
        var tr = document.createElement("tr");
        document.getElementById("coffee-table").appendChild(tr);

        // Create cell for image
        var td_image = document.createElement("td");
        tr.appendChild(td_image);
        var image_box = document.createElement("div");
        image_box.style.backgroundImage = "url("+styledResults[i].listing_img_url+")";
        image_box.className = "imagebox";
        td_image.appendChild(image_box);

        // Create cell for name, link to google maps search
        var td_name = document.createElement("td");
        td_name.id = "td_name-"+i;
        td_name.className ="namelist";
        tr.appendChild(td_name);
        document.getElementById("td_name-"+i).innerHTML= "<a href='"+styledResults[i].listing_url+"' target=_blank>"+styledResults[i].listing_name+"</a>";

        // Create cell for address
        var td_address = document.createElement("td");
        var node_address = document.createTextNode(styledResults[i].listing_address);
        tr.appendChild(td_address);
        td_address.appendChild(node_address);
        
        // Create cell with close time
        var td_close = document.createElement("td");
        var node_close = document.createTextNode(styledResults[i].listing_close);
        tr.appendChild(td_close);
        td_close.appendChild(node_close);
        
        // Create cell with rating
        var td_rating = document.createElement("td");
        td_rating.id= "td_rating-"+i;
        tr.appendChild(td_rating);
        document.getElementById("td_rating-"+i).innerHTML= styledResults[i].listing_starRating;

    }
}

// unhides the results on the page (results appear at once instead of one by one)
function displayOnPage(){
    var item = document.getElementById("result");
    if (item) {
        if(item.className =='result hidden'){
            item.className = 'result unhidden' ;
        }else{
            item.className = 'hidden';
        }
    }
}

// **********************//
// *** Helpers *** //
// **********************//

// returns the current weekday (numerical, 0-6)
function getWeekday(){
    const weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    let now= moment().format("dddd");
    let weekday = weekDays.indexOf(now)

    let hours = moment().format("HH:mm");
    if (hours >= "19:01" || hours <= "05:00"){
        document.getElementById("late").innerText="It's pretty late for coffee. You might have a problem..."
    }
    return weekday;
}

// clears the html table
function clearHTMLTable(){
document.getElementById("coffee-table").innerHTML = ''
}

// reloads the page
function refreshPage(){
    location.reload();
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

function hideLoader(loader){
    loader.hidden = true
}

function disableButton(button){
    button.disabled = true
}

function enableButton(button){
    button.disabled = false
}