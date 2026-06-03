import { describe, expect, it } from 'vitest';

import {
  ORGANIZATION_LOGO_URL,
  SOCIAL_SHARE_IMAGE_HEIGHT,
  SOCIAL_SHARE_IMAGE_URL,
  SOCIAL_SHARE_IMAGE_WIDTH,
} from '../../scripts/public-page-schema.mjs';

describe('public site social share image', () => {
  it('uses the dark profile artwork for public page previews', () => {
    expect(SOCIAL_SHARE_IMAGE_URL).toBe('https://assets.art-ratio.com/AR%20Logo%20v3.5%20curved%20WH.png');
    expect(SOCIAL_SHARE_IMAGE_WIDTH).toBe(4500);
    expect(SOCIAL_SHARE_IMAGE_HEIGHT).toBe(4500);
    expect(SOCIAL_SHARE_IMAGE_URL).not.toBe(ORGANIZATION_LOGO_URL);
  });
});
