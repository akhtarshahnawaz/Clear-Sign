const fs = require('fs');
const path = require('path');

// Paths
const contractsDir = path.join(__dirname, '../../contracts');
const abiJsonPath = path.join(__dirname, '../src/lib/contract-abi.json');
const abiTsPath = path.join(__dirname, '../src/lib/contract-abi.ts');

// Read the ABI JSON file
try {
  const abi = JSON.parse(fs.readFileSync(abiJsonPath, 'utf8'));
  
  // Generate TypeScript content
  const tsContent = `// Auto-generated ABI from Foundry build artifacts
// Generated on: ${new Date().toISOString()}
// Contract: ERC7730CommunityReview

export const ERC7730COMMUNITYREVIEW_ABI = ${JSON.stringify(abi, null, 2)} as const;
`;

  // Write TypeScript file
  fs.writeFileSync(abiTsPath, tsContent);
  console.log('✅ ABI generated successfully');
  console.log(`📁 ABI TypeScript file: ${abiTsPath}`);
} catch (error) {
  console.error('❌ Error generating ABI:', error.message);
  process.exit(1);
}
