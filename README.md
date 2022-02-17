# Übersicht Clock

A [Übersicht](http://tracesof.net/uebersicht/) widget to display time and greeting with username.

## Installation

Download the quote-of-the-day.widget.zip and unzip it to your widgets folder (default: ~/Library/Application Support/Übersicht/widgets).

## Preview

![Preview](https://raw.githubusercontent.com/stoneC0der/ubersicht-clock/master/screenshot.png)

## Settings

### Greetings

The greetings default language is English, and will translated to your browser/computer language.

**Currently Supported languages are:**

- Arabic
- Chinese
- English (default)
- French
- German
- Japanese
- Russian
- Spanish

### PadZero

The default time does not pad a zero to ours less than 10, if you want a zero padded to hours less than 10.
For example **09:30AM** instead of **9:30AM**, set the value bellow to ```true```

```jsx
/**
 * Decide if zero should be padded to hour example: 9:30PM => 09:30PM
 */
export const usePadZero = false; //true/false
```

### Time separator

Change the value bellow if you want don't want the time separator to flash

```jsx
/**
 * Decide if time separator should flashed
 */
export const flashTimeSeparator = true; //true/false
```

### Seconds

Change the boolean value bellow if you want the second to be display, this will make the time position to be jumpy

```jsx
/**
 * Decide if seconds should be displayed
 */
export const displaySeconds = false; //true/false
```

### Military

Change the boolean value bellow to use 24h time

```jsx
/**
 * Decide if 24h time should be converted to military time example: 13:30 => 1:30PM
 */
export const useMilitaryTime = true; //true/false
```

### Font-Family

I am using [Space Age](https://www.1001fonts.com/space-age-font.html), it free for personal use, download and install on your machine to use it or change the font-family to your desired one.
The font-family will use your system font if you don't change it.

```css
font-family: "space age", -apple-system, BlinkMacSystemFont, Verdana, "Helvetica Neue", Helvetica, sans-serif;
```

### Time, AM/PM, Greetings font-size

Edit the respective class font-size to change it to your liking

```css
.time {
    font-size: 9.5rem;
  }
.am_pm {
    font-size: 2.625rem;
  }
  .greeting {
    font-size: 3rem;
  }
```
## Date

I use this [Calendar](http://tracesof.net/uebersicht-widgets/#calendar) widget so I don't need to display the date on th widget if you would like to enable the widget date change the value below to true
```jsx
/**
 * to have the date parse as something like Feb 17m 2022 instead of 02/17/2022
 * not I have not test this as I currently don't have access to a mac
 * 
 */
export const useAlternateCommand = false;
```

```jsx
/**
 * Enable date in widget
 * uses local format e.g: 02/17/2022 for english (I'll probably improve it and display day,month name)
 */
export const showDate = false; //true/false
```
```jsx
  // change the key (default is b => dateFormat.b) keys are a => Thu, 17 Feb, 2022, b => Feb 17, 2022, c => 17 Feb, 2022
  const date = useAlternateCommand ? setDateFormat(datetime[1], dataFormat.b) : datetime[1];
```
## To Do

- [] Add more languages
- [] Fix time width being jumpy (current solution, use monospace fonts)

## Contribution

To add more language edit the lang.json file and add the new language, test it and make a pull request
Improvements are welcome.

## If you like it give it a start :D