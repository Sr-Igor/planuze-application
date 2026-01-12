import { IValidatorRequest, validatorWeb } from '@deviobr/validator';

export const validator = (data: IValidatorRequest) => {
    return validatorWeb(data);
};
