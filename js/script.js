function time(){
    var now= moment().format("dddd");
    if(now == "Sunday"){
        var weekday = 0
    } else if (now =="Monday"){
        var weekday = 1
    } else if (now == "Tuesday"){
        var weekday = 2
    } else if (now=="Wednesday"){
        var weekday = 3
    } else if (now =="Thursday"){
        var weekday = 4
    } else if (now == "Friday"){
        var weekday = 5
    } else if (now == "Saturday"){
        var weekday = 6
    } else {
        console.log("oops, something went wrong converting weekdays")
    }
    get_coffee(weekday);
}

function get_coffee(weekday){
    
    delete_table();

    var place_list =["ChIJ71NSoA-QREgRSi5-5BHm3rY","ChIJZQx2URiQREgR-IrnCqqKRQA","ChIJtQP4UhCQREgRMsUvHPZO6fI","ChIJCVc1oBCQREgR5fMws2OyUC8","ChIJh5de6RqQREgR2jn1JXzZMvs","ChIJk9vL0xaQREgRvI49nyqC_7o","ChIJK4qBWw6QREgRtMorlPJ5kKo","ChIJZxVqggWQREgRz_v7tdgcWKE","ChIJIT9A9Q-QREgRefkAx34T_Yo","ChIJtYH14A-QREgRxyB6M683veM"];
    var API_key = "AIzaSyDqv_tc23G6BYtlNsuiVDIVi8CuOUsMJiI";

    for (i=0 ; i < place_list.length; i++) {
        var url = "https://maps.googleapis.com/maps/api/place/details/json?placeid="+place_list[i]+"&fields=name,rating,vicinity,formatted_address,opening_hours&key=" + API_key;
        $.getJSON(url, function(data){
            var open = data.result.opening_hours.open_now
            var name = data.result.name;
            var address = data.result.vicinity;
            var rating = data.result.rating;
            console.log(rating);
            
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
                star_rating = "<span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star'></span>";
            } else if(rating >= 4.5 && rating < 5){
                star_rating = "<span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fas fa-star-half-alt checked'></span>";
            } else if(rating = 5){
                star_rating = "<span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span>";
            } else {
                console.log("oops, something went wrong with the rating");
            }
            
            if(name=="Café Eco"){
                var close ="open 24hrs";
            } else {
                var close = data.result.opening_hours.periods[weekday].close.time;
            }
            if (open == true){
                var tr = document.createElement("tr");
                document.getElementById("coffee-table").appendChild(tr);

                var td_name = document.createElement("td");
                var node_name = document.createTextNode(name);
                tr.appendChild(td_name);
                td_name.appendChild(node_name);

                var td_address = document.createElement("td");
                var node_address = document.createTextNode(address);
                tr.appendChild(td_address);
                td_address.appendChild(node_address);

                var td_close = document.createElement("td");
                var node_close = document.createTextNode(close);
                tr.appendChild(td_close);
                td_close.appendChild(node_close);

                var td_rating = document.createElement("td");
                td_rating.id= "td_rating-"+i;
                tr.appendChild(td_rating);
                document.getElementById("td_rating-"+i).innerHTML= star_rating;
            } else {
                console.log(name + " - " + address +" is not open.")
            }
            
        })
    }
}

function delete_table(){
var clear = document.getElementById("coffee-table");
clear.innerHTML = '';
}