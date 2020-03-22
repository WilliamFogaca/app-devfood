
export function trimWords(word, length, final = '...') {
  if (word.length > length) {
    var trimmedString = word.substr(0, length);
    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + final;
    return trimmedString;
  }
  return word;
}
