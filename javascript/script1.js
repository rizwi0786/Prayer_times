var city_disp = document.getElementById("citynamed");
var rise_td = document.getElementById("risetm");
var set_td = document.getElementById("settm");
var fs_tm = document.getElementById("fst_tm");
var fe_tm = document.getElementById("fen_tm");
var ds_tm = document.getElementById("dst_tm");
var de_tm = document.getElementById("den_tm");
var as_tm = document.getElementById("ast_tm");
var ae_tm = document.getElementById("aen_tm");
var ms_tm = document.getElementById("mst_tm");
var me_tm = document.getElementById("men_tm");
var is_tm = document.getElementById("ist_tm");
var ie_tm = document.getElementById("ien_tm");
var if_tm = document.getElementById("ift_tm");
var sr_tm = document.getElementById("sh_tm");
// fe_tm=10;

// variable needed
var lat, lon, t_zo;
var yr;
var sset, srise, fajr, duhr, asr, magrib, isha;

const d = new Date();
var start = new Date(d.getFullYear(), 0, 0);
var diff = d - start;
var oneDay = 1000 * 60 * 60 * 24;
var day = Math.floor(diff / oneDay);

yr = d.toLocaleDateString("en-US", { year: "numeric" });

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(howPosition);
  } else {
    city_disp.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function howPosition(position) {
  lon = position.coords.longitude;
  lat = position.coords.latitude;
  console.log(lat);
  console.log(lon);
  API_key = "bfbbc2f622d38d5d40c63e2633b83dde";
  // API_url = `http://api.positionstack.com/v1/reverse?access_key=${API_key}&query=${lat},${lon}&timezone_module=1&sun_module=1`;
  API_url = `https://api.opencagedata.com/geocode/v1/json?q=${lat},${lon}&key=d7d8b0f705b64f37875c806355188240`;
  console.log(API_url);

  
  fetch(API_url)
    .then((resp) => resp.json())
    //If city name is valid
    .then((data) => {
      console.log(data);
      console.log(data.results[0].annotations.timezone.name);
      // console.log(data.results[0].components.city);
      let ct=data.results[0].components.city;
      // console.log(data.results[0].annotations.sun.set.astronomical);
      if(ct!=undefined)
      {
        city_disp.innerHTML = `${data.results[0].components.city}`;
      }
      else{
        city_disp.innerHTML = `Ur Location`;
      }

      
      
      t_zo = data.results[0].annotations.timezone.name;

      var st_time = new Date(data.results[0].annotations.sun.set.astronomical * 1000);
      sset = st_time.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });
      console.log(sset);
      API_url2 = `https://www.moonsighting.com/time_json.php?year=${yr}&tz=${t_zo}&lat=${lat}&lon=${lon}&method=0&both=false&time=1`;
      console.log(API_url2);

      //   fetching api parayer
      fetch(API_url2)
        .then((resp2) => resp2.json())
        //If city name is valid
        .then((data2) => {
          console.log(data2);

          console.log(data2.times[day - 1]);
          console.log(data2.times[day - 1].times);
          console.log(data2.times[day - 1].times.fajr);
          console.log(data2.times[day - 1].times.dhuhr);
          console.log(data2.times[day - 1].times.asr);
          console.log(data2.times[day - 1].times.maghrib);
          console.log(data2.times[day - 1].times.isha);
          console.log(data2.times[day - 1].times.sunrise);

          rise_td.innerHTML = `${data2.times[day - 1].times.sunrise}`;
          set_td.innerHTML = `${sset}`;
          fs_tm.innerHTML=`${data2.times[day - 1].times.fajr}`;
          fe_tm.innerHTML=`${data2.times[day - 1].times.sunrise}`;
          ds_tm.innerHTML=`${data2.times[day - 1].times.dhuhr}`;
          de_tm.innerHTML=`${data2.times[day - 1].times.asr}`;
          as_tm.innerHTML=`${data2.times[day - 1].times.asr}`;
          ae_tm.innerHTML=`${data2.times[day - 1].times.maghrib}`;
          ms_tm.innerHTML=`${data2.times[day - 1].times.maghrib}`;
          me_tm.innerHTML=`${data2.times[day - 1].times.sset}`;
          is_tm.innerHTML=`${data2.times[day - 1].times.isha}`;
          ie_tm.innerHTML=`${data2.times[day - 1].times.fajr}`;
          if_tm.innerHTML=`${data2.times[day - 1].times.maghrib}`;
          sr_tm.innerHTML=`${data2.times[day - 1].times.fajr}`;
          
        });
    });
}
getLocation();
