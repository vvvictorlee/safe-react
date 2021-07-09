import { getBalances, GatewayDefinitions } from '@gnosis.pm/safe-react-gateway-sdk'
import { getNetworkName } from 'src/config'
import { checksumAddress } from 'src/utils/checksumAddress'

export type TokenBalance = {
  tokenInfo: GatewayDefinitions['TokenInfo']
  balance: string
  fiatBalance: string
  fiatConversion: string
}

export type BalanceEndpoint = GatewayDefinitions['SafeBalanceResponse']

type FetchTokenCurrenciesBalancesProps = {
  safeAddress: string
  selectedCurrency: string
  excludeSpamTokens?: boolean
  trustedTokens?: boolean
}

export const fetchTokenCurrenciesBalances = async ({
  safeAddress,
  selectedCurrency,
  excludeSpamTokens = true,
  trustedTokens = false,
}: FetchTokenCurrenciesBalancesProps): Promise<BalanceEndpoint> => {
  const network = getNetworkName()
  const address = checksumAddress(safeAddress)
  return getBalances(network, address, selectedCurrency, { exclude_spam: excludeSpamTokens, trusted: trustedTokens })
}
