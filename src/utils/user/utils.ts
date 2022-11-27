import * as bcrypt from 'bcrypt'

export async function getHashedPassword(password: string, saltRounds?: number): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds ?? 10)
  return bcrypt.hash(password, salt)
}

export async function comparePassword(inputPassword, password): Promise<boolean> {
  return bcrypt.compare(inputPassword, password)
}

export function isValidEmail(email) {
  let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
}