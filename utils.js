const requiredErr = "is required";
const lengthErr = (minLength, maxLength) =>
  `must be between ${minLength} and ${maxLength} characters`;

export { requiredErr, lengthErr };
