export type Warning = {
  type: "error" | "warning" | "info";
  title: () => { message: string; params?: Record<string, any> };
  description: () => { message: string; params?: Record<string, any> };
  locked: boolean;
};
