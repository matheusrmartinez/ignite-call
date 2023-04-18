import { Errors } from '@/enums/errors';
import { ValidationResult } from '@/types/validationResult';
import { ParsedUrlQuery } from 'querystring';

export function validateAuth(url: ParsedUrlQuery): ValidationResult {
  let validationResult = permissionError(url);

  if (validationResult.hasError) return validationResult;

  return {
    message: '',
    hasError: false,
  };
}

function permissionError(url: ParsedUrlQuery): ValidationResult {
  if (url.error === Errors.permissions) {
    return {
      message:
        'Falha ao se conectar ao Google. Verifique se as permissões ao Google Calendar foram concedidas.',
      hasError: true,
    };
  }

  return {
    message: '',
    hasError: false,
  };
}
