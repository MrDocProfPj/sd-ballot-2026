# Review findings

## Must fix

1. **[MUST FIX] Two candidate lists are not in certified ballot order.**
   - Current text: `"Heather Baxter"`, `"Terrence Davis"`, `"Tamara Lesnar"`; and `"Jen Bleyenberg"`, `"Brent R. Hoffman"`, `"Rick Bonander"`, `"Kenny Anderson Jr."`, `"Curt Soehl"`.
   - Problem: `index.html` says the guide follows the actual ballot. The certified order is Heather Baxter, **Tamara J. Lesnar**, Terrence Davis for secretary of state, and **Brent R. Hoffman, Jen Bleyenberg**, Rick Bonander, Kenny Anderson Jr., Curt Soehl for county commission.
   - Sources: [Secretary of State statewide order](https://electionresults.sd.gov/resultsSW.aspx?type=SWR); [Secretary of State county order](https://electionresults.sd.gov/resultsSW.aspx)
   - Suggested replacement: Reorder those two candidate arrays exactly as listed above and use `Tamara J. Lesnar`.

2. **[MUST FIX] The guide overstates the Senate's role in appointments and treaties.**
   - Current text: `"Senators vote on every federal law, and the Senate alone approves Supreme Court justices, cabinet members, and treaties."`
   - Problem: The president nominates officials, and the Senate confirms or rejects them. The president makes treaties with the Senate's advice and consent; treaty consent requires two-thirds of senators present.
   - Sources: [U.S. Senate on nominations](https://www.senate.gov/about/powers-procedures/nominations.htm); [U.S. Senate on treaties](https://www.senate.gov/about/powers-procedures/treaties.htm)
   - Suggested replacement: `Every federal law must pass both the Senate and House. The Senate also confirms or rejects presidential nominees, including Supreme Court justices and cabinet secretaries, and must consent to treaties by a two-thirds vote.`

3. **[MUST FIX] Not all spending bills must start in the House.**
   - Current text: `"Spending and tax bills start in the House. That includes the federal budget decisions behind Medicaid funding."`
   - Problem: The Constitution requires bills for raising revenue to originate in the House. Spending bills must pass both chambers, but are not covered by that constitutional origination rule.
   - Source: [Congress.gov Constitution Annotated, Origination Clause](https://constitution.congress.gov/browse/article-1/section-7/clause-1/)
   - Suggested replacement: `Bills that raise revenue must start in the House. Spending bills, including Medicaid appropriations, must pass both the House and Senate.`

4. **[MUST FIX] The governor proposes a budget; the Legislature appropriates the money.**
   - Current text: `"The governor's budget sets what the state spends on schools, the universities, Medicaid, prisons, and roads."`
   - Problem: This assigns the governor power the Legislature holds.
   - Source: [South Dakota Constitution, Article XII](https://sdlegislature.gov/Constitution/12)
   - Suggested replacement: `The governor proposes a budget for schools, universities, Medicaid, prisons and roads. The Legislature decides the appropriations, and the governor may sign or veto them.`

5. **[MUST FIX] Two passages silently choose the sponsors' disputed reading of Amendment I.**
   - Current text: `"If Amendment I passes and federal Medicaid funding drops, the governor and Legislature would decide what happens to expansion."` Also: `"If federal money shrinks, Republican lawmakers would control the budget decision themselves..."`
   - Problem: Elsewhere the guide correctly says the Attorney General reads the amendment as ending expansion automatically, while sponsors say lawmakers regain discretion. These passages state only the sponsors' reading as fact.
   - Sources: [Enrolled HJR 5001](https://mylrc.sdlegislature.gov/api/Documents/Bill/283708.pdf?Year=2025); [South Dakota Searchlight on the dispute](https://southdakotasearchlight.com/2026/09/18/ballot-measure-could-auto-repeal-medicaid-expansion-attorney-general-says-in-contrast-to-lawmakers/)
   - Suggested replacement: Governor impact: `If I passes and the federal match drops below 90%, the Attorney General says expansion ends; sponsors say the constitutional requirement ends and the governor and Legislature may decide whether to continue it.` Republican gain: `Under the sponsors' reading, Republican lawmakers would regain discretion over expansion if the federal share fell; under the Attorney General's reading, coverage would end automatically.`

6. **[MUST FIX] The voter-ID description is too broad.**
   - Current text: `"a student ID from a SD school"`
   - Problem: The accepted ID is a **current photo ID** from a South Dakota high school or an accredited South Dakota college, university or technical school. The present wording could send a voter to the polls with an ineligible card.
   - Source: [South Dakota Secretary of State voting rules](https://sdsos.gov/elections-voting/voting/default.aspx)
   - Suggested replacement: `a current photo ID from a South Dakota high school or accredited South Dakota college, university, or technical school`

7. **[MUST FIX] The absentee-ballot deadline is described too loosely.**
   - Current text: `"It has to arrive by the time polls close on Tuesday."`
   - Problem: The ballot must reach the county election official early enough to be delivered to the voter's precinct before 7 p.m. Arrival at the Auditor's office at 6:59 p.m. is not necessarily sufficient.
   - Source: [South Dakota Secretary of State absentee-voting guide](https://sdsos.gov/elections-voting/voting/absentee-voting.aspx)
   - Suggested replacement: `It must reach the Auditor early enough to be delivered to your precinct before polls close at 7 p.m.; a postmark is not enough. At this point, hand-deliver it and ask the Auditor about the cutoff.`

8. **[MUST FIX] Amendment J's summaries of SB 175 and the challenge law omit material rules.**
   - Current text: `"SB 175 (2026) requires new voter registrants to show proof of citizenship."` Also: `"A challenger must be registered in your county... and nobody can be removed in the 90 days before an election."`
   - Problem: SB 175 creates federal-only registration for an applicant who cannot provide documentary proof. A private challenger must be registered in the same county, but the Secretary of State or county auditor may also challenge. The 90-day protection applies to cancellation under this challenge process, not literally to every possible removal.
   - Sources: [SB 175 session law](https://mylrc.sdlegislature.gov/api/Documents/SessionLaw/306300.pdf?Year=2026); [SDCL 12-4-59](https://sdlegislature.gov/Statutes/12-4-59); [SDCL 12-4-61](https://sdlegislature.gov/Statutes/12-4-61)
   - Suggested replacement: `SB 175 requires documentary proof for new state voter registrations and creates a federal-only status for an applicant who cannot provide it. Under SB 30, a private challenger must be registered in the same county; the Secretary of State or county auditor may also file. A challenge needs a sworn statement and evidence, and this challenge process cannot cancel a registration during the 90 days before an election.`

9. **[MUST FIX] The county commission does not run the jail or elections.**
   - Current text: `"runs the jail and county roads"` and `"County decisions affect ... how elections are run in Minnehaha County."`
   - Problem: The Sheriff's Office operates the jail, and the elected county auditor administers elections. Commissioners fund county departments and set the budget.
   - Sources: [Minnehaha County Jail](https://www.minnehahacounty.gov/dept/so/divisions/jail/jail.php); [Minnehaha County Auditor](https://minnehahacounty.gov/dept/au/au.php)
   - Suggested replacement: `The commission sets the county budget and its share of property tax, funds services including the jail and election office, oversees county roads, and handles zoning outside city limits.`

10. **[MUST FIX] Amendment K is not an absolute lock, and the three-fourths rule is misstated.**
    - Current text: `"locked into a permanent, invested trust fund"` and `"a three-quarters vote of the full Legislature"`
    - Problem: The proposed text permits another use with approval from three-fourths of **all members-elect in each chamber**. “Locked” suggests no exception; “full Legislature” could be read as a combined vote.
    - Source: [Enrolled SJR 505](https://mylrc.sdlegislature.gov/api/Documents/Bill/284191.pdf?Year=2025)
    - Suggested replacement: Question: `Should the constitution create and protect an invested trust fund for net unclaimed-property receipts?` Yes effect: `The principal is protected; another use would require three-fourths of all members-elect in each chamber.`

## Should fix

11. **[SHOULD FIX] The bullet-voting explanation implies that a second vote dilutes the first.**
    - Current text: `"some people vote for only one candidate on purpose ... so their favorite doesn't lose ground to a second pick"` and glossary text `"to give your top pick the best chance"`
    - Problem: A second selection does not reduce the first candidate's vote or give either vote different weight. It can help another candidate, but the current wording sounds like strategic advice and may mislead a new voter.
    - Suggested replacement: `You may vote for only one candidate. That does not give the vote extra weight; it simply means you do not cast your second vote.` Glossary: `Voting for fewer candidates than allowed in a multi-seat race.`

12. **[SHOULD FIX] Several decision prompts create false either-or choices.**
    - Current text: `"public safety and the border, or health care and the cost of living?"`; `"power bills going up, or not having enough power"`; `"a voice in the Republican majority, or a member of the minority who pushes back"`
    - Problem: Candidates can address both sets of issues, and “pushes back” gives the minority candidate a favorable active role while the majority candidate is merely a “voice.”
    - Suggested replacement: House: `Which candidate's approach to public safety, the border, health care and cost of living is closer to yours?` PUC: `How should the PUC balance affordable rates, reliability, new demand and utility consolidation?` Senate: `Which candidate's priorities, experience and likely role in the Legislature are closer to what you want?`

13. **[SHOULD FIX] The “What's in it for them” text is speculative and asymmetric on J, K and L.**
    - Current text: J: `"A clear, popular message ... motivates their base"` versus `"It's a harder argument to make in a soundbite, so there's little political upside here."` K: `"A new, steady revenue source"` and `"Steadier revenue"`. L: `"Fewer citizen amendments that go around the Republican-controlled Legislature"` versus `"their most effective tool"`.
    - Problem: “Popular,” voter motivation, soundbite difficulty, political upside and “most effective” are unsupported campaign-strategy judgments. K's investment returns are not steady or guaranteed. L describes one party as blocking voters and the other as preserving an effective tool.
    - Suggested replacement: J Republican: `A constitutional citizenship rule advances the party's election-integrity platform and makes the ban harder to change.` J Democratic: `Opposition advances the party's concern about burdens on eligible voters and keeps more election policy in ordinary law.` K: `A potential long-term source of general-fund revenue without a tax increase.` L Republican: `A higher bar for constitutional changes, including citizen initiatives and legislative referrals, matching the party's stated preference for broader consensus.` L Democratic: `Keeping the simple-majority rule preserves a route for voters to enact constitutional policies the Legislature does not support.`

14. **[SHOULD FIX] Amendment J's impact paragraph uses dismissive wording.**
    - Current text: `"For voters today, almost nothing changes either way. The real rules ... come from the two 2026 laws, not from J."`
    - Problem: “Real rules” implies the constitutional question is not meaningful. The durable limit on future state and local policy is the principal effect supporters cite.
    - Suggested replacement: `Immediate eligibility and registration procedures remain essentially the same either way. J's main effect is to make the existing citizenship rule constitutional and harder for a future state or local government to change.`

15. **[SHOULD FIX] Amendment I uses absolutes and mislabels the disputants as experts.**
    - Current text: `"Nobody agrees on exactly what happens"` and `"even the experts disagree"`
    - Problem: The known dispute is between the Attorney General's official explanation and the sponsors, not a universal disagreement among experts.
    - Suggested replacement: `The Attorney General and the amendment's sponsors disagree about what happens if the trigger is reached.` Decide prompt: `How much does the disagreement between the official explanation and the sponsors matter to you?`

16. **[SHOULD FIX] Amendment K's summary substitutes a judgment for evidence.**
    - Current text: `"This is the least controversial item on the ballot... The only real question is whether the constitution is the right place for it."`
    - Problem: “Least controversial” and “only real question” are editorial conclusions and dismiss the guide's own best-case opposition arguments.
    - Suggested replacement: `It passed the Senate 35-0 and House 69-0. No con statement was filed and no organized opposition was identified.`

17. **[SHOULD FIX] Some candidate framing favors one issue set or candidate.**
    - Current text: `"Republicans keep a safe seat"`; `"actually reduce property taxes"`; `"The governor is the big one"`; `"It matters more than it sounds like it would."`
    - Problem: “Safe” predicts the result, “actually” endorses Ahlers's causal claim, and the last two phrases add editorial emphasis not used consistently across offices. The Democratic governor gain also says a win gives the party `"a veto"` without noting that the current Republican two-thirds majorities could override it if unified.
    - Suggested replacement: Use `Republicans keep the seat`; `argue that greater state school funding would reduce local property-tax pressure`; delete the two emphasis phrases; and use `A win would give Democrats the governor's veto pen, though Republicans currently hold enough seats to override a veto if their members agree.`

18. **[SHOULD FIX] The guide promises direct quotations but mostly paraphrases.**
    - Current text: `"Supporters and opponents in their own words"` and `"Wherever possible it quotes official sources"`
    - Problem: Most pro/con bullets are the guide writer's summaries. The content can still be fair, but the method should be described accurately.
    - Suggested replacement: `The guide summarizes the strongest arguments from official pro and con statements and other cited sources.`

19. **[SHOULD FIX] The general voting advice singles out Republicans unnecessarily.**
    - Current text: `"That's especially true in South Dakota, where Republicans often split among themselves."`
    - Problem: The point applies to any party, and singling out one party introduces an avoidable asymmetry.
    - Suggested replacement: `Candidates in the same party can differ, so check their records and stated positions too.`

20. **[SHOULD FIX] Candidate coverage is uneven where comparable information is available.**
    - Current text: Tamara Lesnar gets only `"The Libertarian Party nominee."`; four county-commission candidates get only `"Republican candidate"`, `"Democratic candidate"` or `"Independent candidate"`, while Jen Bleyenberg is identified as the incumbent.
    - Problem: The sparse treatment gives readers much less basis to evaluate these candidates and creates unequal space and charity. At minimum, Curt Soehl's current City Council service and Rick Bonander's public board service and stated priorities are documented in linked coverage.
    - Suggested replacement: Add one equally structured sentence of background and two or three attributed priorities for each candidate, or state consistently that no comparable current platform was located.

## Nice to fix

21. **[NICE] Use the office's exact title.**
    - Current text: `title: "Public Utilities Commission"`
    - Problem: Voters elect one **Public Utilities Commissioner**, not the commission as a body.
    - Suggested replacement: `title: "Public Utilities Commissioner"`

22. **[NICE] Add the Treasurer's official unclaimed-property link.**
    - Current text: Amendment K has no `sdtreasurer.gov` source.
    - Problem: The prompt calls for checking that URL, but no such URL appears in the current files. The official page is useful for readers who want to search for property or verify the program.
    - Source: [South Dakota Treasurer, unclaimed property](https://sdtreasurer.gov/unclaimed-property/)
    - Suggested replacement: Add that official page to Amendment K's sources.

23. **[NICE] Remove duplicate object keys.**
    - Current text: Governor candidate Larry Rhoden has `party: "R"` twice; Amendment K has `navTitle: "Amendment K (Unclaimed $)"` twice.
    - Problem: JavaScript silently keeps the later value. It does not change the current display, but duplicates invite future editing mistakes.
    - Suggested replacement: Delete one copy of each key.

24. **[NICE] No ballot contest appears to be missing, but narrow the “everything” promise.**
    - Current text: `"A plain-English walkthrough of everything on the ballot for downtown Sioux Falls."`
    - Problem: The certified list supports all races shown, including the conservation-district contest, and no Supreme Court or Second Circuit contest was found. Still, an exact address controls near district and precinct boundaries.
    - Source: [South Dakota Voter Information Portal](https://vip.sdsos.gov/VIPLogin.aspx)
    - Suggested replacement: `A plain-English walkthrough of the expected ballot for a downtown Sioux Falls address in Legislative District 15. Check the state portal for your exact sample ballot.`

25. **[NICE] The highlighted spot-check claims not listed above are supported and need no factual change.**
    - Verified: first Democratic statewide federal win since 2008; Republican governors since 1979 and no Democratic governor since the 1970s; current Republican legislative majorities above two-thirds; Rounds on Armed Services and Banking; PUC approval of the Black Hills Energy/NorthWestern merger; John Hughes as a Republican from Sioux Falls; no write-ins; replacement of a spoiled ballot; District 15's recent Democratic pattern; six-year PUC and four-year county terms; July 1, 2027 effective date; the Minnehaha hand-count debate; and bringing voting notes.
    - Representative sources: [2008 official results](https://www.sdsos.gov/elections-voting/assets/historicalelectiondata/2008GP.pdf); [current legislators](https://sdlegislature.gov/Legislators/Listing/71); [PUC merger release](https://puc.sd.gov/News/2026/06252026.aspx); [write-in law](https://sdlegislature.gov/Statutes/12-20-21.2); [spoiled-ballot law](https://sdlegislature.gov/Statutes/12-18-24); [effective-date law](https://sdlegislature.gov/Statutes/2-1-12)
    - Suggested replacement: None.
