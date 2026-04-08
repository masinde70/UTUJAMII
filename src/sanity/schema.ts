// ./src/sanity/schema.ts
import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './schemas/projectType'
import { newsType } from './schemas/newsType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, newsType],
}
