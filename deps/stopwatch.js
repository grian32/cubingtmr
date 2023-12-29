export var StopWatch = function(props) {
    /*
     * Default values:
     */
    this.updateFrequency = 24; // updates per second (default value)

    if (typeof(props) === 'object') {
        Object.assign(this, props);
    } else {
        this.id = props;
    }

    this.isRunning  = false;
    this.isPaused   = false;

    this.domObject = document.getElementById(this.id);

    /* Creating the next structure:
       <div id="#elementId">
        <span class="days"></span>
        <span class="hours"></span>
        <span class="minutes"></span>
        <span class="seconds"></span>
        <span class="milliseconds"></span>
       </div>
     */
    this.domStopWatchParts = {
        // days:           null,
        // hours:          null,
        minutes:        null,
        seconds:        null,
        milliseconds:   null
    };

    for (var part in this.domStopWatchParts) {
        this.domStopWatchParts[part] = document.createElement('span');
        this.domStopWatchParts[part].className = part;
        this.domObject.appendChild(this.domStopWatchParts[part]);
    }

    // Set zeros into all the positions:
    this.reset();

    // Set numbers into the DOM:
    this.update();
}

StopWatch.prototype.start = function() {

    this.startedAt = this.isPaused ? this.startedAt - this.pausedAt + new Date().getTime() : new Date().getTime();

    this.intervalId = setInterval(function() {

        var sinceLaunch = new Date(new Date().getTime() - this.startedAt);

        this.milliseconds   = sinceLaunch.getMilliseconds();
        this.seconds        = sinceLaunch.getSeconds();
        this.minutes        = sinceLaunch.getMinutes();
        this.hours          = sinceLaunch.getUTCHours();
        this.days           = sinceLaunch.getDate() - 1;

        this.update();

    }.bind(this), 1000 / this.updateFrequency);

    this.isRunning = true;
    this.isPaused  = false;
}

StopWatch.prototype.pause = function() {

    clearInterval(this.intervalId);

    /** changed this to the milliseconds elapsed while the timer is going on, i.e 2 secs 483 ms = 2483 */
    this.pausedAt = this.minutes * 60000 + this.seconds * 1000 + this.milliseconds

    this.isRunning  = false;
    this.isPaused   = true;
}

StopWatch.prototype.stop = function() {

    clearInterval(this.intervalId);

    this.startedAt  = null;
    this.pausedAt   = null;

    this.isRunning  = false;
    this.isPaused   = false;

    this.reset();
    this.update();
}

StopWatch.prototype.update = function() {

    this.domStopWatchParts.milliseconds.innerHTML   = this.milliseconds .toString().padStart(3, "0");
    this.domStopWatchParts.seconds.innerHTML        = this.seconds      .toString().padStart(2, "0");
    this.domStopWatchParts.minutes.innerHTML        = this.minutes      .toString().padStart(2, "0");
}

StopWatch.prototype.reset = function() {

    this.milliseconds   = 0;
    this.seconds        = 0;
    this.minutes        = 0;
    this.hours          = 0;
    this.days           = 0;
}