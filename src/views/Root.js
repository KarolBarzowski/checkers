import React from 'react';
import { Helmet } from 'react-helmet';

function Root() {
  return (
    <div className="Root">
      <Helmet>
        <title>Warcaby</title>
        <meta name="title" content="Warcaby" data-react-helmet="true"></meta>
        <meta name="description" content="Warcaby w 3d" />
      </Helmet>
      <h1>Tu na razie jest 💩, ale będą kozackie warcaby 😎</h1>
    </div>
  );
}

export default Root;
