import requests
import json
import csv
import mysql.connector

# global vars
api_key = "google_api_key"
address_list = ['ChIJk9vL0xaQREgRvI49nyqC_7o','ChIJudvXdxqQREgRjJWDk-ywgPc','ChIJh5de6RqQREgR2jn1JXzZMvs','ChIJp6lWZRGQREgRMmC6w1hWLDc','ChIJtQP4UhCQREgRMsUvHPZO6fI','ChIJq4ERkxeQREgRdtS2u-zpZsU','ChIJCVc1oBCQREgR5fMws2OyUC8','ChIJf9xyhBmQREgRuxYbOT8ZGAc','ChIJG9LbsBaQREgR9BBXD1EtS8o','ChIJZQx2URiQREgR-IrnCqqKRQA','ChIJ71NSoA-QREgRSi5-5BHm3rY','ChIJIT9A9Q-QREgRefkAx34T_Yo','ChIJZxVqggWQREgRz_v7tdgcWKE','ChIJtYH14A-QREgRxyB6M683veM','ChIJcyCyrT2RREgRghyRx0rxxy0','ChIJuyvrIj9fQ0gRq2rKBXJyoDE','ChIJ_xCpHqCRREgRczFjFdjosmU','ChIJQ-gFuIWRREgRRuWGI3MxM58', 'ChIJ16VDDnKRREgRVYnylxMYIMg','ChIJ8-0VzBCRREgRSaVPbuEld8E', 'ChIJ_4fsfFSRREgRwZdiw3OXsMY'] 
cafe_result_list = []

# objects
class cafe:
  def __init__(self, place_id, name, rating, url, imgurl, vicinity, sunday, monday, tuesday, wednesday, thursday, friday, saturday):
    self.place_id = place_id
    self.name = name
    self.rating = rating
    self.url = url
    self.imgurl = imgurl
    self.vicinity = vicinity
    self.sunday = sunday
    self.monday = monday
    self.tuesday = tuesday
    self.wednesday = wednesday
    self.thursday = thursday
    self.friday = friday
    self.saturday = saturday
class opening_times:
    def __init__(self, open, close):
        self.open = open
        self.close = close

# make api call 
for place in address_list:
    print("making api call for "+place)
    #construct url
    url = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+place+"&fields=place_id,name,rating,vicinity,opening_hours,url&key=" +api_key
    
    # make api call, receive response
    response = requests.get(url).json()
    placesAPI_data = response['result']

    #read & format response
    #put into object
    empty_oh_object = opening_times('undefined', 'undefined')

    cp = cafe(placesAPI_data['place_id'], placesAPI_data['name'], placesAPI_data['rating'], placesAPI_data['url'],"./images/cafes/"+placesAPI_data['place_id']+".png",placesAPI_data['vicinity'], empty_oh_object, empty_oh_object,empty_oh_object,empty_oh_object,empty_oh_object,empty_oh_object,empty_oh_object)

    opening_hours = placesAPI_data['opening_hours']
    periods = opening_hours['periods']

    for item in periods:
        close_data = item['close']
        week_day_close = close_data['day']
        closing_time_hh = close_data['time'][:2]
        closing_time_mm = close_data['time'][2:]
        closing_time = closing_time_hh + ":" + closing_time_mm

        open_data = item['open']
        week_day_open = open_data['day']
        opening_time_hh = open_data['time'][:2]
        opening_time_mm = open_data['time'][2:]
        opening_time = opening_time_hh + ":" + opening_time_mm

        oh = opening_times(opening_time, closing_time)

        if week_day_close == 0:
            cp.sunday = oh
        elif week_day_close == 1:
            cp.monday = oh
        elif week_day_close == 2:
            cp.tuesday = oh
        elif week_day_close == 3:
            cp.wednesday = oh
        elif week_day_close == 4:
            cp.thursday = oh
        elif week_day_close == 5:
            cp.friday = oh
        elif week_day_close == 6:
            cp.saturday = oh
    # append object to list
    cafe_result_list.append(cp)

print("collected "+str(len(cafe_result_list))+" results from api")

# write to csv file
print("write csv backup file")
with open('coffeelist.csv', 'w') as csvfile:
    fieldnames = ['place_id','name', 'rating','url','imgurl','vicinity', 'sunday_open','sunday_close', 'monday_open','monday_close', 'tuesday_open','tuesday_close', 'wednesday_open','wednesday_close', 'thursday_open','thursday_close', 'friday_open','friday_close', 'saturday_open','saturday_close']
    
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for item in cafe_result_list:
        place_id = item.place_id
        name = item.name
        rating = item.rating
        url = item.url
        imgurl = item.imgurl
        vicinity = item.vicinity
        monday_open = item.monday.open
        monday_close = item.monday.close
        tuesday_open = item.tuesday.open
        tuesday_close = item.tuesday.close
        wednesday_open = item.wednesday.open
        wednesday_close = item.wednesday.close
        thursday_open = item.thursday.open
        thursday_close = item.thursday.close
        friday_open = item.friday.open
        friday_close = item.friday.close
        saturday_open = item.saturday.open
        saturday_close = item.saturday.close
        sunday_open = item.sunday.open
        sunday_close = item.sunday.close
               
        writer.writerow({'place_id': place_id, 'name': name, 'rating': rating, 'url': url, 'imgurl': imgurl, 'vicinity': vicinity, 'monday_open': monday_open, 'monday_close': monday_close, 'tuesday_open': tuesday_open, 'tuesday_close':tuesday_close, 'wednesday_open':wednesday_open, 'wednesday_close':wednesday_close, 'thursday_open':thursday_open, 'thursday_close':thursday_close, 'friday_open':friday_open, 'friday_close':friday_close, 'saturday_open':saturday_open, 'saturday_close':saturday_close, 'sunday_open':sunday_open, 'sunday_close':sunday_close})

# update database
for item in cafe_result_list:
    print(item.name + " database call")
    mydb = mysql.connector.connect(
    host="server_name",
    user="user_name",
    password="pw",
    database="db_name"
    )

    mycursor = mydb.cursor()

    sql = "UPDATE coffeeshops SET openSunday ='" +item.sunday.open+ "', closeSunday ='"+item.sunday.close+"', openMonday='"+item.monday.open+"', closeMonday='"+item.monday.close+"', openTuesday='"+item.tuesday.open+"', closeTuesday='"+item.tuesday.close+"', openWednesday='"+item.wednesday.open+"', closeWednesday='"+item.wednesday.close+"', openThursday='"+item.thursday.open+"', closeThursday='"+item.thursday.close+"', openFriday='"+item.friday.open+"', closeFriday='"+item.friday.close+"', openSaturday='"+item.saturday.open+"', closeSaturday='"+item.saturday.close+"', url='"+item.url+"', rating="+str(item.rating)+" WHERE placeId ='" + item.place_id +"'"

    mycursor.execute(sql)

    mydb.commit()

    print(mycursor.rowcount, "record(s) affected")