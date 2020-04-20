import document from 'document'

export function Gauge(_id, _iconHref, _percent) {
  // Within this constructor function, declare variables that need to be distinct for every object.
  // Put as little code as possible in here because it will be duplicated in every object.
  this._el = document.getElementById(_id)
  this._achievEl = this._el.getElementById('achiev')
  this._goalEl = this._el.getElementById('goal')
  this._height = this._el.height - 2  // -2 because of baseline
  this._achiev
  this._goal
  this._percent = _percent
  this._metGoal                       // true if achiev >= goal

  this._initialise(_iconHref)
}

// Define as much code as possible outside of the constructor function so that it isn't copied into every object.
// By convention, functions preceded with _ are not intended to be called from outside the object.

Gauge.prototype._initialise = function(iconHref) {
  // Do extensive initialisation in this function.
  // This is unnecessary in this trival example, but would be beneficial in a more complex case.
  this._el.getElementById('icon').href = iconHref
}

Object.defineProperty(Gauge.prototype, 'goal', {
  set: function set(val) {
    if (this._goal === val) return
    this._goal = val
    this._redraw()
  }
})

Object.defineProperty(Gauge.prototype, 'achiev', {
  set: function set(val) {
    if (this._achiev === val) return
    this._achiev = val
    this._redraw()
  }
})

Object.defineProperty(Gauge.prototype, 'percent', {
  set: function set(val) {
    if (this._percent === val) return
    this._percent = val
    this._redraw()
  }
})

Gauge.prototype._redraw = function() {
  if (this._goal === undefined || this._achiev === undefined) return

  if (!this._goal) {
    this._achievEl.height = this._achiev? this._height : 0
    this._achievEl.y = this._goalEl.height = 0
  } else if (this._achiev < this._goal) {
    let height = this._achiev / this._goal * this._height
    this._achievEl.height = height
    this._achievEl.y = this._height - height

    if (this._metGoal) {    // no longer true
      this._metGoal = false
      this._achievEl.style.fill = '#0000ff'
      this._goalEl.y = 0
      this._goalEl.height = this._height
    }
  } else {  // this._achiev >= this._goal
    if (!this._metGoal && this._achiev) {   // now we have met goal
      this._metGoal = true
      this._achievEl.y = 0
      this._achievEl.height = this._height
      this._achievEl.style.fill = '#00c000'
    }

    let height = this._goal? this._goal / this._achiev * this._height : 0
    this._goalEl.height = height
    this._goalEl.y = this._height - height
  }

  if (this._percent) {
    this._el.getElementById('label').text = this._goal? Math.round(this._achiev / this._goal * 100) + '%' : '—%'
  } else {
    this._el.getElementById('label').text = this._achiev
  }
}

Gauge.prototype.setGoalColour = function(goalColour) {
  this._goalEl.style.fill = goalColour
}