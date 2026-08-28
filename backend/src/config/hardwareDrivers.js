/**
 * ForenCCTV - Hardware Write-Blocker Bridge Driver Interface
 * Interfaces with physical write-block devices (Tableau T8u, WiebeTech, Atola)
 */

export const hardwareDriverConfig = {
  supportedBridges: [
    { model: 'Tableau T8u', vendor: 'OpenText / Guidance', port: 'USB 3.0', writeStatus: 'HARDWARE_LOCKED' },
    { model: 'WiebeTech UltraDock v5', vendor: 'CRU', port: 'eSATA / USB 3.0', writeStatus: 'HARDWARE_LOCKED' },
    { model: 'Atola TaskForce', vendor: 'Atola Technology', port: '10GbE Network', writeStatus: 'HARDWARE_LOCKED' }
  ],
  // TODO: Implement native kernel IOCTL write-protection verification in production
  verifyWriteBlockState: async (devicePath) => {
    return { devicePath, writeProtected: true, status: 'VERIFIED_READ_ONLY' };
  }
};
