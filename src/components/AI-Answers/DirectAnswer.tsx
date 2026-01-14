import React from 'react';

interface DirectAnswerProps {
  question: string;
  answer: string;
}

/**
 * DirectAnswer Component
 * Optimized for AI Search Engines (LLMs) to identify, scrape, and cite 
 * as a "Primary Source" featured snippet.
 */
export const DirectAnswer: React.FC<DirectAnswerProps> = ({ question, answer }) => {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Question",
    "name": question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": answer
    }
  };

  return (
    <section
      className="semantic-block p-8 bg-white/5 border-l-4 border-blue-600 rounded-r-2xl my-12 animate-in slide-in-from-left duration-700"
      aria-label="Legal Fact Sheet"
    >
      <h2 className="text-2xl font-bold mb-4 text-white tracking-tight">
        {question}
      </h2>
      <div className="text-slate-300 leading-relaxed text-lg">
        <span className="text-blue-400 font-extrabold mr-2 uppercase text-sm tracking-widest">
          The Direct Answer:
        </span>
        {answer}
      </div>

      {/* Invisible Schema.org Metadata for Search Agents */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
    </section>
  );
};
