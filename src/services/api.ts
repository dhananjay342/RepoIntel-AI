import { Repository, SearchQueryRequest, SearchQueryResponse, BackendHealth, CodeSnippet, SymbolItem } from '../types';
import { INITIAL_REPOSITORIES, INITIAL_SNIPPETS, INITIAL_SYMBOLS, BACKEND_HEALTH_DATA } from './mockData';
import { SWAGGER_OPENAPI_SPEC } from './swaggerSpec';

const STORAGE_KEY_REPOS = 'repointel_repositories_v1';

class RepoIntelApiService {
  private repositories: Repository[] = [];
  private snippets: CodeSnippet[] = [...INITIAL_SNIPPETS];
  private symbols: SymbolItem[] = [...INITIAL_SYMBOLS];

  constructor() {
    this.initStorage();
  }

  private initStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_REPOS);
      if (stored) {
        this.repositories = JSON.parse(stored);
      } else {
        this.repositories = [...INITIAL_REPOSITORIES];
        this.saveStorage();
      }
    } catch {
      this.repositories = [...INITIAL_REPOSITORIES];
    }
  }

  private saveStorage() {
    try {
      localStorage.setItem(STORAGE_KEY_REPOS, JSON.stringify(this.repositories));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }

  // --- API Endpoints ---

  async getHealth(): Promise<BackendHealth> {
    try {
      const res = await fetch('/api/health');
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return BACKEND_HEALTH_DATA;
  }

  async getOpenApiSpec() {
    return SWAGGER_OPENAPI_SPEC;
  }

  async getRepositories(): Promise<Repository[]> {
    try {
      const res = await fetch('/api/repositories');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // Fallback
    }
    return [...this.repositories];
  }

  async getRepositoryById(id: string): Promise<Repository | null> {
    const repos = await this.getRepositories();
    return repos.find(r => r.id === id) || null;
  }

  async addRepository(params: {
    name: string;
    url: string;
    branch?: string;
    language?: 'JavaScript' | 'Python' | 'TypeScript' | 'Go' | 'Rust' | 'Java';
    description?: string;
  }): Promise<Repository> {
    // Generate simulated AST statistics
    const files = Math.floor(Math.random() * 80) + 20;
    const lang = params.language || this.detectLanguage(params.name, params.url);

    const newRepo: Repository = {
      id: `repo-${Date.now()}`,
      name: params.name.trim(),
      url: params.url.trim(),
      branch: params.branch || 'main',
      language: lang,
      files: files,
      indexed: files,
      lastUpdated: 'Just now',
      status: 'indexed',
      stars: Math.floor(Math.random() * 50) + 5,
      description: params.description || `Git repository indexed with AST parsing and pgvector embeddings.`,
      astStats: {
        functionsCount: Math.floor(files * 3.4),
        classesCount: Math.floor(files * 0.4),
        importsCount: Math.floor(files * 5.2),
        totalAstNodes: files * 180,
        vectorEmbeddingsCount: Math.floor(files * 6.5),
        indexType: 'HNSW',
      },
    };

    try {
      const res = await fetch('/api/repositories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (res.ok) {
        const created = await res.json();
        this.repositories.unshift(created);
        this.saveStorage();
        return created;
      }
    } catch {
      // fallback
    }

    this.repositories.unshift(newRepo);
    this.saveStorage();
    return newRepo;
  }

  async deleteRepository(id: string): Promise<boolean> {
    try {
      await fetch(`/api/repositories/${id}`, { method: 'DELETE' });
    } catch {
      // fallback
    }
    this.repositories = this.repositories.filter(r => r.id !== id);
    this.saveStorage();
    return true;
  }

  async triggerIndexing(id: string): Promise<Repository | null> {
    const repoIndex = this.repositories.findIndex(r => r.id === id);
    if (repoIndex === -1) return null;

    this.repositories[repoIndex].status = 'indexing';
    this.saveStorage();

    // Simulate async indexing completion
    await new Promise(res => setTimeout(res, 1200));

    this.repositories[repoIndex].status = 'indexed';
    this.repositories[repoIndex].lastUpdated = 'Just now';
    this.saveStorage();
    return this.repositories[repoIndex];
  }

  async searchSemantic(req: SearchQueryRequest): Promise<SearchQueryResponse> {
    const start = performance.now();
    const query = req.query.toLowerCase().trim();

    try {
      const res = await fetch('/api/search/semantic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // fallback
    }

    // Semantic vector simulation ranking:
    const keywords = query.split(/\s+/).filter(w => w.length > 2);
    
    const scored = this.snippets.map(snip => {
      let score = 0.55;
      const haystack = `${snip.symbolName} ${snip.explanation} ${snip.tags.join(' ')} ${snip.code} ${snip.filePath}`.toLowerCase();
      
      keywords.forEach(kw => {
        if (haystack.includes(kw)) score += 0.12;
      });

      if (req.repositoryId && snip.repositoryId !== req.repositoryId) {
        score -= 0.5;
      }
      if (req.language && snip.language.toLowerCase() !== req.language.toLowerCase()) {
        score -= 0.3;
      }

      // Cap at 0.98
      score = Math.min(0.98, Math.max(0.40, score));

      return {
        ...snip,
        similarityScore: parseFloat(score.toFixed(2)),
      };
    });

    const filtered = scored
      .filter(s => s.similarityScore >= (req.minSimilarity || 0.60))
      .sort((a, b) => b.similarityScore - a.similarityScore)
      .slice(0, req.limit || 10);

    const end = performance.now();

    return {
      query: req.query,
      totalResults: filtered.length,
      latencyMs: parseFloat((end - start + 8.4).toFixed(1)),
      results: filtered,
      usedEmbeddingModel: 'text-embedding-004 (768-dim)',
      vectorIndex: 'PostgreSQL pgvector HNSW (m=16, ef_construction=64)',
    };
  }

  async getSymbols(query?: string): Promise<SymbolItem[]> {
    if (!query) return this.symbols;
    const q = query.toLowerCase();
    return this.symbols.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.signature.toLowerCase().includes(q) ||
      s.filePath.toLowerCase().includes(q)
    );
  }

  private detectLanguage(name: string, url: string): Repository['language'] {
    const combined = `${name} ${url}`.toLowerCase();
    if (combined.includes('python') || combined.includes('py')) return 'Python';
    if (combined.includes('ts') || combined.includes('type')) return 'TypeScript';
    if (combined.includes('go') || combined.includes('golang')) return 'Go';
    if (combined.includes('rust') || combined.includes('rs')) return 'Rust';
    return 'JavaScript';
  }

  resetDemoData() {
    this.repositories = [...INITIAL_REPOSITORIES];
    this.saveStorage();
  }
}

export const apiService = new RepoIntelApiService();
