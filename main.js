/* Prewave presentation site — progressive enhancement only.
   The page is fully readable with JS disabled; this adds the
   count-up, the trajectory draw, and the placeholder play state. */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- 1. Hero count-up: 0 -> 700 --- */
  function runCount(el) {
    var target = parseFloat(el.dataset.target) || 0;
    if (reduceMotion) {
      el.textContent = String(target);
      return;
    }
    var duration = 1700;
    var startTime = null;
    function step(now) {
      if (startTime === null) startTime = now;
      var p = Math.min((now - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* --- 2. Trajectory draw: set exact path length, then reveal --- */
  function primeChart() {
    var line = document.querySelector(".chart__line");
    var chart = document.querySelector(".chart");
    if (!line || !chart) return;
    try {
      var len = Math.ceil(line.getTotalLength());
      line.style.setProperty("--len", len);
    } catch (e) {
      /* getTotalLength unsupported — fall back to drawn state */
    }
    // next frame so the initial (un-drawn) state is committed first
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        chart.classList.add("is-drawn");
      });
    });
  }

  /* --- 3. Video placeholder: announce "recording soon" on activate --- */
  function wirePlaceholder() {
    var btn = document.querySelector("[data-coming-soon]");
    var status = document.querySelector("[data-status]");
    if (!btn || !status) return;
    btn.addEventListener("click", function () {
      status.textContent = "Walkthrough drops before the event ↗";
      status.setAttribute("data-active", "");
    });
  }

  function init() {
    document.querySelectorAll(".count").forEach(runCount);
    primeChart();
    wirePlaceholder();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
