import React from "react";

/**
 * @param {{ title: string, children: React.ReactNode, intro?: string }} props
 */
function StaticPage({ title, intro, children }) {
  return (
    <main className="page page-pad static-page">
      <h1 className="page-title">{title}</h1>
      {intro ? <p className="page-subtitle static-page__intro">{intro}</p> : null}
      <div className="static-page__body">{children}</div>
    </main>
  );
}

export default StaticPage;
