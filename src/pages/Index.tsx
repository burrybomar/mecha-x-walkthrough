import React, { useState } from "react";
import "./App.css";

// Import chart images
import chartC2Labels from "@/assets/c2-labels-chart.png";
import chartCISD from "@/assets/cisd-chart.png";
import chartBslSsl from "@/assets/bsl-ssl-chart.png";
import chartHtf from "@/assets/htf-chart-edge.png";
import logoGif from "@/assets/mecha-x-logo.gif";

function App() {
  const [activeSection, setActiveSection] = useState("overview");
  const [expandedConcepts, setExpandedConcepts] = useState(new Set());

  const toggleConcept = (conceptId) => {
    const newExpanded = new Set(expandedConcepts);
    if (newExpanded.has(conceptId)) {
      newExpanded.delete(conceptId);
    } else {
      newExpanded.add(conceptId);
    }
    setExpandedConcepts(newExpanded);
  };

  const sections = [
    { id: "overview", label: "Overview", badge: "Start Here" },
    { id: "htf", label: "HTF Setup", badge: "Multi-TF" },
    { id: "liquidity", label: "Liquidity Lines", badge: "BSL/SSL" },
    { id: "patterns", label: "C1→C2→C3", badge: "Core Pattern" },
    { id: "cisd", label: "CISD Zones", badge: "Momentum" },
    { id: "ifvg", label: "iFVG Patterns", badge: "Gaps" },
    { id: "smt", label: "SMT Logic", badge: "Divergence" },
    { id: "sessions", label: "Session Models", badge: "4H Models" },
    { id: "reference", label: "Quick Reference", badge: "Guides" },
  ];

  const coreConceptsData = [
    {
      id: "htf",
      icon: "📊",
      title: "HTF Candles",
      subtitle: "Higher Timeframe Analysis",
      description:
        "Multi-timeframe analysis without switching timeframes. See 4H/Daily structure while on 5min chart with intelligent HTF candle rendering on chart edges.",
      details: [
        { badge: "Auto Mode", text: "Intelligently selects HTFs based on your chart timeframe for optimal analysis." },
        { badge: "Manual Mode", text: "Custom HTF selection with configurable bars, mapping, and display options." },
        { badge: "Edge Display", text: "HTF candles rendered on chart edges showing bigger picture context." },
      ],
    },
    {
      id: "liquidity",
      icon: "💧",
      title: "Liquidity Lines",
      subtitle: "BSL/SSL Detection",
      description:
        "Buy Side Liquidity (BSL) and Sell Side Liquidity (SSL) represent areas where retail traders place their stops. Institutions hunt these levels for the liquidity they need to fill large orders.",
      details: [
        { badge: "BSL", text: "Buy Side Liquidity sits above swing highs where retail shorts place their stops." },
        { badge: "SSL", text: "Sell Side Liquidity sits below swing lows where retail longs place their stops." },
        {
          badge: "Sweep Detection",
          text: "Automated detection of liquidity sweeps with retest tracking and validation.",
        },
      ],
    },
    {
      id: "c1c2c3",
      icon: "📈",
      title: "C1→C2→C3 Sequence",
      subtitle: "Core Pattern Detection",
      description:
        "The C1→C2→C3 sequence represents the fundamental three-act structure of how institutions move markets. Automated sweep pattern identification with session-based labeling.",
      details: [
        {
          badge: "C1",
          text: "Creator Candle - The initial move that establishes a high or low. This is where institutions begin positioning.",
        },
        {
          badge: "C2",
          text: "Sweep Candle - The liquidity hunt that takes out the C1 level to grab retail stops and orders.",
        },
        {
          badge: "C3",
          text: "Confirmation Candle - The institutional response that shows the real direction they want price to move.",
        },
      ],
    },
    {
      id: "cisd",
      icon: "🔄",
      title: "CISD Momentum",
      subtitle: "Change in State of Delivery",
      description:
        "CISD zones mark where institutions change their delivery method - from accumulation to distribution or vice versa. These zones often become strong support or resistance levels.",
      details: [
        {
          badge: "Formation",
          text: "CISD forms when price creates a clear shift in market structure, often after a liquidity sweep.",
        },
        {
          badge: "Projections",
          text: "CISD projections provide logical profit targets at 1.0x, 2.0x, and 2.5x extensions.",
        },
        {
          badge: "Retest Zones",
          text: "Valid CISD zones often get retested before the major directional move begins.",
        },
      ],
    },
    {
      id: "ifvg",
      icon: "⚡",
      title: "iFVG Patterns",
      subtitle: "Inverted Fair Value Gap",
      description:
        "iFVG patterns occur when price creates a gap that gets filled in the opposite direction than expected. These represent institutional deception moves before the real directional bias.",
      details: [
        {
          badge: "Formation",
          text: "iFVG forms when a fair value gap gets filled aggressively in the opposite direction.",
        },
        {
          badge: "Signal",
          text: "This pattern often signals that institutions are positioning for a move opposite to the obvious direction.",
        },
        { badge: "Entry Zones", text: "iFVG zones provide high-probability entry areas for continuation moves." },
      ],
    },
    {
      id: "smt",
      icon: "📊",
      title: "SMT Divergence",
      subtitle: "Smart Money Technique",
      description:
        "SMT divergence detection between correlated assets reveals institutional positioning. Binary and triad correlation analysis for enhanced setup confirmation.",
      details: [
        { badge: "Binary", text: "1 primary + 1 correlated asset comparison (ES vs NQ)." },
        { badge: "Triad", text: "1 primary + 2 correlated assets for enhanced confirmation." },
        {
          badge: "Divergence",
          text: "When one asset sweeps but counterpart fails to confirm, revealing institutional intent.",
        },
      ],
    },
  ];

  const htfSetupData = [
    {
      mode: "Auto Mode",
      description: "Intelligently selects HTFs based on your chart timeframe",
      features: [
        "Automatic HTF selection based on current chart timeframe",
        "Optimal timeframe mapping for best analysis",
        "Dynamic adjustment for different trading sessions",
      ],
    },
    {
      mode: "Manual Mode",
      description: "Custom HTF selection with full control",
      features: [
        "Up to 3 custom HTF configurations",
        "Configurable bars count (1-60)",
        "Individual mapping and display options",
        "Session-based HTF analysis",
      ],
    },
  ];

  const sessionModels = [
    {
      name: "4H ASIA REVERSAL",
      timeframe: "6p→2a sweep",
      setup: "22:00 (ASIA) sweeps 18:00 (Pre-ASIA)",
      target: "London expansion 2-6am",
      entry: "LON-SB window (3-4am)",
      hours: "H1(2a) setup → H2(3a) quiet → H3(4a) delivery → H4(5a) continuation",
      description: "Bearish reversal pattern where Asia highs get swept during London open",
    },
    {
      name: "4H LONDON REVERSAL",
      timeframe: "2a→10p sweep",
      setup: "02:00 (LON) sweeps 22:00 (ASIA) = TRAP",
      target: "NY reverses London fake move",
      entry: "NYAM-SB window (10-11am)",
      hours: "Real move happens 6-10am",
      description: "Bullish reversal pattern where London lows get swept during NY open",
    },
    {
      name: "1H NYAM-SB",
      timeframe: "10-11am window",
      setup: "Optimal NY entry during 10am hour",
      target: "Session high/low",
      entry: "FVG retest + macro (10:10-10:15)",
      hours: "Most reliable 1H setup of the day",
      description: "Reversal pattern where NY AM levels get swept during NY PM session",
    },
  ];

  const workflowSteps = [
    {
      number: "1",
      title: "Assess Multi-Timeframe Structure",
      description:
        "Begin by evaluating the HTF candles to establish dominant market bias. Aligned biases across timeframes significantly increase trade probability.",
      questions: [
        "Are Weekly, Daily, and 4-Hour biases aligned?",
        "Is price above or below key HTF Equilibrium levels?",
        "Are we approaching major HTF liquidity levels?",
      ],
    },
    {
      number: "2",
      title: "Identify Actionable Liquidity Sweeps",
      description:
        "Scan for the most recent, valid liquidity sweeps on both higher and lower timeframes. Focus on active, unbroken patterns.",
      questions: [
        "Where are the most recent unbroken BSL and SSL levels?",
        "Is there confluence where HTF and LTF sweeps align?",
        "Are the sweep lines solid (active) or faded (invalidated)?",
      ],
    },
    {
      number: "3",
      title: "Analyze C1-C2-C3 Context",
      description: "Locate active C2 patterns and evaluate C3 candle behavior to confirm institutional intent.",
      questions: [
        "What session pattern is the C2 label indicating?",
        "Is the C3 candle respecting its Expectation Zone?",
        "Are C2 patterns aligned across multiple timeframes?",
      ],
    },
    {
      number: "4",
      title: "Verify CISD and iFVG Confluence",
      description: "Check for CISD or iFVG zones that support the direction of the identified sweep.",
      questions: [
        "Is there a CISD zone supporting the reversal direction?",
        "Have iFVGs formed that align with the setup?",
        "What are the calculated CISD projection targets?",
      ],
    },
    {
      number: "5",
      title: "Confirm with SMT Divergence",
      description:
        "When one asset sweeps liquidity but its counterpart fails to confirm, divergence reveals institutional positioning.",
      questions: [
        "Does the C2 sweep show SMT+ or SMT- indicator?",
        "If divergence is present, has synchronized rejection occurred?",
        "Is this confirming an Elite Setup?",
      ],
    },
    {
      number: "6",
      title: "Validate Session & Weekly Timing",
      description: "Cross-reference the setup with current session and day of week to assess temporal probability.",
      questions: [
        "Are we in the correct session for the expansion move?",
        "Is it Tuesday or Wednesday (higher reversal probability)?",
        "How does the day of week affect setup probability?",
      ],
    },
  ];

  const sessionPatterns = [
    {
      name: "Asia Reversal",
      reversal: "6:00 PM or 10:00 PM (NY Time)",
      expansion: "London Session (2 AM - 6 AM)",
      description: "Bearish reversal pattern where Asia highs get swept during London open",
      example: "C2 10p→2a H",
    },
    {
      name: "London Reversal",
      reversal: "2:00 AM (NY Time)",
      expansion: "New York AM (6 AM - 10 AM)",
      description: "Bullish reversal pattern where London lows get swept during NY open",
      example: "C2 2a→6a L",
    },
    {
      name: "NY Reversal",
      reversal: "6:00 AM or 10:00 AM (NY Time)",
      expansion: "New York PM (2 PM onward)",
      description: "Reversal pattern where NY AM levels get swept during NY PM session",
      example: "C2 6a→10a H",
    },
  ];

  const confluenceLevels = [
    {
      level: "Maximum Confluence",
      size: "Full Position Size",
      conditions: [
        "All HTF biases aligned",
        "Multiple C2 patterns confirm same level",
        "Both CISD and iFVG zones support",
        "SMT divergence present",
        "Correct session timing",
        "High-probability day (Tue/Wed)",
      ],
    },
    {
      level: "Moderate Confluence",
      size: "Half Position Size",
      conditions: [
        "Most factors align but not all",
        "Two of three HTF biases agree",
        "Single C2 pattern present",
        "One confluence factor (CISD or iFVG)",
        "SMT may be absent",
        "Valid but requires caution",
      ],
    },
    {
      level: "Minimal Confluence",
      size: "Quarter Position or No Trade",
      conditions: [
        "Significant conflicts exist",
        "HTF biases are mixed",
        "No clear C2 pattern",
        "Confluence zones absent",
        "Inappropriate session timing",
        "Low probability setup",
      ],
    },
  ];

  const riskProtocols = [
    {
      component: "BSL/SSL Lines",
      application: "Stop Placement",
      protocol:
        "Place initial stop-loss just beyond swept BSL (shorts) or SSL (longs). This defines the liquidity target point.",
    },
    {
      component: "C2 Equilibrium",
      application: "Invalidation Level",
      protocol:
        "If price closes back across C2 EQ against trade direction, setup is invalidated. Consider exiting position.",
    },
    {
      component: "C3 Expectation Zone",
      application: "Early Warning",
      protocol: "If C3 breaks expectation zone immediately, signals pattern failure. Reduce size or tighten stops.",
    },
    {
      component: "CISD Projections",
      application: "Profit Targets",
      protocol: "Use 1.0x, 2.0x, and 2.5x CISD levels as logical zones for partial profits and trade management.",
    },
  ];

  const indicatorGuide = [
    {
      category: "Liquidity Lines",
      icon: "📏",
      items: [
        {
          badge: "BSL",
          badgeClass: "line-badge bsl",
          title: "Buy Side Liquidity",
          description:
            "Blue horizontal lines above swing highs. These mark where retail short sellers place their stop losses. Institutions hunt these levels for liquidity.",
        },
        {
          badge: "SSL",
          badgeClass: "line-badge ssl",
          title: "Sell Side Liquidity",
          description:
            "Red horizontal lines below swing lows. These mark where retail long traders place their stop losses. Prime targets for institutional sweeps.",
        },
        {
          badge: "EQ",
          badgeClass: "line-badge eq",
          title: "Equilibrium Lines",
          description:
            "Purple lines showing the midpoint of ranges. These represent fair value areas and often act as support/resistance after sweeps.",
        },
      ],
    },
    {
      category: "Pattern Labels",
      icon: "🏷️",
      items: [
        {
          badge: "C1",
          badgeClass: "pattern-badge c1",
          title: "Creator Candle",
          description:
            "Green labels marking the initial swing high or low. This is where the institutional positioning begins.",
        },
        {
          badge: "C2",
          badgeClass: "pattern-badge c2",
          title: "Sweep Candle",
          description:
            'Red labels showing liquidity sweeps. Format: "C2 10p→2a H" means high formed at 10pm, swept at 2am.',
        },
        {
          badge: "C3",
          badgeClass: "pattern-badge c3",
          title: "Confirmation Candle",
          description:
            "Yellow labels indicating institutional response. Shows the real direction institutions want price to move.",
        },
      ],
    },
    {
      category: "SMT Indicators",
      icon: "📊",
      items: [
        {
          badge: "SMT",
          badgeClass: "smt-badge smt",
          title: "Smart Money Technique",
          description:
            "Orange indicators showing when correlated assets diverge. SMT+ means bullish divergence, SMT- means bearish divergence.",
        },
        {
          badge: "DIV",
          badgeClass: "smt-badge divergence",
          title: "Divergence Confirmation",
          description:
            "Purple indicators confirming when divergence leads to synchronized rejection across correlated pairs.",
        },
      ],
    },
    {
      category: "Trading Zones",
      icon: "🎯",
      items: [
        {
          badge: "CISD",
          badgeClass: "zone-badge cisd",
          title: "Change in State of Delivery",
          description:
            "Green shaded zones marking where institutions change from accumulation to distribution or vice versa.",
        },
        {
          badge: "iFVG",
          badgeClass: "zone-badge ifvg",
          title: "Inverted Fair Value Gap",
          description:
            "Blue shaded zones showing gaps that get filled opposite to expectation. High-probability reversal areas.",
        },
        {
          badge: "OB",
          badgeClass: "zone-badge ob",
          title: "Order Blocks",
          description:
            "Dark green zones marking the last opposite candle before a strong move. Institutional order placement areas.",
        },
      ],
    },
  ];

  const readingSteps = [
    {
      number: "1",
      title: "Start with HTF Bias",
      description:
        "Look at the rendered HTF candles first. Are Weekly, Daily, and 4H all showing the same bias? This gives you the institutional direction.",
    },
    {
      number: "2",
      title: "Identify Active Sweeps",
      description:
        "Find solid BSL/SSL lines (not faded ones). These are unbroken liquidity levels that institutions may target next.",
    },
    {
      number: "3",
      title: "Read C2 Labels",
      description:
        'C2 labels tell the complete story: "C2 10p→2a H" means a high formed at 10pm was swept at 2am (Asia Reversal pattern).',
    },
    {
      number: "4",
      title: "Check Confluence Zones",
      description:
        "Look for CISD or iFVG zones that align with your sweep direction. Multiple factors at the same level increase probability.",
    },
    {
      number: "5",
      title: "Verify Session Timing",
      description:
        "Make sure you're in the right session for the expected expansion. Don't trade Asia Reversal during NY PM session.",
    },
    {
      number: "6",
      title: "Assess SMT Divergence",
      description:
        "SMT indicators show when correlated assets diverge. This reveals institutional positioning and confirms Elite Setups.",
    },
  ];

  const renderOverview = () => (
    <div className="content-section">
      <div className="hero-section">
        <img src={logoGif} alt="OxQQQ Logo" className="hero-logo" />
        <h1 className="section-title">MECHA-X Educational Guide</h1>
        <p className="section-description">
          Multi-timeframe analysis without switching timeframes. A comprehensive educational resource for understanding
          the MECHA-X trading framework with HTF candles, liquidity detection, C1→C2→C3 patterns, CISD zones, iFVG
          patterns, and SMT divergence logic.
        </p>
      </div>

      <div className="concepts-grid">
        {coreConceptsData.map((concept) => (
          <div
            key={concept.id}
            className={`concept-card ${expandedConcepts.has(concept.id) ? "expanded" : ""}`}
            onClick={() => toggleConcept(concept.id)}
          >
            <div className="concept-header">
              <div className="concept-icon">{concept.icon}</div>
              <div className="concept-text">
                <h3 className="concept-title">{concept.title}</h3>
                <p className="concept-subtitle">{concept.subtitle}</p>
              </div>
              <div className={`expand-arrow ${expandedConcepts.has(concept.id) ? "rotated" : ""}`}>▶</div>
            </div>
            {expandedConcepts.has(concept.id) && (
              <div className="concept-details">
                <p className="concept-description">{concept.description}</p>
                <div className="concept-extra-details">
                  {concept.details.map((detail, index) => (
                    <div key={index} className="detail-item">
                      <span className="detail-badge">{detail.badge}</span>
                      <span className="detail-text">{detail.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="author-section">
        <h2 className="author-title">About This Framework</h2>
        <div className="author-content">
          <div className="author-info">
            <p>
              The MECHA-X framework was developed by <strong>OxQ</strong> to systematically identify and trade
              institutional market patterns. This educational guide explains every component of the system in clear,
              simple terms.
            </p>
          </div>
          <hr className="author-separator" />
          <div className="acknowledgments">
            <p>
              <strong>Concepts learned from:</strong>
            </p>
            <p>ICT (Inner Circle Trader), TTrades, GxT, ElevenTrades, Afyz, AMtrades</p>
            <p className="disclaimer">
              This is an educational resource explaining trading concepts and indicators. It is not financial advice or
              a trading course.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHTF = () => (
    <div className="content-section">
      <div className="section-header">
        <h1 className="section-title">HTF Setup Configuration</h1>
        <p className="section-description">
          Multi-timeframe analysis without switching timeframes. Configure Higher Timeframe candles to see 4H/Daily
          structure while on 5min chart with intelligent edge rendering.
        </p>
      </div>

      <div className="charts-grid">
        <div className="clean-chart-container">
          <div className="chart-wrapper">
            <img src={chartHtf} alt="HTF Candles on Chart Edge" className="clean-chart-image" />
          </div>
          <div className="chart-info">
            <h3 className="chart-title">HTF Candles on Chart Edge</h3>
            <p className="chart-description">
              Small candlesticks on right edge showing bigger picture context without switching timeframes. Green fill =
              bull bias, Black fill = bear bias.
            </p>
          </div>
        </div>

        <div className="concept-explanation">
          <h3 className="explanation-title">HTF Configuration Modes</h3>
          <div className="step-list">
            {htfSetupData.map((mode, index) => (
              <div key={index} className="step-item">
                <span className="step-badge">{mode.mode}</span>
                <div className="step-content">
                  <h4>{mode.description}</h4>
                  <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                    {mode.features.map((feature, i) => (
                      <li key={i} style={{ marginBottom: "0.25rem", fontSize: "0.875rem" }}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr className="section-separator" />

      <div className="concept-explanation">
        <h3 className="explanation-title">HTF Input Parameters</h3>
        <div className="step-list">
          <div className="step-item">
            <span className="step-badge">Mode</span>
            <div className="step-content">
              <h4>Auto vs Manual</h4>
              <p>Auto intelligently selects HTFs based on your chart timeframe. Manual allows custom configuration.</p>
            </div>
          </div>
          <div className="step-item">
            <span className="step-badge">Timeframes</span>
            <div className="step-content">
              <h4>TF 1, TF 2, TF 3</h4>
              <p>Up to 3 HTF configurations with individual show/hide, timeframe, bars count, and mapping options.</p>
            </div>
          </div>
          <div className="step-item">
            <span className="step-badge">Bars</span>
            <div className="step-content">
              <h4>Bar Count (1-60)</h4>
              <p>Number of HTF bars to display on chart edge for optimal analysis without clutter.</p>
            </div>
          </div>
          <div className="step-item">
            <span className="step-badge">Map</span>
            <div className="step-content">
              <h4>Mapping Options</h4>
              <p>Enable/disable HTF mapping to current chart for enhanced multi-timeframe analysis.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLiquidity = () => (
    <div className="content-section">
      <div className="section-header">
        <h1 className="section-title">Liquidity Lines (BSL/SSL)</h1>
        <p className="section-description">
          Buy Side Liquidity (BSL) and Sell Side Liquidity (SSL) detection with automated sweep tracking. These lines
          mark where retail traders place stops - prime targets for institutional liquidity hunts.
        </p>
      </div>

      <div className="charts-grid">
        <div className="clean-chart-container">
          <div className="chart-wrapper">
            <img src={chartBslSsl} alt="Liquidity Sweep" className="clean-chart-image" />
          </div>
          <div className="chart-info">
            <h3 className="chart-title">BSL/SSL Liquidity Lines</h3>
            <p className="chart-description">
              Horizontal lines at highs/lows marking liquidity zones institutions target. BSL above highs, SSL below
              lows with automated sweep detection.
            </p>
          </div>
        </div>

        <div className="concept-explanation">
          <h3 className="explanation-title">Liquidity Line Types</h3>
          <div className="step-list">
            <div className="step-item">
              <span className="step-badge bsl-badge">BSL</span>
              <div className="step-content">
                <h4>Buy Side Liquidity</h4>
                <p>
                  Blue horizontal lines above swing highs where retail shorts place stops. Institutions sweep these for
                  liquidity.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge ssl-badge">SSL</span>
              <div className="step-content">
                <h4>Sell Side Liquidity</h4>
                <p>
                  Red horizontal lines below swing lows where retail longs place stops. Prime targets for institutional
                  sweeps.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge sweep-action">Sweep</span>
              <div className="step-content">
                <h4>Liquidity Hunt</h4>
                <p>
                  Quick move to take out the liquidity level, then reversal in the intended institutional direction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="section-separator" />

      <div className="concept-explanation">
        <h3 className="explanation-title">Liquidity Configuration</h3>
        <div className="step-list">
          <div className="step-item">
            <span className="step-badge">Detection</span>
            <div className="step-content">
              <h4>Automated Detection</h4>
              <p>Pivot-based liquidity identification with configurable lookback periods and validation criteria.</p>
            </div>
          </div>
          <div className="step-item">
            <span className="step-badge">Sweep Tracking</span>
            <div className="step-content">
              <h4>Sweep Validation</h4>
              <p>Real-time tracking of liquidity sweeps with retest confirmation and invalidation signals.</p>
            </div>
          </div>
          <div className="step-item">
            <span className="step-badge">Session Based</span>
            <div className="step-content">
              <h4>Session Analysis</h4>
              <p>Liquidity lines mapped to specific sessions for enhanced pattern recognition and timing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPatterns = () => (
    <div className="content-section">
      <div className="section-header">
        <h1 className="section-title">C1→C2→C3 Pattern Detection</h1>
        <p className="section-description">
          The foundation of every MECHA-X setup. Automated detection of the three-act market structure with
          session-based labeling and validation criteria.
        </p>
      </div>

      <div className="charts-grid">
        <div className="clean-chart-container">
          <div className="chart-wrapper">
            <img src={chartC2Labels} alt="C1→C2→C3 Sequence" className="clean-chart-image" />
          </div>
          <div className="chart-info">
            <h3 className="chart-title">C1→C2→C3 Sequence</h3>
            <p className="chart-description">
              The three-act structure: Creator candle establishes level, Sweep candle hunts liquidity, Confirmation
              candle shows institutional direction.
            </p>
          </div>
        </div>

        <div className="concept-explanation">
          <h3 className="explanation-title">Understanding C1→C2→C3</h3>
          <div className="step-list">
            <div className="step-item">
              <span className="step-badge">C1</span>
              <div className="step-content">
                <h4>Creator Candle</h4>
                <p>
                  The initial swing high or low where institutions begin positioning. This sets up the liquidity target.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge">C2</span>
              <div className="step-content">
                <h4>Sweep Candle</h4>
                <p>
                  The liquidity hunt that takes out the C1 level to grab retail stops and fill institutional orders.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge">C3</span>
              <div className="step-content">
                <h4>Confirmation Candle</h4>
                <p>The institutional response showing the real direction they want price to move after the sweep.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="section-separator" />

      <div className="charts-grid">
        <div className="clean-chart-container">
          <div className="chart-wrapper">
            <img src={chartCISD} alt="CISD Formation" className="clean-chart-image" />
          </div>
          <div className="chart-info">
            <h3 className="chart-title">CISD Formation</h3>
            <p className="chart-description">
              Change in State of Delivery zones mark where institutions shift from accumulation to distribution,
              creating strong support/resistance levels.
            </p>
          </div>
        </div>

        <div className="concept-explanation">
          <h3 className="explanation-title">Reading CISD Zones</h3>
          <div className="step-list">
            <div className="step-item">
              <span className="step-badge">Formation</span>
              <div className="step-content">
                <h4>Zone Creation</h4>
                <p>CISD forms when price creates a clear shift in market structure, often after a liquidity sweep.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge">Targets</span>
              <div className="step-content">
                <h4>Projection Levels</h4>
                <p>CISD provides logical profit targets at 1.0x, 2.0x, and 2.5x extensions from the zone.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge">Retest</span>
              <div className="step-content">
                <h4>Validation</h4>
                <p>Valid CISD zones often get retested before the major directional move begins.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="section-separator" />

      <div className="charts-grid">
        <div className="clean-chart-container">
          <div className="chart-wrapper">
            <img src={chartBslSsl} alt="Liquidity Sweep" className="clean-chart-image" />
          </div>
          <div className="chart-info">
            <h3 className="chart-title">Liquidity Sweeps</h3>
            <p className="chart-description">
              BSL and SSL lines mark where retail traders place stops. Institutions hunt these levels for the liquidity
              needed to fill large orders.
            </p>
          </div>
        </div>

        <div className="concept-explanation">
          <h3 className="explanation-title">Liquidity Hunt Process</h3>
          <div className="step-list">
            <div className="step-item">
              <span className="step-badge bsl-badge">BSL</span>
              <div className="step-content">
                <h4>Buy Side Liquidity</h4>
                <p>
                  Blue lines above swing highs where retail shorts place stops. Institutions sweep these for liquidity.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge ssl-badge">SSL</span>
              <div className="step-content">
                <h4>Sell Side Liquidity</h4>
                <p>
                  Red lines below swing lows where retail longs place stops. Prime targets for institutional sweeps.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge sweep-action">Sweep</span>
              <div className="step-content">
                <h4>Hunt Action</h4>
                <p>
                  Quick move to take out the liquidity level, then reversal in the intended institutional direction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="section-separator" />

      <div className="charts-grid">
        <div className="clean-chart-container">
          <div className="chart-wrapper">
            <img src={chartCISD} alt="iFVG Pattern" className="clean-chart-image" />
          </div>
          <div className="chart-info">
            <h3 className="chart-title">iFVG Pattern</h3>
            <p className="chart-description">
              Inverted Fair Value Gaps occur when price fills a gap opposite to expectation, revealing institutional
              deception before the real move.
            </p>
          </div>
        </div>

        <div className="concept-explanation">
          <h3 className="explanation-title">iFVG Mechanics</h3>
          <div className="step-list">
            <div className="step-item">
              <span className="step-badge what-is-ifvg">Formation</span>
              <div className="step-content">
                <h4>Gap Creation</h4>
                <p>
                  iFVG forms when a fair value gap gets filled aggressively in the opposite direction than expected.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge formation">Signal</span>
              <div className="step-content">
                <h4>Institutional Intent</h4>
                <p>This pattern signals institutions are positioning for a move opposite to the obvious direction.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge retest">Entry</span>
              <div className="step-content">
                <h4>Trading Zone</h4>
                <p>iFVG zones provide high-probability entry areas for continuation moves in the real direction.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWorkflow = () => (
    <div className="content-section">
      <div className="section-header">
        <h1 className="section-title">Six-Step Analysis Workflow</h1>
        <p className="section-description">
          A systematic approach to analyzing markets using the MECHA-X framework. This workflow replaces emotional
          decision-making with objective, repeatable criteria for identifying high-probability setups.
        </p>
      </div>

      <div className="reading-guide">
        <h2 className="guide-title">Systematic Analysis Process</h2>
        <div className="reading-steps">
          {workflowSteps.map((step) => (
            <div key={step.number} className="reading-step">
              <div className="step-number">{step.number}</div>
              <div className="step-description">
                <h4>{step.title}</h4>
                <p>{step.description}</p>
                <div style={{ marginTop: "1rem" }}>
                  <strong>Critical Questions:</strong>
                  <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                    {step.questions.map((question, index) => (
                      <li key={index} style={{ marginBottom: "0.25rem", fontSize: "0.875rem" }}>
                        {question}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <h2 className="section-title" style={{ fontSize: "1.75rem", marginBottom: "1.5rem" }}>
          Why This Workflow Matters
        </h2>
        <div className="concept-explanation">
          <div className="step-list">
            <div className="step-item">
              <span className="step-badge">Systematic</span>
              <div className="step-content">
                <h4>Removes Emotion</h4>
                <p>
                  Following the same process every time eliminates emotional decision-making and ensures consistency.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge">Hierarchical</span>
              <div className="step-content">
                <h4>Top-Down Analysis</h4>
                <p>
                  Starting with HTF structure and working down ensures you're trading with institutional bias, not
                  against it.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge">Confluence</span>
              <div className="step-content">
                <h4>Multiple Confirmations</h4>
                <p>Each step adds another layer of confirmation, increasing the probability of successful trades.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCISD = () => (
    <div className="content-section">
      <div className="section-header">
        <h1 className="section-title">CISD Momentum Zones</h1>
        <p className="section-description">
          Change in State of Delivery zones mark where institutions change their delivery method. These zones often
          become strong support or resistance levels with projection targets.
        </p>
      </div>

      <div className="charts-grid">
        <div className="clean-chart-container">
          <div className="chart-wrapper">
            <img src={chartCISD} alt="CISD Formation" className="clean-chart-image" />
          </div>
          <div className="chart-info">
            <h3 className="chart-title">CISD Formation</h3>
            <p className="chart-description">
              Horizontal line + shaded zone marking momentum shift confirmation. Line = open level, Zone = to
              equilibrium with projection targets.
            </p>
          </div>
        </div>

        <div className="concept-explanation">
          <h3 className="explanation-title">CISD Components</h3>
          <div className="step-list">
            <div className="step-item">
              <span className="step-badge">Formation</span>
              <div className="step-content">
                <h4>Zone Creation</h4>
                <p>CISD forms when price creates a clear shift in market structure, often after a liquidity sweep.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge">Projections</span>
              <div className="step-content">
                <h4>Target Levels</h4>
                <p>CISD provides logical profit targets at 1.0x, 2.0x, and 2.5x extensions from the zone.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge">Retest</span>
              <div className="step-content">
                <h4>Validation</h4>
                <p>Valid CISD zones often get retested before the major directional move begins.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderiFVG = () => (
    <div className="content-section">
      <div className="section-header">
        <h1 className="section-title">iFVG Patterns</h1>
        <p className="section-description">
          Inverted Fair Value Gaps occur when price creates a gap that gets filled in the opposite direction than
          expected. These represent institutional deception moves before the real directional bias.
        </p>
      </div>

      <div className="charts-grid">
        <div className="clean-chart-container">
          <div className="chart-wrapper">
            <img src={chartCISD} alt="iFVG Pattern" className="clean-chart-image" />
          </div>
          <div className="chart-info">
            <h3 className="chart-title">iFVG Pattern</h3>
            <p className="chart-description">
              Shaded rectangles with borders showing imbalance areas after sweep. Solid top, dotted bottom, thick right
              border for easy identification.
            </p>
          </div>
        </div>

        <div className="concept-explanation">
          <h3 className="explanation-title">iFVG Mechanics</h3>
          <div className="step-list">
            <div className="step-item">
              <span className="step-badge what-is-ifvg">Formation</span>
              <div className="step-content">
                <h4>Gap Creation</h4>
                <p>
                  iFVG forms when a fair value gap gets filled aggressively in the opposite direction than expected.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge formation">Signal</span>
              <div className="step-content">
                <h4>Institutional Intent</h4>
                <p>This pattern signals institutions are positioning for a move opposite to the obvious direction.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge retest">Entry</span>
              <div className="step-content">
                <h4>Trading Zone</h4>
                <p>iFVG zones provide high-probability entry areas for continuation moves in the real direction.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSMT = () => (
    <div className="content-section">
      <div className="section-header">
        <h1 className="section-title">SMT Divergence Logic</h1>
        <p className="section-description">
          Smart Money Technique divergence detection between correlated assets reveals institutional positioning. Binary
          and triad correlation analysis for enhanced setup confirmation.
        </p>
      </div>

      <div className="concept-explanation">
        <h3 className="explanation-title">SMT Detection Modes</h3>
        <div className="step-list">
          <div className="step-item">
            <span className="step-badge">Binary</span>
            <div className="step-content">
              <h4>1 Primary + 1 Correlated</h4>
              <p>
                ES vs NQ comparison. PSP (Precision Swing Point) detection when one asset sweeps but counterpart fails
                to confirm.
              </p>
            </div>
          </div>
          <div className="step-item">
            <span className="step-badge">Triad</span>
            <div className="step-content">
              <h4>1 Primary + 2 Correlated</h4>
              <p>
                ES vs NQ + YM comparison. CIC (Correlated Intermarket Convergence) for enhanced confirmation signals.
              </p>
            </div>
          </div>
          <div className="step-item">
            <span className="step-badge">Divergence</span>
            <div className="step-content">
              <h4>Structural Comparison</h4>
              <p>
                Each asset compared to ITS OWN previous bar (not cross-asset price comparison) for accurate divergence
                detection.
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr className="section-separator" />

      <div className="concept-explanation">
        <h3 className="explanation-title">SMT Signal Types</h3>
        <div className="step-list">
          <div className="step-item">
            <span className="step-badge">PSP-REV</span>
            <div className="step-content">
              <h4>Reversal PSP</h4>
              <p>
                🔴🔴🔴 STRONG - Primary swept + closed inside + correlated failed + closed opposite. Bias confirms
                reversal.
              </p>
            </div>
          </div>
          <div className="step-item">
            <span className="step-badge">PSP-CONT</span>
            <div className="step-content">
              <h4>Conflict PSP</h4>
              <p>🟡 WEAK - Divergence present but bias conflicts. Primary closed outside (continuation).</p>
            </div>
          </div>
          <div className="step-item">
            <span className="step-badge">CIC-REV</span>
            <div className="step-content">
              <h4>2-Stage Reversal</h4>
              <p>🔴🔴🔴 STRONG - 2 assets diverged + bias confirms. Full triad reversal confirmation.</p>
            </div>
          </div>
          <div className="step-item">
            <span className="step-badge">CIC-PARTIAL</span>
            <div className="step-content">
              <h4>Partial Divergence</h4>
              <p>🟡 MONITOR - Only 1 of 2 correlated failed. Other asset still aligned.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSessions = () => (
    <div className="content-section">
      <div className="section-header">
        <h1 className="section-title">4H Session Models</h1>
        <p className="section-description">
          Time-based institutional patterns with 4-layer framework analysis. Session-specific setups with optimal entry
          windows and expansion targets.
        </p>
      </div>

      <div className="concept-explanation">
        <h3 className="explanation-title">4-Layer Framework</h3>
        <div className="step-list">
          <div className="step-item">
            <span className="step-badge">1</span>
            <div className="step-content">
              <h4>Directional Thesis</h4>
              <p>4H structure + session model alignment for directional bias confirmation.</p>
            </div>
          </div>
          <div className="step-item">
            <span className="step-badge">2</span>
            <div className="step-content">
              <h4>Timing Windows</h4>
              <p>Silver Bullet + Macro windows for optimal entry timing and session alignment.</p>
            </div>
          </div>
          <div className="step-item">
            <span className="step-badge">3</span>
            <div className="step-content">
              <h4>Pattern Confirmation</h4>
              <p>1H micro profiling (H1-H4) for detailed pattern validation and progression.</p>
            </div>
          </div>
          <div className="step-item">
            <span className="step-badge">4</span>
            <div className="step-content">
              <h4>Entry Precision</h4>
              <p>Macro window + FVG retest for precise entry execution and risk management.</p>
            </div>
          </div>
        </div>
      </div>

      <hr className="section-separator" />

      <div className="indicators-grid">
        {sessionModels.map((model, index) => (
          <div key={index} className="indicator-card">
            <div style={{ padding: "1.5rem" }}>
              <h3 className="indicator-title">
                <span className="indicator-icon">⏰</span>
                {model.name}
              </h3>
              <div className="indicator-content">
                <div className="indicator-list">
                  <div className="indicator-item">
                    <span className="line-badge bsl">Timeframe</span>
                    <div className="indicator-description">
                      <h4>{model.timeframe}</h4>
                      <p>Sweep pattern timing</p>
                    </div>
                  </div>
                  <div className="indicator-item">
                    <span className="line-badge ssl">Setup</span>
                    <div className="indicator-description">
                      <h4>{model.setup}</h4>
                      <p>Pattern formation criteria</p>
                    </div>
                  </div>
                  <div className="indicator-item">
                    <span className="line-badge eq">Target</span>
                    <div className="indicator-description">
                      <h4>{model.target}</h4>
                      <p>Expected expansion session</p>
                    </div>
                  </div>
                  <div className="indicator-item">
                    <span className="zone-badge cisd">Entry</span>
                    <div className="indicator-description">
                      <h4>{model.entry}</h4>
                      <p>Optimal entry window</p>
                    </div>
                  </div>
                  <div className="indicator-item">
                    <span className="zone-badge ifvg">Hours</span>
                    <div className="indicator-description">
                      <h4>{model.hours}</h4>
                      <p>Hourly progression pattern</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "3rem" }}>
        <h2 className="section-title" style={{ fontSize: "1.75rem", marginBottom: "1.5rem" }}>
          Futures Trading Times
        </h2>
        <div className="concept-explanation">
          <div className="step-list">
            <div className="step-item">
              <span className="step-badge">6p-10p</span>
              <div className="step-content">
                <h4>Pre-Asia Session</h4>
                <p>Range establishment and liquidity level creation for Asia session.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge">10p-2a</span>
              <div className="step-content">
                <h4>Asia Session</h4>
                <p>Consolidation phase with occasional breakout attempts.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge">2a-6a</span>
              <div className="step-content">
                <h4>London Session</h4>
                <p>High volatility with liquidity sweeps and initial directional bias.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge">6a-10a</span>
              <div className="step-content">
                <h4>NY AM Session</h4>
                <p>Continuation or reversal of London bias with major expansion moves.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge">10a-2p</span>
              <div className="step-content">
                <h4>NY PM Session</h4>
                <p>Final directional moves and weekly high/low hunts.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge">2p-4p</span>
              <div className="step-content">
                <h4>Close Session</h4>
                <p>2H close with potential late-day reversals and position adjustments.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTimeFramework = () => (
    <div className="content-section">
      <div className="section-header">
        <h1 className="section-title">Time-Based Framework</h1>
        <p className="section-description">
          Understanding session patterns and weekly timing is crucial for the MECHA-X system. Different sessions have
          different personalities, and timing your trades correctly can mean the difference between catching the
          expansion or missing it entirely.
        </p>
      </div>

      <div className="indicators-grid">
        <div className="indicator-card">
          <div style={{ padding: "1.5rem" }}>
            <h3 className="indicator-title">
              <span className="indicator-icon">🌏</span>
              Asia Session (6PM - 2AM NY)
            </h3>
            <div className="indicator-content">
              <div className="indicator-list">
                <div className="indicator-item">
                  <span className="zone-badge cisd">Range</span>
                  <div className="indicator-description">
                    <h4>Consolidation Phase</h4>
                    <p>
                      Asia typically creates ranges and establishes highs/lows that become liquidity targets for London.
                    </p>
                  </div>
                </div>
                <div className="indicator-item">
                  <span className="zone-badge ifvg">Setup</span>
                  <div className="indicator-description">
                    <h4>Reversal Preparation</h4>
                    <p>Asia Reversal patterns form when 6PM or 10PM highs get swept during the London open at 2AM.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="indicator-card">
          <div style={{ padding: "1.5rem" }}>
            <h3 className="indicator-title">
              <span className="indicator-icon">🇬🇧</span>
              London Session (2AM - 6AM NY)
            </h3>
            <div className="indicator-content">
              <div className="indicator-list">
                <div className="indicator-item">
                  <span className="zone-badge cisd">Sweep</span>
                  <div className="indicator-description">
                    <h4>Liquidity Hunt</h4>
                    <p>
                      London opens with high volatility, often sweeping Asia highs/lows for liquidity before reversing.
                    </p>
                  </div>
                </div>
                <div className="indicator-item">
                  <span className="zone-badge ifvg">Expansion</span>
                  <div className="indicator-description">
                    <h4>Directional Moves</h4>
                    <p>After sweeping Asia levels, London often creates the initial directional bias for the day.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="indicator-card">
          <div style={{ padding: "1.5rem" }}>
            <h3 className="indicator-title">
              <span className="indicator-icon">🇺🇸</span>
              New York Session (6AM - 6PM NY)
            </h3>
            <div className="indicator-content">
              <div className="indicator-list">
                <div className="indicator-item">
                  <span className="zone-badge cisd">AM</span>
                  <div className="indicator-description">
                    <h4>NY AM (6AM - 12PM)</h4>
                    <p>Often continues London bias or creates London Reversal by sweeping 2AM lows during 6AM open.</p>
                  </div>
                </div>
                <div className="indicator-item">
                  <span className="zone-badge ifvg">PM</span>
                  <div className="indicator-description">
                    <h4>NY PM (12PM - 6PM)</h4>
                    <p>
                      Major expansion session. NY Reversal patterns sweep AM highs/lows before the final directional
                      move.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <h2 className="section-title" style={{ fontSize: "1.75rem", marginBottom: "1.5rem" }}>
          Session Reversal Patterns
        </h2>
        <div className="indicators-grid">
          {sessionPatterns.map((pattern, index) => (
            <div key={index} className="indicator-card">
              <div style={{ padding: "1.5rem" }}>
                <h3 className="indicator-title">
                  <span className="indicator-icon">⏰</span>
                  {pattern.name}
                </h3>
                <div className="indicator-content">
                  <div className="indicator-list">
                    <div className="indicator-item">
                      <span className="line-badge bsl">Reversal</span>
                      <div className="indicator-description">
                        <h4>{pattern.reversal}</h4>
                        <p>When the initial high/low is established</p>
                      </div>
                    </div>
                    <div className="indicator-item">
                      <span className="line-badge ssl">Expansion</span>
                      <div className="indicator-description">
                        <h4>{pattern.expansion}</h4>
                        <p>When the major directional move occurs</p>
                      </div>
                    </div>
                    <div className="indicator-item">
                      <span className="line-badge eq">Example</span>
                      <div className="indicator-description">
                        <h4>{pattern.example}</h4>
                        <p>{pattern.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <h2 className="section-title" style={{ fontSize: "1.75rem", marginBottom: "1.5rem" }}>
          Weekly Timing Patterns
        </h2>
        <div className="concept-explanation">
          <div className="step-list">
            <div className="step-item">
              <span className="step-badge">Monday</span>
              <div className="step-content">
                <h4>Range Establishment</h4>
                <p>
                  Monday often establishes the weekly range. Look for consolidation and range formation rather than
                  major breakouts.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge">Tuesday</span>
              <div className="step-content">
                <h4>High Probability Reversals</h4>
                <p>
                  Tuesday has statistically higher probability for major reversal patterns. Prime day for MECHA-X
                  setups.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge">Wednesday</span>
              <div className="step-content">
                <h4>Continuation Moves</h4>
                <p>
                  Wednesday often continues Tuesday's directional bias. Another high-probability day for trend
                  continuation.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge">Thursday</span>
              <div className="step-content">
                <h4>Mid-Week Corrections</h4>
                <p>Thursday can see corrections or consolidations before Friday's weekly close positioning.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge">Friday</span>
              <div className="step-content">
                <h4>Seek & Destroy</h4>
                <p>
                  Friday often features 'Seek & Destroy' patterns - hunting weekly highs/lows before the close. Be
                  cautious of late-day reversals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderManagement = () => (
    <div className="content-section">
      <div className="section-header">
        <h1 className="section-title">Risk Management & Live Trading</h1>
        <p className="section-description">
          Position sizing based on confluence and systematic risk management protocols. The key to consistent trading is
          not just finding good setups, but managing capital allocation and risk according to setup quality.
        </p>
      </div>

      <div style={{ marginBottom: "3rem" }}>
        <h2 className="section-title" style={{ fontSize: "1.75rem", marginBottom: "1.5rem" }}>
          Position Sizing by Confluence
        </h2>
        <div className="indicators-grid">
          {confluenceLevels.map((level, index) => (
            <div key={index} className="indicator-card">
              <div style={{ padding: "1.5rem" }}>
                <h3 className="indicator-title">
                  <span className="indicator-icon">📊</span>
                  {level.level}
                </h3>
                <div className="indicator-content">
                  <div style={{ marginBottom: "1rem" }}>
                    <span className="zone-badge cisd">{level.size}</span>
                  </div>
                  <div className="indicator-list">
                    {level.conditions.map((condition, condIndex) => (
                      <div key={condIndex} className="indicator-item">
                        <span className="line-badge eq">✓</span>
                        <div className="indicator-description">
                          <p>{condition}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "3rem" }}>
        <h2 className="section-title" style={{ fontSize: "1.75rem", marginBottom: "1.5rem" }}>
          Risk Management Protocols
        </h2>
        <div className="reading-guide">
          <div className="reading-steps">
            {riskProtocols.map((protocol, index) => (
              <div key={index} className="reading-step">
                <div className="step-number">{index + 1}</div>
                <div className="step-description">
                  <h4>{protocol.component}</h4>
                  <p>
                    <strong>{protocol.application}:</strong> {protocol.protocol}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="section-title" style={{ fontSize: "1.75rem", marginBottom: "1.5rem" }}>
          Why These Rules Matter
        </h2>
        <div className="concept-explanation">
          <div className="step-list">
            <div className="step-item">
              <span className="step-badge">BSL/SSL</span>
              <div className="step-content">
                <h4>Institutional Alignment</h4>
                <p>
                  Placing stops beyond swept levels aligns your risk with institutional action. If price returns there,
                  the institution has failed to defend its position.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge">C2 EQ</span>
              <div className="step-content">
                <h4>Position Invalidation</h4>
                <p>
                  C2 Equilibrium represents the average institutional entry price. A close back across this level means
                  they're underwater on their position.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge">CISD</span>
              <div className="step-content">
                <h4>Logical Targets</h4>
                <p>
                  CISD projections provide mathematically derived profit targets based on the institutional move
                  structure.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge">Confluence</span>
              <div className="step-content">
                <h4>Capital Allocation</h4>
                <p>
                  Sizing positions based on confluence ensures you commit more capital to higher-probability setups and
                  less to weaker ones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReference = () => (
    <div className="content-section">
      <div className="section-header">
        <h1 className="section-title">Quick Reference Guides</h1>
        <p className="section-description">
          Condensed, scannable guides for rapid decision-making during live market hours. These references provide
          critical information at a glance when you need it most.
        </p>
      </div>

      <div style={{ marginBottom: "3rem" }}>
        <h2 className="section-title" style={{ fontSize: "1.75rem", marginBottom: "1.5rem" }}>
          C2 Label Interpretation
        </h2>
        <div className="concept-explanation">
          <h3 className="explanation-title">Format: C2 [time_C1]→[time_C2] [H/L]</h3>
          <div className="step-list">
            <div className="step-item">
              <span className="step-badge">C2 10p→2a H</span>
              <div className="step-content">
                <h4>Asia Reversal (Bearish)</h4>
                <p>
                  A high formed at 10 PM was swept at 2 AM. This is the textbook signature of a bearish Asia Reversal
                  pattern.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge">C2 2a→6a L</span>
              <div className="step-content">
                <h4>London Reversal (Bullish)</h4>
                <p>
                  A low formed at 2 AM was swept at 6 AM. This is the textbook signature of a bullish London Reversal
                  pattern.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge">C2 6a→10a H</span>
              <div className="step-content">
                <h4>NY Reversal (Bearish)</h4>
                <p>
                  A high formed at 6 AM was swept at 10 AM. This is the textbook signature of a bearish NY Reversal
                  pattern.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "3rem" }}>
        <h2 className="section-title" style={{ fontSize: "1.75rem", marginBottom: "1.5rem" }}>
          Session Quick Reference
        </h2>
        <div className="indicators-grid">
          {sessionPatterns.map((pattern, index) => (
            <div key={index} className="indicator-card">
              <div style={{ padding: "1.5rem" }}>
                <h3 className="indicator-title">
                  <span className="indicator-icon">⚡</span>
                  {pattern.name}
                </h3>
                <div className="indicator-content">
                  <div className="indicator-list">
                    <div className="indicator-item">
                      <span className="pattern-badge c1">Setup</span>
                      <div className="indicator-description">
                        <h4>{pattern.reversal}</h4>
                        <p>Initial high/low formation time</p>
                      </div>
                    </div>
                    <div className="indicator-item">
                      <span className="pattern-badge c3">Move</span>
                      <div className="indicator-description">
                        <h4>{pattern.expansion}</h4>
                        <p>Expected expansion session</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="section-title" style={{ fontSize: "1.75rem", marginBottom: "1.5rem" }}>
          Common Troubleshooting
        </h2>
        <div className="reading-guide">
          <div className="reading-steps">
            <div className="reading-step">
              <div className="step-number">!</div>
              <div className="step-description">
                <h4>Analysis Paralysis</h4>
                <p>
                  <strong>Problem:</strong> Overwhelmed by too many lines and patterns.
                </p>
                <p>
                  <strong>Solution:</strong> Start with HTF bias only. Add one component at a time as you master each
                  layer.
                </p>
              </div>
            </div>
            <div className="reading-step">
              <div className="step-number">!</div>
              <div className="step-description">
                <h4>Wrong Session Timing</h4>
                <p>
                  <strong>Problem:</strong> Trading Asia Reversal during NY PM session.
                </p>
                <p>
                  <strong>Solution:</strong> Always verify which session is expected for expansion. Don't force trades
                  during wrong sessions.
                </p>
              </div>
            </div>
            <div className="reading-step">
              <div className="step-number">!</div>
              <div className="step-description">
                <h4>Counter-Trend Without Confirmation</h4>
                <p>
                  <strong>Problem:</strong> Taking bearish setup when all HTF biases are bullish.
                </p>
                <p>
                  <strong>Solution:</strong> Counter-trend trades must meet Maximum Confluence criteria. Otherwise,
                  trade with the HTF trend.
                </p>
              </div>
            </div>
            <div className="reading-step">
              <div className="step-number">!</div>
              <div className="step-description">
                <h4>Chasing Broken Patterns</h4>
                <p>
                  <strong>Problem:</strong> Entering after C3 violates expectation zone or CISD breaks without retest.
                </p>
                <p>
                  <strong>Solution:</strong> Treat faded colors and dotted lines as strict invalidation signals. Move on
                  to the next setup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIndicators = () => (
    <div className="content-section">
      <div className="section-header">
        <h1 className="section-title">Complete Indicator Guide</h1>
        <p className="section-description">
          Detailed breakdown of every line, label, and zone in the MECHA-X system. This comprehensive guide ensures you
          understand exactly what each element means and how to read it correctly.
        </p>
      </div>

      <div className="indicators-grid">
        {indicatorGuide.map((category, index) => (
          <div key={index} className="indicator-card">
            <div style={{ padding: "1.5rem" }}>
              <h3 className="indicator-title">
                <span className="indicator-icon">{category.icon}</span>
                {category.category}
              </h3>
              <div className="indicator-content">
                <div className="indicator-list">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="indicator-item">
                      <span className={item.badgeClass}>{item.badge}</span>
                      <div className="indicator-description">
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "3rem" }}>
        <h2 className="section-title" style={{ fontSize: "1.75rem", marginBottom: "1.5rem" }}>
          How to Read the Indicators
        </h2>
        <div className="reading-guide">
          <h2 className="guide-title">Step-by-Step Reading Process</h2>
          <div className="reading-steps">
            {readingSteps.map((step) => (
              <div key={step.number} className="reading-step">
                <div className="step-number">{step.number}</div>
                <div className="step-description">
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <h2 className="section-title" style={{ fontSize: "1.75rem", marginBottom: "1.5rem" }}>
          Visual Cues to Remember
        </h2>
        <div className="concept-explanation">
          <div className="step-list">
            <div className="step-item">
              <span className="step-badge">Solid Lines</span>
              <div className="step-content">
                <h4>Active Levels</h4>
                <p>
                  Solid BSL/SSL lines are unbroken and still valid targets. Faded or dotted lines have been invalidated.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge">Color Coding</span>
              <div className="step-content">
                <h4>Quick Recognition</h4>
                <p>Blue = BSL (above highs), Red = SSL (below lows), Purple = EQ (equilibrium), Green = CISD zones.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge">Label Format</span>
              <div className="step-content">
                <h4>Complete Story</h4>
                <p>
                  C2 labels tell the complete narrative: time of creation → time of sweep → high or low. This reveals
                  the session pattern.
                </p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-badge">Zone Shading</span>
              <div className="step-content">
                <h4>Trading Areas</h4>
                <p>
                  Shaded zones (CISD, iFVG, Order Blocks) represent areas of interest for entries, exits, or confluence
                  confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return renderOverview();
      case "htf":
        return renderHTF();
      case "liquidity":
        return renderLiquidity();
      case "patterns":
        return renderPatterns();
      case "cisd":
        return renderCISD();
      case "ifvg":
        return renderiFVG();
      case "smt":
        return renderSMT();
      case "sessions":
        return renderSessions();
      case "reference":
        return renderReference();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <img src={logoGif} alt="OxQQQ Logo" className="logo-image" />
            <div className="title-section">
              <h1 className="main-title">MECHA-X Educational Guide</h1>
              <p className="subtitle">Complete Framework Breakdown</p>
            </div>
          </div>
          <div className="author-credit">
            <span className="created-by">Created by OxQ</span>
          </div>
        </div>
      </header>

      <nav className="main-nav">
        <div className="nav-container">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`nav-button ${activeSection === section.id ? "bg-green-600 text-white" : "bg-white text-gray-700 hover:bg-green-50"}`}
            >
              {section.label}
              <span className="nav-badge">{section.badge}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="main-content">{renderContent()}</main>

      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">MECHA-X Framework</h3>
            <p className="footer-description">
              Multi-timeframe analysis with HTF candles, liquidity detection, C1→C2→C3 patterns, CISD zones, iFVG
              patterns, and SMT divergence logic for systematic trading.
            </p>
          </div>
          <div className="footer-section">
            <p className="footer-credit">Created by OxQ</p>
            <p className="footer-acknowledgments">
              Concepts learned from: ICT, TTrades, GxT, ElevenTrades, Afyz, AMtrades
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
