import defaultMdxComponents from 'fumadocs-ui/mdx';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import { createGenerator, createFileSystemGeneratorCache } from 'fumadocs-typescript';
import { AutoTypeTable } from 'fumadocs-typescript/ui';
import type { MDXComponents } from 'mdx/types';

const generator = createGenerator({
  cache: createFileSystemGeneratorCache('.next/fumadocs-typescript'),
  tsconfigPath: './tsconfig.json',
});

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    AutoTypeTable: (props) => <AutoTypeTable {...props} generator={generator} />,
    ...components,
  };
}
