import React from "react";
import StaticPage from "../components/StaticPage";

function PrivacyPage() {
  return (
    <StaticPage title="Privacy policy" intro="Draft placeholder — not legal advice.">
      <p>
        Farmish respects user privacy. This demo may store cart and login state in
        your browser (localStorage) only for prototyping.
      </p>
      <p>
        A production policy will describe data collection, cookies, third-party
        processors, and user rights under applicable law.
      </p>
    </StaticPage>
  );
}

export default PrivacyPage;
