'use client';

import DashbordDrawer from '@/components/dashboard/dashbordDrawerLayout/DashbordDrawer';
import { isLoggedIn } from '@/services/auth.services';
import { useRouter } from 'next/navigation';

import { ReactNode } from 'react';

const DashbordLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  if (!isLoggedIn) {
    return router.push('/login');
  }
  return <DashbordDrawer> {children} </DashbordDrawer>;
};

export default DashbordLayout;
