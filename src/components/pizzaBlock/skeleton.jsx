import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="135" cy="135" r="125" />
    <rect x="0" y="296" rx="10" ry="10" width="280" height="24" />
    <rect x="0" y="337" rx="10" ry="10" width="280" height="70" />
    <rect x="0" y="420" rx="10" ry="10" width="95" height="30" />
    <rect x="130" y="420" rx="10" ry="10" width="150" height="45" />
  </ContentLoader>
);

export default Skeleton;
