/**
 * Field components registry
 *
 * This file centralizes the registration of all field components
 * in the ComponentFactory, following the Factory pattern and the Open/Closed Principle (OCP).
 *
 * To add a new component:
 * 1. Import the component
 * 2. Register it using ComponentFactory.register('type', Component)
 */
import { ComponentFactory } from "../../../core/infrastructure/factories/component.factory";
import { AvatarField } from "./avatar/avatar.component";
import { BankField } from "./bank/bank.component";
import { CalendarRangeField } from "./calendar-range/calendar-range.component";
import { CalendarField } from "./calendar/calendar.component";
import { CepField } from "./cep/cep.component";
import { CheckboxField } from "./checkbox/checkbox.component";
import { CityField } from "./city/city.component";
import { CnpjField } from "./cnpj/cnpj.component";
import { CountryField } from "./country/country.component";
import { CpfField } from "./cpf/cpf.component";
import { CurrencyField } from "./currency/currency.component";
import { DaysOfMonthField } from "./days_of_month/days_of_month.component";
import { DaysOfWeekField } from "./days_of_week/days_of_week.component";
import { DaysOfYearField } from "./days_of_year/days_of_year.component";
import { EditorField } from "./editor/editor.component";
import { IconField } from "./icon/icon.component";
import { InputField } from "./input/input.component";
import { MoneyField } from "./money/money.component";
import { NumericField } from "./numeric/numeric.component";
import { PercentageField } from "./percentage/percentage.component";
import { PhoneField } from "./phone/phone.component";
import { CheckboxInfinitySelectField } from "./select/checkbox-infinity/checkbox-infinity.component";
import { CheckboxSelectField } from "./select/checkbox/checkbox.component";
import { SimpleInfinitySelectField } from "./select/simple-infinity/simple-infinity.component";
import { SimpleSelectField } from "./select/simple/simple.component";
import { StateField } from "./state/state.component";
import { SwitchField } from "./switch/switch.component";
import { TagsField } from "./tags/tags.component";
import { TextareaField } from "./textarea/textarea.component";

// ============================================================================
// Component Registration
// ============================================================================

// Basic inputs
ComponentFactory.register("input", InputField);
ComponentFactory.register("textarea", TextareaField);

// Formatted inputs
ComponentFactory.register("cep", CepField);
ComponentFactory.register("cpf", CpfField);
ComponentFactory.register("cnpj", CnpjField);
ComponentFactory.register("phone", PhoneField);

// Numeric inputs
ComponentFactory.register("numeric", NumericField);
ComponentFactory.register("percentage", PercentageField);
ComponentFactory.register("money", MoneyField);
ComponentFactory.register("currency", CurrencyField);

// Selection inputs
ComponentFactory.register("country", CountryField);
ComponentFactory.register("state", StateField);
ComponentFactory.register("city", CityField);
ComponentFactory.register("bank", BankField);
ComponentFactory.register("icon", IconField);

// Date inputs
ComponentFactory.register("calendar", CalendarField);
ComponentFactory.register("calendar-range", CalendarRangeField);
ComponentFactory.register("days_of_month", DaysOfMonthField);
ComponentFactory.register("days_of_week", DaysOfWeekField);
ComponentFactory.register("days_of_year", DaysOfYearField);

// Other inputs
ComponentFactory.register("avatar", AvatarField);
ComponentFactory.register("switch", SwitchField);
ComponentFactory.register("checkbox", CheckboxField);
ComponentFactory.register("select", SimpleSelectField);
ComponentFactory.register("select-simple", SimpleSelectField);
ComponentFactory.register("select-simple-infinity", SimpleInfinitySelectField);
ComponentFactory.register("select-checkbox", CheckboxSelectField);
ComponentFactory.register("select-checkbox-infinity", CheckboxInfinitySelectField);

// Tags
ComponentFactory.register("tags", TagsField);

// Editor
ComponentFactory.register("editor", EditorField);
