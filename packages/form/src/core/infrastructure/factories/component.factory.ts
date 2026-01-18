import { FieldValues } from 'react-hook-form';
import { IFieldComponent, IComponentRegistry } from '../../domain/interfaces/component.interface';
import { IField } from '../../domain/interfaces/field.interface';

/**
 * Factory for component creation and registration
 * Following the Factory pattern and the Open/Closed Principle (OCP)
 */
export class ComponentFactory {
    private static registry: IComponentRegistry = {};

    /**
     * Registers a component for a field type
     */
    static register<FormType extends FieldValues>(
        fieldType: string,
        component: IFieldComponent<FormType>
    ): void {
        this.registry[fieldType] = component as IFieldComponent<any>;
    }

    /**
     * Creates a component based on the field type
     */
    static create<FormType extends FieldValues>(
        field: IField<FormType>
    ): IFieldComponent<FormType> | null {
        return (this.registry[field.field] as IFieldComponent<FormType>) || null;
    }

    /**
     * Returns the complete component registry
     */
    static getRegistry(): IComponentRegistry {
        return { ...this.registry };
    }

    /**
     * Checks if a field type is registered
     */
    static isRegistered(fieldType: string): boolean {
        return fieldType in this.registry;
    }

    /**
     * Clears the registry (useful for tests)
     */
    static clear(): void {
        this.registry = {};
    }
}
