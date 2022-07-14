import jwt from 'jsonwebtoken';
import Promise from 'bluebird';
import { JWT_SECRET } from "../../config";

const jwtSign = Promise.promisify(jwt.sign);
const jwtVerify = Promise.promisify(jwt.verify);

export const sign = (id, options, method = jwtSign) =>
  method({ id }, JWT_SECRET, options)

export const signSync = (id, options) => sign(id, options, jwt.sign)

export const verify = (token) => jwtVerify(token, JWT_SECRET)


