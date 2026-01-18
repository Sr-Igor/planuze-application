/**
 * @repo/form
 * Form library with clean and sustainable architecture
 */

// Imports component registry to ensure components are registered
import './presentation/components/fields/component-registry';

// ============================================================================
// PUBLIC API - Hooks and Main Components
// ============================================================================

export { useFormList, useValidator } from './presentation/hooks';
export { Form } from './presentation/components/form/form.component';
export { FieldContainer } from './presentation/components/base/container/field-container.component';

// ============================================================================
// PUBLIC API - Types
// ============================================================================

export type {
    Field,
    UseFormListProps,
    FormProps,
    IUseFormListReturn,
    IOption,
    ISelectProps,
    ISimpleSelectProps,
    ICheckboxSelectProps,
    ISimpleInfinityProps,
    EditorProps,
    MenuBarProps,
    InsertModalProps,
} from './shared/types';

// Re-export Field type for convenience
export type { Field as FieldType } from './shared/types';

// ============================================================================
// PUBLIC API - Utils
// ============================================================================

export {
    formatCep,
    removeCepMask,
    formatCpf,
    removeCpfMask,
    formatCnpj,
    removeCnpjMask,
    formatPhone,
    removePhoneMask,
    submitForm,
    hookValidate,
} from './shared/utils';

export type { HookConfig } from './shared/utils';

// ============================================================================
// PUBLIC API - Field Components (when needed for direct use)
// ============================================================================

//Raw components
export { Input } from './presentation/components/fields/input/input-export.component';
export { SimpleSelect } from './presentation/components/fields/select/simple/simple-export.component';
export { SimpleInfinitySelect } from './presentation/components/fields/select/simple-infinity/simple-infinity-export.component';
export { CheckboxSelect } from './presentation/components/fields/select/checkbox/checkbox-export.component';
export { CheckboxInfinitySelect } from './presentation/components/fields/select/checkbox-infinity/checkbox-infinity-export.component';
export { Calendar } from './presentation/components/fields/calendar/calendar-export.component';
export { CalendarRange } from './presentation/components/fields/calendar-range/calendar-range-export.component';
export { Currency } from './presentation/components/fields/currency/currency-export.component';
export { Numeric } from './presentation/components/fields/numeric/numeric-export.component';
export { Editor } from './presentation/components/fields/editor/editor-export.component';
export { Tags } from './presentation/components/fields/tags/tags-export.component';
export { Avatar } from './presentation/components/fields/avatar/avatar-export.component';
export { Bank } from './presentation/components/fields/bank/bank-export.component';
export { Icons } from './presentation/components/fields/icon/icon-export.component';
export { Switch } from './presentation/components/fields/switch/switch-export.component';
export { Checkbox } from './presentation/components/fields/checkbox/checkbox-export.component';
export { Percentage } from './presentation/components/fields/percentage/percentage-export.component';
export { Money } from './presentation/components/fields/money/money-export.component';
export { Country } from './presentation/components/fields/country/country-export.component';
export { States } from './presentation/components/fields/state/state-export.component';
export { Cities } from './presentation/components/fields/city/city-export.component';
export { DaysOfMonth } from './presentation/components/fields/days_of_month/days_of_month-export.component';
export { DaysOfWeek } from './presentation/components/fields/days_of_week/days_of_week-export.component';
export { DaysOfYear } from './presentation/components/fields/days_of_year/days_of_year-export.component';

//Controllers
export { Input as InputController } from './presentation/components/fields/input/input-export.component';
export { SimpleSelect as SimpleSelectController } from './presentation/components/fields/select/simple/simple-export.component';
export { SimpleInfinitySelect as SimpleInfinitySelectController } from './presentation/components/fields/select/simple-infinity/simple-infinity-export.component';
export { CheckboxSelect as CheckboxSelectController } from './presentation/components/fields/select/checkbox/checkbox-export.component';
export { CheckboxInfinitySelect as CheckboxInfinitySelectController } from './presentation/components/fields/select/checkbox-infinity/checkbox-infinity-export.component';
export { Calendar as CalendarController } from './presentation/components/fields/calendar/calendar-export.component';
export { CalendarRange as CalendarRangeController } from './presentation/components/fields/calendar-range/calendar-range-export.component';
export { Currency as CurrencyController } from './presentation/components/fields/currency/currency-export.component';
export { Numeric as NumericController } from './presentation/components/fields/numeric/numeric-export.component';
export { Editor as EditorController } from './presentation/components/fields/editor/editor-export.component';
export { Tags as TagsController } from './presentation/components/fields/tags/tags-export.component';
export { Avatar as AvatarController } from './presentation/components/fields/avatar/avatar-export.component';
export { Bank as BankController } from './presentation/components/fields/bank/bank-export.component';
export { Icons as IconsController } from './presentation/components/fields/icon/icon-export.component';
export { Switch as SwitchController } from './presentation/components/fields/switch/switch-export.component';
export { Checkbox as CheckboxController } from './presentation/components/fields/checkbox/checkbox-export.component';
export { Percentage as PercentageController } from './presentation/components/fields/percentage/percentage-export.component';
export { Money as MoneyController } from './presentation/components/fields/money/money-export.component';
export { Country as CountryController } from './presentation/components/fields/country/country-export.component';
export { States as StatesController } from './presentation/components/fields/state/state-export.component';
export { Cities as CitiesController } from './presentation/components/fields/city/city-export.component';
export { DaysOfMonth as DaysOfMonthController } from './presentation/components/fields/days_of_month/days_of_month-export.component';
export { DaysOfWeek as DaysOfWeekController } from './presentation/components/fields/days_of_week/days_of_week-export.component';
export { DaysOfYear as DaysOfYearController } from './presentation/components/fields/days_of_year/days_of_year-export.component';
