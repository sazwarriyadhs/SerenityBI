
import { indonesianMarketSightConfig } from './indonesian-marketsight';
import { kraftHeinzConfig } from './kraft-heinz';
import type { ClientConfig } from './types';

export const clients: ClientConfig[] = [
  indonesianMarketSightConfig,
  kraftHeinzConfig
];

export const defaultClient = indonesianMarketSightConfig;
