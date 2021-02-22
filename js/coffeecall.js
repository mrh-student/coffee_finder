//**********************
//*** Footer ***
//**********************
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

// called when page opens / refreshes
function runCoffeeSearch(){
    clearHTMLTable();
    $.get("./getdata.php").done(function(data){
        console.log(data);
        data = data.replace('<html>','');
        data = data.replace('<body>','');
        data = data.replace('</html>','');
        data = data.replace('</body>','');
        data = data.replace('Array','');
        let queryResults = JSON.parse(data);
        queryResults.sort(sortByRating);
        console.log(queryResults);
        constructPageElements(queryResults);
        displayOnPage();
    });
    
    //show the refresh button
    refreshButton.innerText = "Refresh";
    refreshButton.setAttribute("onClick","runCoffeeSearch()");
}

function constructPageElements(queryResults){
    queryResults.forEach(function(result){
        if(isOpenNow(result)){
            const name = result.name;
            const starRating = getStarRating(result.rating);
            const address = result.address;
            const img = result.img;
            const url = result.url;

            // create new row, append to main table
            var tr = document.createElement("tr");
            coffeeTable.appendChild(tr);

            // Create cell for image
            var tdImage = document.createElement("td");
            var imageBox = document.createElement("div");
            imageBox.style.backgroundImage = "url("+img+")";
            imageBox.className = "imagebox";
            tdImage.appendChild(imageBox);
            tr.appendChild(tdImage);

            // Create cell for name, link to google maps search
            var tdName = document.createElement("td");
            tdName.innerHTML = "<a href='"+url+"' target=_blank>"+name+"</a>";
            tdName.className ="namelist";
            tr.appendChild(tdName);

            // Create cell for address
            var tdAddress = document.createElement("td");
            var nodeAddress = document.createTextNode(address);
            tdAddress.appendChild(nodeAddress);
            tr.appendChild(tdAddress);
            
            // Create cell with close time
            var tdClose = document.createElement("td");
            var nodeClose = document.createTextNode(getClosingTime(result));
            tdClose.appendChild(nodeClose);
            tr.appendChild(tdClose);
            
            // Create cell with rating
            var tdRating = document.createElement("td");
            tdRating.innerHTML = starRating;
            tr.appendChild(tdRating);
            }
    })

    
}

// unhides the results on the page (results appear at once instead of one by one)
function displayOnPage(){
    if (resultBox) {
        if(resultBox.className =='result hidden'){
            resultBox.className = 'result unhidden' ;
        }else{
            resultBox.className = 'hidden';
        }
    }
}


// **********************//
// *** Helpers *** //
// **********************//

function isOpenNow(result){
    let openNow = false;

    let timeNow = getHHMMTime(new Date());

    switch(today.getDay()){
        case 0:
            if(result.openSunday == '24hr' || (result.openSunday != 'undefined' && timeNow > result.openSunday && timeNow < result.closeSunday)){
                openNow = true;
            } 
            break;
        case 1:
            if(result.openMonday == '24hr' || (result.openMonday != 'undefined' && timeNow > result.openMonday && timeNow < result.closeMonday)){
                openNow = true;
            } 
            break;
        case 2:
            if(result.openTuesday = '24hr' || (result.openTuesday != 'undefined' && timeNow > result.openTuesday && timeNow < result.closeTuesday)){
                openNow = true;
            } 
            break;
        case 3:
            if(result.openWednesday=='24hr' || (result.openWednesday != 'undefined' && timeNow > result.openWednesday && timeNow < result.closeWednesday)){
                openNow = true;
            } 
            break;
        case 4:
            if(result.openThursday == '24hr' || (result.openThursday != 'undefined' && timeNow > result.openThursday && timeNow < result.closeThursday)){
                openNow = true;
            } 
            break;
        case 5:
            if(result.openFriday == '24hr' || (result.openFriday != 'undefined' && timeNow > result.openFriday && timeNow < result.closeFriday)){
                openNow = true;
            } 
            break;
        case 6:
            if(result.openSaturday=='24hr' || (result.openSaturday != 'undefined' && timeNow > result.openSaturday && timeNow < result.closeSaturday)){
                openNow = true;
            } 
    }
    if (timeNow >= "19:01" || timeNow <= "05:00"){
        lateLabel.innerText="It's pretty late for coffee. You might have a problem...";
    }
    return openNow;
}

function getClosingTime(result){
    let closingTime;
    let alwaysopen = 'open 24 hours';
    switch(today.getDay()){
        case 0:
            result.closeSunday == '24hr' ? closingTime = alwaysopen : closingTime = result.closeSunday;
            break;
        case 1:
            result.closeMonday == '24hr' ? closingTime = alwaysopen : closingTime = result.closeMonday;
            break;
        case 2:
            result.closeTuesday == '24hr' ? closingTime = alwaysopen : closingTime = result.closeTuesday;
            break;
        case 3:
            result.closeWednesday == '24hr' ? closingTime = alwaysopen : closingTime = result.closeWednesday;
            break;
        case 4:
            result.closeThursday == '24hr' ? closingTime = alwaysopen : closingTime = result.closeThursday;
            break;
        case 5:
            result.closeFriday == '24hr' ? closingTime = alwaysopen : closingTime = result.closeFriday;
            break;
        case 6:
            result.closeSaturday == '24hr' ? closingTime = alwaysopen : closingTime = result.closeSaturday;
    }
    return closingTime;
}