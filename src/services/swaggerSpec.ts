export const SWAGGER_OPENAPI_SPEC = {
  openapi: "3.0.3",
  info: {
    title: "RepoIntel-AI Backend API",
    version: "1.0.0",
    description: `API specification for **RepoIntel-AI** — Code Intelligence, AST Parsing, Symbol Extraction, and Semantic Code Search engine powered by PostgreSQL and pgvector with HNSW indexing.
    
### Core Capabilities:
* **Git Repository Ingestion**: Connect remote repositories and trigger AST tokenization and chunking.
* **AST Parsing & Symbol Extraction**: Parse syntax trees into functions, classes, interfaces, and methods.
* **Semantic Code Search**: Natural language querying with cosine distance vector similarity via pgvector.
* **Health & Telemetry**: Monitor PostgreSQL connection, pgvector status, and indexer worker queues.`,
    contact: {
      name: "RepoIntel-AI Engineering",
      url: "https://github.com/AyushhVatsal/RepoIntel-AI",
    },
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  servers: [
    {
      url: "/api",
      description: "Local development server",
    },
    {
      url: "https://api.repointel.ai/v1",
      description: "Production cluster",
    },
  ],
  tags: [
    {
      name: "Repositories",
      description: "Manage connected Git repositories, branches, and indexing triggers.",
    },
    {
      name: "Semantic Search",
      description: "Search codebases using natural language queries and vector similarity.",
    },
    {
      name: "AST & Symbols",
      description: "Direct symbol queries (functions, classes, methods) extracted from syntax trees.",
    },
    {
      name: "System Health",
      description: "Database connectivity, pgvector extension, and worker queue status.",
    },
  ],
  paths: {
    "/repositories": {
      get: {
        tags: ["Repositories"],
        summary: "List all indexed repositories",
        description: "Returns an array of all connected repositories with file counts, indexing status, and AST metrics.",
        responses: {
          "200": {
            description: "List of repositories retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Repository" },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Repositories"],
        summary: "Connect and index a new repository",
        description: "Clones or registers a remote Git repository, triggers AST extraction and schedules vector embedding generation.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AddRepositoryRequest" },
            },
          },
        },
        responses: {
          "201": {
            description: "Repository registered and indexing queued",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Repository" },
              },
            },
          },
          "400": {
            description: "Invalid Git URL or branch configuration",
          },
        },
      },
    },
    "/repositories/{id}": {
      get: {
        tags: ["Repositories"],
        summary: "Get repository details",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Unique repository identifier",
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Repository details including AST parsing stats",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Repository" },
              },
            },
          },
          "404": {
            description: "Repository not found",
          },
        },
      },
      delete: {
        tags: ["Repositories"],
        summary: "Remove repository and purge vector embeddings",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Repository and all associated vector embeddings purged",
          },
        },
      },
    },
    "/repositories/{id}/index": {
      post: {
        tags: ["Repositories"],
        summary: "Trigger manual re-indexing",
        description: "Forces a fresh git pull, AST re-parse, and pgvector HNSW index rebuild.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "202": {
            description: "Indexing job queued successfully",
          },
        },
      },
    },
    "/search/semantic": {
      post: {
        tags: ["Semantic Search"],
        summary: "Perform semantic code search",
        description: "Converts natural language query into vector embeddings and executes cosine distance search against PostgreSQL pgvector tables.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SemanticSearchRequest" },
            },
          },
        },
        responses: {
          "200": {
            description: "Relevant code snippets with line numbers, AST metadata, and similarity scores",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/SemanticSearchResponse" },
              },
            },
          },
        },
      },
    },
    "/search/symbols": {
      get: {
        tags: ["AST & Symbols"],
        summary: "Search symbols by identifier name or type",
        parameters: [
          {
            name: "q",
            in: "query",
            required: true,
            description: "Function name, class name, or method identifier",
            schema: { type: "string" },
          },
          {
            name: "type",
            in: "query",
            required: false,
            description: "Filter by symbol type (function, class, interface)",
            schema: { type: "string", enum: ["function", "class", "interface", "all"] },
          },
        ],
        responses: {
          "200": {
            description: "Extracted symbols matching query",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/CodeSymbol" },
                },
              },
            },
          },
        },
      },
    },
    "/health": {
      get: {
        tags: ["System Health"],
        summary: "Service and database health check",
        description: "Checks connectivity to PostgreSQL, verify pgvector extension availability, and inspects worker queue.",
        responses: {
          "200": {
            description: "System healthy",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/HealthStatus" },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Repository: {
        type: "object",
        properties: {
          id: { type: "string", example: "repo-1" },
          name: { type: "string", example: "RepoIntel-AI" },
          url: { type: "string", example: "https://github.com/AyushhVatsal/RepoIntel-AI" },
          branch: { type: "string", example: "main" },
          language: { type: "string", example: "Python" },
          files: { type: "integer", example: 128 },
          indexed: { type: "integer", example: 128 },
          lastUpdated: { type: "string", example: "Sep 20, 2026 10:15" },
          status: { type: "string", enum: ["indexed", "indexing", "pending", "error"], example: "indexed" },
          description: { type: "string", example: "AI-powered semantic code search engine." },
          astStats: {
            type: "object",
            properties: {
              functionsCount: { type: "integer", example: 486 },
              classesCount: { type: "integer", example: 64 },
              importsCount: { type: "integer", example: 890 },
              totalAstNodes: { type: "integer", example: 24900 },
              vectorEmbeddingsCount: { type: "integer", example: 1240 },
              indexType: { type: "string", example: "HNSW" },
            },
          },
        },
      },
      AddRepositoryRequest: {
        type: "object",
        required: ["name", "url"],
        properties: {
          name: { type: "string", example: "my-microservice" },
          url: { type: "string", example: "https://github.com/org/my-microservice" },
          branch: { type: "string", default: "main", example: "main" },
          language: { type: "string", example: "TypeScript" },
          accessToken: { type: "string", description: "Optional GitHub PAT for private repositories" },
        },
      },
      SemanticSearchRequest: {
        type: "object",
        required: ["query"],
        properties: {
          query: { type: "string", example: "Find JWT token verification and authentication middleware" },
          repositoryId: { type: "string", description: "Optional repository filter" },
          language: { type: "string", description: "Filter by programming language" },
          minSimilarity: { type: "number", default: 0.75, example: 0.8 },
          limit: { type: "integer", default: 5, example: 5 },
        },
      },
      SemanticSearchResponse: {
        type: "object",
        properties: {
          query: { type: "string", example: "Find JWT token verification" },
          totalResults: { type: "integer", example: 2 },
          latencyMs: { type: "number", example: 14.8 },
          usedEmbeddingModel: { type: "string", example: "text-embedding-004" },
          vectorIndex: { type: "string", example: "pgvector-hnsw" },
          results: {
            type: "array",
            items: { $ref: "#/components/schemas/CodeSnippet" },
          },
        },
      },
      CodeSnippet: {
        type: "object",
        properties: {
          id: { type: "string", example: "snip-1" },
          repositoryName: { type: "string", example: "wander-lust" },
          filePath: { type: "string", example: "src/middleware/authMiddleware.js" },
          language: { type: "string", example: "JavaScript" },
          code: { type: "string", example: "export const authenticateJWT = (req, res, next) => { ... }" },
          startLine: { type: "integer", example: 12 },
          endLine: { type: "integer", example: 36 },
          symbolName: { type: "string", example: "authenticateJWT" },
          symbolType: { type: "string", example: "middleware" },
          similarityScore: { type: "number", example: 0.88 },
          explanation: { type: "string", example: "Express middleware verifying incoming Bearer JWT tokens." },
        },
      },
      CodeSymbol: {
        type: "object",
        properties: {
          id: { type: "string", example: "sym-1" },
          name: { type: "string", example: "search_similar_code_chunks" },
          type: { type: "string", example: "function" },
          filePath: { type: "string", example: "backend/app/services/vector_search.py" },
          repositoryName: { type: "string", example: "RepoIntel-AI" },
          line: { type: "integer", example: 42 },
          signature: { type: "string", example: "async def search_similar_code_chunks(db: AsyncSession, query_vector: list[float])" },
        },
      },
      HealthStatus: {
        type: "object",
        properties: {
          status: { type: "string", example: "ok" },
          version: { type: "string", example: "1.0.0" },
          uptime: { type: "string", example: "4d 18h 32m" },
          database: {
            type: "object",
            properties: {
              postgres: { type: "string", example: "connected" },
              pgvector: { type: "string", example: "active" },
              hnswIndexes: { type: "integer", example: 4 },
            },
          },
        },
      },
    },
  },
};
