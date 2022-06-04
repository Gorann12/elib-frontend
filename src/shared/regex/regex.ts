export const daLiJeValidanFormatEmailAdrese =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const lowerCamelCaseToDisplay = (lowerCamelCaseText: string) => {
  if (!lowerCamelCaseText.length) return lowerCamelCaseText;
  else if (lowerCamelCaseText.length === 1)
    return lowerCamelCaseText[0].toUpperCase();

  const txt = lowerCamelCaseText.substring(1);

  return (
    lowerCamelCaseText[0].toUpperCase() +
    txt.replace(/[A-Z]/g, (match, index) => {
      return " " + match.toLowerCase();
    })
  );
};
