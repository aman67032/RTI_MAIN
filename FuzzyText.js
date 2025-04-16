/**
 * FuzzyText - A vanilla JavaScript implementation of the fuzzy text effect
 * Adapted from the React component
 */
class FuzzyText {
  constructor(options = {}) {
    this.options = {
      text: options.text || 'Loading...',
      container: options.container || document.body,
      fontSize: options.fontSize || "clamp(2rem, 10vw, 10rem)",
      fontWeight: options.fontWeight || 900,
      fontFamily: options.fontFamily || "inherit",
      color: options.color || "#fff",
      enableHover: options.enableHover !== undefined ? options.enableHover : true,
      baseIntensity: options.baseIntensity || 0.18,
      hoverIntensity: options.hoverIntensity || 0.5,
    };
    
    this.canvas = document.createElement('canvas');
    this.isHovering = false;
    this.isCancelled = false;
    this.animationFrameId = null;
    this.fuzzRange = 30;
    
    this.init();
  }
  
  async init() {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
    if (this.isCancelled) return;
    
    this.options.container.appendChild(this.canvas);
    
    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;
    
    const computedFontFamily = 
      this.options.fontFamily === "inherit"
        ? window.getComputedStyle(this.canvas).fontFamily || "sans-serif"
        : this.options.fontFamily;
    
    const fontSizeStr =
      typeof this.options.fontSize === "number" 
        ? `${this.options.fontSize}px` 
        : this.options.fontSize;
    
    let numericFontSize;
    if (typeof this.options.fontSize === "number") {
      numericFontSize = this.options.fontSize;
    } else {
      const temp = document.createElement("span");
      temp.style.fontSize = this.options.fontSize;
      document.body.appendChild(temp);
      const computedSize = window.getComputedStyle(temp).fontSize;
      numericFontSize = parseFloat(computedSize);
      document.body.removeChild(temp);
    }
    
    const text = this.options.text;
    
    // Create offscreen canvas
    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d");
    if (!offCtx) return;
    
    offCtx.font = `${this.options.fontWeight} ${fontSizeStr} ${computedFontFamily}`;
    offCtx.textBaseline = "alphabetic";
    const metrics = offCtx.measureText(text);
    
    const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
    const actualRight = metrics.actualBoundingBoxRight ?? metrics.width;
    const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;
    const actualDescent = metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;
    
    const textBoundingWidth = Math.ceil(actualLeft + actualRight);
    const tightHeight = Math.ceil(actualAscent + actualDescent);
    
    const extraWidthBuffer = 10;
    const offscreenWidth = textBoundingWidth + extraWidthBuffer;
    
    offscreen.width = offscreenWidth;
    offscreen.height = tightHeight;
    
    const xOffset = extraWidthBuffer / 2;
    offCtx.font = `${this.options.fontWeight} ${fontSizeStr} ${computedFontFamily}`;
    offCtx.textBaseline = "alphabetic";
    offCtx.fillStyle = this.options.color;
    offCtx.fillText(text, xOffset - actualLeft, actualAscent);
    
    const horizontalMargin = 50;
    const verticalMargin = 0;
    this.canvas.width = offscreenWidth + horizontalMargin * 2;
    this.canvas.height = tightHeight + verticalMargin * 2;
    ctx.translate(horizontalMargin, verticalMargin);
    
    this.interactiveLeft = horizontalMargin + xOffset;
    this.interactiveTop = verticalMargin;
    this.interactiveRight = this.interactiveLeft + textBoundingWidth;
    this.interactiveBottom = this.interactiveTop + tightHeight;
    
    this.offscreen = offscreen;
    this.offscreenWidth = offscreenWidth;
    this.tightHeight = tightHeight;
    this.ctx = ctx;
    
    this.setupEventListeners();
    this.run();
  }
  
  run() {
    if (this.isCancelled) return;
    
    this.ctx.clearRect(
      -this.fuzzRange,
      -this.fuzzRange,
      this.offscreenWidth + 2 * this.fuzzRange,
      this.tightHeight + 2 * this.fuzzRange
    );
    
    const intensity = this.isHovering ? this.options.hoverIntensity : this.options.baseIntensity;
    
    for (let j = 0; j < this.tightHeight; j++) {
      const dx = Math.floor(intensity * (Math.random() - 0.5) * this.fuzzRange);
      this.ctx.drawImage(
        this.offscreen,
        0,
        j,
        this.offscreenWidth,
        1,
        dx,
        j,
        this.offscreenWidth,
        1
      );
    }
    
    this.animationFrameId = window.requestAnimationFrame(() => this.run());
  }
  
  isInsideTextArea(x, y) {
    return (
      x >= this.interactiveLeft &&
      x <= this.interactiveRight &&
      y >= this.interactiveTop &&
      y <= this.interactiveBottom
    );
  }
  
  setupEventListeners() {
    if (!this.options.enableHover) return;
    
    this.handleMouseMove = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.isHovering = this.isInsideTextArea(x, y);
    };
    
    this.handleMouseLeave = () => {
      this.isHovering = false;
    };
    
    this.handleTouchMove = (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      this.isHovering = this.isInsideTextArea(x, y);
    };
    
    this.handleTouchEnd = () => {
      this.isHovering = false;
    };
    
    this.canvas.addEventListener("mousemove", this.handleMouseMove);
    this.canvas.addEventListener("mouseleave", this.handleMouseLeave);
    this.canvas.addEventListener("touchmove", this.handleTouchMove, { passive: false });
    this.canvas.addEventListener("touchend", this.handleTouchEnd);
  }
  
  cleanup() {
    this.isCancelled = true;
    window.cancelAnimationFrame(this.animationFrameId);
    
    if (this.options.enableHover) {
      this.canvas.removeEventListener("mousemove", this.handleMouseMove);
      this.canvas.removeEventListener("mouseleave", this.handleMouseLeave);
      this.canvas.removeEventListener("touchmove", this.handleTouchMove);
      this.canvas.removeEventListener("touchend", this.handleTouchEnd);
    }
    
    if (this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

// Export for use in other scripts
window.FuzzyText = FuzzyText; 