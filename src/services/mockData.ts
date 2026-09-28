import { Repository, CodeSnippet, BackendHealth, SymbolItem } from '../types';

export const INITIAL_REPOSITORIES: Repository[] = [
  {
    id: 'repo-1',
    name: 'wander-lust',
    url: 'https://github.com/shahdhananjay342/wander-lust',
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
    name: 'RepoIntel-AI',
    url: 'https://github.com/AyushhVatsal/RepoIntel-AI',
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
    url: 'https://github.com/AyushhVatsal/vector-indexer-service',
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
    url: 'https://github.com/AyushhVatsal/ast-symbol-extractor',
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
];

export const INITIAL_SNIPPETS: CodeSnippet[] = [
  {
    id: 'snip-1',
    repositoryId: 'repo-2',
    repositoryName: 'RepoIntel-AI',
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
    repositoryName: 'RepoIntel-AI',
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
    repositoryName: 'wander-lust',
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
    repositoryName: 'wander-lust',
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
