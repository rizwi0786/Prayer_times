let searchBtn = document.getElementById("search-btn");
let cityRef_s = document.getElementById("city");
let Methodp_s = document.getElementById("mthd");
let TimeFormat_s = document.getElementById("tform");

console.log(10);
let gettime = () => {
    let cityValue = cityRef_s.value;
    console.log(cityValue);
    console.log(Methodp_s.value);
    console.log(TimeFormat_s.value);
};
searchBtn.addEventListener("click", gettime);