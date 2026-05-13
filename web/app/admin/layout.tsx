import type { Metadata } from 'next';
import AuthBoundary from './AuthBoundary';

export const metadata: Metadata = {
  title: 'Admin · MR Greentech',
  description: 'Lead management for the MR Greentech trade desk.',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AuthBoundary>{children}</AuthBoundary>;
}
