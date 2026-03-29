import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Send, Sparkles, Copy, Download, RefreshCw, FileText, CheckCircle2, ChevronDown } from "lucide-react";
import * as XLSX from "xlsx";
import { useSettings } from "../context/SettingsContext";
import { useHistory, type HistoryEntry } from "../context/HistoryContext";

export function Dashboard() {
  const { settings } = useSettings();
  const { addEntry } = useHistory();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [requirement, setRequirement] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  // Handle loading history or resetting from navigation state
  useEffect(() => {
    const state = location.state as { entry?: HistoryEntry, reset?: boolean };
    
    if (state?.entry) {
      setRequirement(state.entry.requirement);
      setOutput(state.entry.output);
      setError(null);
      // Clear state so it doesn't reload on every render
      navigate(location.pathname, { replace: true, state: {} });
    } else if (state?.reset) {
      setRequirement("");
      setOutput(null);
      setError(null);
      // Clear reset flag
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleGenerate = async () => {
    if (!requirement.trim()) return;

    setIsGenerating(true);
    setOutput(null);
    setError(null);

    const body = {
      provider: settings.activeProvider,
      model: settings.activeProvider === 'ollama' ? settings.ollamaModel : (settings.activeProvider === 'groq' ? settings.groqModel : settings.openaiModel),
      apiKey: settings.activeProvider === 'ollama' ? undefined : (settings.activeProvider === 'groq' ? settings.groqApiKey : settings.openaiApiKey),
      ollamaUrl: settings.activeProvider === 'ollama' ? settings.ollamaUrl : undefined,
      requirement: requirement.trim(),
    };

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      const title = requirement.trim().slice(0, 40) + (requirement.length > 40 ? '...' : '');

      if (response.ok) {
        setOutput(data.result);
        addEntry({
          title,
          requirement: requirement.trim(),
          output: data.result,
          provider: settings.activeProvider,
        });
      } else {
        const errorMsg = data.error || 'Failed to generate test cases';
        setError(errorMsg);
        // Also save error state to history for auditability
        addEntry({
          title,
          requirement: requirement.trim(),
          output: `ERROR: ${errorMsg}`,
          provider: settings.activeProvider,
        });
      }
    } catch (err) {
      setError('Failed to reach backend server. Make sure it is running on port 3000.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadReport = () => {
    if (!output) return;
    
    // Default to markdown
    const blob = new Blob([output], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    const cleanTitle = requirement.trim().slice(0, 30).replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const fileName = cleanTitle ? `test_cases_${cleanTitle}.md` : `test_cases_${Date.now()}.md`;
    
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const parseTableData = () => {
    if (!output) return [];
    
    const lines = output.split('\n');
    const data: any[][] = [];
    const headers = ["Test ID", "Summary", "Description", "Precondition", "Test Steps", "Expected Result", "Priority", "Labels / Components", "Test Type", "PRD Source", "Confidence", "Status"];
    
    data.push(headers);
    
    lines.forEach(line => {
      const trimmed = line.trim();
      // Only process data rows, ignore header separators (|---|) and titles
      if (trimmed.startsWith('|') && !trimmed.startsWith('||') && !trimmed.includes('---')) {
        const columns = trimmed.replace(/^\|/, '').replace(/\|$/, '').split('|');
        if (columns.length === 12) {
          data.push(columns.map(c => c.trim()));
        }
      }
    });
    
    return data;
  };

  const downloadAsCsv = () => {
    const data = parseTableData();
    if (data.length <= 1) return; // Only headers
    
    const csvContent = data.map(row => 
      row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    const cleanTitle = requirement.trim().slice(0, 30).replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const fileName = cleanTitle ? `test_cases_${cleanTitle}.csv` : `test_cases_${Date.now()}.csv`;
    
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowDownloadMenu(false);
  };

  const downloadAsExcel = () => {
    const data = parseTableData();
    if (data.length <= 1) return;

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Test Cases");
    
    const cleanTitle = requirement.trim().slice(0, 30).replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const fileName = cleanTitle ? `test_cases_${cleanTitle}.xlsx` : `test_cases_${Date.now()}.xlsx`;
    
    XLSX.writeFile(workbook, fileName);
    setShowDownloadMenu(false);
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-50/50">
      {/* Header */}
      <div className="px-8 py-6 border-b border-slate-200/50 bg-white/40 backdrop-blur-md flex justify-between items-center z-10">
        <div>
          <h2 className="text-xl font-semibold text-slate-800 tracking-tight">Generate Test Cases</h2>
          <p className="text-sm text-slate-500 mt-1">Transform Jira requirements into structured test scenarios</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
            {settings.activeProvider} Active
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ready
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-5xl mx-auto space-y-6">
          {!output && !isGenerating && !error && (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-60">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-slate-700">Ready to Generate</h3>
                <p className="text-sm text-slate-500 max-w-sm mt-1">
                  Paste your Jira requirements below and let the AI craft detailed functional and non-functional test cases for you.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 text-sm flex items-start gap-3">
              <div className="p-1 bg-rose-100 rounded-md mt-0.5">
                <RefreshCw className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold">Generation Failed</p>
                <p className="mt-1 opacity-90">{error}</p>
              </div>
            </div>
          )}

          {isGenerating && (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-1/4" />
              <div className="space-y-2">
                <div className="h-20 bg-slate-100 rounded-xl" />
                <div className="h-40 bg-slate-100 rounded-xl" />
                <div className="h-32 bg-slate-100 rounded-xl" />
              </div>
            </div>
          )}

          {output && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <div className="flex items-center gap-2 text-slate-700">
                  <FileText className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Output</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={copyToClipboard} title="Copy to Clipboard" className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-indigo-600 transition-all border border-transparent hover:border-slate-200 shadow-sm active:scale-95 group relative">
                    {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {copied ? 'Copied!' : 'Copy to Clipboard'}
                    </span>
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={downloadAsExcel}
                      title="Download XLSX"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-all border border-emerald-100 hover:border-emerald-200 shadow-sm active:scale-95"
                    >
                      <div className="w-4 h-4 flex items-center justify-center font-bold text-[10px] bg-emerald-100 text-emerald-600 rounded">X</div>
                      <span className="text-xs font-medium">XLSX</span>
                    </button>
                    
                    <button 
                      onClick={downloadAsCsv}
                      title="Download CSV"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-amber-600 hover:bg-amber-50 transition-all border border-amber-100 hover:border-amber-200 shadow-sm active:scale-95"
                    >
                      <div className="w-4 h-4 flex items-center justify-center font-bold text-[10px] bg-amber-100 text-amber-600 rounded">C</div>
                      <span className="text-xs font-medium">CSV</span>
                    </button>

                    <div className="relative">
                      <button 
                        onClick={() => setShowDownloadMenu(!showDownloadMenu)} 
                        title="More Download Options" 
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all border shadow-sm active:scale-95 ${
                          showDownloadMenu 
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-600' 
                          : 'text-slate-400 hover:text-indigo-600 hover:bg-white border-transparent hover:border-slate-200'
                        }`}
                      >
                        <Download className="w-4 h-4" />
                        <span className="text-xs font-medium">More</span>
                        <ChevronDown className={`w-3 h-3 transition-transform ${showDownloadMenu ? 'rotate-180' : ''}`} />
                      </button>
                    
                    {showDownloadMenu && (
                      <>
                        <div 
                          className="fixed inset-0 z-20" 
                          onClick={() => setShowDownloadMenu(false)}
                        />
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-slate-200 shadow-xl z-30 py-2 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                          <button 
                            onClick={downloadReport}
                            className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors flex items-center gap-3"
                          >
                            <FileText className="w-4 h-4" />
                            <span>Markdown (.md)</span>
                          </button>
                          <button 
                            onClick={downloadAsExcel}
                            className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors flex items-center gap-3"
                          >
                            <div className="w-4 h-4 flex items-center justify-center font-bold text-[10px] bg-emerald-100 text-emerald-600 rounded">X</div>
                            <span>Excel (.xlsx)</span>
                          </button>
                          <button 
                            onClick={downloadAsCsv}
                            className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-amber-600 transition-colors flex items-center gap-3"
                          >
                            <div className="w-4 h-4 flex items-center justify-center font-bold text-[10px] bg-amber-100 text-amber-600 rounded">C</div>
                            <span>CSV (.csv)</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8 prose prose-slate max-w-none prose-sm">
                <pre className="whitespace-pre-wrap font-sans text-slate-700 leading-relaxed bg-white p-0 m-0 border-none shadow-none">
                  {output}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white/40 border-t border-slate-200/50 backdrop-blur-md z-10 transition-all">
        <div className="max-w-5xl mx-auto relative group">
          <textarea
            placeholder="Paste Jira requirement here... (e.g., 'As a user, I want to login...')"
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            disabled={isGenerating}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleGenerate();
              }
            }}
            className="w-full bg-white border border-slate-200 rounded-2xl p-5 pr-16 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all min-h-[120px] max-h-[300px] text-slate-700 placeholder:text-slate-400 shadow-sm disabled:opacity-70"
          />
          <button 
            onClick={handleGenerate}
            disabled={isGenerating || !requirement.trim()}
            className={`absolute bottom-4 right-4 p-3 rounded-xl transition-all shadow-lg active:scale-90 disabled:opacity-50 disabled:scale-100 ${
              requirement.trim() 
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/40' 
              : 'bg-slate-100 text-slate-400 shadow-none'
            }`}
          >
            {isGenerating ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-400 mt-4 font-medium uppercase tracking-widest">
          TestCaseGen can make mistakes. Consider verifying required scenarios.
        </p>
      </div>
    </div>
  );
}
