export const LOCALIZED_OUTPUT_ROOTS = Object.freeze({
  pilot: 'Arino - Template/.localized-pilot',
  release: 'dist/public-localized',
});

export const LOCALIZED_PILOT_OUTPUT_ROOT = LOCALIZED_OUTPUT_ROOTS.pilot;
export const LOCALIZED_RELEASE_OUTPUT_ROOT = LOCALIZED_OUTPUT_ROOTS.release;

export const assertLocalizedTarget = (target) => {
  if (!Object.prototype.hasOwnProperty.call(LOCALIZED_OUTPUT_ROOTS, target)) {
    throw new Error(
      `Unsupported localized target "${target}". Expected one of: ${Object.keys(
        LOCALIZED_OUTPUT_ROOTS,
      ).join(', ')}`,
    );
  }

  return target;
};

export const getLocalizedOutputRoot = ({ repoRoot, target }) =>
  Object.prototype.hasOwnProperty.call(LOCALIZED_OUTPUT_ROOTS, target)
    ? `${repoRoot}/${LOCALIZED_OUTPUT_ROOTS[target]}`.replace(/\/+/g, '/')
    : (() => {
        throw new Error(`No output root mapping found for target "${target}"`);
      })();
