import type { LucideIcon } from 'lucide-react-native';
import { cssInterop } from 'nativewind';
import { ReactNode } from 'react';

export function iconWithClassName(icon: LucideIcon) {
  cssInterop(icon, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}

export const InjectClassName = ({ children }: { children: ReactNode}) => {
  cssInterop(children, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  })

  return children;
}