/*
  CONTENT FILE
  ------------
  Everything on the page comes from this file.

  Your picks: set `pick:` on any race or amendment. It shows as a small
  gold line right under "Ask yourself". Use the exact candidate name (so the
  party dot shows), "Yes"/"No" for amendments, or a list for multi-seat races:
      pick: "Brian Bengs",
      pick: ["Kadyn Wittman", "June CopperStad"],
      pickWhy: "Optional one-liner.",
  Leave it out (or "") to hide.

  Your opinions on a single race: put text between the backticks on any
  `take:` line. A blank line starts a new paragraph. Empty = hidden.
  After editing, run `python3 build.py` to refresh the single-file version.

  Chart colors: R, D, I, L, N (party), yes, no, fed, state, a, muted
*/

const SRC = {
  list: { label: "SD Secretary of State: certified candidate list", url: "https://vip.sdsos.gov/candidatelist.aspx?eid=774" },
  pamphlet: { label: "SD Secretary of State: 2026 ballot question pamphlet", url: "https://sdsos.gov/elections-voting/upcoming-elections/general-information/2026%20Election%20Information/2026-ballot-questions.aspx" },
  ag: { label: "SD Attorney General: ballot explanations", url: "https://atg.sd.gov/OurOffice/Media/Publications/ballots.aspx" },
  gop: { label: "SD Republican Party: ballot recommendations", url: "https://www.sdgop.com/2026-ballot-questions/" },
  sddp: { label: "SD Democratic Party: 2026 positions", url: "https://www.sddp.org/2026-midterm-elections" },
  sfs: { label: "Sioux Falls Simplified: District 15 candidates", url: "https://www.sfsimplified.com/meet-the-dist-15-folks-who-want-to-represent-you-in-pierre/" },
  scout: { label: "Dakota Scout: Minnehaha County candidates", url: "https://www.thedakotascout.com/p/meet-the-candidates-running-for-minnehaha-county-offices-in-november" },
};
const SL = "https://southdakotasearchlight.com";

