/* ─── Execution History ─── */
export const EXECUTION_HISTORY = [
  { id: 42, name: "Former Delco Building", type: "Adaptive Reuse", date: "Mar 18, 2026", status: "complete" as const, agents: 3 },
  { id: 41, name: "Oakwood Arms Apartments", type: "Value-Add", date: "Mar 17, 2026", status: "complete" as const, agents: 3 },
  { id: 40, name: "Third Street Lofts", type: "Adaptive Reuse", date: "Mar 15, 2026", status: "complete" as const, agents: 3 },
  { id: 39, name: "Springfield Motor Works", type: "Adaptive Reuse", date: "Mar 14, 2026", status: "complete" as const, agents: 3 },
];

/* ─── Processing Steps ─── */
export const MOCK_PROCESSING_STEPS = [
  { id: "upload", label: "Document received" },
  { id: "ocr", label: "OCR extraction (Gemini 2.5 Flash)" },
  { id: "parse", label: "Structuring page data" },
  { id: "segment", label: "Classifying content sections" },
  { id: "extract", label: "Extracting deal parameters" },
  { id: "market", label: "Market Agent analyzing..." },
  { id: "asset", label: "Asset Agent analyzing..." },
  { id: "investment", label: "Investment Agent analyzing..." },
  { id: "merge", label: "Merging analysis results" },
  { id: "format", label: "Formatting IC memo" },
];

export const STEP_DELAYS = [300, 800, 1200, 1500, 2000, 3000, 3000, 3000, 1500, 1000];

/* ─── Extracted Fields ─── */
export const MOCK_EXTRACTED_FIELDS: Record<string, string> = {
  assetName: "Former Delco Building",
  location: "401 E. Monument Ave, Dayton, OH",
  assetType: "Adaptive Reuse — Office to Multifamily",
  units: "48 units (proposed)",
  sqft: "62,000 SF",
  yearBuilt: "1928",
  historicStatus: "National Register listed",
  estimatedValue: "$4.2M (as-is)",
};

