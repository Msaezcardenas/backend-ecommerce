export const handleAuth = (role) => {
  console.log({ role });
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'No hay user' });
    if (req.user.role !== role) return res.status(403).json({ error: 'No autorizado el men' });

    next();
  };
};
