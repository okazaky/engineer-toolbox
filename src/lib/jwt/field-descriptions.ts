import { type JwtFieldMeta } from "@/types/jwt-decoder.types"

const HEADER_FIELDS: Record<string, JwtFieldMeta> = {
  alg: {
    name: "alg",
    description: "Algorithm - 署名アルゴリズム",
  },
  typ: {
    name: "typ",
    description: "Type - トークンタイプ",
  },
  kid: {
    name: "kid",
    description: "Key ID - 署名鍵の識別子",
  },
}

const PAYLOAD_FIELDS: Record<string, JwtFieldMeta> = {
  iss: {
    name: "iss",
    description: "Issuer - トークンの発行者",
  },
  sub: {
    name: "sub",
    description: "Subject - トークンの主体（ユーザーID等）",
  },
  aud: {
    name: "aud",
    description: "Audience - トークンの対象受信者",
  },
  exp: {
    name: "exp",
    description: "Expiration Time - トークンの有効期限",
  },
  nbf: {
    name: "nbf",
    description: "Not Before - この時刻以前は無効",
  },
  iat: {
    name: "iat",
    description: "Issued At - トークンの発行日時",
  },
  jti: {
    name: "jti",
    description: "JWT ID - トークンの一意識別子",
  },
}

export function getFieldDescription(
  field: string,
  section: "header" | "payload"
): JwtFieldMeta | null {
  const map = section === "header" ? HEADER_FIELDS : PAYLOAD_FIELDS
  return map[field] ?? null
}
