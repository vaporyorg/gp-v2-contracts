import type { ethers, Signer } from "ethers";

/**
 * A signature-like type.
 */
export type SignatureLike = Parameters<typeof ethers.utils.splitSignature>[0];

/**
 * EIP-712 typed data domain.
 */
export type TypedDataDomain = Parameters<
  typeof ethers.utils._TypedDataEncoder.hashDomain
>[0];

/**
 * EIP-712 typed data type definitions.
 */
export type TypedDataTypes = Parameters<
  typeof ethers.utils._TypedDataEncoder.hashStruct
>[1];

/**
 * Ethers EIP-712 typed data signer interface.
 */
export interface TypedDataSigner extends Signer {
  /**
   * Signs the typed data value with types data structure for domain using the
   * EIP-712 specification.
   */
  _signTypedData: typeof ethers.VoidSigner.prototype._signTypedData;
}

/**
 * Checks whether the specified signer is a typed data signer.
 */
export function isTypedDataSigner(signer: Signer): signer is TypedDataSigner {
  return "_signTypedData" in signer;
}

/**
 * A provider resembling a {@link ethers.providers.JsonRpcProvider}.
 */
export interface JsonRpcProviderLike extends ethers.providers.Provider {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  send(method: string, params: unknown[]): Promise<any>;
}

/**
 * A signer resembling a {@link ethers.providers.JsonRpcSigner}.
 */
export interface JsonRpcSignerLike extends Signer {
  provider: JsonRpcProviderLike;
}

/**
 * Checks whether the specified signer is a {@link JsonRpcSignerLike}.
 */
export function isJsonRpcSignerLike(
  signer: Signer,
): signer is JsonRpcSignerLike {
  return signer.provider !== undefined && "send" in signer.provider;
}
