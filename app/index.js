import clock from "clock"
import { memory } from "system"
import { today, goals } from "user-activity"
import { Gauge } from './gauge/gauge.js'

console.log("mem 0 =" + (memory.js.used))
const fatBurnGauge = new Gauge('fatBurnGauge', 'fatBurn.png')
console.log("mem 1 =" + (memory.js.used))
const cardioGauge = new Gauge('cardioGauge', 'cardio.png', true)
console.log("mem 2 =" + (memory.js.used))
const peakGauge = new Gauge('peakGauge', 'peak.png')
console.log("mem 3 =" + (memory.js.used))

fatBurnGauge.goal = 2
cardioGauge.achiev = 2
peakGauge.goal = 0

fatBurnGauge.percent = true

if (today.local.activeZoneMinutes) {
  console.log(`Local:`);
  console.log(`today.local.activeZoneMinutes.total=${today.local.activeZoneMinutes.total}`);
  console.log(`today.local.activeZoneMinutes.fatBurn=${today.local.activeZoneMinutes.fatBurn}`);
  console.log(`today.local.activeZoneMinutes.cardio=${today.local.activeZoneMinutes.cardio}`);
  console.log(`today.local.activeZoneMinutes.peak=${today.local.activeZoneMinutes.peak}`);
  console.log(`Adjusted:`);
  console.log(`today.adjusted.activeZoneMinutes.total=${today.adjusted.activeZoneMinutes.total}`);
  console.log(`today.adjusted.activeZoneMinutes.fatBurn=${today.adjusted.activeZoneMinutes.fatBurn}`);
  console.log(`today.adjusted.activeZoneMinutes.cardio=${today.adjusted.activeZoneMinutes.cardio}`);
  console.log(`today.adjusted.activeZoneMinutes.peak=${today.adjusted.activeZoneMinutes.peak}`);
  console.log(`Goals:`);
  console.log(`goals.activeZoneMinutes.total=${goals.activeZoneMinutes.total}`);
  console.log(`goals.activeZoneMinutes.fatBurn=${goals.activeZoneMinutes.fatBurn}`);
  console.log(`goals.activeZoneMinutes.cardio=${goals.activeZoneMinutes.cardio}`);
  console.log(`goals.activeZoneMinutes.peak=${goals.activeZoneMinutes.peak}`);

  fatBurnGauge.achiev = today.local.activeZoneMinutes.fatBurn
  cardioGauge.achiev = today.local.activeZoneMinutes.cardio
  peakGauge.achiev = today.local.activeZoneMinutes.peak
}

console.log(`achiev=1`)
peakGauge.achiev = 1
console.log(`achiev=0`)
peakGauge.achiev = 0

clock.granularity = "seconds"

clock.ontick = function(evt) {
  let sec = evt.date.getSeconds() % 5
  //console.log(`sec=${sec}`);
  fatBurnGauge.achiev = sec
  cardioGauge.goal = sec
  peakGauge.achiev = sec
}