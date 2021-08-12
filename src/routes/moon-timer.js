const moment = require('moment');

const logger = { // "logger" that's compatible in any js context without dependencies
  print(msg, obj) {
    console.log(msg, JSON.stringify(obj));
  },
  info(msg, obj) {
    console.log(msg, JSON.stringify(obj));
  },
  verbose(msg, obj) {
    console.log(msg, JSON.stringify(obj));
  },
  debug(msg, obj) {
    console.log(msg, JSON.stringify(obj));
  },
};

moment().format();

const config = {
  warningMinutes: '0.25', // time before start of a moon phase that warning is sent out
  loglevel: 'info',
  resetMinutes: 55,
  firstCycleTime: '14 Aug 2018 17:22:00 GMT',
};

const fullMoonRoleMention = '';

let currentCycleStart = moment(config.firstCycleTime);

let nextNewMoonWarning;
let nextCycleStart;// Also start of newMoon

let nextFullmoonWarning;
let nextFullmoon;

const warningMinutesOffset = config.warningMinutes * -1;

// Hide now() behind a function for easy testing
function GetNow() {
  return moment.utc().add(0, 'm');
}

function LogTimes() {
  logger.debug(`\tFullmoon time : \t\t${nextFullmoon.toDate()}
  \tFullmoon Warning time : \t${nextFullmoonWarning.toDate()}
  \tNewmoon time : \t\t\t${nextCycleStart.toDate()}
  \tNow : \t\t\t\t${GetNow().toDate()}`);
}
function Initialise() {
  logger.info('initialising program');

  const now = GetNow();
  nextCycleStart = moment(currentCycleStart);
  // Determine when the current moon cycle started, and when the next one starts.
  while (nextCycleStart < now) {
    currentCycleStart = moment(nextCycleStart).utc();
    nextCycleStart.add(118, 'm');
  }

  InitialiseFullMoonTime();
  InitialiseNewMoonTime();

  LogTimes();
  FullMoonLoop();

  setTimeout( 
    () => { 
      SendTimeTillFullMoon();
      SendTimeTillNewMoon();
    }, 
    500 
  );
}

function InitialiseFullMoonTime() {
  nextFullmoon = moment(currentCycleStart.utc()).add(59, 'm');

  if (nextFullmoon < GetNow()) {
    nextFullmoon.add(118, 'm');
  }
  nextFullmoonWarning = moment(nextFullmoon);
  nextFullmoonWarning.add(warningMinutesOffset, 'm');
}

function InitialiseNewMoonTime() {
  nextNewmoonWarning = moment(nextCycleStart);
  nextNewmoonWarning.add(warningMinutesOffset, 'm');
  if (nextNewmoonWarning < GetNow()) {
    nextNewmoonWarning.add(118, 'm');
  }
}

function GetTimeLeft(endTime) {
  const timeLeft = moment.duration(endTime.diff(GetNow()));
  const timeLeftFormatted = moment(timeLeft._data).format('hh:mm:ss');
  return `${timeLeft.hours()}h ${timeLeft.minutes()}m ${timeLeft.seconds()}s`;
}

function FullMoonLoop() {
  // run loop.
  setTimeout(() => {
    now = GetNow();
    if (now >= nextFullmoonWarning) {
      logger.verbose(`Time until next Full Moon :${GetTimeLeft(nextFullmoon)}`);
      nextFullmoonWarning.add(118, 'm');
      promptTimeout('Full Moon').catch(console.error);

      LogTimes();
    }

    if (now >= nextFullmoon) {
      logger.verbose(`Currently in Full moon! 2x MAG is live!`);
      nextFullmoon.add(118, 'm');

      LogTimes();
    }

    if (now >= nextNewMoonWarning) {
      // SendTimeTillNewMoon(true);
      nextNewMoonWarning.add(118, 'm');
      promptTimeout('New Moon').catch(console.error);

      LogTimes();
    }
    if (now >= nextCycleStart) {
      logger.verbose(`${newMoonRoleMention} Currently in New moon! 2x Exp is live!`);

      currentCycleStart = moment(nextCycleStart);
      nextCycleStart.add(118, 'm');

      LogTimes();
    }

    updateDivTagTimer(GetTimeLeft(nextFullmoon), GetTimeLeft(nextCycleStart));

    // continue the loop
    FullMoonLoop();
  }, 1000);
}

function SendTimeTillFullMoon() {
  if (moment.duration(nextFullmoon.diff(GetNow())).asMinutes() > 108) {
    logger.verbose('Currently in Full Moon! 2x Mag is live!');
  }

  logger.verbose(`Time until next Full Moon :${GetTimeLeft(nextFullmoon)}`);
}

function SendTimeTillNewMoon() {
  if (moment.duration(nextCycleStart.diff(GetNow())).asMinutes() > 108) {
    logger.verbose('Currently in New Moon! 2x EXP is live!');
  }

  logger.verbose(`Time until next New Moon :${GetTimeLeft(nextCycleStart)}`);
}


// --------------------------
// js context is web browser
// --------------------------
function updateDivTagTimer(fullMoonTime, newMoonTime) {
  if (this.hasOwnProperty('document') && document) {
    const div = document.querySelector('#moon-timer');
    if (div) {
      div.innerText = `Full Moon: ${fullMoonTime}\nNew Moon: ${newMoonTime}`;
    }
  }
}

function alertPopup(msg) {
  if (this.hasOwnProperty('document') && document) {
    alert(msg);
  }
}

async function promptTimeout(msg, timeoutTime = 60) {
  if (!this.hasOwnProperty('window') || !window) return;

  if (!this.hasOwnProperty('openPrompt')) this.openPrompt = true;
  else if (this.openPrompt) return; // avoid spamming prompts every hour or so

  return Promise.race([
    new Promise(resolve => setTimeout(resolve, timeoutTime * 1000)),
    new Promise(resolve => {
      const response = prompt(msg);
      this.openPrompt = false;
      resolve(response);
    })
  ]);
}

Initialise(); // entry point
