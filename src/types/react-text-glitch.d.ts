declare module 'react-text-glitch' {
  import { ComponentType, HTMLAttributes } from 'react';

  interface TextGlitchProps extends HTMLAttributes<HTMLElement> {
    component?: string | ComponentType;
    children?: React.ReactNode;
  }

  const TextGlitch: React.FC<TextGlitchProps>;
  export default TextGlitch;
} 