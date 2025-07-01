import { indonesianMarketSightConfig } from './indonesian-marketsight';
import { kraftHeinzConfig } from './kraft-heinz';
import { indofoodConfig } from './indofood';
import { japfaConfig } from './japfa';
import { mayoraConfig } from './mayora';
import { bisiConfig } from './bisi';
import { sangHyangSeriConfig } from './sang-hyang-seri';
import type { ClientConfig } from './types';

export const clients: ClientConfig[] = [
  indonesianMarketSightConfig,
  kraftHeinzConfig,
  indofoodConfig,
  japfaConfig,
  mayoraConfig,
  bisiConfig,
  sangHyangSeriConfig,
];

export const defaultClient = indonesianMarketSightConfig;
