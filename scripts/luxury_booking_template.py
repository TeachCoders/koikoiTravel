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
   Timeline Stepper (Matches user reference image)
   Warm gold track line + right arrow + labels + drop pin
   ======================================================== */
.kb-timeline-wrap {
  position: relative;
  max-width: 780px;
  margin: 24px auto 36px;
  padding: 0 24px;
}
.kb-timeline-bar-line {
  position: absolute;
  top: 32px;
  left: 60px;
  right: 60px;
  height: 2px;
  background: var(--gold-border);
  z-index: 1;
}
.kb-timeline-arrow {
  position: absolute;
  right: 46px;
  top: 28px;
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 9px solid var(--gold-dark);
  z-index: 1;
}
.kb-timeline-steps {
  position: relative;
  display: flex;
  justify-content: space-between;
  z-index: 2;
}
.kb-timeline-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
  width: 220px;
  user-select: none;
}
.kb-step-label-top {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 8px;
  color: #94a3b8;
  white-space: nowrap;
  transition: color 0.2s ease;
}
.kb-timeline-step.active .kb-step-label-top {
  color: var(--gold-dark);
}
.kb-timeline-step.completed .kb-step-label-top {
  color: var(--teal);
}
.kb-timeline-node {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #ffffff;
  border: 3px solid var(--gold-border);
  transition: all 0.25s ease;
  box-sizing: border-box;
}
.kb-timeline-step.active .kb-timeline-node {
  border-color: var(--gold);
  background: var(--gold);
  box-shadow: 0 0 0 4px rgba(217, 119, 6, 0.25);
}
.kb-timeline-step.completed .kb-timeline-node {
  border-color: var(--teal);
  background: var(--teal);
}
/* Vertical drop pin connecting active node to form card below */
.kb-timeline-step.active::after {
  content: "";
  position: absolute;
  top: 42px;
  width: 2px;
  height: 22px;
  background: var(--gold);
}

@media (max-width: 640px) {
  .kb-timeline-wrap {
    padding: 0 10px;
    margin: 16px auto 26px;
  }
  .kb-timeline-bar-line {
    left: 40px;
    right: 40px;
    top: 30px;
  }
  .kb-timeline-arrow {
    right: 30px;
    top: 26px;
  }
  .kb-timeline-step {
    width: auto;
  }
  .kb-step-label-top {
    font-size: 10px;
    letter-spacing: 0.04em;
    margin-bottom: 6px;
  }
  .kb-timeline-step.active::after {
    top: 38px;
    height: 18px;
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
  padding: 26px 30px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}
@media (max-width: 640px) {
  .kb-form-body {
    padding: 18px 16px;
    gap: 18px;
  }
}

/* ========================================================
   Dark Luxury Train & Circuit Selector Box
   Deep royal navy with gold accent trim & high contrast
   ======================================================== */
.kb-train-select-box {
  background: linear-gradient(135deg, #091e2b 0%, #0f2738 100%);
  border-radius: 14px;
  padding: 22px 24px;
  color: #ffffff;
  box-shadow: 0 4px 20px rgba(9, 30, 43, 0.15);
  border: 1.5px solid var(--gold-dark);
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
  color: #f59e0b;
}
.kb-train-select-box .kb-select {
  background: #ffffff;
  color: #0f172a;
  border: 1.5px solid var(--gold-border);
  font-weight: 600;
  font-size: 15.5px;
  padding: 12px 14px;
  border-radius: 10px;
}
.kb-train-select-box .kb-select:focus {
  border-color: var(--gold);
  box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.35);
}
.kb-train-select-box .kb-info-strip {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(232, 215, 176, 0.25);
  color: #f1f5f9;
  margin-top: 14px;
  border-radius: 10px;
  padding: 12px 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 18px;
}
.kb-train-select-box .kb-strip-dur {
  color: #ffffff;
  background: var(--gold);
  border: 1px solid #f59e0b;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 13.5px;
}
.kb-train-select-box .kb-strip-route {
  color: #fef3c7;
  font-weight: 600;
  font-size: 14.5px;
  flex: 1;
}
.kb-train-select-box .kb-strip-from {
  color: #cbd5e1;
  font-weight: 500;
  font-size: 13.5px;
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
  font-size: 15.5px;
  color: var(--text);
  background: #ffffff;
  border: 1.5px solid var(--line);
  border-radius: 10px;
  padding: 12px 16px;
  outline: none;
  box-sizing: border-box;
  transition: all 0.2s ease;
}
.kb-select:focus, .kb-input:focus, .kb-textarea:focus {
  border-color: var(--gold);
  box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.18);
}

