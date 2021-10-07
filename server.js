const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
const app = express();

app.use(express.static('public'));
app.set('view engine', ejs);
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.render('countryData.ejs', {countryData: ''});
});
 //url = 'https://api.countrylayer.com/v2/name/Estonia?access_key=5d443d0c684c2efbd86527a2654f55c6&FullText=true';
        
app.post('/countries', (req, res)=>{
    let url;
    let userCountry = req.body.country;
    if(userCountry === 'Estonia'){
        //url = 'https://restcountries.com/v3/name/estonia?fullText=true';
        url = 'https://restcountries.com/v2/name/estonia?fullText=true';
    } else if(userCountry === 'Latvia'){
        url = 'https://restcountries.com/v2/name/latvia?fullText=true';
    } else {
        url = 'https://restcountries.com/v2/name/lithuania?fullText=true';
    }
    console.log(url);
    axios.get(url)
    .then((response)=>{
        console.log(response.data);
        
        let countryData = {
            countryName: response.data[0].name,
            countryTopLevelDomain: response.data[0].topLevelDomain,
            countryCallingCode : response.data[0].callingCodes,
            countryCapital : response.data[0].capital,
            countryRegion : response.data[0].region,
            countrySubRegion : response.data[0].subregion,
            countryPopulation : response.data[0].population,
            countryTimezone : response.data[0].timezones,
            countryLanguageInEnglish : response.data[0].languages[0].name,
            countryCurrencyCode : response.data[0].currencies[0].code,
            countryCurrencyName : response.data[0].currencies[0].name,
            countryCurrencySymbol : response.data[0].currencies[0].symbol,
            //countryFlagUrl : response.data[0].flags[1]
            countryFlagUrl : response.data[0].flag
        }
        console.log(countryData);
        res.render('countryData.ejs', {countryData: countryData});
    })
    .catch((error)=>{
        console.log(error);
    });
    
});
/*
app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});
*/
app.listen(process.env.PORT || 3000, ()=>{
    console.log('Server has started.');
});