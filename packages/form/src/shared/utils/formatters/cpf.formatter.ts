export function formatCpf(cpf: string = ''): string {
    const onlyNumbers = cpf.replace(/[^\d]/g, '');

    let formattedCpf = onlyNumbers.substring(0, 3);
    if (onlyNumbers.length > 3) {
        formattedCpf += '.' + onlyNumbers.substring(3, 6);
    }
    if (onlyNumbers.length > 6) {
        formattedCpf += '.' + onlyNumbers.substring(6, 9);
    }
    if (onlyNumbers.length > 9) {
        formattedCpf += '-' + onlyNumbers.substring(9, 11);
    }

    return formattedCpf;
}

export const removeCpfMask = (value: string) => value.replace(/\D/g, '');