/* ─── IC Memo Sections (from execution #42 — Former Delco Building) ─── */
export const MOCK_MEMO_SECTIONS = [
  {
    id: "opportunity",
    title: "Opportunity Overview",
    customizable: true,
    html: `
      <p>Acquire and convert the <strong>Former Delco Building</strong>, a 62,000 SF Art Deco office building listed on the National Register of Historic Places, into <strong>48 market-rate multifamily units</strong> in downtown Dayton's emerging Monument Avenue corridor. The property is eligible for both federal (20%) and Ohio state (25%) Historic Tax Credits, creating a significant capital stack advantage. <span class="cite-im">[CIM p.2]</span> <span class="cite-im">[CIM p.7]</span></p>

      <table>
        <tr><th>Parameter</th><th>Detail</th></tr>
        <tr><td>Asset</td><td>Former Delco Building — 62,000 SF, 6 stories</td></tr>
        <tr><td>Location</td><td>401 E. Monument Ave, Dayton, OH 45402</td></tr>
        <tr><td>County / Submarket</td><td>Montgomery County — Downtown Dayton</td></tr>
        <tr><td>Year Built</td><td>1928</td></tr>
        <tr><td>Architectural Style</td><td>Art Deco with limestone facade and terra cotta ornamentation</td></tr>
        <tr><td>Historic Status</td><td>National Register of Historic Places (individually listed)</td></tr>
        <tr><td>Proposed Use</td><td>48 market-rate apartments (studio, 1BR, 2BR mix)</td></tr>
        <tr><td>Current Condition</td><td>Vacant since 2019; structurally sound, needs full interior buildout</td></tr>
        <tr><td>Estimated As-Is Value</td><td>$4.2M <span class="cite-im">[CIM p.4]</span></td></tr>
        <tr><td>Total Project Cost</td><td>$15.12M <span class="cite-model">[MODELED]</span></td></tr>
        <tr><td>HTC Eligibility</td><td>20% Federal + 25% Ohio State = $5.67M in tax credit equity <span class="cite-im">[CIM p.12]</span></td></tr>
        <tr><td>Parking</td><td>42 surface spaces + shared garage agreement (adjacent lot)</td></tr>
      </table>

      <blockquote>The Delco Building represents a textbook adaptive reuse opportunity: a structurally sound historic asset in a revitalizing corridor with layered tax credit eligibility that reduces effective equity requirement to under $2M. Windsor's track record with Fire Blocks District positions the team to execute efficiently.</blockquote>
    `,
  },
  {
    id: "market-analysis",
    title: "Market & Location Analysis",
    customizable: true,
    html: `
      <h3>Submarket Context</h3>
      <p>Downtown Dayton has undergone significant revitalization since 2018, anchored by the <strong>Fire Blocks District</strong> redevelopment (1.2M SF mixed-use). The Monument Avenue corridor is an emerging residential node adjacent to the Oregon District entertainment area and the Dayton Innovation Hub. <span class="cite-web">[CoStar 2026]</span> <span class="cite-im">[CIM p.5]</span></p>
      <ul>
        <li><strong>Proximity:</strong> 0.3 miles to Fire Blocks District, 0.4 miles to Oregon District, 0.6 miles to RiverScape MetroPark <span class="cite-im">[CIM p.5]</span></li>
        <li><strong>Transit:</strong> RTA bus hub 0.2 miles; I-75 on-ramp 0.8 miles; Dayton International Airport 18 miles <span class="cite-web">[MARKET]</span></li>
        <li><strong>Walk Score:</strong> 82 (Very Walkable) <span class="cite-web">[walkscore.com]</span></li>
        <li><strong>Major Employers:</strong> Wright-Patterson AFB (30,000+), Premier Health, CareSource, Kettering Health, University of Dayton <span class="cite-web">[MARKET]</span></li>
      </ul>

      <h3>Multifamily Supply & Demand</h3>
      <table>
        <tr><th>Metric</th><th>Downtown Dayton</th><th>Montgomery Co.</th><th>Source</th></tr>
        <tr><td>Vacancy Rate</td><td>5.2%</td><td>6.8%</td><td><span class="cite-web">[CoStar 2026]</span></td></tr>
        <tr><td>Avg. Effective Rent</td><td>$1,425/mo</td><td>$1,180/mo</td><td><span class="cite-web">[CoStar 2026]</span></td></tr>
        <tr><td>YoY Rent Growth</td><td>+4.1%</td><td>+2.8%</td><td><span class="cite-web">[CoStar 2026]</span></td></tr>
        <tr><td>Absorption (trailing 12mo)</td><td>~62 units</td><td>~310 units</td><td><span class="cite-web">[CoStar 2026]</span></td></tr>
        <tr><td>Pipeline (under construction)</td><td>120 units</td><td>480 units</td><td><span class="cite-web">[CoStar 2026]</span></td></tr>
        <tr><td>Median HH Income (5-mi radius)</td><td>$38,200</td><td>$52,400</td><td><span class="cite-web">[Census 2024]</span></td></tr>
      </table>

      <h3>Rent Comparables</h3>
      <table>
        <tr><th>Property</th><th>Units</th><th>Avg. Rent</th><th>Vintage</th><th>Occupancy</th></tr>
        <tr><td>Grant-Deneau Tower</td><td>147</td><td>$1,620</td><td>2024 (rehab)</td><td>94%</td></tr>
        <tr><td>Huffman Lofts</td><td>84</td><td>$1,380</td><td>2019 (rehab)</td><td>96%</td></tr>
        <tr><td>Graphic Arts Lofts</td><td>20</td><td>$1,250</td><td>2020 (rehab)</td><td>100%</td></tr>
        <tr><td>Home Telephone Lofts</td><td>19</td><td>$1,185</td><td>2023 (rehab)</td><td>95%</td></tr>
      </table>
      <p><span class="cite-web">[CoStar 2026]</span> <span class="cite-im">[CIM p.8]</span></p>

      <h3>Demographics & Demand Drivers</h3>
      <table>
        <tr><th>Metric</th><th>Value</th></tr>
        <tr><td>Population (5-mi radius)</td><td>~148,000</td></tr>
        <tr><td>Population Growth (5-yr)</td><td>+1.2%</td></tr>
        <tr><td>25-34 Age Cohort</td><td>16.4% (above national avg)</td></tr>
        <tr><td>Renter Households</td><td>52.3%</td></tr>
        <tr><td>Unemployment Rate</td><td>4.1%</td></tr>
        <tr><td>WPAFB Economic Impact</td><td>$18.4B annually</td></tr>
      </table>
      <p><span class="cite-web">[Census 2024]</span> <span class="cite-web">[WPAFB Economic Analysis 2025]</span></p>
    `,
  },
  {
    id: "asset-assessment",
    title: "Asset Assessment",
    customizable: true,
    html: `
      <h3>Building Condition & Structure</h3>
      <p>The Delco Building is a <strong>6-story reinforced concrete frame</strong> with limestone and terra cotta exterior cladding, constructed in 1928 as the Dayton headquarters for Delco Electronics. The building has been vacant since 2019 but remains structurally sound per preliminary engineering assessment. <span class="cite-im">[CIM p.9]</span></p>
      <ul>
        <li><strong>Structure:</strong> Reinforced concrete frame — columns and slabs in good condition; no signs of spalling or structural distress <span class="cite-im">[CIM p.9]</span></li>
        <li><strong>Roof:</strong> Flat built-up roof replaced in 2012 — estimated 8-10 years remaining life <span class="cite-im">[CIM p.10]</span></li>
        <li><strong>Facade:</strong> Limestone base with Art Deco terra cotta ornamentation above 3rd floor; minor repointing needed at NE corner <span class="cite-im">[CIM p.10]</span></li>
        <li><strong>Windows:</strong> Original steel casement windows — must be replaced (SHPO will require compatible profile and muntin pattern) <span class="cite-im">[CIM p.11]</span></li>
        <li><strong>Elevators:</strong> 2 passenger elevators (non-operational) — full modernization required <span class="cite-im">[CIM p.11]</span></li>
      </ul>

      <h3>Art Deco Heritage Elements</h3>
      <p>The building features significant Art Deco design elements that must be preserved per Secretary of Interior Standards:</p>
      <ul>
        <li>Ornamental terra cotta panels and geometric motifs at parapet and window surrounds</li>
        <li>Original lobby floor — terrazzo with brass inlay compass rose pattern</li>
        <li>Cast bronze entrance canopy and door surrounds</li>
        <li>Stepped-back massing typical of late 1920s commercial design</li>
      </ul>
      <p><span class="cite-im">[CIM p.12]</span></p>

      <h3>Proposed Unit Mix</h3>
      <table>
        <tr><th>Unit Type</th><th>Count</th><th>Avg. SF</th><th>Projected Rent</th></tr>
        <tr><td>Studio</td><td>12</td><td>520</td><td>$1,150/mo</td></tr>
        <tr><td>1BR / 1BA</td><td>24</td><td>750</td><td>$1,450/mo</td></tr>
        <tr><td>2BR / 2BA</td><td>10</td><td>1,050</td><td>$1,850/mo</td></tr>
        <tr><td>2BR Penthouse</td><td>2</td><td>1,400</td><td>$2,400/mo</td></tr>
        <tr><td><strong>Total / Wtd. Avg.</strong></td><td><strong>48</strong></td><td><strong>762</strong></td><td><strong>$1,480/mo</strong></td></tr>
      </table>
      <p><span class="cite-model">[MODELED]</span> <span class="cite-im">[CIM p.14]</span></p>

      <h3>Parking & Site</h3>
      <ul>
        <li><strong>Surface lot:</strong> 42 spaces on-site (0.88 per unit) <span class="cite-im">[CIM p.6]</span></li>
        <li><strong>Shared garage:</strong> Agreement with adjacent commercial garage for overflow — 20 spaces at $75/mo <span class="cite-im">[CIM p.6]</span></li>
        <li><strong>EV charging:</strong> 8 Level 2 stations planned (incentive-eligible through OEP) <span class="cite-model">[MODELED]</span></li>
      </ul>

      <h3>Environmental Considerations</h3>
      <ul>
        <li><strong>Phase I ESA:</strong> Not yet completed — former manufacturing use necessitates investigation <span class="cite-im">[CIM p.15]</span></li>
        <li><strong>Asbestos:</strong> Likely present in floor tiles and pipe insulation (built 1928) — abatement budgeted at $180K <span class="cite-model">[MODELED]</span></li>
        <li><strong>Lead paint:</strong> Presumed on interior surfaces — encapsulation or removal per HUD guidelines <span class="cite-model">[MODELED]</span></li>
      </ul>
    `,
  },
  {
    id: "investment-analysis",
    title: "Investment Analysis",
    customizable: true,
    html: `
      <h3>Sources & Uses Summary</h3>
      <table>
        <tr><th>Uses</th><th>Amount</th><th>$/Unit</th></tr>
        <tr><td>Acquisition</td><td>$4,200,000</td><td>$87,500</td></tr>
        <tr><td>Hard Costs (rehab)</td><td>$8,400,000</td><td>$175,000</td></tr>
        <tr><td>Soft Costs (30% of hard)</td><td>$2,520,000</td><td>$52,500</td></tr>
        <tr><td><strong>Total Project Cost</strong></td><td><strong>$15,120,000</strong></td><td><strong>$315,000</strong></td></tr>
      </table>
      <p><span class="cite-im">[CIM p.16]</span> <span class="cite-model">[MODELED]</span></p>

      <h3>Historic Tax Credit Analysis</h3>
      <table>
        <tr><th>Credit Type</th><th>Rate</th><th>QRE Base</th><th>Credit Value</th></tr>
        <tr><td>Federal HTC</td><td>20%</td><td>$12,600,000</td><td>$2,520,000</td></tr>
        <tr><td>Ohio State HTC</td><td>25%</td><td>$12,600,000</td><td>$3,150,000</td></tr>
        <tr><td><strong>Total HTC Equity</strong></td><td></td><td></td><td><strong>$5,670,000</strong></td></tr>
      </table>
      <p>QRE base = hard costs + soft costs ($12.6M). Federal credits syndicated at ~$0.92/dollar; Ohio credits at ~$0.85/dollar. Net equity from credits estimated at $5.16M after syndication costs. <span class="cite-im">[CIM p.12]</span> <span class="cite-model">[MODELED]</span></p>

      <h3>Financing Structure Comparison</h3>
      <table>
        <tr><th>Structure</th><th>Loan Amt</th><th>Rate</th><th>5-Yr IRR</th><th>DSCR</th><th>Equity Req.</th></tr>
        <tr><td>Conventional Only</td><td>$9.83M</td><td>7.25%</td><td>14.2%</td><td>1.24x</td><td>$5.29M</td></tr>
        <tr><td>Bridge + Perm</td><td>$12.10M</td><td>9.50%</td><td>16.8%</td><td>1.04x</td><td>$3.02M</td></tr>
        <tr><td style="background:#f0f7ff;font-weight:700">HTC + Conventional *</td><td style="background:#f0f7ff;font-weight:700">$7.56M</td><td style="background:#f0f7ff;font-weight:700">6.75%</td><td style="background:#f0f7ff;font-weight:700">18.7%</td><td style="background:#f0f7ff;font-weight:700">1.67x</td><td style="background:#f0f7ff;font-weight:700">$1.89M</td></tr>
        <tr><td>HTC + LIHTC</td><td>$6.05M</td><td>5.50%</td><td>22.1%</td><td>2.13x</td><td>$1.26M</td></tr>
      </table>
      <p>* <strong>Recommended structure.</strong> HTC + Conventional provides the best risk-adjusted return: lowest equity requirement among market-rate structures, comfortable DSCR, and avoids LIHTC affordability restrictions and compliance burden. <span class="cite-model">[MODELED]</span></p>

      <h3>Stabilized Pro Forma (Year 3+)</h3>
      <table>
        <tr><th>Line Item</th><th>Annual</th><th>Per Unit</th><th>Source</th></tr>
        <tr><td>Gross Potential Rent</td><td>$852,480</td><td>$17,760</td><td><span class="cite-model">[MODELED]</span></td></tr>
        <tr><td>Other Income (parking, storage, pet)</td><td>$57,600</td><td>$1,200</td><td><span class="cite-model">[MODELED]</span></td></tr>
        <tr><td>Vacancy & Credit Loss (5%)</td><td>($45,504)</td><td>($948)</td><td><span class="cite-model">[MODELED]</span></td></tr>
        <tr><td>Effective Gross Income</td><td>$864,576</td><td>$18,012</td><td></td></tr>
        <tr><td>Operating Expenses (45%)</td><td>($389,059)</td><td>($8,106)</td><td><span class="cite-model">[MODELED]</span></td></tr>
        <tr><td><strong>Net Operating Income</strong></td><td><strong>$475,517</strong></td><td><strong>$9,907</strong></td><td></td></tr>
        <tr><td>Stabilized Cap Rate (on cost)</td><td colspan="2">3.1%</td><td><span class="cite-model">[MODELED]</span></td></tr>
      </table>

      <h3>Return Summary (HTC + Conventional Structure)</h3>
      <table>
        <tr><th>Metric</th><th>Value</th><th>Source</th></tr>
        <tr><td>Total Equity Required</td><td>$1,890,000</td><td><span class="cite-model">[MODELED]</span></td></tr>
        <tr><td>5-Year Leveraged IRR</td><td>18.7%</td><td><span class="cite-model">[MODELED]</span></td></tr>
        <tr><td>10-Year Leveraged IRR</td><td>21.2%</td><td><span class="cite-model">[MODELED]</span></td></tr>
        <tr><td>Equity Multiple (5-Year)</td><td>2.8x</td><td><span class="cite-model">[MODELED]</span></td></tr>
        <tr><td>Cash-on-Cash (Stabilized)</td><td>11.3%</td><td><span class="cite-model">[MODELED]</span></td></tr>
        <tr><td>Debt Service Coverage</td><td>1.67x</td><td><span class="cite-model">[MODELED]</span></td></tr>
        <tr><td>Exit Cap Rate (assumed)</td><td>7.0%</td><td><span class="cite-web">[CoStar 2026]</span></td></tr>
      </table>
    `,
  },
  {
    id: "risk-assessment",
    title: "Risk Assessment",
    customizable: true,
    html: `
      <ul>
        <li><strong>Environmental — Phase I ESA Required:</strong> <span class="cite-gap">[ACTION REQUIRED]</span> Former Delco Electronics manufacturing facility. Potential soil and groundwater contamination from industrial solvents. Phase I Environmental Site Assessment must be completed before acquisition commitment. Budget $15,000-$25,000; if contamination identified, Phase II and remediation could add $200K-$500K and 6-12 months to timeline. <span class="cite-im">[CIM p.15]</span></li>
        <li><strong>Historic Compliance — SHPO Facade Review:</strong> National Register listing requires Ohio State Historic Preservation Office (SHPO) approval for all exterior modifications under Secretary of Interior Standards. Art Deco terra cotta and limestone facade elements must be preserved. Window replacements require compatible profile. Plan 60-90 day review timeline; budget 10-15% premium on exterior work for preservation-grade materials and methods. <span class="cite-im">[CIM p.12]</span> <span class="cite-web">[Ohio SHPO Guidelines]</span></li>
        <li><strong>Market — Lease-Up Absorption Risk:</strong> 48 units entering a downtown submarket currently absorbing ~62 units/year. Pro forma assumes 85% Year 1 occupancy (lease-up) reaching 95% by Year 2. If absorption is slower than projected, Year 1 cash flow shortfall could reach $130K-$180K vs. base case. <span class="cite-web">[CoStar 2026]</span> <span class="cite-model">[MODELED]</span></li>
        <li><strong>Construction — VRF HVAC Lead Times:</strong> Variable Refrigerant Flow systems required for adaptive reuse (no existing ductwork infrastructure). Current lead times are 12-16 weeks from order. Must be ordered within first 30 days of construction to avoid schedule delays. Source from 2+ suppliers to mitigate risk. <span class="cite-model">[MODELED]</span></li>
      </ul>

      <h3>Sensitivity Analysis</h3>
      <table>
        <tr><th>Scenario</th><th>Downside</th><th>Base Case</th><th>Upside</th></tr>
        <tr><td>Exit Cap Rate (+/-50bps)</td><td>14.2%</td><td>18.7%</td><td>22.4%</td></tr>
        <tr><td>Rent Growth (+/-1.5%)</td><td>15.1%</td><td>18.7%</td><td>21.8%</td></tr>
        <tr><td>Construction Cost (+/-10%)</td><td>16.3%</td><td>18.7%</td><td>20.1%</td></tr>
        <tr><td>Occupancy (80/95/98%)</td><td>13.8%</td><td>18.7%</td><td>19.9%</td></tr>
      </table>
      <p>All scenarios show IRR above 13.5% under the HTC + Conventional structure, demonstrating resilience to downside assumptions. <span class="cite-model">[MODELED]</span></p>
    `,
  },
  {
    id: "recommendation",
    title: "Recommendation",
    customizable: true,
    html: `
      <blockquote><strong>PROCEED — HTC + Conventional Structure</strong><br/>The Former Delco Building is a compelling adaptive reuse opportunity with strong risk-adjusted returns driven by $5.67M in layered tax credit equity. The 18.7% 5-year IRR under the recommended structure exceeds Windsor's 15% hurdle rate with meaningful cushion across downside scenarios.</blockquote>

      <h3>Key Investment Thesis</h3>
      <ol style="padding-left:20px;margin:12px 0">
        <li style="margin-bottom:8px"><strong>Tax credit leverage:</strong> Federal + Ohio HTC reduces effective equity to $1.89M — a 2.8x equity multiple on a $15.12M project <span class="cite-model">[MODELED]</span></li>
        <li style="margin-bottom:8px"><strong>Portfolio synergy:</strong> Complements Windsor's Fire Blocks District holdings 0.3 miles away. Shared property management, contractor relationships, and submarket knowledge reduce execution risk <span class="cite-im">[CIM p.5]</span></li>
        <li style="margin-bottom:8px"><strong>Market tailwind:</strong> Downtown Dayton multifamily vacancy at 5.2% with 4.1% rent growth. Young professional demand from WPAFB and healthcare employers continues to outpace supply <span class="cite-web">[CoStar 2026]</span></li>
        <li style="margin-bottom:8px"><strong>Structurally sound asset:</strong> Reinforced concrete frame in good condition reduces construction risk vs. wood-frame or unreinforced masonry conversions <span class="cite-im">[CIM p.9]</span></li>
      </ol>

      <h3>Required Next Steps</h3>
      <ol style="padding-left:20px;margin:12px 0">
        <li style="margin-bottom:8px">Commission <strong>Phase I ESA</strong> — environmental clearance is the critical-path gating item ($15K-$25K, 4-6 weeks) <span class="cite-im">[CIM p.15]</span></li>
        <li style="margin-bottom:8px">Submit <strong>Part 1 HTC application</strong> to National Park Service and Ohio SHPO concurrently — confirm eligibility and begin facade review (60-90 days) <span class="cite-im">[CIM p.12]</span></li>
        <li style="margin-bottom:8px">Obtain <strong>lender term sheets</strong> for HTC + Conventional structure — target $7.56M at 6.75% or better <span class="cite-model">[MODELED]</span></li>
        <li style="margin-bottom:8px">Engage <strong>preservation architect</strong> to develop schematic design and SHPO submission package <span class="cite-web">[Ohio SHPO Guidelines]</span></li>
        <li style="margin-bottom:8px">Complete <strong>asbestos and lead paint survey</strong> to refine abatement budget ($180K estimate) <span class="cite-model">[MODELED]</span></li>
      </ol>

      <p><em>Prepared by: Windsor AI Investment Committee — synthesizing Market Agent, Asset Agent & Investment Agent analyses.</em> <span class="cite-im">[CIM]</span> <span class="cite-web">[MARKET]</span> <span class="cite-model">[MODELED]</span></p>
    `,
  },
];
