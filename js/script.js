$(document).ready(function(){
    $('#footer').hover(function(){
        $('#arrow').removeClass("fa-angle-up");
        $('#arrow').addClass("fa-angle-down");
    },
    function(){
        $('#arrow').addClass("fa-angle-up");
    });
});

function showme(){
    var item = document.getElementById("result");
    if (item) {
        if(item.className=='result hidden'){
            item.className = 'result unhidden' ;
        }else{
            item.className = 'hidden';
        }
    }
}

function time(){
    var hours = moment().format("HH:mm");
    var now= moment().format("dddd");
    if(now == "Monday"){
        var weekday = 0
    } else if (now =="Tuesday"){
        var weekday = 1
    } else if (now == "Wednesday"){
        var weekday = 2
    } else if (now=="Thursday"){
        var weekday = 3
    } else if (now =="Friday"){
        var weekday = 4
    } else if (now == "Saturday"){
        var weekday = 5
    } else if (now == "Sunday"){
        var weekday = 6
    } else {
        console.log("oops, something went wrong converting weekdays")
    }

    if (hours >= "19:01" || hours <= "05:00"){
        document.getElementById("late").innerText="It's pretty late for coffee. You might have a problem..."
    }

    var action_button = document.getElementById("open");
    var loader = document.getElementById("loader");
    loader.hidden = false;
    action_button.disabled = true;
    action_button.innerText = "Checking what's open, like";
    setTimeout(function(){
        action_button.innerText = "Checking what's open, like.";
    },1000);
    setTimeout(function(){
        action_button.innerText = "Checking what's open, like..";
    },2000);
    setTimeout(function(){
        action_button.innerText = "Checking what's open, like...";
    },3000);
    setTimeout(function(){
        action_button.innerText = "Checking what's open, like..";
    },4000);
    setTimeout(function(){
        action_button.innerText = "Checking what's open, like.";
    },5000);
    setTimeout(function(){
        action_button.innerText = "Checking what's open, like";
    },6000);
    
    setTimeout(function(){
        loader.hidden = true;
        action_button.disabled = false;
        action_button.innerText = "Refresh";
        action_button.setAttribute("onClick","refresh()");
        showme();
    },7000);
    
    coffeecall(weekday);
}

function coffeecall(weekday){
    delete_table();
    var request_list = [];
    var results_list = [];
    var map = new google.maps.Map(document.getElementById("map"),{
        center: {lat: 51.903614, lng: -8.468399},
        zoom: 15
    }); 
    var place_list = ["ChIJ71NSoA-QREgRSi5-5BHm3rY","ChIJZQx2URiQREgR-IrnCqqKRQA","ChIJtQP4UhCQREgRMsUvHPZO6fI","ChIJCVc1oBCQREgR5fMws2OyUC8","ChIJh5de6RqQREgR2jn1JXzZMvs","ChIJk9vL0xaQREgRvI49nyqC_7o","ChIJK4qBWw6QREgRtMorlPJ5kKo","ChIJZxVqggWQREgRz_v7tdgcWKE","ChIJIT9A9Q-QREgRefkAx34T_Yo","ChIJtYH14A-QREgRxyB6M683veM","ChIJp6lWZRGQREgRMmC6w1hWLDc","ChIJG9LbsBaQREgR9BBXD1EtS8o","ChIJf9xyhBmQREgRuxYbOT8ZGAc","ChIJ6Z8_ANGRREgRCUDOKP4Bppg","ChIJacu1wA-QREgRfB5BS0A-LXw","ChIJq4ERkxeQREgRdtS2u-zpZsU","ChIJD2uNdReQREgRbZ4vfjxOQG8","ChIJgxGCWxCQREgRqp9b9BkEjxs","ChIJudvXdxqQREgRjJWDk-ywgPc"];
    var place_length = place_list.length;

    for (i = 0; i < place_length; i++){
        var request = {
            placeId : place_list[i],
            fields: ['name', 'rating', 'vicinity', 'opening_hours']
        };
        request_list.push(request);
       

        (function (i) {
            // console.log(request_list[i]);
            setTimeout(function (){
                service = new google.maps.places.PlacesService(map);
                service.getDetails(request_list[i], callback);
            }, 300 * i);
        })(i);
        function callback(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                var is_open = place.opening_hours.open_now;
                if(is_open == true){
                    results_list.push(place);
                    console.log(place.name + " is open")
                } else {
                    console.log(place.name + " not open")
                }
            }
        } 
    }
    setTimeout(function(){
    console.log(results_list);
    list_setup(results_list,weekday);
    }, 6000);
}

