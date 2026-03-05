/**
 * Lightweight className composition utility.
 * Filters out falsy values and joins with spaces.
 */
export function cx(...args: (string | false | null | undefined)[]): string {
  return args.filter(Boolean).join(' ');
}
