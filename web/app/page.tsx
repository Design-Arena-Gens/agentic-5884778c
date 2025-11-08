"use client";

import { useMemo, useState } from 'react';
import Stat from '../components/Stat';
import { analyze } from '../lib/analyze';

export default function Page() {
  const [text, setText] = useState<string>(
    'Paste or type text here to unleash Super Heavy Grok Advantage. Because clarity wins. However, nuance matters. Therefore, measure what you mean.'
  );

  const result = useMemo(() => analyze(text), [text]);

  const readingEase = Math.round(result.fleschReadingEase);
  const grade = Math.max(0, result.fleschKincaidGrade);

  return (
    <div className="container">
      <header className="header">
        <div className="brand">
          <span className="badge">SUPER</span>
          <div className="title">Heavy Grok Advantage</div>
        </div>
        <div className="badge" style={{ background: 'linear-gradient(90deg,#22c55e,#06b6d4)' }}>client-only</div>
      </header>

      <section className="panel inputCard">
        <textarea
          className="textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Drop any text, spec, memo, or idea..."
        />
        <div className="controls">
          <div className="btnRow">
            <button className="button" onClick={() => navigator.clipboard?.readText().then((t) => t && setText(t))}>Paste</button>
            <button className="button secondary" onClick={() => setText('')}>Clear</button>
          </div>
          <div style={{ color: 'var(--muted)', fontSize: 12 }}>
            Live analysis runs locally. No servers, no uploads.
          </div>
        </div>
      </section>

      <div className="grid" style={{ marginTop: 16 }}>
        <section className="panel card">
          <h3 style={{ marginTop: 0 }}>Essentials</h3>
          <div className="statGrid">
            <Stat label="Characters" value={String(result.numCharacters)} />
            <Stat label="Words" value={String(result.numWords)} />
            <Stat label="Sentences" value={String(result.numSentences)} />
            <Stat label="Reading Time" value={`${Math.max(0.1, result.readingTimeMinutes).toFixed(2)} min`} />
            <Stat label="Flesch Ease" value={String(readingEase)} good={readingEase >= 60} bad={readingEase < 30} />
            <Stat label="Grade Level" value={grade.toFixed(1)} good={grade <= 10} bad={grade > 14} />
          </div>
        </section>

        <section className="panel card">
          <h3 style={{ marginTop: 0 }}>Sentiment</h3>
          <div className="statGrid">
            <Stat label="Score" value={result.sentiment.score.toFixed(1)} />
            <Stat label="Magnitude" value={result.sentiment.magnitude.toFixed(1)} />
            <Stat label="Comparative" value={result.sentiment.comparative.toFixed(3)} />
          </div>
          <div className="footer">Lightweight dictionary-based sentiment; interpret trends not absolutes.</div>
        </section>
      </div>

      <div className="grid" style={{ marginTop: 16 }}>
        <section className="panel card">
          <h3 style={{ marginTop: 0 }}>Keywords</h3>
          <div className="kv">
            {result.keywords.map((k) => (
              <span key={k.term} className="chip">{k.term} ? {k.score}</span>
            ))}
          </div>
          <h4>Top Bigrams</h4>
          <div className="kv">
            {result.topBigrams.map((g) => (
              <span key={g.gram} className="chip">{g.gram} ? {g.count}</span>
            ))}
          </div>
          <h4>Top Trigrams</h4>
          <div className="kv">
            {result.topTrigrams.map((g) => (
              <span key={g.gram} className="chip">{g.gram} ? {g.count}</span>
            ))}
          </div>
        </section>

        <section className="panel card">
          <h3 style={{ marginTop: 0 }}>Argument Cues</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
            <CueList title="Because" items={result.cues.because} tone="good" />
            <CueList title="Therefore" items={result.cues.therefore} tone="good" />
            <CueList title="However" items={result.cues.however} tone="bad" />
            <CueList title="Contrast" items={result.cues.contrast} tone="bad" />
          </div>
          <div className="footer">Cues hint at structure: reasons, conclusions, and contrasts.</div>
        </section>
      </div>

      <div className="footer">? {new Date().getFullYear()} Super Heavy Grok Advantage. All analysis computed locally in your browser.</div>
    </div>
  );
}

function CueList({ title, items, tone }: { title: string; items: string[]; tone: 'good'|'bad' }) {
  return (
    <div className="panel" style={{ padding: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>
        <span className={tone === 'good' ? 'good' : 'bad'}>?</span> {title}
      </div>
      {items.length === 0 ? (
        <div style={{ color: 'var(--muted)', fontSize: 13 }}>No cues detected.</div>
      ) : (
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {items.map((s, i) => (
            <li key={i} style={{ marginBottom: 6 }}>{s}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
