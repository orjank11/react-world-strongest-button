import * as React from 'react';

class Loading extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render () {
    return (
      <svg width="120" height="120" fill="rgba(0,0,0,0)">
        <path className="outer-path" stroke="rgba(255, 255, 255, 0.85)" d="M 60 60 m 0 -50 a 50 50 0 1 1 0 100 a 50 50 0 1 1 0 -100" />
        <path className="inner-path" stroke="rgba(255, 255, 255, 0.45)" d="M 60 60 m 0 -30 a 30 30 0 1 1 0 60 a 30 30 0 1 1 0 -60" />
        <path className="success-path" stroke="rgba(255, 255, 255, 0.85)" d="M 60 10 A 50 50 0 0 1 91 21 L 75 45 L 55 75 L 45 65" />
        <path className="error-path" stroke="rgba(255, 255, 255, 0.85)" d="M 60 10 A 50 50 0 0 1 95 25 L 45 75" />
        <path className="error-path2" stroke="rgba(255, 255, 255, 0.85)" d="M 60 30 A 30 30 0 0 1 81 81 L 45 45" />
      </svg>
    )
  }
}

export default Loading;