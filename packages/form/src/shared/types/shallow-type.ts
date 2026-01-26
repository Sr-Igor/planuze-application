export type Shallow<T> = {
    [K in keyof T]: any;
};
