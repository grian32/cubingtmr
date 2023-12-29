import { scramble_333 } from './deps/cubing333.js'
import { StopWatch } from "./deps/stopwatch.js" 
import { msToMSMS } from "./util.js"


let scrambleElement = document.getElementById("scramble")
scrambleElement.innerText = scramble_333.getRandomScramble()

let scrambleButton = document.getElementById("changescramble")

scrambleButton.onclick = () => {
    scrambleElement.innerText = scramble_333.getRandomScramble()
}

let stopWatch = new StopWatch("stopwatch")
let lastSolves = localStorage.getItem("solves") ? JSON.parse(localStorage.getItem("solves")) : []

if (lastSolves[lastSolves.length - 1] != null) {
    let lastSolve = lastSolves[lastSolves.length - 1]["solveTime"]
    let msms = msToMSMS(lastSolve)

    stopWatch.domStopWatchParts.minutes.innerHTML = msms.minutes.toString().padStart(2, "0")
    stopWatch.domStopWatchParts.seconds.innerHTML = msms.seconds.toString().padStart(2, "0")
    stopWatch.domStopWatchParts.milliseconds.innerHTML = msms.milliseconds.toString().padStart(3, "0")
}

let start = document.getElementById("startwatch")
let stop = document.getElementById("removestopwatch")

start.onclick = () => {
    scrambleButton.hidden = true
    lastMs = 0
    stopWatch.stop()
    stopWatch.start()
}

let lastMs = 0

/**
 * [
 *      { 
 *         "solveTime": 1111
 *          "scramble": "L F'"
 *      },
 * ]
 * index is the id
 */

stop.onclick = () => {
    stopWatch.pause()

    scrambleButton.hidden = false
    scrambleElement.innerText = scramble_333.getRandomScramble()
    
    lastMs = stopWatch.pausedAt
    let currentSolves = localStorage.getItem("solves") ? JSON.parse(localStorage.getItem("solves")) : []
    currentSolves.push({
        "solveTime": lastMs,
        "scramble": document.getElementById("scramble").innerText
    })
    localStorage.setItem("solves", JSON.stringify(currentSolves))
}