function list_setup(results_list,weekday){
    
    // order results by rating
    results_list.sort(function(a,b){
        return b.rating-a.rating;
    })

    for(i=0; i < results_list.length; i++){
        // name 
        var name = results_list[i].name;
        //rating
        var rating = results_list[i].rating;

        if(rating < 0.5){
            star_rating = "<span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star'></span>";
        } else if(rating >= 0.5 && rating < 1){
            star_rating = "<span class='fas fa-star-half-alt checked'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star'></span>";
        } else if(rating >= 1 && rating < 1.5){
            star_rating = "<span class='fa fa-star checked'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star'></span>";
        } else if(rating >= 1.5 && rating < 2){
            star_rating = "<span class='fa fa-star checked'></span><span class='fas fa-star-half-alt checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star'></span><span class='fa fa-star'></span>";
        } else if(rating >= 2 && rating < 2.5){
            star_rating = "<span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><span class='fa fa-star'></span>";
        } else if(rating >= 2.5 && rating < 3){
            star_rating = "<span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fas fa-star-half-alt checked'></span><span class='fa fa-star'></span><span class='fa fa-star'></span>";
        } else if(rating >= 3 && rating < 3.5){
            star_rating = "<span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star'></span><span class='fa fa-star'></span>";
        } else if(rating >= 3.5 && rating < 4){
            star_rating = "<span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fas fa-star-half-alt checked'></span><span class='fa fa-star'></span>";
        } else if(rating >= 4 && rating < 4.5){
            star_rating = "<span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='far fa-star'></span>";
        } else if(rating >= 4.5 && rating < 5){
            star_rating = "<span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fas fa-star-half-alt checked'></span>";
        } else if(rating = 5){
            star_rating = "<span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span>";
        } else {
            console.log("oops, something went wrong with the rating");
        }

        // address
        if(name=="Portafilter"){
            var address = "88 North Main Street";
        } else if(name =="pop* coffee"){
            var address = "11 Saint Patrick's Quay";
        }else {
            var address_raw = results_list[i].vicinity;
            var address = address_raw.slice(0,-6);
        }
        
        //closing time
        if(name=="Café Eco"){
            var close ="open 24hrs";
        } else {
            var close_raw = results_list[i].opening_hours.periods[weekday].close.time;
            var close = close_raw.slice(0, 2) + ":" + close_raw.slice(2);
        }

        // google maps URL
        var url = "https://www.google.com/maps/search/"+name+"+"+address+"+Cork/";

        // images
        var image_list = [
            {
                name: "Portafilter",
                id: 0,
                image: "./images/cafes/portafilter.jpg"
            },
            {
                name: "Alchemy by The Lough",
                id: 1,
                image: "./images/cafes/alchemylough.jpg"
            },
            {
                name: "Three Fools Coffee",
                id: 2,
                image: "./images/cafes/threefools.jpg"
            },
            {
                name: "Filter",
                id: 3,
                image: "./images/cafes/filter.jpg"
            },
            {
                name: "Myo Cafe",
                id: 4,
                image: "./images/cafes/myo.jpg"
            },
            {
                name: "Cork Coffee Roasters, French Church",
                id: 5,
                image: "./images/cafes/ccrfrench.jpg"
            },
            {
                name: "Cafe Depeche",
                id: 6,
                image: "./images/cafes/depeche.png"
            },
            {
                name: "Soma Coffee Company",
                id: 7,
                image: "./images/cafes/soma.jpg"
            },
            {
                name: "Alchemy Cork",
                id: 8,
                image: "./images/cafes/alchemy.jpg"
            },
            {
                name: "Warren Allen Coffee",
                id: 9,
                image: "./images/cafes/warrenallen.png"
            },
            {
                name: "Priory Coffee Co.",
                id: 10,
                image: "./images/cafes/priory.jpg"
            },
            {
                name: "The Kino",
                id: 11,
                image: "./images/cafes/kino.jpg"
            },
            {
                name: "Cork Coffee Roasters, Bridge Street",
                id: 12,
                image: "./images/cafes/ccrbridge.jpg"
            },
            {
                name: "Nectar Coffee",
                id: 13,
                image: "./images/cafes/nectar.jpg"
            },
            {
                name: "Dukes Coffee Company",
                id: 14,
                image: "./images/cafes/dukes.png"
            },
            {
                name: "The Bookshelf Coffee House",
                id: 15,
                image: "./images/cafes/bookshelf.png"
            },
            {
                name: "Union Grind Espresso Bar",
                id: 16,
                image: "./images/cafes/union.png"
            },
            {
                name: "pop* coffee",
                id: 17,
                image: "./images/cafes/popcoffee.png"
            },
            {
                name: "Café Eco",
                id: 18,
                image: "./images/cafes/eco.jpg"
            }
        ]
        console.log(image_list[0].url);

        if (name == "Portafilter"){
            var img_url = image_list[0].image;
        } else if (name == "pop* coffee"){
            var img_url = image_list[17].image;
        } else if (name == "Alchemy by The Lough"){
            var img_url = image_list[1].image;
        } else if (name == "Three Fools Coffee"){
            var img_url = image_list[2].image;
        } else if (name == "Filter"){
            var img_url = image_list[3].image;
        } else if (name == "Myo Cafe"){
            var img_url = image_list[4].image;
        } else if (name == "Cork Coffee Roasters" && address == "2 French Church Street"){
            var img_url = image_list[5].image;
        } else if (name == "Cafe Depeche"){
            var img_url = image_list[6].image;
        } else if (name == "Soma Coffee Company"){
            var img_url = image_list[7].image;
        } else if (name == "Alchemy Cork"){
            var img_url = image_list[8].image;
        } else if (name == "Warren Allen Coffee"){
            var img_url = image_list[9].image;
        } else if (name == "Priory Coffee Co."){
            var img_url = image_list[10].image;
        } else if (name == "The Kino"){
            var img_url = image_list[11].image;
        } else if (name == "Cork Coffee Roasters" && address == "2 Bridge Street"){
            var img_url = image_list[12].image;
        } else if (name == "Nectar Coffee"){
            var img_url = image_list[13].image;
        } else if (name == "Dukes Coffee Company"){
            var img_url = image_list[14].image;
        } else if (name == "The Bookshelf Coffee House"){
            var img_url = image_list[15].image;
        } else if (name == "Union Grind Espresso Bar"){
            var img_url = image_list[16].image;
        } else if (name == "Café Eco"){
            var img_url = image_list[18].image;
        }
        

        // console.log(name,rating, address,star_rating,close,url);
        create_table(name,star_rating,address,close,url,results_list, img_url);
    }
}

