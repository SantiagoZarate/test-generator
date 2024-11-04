import { Request } from 'express';

const DEFAULT_LIMIT = 10;

export interface PaginateConfig {
  limit: number;
  page: number;
}

export function getPaginatedParams(query: Request['query']): PaginateConfig {
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || DEFAULT_LIMIT;

  console.log({ limit });

  return {
    page,
    limit,
  };
}
