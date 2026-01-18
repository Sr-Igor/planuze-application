import { useCallback, useEffect, useRef } from "react";

import { useLang } from "@repo/language/hooks";

import { FileValidationService } from "../services/FileValidationService";

export interface UseFileValidationProps {
  maxFileSize?: number;
  allowedTypes?: string[];
}

export interface UseFileValidationReturn {
  validateFile: (file: File) => { isValid: boolean; error?: string };
  validateFiles: (files: File[]) => { valid: File[]; invalid: { file: File; error: string }[] };
  setMaxFileSize: (size: number) => void;
  setAllowedTypes: (types: string[]) => void;
}

export const useFileValidation = ({
  maxFileSize = 10 * 1024 * 1024,
  allowedTypes = [],
}: UseFileValidationProps = {}): UseFileValidationReturn => {
  const validationServiceRef = useRef<FileValidationService | null>(null);
  const t = useLang();

  // Recriar serviço quando maxFileSize, allowedTypes ou função de tradução mudarem
  useEffect(() => {
    validationServiceRef.current = new FileValidationService(
      maxFileSize,
      allowedTypes,
      (key: string) => t.helper(key)
    );
  }, [maxFileSize, allowedTypes, t]);

  const validationService = validationServiceRef.current;

  const validateFile = useCallback(
    (file: File) => {
      if (!validationService) {
        return { isValid: false, error: t.helper("validation_service_unavailable") };
      }
      return validationService.validateFile(file);
    },
    [validationService, t]
  );

  const validateFiles = useCallback(
    (files: File[]) => {
      if (!validationService) {
        return {
          valid: [],
          invalid: files.map((file) => ({
            file,
            error: t.helper("validation_service_unavailable"),
          })),
        };
      }
      return validationService.validateFiles(files);
    },
    [validationService, t]
  );

  const setMaxFileSize = useCallback(
    (size: number) => {
      if (validationService) {
        validationService.setMaxFileSize(size);
      }
    },
    [validationService]
  );

  const setAllowedTypes = useCallback(
    (types: string[]) => {
      if (validationService) {
        validationService.setAllowedTypes(types);
      }
    },
    [validationService]
  );

  return {
    validateFile,
    validateFiles,
    setMaxFileSize,
    setAllowedTypes,
  };
};
