import DashbordDrawer from '@/components/dashboard/dashbordDrawerLayout/DashbordDrawer';

import { ReactNode } from 'react';

const DashbordLayout = ({ children }: { children: ReactNode }) => {
  return <DashbordDrawer> {children} </DashbordDrawer>;
};

export default DashbordLayout;
