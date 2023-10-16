var isRunning = false;
var lapEnabled = false;
var startTime;
var currentTime = 0;
var lapTimes = [];
var lapNumber = 1;
var interval;

function startStop() {
    if (isRunning) {
        clearInterval(interval);
        document.getElementById("startStop").textContent = "Start";
    } else {
        if (!lapEnabled) {
            lapEnabled = true;
            lapNumber = 1;
        }
        startTime = Date.now() - currentTime;
        interval = setInterval(updateTime, 10);
        document.getElementById("startStop").textContent = "Stop";
    }
    isRunning = !isRunning;
}

function updateTime() {
    currentTime = Date.now() - startTime;
    updateDisplay(currentTime);
}

function recordLap() {
    if (lapEnabled) {
        lapTimes.push(currentTime);
        updateLapTimes();
        lapNumber++;
    }
}

function reset() {
    clearInterval(interval);
    isRunning = false;
    lapEnabled = false;
    lapTimes = [];
    currentTime = 0;
    lapNumber = 1;
    updateDisplay(currentTime);
    updateLapTimes();
    document.getElementById("startStop").textContent = "Start";
}

function updateDisplay(time) {
    var milliseconds = time % 1000;
    var seconds = Math.floor((time / 1000) % 60);
    var minutes = Math.floor((time / (1000 * 60)) % 60);
    var hours = Math.floor(time / (1000 * 60 * 60));

    document.getElementById("display").textContent =
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

function updateLapTimes() {
    var lapTimesTable = document.getElementById("lapTable");
    var lapTimesBody = document.getElementById("lapTimesBody");

    var newRow = lapTimesTable.insertRow(-1);
    var lapCell = newRow.insertCell(0);
    var timeCell = newRow.insertCell(1);
    lapCell.textContent = lapNumber;
    timeCell.textContent = formatTime(currentTime);
}

function formatTime(time) {
    var milliseconds = time % 1000;
    var seconds = Math.floor((time / 1000) % 60);
    var minutes = Math.floor((time / (1000 * 60)) % 60);
    var hours = Math.floor(time / (1000 * 60 * 60));

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

function downloadCSV() {
    var csvContent = "data:text/csv;charset=utf-8,";
    lapTimes.forEach((lapTime, index) => {
        csvContent += `Lap ${index + 1}, ${formatTime(lapTime)}\n`;
    });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "lap_times.csv");
    link.click();
}