function create_table(name,star_rating,address,close,url,results_list, img_url){

    var index = results_list.indexOf(results_list[i]);

    var tr = document.createElement("tr");
    document.getElementById("coffee-table").appendChild(tr);

    var td_image = document.createElement("td");
    // td_image.id = "td_image-"+index;
    tr.appendChild(td_image);
    var image_box = document.createElement("div");
    // image_box.id = "td_image-"+index;
    image_box.style.backgroundImage = "url("+img_url+")";
    image_box.className = "imagebox";
    td_image.appendChild(image_box);

   /*  document.getElementById("td_image-"+index).innerHTML = "<img src='"+img_url+"' height='100px' width='100px'>"; */

    var td_name = document.createElement("td");
    td_name.id = "td_name-"+index;
    td_name.className ="namelist";
    tr.appendChild(td_name);
    document.getElementById("td_name-"+index).innerHTML= "<a href='"+url+"' target=_blank>"+name+"</a>";

    var td_address = document.createElement("td");
    var node_address = document.createTextNode(address);
    tr.appendChild(td_address);
    td_address.appendChild(node_address);

    var td_close = document.createElement("td");
    var node_close = document.createTextNode(close);
    tr.appendChild(td_close);
    td_close.appendChild(node_close);
    
    var td_rating = document.createElement("td");
    td_rating.id= "td_rating-"+index;
    tr.appendChild(td_rating);
    document.getElementById("td_rating-"+index).innerHTML= star_rating;
}

function delete_table(){
var clear = document.getElementById("coffee-table");
clear.innerHTML = '';
}

function refresh(){
    location.reload();
}
