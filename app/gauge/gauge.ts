import document from "document";

export default class Gauge {
  private el: GraphicsElement;
  private achievEl: GraphicsElement;
  private goalEl: GraphicsElement;
  private height: number;
  private _achiev: number;
  private _goal: number;
  private _percent: boolean;
  private _metGoal: boolean;
  constructor(_id: string, _iconHref: string, _percent?: boolean) {
    // Within this constructor function, declare variables that need to be distinct for every object.
    // Put as little code as possible in here because it will be duplicated in every object.
    this.el = document.getElementById(_id) as GraphicsElement;
    this.achievEl = this.el.getElementById("achiev") as GraphicsElement;
    this.goalEl = this.el.getElementById("goal") as GraphicsElement;
    this.height = this.el.height - 2; // -2 because of baseline
    this._achiev;
    this._goal;
    this._percent = _percent;
    this._metGoal; // true if achiev >= goal
    this._initialise(_iconHref);
  }
  // Define as much code as possible outside of the constructor function so that it isn't copied into every object.
  // By convention, functions preceded with _ are not intended to be called from outside the object.
  _initialise(iconHref: string) {
    // Do extensive initialisation in this function.
    // This is unnecessary in this trival example, but would be beneficial in a more complex case.
    (this.el.getElementById("icon") as ImageElement).href = iconHref;
  }
  _redraw() {
    if (this._goal === undefined || this._achiev === undefined) return;
    if (!this._goal) {
      this.achievEl.height = this._achiev ? this.height : 0;
      this.achievEl.y = this.goalEl.height = 0;
    } else if (this._achiev < this._goal) {
      let height = (this._achiev / this._goal) * this.height;
      this.achievEl.height = height;
      this.achievEl.y = this.height - height;
      if (this._metGoal) {
        // no longer true
        this._metGoal = false;
        this.achievEl.style.fill = "#0000ff";
        this.goalEl.y = 0;
        this.goalEl.height = this.height;
      }
    } else {
      // this._achiev >= this._goal
      if (!this._metGoal && this._achiev) {
        // now we have met goal
        this._metGoal = true;
        this.achievEl.y = 0;
        this.achievEl.height = this.height;
        this.achievEl.style.fill = "#00c000";
      }
      let height = this._goal ? (this._goal / this._achiev) * this.height : 0;
      this.goalEl.height = height;
      this.goalEl.y = this.height - height;
    }
    if (this._percent) {
      this.el.getElementById("label").text = this._goal
        ? Math.round((this._achiev / this._goal) * 100) + "%"
        : "—%";
    } else {
      this.el.getElementById("label").text = String(this._achiev);
    }
  }
  setGoalColour(goalColour: string) {
    this.goalEl.style.fill = goalColour;
  }

  set goal(val: number) {
    if (this._goal === val) return;
    this._goal = val;
    this._redraw();
  }
  set achiev(val: number) {
    if (this._achiev === val) return;
    this._achiev = val;
    this._redraw();
  }

  set percent(val: boolean) {
    if (this._percent === val) return;
    this._percent = val;
    this._redraw();
  }
}
