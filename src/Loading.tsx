import * as React from 'react';


let innerCircleLength: number;
let outerCircleLength: number;
let successPathLength: number;
let errorPathLength: number;
let errorPath2Length: number;

interface ILoadingProps {
  success: boolean;
  error: boolean;
}
class Loading extends React.Component<ILoadingProps> {
  constructor(props: any) {
    super(props);
  }

  private innerCircle: any;
  private outerCircle: any;
  private errorPath: any;
  private errorPath2: any;
  private successPath: any;

  componentDidMount() {
    var svg: any = document.getElementById("svg");
    this.innerCircle = svg.querySelector(".inner-path");
    this.outerCircle = svg.querySelector(".outer-path");
    this.successPath = svg.querySelector(".success-path");
    this.errorPath = svg.querySelector(".error-path");
    this.errorPath2 = svg.querySelector(".error-path2");

    this.errorPath.style.opacity = 0;
    this.errorPath2.style.opacity = 0;
    this.successPath.style.opacity = 0;
    innerCircleLength = this.innerCircle.getTotalLength();
    outerCircleLength = this.outerCircle.getTotalLength();
    successPathLength = this.successPath.getTotalLength();
    errorPathLength = 0;
    errorPath2Length = 0;
    this.animate();
  }

  public render () {
    return (
      <svg id="svg" fill="rgba(0,0,0,0)">
        <path stroke="#fff" className="outer-path" d="M 60 60 m 0 -50 a 50 50 0 1 1 0 100 a 50 50 0 1 1 0 -100" />
        <path stroke="#fff" className="inner-path" d="M 60 60 m 0 -30 a 30 30 0 1 1 0 60 a 30 30 0 1 1 0 -60" />
        <path stroke="#fff" className="success-path" d="M 60 10 A 50 50 0 0 1 91 21 L 75 45 L 55 75 L 45 65" />
        <path stroke="#fff" className="error-path" d="M 60 10 A 50 50 0 0 1 95 25 L 45 75" />
        <path stroke="#fff" className="error-path2" d="M 60 30 A 30 30 0 0 1 81 81 L 45 45" />
      </svg>
    )
  }

  private successAnimation = (timestamp?: any) => {
    this.successPath.setAttribute("stroke-dasharray", this.successPath.getTotalLength() / 2);
    this.successPath.setAttribute("stroke-dashoffset", this.successPath.getTotalLength());

    successPathLength -= 2;
    this.successPath.setAttribute("stroke-dashoffset", successPathLength);
    if (successPathLength > 60) {
      window.requestAnimationFrame(this.successAnimation);
    }
  }

  private errorAnimation = (timestamp?: any) => {
    console.log('error Anim');

    this.errorPath.setAttribute("stroke-dasharray", 65);
    this.errorPath.setAttribute("stroke-dashoffset", 0);

    this.errorPath2.setAttribute("stroke-dasharray", 75);
    this.errorPath2.setAttribute("stroke-dashoffset", 0);

    errorPathLength -= 5;
    errorPath2Length -= 5 * (75 / 65);

    this.errorPath.setAttribute("stroke-dashoffset", errorPathLength);
    this.errorPath2.setAttribute("stroke-dashoffset", errorPath2Length);

    if (errorPathLength >= -60 || errorPath2Length >= -70) {
      window.requestAnimationFrame(this.errorAnimation);
    }
  }

  private animate = (timestamp?: any) => {
    this.innerCircle.setAttribute("stroke-dasharray", this.innerCircle.getTotalLength() / 2);
    this.innerCircle.setAttribute("stroke-dashoffset", this.innerCircle.getTotalLength());
    this.outerCircle.setAttribute("stroke-dasharray", this.outerCircle.getTotalLength() / 2);
    this.outerCircle.setAttribute("stroke-dashoffset", this.outerCircle.getTotalLength());
    innerCircleLength -= 2;
    outerCircleLength -= 6.666666882503955;
    this.innerCircle.setAttribute("stroke-dashoffset", innerCircleLength);
    this.outerCircle.setAttribute("stroke-dashoffset", outerCircleLength);
    if (innerCircleLength > 0) {
      window.requestAnimationFrame(this.animate);
    } else {
      if (this.props.success) {
        this.successPath.style.opacity = 1;
        this.innerCircle.style.opacity = 0;
        this.outerCircle.style.opacity = 0;
        window.requestAnimationFrame(this.successAnimation);
      } else if (this.props.error) {
        console.log('this.props', this.props);

        this.errorPath.style.opacity = 1;
        this.errorPath2.style.opacity = 1;
        this.innerCircle.style.opacity = 0;
        this.outerCircle.style.opacity = 0;
        window.requestAnimationFrame(this.errorAnimation);
      } else {
        innerCircleLength = this.innerCircle.getTotalLength();
        outerCircleLength = this.outerCircle.getTotalLength();
        window.requestAnimationFrame(this.animate);
      }
    }
  }
}

export default Loading;