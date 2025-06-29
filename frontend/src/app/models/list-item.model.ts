export type ListItemModel<T = any> = {
    id?: string;
    idFieldName?: keyof T;
    [key: string]: any;
    heading?: string;
};