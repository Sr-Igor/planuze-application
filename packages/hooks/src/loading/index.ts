export type IUseLoadingProps = Record<string, any>;

export const useLoading = (props: IUseLoadingProps) => {
  const isLoading = Object.keys(props).some(
    (key) =>
      props?.[key]?.isLoading ||
      props?.[key]?.isPlaceholderData ||
      props?.[key]?.isError ||
      props?.[key]?.isPending
  );

  return isLoading;
};
