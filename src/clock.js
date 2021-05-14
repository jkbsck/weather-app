// Clock functionality module
const Clock = (() => {
  const clock = document.getElementById("clock");

  const initialize = () => {
    let previousTime = new Date().toLocaleTimeString("en-GB");

    // Wait until new second begins.
    while (new Date().toLocaleTimeString("en-GB") === previousTime) {}

    // Begin time updating process.
    _updateClockLoop();
  };

  // Begin time updating process.
  const _updateClockLoop = () => {
    let startAt = new Date(); // startAt and finishAt are for time compensation.

    let time = new Date().toLocaleTimeString("en-GB");
    clock.textContent = time;
    clock.dataset.value = time; // Set time to mirror element.

    let finishAt = new Date(); // startAt and finishAt are for time compensation.

    setInterval(() => {
      startAt = new Date(); // startAt and finishAt are for time compensation.

      let time = new Date().toLocaleTimeString("en-GB");
      clock.textContent = time;
      clock.dataset.value = time; // Set time to mirror element.

      finishAt = new Date(); // startAt and finishAt are for time compensation.
    }, 1000 - (finishAt - startAt));
  };

  return { initialize };
})();

export { Clock as default };
