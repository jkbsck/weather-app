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

  // Update local time in results. Offset is in milliseconds from UTC time.
  const updateLocalTime = (element, offset) => {
    let previousTime = new Date();

    // Wait until new second begins.
    while (new Date().getSeconds() === previousTime.getSeconds()) {}

    let startAt = new Date(); // startAt and finishAt are for time compensation.

    let time = new Date();
    time.setHours(time.getHours() + offset / 3600);
    time = time.toUTCString().match(/\d{1,2}:\d{2}:\d{2}/i);
    element.textContent = `Local time: ${time}`;

    let finishAt = new Date(); // startAt and finishAt are for time compensation.

    setInterval(() => {
      startAt = new Date(); // startAt and finishAt are for time compensation.

      let time = new Date();
      time.setHours(time.getHours() + offset / 3600);
      time = time.toUTCString().match(/\d{1,2}:\d{2}:\d{2}/i);
      element.textContent = `Local time: ${time}`;

      finishAt = new Date(); // startAt and finishAt are for time compensation.
    }, 1000 - (finishAt - startAt));
  };

  return { initialize, updateLocalTime };
})();

export { Clock as default };
