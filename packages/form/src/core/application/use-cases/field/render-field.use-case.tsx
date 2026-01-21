import { FieldValues } from 'react-hook-form';
import { AnyField } from '../../../domain/interfaces/field.interface';
import { IComponentRegistry } from '../../../domain/interfaces/component.interface';

/**
 * Use Case for field rendering
 * Following the Single Responsibility Principle (SRP)
 */
export class RenderFieldUseCase<FormType extends FieldValues> {
    constructor(private readonly componentRegistry: IComponentRegistry) {}

    /**
     * Renders a field using the appropriate component
     */
    execute(field: AnyField<FormType>, control: any, onlyRead?: boolean): React.ReactElement | null {
        const Component = this.componentRegistry[field.field];

        if (!Component) {
            console.warn(`Component for field type '${String(field.field)}' not found.`);
            return null;
        }

        const onlyReadProps = onlyRead
            ? {
                  disabled: true,
                  tabIndex: -1,
                  inputClassName:
                      'disabled:opacity-100! border-t-0 border-l-0 border-r-0 rounded-none border-b-1 p-0 outline-none cursor-default opacity-100!',
              }
            : {};

        return (
            <Component
                key={`form--${String(field.name)}`}
                control={control}
                read={onlyRead?.toString()}
                {...(field as any)}
                {...onlyReadProps}
            />
        );
    }
}
