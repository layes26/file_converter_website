import React, { useState, useCallback, useRef, useEffect } from 'react';
import { 
  FileText, Image, Type, Upload, Download, Loader2, 
  AlertCircle, CheckCircle, Sparkles, Zap, ArrowLeft, 
  FileImage, Lock, X, Settings, Info, ChevronDown, Combine, FilePlus,
  Mic, Volume2, Search, Sliders, Maximize2, Target,
  Lightbulb, TrendingUp, Clock, BookOpen, Award
} from 'lucide-react';
import BackgroundSelector from './components/BackgroundSelector';

const ProfessionalSummaryDisplay = ({ summary }) => {
  return (
    <div className="space-y-6">
      {/* Quality Badge */}
      <div className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
        <Award className="w-6 h-6 text-white" />
        <p className="text-lg font-bold text-white">
          ChatGPT-Level Quality Summary • Professional Grade
        </p>
      </div>

      {/* Executive Summary */}
      {summary.executive_summary && (
        <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200 shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200 rounded-full opacity-20 -mr-16 -mt-16" />
          <div className="relative p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-500 rounded-xl shadow-md">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Executive Summary</h3>
            </div>
            <p className="text-lg leading-relaxed text-gray-800 font-medium">
              {summary.executive_summary}
            </p>
          </div>
        </div>
      )}

      {/* Main Summary - Beautiful Typography */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Comprehensive Summary</h3>
          </div>
        </div>
        <div className="p-8">
          <div className="prose prose-lg max-w-none">
            {summary.summary.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="mb-6 text-gray-800 leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Key Concepts */}
      {summary.key_concepts && summary.key_concepts.length > 0 && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Key Concepts</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-3">
              {summary.key_concepts.map((concept, idx) => (
                <span
                  key={idx}
                  className="px-5 py-2.5 bg-white text-purple-700 font-semibold rounded-full shadow-md border-2 border-purple-200 hover:scale-105 transition-transform"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Key Points - Clean Design */}
      {summary.key_points && summary.key_points.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Key Takeaways</h3>
            </div>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              {summary.key_points.map((point, idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-sm">{idx + 1}</span>
                  </div>
                  <p className="flex-1 text-gray-800 leading-relaxed pt-1.5 text-base">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Statistics Grid - Modern Cards */}
      {summary.statistics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg text-white">
            <BookOpen className="w-8 h-8 mb-3 opacity-80" />
            <p className="text-3xl font-black mb-1">{summary.statistics.original_word_count.toLocaleString()}</p>
            <p className="text-sm font-semibold opacity-90">Original Words</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white">
            <FileText className="w-8 h-8 mb-3 opacity-80" />
            <p className="text-3xl font-black mb-1">{summary.statistics.summary_word_count.toLocaleString()}</p>
            <p className="text-sm font-semibold opacity-90">Summary Words</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 shadow-lg text-white">
            <TrendingUp className="w-8 h-8 mb-3 opacity-80" />
            <p className="text-3xl font-black mb-1">{summary.statistics.compression_ratio}%</p>
            <p className="text-sm font-semibold opacity-90">Compressed</p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 shadow-lg text-white">
            <Clock className="w-8 h-8 mb-3 opacity-80" />
            <p className="text-3xl font-black mb-1">{summary.statistics.summary_reading_time_minutes}</p>
            <p className="text-sm font-semibold opacity-90">Min Read</p>
          </div>
        </div>
      )}

      {/* Quality Guarantee */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-indigo-500 rounded-xl shadow-md">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-900 mb-2 text-lg">Professional Quality Guarantee</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              This summary uses advanced AI algorithms comparable to ChatGPT and Gemini Pro. 
              The content is organized into natural paragraphs with contextual understanding, 
              providing a professional reading experience that preserves the document's key insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const API_ENDPOINTS = {
  'pdf-to-word': 'http://localhost:5001/api/pdf-to-word',
  'word-to-pdf': 'http://localhost:5002/api/word-to-pdf',
  'pdf-merge': 'http://localhost:5003/api/pdf-merge',
  'document-summary': 'http://localhost:5004/api/document-summary',
  'pdf-to-image': 'http://localhost:5005/api/pdf-to-image',
  'image-to-pdf': 'http://localhost:5006/api/image-to-pdf',
  'text-summary': 'http://localhost:5007/api/text-summary',
  'bg-remove': 'http://localhost:5008/api/bg-remove',
  'image-compress': 'http://localhost:5009/api/image-compress',
  'voice-to-text': 'http://localhost:5010/api/voice-to-text',
  'text-to-voice': 'http://localhost:5011/api/text-to-voice',
  'plagiarism': 'http://localhost:5012/api/plagiarism-checker',
};

const SummaryLevelSelector = ({ level, onChange }) => {
  const levels = [
    { value: 'brief', label: 'Brief', desc: '15% - Quick overview', icon: '⚡' },
    { value: 'detailed', label: 'Detailed', desc: '25% - Balanced summary', icon: '📊' },
    { value: 'comprehensive', label: 'Comprehensive', desc: '40% - In-depth analysis', icon: '📚' }
  ];

  return (
    <div className="mb-6">
      <label className="block mb-3 text-sm font-bold text-gray-900">Summary Depth</label>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {levels.map((l) => (
          <button
            key={l.value}
            onClick={() => onChange(l.value)}
            className={`p-4 text-left transition-all duration-200 border-2 rounded-xl ${
              level === l.value
                ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{l.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-gray-900">{l.label}</p>
                <p className="text-xs text-gray-600">{l.desc}</p>
              </div>
              {level === l.value && <CheckCircle className="w-5 h-5 text-blue-600" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const SummaryModeSelector = ({ mode, onChange }) => {
  const modes = [
    { value: 'overall', label: 'Overall Summary', desc: 'Complete document overview', icon: '📄' },
    { value: 'page_by_page', label: 'Page-by-Page', desc: 'Detailed per-page summaries', icon: '📑' }
  ];

  return (
    <div className="mb-6">
      <label className="block mb-3 text-sm font-bold text-gray-900">Summary Mode</label>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {modes.map((m) => (
          <button
            key={m.value}
            onClick={() => onChange(m.value)}
            className={`p-4 text-left transition-all duration-200 border-2 rounded-xl ${
              mode === m.value
                ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{m.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-gray-900">{m.label}</p>
                <p className="text-xs text-gray-600">{m.desc}</p>
              </div>
              {mode === m.value && <CheckCircle className="w-5 h-5 text-blue-600" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const ToolCard = ({ icon: Icon, title, description, onClick, badge, isAvailable }) => (
  <button
    onClick={onClick}
    disabled={!isAvailable}
    className={`relative p-8 overflow-hidden transition-all duration-300 border shadow-md group rounded-2xl ${
      isAvailable 
        ? 'border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl hover:scale-105 cursor-pointer' 
        : 'border-gray-300 bg-gray-100 opacity-60 cursor-not-allowed'
    }`}
  >
    <div className={`absolute inset-0 transition-opacity duration-300 bg-gradient-to-br from-blue-500/5 to-purple-500/5 ${isAvailable ? 'opacity-0 group-hover:opacity-100' : ''}`} />
    <div className="relative flex flex-col items-center space-y-4 text-center">
      <div className={`p-5 transition-all duration-300 shadow-lg rounded-2xl bg-gradient-to-br ${
        isAvailable ? 'from-blue-500 to-purple-600 group-hover:shadow-xl group-hover:scale-110' : 'from-gray-400 to-gray-500'
      }`}>
        <Icon className="w-10 h-10 text-white" />
      </div>
      {badge && isAvailable && (
        <span className="absolute top-0 right-0 px-3 py-1 text-xs font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-green-500 to-emerald-600">
          {badge}
        </span>
      )}
      {!isAvailable && (
        <span className="absolute top-0 right-0 px-3 py-1 text-xs font-bold text-white bg-red-500 rounded-full shadow-lg">
          Unavailable
        </span>
      )}
      <div>
        <h3 className={`mb-2 text-xl font-bold transition-colors ${
          isAvailable ? 'text-gray-900 group-hover:text-blue-600' : 'text-gray-600'
        }`}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-gray-600">{description}</p>
      </div>
    </div>
  </button>
);

const FileUploader = ({ onFileSelect, accept, processing, maxSize = 50, multiple = false }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (multiple && e.dataTransfer.files) {
      onFileSelect(Array.from(e.dataTransfer.files));
    } else if (e.dataTransfer.files?.[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  }, [onFileSelect, multiple]);

  const handleChange = useCallback((e) => {
    if (multiple && e.target.files) {
      onFileSelect(Array.from(e.target.files));
    } else if (e.target.files?.[0]) {
      onFileSelect(e.target.files[0]);
    }
  }, [onFileSelect, multiple]);

  return (
    <div
      className={`relative border-3 border-dashed rounded-2xl p-16 text-center transition-all duration-300 ${
        dragActive 
          ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 scale-105' 
          : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className={`transition-all duration-300 ${dragActive ? 'scale-110' : ''}`}>
        <div className="inline-block p-6 mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100">
          <Upload className={`w-16 h-16 text-blue-600 ${dragActive ? 'animate-bounce' : ''}`} />
        </div>
        <p className="mb-3 text-2xl font-bold text-gray-800">
          {multiple ? 'Drop your files here' : 'Drop your file here'}
        </p>
        <p className="mb-6 text-base text-gray-600">or click below to browse</p>
        <label className="inline-block px-8 py-4 text-lg font-semibold text-white transition-all duration-300 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-xl hover:scale-105 disabled:opacity-50">
          <span className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            {multiple ? 'Choose Files' : 'Choose File'}
          </span>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleChange}
            disabled={processing}
            multiple={multiple}
          />
        </label>
        <p className="mt-6 text-sm font-medium text-gray-500">
          Max file size: {maxSize}MB • Supported: {accept}
          {multiple && <span className="block mt-1">Select multiple files</span>}
        </p>
      </div>
    </div>
  );
};

const ProgressBar = ({ progress }) => (
  <div className="w-full h-3 overflow-hidden bg-gray-200 rounded-full">
    <div 
      className="h-full transition-all duration-500 ease-out bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
      style={{ width: `${progress}%` }}
    />
  </div>
);

const Alert = ({ type, title, message, onClose }) => {
  const styles = {
    error: { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-800', icon: AlertCircle },
    success: { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-800', icon: CheckCircle },
    info: { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-800', icon: Info },
    warning: { bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-800', icon: AlertCircle }
  };

  const style = styles[type] || styles.info;
  const Icon = style.icon;

  return (
    <div className={`flex items-start gap-4 p-6 border-2 rounded-2xl ${style.bg} ${style.border} ${style.text}`}>
      <Icon className="flex-shrink-0 w-6 h-6 mt-1" />
      <div className="flex-1">
        {title && <p className="mb-1 text-lg font-bold">{title}</p>}
        <p className="text-sm leading-relaxed">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="p-1 transition-colors rounded-lg hover:bg-black/5">
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

const PlagiarismResult = ({ result }) => {
  const { percentage, highlightedText, sentenceAnalysis, recommendations, flaggedCount, totalSentences } = result;
  
  const getSeverityColor = (pct) => {
    if (pct < 15) return 'text-green-600';
    if (pct < 30) return 'text-yellow-600';
    if (pct < 50) return 'text-orange-600';
    return 'text-red-600';
  };
  
  const getSeverityBg = (pct) => {
    if (pct < 15) return 'bg-gradient-to-br from-green-50 to-emerald-100';
    if (pct < 30) return 'bg-gradient-to-br from-yellow-50 to-amber-100';
    if (pct < 50) return 'bg-gradient-to-br from-orange-50 to-orange-100';
    return 'bg-gradient-to-br from-red-50 to-red-100';
  };
  
  const getSeverityLabel = (pct) => {
    if (pct < 15) return '✓ Excellent';
    if (pct < 30) return '⚠ Minor Issues';
    if (pct < 50) return '⚠ Needs Revision';
    return '✗ High Risk';
  };

  const getSeverityIcon = (pct) => {
    if (pct < 15) return '🎉';
    if (pct < 30) return '✏️';
    if (pct < 50) return '⚠️';
    return '🚨';
  };

  return (
    <div className="space-y-8">
      {/* Main Score Card - Premium Design */}
      <div className={`relative overflow-hidden rounded-3xl shadow-2xl ${getSeverityBg(percentage)} p-8`}>
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10 -mr-20 -mt-20">
          <div className="w-full h-full bg-white rounded-full"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Originality Score</p>
              <p className="text-sm text-gray-500 mt-1">Powered by Advanced AI Detection</p>
            </div>
            <span className="text-4xl">{getSeverityIcon(percentage)}</span>
          </div>
          
          <div className="flex items-end gap-8 mb-6">
            <div>
              <p className={`text-7xl font-black ${getSeverityColor(percentage)} tracking-tight`}>{percentage}%</p>
              <p className={`text-lg font-bold mt-2 ${getSeverityColor(percentage)}`}>{getSeverityLabel(percentage)}</p>
            </div>
            
            <div className="flex-1 pb-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm">
                  <p className="text-xs text-gray-600 font-medium mb-1">Original</p>
                  <p className="text-3xl font-bold text-green-600">{100 - percentage}%</p>
                </div>
                <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm">
                  <p className="text-xs text-gray-600 font-medium mb-1">Flagged</p>
                  <p className="text-3xl font-bold text-purple-600">{flaggedCount || 0}<span className="text-lg text-gray-500">/{totalSentences || 0}</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="h-3 bg-white/40 rounded-full overflow-hidden shadow-inner">
              <div 
                className={`h-full transition-all duration-1000 ease-out ${
                  percentage < 15 ? 'bg-green-500' :
                  percentage < 30 ? 'bg-yellow-500' :
                  percentage < 50 ? 'bg-orange-500' : 'bg-red-500'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs font-medium text-gray-600">
              <span>0% Perfect</span>
              <span>50% Moderate</span>
              <span>100% High Risk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations - Clean Card */}
      {recommendations && recommendations.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
            <h3 className="flex items-center gap-3 text-xl font-bold text-white">
              <div className="p-2 bg-white/20 rounded-lg">
                <Info className="w-5 h-5" />
              </div>
              Improvement Recommendations
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
                    <span className="text-sm font-bold text-white">{i + 1}</span>
                  </div>
                  <p className="flex-1 text-gray-700 leading-relaxed pt-1">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Text Analysis - Modern Design */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-3 text-xl font-bold text-white">
              <div className="p-2 bg-white/20 rounded-lg">
                <Search className="w-5 h-5" />
              </div>
              Detailed Text Analysis
            </h3>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-white">AI Analyzed</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
            <div className="text-base leading-loose" dangerouslySetInnerHTML={{ __html: highlightedText }} />
          </div>
          
          {/* Legend - Improved */}
          <div className="mt-6 p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <p className="text-sm font-bold text-gray-700 mb-3">Highlighting Legend:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-yellow-200 rounded-lg border-2 border-yellow-400"></div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Low Match</p>
                  <p className="text-xs text-gray-600">30-45% similar</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-orange-300 rounded-lg border-2 border-orange-500"></div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Medium Match</p>
                  <p className="text-xs text-gray-600">45-65% similar</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-red-300 rounded-lg border-2 border-red-500"></div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">High Match</p>
                  <p className="text-xs text-gray-600">65%+ similar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Card */}
      {sentenceAnalysis && sentenceAnalysis.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
            Analysis Statistics
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl text-center border border-blue-200">
              <p className="text-2xl font-bold text-blue-600">{totalSentences || 0}</p>
              <p className="text-xs text-gray-600 mt-1 font-medium">Total Sentences</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl text-center border border-green-200">
              <p className="text-2xl font-bold text-green-600">{(totalSentences || 0) - (flaggedCount || 0)}</p>
              <p className="text-xs text-gray-600 mt-1 font-medium">Original</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl text-center border border-orange-200">
              <p className="text-2xl font-bold text-orange-600">{flaggedCount || 0}</p>
              <p className="text-xs text-gray-600 mt-1 font-medium">Flagged</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl text-center border border-purple-200">
              <p className="text-2xl font-bold text-purple-600">{percentage < 15 ? 'A+' : percentage < 30 ? 'B' : percentage < 50 ? 'C' : 'F'}</p>
              <p className="text-xs text-gray-600 mt-1 font-medium">Grade</p>
            </div>
          </div>
        </div>
      )}

      {/* Pro Tip */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-100">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-indigo-500 rounded-xl">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-900 mb-2">💡 Pro Tip</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Our AI uses advanced algorithms including TF-IDF vectorization, semantic similarity analysis, and paraphrase detection 
              to provide accuracy comparable to Grammarly, Turnitin, and Quillbot. For best results, ensure your text is at least 
              100 words and contains complete sentences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [backendStatus, setBackendStatus] = useState({});
  const [isCheckingBackend, setIsCheckingBackend] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [summaryMode, setSummaryMode] = useState('overall');
  const [summaryLevel, setSummaryLevel] = useState('detailed');
  
  // Image compression options
  const [compressWidth, setCompressWidth] = useState('');
  const [compressHeight, setCompressHeight] = useState('');
  const [targetSize, setTargetSize] = useState('');
  const [qualityPreset, setQualityPreset] = useState('balanced');
  const [outputFormat, setOutputFormat] = useState('JPEG');
  const [maintainAspect, setMaintainAspect] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkBackend = async () => {
      if (!mounted) return;
      
      setIsCheckingBackend(true);
      const statusMap = {};
      
      const checks = Object.entries(API_ENDPOINTS).map(async ([serviceName, url]) => {
        try {
          const baseUrl = url.substring(0, url.lastIndexOf('/'));
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 800);

          const response = await fetch(`${baseUrl}/health`, {
            method: 'GET',
            signal: controller.signal,
            cache: 'no-store',
            headers: { 'Cache-Control': 'no-cache' }
          });
          
          clearTimeout(timeoutId);
          statusMap[serviceName] = response.ok ? 'online' : 'offline';
        } catch (err) {
          statusMap[serviceName] = 'offline';
        }
      });

      await Promise.all(checks);
      
      if (mounted) {
        setBackendStatus(statusMap);
        setIsCheckingBackend(false);
      }
    };

    checkBackend();
    const interval = setInterval(checkBackend, 10000);
    
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const tools = [
    { id: 'pdf-to-word', icon: FileText, title: 'PDF to Word', description: 'Convert PDF documents to editable MS Word format with preserved formatting', accept: '.pdf', badge: 'Popular', needsFile: true, needsMultiple: false, maxSize: 50 },
    { id: 'word-to-pdf', icon: FileText, title: 'Word to PDF', description: 'Convert Word documents to professional PDF format', accept: '.doc,.docx', badge: null, needsFile: true, needsMultiple: false, maxSize: 50 },
    { id: 'pdf-merge', icon: Combine, title: 'PDF Merger', description: 'Combine multiple PDF files into a single document in your chosen order', accept: '.pdf', badge: null, needsFile: true, needsMultiple: true, maxSize: 50 },
    { id: 'document-summary', icon: FileText, title: 'Document Summarizer', description: 'Extract and summarize text from PDF or Word documents using AI', accept: '.pdf,.doc,.docx', badge: 'AI', needsFile: true, needsMultiple: false, maxSize: 50 },
    { id: 'image-to-pdf', icon: FilePlus, title: 'Image to PDF', description: 'Convert images (JPG, PNG) to professional PDF documents', accept: 'image/*', badge: null, needsFile: true, needsMultiple: false, maxSize: 20 },
    { id: 'pdf-to-image', icon: FileImage, title: 'PDF to Image', description: 'Convert PDF pages to high-quality images (PNG/JPG format)', accept: '.pdf', badge: null, needsFile: true, needsMultiple: false, maxSize: 50 },
    { id: 'voice-to-text', icon: Mic, title: 'Voice to Text', description: 'Convert audio recordings to text (English only) using speech recognition', accept: 'audio/*,.mp3,.wav,.m4a,.ogg', badge: 'New', needsFile: true, needsMultiple: false, maxSize: 25 },
    { id: 'text-to-voice', icon: Volume2, title: 'Text to Voice', description: 'Convert text to natural-sounding speech audio (English only)', accept: null, badge: 'New', needsFile: false, needsMultiple: false, maxSize: null },
    { id: 'text-summary', icon: Type, title: 'Smart Summarizer', description: 'AI-powered text summarization with LSA algorithm and key insights extraction', accept: null, badge: 'AI', needsFile: false, needsMultiple: false, maxSize: null },
    { id: 'bg-remove', icon: Image, title: 'Background Remover', description: 'Remove image backgrounds using U2-Net deep learning model', accept: 'image/*', badge: null, needsFile: true, needsMultiple: false, maxSize: 10 },
    { id: 'image-compress', icon: FileImage, title: 'Pro Image Compressor', description: 'World-class compression with manual controls, target size, and multiple quality presets', accept: 'image/*', badge: 'Pro', needsFile: true, needsMultiple: false, maxSize: 20 },
    { id: 'plagiarism', icon: Search, title: 'Plagiarism Checker Pro', description: 'Grammarly/Quillbot level accuracy with sentence analysis and paraphrase detection', accept: null, badge: 'Pro', needsFile: false, needsMultiple: false, maxSize: null }
  ];

  const handleToolSelect = useCallback((tool) => {
    setSelectedTool(tool);
    setFile(null);
    setFiles([]);
    setTextInput('');
    setResult(null);
    setError(null);
    setProgress(0);
    setShowAdvanced(false);
    setCompressWidth('');
    setCompressHeight('');
    setTargetSize('');
    setQualityPreset('balanced');
    setOutputFormat('JPEG');
    setMaintainAspect(true);
  }, []);

  const handleFileSelect = useCallback((selectedFile) => {
    const maxSize = selectedTool?.maxSize || 50;
    const maxBytes = maxSize * 1024 * 1024;

    if (selectedFile.size > maxBytes) {
      setError(`File too large. Maximum size is ${maxSize}MB.`);
      return;
    }

    setFile(selectedFile);
    setError(null);
    setResult(null);
    setProgress(0);
  }, [selectedTool]);

  const handleMultipleFilesSelect = useCallback((selectedFiles) => {
    const maxSize = selectedTool?.maxSize || 50;
    const maxBytes = maxSize * 1024 * 1024;

    const validFiles = selectedFiles.filter(f => {
      if (f.size > maxBytes) {
        setError(`${f.name} is too large. Maximum size is ${maxSize}MB.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) {
      setError('No valid files selected');
      return;
    }

    setFiles(validFiles);
    setError(null);
    setResult(null);
    setProgress(0);
  }, [selectedTool]);

  const removeFile = useCallback((index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const moveFile = useCallback((index, direction) => {
    setFiles(prev => {
      const newFiles = [...prev];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= newFiles.length) return prev;
      [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
      return newFiles;
    });
  }, []);

  const validateInput = useCallback(() => {
    if (selectedTool.needsMultiple && files.length === 0) {
      setError('Please select at least one file');
      return false;
    }
    if (selectedTool.needsMultiple && files.length < 2) {
      setError('Please select at least 2 files to merge');
      return false;
    }
    if (selectedTool.needsFile && !selectedTool.needsMultiple && !file) {
      setError('Please select a file first');
      return false;
    }
    if (!selectedTool.needsFile && !textInput.trim()) {
      setError('Please enter some text to analyze');
      return false;
    }
    if (selectedTool.id === 'plagiarism' && textInput.trim().length < 50) {
      setError('Text too short. Please enter at least 50 characters for accurate plagiarism detection.');
      return false;
    }
    if (!selectedTool.needsFile && selectedTool.id !== 'plagiarism' && textInput.trim().length < 50) {
      setError('Text too short. Please enter at least 50 characters.');
      return false;
    }
    return true;
  }, [selectedTool, file, files, textInput]);

    const [bgOptions, setBgOptions] = useState(null);
    
    const processFile = async () => {
    if (!validateInput()) return;

    const serviceStatus = backendStatus[selectedTool.id];
    if (serviceStatus !== 'online') {
      setError(`${selectedTool.title} service is offline. Please start the backend server.`);
      return;
    }

    setProcessing(true);
    setError(null);
    setResult(null);
    setProgress(10);

      const formData = new FormData();
      
      if (selectedTool.needsMultiple) {
        files.forEach(f => formData.append('files', f));
      } else if (selectedTool.needsFile) {
        formData.append('file', file);
        
        // Add document summary parameters
        if (selectedTool.id === 'document-summary') {
          formData.append('level', summaryLevel);
          formData.append('mode', summaryMode);
        }      // Add image compression parameters
      if (selectedTool.id === 'image-compress') {
        if (compressWidth) formData.append('width', compressWidth);
        if (compressHeight) formData.append('height', compressHeight);
        if (targetSize) formData.append('target_size', targetSize);
        formData.append('preset', qualityPreset);
        formData.append('format', outputFormat);
        formData.append('maintain_aspect', maintainAspect ? 'true' : 'false');
      }
      
      // Add background removal options
      if (selectedTool.id === 'bg-remove' && bgOptions) {
        Object.entries(bgOptions).forEach(([key, value]) => {
          if (value !== undefined) {
            formData.append(key, value);
          }
        });
      }
    }    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 5, 90));
    }, 200);

    try {
      let response;
      
      if (selectedTool.needsFile || selectedTool.needsMultiple) {
        response = await fetch(API_ENDPOINTS[selectedTool.id], {
          method: 'POST',
          body: formData,
        });
      } else {
        response = await fetch(API_ENDPOINTS[selectedTool.id], {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: textInput }),
        });
      }

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Processing failed' }));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setProgress(100);
        
        if (selectedTool.id === 'text-summary' || selectedTool.id === 'document-summary') {
          setResult({ type: 'summary', message: 'Summary generated successfully!', summary: data });
        } else if (selectedTool.id === 'voice-to-text') {
          setResult({ type: 'transcription', message: 'Audio transcribed successfully!', transcription: data });
        } else if (selectedTool.id === 'plagiarism') {
          setResult({ 
            type: 'plagiarism', 
            message: 'Plagiarism analysis completed!', 
            percentage: data.percentage || 0, 
            highlightedText: data.highlightedText || textInput, 
            sources: data.sources || [],
            sentenceAnalysis: data.sentenceAnalysis || [],
            recommendations: data.recommendations || [],
            flaggedCount: data.flaggedCount || 0,
            totalSentences: data.totalSentences || 0
          });
        }
      } else {
        const blob = await response.blob();
        const filename = response.headers.get('X-Filename') || 'converted_file';
        const originalSize = response.headers.get('X-Original-FileSize');
        const compressedSize = response.headers.get('X-Compressed-FileSize');
        const compressionRatio = response.headers.get('X-Compression-Ratio');
        setProgress(100);
        
        if (selectedTool.id === 'text-to-voice') {
          const audioUrl = URL.createObjectURL(blob);
          setResult({ type: 'audio', message: 'Speech generated successfully!', filename, size: (blob.size / 1024).toFixed(2) + ' KB', audioUrl, blob });
        } else if (selectedTool.id === 'bg-remove') {
          const imageUrl = URL.createObjectURL(blob);
          const originalUrl = URL.createObjectURL(file);
          const savings = ((1 - blob.size / file.size) * 100).toFixed(1);
          setResult({ type: 'image', message: 'Background removed successfully!', filename, size: (blob.size / 1024).toFixed(2) + ' KB', originalSize: (file.size / 1024).toFixed(2) + ' KB', savings: savings > 0 ? savings + '%' : null, imageUrl, originalUrl, blob });
        } else if (selectedTool.id === 'image-compress') {
          const imageUrl = URL.createObjectURL(blob);
          const originalUrl = URL.createObjectURL(file);
          setResult({ 
            type: 'image', 
            message: 'Image compressed successfully!', 
            filename, 
            size: compressedSize || ((blob.size / 1024).toFixed(2) + ' KB'), 
            originalSize: originalSize || ((file.size / 1024).toFixed(2) + ' KB'), 
            savings: compressionRatio || (((1 - blob.size / file.size) * 100).toFixed(1) + '%'), 
            imageUrl, 
            originalUrl, 
            blob,
            compressionDetails: {
              preset: qualityPreset,
              format: outputFormat,
              targetSize: targetSize ? `${targetSize}KB` : 'Auto',
              dimensions: compressWidth || compressHeight ? `${compressWidth || 'auto'}x${compressHeight || 'auto'}` : 'Original'
            }
          });
        } else {
          setResult({ type: 'document', message: `${selectedTool.title} completed successfully!`, filename, size: (blob.size / 1024).toFixed(2) + ' KB', blob });
        }
      }
    } catch (err) {
      clearInterval(progressInterval);
      console.error('Processing error:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
      setProgress(0);
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = useCallback(() => {
    if (!result?.blob) return;
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [result]);

  const resetTool = useCallback(() => {
    setSelectedTool(null);
    setFile(null);
    setFiles([]);
    setTextInput('');
    setResult(null);
    setError(null);
    setProgress(0);
    setShowAdvanced(false);
    setCompressWidth('');
    setCompressHeight('');
    setTargetSize('');
  }, []);

  const resetForm = useCallback(() => {
    setFile(null);
    setFiles([]);
    setTextInput('');
    setResult(null);
    setError(null);
    setProgress(0);
  }, []);

  const onlineServicesCount = Object.values(backendStatus).filter(s => s === 'online').length;
  const totalServicesCount = Object.keys(API_ENDPOINTS).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .highlight-yellow { background-color: #fef3c7; padding: 2px 4px; border-radius: 3px; }
        .highlight-orange { background-color: #fed7aa; padding: 2px 4px; border-radius: 3px; }
        .highlight-red { background-color: #fecaca; padding: 2px 4px; border-radius: 3px; }
      `}</style>
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 bg-blue-400 rounded-full w-96 h-96 mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-0 bg-purple-400 rounded-full w-96 h-96 mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 bg-pink-400 rounded-full left-1/2 w-96 h-96 mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="container relative px-4 py-12 mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <div className="inline-block p-3 mb-4 shadow-lg rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600">
            <Zap className="w-12 h-12 text-white" />
          </div>
          <h1 className="mb-4 text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            Pro File Converter by LaTech
          </h1>
          <p className="text-xl font-medium text-gray-700">
            Enterprise-grade conversion tools powered by Python
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            {isCheckingBackend ? (
              <>
                <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                <span className="text-sm font-semibold text-blue-700">Checking services...</span>
              </>
            ) : (
              <>
                <div className={`w-2 h-2 rounded-full ${onlineServicesCount > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className={`text-sm font-semibold ${onlineServicesCount > 0 ? 'text-green-700' : 'text-red-700'}`}>
                  Services: {onlineServicesCount}/{totalServicesCount} Online
                </span>
              </>
            )}
            <span className="mx-2 text-gray-400">•</span>
            <Lock className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-semibold text-gray-700">Secure • Fast • Accurate</span>
          </div>
        </div>

        {onlineServicesCount === 0 && !selectedTool && !isCheckingBackend && (
          <div className="max-w-4xl mx-auto mb-8">
            <Alert type="error" title="All Services Offline" message="No backend services are running. Please start them by running: python backend/run_all_services.py" />
          </div>
        )}

        {!selectedTool && (
          <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-4">
            {tools.map((tool) => (
              <ToolCard key={tool.id} icon={tool.icon} title={tool.title} description={tool.description} onClick={() => handleToolSelect(tool)} badge={tool.badge} isAvailable={backendStatus[tool.id] === 'online'} />
            ))}
          </div>
        )}

        {selectedTool && (
          <div className="max-w-4xl mx-auto">
            <div className="p-10 border border-gray-200 shadow-2xl bg-white/80 backdrop-blur-lg rounded-3xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-4 shadow-lg rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600">
                    <selectedTool.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{selectedTool.title}</h2>
                    <p className="mt-1 text-gray-600">{selectedTool.description}</p>
                  </div>
                </div>
                <button onClick={resetTool} className="flex items-center gap-2 px-6 py-3 font-semibold text-gray-700 transition-all rounded-xl hover:bg-gray-100 hover:scale-105">
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
              </div>

              {selectedTool.id === 'image-compress' && file && !result && (
                <div className="p-6 mb-6 border-2 border-blue-200 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center gap-2 mb-4">
                    <Sliders className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-gray-900">Professional Compression Settings</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-gray-700">
                        <Maximize2 className="inline w-4 h-4 mr-1" />
                        Width (pixels)
                      </label>
                      <input
                        type="number"
                        value={compressWidth}
                        onChange={(e) => setCompressWidth(e.target.value)}
                        placeholder="Auto"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-gray-700">
                        <Maximize2 className="inline w-4 h-4 mr-1" />
                        Height (pixels)
                      </label>
                      <input
                        type="number"
                        value={compressHeight}
                        onChange={(e) => setCompressHeight(e.target.value)}
                        placeholder="Auto"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      <Target className="inline w-4 h-4 mr-1" />
                      Target File Size (KB) - Optional
                    </label>
                    <input
                      type="number"
                      value={targetSize}
                      onChange={(e) => setTargetSize(e.target.value)}
                      placeholder="e.g., 500 for 500KB"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    />
                    <p className="mt-1 text-xs text-gray-600">Leave empty for automatic compression based on quality preset</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-gray-700">Quality Preset</label>
                      <select
                        value={qualityPreset}
                        onChange={(e) => setQualityPreset(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                      >
                        <option value="web">Web (75% - Smallest)</option>
                        <option value="balanced">Balanced (85% - Recommended)</option>
                        <option value="high">High (95% - Near Original)</option>
                        <option value="archive">Archive (100% - Maximum)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-gray-700">Output Format</label>
                      <select
                        value={outputFormat}
                        onChange={(e) => setOutputFormat(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                      >
                        <option value="JPEG">JPEG (Recommended)</option>
                        <option value="PNG">PNG (Lossless)</option>
                        <option value="WEBP">WebP (Modern)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <input
                      type="checkbox"
                      id="maintainAspect"
                      checked={maintainAspect}
                      onChange={(e) => setMaintainAspect(e.target.checked)}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="maintainAspect" className="text-sm font-semibold text-gray-700">
                      Maintain aspect ratio (recommended)
                    </label>
                  </div>
                </div>
              )}

              {!selectedTool.needsFile && !result && (
                <div className="space-y-6">
                  <div>
                    <label className="block mb-3 text-lg font-bold text-gray-900">
                      {selectedTool.id === 'text-to-voice' ? 'Enter text to convert to speech (English only)' : selectedTool.id === 'plagiarism' ? 'Enter text to check for plagiarism' : 'Enter your text to summarize'}
                    </label>
                    <textarea value={textInput} onChange={(e) => setTextInput(e.target.value)} placeholder={selectedTool.id === 'text-to-voice' ? "Type or paste your text here... (English language only)" : selectedTool.id === 'plagiarism' ? "Paste or type your text here to check for plagiarism... (minimum 50 characters required)" : "Paste or type your text here... (minimum 50 characters required)"} className="w-full h-64 p-6 text-base transition-all border-2 border-gray-300 resize-none rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none" disabled={processing} />
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm text-gray-600">Characters: {textInput.length} | Words: {textInput.trim().split(/\s+/).filter(w => w).length}</p>
                      {selectedTool.id === 'plagiarism' ? (
                        <p className={`text-sm font-medium ${textInput.length >= 50 ? 'text-green-600' : 'text-orange-600'}`}>
                          {textInput.length >= 50 ? '✓ Ready for analysis' : `${50 - textInput.length} chars needed`}
                        </p>
                      ) : selectedTool.id === 'text-summary' ? (
                        <p className={`text-sm font-medium ${textInput.length >= 50 ? 'text-green-600' : 'text-orange-600'}`}>
                          {textInput.length >= 50 ? '✓ Ready' : `${50 - textInput.length} chars needed`}
                        </p>
                      ) : (
                        <p className={`text-sm font-medium ${textInput.length >= 10 ? 'text-green-600' : 'text-orange-600'}`}>
                          {textInput.length >= 10 ? '✓ Ready' : `${10 - textInput.length} chars needed`}
                        </p>
                      )}
                    </div>
                  </div>

                  {processing && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm font-medium text-gray-700">
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {selectedTool.id === 'text-to-voice' ? 'Generating speech...' : selectedTool.id === 'plagiarism' ? 'Analyzing text for plagiarism...' : 'Analyzing and summarizing...'}
                        </span>
                        <span>{progress}%</span>
                      </div>
                      <ProgressBar progress={progress} />
                    </div>
                  )}

                  {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

                  <button onClick={processFile} disabled={processing || (selectedTool.id === 'plagiarism' ? textInput.trim().length < 50 : selectedTool.id === 'text-summary' ? textInput.trim().length < 50 : textInput.trim().length < 10)} className="flex items-center justify-center w-full gap-3 py-5 text-xl font-bold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100">
                    {processing ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-6 h-6" />
                        <span>{selectedTool.id === 'text-to-voice' ? 'Generate Speech' : selectedTool.id === 'plagiarism' ? 'Check Plagiarism' : 'Generate Summary'}</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {selectedTool.needsMultiple && files.length === 0 && !result && (
                <>
                  <FileUploader onFileSelect={handleMultipleFilesSelect} accept={selectedTool.accept} processing={processing} maxSize={selectedTool.maxSize} multiple={true} />
                  {error && <div className="mt-6"><Alert type="error" message={error} onClose={() => setError(null)} /></div>}
                </>
              )}

              {selectedTool.needsFile && !selectedTool.needsMultiple && !file && !result && (
                <>
                  <FileUploader onFileSelect={handleFileSelect} accept={selectedTool.accept} processing={processing} maxSize={selectedTool.maxSize} />
                  {error && <div className="mt-6"><Alert type="error" message={error} onClose={() => setError(null)} /></div>}
                </>
              )}

              {files.length > 0 && !result && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-900">Selected Files ({files.length})</h3>
                      <button onClick={() => setFiles([])} className="text-sm font-semibold text-red-600 hover:text-red-800">Clear All</button>
                    </div>
                    <div className="space-y-2 overflow-auto max-h-96">
                      {files.map((f, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-blue-600 rounded-full">{idx + 1}</span>
                            <div>
                              <p className="font-semibold text-gray-900">{f.name}</p>
                              <p className="text-xs text-gray-600">{(f.size / 1024).toFixed(2)} KB</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => moveFile(idx, 'up')} disabled={idx === 0} className="p-2 text-blue-600 transition-colors rounded-lg hover:bg-blue-100 disabled:opacity-30">↑</button>
                            <button onClick={() => moveFile(idx, 'down')} disabled={idx === files.length - 1} className="p-2 text-blue-600 transition-colors rounded-lg hover:bg-blue-100 disabled:opacity-30">↓</button>
                            <button onClick={() => removeFile(idx)} className="p-2 text-red-600 transition-colors rounded-lg hover:bg-red-100"><X className="w-4 h-4" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {processing && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm font-medium text-gray-700">
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing files...
                        </span>
                        <span>{progress}%</span>
                      </div>
                      <ProgressBar progress={progress} />
                    </div>
                  )}

                  {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

                  <button onClick={processFile} disabled={processing || files.length < 2} className="flex items-center justify-center w-full gap-3 py-5 text-xl font-bold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100">
                    {processing ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Combine className="w-6 h-6" />
                        <span>Merge PDFs</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {file && !result && selectedTool.id !== 'image-compress' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-6 border border-blue-200 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-white shadow-md rounded-xl">
                        <FileText className="w-10 h-10 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900">{file.name}</p>
                        <p className="mt-1 text-sm text-gray-600">{(file.size / 1024 / 1024).toFixed(2)} MB • {file.type || 'Unknown type'}</p>
                      </div>
                    </div>
                    <button onClick={() => setFile(null)} disabled={processing} className="p-2 text-red-600 transition-all rounded-lg hover:bg-red-100 disabled:opacity-50">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {selectedTool.id === 'document-summary' && (
                    <div className="p-6 border-2 border-blue-200 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50">
                      <div className="flex items-center gap-2 mb-4">
                        <Sliders className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg font-bold text-gray-900">Customize Summary</h3>
                      </div>
                      <SummaryModeSelector mode={summaryMode} onChange={setSummaryMode} />
                      <SummaryLevelSelector level={summaryLevel} onChange={setSummaryLevel} />
                    </div>
                  )}

                  {selectedTool.id === 'bg-remove' && (
                    <div className="p-6 border-2 border-blue-200 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50">
                      <div className="flex items-center gap-2 mb-4">
                        <Image className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg font-bold text-gray-900">Choose Background</h3>
                      </div>
                      <BackgroundSelector onSelect={setBgOptions} />
                    </div>
                  )}

                  {processing && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm font-medium text-gray-700">
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing your file...
                        </span>
                        <span>{progress}%</span>
                      </div>
                      <ProgressBar progress={progress} />
                    </div>
                  )}

                  {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

                  <button onClick={processFile} disabled={processing} className="flex items-center justify-center w-full gap-3 py-5 text-xl font-bold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100">
                    {processing ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-6 h-6" />
                        <span>Convert Now</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {file && !result && selectedTool.id === 'image-compress' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-6 border border-blue-200 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-white shadow-md rounded-xl">
                        <FileImage className="w-10 h-10 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900">{file.name}</p>
                        <p className="mt-1 text-sm text-gray-600">{(file.size / 1024).toFixed(2)} KB • {file.type || 'Unknown type'}</p>
                      </div>
                    </div>
                    <button onClick={() => setFile(null)} disabled={processing} className="p-2 text-red-600 transition-all rounded-lg hover:bg-red-100 disabled:opacity-50">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {processing && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm font-medium text-gray-700">
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Compressing with professional settings...
                        </span>
                        <span>{progress}%</span>
                      </div>
                      <ProgressBar progress={progress} />
                    </div>
                  )}

                  {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

                  <button onClick={processFile} disabled={processing} className="flex items-center justify-center w-full gap-3 py-5 text-xl font-bold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100">
                    {processing ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Compressing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-6 h-6" />
                        <span>Compress Image</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {result && (
                <div className="space-y-6">
                  <Alert type="success" message={result.message} />
                  
                  {result.type === 'plagiarism' && <PlagiarismResult result={result} />}
                  
                  {result.type === 'summary' && result.summary && (
                    <ProfessionalSummaryDisplay summary={result.summary} />
                  )}
                  
                  {result.type === 'transcription' && result.transcription && (
                    <div className="space-y-6">
                      <div className="p-8 border border-blue-200 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50">
                        <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-900">
                          <Mic className="w-5 h-5 text-blue-600" />
                          Transcription
                        </h3>
                        <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-wrap">{result.transcription.text}</p>
                      </div>
                      {result.transcription.statistics && (
                        <div className="grid grid-cols-3 gap-4">
                          <div className="p-4 text-center bg-white border border-gray-200 rounded-xl">
                            <p className="text-3xl font-bold text-blue-600">{result.transcription.statistics.word_count}</p>
                            <p className="mt-1 text-sm text-gray-600">Words</p>
                          </div>
                          <div className="p-4 text-center bg-white border border-gray-200 rounded-xl">
                            <p className="text-3xl font-bold text-purple-600">{result.transcription.statistics.duration}s</p>
                            <p className="mt-1 text-sm text-gray-600">Duration</p>
                          </div>
                          <div className="p-4 text-center bg-white border border-gray-200 rounded-xl">
                            <p className="text-3xl font-bold text-green-600">{result.transcription.statistics.language}</p>
                            <p className="mt-1 text-sm text-gray-600">Language</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {result.type === 'audio' && result.audioUrl && (
                    <div className="space-y-4">
                      <div className="p-8 border border-green-200 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50">
                        <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-900">
                          <Volume2 className="w-5 h-5 text-green-600" />
                          Generated Audio
                        </h3>
                        <audio controls className="w-full" src={result.audioUrl}>Your browser does not support the audio element.</audio>
                        <p className="mt-4 text-sm text-gray-600">Language: English | Format: MP3 | Size: {result.size}</p>
                      </div>
                    </div>
                  )}
                  
                  {result.type === 'image' && result.imageUrl && (
                    <div className="space-y-6">
                      {result.compressionDetails && (
                        <div className="p-6 border-2 border-blue-200 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50">
                          <h3 className="flex items-center gap-2 mb-4 text-lg font-bold text-gray-900">
                            <Settings className="w-5 h-5 text-blue-600" />
                            Compression Settings Applied
                          </h3>
                          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            <div className="p-3 text-center bg-white rounded-xl">
                              <p className="text-xs text-gray-600">Preset</p>
                              <p className="mt-1 font-bold text-blue-600 capitalize">{result.compressionDetails.preset}</p>
                            </div>
                            <div className="p-3 text-center bg-white rounded-xl">
                              <p className="text-xs text-gray-600">Format</p>
                              <p className="mt-1 font-bold text-purple-600">{result.compressionDetails.format}</p>
                            </div>
                            <div className="p-3 text-center bg-white rounded-xl">
                              <p className="text-xs text-gray-600">Target Size</p>
                              <p className="mt-1 font-bold text-green-600">{result.compressionDetails.targetSize}</p>
                            </div>
                            <div className="p-3 text-center bg-white rounded-xl">
                              <p className="text-xs text-gray-600">Dimensions</p>
                              <p className="mt-1 font-bold text-pink-600">{result.compressionDetails.dimensions}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="p-4 text-center bg-white border border-gray-200 rounded-xl">
                          <p className="text-sm text-gray-600">Original Size</p>
                          <p className="mt-2 text-2xl font-bold text-blue-600">{result.originalSize}</p>
                        </div>
                        <div className="p-4 text-center bg-white border border-gray-200 rounded-xl">
                          <p className="text-sm text-gray-600">Compressed Size</p>
                          <p className="mt-2 text-2xl font-bold text-green-600">{result.size}</p>
                        </div>
                        <div className="p-4 text-center bg-white border border-gray-200 rounded-xl">
                          <p className="text-sm text-gray-600">Space Saved</p>
                          <p className="mt-2 text-2xl font-bold text-purple-600">{result.savings}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-3">
                          <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                            <Image className="w-5 h-5" />
                            Original
                          </h3>
                          <div className="relative overflow-hidden bg-gray-100 border-2 border-gray-300 shadow-lg rounded-2xl">
                            <img src={result.originalUrl} alt="Original" className="w-full h-auto" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                            <Sparkles className="w-5 h-5 text-blue-600" />
                            Compressed
                          </h3>
                          <div className="relative overflow-hidden bg-gray-100 border-2 border-blue-500 shadow-lg rounded-2xl">
                            <img src={result.imageUrl} alt="Compressed" className="w-full h-auto" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {result.type === 'document' && (
                    <div className="p-6 border border-gray-200 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="mb-1 text-sm text-gray-600">Output file</p>
                          <p className="text-lg font-bold text-gray-900">{result.filename}</p>
                          <p className="mt-1 text-sm text-gray-500">{result.size}</p>
                        </div>
                        <FileImage className="w-8 h-8 text-gray-400" />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-4">
                    {result.blob && (
                      <button onClick={handleDownload} className="flex items-center justify-center flex-1 gap-3 py-4 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl hover:shadow-2xl hover:scale-105">
                        <Download className="w-6 h-6" />
                        <span>Download</span>
                      </button>
                    )}
                    <button onClick={resetForm} className="flex-1 py-4 text-lg font-bold text-gray-700 transition-all duration-300 bg-gray-200 rounded-2xl hover:bg-gray-300 hover:scale-105">Process Another</button>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 mt-8 border-2 border-blue-300 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-start gap-4">
                <Lock className="flex-shrink-0 w-6 h-6 mt-1 text-blue-600" />
                <div className="flex-1">
                  <p className="mb-2 text-lg font-bold text-blue-900">🚀 Python Backend Required</p>
                  <p className="mb-3 text-sm leading-relaxed text-blue-800">
                    This application requires Python Flask backend services. Services online: <span className="font-bold text-green-700">{onlineServicesCount}/{totalServicesCount}</span>
                  </p>
                  <button onClick={() => setShowAdvanced(!showAdvanced)} className="flex items-center gap-2 text-sm font-semibold text-blue-700 transition-colors hover:text-blue-900">
                    <Settings className="w-4 h-4" />
                    Setup Instructions
                    <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                  </button>
                  {showAdvanced && (
                    <div className="p-4 mt-4 text-sm bg-white border border-blue-200 rounded-xl">
                      <p className="mb-3 font-bold text-gray-900">Backend Setup:</p>
                      <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                        <li>Navigate to backend folder: <code className="px-2 py-1 text-xs bg-gray-100 rounded">cd backend</code></li>
                        <li>Install dependencies: <code className="px-2 py-1 text-xs bg-gray-100 rounded">pip install -r requirements.txt</code></li>
                        <li>Run all services: <code className="px-2 py-1 text-xs bg-gray-100 rounded">python run_all_services.py</code></li>
                        <li>Services will start on ports 5001-5012</li>
                      </ol>
                      <div className="p-3 mt-4 bg-gray-100 rounded-lg">
                        <p className="mb-2 text-xs font-bold text-gray-700">Service Status:</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {Object.entries(API_ENDPOINTS).map(([serviceName, url]) => (
                            <div key={serviceName} className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${backendStatus[serviceName] === 'online' ? 'bg-green-500' : 'bg-red-500'}`} />
                              <span className={backendStatus[serviceName] === 'online' ? 'text-green-700' : 'text-red-700'}>
                                {serviceName}: {backendStatus[serviceName] || 'checking...'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;