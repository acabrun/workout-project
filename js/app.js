/*chargement du son*/

let audio,
exoTime,
restTime,
nbSerie,
nbExo,
currentExo,
currentSerie,
currentTime;

$('#introButton').on('click', function() {
    $('#intro').slideToggle();
    $('#instruction').slideToggle();
});

$('#goButton').on('click', function() {
    $('#instruction').slideToggle();
    $('#main_screen').slideToggle();
})


// initialization goal time
function setGoalTime(goal, display) {
    
    $(goal).on('blur', function(e) {
        
        if (goal === '#setExoTime') {
            exoTime = e.target.value;
            $(display).text(exoTime);
        } else {
            restTime = e.target.value;
            $(display).text(restTime);
        }
    })
}

// initialization goal exo & series
function setGoalExo(goal, display) {
    
    $(goal).on('blur', function(e) {
        
        if (goal === '#setNbSeries') {
            nbSerie = e.target.value;
            currentSerie = 1;
            $(display).text(currentSerie + '/' + nbSerie);
        } else {
            nbExo = e.target.value;
            currentExo = 1;
            $(display).text(currentExo + '/' + nbExo);
        }
    })
}

setGoalTime('#setExoTime', '#exoTime');
setGoalTime('#setRestTime', '#restTime');

setGoalExo('#setNbSeries', '#nbSerie');
setGoalExo('#setNbOfExo', '#nbExo');


// display current time
function displayCurrentTime() {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    currentTime = h + 'h' + m;
    $('#currentTime').text(currentTime);
}
displayCurrentTime();
setInterval(displayCurrentTime, 15000);

// timer
function timer() {
    let s = 0,
        m = 0;
    setInterval(function() {
        s += 1;
        if (s<60) {
            $('#timer').text(m + "'" + s + '"')
        }else if(s===60) {
            s=0;
            m += 1;
            $('#timer').text(m + "'" + s + '"');
        }

    }, 1000)
}

// countdown    
function countdown(typeOfTimer) {
    let timeArray = typeOfTimer.split(':');
    let m = timeArray[0];
    let s = timeArray[1];
    console.log(m +' et '+s);

    setInterval(function() {
        s -= 1;
        if (s>0) {
            $('#exoTime').text(m + "'" + s + '"')
        }else if (s===0) {
            s = 59;
            m -= 1;
            $('#exoTime').text(m + "'" + s + '"')
        }

    }, 1000)
}

 


// start/stop button
$('#startStopButton').on('click', function() {
    timer();
    countdown(exoTime);
})





