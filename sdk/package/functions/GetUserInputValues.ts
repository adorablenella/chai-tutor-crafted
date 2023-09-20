import { isEmpty } from "lodash";

export const getUserInputValues = (
  input: string,
  allowedUnits: string[]
): { error: string } | { unit: string; value: string } => {
  // eslint-disable-next-line no-param-reassign
  input = input.toLowerCase();
  let sanitizedInput = input.trim().replace(/ |\+/g, "");

  if ((sanitizedInput === "auto" || sanitizedInput === "none") && allowedUnits.includes(sanitizedInput)) {
    return { value: "", unit: sanitizedInput };
  }

  const expression = allowedUnits.length ? new RegExp(allowedUnits.join("|"), "g") : /XXXXXX/g;
  sanitizedInput = sanitizedInput.replace(expression, "");

  const unit = input.match(expression);

  const hasMoreUnits = unit && unit.length > 1;
  const isNotNumber = !isEmpty(sanitizedInput) && Number.isNaN(Number(sanitizedInput));

  if (hasMoreUnits || isNotNumber) {
    return { error: "Invalid value" };
  }

  if (unit && (unit[0] === "auto" || unit[0] === "none")) {
    return { value: unit[0], unit: "" };
  }

  return { value: sanitizedInput, unit: unit ? unit[0] : "" };
};
