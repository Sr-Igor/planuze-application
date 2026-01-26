declare module "react-window" {
  import { ComponentType, CSSProperties, ReactNode, Ref } from "react";

  export interface ListChildComponentProps<T = any> {
    index: number;
    style: CSSProperties;
    data: T;
    isScrolling?: boolean;
  }

  export interface CommonProps {
    className?: string;
    style?: CSSProperties;
    innerRef?: Ref<any>;
    outerRef?: Ref<any>;
    innerElementType?: string | ComponentType<any>;
    outerElementType?: string | ComponentType<any>;
    itemData?: any;
    useIsScrolling?: boolean;
    onScroll?: (props: {
      scrollDirection: "forward" | "backward";
      scrollOffset: number;
      scrollUpdateWasRequested: boolean;
    }) => void;
    onItemsRendered?: (props: {
      overscanStartIndex: number;
      overscanStopIndex: number;
      visibleStartIndex: number;
      visibleStopIndex: number;
    }) => void;
    direction?: "ltr" | "rtl";
    initialScrollOffset?: number;
  }

  export interface FixedSizeListProps extends CommonProps {
    children: ComponentType<ListChildComponentProps>;
    height: number;
    width: number | string;
    itemCount: number;
    itemSize: number;
    overscanCount?: number;
    layout?: "horizontal" | "vertical";
  }

  export interface VariableSizeListProps extends CommonProps {
    children: ComponentType<ListChildComponentProps>;
    height: number;
    width: number | string;
    itemCount: number;
    itemSize: (index: number) => number;
    estimatedItemSize?: number;
    overscanCount?: number;
    layout?: "horizontal" | "vertical";
  }

  export class FixedSizeList<T = any> extends React.Component<
    FixedSizeListProps & { itemData?: T }
  > {
    scrollTo(scrollOffset: number): void;
    scrollToItem(index: number, align?: "auto" | "smart" | "center" | "end" | "start"): void;
  }

  export class VariableSizeList<T = any> extends React.Component<
    VariableSizeListProps & { itemData?: T }
  > {
    scrollTo(scrollOffset: number): void;
    scrollToItem(index: number, align?: "auto" | "smart" | "center" | "end" | "start"): void;
    resetAfterIndex(index: number, shouldForceUpdate?: boolean): void;
  }

  export function areEqual(
    prevProps: ListChildComponentProps,
    nextProps: ListChildComponentProps
  ): boolean;
}
