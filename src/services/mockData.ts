import { Repository, CodeSnippet, BackendHealth, SymbolItem } from '../types';

export const INITIAL_REPOSITORIES: Repository[] = [
  {
    id: 'repo-1',
    name: 'wanderlust-travel',
    url: 'https://github.com/example-org/wanderlust-travel',
    branch: 'main',
    language: 'JavaScript',
    files: 42,
    indexed: 42,
    lastUpdated: 'Sep 22, 2026 14:30',
    status: 'indexed',
    stars: 28,
    description: 'Travel itinerary planning and destination discovery app with collaborative maps and booking integration.',
    astStats: {
      functionsCount: 164,
      classesCount: 18,
      importsCount: 312,
      totalAstNodes: 8420,
      vectorEmbeddingsCount: 290,
      indexType: 'HNSW',
    },
  },
  {
    id: 'repo-2',
    name: 'repointel-engine',
    url: 'https://github.com/repointel-org/repointel-engine',
    branch: 'main',
    language: 'Python',
    files: 128,
    indexed: 128,
    lastUpdated: 'Sep 20, 2026 10:15',
    status: 'indexed',
    stars: 142,
    description: 'AI-powered semantic code search engine utilizing AST parsing, Tree-sitter symbol extraction, and PostgreSQL pgvector.',
    astStats: {
      functionsCount: 486,
      classesCount: 64,
      importsCount: 890,
      totalAstNodes: 24900,
      vectorEmbeddingsCount: 1240,
      indexType: 'HNSW',
    },
  },
  {
    id: 'repo-3',
    name: 'vector-indexer-service',
    url: 'https://github.com/repointel-org/vector-indexer-service',
    branch: 'develop',
    language: 'TypeScript',
    files: 64,
    indexed: 64,
    lastUpdated: 'Sep 18, 2026 18:45',
    status: 'indexed',
    stars: 53,
    description: 'High-throughput code chunking pipeline and embedding generation service with rate limiting and batch retry.',
    astStats: {
      functionsCount: 210,
      classesCount: 32,
      importsCount: 420,
      totalAstNodes: 14200,
      vectorEmbeddingsCount: 580,
      indexType: 'HNSW',
    },
  },
  {
    id: 'repo-4',
    name: 'ast-symbol-extractor',
    url: 'https://github.com/repointel-org/ast-symbol-extractor',
    branch: 'main',
    language: 'Go',
    files: 35,
    indexed: 35,
    lastUpdated: 'Sep 15, 2026 09:20',
    status: 'indexed',
    stars: 89,
    description: 'High-speed Go tree-sitter bindings for multi-language AST extraction and semantic call-graph construction.',
    astStats: {
      functionsCount: 140,
      classesCount: 0,
      importsCount: 195,
      totalAstNodes: 9800,
      vectorEmbeddingsCount: 310,
      indexType: 'HNSW',
    },
  },
  {
    id: 'repo-5',
    name: 'pgvector-neural-store',
    url: 'https://github.com/example-org/pgvector-neural-store',
    branch: 'main',
    language: 'Python',
    files: 58,
    indexed: 58,
    lastUpdated: 'Sep 14, 2026 16:10',
    status: 'indexed',
    stars: 76,
    description: 'Specialized PostgreSQL pgvector storage engine optimized for high-dimensional code embedding retrieval.',
    astStats: {
      functionsCount: 192,
      classesCount: 24,
      importsCount: 380,
      totalAstNodes: 11200,
      vectorEmbeddingsCount: 480,
      indexType: 'HNSW',
    },
  },
  {
    id: 'repo-6',
    name: 'distributed-task-broker',
    url: 'https://github.com/example-org/distributed-task-broker',
    branch: 'main',
    language: 'Go',
    files: 72,
    indexed: 72,
    lastUpdated: 'Sep 12, 2026 11:30',
    status: 'indexed',
    stars: 64,
    description: 'Distributed event queue and indexing scheduler with backpressure handling and worker pooling.',
    astStats: {
      functionsCount: 240,
      classesCount: 14,
      importsCount: 310,
      totalAstNodes: 13500,
      vectorEmbeddingsCount: 620,
      indexType: 'HNSW',
    },
  },
  {
    id: 'repo-7',
    name: 'semantic-search-client',
    url: 'https://github.com/example-org/semantic-search-client',
    branch: 'main',
    language: 'TypeScript',
    files: 86,
    indexed: 86,
    lastUpdated: 'Sep 10, 2026 17:05',
    status: 'indexed',
    stars: 112,
    description: 'Frontend SDK and reactive state hooks for querying semantic code snippets with syntax highlighting.',
    astStats: {
      functionsCount: 310,
      classesCount: 42,
      importsCount: 540,
      totalAstNodes: 18400,
      vectorEmbeddingsCount: 780,
      indexType: 'HNSW',
    },
  },
  {
    id: 'repo-8',
    name: 'rust-syntax-highlighter',
    url: 'https://github.com/example-org/rust-syntax-highlighter',
    branch: 'main',
    language: 'Rust',
    files: 29,
    indexed: 29,
    lastUpdated: 'Sep 08, 2026 13:40',
    status: 'indexed',
    stars: 95,
    description: 'WASM-compiled syntax parser and tokenizer for real-time in-browser code snippet presentation.',
    astStats: {
      functionsCount: 98,
      classesCount: 8,
      importsCount: 160,
      totalAstNodes: 6700,
      vectorEmbeddingsCount: 220,
      indexType: 'HNSW',
    },
  },
  {
    id: 'repo-9',
    name: 'cloud-mesh-gateway',
    url: 'https://github.com/example-org/cloud-mesh-gateway',
    branch: 'main',
    language: 'Go',
    files: 48,
    indexed: 48,
    lastUpdated: 'Sep 06, 2026 08:15',
    status: 'indexed',
    stars: 48,
    description: 'Reverse proxy and authentication middleware router for microservices with distributed tracing.',
    astStats: {
      functionsCount: 165,
      classesCount: 12,
      importsCount: 240,
      totalAstNodes: 9900,
      vectorEmbeddingsCount: 410,
      indexType: 'HNSW',
    },
  },
  {
    id: 'repo-10',
    name: 'microservices-event-hub',
    url: 'https://github.com/example-org/microservices-event-hub',
    branch: 'main',
    language: 'Java',
    files: 95,
    indexed: 95,
    lastUpdated: 'Sep 04, 2026 15:20',
    status: 'indexed',
    stars: 82,
    description: 'Kafka-backed event streaming infrastructure for real-time repository commit and pull-request webhooks.',
    astStats: {
      functionsCount: 340,
      classesCount: 68,
      importsCount: 710,
      totalAstNodes: 21500,
      vectorEmbeddingsCount: 910,
      indexType: 'HNSW',
    },
  },
  {
    id: 'repo-11',
    name: 'query-embedding-cache',
    url: 'https://github.com/example-org/query-embedding-cache',
    branch: 'develop',
    language: 'Python',
    files: 33,
    indexed: 33,
    lastUpdated: 'Sep 02, 2026 19:50',
    status: 'indexed',
    stars: 37,
    description: 'Redis cache layer for vector query embeddings, reducing LLM and inference API latency by up to 80%.',
    astStats: {
      functionsCount: 110,
      classesCount: 16,
      importsCount: 190,
      totalAstNodes: 7300,
      vectorEmbeddingsCount: 300,
      indexType: 'HNSW',
    },
  },
  {
    id: 'repo-12',
    name: 'syntax-tree-debugger',
    url: 'https://github.com/example-org/syntax-tree-debugger',
    branch: 'main',
    language: 'TypeScript',
    files: 52,
    indexed: 52,
    lastUpdated: 'Aug 30, 2026 12:10',
    status: 'indexed',
    stars: 63,
    description: 'Interactive visualizer for Tree-sitter AST concrete syntax trees and token scope analysis.',
    astStats: {
      functionsCount: 185,
      classesCount: 22,
      importsCount: 340,
      totalAstNodes: 12100,
      vectorEmbeddingsCount: 490,
      indexType: 'HNSW',
    },
  },
];

