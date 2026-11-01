import { DatabaseSync } from 'node:sqlite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dbPath = path.join(__dirname, 'mmk.db')

console.log(`Connecting to database at: ${dbPath}`)
const db = new DatabaseSync(dbPath)

// Helper for Lexical JSON string with rich typography
const createLexicalRichText = (textParagraphs) => {
  const children = textParagraphs.map((para) => ({
    type: 'paragraph',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    textFormat: 0,
    textStyle: '',
    children: [
      {
        type: 'text',
        text: para,
        version: 1,
        mode: 'normal',
        format: 0,
        style: '',
        detail: 0,
      },
    ],
  }))

  return JSON.stringify({
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children,
    },
  })
}

const now = new Date().toISOString()
const yesterday = new Date(Date.now() - 86400000).toISOString()
const twoDaysAgo = new Date(Date.now() - 172800000).toISOString()
const threeDaysAgo = new Date(Date.now() - 259200000).toISOString()
const fourDaysAgo = new Date(Date.now() - 345600000).toISOString()

db.exec('BEGIN TRANSACTION;')

try {
  console.log('1. Seeding Media Assets...')
  const mediaStmt = db.prepare(`
    INSERT INTO media (id, alt, url, filename, mime_type, width, height, updated_at, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      alt = excluded.alt,
      url = excluded.url,
      filename = excluded.filename,
      mime_type = excluded.mime_type,
      width = excluded.width,
      height = excluded.height,
      updated_at = excluded.updated_at;
  `)

  const mediaData = [
    // Core Platform Media (Native WebP CDN hosted)
    [10, 'Operation Sindoor Book Cover', 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/book-cover.webp', 'book-cover.webp', 'image/webp', 800, 1200, now, now],
    [11, 'Making The Unbreakable Digital Series Poster', 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/documentary-poster.webp', 'documentary-poster.webp', 'image/webp', 800, 450, now, now],
    [12, 'Major Madhan Kumar Tactical Headshot', 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/major-madhan.webp', 'major-madhan.webp', 'image/webp', 500, 500, now, now],
    [13, 'Naval Task Force Maritime Patrol', 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/naval-fleet.webp', 'naval-fleet.webp', 'image/webp', 800, 500, now, now],
    [14, 'Autonomous Drone Air Defense Shield', 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/drone-shield.webp', 'drone-shield.webp', 'image/webp', 800, 500, now, now],
    [15, 'Inside Operation Sindoor Declassified Mission', 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/operation-sindoor.webp', 'operation-sindoor.webp', 'image/webp', 800, 500, now, now],
    [16, 'Red Sea Carrier Strike Group Operation', 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/carrier-group.webp', 'carrier-group.webp', 'image/webp', 800, 500, now, now],
    [17, 'Himalayan High Altitude Border Command Post', 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/himalayan-post.webp', 'himalayan-post.webp', 'image/webp', 800, 500, now, now],
    [18, 'Indo-Pacific Strategic Summit Arena', 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/summit-conclave.webp', 'summit-conclave.webp', 'image/webp', 800, 500, now, now],
    [19, 'Captain Vikram Batra Portrait Tribute', 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/vikram-batra.webp', 'vikram-batra.webp', 'image/webp', 800, 800, now, now],
    [20, 'Major Somnath Sharma PVC Tribute', 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/somnath-sharma.webp', 'somnath-sharma.webp', 'image/webp', 800, 800, now, now],
    [21, 'MMK Tactical Commando Cap', 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/tactical-cap.webp', 'tactical-cap.webp', 'image/webp', 800, 800, now, now],
    [22, 'MMK Unbreakable Military Field Tee', 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/military-tee.webp', 'military-tee.webp', 'image/webp', 800, 800, now, now],
    [23, 'Collector Commemorative Medal Box', 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/commemorative-coin.webp', 'commemorative-coin.webp', 'image/webp', 800, 800, now, now],
    [24, 'Tactical Admin EDC Organizer Pouch', 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/edc-pouch.webp', 'edc-pouch.webp', 'image/webp', 800, 800, now, now],

    // Extended Soldiers & Features Media (Native WebP CDN hosted)
    [25, 'Captain M N Mulla INS Khukri Naval Tribute', 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/mahendra-mulla.webp', 'mahendra-mulla.webp', 'image/webp', 800, 800, now, now],
    [26, 'Commander Abhilash Tomy Solo Circumnavigator', 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/abhilash-tomy.webp', 'abhilash-tomy.webp', 'image/webp', 800, 800, now, now],
    [27, 'Flying Officer Nirmal Jit Singh Sekhon PVC', 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/nirmal-sekhon.webp', 'nirmal-sekhon.webp', 'image/webp', 800, 800, now, now],
    [28, 'Major Mohit Sharma Ashoka Chakra 1 Para SF', 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/mohit-sharma.webp', 'mohit-sharma.webp', 'image/webp', 800, 800, now, now],
    [29, 'Subedar Major Sanjay Kumar PVC Living Veteran', 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/sanjay-kumar.webp', 'sanjay-kumar.webp', 'image/webp', 800, 800, now, now],
    [30, 'MMK Siachen Thermal Commando Hoodie', 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/siachen-hoodie.webp', 'siachen-hoodie.webp', 'image/webp', 800, 800, now, now],
    [31, 'Strategic Operations Ceramic Coffee Mug', 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/tactical-mug.webp', 'tactical-mug.webp', 'image/webp', 800, 800, now, now],
    [32, 'Open Source Intelligence Geopolitical Radar Grid', 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/osint-radar.webp', 'osint-radar.webp', 'image/webp', 800, 500, now, now],
    [33, 'Cyber Security Strategic Operations Command Desk', 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/cyber-command.webp', 'cyber-command.webp', 'image/webp', 800, 500, now, now],
    [34, 'Indo-French Naval Carrier Group Exercise', 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/naval-exercise.webp', 'naval-exercise.webp', 'image/webp', 800, 500, now, now],
    [35, 'High Altitude Military Convoy Ladakh Highway', 'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/ladakh-convoy.webp', 'ladakh-convoy.webp', 'image/webp', 800, 500, now, now],
  ]

  for (const item of mediaData) {
    mediaStmt.run(...item)
  }

  console.log('2. Seeding Site Settings Global...')
  db.prepare(`DELETE FROM site_settings;`).run()
  db.prepare(`
    INSERT INTO site_settings (
      id, site_name, tagline, short_bio_english, short_bio_tamil, contact_email,
      social_urls_youtube, social_urls_twitter_x, social_urls_instagram, social_urls_facebook,
      book_promo_enabled, book_promo_title, book_promo_description, book_promo_cover_image_id,
      book_promo_custom_cover_url, book_promo_affiliate_url, book_promo_cta_text, book_promo_disclosure,
      doc_promo_enabled, doc_promo_title, doc_promo_subtitle, doc_promo_description,
      doc_promo_thumbnail_image_id, doc_promo_custom_thumbnail_url, doc_promo_trailer_youtube_id,
      doc_promo_youtube_url, doc_promo_cta_text, doc_promo_episode_info, updated_at, created_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    );
  `).run(
    1,
    'Major Madhan Kumar (Retd)',
    'Authoritative Defense Assessments, Geopolitical Intelligence & National Security Analysis',
    'Major Madhan Kumar (Retd) is a veteran of the Indian Armed Forces, strategic defense analyst, and national security commentator delivering mission-critical insights to over 850,000 defense analysts worldwide.',
    'மேஜர் மதன் குமார் (ஓய்வு) இந்திய ஆயுதப் படைகளின் மூத்த அதிகாரி மற்றும் புவிசார் பாதுகாப்பு ஆய்வாளர் ஆவார்.',
    'contact@majormadhankumar.in',
    'https://www.youtube.com/@MajorMadhanKumar',
    'https://twitter.com/MajorMadhanKumar',
    'https://instagram.com/MajorMadhanKumar',
    'https://facebook.com/MajorMadhanKumar',
    1,
    'Operation Sindoor – The Untold Story',
    'Read the untold story behind Operation Sindoor.',
    10,
    'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/book-cover.webp',
    'https://www.amazon.in/',
    'Buy the Book',
    'Purchase through our affiliate link.',
    1,
    'Making The Unbreakable',
    'India’s 1st Digital Series on the Indian Army',
    'An immersive landmark digital series exploring the grit, dedication, and operational valor of India’s armed forces.',
    11,
    'https://res.cloudinary.com/dsvqz4afr/image/upload/f_webp/payload-media/documentary-poster.webp',
    'dQw4w9WgXcQ',
    'https://www.youtube.com/@MajorMadhanKumar',
    'Watch Documentary',
    'Episode 1 • Streaming on YouTube',
    now,
    now
  )

  console.log('3. Seeding Tags...')
  const tagStmt = db.prepare(`
    INSERT OR REPLACE INTO article_tags (id, name, slug, updated_at, created_at)
    VALUES (?, ?, ?, ?, ?);
  `)
  tagStmt.run(1, 'Geopolitics', 'geopolitics', now, now)
  tagStmt.run(2, 'IndoPacific', 'indo-pacific', now, now)
  tagStmt.run(3, 'NationalSecurity', 'national-security', now, now)
  tagStmt.run(4, 'AirDefense', 'air-defense', now, now)
  tagStmt.run(5, 'OperationSindoor', 'operation-sindoor', now, now)
  tagStmt.run(6, 'SpecialForces', 'special-forces', now, now)
  tagStmt.run(7, 'OSINT', 'osint', now, now)
  tagStmt.run(8, 'NavalWarfare', 'naval-warfare', now, now)
  tagStmt.run(9, 'BorderSecurity', 'border-security', now, now)
  tagStmt.run(10, 'CareerGuidance', 'career-guidance', now, now)

  console.log('4. Seeding Articles (10 comprehensive editorial intelligence papers)...')
  db.prepare(`DELETE FROM articles_rels;`).run()
  db.prepare(`DELETE FROM articles;`).run()

  const articleStmt = db.prepare(`
    INSERT INTO articles (
      id, title, excerpt, body, category, language, featured_image_id,
      meta_title, meta_description, slug, status, published_at,
      is_featured, is_breaking, is_special, updated_at, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `)

  const articles = [
    // 1. Breaking Ticker Article
    [
      1,
      'Strait of Malacca Alert: Coalition Maritime Patrols Intercept Unregistered Electronic Recon Vessel',
      'Allied reconnaissance planes confirmed the tracking vessel was running silent without mandatory AIS transponders along critical commercial energy lanes.',
      createLexicalRichText([
        'In an unprecedented maritime operation, joint naval surveillance squadrons identified and shadowed an unflagged intelligence-gathering vessel navigating the critical choke points of the Malacca Strait.',
        'Initial radar telemetries indicated electronic signature spoofing, attempting to mask tactical monitoring arrays beneath regular container merchant hulls.',
        'Defense ministries across regional partner states have placed rapid response interceptor frigates on elevated alert status, reinforcing transit protection guidelines along vital trade arteries.',
        'Satellite imagery corroborated that the platform operated advanced signals intelligence (SIGINT) intercept masts capable of monitoring UHF/VHF communications within a 250-nautical-mile radius.',
      ]),
      'Geopolitics',
      'en',
      13,
      'Strait of Malacca Maritime Alert: Electronic Recon Vessel Shadowed',
      'Joint naval surveillance squadrons shadow unauthorized surveillance platform along critical maritime chokepoints.',
      'strait-of-malacca-surveillance-vessel-intercept',
      'published',
      now,
      0, // is_featured
      1, // is_breaking (Scrolling ticker top strip)
      0, // is_special
      now,
      now,
    ],

    // 2. Marquee Hero Spotlight Article
    [
      2,
      'Strategic Shift in Northern Command: The Autonomous Drone Defense Umbrella',
      'A comprehensive breakdown of multi-layered autonomous interceptors deployed across high-altitude forward bases in Ladakh and Sikkim.',
      createLexicalRichText([
        'Northern sector tactical headquarters have commissioned new integrated air-defense networks tailored to combat swarm-drone incursions across rugged mountainous frontiers.',
        'The deployment merges active electronically scanned phased-array radars with low-latency kinetic interceptors, forming an impenetrable barrier against low-observable reconnaissance platforms.',
        'Field evaluations in sub-zero operational trials demonstrated a 98.4% interception capability across challenging high-altitude weather environments.',
        'By networking tactical sensors into a unified automated C4ISR grid, field commanders can designate incoming threats in milliseconds without human latency.',
      ]),
      'Defense',
      'en',
      14,
      'Strategic Shift in Northern Command: Autonomous Drone Defense Shield',
      'In-depth strategic dossier on advanced mountain air-defense platforms guarding critical sectors.',
      'strategic-shift-northern-command-drone-umbrella',
      'published',
      now,
      1, // is_featured (Firstpost-style Hero!)
      0, // is_breaking
      0, // is_special
      now,
      now,
    ],

    // 3. Right Sidebar Special Articles Promo
    [
      3,
      'Inside the Story of Operation Sindoor: The Untold Declassified Tactical Chronicles',
      'Exclusive insights, classified logistics maps, and tactical decision matrices behind the high-stakes counter-insurgency operation.',
      createLexicalRichText([
        'Operation Sindoor stands as one of the most audacious tactical operations conceived in modern subcontinental warfare.',
        'For the first time, declassified communication logs reveal how specialized intelligence units infiltrated behind fortified hostile perimeters with surgical precision.',
        'This special dossier deconstructs the key turning points, covert logistics pipelines, and the commanders whose decisive orders turned the tide of battle.',
        'The operational doctrine established during Operation Sindoor continues to inform airborne assault tactics and forward insertion protocols today.',
      ]),
      'Strategy',
      'en',
      15,
      'Inside the Story of Operation Sindoor: Declassified Tactical Analysis',
      'Exclusive operational analysis and archival dossier on Operation Sindoor.',
      'inside-story-operation-sindoor-untold-chronicles',
      'published',
      yesterday,
      0, // is_featured
      0, // is_breaking
      1, // is_special (Right sidebar Special Article!)
      yesterday,
      yesterday,
    ],

    // 4. Red Sea Chokepoint (Tactical Dispatches Grid)
    [
      4,
      'The Red Sea Chokepoint: Asymmetric Naval Tactics Reshaping Global Shipping',
      'How low-cost anti-ship ballistic missiles and drone boats are challenging conventional multi-billion-dollar carrier strike architectures.',
      createLexicalRichText([
        'Commercial maritime arteries connecting the Suez Canal continue to face unprecedented disruption from land-based anti-ship cruise missile emplacements.',
        'Western coalitions have expended high-cost surface-to-air interceptors to neutralize asymmetric aerial assets costing a fraction of their defensive munitions.',
        'This dynamic forces global naval strategists to accelerate the deployment of high-energy laser effectors and close-in automated weapons systems.',
      ]),
      'Geopolitics',
      'en',
      16,
      'Red Sea Chokepoint Analysis: Asymmetric Tactics in Modern Maritime War',
      'Assessing the strategic economics of carrier protection in the Red Sea crisis.',
      'red-sea-chokepoint-naval-tactics',
      'published',
      yesterday,
      0,
      0,
      0,
      yesterday,
      yesterday,
    ],

    // 5. Himalayan Logistics Doctrine (Tactical Dispatches Grid)
    [
      5,
      'Himalayan Logistics Doctrine: Heavy Lift Transport & Forward Rapid Infiltration',
      'Engineering high-altitude supply corridors and rapid mechanized armor airlifts to sustain border outposts at 15,000 feet through harsh winter cycles.',
      createLexicalRichText([
        'Maintaining all-weather operational readiness across the trans-Himalayan perimeter presents staggering logistical challenges for brigade commanders.',
        'The continuous induction of C-17 Globemaster III transports and Chinook heavy-lift helicopters has fundamentally altered mobilization timelines.',
        'Forward staging depots now maintain modular habitat units, heated fuel storage, and automated supply chains capable of sustaining prolonged winter deployments.',
      ]),
      'Defense',
      'en',
      17,
      'Himalayan Logistics Doctrine: Heavy Lift Strategic Transport',
      'Operational examination of cold-weather military supply lifelines.',
      'himalayan-logistics-doctrine-rapid-infiltration',
      'published',
      twoDaysAgo,
      0,
      0,
      0,
      twoDaysAgo,
      twoDaysAgo,
    ],

    // 6. OSINT Radar Signatures Analysis
    [
      6,
      'Open Source Intelligence (OSINT): Mapping Contested Radar Signatures Across the Taiwan Strait',
      'Deconstructing commercial satellite synthetic aperture radar (SAR) passes and ADS-B flight transponder telemetry to monitor military air maneuvers.',
      createLexicalRichText([
        'Modern open-source intelligence analysts can now corroborate troop movements and combat air patrols with unprecedented granularity.',
        'By cross-referencing synthetic aperture radar imagery with maritime AIS anomalies, OSINT researchers tracked multiple amphibious landing exercises in real time.',
        'This dossier outlines the technical methodologies used to identify early-warning radar arrays and mobile surface-to-air missile batteries.',
      ]),
      'OSINT',
      'en',
      32,
      'OSINT Analysis: Radar Signatures Across the Taiwan Strait',
      'Comprehensive OSINT tracking of naval and aerial military movements.',
      'osint-mapping-radar-signatures-taiwan-strait',
      'published',
      twoDaysAgo,
      0,
      0,
      0,
      twoDaysAgo,
      twoDaysAgo,
    ],

    // 7. Sub-Surface Warfare
    [
      7,
      'Sub-Surface Warfare: Indian Ocean Anti-Submarine Barriers & Sonar Arrays',
      'Deep-dive analysis of acoustic underwater listening posts, P-8I Neptune maritime patrol sorties, and nuclear attack submarine deterrence doctrines.',
      createLexicalRichText([
        'The underwater battlespace of the Indian Ocean Region is heating up as extra-regional submarine deployments surge near the Andaman and Nicobar Islands.',
        'India’s multi-layered anti-submarine warfare (ASW) shield combines seabed acoustic sensors with airborne sonobuoy monitoring and hunter-killer subs.',
        'Controlling the critical choke points of the Sunda, Lombok, and Malacca Straits remains the cornerstone of sub-surface maritime superiority.',
      ]),
      'Defense',
      'en',
      34,
      'Sub-Surface Warfare: Indian Ocean Anti-Submarine Barriers',
      'Evaluating underwater acoustic surveillance networks in the IOR.',
      'sub-surface-warfare-indian-ocean-barriers',
      'published',
      threeDaysAgo,
      0,
      0,
      0,
      threeDaysAgo,
      threeDaysAgo,
    ],

    // 8. Armed Forces Career Guidance
    [
      8,
      'Commissioning Roadmap: SSB Interview Psychology & Officer Like Qualities (OLQ)',
      'Essential operational handbook for defense aspirants preparing for the Services Selection Board (SSB) psychological testing battery.',
      createLexicalRichText([
        'The Services Selection Board assesses an aspirant across 15 core Officer Like Qualities (OLQ) spanning effective intelligence, initiative, and team leadership.',
        'This briefing analyzes the Thematic Apperception Test (TAT), Word Association Test (WAT), and Group Testing Officer (GTO) obstacle series.',
        'Major Madhan Kumar shares direct advice on developing mental resilience, decisiveness under pressure, and genuine officer demeanor.',
      ]),
      'Career Guidance',
      'en',
      12,
      'SSB Commissioning Roadmap: Officer Like Qualities Masterclass',
      'Strategic guide for aspiring military officers tackling the SSB interview battery.',
      'commissioning-roadmap-ssb-interview-psychology-olq',
      'published',
      threeDaysAgo,
      0,
      0,
      0,
      threeDaysAgo,
      threeDaysAgo,
    ],

    // 9. Cyber Sovereignty
    [
      9,
      'Cyber Sovereignty: Securing Strategic Critical Infrastructure Against State-Sponsored APTs',
      'Evaluating proactive cyber defense postures, air-gapped grid controls, and quantum-resistant encryption algorithms for national security commands.',
      createLexicalRichText([
        'Modern warfare extends far beyond kinetic frontiers into the digital nerve centers of national electrical grids and satellite uplinks.',
        'State-sponsored Advanced Persistent Threat (APT) groups routinely deploy dormant malware designed to activate during diplomatic or military escalation.',
        'Strengthening indigenous cyber defense commands and adopting zero-trust military network architectures is now an existential imperative.',
      ]),
      'Geopolitics',
      'en',
      33,
      'Cyber Sovereignty: Protecting National Critical Infrastructure',
      'Strategic blueprint for hardening defense grids against coordinated cyber offensives.',
      'cyber-sovereignty-securing-critical-infrastructure',
      'published',
      fourDaysAgo,
      0,
      0,
      0,
      fourDaysAgo,
      fourDaysAgo,
    ],

    // 10. Indo-French Naval Cooperation
    [
      10,
      'Indo-French Strategic Maritime Axis: Joint Carrier Patrols & Submarine Propulsion',
      'Assessing high-level bilateral defense agreements, joint naval interoperability drills in the western Indian Ocean, and defense technology co-development.',
      createLexicalRichText([
        'The bilateral partnership between New Delhi and Paris has emerged as one of the most reliable anchors of Indo-Pacific maritime security.',
        'Recent Varuna bilateral naval maneuvers tested joint carrier strike group operations and coordinated long-range maritime strike scenarios.',
        'Cooperation on air-independent propulsion (AIP) for conventional submarines and joint military satellites provides strategic autonomy to both nations.',
      ]),
      'Geopolitics',
      'en',
      34,
      'Indo-French Strategic Maritime Axis: Joint Carrier Patrols',
      'Analysis of bilateral naval defense integration and technology sharing.',
      'indo-french-strategic-maritime-axis',
      'published',
      fourDaysAgo,
      0,
      0,
      0,
      fourDaysAgo,
      fourDaysAgo,
    ],
  ]

  for (const art of articles) {
    articleStmt.run(...art)
  }

  // Link tags to articles
  const relStmt = db.prepare(`
    INSERT INTO articles_rels (parent_id, path, article_tags_id, "order")
    VALUES (?, 'tags', ?, ?);
  `)
  relStmt.run(1, 1, 1) // Article 1 -> Geopolitics
  relStmt.run(1, 2, 2) // Article 1 -> IndoPacific
  relStmt.run(2, 3, 1) // Article 2 -> NationalSecurity
  relStmt.run(2, 4, 2) // Article 2 -> AirDefense
  relStmt.run(3, 5, 1) // Article 3 -> OperationSindoor
  relStmt.run(3, 6, 2) // Article 3 -> SpecialForces
  relStmt.run(4, 1, 1) // Article 4 -> Geopolitics
  relStmt.run(4, 8, 2) // Article 4 -> NavalWarfare
  relStmt.run(5, 3, 1) // Article 5 -> NationalSecurity
  relStmt.run(5, 9, 2) // Article 5 -> BorderSecurity
  relStmt.run(6, 7, 1) // Article 6 -> OSINT
  relStmt.run(6, 1, 2) // Article 6 -> Geopolitics
  relStmt.run(7, 8, 1) // Article 7 -> NavalWarfare
  relStmt.run(7, 2, 2) // Article 7 -> IndoPacific
  relStmt.run(8, 10, 1) // Article 8 -> CareerGuidance
  relStmt.run(9, 3, 1) // Article 9 -> NationalSecurity
  relStmt.run(10, 1, 1) // Article 10 -> Geopolitics
  relStmt.run(10, 8, 2) // Article 10 -> NavalWarfare

  console.log('5. Seeding Videos (8 Multimedia Broadcasts across all categories)...')
  db.prepare(`DELETE FROM videos;`).run()
  const videoStmt = db.prepare(`
    INSERT INTO videos (id, title, youtube_id, description, status, category, updated_at, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `)

  videoStmt.run(
    1,
    'Operation Sindoor: Tactical Blueprint & Operational Analysis',
    'dQw4w9WgXcQ',
    'Major Madhan Kumar breaks down the battlefield maneuvers, airborne insertions, and command room decisions that defined Operation Sindoor.',
    'published',
    'defence',
    now,
    now
  )

  videoStmt.run(
    2,
    'Taiwan Strait Crisis: War Games & Regional Maritime Preparedness',
    '9bZkp7q19f0',
    'Evaluating naval blockade scenarios, amphibious counter-measures, and the implications for Indian Ocean shipping routes.',
    'published',
    'geopolitics',
    now,
    now
  )

  videoStmt.run(
    3,
    'Inside Special Forces: Mental Resilience & Extreme Combat Training',
    'kJQP7kiw5Fk',
    'An unvarnished look at the grueling selection course, tactical endurance trials, and warrior mindset demanded in frontline special forces.',
    'published',
    'motivation',
    now,
    now
  )

  videoStmt.run(
    4,
    'Armed Forces Officer Commissioning: Roadmap & Strategy Guide',
    'fJ9rUzIMcZQ',
    'Step-by-step masterclass for defense aspirants covering SSB interviews, psychological battery assessments, and officer qualities.',
    'published',
    'career',
    now,
    now
  )

  videoStmt.run(
    5,
    'Indo-Pacific Naval Strategy: Maritime Chokepoints & Aircraft Carrier Groups',
    'L_LUpnjgPso',
    'In-depth examination of naval deterrence architectures, surface fleet modernizations, and submarine screening in key regional waters.',
    'published',
    'geopolitics',
    now,
    now
  )

  videoStmt.run(
    6,
    'Autonomous Drone Swarms: The Future of Mountain Warfare',
    'jNQXAC9IVRw',
    'Tactical analysis of AI-coordinated drone swarms, anti-drone laser defenses, and electronic warfare counter-measures on the LAC.',
    'published',
    'defence',
    now,
    now
  )

  videoStmt.run(
    7,
    'Siachen Glacier: Living & Fighting at 20,000 Feet Under Sub-Zero Conditions',
    'k1BneeJTDcU',
    'Firsthand account of high-altitude acclimatization, frostbite combat, and extreme psychological discipline required at the highest battlefield.',
    'published',
    'motivation',
    now,
    now
  )

  videoStmt.run(
    8,
    'SSB Psychology Masterclass: TAT, WAT, SRT & Interview Techniques',
    'y6120QOlsfU',
    'Comprehensive guidance on mastering the psychology battery, projecting natural leadership, and avoiding common candidate pitfalls.',
    'published',
    'career',
    now,
    now
  )

  console.log('6. Seeding Events (Upcoming Conclaves & Past Strategic Summits)...')
  db.prepare(`DELETE FROM events;`).run()
  const eventStmt = db.prepare(`
    INSERT INTO events (
      id, title, description, cover_image_id, location_name, location_city,
      registration_url, registration_open, event_date, slug, updated_at, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `)

  eventStmt.run(
    1,
    'National Security & Defense Conclave 2026',
    createLexicalRichText([
      'Join Major Madhan Kumar alongside distinguished veterans, defense strategists, and policy architects at India’s premier national security conclave.',
      'Keynotes cover next-generation unmanned warfare, sub-surface maritime deterrence, and cross-border cyber resilience frameworks.',
    ]),
    18,
    'Manekshaw Centre Auditorium',
    'New Delhi',
    'https://majormadhankumar.in/contact',
    1,
    '2026-11-20T10:00:00.000Z',
    'national-security-defense-conclave-2026',
    now,
    now
  )

  eventStmt.run(
    2,
    'Indo-Pacific Strategic Maritime Dialogue',
    createLexicalRichText([
      'A high-density symposium examining naval power projection, sea lane safeguarding, and regional naval cooperation across the Bay of Bengal.',
      'Featured sessions cover anti-submarine warfare, commercial shipping escort models, and joint maritime domain awareness.',
    ]),
    13,
    'ITC Grand Chola Convention Center',
    'Chennai',
    'https://majormadhankumar.in/contact',
    1,
    '2026-12-05T14:30:00.000Z',
    'indo-pacific-strategic-maritime-dialogue',
    now,
    now
  )

  eventStmt.run(
    3,
    'High-Altitude Tactical Logistics Masterclass',
    createLexicalRichText([
      'Exclusive executive workshop analyzing winter supply chains, cold-weather mechanized armor mobilization, and rapid airborne replenishment.',
    ]),
    17,
    'Army Institute of Technology Seminar Hall',
    'Pune',
    'https://majormadhankumar.in/contact',
    1,
    '2026-12-28T09:30:00.000Z',
    'high-altitude-tactical-logistics-masterclass',
    now,
    now
  )

  eventStmt.run(
    4,
    'Veer Gatha Remembrance Summit',
    createLexicalRichText([
      'An annual commemorative gathering honoring fallen heroes, decorated war veterans, and their families, with keynote addresses celebrating supreme sacrifice.',
    ]),
    19,
    'Officers Mess, ASC Centre',
    'Bengaluru',
    'https://majormadhankumar.in/contact',
    0, // Closed
    '2026-10-15T09:00:00.000Z',
    'veer-gatha-remembrance-summit',
    now,
    now
  )

  eventStmt.run(
    5,
    'Raisina Geopolitical Security Forum 2025',
    createLexicalRichText([
      'International security dialogue convening military commanders, intelligence directors, and diplomatic ambassadors to assess regional stability.',
    ]),
    18,
    'Taj Palace Convention Arena',
    'New Delhi',
    'https://majormadhankumar.in/contact',
    0, // Closed
    '2025-11-10T11:00:00.000Z',
    'raisina-geopolitical-security-forum-2025',
    now,
    now
  )

  console.log('7. Seeding Soldiers (Know Your Soldiers: 10 Heroes across Army, Navy, Air Force, Para SF)...')
  db.prepare(`DELETE FROM soldiers;`).run()
  const soldierStmt = db.prepare(`
    INSERT INTO soldiers (
      id, full_name, photo_id, rank, branch, regiment_unit, home_state,
      awards, short_bio, story, is_martyr, operation_name, martyrdom_date,
      martyrdom_location, tribute, service_from, service_to, slug, updated_at, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `)

  // 1. Capt Vikram Batra (Army, PVC, Martyr)
  soldierStmt.run(
    1,
    'Captain Vikram Batra',
    19,
    'Captain',
    'army',
    '13 JAK RIF',
    'Himachal Pradesh',
    'Param Vir Chakra (Posthumous)',
    'Known as Sher Shah of Kargil. Made the supreme sacrifice while leading the assault on Point 4875, ensuring complete tactical victory.',
    createLexicalRichText([
      'Captain Vikram Batra was commissioned into the 13th Battalion of the Jammu and Kashmir Rifles. During Operation Vijay in 1999, his company was tasked with capturing Point 5140 in an audacious frontal assault.',
      'Displaying extraordinary bravery and physical stamina, Captain Batra engaged enemy combatants in hand-to-hand combat and successfully hoisted the tricolor at the summit with his legendary signal: "Yeh Dil Maange More!".',
      'Later during the critical capture of Point 4875, he fearlessly exposed himself to intense fire to rescue an injured junior officer, sustaining mortal injuries that etched his name into eternal glory.',
    ]),
    1,
    'Operation Vijay (Kargil)',
    '1999-07-07',
    'Point 4875, Dras Sector, Kargil',
    createLexicalRichText([
      'The Nation bows in deepest reverence to the fearless valor and immortal sacrifice of Captain Vikram Batra, PVC.',
      'His battle cry and selfless leadership continue to inspire every generation of Indian soldiers.',
    ]),
    1996,
    1999,
    'captain-vikram-batra',
    now,
    now
  )

  // 2. Major Somnath Sharma (Army, PVC, Martyr)
  soldierStmt.run(
    2,
    'Major Somnath Sharma',
    20,
    'Major',
    'army',
    '4 Kumaon',
    'Himachal Pradesh',
    'Param Vir Chakra (Posthumous)',
    'First recipient of the Param Vir Chakra. Held Badgam airfield against overwhelming hostile forces in 1947, saving the Kashmir valley.',
    createLexicalRichText([
      'On November 3, 1947, Major Somnath Sharma’s D Company of 4 Kumaon was ordered on a fighting patrol to Badgam to protect the vital Srinagar airfield.',
      'Surrounded by a heavily armed force of over 700 tribal raiders and mercenary troops, Major Sharma urged his men to fight to the last man and last round despite suffering severe mortar bombardments.',
      'His final wireless message before laying down his life was: "The enemies are only 50 yards from us. We are heavily outnumbered... I shall not withdraw an inch but will fight our last man and our last round."',
    ]),
    1,
    'Battle of Badgam',
    '1947-11-03',
    'Badgam Airfield, Srinagar',
    createLexicalRichText([
      'Pioneer of the highest martial tradition of the Indian Republic. An inspiration for every soldier who wears the olive green.',
    ]),
    1942,
    1947,
    'major-somnath-sharma',
    now,
    now
  )

  // 3. Captain Manoj Kumar Pandey (Army, PVC, Martyr)
  soldierStmt.run(
    3,
    'Captain Manoj Kumar Pandey',
    15,
    'Captain',
    'army',
    '1/11 Gorkha Rifles',
    'Uttar Pradesh',
    'Param Vir Chakra (Posthumous)',
    'Hero of Khalubar. Led his men up sheer cliffs under heavy machine gun fire, eliminating four enemy bunkers before succumbing to wounds.',
    createLexicalRichText([
      'Captain Manoj Kumar Pandey of 1/11 Gorkha Rifles spearheaded the assault on Jubar Top and Khalubar during the Kargil conflict in July 1999.',
      'Braving heavy artillery barrages along precipitous ridgelines at 19,000 feet, he charged enemy machine gun nests single-handedly, ensuring the tactical collapse of enemy positions in the Batalik sector.',
    ]),
    1,
    'Operation Vijay (Khalubar)',
    '1999-07-03',
    'Khalubar Ridge, Batalik Sector',
    createLexicalRichText([
      'A warrior whose indomitable courage and supreme dedication secured India’s borders at the heights of the Batalik mountains.',
    ]),
    1997,
    1999,
    'captain-manoj-kumar-pandey',
    now,
    now
  )

  // 4. Captain Mahendra Nath Mulla (Navy, MVC, Martyr)
  soldierStmt.run(
    4,
    'Captain Mahendra Nath Mulla',
    25,
    'Captain',
    'navy',
    'INS Khukri (F149)',
    'Uttar Pradesh',
    'Maha Vir Chakra (Posthumous)',
    'Commanding Officer of INS Khukri during the 1971 Indo-Pak War. Upheld the highest naval tradition, going down with his ship after saving his crew.',
    createLexicalRichText([
      'On the night of December 9, 1971, Indian Navy anti-submarine frigate INS Khukri was torpedoed by an enemy submarine off the coast of Diu.',
      'Captain Mulla supervised the rescue operations with complete calm, giving away his own life jacket to a young sailor and refusing to abandon the vessel.',
      'He went down with his ship, sitting in his captain’s chair on the bridge, immortalizing the eternal naval ethos of command responsibility.',
    ]),
    1,
    'Indo-Pakistani Naval War of 1971',
    '1971-12-09',
    'Arabian Sea off Diu Coast',
    createLexicalRichText([
      'Supreme embodiment of command courage and selflessness. His legacy shines bright across every deck of the Indian Navy.',
    ]),
    1948,
    1971,
    'captain-mahendra-nath-mulla',
    now,
    now
  )

  // 5. Commander Abhilash Tomy (Navy, Living Veteran)
  soldierStmt.run(
    5,
    'Commander Abhilash Tomy',
    26,
    'Commander',
    'navy',
    'Indian Naval Aviation',
    'Kerala',
    'Kirti Chakra • Nau Sena Medal',
    'First Indian to complete a solo, unassisted non-stop circumnavigation of the globe under sail. Veteran naval aviator and maritime navigator.',
    createLexicalRichText([
      'Commander Abhilash Tomy (Retd) is a decorated Indian Navy aviator and maritime pioneer.',
      'In 2013, he completed Sagar Parikrama II, sailing solo around the globe without GPS support, enduring southern ocean storms and high-seas survival.',
      'He later overcame life-threatening injuries sustained during the 2018 Golden Globe Race to return and secure a podium finish in 2023, showcasing unmatched resilience.',
    ]),
    0,
    null,
    null,
    null,
    null,
    2000,
    2021,
    'commander-abhilash-tomy',
    now,
    now
  )

  // 6. Flying Officer Nirmal Jit Singh Sekhon (Air Force, PVC, Martyr)
  soldierStmt.run(
    6,
    'Flying Officer Nirmal Jit Singh Sekhon',
    27,
    'Flying Officer',
    'airforce',
    'No. 18 Squadron (Flying Bullets)',
    'Punjab',
    'Param Vir Chakra (Posthumous)',
    'The only Indian Air Force officer awarded the Param Vir Chakra. Defended Srinagar airfield in a Folland Gnat against six hostile Sabre jets.',
    createLexicalRichText([
      'On December 14, 1971, Srinagar airfield came under sudden low-level strafing by a six-aircraft hostile formation.',
      'Flying Officer Sekhon scrambled his Gnat despite runway cratering and engaged the enemy formation in intense low-altitude dogfight combat.',
      'Outnumbered six to one, he scored hits on two hostile aircraft before his own plane was fatally damaged, defending the Kashmir valley to his last breath.',
    ]),
    1,
    '1971 Srinagar Air Battle',
    '1971-12-14',
    'Srinagar Valley Airfield',
    createLexicalRichText([
      'The lone Param Vir Chakra of the Indian Air Force. His peerless airmanship and sacrifice inspire every pilot who takes to Indian skies.',
    ]),
    1967,
    1971,
    'flying-officer-nirmal-jit-singh-sekhon',
    now,
    now
  )

  // 7. Group Captain Abhinandan Varthaman (Air Force, Living Veteran)
  soldierStmt.run(
    7,
    'Group Captain Abhinandan Varthaman',
    12,
    'Group Captain',
    'airforce',
    'No. 51 Squadron (Sword Arms)',
    'Tamil Nadu',
    'Vir Chakra',
    'Fighter pilot decorated with the Vir Chakra for shooting down a hostile fighter jet in dogfight combat during the 2019 aerial engagement.',
    createLexicalRichText([
      'Wing Commander (now Group Captain) Abhinandan Varthaman was scrambled on February 27, 2019, to intercept hostile formations violating Indian airspace.',
      'In the ensuing high-speed dogfight, he locked his MiG-21 Bison onto an enemy jet and shot it down with a close-range missile before ejecting over hostile territory and demonstrating exemplary dignified conduct under captivity.',
    ]),
    0,
    null,
    null,
    null,
    null,
    2004,
    null,
    'group-captain-abhinandan-varthaman',
    now,
    now
  )

  // 8. Major Mohit Sharma (Para SF, Ashoka Chakra, Martyr)
  soldierStmt.run(
    8,
    'Major Mohit Sharma',
    28,
    'Major',
    'parasf',
    '1 PARA (Special Forces)',
    'Haryana',
    'Ashoka Chakra (Posthumous) • Sena Medal',
    'Legendary Para Commando known for deep undercover operations. Made supreme sacrifice in Kupwara after neutralizing multiple infiltrating terrorists.',
    createLexicalRichText([
      'Major Mohit Sharma of 1 PARA (SF) was a master of covert operations and counter-terror tactics.',
      'In March 2009, during an intense firefight in the dense Hafruda forest of Kupwara, Jammu & Kashmir, he personally evacuated two critically injured commandos.',
      'Continuing to direct fire despite severe wounds, he eliminated four hostile combatants in close-quarters combat before making the ultimate sacrifice.',
    ]),
    1,
    'Operation Hafruda (Kupwara)',
    '2009-03-21',
    'Hafruda Forest, Kupwara, J&K',
    createLexicalRichText([
      'Balidaan warrior of 1 PARA (SF). His tactical mastery and supreme devotion remain the bedrock of Special Forces lore.',
    ]),
    2001,
    2009,
    'major-mohit-sharma-parasf',
    now,
    now
  )

  // 9. Subedar Major Sanjay Kumar (Army / Para, PVC, Living Veteran)
  soldierStmt.run(
    9,
    'Subedar Major Sanjay Kumar',
    29,
    'Subedar Major',
    'parasf',
    '13 JAK RIF / National Defence Academy',
    'Himachal Pradesh',
    'Param Vir Chakra',
    'Living hero of Kargil. Charged an enemy machine gun bunker on Area Flat Top under devastating fire, clearing hostile sangars hand-to-hand.',
    createLexicalRichText([
      'Rifleman (now Subedar Major) Sanjay Kumar was the leading scout during the assault to capture Area Flat Top in the Mushkoh Valley on July 4, 1999.',
      'Facing intense automatic fire from an entrenched machine gun post, he charged the bunker alone, took two bullets in his chest and forearm, and killed three enemy soldiers in hand-to-hand combat.',
      'Seizing an enemy universal machine gun, he cleared a second sangar, enabling his company to secure the ridge without further casualties.',
    ]),
    0,
    null,
    null,
    null,
    null,
    1996,
    null,
    'subedar-major-sanjay-kumar-pvc',
    now,
    now
  )

  // 10. Major Madhan Kumar (Veteran, Tamil Nadu)
  soldierStmt.run(
    10,
    'Major Madhan Kumar (Retd)',
    12,
    'Major',
    'army',
    'Indian Army (Infantry & Defense Strategy)',
    'Tamil Nadu',
    'Chief of Army Staff Commendation • Operational Medals',
    'Veteran Indian Army officer, defense analyst, author of Operation Sindoor, and strategic voice reaching 850,000+ national security followers.',
    createLexicalRichText([
      'Major Madhan Kumar served for nearly three decades across contested high-altitude forward posts and operational commands.',
      'Following active military duty, he founded India’s premier independent defense and geopolitical intelligence platform majormadhankumar.in.',
      'His analytical briefings, media debates, and military history monographs bridge the gap between military tactical reality and civilian strategic literacy.',
    ]),
    0,
    null,
    null,
    null,
    null,
    1996,
    2018,
    'major-madhan-kumar-retd',
    now,
    now
  )

  console.log('8. Seeding Merchandise (6 Storefront Products with sizes, pricing, buy links)...')
  db.prepare(`DELETE FROM merchandise;`).run()
  db.prepare(`DELETE FROM merchandise_rels;`).run()

  const merchStmt = db.prepare(`
    INSERT INTO merchandise (
      id, title, description, price, external_buy_url, slug, status, in_stock, is_featured, updated_at, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `)

  merchStmt.run(
    1,
    'MMK Official Tactical Commando Cap',
    'Heavyweight cotton ripstop tactical baseball cap featuring embroidered MMK crest, moisture-wicking sweatband, and adjustable hook-and-loop strap.',
    799,
    'https://www.amazon.in/',
    'mmk-official-tactical-commando-cap',
    'published',
    1,
    1, // is_featured on Homepage Right-Hand Sidebar!
    now,
    now
  )

  merchStmt.run(
    2,
    'Operation Sindoor – Collector’s Hardcover & Challenge Coin Bundle',
    'Deluxe author-signed hardcover volume of Operation Sindoor paired with a bespoke antique bronze commemorative challenge coin and display box.',
    1499,
    'https://www.amazon.in/',
    'operation-sindoor-collectors-bundle',
    'published',
    1,
    0,
    now,
    now
  )

  merchStmt.run(
    3,
    'Unbreakable Military Olive Field Tee',
    'Breathable 100% combed cotton tactical field t-shirt engineered for training and everyday wear, featuring patriotic insignias.',
    899,
    'https://www.amazon.in/',
    'unbreakable-military-olive-field-tee',
    'published',
    1,
    0,
    now,
    now
  )

  merchStmt.run(
    4,
    'Tactical Admin EDC Organizer Pouch',
    'Laser-cut MOLLE-compatible utility pouch built with durable 1000D Cordura nylon for passports, notebooks, and tactical accessories.',
    1199,
    'https://www.amazon.in/',
    'tactical-admin-edc-organizer-pouch',
    'published',
    1,
    0,
    now,
    now
  )

  merchStmt.run(
    5,
    'MMK Siachen Thermal Commando Hoodie',
    'Heavyweight 380 GSM fleece tactical hoodie with ribbed storm cuffs, concealed utility sleeve pockets, and wind-resistant lined hood.',
    2299,
    'https://www.amazon.in/',
    'mmk-siachen-thermal-commando-hoodie',
    'published',
    1,
    0,
    now,
    now
  )

  merchStmt.run(
    6,
    'Strategic Operations Ceramic Coffee Mug',
    'Matte black 350ml ceramic tactical mug engraved with the MMK motto "Valor Through Knowledge". Dishwasher and microwave safe.',
    599,
    'https://www.amazon.in/',
    'strategic-operations-ceramic-coffee-mug',
    'published',
    0, // Out of Stock! (Tests Out of Stock badge in UI)
    0,
    now,
    now
  )

  // Attach images to merchandise via merchandise_rels
  const merchRelStmt = db.prepare(`
    INSERT INTO merchandise_rels (parent_id, path, media_id, "order")
    VALUES (?, 'images', ?, ?);
  `)
  merchRelStmt.run(1, 21, 1) // Cap
  merchRelStmt.run(2, 23, 1) // Coin bundle
  merchRelStmt.run(3, 22, 1) // Tee
  merchRelStmt.run(4, 24, 1) // EDC pouch
  merchRelStmt.run(5, 30, 1) // Hoodie
  merchRelStmt.run(6, 31, 1) // Mug

  console.log('9. Seeding Gallery Albums & Photos (4 Albums, 16+ Photos)...')
  db.prepare(`DELETE FROM gallery_photos;`).run()
  db.prepare(`DELETE FROM gallery_albums;`).run()

  const albumStmt = db.prepare(`
    INSERT INTO gallery_albums (id, name, description, cover_photo_id, visibility, event_date, slug, updated_at, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `)

  albumStmt.run(
    1,
    'Operation Sindoor Field Reconnaissance Archives',
    'Declassified high-definition field reconnaissance photography and tactical staging documents.',
    15,
    'public',
    '2026-08-15',
    'operation-sindoor-field-recon-archives',
    now,
    now
  )

  albumStmt.run(
    2,
    'National Defence Academy Passing Out Parade',
    'Photographic highlights celebrating newly commissioned gentlemen cadets at the NDA Drill Square.',
    20,
    'public',
    '2026-06-10',
    'nda-passing-out-parade',
    now,
    now
  )

  albumStmt.run(
    3,
    'High-Altitude Northern Border Command Inspections',
    'Field inspections of forward outposts, habitat modules, and radar emplacements across Ladakh and Sikkim sectors.',
    17,
    'public',
    '2026-04-20',
    'northern-border-command-inspections',
    now,
    now
  )

  albumStmt.run(
    4,
    'Raisina Geopolitical Keynote & TV Debate Sessions',
    'Visual archives of Major Madhan Kumar delivering keynote addresses at national security forums and television debates.',
    18,
    'public',
    '2026-02-14',
    'raisina-geopolitical-keynotes-tv-debates',
    now,
    now
  )

  const photoStmt = db.prepare(`
    INSERT INTO gallery_photos (id, album_id, media_id, caption, sort_order, updated_at, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `)

  // Album 1 photos
  photoStmt.run(1, 1, 15, 'Forward tactical briefing tent during initial operational ingress planning', 1, now, now)
  photoStmt.run(2, 1, 14, 'Air defense radar network deployed across high-altitude ridgelines', 2, now, now)
  photoStmt.run(3, 1, 17, 'Observation command post overlooking critical border valley approach routes', 3, now, now)
  photoStmt.run(4, 1, 35, 'Tactical transport convoy negotiating steep high-altitude mountain passes', 4, now, now)

  // Album 2 photos
  photoStmt.run(5, 2, 20, 'Cadets marching in precision column formation at Khetarpal Parade Ground', 1, now, now)
  photoStmt.run(6, 2, 12, 'Major Madhan Kumar reviewing cadet formations and congratulating top medalists', 2, now, now)
  photoStmt.run(7, 2, 19, 'Passing Out Parade flypast over the historic drill square', 3, now, now)
  photoStmt.run(8, 2, 18, 'Cadet pipping ceremony celebrating newly commissioned young officers', 4, now, now)

  // Album 3 photos
  photoStmt.run(9, 3, 17, 'Forward command outpost at 16,000 feet during winter readiness evaluation', 1, now, now)
  photoStmt.run(10, 3, 35, 'Specialized snow mobility transport vehicles traversing frozen passes', 2, now, now)
  photoStmt.run(11, 3, 14, 'Autonomous air surveillance radar station operating under sub-zero conditions', 3, now, now)
  photoStmt.run(12, 3, 13, 'Tactical communication link established across remote border peaks', 4, now, now)

  // Album 4 photos
  photoStmt.run(13, 4, 18, 'Keynote address on Indo-Pacific maritime security at the National Defense Conclave', 1, now, now)
  photoStmt.run(14, 4, 32, 'Delivering prime time geopolitical intelligence analysis on television broadcast', 2, now, now)
  photoStmt.run(15, 4, 33, 'Panel discussion with international defense attaches on cyber sovereignty', 3, now, now)
  photoStmt.run(16, 4, 16, 'Interactive Q&A session with defense researchers and strategic scholars', 4, now, now)

  db.exec('COMMIT;')
  console.log('===============================================================')
  console.log('✅ Comprehensive MMK Platform demo data successfully seeded!')
  console.log('===============================================================')
} catch (err) {
  db.exec('ROLLBACK;')
  console.error('❌ Seeding failed, rolled back:', err)
  process.exit(1)
}
