/*chargement du son*/


//$('#instruction').hide();
//$('#main_screen').hide();

let audio,
timer,
exoTime,
restTime,
nbSerie,
nbExo,
currentExo,
currentSerie;

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