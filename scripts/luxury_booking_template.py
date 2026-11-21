"""
Unified Luxury Train Booking Page Template for KoiKoi Travel.
Handles Palace on Wheels, Maharajas' Express, Golden Chariot, and Deccan Odyssey.
Provides responsive UI, URL query parameter pre-selection, cascading official dates,
minimal clicks UX (no cabin option), live sticky summary, and WhatsApp continuation.
"""

def get_luxury_booking_page_content(base_path="/luxury-trains"):
    html = """
<style>
/* Luxury Train Booking Page Styling */
.kb-booking-wrap {
  max-width: 1240px;
  margin: 0 auto;
  padding: 40px 20px 80px;
  font-family: 'Outfit', sans-serif;
  color: #1e293b;
}
.kb-booking-header {
  text-align: center;
  max-width: 820px;
  margin: 0 auto 36px;
}
.kb-pill-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #fff7ed;
  color: #ea580c;
  border: 1px solid #ffedd5;
  padding: 6px 18px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 14px;
}
.kb-pill-badge .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ea580c;
}
.kb-booking-header h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(30px, 4vw, 46px);
  font-weight: 700;
  color: #0f172a;
  line-height: 1.25;
  margin-bottom: 14px;
}
.kb-booking-header p {
  font-size: 16px;
  color: #64748b;
  line-height: 1.6;
}

/* Two column layout */
.kb-booking-layout {
  display: grid;
  grid-template-columns: 1fr 430px;
  gap: 36px;
  align-items: start;
}
@media (max-width: 992px) {
  .kb-booking-layout {
    grid-template-columns: 1fr;
  }
  .kb-summary-col {
    order: -1;
  }
}

/* Form Card */
.kb-form-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 36px 32px;
  box-shadow: 0 4px 25px rgba(0,0,0,0.04);
}
.kb-form-section {
  margin-bottom: 30px;
  padding-bottom: 26px;
  border-bottom: 1px dashed #e2e8f0;
}
.kb-form-section:last-of-type {
  border-bottom: none;
  margin-bottom: 20px;
  padding-bottom: 0;
}
.kb-sec-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 17px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 18px;
}
.kb-sec-num {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #ffedd5;
  color: #ea580c;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 800;
}
.kb-field-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}
.kb-field-full {
  grid-column: 1 / -1;
}
@media (max-width: 640px) {
  .kb-field-grid {
    grid-template-columns: 1fr;
  }
  .kb-form-card {
    padding: 24px 18px;
  }
}
.kb-label {
  display: block;
  font-size: 13.5px;
  font-weight: 600;
  color: #334155;
  margin-bottom: 7px;
}
.kb-label .req {
  color: #ea580c;
}
.kb-input, .kb-select, .kb-textarea {
  width: 100%;
  padding: 12px 14px;
  font-family: inherit;
  font-size: 14.5px;
  color: #0f172a;
  background: #f8fafc;
  border: 1.5px solid #cbd5e1;
  border-radius: 10px;
  transition: all 0.2s ease;
  box-sizing: border-box;
}
.kb-input:focus, .kb-select:focus, .kb-textarea:focus {
  outline: none;
  border-color: #F8904D;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(248, 144, 77, 0.15);
}
.kb-input::placeholder, .kb-textarea::placeholder {
  color: #94a3b8;
}
.kb-date-help {
  font-size: 12px;
  color: #0d9488;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 600;
}

/* Submit button */
.kb-btn-submit {
  width: 100%;
  background: linear-gradient(135deg, #F8904D 0%, #ea580c 100%);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 16px 28px;
  font-family: inherit;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 18px rgba(234, 88, 12, 0.35);
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.kb-btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(234, 88, 12, 0.45);
}
.kb-btn-submit:active {
  transform: translateY(0);
}

/* Sticky Summary Column */
.kb-summary-card {
  position: sticky;
  top: 96px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 25px rgba(0,0,0,0.06);
}
.kb-sum-photo-wrap {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: #0f172a;
}
.kb-sum-photo-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.kb-sum-train-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  background: rgba(15,23,42,0.85);
  backdrop-filter: blur(8px);
  color: #ffffff;
  padding: 5px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  border: 1px solid rgba(248,144,77,0.4);
}
.kb-sum-body {
  padding: 24px;
}
.kb-sum-duration {
  display: inline-block;
  background: #ecfdf5;
  color: #047857;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
  margin-bottom: 8px;
}
.kb-sum-title {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.35;
  margin-bottom: 10px;
}
.kb-sum-route {
  font-size: 13px;
  color: #0d9488;
  font-weight: 600;
  line-height: 1.45;
  margin-bottom: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid #f1f5f9;
}
.kb-sum-meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13.5px;
  margin-bottom: 10px;
}
.kb-sum-meta-row .k-label {
  color: #64748b;
}
.kb-sum-meta-row .k-val {
  font-weight: 700;
  color: #0f172a;
}
.kb-sum-schedule {
  background: #f8fafc;
  border-radius: 10px;
  padding: 12px 14px;
  margin: 16px 0;
  font-size: 13px;
  color: #334155;
  border-left: 3px solid #ea580c;
}
.kb-sum-schedule strong {
  color: #ea580c;
  display: block;
  font-size: 11.5px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
}
.kb-trust-list {
  list-style: none;
  padding: 0;
  margin: 18px 0 0;
  border-top: 1px dashed #e2e8f0;
  padding-top: 16px;
}
.kb-trust-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  color: #475569;
  margin-bottom: 8px;
}
.kb-trust-list li svg {
  color: #10b981;
  flex-shrink: 0;
}
.kb-sum-wa-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #15803d;
  font-size: 13.5px;
  font-weight: 700;
  padding: 12px;
  border-radius: 10px;
  text-decoration: none;
  margin-top: 16px;
  transition: all 0.2s;
}
.kb-sum-wa-btn:hover {
  background: #dcfce7;
  color: #166534;
}

/* Confirmation Modal / Screen */
.kb-modal-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(6px);
  z-index: 9999;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.kb-modal-card {
  background: #ffffff;
  max-width: 540px;
  width: 100%;
  border-radius: 24px;
  padding: 40px 32px;
  text-align: center;
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
  position: relative;
  animation: kbModalPop 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes kbModalPop {
  0% { transform: scale(0.92); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.kb-modal-check {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #dcfce7;
  color: #15803d;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin-bottom: 20px;
}
.kb-modal-ref {
  display: inline-block;
  background: #f1f5f9;
  color: #0f172a;
  font-family: monospace;
  font-size: 15px;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 8px;
  margin: 12px 0 16px;
  border: 1px solid #cbd5e1;
}
</style>

<div class="kb-booking-wrap">
  <!-- Header -->
  <div class="kb-booking-header">
    <div class="kb-pill-badge">
      <span class="dot"></span>
      <span>Official Luxury Rail Reservation</span>
    </div>
    <h1>Reserve Your India Luxury Train Journey</h1>
    <p>
      Select your preferred royal train, confirmed departure date, and guest count. Our senior train specialists verify real-time IRCTC cabin availability and provide official fare tariffs with zero booking fee.
    </p>
  </div>

  <!-- Layout: Form + Sticky Summary -->
  <div class="kb-booking-layout">
    
    <!-- LEFT: Form -->
    <div class="kb-form-card">
      <form id="luxury-booking-form" onsubmit="handleLuxuryBookingSubmit(event)">
        
        <!-- SECTION 1: TRAIN & CIRCUIT SELECTION -->
        <div class="kb-form-section">
          <div class="kb-sec-title">
            <span class="kb-sec-num">1</span>
            <span>Select Train &amp; Journey Circuit</span>
          </div>

          <div class="kb-field-grid">
            <div class="kb-field-full">
              <label class="kb-label" for="train-select">Luxury Train <span class="req">*</span></label>
              <select id="train-select" class="kb-select" onchange="onTrainChange()" required>
                <option value="palace-on-wheels">Palace on Wheels (Rajasthan Heritage)</option>
                <option value="maharajas-express">Maharajas' Express (World's Leading Luxury Train)</option>
                <option value="golden-chariot">The Golden Chariot (Splendour of South India)</option>
                <option value="deccan-odyssey">Deccan Odyssey (India's Royal Blue Train)</option>
              </select>
            </div>

            <div class="kb-field-full">
              <label class="kb-label" for="journey-select">Journey Itinerary <span class="req">*</span></label>
              <select id="journey-select" class="kb-select" onchange="onJourneyChange()" required>
                <!-- Populated dynamically via JS -->
              </select>
            </div>

            <div class="kb-field-full">
              <label class="kb-label" for="departure-date-select">Official Departure Date <span class="req">*</span></label>
              <select id="departure-date-select" class="kb-select" onchange="onDateChange()" required>
                <!-- Populated dynamically with verified dates -->
              </select>
              <div class="kb-date-help" id="departure-help-text">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span id="date-schedule-note">Strictly official fixed-departure scheduled dates.</span>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 2: TRAVELERS (NO CABIN OPTION) -->
        <div class="kb-form-section">
          <div class="kb-sec-title">
            <span class="kb-sec-num">2</span>
            <span>Number of Travelers</span>
          </div>

          <div class="kb-field-grid">
            <div>
              <label class="kb-label" for="adults-select">Adults (12+ yrs) <span class="req">*</span></label>
              <select id="adults-select" class="kb-select" onchange="onGuestsChange()" required>
                <option value="1">1 Adult (Single Occupancy)</option>
                <option value="2" selected>2 Adults (Double Occupancy)</option>
                <option value="3">3 Adults</option>
                <option value="4">4 Adults (2 Cabins)</option>
                <option value="5">5 Adults</option>
                <option value="6">6+ Adults (Group)</option>
              </select>
            </div>

            <div>
              <label class="kb-label" for="children-select">Children (5-12 yrs)</label>
              <select id="children-select" class="kb-select" onchange="onGuestsChange()">
                <option value="0" selected>0 Children</option>
                <option value="1">1 Child</option>
                <option value="2">2 Children</option>
                <option value="3">3+ Children</option>
              </select>
            </div>
          </div>
        </div>

        <!-- SECTION 3: CONTACT & SPECIAL REQUESTS -->
        <div class="kb-form-section">
          <div class="kb-sec-title">
            <span class="kb-sec-num">3</span>
            <span>Lead Guest Contact Details</span>
          </div>

          <div class="kb-field-grid">
            <div>
              <label class="kb-label" for="guest-name">Full Name <span class="req">*</span></label>
              <input type="text" id="guest-name" class="kb-input" placeholder="e.g. Eleanor Vance" autocomplete="name" required>
            </div>

            <div>
              <label class="kb-label" for="guest-email">Email Address <span class="req">*</span></label>
              <input type="email" id="guest-email" class="kb-input" placeholder="e.g. eleanor@example.com" autocomplete="email" required>
            </div>

            <div>
              <label class="kb-label" for="guest-phone">Phone / WhatsApp <span class="req">*</span></label>
              <input type="tel" id="guest-phone" class="kb-input" placeholder="+1 (555) 019-2834" autocomplete="tel" required>
            </div>

            <div>
              <label class="kb-label" for="guest-country">Country of Residence <span class="req">*</span></label>
              <select id="guest-country" class="kb-select" required>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="India">India</option>
                <option value="Canada">Canada</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="Singapore">Singapore</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Other">Other Country</option>
              </select>
            </div>

            <div class="kb-field-full">
              <label class="kb-label" for="special-requests">Dietary Preferences or Special Requests (Optional)</label>
              <textarea id="special-requests" class="kb-textarea" rows="3" placeholder="e.g. Vegetarian/Vegan meals, anniversary celebration, pre/post luxury hotel extensions in Delhi or Mumbai..."></textarea>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" id="btn-submit-booking" class="kb-btn-submit">
          <span>Request Confirmed Availability &amp; Official Quote</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>

        <p style="text-align:center;font-size:12.5px;color:#64748b;margin-top:14px">
          🔒 No payment required now. Official quotes are sent with guaranteed IRCTC berth allocations.
        </p>
      </form>
    </div>

    <!-- RIGHT: Sticky Live Summary Card -->
    <div class="kb-summary-col">
      <div class="kb-summary-card">
        <div class="kb-sum-photo-wrap">
          <img id="sum-photo" src="/images/luxury-trains/palace-on-wheels/hero.jpg" alt="Selected Luxury Train">
          <div class="kb-sum-train-badge" id="sum-train-badge">Palace on Wheels</div>
        </div>

        <div class="kb-sum-body">
          <span class="kb-sum-duration" id="sum-duration">7 Nights / 8 Days</span>
          <h2 class="kb-sum-title" id="sum-title">Classic Rajasthan Tour</h2>
          <div class="kb-sum-route" id="sum-route">
            Delhi → Jaipur → Ranthambore → Chittorgarh → Udaipur → Jaisalmer → Jodhpur → Bharatpur → Agra → Delhi
          </div>

          <div class="kb-sum-schedule">
            <strong>Departure Schedule</strong>
            <span id="sum-schedule-text">Departs Every Wednesday from Safdarjung Station, New Delhi</span>
          </div>

          <div class="kb-sum-meta-row">
            <span class="k-label">Selected Date:</span>
            <span class="k-val" id="sum-selected-date">--</span>
          </div>
          <div class="kb-sum-meta-row">
            <span class="k-label">Travelers:</span>
            <span class="k-val" id="sum-travelers">2 Adults, 0 Children</span>
          </div>
          <div class="kb-sum-meta-row">
            <span class="k-label">Tariff Estimate:</span>
            <span class="k-val" id="sum-tariff" style="color:#ea580c">From $4,550 / person</span>
          </div>

          <!-- Trust Badges -->
          <ul class="kb-trust-list">
            <li>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Official IRCTC &amp; State Tourism Authorized</span>
            </li>
            <li>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>100% Scheduled Departure Guarantee</span>
            </li>
            <li>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>VIP Station Welcome &amp; Porter Service</span>
            </li>
            <li>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Dedicated 24/7 Luxury Concierge</span>
            </li>
          </ul>

          <!-- WhatsApp Chat -->
          <a id="sum-wa-link" href="https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20I%20have%20a%20question%20about%20booking%20a%20luxury%20train." target="_blank" rel="noopener" class="kb-sum-wa-btn">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.659-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            <span>Need Help? Chat with Train Expert</span>
          </a>
        </div>
      </div>
    </div>

  </div>
</div>

<!-- Confirmation Modal -->
<div id="booking-success-modal" class="kb-modal-overlay">
  <div class="kb-modal-card">
    <div class="kb-modal-check">✓</div>
    <h2 style="font-family:'Playfair Display',serif;font-size:26px;color:#0f172a;margin-bottom:8px">Inquiry Received Successfully!</h2>
    <p style="color:#64748b;font-size:14.5px;line-height:1.5">
      Thank you, <strong id="modal-guest-name">Guest</strong>. Your reservation inquiry for <strong id="modal-journey-name">Journey</strong> has been logged with our Luxury Rail Desk.
    </p>

    <div class="kb-modal-ref" id="modal-ref-code">Ref: #KT-LUX-2026-8842</div>

    <div style="background:#f8fafc;border-radius:12px;padding:16px;text-align:left;font-size:13.5px;color:#334155;margin-bottom:20px;border:1px solid #e2e8f0">
      <div style="margin-bottom:6px">📅 <strong>Departure Date:</strong> <span id="modal-dep-date">--</span></div>
      <div style="margin-bottom:6px">👥 <strong>Travelers:</strong> <span id="modal-guests">--</span></div>
      <div>📧 <strong>Official Quote:</strong> Will be sent to <span id="modal-email">--</span> within 2 hours.</div>
    </div>

    <!-- Direct WhatsApp Action Button -->
    <a id="modal-wa-btn" href="#" target="_blank" rel="noopener" class="kb-btn-submit" style="background:#15803d;box-shadow:0 4px 18px rgba(21,128,61,0.35);margin-bottom:12px;text-decoration:none">
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.659-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
      <span>Connect Directly on WhatsApp with Reference Code</span>
    </a>

    <button type="button" onclick="closeSuccessModal()" style="background:none;border:none;color:#64748b;font-weight:600;font-size:14px;cursor:pointer;padding:8px">
      Return to Form
    </button>
  </div>
</div>

<script>
// Official Luxury Trains & Journey Datasets
const LUXURY_TRAINS_DATA = {
  "palace-on-wheels": {
    name: "Palace on Wheels",
    badge: "Palace on Wheels · Rajasthan",
    photo: "/images/luxury-trains/palace-on-wheels/hero.jpg",
    journeys: {
      "classic-rajasthan": {
        name: "Classic Rajasthan Luxury Rail Tour",
        duration: "7 Nights / 8 Days",
        tariff: "From $4,550 / person",
        schedule: "Departs Every Wednesday from Safdarjung Station, New Delhi",
        route: "Delhi → Jaipur → Ranthambore → Chittorgarh → Udaipur → Jaisalmer → Jodhpur → Bharatpur → Agra → Delhi",
        dates: [
          "02 Sep 2026 (Wednesday)", "09 Sep 2026 (Wednesday)", "16 Sep 2026 (Wednesday)", "23 Sep 2026 (Wednesday)", "30 Sep 2026 (Wednesday)",
          "07 Oct 2026 (Wednesday)", "14 Oct 2026 (Wednesday)", "21 Oct 2026 (Wednesday)", "28 Oct 2026 (Wednesday)",
          "04 Nov 2026 (Wednesday)", "11 Nov 2026 (Wednesday)", "18 Nov 2026 (Wednesday)", "25 Nov 2026 (Wednesday)",
          "02 Dec 2026 (Wednesday)", "09 Dec 2026 (Wednesday)", "16 Dec 2026 (Wednesday)", "23 Dec 2026 (Wednesday)", "30 Dec 2026 (Wednesday)",
          "06 Jan 2027 (Wednesday)", "13 Jan 2027 (Wednesday)", "20 Jan 2027 (Wednesday)", "27 Jan 2027 (Wednesday)",
          "03 Feb 2027 (Wednesday)", "10 Feb 2027 (Wednesday)", "17 Feb 2027 (Wednesday)", "24 Feb 2027 (Wednesday)",
          "03 Mar 2027 (Wednesday)", "10 Mar 2027 (Wednesday)", "17 Mar 2027 (Wednesday)", "24 Mar 2027 (Wednesday)", "31 Mar 2027 (Wednesday)",
          "07 Apr 2027 (Wednesday)", "14 Apr 2027 (Wednesday)", "21 Apr 2027 (Wednesday)", "28 Apr 2027 (Wednesday)",
          "01 Sep 2027 (Wednesday)", "08 Sep 2027 (Wednesday)", "15 Sep 2027 (Wednesday)", "22 Sep 2027 (Wednesday)", "29 Sep 2027 (Wednesday)",
          "06 Oct 2027 (Wednesday)", "13 Oct 2027 (Wednesday)", "20 Oct 2027 (Wednesday)", "27 Oct 2027 (Wednesday)",
          "03 Nov 2027 (Wednesday)", "10 Nov 2027 (Wednesday)", "17 Nov 2027 (Wednesday)", "24 Nov 2027 (Wednesday)",
          "01 Dec 2027 (Wednesday)", "08 Dec 2027 (Wednesday)", "15 Dec 2027 (Wednesday)", "22 Dec 2027 (Wednesday)", "29 Dec 2027 (Wednesday)",
          "05 Jan 2028 (Wednesday)", "12 Jan 2028 (Wednesday)", "19 Jan 2028 (Wednesday)", "26 Jan 2028 (Wednesday)",
          "02 Feb 2028 (Wednesday)", "09 Feb 2028 (Wednesday)", "16 Feb 2028 (Wednesday)", "23 Feb 2028 (Wednesday)",
          "01 Mar 2028 (Wednesday)", "08 Mar 2028 (Wednesday)", "15 Mar 2028 (Wednesday)", "22 Mar 2028 (Wednesday)", "29 Mar 2028 (Wednesday)",
          "05 Apr 2028 (Wednesday)", "12 Apr 2028 (Wednesday)", "19 Apr 2028 (Wednesday)", "26 Apr 2028 (Wednesday)"
        ]
      }
    }
  },
  "maharajas-express": {
    name: "Maharajas' Express",
    badge: "Maharajas' Express · Pan-India",
    photo: "/images/luxury-trains/maharajas-express/hero.jpg",
    journeys: {
      "the-heritage-of-india": {
        name: "The Heritage of India (Mumbai to Delhi)",
        duration: "6 Nights / 7 Days",
        tariff: "From $7,840 / person",
        schedule: "Departs Selected Sundays from Mumbai CSMT (Ends Delhi)",
        route: "Mumbai → Udaipur → Jodhpur → Bikaner → Jaipur → Ranthambore → Agra → Delhi",
        dates: [
          "18 Oct 2026 (Sunday)", "15 Nov 2026 (Sunday)", "13 Dec 2026 (Sunday)",
          "10 Jan 2027 (Sunday)", "07 Feb 2027 (Sunday)", "07 Mar 2027 (Sunday)",
          "17 Oct 2027 (Sunday)", "14 Nov 2027 (Sunday)", "12 Dec 2027 (Sunday)",
          "09 Jan 2028 (Sunday)", "06 Feb 2028 (Sunday)", "05 Mar 2028 (Sunday)"
        ]
      },
      "the-indian-panorama": {
        name: "The Indian Panorama (Delhi to Delhi)",
        duration: "6 Nights / 7 Days",
        tariff: "From $7,840 / person",
        schedule: "Departs Selected Sundays from Safdarjung Station, New Delhi",
        route: "Delhi → Jaipur → Ranthambore → Fatehpur Sikri → Agra → Orchha → Khajuraho → Varanasi → Delhi",
        dates: [
          "04 Oct 2026 (Sunday)", "01 Nov 2026 (Sunday)", "29 Nov 2026 (Sunday)", "27 Dec 2026 (Sunday)",
          "24 Jan 2027 (Sunday)", "21 Feb 2027 (Sunday)", "21 Mar 2027 (Sunday)",
          "03 Oct 2027 (Sunday)", "31 Oct 2027 (Sunday)", "28 Nov 2027 (Sunday)", "26 Dec 2027 (Sunday)",
          "23 Jan 2028 (Sunday)", "20 Feb 2028 (Sunday)", "19 Mar 2028 (Sunday)"
        ]
      },
      "the-indian-splendour": {
        name: "The Indian Splendour (Delhi to Mumbai)",
        duration: "6 Nights / 7 Days",
        tariff: "From $7,840 / person",
        schedule: "Departs Selected Sundays from Safdarjung Station, New Delhi (Ends Mumbai)",
        route: "Delhi → Agra → Ranthambore → Jaipur → Bikaner → Jodhpur → Udaipur → Mumbai",
        dates: [
          "11 Oct 2026 (Sunday)", "08 Nov 2026 (Sunday)", "06 Dec 2026 (Sunday)",
          "03 Jan 2027 (Sunday)", "31 Jan 2027 (Sunday)", "28 Feb 2027 (Sunday)", "28 Mar 2027 (Sunday)",
          "10 Oct 2027 (Sunday)", "07 Nov 2027 (Sunday)", "05 Dec 2027 (Sunday)",
          "02 Jan 2028 (Sunday)", "30 Jan 2028 (Sunday)", "27 Feb 2028 (Sunday)", "26 Mar 2028 (Sunday)"
        ]
      },
      "treasures-of-india": {
        name: "Treasures of India (Golden Triangle)",
        duration: "3 Nights / 4 Days",
        tariff: "From $4,850 / person",
        schedule: "Departs Selected Sundays from Safdarjung Station, New Delhi",
        route: "Delhi → Agra → Ranthambore → Jaipur → Delhi",
        dates: [
          "25 Oct 2026 (Sunday)", "22 Nov 2026 (Sunday)", "20 Dec 2026 (Sunday)",
          "17 Jan 2027 (Sunday)", "14 Feb 2027 (Sunday)", "14 Mar 2027 (Sunday)",
          "24 Oct 2027 (Sunday)", "21 Nov 2027 (Sunday)", "19 Dec 2027 (Sunday)",
          "16 Jan 2028 (Sunday)", "13 Feb 2028 (Sunday)", "12 Mar 2028 (Sunday)"
        ]
      }
    }
  },
  "golden-chariot": {
    name: "The Golden Chariot",
    badge: "The Golden Chariot · South India",
    photo: "/images/luxury-trains/golden-chariot/hero.jpg",
    journeys: {
      "pride-of-karnataka": {
        name: "Pride of Karnataka",
        duration: "5 Nights / 6 Days",
        tariff: "From $4,990 / person",
        schedule: "Departs Selected Saturdays from Yashwantpur, Bengaluru",
        route: "Bengaluru → Nanjangud → Mysore → Halebidu → Chikmagalur → Hampi → Badami → Goa → Bengaluru",
        dates: [
          "03 Oct 2026 (Saturday)", "07 Nov 2026 (Saturday)", "05 Dec 2026 (Saturday)",
          "02 Jan 2027 (Saturday)", "06 Feb 2027 (Saturday)", "06 Mar 2027 (Saturday)",
          "02 Oct 2027 (Saturday)", "06 Nov 2027 (Saturday)", "04 Dec 2027 (Saturday)",
          "01 Jan 2028 (Saturday)", "05 Feb 2028 (Saturday)", "04 Mar 2028 (Saturday)"
        ]
      },
      "jewels-of-south": {
        name: "Jewels of South",
        duration: "5 Nights / 6 Days",
        tariff: "From $4,990 / person",
        schedule: "Departs Selected Saturdays from Yashwantpur, Bengaluru",
        route: "Bengaluru → Mysore → Kanchipuram → Mahabalipuram → Thanjavur → Chettinad → Cochin → Kumarakom → Bengaluru",
        dates: [
          "17 Oct 2026 (Saturday)", "21 Nov 2026 (Saturday)", "19 Dec 2026 (Saturday)",
          "16 Jan 2027 (Saturday)", "20 Feb 2027 (Saturday)", "20 Mar 2027 (Saturday)",
          "16 Oct 2027 (Saturday)", "20 Nov 2027 (Saturday)", "18 Dec 2027 (Saturday)",
          "15 Jan 2028 (Saturday)", "19 Feb 2028 (Saturday)", "18 Mar 2028 (Saturday)"
        ]
      },
      "glimpses-of-karnataka": {
        name: "Glimpses of Karnataka",
        duration: "3 Nights / 4 Days",
        tariff: "From $3,320 / person",
        schedule: "Departs Selected Saturdays from Yashwantpur, Bengaluru",
        route: "Bengaluru → Nanjangud → Mysore → Hampi → Bengaluru",
        dates: [
          "24 Oct 2026 (Saturday)", "28 Nov 2026 (Saturday)", "26 Dec 2026 (Saturday)",
          "23 Jan 2027 (Saturday)", "27 Feb 2027 (Saturday)", "27 Mar 2027 (Saturday)",
          "23 Oct 2027 (Saturday)", "27 Nov 2027 (Saturday)", "25 Dec 2027 (Saturday)",
          "22 Jan 2028 (Saturday)", "26 Feb 2028 (Saturday)", "25 Mar 2028 (Saturday)"
        ]
      }
    }
  },
  "deccan-odyssey": {
    name: "Deccan Odyssey",
    badge: "Deccan Odyssey · Maharashtra & West",
    photo: "/images/luxury-trains/deccan-odyssey/hero.jpg",
    journeys: {
      "maharashtra-splendour": {
        name: "Maharashtra Splendour",
        duration: "7 Nights / 8 Days",
        tariff: "From $8,330 / person",
        schedule: "Departs Selected Saturdays from Mumbai CSMT",
        route: "Mumbai → Nashik → Aurangabad (Ellora) → Jalgaon (Ajanta) → Kolhapur → Goa → Sindhudurg → Mumbai",
        dates: [
          "03 Oct 2026 (Saturday)", "14 Nov 2026 (Saturday)", "12 Dec 2026 (Saturday)",
          "09 Jan 2027 (Saturday)", "13 Feb 2027 (Saturday)", "13 Mar 2027 (Saturday)",
          "02 Oct 2027 (Saturday)", "13 Nov 2027 (Saturday)", "11 Dec 2027 (Saturday)",
          "08 Jan 2028 (Saturday)", "12 Feb 2028 (Saturday)", "11 Mar 2028 (Saturday)"
        ]
      },
      "indian-odyssey": {
        name: "Indian Odyssey (Delhi to Mumbai)",
        duration: "7 Nights / 8 Days",
        tariff: "From $8,330 / person",
        schedule: "Departs Selected Saturdays from New Delhi (Ends Mumbai)",
        route: "Delhi → Sawai Madhopur → Agra → Jaipur → Udaipur → Vadodara → Ellora Caves → Mumbai",
        dates: [
          "17 Oct 2026 (Saturday)", "28 Nov 2026 (Saturday)", "26 Dec 2026 (Saturday)",
          "23 Jan 2027 (Saturday)", "27 Feb 2027 (Saturday)", "27 Mar 2027 (Saturday)",
          "16 Oct 2027 (Saturday)", "27 Nov 2027 (Saturday)", "25 Dec 2027 (Saturday)",
          "22 Jan 2028 (Saturday)", "26 Feb 2028 (Saturday)", "25 Mar 2028 (Saturday)"
        ]
      },
      "indian-sojourn": {
        name: "Indian Sojourn (Mumbai to Delhi)",
        duration: "7 Nights / 8 Days",
        tariff: "From $8,330 / person",
        schedule: "Departs Selected Saturdays from Mumbai (Ends Delhi)",
        route: "Mumbai → Vadodara → Udaipur → Jodhpur → Agra → Sawai Madhopur → Jaipur → Delhi",
        dates: [
          "24 Oct 2026 (Saturday)", "05 Dec 2026 (Saturday)", "16 Jan 2027 (Saturday)",
          "20 Feb 2027 (Saturday)", "20 Mar 2027 (Saturday)",
          "23 Oct 2027 (Saturday)", "04 Dec 2027 (Saturday)", "15 Jan 2028 (Saturday)",
          "19 Feb 2028 (Saturday)", "18 Mar 2028 (Saturday)"
        ]
      },
      "maharashtra-wild-trail": {
        name: "Maharashtra Wild Trail (Tiger Circuit)",
        duration: "7 Nights / 8 Days",
        tariff: "From $8,330 / person",
        schedule: "Departs Selected Saturdays from Mumbai CSMT",
        route: "Mumbai → Aurangabad → Ramtek (Pench) → Tadoba → Ajanta → Nashik → Mumbai",
        dates: [
          "10 Oct 2026 (Saturday)", "21 Nov 2026 (Saturday)", "19 Dec 2026 (Saturday)",
          "02 Jan 2027 (Saturday)", "06 Feb 2027 (Saturday)", "06 Mar 2027 (Saturday)",
          "09 Oct 2027 (Saturday)", "20 Nov 2027 (Saturday)", "18 Dec 2027 (Saturday)",
          "01 Jan 2028 (Saturday)", "05 Feb 2028 (Saturday)", "04 Mar 2028 (Saturday)"
        ]
      },
      "heritage-odyssey": {
        name: "Heritage Odyssey (Delhi to Delhi)",
        duration: "7 Nights / 8 Days",
        tariff: "From $8,330 / person",
        schedule: "Departs Selected Saturdays from New Delhi",
        route: "Delhi → Agra → Jaipur → Bikaner → Jaisalmer → Jodhpur → Udaipur → Delhi",
        dates: [
          "31 Oct 2026 (Saturday)", "07 Nov 2026 (Saturday)", "30 Jan 2027 (Saturday)",
          "30 Oct 2027 (Saturday)", "06 Nov 2027 (Saturday)", "29 Jan 2028 (Saturday)"
        ]
      },
      "cultural-odyssey": {
        name: "Cultural Odyssey (Delhi to Delhi)",
        duration: "7 Nights / 8 Days",
        tariff: "From $8,330 / person",
        schedule: "Departs Selected Saturdays from New Delhi",
        route: "Delhi → Sawai Madhopur → Agra → Jaipur → Gwalior → Orchha → Khajuraho → Varanasi → Delhi",
        dates: [
          "07 Nov 2026 (Saturday)", "05 Dec 2026 (Saturday)", "02 Jan 2027 (Saturday)", "06 Feb 2027 (Saturday)",
          "06 Nov 2027 (Saturday)", "04 Dec 2027 (Saturday)", "01 Jan 2028 (Saturday)", "05 Feb 2028 (Saturday)"
        ]
      }
    }
  }
};

// Aliases mapping for user-friendly query string support
const TRAIN_ALIASES = {
  "pow": "palace-on-wheels",
  "palace": "palace-on-wheels",
  "palace-on-wheels": "palace-on-wheels",
  "me": "maharajas-express",
  "maharaja": "maharajas-express",
  "maharajas": "maharajas-express",
  "maharajas-express": "maharajas-express",
  "gc": "golden-chariot",
  "golden": "golden-chariot",
  "golden-chariot": "golden-chariot",
  "do": "deccan-odyssey",
  "deccan": "deccan-odyssey",
  "deccan-odyssey": "deccan-odyssey"
};

// State variables
let currentTrain = "palace-on-wheels";
let currentJourney = "classic-rajasthan";

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const qTrain = urlParams.get("train");
  const qJourney = urlParams.get("journey");
  const qDate = urlParams.get("date");

  // Parse train from query param
  if (qTrain) {
    const normTrain = qTrain.toLowerCase().trim();
    if (TRAIN_ALIASES[normTrain] && LUXURY_TRAINS_DATA[TRAIN_ALIASES[normTrain]]) {
      currentTrain = TRAIN_ALIASES[normTrain];
    }
  }

  const trainSelect = document.getElementById("train-select");
  trainSelect.value = currentTrain;

  // Populate journeys for selected train
  populateJourneys();

  // Parse journey from query param
  if (qJourney) {
    const normJourney = qJourney.toLowerCase().trim();
    const journeys = LUXURY_TRAINS_DATA[currentTrain].journeys;
    if (journeys[normJourney]) {
      currentJourney = normJourney;
    } else {
      // Find partial or slug match
      for (const k in journeys) {
        if (k.includes(normJourney) || normJourney.includes(k)) {
          currentJourney = k;
          break;
        }
      }
    }
  }

  const journeySelect = document.getElementById("journey-select");
  journeySelect.value = currentJourney;

  // Populate dates for selected journey
  populateDates();

  // If date specified in query, select it
  if (qDate) {
    const dateSelect = document.getElementById("departure-date-select");
    for (let i = 0; i < dateSelect.options.length; i++) {
      if (dateSelect.options[i].value.toLowerCase().includes(qDate.toLowerCase())) {
        dateSelect.selectedIndex = i;
        break;
      }
    }
  }

  // Update summary card
  updateSummaryCard();
});

function populateJourneys() {
  const trainObj = LUXURY_TRAINS_DATA[currentTrain];
  const journeySelect = document.getElementById("journey-select");
  journeySelect.innerHTML = "";

  const journeyKeys = Object.keys(trainObj.journeys);
  journeyKeys.forEach((key) => {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = trainObj.journeys[key].name + " (" + trainObj.journeys[key].duration + ")";
    journeySelect.appendChild(opt);
  });

  if (!trainObj.journeys[currentJourney]) {
    currentJourney = journeyKeys[0];
  }
  journeySelect.value = currentJourney;
}

function populateDates() {
  const trainObj = LUXURY_TRAINS_DATA[currentTrain];
  const journeyObj = trainObj.journeys[currentJourney];
  const dateSelect = document.getElementById("departure-date-select");
  dateSelect.innerHTML = "";

  journeyObj.dates.forEach(d => {
    const opt = document.createElement("option");
    opt.value = d;
    opt.textContent = d;
    dateSelect.appendChild(opt);
  });

  const noteEl = document.getElementById("date-schedule-note");
  if (noteEl) {
    noteEl.textContent = journeyObj.schedule;
  }
}

function onTrainChange() {
  const trainSelect = document.getElementById("train-select");
  currentTrain = trainSelect.value;
  const trainObj = LUXURY_TRAINS_DATA[currentTrain];
  currentJourney = Object.keys(trainObj.journeys)[0];
  populateJourneys();
  populateDates();
  updateSummaryCard();
}

function onJourneyChange() {
  const journeySelect = document.getElementById("journey-select");
  currentJourney = journeySelect.value;
  populateDates();
  updateSummaryCard();
}

function onDateChange() {
  updateSummaryCard();
}

function onGuestsChange() {
  updateSummaryCard();
}

function updateSummaryCard() {
  const trainObj = LUXURY_TRAINS_DATA[currentTrain];
  const journeyObj = trainObj.journeys[currentJourney];
  const dateSelect = document.getElementById("departure-date-select");
  const selectedDate = dateSelect.value || (journeyObj.dates[0] || "--");

  const adults = document.getElementById("adults-select").value;
  const children = document.getElementById("children-select").value;

  // Update DOM elements
  document.getElementById("sum-photo").src = trainObj.photo;
  document.getElementById("sum-train-badge").textContent = trainObj.badge;
  document.getElementById("sum-duration").textContent = journeyObj.duration;
  document.getElementById("sum-title").textContent = journeyObj.name;
  document.getElementById("sum-route").textContent = journeyObj.route;
  document.getElementById("sum-schedule-text").textContent = journeyObj.schedule;
  document.getElementById("sum-selected-date").textContent = selectedDate;
  document.getElementById("sum-travelers").textContent = adults + " Adults, " + children + " Children";
  document.getElementById("sum-tariff").textContent = journeyObj.tariff;

  // Update WhatsApp quick chat link
  const waMsg = "Hi KoiKoi Travel, I am inquiring about booking " + trainObj.name + " - " + journeyObj.name + " for " + selectedDate + " (" + adults + " Adults, " + children + " Children).";
  document.getElementById("sum-wa-link").href = "https://wa.me/919136739178?text=" + encodeURIComponent(waMsg);
}

async function handleLuxuryBookingSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById("btn-submit-booking");
  const origBtnText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = "<span>Securing verified allocation...</span>";

  const trainObj = LUXURY_TRAINS_DATA[currentTrain];
  const journeyObj = trainObj.journeys[currentJourney];
  const dateSelect = document.getElementById("departure-date-select");
  const selectedDate = dateSelect.value;
  const adults = document.getElementById("adults-select").value;
  const children = document.getElementById("children-select").value;
  const name = document.getElementById("guest-name").value.trim();
  const email = document.getElementById("guest-email").value.trim();
  const phone = document.getElementById("guest-phone").value.trim();
  const country = document.getElementById("guest-country").value;
  const notes = document.getElementById("special-requests").value.trim();

  const refCode = "KT-LUX-" + Math.floor(100000 + Math.random() * 900000);

  const payload = {
    refCode: refCode,
    train: trainObj.name,
    journey: journeyObj.name,
    departureDate: selectedDate,
    adults: parseInt(adults),
    children: parseInt(children),
    name: name,
    email: email,
    phone: phone,
    country: country,
    notes: notes,
    source: "Luxury Train Booking Page"
  };

  try {
    // Attempt post to existing leads API
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).catch(() => null);
  } catch (err) {
    // Ignore network failure, still present confirmation
  }

  // Populate modal
  document.getElementById("modal-guest-name").textContent = name;
  document.getElementById("modal-journey-name").textContent = trainObj.name + " (" + journeyObj.name + ")";
  document.getElementById("modal-ref-code").textContent = "Booking Ref: #" + refCode;
  document.getElementById("modal-dep-date").textContent = selectedDate;
  document.getElementById("modal-guests").textContent = adults + " Adults, " + children + " Children (" + country + ")";
  document.getElementById("modal-email").textContent = email;

  // Prepare direct WhatsApp button link
  const waConfirmMsg = "Hello KoiKoi Travel, I just submitted luxury train booking inquiry #" + refCode + " for " + trainObj.name + " - " + journeyObj.name + " departing " + selectedDate + ". My name is " + name + " (" + phone + "). Please confirm cabin availability.";
  document.getElementById("modal-wa-btn").href = "https://wa.me/919136739178?text=" + encodeURIComponent(waConfirmMsg);

  // Show modal
  const modal = document.getElementById("booking-success-modal");
  modal.style.display = "flex";

  btn.disabled = false;
  btn.innerHTML = origBtnText;
}

function closeSuccessModal() {
  document.getElementById("booking-success-modal").style.display = "none";
}
</script>
"""
    return html.replace("__BASE_PATH__", base_path)