window.GUIDE = {
  meta: {
    updated: "November 2, 2026",
    takeLabel: "Parker's take",
    picksLabel: "Parker's pick",
    // Legislature + county races differ by place. Share a link ending in ?d=2 or ?d=17 to open on that tab.
    districts: [
      { id: "15", label: "Downtown", sub: "District 15", where: "Downtown Sioux Falls · District 15 · Minnehaha County" },
      { id: "2", label: "Southeast", sub: "District 2", where: "Southeast Sioux Falls · District 2 · Minnehaha County" },
      { id: "17", label: "Vermillion", sub: "District 17", where: "Vermillion · District 17 · Clay County" },
    ],
    takeByline: "One person's opinion.",
  },

  /* ---------- national context (top of page) ---------- */
  national: {
    title: "The big picture",
    blurb: "All 435 House seats and 35 Senate seats are up nationwide. Midterms often work as a check on the President's party. Here's what's at stake beyond South Dakota.",
    chambers: [
      { name: "U.S. House", total: 435, need: 218, up: "all 435 seats up", seats: [{ label: "Republicans", v: 219, c: "R" }, { label: "Democrats", v: 214, c: "D" }, { label: "Vacant", v: 2, c: "muted" }] },
      { name: "U.S. Senate", total: 100, need: 51, needLabel: "51 for a clear majority", up: "35 seats up", seats: [{ label: "Republicans", v: 53, c: "R" }, { label: "Democrats + 2 independents", v: 47, c: "D" }] },
    ],
    chamberNote: `House Republicans include Kevin Kiley, who left the GOP in March but still votes with them. Democrats need to gain 4 Senate seats; a 50–50 tie goes to Republicans because VP Vance breaks ties. <strong>SD's John Thune is the Senate Majority Leader.</strong>`,
    stakes: {
      R: { who: "If Republicans keep both", stance: "Agenda continues", points: ["Can keep passing priorities through budget bills that need only a simple majority, like the 2025 tax-and-spending law.", "Senate keeps confirming Trump's judges and Cabinet picks.", "Most other bills still need 60 Senate votes, so some Democratic support is required."] },
      D: { who: "If Democrats win the House", stance: "A check on the President", points: ["Can block Republican bills and set the House agenda.", "Committees can subpoena and investigate the administration.", "Could impeach, but removal takes 2/3 of the Senate, which is out of reach.", "Winning the Senate too would let them block judges and Cabinet picks."] },
    },
    stakesNote: `Either way, a fight comes fast: government funding runs out <strong>Dec. 11</strong>.`,
    agendaIntro: "Midterms are partly a verdict on the President's term. These are the big things voters are reacting to. SD's three members of Congress are all Republicans who have mostly voted with him. Tap any item for details.",
    agenda: [
      { title: "The 2025 tax & spending law", short: "Tax cuts extended; Medicaid and food aid trimmed", text: `Called the "One Big Beautiful Bill," signed July 4, 2025. Extends the 2017 tax cuts, adds breaks for tips and overtime, adds money for the border and defense, and cuts future Medicaid and SNAP (food aid) spending. The Congressional Budget Office estimates it adds $3.4 trillion to deficits through 2034 and leaves about 10 million more people uninsured.`, sd: "Rounds, Thune, and Johnson all voted yes. Medicaid work rules (80 hours a month) start Jan. 2027; the state estimates about 1,200 South Dakotans could lose coverage. SD also got $189M for 2026 from the law's new rural health fund. See Amendment I.", sides: ["Avoided a big tax hike, rewards work, cuts fraud.", "Coverage and food-aid losses; the biggest tax savings go to higher earners."] },
      { title: "Tariffs", short: "Import taxes that hit SD soybean exports", text: "Taxes on imported goods, meant to protect U.S. industry and pressure other countries into trade deals. In Feb. 2026 the Supreme Court struck down Trump's broad \"emergency\" tariffs, 6–3. Tariffs under other laws remain and keep changing.", sd: "China normally buys about 30% of SD's soybeans and stopped buying in 2025. Prices have recovered ($12.20 a bushel in Sept., up from $9.41 a year earlier), but China still left soybeans out of its latest tariff cuts. USDA announced $15B+ in new farm aid just before the election.", sides: ["Protects U.S. producers and gives leverage for better deals.", "Lost export markets, plus higher costs for fuel, fertilizer, and equipment."] },
      { title: "Immigration & deportations", short: "About 980,000 deported; Noem led it until March", text: "The 2025 law put about $170B into border security and detention. About 980,000 people were deported from Jan. 2025 to July 2026 (Migration Policy Institute); about 20% had a criminal conviction.", sd: "Former SD Gov. Kristi Noem ran this effort as Homeland Security Secretary until Trump removed her in March 2026.", sides: ["Border control and public safety.", "Due process, and families and workplaces disrupted."] },
      { title: "Shrinking the federal government", short: "About 256,000 federal jobs cut", text: "Cuts led by DOGE (Elon Musk's cost-cutting team) reduced staff at 22 major agencies by about 256,000 people, or 11%, from Dec. 2024 to Jan. 2026 (GAO).", sides: ["Less waste and overhead.", "Lost expertise and weaker services."] },
      { title: "Health insurance costs", short: "ACA premiums up 58% after extra subsidies ended", text: "Extra subsidies for ACA (\"Obamacare\") marketplace plans expired at the end of 2025. That end date was set in 2022, separate from the 2025 law. What enrollees pay rose 58% on average, from $113 to $178 a month (KFF).", sides: ["Extending them costs too much and invites improper sign-ups.", "Premiums jumped and people are dropping coverage."] },
      { title: "Shutdowns", short: "Record 42-day shutdown; next deadline Dec. 11", text: "Three funding lapses this Congress, including a 42-day full government shutdown in Oct.–Nov. 2025, the longest ever. Current funding expires Dec. 11, so the next fight comes right after the election." },
      { title: "Prices, gas & the Iran war", short: "AP's top forces in this election", text: "AP names inflation, gas prices, and the Iran war as the biggest forces in this election.", sides: ["Trump says the war kept Iran from a nuclear weapon, and oil prices are falling.", "The war and tariffs raised costs for households and farms."] },
    ],
    numbers: [
      { big: "38%", small: "approve of Trump's job; 60% disapprove (Ballotpedia avg., Nov. 2)" },
      { big: "D 51–43", small: "national poll avg. of which party voters want for Congress" },
      { big: "Solid R", small: "how all 3 major forecasters rate SD's Senate, House & governor races" },
      { big: "$3.4T", small: "added to deficits by the 2025 law through 2034 (CBO)" },
    ],
    sources: [
      { label: "U.S. Senate: party division", url: "https://www.senate.gov/about/parties-leadership/party-division.htm" },
      { label: "House Clerk: membership & vacancies", url: "https://clerk.house.gov/Members/ViewVacancies" },
      { label: "AP: Kiley leaves the GOP", url: "https://apnews.com/article/cf984d5b264563dc2d43aacbf4da7cc1" },
      { label: "Ballotpedia: 2026 Senate elections", url: "https://ballotpedia.org/United_States_Senate_elections%2C_2026" },
      { label: "AP: what's in the 2025 tax law", url: "https://apnews.com/article/6a58710651382dcce5083b31ac985042" },
      { label: "CBO: Medicaid effects of the 2025 law", url: "https://www.cbo.gov/publication/61837" },
      { label: "Senate vote on the 2025 law", url: "https://www.senate.gov/legislative/LIS/roll_call_votes/vote1191/vote_119_1_00372.htm" },
      { label: "House vote on the 2025 law", url: "https://clerk.house.gov/Votes/2025190" },
      { label: "Supreme Court: tariff ruling", url: "https://www.supremecourt.gov/opinions/25pdf/24-1287_4gcj.pdf" },
      { label: "AP: farm aid and tariffs (Nov. 1)", url: "https://apnews.com/article/113757ded4631a2debfa184a36c4d85e" },
      { label: "SD News Watch: tariffs and SD agriculture", url: "https://www.sdnewswatch.org/tariffs-trade-south-dakota-agriculture/" },
      { label: "Migration Policy Institute: deportations", url: "https://www.migrationpolicy.org/press-release/deportations-during-first-18-months-trump" },
      { label: "AP: Noem removed from DHS", url: "https://apnews.com/article/38c583b3cef97b4ef60d84b8f8b5961a" },
      { label: "GAO: federal workforce", url: "https://www.gao.gov/products/gao-26-108583" },
      { label: "KFF: 2026 ACA premiums", url: "https://www.kff.org/affordable-care-act/what-we-know-so-far-about-2026-aca-marketplace-enrollment-premiums-and-deductibles/" },
      { label: "CRS: federal funding gaps", url: "https://www.everycrsreport.com/reports/RS20348.html" },
      { label: "SD Searchlight: Medicaid work-rule estimate", url: SL + "/2026/04/26/1213-south-dakotans-could-lose-medicaid-as-federal-work-requirements-take-effect-department-says/" },
      { label: "CMS: rural health fund awards", url: "https://www.cms.gov/newsroom/press-releases/cms-announces-50-billion-awards-strengthen-rural-health-all-50-states" },
      { label: "AP: the midterms on Election Day eve", url: "https://apnews.com/article/7dcb866713d99a2f0beaa9c037d09ddd" },
      { label: "Ballotpedia: presidential approval index", url: "https://ballotpedia.org/Ballotpedia%27s_Polling_Index%3A_Presidential_approval_rating" },
      { label: "Ballotpedia: generic ballot index", url: "https://ballotpedia.org/Ballotpedia%27s_Polling_Index%3A_Generic_congressional_vote" },
      { label: "Cook Political Report: Senate ratings", url: "https://www.cookpolitical.com/ratings/senate-race-ratings" },
    ],
  },

  sections: [
    /* ------------------------------------------------------------ */
    {
      id: "federal",
      title: "Federal",
      blurb: "Who represents South Dakota in Congress.",
      items: [
        {
          id: "us-senate",
          kind: "race",
          title: "U.S. Senate",
          sub: "Vote for 1 · 6-year term",
          q: "One of South Dakota's two seats in the U.S. Senate.",
          gist: `The Senate votes on every federal law and confirms judges and cabinet picks. Only two names are on the ballot. The Democratic nominee withdrew in August, and write-ins aren't allowed in South Dakota.`,
          cands: [
            { name: "Mike Rounds", party: "R", note: "Incumbent", line: "U.S. Senator since 2015; governor 2003–2011. Former insurance and real-estate business owner.", focus: ["National security", "Agriculture & energy", "Gun rights", "Backs Trump agenda"], site: "https://roundsforsenate.com/issues/", more: `Sits on the Appropriations, Armed Services, Banking, Intelligence, and Indian Affairs committees. Armed Services matters for Ellsworth Air Force Base, where the new B-21 bomber arrives in 2027.

After Rounds said the 2020 election was fair, Trump called him a "jerk" and vowed never to endorse him again. He reversed and endorsed Rounds in July 2025, days after Rounds helped pass Trump's cuts to public broadcasting funding.

He voted for the 2025 tax-and-spending law and against efforts to end Trump's tariff emergencies. He broke with Trump on a plan to import more Argentine beef, which critics said would hurt U.S. cattle producers.` },
            { name: "Brian Bengs", party: "I", line: "Attorney, retired Air Force lieutenant colonel. Ran as a Democrat against Thune in 2022 (26%).", focus: ["Less big-donor influence", "Term limits", "Health care costs", "Local say on AI data centers"], site: "https://bengsforsouthdakota.com/", more: `Says he's neither pro- nor anti-Trump. He agrees with "no new wars" and the focus on affordability, but opposes the tariffs and the Iran war. He calls Biden's border policy a failure and rejects calls to abolish ICE.

He says he would caucus with neither party and would try to form an independent group instead. That could cost him committee seats unless a party agrees to work with him.

Also served in the Navy and as a national park ranger; has lived in SD since 2016.` },
          ],
          chart: { type: "bars", title: "October polls (likely voters)", rows: [{ label: "Rounds · Mason-Dixon", v: 56, c: "R" }, { label: "Bengs · Mason-Dixon", v: 37, c: "I" }, { label: "Rounds · Emerson", v: 50, c: "R" }, { label: "Bengs · Emerson", v: 42, c: "I" }], max: 70, note: "Mason-Dixon Oct. 12–14 (±4.5); Emerson Oct. 19–21 (±3.4). Rounds won his primary with about 76%." },
          national: { text: `Republicans hold 53 of 100 Senate seats, and Democrats need to gain 4 for control. Keeping this seat helps keep SD's other senator, John Thune, as Majority Leader, the person who decides what the Senate votes on. Forecasters rate it Solid Republican, though an Emerson poll had it within 8 points.` },
          impact: ["Senate decides Medicaid and Medicare funding, which ties directly to Amendment I.", "Confirms federal judges and Supreme Court justices, which last for decades."],
          parties: {
            R: { stance: "Rounds", say: "A senior, reliable vote for the Republican agenda.", gain: "Helps hold the Senate majority and Thune's leadership post." },
            D: { stance: "No nominee", say: "No Democrat on the ballot. Democratic-leaning voters choose Rounds, Bengs, or skip.", gain: "A Bengs win would cost Republicans a seat." },
          },
          ask: ["Party-aligned vote, or an independent not tied to either party?", "How much does Senate seniority matter to you?"],
          sources: [SRC.list, { label: "KOTA: Bengs interview", url: "https://www.kotatv.com/2026/07/14/special-interview-independent-senate-candidate-brian-bengs-outlines-campaign-priorities-south-dakota-race/" }, { label: "SD News Watch: primary guide", url: "https://www.sdnewswatch.org/2026-primary-election-top-races/" }],
          pick: "Brian Bengs",
    take: ``,
        },
        {
          id: "us-house",
          kind: "race",
          title: "U.S. House",
          sub: "Vote for 1 · 2-year term · Open seat",
          q: "South Dakota's only seat in the U.S. House.",
          gist: `South Dakota has one House member, elected statewide, who casts the state's entire vote on every House bill. Rep. Dusty Johnson gave up the seat to run for governor, so it's open.`,
          cands: [
            { name: "Marty Jackley", party: "R", line: "State Attorney General (2009–2019, 2023–now); former U.S. Attorney. Engineer and lawyer from Sturgis.", focus: ["Crime & the border", "Federal debt", "Lower taxes", "Backs Trump agenda"], site: "https://martyjackley.com/issues", more: `Trump endorsed him in March. He backs the border and public-safety agenda and targeted tariff pressure on China, but opposed the Argentine beef plan.

He supports the 2025 law's rural health fund and argues that tighter eligibility and private competition can cut Medicaid fraud and costs.` },
            { name: "Nikki Gronli", party: "D", line: "Dell Rapids business owner; led USDA Rural Development in SD (2022–2025).", focus: ["Cost of living", "Protect Medicare & Medicaid", "Schools", "Rural health & broadband"], site: "https://www.nikkigforsd.com/services-8", more: `Says Congress should take back tariff power from the President and return toward pre-Trump trade policy. She opposes the 2025 law's Medicaid cuts and says the rural health fund doesn't replace lost coverage. She also opposed the Argentine beef plan.

As head of USDA Rural Development in SD, she oversaw federal loans and grants for rural housing, infrastructure, and businesses.` },
          ],
          chart: { type: "bars", title: "October poll (Mason-Dixon, likely voters)", rows: [{ label: "Jackley", v: 60, c: "R" }, { label: "Gronli", v: 32, c: "D" }], max: 70, note: "Oct. 12–14, ±4.5 points. In the primary, Jackley beat James Bialota 79–21; Gronli was unopposed." },
          national: { text: `Republicans hold 219 of 435 House seats to Democrats' 214, so a swing of just a few seats nationwide flips control. That would decide whether Trump's agenda keeps moving or faces a Democratic House with subpoena power. SD's seat is rated Solid Republican.` },
          impact: ["Tax bills must start in the House, and every spending bill needs a House vote.", "The House majority is narrow, so one seat matters."],
          parties: {
            R: { stance: "Jackley", say: "A law-and-order record and a vote for the President's agenda.", gain: "Holds a seat in a narrow House majority." },
            D: { stance: "Gronli", say: "Focus on costs and health care; knows rural SD from USDA work.", gain: "First statewide federal win since 2008." },
          },
          ask: ["Whose approach to safety, the border, health care, and costs is closer to yours?", "Support the President's agenda, or check it?"],
          sources: [SRC.list, { label: "Dakota News Now: Gronli & Jackley", url: "https://www.dakotanewsnow.com/2026/09/29/inside-race-gronli-jackley-share-top-priorities-congress/" }, { label: "SD Searchlight: Jackley wins primary", url: SL + "/2026/06/02/south-dakota-attorney-general-marty-jackley-wins-bid-for-republican-us-house-nomination/" }],
          pick: "Nikki Gronli",
    take: ``,
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "state",
      title: "Statewide",
      blurb: "The people who run state government in Pierre. Except for governor, these nominees were picked at party conventions by delegates, not in primaries.",
      items: [
        {
          id: "governor",
          kind: "race",
          title: "Governor",
          sub: "Vote for 1 ticket · 4-year term",
          q: "Who runs South Dakota's state government.",
          gist: `The governor proposes the state budget, signs or vetoes bills, runs state agencies, and appoints judges. Larry Rhoden took over in 2025 when Kristi Noem joined the Trump Cabinet. This is his first run for the job.`,
          cands: [
            { name: "Larry Rhoden", party: "R", note: "Incumbent · with Tony Venhuizen", line: "Rancher and longtime legislator; lieutenant governor 2019–2025.", focus: ["Property tax relief via sales tax swap", "New $650M state prison", "Low taxes", "Banned eminent domain for CO₂ pipelines"], more: `Ranches near Union Center in western SD and served in the National Guard. Spent about two decades in the Legislature, then was Kristi Noem's lieutenant governor from 2019 until she left to join the Trump Cabinet.

As governor he won approval for a roughly $650M replacement for the aging state penitentiary, signed the ban on eminent domain for CO₂ pipelines, and proposed letting counties swap some property tax for a half-cent sales tax.

Running mate Tony Venhuizen is a Sioux Falls attorney and former state rep who was chief of staff to Govs. Daugaard and Noem.` },
            { name: "Dan Ahlers", party: "D", note: "with Steven McCleerey", line: "Dell Rapids small-business owner; former state representative and senator.", focus: ["State pays more of school costs", "Rural health & mental health", "Roads & broadband", "Open government"], site: "https://www.danahlers.com/about-3", more: `Runs a business in Dell Rapids and has served in both the state House and Senate. His core argument: if the state paid a bigger share of school costs, local districts would need less property tax.

Running mate Steven McCleerey is a Sisseton crop and livestock farmer, a state rep from 2015 to 2020, and a longtime hospital board member.` },
          ],
          chart: { type: "bars", title: "Republican primary, round 1 (June)", rows: [{ label: "Doeden", v: 30.6, c: "muted" }, { label: "Rhoden", v: 25.2, c: "R" }, { label: "Johnson", v: 23.4, c: "muted" }, { label: "Hansen", v: 20.8, c: "muted" }], max: 50, note: "No one reached 35%, so it went to a runoff. Rhoden beat Doeden 70.8% to 29.2% in July.", markers: [{ at: 35, label: "35% to win" }] },
          national: { text: `Rhoden became governor when Kristi Noem left to run Homeland Security for Trump; Trump removed her in March 2026. The next governor puts the federal Medicaid work rules in place in January 2027 and oversees SD's $189M federal rural health award. Forecasters rate the race Solid Republican; Mason-Dixon had Rhoden 56%, Ahlers 36%.` },
          contrast: `Both want lower property taxes. Rhoden would let counties swap some property tax for a half-cent sales tax. Ahlers would have the state cover more of school costs, the biggest piece of most property tax bills.`,
          impact: ["The governor proposes; the Legislature sets final spending. The governor can veto it.", "If Amendment I passes and federal Medicaid money drops, the governor's role depends on whose reading of I is right."],
          parties: {
            R: { stance: "Rhoden", say: "Points to the prison plan, pipeline protections, and low taxes.", gain: "Keeps one-party control of Pierre, held since 1979." },
            D: { stance: "Ahlers", say: "Wants more transparency and investment in schools and health care.", gain: "Veto power, though Republicans have enough seats to override if united." },
          },
          ask: ["Sales tax swap or more state school funding to cut property taxes?", "Happy with the state's direction, or want a change?"],
          sources: [SRC.list, { label: "AP: Rhoden profile", url: "https://apnews.com/article/9ae7c9443328c9c257d3f5da798a0ca5" }, { label: "Governor's property tax plan", url: "https://news.sd.gov/news?id=news_kb_article_view&sysparm_article=KB0045970" }, { label: "Dakota News Now: Ahlers & Rhoden", url: "https://www.dakotanewsnow.com/2026/09/16/inside-race-dan-ahlers-larry-rhoden-talk-key-issues-with-dakota-news-now/" }, { label: "Official primary canvass", url: "https://sdsos.gov/elections-voting/upcoming-elections/general-information/2026/Assets/State%20Canvass%20and%20Certificate.pdf" }],
          pick: "Dan Ahlers",
    take: ``,
        },
        {
          id: "sos",
          kind: "race",
          title: "Secretary of State",
          sub: "Vote for 1 · 4-year term · Open seat",
          q: "Runs state elections and business filings.",
          gist: `The state's chief election official. Twist: Republican Secretary of State Monae Johnson lost her party's nomination to Heather Baxter, then endorsed the Democrat, Terrence Davis.`,
          cands: [
            { name: "Heather Baxter", party: "R", line: "Won the GOP convention nomination over the sitting Secretary of State.", focus: ["Has backed hand-counting ballots", "Later said counting method is up to counties"], more: `Has advocated counting paper ballots by hand, a push that grew in SD after 2020 among activists who distrust vote-counting machines. Baxter later said the method should stay a county decision.` },
            { name: "Tamara J. Lesnar", party: "L", line: "Libertarian nominee. No published platform found." },
            { name: "Terrence Davis", party: "D", line: "Endorsed by outgoing Republican Secretary of State Monae Johnson.", focus: ["Follow existing election law", "Work with county auditors"] },
          ],
          impact: ["Sets election procedures for every county.", "Oversees citizenship checks on voter rolls (see Amendment J)."],
          ask: ["Would you want ballots counted by hand, even if slower?"],
          sources: [SRC.list, { label: "AP: the Secretary of State race", url: "https://apnews.com/article/9e825ab74c155b0690de73f78bb3dfde" }],
          pick: "Terrence Davis",
    take: ``,
        },
        {
          id: "ag",
          kind: "race",
          title: "Attorney General",
          sub: "Vote for 1 · 4-year term · Unopposed",
          q: "The state's top lawyer and law enforcement officer.",
          gist: `Defends state laws, runs the state crime bureau (DCI), and writes the official ballot explanations. Only one candidate is running, so he wins either way. You can vote for him or leave it blank.`,
          cands: [
            { name: "Lance Russell", party: "R", line: "State's attorney for Fall River and Oglala Lakota counties; 12 years in the Legislature.", focus: ["Wants to undo some past criminal justice reforms, over time"], more: `Hot Springs attorney and former state House and Senate member. He'd replace Marty Jackley, who is running for the U.S. House.` },
          ],
          sources: [SRC.list, { label: "KOTA: Q&A with Lance Russell", url: "https://www.kotatv.com/2026/09/09/qa-south-dakotas-next-attorney-general-aims-undo-criminal-justice-reforms-just-not-right-away/" }],
          pick: "Lance Russell",
    take: ``,
        },
        {
          id: "auditor",
          kind: "race",
          title: "State Auditor",
          sub: "Vote for 1 · 4-year term · Open seat",
          q: "Keeps the state's books and processes payroll.",
          gist: `A behind-the-scenes accounting job. The current auditor is term-limited.`,
          cands: [
            { name: "Catherine Barranco", party: "R", line: "Sioux Falls economist; former financial-fraud investigator at the U.S. SEC." },
            { name: "Tom Cool", party: "D", line: "Nearly four decades leading the Council on College Admissions in SD." },
          ],
          sources: [SRC.list, { label: "SD Searchlight: auditor race", url: SL + "/voter-guides/contests/2026-south-dakota-state-auditor-race/" }],
          pick: "Catherine Barranco",
    take: ``,
        },
        {
          id: "treasurer",
          kind: "race",
          title: "State Treasurer",
          sub: "Vote for 1 · 4-year term · Open seat",
          q: "Manages state money and the unclaimed property program.",
          gist: `Holds and invests state funds and returns unclaimed money to its owners. Amendment K would change how that unclaimed money is handled. The current treasurer is term-limited.`,
          cands: [
            { name: "Melissa Hull", party: "R", line: "Works in the State Treasurer's Office under the current treasurer." },
            { name: "Margaret Kuipers", party: "D", line: "Sioux Falls; former treasurer of the SD EMS Association." },
          ],
          sources: [SRC.list, { label: "SD Searchlight: treasurer race", url: SL + "/voter-guides/contests/2026-south-dakota-state-treasurer-race/" }],
          pick: "Margaret Kuipers",
    take: ``,
        },
        {
          id: "spl",
          kind: "race",
          title: "School & Public Lands",
          sub: "Vote for 1 · 4-year term",
          q: "Manages state-owned land that helps fund schools.",
          gist: `Leases state trust land for grazing, farming, and mineral rights. The money goes to public schools.`,
          cands: [
            { name: "Brock Greenfield", party: "R", note: "Incumbent", line: "Current commissioner; former state Senate president pro tem." },
            { name: "Raeann Mettler", party: "D", line: "Research specialist in Indigenous public health at Missouri Breaks Industries Research." },
          ],
          sources: [SRC.list, { label: "SD Searchlight: School & Public Lands race", url: SL + "/voter-guides/contests/2026-commissioner-of-school-and-public-lands-race/" }],
          pick: "Raeann Mettler",
    take: ``,
        },
        {
          id: "puc",
          kind: "race",
          title: "Public Utilities Commissioner",
          sub: "Vote for 1 · 6-year term · Open seat",
          q: "Helps set your power and gas rates and approve pipelines.",
          gist: `The 3-member PUC approves utility rates and permits for pipelines, power lines, and wind farms. This year it approved the Black Hills Energy and NorthWestern merger, and data-center power demand is a hot topic.`,
          cands: [
            { name: "Don Haggar", party: "R", line: "Sioux Falls; state representative 2012–2017; former SD director of Americans for Prosperity.", focus: ["Grid keeping up with AI-driven demand"], more: `Americans for Prosperity is a national conservative group, backed by the Koch network, that pushes for lower taxes and lighter regulation.` },
            { name: "Frank Kloucek", party: "D", line: "Scotland, SD farmer; 22 years in the Legislature.", focus: ["Fight unjustified rate hikes", "Called the utility merger a \"super monopoly\""] },
          ],
          national: { text: `Big tech companies plan about $700B in U.S. data-center spending in 2026 (AP), and who pays for the extra power has become a campaign issue in several states. In SD, the PUC is where that gets decided.` },
          ask: ["How should the PUC balance low rates, reliability, and new demand?"],
          sources: [SRC.list, { label: "SD Searchlight: PUC race", url: SL + "/voter-guides/contests/2026-public-utilities-commission-race/" }],
          pick: "Frank Kloucek",
    take: ``,
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "legislature",
      title: "Legislature",
      blurb: `These change with your address. Downtown Sioux Falls is District 15; far southeast Sioux Falls (around 41st St &amp; Six Mile Rd) and Brandon are District 2; Vermillion is District 17. Not sure? <a href="https://vip.sdsos.gov/VIPLogin.aspx" target="_blank" rel="noopener">Confirm your district</a>.`,
      items: [
        {
          id: "sd15-senate",
          district: "15",
          kind: "race",
          title: "State Senate",
          sub: "District 15 · Vote for 1 · 2-year term",
          q: "District 15's one seat in the state Senate.",
          gist: `The Legislature writes state law and the budget. Republicans hold more than two-thirds of both chambers, enough to override a veto. District 15 has been electing Democrats.`,
          cands: [
            { name: "Brenda Lawrence", party: "R", line: "Former corrections officer and Air Force Reserve veteran; ran for this seat in 2022 and 2024.", focus: ["Past focus: conservative education policy", "Landowner rights"], more: `This is her third run for the District 15 Senate seat. She's listed among the SD Republican Party's 2026 candidates but skipped the 2026 Vote411 and Sioux Falls Simplified questionnaires.` },
            { name: "Erik Muckey", party: "D", note: "Current state rep", line: "Small-business owner; on the budget (Appropriations) committee. Wrote the official \"No\" on Amendment J.", focus: ["School & teacher funding", "Health care", "Property tax relief", "Protect ballot initiatives"], more: `First-term state rep running to move up to the Senate. Sits on Joint Appropriations, the committee that writes the state budget, and says he helped secure money for Falls Community Health and 35 rural hospitals.` },
          ],
          contrast: `Lawrence didn't answer the 2026 candidate questionnaires, so her current platform is thin. That's a gap in published info, not proof of no positions.`,
          ask: ["Would you rather your senator be part of the majority or the minority, and why?"],
          sources: [SRC.list, SRC.sfs, { label: "Vote411: District 15 Senate", url: "https://onyourballot.vote411.org/race-detail.do?id=28540352" }],
          pick: "Erik Muckey",
    take: ``,
        },
        {
          id: "sd15-house",
          district: "15",
          kind: "race",
          title: "State House",
          sub: "District 15 · Vote for up to 2 · 2-year term",
          votes: 2,
          q: "District 15's two seats in the state House.",
          gist: `Top two vote-getters win. You can pick two, one, or none, and mix parties. Voting for just one doesn't make it count extra.`,
          cands: [
            { name: "Andre Zachariahs", party: "R", line: "Actuarial analyst who works on school and county health-insurance budgets.", focus: ["Affordability", "Education funding", "Local control of data centers"], more: `Works at Marsh McLennan, about a decade on school and county health-insurance budgets. Cautious about large new state child-care subsidies.` },
            { name: "Joni Tschetter", party: "R", line: "Business owner and former teacher.", focus: ["Public safety & homelessness", "Property tax relief", "2-year data center pause"] },
            { name: "Kadyn Wittman", party: "D", note: "Incumbent", line: "Sioux Falls YMCA development director; seeking a third term.", focus: ["School meals", "Child care & pre-K", "Parole & reentry", "Data center rules"], more: `Background in nonprofits and social services. In Pierre she has pushed for free school meals, ending child marriage in SD, and better parole and reentry programs.` },
            { name: "June CopperStad", party: "D", line: "Community health worker, social worker, business owner.", focus: ["Affordable housing", "Higher minimum wage", "Child care pay", "Against hyperscale data centers"] },
          ],
          contrast: `All four talk affordability and data centers. Democrats lean toward state programs (meals, child care, wages). Republicans lean toward spending restraint, property rights, and local control. The current state penitentiary is in District 15.`,
          sources: [SRC.list, SRC.sfs, { label: "KELO: House District 15", url: "https://www.aol.co.uk/articles/running-house-district-15-192459000.html" }],
          pick: ["Kadyn Wittman", "June CopperStad"],
    take: ``,
        },
        {
          id: "sd2-senate",
          district: "2",
          kind: "race",
          title: "State Senate",
          sub: "District 2 · Vote for 1 · 2-year term · Unopposed",
          q: "District 2's one seat in the state Senate.",
          gist: `The Legislature writes state law and the budget. Republicans hold more than two-thirds of both chambers. Only one candidate is running, so he wins either way. You can vote for him or leave it blank.`,
          cands: [
            { name: "John Sjaarda", party: "R", note: "Current state rep", line: "Farmer near Valley Springs; District 2 state rep since 2023.", more: `Won the June Republican primary over fellow District 2 Rep. David Kull, about 62% to 38%. No Democrat filed for the seat.` },
          ],
          sources: [SRC.list, { label: "SDPB: Meet John Sjaarda", url: "https://www.sdpb.org/2026-08-31/meet-the-candidates-john-sjaarda" }],
          pick: "",
    take: ``,
        },
        {
          id: "sd2-house",
          district: "2",
          kind: "race",
          title: "State House",
          sub: "District 2 · Vote for up to 2 · 2-year term · Open seats",
          votes: 2,
          q: "District 2's two seats in the state House.",
          gist: `Top two vote-getters win. Both seats are open because Reps. Sjaarda and Kull ran for the Senate. You can pick two, one, or none, and mix parties.`,
          cands: [
            { name: "Adam Long", party: "R", line: "Owner of 605 Signs. Navy and Air Force veteran, former police officer, Split Rock volunteer firefighter.", focus: ["Review budgets before new taxes", "Property tax relief via spending control", "Public schools and school choice", "Data centers can't stick locals with costs"], more: `Top vote-getter in the GOP primary. Wants zero-based budgeting, where programs justify their budgets from scratch. Says data centers and tax incentives should be transparent and shouldn't leave taxpayers or utility customers with long-term costs.` },
            { name: "Manuel Luschas", party: "R", line: "Electrical engineer (22 years in communications hardware) and farmer; moved to Brandon from Silicon Valley in 2020.", focus: ["Property tax reform", "Property rights", "Limit digital surveillance", "Self-funded campaign"], more: `Property taxes are his top issue; he says rising bills could force people on fixed incomes to sell their homes. He runs as an outsider, criticizing the outgoing District 2 Republicans for siding with "big money corporate interests."` },
            { name: "Blake Rife", party: "D", line: "Nurse; previously a teacher and rancher.", focus: ["More competitive schools", "Rural health care access", "Workforce and affordability", "More competition among cattle buyers"], more: `Won the Democratic primary. Points to Brandon's schools as a model and wants SD to compete harder on education. Wants rural areas to have good health care so people can keep working.` },
          ],
          chart: { type: "bars", title: "2026 Republican primary (top two advanced)", rows: [{ label: "Long", v: 32.6, c: "R" }, { label: "Luschas", v: 26.6, c: "R" }, { label: "Lane", v: 22.7, c: "muted" }, { label: "Hill", v: 18.2, c: "muted" }], max: 40, note: "Rife was the Democratic nominee." },
          contrast: `Both Republicans lead with property taxes and spending restraint; Luschas runs as more of an outsider. Rife focuses on schools, health care, and workers. With two votes, you can split between parties.`,
          sources: [SRC.list, { label: "SDPB: Meet Adam Long", url: "https://www.sdpb.org/2026-08-31/meet-the-candidates-adam-long" }, { label: "SDPB: Meet Manuel Luschas", url: "https://www.sdpb.org/2026-08-31/meet-the-candidates-manuel-luschas" }, { label: "SDPB: Meet Blake Rife", url: "https://www.sdpb.org/2026-08-31/meet-the-candidates-blake-rife" }, { label: "Minnehaha County primary returns", url: "https://web.minnehahacounty.gov/dept/au/election/electionReturns/26primary.php" }],
          pick: "",
    take: ``,
        },
        {
          id: "sd17-senate",
          district: "17",
          kind: "race",
          title: "State Senate",
          sub: "District 17 · Vote for 1 · 2-year term · Unopposed",
          q: "District 17's one seat in the state Senate.",
          gist: `The Legislature writes state law and the budget. Republicans hold more than two-thirds of both chambers. Only one candidate is running, so she wins either way. You can vote for her or leave it blank.`,
          cands: [
            { name: "Sydney Davis", party: "R", note: "Incumbent", line: "Burbank nurse anesthetist and cattle producer. State senator since 2023; state rep 2021–2023.", focus: ["Rural health, EMS & mental health", "Workforce, housing & ag", "School safety & student teachers", "Child care"], more: `Vice chair of Senate Health and Human Services. Beat Republican Jeffrey Church 77–23 in the June primary; no Democrat filed.\n\nSD Farmers Union, which opposes Amendments I and L, gave her its 2026 Service to Agriculture award.` },
          ],
          sources: [SRC.list, { label: "Legislature: Sen. Sydney Davis", url: "https://sdlegislature.gov/Legislators/Profile/4852/Detail" }, { label: "Ballotpedia: Sydney Davis", url: "https://ballotpedia.org/Sydney_Davis" }],
          pick: "",
          take: ``,
        },
        {
          id: "sd17-house",
          district: "17",
          kind: "race",
          title: "State House",
          sub: "District 17 · Vote for up to 2 · 2-year term",
          votes: 2,
          q: "District 17's two seats in the state House.",
          gist: `Top two win. You can pick two, one, or none, and mix parties. Rep. Kassin is running again; the other seat is open. Vermillion votes more Democratic than the rest of the district, which includes Union County towns like Dakota Dunes, North Sioux City, and Elk Point. Republicans hold both seats now.`,
          cands: [
            { name: "Chris Kassin", party: "R", note: "Incumbent", line: "Vermillion. VP of external relations at the USD Foundation; small-business co-owner. In the House since 2023.", focus: ["Balanced budgets", "Education & student-teacher stipends", "Property tax relief", "Less regulation"], site: "https://www.chriskassin.com/", more: `Sits on House Appropriations, the budget committee. Former Mount Marty athletic director and USD basketball assistant. Describes himself as pro-life, pro-gun rights, and fiscally conservative. Top vote-getter in the GOP primary.` },
            { name: "Troy Redler", party: "R", line: "Dakota Dunes pharmacist; owns a long-term-care pharmacy.", focus: ["Housing & property taxes", "Rural & long-term care", "Local control of schools", "Child care & workforce"], site: "https://votetroyredler.com/", more: `First run for office. Says the citizen initiative process should be protected and that changes making it harder to use deserve caution, which is relevant to Amendment L.` },
            { name: "Austin Brunick", party: "D", line: "Elk Point tech worker running as a pro-worker candidate.", focus: ["School funding, pre-K & meals", "Protect Medicaid & rural care", "Higher minimum wage", "Pause AI & crypto data centers"], site: "https://www.austinbrunick.com/issues", more: `Supports Medicare for All and a less regressive tax system, and opposes right-to-work laws. Signed a pledge to refuse data-center money and tax breaks and to defend local power to regulate or pause projects.` },
            { name: "Leslie Gerrish", party: "D", line: "Vermillion small-business owner; United Way of Vermillion board president; master's in public affairs.", focus: ["School funding & teacher pay", "Health care & elder care", "More county revenue options", "1-year pause on big data centers"], site: "https://www.leslieforhouse.com/", more: `Wants an economy that works for workers, families, seniors, and small businesses, and more ways for counties to raise money besides sales tax. Signed the same data-center pledge as Brunick.` },
          ],
          chart: { type: "bars", title: "2026 Republican primary (share of votes, pick-2 race)", rows: [{ label: "Kassin", v: 60.2, c: "R" }, { label: "Redler", v: 31.2, c: "R" }, { label: "Schiro", v: 8.7, c: "muted" }], max: 70, note: "Brunick and Gerrish were the only Democrats who filed." },
          contrast: `Data centers are the local flashpoint: Clay County weighed zoning for one this summer, and residents pushed back over water, power, and rents. Both Democrats signed a pledge to pause and regulate them. The Republicans lead with budgets, property taxes, and health access.`,
          sources: [SRC.list, { label: "Clay County voting guide (candidates)", url: "https://theheartlandcommunityledger.com/clay-county-voting-information/#district-17-candidates" }, { label: "Ballotpedia: House District 17", url: "https://ballotpedia.org/South_Dakota_House_of_Representatives_District_17" }, { label: "Vote411: District 17 House answers", url: "https://onyourballot.vote411.org/race-detail.do?id=28540353" }, { label: "DRG News: data center pledge", url: "https://drgnews.com/2026/08/28/some-south-dakota-legislative-candidates-sign-data-center-accountability-pledge-urge-other-candidates-to-do-so-as-well/" }, { label: "The Volante: Clay County data center talks", url: "https://volanteonline.com/2026/09/clay-county-discusses-potential-data-center/" }],
          pick: "",
          take: ``,
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "county",
      title: "Minnehaha County",
      blurb: "Sheriff and register of deeds were unopposed, so they're not on the ballot.",
      items: [
        {
          id: "county-commission",
          district: ["15", "2"],
          kind: "race",
          title: "County Commission",
          sub: "Vote for up to 3 · 4-year terms · Countywide",
          votes: 3,
          q: "The county's governing board.",
          gist: `Sets the county budget and its share of your property tax, funds the jail and election office, oversees county roads, and handles rural zoning.`,
          cands: [
            { name: "Brent R. Hoffman", party: "R", line: "One term in the state Senate (District 9); 20 years active-duty Air Force." },
            { name: "Jen Bleyenberg", party: "R", note: "Incumbent", line: "Commission vice chair; works in financial aid at the University of Sioux Falls." },
            { name: "Rick Bonander", party: "R", line: "Valley Springs area; four decades in ag sales management.", focus: ["County finances", "Public safety", "Roads & growth"] },
            { name: "Kenny Anderson Jr.", party: "D", line: "Eight years on the Sioux Falls City Council, including as chair. Military veteran." },
            { name: "Curt Soehl", party: "I", line: "Recently finished a term on the Sioux Falls City Council (Central District). Retired fire captain." },
          ],
          sources: [SRC.list, SRC.scout],
          pick: ["Kenny Anderson Jr.", "Curt Soehl"],
    take: ``,
        },
        {
          id: "county-auditor",
          district: ["15", "2"],
          kind: "race",
          title: "County Auditor",
          sub: "Vote for 1 · 4-year term",
          q: "Runs Minnehaha County's elections and books.",
          gist: `Runs county elections, including this one, and keeps county financial records. Hand-counting ballots has been a local debate.`,
          cands: [
            { name: "Leah G. Anderson", party: "R", note: "Incumbent", line: "Auditor since 2023; background in public and corporate accounting." },
            { name: "Curt Deedrich", party: "D", line: "Former Illinois farmer, village board member, and township assessor.", focus: ["Elections, auditing, staffing", "More counting machines and space"] },
          ],
          sources: [SRC.list, SRC.scout, { label: "Minnehaha County Auditor", url: "https://minnehahacounty.gov/dept/au/au.php" }],
          pick: "Curt Deedrich",
    take: ``,
        },
        {
          id: "conservation",
          district: ["15", "2"],
          kind: "race",
          title: "Conservation District",
          sub: "Vote for up to 2 · Nonpartisan",
          votes: 2,
          q: "Local soil and water conservation board.",
          gist: `Works with landowners on erosion and water quality. Low-profile and nonpartisan; fine to skip if you don't know the candidates.`,
          options: ["Allen L. Severtson Jr.", "Reid A. Christopherson", "Stephanie Wollman"],
          sources: [SRC.list],
          pick: "",
    take: ``,
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "clay",
      title: "Clay County",
      blurb: "Auditor, sheriff, and register of deeds were unopposed, so they're not on the ballot. The county's half-cent sales tax is a separate vote on Nov. 17.",
      items: [
        {
          id: "clay-commission",
          district: "17",
          kind: "race",
          title: "County Commission",
          sub: "Vote for up to 2 · 4-year terms · Countywide",
          votes: 2,
          q: "The county's governing board.",
          gist: `Sets the county budget and property-tax levy, handles zoning (including data-center rules), and funds county services. Two incumbents are running for two seats, so both will win.`,
          callout: `<strong>Coming up Nov. 17:</strong> the commission passed a half-cent county sales tax while cutting the 2027 budget. Residents petitioned it to a separate public vote.`,
          cands: [
            { name: "Geoffrey Gray-Lobe", party: "D", note: "Incumbent", line: "Vermillion. Former credit union communications director and home builder; National Park Service science background.", focus: ["Affordable housing", "More diverse jobs", "Open county government", "Protect land, water & the Missouri River"], site: "https://www.graylobeforclaycounty.org/about", more: `Opposed deeper cuts to community services in the 2027 budget, and opposed the county sales tax before it was petitioned to a vote.` },
            { name: "David Thiesse", party: "R", note: "Incumbent · vice chair", line: "Vermillion realtor; executive director of the Vermillion Housing Authority; former Clay County deputy.", more: `No 2026 platform found. Sits on county and city-county planning and zoning, which handle data-center rules. In budget talks he stressed reserves, bridge and flood costs, and finding cuts if the sales tax fails.` },
          ],
          sources: [{ label: "Clay County voting guide", url: "https://theheartlandcommunityledger.com/clay-county-voting-information/" }, { label: "Clay County commissioners", url: "https://www.claycountysd.org/userfiles/files/Commissioner%20Agendas%20and%20Notices/Clay%20County%20Commissioners.pdf" }, { label: "County budget & sales tax meeting record", url: "https://www.noticeregistry.com/south-dakota/notice/public-hearing-vermillion-248857" }, { label: "Clay County Auditor & elections", url: "https://www.claycountysd.org/auditorelections.cfm" }],
          pick: "",
          take: ``,
        },
      ],
    },

    /* ------------------------------------------------------------ */
    {
      id: "amendments",
      title: "Constitutional amendments",
      blurb: "Yes changes the state constitution. No leaves it as is. Each needs a simple majority. All four came from the Legislature.",
      items: [], // below
    },
  ],
};

/* ============================ AMENDMENTS ============================ */
window.GUIDE.sections.find((s) => s.id === "amendments").items = [
  {
    id: "amend-i",
    kind: "measure",
    title: "Amendment I",
    sub: "Medicaid expansion",
    q: "End the constitutional guarantee of Medicaid expansion if federal funding drops below 90%?",
    gist: `Voters added Medicaid expansion to the constitution in 2022. It covers about 30,000 low-income adults under 65. Washington pays 90% of the cost. Amendment I adds a trigger if that share ever slips below 90%.`,
    yes: "Nothing changes while the federal share stays at 90%. If it drops, the constitutional guarantee switches off.",
    no: "Expansion stays required no matter what Washington pays. The state covers any shortfall.",
    chart: { type: "split", title: "Who pays for expansion today", segs: [{ label: "Federal", v: 90, c: "fed" }, { label: "State", v: 10, c: "state" }], markers: [{ at: 90, label: "Trigger" }] },
    background: `<strong>How we got here:</strong> For years the Legislature declined to expand Medicaid, so supporters took it to voters. Amendment D passed in 2022 with 56%, and coverage began July 2023.

In 2025, while Congress debated big Medicaid cuts, SD lawmakers voted to put this escape hatch on the ballot. The federal law that passed kept the 90% match but added work requirements starting in 2027.`,
    callout: `<strong>Disputed:</strong> if the trigger trips, the Attorney General says coverage ends automatically. The sponsors say lawmakers would decide whether to keep it.`,
    national: { text: `This is a direct reaction to Washington. Lowering the 90% match was one option Congress weighed in 2025. The final law kept it but added work rules: starting Jan. 2027, many expansion adults must log 80 hours a month of work, school, or service. The state estimates about 1,200 South Dakotans could lose coverage. Nationally, CBO expects the law's Medicaid changes to leave 7.5 million more people uninsured by 2034. Those changes happen whether I passes or not.` },
    impact: ["Supporters estimate each 10-point federal cut costs the state about $36M a year."],
    pro: { who: "Lt. Gov. Venhuizen and GOP legislative leaders", points: ["If Washington breaks its 90% promise, South Dakota should get to decide again.", "Changes nothing while the promise holds.", "Protects schools and other services from a forced bill."] },
    con: { who: "Nurses, hospitals, AARP, Farmers Union, Cancer Society", points: ["Voters already decided in 2022.", "Coverage for ~30,000 shouldn't hinge on a Washington budget fight.", "The AG and sponsors disagree on what it does."] },
    votes: { house: [59, 7], senate: [31, 3], note: "Two House Republicans and all Democrats voted no." },
    parties: {
      R: { stance: "Yes", say: "Official party recommendation.", gain: "Budget control if federal money shrinks." },
      D: { stance: "No", say: "Official party recommendation.", gain: "Protects the 2022 expansion they backed." },
    },
    ask: ["If Washington paid less, should the state cover it automatically, or decide then?"],
    official: {
      title: "An Amendment to the South Dakota Constitution that Repeals Expanded Medicaid Coverage if Federal Funding for the Program Drops below 90%.",
      text: [
        "Medicaid is a program, funded by the State and the federal government, to provide medical coverage for low-income children, pregnant women, disabled individuals, and the elderly. In the 2022 General Election the voters approved Constitutional Amendment D, which expanded Medicaid eligibility in South Dakota. Amendment D requires the State to also provide Medicaid benefits to anyone over the age of 18 and under 65 whose income is at or below 133% of the federal poverty level, plus 5% of the federal poverty level for the applicable family size. Currently, federal law requires the federal government to fund 90% of South Dakota's Medicaid expansion.",
        "This proposed Constitutional Amendment ends the expanded Medicaid coverage if the federal funding for expansion drops below 90%. If federal funding drops below that 90% threshold, Medicaid coverage will once again only apply to low-income children, pregnant women, disabled individuals, and the elderly.",
      ],
    },
    sources: [SRC.pamphlet, SRC.ag, { label: "Legislature: HJR 5001", url: "https://sdlegislature.gov/Session/Bill/25683" }, { label: "SD Searchlight: AG vs sponsors on effect", url: SL + "/2026/09/18/ballot-measure-could-auto-repeal-medicaid-expansion-attorney-general-says-in-contrast-to-lawmakers/" }, { label: "SD Searchlight: opponents' coalition", url: SL + "/2026/09/29/passing-medicaid-ballot-measure-would-reduce-services-and-spike-insurance-costs-opponents-say/" }, SRC.gop, SRC.sddp],
    pick: "No",
    take: ``,
  },

  {
    id: "amend-j",
    kind: "measure",
    title: "Amendment J",
    sub: "Citizenship to vote",
    q: "Add \"not a U.S. citizen\" to the constitution's list of reasons a person can't vote?",
    gist: `Noncitizens already can't vote here under state law. J writes that ban into the constitution, so a future Legislature or city couldn't allow it without another statewide vote.`,
    yes: "The constitution explicitly bars noncitizens from voting in any SD election.",
    no: "Noncitizen voting stays illegal under state law, which lawmakers could change.",
    stats: [{ big: "273", small: "noncitizens removed from SD voter rolls in 2024, mostly DMV paperwork errors" }, { big: "1", small: "of them had voted, per the Secretary of State" }],
    background: `<strong>How we got here:</strong> In 2024, a state records check found 273 noncitizens on SD's voter rolls. Most had marked "not a citizen" at the DMV but were registered anyway. One had voted. Lawmakers responded with new verification laws and sent J to the ballot.`,
    callout: `<strong>Separate laws, already in effect either way:</strong> new voters must show proof of citizenship (SB 175), and registrations can be challenged over citizenship (SB 30). A challenge needs a same-county voter or an election official, sworn evidence, a hearing, and can't cancel a registration within 90 days of an election.`,
    national: { text: `Part of a national push. In 2024, all eight states that voted on similar amendments passed them, with 62% to 86% Yes. In Washington, Trump has made the SAVE America Act a top priority: it would require proof of citizenship to register and photo ID to vote in federal elections. It passed the House but has stalled at the Senate's 60-vote rule, which Majority Leader Thune has refused to scrap.` },
    pro: { who: "Sen. Taffy Howard (R-Rapid City)", points: ["Makes it unmistakable: only citizens vote.", "Today's constitution guarantees citizens can vote but never forbids noncitizens.", "Changes no one's existing rights."] },
    con: { who: "Rep. Erik Muckey (D-Sioux Falls)", points: ["Already illegal; fixes nothing.", "Paired with challenges, could burden naturalized citizens.", "The 2024 cases were paperwork errors, not fraud."] },
    votes: { house: [58, 11], senate: [33, 2], note: "Seven House Republicans voted no; one Democrat in each chamber voted yes." },
    parties: {
      R: { stance: "Yes", say: "Official party recommendation.", gain: "Advances its election-integrity platform." },
      D: { stance: "No", say: "Official party recommendation.", gain: "Guards against burdens on eligible voters." },
    },
    ask: ["Real protection, or symbolic since it's already law?"],
    official: {
      title: "An Amendment to the South Dakota Constitution Clarifying that an Individual Must Be a Citizen of the United States to be Eligible to Vote.",
      text: [
        "Article VII, § 2 of the South Dakota Constitution defines who is qualified to vote in state elections. Among these qualifications are age, residency, and United States citizenship requirements. Article VII, § 2 also establishes that individuals may be disqualified from voting because of mental incompetence or a felony conviction.",
        "This constitutional amendment adds people who are not United States citizens to the list of individuals disqualified from voting, clarifying the existing requirement that only citizens may vote in state elections.",
      ],
    },
    sources: [SRC.pamphlet, SRC.ag, { label: "Legislature: SJR 503", url: "https://sdlegislature.gov/Session/Bill/25856" }, { label: "SD Searchlight: Amendment J explained", url: SL + "/2026/10/16/closing-a-loophole-or-fearmongering-about-noncitizens-voting-south-dakotas-amendment-j/" }, { label: "Secretary of State: 2024 roll review", url: "https://sdsos.gov/about-the-office/assets/Press%20Releases/SOSResponsetoACLU10.11.2024.pdf" }, { label: "Voter challenge law (SDCL 12-4-59)", url: "https://sdlegislature.gov/Statutes/12-4-59" }, SRC.gop, SRC.sddp],
    pick: "No",
    take: ``,
  },

  {
    id: "amend-k",
    kind: "measure",
    title: "Amendment K",
    sub: "Unclaimed property trust",
    q: "Put unclaimed-property money in a protected, invested trust fund in the constitution?",
    gist: `Forgotten bank accounts, uncashed checks, and refunds go to the State Treasurer until owners claim them, which they can do forever. A regular-law trust fund already exists (2025). K moves it into the constitution and invests it like the state's other long-term funds.`,
    yes: "Constitutional trust. Earnings help the state budget. Spending the principal needs 3/4 of each chamber.",
    no: "The 2025 trust fund stays, but lawmakers could change it with an ordinary bill.",
    stats: [{ big: "$1.19B", small: "claimable property held by the state" }, { big: "$98M", small: "of it belongs to South Dakotans" }],
    chart: { type: "bars", title: "Investment returns (per Treasurer)", rows: [{ label: "Current fund", v: 3.5, c: "muted", text: "3–4%" }, { label: "State trust funds", v: 8.1, c: "a", text: "~8%" }], max: 10, note: "Past returns, not guaranteed." },
    background: `<strong>Why SD has so much:</strong> Many national banks and card companies are legally based in South Dakota, so unclaimed money from around the country lands in Pierre. It has become a big but unpredictable revenue source: $86M in 2023, $134M in 2024, and about $247M (estimated) in 2025, much of it one-time.`,
    impact: ["If you're owed money, nothing changes. You can still claim it."],
    pro: { who: "State Treasurer Josh Haeder (R)", points: ["New revenue for roads and schools, no new taxes.", "Higher returns.", "Principal always there for rightful owners."] },
    con: { who: "No statement filed; no organized opposition", points: ["A trust already exists in law.", "Money rules in the constitution are hard to adjust."] },
    votes: { house: [69, 0], senate: [35, 0], note: "Unanimous." },
    parties: {
      R: { stance: "Yes", say: "Official party recommendation.", gain: "Long-term revenue without a tax increase." },
      D: { stance: "No position", say: "Every Democratic legislator voted to put it on the ballot.", gain: "Earnings could fund priorities like schools." },
    },
    ask: ["Is a constitutional lock worth it when a trust already exists in law?"],
    official: {
      title: "An Amendment to the South Dakota Constitution Establishing the Trust for Unclaimed Property Fund.",
      text: [
        "Under South Dakota statute, intangible property is presumed to be abandoned if it remains unclaimed by the owner for more than three years after it became payable or distributable. Examples of intangible property are traveler's checks, money orders, bank deposits, refunds, stocks, funds owed under a life insurance policy, and property held in a safe deposit box. Abandoned intangible property is transferred to the State Treasurer to hold while waiting for the owner to claim it. The State Treasurer must provide public notice of the abandoned property.",
        "This proposed constitutional amendment establishes a trust fund where unclaimed abandoned property will be deposited. Portions of the interest and income from this fund will be distributed into the general fund for the benefit of the state. This proposed amendment requires the Legislature to determine the amount to be distributed that promotes the growth of the trust fund and the distributed amount.",
      ],
    },
    sources: [SRC.pamphlet, SRC.ag, { label: "Legislature: SJR 505", url: "https://sdlegislature.gov/Session/Bill/25479" }, { label: "SD Searchlight: Amendment K explained", url: SL + "/2026/10/15/amendment-k-lawmakers-ask-voters-to-approve-investing-unclaimed-property-proceeds-in-a-trust-fund/" }, { label: "SD Treasurer: search your unclaimed property", url: "https://sdtreasurer.gov/unclaimed-property/" }, SRC.gop, SRC.sddp],
    pick: "Yes",
    take: ``,
  },

  {
    id: "amend-l",
    kind: "measure",
    title: "Amendment L",
    sub: "60% to amend the constitution",
    q: "Require 60% of the vote, instead of a simple majority, to pass future constitutional amendments?",
    gist: `Applies to every future amendment, from citizens or the Legislature. Regular citizen-proposed laws still pass with a majority. L itself needs only a simple majority.`,
    yes: "Future constitutional amendments need 60% Yes. A 59% amendment fails.",
    no: "Amendments keep passing with more than 50%, like today.",
    chart: { type: "bars", title: "Recent amendments vs. the 60% line", rows: [{ label: "Medicaid expansion '22", v: 56.2, c: "a" }, { label: "Marijuana '20", v: 54.2, c: "a" }, { label: "55% rule (X) '18", v: 46.3, c: "muted" }, { label: "Abortion rights '24", v: 41.4, c: "muted" }], max: 70, markers: [{ at: 50, label: "50%" }, { at: 60, label: "60%" }], note: "Medicaid and marijuana passed but would have failed under L. Marijuana was later struck down in court on other grounds." },
    background: `<strong>How we got here:</strong> In 1898 South Dakota became the first state to let citizens put laws on the ballot. Voters have since used amendments for things the Legislature wouldn't pass, like Medicaid expansion.

Lawmakers have tried to raise the bar before. Amendment X (55% to amend) failed in 2018. Amendment C (60% for measures that raise taxes or spend $10M+) failed in June 2022 with 33%.`,
    money: { title: "Campaign money raised (late Oct.)", rows: [{ label: "No on L", v: 2.21, c: "no", text: "$2.2M" }, { label: "Yes on L", v: 0.109, c: "yes", text: "$109K" }], note: "Most No money is from national groups (Fairness Project ~$1.7M, NEA $500K). Most Yes money is from in-state PACs." },
    national: { text: `Similar fights are playing out in other states, often after voters passed measures on abortion, Medicaid, or marijuana that legislatures hadn't. Ohio voters rejected a 60% rule in 2023, 57% to 43%, three months before they voted on abortion rights. National groups supplied most of the money against L.` },
    pro: { who: "Rep. John Hughes, SD Right to Life, SD Retailers", points: ["A constitution shouldn't change on a narrow majority.", "Keeps national groups from writing policy into it.", "Citizens can still pass regular laws by majority."] },
    con: { who: "Dakota Rural Action, SD Education Assn., Farmers Union, League of Women Voters", points: ["Lets 41% block 59%.", "Voters rejected this in 2018 and 2022.", "Weakens \"Under God, the People Rule.\""] },
    votes: { house: [61, 5], senate: [29, 4], note: "Two Republican senators and all Democrats voted no." },
    parties: {
      R: { stance: "Yes", say: "Official party recommendation.", gain: "A higher bar for all constitutional change." },
      D: { stance: "No", say: "Official party recommendation.", gain: "Keeps a path around the Legislature." },
    },
    ask: ["Should changing the constitution take more than a bare majority?"],
    official: {
      title: "An Amendment to the South Dakota Constitution Requiring that a Proposed Constitutional Amendment or Revision Receive an Affirmative Vote of Sixty Percent of the Votes Cast.",
      text: [
        "The State Constitution provides that any proposed constitutional amendment or revision must be submitted to the voters for approval. Currently, a proposed constitutional amendment or revision becomes part of the Constitution if approved by a majority of the votes cast.",
        "This proposed Constitutional Amendment increases the number of votes required for a proposed constitutional amendment or revision to become part of the Constitution. If passed, further constitutional amendments must receive an affirmative vote of sixty percent of the votes cast to be implemented.",
      ],
    },
    sources: [SRC.pamphlet, SRC.ag, { label: "Legislature: HJR 5003", url: "https://sdlegislature.gov/Session/Bill/25663" }, { label: "SD Searchlight: Amendment L explained", url: SL + "/2026/10/14/protecting-the-state-constitution-or-protecting-voters-right-to-change-it-amendment-l-explained/" }, { label: "SD Searchlight: campaign money", url: SL + "/2026/10/23/national-groups-power-spending-against-higher-bar-for-constitutional-amendments/" }, { label: "Past ballot question results", url: "https://sdsos.gov/elections-voting/assets/Archive/Prior%20to%202026/BallotQuestions%20%282024%29.pdf" }, SRC.gop, SRC.sddp],
    pick: "No",
    take: ``,
  },
];
