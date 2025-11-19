// src/Portfolio.jsx (or App.jsx)
import React, { useState, useEffect } from 'react';
import {
  BarChart3, TrendingUp, Users, Target, MapPin, AlertCircle,
  Code, Database, FileText, ChevronRight, X, LineChart, Layers,
  ArrowRight, Download, Github, ExternalLink, PieChart, Activity,
  CheckCircle2, Sparkles, ShieldAlert, Scale
} from 'lucide-react';

// ---- FIGURE IMPORTS (update paths/filenames to match your project) ----
import trendAnalysis from "./assets/images/trend-analysis.jpg";
import lostTime from "./assets/images/lost-time.jpg";
import archetypes from "./assets/images/archetypes.jpg";
import countyTrends from "./assets/images/county-trends.jpg";
import forecast from "./assets/images/forecast.jpg";
// ----------------------------------------------------------------------

// If you're using TypeScript you can add types, but keeping this JS for now
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedFinding, setSelectedFinding] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll effects and reading progress
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setIsScrolled(currentScroll > 20);
      setScrollProgress((currentScroll / scrollHeight) * 100);

      const sections = ['hero', 'overview', 'methodology', 'findings', 'impact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const findings = [
    {
      id: 'trend-analysis',
      number: '01',
      title: 'Hidden Trajectories',
      subtitle: 'The Silent Decline',
      color: 'rose',
      icon: TrendingUp,
      question: 'Which districts are truly improving vs. declining over time?',
      methodology:
        'Longitudinal linear regression (2001–2009) for 623 districts. Classified into Strong Improvers (slope ≥ +0.05), Stable, and Decliners (slope ≤ -0.05).',
      stats: [
        {
          value: '155',
          label: 'Decliners',
          subtext: '25% of districts',
          color: 'text-rose-600',
          bg: 'bg-rose-50',
          icon: TrendingUp,
        },
        {
          value: '250',
          label: 'Improvers',
          subtext: '40% of districts',
          color: 'text-emerald-600',
          bg: 'bg-emerald-50',
          icon: Activity,
        },
        {
          value: '218',
          label: 'Stable',
          subtext: '35% of districts',
          color: 'text-slate-600',
          bg: 'bg-slate-50',
          icon: Scale,
        },
      ],
      sampleData: [
        {
          lea: 'First Phila CS',
          start: '91.8%',
          end: '93.6%',
          slope: '+0.28%',
          segment: 'Improver',
        },
        {
          lea: 'Carmichaels Area SD',
          start: '91.8%',
          end: '90.6%',
          slope: '-0.18%',
          segment: 'Decliner',
        },
        {
          lea: 'Central Greene SD',
          start: '92.8%',
          end: '92.2%',
          slope: '+0.04%',
          segment: 'Stable',
        },
      ],
      explanation: {
        what: `While statewide averages remained steady (93–96%), 25% of districts experienced a “hidden decline.” High-performing districts like Carmichaels Area SD slowly eroded from 91.8% to 90.6% without triggering traditional alarms.`,
        why: 'A single-year snapshot masks directional momentum. A district at 94% trending down needs different intervention than one at 90% trending up.',
        action:
          'Implement Early Warning Systems triggered by multi-year negative slopes, not just absolute thresholds. Launch “District Attendance Improvement Plans” for “stealth decliners.”',
      },
      figure: {
        src: trendAnalysis,
        alt: 'District Attendance Trend vs Starting Rate (2001–2009)',
        caption:
          'Each point is a district; the x-axis is its starting attendance rate and the y-axis is its annual trend in percentage points per year.',
      },
    },
    {
      id: 'concentration',
      number: '02',
      title: 'The Inequality of Time',
      subtitle: 'The “Chronic 65”',
      color: 'indigo',
      icon: AlertCircle,
      question: 'Where is lost instructional time concentrated?',
      methodology:
        'Pareto analysis of aggregated “Lost Days” (ADM − ADA). Identification of “Chronic 65” districts appearing in the top decile for ≥ 3 years.',
      stats: [
        {
          value: '48.5%',
          label: 'Top 10% Impact',
          subtext: 'Share of all lost days',
          color: 'text-indigo-600',
          bg: 'bg-indigo-50',
          icon: PieChart,
        },
        {
          value: '65',
          label: 'Chronic LEAs',
          subtext: 'Persistent hotspots',
          color: 'text-rose-600',
          bg: 'bg-rose-50',
          icon: AlertCircle,
        },
        {
          value: '5',
          label: 'Counties',
          subtext: 'Primary concentration',
          color: 'text-slate-600',
          bg: 'bg-slate-50',
          icon: MapPin,
        },
      ],
      explanation: {
        what: `Absenteeism follows an extreme Pareto distribution. The top 10% of districts account for nearly half of all lost time statewide. This risk is geographically concentrated in Philadelphia, Allegheny, Montgomery, Delaware, and Bucks counties.`,
        why: 'Treating all districts equally dilutes impact. The “Chronic 65” represent nearly half the problem and require 50%+ of the resources.',
        action:
          'Establish a “Chronic 65 Task Force” with targeted grants for attendance officers and wraparound services (health, transit) in these specific hubs.',
      },
      figure: {
        src: lostTime,
        alt: 'Concentration of Lost Instructional Time (2001–2009)',
        caption:
          'Bar/line plot showing how lost instructional days are heavily concentrated in the top decile of districts.',
      },
    },
    {
      id: 'archetypes',
      number: '03',
      title: 'Behavioral Archetypes',
      subtitle: 'Stability vs. Volatility',
      color: 'violet',
      icon: Layers,
      question: 'Can we identify distinct “attendance archetypes”?',
      methodology:
        'K-means clustering (k = 2) on mean attendance, volatility (standard deviation), and trend slope. Validated with Silhouette Score = 0.73.',
      stats: [
        {
          value: '95%',
          label: 'Stable Mid-Performers',
          subtext: 'Cluster 1 (majority)',
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          icon: CheckCircle2,
        },
        {
          value: '5%',
          label: 'Volatile Low-Performers',
          subtext: 'Cluster 0 (outliers)',
          color: 'text-orange-600',
          bg: 'bg-orange-50',
          icon: Activity,
        },
        {
          value: '0.73',
          label: 'Cluster Separation',
          subtext: 'High distinctness',
          color: 'text-violet-600',
          bg: 'bg-violet-50',
          icon: Code,
        },
      ],
      explanation: {
        what: 'Districts fall into two personas. “Stable Mid-Performers” (93–95%) show consistent patterns. “Volatile Low-Performers” (often < 90%) exhibit large year-to-year swings driven by structural instability.',
        why: 'One-size-fits-all fails. Stable districts need nudges; volatile districts need operational triage (staffing, facilities, transport).',
        action:
          'Pause academic interventions for volatile districts until operations stabilize. Deploy “Stabilization Teams” to fix basics before expecting metric growth.',
      },
      figure: {
        src: archetypes,
        alt: 'District Attendance Archetypes (2001–2009)',
        caption:
          'Scatter plot of mean attendance vs. year-to-year volatility, highlighting stable mid-performers and volatile low-performers.',
      },
    },
    {
      id: 'equity',
      number: '04',
      title: 'The County Paradox',
      subtitle: 'Stagnant Geography',
      color: 'emerald',
      icon: MapPin,
      question: 'Are counties converging or diverging in attendance equity?',
      methodology:
        'Quadrant analysis of 61 counties, plotting Mean Attendance Trend vs. Inequality Trend (within-county standard deviation).',
      stats: [
        {
          value: '61',
          label: 'Counties',
          subtext: 'Statewide analysis',
          color: 'text-emerald-600',
          bg: 'bg-emerald-50',
          icon: MapPin,
        },
        {
          value: '0',
          label: 'Converging',
          subtext: 'No gap reduction',
          color: 'text-slate-600',
          bg: 'bg-slate-50',
          icon: X,
        },
        {
          value: 'Flat',
          label: 'Trendline',
          subtext: 'No regional improvement',
          color: 'text-slate-600',
          bg: 'bg-slate-50',
          icon: LineChart,
        },
      ],
      explanation: {
        what: 'Virtually no county showed systematic improvement or convergence. High-performing and low-performing districts within the same county maintained their gaps. The county is not the unit of change; the district is.',
        why: 'Broad regional policies fail because they miss hyper-local dynamics. Affluent suburbs and struggling cities in the same county did not influence each other.',
        action:
          'De-emphasize county-level funding formulas. Direct resources to specific districts regardless of their county’s overall health. Encourage intra-county mentorship.',
      },
      figure: {
        src: countyTrends,
        alt: 'Trends in Attendance by County (2001–2009)',
        caption:
          'County-level scatter of mean trend vs. inequality trend, showing no clear convergence toward equity.',
      },
    },
    {
      id: 'forecast',
      number: '05',
      title: 'The 2012 Forecast',
      subtitle: '74% Risk Exposure',
      color: 'amber',
      icon: Target,
      question:
        'Which districts are on track to meet a 95% attendance target?',
      methodology:
        'Linear time-series extrapolation projecting three years out. Classified as On Track (≥ 95%), At Risk (90–95%), or Unlikely (< 90% or declining).',
      stats: [
        {
          value: '26%',
          label: 'On Track',
          subtext: '162 LEAs',
          color: 'text-emerald-600',
          bg: 'bg-emerald-50',
          icon: CheckCircle2,
        },
        {
          value: '30%',
          label: 'At Risk',
          subtext: '183 LEAs',
          color: 'text-amber-600',
          bg: 'bg-amber-50',
          icon: AlertCircle,
        },
        {
          value: '44%',
          label: 'Unlikely',
          subtext: '272 LEAs',
          color: 'text-rose-600',
          bg: 'bg-rose-50',
          icon: ShieldAlert,
        },
      ],
      sampleData: [
        {
          lea: 'Peters Township',
          current: '95.9%',
          projected: '96.2%',
          category: 'On track',
        },
        {
          lea: 'Pittsburgh SD',
          current: '90.2%',
          projected: '91.3%',
          category: 'Unlikely',
        },
        {
          lea: 'Fort Cherry SD',
          current: '94.5%',
          projected: '94.7%',
          category: 'At risk',
        },
      ],
      explanation: {
        what: 'Without intervention, nearly three out of four districts will miss the 95% benchmark by 2012. Large urban centers (Philadelphia, Pittsburgh) fall into the “Unlikely” bucket, representing massive student volume.',
        why: 'Waiting for failure is too expensive. This forecast provides a hit list for preventative care in 2009, not 2012.',
        action:
          'Launch the “Attendance 95 Initiative”: mandatory improvement plans for “Unlikely” districts and technical-assistance toolkits for the “At Risk” middle.',
      },
      figure: {
        src: forecast,
        alt: 'Attendance Forecast 3-Year Outlook (to 2012)',
        caption:
          'Scatter plot of current vs. projected attendance, with districts colored by On Track, At Risk, and Unlikely.',
      },
    },
  ];

  // ------------- MODAL COMPONENT -------------
  const FindingModal = ({ finding, onClose }) => {
    const [activeTab, setActiveTab] = useState('insights');

    useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, []);

    const TabButton = ({ id, label, icon: Icon }) => (
      <button
        onClick={() => setActiveTab(id)}
        className={`flex items-center gap-2 px-6 py-4 font-medium transition-all border-b-2 text-sm tracking-wide ${
          activeTab === id
            ? 'border-slate-900 text-slate-900 bg-slate-50'
            : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
        }`}
      >
        <Icon className="w-4 h-4" />
        {label}
      </button>
    );

    return (
      <div
        className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="bg-slate-900 p-8 text-white flex-shrink-0 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="flex justify-between items-start gap-4 relative z-10">
              <div className="flex items-start gap-6">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl border border-white/10 shadow-xl backdrop-blur-md ${
                    finding.color === 'blue'
                      ? 'bg-blue-500/20'
                      : finding.color === 'rose'
                      ? 'bg-rose-500/20'
                      : finding.color === 'violet'
                      ? 'bg-violet-500/20'
                      : finding.color === 'emerald'
                      ? 'bg-emerald-500/20'
                      : finding.color === 'indigo'
                      ? 'bg-indigo-500/20'
                      : 'bg-amber-500/20'
                  }`}
                >
                  {finding.number}
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                    {finding.title}
                  </h2>
                  <p className="text-slate-400 text-lg">{finding.subtitle}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white/50 hover:text-white hover:bg-white/10 rounded-full p-2 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-200 bg-white flex-shrink-0 px-8">
            <TabButton
              id="insights"
              label="Analysis & Insights"
              icon={FileText}
            />
            <TabButton id="data" label="Data & Methods" icon={Database} />
            <TabButton
              id="policy"
              label="Strategic Action"
              icon={Target}
            />
          </div>

          {/* Content */}
          <div className="overflow-y-auto p-8 lg:p-10 bg-slate-50 flex-grow">
            {activeTab === 'insights' && (
              <div className="space-y-10 max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-300">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <LineChart className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg mb-3 uppercase tracking-wider text-xs">
                        Research Question
                      </h3>
                      <p className="text-xl md:text-2xl text-slate-800 font-serif leading-relaxed">
                        {finding.question}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {finding.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <div className={`text-4xl font-bold mb-2 ${stat.color}`}>
                        {stat.value}
                      </div>
                      <div className="font-bold text-slate-900 mb-1">
                        {stat.label}
                      </div>
                      <div className="text-sm text-slate-500">
                        {stat.subtext}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-blue-50/50 rounded-2xl p-8 border border-blue-100">
                    <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" /> Key Takeaway
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      {finding.explanation.what}
                    </p>
                  </div>
                  <div className="bg-slate-100/80 rounded-2xl p-8 border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5" /> Why It Matters
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      {finding.explanation.why}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'data' && (
              <div className="space-y-10 max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-300">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-3 text-lg">
                    <Code className="w-6 h-6 text-purple-600" />
                    Methodology Used
                  </h3>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-mono text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {finding.methodology}
                  </div>
                </div>

                {finding.sampleData && (
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200">
                    <div className="px-8 py-6 border-b border-slate-200 flex items-center gap-3">
                      <Database className="w-5 h-5 text-slate-400" />
                      <h3 className="font-bold text-slate-900">
                        Sample Data Preview
                      </h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-slate-50/50">
                          <tr>
                            {Object.keys(finding.sampleData[0]).map(
                              (key, idx) => (
                                <th
                                  key={idx}
                                  className="px-8 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                                >
                                  {key.replace('_', ' ')}
                                </th>
                              )
                            )}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {finding.sampleData.map((row, idx) => (
                            <tr
                              key={idx}
                              className="hover:bg-slate-50 transition-colors"
                            >
                              {Object.values(row).map((value, i) => (
                                <td
                                  key={i}
                                  className="px-8 py-4 text-sm text-slate-700 font-mono"
                                >
                                  {value}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* FIGURE IMAGE */}
                {finding.figure && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-8 py-6 border-b border-slate-200 flex items-center gap-3">
                      <BarChart3 className="w-5 h-5 text-slate-400" />
                      <h3 className="font-bold text-slate-900">
                        Visualization
                      </h3>
                    </div>
                    <div className="p-6 bg-slate-50 flex flex-col items-center">
                      <img
                        src={finding.figure.src}
                        alt={finding.figure.alt}
                        className="max-h-[420px] w-auto rounded-xl border border-slate-200 shadow-sm bg-white"
                      />
                      <p className="mt-4 text-sm text-slate-600 text-center max-w-xl">
                        {finding.figure.caption}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'policy' && (
              <div className="space-y-10 max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-300">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                  <div className="flex items-start gap-6">
                    <div className="bg-emerald-100 p-4 rounded-2xl text-emerald-700">
                      <ShieldAlert className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-2xl text-slate-900 mb-4">
                        Policy Recommendation
                      </h3>
                      <p className="text-lg text-slate-600 leading-relaxed">
                        {finding.explanation.action}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-6">
                    Implementation Steps
                  </h4>
                  <div className="space-y-6">
                    {[
                      'Identify target districts using longitudinal data (not static averages).',
                      'Allocate discretionary funding based on Pareto concentration logic.',
                      'Establish technical-assistance teams for volatile or declining districts.',
                    ].map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-400 flex-shrink-0">
                          {i + 1}
                        </div>
                        <p className="text-slate-700 pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-white border-t border-slate-200 flex-shrink-0">
            <button
              onClick={onClose}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group"
            >
              Return to Portfolio
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ---------------- MAIN PAGE ----------------
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {selectedFinding && (
        <FindingModal
          finding={selectedFinding}
          onClose={() => setSelectedFinding(null)}
        />
      )}

      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/20">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-lg md:text-xl tracking-tight block leading-none text-slate-900">
                  The Attendance Gap
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Pennsylvania 2001–09
                </span>
              </div>
            </div>
            <div className="hidden md:flex space-x-1 bg-slate-100 p-1.5 rounded-full border border-slate-200">
              {['Overview', 'Methodology', 'Findings', 'Impact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <a
              href="#"
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>Repo</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        {/* Modern Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 right-0 -z-10 opacity-40">
          <div className="w-[600px] h-[600px] bg-indigo-200 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
          <div className="w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="animate-in slide-in-from-bottom-10 duration-700 fade-in">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-8 shadow-sm">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Education Policy Analytics
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tight leading-[1.1]">
                Localized Crises in a <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                  Stable System
                </span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg font-light">
                A longitudinal analysis of{' '}
                <span className="font-semibold text-slate-900">
                  623 school districts
                </span>{' '}
                revealing hidden attendance declines and concentrated risk
                forecasts.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection('findings')}
                  className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-1 transition-all flex items-center gap-3"
                >
                  Explore Findings
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollToSection('methodology')}
                  className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-3"
                >
                  <Code className="w-5 h-5 text-slate-400" />
                  Methodology
                </button>
              </div>

              <div className="mt-16 pt-8 border-t border-slate-200/60 grid grid-cols-3 gap-8">
                {[
                  { label: 'LEAs Analyzed', value: '623' },
                  { label: 'Observations', value: '4,907' },
                  { label: 'Timespan', value: '8 Years' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-bold text-slate-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3D Floating Card Effect */}
            <div className="relative perspective-1000 hidden lg:block">
              <div className="relative transform rotate-y-12 rotate-x-6 hover:rotate-0 transition-transform duration-500 ease-out preserve-3d">
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600" />
                  <div className="grid gap-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-xl text-slate-900">
                        Statewide Risk Snapshot
                      </h3>
                      <div className="px-2 py-1 bg-slate-100 rounded text-xs font-mono text-slate-500">
                        PA_DOEd_DATA
                      </div>
                    </div>

                    {/* Mini Widgets */}
                    <div className="bg-rose-50 rounded-2xl p-5 border border-rose-100 flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-rose-500 shadow-sm">
                        <AlertCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-rose-600 font-bold text-3xl">
                          25%
                        </div>
                        <div className="text-rose-900/60 text-xs font-bold uppercase tracking-wider">
                          Districts in Decline
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-amber-500 shadow-sm">
                        <Target className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-amber-600 font-bold text-3xl">
                          74%
                        </div>
                        <div className="text-amber-900/60 text-xs font-bold uppercase tracking-wider">
                          Forecast Risk (2012)
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                      <div className="flex justify-between items-end mb-3">
                        <div>
                          <div className="text-xs font-bold text-slate-400 uppercase mb-1">
                            Inequality Concentration
                          </div>
                          <div className="font-bold text-slate-700">
                            Top 10% Drivers
                          </div>
                        </div>
                        <span className="text-2xl font-bold text-indigo-600">
                          48.5%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full rounded-full"
                          style={{ width: '48.5%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative backdrop elements */}
                <div className="absolute -z-10 top-10 -right-10 w-full h-full bg-slate-900/5 rounded-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Core Research Questions
            </h2>
            <p className="text-xl text-slate-500 font-light">
              Moving beyond aggregate averages to understand the localized
              dynamics of student attendance.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4 lg:gap-6">
            {findings.map((finding, idx) => (
              <button
                key={idx}
                onClick={() => {
                  scrollToSection('findings');
                  setSelectedFinding(finding);
                }}
                className="group relative bg-slate-50 hover:bg-white p-6 rounded-3xl border border-slate-100 hover:border-indigo-100 transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] text-left flex flex-col h-full"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-white font-bold text-lg shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3 ${
                    finding.color === 'blue'
                      ? 'bg-blue-600 shadow-blue-200'
                      : finding.color === 'rose'
                      ? 'bg-rose-600 shadow-rose-200'
                      : finding.color === 'violet'
                      ? 'bg-violet-600 shadow-violet-200'
                      : finding.color === 'emerald'
                      ? 'bg-emerald-600 shadow-emerald-200'
                      : 'bg-amber-600 shadow-amber-200'
                  }`}
                >
                  {finding.number}
                </div>
                <h3 className="font-bold text-slate-900 leading-tight mb-2 pr-2 group-hover:text-indigo-600 transition-colors">
                  {finding.title}
                </h3>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">
                  {finding.subtitle}
                </p>
                <div className="mt-auto flex items-center text-indigo-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                  View Analysis
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section
        id="methodology"
        className="py-32 bg-slate-50 border-y border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-16">
            <div className="md:col-span-4">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                The Analytical Pipeline
              </h2>
              <p className="text-slate-600 mb-10 leading-relaxed text-lg">
                A rigorous end-to-end workflow transforming raw administrative
                records into actionable policy intelligence.
              </p>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Code className="w-5 h-5 text-indigo-600" />
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Matplotlib'].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-4 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-full border border-slate-200"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="md:col-span-8 space-y-8 relative">
              <div className="absolute left-[2.25rem] top-8 bottom-8 w-0.5 bg-gradient-to-b from-indigo-500/50 to-slate-200 hidden md:block" />
              {[
                {
                  title: 'Data Engineering',
                  icon: Database,
                  desc: 'Merged eight years of Excel workbooks, standardized schemas, and constructed a longitudinal panel of 4,907 observations.',
                },
                {
                  title: 'Feature Engineering',
                  icon: Sparkles,
                  desc: 'Developed metrics for grade-mix shares, lost instructional days per student, and year-over-year volatility.',
                },
                {
                  title: 'Statistical Modeling',
                  icon: TrendingUp,
                  desc: 'Applied linear regression for trend analysis, k-means clustering for archetypes, and Pareto analysis for inequality.',
                },
                {
                  title: 'Forecasting',
                  icon: Target,
                  desc: 'Built time-series extrapolation models to project three-year risk categories (On Track, At Risk, Unlikely).',
                },
              ].map((step, i) => (
                <div key={i} className="relative pl-0 md:pl-28 group">
                  <div className="absolute left-6 top-8 w-6 h-6 rounded-full border-4 border-white bg-indigo-600 shadow-md z-10 hidden md:block group-hover:scale-125 transition-transform duration-300" />
                  <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                      <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600 w-fit">
                        <step.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-xl mb-3">
                          {step.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Findings Grid */}
      <section id="findings" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4">
              Analysis Modules
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Detailed Findings
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light">
              Select a module below to explore the visualization logic and
              underlying data.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {findings.map((finding) => (
              <button
                key={finding.id}
                onClick={() => setSelectedFinding(finding)}
                className="group bg-white rounded-[2rem] overflow-hidden border border-slate-200 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-900/10 transition-all duration-500 text-left flex flex-col h-full"
              >
                <div
                  className={`h-3 w-full ${
                    finding.color === 'blue'
                      ? 'bg-blue-500'
                      : finding.color === 'rose'
                      ? 'bg-rose-500'
                      : finding.color === 'violet'
                      ? 'bg-violet-500'
                      : finding.color === 'emerald'
                      ? 'bg-emerald-500'
                      : 'bg-amber-500'
                  }`}
                />
                <div className="p-8 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-5xl font-bold text-slate-100 group-hover:text-slate-200 transition-colors">
                      {finding.number}
                    </span>
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center ${finding.stats[0].bg} group-hover:scale-110 transition-transform duration-500`}
                    >
                      <finding.icon
                        className={`w-7 h-7 ${finding.stats[0].color}`}
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-700 transition-colors">
                    {finding.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="h-px w-8 bg-slate-200" />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {finding.subtitle}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 mb-8">
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">
                      Key Insight
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`text-2xl font-bold ${finding.stats[0].color}`}
                      >
                        {finding.stats[0].value}
                      </span>
                      <span className="text-sm text-slate-600 truncate">
                        {finding.stats[0].label}
                      </span>
                    </div>
                  </div>
                  <div className="mt-auto pt-6 border-t border-slate-100 flex items-center text-indigo-600 font-bold text-sm group-hover:gap-3 transition-all">
                    View Full Analysis
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

            {/* Impact Section */}
      <section
        id="impact"
        className="py-32 bg-slate-950 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Left column: action plan + download */}
            <div>
              <div className="inline-block px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-8">
                Action Plan
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Turning Data into <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">
                  Strategic Intervention
                </span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-10">
                Analysis is only as valuable as the action it inspires. Based on
                the clustering and risk forecasting, this portfolio outlines a
                three-tiered strategy to reverse the decline.
              </p>

              {/* Download full report button -> opens HTML report in new tab */}
              <a
                href="/report/attendance_report_no_endblock.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-slate-950 px-8 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition-colors"
              >
                <Download className="w-5 h-5" />
                Download Full Report
              </a>
            </div>

            {/* Right column: recommendations cards */}
            <div className="grid gap-6">
              {[
                {
                  title: 'Target the "Chronic 65"',
                  desc: 'Direct 50% of funding to the 65 LEAs driving nearly half of statewide lost time. Concentrated effort yields higher ROI than broad distribution.',
                  icon: Target,
                  color: 'bg-rose-500',
                },
                {
                  title: 'Stabilize Before Growth',
                  desc: 'For volatile districts, pause new academic initiatives. Prioritize operational support (transportation, staffing, facilities) to reduce variance first.',
                  icon: Layers,
                  color: 'bg-amber-500',
                },
                {
                  title: 'Decliners Early Warning',
                  desc: 'Automated triggers for the 155 districts currently passing but trending negatively. Intervene before they cross the “At Risk” threshold.',
                  icon: Activity,
                  color: 'bg-emerald-500',
                },
              ].map((rec, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-start gap-6">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${rec.color}`}
                    >
                      <rec.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-3 group-hover:text-indigo-300 transition-colors">
                        {rec.title}
                      </h4>
                      <p className="text-slate-400 leading-relaxed">
                        {rec.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <footer className="bg-slate-950 pt-12 pb-8 border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BarChart3 className="w-6 h-6 text-indigo-500" />
            <span className="font-bold text-white text-lg">
              The Attendance Gap
            </span>
          </div>
          <p className="text-slate-500 text-sm mb-8">
            Pennsylvania School Districts Analysis (2001–2009)
          </p>
          <div className="flex justify-center gap-8 mb-8">
            <a
              href="#"
              className="text-slate-400 hover:text-white transition-colors font-medium"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-white transition-colors font-medium"
            >
              Data Source
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-white transition-colors font-medium"
            >
              Contact
            </a>
          </div>
          <p className="text-slate-600 text-xs">
            Built with React, Tailwind, and Matplotlib-generated figures
          </p>
        </div>
      </footer>
    </div>
  );
}
