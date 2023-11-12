import { createHash, publicEncrypt, constants, KeyLike } from "crypto";

interface AuthDataOptions {
  card: string;
  pin: string;
  exp: string;
  cvv: string;
}

export const generateAuthData = (options: AuthDataOptions): string => {
  const authString = `1Z${options.card}Z${options.pin}Z${options.exp}Z${options.cvv}`;
  const vv = toHex(authString);
  const authDataBytes = Buffer.from(vv, "hex");

  const modulos = Buffer.from(
    process.env.INTERSWITCH_PUBLIC_KEY_MODULUS as string,
    "hex"
  );

  const exp = Buffer.from(
    process.env.INTERSWITCH_PUBLIC_KEY_EXPONENT as string,
    "hex"
  );

  const keyObject: { modulus: Buffer; exponent: Buffer } = {
    modulus: modulos,
    exponent: exp,
  };
  const authBytes = publicEncrypt(
    {
      key: keyObject as unknown as KeyLike,
      padding: constants.RSA_PKCS1_PADDING,
    },
    authDataBytes
  );
  const auth = authBytes.toString("base64");

  return auth;
};

const toHex = (str: string): string => {
  let hex = "";
  for (let i = 0; i < str.length; i++) {
    hex += "" + str.charCodeAt(i).toString(16);
  }
  return hex;
};