/* Date Header with Year Select */
.kb-date-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 10px;
}
.kb-sec-title {
  font-family: var(--font-body);
  font-size: 21px;
  font-weight: 700;
  color: var(--brand);
  margin: 0;
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
   Clean Month & Dates Table (NO CARDS / NO BOXED BORDERS)
   Matches user screenshot media_1795258321228_8ca0a09f.png
   ======================================================== */
.kb-dates-container {
  border: none;
  background: transparent;
}
.kb-month-row {
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid var(--line);
  align-items: flex-start;
  gap: 24px;
}
.kb-month-row:last-child {
  border-bottom: none;
}
@media (max-width: 680px) {
  .kb-month-row {
    flex-direction: column;
    gap: 10px;
    padding: 14px 0;
  }
}
.kb-month-col {
  width: 155px;
  flex-shrink: 0;
  padding-top: 4px;
}
.kb-month-name {
  font-size: 17.5px;
  font-weight: 800;
  color: var(--brand);
  letter-spacing: -0.01em;
}
.kb-month-sub {
  font-size: 13px;
  color: var(--gold-dark);
  font-weight: 600;
  margin-top: 2px;
}

/* Dates Grid inside row */
.kb-dates-col {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px 22px;
}
@media (max-width: 600px) {
  .kb-dates-col {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}

/* Individual Clean Radio Button (NO CARD BOX BORDER!) */
.kb-date-item {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 6px 2px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
  user-select: none;
  text-align: left;
  border-radius: 4px;
}
.kb-date-item:hover {
  color: var(--gold);
}
.kb-date-item:hover .kb-radio-circle {
  box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.18);
}
.kb-date-item[aria-checked="true"] {
  color: var(--gold-dark);
  font-weight: 700;
}
.kb-radio-circle {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2.2px solid var(--gold); /* Golden circle border */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: #ffffff;
  box-sizing: border-box;
  transition: all 0.15s ease;
}
.kb-date-item[aria-checked="true"] .kb-radio-circle {
  border-color: var(--gold-dark);
}
.kb-date-item[aria-checked="true"] .kb-radio-circle::after {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--gold-dark); /* Filled gold dot */
}

.kb-flex-date-wrap {
  padding: 14px 0 6px;
  border-top: 1px dashed var(--line);
  margin-top: 6px;
}

/* Step 2 Summary Pill */
.kb-step2-summary-card {
  background: linear-gradient(135deg, #091e2b 0%, #0f2738 100%);
  border: 1.5px solid var(--gold-dark);
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}
.kb-s2-train {
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
}
.kb-s2-details {
  font-size: 14px;
  color: #cbd5e1;
  margin-top: 3px;
}
.kb-s2-details b {
  color: #fef3c7;
}
.kb-btn-edit {
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  color: var(--gold-dark);
  background: #ffffff;
  border: 1.5px solid var(--gold);
  padding: 7px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}
.kb-btn-edit:hover {
  background: var(--gold-bg);
}

/* ========================================================
   Counters (Zero text overlap, flex-col with bold title)
   ======================================================== */
.kb-ctr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1.5px solid var(--line);
  border-radius: 12px;
  padding: 14px 18px;
  gap: 12px;
  background: #ffffff;
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
  border: 1.5px solid var(--line);
  border-radius: 14px;
  background: #ffffff;
  padding: 18px 22px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}
