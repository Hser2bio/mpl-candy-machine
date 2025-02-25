/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  AccountMeta,
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  array,
  mapSerializer,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { addAccountMeta, addObjectProperty } from '../shared';

// Accounts.
export type DeleteCandyGuardInstructionAccounts = {
  candyGuard: PublicKey | Pda;
  authority?: Signer;
};

// Data.
export type DeleteCandyGuardInstructionData = { discriminator: Array<number> };

export type DeleteCandyGuardInstructionDataArgs = {};

/** @deprecated Use `getDeleteCandyGuardInstructionDataSerializer()` without any argument instead. */
export function getDeleteCandyGuardInstructionDataSerializer(
  _context: object
): Serializer<
  DeleteCandyGuardInstructionDataArgs,
  DeleteCandyGuardInstructionData
>;
export function getDeleteCandyGuardInstructionDataSerializer(): Serializer<
  DeleteCandyGuardInstructionDataArgs,
  DeleteCandyGuardInstructionData
>;
export function getDeleteCandyGuardInstructionDataSerializer(
  _context: object = {}
): Serializer<
  DeleteCandyGuardInstructionDataArgs,
  DeleteCandyGuardInstructionData
> {
  return mapSerializer<
    DeleteCandyGuardInstructionDataArgs,
    any,
    DeleteCandyGuardInstructionData
  >(
    struct<DeleteCandyGuardInstructionData>(
      [['discriminator', array(u8(), { size: 8 })]],
      { description: 'DeleteCandyGuardInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [183, 18, 70, 156, 148, 109, 161, 34],
    })
  ) as Serializer<
    DeleteCandyGuardInstructionDataArgs,
    DeleteCandyGuardInstructionData
  >;
}

// Instruction.
export function deleteCandyGuard(
  context: Pick<Context, 'programs' | 'identity'>,
  input: DeleteCandyGuardInstructionAccounts
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplCandyGuard',
    'Guard1JwRhJkVH6XZhzoYxeBVQe872VH6QggF4BWmS9g'
  );

  // Resolved inputs.
  const resolvedAccounts = {
    candyGuard: [input.candyGuard, true] as const,
  };
  addObjectProperty(
    resolvedAccounts,
    'authority',
    input.authority
      ? ([input.authority, true] as const)
      : ([context.identity, true] as const)
  );

  addAccountMeta(keys, signers, resolvedAccounts.candyGuard, false);
  addAccountMeta(keys, signers, resolvedAccounts.authority, false);

  // Data.
  const data = getDeleteCandyGuardInstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
