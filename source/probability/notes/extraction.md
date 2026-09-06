# Bath Probability & Statistics 1A — Full PDF Extraction Notes

Source: y1-s1-probability-and-statistics-1a-comprehensive-lecture-notes.pdf (98 file pages).
Lecturer: Matt Roberts, University of Bath, September 2024. Studocu download (page 1 is a cover page).
**File page = printed page + 3** (printed p.1 = file p.4). App uses FILE pages 1–98.

## Assessment intel (file p5)
- Exam in January. Marks 0–60, pass 24/60. This unit = 40% of MA12002/MA12005/MA12012.
- Past papers: Bath Library website → "Past exam papers", **code MA10211**.
- Footnote file p80: "You will not need to do any difficult integrals in the exam... Any non-trivial integrals required will be stated as part of the question."
- **Section 7 entirely non-examinable** (file p93: "This section was written after the exam, so there will be no material from this section in the exam").
- Other non-examinable asides: non-measurable sets/Vitali (p13-14), Borel σ-algebra remark (p14), cdf right-continuity proof (p45), Stirling's formula (p30, p98), random walk recurrence discussion (p39), prosecutor's fallacy/Sally Clark (p39-41), Vandermonde alternative proofs (p63), Var(X)=0 iff constant general proof (p87), Theorem 5.6 proof (p78), covariance-as-inner-product remark (p89).

## Notation conventions (preserve in app)
- Ω sample space, ω generic outcome, F σ-algebra, P probability measure, (Ω,F,P) probability space.
- E∪F, E∩F, E\F = E∩Fᶜ, Eᶜ complement, ∅ empty set. |E| cardinality.
- Events {X=x} = {ω∈Ω : X(ω)=x}. X~Ber(p), Bin(n,p), Geom(p), Pois(λ), Unif(a,b), Exp(λ), N(μ,σ²).
- fX pmf/pdf, FX cdf, S support. E[X], Var(X), Cov(X,Y), ρ_XY=Corr. X̄n sample average. 1_A indicator.
- Geom counts trials UP TO AND INCLUDING first success (support {1,2,...}); alternative Y=X−1 noted.

