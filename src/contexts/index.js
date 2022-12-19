import React from "react";
import _ from "lodash";

import { DashboardProvider } from './dashboardContext'
import { UserProvider } from './userContext'

export { UserContext } from './userContext'
export { DashboardContext } from './dashboardContext'


export function ContextProvider({ children }) {
  return (
    <UserProvider>
        <DashboardProvider>
            {children}
        </DashboardProvider>
    </UserProvider>
  );
}
