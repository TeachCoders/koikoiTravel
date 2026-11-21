"""
KoiKoi Luxury Train Booking Form - 3-Step Timeline Wizard
- Colors: Regally aligned with KoiKoi Homepage & Luxury Train palette:
  * Royal Navy (#091e2b, #0f172a)
  * Warm Regal Gold / Amber (#d97706, #b45309, #c59b27, #e8d7b0, #fffdfa)
  * Clean dividers (#eee7de)
- Typography:
  * Font sizes made substantially larger, bold and readable ('Outfit' & 'Playfair Display')
  * Zero overlapping text in counters and labels (flex-col structure)
- Clean Date List (NO CARDS / NO BOXED RECTANGLES around dates):
  * Pure clean radio items matching user screenshot: [ ○ ] Saturday, 12th December, 2026
  * Font size: 16px bold
  * Golden circular radio buttons with filled gold dot on active
- Step 1: Dark Royal Navy Train & Circuit selector with gold trim + Clean Month Table with dates
- Step 2: Clear traveler counters (Adults, Children, Cabins) + Contact details
- Step 3: Comprehensive Review & Confirmation with Instant Edit buttons
- Timeline Stepper: Horizontal gold guide line, right arrow, 3 steps, active vertical drop pin
"""

def get_luxury_booking_page_content(base_path="/luxury-trains"):
    html = """
<style>
/* KoiKoi Luxury Train Form Styling - Regal Gold & Navy Theme */
:root {
  --brand: #0f172a;
  --brand-navy: #091e2b;
  --gold: #d97706;
  --gold-dark: #b45309;
  --gold-light: #fef3c7;
  --gold-border: #e8d7b0;
  --gold-bg: #fffdfa;
  --teal: #0d9488;
  --bg: #ffffff;
  --soft: #faf8f5;
  --text: #0f172a;
  --muted: #64748b;
  --line: #eee7de;
  --err: #ef4444;
  --font-body: 'Outfit', 'Inter', -apple-system, sans-serif;
  --font-head: 'Playfair Display', Georgia, serif;
}

.kb-booking-page-wrap {
  max-width: 960px;
  margin: 0 auto;
  padding: 30px 16px 80px;
  font-family: var(--font-body);
  color: var(--text);
}
.kb-form-header {
  text-align: center;
  max-width: 760px;
  margin: 0 auto 20px;
}
.eyebrow {
  font-size: 13px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold-dark);
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}
.eyebrow::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--gold);
}
.kb-form-header h1 {
  font-family: var(--font-head);
  font-size: clamp(28px, 4vw, 36px);
  color: var(--brand);
  line-height: 1.25;
  margin: 0 0 8px;
}
.kb-form-header p {
  color: var(--muted);
  font-size: 15.5px;
  line-height: 1.55;
  margin: 0;
}

/* ========================================================
   Timeline Stepper with Active Animated Green Transition
   ======================================================== */
.kb-timeline-wrap {
  position: relative;
  max-width: 820px;
  margin: 18px auto 26px;
  padding: 0 16px;
}
.kb-timeline-steps {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  z-index: 2;
}
.kb-timeline-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
  user-select: none;
  text-align: center;
}
.kb-step-label-top {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 8px;
  color: #94a3b8;
  white-space: nowrap;
  transition: all 0.35s ease;
}
.kb-timeline-step.active .kb-step-label-top {
  color: #0f766e;
  font-weight: 800;
}
.kb-timeline-step.completed .kb-step-label-top {
  color: #10b981;
}
.kb-timeline-node {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #ffffff;
  border: 3px solid #cbd5e1;
  transition: all 0.35s ease;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
  z-index: 3;
}
.kb-timeline-step.active .kb-timeline-node {
  border-color: #0d9488;
  background: #0d9488;
  box-shadow: 0 0 0 4px rgba(13, 148, 136, 0.25);
  transform: scale(1.1);
}
.kb-timeline-step.completed .kb-timeline-node {
  border-color: #10b981;
  background: #10b981;
  color: #ffffff;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
}
.kb-timeline-step.completed .kb-timeline-node::before {
  content: "✓";
  color: #ffffff;
  display: block;
}

/* Horizontal Track Line starts at Node 1 center (16.67%) and ends at Node 3 center (83.33%) */
.kb-timeline-bar-line {
  position: absolute;
  top: 33px;
  left: 16.67%;
  right: 16.67%;
  height: 3px;
  background: #e2e8f0;
  z-index: 1;
  border-radius: 999px;
  overflow: hidden;
}
.kb-timeline-bar-fill {
  height: 100%;
  width: 0%;
  background: #10b981;
  border-radius: 999px;
  transition: width 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 6px rgba(16, 185, 129, 0.4);
}

/* Vertical drop pin connecting active node to form card below */
.kb-timeline-step.active::after {
  content: "";
  position: absolute;
  top: 45px;
  left: 50%;
  transform: translateX(-50%);
  width: 2.5px;
  height: 34px;
  background: #0d9488;
  border-radius: 2px;
  animation: dropPinSlide 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes dropPinSlide {
  from { height: 0; opacity: 0; }
  to { height: 34px; opacity: 1; }
}

@media (max-width: 680px) {
  .kb-timeline-wrap {
    padding: 0 8px;
    margin: 14px auto 20px;
  }
  .kb-step-label-top {
    font-size: 10.5px;
    letter-spacing: 0.02em;
    margin-bottom: 6px;
    white-space: normal;
    line-height: 1.25;
  }
  .kb-timeline-node {
    width: 20px;
    height: 20px;
    border-width: 2.5px;
  }
  .kb-timeline-bar-line {
    top: 31px;
    height: 2.5px;
  }
  .kb-timeline-step.active::after {
    top: 39px;
    height: 22px;
  }
}

/* Main Form Outer Container */
.kb-form-card {
  background: #ffffff;
  border: 1px solid var(--line);
  border-radius: 18px;
  box-shadow: 0 4px 25px rgba(0,0,0,0.04);
  overflow: hidden;
}
.kb-form-body {
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 22px;
}
@media (max-width: 640px) {
  .kb-form-body {
    padding: 0;
    gap: 18px;
  }
}
.kb-step-inner {
  padding: 24px 30px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}
@media (max-width: 640px) {
  .kb-step-inner {
    padding: 18px 16px;
    gap: 18px;
  }
}

/* ========================================================
   Teal Green Luxury Train & Circuit Selector Box
   ======================================================== */
.kb-train-select-box {
  background: #3c4041;
  border-radius: 14px 14px 0 0px;
  padding: 22px 24px;
  color: #ffffff;
  box-shadow: 0 4px 18px rgba(15, 118, 110, 0.2);
  border: 1.5px solid #2f3233;
}
.kb-train-select-box .kb-label {
  color: #ffffff;
  font-size: 15.5px;
  font-weight: 700;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.kb-train-select-box .kb-label .req {
  color: #fef08a;
}
.kb-train-select-box .kb-select {
  background: #ffffff;
  color: #0f172a;
  border: 1.5px solid #3c4041;
  font-weight: 600;
  font-size: 15.5px;
  padding: 12px 14px;
  border-radius: 10px;
}
.kb-train-select-box .kb-select:focus {
  border-color: #14b8a6;
  box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.35);
}
.kb-train-select-box .kb-info-strip {
  background: rgba(0, 0, 0, 0.22);
  color: #f0fdfa;
  margin-top: 14px;
  border-radius: 10px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 9px;
}
.kb-train-select-box .kb-strip-top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px 16px;
}
.kb-train-select-box .kb-strip-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.kb-train-select-box .kb-strip-dur {
  color: #ffffff;
  background: #0d9488;
  font-weight: 700;
  padding: 4px 11px;
  border-radius: 6px;
  font-size: 13px;
  white-space: nowrap;
}
.kb-train-select-box .kb-strip-dep {
  color: #fef08a;
  background: rgba(0, 0, 0, 0.28);
  font-weight: 600;
  padding: 4px 11px;
  border-radius: 6px;
  font-size: 13px;
  white-space: nowrap;
}
.kb-train-select-box .kb-strip-from {
  color: #ccfbf1;
  font-weight: 500;
  font-size: 13.5px;
}
.kb-train-select-box .kb-strip-from b {
  color: #ffffff;
}
.kb-train-select-box .kb-strip-route {
  color: #f0fdfa;
  font-weight: 500;
  font-size: 13.5px;
  line-height: 1.45;
}
.kb-train-select-box .kb-strip-route-lbl {
  color: #99f6e4;
  font-weight: 700;
  margin-right: 6px;
}

/* Row Grids */
.kb-row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}
.kb-row-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
@media (max-width: 680px) {
  .kb-row-2, .kb-row-3 {
    grid-template-columns: 1fr;
    gap: 14px;
  }
}

.kb-label {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 7px;
}
.kb-label .req {
  color: var(--gold-dark);
}

.kb-select, .kb-input, .kb-textarea {
  width: 100%;
  font: inherit;
  font-size: 15px;
  color: #0f172a;
  background: #ffffff;
  border: 1px solid #f2ede4;
  border-radius: 8px;
  padding: 12px 14px;
  outline: none;
  box-sizing: border-box;
  transition: all 0.15s ease;
}
.kb-select:focus, .kb-input:focus, .kb-textarea:focus {
  border-color: #0d9488;
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.15);
}

/* Date Header with Year Select */
.kb-date-header-row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 14px;
  flex-wrap: wrap;
  gap: 10px;
}
.kb-sec-title {
  font-family: var(--font-body);
  font-size: 18.5px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}
.kb-dep-schedule-hint {
  font-size: 13.5px;
  color: #0f766e;
  margin: 4px 0 0;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}
.kb-year-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}
.kb-year-label {
  font-size: 14px;
  font-weight: 600;
  color: #475569;
}
.kb-year-select {
  padding: 7px 14px;
  font-size: 14.5px;
  font-weight: 700;
  border: 1.5px solid var(--gold-border);
  border-radius: 8px;
  background: var(--gold-bg);
  color: var(--brand);
  outline: none;
  cursor: pointer;
}
.kb-year-select:focus {
  border-color: var(--gold);
}

/* ========================================================
   Zebra Striped Month Table (Light Golden & White alternate)
   ======================================================== */
.kb-dates-container {
  /* border: 1px solid #ece5da; */
  border-radius: 12px;
  overflow: hidden;
  background: #ffffff;
}
.kb-month-row {
  display: flex;
  padding: 16px 20px;
  border-bottom: 1px solid #f5efe6;
  align-items: center;
  gap: 24px;
  transition: background 0.15s ease;
}
.kb-month-row:last-child {
  border-bottom: none;
}
.kb-month-row:nth-child(odd) {
  background: #faf8f5;
}
.kb-month-row:nth-child(even) {
  background: #ffffff; /* White */
}
@media (max-width: 680px) {
  .kb-month-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 16px;
  }
}
.kb-month-col {
  width: 155px;
  flex-shrink: 0;
}
.kb-month-name {
  font-size: 17.5px;
  color: var(--brand);
  letter-spacing: -0.01em;
  font-weight: 500;
}

/* Dates Grid inside row */
.kb-dates-col {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 18px;
}
@media (max-width: 600px) {
  .kb-dates-col {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}

/* Individual Pill Radio Button - Very Light Subtle Border */
.kb-date-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: #ffffff;
  border: 1px solid #f2ede4;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 15.5px;
  font-weight: 600;
  color: #1e293b;
  user-select: none;
  text-align: left;
}
.kb-month-row:nth-child(odd) .kb-date-item {
  background: #ffffff;
  border-color: #f2ede4;
}
.kb-month-row:nth-child(even) .kb-date-item {
  background: #faf8f5;
  border-color: #f2ede4;
}
.kb-date-item:hover {
  background: #f0fdfa;
  border-color: #14b8a6;
}
.kb-date-item[aria-checked="true"] {
  background: #f0fdfa !important;
  border-color: #0d9488 !important;
  box-shadow: 0 0 0 1.5px rgba(13, 148, 136, 0.25);
  color: #0f766e;
  font-weight: 700;
}
.kb-radio-circle {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid #989085;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: #ffffff;
  box-sizing: border-box;
  transition: all 0.2s ease;
}
.kb-date-item[aria-checked="true"] .kb-radio-circle {
  border-color: #0d9488;
  background: #0d9488;
}
.kb-date-item[aria-checked="true"] .kb-radio-circle::after {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ffffff;
}

.kb-flex-date-wrap {
  padding: 14px 20px;
  background: #faf8f5;
  border-top: 1px solid #f5efe6;
}

/* Step 2 & 3 Top Header Banner (Matches Step 1 Charcoal Theme) */
.kb-step2-summary-card {
  background: #3c4041;
  border: 1.5px solid #2f3233;
  border-radius: 14px 14px 0 0px;
  padding: 22px 24px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  box-shadow: 0 4px 18px rgba(15, 118, 110, 0.2);
}
.kb-s2-train {
  font-size: 19px;
  font-weight: 700;
  color: #ffffff;
}
.kb-s2-details {
  font-size: 13.5px;
  color: #f1f5f9;
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
}
.kb-s2-details b {
  color: #fef08a;
}
.kb-s2-pill {
  background: rgba(0, 0, 0, 0.28);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 13px;
  color: #f1f5f9;
}
.kb-btn-edit {
  font: inherit;
  font-size: 13.5px;
  font-weight: 700;
  color: #0f172a;
  background: #ffffff;
  border: 1.5px solid #3c4041;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}
.kb-btn-edit:hover {
  background: #f8fafc;
  border-color: #0d9488;
  color: #0d9488;
}
@media (max-width: 640px) {
  .kb-step2-summary-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 18px 16px;
    gap: 14px;
  }
  .kb-btn-edit {
    width: 100%;
    text-align: center;
  }
}

/* ========================================================
   Counters (Zero text overlap, flex-col with bold title)
   ======================================================== */
.kb-ctr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #f2ede4;
  border-radius: 10px;
  padding: 12px 16px;
  gap: 12px;
  background: #ffffff;
  transition: border-color 0.15s ease;
}
.kb-ctr:hover {
  border-color: #14b8a6;
}
.kb-ctr-label-wrap {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.kb-ctr-title {
  font-size: 15.5px;
  font-weight: 700;
  color: var(--brand);
  line-height: 1.25;
}
.kb-ctr-sub {
  color: var(--muted);
  font-size: 12px;
  font-weight: 500;
  line-height: 1.25;
}
.kb-ctr-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}
.kb-ctr-actions button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1.5px solid var(--gold-border);
  background: var(--gold-bg);
  color: var(--gold-dark);
  font-size: 19px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}
.kb-ctr-actions button:hover:not(:disabled) {
  border-color: var(--gold);
  background: var(--gold);
  color: #ffffff;
}
.kb-ctr-actions button:disabled {
  opacity: 0.35;
  cursor: default;
}
.kb-ctr-actions output {
  min-width: 24px;
  text-align: center;
  font-size: 17px;
  font-weight: 800;
  color: var(--brand);
}

/* ========================================================
   Step 3: Review & Confirm Styling (Regal Gold Accents)
   ======================================================== */
.kb-review-header {
  border-bottom: 1px solid var(--line);
  padding-bottom: 16px;
}
.kb-review-badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gold-dark);
  background: var(--gold-light);
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid var(--gold-border);
  margin-bottom: 6px;
}
.kb-review-section {
  border: none;
  border-radius: 0;
  background: transparent;
  padding: 0 0 22px 0;
  border-bottom: 1px solid #ece6dc;
}
.kb-review-section:last-of-type {
  border-bottom: none;
  padding-bottom: 4px;
}
.kb-review-sec-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: none;
  padding-bottom: 0;
  margin-bottom: 14px;
}
.kb-review-sec-title {
  font-size: 17px;
  font-weight: 700;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 8px;
}
.kb-btn-edit-sm {
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  color: #0d9488;
  background: #f0fdfa;
  border: 1.5px solid #0d9488;
  border-radius: 6px;
  padding: 4px 12px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: all 0.15s ease;
}
.kb-btn-edit-sm:hover {
  background: #0d9488;
  color: #ffffff;
}
.kb-review-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px 20px;
}
.kb-review-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px 20px;
}
@media (max-width: 640px) {
  .kb-review-grid-2, .kb-review-grid-3 {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
.kb-review-field {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.kb-review-field.full-width {
  grid-column: 1 / -1;
}
.kb-review-field .lbl {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--muted);
  font-weight: 600;
}
.kb-review-field .val {
  font-size: 15.5px;
  font-weight: 600;
  color: var(--brand);
}
.kb-review-field .val.highlight {
  color: var(--brand);
  font-weight: 800;
}
.kb-review-field .val.highlight-date {
  color: var(--gold-dark);
  font-weight: 800;
}
.kb-review-field .val.sub-val {
  font-size: 14px;
  color: #475569;
  font-weight: 500;
  line-height: 1.45;
}
.kb-review-guarantee {
  background: #faf8f5;
  border: 1px solid #f2ede4;
  border-radius: 12px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 14px;
}

/* Action Bars */
.kb-bottom-bar {
  background: #ffffff;
  border-top: 1px solid var(--line);
  padding: 16px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  box-shadow: 0 -4px 18px rgba(0,0,0,0.02);
}
@media (max-width: 600px) {
  .kb-bottom-bar {
    flex-direction: column;
    padding: 14px 16px;
  }
  .kb-bottom-bar button {
    width: 100%;
  }
}
.kb-btn-primary {
  font: inherit;
  font-weight: 700;
  font-size: 16px;
  border: 0;
  border-radius: 999px;
  padding: 13px 34px;
  cursor: pointer;
  background: #F8904D;
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(248, 144, 77, 0.35);
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.kb-btn-primary:hover:not(:disabled) {
  background: #e07b3b;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(248, 144, 77, 0.45);
}
.kb-btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.kb-btn-secondary {
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  background: none;
  border: 1.5px solid var(--gold-border);
  color: var(--gold-dark);
  padding: 12px 24px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.15s ease;
}
.kb-btn-secondary:hover {
  border-color: var(--gold);
  background: var(--gold-bg);
}

.err {
  color: var(--err);
  font-size: 13.5px;
  margin: 6px 0 0;
  font-weight: 600;
}

/* Done Box */
.kb-done-wrap {
  padding: 48px 24px;
  text-align: center;
}
.kb-done-wrap h2 {
  font-family: var(--font-head);
  font-size: 28px;
  color: var(--brand);
  margin: 14px 0 10px;
}
.kb-done-wrap p {
  color: var(--muted);
  max-width: 520px;
  margin: 0 auto 24px;
  font-size: 15.5px;
  line-height: 1.6;
}
</style>

<div class="kb-booking-page-wrap">
  <div class="kb-form-header">
    <div class="eyebrow">Luxury Trains of India</div>
    <h1>Reserve Your Luxury Train Journey</h1>
    <p>
      Select your preferred royal train, departure date, and guest information. Our senior rail advisor will verify official IRCTC berth allocations with zero booking fee.
    </p>
  </div>

  <!-- Timeline Stepper -->
  <div class="kb-timeline-wrap">
    <div class="kb-timeline-bar-line">
      <div class="kb-timeline-bar-fill" id="timeline-progress-fill"></div>
    </div>
    <div class="kb-timeline-steps">
      <div class="kb-timeline-step active" id="step-node-1" onclick="goToStep(1)">
        <span class="kb-step-label-top">STEP 01 • TRAIN &amp; DATE</span>
        <span class="kb-timeline-node"></span>
      </div>
      <div class="kb-timeline-step" id="step-node-2" onclick="goToStep(2)">
        <span class="kb-step-label-top">STEP 02 • TRAVELER DETAILS</span>
        <span class="kb-timeline-node"></span>
      </div>
      <div class="kb-timeline-step" id="step-node-3" onclick="goToStep(3)">
        <span class="kb-step-label-top">STEP 03 • REVIEW &amp; CONFIRM</span>
        <span class="kb-timeline-node"></span>
      </div>
    </div>
  </div>

  <div class="kb-form-card" id="form-card" aria-live="polite"></div>
</div>

<script>
var WHATSAPP = "919136739178";
var ENDPOINT = "/api/leads";

var FULL_MN = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function getOrdinal(n) {
  var s = ["th", "st", "nd", "rd"],
      v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

var TRAIN_SCHEDULE_NOTES = {
  "Palace on Wheels": "Palace on Wheels departures start every Wednesday from Delhi (Safdarjung)",
  "Maharajas’ Express": "Maharajas' Express departures start every Sunday (Delhi / Mumbai)",
  "Golden Chariot": "Golden Chariot departures start on scheduled Saturdays from Bengaluru",
  "Deccan Odyssey": "Deccan Odyssey departures start on scheduled Saturdays from Mumbai / Delhi"
};

var TRAIN_DEP_DAYS = {
  "Palace on Wheels": "Every Wednesday",
  "Maharajas’ Express": "Every Sunday",
  "Golden Chariot": "Select Saturdays",
  "Deccan Odyssey": "Select Saturdays"
};

function formatLuxuryDate(dateStr, includeDay) {
  if (!dateStr || dateStr === "flex") return "Flexible (Suggest best date)";
  var p = dateStr.split("-");
  if (p.length < 3) return dateStr;
  var year = p[0];
  var monthIdx = parseInt(p[1], 10) - 1;
  var dayNum = parseInt(p[2], 10);
  var dt = new Date(year, monthIdx, dayNum);
  var dayName = DAYS[dt.getDay()];
  var dayPad = (dayNum < 10 ? "0" : "") + dayNum;
  var ord = getOrdinal(dayNum);
  if (includeDay) {
    return dayName + ", " + dayPad + ord + " " + FULL_MN[monthIdx] + ", " + year;
  }
  return dayPad + ord + " " + FULL_MN[monthIdx] + ", " + year;
}

// Official Scheduled Departure Dates Dataset
var DATES = {
  "Palace on Wheels|Royal Rajasthan Circuit": [
    "2026-09-02", "2026-09-09", "2026-09-16", "2026-09-23", "2026-09-30",
    "2026-10-07", "2026-10-14", "2026-10-21", "2026-10-28",
    "2026-11-04", "2026-11-11", "2026-11-18", "2026-11-25",
    "2026-12-02", "2026-12-09", "2026-12-16", "2026-12-23", "2026-12-30",
    "2027-01-06", "2027-01-13", "2027-01-20", "2027-01-27",
    "2027-02-03", "2027-02-10", "2027-02-17", "2027-02-24",
    "2027-03-03", "2027-03-10", "2027-03-17", "2027-03-24", "2027-03-31",
    "2027-04-07", "2027-04-14", "2027-04-21", "2027-04-28",
    "2027-09-01", "2027-09-08", "2027-09-15", "2027-09-22", "2027-09-29",
    "2027-10-06", "2027-10-13", "2027-10-20", "2027-10-27",
    "2027-11-03", "2027-11-10", "2027-11-17", "2027-11-24",
    "2027-12-01", "2027-12-08", "2027-12-15", "2027-12-22", "2027-12-29",
    "2028-01-05", "2028-01-12", "2028-01-19", "2028-01-26",
    "2028-02-02", "2028-02-09", "2028-02-16", "2028-02-23",
    "2028-03-01", "2028-03-08", "2028-03-15", "2028-03-22", "2028-03-29",
    "2028-04-05", "2028-04-12", "2028-04-19", "2028-04-26"
  ],
  "Maharajas’ Express|Heritage of India": [
    "2026-10-18", "2026-11-15", "2026-12-13", "2027-01-10", "2027-02-07", "2027-03-07",
    "2027-10-17", "2027-11-14", "2027-12-12", "2028-01-09", "2028-02-06", "2028-03-05"
  ],
  "Maharajas’ Express|The Indian Panorama": [
    "2026-10-04", "2026-11-01", "2026-11-29", "2026-12-27", "2027-01-24", "2027-02-21", "2027-03-21",
    "2027-10-03", "2027-10-31", "2027-11-28", "2027-12-26", "2028-01-23", "2028-02-20", "2028-03-19"
  ],
  "Maharajas’ Express|Indian Splendor": [
    "2026-10-11", "2026-11-08", "2026-12-06", "2027-01-03", "2027-01-31", "2027-02-28", "2027-03-28",
    "2027-10-10", "2027-11-07", "2027-12-05", "2028-01-02", "2028-01-30", "2028-02-27", "2028-03-26"
  ],
  "Maharajas’ Express|Treasures of India": [
    "2026-10-25", "2026-11-22", "2026-12-20", "2027-01-17", "2027-02-14", "2027-03-14",
    "2027-10-24", "2027-11-21", "2027-12-19", "2028-01-16", "2028-02-13", "2028-03-12"
  ],
  "Golden Chariot|Pride of Karnataka": [
    "2026-10-03", "2026-11-07", "2026-12-05", "2027-01-02", "2027-02-06", "2027-03-06",
    "2027-10-02", "2027-11-06", "2027-12-04", "2028-01-01", "2028-02-05", "2028-03-04"
  ],
  "Golden Chariot|Jewels of South": [
    "2026-10-17", "2026-11-21", "2026-12-19", "2027-01-16", "2027-02-20", "2027-03-20",
    "2027-10-16", "2027-11-20", "2027-12-18", "2028-01-15", "2028-02-19", "2028-03-18"
  ],
  "Golden Chariot|Glimpses of Karnataka": [
    "2026-10-24", "2026-11-28", "2026-12-26", "2027-01-23", "2027-02-27", "2027-03-27",
    "2027-10-23", "2027-11-27", "2027-12-25", "2028-01-22", "2028-02-26", "2028-03-25"
  ],
  "Deccan Odyssey|Maharashtra Splendor": [
    "2026-10-03", "2026-11-14", "2026-12-12", "2027-01-09", "2027-02-13", "2027-03-13",
    "2027-10-02", "2027-11-13", "2027-12-11", "2028-01-08", "2028-02-12", "2028-03-11"
  ],
  "Deccan Odyssey|Indian Odyssey": [
    "2026-10-17", "2026-11-28", "2026-12-26", "2027-01-23", "2027-02-27", "2027-03-27",
    "2027-10-16", "2027-11-27", "2027-12-25", "2028-01-22", "2028-02-26", "2028-03-25"
  ],
  "Deccan Odyssey|Indian Sojourn": [
    "2026-10-24", "2026-12-05", "2027-01-16", "2027-02-20", "2027-03-20",
    "2027-10-23", "2027-12-04", "2028-01-15", "2028-02-19", "2028-03-18"
  ],
  "Deccan Odyssey|Maharashtra Wild Trail": [
    "2026-10-10", "2026-11-21", "2026-12-19", "2027-01-02", "2027-02-06", "2027-03-06",
    "2027-09-25", "2027-10-09", "2027-11-20", "2027-12-18", "2028-01-01", "2028-02-05", "2028-03-04"
  ],
  "Deccan Odyssey|Heritage Odyssey": [
    "2026-10-31", "2026-11-07", "2027-01-30", "2027-10-30", "2027-11-06", "2028-01-29"
  ],
  "Deccan Odyssey|Cultural Odyssey": [
    "2026-11-07", "2026-12-05", "2027-01-02", "2027-02-06",
    "2027-11-06", "2027-12-04", "2028-01-01", "2028-02-05"
  ]
};

var TRAINS = [
  {
    id: "Palace on Wheels",
    slug: "palace-on-wheels",
    journeys: [
      {
        n: "Royal Rajasthan Circuit",
        slug: "classic-rajasthan",
        d: "7 nights / 8 days",
        r: "Delhi round trip via Jaipur, Ranthambore, Udaipur, Jaisalmer, Jodhpur, Agra",
        from: "Delhi (Safdarjung Station)"
      }
    ]
  },
  {
    id: "Maharajas’ Express",
    slug: "maharajas-express",
    journeys: [
      {
        n: "Heritage of India",
        slug: "the-heritage-of-india",
        d: "6 nights / 7 days",
        r: "Mumbai to Delhi via Udaipur, Jodhpur, Bikaner, Jaipur, Ranthambore, Agra",
        from: "Mumbai (CSMT)"
      },
      {
        n: "The Indian Panorama",
        slug: "the-indian-panorama",
        d: "6 nights / 7 days",
        r: "Delhi round trip via Jaipur, Agra, Orchha, Khajuraho, Varanasi",
        from: "Delhi (Safdarjung Station)"
      },
      {
        n: "Indian Splendor",
        slug: "the-indian-splendour",
        d: "6 nights / 7 days",
        r: "Delhi to Mumbai via Agra, Ranthambore, Jaipur, Bikaner, Jodhpur, Udaipur",
        from: "Delhi (Safdarjung Station)"
      },
      {
        n: "Treasures of India",
        slug: "treasures-of-india",
        d: "3 nights / 4 days",
        r: "Delhi round trip via Agra, Ranthambore, Jaipur",
        from: "Delhi (Safdarjung Station)"
      }
    ]
  },
  {
    id: "Golden Chariot",
    slug: "golden-chariot",
    journeys: [
      {
        n: "Pride of Karnataka",
        slug: "pride-of-karnataka",
        d: "5 nights / 6 days",
        r: "Bengaluru round trip via Mysuru, Hampi, Badami and Goa",
        from: "Bengaluru (Yeshvantpur)"
      },
      {
        n: "Jewels of South",
        slug: "jewels-of-south",
        d: "5 nights / 6 days",
        r: "Bengaluru round trip via Mahabalipuram, Thanjavur, Chettinad, Kochi, Kumarakom",
        from: "Bengaluru (Yeshvantpur)"
      },
      {
        n: "Glimpses of Karnataka",
        slug: "glimpses-of-karnataka",
        d: "3 nights / 4 days",
        r: "Bengaluru round trip via Mysuru and Hampi",
        from: "Bengaluru (Yeshvantpur)"
      }
    ]
  },
  {
    id: "Deccan Odyssey",
    slug: "deccan-odyssey",
    journeys: [
      {
        n: "Maharashtra Splendor",
        slug: "maharashtra-splendour",
        d: "7 nights / 8 days",
        r: "Mumbai round trip via Nashik, Ajanta, Ellora, Kolhapur, Goa",
        from: "Mumbai (CSMT)"
      },
      {
        n: "Indian Odyssey",
        slug: "indian-odyssey",
        d: "7 nights / 8 days",
        r: "Delhi to Mumbai via Agra, Ranthambore, Jaipur, Udaipur, Vadodara, Ellora",
        from: "Delhi"
      },
      {
        n: "Indian Sojourn",
        slug: "indian-sojourn",
        d: "7 nights / 8 days",
        r: "Mumbai to Delhi via Vadodara, Udaipur, Jodhpur, Agra, Ranthambore, Jaipur",
        from: "Mumbai (CSMT)"
      },
      {
        n: "Maharashtra Wild Trail",
        slug: "maharashtra-wild-trail",
        d: "7 nights / 8 days",
        r: "Mumbai round trip via Aurangabad, Ramtek (Pench), Tadoba, Ajanta, Nashik",
        from: "Mumbai (CSMT)"
      },
      {
        n: "Heritage Odyssey",
        slug: "heritage-odyssey",
        d: "7 nights / 8 days",
        r: "Delhi round trip via Agra, Jaipur, Bikaner, Jaisalmer, Jodhpur, Udaipur",
        from: "Delhi"
      },
      {
        n: "Cultural Odyssey",
        slug: "cultural-odyssey",
        d: "7 nights / 8 days",
        r: "Delhi round trip via Agra, Jaipur, Gwalior, Orchha, Khajuraho, Varanasi",
        from: "Delhi"
      }
    ]
  }
];

function T() {
  return TRAINS.filter(function(t) { return t.id === S.train; })[0];
}

function J(t) {
  return t.journeys.filter(function(j) { return j.n === S.journey; })[0];
}

function avail(t, j) {
  var key = t.id + "|" + j.n;
  return DATES[key] || [];
}

var EXTRAS = ["Hotels before/after", "Flights", "Airport transfers", "Extra sightseeing", "Visa assistance"];
var S = {
  currentStep: 1,
  train: "Palace on Wheels",
  journey: "Royal Rajasthan Circuit",
  selectedYear: "2026",
  date: "",
  adults: 2,
  kids: 0,
  cabins: 1,
  extras: [],
  name: "",
  email: "",
  phone: "",
  msg: ""
};

var err = {}, status = "idle";
var formCard = document.getElementById("form-card");

// Parse URL query params (?train=...&journey=...)
var urlParams = new URLSearchParams(location.search);
var qTrain = urlParams.get("train");
var qJourney = urlParams.get("journey");

if (qTrain) {
  var cleanQ = qTrain.toLowerCase().replace(/[^a-z]/g, "");
  var matchedTrain = TRAINS.filter(function(t) {
    var tClean = t.id.toLowerCase().replace(/[^a-z]/g, "");
    var sClean = (t.slug || "").toLowerCase().replace(/[^a-z]/g, "");
    return tClean.indexOf(cleanQ) === 0 || cleanQ.indexOf(tClean) === 0 || sClean.indexOf(cleanQ) === 0 || cleanQ.indexOf(sClean) === 0;
  })[0];

  if (matchedTrain) {
    S.train = matchedTrain.id;
    S.journey = matchedTrain.journeys[0].n;
  }
}

if (qJourney && S.train) {
  var trObj = T();
  if (trObj) {
    var cleanJ = qJourney.toLowerCase().replace(/[^a-z]/g, "");
    var matchedJourney = trObj.journeys.filter(function(j) {
      var jClean = j.n.toLowerCase().replace(/[^a-z]/g, "");
      var sClean = (j.slug || "").toLowerCase().replace(/[^a-z]/g, "");
      return jClean.indexOf(cleanJ) > -1 || cleanJ.indexOf(jClean) > -1 || sClean.indexOf(cleanJ) > -1 || cleanJ.indexOf(sClean) > -1;
    })[0];
    if (matchedJourney) {
      S.journey = matchedJourney.n;
    }
  }
}

function esc(s) {
  return String(s || "").replace(/[&<>"']/g, function(c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

function summary() {
  return "Train: " + S.train + " (" + S.journey + ")" +
    " | Departure: " + (S.date ? formatLuxuryDate(S.date) : "Not selected") +
    " | Guests: " + S.adults + " adults, " + S.kids + " children (" + S.cabins + " cabin" + (S.cabins > 1 ? "s" : "") + ")";
}

function E(k) {
  return err[k] ? '<p class="err" role="alert">' + err[k] + '</p>' : "";
}

function updateTimeline() {
  var n1 = document.getElementById("step-node-1");
  var n2 = document.getElementById("step-node-2");
  var n3 = document.getElementById("step-node-3");
  var fill = document.getElementById("timeline-progress-fill");
  if (!n1 || !n2 || !n3) return;

  if (S.currentStep === 1) {
    n1.className = "kb-timeline-step active";
    n2.className = "kb-timeline-step";
    n3.className = "kb-timeline-step";
    if (fill) fill.style.width = "0%";
  } else if (S.currentStep === 2) {
    n1.className = "kb-timeline-step completed";
    n2.className = "kb-timeline-step active";
    n3.className = "kb-timeline-step";
    if (fill) fill.style.width = "50%";
  } else if (S.currentStep === 3) {
    n1.className = "kb-timeline-step completed";
    n2.className = "kb-timeline-step completed";
    n3.className = "kb-timeline-step active";
    if (fill) fill.style.width = "100%";
  }
}

function goToStep(stepNum) {
  if (stepNum === 1) {
    S.currentStep = 1;
    err = {};
    render();
    window.scrollTo({ top: formCard.offsetTop - 40, behavior: "smooth" });
  } else if (stepNum === 2) {
    if (validateStep1()) {
      S.currentStep = 2;
      err = {};
      render();
      window.scrollTo({ top: formCard.offsetTop - 40, behavior: "smooth" });
    }
  } else if (stepNum === 3) {
    if (validateStep1() && validateStep2()) {
      S.currentStep = 3;
      err = {};
      render();
      window.scrollTo({ top: formCard.offsetTop - 40, behavior: "smooth" });
    }
  }
}

function render() {
  updateTimeline();

  if (status === "done") {
    formCard.innerHTML = '<div class="kb-done-wrap">' +
      '<div style="width:64px;height:64px;border-radius:50%;background:#dcfce7;color:#15803d;display:inline-flex;align-items:center;justify-content:center;font-size:32px;margin-bottom:16px">✓</div>' +
      '<h2>Inquiry Received Successfully!</h2>' +
      '<p>Thank you, ' + esc(S.name) + '. Your booking request for <b>' + esc(S.train) + ' (' + esc(S.journey) + ')</b> on <b>' + formatLuxuryDate(S.date) + '</b> has been received. Our senior rail advisor will email your official itemized quote to <b>' + esc(S.email) + '</b> within 2 hours.</p>' +
      '<a class="kb-btn-primary" href="https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent("Hi KoiKoi Travel, I just submitted an inquiry for " + summary() + ". My name is " + S.name + " (" + S.phone + "). Please confirm cabin availability.") + '" target="_blank" rel="noopener">' +
      '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.659-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>' +
      '<span>Continue Directly on WhatsApp</span>' +
      '</a></div>';
    return;
  }

  var tr = T();
  var jn = J(tr);
  var allDates = avail(tr, jn);

  // Extract unique years from dates
  var years = [];
  allDates.forEach(function(d) {
    var y = d.slice(0, 4);
    if (years.indexOf(y) === -1) years.push(y);
  });
  if (years.indexOf(S.selectedYear) === -1 && years.length > 0) {
    S.selectedYear = years[0];
  }

  // Filter dates for the selected year
  var filteredDates = S.selectedYear === "all" ? allDates : allDates.filter(function(d) {
    return d.slice(0, 4) === S.selectedYear;
  });

  // Group filtered dates by Month (YYYY-MM)
  var monthsMap = {};
  filteredDates.forEach(function(d) {
    var mKey = d.slice(0, 7);
    if (!monthsMap[mKey]) monthsMap[mKey] = [];
    monthsMap[mKey].push(d);
  });
  var monthKeys = Object.keys(monthsMap);

  var h = '<div class="kb-form-body">';

  // =========================================================================
  // STEP 1: TRAIN, CIRCUIT & SCHEDULED DEPARTURE DATE
  // =========================================================================
  if (S.currentStep === 1) {
    h += '<div class="kb-train-select-box">' +
      '<div class="kb-row-2">' +
      '<div>' +
      '<label class="kb-label" for="train-select">Select Luxury Train <span class="req">*</span></label>' +
      '<select id="train-select" class="kb-select" onchange="onTrainSelect(this.value)">' +
      TRAINS.map(function(t) {
        return '<option value="' + esc(t.id) + '"' + (S.train === t.id ? ' selected' : '') + '>' + t.id + '</option>';
      }).join("") +
      '</select>' +
      '</div>' +
      '<div>' +
      '<label class="kb-label" for="journey-select">Select Journey Circuit <span class="req">*</span></label>' +
      '<select id="journey-select" class="kb-select" onchange="onJourneySelect(this.value)">' +
      tr.journeys.map(function(j) {
        return '<option value="' + esc(j.n) + '"' + (S.journey === j.n ? ' selected' : '') + '>' + j.n + ' (' + j.d + ')</option>';
      }).join("") +
      '</select>' +
      '</div>' +
      '</div>' +
      '<div class="kb-info-strip">' +
      '<div class="kb-strip-top">' +
      '<div class="kb-strip-tags">' +
      '<span class="kb-strip-dur">' + jn.d + '</span>' +
      '<span class="kb-strip-dep">🗓️ Departs: <b>' + (TRAIN_DEP_DAYS[S.train] || 'Scheduled Dates') + '</b></span>' +
      '</div>' +
      '<span class="kb-strip-from">📍 Journey starts from: <b>' + jn.from + '</b></span>' +
      '</div>' +
      '<div class="kb-strip-route"><span class="kb-strip-route-lbl">Route:</span> ' + jn.r + '</div>' +
      '</div>' +
      E("train") + E("journey") +
      '</div>';

    // Dates Section: Filter Year Dropdown Centered (Heading removed as requested)
    h += '<div style="margin-top:12px">' +
      '<div class="kb-date-header-row">' +
      '<div class="kb-year-wrap">' +
      '<span class="kb-year-label">Select Year:</span>' +
      '<select class="kb-year-select" onchange="onYearSelect(this.value)">' +
      years.map(function(y) {
        return '<option value="' + y + '"' + (S.selectedYear === y ? ' selected' : '') + '>Year ' + y + '</option>';
      }).join("") +
      '<option value="all"' + (S.selectedYear === "all" ? ' selected' : '') + '>All Years</option>' +
      '</select>' +
      '</div>' +
      '</div>';

    // Dates List: Clean Radio Items (NO CARDS / NO BOXED BORDERS)
    if (monthKeys.length > 0) {
      h += '<div class="kb-dates-container" role="radiogroup" aria-label="Departure date">';
      monthKeys.forEach(function(mKey) {
        var mParts = mKey.split("-");
        var mName = FULL_MN[parseInt(mParts[1], 10) - 1];
        var yName = mParts[0];
        var datesInMonth = monthsMap[mKey];

        h += '<div class="kb-month-row">' +
          '<div class="kb-month-col">' +
          '<div class="kb-month-name">' + mName + ' ' + yName + '</div>' +
          '</div>' +
          '<div class="kb-dates-col">';

        datesInMonth.forEach(function(d) {
          var isChecked = S.date === d;
          h += '<button type="button" class="kb-date-item" role="radio" aria-checked="' + isChecked + '" data-date="' + d + '">' +
            '<span class="kb-radio-circle"></span>' +
            '<span>' + formatLuxuryDate(d) + '</span>' +
            '</button>';
        });

        h += '</div></div>';
      });

      h += '</div>';
    } else {
      h += '<p style="color:var(--muted);font-size:15px;padding:12px 0">No scheduled departures found for this year. Please select another year.</p>';
    }
    h += E("date") + '</div>';

    h += '</div>'; // end kb-form-body

    // Step 1 Footer Bar
    h += '<div class="kb-bottom-bar" style="justify-content:flex-end">' +
      '<button type="button" class="kb-btn-primary" id="btn-goto-step2">' +
      '<span>Continue to Traveler Details →</span>' +
      '</button>' +
      '</div>';
  }

  // =========================================================================
  // STEP 2: TRAVELERS & CONTACT DETAILS (Zero Text Overlap)
  // =========================================================================
  else if (S.currentStep === 2) {
    // Summary Pill of Chosen Train & Date with Edit Button (Flush at top like Step 1)
    h += '<div class="kb-step2-summary-card">' +
      '<div>' +
      '<div class="kb-s2-train">' + esc(S.train) + ' · ' + esc(S.journey) + '</div>' +
      '<div class="kb-s2-details">' +
      '<span class="kb-s2-pill">🗓️ Departure: <b>' + formatLuxuryDate(S.date) + '</b> (' + jn.d + ')</span>' +
      '<span class="kb-s2-pill">📍 Starts: <b>' + jn.from + '</b></span>' +
      '</div>' +
      '</div>' +
      '<button type="button" class="kb-btn-edit" id="btn-back-step1">Change Train / Date ✎</button>' +
      '</div>';

    h += '<div class="kb-step-inner">';

    // 1. Number of Travelers Counters
    h += '<div>' +
      '<h2 class="kb-sec-title" style="margin-bottom:14px">Number of Travelers</h2>' +
      '<div class="kb-row-3">' +
      '<div class="kb-ctr">' +
      '<div class="kb-ctr-label-wrap">' +
      '<span class="kb-ctr-title">Adults</span>' +
      '<span class="kb-ctr-sub">12+ years</span>' +
      '</div>' +
      '<div class="kb-ctr-actions">' +
      '<button type="button" data-dec="adults" aria-label="Fewer adults"' + (S.adults <= 1 ? " disabled" : "") + '>−</button>' +
      '<output>' + S.adults + '</output>' +
      '<button type="button" data-inc="adults" aria-label="More adults">+</button>' +
      '</div>' +
      '</div>' +
      '<div class="kb-ctr">' +
      '<div class="kb-ctr-label-wrap">' +
      '<span class="kb-ctr-title">Children</span>' +
      '<span class="kb-ctr-sub">5–12 years</span>' +
      '</div>' +
      '<div class="kb-ctr-actions">' +
      '<button type="button" data-dec="kids" aria-label="Fewer children"' + (S.kids <= 0 ? " disabled" : "") + '>−</button>' +
      '<output>' + S.kids + '</output>' +
      '<button type="button" data-inc="kids" aria-label="More children">+</button>' +
      '</div>' +
      '</div>' +
      '<div class="kb-ctr">' +
      '<div class="kb-ctr-label-wrap">' +
      '<span class="kb-ctr-title">Cabins Needed</span>' +
      '<span class="kb-ctr-sub">Twin / Double</span>' +
      '</div>' +
      '<div class="kb-ctr-actions">' +
      '<button type="button" data-dec="cabins" aria-label="Fewer cabins"' + (S.cabins <= 1 ? " disabled" : "") + '>−</button>' +
      '<output>' + S.cabins + '</output>' +
      '<button type="button" data-inc="cabins" aria-label="More cabins">+</button>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';

    // 2. Personal Information
    h += '<div>' +
      '<h2 class="kb-sec-title" style="margin-bottom:14px">Lead Traveler Contact Information</h2>' +
      '<div class="kb-row-3">' +
      '<div><label class="kb-label" for="name">Full Name <span class="req">*</span></label><input type="text" id="name" class="kb-input" autocomplete="name" placeholder="e.g. Eleanor Vance" value="' + esc(S.name) + '">' + E("name") + '</div>' +
      '<div><label class="kb-label" for="phone">WhatsApp or Phone <span class="req">*</span></label><input type="tel" id="phone" class="kb-input" inputmode="tel" autocomplete="tel" placeholder="+1 (555) 019-2834" value="' + esc(S.phone) + '">' + E("phone") + '</div>' +
      '<div><label class="kb-label" for="email">Email Address <span class="req">*</span></label><input type="email" id="email" class="kb-input" inputmode="email" autocomplete="email" placeholder="eleanor@example.com" value="' + esc(S.email) + '">' + E("email") + '</div>' +
      '</div>' +
      '</div>';

    h += '</div>'; // end kb-step-inner
    h += '</div>'; // end kb-form-body

    // Step 2 Footer Bar
    h += '<div class="kb-bottom-bar">' +
      '<button type="button" class="kb-btn-secondary" id="btn-back-step1-bar">← Back to Dates</button>' +
      '<button type="button" class="kb-btn-primary" id="btn-goto-step3">' +
      '<span>Continue to Review & Confirm →</span>' +
      '</button>' +
      '</div>';
  }

  // =========================================================================
  // STEP 3: REVIEW & CONFIRM (Full Visibility + Instant Edit)
  // =========================================================================
  else if (S.currentStep === 3) {
    // Top Charcoal Banner (Flush at top, matches Step 1 & Step 2)
    h += '<div class="kb-step2-summary-card">' +
      '<div>' +
      '<div class="kb-s2-train">Review Your Luxury Train Booking Inquiry</div>' +
      '<div class="kb-s2-details">' +
      '<span class="kb-s2-pill">Step 3 of 3 · Final Verification</span>' +
      '<span style="font-size:13px;color:#f1f5f9">Please verify your details before requesting your official IRCTC quote.</span>' +
      '</div>' +
      '</div>' +
      '</div>';

    h += '<div class="kb-step-inner">';

    // Section 1: Train & Journey Details
    h += '<div class="kb-review-section">' +
      '<div class="kb-review-sec-header">' +
      '<div class="kb-review-sec-title"><span>🚂</span><span>Luxury Train &amp; Route</span></div>' +
      '<button type="button" class="kb-btn-edit-sm" onclick="goToStep(1)"><span>✎</span> Edit</button>' +
      '</div>' +
      '<div class="kb-review-grid-2">' +
      '<div class="kb-review-field"><span class="lbl">Train Name</span><span class="val highlight">' + esc(S.train) + '</span></div>' +
      '<div class="kb-review-field"><span class="lbl">Circuit &amp; Duration</span><span class="val">' + esc(S.journey) + ' (' + jn.d + ')</span></div>' +
      '<div class="kb-review-field"><span class="lbl">Scheduled Departure Date</span><span class="val highlight-date">📅 ' + formatLuxuryDate(S.date) + '</span></div>' +
      '<div class="kb-review-field"><span class="lbl">Boarding Station</span><span class="val">📍 ' + esc(jn.from) + '</span></div>' +
      '<div class="kb-review-field full-width"><span class="lbl">Route Itinerary</span><span class="val sub-val">' + esc(jn.r) + '</span></div>' +
      '</div>' +
      '</div>';

    // Section 2: Travelers & Accommodation
    h += '<div class="kb-review-section">' +
      '<div class="kb-review-sec-header">' +
      '<div class="kb-review-sec-title"><span>👥</span><span>Travelers &amp; Accommodation</span></div>' +
      '<button type="button" class="kb-btn-edit-sm" onclick="goToStep(2)"><span>✎</span> Edit</button>' +
      '</div>' +
      '<div class="kb-review-grid-3">' +
      '<div class="kb-review-field"><span class="lbl">Adults (12+ yrs)</span><span class="val">' + S.adults + ' Adults</span></div>' +
      '<div class="kb-review-field"><span class="lbl">Children (5-12 yrs)</span><span class="val">' + (S.kids > 0 ? S.kids + ' Children' : 'None') + '</span></div>' +
      '<div class="kb-review-field"><span class="lbl">Cabins Requested</span><span class="val">' + S.cabins + ' Deluxe Cabin' + (S.cabins > 1 ? 's' : '') + '</span></div>' +
      '</div>' +
      '</div>';

    // Section 3: Contact Details
    h += '<div class="kb-review-section">' +
      '<div class="kb-review-sec-header">' +
      '<div class="kb-review-sec-title"><span>✉️</span><span>Lead Traveler Contact</span></div>' +
      '<button type="button" class="kb-btn-edit-sm" onclick="goToStep(2)"><span>✎</span> Edit</button>' +
      '</div>' +
      '<div class="kb-review-grid-3">' +
      '<div class="kb-review-field"><span class="lbl">Full Name</span><span class="val">' + esc(S.name) + '</span></div>' +
      '<div class="kb-review-field"><span class="lbl">WhatsApp / Phone</span><span class="val">' + esc(S.phone) + '</span></div>' +
      '<div class="kb-review-field"><span class="lbl">Email Address</span><span class="val">' + esc(S.email) + '</span></div>' +
      '</div>' +
      '</div>'; // end review section

    h += '</div>'; // end kb-step-inner
    h += '</div>'; // end kb-form-body

    // Step 3 Footer Bar
    h += '<div class="kb-bottom-bar">' +
      '<button type="button" class="kb-btn-secondary" id="btn-back-step2-bar">← Back to Edit Details</button>' +
      '<button type="button" class="kb-btn-primary" id="btn-submit"' + (status === "sending" ? " disabled" : "") + '>' +
      (status === "sending" ? "Securing allocation..." : "Confirm & Request Official Quote →") +
      '</button>' +
      '</div>';
  }

  formCard.innerHTML = h;
}

function onTrainSelect(val) {
  S.train = val;
  var tr = T();
  S.journey = tr.journeys[0].n;
  S.date = "";
  render();
}

function onJourneySelect(val) {
  S.journey = val;
  S.date = "";
  render();
}

function onYearSelect(val) {
  S.selectedYear = val;
  render();
}

function validateStep1() {
  err = {};
  if (!S.train) err.train = "Please select a luxury train.";
  if (!S.journey) err.journey = "Please select a journey circuit.";
  if (!S.date) err.date = "Please select a departure date or choose 'Not sure'.";
  return Object.keys(err).length === 0;
}

function validateStep2() {
  err = {};
  if (S.name.trim().length < 2) err.name = "Please enter your full name.";
  if (S.phone.replace(/\\D/g, "").length < 8) err.phone = "Enter a valid phone number with country code.";
  if (!/^\\S+@\\S+\\.\\S+$/.test(S.email)) err.email = "Enter a valid email address.";
  return Object.keys(err).length === 0;
}

function send() {
  status = "sending";
  render();

  var body = {
    train: S.train,
    journey: S.journey,
    departureDate: S.date === "flex" ? "Flexible / Advise Best Date" : formatLuxuryDate(S.date),
    adults: S.adults,
    children: S.kids,
    cabins: S.cabins,
    name: S.name,
    email: S.email,
    phone: S.phone,
    summary: summary(),
    source: "KoiKoi Luxury Train 3-Step Wizard"
  };

  fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
  .then(function(r) {
    status = "done";
    render();
  })
  .catch(function() {
    status = "done";
    render();
  });
}

formCard.addEventListener("click", function(e) {
  var t = e.target.closest("button");
  if (!t) return;
  var d = t.dataset;

  if (d.date) {
    S.date = d.date;
    err = {};
    render();
  } else if (d.inc) {
    S[d.inc]++;
    render();
  } else if (d.dec) {
    S[d.dec]--;
    render();
  } else if (d.extra) {
    var i = S.extras.indexOf(d.extra);
    i > -1 ? S.extras.splice(i, 1) : S.extras.push(d.extra);
    render();
  } else if (t.id === "btn-goto-step2") {
    if (validateStep1()) {
      S.currentStep = 2;
      err = {};
      render();
      window.scrollTo({ top: formCard.offsetTop - 40, behavior: "smooth" });
    } else {
      render();
      var errEl = document.querySelector(".err");
      if (errEl) errEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  } else if (t.id === "btn-goto-step3") {
    if (validateStep2()) {
      S.currentStep = 3;
      err = {};
      render();
      window.scrollTo({ top: formCard.offsetTop - 40, behavior: "smooth" });
    } else {
      render();
      var firstErrEl = document.querySelector(".err");
      if (firstErrEl) firstErrEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  } else if (t.id === "btn-back-step1" || t.id === "btn-back-step1-bar") {
    S.currentStep = 1;
    err = {};
    render();
    window.scrollTo({ top: formCard.offsetTop - 40, behavior: "smooth" });
  } else if (t.id === "btn-back-step2-bar") {
    S.currentStep = 2;
    err = {};
    render();
    window.scrollTo({ top: formCard.offsetTop - 40, behavior: "smooth" });
  } else if (t.id === "btn-submit") {
    send();
  }
});

formCard.addEventListener("input", function(e) {
  var id = e.target.id;
  if (["name", "email", "phone", "msg"].indexOf(id) > -1) {
    S[id] = e.target.value;
  }
});

render();
</script>
"""
    return html.replace("__BASE_PATH__", base_path)
