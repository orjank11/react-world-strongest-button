class Loading {
  public outer: any = document.querySelector('.outer-path');
  public inner: any = document.querySelector('.inner-path');
  public success: any = document.querySelector('.success-path');
  public error: any = document.querySelector('.error-path');
  public error2: any = document.querySelector('.error-path2');
  public successSegment: any;
  public errorSegment: any;
  public errorSegment2: any;
  public outerCircle: any;
  public innerCircle: any;

  public getLength = (el: any) => {
    if (el.nodeName) {
      var tagName = el.nodeName.toLowerCase(), d;
      if (tagName === 'path') {
        d = el.getTotalLength();
      } else if (tagName === 'circle') {
        d = 2 * Math.PI * parseFloat(el.getAttribute('r'));
      } else if (tagName === 'rect') {
        d = 2 * el.getAttribute('width') + 2 * el.getAttribute('height');
      } else if (tagName === 'line') {
        var x1 = el.getAttribute('x1');
        var x2 = el.getAttribute('x2');
        var y1 = el.getAttribute('y1');
        var y2 = el.getAttribute('y2');
        d = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
      }
      return d;
    }
  }

  setupPath = (el: any, length: number, start: any, end: any, opacity: number) => {
    el.style.strokeOpacity = opacity;
    start = parseFloat(start.substring(0, start.indexOf('%')));
    end = parseFloat(end.substring(0, end.indexOf('%')));
    var dash = (end - start);
    var gap = (100 - (end - start));
    var offset = (100 - start);
    el.style.strokeDasharray = ((dash / 100) * length) + ' ' + ((gap / 100) * length);
    el.style.strokeDashoffset = (offset / 100) * length;
  }

  setPosition = (el: any, options: any) => {
    if (el.style) {
      var length = this.getLength(el);
      var visibility = (options.visibility !== undefined) ? options.visibility : 1;
      if (visibility === 0) {
        el.style.visibility = 'hidden';
      } else if (visibility === 1) {
        el.style.visibility = 'visible';
      } else {
        el.style.visibility = 'visible';
      }
      this.setupPath(el, length, options.start, options.end, options.opacity);
    }
  }

  put = (el: any, options: any) => {
    if (el.length) {
      for (var i in el) {
        this.setPosition(el[i], options);
      }
    } else {
      this.setPosition(el, options);
    }
  }

  anim = (el: any, options: any) => {
    if (el.style) {
      el.getBoundingClientRect();
      var length = this.getLength(el);
      var opacity = (options.opacity !== undefined) ? options.opacity : 1;
      var visibility = (options.visibility !== undefined) ? options.visibility : 1;
      if (visibility === 0) {
        el.style.visibility = 'hidden';
      } else if (visibility === 1) {
        el.style.visibility = 'visible';
      } else {
        el.style.visibility = 'visible';
      }
      // var delay = (options.delay) ? options.delay : 0;
      var timing = (options.timing) ? options.timing : 'linear';
      el.style.transition = el.style.WebkitTransition = 'none';

      el.style.transition = el.style.WebkitTransition =  'stroke-dashoffset ' + options.duration + 's ' + timing + ', stroke-dasharray ' + options.duration + 's ' + timing;
      setTimeout(() => { this.setupPath(el, length, options.start, options.end, opacity); });
    }
  }

  animate = (el: any, options: any) => {
    if (el.length) {
      for (var i in el) {
        this.anim(el[i], options);
      }
    } else {
      this.anim(el, options);
    }
    return this;
  }

  outerAnimation = () => {
    this.outerCircle.set({
      start: '15%',
      end: '25%',
      duration: 0.2,
      callback: function () {
        this.outerCircle.set({
          start: '75%',
          end: '150%',
          duration: 0.3,
          follow: true,
          callback: function () {
            this.outerCircle.set({
              start: '70%',
              end: '75%',
              duration: 0.3,
              callback: function () {
                this.outerCircle.set({
                  start: '100%',
                  end: '100.1%',
                  duration: 0.4,
                  follow: true,
                  callback: function () {
                    if (this.succeed == true) {
                      this.success.style.visibility = 'visible';
                      this.outer.style.visibility = 'hidden';
                      this.inner.style.visibility = 'hidden';
                      this.successAnimation();
                    }
                    else if (this.err == true) {
                      this.error.style.visibility = 'visible';
                      this.error2.style.visibility = 'visible';
                      this.outer.style.visibility = 'hidden';
                      this.inner.style.visibility = 'hidden';
                      this.errorAnimation();
                    }
                    else {
                      this.outerAnimation();
                      this.innerAnimation();
                    }
                  }
                })
              }
            });
          }
        });
      }
    });
  }
  innerAnimation = () => {
    this.innerCircle.set(
      {
        start: '20%',
        end: '80%',
        duration: 0.6,
        callback: function () {
          this.innerCircle.set({
            start: '100%',
            end: '100.1%',
            duration: 0.6,
            follow: true
          });
        }
      }
    );
  }

  public reset = () => {
    this.success!.style.visibility = 'hidden';
    this.error!.style.visibility = 'hidden';
    this.error2!.style.visibility = 'hidden';
    this.successSegment = this.setPosition(this.success, { start: '0%', end: '0.1%' });
    this.errorSegment = this.setPosition(this.error, { start: '0%', end: '0.1%' });
    this.errorSegment2 = this.setPosition(this.error2, { start: '0%', end: '0.1%' });
    this.outerCircle = this.setPosition(this.outer, { start: '0%', end: '0.1%' });
    this.innerCircle = this.setPosition(this.inner, { start: '0%', end: '0.1%' });
    this.outer.style.visibility = 'visible';
    this.inner.style.visibility = 'visible';
    setTimeout(() => {
      this.outerAnimation();
      this.innerAnimation();
    });
  }
}

export default Loading;