## Page map (file pages)
- p1: Studocu cover. p2–3: Title + TOC.
- p4: Overview: content & learning outcomes. p5: organisation, assessment, MA10211. p6: FAQ probability vs statistics (coin example).
- p7: §1.1 Sets. Ex 1.1 (coin 100 tosses). Def 1.1 sample space. Ex 1.2 (three sample spaces: finite {0..100}, countable {1,2,...} first head, uncountable [0,∞) sneeze). Def 1.2 event. Ex 1.3 dice events E1={2,4,6}, E2={5,6}, E3={1}. Def 1.3 subset/equal.
- p8: Fig 1 (subset Venn). ∅. Def 1.4 union/intersection/difference/complement + remarks (Ω∪E=Ω, ∅∪E=E, Ω∩E=E, ∅∩E=∅, E\F=E∩Fᶜ, E=(E∩F)∪(E∩Fᶜ), (Eᶜ)ᶜ=E, ∅ᶜ=Ω, E∪Eᶜ=Ω, E∩Eᶜ=∅).
- p9: Figs 2–4 (union, intersection, difference Venns).
- p10: Fig 5 (complement). Ex 1.4 dice ops. Def 1.5 disjoint/mutually exclusive. Fig 6.
- p11: disjoint ⇔ E⊆Fᶜ. Ex 1.5. Thm 1.1 Laws of set theory: commutative, associative, distributive, De Morgan. Advice: say them aloud / draw Venns. Fig 7 (De Morgan proof part 1).
- p12: Fig 8 (De Morgan part 2). §1.1.4 collections: finite/countable unions & intersections; De Morgan for collections (Eqs 1,2).
- p13: Ex 1.6 first-head-even/odd via De Morgan. Pairwise disjoint def. §1.2. Power set Def 1.6 (2^100). Non-measurable warning (non-examinable), Vitali footnote.
- p13–14: Def 1.7 σ-algebra (∅∈F; closed complement; closed countable unions). Remark Ω∈F. Lemma 1.1 closed countable intersections (De Morgan proof). Lemma 1.2 closed finite unions/intersections (pad with ∅ / Ω trick). Ex 1.7 σ-algebras: {∅,Ω}, {∅,E,Eᶜ,Ω}, P(Ω). Borel remark non-examinable.
- p15: Def 1.8 Kolmogorov axioms A1 P(E)≥0, A2 P(Ω)=1, A3 countable additivity. Lemma 1.3 P(∅)=0 (pad proof).
- p16: Thm 1.2 finite additivity (Eqs 5,6). Ex 1.8 single coin p∈[0,1]. Cor 1.1 complements P(Eᶜ)=1−P(E).
- p17: Cor 1.2 0≤P≤1. Cor 1.3 partition rule P(F)=P(F∩E)+P(F∩Eᶜ) [problem sheet]. Cor 1.4 containment rule (E⊆F ⇒ P(F)=P(E)+P(F∩Eᶜ)≥P(E)). Fig 9. Warning: union ≠ addition. Cor 1.5 inclusion-exclusion [problem sheet]. "Check your intuition with a Venn diagram."
- p17–19: Ex 1.9 Cluedo (murderer M/P/S × weapon C/L/R; probs 4/27 ×6, 1/27 ×3; four computations; double-counting explanation). §1.2.4 Thm 1.3 specifying probabilities (pᵢ≥0 sum 1 → valid P; proof checks axioms). Ex 1.10 fair dice + non-uniform alternative.
- p20: §2 classical interpretation Def 2.1 P(E)=|E|/|Ω|. Ex 2.2 three coins ≥2 heads = 1/2; WARNING wrong sample space {0,1,2,3} not equally likely.
- p21: Ex 2.3 two dice sum 6 = 5/36 (6×6 table). Choice of sample space crucial. Ex 2.4 cycle/swim Venn 400 adults → P(not cycle)=7/20. Fig 10.
- p22: §2.2 multiplication principle (n×m table). Thm 2.1 (induction proof).
- p23: Ex 2.5 coin+dice+card = 1/52. §2.3 permutations; with/without replacement intro.
- p24: Cor 2.1 ordered with replacement nʳ. Ex 2.6 PIN codes (10⁴; P(only digits 0–6)=0.2401). §2.3.2 without replacement; Def 2.2 factorial (0!=1). Cor 2.2 n!/(n−r)!.
- p25: Ex 2.7 five cards: first three picture cards = (12·11·10·40·39)/(52·51·50·49·48)=11/1666≈0.0066. §2.4 combinations. Lemma 2.1 k! permutations of k objects. Cor 2.3 nCr = n!/(r!(n−r)!).
- p26: remarks nCr symmetric. Ex 2.8 lottery 59C6=45,057,474. Ex 2.9 full house 13·12·C(4,3)·C(4,2)/C(52,5)=6/4165.
- p26–27: §2.4.2 unordered with replacement; ice-cream vending machine (stars & bars, scoop/move buttons MMSMMSS...). Cor 2.4 C(n−1+r, r). Ex 2.10 doughnuts C(15,12)=455. **Summary table**: ordered w/o repl n!/(n−r)!, ordered with repl nʳ, unordered w/o repl C(n,r), unordered with repl C(n−1+r,r). Memory: podium / PIN code / lotto / doughnuts.
- p28: Ex 2.11 METHODS 7!=5040; ALGEBRA 7!/2!=2520 (repeated letters). Ex 2.12 A,2,3,4,5 in order = 4⁵/(52·51·50·49·48)≈0.000003.
- p28–29: Ex 2.13 lottery ≥5 match (6·53+1)/45,057,474. Ex 2.14 urn r red b blue, first red on kth pick: C(r+b−k, r−1)/C(r+b, b).
- p29–30: Ex 2.15 random walk P(at 0 after n steps)= C(n,n/2)/2ⁿ (even n), 0 odd. Stirling (non-exam) → ≈ √(2/(πn)). Figs 11–12 (walk paths 43 & 200 steps).
- p31: §3.1 Def 3.1 conditional probability P(E|F)=P(E∩F)/P(F), P(F)>0. Ex 3.1 three tosses: P(3 tails | ≥2 tails)=1/4 vs P(3 tails | first two tails)=1/2 — conditioning subtlety! Remarks: F becomes new sample space, renormalise; P(·|F) satisfies axioms; disjoint ⇒ P(E|F)=0. Eq 23 multiplication rule P(E∩F)=P(F)P(E|F).
- p32: Ex 3.2 two aces (4/52)(3/51)=1/221. Thm 3.1 chain rule for n events (telescoping proof). Ex 3.3 fuses (5 good, 2 bad): P(first two defective)=1/21; P(second defective on third test)=2/21.
- p33: §3.2 Def 3.2 partition. Ex 3.4 {E,Eᶜ}. Thm 3.2 law of total probability P(F)=Σ P(Eᵢ)P(F|Eᵢ) (distributive-law proof).
- p34: countable extension. Ex 3.5 traders Buster 30%/Rich 50%/Owen 20%, profit 1/2,1/3,1/4 → P(>£1m)=11/30. §3.3 Bayes: P(E|F)=P(E)P(F|E)/P(F) (Eq 28); doctor P(disease|symptoms) motivation. Thm 3.3 full Bayes with partition (Eq 29).
- p35: Ex 3.6 loss-making deal by Buster: P(L|B)=1/4,P(L|R)=1/8,P(L|W)=1/16 → P(B|L)=1/2. §3.4 Def 3.3 independence P(E∩F)=P(E)P(F). Consequences P(E|F)=P(E). Remarks: symmetric definition; P(E)=0 ⇒ independent of everything.
- p35–36: Ex 3.7 two tosses independent (formal). Ex 3.8 ace & hearts INDEPENDENT (1/52=1/13·1/4) — surprising physical relation but independent. Thm 3.4 independence extends to complements (partition-rule proof). **Warning: disjoint events are typically NOT independent** (common mistake).
- p36–37: §3.5 Def 3.4 mutual independence (all sub-collections). Ex 3.9 three events need ALL FOUR equations. Ex 3.10 cards: triple product works but pairwise fails. Ex 3.11 two tosses + G="same side": pairwise independent but NOT independent (P(E∩F∩G)=1/4≠1/8). Thm 3.5 independence closed under complement/intersection/union operations.
- p38: Ex 3.12 three missiles hit 0.7/0.8/0.9 → P(hit)=1−0.3·0.2·0.1=0.994 (complement trick). Ex 3.13 circuit two parallel branches of two series switches: P=p²(2−p²).
- p39: Fig 13 circuit. §3.6.1 setosa.io/conditional animation reference. §3.6.2 random walk recurrence (non-examinable, halving argument). §3.6.3 prosecutor's fallacy.
- p40–41: Sally Clark case (non-examinable): 1/8500² error (dependence), P(E|G) vs P(G|E) confusion; proper Bayes analysis → P(G|E1∩E2)≪1. Great cautionary tale.
- p41: §4 discrete RVs. Motivation coin tosses 2ⁿ outcomes → count heads. Def 4.1 random variable X:Ω→S⊆R, support S. Remarks: capital letters; events {X=x},{X≤x},{X∈A}.
- p42: Ex 4.1 three tosses table X(ω) per ω; P(X=1)=3/8, P(X≥2)=1/2; Y=3−X, Z, W other RVs on same space. Fig 14 mapping diagram. Def 4.2 discrete RV (finite or countable support).
- p42–43: Ex 4.2 (heads count; meteorites). Def 4.3 continuous RV (uncountable support). Ex 4.3 (sneeze time; possession %). §4.1.2 Def 4.4 pmf fX(x)=P(X=x); Σ=1.
- p43: Ex 4.4 pmf of 3-coin heads {1/8,3/8,3/8,1/8}; checks. Remark: law/distribution PX; continuous case needs sets not points → cdf idea.
- p44: §4.2 Def 4.5 cdf FX(x)=P(X≤x). Fig 15 (staircase cdf of 3-coin X). Ex 4.5 FX(2)=7/8. Non-decreasing proof.
- p45: cdf between jumps for discrete. Thm 4.1 cdf properties: non-decreasing; →1 at ∞; →0 at −∞; right-continuous (non-exam proof). Thm 4.2 P(X∈(a,b])=FX(b)−FX(a).
- p46: Thm 4.3 any such F is a cdf of some RV. Ex 4.6 recover pmf from staircase cdf (differences at jumps).
- p46–47: §4.3.1 Bernoulli trial; Def 4.6 Ber(p): P(X=1)=p=1−P(X=0). Y=1−X~Ber(1−p). Cdf staircase Eq 36.
- p47: §4.3.2 Def 4.7 Bin(n,p) pmf C(n,x)pˣ(1−p)ⁿ⁻ˣ. Ex 4.7 three components P(X≥2)=5/32.
- p47–49: Remarks: binomial expansion sums to 1; Bin(1,p)=Ber(p); sum of n indep Ber = Bin; interpretation via choosing which trials succeed; Y=n−X~Bin(n,1−p); cdf with floor. Fig 16 pmfs n=100 p=0.1/0.5/0.9.
- p49: §4.3.3 Def 4.8 Geom(p) pmf (1−p)^(x−1)p, x∈{1,2,...}. Remarks: interpretation; alternative Y=X−1 convention. Thm 4.4 geometric series (finite Eq 40 + infinite Eq 41).
- p50–51: Fig 17 geom pmfs. Ex 4.8 sums to 1. Ex 4.9 Geom(1/4): P(X>2)=9/16=(3/4)², P(X>3)=(3/4)³. Ex 4.10 P(X>n)=(1−p)ⁿ, P(X≤n)=1−(1−p)ⁿ; cdf Eq 44. Ex 4.11 Billy Forgetful p=0.3.
- p52: §4.3.4 Def 4.9 Pois(λ) pmf λˣe^(−λ)/x!. Fig 18 pmfs λ=1,5,10,50.
- p54: sums to 1 via series expansion of e^λ. Ex 4.12 Freddie sneezes rate 1.2/min, 20 min: P(asleep)=e^(−24). Remark: Poisson ≈ Bin(n,p) for large n small p, λ=np.
- p54–55: Ex 4.13 typesetter 1 error/500 words, 5 pages of 300: Bin(1500,1/500) exact 0.4230 vs Pois(3) approx 0.4232. Cdf Eq 46. Remark λ over area/volume: 1946 Clarke flying-bomb data. Ex 4.14 Westminster road accidents 2019, Pois(4.18) fit. Fig 19.
- p55–56: §4.4 joint pmf motivation. Ex 4.15 two dice X=sum Y=product: P(X=4,Y=3)=1/18. Def 4.10 joint pmf; marginals via law of total probability.
- p56–57: Ex 4.16 five-point joint pmf → marginals (coin: X=#HH-runs Y=#HT/TH). Ex 4.17 fX,Y=(2x+y)/36 → marginals (x+1)/6, (2+y)/12; **joint distribution table** with margins.
- p57: Def 4.11 joint cdf. Remark properties a–c + warning about limits.
- p58: §4.4.2 Def 4.12 independent RVs (via joint cdf factorising). Remark cdf form. Thm 4.5 independence ⟺ pmf factorises (for discrete).
- p58–59: Ex 4.18 two dice rolls X,Y independent; X and Z=X+Y NOT independent (P(X=1,Z=12)=0). Ex 4.19 joint pmf 3^x/4^(x+y) → X~Geom(1/4)? actually P(X=x)=(3/4)^(x−1)·(1/4)... wait text says X~Geom(1/4), Y~Geom(3/4); independent by factorisation.
- p60–61: Thm 4.6 alternative independence formulation via intervals (proof). Proof of Thm 4.5.
- p61: §4.4.3 sums. Thm 4.7 discrete convolution P(X+Y=k)=Σ P(X=x)P(Y=k−x).
- p62: Ex 4.20 Pois(λ)+Pois(μ)=Pois(λ+μ) (binomial-theorem trick). Interpretation rates add.
- p62–63: Ex 4.21 Bin(n,p)+Bin(m,p)=Bin(n+m,p) by interpretation + pmf calc ⇒ **Vandermonde's identity** C(n+m,k)=Σ C(n,x)C(m,k−x). Algebraic + combinatorial proofs (non-examinable).
- p63: §5 continuous RVs: pmf useless (P(X=x)=0); use cdf.
- p64: §5.1.1 Def 5.1 Unif(a,b) via cdf (x−a)/(b−a). Fig 20. Validity check. Remark P(X∈(u,v])=(v−u)/(b−a) — only length matters.
- p65: Ex 5.1 Unif(0,1). Ex 5.2 Y=360X~Unif(0,360). §5.1.2 exponential motivation (waiting times, radioactive decay, queues; continuous counterpart of geometric). Def 5.2 Exp(λ) cdf 1−e^(−λx).
- p65: Ex 5.3 Max the Mechanic: Nt~Pois(μt) → T first arrival ~Exp(μ). Ex 5.4 min of independent exponentials ~Exp(λ+μ).
- p66: Fig 21 exp cdfs λ=1/2,1,5,10. Ex 5.5 **memoryless property** P(X≤x+y|X>x)=P(X≤y).
- p66–67: §5.1.3 Def 5.3 N(μ,σ²) via cdf integral of density. Fig 22 standard normal cdf. Validity; Φ notation; universality/CLT teaser (semester 2); numerical evaluation.
- p67–69: Figs 23–24 normal cdfs varying μ and σ².
- p67 (§5.2): pdf motivation. Def 5.4 pdf: FX(x)=∫_{−∞}^x f(u)du. Remarks: non-uniqueness; **P(X∈(a,b]) = area under pdf** (Eq 53, Fig 25); total area 1; pdf ≈ derivative of cdf (FTC caveat).
- p70: Thm 5.1 Unif pdf 1/(b−a) (three-case proof). Thm 5.2 Exp pdf λe^(−λx) (exercise). Thm 5.3 Normal pdf.
- p71: Fig 26 cdf+pdf gallery (Unif, Exp(10), N(0,1)). Ex 5.6. Ex 5.7 X~Exp(1): P(X∈(1,2])=e^(−1)−e^(−2)≈0.2325. Fig 27 shaded area.
- p72–73: Ex 5.8 accidents inter-arrival exponential fit. Fig 28. §5.3 joint continuous; Def 5.5 joint pdf double integral (Eq 55). Fubini discussion (non-rigorous), Fig 29 blocks.
- p73–74: Ex 5.9 g(x,y)=(3/16)x²+(1/2)y integrates to 1 both orders. Rectangle probability derivation (Eqs 56–58).
- p75: marginal pdf fX(x)=∫ fX,Y(x,y)dy (Eq 59). Rectangular events only; non-rectangular (disc) in semester 2. Figs 30–31.
- p75–76: §5.3.2 independence for continuous: Thm 5.4 pdf factorises ⟺ independent. Ex 5.10 fX,Y=2e^(−x−2y). Ex 5.11 P(X∈(1,2],Y∈(1,2]) = (e^(−1)−e^(−2))(e^(−2)−e^(−4))≈0.0272.
- p77: Thm 5.5 factorisation into g(x)h(y) suffices (proof both cases).
- p78: Thm 5.6 bounded pdf ⇒ P(X=x)=0 (analysis proof non-examinable). Warning: not every continuous RV has a pdf.
- p78 (§6): expectation intro: E[X] average; dice E=7/2 but P(X=7/2)=0. Variance = spread.
- p78–79: §6.1 Def 6.1 discrete expectation Σ xP(X=x) with absolute convergence caveat. Ex 6.1 dice E=7/2. Ex 6.2 Geom E[X]=1/p (derivative-of-series trick).
- p79–80: §6.2 Def 6.2 continuous expectation ∫xf(x)dx. Ex 6.3 Exp E[X]=1/λ (integration by parts). Footnote: no difficult integrals in exam. Waiting-time interpretation, Fresh queue example.
- p80–81: §6.3 Thm 6.1 non-negative RV ⇒ E≥0. Thm 6.2 E[a]=a. **Law of the unconscious statistician** (LOTUS) Thm 6.3 all four cases; "law of the incompetent statistician" E[g(X)]≠g(E[X]) warning. Proof of discrete case via partition Ay.
- p81–82: Ex 6.4 E[X²], E[XY] formulas. Thm 6.4 linearity of expectation (discrete + continuous proofs). Remark: chains to n terms; NOT infinite sums.
- p83: Ex 6.5 E[3X−Y+5]=15 for X~Geom(1/4), Y~Exp(1/2). Ex 6.6 Bin expectation np — TWO ways (indicator sum vs direct pmf algebra; linearity much easier!).
- p83–84: Ex 6.7 Normal E[X]=μ (symmetry substitution). Cor 6.1 monotonicity. Cor 6.2 |E[X]|≤E|X|.
- p84: §6.3.2 Thm 6.5 independence ⇒ E[g(X)h(Y)]=E[g(X)]E[h(Y)]. Warning E[XY]≠E[X]E[Y] in general.
- p85: remarks "independence means multiplication".
- p85–86: §6.4 Def 6.3 variance E[(X−E[X])²], standard deviation. Cor 6.3 Var≥0. Thm 6.6 **Var=E[X²]−(E[X])²** (moment form). Moments terminology.
- p86: Ex 6.8 Geom variance (1−p)/p² (second-derivative trick). Ex 6.9 Unif(0,1) Var=1/12.
- p87: Thm 6.7 Var=0 ⟺ constant (general proof non-examinable). Thm 6.8 Var(aX+b)=a²Var(X). Ex 6.10 Var(2Y+5)=8 for Geom(1/2).
- p88: §6.4.1 Def 6.4 covariance E[(X−E[X])(Y−E[Y])], correlation ρ=Cov/√(VarVar). Remarks: symmetric; Cov(X,X)=Var; sign interpretation. Thm 6.9 Cov=E[XY]−E[X]E[Y]. Cor 6.4 independent ⇒ Cov=0.
- p89: Cor 6.5 bilinearity. Inner-product remark (non-exam).
- p89–90: §6.4.2 Thm 6.10 Var(aX+bY)=a²Var+b²Var+2abCov (two proofs). Ex 6.11 special cases ±. Cor 6.6 Bienaymé identity general sum. Cor 6.7 independent sum Var=Σ Var.
- p91: Ex 6.12 Bin variance np(1−p) via Bernoulli sum. Ex 6.13 Cov(X+Y,X−Y)=Var(X)−Var(Y). **Summary box of sum formulas.**
- p91–92: §6.5 LLN. Sample average X̄n; E[X̄n]=μ; Var(X̄n)=σ²/n. Ex 6.14 coin-toss averages, Fig 32. Thm 6.11 Weak LLN statement (no proof here). Interpretation. Ex 6.15 estimating p, 2000 tosses realisation Fig 33; Pearson 24000 tosses/12012 heads; Diaconis footnote.
- p93 (§7, ALL NON-EXAMINABLE): indicator functions. Def 7.1 1_A. Ex 7.1 coin. Lemma 7.1 E[1_A]=P(A).
- p94: §7.2 Thm 7.1 **Markov's inequality** P(X≥x)≤E[X]/x (indicator proof). Ex 7.2 Bin(1000,0.01) P(X≥35)≤2/7 (true ≈4e−10).
- p95: Cor 7.1 **Chebyshev** P(|X−E[X]|≥x)≤Var(X)/x². Ex 7.3 bound 0.015. Ex 7.4 proves Weak LLN via Chebyshev!
- p96: §7.3 Thm 7.2 E[X]=∫₀^∞ P(X≥x)dx (tail formula). Cor 7.2 discrete E[X]=Σ_{j≥1} P(X≥j). Ex 7.5 Exp mean again. Ex 7.6 Geom mean again.
- p97–98: §7.4 expected return time of SSRW: T=min{n≥1:Sn=0}; P(T<∞)=1 but E[T]=∞ via reflection principle + tail sum. "Always returns but you might wait a long time."

## Concept graph (app concepts, ~40)
Chapter 1 Foundations: sample-space, events, set-operations, set-laws (De Morgan etc.), disjoint, sigma-algebra, kolmogorov-axioms, probability-properties (complement, containment, partition rule), inclusion-exclusion, specifying-probabilities.
Chapter 2 Counting: classical-probability, multiplication-principle, permutations (ordered w/wo replacement), combinations, sampling-table, counting-examples (ALGEBRA, full house, lottery, urn), random-walk-intro.
Chapter 3 Conditional: conditional-probability, chain-rule, partition+total-probability, bayes, independence, independence-many, independence-warnings (disjoint≠independent; pairwise≠mutual).
Chapter 4 Discrete RVs: random-variable, pmf, cdf, bernoulli, binomial, geometric, poisson, poisson-approximation, joint-pmf+marginals, independence-rvs, convolution (sums).
Chapter 5 Continuous: continuous-rv, uniform, exponential (memoryless), normal, pdf, pdf-area, joint-pdf+marginals, independence-continuous.
Chapter 6 Expectation: expectation-discrete, expectation-continuous, LOTUS, linearity, product-independence, variance, variance-props, covariance-correlation, variance-of-sums, LLN.
Chapter 7 (non-exam): indicators, markov-inequality, chebyshev, expectation-tail-formula, random-walk-return.

## Common errors flagged BY THE LECTURER (gold for error taxonomy)
1. Union ≠ addition: P(E∪F)=P(E)+P(F) only if disjoint (p17).
2. Wrong sample space: using non-equally-likely outcomes with classical formula (p20, p21).
3. Disjoint vs independent confusion (p36 explicit warning).
4. Pairwise independence ≠ mutual independence; triple-product ≠ independence (p36–37).
5. Conditioning subtlety: "at least two tails" vs "first two tails" (p31).
6. P(E|G) vs P(G|E) transposition — prosecutor's fallacy (p39–41).
7. E[g(X)] ≠ g(E[X]) "law of the incompetent statistician" (p80).
8. E[XY] ≠ E[X]E[Y] unless independent (p84).
9. Variance NOT linear: Var(aX+b)=a²Var(X); Var(X−Y)=Var+Var−2Cov (p87–90).
10. Permutation vs combination (order), replacement vs not (p24–27 table).
11. Repeated letters ALGEBRA: divide by 2! (p28).
12. Geometric convention: from 1 (inclusive of success trial), not 0 (p49).
13. Infinite sums: can't exchange E with infinite sums freely (p82).
14. cdf jumps: P(X=x) = jump size; careful with ≤ vs < (p44–46).
