/**
 * @repo/form
 * Form library with clean and sustainable architecture
 */
// Imports component registry to ensure components are registered
import "./presentation/components/fields/component-registry";

// ============================================================================
// PUBLIC API - Re-exports from dependencies
// ============================================================================

export { zodResolver } from "@hookform/resolvers/zod";

// ============================================================================
// PUBLIC API - Hooks and Main Components
// ============================================================================

export { useFormList, useValidator } from "./presentation/hooks";
export { Form } from "./presentation/components/form/form.component";
export { FieldContainer } from "./presentation/components/base/container/field-container.component";

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
  ISelectedTag,
  ITagsProps,
  ITagsOption,
  Shallow,
} from "./shared/types";

// Re-export Field type for convenience
export type { Field as FieldType } from "./shared/types";
export type { IValidatorRequest } from "@deviobr/validator";

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
} from "./shared/utils";

export type { HookConfig } from "./shared/utils";

// ============================================================================
// PUBLIC API - Field Components (when needed for direct use)
// ============================================================================

//Raw components
export { Input } from "./presentation/components/fields/input/input-export.component";
export { SimpleSelect } from "./presentation/components/fields/select/simple/simple-export.component";
export { SimpleInfinitySelect } from "./presentation/components/fields/select/simple-infinity/simple-infinity-export.component";
export { CheckboxSelect } from "./presentation/components/fields/select/checkbox/checkbox-export.component";
export { CheckboxInfinitySelect } from "./presentation/components/fields/select/checkbox-infinity/checkbox-infinity-export.component";
export { Calendar } from "./presentation/components/fields/calendar/calendar-export.component";
export { CalendarRange } from "./presentation/components/fields/calendar-range/calendar-range-export.component";
export { Currency } from "./presentation/components/fields/currency/currency-export.component";
export { Numeric } from "./presentation/components/fields/numeric/numeric-export.component";
export { Editor } from "./presentation/components/fields/editor/editor-export.component";
export { Tags } from "./presentation/components/fields/tags/tags-export.component";
export { Avatar } from "./presentation/components/fields/avatar/avatar-export.component";
export { Bank } from "./presentation/components/fields/bank/bank-export.component";
export { Icons } from "./presentation/components/fields/icon/icon-export.component";
export { Switch } from "./presentation/components/fields/switch/switch-export.component";
export { Checkbox } from "./presentation/components/fields/checkbox/checkbox-export.component";
export { Percentage } from "./presentation/components/fields/percentage/percentage-export.component";
export { Money } from "./presentation/components/fields/money/money-export.component";
export { Country } from "./presentation/components/fields/country/country-export.component";
export { States } from "./presentation/components/fields/state/state-export.component";
export { Cities } from "./presentation/components/fields/city/city-export.component";
export { DaysOfMonth } from "./presentation/components/fields/days_of_month/days_of_month-export.component";
export { DaysOfWeek } from "./presentation/components/fields/days_of_week/days_of_week-export.component";
export { DaysOfYear } from "./presentation/components/fields/days_of_year/days_of_year-export.component";

//Controllers (react-hook-form wrappers)
export { InputField as InputController } from "./presentation/components/fields/input/input.component";
export { SimpleSelectField as SimpleSelectController } from "./presentation/components/fields/select/simple/simple.component";
export { SimpleInfinitySelectField as SimpleInfinitySelectController } from "./presentation/components/fields/select/simple-infinity/simple-infinity.component";
export { CheckboxSelectField as CheckboxSelectController } from "./presentation/components/fields/select/checkbox/checkbox.component";
export { CheckboxInfinitySelectField as CheckboxInfinitySelectController } from "./presentation/components/fields/select/checkbox-infinity/checkbox-infinity.component";
export { CalendarField as CalendarController } from "./presentation/components/fields/calendar/calendar.component";
export { CalendarRangeField as CalendarRangeController } from "./presentation/components/fields/calendar-range/calendar-range.component";
export { CurrencyField as CurrencyController } from "./presentation/components/fields/currency/currency.component";
export { NumericField as NumericController } from "./presentation/components/fields/numeric/numeric.component";
export { EditorField as EditorController } from "./presentation/components/fields/editor/editor.component";
export { TagsField as TagsController } from "./presentation/components/fields/tags/tags.component";
export { AvatarField as AvatarController } from "./presentation/components/fields/avatar/avatar.component";
export { BankField as BankController } from "./presentation/components/fields/bank/bank.component";
export { IconField as IconsController } from "./presentation/components/fields/icon/icon.component";
export { SwitchField as SwitchController } from "./presentation/components/fields/switch/switch.component";
export { CheckboxField as CheckboxController } from "./presentation/components/fields/checkbox/checkbox.component";
export { PercentageField as PercentageController } from "./presentation/components/fields/percentage/percentage.component";
export { MoneyField as MoneyController } from "./presentation/components/fields/money/money.component";
export { CountryField as CountryController } from "./presentation/components/fields/country/country.component";
export { StateField as StatesController } from "./presentation/components/fields/state/state.component";
export { CityField as CitiesController } from "./presentation/components/fields/city/city.component";
export { DaysOfMonthField as DaysOfMonthController } from "./presentation/components/fields/days_of_month/days_of_month.component";
export { DaysOfWeekField as DaysOfWeekController } from "./presentation/components/fields/days_of_week/days_of_week.component";
export { DaysOfYearField as DaysOfYearController } from "./presentation/components/fields/days_of_year/days_of_year.component";
