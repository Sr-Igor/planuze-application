export function formatCep(cep: string = '') {
    let valor = cep.replace(/\D/g, '');

    if (valor.length > 8) {
        valor = valor.substring(0, 8);
    }

    if (valor.length > 5) {
        valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
    }

    return valor;
}

export const removeCepMask = (value: string) => value.replace(/\D/g, '');
