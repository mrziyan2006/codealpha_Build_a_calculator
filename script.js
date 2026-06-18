(() => {
  const displayEl = document.getElementById("display");
  const previewEl = document.getElementById("preview");

  // Expression is stored as a string of numbers/operators.
  // Operators allowed: + - * /
  let expr = "";
  let justEvaluated = false;

  const isOperator = (ch) =>
    ch === "+" || ch === "-" || ch === "*" || ch === "/";
  const formatForPreview = (s) => {
    // Human-friendly: * -> ×, / -> ÷, - stays as −
    return s.replace(/\*/g, "×").replace(/\//g, "÷").replace(/-/g, "−");
  };

  const setDisplay = (text) => {
    displayEl.textContent = text;
  };

  const safeEvaluate = (expression) => {
    // Only allow digits, operators, decimal points, and whitespace.
    if (!/^[0-9+\-*/.\s]+$/.test(expression)) return { ok: false, value: null };
    // Prevent cases like ending with operator
    if (/[*+\-/\.]\s*$/.test(expression)) return { ok: false, value: null };

    try {
      // Use Function with strict sandbox assumptions. Input is validated above.
      const fn = new Function(`"use strict"; return (${expression});`);
      const value = fn();
      if (typeof value !== "number" || !Number.isFinite(value)) {
        return { ok: false, value: null };
      }
      return { ok: true, value };
    } catch {
      return { ok: false, value: null };
    }
  };

  const normalizeExpr = (s) => {
    // Avoid double operators like ++, **, etc. Only minimal cleanup.
    return s.replace(/\s+/g, "");
  };

  const updateUI = () => {
    const current = normalizeExpr(expr);
    if (!current) {
      previewEl.textContent = "\u00A0";
      setDisplay("0");
      return;
    }

    previewEl.textContent = formatForPreview(current);

    const evalRes = safeEvaluate(current);
    if (evalRes.ok) {
      // Show a real-time result preview in the display.
      // If just evaluated, we keep the result as-is until next input.
      setDisplay(String(roundSmart(evalRes.value)));
    } else {
      // If not evaluatable yet, show last number chunk (fallback).
      const m = current.match(/(\d+(?:\.\d*)?|\.\d+)\s*$/);
      setDisplay(m ? m[0] : "0");
    }
  };

  const roundSmart = (n) => {
    // Reduce floating point noise.
    const abs = Math.abs(n);
    if (abs === 0) return 0;
    // Keep up to 12 significant digits.
    const rounded = Number(n.toPrecision(12));
    return rounded;
  };

  const appendDigit = (d) => {
    if (justEvaluated) {
      // Start new expression after evaluation when digit typed.
      expr = "";
      justEvaluated = false;
    }

    // If current ends with a decimal point or digit, just append.
    expr += d;
    expr = normalizeExpr(expr);
    updateUI();
  };

  const appendOperator = (op) => {
    // Start with unary minus support (e.g., user hits - then 5)
    if (!expr && op === "-") {
      expr = "-";
      justEvaluated = false;
      updateUI();
      return;
    }

    if (!expr) return;

    // If last char is operator, replace it.
    const last = expr[expr.length - 1];
    if (isOperator(last)) {
      expr = expr.slice(0, -1) + op;
    } else {
      expr += op;
    }

    justEvaluated = false;
    expr = normalizeExpr(expr);
    updateUI();
  };

  const clearAll = () => {
    expr = "";
    justEvaluated = false;
    previewEl.textContent = "\u00A0";
    setDisplay("0");
  };

  const backspace = () => {
    if (justEvaluated) {
      // Backspace after evaluation: allow editing the result as expression.
      // We’ll just clear.
      clearAll();
      return;
    }
    if (!expr) return;
    expr = expr.slice(0, -1);
    expr = normalizeExpr(expr);
    updateUI();
  };

  const equals = () => {
    if (!expr) return;
    const evalRes = safeEvaluate(expr);
    if (!evalRes.ok) return;

    const value = evalRes.value;
    expr = String(roundSmart(value));
    justEvaluated = true;
    previewEl.textContent = "\u00A0";
    setDisplay(String(roundSmart(value)));
  };

  // Button handling
  document.querySelectorAll(".key").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      const value = btn.dataset.value;

      if (action === "clear") return clearAll();
      if (action === "equals") return equals();
      if (action === "backspace") return backspace();

      if (value === ".") return appendDigit(".");
      if (value && /^[0-9]$/.test(value)) return appendDigit(value);
      if (value && isOperator(value)) return appendOperator(value);
    });
  });

  // Prevent invalid decimal entry like "1.."
  document.addEventListener("beforeinput", (e) => {
    // No-op: we’re not using text inputs.
  });

  // Keyboard support
  document.addEventListener("keydown", (e) => {
    const key = e.key;

    // Avoid interfering with browser shortcuts
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    if (key >= "0" && key <= "9") {
      e.preventDefault();
      appendDigit(key);
      return;
    }

    if (key === ".") {
      e.preventDefault();
      // Prevent multiple dots in the current number.
      const current = expr;
      const lastNumber = current.split(/[+\-*/]/).pop() || "";
      if (lastNumber.includes(".")) return;
      appendDigit(".");
      return;
    }

    if (key === "+" || key === "-" || key === "*" || key === "/") {
      e.preventDefault();
      appendOperator(key);
      return;
    }

    if (key === "Enter" || key === "=") {
      e.preventDefault();
      equals();
      return;
    }

    if (key === "Backspace") {
      e.preventDefault();
      backspace();
      return;
    }

    if (key === "Escape") {
      e.preventDefault();
      clearAll();
      return;
    }
  });

  // Init
  clearAll();
})();
