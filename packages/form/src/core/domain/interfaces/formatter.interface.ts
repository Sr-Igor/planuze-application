/**
 * Interface for value formatters
 * Allows different formatting strategies
 */
export interface IFormatter {
    format(value: string | null | undefined): string;
    removeMask(value: string): string;
}
