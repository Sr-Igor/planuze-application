/**
 * Core Interfaces Module
 *
 * This module exports all interface contracts used throughout the UI library.
 * Following Interface Segregation Principle (ISP), interfaces are kept small
 * and focused on specific concerns.
 *
 * @module core/interfaces
 */

export type {
  IBaseComponent,
  IDisableableComponent,
  ILoadableComponent,
  IPolymorphicComponent,
  ISizeableComponent,
  IVariantComponent,
  PolymorphicComponentProps,
} from "./component.interface";

export type {
  IAdornmentComponent,
  INamedSlotsComponent,
  ISlottableComponent,
} from "./slot.interface";
