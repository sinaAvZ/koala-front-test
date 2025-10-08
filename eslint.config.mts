// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [...compat.config({
  extends: ['next/core-web-vitals', 'next/typescript','next', 'prettier',
        'plugin:@next/next/recommended','eslint:recommended'
  ],
}), ...storybook.configs["flat/recommended"]]

export default eslintConfig