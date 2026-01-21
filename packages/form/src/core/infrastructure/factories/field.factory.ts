import { FieldValues } from 'react-hook-form';
import { FieldEntity } from '../../domain/entities/field.entity';
import { FieldConfigVO } from '../../domain/value-objects/field-config.vo';
import { AnyField } from '../../domain/interfaces/field.interface';

/**
 * Factory for FieldEntity creation
 * Following the Factory pattern
 */
export class FieldFactory {
    /**
     * Creates a FieldEntity from a configuration
     */
    static create<FormType extends FieldValues>(config: AnyField<FormType>): FieldEntity<FormType> {
        const configVO = new FieldConfigVO(config);
        return new FieldEntity(configVO.getValue());
    }

    /**
     * Creates multiple FieldEntity instances from a list of configurations
     */
    static createMany<FormType extends FieldValues>(
        configs: AnyField<FormType>[]
    ): FieldEntity<FormType>[] {
        return configs.map((config) => this.create(config));
    }
}
