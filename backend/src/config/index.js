/**
 * ForenCCTV Backend Configuration
 */
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || 'development',
  writeBlockStrictEnforcement: process.env.WRITE_BLOCK_STRICT !== 'false',
  blockchainNodeRpc: process.env.BLOCKCHAIN_RPC_URI || 'http://localhost:8545',
  storageMountRoot: process.env.STORAGE_MOUNT_ROOT || '/mnt/forensic_evidence'
};
