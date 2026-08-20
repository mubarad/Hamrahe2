import React, { createContext, useContext, useState } from "react";
import { InternalAdminUser } from "../types/admin";
import { currentAdminUser } from "../data/adminMockData";

interface AdminAuthContextType {
  adminUser: InternalAdminUser | null;
  isAuthenticated: boolean;
  mfaVerified: boolean;
  currentScope: string;
  hasPermission: (permissionCode: string) => boolean;
  verifyMFA: (code: string) => boolean;
  logoutAdmin: () => void;
  requestSensitiveAccess: (reason: string, caseId: string) => Promise<boolean>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<InternalAdminUser | null>(currentAdminUser);
  const [mfaVerified, setMfaVerified] = useState<boolean>(true);
  const [currentScope] = useState<string>("global");

  const hasPermission = (permissionCode: string): boolean => {
    if (!adminUser) return false;
    if (adminUser.internalRoles.includes("SuperAdmin")) return true;
    return adminUser.permissions.includes(permissionCode);
  };

  const verifyMFA = (code: string): boolean => {
    if (code === "123456" || code.length === 6) {
      setMfaVerified(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    setMfaVerified(false);
  };

  const requestSensitiveAccess = async (reason: string, caseId: string): Promise<boolean> => {
    console.log("Sensitive access requested:", { reason, caseId, user: adminUser?.email });
    return true;
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        isAuthenticated: !!adminUser,
        mfaVerified,
        currentScope,
        hasPermission,
        verifyMFA,
        logoutAdmin,
        requestSensitiveAccess,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
