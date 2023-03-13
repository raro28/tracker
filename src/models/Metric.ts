import {Field} from './Field';
import {Tag} from './Tag';

export interface Metric {
    measure: string;
    timestamp?: number;
    tags: Tag[];
    fields: Field[];
}