export function get_field_value_or_undefined(
  formData: FormData,
  fieldName: string,
): string | undefined {
  const fieldValue = formData.get(fieldName)?.toString() ?? "";
  return fieldValue !== "" ? fieldValue : undefined;
}
