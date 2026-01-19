import { useLang } from "@repo/language/hooks";

import type { ModalConfig, ModalType } from "../../../shared/types/editor.types";

export const useModalConfig = () => {
  const t = useLang();
  const MODAL_CONFIGS: Record<ModalType, ModalConfig> = {
    image: {
      title: t.editor("image.title"),
      placeholder: t.editor("image.placeholder"),
      label: t.editor("image.label"),
    },
    youtube: {
      title: t.editor("youtube.title"),
      placeholder: t.editor("youtube.placeholder"),
      label: t.editor("youtube.label"),
    },
    link: {
      title: t.editor("link.title"),
      placeholder: t.editor("link.placeholder"),
      label: t.editor("link.label"),
    },
  };

  const DEFAULT_MODAL_CONFIG: ModalConfig = {
    title: t.editor("default.title"),
    placeholder: t.editor("default.placeholder"),
    label: t.editor("default.label"),
  };

  return {
    MODAL_CONFIGS,
    DEFAULT_MODAL_CONFIG,
  };
};
