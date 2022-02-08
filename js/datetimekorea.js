//the date and time in Seoul
var date = new Date().toLocaleString("en-GB",{timeZone: "Asia/Seoul", timeZoneName: "long", day: "2-digit", month: "short", year: "numeric", hour: "numeric", minute: "numeric"})
document.getElementById("date").innerHTML = date;

//the date and time in Seoul in Korean
var datek = new Date().toLocaleString("ko-KR",{timeZone: "Asia/Seoul", timeZoneName: "long", day: "2-digit", month: "short", year: "numeric", hour: "numeric", minute: "numeric"})
document.getElementById("datek").innerHTML = datek;