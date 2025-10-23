"use client";

import { usePathname } from 'next/navigation';
import NavBar from '@/components/nav';

export function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Don't show navbar on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  
  return <NavBar />;
}
