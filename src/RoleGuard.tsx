const RoleGuard = ({ allow, children }) => {
  const { role } = useAuth();
  return allow.includes(role) ? children : null;
};
