/**
 * Converts an object to FormData, handling specified file fields
 *
 * @param data - Object to be converted
 * @param fileFields - List of fields that contain files
 * @returns Populated FormData
 *
 * @example
 * ```ts
 * const formData = setFormData(
 *   { name: 'John', avatar: file },
 *   ['avatar']
 * );
 * ```
 */
export const setFormData = (data: Record<string, unknown>, fileFields: string[] = []): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    // File fields
    if (fileFields.includes(key)) {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (value instanceof FileList) {
        Array.from(value).forEach((file) => {
          formData.append(key, file);
        });
      } else if (Array.isArray(value)) {
        value.forEach((file) => {
          if (file instanceof File) {
            formData.append(key, file);
          }
        });
      }
      return;
    }

    // Arrays and objects (after null check, typeof object means array or object)
    if (typeof value === "object") {
      formData.append(key, JSON.stringify(value));
      return;
    }

    // Primitive values (string, number, boolean, bigint, symbol)
    if (typeof value === "string") {
      formData.append(key, value);
    } else if (
      typeof value === "number" ||
      typeof value === "boolean" ||
      typeof value === "bigint"
    ) {
      formData.append(key, String(value));
    }
  });

  return formData;
};

/**
 * Extracts files from a data object
 */
export const extractFiles = (
  data: Record<string, unknown>,
  fileFields: string[]
): { files: Record<string, File | File[]>; rest: Record<string, unknown> } => {
  const files: Record<string, File | File[]> = {};
  const rest: Record<string, unknown> = {};

  Object.entries(data).forEach(([key, value]) => {
    if (fileFields.includes(key) && value) {
      if (value instanceof File) {
        files[key] = value;
      } else if (value instanceof FileList) {
        files[key] = Array.from(value);
      } else if (Array.isArray(value) && value.every((v) => v instanceof File)) {
        files[key] = value;
      } else {
        rest[key] = value;
      }
    } else {
      rest[key] = value;
    }
  });

  return { files, rest };
};
