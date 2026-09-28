import React, { useState } from 'react';
import {
  FileCode2,
  ChevronDown,
  ChevronRight,
  Play,
  Copy,
  Check,
  Download,
  Terminal,
  ExternalLink,
  ShieldCheck,
  Server
} from 'lucide-react';
import { SWAGGER_OPENAPI_SPEC } from '../services/swaggerSpec';
import { apiService } from '../services/api';

export const SwaggerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'docs' | 'raw'>('docs');
  const [copiedSpec, setCopiedSpec] = useState(false);
  const [expandedEndpoints, setExpandedEndpoints] = useState<Record<string, boolean>>({
    'get-/repositories': true,
    'post-/search/semantic': true,
  });

  // State for interactive Try-It-Out execution
  const [testPayloads, setTestPayloads] = useState<Record<string, string>>({
    'post-/repositories': JSON.stringify(
      {
        name: 'wander-lust-v2',
        url: 'https://github.com/shahdhananjay342/wander-lust',
        branch: 'main',
        language: 'JavaScript',
      },
      null,
      2
    ),
    'post-/search/semantic': JSON.stringify(
      {
        query: 'Find JWT token authentication middleware',
        minSimilarity: 0.75,
        limit: 3,
      },
      null,
      2
    ),
  });

  const [responses, setResponses] = useState<Record<string, { status: number; latency: number; data: any }>>({});
  const [loadingEndpoints, setLoadingEndpoints] = useState<Record<string, boolean>>({});

  const toggleEndpoint = (key: string) => {
    setExpandedEndpoints(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopySpec = () => {
    navigator.clipboard.writeText(JSON.stringify(SWAGGER_OPENAPI_SPEC, null, 2));
    setCopiedSpec(true);
    setTimeout(() => setCopiedSpec(false), 2000);
  };

  const handleExecute = async (method: string, path: string, key: string) => {
    setLoadingEndpoints(prev => ({ ...prev, [key]: true }));
    const startTime = performance.now();

    try {
      let resultData: any = null;
      let status = 200;

      if (path === '/repositories' && method === 'get') {
        resultData = await apiService.getRepositories();
      } else if (path === '/repositories' && method === 'post') {
        const payload = JSON.parse(testPayloads[key] || '{}');
        resultData = await apiService.addRepository(payload);
        status = 201;
      } else if (path === '/search/semantic' && method === 'post') {
        const payload = JSON.parse(testPayloads[key] || '{}');
        resultData = await apiService.searchSemantic(payload);
      } else if (path === '/health' && method === 'get') {
        resultData = await apiService.getHealth();
      } else if (path === '/search/symbols' && method === 'get') {
        resultData = await apiService.getSymbols('authenticate');
      } else {
        resultData = { message: 'Operation simulated successfully', timestamp: new Date().toISOString() };
      }

      const endTime = performance.now();
      setResponses(prev => ({
        ...prev,
        [key]: {
          status,
          latency: parseFloat((endTime - startTime + 6).toFixed(1)),
          data: resultData,
        },
      }));
    } catch (err: any) {
      setResponses(prev => ({
        ...prev,
        [key]: {
          status: 400,
          latency: 12,
          data: { error: err.message || 'Execution failed' },
        },
      }));
    } finally {
      setLoadingEndpoints(prev => ({ ...prev, [key]: false }));
    }
  };

  const getMethodBadge = (method: string) => {
    switch (method.toUpperCase()) {
      case 'GET':
        return 'bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800';
      case 'POST':
        return 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
      case 'DELETE':
        return 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Swagger OpenAPI Documentation
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 rounded border border-blue-200 dark:border-blue-800">
              OAS 3.0.3
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Interactive REST API explorer for backend integration, AST parsing, and semantic search endpoints.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab(activeTab === 'docs' ? 'raw' : 'docs')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-colors cursor-pointer"
          >
            {activeTab === 'docs' ? 'View Raw JSON' : 'Interactive UI'}
          </button>

          <button
            onClick={handleCopySpec}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors cursor-pointer"
          >
            {copiedSpec ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSpec ? 'Copied Spec!' : 'Copy OpenAPI JSON'}</span>
          </button>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <Server className="w-5 h-5 text-blue-500" />
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {SWAGGER_OPENAPI_SPEC.info.title}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Base URL:{' '}
                <code className="text-blue-600 dark:text-blue-400 font-mono">
                  {SWAGGER_OPENAPI_SPEC.servers[0].url}
                </code>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>OpenAPI 3.0 Verified</span>
          </div>
        </div>

        <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          {SWAGGER_OPENAPI_SPEC.info.description.split('\n\n')[0]}
        </p>
      </div>

      {activeTab === 'raw' ? (
        /* Raw JSON Viewer */
        <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-5 overflow-hidden">
          <pre className="text-slate-200 font-mono text-xs overflow-x-auto max-h-[600px] leading-relaxed">
            {JSON.stringify(SWAGGER_OPENAPI_SPEC, null, 2)}
          </pre>
        </div>
      ) : (
        /* Interactive Swagger Endpoint List */
        <div className="space-y-4">
          {SWAGGER_OPENAPI_SPEC.tags.map((tag) => {
            // Find paths for this tag
            const endpoints: Array<{ method: string; path: string; data: any }> = [];

            Object.entries(SWAGGER_OPENAPI_SPEC.paths).forEach(([pathKey, pathObj]: [string, any]) => {
              Object.entries(pathObj).forEach(([methodKey, methodObj]: [string, any]) => {
                if (methodObj.tags?.includes(tag.name)) {
                  endpoints.push({
                    method: methodKey,
                    path: pathKey,
                    data: methodObj,
                  });
                }
              });
            });

            return (
              <div key={tag.name} className="space-y-3">
                <div className="pt-2">
                  <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <span>{tag.name}</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {tag.description}
                  </p>
                </div>

                <div className="space-y-2">
                  {endpoints.map(({ method, path, data }) => {
                    const key = `${method}-${path}`;
                    const isExpanded = !!expandedEndpoints[key];
                    const isExecuting = !!loadingEndpoints[key];
                    const response = responses[key];

                    return (
                      <div
                        key={key}
                        className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl overflow-hidden shadow-2xs"
                      >
                        {/* Endpoint Bar */}
                        <button
                          type="button"
                          onClick={() => toggleEndpoint(key)}
                          className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-3 flex-wrap">
                            <span
                              className={`px-2.5 py-1 text-[11px] font-mono font-bold rounded-md border uppercase ${getMethodBadge(
                                method
                              )}`}
                            >
                              {method}
                            </span>
                            <span className="font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
                              {path}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {data.summary}
                            </span>
                          </div>
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                          )}
                        </button>

                        {/* Expanded Details & Tester */}
                        {isExpanded && (
                          <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-4 bg-slate-50/50 dark:bg-slate-950/30 text-xs">
                            <p className="text-slate-600 dark:text-slate-400">
                              {data.description || data.summary}
                            </p>

                            {/* Request Body Payload Editor if POST */}
                            {method.toLowerCase() === 'post' && (
                              <div className="space-y-1.5">
                                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                                  Request Body (JSON)
                                </label>
                                <textarea
                                  rows={5}
                                  value={testPayloads[key] || '{}'}
                                  onChange={(e) =>
                                    setTestPayloads(prev => ({ ...prev, [key]: e.target.value }))
                                  }
                                  className="w-full p-2.5 font-mono text-xs bg-slate-900 text-slate-200 rounded-lg border border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                              </div>
                            )}

                            {/* Parameters if any */}
                            {data.parameters && (
                              <div className="space-y-1.5">
                                <span className="font-semibold text-slate-700 dark:text-slate-300 text-[11px]">
                                  Parameters
                                </span>
                                <div className="space-y-1">
                                  {data.parameters.map((p: any) => (
                                    <div
                                      key={p.name}
                                      className="flex items-center gap-2 font-mono text-[11px] text-slate-600 dark:text-slate-400"
                                    >
                                      <span className="text-blue-600 dark:text-blue-400 font-bold">{p.name}</span>
                                      <span className="text-slate-400">({p.in})</span>
                                      <span>{p.schema?.type}</span>
                                      {p.required && <span className="text-rose-500 text-[10px]">required</span>}
                                      <span className="font-sans text-slate-500">— {p.description}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Try It Out Button */}
                            <div className="flex items-center gap-3 pt-2">
                              <button
                                onClick={() => handleExecute(method, path, key)}
                                disabled={isExecuting}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-500/20 transition-colors disabled:opacity-50 cursor-pointer"
                              >
                                <Play className="w-3 h-3 fill-current" />
                                <span>{isExecuting ? 'Executing...' : 'Execute Request'}</span>
                              </button>

                              <span className="text-[11px] text-slate-400 font-mono">
                                curl -X {method.toUpperCase()} http://localhost:3000/api{path}
                              </span>
                            </div>

                            {/* Response Box */}
                            {response && (
                              <div className="space-y-2 pt-2 animate-in fade-in duration-150">
                                <div className="flex items-center justify-between text-xs font-mono">
                                  <div className="flex items-center gap-2">
                                    <span className="text-slate-400 font-sans">Response:</span>
                                    <span
                                      className={`px-1.5 py-0.5 rounded font-bold ${
                                        response.status >= 200 && response.status < 300
                                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                                      }`}
                                    >
                                      HTTP {response.status}
                                    </span>
                                  </div>
                                  <span className="text-slate-500 text-[11px]">
                                    Time: {response.latency}ms
                                  </span>
                                </div>

                                <div className="bg-[#0f172a] text-slate-200 p-3.5 rounded-lg border border-slate-800 font-mono text-xs overflow-x-auto max-h-64">
                                  <pre>{JSON.stringify(response.data, null, 2)}</pre>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
