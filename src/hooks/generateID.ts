export const generateId = () =>
  `${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
