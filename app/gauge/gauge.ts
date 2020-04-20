import document from "document";

export default (_id: string, _iconHref: string, _percent?: boolean) => {
  // Within this constructor function, declare variables that need to be distinct for every object.
  // Put as little code as possible in here because it will be duplicated in every object.
  const el = document.getElementById(_id) as GraphicsElement;
  const achievEl = el.getElementById("achiev") as GraphicsElement;
  const goalEl = el.getElementById("goal") as GraphicsElement;
  const height = el.height - 2; // -2 because of baseline
  let _achiev;
  let _goal;
  let _metGoal; // true if achiev >= goal
  (el.getElementById("icon") as ImageElement).href = _iconHref;

  const _redraw = () => {
    if (_goal === undefined || _achiev === undefined) return;
    if (!_goal) {
      achievEl.height = _achiev ? height : 0;
      achievEl.y = goalEl.height = 0;
    } else if (_achiev < _goal) {
      let newHeight = (_achiev / _goal) * height;
      achievEl.height = newHeight;
      achievEl.y = height - newHeight;
      if (_metGoal) {
        // no longer true
        _metGoal = false;
        achievEl.style.fill = "#0000ff";
        goalEl.y = 0;
        goalEl.height = height;
      }
    } else {
      // _achiev >= _goal
      if (!_metGoal && _achiev) {
        // now we have met goal
        _metGoal = true;
        achievEl.y = 0;
        achievEl.height = height;
        achievEl.style.fill = "#00c000";
      }
      const goalElHeight = _goal ? (_goal / _achiev) * height : 0;
      goalEl.height = goalElHeight;
      goalEl.y = height - goalElHeight;
    }
    if (_percent) {
      el.getElementById("label").text = _goal
        ? Math.round((_achiev / _goal) * 100) + "%"
        : "—%";
    } else {
      el.getElementById("label").text = String(_achiev);
    }
  };

  const setGoalColour = (goalColour: string) => {
    goalEl.style.fill = goalColour;
  };

  return {
    setGoalColour,
    set goal(val: number) {
      if (_goal === val) return;
      _goal = val;
      _redraw();
    },
    set achiev(val: number) {
      if (_achiev === val) return;
      _achiev = val;
      _redraw();
    },

    set percent(val: boolean) {
      if (_percent === val) return;
      _percent = val;
      _redraw();
    },
  };
};
