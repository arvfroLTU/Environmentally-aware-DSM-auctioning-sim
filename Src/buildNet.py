
import math
import csv
import random
import json
import API_Handling
import envCalc
import yaml
import placeClasses

 API_KEY = 'AIzaSyC8ObuqZq-i3Ppwu2SbxPez4K567ZTzQNk'


''''

Each country has a local network stored withiin a network class variable
One route should be established between each neighbouring  country by means of the warehouse closest to the border
make a list of distances from each warehouse to each other warehouse in a country
sort each ciies distances to other cities by top 4, do this in order from most to least populated city in each country.
connect those in local variables connection1...connection.4

for loop that identifies each specific country and runs the following on said country
-   Scanner that searches through  every instance of one specific country in  varuhus.csv
-   Create Country object with country name
-   create City object with city name 
- 
-    ########### RESEARCH  ALL DISTANCES TO OTHER CITIES IN COUNTRY FOR ONE CITY ########
-    from most populated to least populated pick 4 closest, put in connection1...connection4
-   if city you want to add has full connections, skip to next city
-    TEST make sure no city has no delivery routes

###PROBLEMS####

* How to identify best city to neighbouring country
'''



def buildNet():
    return
    
def countryBuilder():
    countriesWithCities =[]
    built = []
    with open('Database/places.csv', 'r', newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            count = 0
            
            if (row[1] not in built):
                countryObject= placeClasses.genCountry(row[1])
                countryName = row[1]               
                
                for row in range(count,count + 10000000):           # given an organized cvs file, finds all instances of cities in country.
                    if row[1] != countryName:       
                        break
                    else:
                        countryObject.cities.append(row[0])
 
                built.append(x)
                countriesWithCities.append(countryObject) 
            count += 1
    return countriesWithCities 

def cityBuilder(name):
    x= placeClasses.City(name)
    return x
    
           
def nationalDistances(countryObj):
    cities = countryObj.cities
    citiesObj = []
    
    for i in range(0, len(cities)): # converts cities from variable to object
        scan=cityBuilder(cities[i])     
        citiesObj.append(scan)
        
    for i in range(0, len(citiesObj)):
        distanceList = []
        for j in range(0, len(citiesObj)):
            distance = API_Handling.Route(API_KEY,citiesObj[i],citiesObj[j])
            distanceList.append([citiesObj[j], distance])
        '''put smallest nonzero value  in connection 1 , 2nd smallest connection2 etc.'''
        sorted= sorted(distanceList)
        for i in range(0, len(distanceList)):
            count=0
            if (j.connection4 != None):
                break
            
            if (i.connection1 == None):
                i.connection1 == distanceList[count]
                x=connectionsScanner(j)
                
                
                
'''                if (i.connection2 == None):
                    
                    
                    if (i.connection3 == None):
                        
                        
                        if (i.connection4 == None)
'''
            
def connectionsScanner(cityObj):
    x= cityObj.connections
    if (x[0] ==None):
        return cityObj.connection1
    elif (x[1] == None):
        return cityObj.connection2
    elif (x[2] == None):
        return cityObj.connection3
    elif (x[3] == None):
        return cityObj.connection4


                

            
            
      