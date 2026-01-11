export const setFormData = (body: any, deleteIfEmpty: string[] = []): FormData => {
    const formData = new FormData();

    Object.keys(body).forEach((key) => {
        if (body[key] !== undefined) {
            formData.append(key, body[key]);
        }
        if (deleteIfEmpty.includes(key) && body[key] === '') {
            formData.delete(key);
        }
    });

    return formData;
};
