import { ParsedField } from './types';
import { extractAnnotation, getDefaultValue } from './api-decorator';

export function parseJsdoc(field: ParsedField, includeDefault = true) {
  const description = extractAnnotation(field, 'description');
  const defaultValue = getDefaultValue(field);

  return {
    description: description?.value,
    default: includeDefault ? defaultValue : undefined,
  };
}

export function printJsdoc(field: ParsedField): string {
  if (!field.jsdoc?.description && field.jsdoc?.default === undefined)
    return '';

  let output = '/**\n';
  if (field.jsdoc?.description) output += ` * ${field.jsdoc.description}\n`;
  if (field.jsdoc?.default !== undefined)
    output += ` * @default ${field.jsdoc.default}\n`;
  output += '*/\n';

  return output + '';
}
