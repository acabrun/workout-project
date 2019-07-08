/*chargement du son*/


$('#instruction').hide();
$('#main_screen').hide();

let audio
/*timer,
exoTime,
restTime,
nbSerie,
nbExo;*/

$('#introButton').on('click', function() {
    $('#intro').slideToggle();
    $('#instruction').slideToggle();
});

$('#goButton').on('click', function() {
    $('#instruction').slideToggle();
    $('#main_screen').slideToggle();
})

/*$('#setExoTime').on('blur', function(e) {
    $('#exoTime').text(e.target.value);
})*/

function setGoal(goal, display) {
    $(goal).on('blur', function(e) {
    	console.log('test');
        $(display).text(e.target.value);
    })
}

setGoal('#setExoTime', '#exoTime');
setGoal('#setNbOfExo', '#nbExo');
setGoal('#setRestTime', '#restTime');
setGoal('#setNbSeries', '#nbSerie');