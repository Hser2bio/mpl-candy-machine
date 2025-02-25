import {
  ACCOUNT_HEADER_SIZE,
  mergeBytes,
  transactionBuilder,
  TransactionBuilder,
} from '@metaplex-foundation/umi';
import { u32 } from '@metaplex-foundation/umi/serializers';
import { CANDY_GUARD_DATA } from './constants';
import { DefaultGuardSetArgs } from './defaultGuards';
import {
  createCandyGuard as baseCreateCandyGuard,
  CreateCandyGuardInstructionAccounts,
} from './generated/instructions/createCandyGuard';
import {
  CandyGuardProgram,
  GuardRepository,
  GuardSet,
  GuardSetArgs,
} from './guards';
import {
  CandyGuardData,
  CandyGuardDataArgs,
  getCandyGuardDataSerializer,
} from './hooked';

export { CreateCandyGuardInstructionAccounts };

export type CreateCandyGuardInstructionData<D extends GuardSet> = {
  discriminator: Array<number>;
} & CandyGuardData<D>;

export type CreateCandyGuardInstructionDataArgs<DA extends GuardSetArgs> =
  Partial<CandyGuardDataArgs<DA>>;

export function createCandyGuard<DA extends GuardSetArgs = DefaultGuardSetArgs>(
  context: Parameters<typeof baseCreateCandyGuard>[0] & {
    guards: GuardRepository;
  },
  input: CreateCandyGuardInstructionAccounts &
    CreateCandyGuardInstructionDataArgs<
      DA extends undefined ? DefaultGuardSetArgs : DA
    >
): TransactionBuilder {
  const { guards, groups, ...rest } = input;
  const program = context.programs.get<CandyGuardProgram>('mplCandyGuard');
  const serializer = getCandyGuardDataSerializer<
    DA extends undefined ? DefaultGuardSetArgs : DA,
    any
  >(context, program);
  const data = serializer.serialize({
    guards: guards ?? {},
    groups: groups ?? [],
  });
  const prefix = u32().serialize(data.length);
  const dataWithPrefix = mergeBytes([prefix, data]);

  return transactionBuilder([
    {
      ...baseCreateCandyGuard(context, {
        ...rest,
        data: dataWithPrefix,
      }).items[0],
      bytesCreatedOnChain: ACCOUNT_HEADER_SIZE + CANDY_GUARD_DATA + data.length,
    },
  ]);
}
