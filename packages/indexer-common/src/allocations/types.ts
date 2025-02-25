/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Address, SubgraphDeploymentID, toAddress } from '@graphprotocol/common-ts'
import { BigNumber } from 'ethers'

export interface SubgraphDeployment {
  id: SubgraphDeploymentID
  stakedTokens: BigNumber
  signalAmount: BigNumber
}

export interface Allocation {
  id: Address
  subgraphDeployment: SubgraphDeployment
  indexer: Address
  allocatedTokens: BigNumber
  createdAtEpoch: number
  createdAtBlockHash: string
  closedAtEpoch: number
  closedAtEpochStartBlockHash: string | undefined
  previousEpochStartBlockHash: string | undefined
  closedAtBlockHash: string
  poi: string | undefined
  queryFeeRebates: BigNumber | undefined
}

export enum AllocationStatus {
  Null,
  Active,
  Closed,
  Finalized,
  Claimed,
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const parseGraphQLAllocation = (allocation: any): Allocation => ({
  // Ensure the allocation ID (an address) is checksummed
  id: toAddress(allocation.id),
  subgraphDeployment: {
    id: new SubgraphDeploymentID(allocation.subgraphDeployment.id),
    stakedTokens: BigNumber.from(allocation.subgraphDeployment.stakedTokens),
    signalAmount: BigNumber.from(allocation.subgraphDeployment.signalAmount),
  },
  indexer: toAddress(allocation.indexer.id),
  allocatedTokens: BigNumber.from(allocation.allocatedTokens),
  createdAtBlockHash: allocation.createdAtBlockHash,
  createdAtEpoch: allocation.createdAtEpoch,
  closedAtEpoch: allocation.closedAtEpoch,
  closedAtEpochStartBlockHash: undefined,
  previousEpochStartBlockHash: undefined,
  closedAtBlockHash: allocation.closedAtBlockHash,
  poi: allocation.poi,
  queryFeeRebates: allocation.queryFeeRebates,
})

export interface RewardsPool {
  subgraphDeployment: SubgraphDeploymentID
  allocationIndexer: Address
  allocationCreatedAtBlockHash: string
  closedAtEpoch: number
  closedAtEpochStartBlockHash: string | undefined
  closedAtEpochStartBlockNumber: number | undefined
  previousEpochStartBlockHash: string | undefined
  previousEpochStartBlockNumber: number | undefined
  referencePOI: string | undefined
  referencePreviousPOI: string | undefined
}

export const allocationRewardsPool = (allocation: Allocation): RewardsPool => ({
  subgraphDeployment: allocation.subgraphDeployment.id,
  allocationIndexer: allocation.indexer,
  allocationCreatedAtBlockHash: allocation.createdAtBlockHash,
  closedAtEpoch: allocation.closedAtEpoch,
  closedAtEpochStartBlockHash: allocation.closedAtEpochStartBlockHash,
  closedAtEpochStartBlockNumber: undefined,
  previousEpochStartBlockHash: allocation.previousEpochStartBlockHash,
  previousEpochStartBlockNumber: undefined,
  referencePOI: undefined,
  referencePreviousPOI: undefined,
})

export interface Epoch {
  id: number
  startBlock: number
  startBlockHash: string | undefined
  endBlock: number
  signalledTokens: number
  stakeDeposited: number
  queryFeeRebates: number
  totalRewards: number
  totalIndexerRewards: number
  totalDelegatorRewards: number
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const parseGraphQLEpochs = (epoch: any): Epoch => ({
  id: epoch.id,
  startBlock: epoch.startBlock,
  startBlockHash: undefined,
  endBlock: epoch.endBlock,
  signalledTokens: epoch.signalledTokens,
  stakeDeposited: epoch.stakeDeposited,
  queryFeeRebates: epoch.queryFeeRebates,
  totalRewards: epoch.totalRewards,
  totalIndexerRewards: epoch.totalIndexerRewards,
  totalDelegatorRewards: epoch.totalDelegatorRewards,
})
