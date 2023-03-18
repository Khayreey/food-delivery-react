export  const allCountriesData = {
    "Egypt" : ["Cairo" , "Zagazig" , "Alexandria" , "Wadi El Gdeed" , "Al Giza" , "Al Behera" , "Banha"] , 
    "India" : ["Mumbai" , "Bangalore" , "Vadodara" , "Lucknow" , "Kolkata" ,"Patna"] , 
    "United Kingdom" : ["Mumbai" , "Bangalore" , "Vadodara" , "Lucknow" , "Kolkata" ,"Patna"] , 
    "United States" : []

}

export const listOfCountries = ()=>{
    return Object.keys(allCountriesData)
}

