function isString(value: any) {
  if (typeof value !== "string") {
    // TODO: refatorar para um erro personalizado
    throw new Error("O campo deve ser do tipo string");
  }
}

function isNumber(value: any) {
  if (typeof value !== "number") {
    // TODO: refatorar para um erro personalizado
    throw new Error("O campo deve ser do tipo number");
  }
}

export const ValidationUtil = {
  isString,
  isNumber,
};
