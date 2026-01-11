export function formatCnpj(cnpj: string = '') {
    const onlyNumbers = cnpj.replace(/[^\d]/g, '');
    let formattedCnpj = onlyNumbers.substring(0, 2);
    if (onlyNumbers.length > 2) {
        formattedCnpj += '.' + onlyNumbers.substring(2, 5);
    }
    if (onlyNumbers.length > 5) {
        formattedCnpj += '.' + onlyNumbers.substring(5, 8);
    }
    if (onlyNumbers.length > 8) {
        formattedCnpj += '/' + onlyNumbers.substring(8, 12);
    }
    if (onlyNumbers.length > 12) {
        formattedCnpj += '-' + onlyNumbers.substring(12, 14);
    }

    return formattedCnpj;
}
