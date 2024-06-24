const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;
const urlFormat = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

export function isDate(value: unknown): value is string {
  return typeof value === "string" && dateFormat.test(value);
}

export function isURL(value: unknown): value is string {
  return typeof value === "string" && urlFormat.test(value);
}

export function rebuildDocument<T extends Record<string, any> | any[]>(document: T): T | undefined {
  if (document) {
    if (document instanceof Array) {
      const newArray = [];
      for (const item of document) {
        newArray.push(rebuildDocument(item));
      }
      return newArray as T;
    } else {
      let newDocument: any = {};
      for (const [key, value] of Object.entries(document)) {
        if (value instanceof Array) {
          const items = [];
          for (const item of value) {
            items.push(rebuildDocument(item));
          }
          newDocument[key] = items;
        }
        else if (isDate(value)) newDocument[key] = new Date(value);
        else if (isURL(value)) newDocument[key] = new URL(value);
        else if (typeof value === "object") newDocument[key] = rebuildDocument(value);
        else newDocument[key] = value;
      }
      return newDocument as T;
    }
  } else return undefined;
}