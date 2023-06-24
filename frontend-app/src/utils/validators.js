import {EMAIL_PATTERN} from "./constrants"

export const isEmpty =(value) => !value || String(value).trim() === "";
export const isEmail =(value) => RegExp(EMAIL_PATTERN).test(value);