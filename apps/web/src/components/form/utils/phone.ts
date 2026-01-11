export function formatPhone(input: string = '') {
  let value = input?.replace(/\D/g, '') || '';

  let formattedValue = '';

  if (value.startsWith('55')) {
    value = value.slice(2);
    formattedValue = '+55 ';
  }

  if (value.length > 0) {
    formattedValue += `(${value.substring(0, 2)}`;
  }

  if (value.length > 2) {
    formattedValue += `) ${value.substring(2, 3)} `;
  }

  if (value.length > 3) {
    formattedValue += `${value.substring(3, 7)}`;
  }

  if (value.length > 7) {
    formattedValue += `-${value.substring(7, 11)}`;
  }

  return formattedValue.trim();
}

export const removeMask = (value: string) => value.replace(/\D/g, '');