.kb-review-sec-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--line);
  padding-bottom: 10px;
  margin-bottom: 14px;
}
.kb-review-sec-title {
  font-size: 16.5px;
  font-weight: 700;
  color: var(--brand);
  display: flex;
  align-items: center;
  gap: 8px;
}
.kb-btn-edit-sm {
  font: inherit;
  font-size: 12.5px;
  font-weight: 700;
  color: var(--gold-dark);
  background: var(--gold-bg);
  border: 1px solid var(--gold-border);
  padding: 5px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
}
.kb-btn-edit-sm:hover {
  background: #fef3c7;
  border-color: var(--gold);
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
  background: var(--gold-bg);
  border: 1.5px solid var(--gold-border);
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
  background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(180, 83, 9, 0.35);
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.kb-btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(180, 83, 9, 0.45);
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

  <!-- Timeline Stepper (Matches user reference image) -->
  <div class="kb-timeline-wrap">
    <div class="kb-timeline-bar-line"></div>
    <div class="kb-timeline-arrow"></div>
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

function formatLuxuryDate(dateStr) {
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
  return dayName + ", " + dayPad + ord + " " + FULL_MN[monthIdx] + ", " + year;
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
  if (!n1 || !n2 || !n3) return;

  if (S.currentStep === 1) {
    n1.className = "kb-timeline-step active";
    n2.className = "kb-timeline-step";
    n3.className = "kb-timeline-step";
  } else if (S.currentStep === 2) {
    n1.className = "kb-timeline-step completed";
    n2.className = "kb-timeline-step active";
    n3.className = "kb-timeline-step";
  } else if (S.currentStep === 3) {
    n1.className = "kb-timeline-step completed";
    n2.className = "kb-timeline-step completed";
    n3.className = "kb-timeline-step active";
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
      '<span class="kb-strip-dur">' + jn.d + '</span>' +
      '<span class="kb-strip-route">' + jn.r + '</span>' +
      '<span class="kb-strip-from">📍 ' + jn.from + '</span>' +
      '</div>' +
      E("train") + E("journey") +
      '</div>';

    // Dates Section: Header + Filter Year
    h += '<div style="margin-top:8px">' +
      '<div class="kb-date-header-row">' +
      '<h2 class="kb-sec-title">Select Scheduled Departure Date <span class="req" style="color:var(--gold-dark);font-size:16px">*</span></h2>' +
      '<div class="kb-year-wrap">' +
      '<span class="kb-year-label">Filter Year:</span>' +
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
          '<div class="kb-month-sub">' + datesInMonth.length + ' Departure' + (datesInMonth.length > 1 ? 's' : '') + '</div>' +
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

      // Flexible Date Option
      h += '<div class="kb-flex-date-wrap">' +
        '<button type="button" class="kb-date-item" role="radio" aria-checked="' + (S.date === "flex") + '" data-date="flex">' +
        '<span class="kb-radio-circle"></span>' +
        '<span>Not sure, suggest best departure date</span>' +
        '</button></div>';

      h += '</div>';
    } else {
      h += '<p style="color:var(--muted);font-size:15px;padding:12px 0">No scheduled departures found for this year. Please select another year.</p>';
    }
    h += E("date") + '</div>';

    h += '</div>'; // end kb-form-body

    // Step 1 Footer Bar
    h += '<div class="kb-bottom-bar">' +
      '<div style="font-size:14px;color:var(--muted);font-weight:500">' +
      '🔒 Official IRCTC Scheduled Tariffs · Zero Booking Fee' +
      '</div>' +
      '<button type="button" class="kb-btn-primary" id="btn-goto-step2">' +
      '<span>Continue to Traveler Details →</span>' +
      '</button>' +
      '</div>';
  }

  // =========================================================================
  // STEP 2: TRAVELERS & CONTACT DETAILS (Zero Text Overlap)
  // =========================================================================
  else if (S.currentStep === 2) {
    // Summary Pill of Chosen Train & Date with Edit Button
    h += '<div class="kb-step2-summary-card">' +
      '<div>' +
      '<div class="kb-s2-train">' + esc(S.train) + ' · ' + esc(S.journey) + '</div>' +
      '<div class="kb-s2-details">📅 Departure: <b>' + formatLuxuryDate(S.date) + '</b> (' + jn.d + ')</div>' +
      '</div>' +
      '<button type="button" class="kb-btn-edit" id="btn-back-step1">Change Train / Date</button>' +
      '</div>';

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
    h += '<div class="kb-review-header">' +
      '<span class="kb-review-badge">Step 3 of 3 · Final Verification</span>' +
      '<h2 class="kb-sec-title" style="font-size:24px;margin:8px 0 4px">Review Your Booking Inquiry</h2>' +
      '<p style="font-size:15px;color:var(--muted);margin:0">' +
      'Please verify your selected royal train, departure date, and guest information before requesting your official quote.' +
      '</p>' +
      '</div>';

    // Section 1: Train & Journey Details
    h += '<div class="kb-review-section">' +
      '<div class="kb-review-sec-header">' +
      '<div class="kb-review-sec-title"><span>🚂</span><span>Luxury Train &amp; Route</span></div>' +
      '<button type="button" class="kb-btn-edit-sm" onclick="goToStep(1)">Edit Train / Date ✎</button>' +
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
      '<button type="button" class="kb-btn-edit-sm" onclick="goToStep(2)">Edit Guests ✎</button>' +
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
      '<button type="button" class="kb-btn-edit-sm" onclick="goToStep(2)">Edit Contact ✎</button>' +
      '</div>' +
      '<div class="kb-review-grid-3">' +
      '<div class="kb-review-field"><span class="lbl">Full Name</span><span class="val">' + esc(S.name) + '</span></div>' +
      '<div class="kb-review-field"><span class="lbl">WhatsApp / Phone</span><span class="val">' + esc(S.phone) + '</span></div>' +
      '<div class="kb-review-field"><span class="lbl">Email Address</span><span class="val">' + esc(S.email) + '</span></div>' +
      '</div>' +
      '</div>'; // end review section

    // Guarantee Notice
    h += '<div class="kb-review-guarantee">' +
      '<div style="font-size:24px">🛡️</div>' +
      '<div style="font-size:13.5px;color:#475569;line-height:1.5">' +
      '<b>Zero Obligation · No Booking Fees:</b> Submitting this inquiry secures a priority hold with our IRCTC Luxury Train Desk. We will verify real-time berth availability and email you an official itemized quote with all seasonal offers within 2 hours.' +
      '</div>' +
      '</div>';

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
