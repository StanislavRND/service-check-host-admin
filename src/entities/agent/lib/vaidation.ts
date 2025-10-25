export const agentNameValidation = {
  required: "Введите название агента",
  pattern: {
    value: /^[a-z0-9-]+$/,
    message: "Только маленькие латинские буквы, цифры и тире",
  },
};
