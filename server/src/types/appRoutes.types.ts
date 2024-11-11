export const appRoutes = {
  test: '/api/test',
  health: '/api/health',
  auth: '/api/auth',
  user: '/api/user',
  multipleChoice: '/api/multiple-choice-test',
  docs: '/api/docs',
} as const;

export type AppRoute = (typeof appRoutes)[keyof typeof appRoutes];
