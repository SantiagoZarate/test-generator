import { PropsWithChildren } from 'react';

export function List({ children }: PropsWithChildren) {
  return <ul className="flex flex-col print:gap-12">{children}</ul>;
}
