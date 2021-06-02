/**
 * Command to get current time and username
 */
export const command = "date '+%H %M %S %p'; whoami";

// the refresh frequency in milliseconds
export const refreshFrequency = 1000;

/**
 * Export language file
 */
import lang from './lang.json';

export const className =
  `
  top: 30%;
  left: 0;
  transform: translate(-0%, 0%);
  width: 100%;
  box-sizing: border-box;
  color: #ffffff;
  font-family: "space age", -apple-system, BlinkMacSystemFont, Verdana, "Helvetica Neue", Helvetica, sans-serif;
  font-weight: 600;
  border-radius: 1px;
  text-align: justify;
  line-height: 1.3;
	text-shadow: 0px 0px 2px rgba(0,0,0,0.50);
  
  .container {
    display: flex;
    flex-direction: column;
  }
  .time {
    font-size: 9.5rem;
    text-align: center;
    margin-bottom: 0;
    margin-left: auto;
    margin-right: auto;
    background: transparent;
  }
  .flasher-hide {
    opacity: 0;
  }
  .flasher-show {
    opacity: 1;
  }
  .am_pm {
    font-size: 2.625rem;
    margin: 0;
  }
  .greeting {
    font-size: 3rem;
    text-align: center;
    margin-top: 0;
    margin-left: auto;
    margin-right: auto;
  }
`;

/**
 * Decide if zero should be padded to hour example: 9:30PM => 09:30PM
 */
export const usePadZero = false;
/**
 * Decide if time separator should flashed
 */
export const flashTimeSeparator = true;
/**
 * Decide if seconds should be displayed
 */
export const displaySeconds = true;
/**
 * Decide if 24h time should be converted to military time example: 13:30 => 1:30PM
 */
export const useMilitaryTime = false;

/**
 * Apply css class based on flashTimeSeparator value
 * 
 * @param {string|number} seconds The current second
 * @returns {string} css class
 */
export const UseFlashedTimeSeparator = (seconds) => {
  if (flashTimeSeparator) {
    return (seconds % 2 === 0) ? "flasher-show" : "flasher-hide";
  }
  return "flasher-show";
};
/**
 * add/pad zero to hour less than 10
 * 
 * @param {string|number} number The current hour
 * @returns {string|number}
 */
export const padZero = (number) => {
  if (usePadZero) {
    return (number < 10) ? "0" + number : number;
  }
  return number;
};

/**
 * Translate greeting message to user browser language.
 * 
 * @param {string} processLang The user browser language 2 letter code
 * @param {string|number} time The current time(hour)
 * @returns {string} The translated greet message if not english
 */
export const translate = (processLang, time) => {
  let greeting = "";
  if (processLang === 'en') {
    greeting = "Good morning";
    if (time >= 12 && time < 17) {
      greeting = "Good afternoon";
    } else if ((time > 17) || (time < 5)) {
      greeting = "Good evening";
    }
  } else {
    greeting = lang[processLang][0]["Good morning"];

    if (time >= 12 && time < 17) {
      greeting = lang[processLang][1]["Good afternoon"];
    } else if ((time > 17) || (time < 5)) {
      greeting = lang[processLang][2]["Good evening"];
    }
  }

  return greeting;
};

/**
 * Convert hours to military time
 * 
 * @param {string} hour the current hour.
 * 
 * @return {number|string} The converted hour, if useMilitaryTime is set to true or 24hour time
 */
export const HoursToMilitaryTime = (hour) => {
  if (useMilitaryTime) {
    let parsedHour = parseInt(hour);

    if (parsedHour > 12) {
      return parsedHour - 12;
    } else if (parsedHour === 0) {
      return 12;
    } else {
      return parsedHour;
    }
  }
  return hour;
};

export const render = ({ output }) => {
  // split the whoami & date command output.
  const infos = output.split("\n");
  // retrieve username & time
  const time = infos[0].split(' ');
  const username = infos[1];

  // retrieve hour,min,sec,AM/PM
  let hour = time[0];
  const minutes = time[1];
  const seconds = time[2];
  const AM_PM = time[3];
  // Configure time separator
  const class_name = UseFlashedTimeSeparator(seconds);

  // Get user language
  const userLang = navigator.language || navigator.userLanguage;
  // remove country specific indicator
  const processLang = userLang.substr(0, 2);
  // Get translated greeting message
  const greeting = translate(processLang, hour);
  // configure hour
  hour = padZero(HoursToMilitaryTime(hour));

  return (
    <div className="container">
      <h1 className="time">
        {hour}
        <span className={class_name}>:</span>
        {minutes}
        {(displaySecond) ? <span className={class_name}>:</span> : ""}
        {(displaySecond) ? seconds : ""}
        {(useMilitaryTime) ? <span className="am_pm">{AM_PM}</span> : ""}
      </h1>
      <p className="greeting">
        <span>{greeting}</span>{", "}
        <span className="username">{username}</span>
      </p>
    </div>
  );
};
