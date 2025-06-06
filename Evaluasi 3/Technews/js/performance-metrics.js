window.addEventListener("load", () => {
  setTimeout(() => {
    const timing = performance.timing;

    const loadTime = timing.loadEventEnd - timing.navigationStart;
    const ttfb = timing.responseStart - timing.requestStart;
    const domLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
    const scriptTime = timing.domComplete - timing.domInteractive;

    let firstPaint = 0;
    let fcp = 0;

    if (performance.getEntriesByType) {
      const paints = performance.getEntriesByType("paint");
      paints.forEach(entry => {
        if (entry.name === "first-paint") firstPaint = entry.startTime;
        if (entry.name === "first-contentful-paint") fcp = entry.startTime;
      });
    }

    console.table({
      "1. Page Load Time (ms)": loadTime,
      "2. Time to First Byte (ms)": ttfb,
      "3. DOM Content Loaded (ms)": domLoaded,
      "4. First Paint (ms)": firstPaint.toFixed(2),
      "5. First Contentful Paint (ms)": fcp.toFixed(2),
      "6. JS Execution Time (ms)": scriptTime
    });

    if (loadTime > 3000) console.warn("⚠️ Load time lambat. Optimasi gambar dan CSS.");
    if (ttfb > 600) console.warn("⚠️ TTFB tinggi. Gunakan cache/CDN.");
    if (fcp > 2000) console.warn("⚠️ FCP lambat. Pertimbangkan lazy loading.");
  }, 0);
});
