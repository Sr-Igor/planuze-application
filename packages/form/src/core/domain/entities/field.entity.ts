import { FieldValues } from 'react-hook-form';
import { IField } from '../interfaces/field.interface';

/**
 * Entity representing a form field
 * Following the Single Responsibility Principle (SRP)
 */
export class FieldEntity<FormType extends FieldValues> {
    private readonly config: IField<FormType>;

    constructor(config: IField<FormType>) {
        this.config = config;
    }

    /**
     * Returns the field name
     */
    getName(): keyof FormType {
        return this.config.name;
    }

    /**
     * Returns the field type
     */
    getType(): string {
        return this.config.field;
    }

    /**
     * Checks if the field is hidden
     */
    isHidden(): boolean {
        return this.config.hide === true;
    }

    /**
     * Checks if the field is required
     */
    isRequired(): boolean {
        return this.config.required === true;
    }

    /**
     * Checks if the field is disabled
     */
    isDisabled(): boolean {
        return this.config.disabled === true;
    }

    /**
     * Returns the complete field configuration
     */
    getConfig(): IField<FormType> {
        return { ...this.config };
    }

    /**
     * Returns a specific configuration value
     */
    get<K extends keyof IField<FormType>>(key: K): IField<FormType>[K] {
        return this.config[key];
    }

    /**
     * Creates a new instance with updated configuration
     */
    withConfig(updates: Partial<IField<FormType>>): FieldEntity<FormType> {
        return new FieldEntity<FormType>({
            ...this.config,
            ...updates,
        });
    }
}
