import { FieldValues } from 'react-hook-form';
import { AnyField } from '../interfaces/field.interface';

/**
 * Entity representing a form field
 * Following the Single Responsibility Principle (SRP)
 */
export class FieldEntity<FormType extends FieldValues> {
    private readonly config: AnyField<FormType>;

    constructor(config: AnyField<FormType>) {
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
    getConfig(): AnyField<FormType> {
        return { ...this.config };
    }

    /**
     * Returns a specific configuration value
     */
    get<K extends keyof AnyField<FormType>>(key: K): AnyField<FormType>[K] {
        return this.config[key];
    }

    /**
     * Creates a new instance with updated configuration
     */
    withConfig(updates: Partial<AnyField<FormType>>): FieldEntity<FormType> {
        return new FieldEntity<FormType>({
            ...this.config,
            ...updates,
        } as AnyField<FormType>);
    }
}
