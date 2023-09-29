import moment from "moment";
import { InitMonthType } from "./types";

/**
 * You can use this function to get the current month
 * name in the current locale.
 */
export const getMonthName = (value: Date, type?: InitMonthType) => {
  return value.toLocaleString("default", { month: type || "long" });
};

export const timer = (date: Date) => {
  const format = (val: number) => (val < 10 ? `0${val}` : val);

  const hr = format(date.getHours());
  const min = format(date.getMinutes());
  const sec = format(date.getSeconds());
  const milliSec = date.getMilliseconds();
  return `${hr}:${min}:${sec}.${milliSec}`;
};

export function formatDate(timestamp: Date | string): string {
  return moment(timestamp).fromNow();
}

export const getGreetingTime = (currentTime = new Date()) => {
  const currentHour = currentTime.getHours();
  const splitAfternoon = 12; // 24hr time to split the afternoon
  const splitEvening = 17; // 24hr time to split the evening

  if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
    // Between 12 PM and 5PM
    return "Good afternoon";
  } else if (currentHour >= splitEvening) {
    // Between 5PM and Midnight
    return "Good evening";
  }
  // Between dawn and noon
  return "Good morning";
};
