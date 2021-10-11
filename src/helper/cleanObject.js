export function cleanObject(obj) {
  let stringfiedObj = JSON.stringify(obj, (_, value) => {
    return ["", null].includes(value) ||
      (typeof value === "object" &&
        (value.length === 0 || Object.keys(value).length === 0))
      ? undefined
      : value;
  });
  let resObj = JSON.parse(stringfiedObj);
  let isEmptyPropsPresent = ["{}", "[]", '""', "null"].some((key) =>
    stringfiedObj.includes(key)
  );
  if (isEmptyPropsPresent) {
    return cleanObject(resObj);
  }
  return resObj;
}
