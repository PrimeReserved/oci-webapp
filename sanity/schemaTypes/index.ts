// sanity/schemas/index.ts (or schemaTypes/index.ts)
import { type SchemaTypeDefinition } from 'sanity';
import { property } from './property';
import blog from './blog';
import author from './author';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [property, blog, author],
};

// Export as schemaTypes as well for compatibility
export const schemaTypes = schema.types;
