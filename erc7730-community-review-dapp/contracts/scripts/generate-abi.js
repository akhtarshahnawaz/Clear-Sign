#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Paths
const BUILD_DIR = path.join(__dirname, '../out');
const FRONTEND_ABI_DIR = path.join(__dirname, '../../frontend/src/lib');
const CONTRACT_NAME = 'ERC7730CommunityReview';

function generateTypeScriptTypes(abi) {
  const functions = abi.filter(item => item.type === 'function');
  const events = abi.filter(item => item.type === 'event');
  
  let types = `// Auto-generated TypeScript types for ${CONTRACT_NAME}
// Generated on: ${new Date().toISOString()}

export interface ContractFunction {
  name: string;
  inputs: Array<{
    name: string;
    type: string;
    internalType: string;
    indexed?: boolean;
  }>;
  outputs: Array<{
    name: string;
    type: string;
    internalType: string;
  }>;
  stateMutability: string;
  type: string;
}

export interface ContractEvent {
  name: string;
  inputs: Array<{
    name: string;
    type: string;
    internalType: string;
    indexed: boolean;
  }>;
  type: string;
  anonymous: boolean;
}

// Contract function types
export type ContractFunctions = {
`;

  functions.forEach(func => {
    const inputTypes = func.inputs.map(input => `${input.name}: ${input.type}`).join(', ');
    const outputTypes = func.outputs.length > 0 ? func.outputs.map(output => output.type).join(' | ') : 'void';
    
    types += `  ${func.name}: (${inputTypes}) => Promise<${outputTypes}>;\n`;
  });

  types += `};

// Contract event types
export type ContractEvents = {
`;

  events.forEach(event => {
    types += `  ${event.name}: (${event.inputs.map(input => `${input.name}: ${input.type}`).join(', ')}) => void;\n`;
  });

  types += `};

// Main contract interface
export interface ${CONTRACT_NAME}Contract {
  functions: ContractFunctions;
  events: ContractEvents;
  address: string;
  abi: typeof ${CONTRACT_NAME.toUpperCase()}_ABI;
}
`;

  return types;
}

function generateABI() {
  try {
    console.log(`🔧 Generating ABI for ${CONTRACT_NAME}...`);
    
    // Read the Foundry build artifact
    const artifactPath = path.join(BUILD_DIR, `${CONTRACT_NAME}.sol`, `${CONTRACT_NAME}.json`);
    
    if (!fs.existsSync(artifactPath)) {
      console.error(`❌ Build artifact not found at: ${artifactPath}`);
      console.log('💡 Run "forge build" first to generate the artifact');
      return false;
    }

    const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
    const { abi, bytecode, metadata } = artifact;

    if (!abi) {
      console.error('❌ No ABI found in build artifact');
      return false;
    }

    // Generate TypeScript ABI file
    const tsContent = `// Auto-generated ABI from Foundry build artifacts
// Generated on: ${new Date().toISOString()}
// Contract: ${CONTRACT_NAME}
// Bytecode Hash: ${metadata?.compiler?.version || 'unknown'}

export const ${CONTRACT_NAME.toUpperCase()}_ABI = ${JSON.stringify(abi, null, 2)} as const;

// Export the contract name for convenience
export const CONTRACT_NAME = '${CONTRACT_NAME}' as const;

// Contract bytecode (for deployment)
export const CONTRACT_BYTECODE = '${bytecode?.object || ''}' as const;

// Contract metadata
export const CONTRACT_METADATA = ${JSON.stringify(metadata, null, 2)} as const;
`;

    // Generate types file
    const typesContent = generateTypeScriptTypes(abi);

    // Write ABI to frontend
    const abiOutputPath = path.join(FRONTEND_ABI_DIR, 'contract-abi.ts');
    fs.writeFileSync(abiOutputPath, tsContent);

    // Write types to frontend
    const typesOutputPath = path.join(FRONTEND_ABI_DIR, 'contract-types.ts');
    fs.writeFileSync(typesOutputPath, typesContent);

    console.log(`✅ ABI generated successfully!`);
    console.log(`📁 ABI Output: ${abiOutputPath}`);
    console.log(`📁 Types Output: ${typesOutputPath}`);
    console.log(`🔧 Functions: ${abi.filter(item => item.type === 'function').length}`);
    console.log(`📡 Events: ${abi.filter(item => item.type === 'event').length}`);
    console.log(`📦 Bytecode: ${bytecode?.object ? 'Available' : 'Not available'}`);
    
    return true;
  } catch (error) {
    console.error('❌ Error generating ABI:', error.message);
    console.error(error.stack);
    return false;
  }
}

// Run if called directly
if (require.main === module) {
  generateABI();
}

module.exports = { generateABI };
