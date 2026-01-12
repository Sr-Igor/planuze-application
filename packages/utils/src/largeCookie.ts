export const setLargeCookie = (setter: any, keyPrefix: string, obj: any, maxCookieSize = 2000) => {
    const jsonString = JSON.stringify(obj);

    const numParts = Math.ceil(jsonString.length / maxCookieSize);

    for (let i = 0; i < numParts; i++) {
        const part = jsonString.slice(i * maxCookieSize, (i + 1) * maxCookieSize);
        setter(`${keyPrefix}_part${i + 1}`, part);
    }

    setter(`${keyPrefix}_numParts`, numParts);
};

export const getLargeCookie = (getter: any, keyPrefix: string) => {
    const parser = getter(`${keyPrefix}_numParts`);
    const value = parser?.value || parser;

    const numParts = parseInt(value, 10);
    let jsonString = '';

    for (let i = 0; i < numParts; i++) {
        const item = getter(`${keyPrefix}_part${i + 1}`);

        jsonString += item?.value || item;
    }

    return JSON.parse(jsonString || '{}');
};
