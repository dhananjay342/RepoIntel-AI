export interface Repository {
  id: string;
  name: string;
  url: string;
  branch: string;
  language: 'JavaScript' | 'Python' | 'TypeScript' | 'Go' | 'Rust' | 'Java';
  files: number;
  indexed: number;
  lastUpdated: string;
  status: 'indexed' | 'indexing' | 'pending' | 'error';
  stars?: number;
  description: string;
  astStats?: {
    functionsCount: number;
    classesCount: number;
    importsCount: number;
    totalAstNodes: number;
    vectorEmbeddingsCount: number;
    indexType: 'HNSW' | 'IVFFlat';
  };
}

export interface CodeSnippet {
  id: string;
  repositoryId: string;
  repositoryName: string;
  filePath: string;
  language: string;
  code: string;
  startLine: number;
  endLine: number;
  symbolName: string;
  symbolType: 'function' | 'class' | 'method' | 'middleware' | 'interface' | 'route_handler';
  similarityScore: number;
  explanation: string;
  tags: string[];
}

export interface SearchQueryRequest {
  query: string;
  repositoryId?: string;
  language?: string;
  minSimilarity?: number;
  limit?: number;
}

export interface SearchQueryResponse {
  query: string;
  totalResults: number;
  latencyMs: number;
  results: CodeSnippet[];
  usedEmbeddingModel: string;
  vectorIndex: string;
}

export interface BackendHealth {
  status: 'ok' | 'degraded' | 'error';
  version: string;
  uptime: string;
  database: {
    postgres: 'connected' | 'disconnected';
    pgvector: 'active' | 'inactive';
    hnswIndexes: number;
  };
  indexer: {
    queueSize: number;
    activeWorkers: number;
  };
}

export interface SymbolItem {
  id: string;
  name: string;
  type: 'function' | 'class' | 'interface' | 'variable' | 'type_alias';
  filePath: string;
  repositoryName: string;
  line: number;
  signature: string;
}
