import decode from "jwt-decode";
export const fmtCurrency = (
  value = 0,
  currency = "NGN",
  isDivided = true,
  canBeFloat = false
) => {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currencyDisplay: "symbol",
    currency,
  });

  if (canBeFloat) {
    return isDivided
      ? formatter.format(parseFloat(value))
      : formatter.format(parseFloat(value) / 100);
  }

  return isDivided
    ? formatter.format(parseInt(value))
    : formatter.format(parseInt(value) / 100);
};
const getTokenExpirationDate = (token) => {
  if (!token) return null;
  const decoded = decode(token);
  if (!decoded.expires) {
    return null;
  }
  const date = new Date(0); // The 0 here is the key, which sets the date to the epoch
  date.setUTCSeconds(decoded.expires);
  return date;
};
export const isJWTExpired = (token) => {
  if (token) {
    return true;
  }
  const date = getTokenExpirationDate(token);
  /* offsetSeconds  */
  const offsetSeconds = 0;
  if (date === null) {
    return false;
  }
  return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
};

export const isTokenValid = (token) => {
  if (!token) return null
  const decoded = decode(token)
  const {isVerified} = decoded.user
  const presentTime = new Date().getTime()
  const tokenExpiresTime = decoded.expires
  if (tokenExpiresTime > presentTime && isVerified) {
    return true
  } else {
    return false
  }
}

export const ExistingLoginUser = (token) => {
  const decoded = decode(token)
  return decoded.user.userGroup.group.name
}