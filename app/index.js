import clock from "clock"
import { Gauge } from './gauge/gauge.js'

const energyGauge = new Gauge('energyGauge', 'energy.png', true)
const heartGauge = new Gauge('heartGauge', 'heart.png')
const stepsGauge = new Gauge('stepsGauge', 'steps.png')

energyGauge.goal = 2500
heartGauge.goal = 120
stepsGauge.goal = 10000

stepsGauge.percent = true   // setting percent using the property

clock.granularity = "seconds"

clock.ontick = function(evt) {
  let sec = evt.date.getSeconds() % 10  // gives values 0 to 9
  energyGauge.achiev = sec * 600        // 0 to 5400
  heartGauge.achiev = sec * 10 + 60     // 60 to 150
  stepsGauge.achiev = sec * 3000        // 0 to 27000
}