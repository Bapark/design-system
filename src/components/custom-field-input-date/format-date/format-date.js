export const validFormats = {
  'mm/dd/yyyy': {
    matcher: /^\d\d\/\d\d\/\d\d\d\d$/,
    combine: dismantledDate => `${dismantledDate.month}/${dismantledDate.day}/${dismantledDate.year}`,
    dismantle: (string) => {
      const pieces = string.split('/');

      return {
        day: pieces[1],
        month: pieces[0],
        year: pieces[2],
      };
    },
  },
  'mm-dd-yyyy': {
    matcher: /^\d\d-\d\d-\d\d\d\d$/,
    combine: dismantledDate => `${dismantledDate.month}-${dismantledDate.day}-${dismantledDate.year}`,
    dismantle: (string) => {
      const pieces = string.split('-');

      return {
        day: pieces[1],
        month: pieces[0],
        year: pieces[2],
      };
    },
  },
  'yyyy-mm-dd': {
    matcher: /^\d\d\d\d-\d\d-\d\d$/,
    combine: dismantledDate => `${dismantledDate.year}-${dismantledDate.month}-${dismantledDate.day}`,
    dismantle: (string) => {
      const pieces = string.split('-');

      return {
        day: pieces[2],
        month: pieces[1],
        year: pieces[0],
      };
    },
  },
};

export function formatMatching(string) {
  return Object.keys(validFormats).map((formatKey) => {
    const format = validFormats[formatKey];

    if (format.matcher.test(string)) {
      return format;
    }

    return null;
  }).filter(f => f)[0];
}

export function validDate(string) {
  const format = formatMatching(string);
  return !!format;
}

export function convertToFormat(dateString, newFormatKey) {
  const oldFormat = formatMatching(dateString);
  const newFormat = validFormats[newFormatKey];

  if (oldFormat && newFormat) {
    const dismantledDate = oldFormat.dismantle(dateString);
    return newFormat.combine(dismantledDate);
  }

  return undefined;
}
