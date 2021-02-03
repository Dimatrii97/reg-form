export function phone(value) {
  if (!value) return true;
  return /^\+?[78][-(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/.test(value);
}
export function name(value) {
  if (!value) return true;
  let nameArray = value.split(' ');
  if (nameArray.length >= 3) return false;
  return nameArray.map((name) => !/.*[^а-я-]/i.test(name)).every(Boolean);
}
export function requiredBool(value) {
  return value;
}