export const INITIAL_SNIPPETS: CodeSnippet[] = [
  {
    id: 'snip-1',
    repositoryId: 'repo-2',
    repositoryName: 'repointel-engine',
    filePath: 'backend/app/services/vector_search.py',
    language: 'Python',
    startLine: 42,
    endLine: 68,
    symbolName: 'search_similar_code_chunks',
    symbolType: 'function',
    similarityScore: 0.94,
    explanation: 'Executes cosine distance semantic vector search in PostgreSQL using pgvector with HNSW index acceleration.',
    tags: ['pgvector', 'hnsw', 'cosine-similarity', 'embeddings'],
    code: `async def search_similar_code_chunks(
    db: AsyncSession,
    query_vector: list[float],
    repo_id: str,
    top_k: int = 5,
    min_similarity: float = 0.70
) -> list[CodeChunkResult]:
    """Execute HNSW index vector search using pgvector cosine distance operator <=>"""
    stmt = (
        select(
            CodeChunk,
            (1 - (CodeChunk.embedding.cosine_distance(query_vector))).label("similarity")
        )
        .where(CodeChunk.repo_id == repo_id)
        .order_by(CodeChunk.embedding.cosine_distance(query_vector))
        .limit(top_k)
    )
    
    results = await db.execute(stmt)
    return [
        CodeChunkResult(
            chunk=row[0],
            similarity=float(row[1])
        )
        for row in results.all()
        if row[1] >= min_similarity
    ]`,
  },
  {
    id: 'snip-2',
    repositoryId: 'repo-2',
    repositoryName: 'repointel-engine',
    filePath: 'backend/app/core/ast_parser.py',
    language: 'Python',
    startLine: 18,
    endLine: 45,
    symbolName: 'extract_code_symbols_ast',
    symbolType: 'class',
    similarityScore: 0.91,
    explanation: 'Tree-sitter and AST visitor extracting functions, classes, docstrings and hierarchical symbols with line numbers.',
    tags: ['ast', 'tree-sitter', 'symbol-extraction', 'parsing'],
    code: `class ASTSymbolExtractor:
    def __init__(self, language: str):
        self.parser = get_tree_sitter_parser(language)
        
    def extract_symbols(self, source_code: bytes) -> list[ExtractedSymbol]:
        tree = self.parser.parse(source_code)
        symbols: list[ExtractedSymbol] = []
        
        cursor = tree.walk()
        for node in traverse_tree(cursor):
            if node.type in ("function_definition", "class_definition", "method_declaration"):
                identifier = self._get_node_identifier(node, source_code)
                symbols.append(
                    ExtractedSymbol(
                        name=identifier,
                        node_type=node.type,
                        start_point=node.start_point,
                        end_point=node.end_point,
                        docstring=self._extract_docstring(node, source_code)
                    )
                )
        return symbols`,
  },
  {
    id: 'snip-3',
    repositoryId: 'repo-1',
    repositoryName: 'wanderlust-travel',
    filePath: 'src/middleware/authMiddleware.js',
    language: 'JavaScript',
    startLine: 12,
    endLine: 36,
    symbolName: 'authenticateJWT',
    symbolType: 'middleware',
    similarityScore: 0.88,
    explanation: 'Express middleware verifying incoming Bearer JWT tokens, decoding claims and attaching authenticated user context.',
    tags: ['jwt', 'authentication', 'express', 'security'],
    code: `export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access token missing or invalid format' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.sub,
      email: decoded.email,
      roles: decoded.roles || ['member']
    };
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token', details: err.message });
  }
};`,
  },
  {
    id: 'snip-4',
    repositoryId: 'repo-1',
    repositoryName: 'wanderlust-travel',
    filePath: 'src/controllers/itineraryController.js',

    language: 'JavaScript',
    startLine: 54,
    endLine: 82,
    symbolName: 'generateOptimizedRoute',
    symbolType: 'function',
    similarityScore: 0.85,
    explanation: 'Calculates geo-optimized travel waypoint route based on duration, opening hours and transit constraints.',
    tags: ['itinerary', 'optimization', 'geolocation', 'routing'],
    code: `export async function generateOptimizedRoute(req, res) {
  const { tripId, dayIndex, waypoints, transportMode } = req.body;
  
  if (!waypoints || waypoints.length < 2) {
    return res.status(400).json({ error: 'At least 2 waypoints required for optimization' });
  }

  const distanceMatrix = await calculateDistanceMatrix(waypoints, transportMode);
  const optimizedOrder = solveTravelingSalesperson(distanceMatrix);
  
  const optimizedWaypoints = optimizedOrder.map(idx => waypoints[idx]);
  await updateTripSchedule(tripId, dayIndex, optimizedWaypoints);

  return res.json({
    success: true,
    tripId,
    totalDistanceKm: distanceMatrix.totalDistance,
    estimatedMinutes: distanceMatrix.totalDurationMinutes,
    schedule: optimizedWaypoints
  });
}`,
  },
  {
    id: 'snip-5',
    repositoryId: 'repo-3',
    repositoryName: 'vector-indexer-service',
    filePath: 'src/pipeline/chunker.ts',
    language: 'TypeScript',
    startLine: 24,
    endLine: 52,
    symbolName: 'semanticCodeChunker',
    symbolType: 'function',
    similarityScore: 0.89,
    explanation: 'Splits source code into logical chunks respecting AST boundary nodes rather than arbitrary line counts.',
    tags: ['ast-chunking', 'tokenization', 'boundaries', 'embeddings'],
    code: `export function semanticCodeChunker(
  source: string,
  astTree: AstNode,
  maxTokens: number = 512
): CodeChunkPayload[] {
  const chunks: CodeChunkPayload[] = [];
  let currentChunkNodes: AstNode[] = [];
  let currentTokenCount = 0;

  for (const childNode of astTree.children) {
    const nodeTokens = countTokens(childNode.rawText);
    
    if (currentTokenCount + nodeTokens > maxTokens && currentChunkNodes.length > 0) {
      chunks.push(finalizeChunk(currentChunkNodes));
      currentChunkNodes = [];
      currentTokenCount = 0;
    }
    
    currentChunkNodes.push(childNode);
    currentTokenCount += nodeTokens;
  }

  if (currentChunkNodes.length > 0) {
    chunks.push(finalizeChunk(currentChunkNodes));
  }

  return chunks;
}`,
  }
];

