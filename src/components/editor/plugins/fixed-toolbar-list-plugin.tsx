'use client';

import { createPlatePlugin } from '@udecode/plate/react';

import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FixedToolbarListButtons } from '@/components/plate-ui/fixed-toolbar-list-buttons';

export const FixedToolbarListPlugin = createPlatePlugin({
  key: 'fixed-toolbar',
  render: {
    beforeEditable: () => (
      <FixedToolbar>
        <FixedToolbarListButtons />
      </FixedToolbar>
    ),
  },
});
