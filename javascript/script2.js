let searchBtn = document.getElementById("search-btn");
let cityRef_s = document.getElementById("city");
// let citync = document.getElementById("citynamed");
// let TimeZone_s = document.getElementById("TZone");
let Methodp_s = document.getElementById("mthd");
let TimeFormat_s = document.getElementById("tform");
// API_key = "bfbbc2f622d38d5d40c63e2633b83dde";
// console.log(API_key);

let gettime = () => {
  let cityValue = cityRef_s.value;
  // console.log(cityValue);
  // let f="dfhdff"
  console.log(cityValue);
  console.log(Methodp_s.value);
    console.log(TimeFormat_s.value);
  // var api_s = `http://api.positionstack.com/v1/forward?access_key=${API_key}&query=${cityValue}&timezone_module=1&sun_module=1`;
  var api_s = `https://api.opencagedata.com/geocode/v1/json?q=${cityValue}&key=deba83f3ba554b428c3f21e2874143ac&pretty=1`;
  console.log(api_s);
  // console.log(year_s.value);
  console.log(yr);

  cityRef_s.value = "";
  
  // console.log(cityRef_s.value);
  
  fetch(api_s)
    .then((resp2) => resp2.json())
    //If city name is valid
    .then((data2) => {
      console.log(data2);
      console.log(data2.results[0].geometry.lat);
      console.log(data2.results[0].geometry.lng);
      ///value already
      var lat_s = data2.results[0].geometry.lat;
      var lon_s = data2.results[0].geometry.lng;
      var city_name = data2.results[0].components.city;
      if(city_name!=undefined)
      {
        city_disp.innerHTML = `${city_name}`;
      }
      else{
        city_disp.innerHTML = `${cityValue}`;
      }
      console.log(city_name);
      
      var yrr_s = yr;
      var tz_s = data2.results[0].annotations.timezone.name;
      console.log(tz_s);
      var s_setu = new Date(data2.results[0].annotations.sun.set.astronomical * 1000);
      sset_s = s_setu.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });
      console.log(sset_s);

      

      API_pr_s = `https://www.moonsighting.com/time_json.php?year=${yrr_s}&tz=${tz_s}&lat=${lat_s}&lon=${lon_s}&method=${Methodp_s.value}&both=false&time=${TimeFormat_s.value}`;
      console.log(API_pr_s);

      fetch(API_pr_s)
        .then((resp3) => resp3.json())
        //If city name is valid
        .then((data3) => {
          console.log(data3);

          console.log(data3.times[day - 1]);
          console.log(data3.times[day - 1].times);
          console.log(data3.times[day - 1].times.fajr);
          console.log(data3.times[day - 1].times.dhuhr);
          console.log(data3.times[day - 1].times.asr);
          console.log(data3.times[day - 1].times.maghrib);
          console.log(data3.times[day - 1].times.isha);

          // z.innerHTML = `${(data3.times[day - 1].times.sunrise).toUpperCase()} ${sset}`;
          console.log(data3.times[day - 1].times.sunrise);
          console.log(sset_s);

          // time add 
          rise_td.innerHTML = `${data3.times[day - 1].times.sunrise}`;
          set_td.innerHTML = `${sset_s}`;
          fs_tm.innerHTML=`${data3.times[day - 1].times.fajr}`;
          fe_tm.innerHTML=`${data3.times[day - 1].times.sunrise}`;
          ds_tm.innerHTML=`${data3.times[day - 1].times.dhuhr}`;
          de_tm.innerHTML=`${data3.times[day - 1].times.asr}`;
          as_tm.innerHTML=`${data3.times[day - 1].times.asr}`;
          ae_tm.innerHTML=`${data3.times[day - 1].times.maghrib}`;
          ms_tm.innerHTML=`${data3.times[day - 1].times.maghrib}`;
          me_tm.innerHTML=`${data3.times[day - 1].times.sset}`;
          is_tm.innerHTML=`${data3.times[day - 1].times.isha}`;
          ie_tm.innerHTML=`${data3.times[day - 1].times.fajr}`;
          if_tm.innerHTML=`${data3.times[day - 1].times.maghrib}`;
          sr_tm.innerHTML=`${data3.times[day - 1].times.fajr}`;

        });
    });
};
searchBtn.addEventListener("click", gettime);
// function myFunction() {
//   document.getElementsByClassName("scr").submit();
// }
