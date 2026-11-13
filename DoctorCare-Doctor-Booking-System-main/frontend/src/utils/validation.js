const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^(\+91[\s-]?)?[6-9]\d{9}$/;

export const isValidEmail = (value) => EMAIL_PATTERN.test(value.trim());
export const isValidPhone = (value) => PHONE_PATTERN.test(value.trim());
