function time(){
    gapi.load('auth2', function() {
        // Library loaded.
      });
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

    var place_list =["ChIJ71NSoA-QREgRSi5-5BHm3rY","ChIJZQx2URiQREgR-IrnCqqKRQA","ChIJtQP4UhCQREgRMsUvHPZO6fI","ChIJCVc1oBCQREgR5fMws2OyUC8","ChIJh5de6RqQREgR2jn1JXzZMvs","ChIJk9vL0xaQREgRvI49nyqC_7o","ChIJK4qBWw6QREgRtMorlPJ5kKo","ChIJZxVqggWQREgRz_v7tdgcWKE","ChIJIT9A9Q-QREgRefkAx34T_Yo","ChIJtYH14A-QREgRxyB6M683veM","ChIJp6lWZRGQREgRMmC6w1hWLDc","ChIJG9LbsBaQREgR9BBXD1EtS8o","ChIJf9xyhBmQREgRuxYbOT8ZGAc","ChIJ6Z8_ANGRREgRCUDOKP4Bppg","ChIJacu1wA-QREgRfB5BS0A-LXw"];
    var API_key = "AIzaSyDqv_tc23G6BYtlNsuiVDIVi8CuOUsMJiI";
    var open_list = [];

    for (i=0 ; i < place_list.length; i++) {
        var url = "https://maps.googleapis.com/maps/api/place/details/json?placeid="+place_list[i]+"&fields=name,rating,vicinity,formatted_address,opening_hours&key=" + API_key;
        
        $.getJSON(url, function(data){
            var open = data.result.opening_hours.open_now
            var name = data.result.name;
            var rating = data.result.rating;
            // console.log(rating);
            
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

            if(name=="Portafilter"){
                var address = "88 North Main Street, Cork";
            } else if(name =="pop* coffee"){
                var address = "11 Saint Patrick's Quay, Cork";
            }else {
                var address = data.result.vicinity;
            }
            
            if(name=="Café Eco"){
                var close ="open 24hrs";
            } else {
                var close = data.result.opening_hours.periods[weekday].close.time;
            }

            if (open == true){
                
                var open_entry = name +" - "+ address +" - "+ close +" - "+ rating;
                open_list.push(open_entry);
                // console.log(open_list);

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

                var index = open_list.indexOf(open_entry);
                // console.log(index);

                var td_rating = document.createElement("td");
                td_rating.id= "td_rating-"+index;
                tr.appendChild(td_rating);
                document.getElementById("td_rating-"+index).innerHTML= star_rating;
                
            } else {
                console.log(name + " - " + address +" is not open.")
            }
        })
    }

    /* var index = open_list.indexOf(open_entry);
    $("#td_rating-"+i).append(star_rating);
    document.getElementById("td_rating-"+i).innerHTML= star_rating; */
}

function delete_table(){
var clear = document.getElementById("coffee-table");
clear.innerHTML = '';
}