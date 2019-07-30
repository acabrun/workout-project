/*-------------chargement du son-----------------------*/

let audio,
    exoTime,
    restTime,
    nbSerie,
    nbExo,
    currentExo,
    currentSerie,
    currentTime,
    timerID,
    timerExoID;

$('#introButton').on('click', function() {
    $('#intro').slideToggle();
    $('#instruction').slideToggle();
});

$('#goButton').on('click', function() {
    $('#instruction').slideToggle();
    $('#main_screen').slideToggle();
})


// -------------------initialization goal time------------------------------
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

// ------------------initialization goal exo & series-----------------------
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


// ----------------------------display current time-------------------------------
function displayCurrentTime() {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    currentTime = h + 'h' + m;
    $('#currentTime').text(currentTime);
}

displayCurrentTime();
setInterval(displayCurrentTime, 15000);

// --------------------------------timer--------------------------------------------
let sTimer = 0,
    mTimer = 0;

function timer() {

    timerID = setInterval(function() {
        sTimer += 1;
        if (sTimer < 60) {
            $('#timer').text(mTimer + "'" + sTimer + '"')
        } else if (sTimer === 60) {
            sTimer = 0;
            mTimer += 1;
            $('#timer').text(mTimer + "'" + sTimer + '"');
        }

    }, 1000)
}

// -------------------------COUNTDOWN ----------A REFAIRE TOTALEMENT-------------------------
let timeArray, mCountdown, sCountdown; 

function countdown(typeOfTimer, yet) {  // yet param is used to keep countdown after call startStopButton
                                        // without initialization
    
    if (currentSerie === nbSerie && currentExo === nbExo) {
        //END OF WORKOUT
        console.log('End of workout');

    } else {
        switch (yet) {
        case false:  // INITIALIZATION
            timeArray = typeOfTimer.split(':');
            mCountdown = timeArray[0];
            sCountdown = timeArray[1];

            timerExoID = setInterval(function() {
                
                if (sCountdown > 0 && mCountdown>=0) {
                    sCountdown -= 1;
                    $('#exoTime').text(mCountdown + "'" + sCountdown + '"')
                } else if (sCountdown === 0 && mCountdown>0) {
                    sCountdown = 59;
                    mCountdown -= 1;
                    $('#exoTime').text(mCountdown + "'" + sCountdown + '"')
                }else if (sCountdown === 0 && mCountdown === 0) {
                    console.log(typeOfTimer)
                    if (typeOfTimer === exoTime) {
                        countdown(restTime, false)
                    } else if (typeOfTimer === restTime) {
                        if (currentExo === nbExo) {
                            currentSerie += 1;
                            currentExo = 1;
                            $('#setNbOfExo').text(currentExo + '/' + nbExo);
                            $('#setNbOfSeries').text(currentSerie + '/' + nbSerie);
                            countdown(exoTime, false);
                        } else {
                            currentExo += 1;
                            $('#setNbOfExo').text(currentExo + '/' + nbExo);
                            countdown(exoTime, false);
                        }
                    }
                    
                    
                } else{ console.log('error') }

            }, 1000);
            break;

        case true:  // NONE INITIALIZATION
            timerExoID = setInterval(function() {

                
                if (sCountdown > 0 && mCountdown>=0) {
                    sCountdown -= 1;
                    $('#exoTime').text(mCountdown + "'" + sCountdown + '"')
                } else if (sCountdown === 0 && mCountdown>0) {
                    sCountdown = 59;
                    mCountdown -= 1;
                    $('#exoTime').text(mCountdown + "'" + sCountdown + '"')
                } else if (sCountdown === 0 && mCountdown === 0) {
                    console.log('rest 3')
                    countdown(restTime, false)
                    
                } else {
                    console.log('else if error : secondes = ' + sCountdown + 'minutes = ' + mCountdown);
                }

            }, 1000);
            break;

        default:
            return console.log('error');
        }

    }
}

// ---------------------------start/stop button----------------------------------------
let nbClick = 0;
$('#startStopButton').on('click', function() {
    nbClick += 1;

    if (nbClick % 2 === 0) {
        $('#startStopButton').text('START');
        $('#startStopButton').css("background-color", "#54EE47");
        clearInterval(timerID);
        clearInterval(timerExoID);
    } else {
        $('#startStopButton').text('STOP');
        $('#startStopButton').css("background-color", "red");
        timer();
        if (nbClick === 1) {
            countdown(exoTime, false);
        } else {
            countdown(exoTime, true);
        }
        
    }
})