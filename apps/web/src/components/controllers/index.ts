import { AvatarController } from './avatar';
import { BankController } from './bank';
import { CalendarController } from './calendar';
import { CepController } from './cep';
import { CheckboxController } from './checkbox';
import { CityController } from './city';
import { CnpjController } from './cnpj';
import { CountryController } from './country';
import { CpfController } from './cpf';
import { DaysOfMonthController } from './days_of_month';
import { DaysOfWeekController } from './days_of_week';
import { DaysOfYearController } from './days_of_year';
import { EditorController } from './editor';
import { IconController } from './icon';
import { InfinityCheckboxController } from './infinity-checkbox';
import { InfinitySelectController } from './infinity-select';
import { InputController } from './input';
import { MoneyController } from './money';
import { NumericController } from './numeric';
import { PercentageController } from './percentage';
import { PhoneController } from './phone';
import { SelectController } from './select';
import { StateController } from './state';
import { SwitchController } from './switch';
import { TagsController } from './tags';
import { TextareaController } from './textarea';

export const components = {
    input: InputController,
    avatar: AvatarController,
    cep: CepController,
    select: SelectController,
    cpf: CpfController,
    cnpj: CnpjController,
    phone: PhoneController,
    textarea: TextareaController,
    country: CountryController,
    state: StateController,
    city: CityController,
    switch: SwitchController,
    icon: IconController,
    calendar: CalendarController,
    money: MoneyController,
    days_of_year: DaysOfYearController,
    days_of_week: DaysOfWeekController,
    days_of_month: DaysOfMonthController,
    percentage: PercentageController,
    checkbox: CheckboxController,
    infinity_select: InfinitySelectController,
    infinity_checkbox: InfinityCheckboxController,
    numeric: NumericController,
    editor: EditorController,
    tags: TagsController,
    bank: BankController
};

export type Components = typeof components;