export const INITIAL_SYMBOLS: SymbolItem[] = [
  { id: 'sym-1', name: 'search_similar_code_chunks', type: 'function', filePath: 'backend/app/services/vector_search.py', repositoryName: 'RepoIntel-AI', line: 42, signature: 'async def search_similar_code_chunks(db: AsyncSession, query_vector: list[float], repo_id: str)' },
  { id: 'sym-2', name: 'ASTSymbolExtractor', type: 'class', filePath: 'backend/app/core/ast_parser.py', repositoryName: 'RepoIntel-AI', line: 18, signature: 'class ASTSymbolExtractor(language: str)' },
  { id: 'sym-3', name: 'authenticateJWT', type: 'function', filePath: 'src/middleware/authMiddleware.js', repositoryName: 'wander-lust', line: 12, signature: 'export const authenticateJWT = (req, res, next)' },
  { id: 'sym-4', name: 'generateOptimizedRoute', type: 'function', filePath: 'src/controllers/itineraryController.js', repositoryName: 'wander-lust', line: 54, signature: 'export async function generateOptimizedRoute(req, res)' },
  { id: 'sym-5', name: 'semanticCodeChunker', type: 'function', filePath: 'src/pipeline/chunker.ts', repositoryName: 'vector-indexer-service', line: 24, signature: 'export function semanticCodeChunker(source: string, astTree: AstNode, maxTokens: number = 512)' },
  { id: 'sym-6', name: 'HnswIndexBuilder', type: 'class', filePath: 'backend/app/db/hnsw_indexer.py', repositoryName: 'RepoIntel-AI', line: 15, signature: 'class HnswIndexBuilder(vector_dim: int = 768, m: int = 16, ef_construction: int = 64)' },
];

export const BACKEND_HEALTH_DATA: BackendHealth = {
  status: 'ok',
  version: '1.0.0',
  uptime: '4d 18h 32m',
  database: {
    postgres: 'connected',
    pgvector: 'active',
    hnswIndexes: 4,
  },
  indexer: {
    queueSize: 0,
    activeWorkers: 2,
  },
};
