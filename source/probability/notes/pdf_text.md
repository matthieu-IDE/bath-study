

===== PAGE 1 =====
Notes
 Probability & statistics 1A (University of Bath)
messages.pdf_cover_qr_code_label
messages.studocu_not_sponsored_or_endorsed_by_college
 Notes
 Probability & statistics 1A (University of Bath)
messages.pdf_cover_qr_code_label
messages.studocu_not_sponsored_or_endorsed_by_college
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 2 =====
Y1 S1 Probability and Statistics
Matt Roberts, University of Bath
September 2024
Contents
Overview of Probability and Statistics 1A 1
Content & Learning outcomes . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1
Organisation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1
Resources . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 2
FAQ . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3
1 Foundations of Probability 4
1.1 Sets . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 4
1.2 The rules of probability . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 10
2 The Classical Interpretation of Probability 17
2.1 Equally likely outcomes and the classical interpretation of probability . . . . . . . . . . . 17
2.2 Multiplication principle . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 19
2.3 Ordered choice: permutations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 20
2.4 Unordered choice: combinations . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 22
2.5 Examples . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 25
3 Conditional probability and independence 28
3.1 Conditional probability . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 28
3.2 The law of total probability . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 30
3.3 Bayes’ theorem . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 31
3.4 Independence . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 32
3.5 Independence of many events . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 33
3.6 Examples . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 36
4 Discrete random variables 38
4.1 Real-valued random variables . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 38
4.2 Cumulative distribution functions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 41
4.3 Common discrete random variables . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 43
4.4 Joint distributions and independence of discrete random variables . . . . . . . . . . . . . . 52
5 Continuous random variables 60
5.1 Common continuous random variables . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 61
5.2 Probability density functions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 64
5.3 Joint distributions and independence of continuous random variables . . . . . . . . . . . . 69
6 Expectation and variance 75
6.1 Expectation of a discrete random variable . . . . . . . . . . . . . . . . . . . . . . . . . . . 75
6.2 Expectation of a continuous random variable . . . . . . . . . . . . . . . . . . . . . . . . . 76
6.3 Properties of expectation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 77
6.4 Variance . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 82
6.5 The Law of Large Numbers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 88
7 Indicator functions and applications 90
7.1 Indicator functions . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 91
1
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 3 =====
7.2 The Markov and Chebyshev inequalities . . . . . . . . . . . . . . . . . . . . . . . . . . . . 91
7.3 Another formula for calculating the expectation . . . . . . . . . . . . . . . . . . . . . . . . 93
7.4 The expected return time to 0 for simple symmetric random walk . . . . . . . . . . . . . . 94
2
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 4 =====
Overview of Probability and Statistics 1A
Content & Learning outcomes
Content
This unit introduces the basic tools and principles of probability theory. We will talk about:
• Foundations of probability theory
Sets (sample spaces, events, intersections, unions, differences and complements) and the rules of
probability (Kolmogorov’s axioms).
• Equally likely outcomes
Sampling methods (with or without ordering and replacement).
• Conditional probability and independence
Partition theorem, Bayes’ theorem.
• Random variables
Discrete and continuous, probability mass functions (PMFs), probability density functions (PDFs),
cumulative distribution functions (CDFs), joint and marginal discrete distributions, independence of
random variables.
• Common distributions
Discrete (Bernoulli trials, Binomial, Geometric and Poisson distribution) and continuous (Uniform,
Exponential and Normal distribution).
• Expectation and variance
Definition and properties for discrete and continuous random variables, standard deviation, covariance
and correlation. Sums of independent random variables and the law of large numbers.
• Key application(Random walks).
Learning outcomes
After taking this unit, you should be able to:
• Apply the basic laws of probability.
• Solve a variety of problems with probability, including the use of combinations, permutations and
standard probability distributions.
• Perform common expectation calculations.
• Calculate marginal and conditional distributions of discrete random variables from joint distributions.
• Calculate and explore the behaviour of sums of independent random variables.
Organisation
Lectures
There are three weekly lectures:
• In-person session on Mondays at 17:15 in 2 West, University Hall.
• In-person session on Tuesdays at 13:15 in 2 West, University Hall.
• Online Zoom session on Wednesdays at 11:15.
– Zoom meeting ID: 940 6197 2755
– Passcode: 110246
Single Sign On (SSN) is necessary to access the online lectures. If you try to access using your
personal email and not the University one, you will end up in the waiting room for the entirety of
the session.
Tutorials
There is one tutorial per week. Tutorials are small groups guided by a tutor who will help you to work
through the problem sheets – more details below. You are encouraged to use the tutorials as interactive
sessions - ask questions and discuss problems, don’t just expect to sit and listen.
1
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 5 =====
Office hours
If you have a question that your tutor can’t answer, I will be available on Tuesdays from 11:00 to 12:30 in
my office, 4 West 1.13.
Recordings
Recordings of the lecture sessions will be made available on Panopto and the Moodle unit page after the
session.
Lecture notes
A set of comprehensive lecture notes will be available through the unit’s Moodle page during the course of
the semester. The notes are available in different formats with identical content but different layouts.
Problem sheets
Each Wednesday, there will be a homework problem sheet released on the Moodle page of the unit. These
do not form part of your final mark. There will be three types of questions, all clearly indicated in the
problem sheet:
• Some of the problems are designed to start discussions in your small-group tutorials. They may also
introduce topics that are needed for the marked problems below.
• Some of the problems are marked by your tutor to give you feedback on your learning and help you
to understand whether you are doing the right things. This is purely for your own benefit and will
not contribute to your final mark for the unit.
• Some of the problems are extra questions that provide additional insight into the course material.
Your solutionsto the marked questionsshould be handed in at a time and date decided by your tutor.
Your solutions will have to be put into the correct folder, identified by your tutorial group label, in the
“Probability and Statistics 1A” pigeon hole at the bottom floor of 4W.
The problems will be discussed in the tutorials, and your tutors will mark the handed-in scripts and
return them with comments at the tutorials that take place the following week.
Full solutions totutorial and markedquestions will be published on Moodleafter the last hand-in deadline.
Assessment
Your assessment will be an exam in January, with marks from 0 to 60 and passing grade being 24/60. Past
exams can be found on the Library website, under “Past exam papers”, code MA10211. Alternatively,
click here.
The mark given to you will then be combined with all the other units that constitute MA12002, MA12005,
or MA12012.
Probability and Statistics 1A will be 40% of the final mark for MA12002, MA12005 and MA12012.
Resources
Extra textbooks:
This unit is self-contained in the sense that you will not strictly need to consult textbooks. However, you
may wish to consult extra books to support your learning and understanding. A list of suggested works
available at the Library can be found on the Moodle page of the unit.
What if I have found an error in the lecture notes?
Send me an email at mir20@bath.ac.uk and I will correct it as soon as possible.
2
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 6 =====
F AQ
What is the difference between probability and statistics?
The problems considered by probability and statistics can be thought of being complementary to each
other: in probability theory, we consider a process which has some randomness and we build a model of
what will happen and then study it, while in statistics, we observe something that has happened and try
to infer what process could explain the observations.
• Probability: Assuming that a coin is fair, what is the probability that it takes me more than 10
tosses to see a head?
• Statistics: It takes me more than 10 tosses to see a head. Is the coin fair?
This is a simplification; the two subjects intersect and take inspiration from each other. But they are
different subjects. In the first semester we will mainly study probability, whereas in the second semester
you will build on the probability you have learnt and also learn some statistics. From the second year
onwards, there will be separate probability units and statistics units.
3
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 7 =====
1 Foundations of Probability
1.1 Sets
Example 1.1(Coin tosses). I toss a coin 100 times. How many heads do I see?
In probability theory, we sometimes use the term“experiment” to describe a process whose outcome is
not known in advance. We assignprobabilities to possible outcomes, or combinations of such outcomes.
Like,
• what is the probability I see exactly 38 heads?
• what is the probability I see more than 75 heads?
So before we can talk about probabilities, we need to talk about what are the possible outcomes of our
experiment. We call this collection, orset, of possible outcomes thesample space.
1.1.1 Sample spaces and events
Definition 1.1(Sample space). The set Ω of all possible outcomes of an experiment is called the sample
space.
Example 1.2. Examples of sample spaces:
• Suppose that we toss a coin100 times and count the number of heads obtained. The sample space
is Ω   r 0, 1,..., 100x . (A finite sample space.)
• Suppose that we count the tosses of a coin until the first head is obtained. The sample space
Ω   r 1, 2, 3,... x contains an infinite number of elements. (Acountable or countably infinitesample
space.)
• Suppose I want to know how long it is between the start of this lecture and the first time someone
in the room sneezes. We could useΩ    0,   . (An uncountable sample space.)
We often writeω to represent a generic point inΩ, just like you might usex to represent a generic real
number, orn to represent a generic natural number.
In the first example, if we just want to know the probability of seeing exactly 38 heads, we are interested
in the probability of one point in the sample space. But if we want to know e.g. the probability of seeing
more than 75 heads, we are interested in the probability that the outcome of our experiment is any one of
a whole bunch of points - asubset of the sample space.
Definition 1.2(Event). An event is a collection of possible outcomes of an experiment.
If the actual outcome of an experiment belongs to the eventE, we say that the eventE has occurred.
Example 1.3. Consider the experiment of rolling a (6-sided) dice. The possible outcomes, or sample
points, are the scores1, 2, 3, 4, 5 and 6 making the sample spaceΩ   r 1, 2, 3, 4, 5, 6x . Examples of events
include:
(a) E1   r score is an even numberx   r 2, 4, 6x .
(b) E2   r score is bigger than 4x   r 5, 6x .
(c) E3   r score is 1x   r 1x .
If the outcome of a roll is6, then the eventE1 occurs (as 6 " E1), the eventE2 occurs (as 6 " E2), but
the eventE3 does not occur (as6  E3).
1.1.2 Set relations
Definition 1.3(Subset and equal sets). - A set (or event1)E is a subset ofF, writtenE L F, if whenever
E occurs F also occurs.
Another way of saying this is that for everyω " E, we also haveω " F.
1In probability theory, it is customary to consider the probability of anevent rather than aset. We will often use the
terms set and event interchangeably. Really events are just subsets of a sample spaceΩ.
4
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 8 =====
• We say that sets (or events)E and F are equal, writtenE   F, if bothE L F and F L E.
Note that when we writeE L F, we include the possibility thatE is the whole ofF (i.e. E   F)2.
We can use Venn3 diagrams to provide a pictorial representation for events. For example, Figure 1
represents the caseE L F.
Ω
F
E ×ω
Figure 1: EventE is a subset of eventF if, wheneverE occurs F also occurs. Note that any event is a
subset of Ω and so we have thatE L Ω and F L Ω.
We writeo for theempty set, the set (or event) containing no points (or outcomes).
Event o contains no points and hence it is logically correct to say that each point belonging too also
belongs toE, for any setE. Consequently o L E L Ω is true for any eventE.
1.1.3 Operations of set theory
Definition 1.4(Elementary set operations). For any two sets (or events)E and F we have the following
elementary operations:
1. The union of E and F, written asE < F, is the event containing all outcomes that belong to either
E or F or both so thatE < F   r ω  ω " E or ω " F x . See Figure 2 below.
2. The intersection of E and F, written asE = F, is the event containing all outcomes that belong
to bothE and F so thatE = F   r ω  ω " E and ω " F x . See Figure 3 below.
3. The difference ofE andF, written asE ¯ F, is the event containing all outcomes that belong toE
but not toF so thatE ¯ F   r ω  ω " E and ω  F x . See Figure 4 below.
4. The complement of E, written asEc, is the event containing all outcomes that do not belong to
E so thatEc   r ω  ω  Ex . See Figure 5 below.
Remarks:
• Figure 2 shows the union ofE and F. Note that, for any eventE, Ω < E   Ω and o < E   E.
• Figure 3 shows the intersection ofE and F. For any eventE, Ω = E   E and o = E   o .
• Figure 4 shows the difference ofE and F. Note thatE ¯ F   E = Fc and E     E = F  <   E = Fc .
More on this later!
• Figure 5 shows the complement ofE. Note that, for any eventE, we haveEc   Ω ¯ E, i.e. all
elements of Ω that are not inE. The following properties are easy to prove:
2In some areas of mathematics it is more customary to writeE N F to allow E   F, and E L F only if E j F. In
probability theory it is fairly common, but not universal, to writeE L F even if we allowE   F. This is the convention we
adopt.
3John Venn (1834 – 1923)
5
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 9 =====
Ω
E F
E ∪ F
Figure 2: Union ofE and F, E < F. The unionE < F occurs whenever at least one (and possibly both)
of E and F occur.
Ω
E F
E ∩ F
Figure 3: Intersection ofE and F, E = F. The intersectionE = F occurs whenever bothE and F occur
simultaneously.
Ω
E F
E \ F
Figure 4: Difference ofE and F, E ¯ F. The differenceE ¯ F occurs wheneverE occurs butF does not
occur.
6
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 10 =====
E
Ω
Ec
Figure 5: Complement ofE, Ec. The complementEc occurs precisely whenE does not occur.
1.   Ec c   E (the complement of the complement of an event is the event).
2. o c   Ω and Ωc   o (the complement of the empty set is the sample space and vice versa).
3. E < Ec   Ω (the sample space is the union of the eventsE and Ec).
4. E = Ec   o (E and Ec have no outcomes in common).
Example 1.4(Example 1.3 revisited). For the eventsE1, E2, andE3 of Example 1.3 we have:
1. E1 < E2   r 2, 4, 5, 6x   r score is an even number or bigger than4x .
2. E1 = E2   r 6x   r score is an even number and bigger than4x .
3. Ec
1   r 1, 3, 5x   r score is not an even numberx   r score is an odd numberx . From this
we see that E1 < Ec
1   Ω   r score is an even or an odd numberx and E1 = Ec
1   o  
r score is an even and an odd numberx .
Definition 1.5(Disjoint events). EventsE and F are disjoint or mutually exclusive if they cannot both
occur at the same time, that isE = F   o .
Ω
E F
Figure 6: EventsE and F are *disjoint* or *mutually exclusive* if they cannot both occur at the same
time.
7
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 11 =====
Figure 6 gives an example of disjoint eventsE and F. Note that an equivalent statement toE = F   o
for disjoint events is thatE L Fc. One way of seeing this is to note that for any eventsE and F we can
write E     E = F  <   E = Fc ; but ifE = F   o then E   E = Fc.
Example 1.5 (Example 1.3 revisited). Events E2 and E3 are disjoint as E2 = E3   r x   o  
r score is bigger than4 and score is1x .
Disjoint events play an important role in calculating probabilities as we shall see in Section 1.2.2.
Sometimes it may be helpful to think of union (< ) and intersection (= ) as the “set analogues” of addition
( ) and multiplication ( ) respectively. Be careful! This is not always the right intuition - but it can be
useful for remembering the following relationships:
Theorem 1.1(Laws of set theory). For any setsE, F and G the following relationships hold:
1. Commutative Laws: (a) E < F   F < E
(b) E = F   F = E
2. Associative Laws: (a) E <   F < G     E < F  < G
(b) E =   F = G     E = F  = G
3. Distributive Laws: (a)   E = F  < G     E < G =   F < G
(b)   E < F  = G     E = G <   F = G
4. De Morgan’s Laws: (a)   E < F  c   Ec = Fc
(b)   E = F  c   Ec < Fc
Remark: Rather than trying to remember these by rote, think about what they mean (say them out
loud: for the second of De Morgan’s laws, “if you’re not inE and F, you must be either not inE or not
in F”), or imagine Venn diagrams.
Indeed, the best way to prove these statements is by drawing Venn diagrams. For example, to prove the
first of De Morgan’s4 laws, note that the area covered in both wavy blue lines and diagonal red stripes in
Figure 7 - which representsEc = Fc - is equal to the area hashed in green in Figure 8 - which represents
  E < F  c. ThusEc = Fc     E < F  c.
Figure 7: A Venn diagram showingEc in wavy blue lines andFc in diagonal red stripes. ThusEc = Fc is
the region covered in both wavy blue lines and diagonal red stripes.
4Augustus De Morgan (1806 – 1871).
8
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 12 =====
Figure 8: A Venn diagram showing  E < F  c hashed in green.
1.1.4 Extensions to collections of sets
By the Associative Laws in Theorem 1.1,E <   F < G     E < F  < G and E =   F = G     E = F  = G
and therefore the brackets do not really matter. Thus, we can writeE < F < G for the event that at least
one of these events occurs andE = F = G for all three events occurring. We can extend this notion to
both finite and countably infinite collections of events (or sets).
1.1.4.1 Unions and intersections of collections of sets
1. If E1,...,E n is any finite collection of sets then we define
n

i  1
Ei    E1 < E2 <  < En   r ω  ω " Ei for somei " r 1, 2,...,n xx ,
n

i  1
Ei    E1 = E2 =  = En   r ω  ω " Ei for alli " r 1, 2,...,n xx .
2. If E1,E 2,... , is any countably infinite collection of sets then we define


i  1
Ei   E1 < E2 <    r ω  ω " Ei for somei " Nx ,


i  1
Ei   E1 = E2 =    r ω  ω " Ei for alli " Nx .
In a similar way the Distributive Laws and De Morgan’s Laws from Theorem 1.1 can be extended to many
events. We only write out the latter here.
1.1.4.2 De Morgan’s Laws for collections of sets
1. If E1,...,E n is any finite collection of sets then

n

i  1
Ei
c
 
n

i  1
Ec
i, 
n

i  1
Ei
c
 
n

i  1
Ec
i. (1)
2. If E1,E 2,... , is any countably infinite collection of events defined onΩ then



i  1
Ei
c
 


i  1
Ec
i, 


i  1
Ei
c
 


i  1
Ec
i. (2)
We will not prove these here.
9
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 13 =====
Example 1.6. As in Example 1.2, suppose that we toss a coin repeatedly and count the number of tosses
until the first head is obtained. Recall that our sample space isΩ   r 1, 2, 3,... x , wherei represents the
outcome that the first head occurs on theith toss. Consider
Eeven   r first head occurs on an even tossx   r 2x < r 4x < r 6x <   


i  1
r 2ix .
Let Eodd   r first head occurs on an odd tossx then Eodd   Ec
even and so by using De Morgan’s Laws,
Equation (2),
Eodd   Ec
even   


i  1
r 2ix 
c
 


i  1
r 2ix c,
i.e., the first head does not occur on the 2nd toss, and it does not occur on the 4th toss, and so on.
1.1.4.3 Pairwise disjoint events (extension of Definition 1.5 to pairwise disjoint events)
1. The eventsE1,E 2,...,E n are said to be pairwise disjoint or mutually exclusive if no two can
simultaneously occur, that is,Ei = Ej   o for alli,j   1,...,n, i j j.
2. Similarly, if we have countably many eventsE1,E 2,... , they are pairwise disjoint ifEi = Ej   o for
all i,j " N, i j j.
Thus, for exampleE1,E 2,E 3 are pairwise disjoint if and only ifE1 = E2   o ,E1 = E3   o andE2 = E3   o .
In Example 1.3, recall the eventsE1   r 2, 4, 6x , E2   r 5, 6x , E3   r 1x . The events are not pairwise
disjoint, sinceE1 = E2 j o . (Even thoughE1 = E2 = E3   o .)
Sometimes we might say “disjoint” when we mean “pairwise disjoint”, but it is good to be precise.
1.2 The rules of probability
If we just have a finite number of points in our sample space, then usually we can assign a probability to
every possible event. For example, if we are tossing a coin 100 times and counting how many heads we
see, we can ask for the probability that the number of heads is 5 or even or greater than 72.
There are only finitely many possible outcomes and therefore only finitely manycollections of outcomes-
or possible events, i.e. subsets of the sample space (there are2100 in fact).
Definition 1.6(Power set). For any setS, the power set ofS, denoted byP  S , is the set of all subsets
of S, including o and S itself.
This semester, we will usually be able to assign a probabilityP  E to everyE " P  Ω , i.e. to every
possible event.
But this is not true for all sample spaces; in fact it is not true forΩ    0, 1 or Ω   R. (Non-examinable!)
Suppose e.g. Ω    0, 1 . There are some subsetsA of  0, 1 where, if we hadP  A   0, then we must have
P  Ω   0, and if we hadP  A % 0, then we must haveP  Ω    . Any probability measure should have
P  Ω   1, so neither option is allowed. So we just can’t allow ourselves to assign a probabilityP  A to
this kind of set.
So eventually, we have to be careful about what sets we can assign probabilities to. The following definition
gives us three rules that any reasonable collection of sets has to satisfy. Thankfully, these are quite simple.
(Unfortunately, the name we give to collections of sets satisfying the rules sounds complicated and even
confusing - but it is just a name, and since everyone uses it, we might as well get used to it.)
1.2.1 Sigma-algebras
Definition 1.7(Sigma-algebra). A collection F of subsets ofΩ is called aσ-algebra (or sometimes a
σ-field) if it satisfies
1. o " F (the empty set is an element of the sigma-algebra).
2. if E " F, thenEc " F (we say “theσ-algebra is closed under taking complements”).
3. if E1,E 2,... " F then  
i  1Ei " F (we say “theσ-algebra is closed under countable unions”).
10
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 14 =====
Remark: The sample spaceΩ is always an element of anyσ-algebra F, because o " F and Ω   o c, so
by rule 2,Ω " F.
Lemma 1.1(Sigma-algebras are closed under countable intersections). Anyσ-algebra is closed under
countable intersections. That is, ifE1,E 2,... " F then  
i  1Ei " F.
Proof. Idea: Use De Morgan’s law to turn intersection into union, and then use closure under countable
unions.
If E1,E 2,... " F then by rule 2,Ec
1,Ec
2,... " F and so by rule 3,  
i  1Ec
i " F. Thus by rule 2,
  
i  1Ec
i 
c
" F as well. By De Morgan’s Laws, Equation (2),



i  1
Ec
i 
c
 


i  1
 Ec
i 
c
 


i  1
Ei
and therefore  
i  1Ei " F too.
The definition says thatσ-algebras are closed undercountable unions, and we have just seen that they are
also closed undercountable intersections. But what aboutfinite unions and intersections? Fortunately
they are closed under these too.
Lemma 1.2(Sigma-algebras are closed under finite unions and intersections). Anyσ-algebra is closed
under finite unions and intersections. That is, ifn " N and E1,E 2,...,E n " F then  n
i  1Ei " F and
 n
i  1Ei " F.
Proof. Idea 1 (finite unions):Turn a finite union into an infinite union by using a load ofo ’s.
Recall that for any eventE we haveE < o   E, and thus, if we letEn 1   o ,En 2   o ,... then we have


i  1
Ei   E1 <  < En < En 1 <    E1 <  < En < o < o <   
n

i  1
Ei,
so that ifE1,...,E n " F, then  n
i  1Ei " F by rule 3 of the definition ofσ-algebras.
Idea 2 (finite intersections):Turn a finite intersection into an infinite intersection by using a load of
Ω’s.
Recall that for any eventE we haveE = Ω   E, and thus, if we letEn 1   Ω, En 2   Ω, ... then we have


i  1
Ei   E1 =  = En = En 1 =    E1 =  = En = Ω = Ω =   
n

i  1
Ei,
so that ifE1,...,E n " F, then  n
i  1Ei " F by Lemma 1.1.
Many differentσ-algebras can be associated with a given sample spaceΩ.
Example 1.7. Some examples ofσ-algebras:
1. The collection of the two setsr o , Ωx is always aσ-algebra (often called the trivialσ-algebra).
2. If E L Ω then r o ,E,E c, Ωx is aσ-algebra. (Exercise: check this!)
3. The power set ofΩ, P  Ω , is always aσ-algebra.
Non-examinable: As hinted above, ifΩ is finite, then we can always take theσ-algebra F to be P  Ω ,
the power set. But as we mentioned, for uncountableΩ, the situation is more complicated due to reasons
that are beyond the scope of this course. Broadly speaking, for an uncountableΩ (e.g.,  0, 1 or R),
P  Ω is simplytoo largeand will contain weird subsets that cannot be reasonably assigned probabilities.
These sets are said to be non-measurable5 and they are a topic for courses in measure theory. For an
uncountable Ω, such asΩ   R, a suitableσ-algebra is the smallest collection of events containing all sets
of the form a,b  for anya,b " R such thata $ b.
5In 1905 Giuseppe Vitali (1875–1932) provided the first example of a non-measurable subset of real numbers nowadays
known as Vitali sets.
11
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 15 =====
1.2.2 Kolmogorov’s axioms of probability
We now want to assign probabilities to each event in theσ-algebra. There are rules that need to be
satisfied to make these consistent. These rules, or axioms, were formulated by Andrey Kolmogorov6 in
the 1930s.
Definition 1.8 (Probability measure and probability space). Let Ω be a sample space and F a σ-
algebra defined onΩ. A probability measureP on   Ω, F  must satisfy the following, sometimes known as
Kolmogorov’s axioms:
(A1) P  E ' 0 for allE " F.
(A2) P  Ω   1.
(A3) IfE1,E 2,       " F are pairwise disjoint, then
P 


i  1
Ei  

=
i  1
P  Ei   P  E1  P  E2  ....
The triple   Ω, F, P is then called aprobability space.
Remark: We call property (A3)countable additivity: if theEi are pairwise disjoint then the probability
that (at least) one of them occurs is the sum of their individual probabilities.
1.2.3 Properties of probability measures
We can use Kolmogorov’s axioms (A1)-(A3) to build up properties of a probability measure that will be
useful when calculating complicated probabilities.
Lemma 1.3 (The probability of the empty set is zero). For any probability space  Ω, F, P , we have
P  o    0.
Proof. Idea: Write Ω as a union ofΩ and a load ofo ’s, and use countable additivity.
Let E1   Ω and E2   E3      o . Thus


i  1
Ei   Ω < o < o < ...   Ω (3)
and, since Ω = o   o and o = o   o , we haveEi = Ej   o for alli j j so thatE1,E 2,... are pairwise
disjoint. By (3),
P  Ω   P 


i  1
Ei
 

=
i  1
P  Ei   P  E1  P  E2  ... [by (A3), sinceEi are pairwise disjoint]
  P  E1 

=
i  2
P  Ei
  P  Ω 

=
i  2
P  o  . (4)
Subtracting P  Ω from both sides of Equation (4) gives

=
i  2
P  o    0.
From (A1), we haveP  o  ' 0, and ifP  o  % 0, then

<
i  1
P  o     j 0. Thus we must haveP  o    0.
6Andrey Kolmogorov (1903-1987). His 1933 bookFoundations of the Theory of Probability laid the framework for the
axiomatic foundations of probability theory.
12
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 16 =====
Theorem 1.2(Finite additivity ofP for pairwise disjoint events). For any probability space  Ω, F, P , if
E,F " F with E = F   o then
P  E < F    P  E  P  F  . (5)
Similarly, ifE1,E 2,...,E n " F are pairwise disjoint then
P 
n

i  1
Ei  
n
=
i  1
P  Ei   P  E1    P  En . (6)
Proof. We prove (6), since (5) is just the casen   2.
Idea: Same trick as in Lemma 1.2. Turn a finite union into an infinite union by using a load ofo ’s.
Suppose thatE1,...,E n are pairwise disjoint and letEn 1   En 2      o . Then, asE = o   o for
any eventE, we know thatE1,E 2,... are pairwise disjoint and


i  1
Ei   E1 <  < En < o < o <    E1 <  < En  
n

i  1
Ei.
Thus, by (A3) as theEis are pairwise disjoint,
P 
n

i  1
Ei   P 


i  1
Ei  

=
i  1
P  Ei
 
n
=
i  1
P  Ei  P  En 1  P  En 2  
 
n
=
i  1
P  Ei  P  o   P  o    (7)
From Theorem 1.3, we haveP  o    0 and substituting this into (7) gives (6).
Just to check we haven’t done anything totally unreasonable, we consider the following example.
Example 1.8. Consider an experiment where we toss a coin once. The sample space isΩ   r H,T x where
H   r toss is a headx and T   r toss is a tailx .
We choose theσ-algebra to beF   P  Ω   r o , r Hx , r T x , r H,T xx . From (A2) of Definition 1.8, we have
P r H,T x   1, and by Theorem 1.3 we haveP  o    0. As r Hx = r T x   o , we have by Theorem 1.2
P r Hx < r T x   P r Hx  P r T x . (8)
As r Hx < r T x   Ω, then it follows from Equation (8) that
P r Hx  P r T x   1. (9)
From (A1) of Definition 1.8, we haveP r Hx ' 0 and P r T x ' 0, so for anyp "  0, 1 the specification
P r Hx   p and P r T x   1  p is a valid probability measure on  Ω, F  . If weadditionally want the
coin to befair, i.e., P r Hx   P r T x , then we must takep   1
2.
Corollary 1.1(Probability of complements). For any probability space  Ω, F, P and any eventE " F,
we have P  Ec   1  P  E .
Proof. Idea: Use the fact thatΩ   E < Ec and apply Theorem 1.2.
As E " F, we have, by Definition 1.7,Ec " F, andE < Ec   Ω. By (A2)
P  E < Ec   P  Ω   1. (10)
Moreover,E = Ec   o , i.e.,E, Ec are disjoint. Thus, by (5) of Theorem 1.2 and (10)
1   P  E < Ec   P  E  P  Ec (11)
Rearranging Equation (11) yields the claim.
13
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 17 =====
Corollary 1.2(Probabilities are between zero and one). For any probability space  Ω, F, P and any
event E " F, we have0 & P  E & 1. Thus P  F    0, 1 .
Proof. By (A1) and Corollary 1.1,P  Ec   1  P  E ' 0, implying P  E & 1.
Corollary 1.3(Partition rule). For any probability space  Ω, F, P and any eventsE,F " F, we have
P  F    P  F = E  P  F = Ec . (12)
Proof. Problem Sheet Exercise.
Corollary 1.4(Containment rule). For any probability space  Ω, F, P and eventsE,F " F with E L F,
we have
P  F    P  E  P  F = Ec . (13)
so that
P  F  ' P  E . (14)
Proof. Since E L F we haveF = E   E: see Figure 9. Substituting this into(12) of Corollary 1.3 gives
(13). By (A1), P  F = Ec ' 0 and hence (14) follows from (13).
Ω
F
E
F ∩ Ec
Figure 9: IfE L F, thenF = E   E.
Some of the results above will have been presented to you as facts at school (e.g. the fact that probabilities
are between 0 and 1), and some may seem “intuitively obvious”. This can be a good thing, as your
schooling and intuition can help you to remember useful properties of probability measures. Butbe
careful! Sometimes your intuition can get carried away. Union isnot the same as addition. For example,
it isnot always true that for two eventsE and F, we haveP  E < F    P  E  P  F  . Theorem 1.2 says
this is true fordisjoint events, but if our events are not disjoint, we need to use the following simple but
important result.
Corollary 1.5 (Inclusion-exclusion for two sets). For any probability space  Ω, F, P and any events
E,F " F, we have
P  E < F    P  E  P  F   P  E = F  . (15)
Proof. Problem Sheet Exercise.
Perhaps a useful rule is to “check your intuition with a Venn diagram”.
Example 1.9. In a game of Cluedo, a murder has been committed by a single person with a single
weapon. We have narrowed the choice of murderer and the choice of weapon down to three possible
choices each:
• Murderer: Colonel Mustard (M), Professor Plum (P), Miss Scarlett (S)
• Weapon: Candlestick (C), Lead Pipe (L), Rope (R)
14
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 18 =====
Our sample space is thus
Ω   r  M,C  ,   M,L  ,   M,R x ,   P,C  ,   P,L  ,   P,R  ,   S,C  ,   S,L  ,   S,R x .
Each possible outcome has been assigned the following probabilities7:
C L R
M 4
27
4
27
4
27
P 4
27
4
27
4
27
S 1
27
1
27
1
27
Thus, for example,P r  M,C x   4
27 and P r  S,C x   1
27.
1. Find the probability of Colonel Mustard having committed the murder.Event
MMustard   r Mustard committed the murderx   r  M,C x < r  M,L x < r  M,R x
is a union of three pairwise disjoint events. Thus, from Theorem 1.2,
P  MMustard   P r  M,C x  P r  M,L x  P r  M,R x (16)
  4
27  4
27  4
27   12
27.
2. Find the probability of Professor Plum or Colonel Mustard having committed the
murder. Let MPlum denote the event that Professor Plum committed the murder. In a similar way
to the previous part, using Theorem 1.2,
P  MPlum   P r  P,C x  P r  P,L x  P r  P,R x
  4
27  4
27  4
27   12
27.
Now, the murder has been committed by a single person and soMMustard and MPlum are disjoint
events. Once again by Theorem 1.2
P  MMustard < MPlum   P  MMustard  P  MPlum
  12
27  12
27   24
27.
3. Find the probability that Colonel Mustard is innocent.Note thatMc
Mustard corresponds to
Colonel Mustard being innocent. By Corollary 1.1
P  Mustard is innocent   P  Mc
Mustard   1  P  MMustard   1  12
27   15
27.
4. Find the probability that Colonel Mustard is the murderer, or that rope was used.Let
WRope denote the event that the murder weapon was a rope. First we calculate
P  WRope   P r  M,R x  P r  P,R x  P r  S,R x (17)
  4
27  4
27  1
27   9
27.
As Mustard could have committed the murder using rope, these arenot disjoint events and so
Theorem 1.2 does not apply. We must instead use the inclusion-exclusion rule, Corollary 1.5, to find
P  MMustard < WRope   P  MMustard  P  WRope  P  MMustard = WRope (18)
  12
27  9
27  4
27   17
27.
7Note that these non-negative numbers sum to one. In Section 1.2.4 we will demonstrate that this means that we have a
probability measure on  Ω, P  Ω .
15
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 19 =====
Note that we could have calculated this probability in another way, by writing the event we want as the
union of the five disjoint events:
MMustard < WRope   r  M,C x < r  M,L x < r  M,R x < r  P,R x < r  S,R x .
If you think about this carefully, you can notice that if we had addedP  MMustard to P  WRope together
then, from Equations(16) and (17), we would have double-countedP r  M,R x   P  MMustard = WRope .
This is exactly the term that we subtract in Equation(18), so you can see why the inclusion-exclusion
formula works.
1.2.4 Specifying probabilities
We now continue our mission to show that our definition of a probability measure is sensible. We check
that, if we haven elements in our state space andn non-negative real numbers that sum to1, we can use
these to define a probability measure. The same holds if we have a countably infinite state space and
non-negative real numbersp1,p 2,p 3... that sum to1.
Theorem 1.3(Specifying probabilities for a countable sample space). Suppose thatΩ   r ω1,...,ω nx is a
finite set andF is anyσ-algebra onΩ. Suppose thatp1,...,p n are non-negative numbers with< n
i  1pi   1.
For any eventE " F define P  E by
P  E   =
i  ωi" E
pi (19)
where the sum over an empty set is defined to be zero. ThenP is a probability measure on  Ω, F  .
This remains true ifΩ   r ω1,ω 2,... x with corresponding non-negative numbersp1,p 2,... with < 
i  1pi   1.
In words, if we specifyP r ωix   pi, then the probability of any eventE can be found by adding the
probabilities pi of all outcomes contained inE.
Proof. Idea: We just need to check that Kolmogorov’s axioms hold. The key observation is that if events
E1,...,E k are pairwise disjoint, then each element of the state space can be in at most one of them.
Suppose thatΩ   r ω1,...,ω nx is finite. (The countably infinite case is similar.) As eachpi is non-negative
then, by Equation (19),P  E ' 0 and so (A1) holds. Now,
P  Ω   =
i  ωi" Ω
pi  
n
=
i  1
pi   1,
so (A2) holds. For (A3), sinceΩ is finite we only need to consider finite unions. LetE1,...,E k be pairwise
disjoint events. Then for anyi j j, Ei = Ej   o so that ifω " Ei then ω  Ej; this means that eachω is
in at most one of theEi. We thus have that
P 
k

i  1
Ei   =
j  ωj " < k
i  1Ei
pj
 
k
=
i  1



=
j  ωj " Ei
pj



 as eachωj is only in one of theEi
 
k
=
i  1
P  Ei
where the first and last equalities hold by Equation (19). Thus (A3) holds.
Example 1.10. Again consider rolling one dice, so thatΩ   r 1, 2, 3, 4, 5, 6x . Then we can set
pi   P r score on the dice isix   P r ix   1
6
16
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 20 =====
for eachi   1, 2, 3, 4, 5, 6. For any eventE in P  Ω , set P  E as in Equation(19). Then P is a probability
measure on   Ω, P  Ω . For example,
P r score is evenx   P r 2, 4, 6x   P r 2x  P r 4x  P r 6x   3
6   1
2;
P r score is less than3x   P r 1, 2x   P r 1x  P r 2x   2
6   1
3.
Notice that Theorem 1.3 only requires thepi to be non-negative and to sum to one. It does not determine
the actual values of thepi. For example in the dice-rolling example of Example 1.10, the specification
p1   1
12, p2   1
12, p3   1
12, p4   1
4, p5   1
4 and p6   1
4 would be a valid probability measure. In the next
section we study one way of defining thepi, known as the classical definition of probability, via the notion
of equally likely outcomes.
2 The Classical Interpretation of Probability
2.1 Equally likely outcomes and the classical interpretation of probability
The classical interpretation of probability is based on the situation where the possible outcomes of an
experiment are all considered to beequally likely.
Example 2.1. - A coin is tossed, with heads and tails equally likely.
• A (fair) dice is rolled.
• A card is drawn at random from a well-shuffled deck, so that each card is equally likely to be drawn.
Definition 2.1(Classical interpretation of probability). For a finite sample spaceΩ   r ω1,...,ω nx , so
that ¶ Ω¶   n, the classical interpretation of probability assumes that the outcomesω1,...,ω n are equally
likely and defines the probability of eachωi to be
P r ωix   1
¶ Ω¶   1
n.
For any eventE L Ω, the probability ofE is then
P  E   ¶ E¶
¶ Ω¶   number of waysE can occur
total number of outcomes. (20)
We can use Theorem 1.3 to check that this defines a valid probability measure.
Indeed, we havepi   1
¶ Ω¶   1
n ' 0 for alli. Moreover,
P  E   ¶ E¶
¶ Ω¶   =
iωi" E
1
¶ Ω¶   =
iωi" E
pi,
which Theorem 1.3 tells us is a valid probability measure.
Example 2.2. Suppose that we toss a fair coin three times. What is the probability of obtaining at least
two heads?
We may write the sample space as
Ω   r HHH, HHT, HTH, THH, HTT, THT, TTH, TTT x
where, for example,THT denotes that the first toss was a tail, the second a head, and the third a
tail. There are thus¶ Ω¶   8 possible outcomes. As the coin is stated to be fair, we proceed under the
17
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 21 =====
assumption that all the outcomes are equally likely. LetE be the event that we obtain at least two heads
then
E   r HHH, HHT, HTH, THH x
so that ¶ E¶   4. Thus, using the classical interpretation of probability, Equation (20),
P  E   ¶ E¶
¶ Ω¶   4
8   1
2.
Note: We could have used a different sample space,Ω¬   r 0, 1, 2, 3x , to count the number of heads observed
over the three coin tosses. This wouldnot be an example of the classical interpretation of probability,
as then the four possibilities arenot equally likely (you are more likely to see1 head than 0 heads, for
example - as we can see if we useΩ as above).
Example 2.3. Suppose that we roll two fair dice, a red one and a blue one. What is the probability of the
total score of the two dice being6?
Let   r,b  denote the score on the red dice beingr and the score on the blue dice beingb. Use the sample
space
Ω   r  1, 1 ,   1, 2 ,   1, 3 , ...,   6, 4 ,   6, 5 ,   6, 6x
with ¶ Ω¶   36     6  6 . As the dice are fair, we can assume that each outcome is equally likely. If we let
E   r total score is 6x then to findP  E we need to find¶ E¶ , i.e. the total number of outcomes such that
r  b   6. We tabulate the possible outcomes and add the scores.
Blue
Red 1 2 3 4 5 6
1 2 3 4 5 6 7
2 3 4 5 6 7 8
3 4 5 6 7 8 9
4 5 6 7 8 9 10
5 6 7 8 9 10 11
6 7 8 9 10 11 12
We thus haveE   r  1, 5 ,   2, 4 ,   3, 3 ,   4, 2 ,   5, 1x , so that¶ E¶   5. By the classical interpretation of
probability, (20), we have
P  E   ¶ E¶
¶ Ω¶   5
36.
Note: Again we could have chosen a different sample space, e.g.Ω¬   r 2, 3,..., 12x representing the
sum of the two dice. But then the set of possible outcomes2, 3,..., 12 would not be equally likely. We
emphasise that to use the classical interpretation of probability, the choice of sample space is crucial!
Example 2.4. From a sample of400 adults, 300 cycle or swim (or both),160 swim, 120 swim and cycle.
What is the probability of an adult selected at random not cycling?
Let Ω be the set of all the sampled adults, so that¶ Ω¶   400. LetS be set of the adults who swim andC
the set of the adults who cycle. In this case
¶ S¶   160, ¶ S < C¶   300, ¶ S = C¶   120.
We can use a Venn diagram to easily summarise the number of adults who fall into the disjoint events of
Ω as shown in Figure 10.
18
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 22 =====
Choosing an adult at random corresponds to assuming that each adult is equally likely to be chosen.
Then, using the classical interpretation of probability, (20),
P  S   ¶ S¶
¶ Ω¶   160
400   2
5
P  S < C   ¶ S < C¶
¶ Ω¶   300
400   3
4
P  S = C   ¶ S = C¶
¶ Ω¶   120
400   3
10.
Now, using the inclusion-exclusion rule, see Corollary 1.5,P  S < C   P  S  P  C  P  S = C and by
rearranging we have
P  C   P  S < C  P  S = C  P  S   3
4  3
10  2
5   13
20.
By using the probability of complements, Corollary 1.1, we have
P  r adult doesn’t cyclex   P  Cc   1  P  C   7
20.
Ω
S C
120
100
40 140
Figure 10: If ¶ Ω¶   400 with ¶ S¶   160, ¶ S < C¶   300 and ¶ S = C¶   120 then we can calculate the size of
each disjoint subset:¶ S = Cc¶   40, ¶ Sc = C¶   140 (so that ¶ C¶   260) and ¶ Sc = Cc¶   100.
In the examples we have seen so far, it was relatively easy to count the number of outcomes and thus
calculate the probabilities. In more complicated situations, we need to develop general counting techniques
to find the number of outcomes. This is known ascombinatorics.
2.2 Multiplication principle
Consider the problem where we have two finite sets, sayA and B, and we wish to count the number of
ways of choosing one element fromA and one fromB. How many ways are there of doing this?
Suppose thatA   r a1,...,a nx and B   r b1,...,b mx so that ¶ A¶   n and ¶ B¶   m. We can write an
outcome of choosing one element from each set as a pair  ai,bj and arrange them in ann  m table:
  a1,b 1   a1,b 2   a1,b 3 ...   a1,bm
  a2,b 1   a2,b 2   a2,b 3 ...   a2,bm
    
  an,b 1   an,b 2   an,b 3 ...   an,bm
Thus there aren  m   nm     ¶ A¶  ¶ B¶ possible ways to choose one element from each set.
19
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 23 =====
Theorem 2.1(Multiplication principle). LetA1,A 2,...,A k be sets withn1,n 2,...,n k elements, respec-
tively. The number of ways of choosing one element from each of thek sets is
k
5
i  1
ni   n1 n2 nk.
Proof. Idea: Use induction. The number of ways of choosing fromi  1 sets is the number of ways of
choosing from the firstj, and then choosing from the  i  1 th.
The proof is by induction. The result is trivial fork   1. Suppose it is true up tok   i. This means that
if we letBi be the set of all possible choices from setsA1,...,A i, i.e.
Bi   r  a1,a 2,...,a i  a1 " A1,...,a i " Aix ,
then
¶ Bi¶   ¶ A1¶  ¶ A2¶    ¶ Ai¶   n1 n2 ni.
Then
¶ Bi 1¶   ¶r  a1,a 2,...,a i 1  a1 " A1,...,a i 1 " Ai 1x¶
  ¶r  a1,a 2,...,a i 1    a1,...,a i " Bi, ai 1 " Ai 1x¶ ,
i.e. the number of ways of choosing one element fromBi and one fromAi 1. We have already seen that
the number of ways of choosing one element from a set of sizen, and another from a set of sizem, is
n  m. Here our two sets areBi of sizen1n2 ni, andAi 1 of sizeni 1, so we obtain that
¶ Bi 1¶   n1 n2 ni  ni 1.
Thus we have shown that if the result is true fork   i then it is true fork   i  1. Since it is true for
k   1, by induction it is true for allk.
Example 2.5. Suppose that we toss a fair coin, roll a fair dice and pick a card at random from a full
pack of cards. What is the probability of tossing a head, scoring5 or 6 on the dice, and picking a red
picture card (Jack, Queen, or King)?
Let Ω   r  t,d,c   t " r H,T x , d " r 1,..., 6x , c " r A¸ ,...,K º xx . In this case
¶ Ω¶   ¶r H,T x¶  ¶r 1,..., 6x¶  ¶r A¸ ,...,K º x¶   2  6  52   624.
Thus, there are 624 equally likely outcomes as the coin and the dice are fair and the card is picked at
random.
Let E be the event of interest, i.e.,
E   r  t,d,c   t " r Hx , d " r 5, 6x , c " r J¸ ,Q ¸ ,K ¸ ,J ¶ ,Q ¶ ,K ¶ xx
so that
¶ E¶   ¶r Hx¶  ¶r 5, 6x¶  ¶r J¸ ,Q ¸ ,K ¸ ,J ¶ ,Q ¶ ,K ¶ x¶   1  2  6   12.
Thus,E can occur in 12 different ways and by the classical interpretation of probability we have
P  E   ¶ E¶
¶ Ω¶   12
624   1
52.
2.3 Ordered choice: permutations
A permutation is an ordered arrangement of objects. Suppose that we have a set ofn objects and we
wish to chooser elements from the set and list them in order. How many ways are there to do this?
The answer depends on whether or not elements can be chosen more than once. If we are allowed to choose
each element more than once, then we aresampling with replacement; otherwise we aresampling
without replacement.
20
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 24 =====
2.3.1 Sampling with replacement
Corollary 2.1(Ordered choice: sampling with replacement). The number of ways of choosingr elements
with replacement in a specific order from a set ofn elements isnr.
Proof. Follows from Theorem 2.1, the multiplication principle. LetA be the set ofn elements, and then
let A1   A2   ...   Ar, withni   n for eachi   1,...,r . Then choosingr elements with replacement in a
specific order is the same as picking one element fromA1, one fromA2, and so on up toAr. Theorem 2.1
says the number of ways of doing this is
r
5
i  1
ni  
r
5
i  1
n   nr.
Example 2.6. How many different 4 digit PIN codes are there?
A 4 digit PIN code is a specific way of choosingr   4 digits out of10 digits (i.e., 0, 1,..., 9). This is
sampling with replacement as the same digit can appear more than once, and this is an ordered choice as
the PIN codes 1234 and 4321 are different. By Corollary 2.1 there are thus104   10000 different codes.
What is the probability that my PIN contains only the digits0 to 6 (assuming PINs are chosen at random
and all 4-digit numbers are allowed)?
Let E be the event that my PIN contains only the digits0 to 6. Again by 2.1 there are thus74   2401
possible 4-digit codes using the seven numbers0, 1, 2, 3, 4, 5, 6, so ¶ E¶   2401. Thus by the classical
interpretation of probability
P  E   ¶ E¶
¶ Ω¶   2401
10000   0.2401.
2.3.2 Sampling without replacement
We now consider the number of ways of choosingr different elements from a set ofn elements in a
specific order, i.e. samplingwithout replacement.
Choose the first item. There aren ways to do this. Once this item has been chosen, it is not replaced and
so the number of remaining elements decreases by 1. Thus there are onlyn  1 ways to choose the second
item, and thenn  2 ways to choose the third item, and so on. Finally, once  r  1 items have been
chosen without replacement, there aren    r  1 ways to choose therth item. Using the multiplication
principle, Theorem 2.1, we thus haven    n  1      n    r  1 ways of choosing ther elements in a
specific order without replacement.
Before we state this formally, it will be easier if we have a way of writing numbers of this form more
concisely. We will need to recall the definition offactorials.
Definition 2.2(Factorial). For anym " r 0, 1,... x , m factorial, written asm!, is defined as
m!   w m  m  1  m  2  3  2  1 if m   1, 2, 3,...,
1 if m   0.
Using this definition, the reasoning above can be formally stated as follows.
Corollary 2.2(Ordered choice: sampling without replacement). The number of permutations of lengthr
taken from a set of sizen, or equivalently, the number of ways to chooser different elements in a specific
order from a set ofn elements is
n  n  1  n  2    n    r  1   n  n  1    n    r  1  n  r  n    r  1  1
  n  r  n    r  1  2   1
  n!
  n  r !.
21
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 25 =====
Example 2.7. Five cards from a shuffled pack are dealt face up in a row. What is the probability the first
three are picture cards and the last two are not?
Since the order of the cards is important, we need our sample spaceΩ to be the set of ordered sequences
of five cards drawn from a deck of 52 cards. By Corollary 2.2,
¶ Ω¶   52  51  50  49  48.
LetE be the event that we get three picture cards and then two non-picture cards. As there are 12 picture
cards in total (four suits, King, Queen and Jack in each suit), the number of ways of choosing the first
three cards to all be picture cards is (sampling without replacement)12  11  10. The number of ways
of choosing the last two cards to both be non-picture cards is similarly40  39. By the multiplication
principle, we have
¶ E¶   12  11  10  40  39,
and so
P  E   ¶ E¶
¶ Ω¶   12  11  10  40  39
52  51  50  49  48   11
1666  0.0066.
2.4 Unordered choice: combinations
A combination is an unordered arrangement of objects. Suppose that we have a set ofn distinct elements
and wish to chooser elements fromE so that the order of the elements is irrelevant. In how many ways
can we do this?
Similar to the case with permutations, the answer depends on whether the same element can be chosen
more than once.
2.4.1 Sampling without replacement
Let C  n,r  denote the number of ways of choosingr different elements from a set ofn distinct elements
when the order does not matter. What isC  n,r  ? From Corollary 2.2 we know that the number of
ordered samples (or permutations) isn!©  n  r !. If the order does not matter, then we can re-order (or
permute) ther chosen elements in any way we like and still get the same sample.
Lemma 2.1(Number of permutations ofk objects). The number of permutations ofk objects, i.e., the
number of waysk elements can be permuted/ordered/arranged, isk!.
Proof. We apply Corollary 2.2 withn   r   k, i.e. the number of ways to choose k different elements in a
specific order from a set of k elements. This givesk!© 0!   k!.
Therefore in then!©  n  r ! permutations, each combination appearsr! times, and thus
n!
  n  r !   r!C  n,r  .
We deduce that
C  n,r    n!
r!  n  r !,
which we formally state as the following corollary:
Corollary 2.3 (Unordered choice: sampling without replacement, combinations). The number of
combinations of lengthr taken from a set ofn distinct elements, i.e., the number of ways of choosingr
different elements from a set ofn distinct elements when the order does not matter is
 n
r    n!
r!  n  r !. (21)
Remarks:
22
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 26 =====
1.  n
r is read as “n choose r”.
2. From Equation (21), we have immediately that forr   0, 1,...,n
 n
r    n
n  r .
Example 2.8. The national lottery chooses 6 balls at random (without replacement) from a set of 59
balls labelled from 1 to 59. If you pick 6 numbers, what is the probability that your numbers match those
drawn?
The sample space is the set of choices of 6 distinct elements from a set of 59, i.e.
Ω   r  a1,a 2,a 3,a 4,a 5,a 6  no twoai are equal, ai " r 1,..., 59x for all i.x
From Corollary 2.3 we know that
¶ Ω¶    59
6    59!
53!6!   59  58  57  56  55  54
6  5  4  3  2  1   45, 057, 474.
For us to win, we have to match exactly the one chosen sequence, soP  we win   1©¶ Ω¶  0.000000022194
or about one in 45 million.
Example 2.9. Five cards are dealt from a shuffled pack of 52 cards. What is the probability of a full
house, i.e., three of one rank and a pair of another rank?(The rank of a card is just whether it is Ace, 2,
3, ... , 10, Jack, Queen or King. So a full house could be e.g. three 9s and two Jacks.)
Let Ω   r choices of 5 cardsx . Then ¶ Ω¶    52
5  . We now count how many possible ways there are of
obtaining a full house. There are 13 ways of choosing the rank of the card that is in the triple. Once the
rank is chosen, there are 4
3 ways to choose the three suits. Having chosen the rank for the triple, there
are only 12 ways (the remaining ranks) of choosing the rank for the pair and 4
2 ways of choosing the
suits for the pair. If we letE   r get a full housex then
¶ E¶   13   4
3  12   4
2 .
As all hands are equally likely,
P  E   ¶ E¶
¶ Ω¶
 
13  12   4
3   4
2
 52
5 
  13  12  4  4  3
2  1  5  4  3  2  1
52  51  50  49  48
  6
4165   0.0014 (4dp).
2.4.2 Sampling with replacement
Consider choosingr elements from a setA   r a1,...,a nx of n distinct elements, with replacement, when
the order of ther elements does not matter. This means thata1 could appear any number of times from0
up tor; so coulda2, and so on. Say thata1 appears m1 times, a2 appears m2 times, and so on. Then we
need eachmi to be a non-negative integer, and we also needm1    mn   r, so that the total number
of chosen elements isr.
The ice cream vending machine
23
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 27 =====
Imagine there is a vending machine withn different flavours of ice cream set out in a row. You put enough
money in forr scoops of ice cream. (You are allowed more than one scoop of each flavour.) You have
to tell the machine which flavours you want, and also get the machine to the end so that it resets for
the next customer. There are only two buttons: “scoop” (S) and “move” (M). The machine starts from
flavour 1, so to get it to the end you will need to press the “move” buttonn  1 times. And to get your
helping of ice cream you will need to press the “scoop” buttonr times. Apart from these conditions you
are free to press the two buttons in any order: if you wantr scoops of flavour1, you press “scoop”r times
followed by “move”n  1 times. Another example, ifn   10 and r   5, is
MMSMMSSMMSMMSM
which would get you one scoop of flavour 3, two scoops of flavour 5, one scoop of flavour 7 and one scoop
of flavour 9.
Another way of looking at this is that we have to pressn  1  r buttons, and we can choose anyr of
them to beS. This is the same as if the national lottery hadn  1  r balls andr of them were chosen as
the winning numbers. So the number of ways of makingr choices from a set ofn distinct elements, with
replacement, is exactly the same as the number of ways of choosingr out ofn  1  r distinct elements,
without replacement. But we already know that this is exactly n 1 r
r  .
(This explanation is based on one from mathsisfun.com. See e.g. the numberphile episode “stars and bars
(and bagels)” for another explanation.)
Corollary 2.4 (Unordered choice: sampling with replacement). The number of ways of choosingr
elements from a set ofn elements, with replacement, so that the order does not matter is
 n  1  r
r     n  1  r
n  1      n  1  r !
r!   n  1 ! .
Example 2.10. A doughnut shop offers four kinds of doughnut: ring, chocolate, jam, and lemon. You
want to buy 12 doughnuts. How many different possible choices are there?
We are choosingr   12 doughnuts out ofn   4 possible kinds. (Obviously each kind can be chosen more
than once, otherwise we would struggle to buy 12!) Thus the answer is, by Corollary 2.4,
 4  1  12
12     15
12    15
3    15!
12! 3!   15  14  13
3  2  1   455.
To summarise all the different scenarios, we can refer to the following table.
Without replacement With replacement
Ordered n!
  n  r ! nr
Unordered  n
r  n  1  r
r 
It might help to remember a key example for each:
Without replacement With replacement
Ordered podium in a race PIN code
Unordered lotto buying doughnuts
24
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 28 =====
2.5 Examples
Example 2.11. (a) How many distinct permutations of the wordMETHODS are there?
There are seven distinct letters so there are7!   5040 permutations.
(b) How many distinct permutations of the wordALGEBRA are there?
Notice that there are twoAs, so we need to be careful: Corollary 2.3 insists that then elements are
distinct, which is not the case here.
If we label theAs asA1, A2 and treat these as different letters, then there are7! permutations of the
letters A1LGEBRA2. Consider any one of these permutations, sayA1A2LGEBR. This is equivalent to
A2A1LGEBR: there are2! ways of permuting theAs whilst keeping the remaining five letters fixed. Thus,
there are 7!© 2!   2520 distinct permutations ofALGEBRA.
Example 2.12. I turn over 5 cards one by one from a well-shuffled deck. What is the probability that
they are A,2,3,4,5 (in that order)?
Theordermatters, andwearen’treplacingcards, sowith Ω   r ordered samples of 5 cards without replacementx
we have
¶ Ω¶   52!
  52  5 !   52  51  50  49  48   311, 875, 200.
Now, if
E   r first card is A, second is 2,..., fifth is 5x ,
then I have 4 options for my first card (since there are 4 aces), 4 for the second, 4 for the third, 4 for the
fourth and 4 for the fifth. Thus
¶ E¶   45   1024,
and
P  E   ¶ E¶
¶ Ω¶   1024
311, 875, 200   8
2, 436, 525  0.000003.
Example 2.13. The national lottery chooses 6 balls at random (without replacement) from a set of 59
balls labelled from 1 to 59. If you pick 6 numbers, what is the probability that at least 5 of your numbers
match those drawn?
We already know that if
Ω   r set of 6 distinct choices without replacement from 59 possibilitiesx ,
¶ Ω¶    59
6    45, 057, 474,
and therefore
P  all 6 of my numbers match   1
45, 057, 474.
Now, since
P  at least 5 of my numbers match   P  all 6 match  P  exactly 5 match
and the two events on the right are disjoint, it remains to calculateP  exactly 5 match .
Now, to match exactly 5 numbers, I need to choose which chosen ball not to match (6 choices) and then
I have 53 choices (the balls not chosen) for that number. Apart from this, I have no flexibility: my
remaining 5 numbers must match exactly the ones on the remaining 5 balls. So
P  exactly 5 match   6  53
45, 057, 474   318
45, 057, 474  0.000007,
and
P  at least 5 match   319
45, 057, 474  0.000007.
25
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 29 =====
Example 2.14. An urn containsr red balls andb blue balls. You remove balls one by one from the urn
at random, without replacing them. What is the probability that the first time you remove a red ball is on
the kth pick?
The sample space is the set of sequences ofr  b balls, exactlyb of which must be blue. This is the same
as if we haver  b distinct elements (the numbers1 up tor  b) and we need to chooseb of them to colour
blue; the order doesn’t matter (if I choose number 3 and then number 7, that’s the same as choosing
number 7 and number 3; they both just get coloured blue) and we are working without replacement (once
I have chosen number 3 and coloured it blue, I can’t choose number 3 again). Therefore
¶ Ω¶    r  b
b  .
IfE   r first red ball is thekthx , then our firstk balls are fixed (they must bek  1 blue balls followed by
a red); and the remainingr  b  k must consist ofr  1 red balls (and thusb  k  1 blue balls). Or in
other words, we have already coloured the numbers1 up tok, and we now haver  b  k numbers,r  1
of which need to be chosen (to colour red). Thus
¶ E¶    r  b  k
r  1  ,
and therefore
P  E   ¶ E¶
¶ Ω¶  
 r b k
r 1 
 r b
b 
.
Figure 11: The first 43 steps of a random walk.
Example 2.15(Random walk). In the first lecture we briefly saw a key example, arandom walk that
at each time step moves up by1 with probability1© 2, and down by1 with probability1© 2. (See figures 11
and 12.) What is the probability that the random walk is at0 after n steps?
In order to be at0, the walk must have taken the same number of up-steps as down-steps.
If n is odd, then this is impossible, so the probability the walk is at0 is zero.
What about ifn is even? Let
Ω   r ordered sequences of  1 and  1 of lengthnx ,
26
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 30 =====
and
E   r ordered sequences of  1 and  1 of lengthn such that exactlyn© 2 are  1x .
Then (ordered sampling ofn elements from a set of2 with replacement)
¶ Ω¶   2n
and (unordered sampling ofn© 2 elements from a set ofn without replacement)
¶ E¶    n
n© 2 .
Each outcome inΩ is equally likely, and thus, for evenn,
P  E   ¶ E¶
¶ Ω¶  
 n
n© 2
2n   n!
2n  n© 2 !  n© 2 !.
(Is this formula correct for oddn? Is P  E   0 for oddn? Why / why not?)
This tells us, implicitly, the probability that our random walk is at0 after n steps. But in this form,
it’s not very helpful - how big is n!
2n  n© 2 !  n© 2 ! when n is large? To answer this question we need (the
remarkable) Stirling’s formula, which is non-examinable, to tell us how bign! is.
Stirling’s formula (non-examinable):
n!  nn
en
Ó
2πn.
Using Stirling’s formula, we see that
P  E  nne nÓ
2πn
2n  n© 2 n© 2e n© 2Ó πn  n© 2 n© 2e n© 2Ó πn
 
×
2
πn.
You might like to ask yourself: does the random walk hit0 infinitely often? How long do we have to wait
for it to hit0?
Figure 12: The first 200 steps of a random walk.
27
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 31 =====
3 Conditional probability and independence
3.1 Conditional probability
Suppose that in an experiment, we learn that the eventF has occurred. Does this information change the
probability of some other event, sayE, occurring?
Definition 3.1 (Conditional probability). For a probability space   Ω, F, P if E,F " F such that
P  F  % 0, then the conditional probability ofE givenF, written asP  E ¶ F  , is
P  E ¶ F    P  E = F 
P  F  . (22)
Example 3.1. Your friend tossed a coin three times, but you do not know the outcomes. What is the
probability of observing three tails, when you know that at least two tails are observed?
Let Ω   r HHH, HHT, HTH, THH, HTT, THT, TTH, TTT x as before.
Ifweset E   r Three tailsx andF   r At least two tailsx , thenE   r TTT x ,F   r TTT, TTH, THT, HTT x
and E = F   r TTT x . If we assume that all sample points ofΩ are equally likely then
P  E   ¶ E¶
¶ Ω¶   1
8, and P  F    ¶ F ¶
¶ Ω¶   4
8   1
2, and P  E = F    ¶ E = F ¶
¶ Ω¶   1
8.
Using Equation (22), the probability of three tails given that there are at least two tails is
P  E ¶ F    P  E = F 
P  F    1© 8
1© 2   1
4.
Notice that P  E ¶ F  % P  E which is not a surprise: learning that there are at least two tails increases
the probability that all three are tails.
You might be surprised that the probability of seeing three tails given at least two tails is not1© 2, since
once I have two tails, the probability that the third coin is tails is1© 2. Indeed, if I tell you thatthe first
two tosses are tails, then the conditional probability that all three are tails is1© 2:
P  three tails¶ first two tosses are tails   P r TTT x
P r TTT,TTH x   1© 8
1© 4   1
2.
Think about the difference between these two conditionings.
Remarks: Return to Definition 3.1. Suppose thatP  F  % 0.
1. Essentially,F becomes the new sample space for the conditional probabilityP    ¶ F  , i.e., P  F ¶ F   
1. All probabilities are then re-normalised byP  F  .
2. It is straightforward to check thatP    ¶ F  satisfies Kolmogorov’s axioms (A1)–(A3). Hence, all
implications of these axioms, i.e. the properties in Section 1.2.3, remain valid for conditional
probability as well. For example, the inclusion-exclusion rule of Corollary 1.5 for conditional
probability is that for any eventsE and G we have:
P  E < G ¶ F    P  E ¶ F   P  G ¶ F   P  E = G ¶ F  .
3. If E and F are disjoint, that isE = F   o (Definition 1.5), thenP  E = F    0 so that P  E ¶ F    0.
We may re-arrange Equation (22) to obtain
P  E = F    P  F  P  E ¶ F  , (23)
which can be a useful way of calculating intersection probabilities, as in some cases conditional probabilities
may be easy to calculate directly.
28
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 32 =====
Example 3.2. Two cards are drawn at random from a deck of 52 cards. What is the probability of both
being aces?
Let E1   r first card is an acex and E2   r second card is an acex . Then
P r Two acesx   P  E1 = E2   P  E1 P  E2 ¶ E1   4
52  3
51   1
221.
We can extend Equation (23) to intersections ofn events.
Theorem 3.1. Suppose thatE1,...,E n are any events such thatP  E1 =  = En 1 % 0. Then
P  E1 =  = En   P  E1 P  E2 ¶ E1 P  E3 ¶ E1 = E2  P  En ¶ E1 =  = En 1 . (24)
Proof. Idea: Just write out the definition of the right-hand side and cancel lots of terms!
Firstweneedtocheckthattheright-handsideiswell-defined. Forany k " r 1,...,n  1x ,  n 1
i  1 Ei L  k
i  1Ei
and so, by the containment rule (Corollary 1.4, ifE L F, then P  F  ' P  E ), and so
P 
k

i  1
Ei ' P 
n 1

i  1
Ei % 0.
Thus, all conditional probabilities in Equation(24) are well defined. Now, starting from the right-hand
side of (24),
P  E1 P  E2 ¶ E1 P  E3 ¶ E1 = E2  P  En ¶ E1 =  = En 1
  P  E1 P  E1 = E2
P  E1
P  E1 = E2 = E3
P  E1 = E2  P  E1 =  = En
P  E1 =  = En 1
  P  E1 =  = En
yielding the claim.
Example 3.3. An electrician’s toolbox contains five good and two bad fuses. Fuses are selected for testing
at random, without replacement.
1. Find the probability that the first two tested fuses are defective.
Let Di denote the event that theith fuse is defective andGi that it is good, so thatGc
i   Di. Then
P r First two defectivex   P  D1 = D2   P  D1 P  D2 ¶ D1   2
7  1
6   1
21.
2. Find the probability of the second defective fuse being encountered on the third test.
Let E be the event that the second defective fuse is found on third test, i.e.
E     G1 = D2 = D3 <   D1 = G2 = D3 .
Thus
P  E   P  G1 = D2 = D3  P  D1 = G2 = D3  since disjoint events
  P  G1 P  D2 ¶ G1 P  D3 ¶ G1 = D2
 P  D1 P  G2 ¶ D1 P  D3 ¶ D1 = G2  by theorem above
   5
7  2
6  1
5 
   2
7  5
6  1
5 
   2
21.
29
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 33 =====
3.2 The law of total probability
Definition 3.2(Partition). IfE1,...,E n is a collection of pairwise disjoint non-empty events, i.e.,Ei j o
and Ei = Ej   o for alli,j " r 1,...,n x , i j j, and if n
i  1Ei   Ω, thenE1,...,E n form apartition of Ω.
Partitions are useful as they divide the sample spaceΩ into disjoint events whose probabilities can be
added. That is, for a partitionr E1,...,E nx we have
P 
n

i  1
Ei  
n
=
i  1
P  Ei   1.
Example 3.4. For any eventE with E j o and E j Ω, r E,E cx is a partition ofΩ, sinceE = Ec   o
and E < Ec   Ω.
Recall the partition rule (Corollary 1.3, Section 1.2.3,
P  F    P  F = E  P  F = Ec . (25)
Now, if P  E % 0 and P  Ec % 0 so that P  F ¶ E   P  F = E© P  E and P  F ¶ Ec   P  F = Ec© P  Ec
are well defined, then
P  F = E   P  E P  F ¶ E , (26)
P  F = Ec   P  Ec P  F ¶ Ec . (27)
Substituting Equations (26) and (27) into Equation (25) gives
P  F    P  E P  F ¶ E  P  Ec P  F ¶ Ec .
This result can be extended into the following theorem.
Theorem 3.2 (The Law of Total Probability). Suppose that r E1,...,E nx form a partition ofΩ and
P  Ei % 0 for alli " r 1,...,n x . Then for any eventF,
P  F   
n
=
i  1
P  Ei P  F ¶ Ei .
Proof. Idea: WriteF as a union of its intersections with theEi, and use the definition of conditional
probability.
Note thatF   F = Ω and  n
i  1Ei   Ω. Thus by the Distributive Law (Theorem 1.1)
F   F = Ω   F = 
n

i  1
Ei  
n

i  1
  F = Ei .
For anyi j j,
  F = Ei =   F = Ej   F =   Ei = Ej   F = o   o ,
so thatF = E1,...,F = En are pairwise disjoint. Thus
P  F    P 
n

i  1
  F = Ei 
 
n
=
i  1
P  F = Ei  disjoint events
 
n
=
i  1
P  Ei P  F ¶ Ei  conditional probability
Remarks:
30
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 34 =====
1. We can extend Definition 3.2 to countably infinite partitionsE1,E 2,... of Ω. In this case, Theorem
3.2 extends naturally to
P  F   

=
i  1
P  Ei P  F ¶ Ei .
2. Theorem 3.2 also holds for disjoint eventsE1,...,E n such thatF L  n
i  1Ei j Ω.
Example 3.5. In a bank’s trading office, Buster, Rich, and Owen made30%, 50% and 20% of all the
deals last year, respectively. Moreover,1© 2, 1© 3 and 1© 4 of their deals, respectively, made in excess of £1
million in profit. What is the probability that the profit of a randomly chosen deal from last year was over
£1 million?
Let Ω be collection of last year’s deals and letB, R, W denote the events that the chosen deal was made
by Buster, Rich, and Owen, respectively. EventsB, R, andW are disjoint andB < R < W   Ω, so
r B,R,W x is a partition ofΩ. Let us writeE   r the chosen deal made over £1 million in profitx , and so,
by the law of total probability,
P  E   P  B P  E ¶ B  P  R P  E ¶ R  P  W  P  E ¶ W 
   3
10  1
2 
   5
10  1
3 
   2
10  1
4 
   11
30.
3.3 Bayes’ theorem
Suppose that P  E % 0 and P  F  % 0. Then we have
P  E = F    P  F  P  E ¶ F    P  E P  F ¶ E
so that
P  E ¶ F    P  E P  F ¶ E
P  F  , (28)
which gives a formula for reversing the conditioning. This is useful ifP  F ¶ E is straightforward to obtain
but we are interested inP  E ¶ F  . For example, as a patient visiting the doctor we are interested in
P  disease ¶ symptoms whilst medical evidence typically knowsP  symptoms ¶ disease . Equation (28) is
often called Bayes’ theorem8, but there is a more general form which applies to partitions ofΩ.
Theorem 3.3(Bayes’ theorem). Suppose that r E1,...,E nx is a partition ofΩ and P  Ei % 0 for all
i " r 1,...,n x . Then for anyj " r 1,...,n x , and any eventF with P  F  % 0,
P  Ej ¶ F    P  Ej P  F ¶ Ej
< n
i  1 P  Ei P  F ¶ Ei . (29)
Proof. Equation (29) follows from Equation (28) by takingE   Ej and then using the law of total
probability, Theorem 3.2, forP  F  .
Remarks:
1. Recall that r E,E cx is a partition for anyE, so that
P  E ¶ F    P  E P  F ¶ E
P  E P  F ¶ E  P  Ec P  F ¶ Ec .
2. As with the Law of Total Probability, the result can be extended to the case whereE1,E 2,... is a
countably infinite partition, and also to the case whereE1,...,E n are disjoint andF L  n
i  1Ei j Ω.
8Thomas Bayes (1701–1761).
31
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 35 =====
Example 3.6(Example 3.5 revisited). Suppose that1© 4, 1© 8 and 1© 16 of the deals made by Buster, Rich
and Owen, respectively, made a loss. What is the probability that a randomly chosen loss-making deal was
made by Buster?
Let L be the event that the deal made a loss. Then we know
Buster: P  L ¶ B   1© 4, P  B   3© 10
Rich: P  L ¶ R   1© 8, P  R   5© 10
Owen: P  L ¶ W    1© 16, P  W    2© 10
and so, by Bayes’ Theorem,
P  B ¶ L   P  B P  L ¶ B
P  B P  L ¶ B  P  R P  L ¶ R  P  W  P  L ¶ W 
 
 3
10  1
4 
 3
10  1
4    5
10  1
8    2
10  1
16 
  6
6  5  1   1
2.
3.4 Independence
Definition 3.3(Independence). EventsE and F are independent if
P  E = F    P  E P  F  . (30)
If two events are not independent, they are dependent.
Suppose that P  E % 0 and P  F  % 0 and thatE and F are independent. By (22) and (30) we have
P  E ¶ F    P  E = F 
P  F    P  E P  F 
P  F    P  E ,
and similarly,
P  F ¶ E   P  E = F 
P  E   P  E P  F 
P  E   P  F  .
Thus, Definition 3.3 of independence captures our intuition wherebyE and F are independent if knowing
one gives no information about the other: the conditional probability is equal to the unconditional
probability, i.e.,P  E ¶ F    P  E and P  F ¶ E   P  F  .
Remarks:
1. Assuming that P  E % 0 and P  F  % 0, we could have equivalently defined independence by either
P  E ¶ F    P  E or P  F ¶ E   P  F  , but Equation(30) is used as it treats events symmetrically
and generalises naturally to many events as we shall see shortly.
2. Definition 3.3 allows us to consider the case when an event has zero probability. IfP  E   0 thenE is
independent of every event:E= F L E so thatP  E= F  P  E   0and thusP  E= F    0   P  E P  F  .
Example 3.7. A fair coin is tossed twice. LetE and F be the event of getting a head on the first and
second toss, respectively.
Intuitively, if we know the coin to be fair, the outcome of the first toss has no influence on the second,
P  F ¶ E   P  F  , so thatP  E = F    P  E P  F  .
This can be demonstrated formally. LetΩ   r HH,HT,TH,TT x be the sample space of equally likely
outcomes. Then,
P  E   1
2, P  F    1
2, and P  E = F    1
4.
Thus, P  E = F    1
4   P  E P  F  so thatE and F are independent.
32
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 36 =====
Example 3.8. Draw a card from a shuffled deck of cards. LetE   r the card is an acex and F  
r the suit of the card is heartsx . Unlike in Example 3.7, here the two events are physically related (the
same card). Are they independent?
Using equally likely events we have
P  E   4
52   1
13, P  F    1
4, and P  E = F    1
52.
Thus, P  E = F    1
52   P  E P  F  and soE and F are independent. Note thatP  E ¶ F    P  E , so that
learning the suit of a card does not give you any information about the rank.
Independence of events extends to the complementary events as well.
Theorem 3.4(Independence of events extends to their complements). If E and F are independent, then
(a) E and Fc are independent,
(b) Ec and F are independent,
(c) Ec and Fc are independent.
Proof. Idea: For part (a), use the partition rule to change a question aboutFc into a question aboutF.
From the partition rule (Corollary 1.3), we haveP  E   P  E = F   P  E = Fc , so that
P  E = Fc   P  E  P  E = F 
  P  E  P  E P  F   by independence of E and F
  P  E  1  P  F    P  E P  Fc .  probability of complements
Hence we have (a). By symmetry we get (b), and (c) follows by applying (a) to (b).
Disjoint events are typicallynot independent!
If E and F are disjoint events, that isE = F   o , and bothP  E % 0 and P  F  % 0, then P  E P  F  % 0.
However, P  E = F    0 so thatE and F are dependent events.
Intuitively, ifE andF are disjoint, then knowing thatF has occurred tells us thatE cannot have occurred,
i.e., P  E ¶ F    0 j P  E % 0. LearningF changes the probability ofE. Although this reasoning is quite
intuitive, it is a common mistake to confuse independent and disjoint events.
3.5 Independence of many events
Be careful! If n eventsE1,...,E n are independent then it is natural to expect that
P  E1 =  = En   P  E1    P  En . (31)
But also, ifE1,...,E n are independent, then it is also natural to expect thatE1 andE2 are independent,
and therefore
P  E1 = E2   P  E1 P  E2 ,
and this isnot a consequence of(31). In the same way, we expectE2 and E3 to be independent, andE1,
E7 and En 1 to be independent. In fact any combination of any number of theEi for i   1,...,n should
be independent, and each of these gives a different equation that needs to be satisfied.
This leads us to the following definition.
Definition 3.4(Independence of many events). EventsE1,...,E n are said to beindependent if for any
k " r 2, 3,...,n x , and any1 & i1 $ i2 $  $ ik & n, we have
P  Ei1 = Ei2 =  = Eik    P  Ei1   P  Ei2     P  Eik  .
Otherwise they are said to bedependent.
Similarly, eventsE1,E 2,... are said to beindependent if for anyk " r 2, 3,... x , and any1 & i1 $ i2 $  $
ik, we have
P  Ei1 = Ei2 =  = Eik    P  Ei1   P  Ei2     P  Eik  .
Otherwise they are said to bedependent.
33
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 37 =====
In other words, if we have countably many eventsE1,E 2,... , they are independent if every finite sub-
collection is independent.
Example 3.9. EventsE1, E2, E3 are independent ifall of the following equalities hold:
P  E1 = E2   P  E1 P  E2  k   2, i1   1, i2   2
P  E1 = E3   P  E1 P  E3  k   2, i1   1, i2   3
P  E2 = E3   P  E2 P  E3  k   2, i1   2, i2   3
P  E1 = E2 = E3   P  E1 P  E2 P  E3  k   3, i1   1, i2   2, i3   3
It isnot enough to check thatP  E1 = E2 = E3   P  E1 P  E2 P  E3 , and it is alsonot enough to check
pairwise independence (the first three equalities above). We absolutely need to check thatall fourof the
equalities above hold! We will see this in the next two examples.
Example 3.10. Pick a card at random from a well-shuffled deck. LetE1   r pick a red cardx , E2  
r pick a red ace or a black non-acex and E3   r pick theA,J,Q or K of diamondsx . Then
P  E1   26
52   1
2, P  E2   26
52   1
2, P  E3   4
52   1
13.
Also
P  E1 = E2 = E3   P  pickA of diamonds   1
52   1
2  1
2  1
13   P  E1 P  E2 P  E3 ,
but the events are clearly not independent; for example,
P  E1 = E3   P  E3   1
13 j P  E1 P  E3 ,
i.e. knowing thatE3 holds tells you thatE1 holds, so in fact there is very strong dependence!
Example 3.11 (Example 3.7 revisited) . Earlier we saw that if we toss a fair coin twice,
E   r head on first tossx and F   r head on second tossx are independent. Consider a third event
G   r both tosses show the same sidex . In this case,
P  G   P  HH   P  TT    1© 2,
P  E = G   P  HH    1© 4
and
P  F = G   P  HH    1© 4.
Thus,
P  E = G   P  E P  G , P  F = G   P  F  P  G ,
so that E and G are also independent as areF and G, i.e., E, F, and G are pairwise independent.
However,
P  E = F = G   P  HH    1
4 j 1
8   P  E P  F  P  G ,
so thatE, F and G are not independent. Notice thatP  G ¶ E = F    1, i.e., the eventsG and E = F
are not independent: knowing the result of each toss tells us the pair, so again we have very strong
dependence!
Theorem 3.5(Independence of complements, intersections and unions). If E1,...,E n are independent
events, then
(a) Ec
1,E 2,...,E n are independent,
(b) E1 = E2,E 3,...,E n are independent,
(c) E1 < E2,E 3,...,E n are independent.
34
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 38 =====
Proof. In each case we must show that the probability of the intersection of any sub-collection of the
events is the product of the probabilities for each event. This follows immediately for any sub-collection
that, respectively, does not include the eventsEc
1, E1 = E2, E1 < E2 and so we only need to demonstrate
this for the sub-collections including these events.
For part (a), for alli1   1 $ i2 $  $ ik & n we have
P  Ec
1 = Ei2 =  = Eik    P  Ei2 =  = Eik   P  E1 = Ei2 =  = Eik 
  P  Ei2   P  Eik   P  E1 P  Ei2   P  Eik 
    1  P  E1 P  Ei2   P  Eik 
  P  Ec
1 P  Ei2   P  Eik 
proving (a).
For part (b), for all2 $ i2 $  $ ik & n we have
P   E1 = E2 = Ei2 =  = Eik    P  E1 P  E2 P  Ei2   P  Eik 
  P  E1 = E2 P  Ei2   P  Eik 
proving (b).
For part (c), by two applications of (a), we see thatEc
1,Ec
2,E 3,...,E n are independent. Thus, by (b),
Ec
1 = Ec
2,E 3,...,E n are independent. From De Morgan’s Laws (Theorem 1.1),Ec
1 = Ec
2     E1 < E2 c so
that   E1 < E2 c,E 3,...,E n are independent and thus, by another application of (a),E1 < E2,E 3,...,E n
are independent.
Remarks:
1. Theorem 3.5 can be used repeatedly. For example, ifE1,...,E n are independent then, for example
Ec
1,Ec
2,...,E c
n are independent as are  E1 < E2 = E3,Ec
4 < E5,Ec
6,...,E n.
2. Theorem 3.5 also holds for countably infinite collections of events, and the proof is the same, since
by Definition 3.4 we only need to check independence of any finite sub-collection.
Example 3.12. Three missiles are fired at a target which they hit independently with probabilities0.7,
0.8, 0.9, respectively. What is the probability of the target being hit?
If Hi   r the ith missile hits the targetx , thenH1, H2, H3 are independent and
P  H1   0.7, P  H2   0.8, and P  H3   0.9.
If T is the event that the target is hit by at least one missile, thenTc is the event that all missiles miss.
In this case,
P  T    1  P  Tc
  1  P  Hc
1 = Hc
2 = Hc
3
  1  P  Hc
1 P  Hc
2 P  Hc
3  as Hc
1,Hc
2,Hc
3 are independent
  1  0.3  0.2  0.1  as P  Hc
i    1  P  Hi
  0.994.
Example 3.13. The electrical circuit in Figure 13 is made up of switches which are independently closed
or open with probabilityp and 1  p, respectively. A signal is fed into the input. What is the probability of
it being transmitted to the output?
Let Ei   r the switch at locationi is closed.x where i   1, 2, 3, 4. Then
P r transmittedx   P   E1 = E2 <   E3 = E4
  P  E1 = E2  P  E3 = E4  P   E1 = E2 =   E3 = E4 (32)
  P  E1 P  E2  P  E3 P  E4  P  E1 P  E2 P  E3 P  E4 (33)
  p2  p2  p4   p2  2  p2 ,
where Equation (33) follows from Equation (32) by the independence ofE1, E2, E3 and E4.
35
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 39 =====
Figure 13: An electrical circuit: switches are independently closed with probabilityp.
3.6 Examples
3.6.1 Conditional probability animated
There is an animation showing conditional probability via balls landing on shelves at the se-
tosa.io/conditional website.
3.6.2 Random walk
Recall the random walk from 2.15, which at each time step moves up by 1 with probability1© 2, or down
by 1 with probability1© 2.
The following discussion isnon-examinable.
Does the random walk return to0 infinitely often? If so, we say it isrecurrent.
Suppose the random walk is at positionx " Z after some time. We want to show that it definitely returns
to 0 at some point in the future. What is the probability that it hits0 before 2x? It must be1© 2 because
the walk is symmetric, and can’t stay trapped strictly between0 and 2x forever. (Why not?)
If it hits0 first then we are done. But maybe it hits2x first. Then what is the probability it hits0 before
4x? Again, it must be1© 2.
Again, if it hits0 first then we are done, but maybe it hits4x first. Then what is the probability it hits0
before 8x? Again, it must be1© 2.
We continue in this way, gettingindependent (why?) trials each with probability1© 2. The probability
that the firstk of these are all unsuccessful is1© 2k. For anyk, we have
P  random walk never hits0 starting fromx & P  first k trials are all unsuccessful   1
2k.
Since this is true for anyk, and 1© 2k is converging to0 as k    , we must have
P  random walk never hits0 starting fromx   0.
We deduce thatthe random walk will hit0 infinitely often, i.e. it is recurrent- because wherever
it ends up, it always has probability1 of returning to0.
Note that this doesn’t tell us much about how long it takes to return to zero - each of the independent
trials above might take a (very) long time to complete.
3.6.3 Prosecutor’s fallacy: the costs of computing the wrong conditional probability (non-
examinable)
See also what is the prosecutor’s fallacy from Univeristy of Oxford and the Wikipedia page of the Sally
Clark case.
36
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 40 =====
A court needs to assess the guiltG or otherwise of a suspect of a crime, given evidenceE. Then it is
possible to compute the probability of the suspect being guilty or otherwise given the evidence as
P  G ¶ E   P  G = E
P  E   P  G P  E ¶ G
P  E
and
P  Gc ¶ E   P  Gc = E
P  E   P  Gc P  E ¶ Gc
P  E .
What could happen ifP  E ¶ G is wrongly interpreted asP  G ¶ E ?
3.6.3.1 Sally Clark case (UK, 1999) Sally Clark’s first son died in December 1996 within a few
weeks of his birth of unexplained causes (E1), and her second son died in similar circumstances in January
1998 (E2). A month later, Clark was arrested and tried for both deaths.
Her defence said that both children died of sudden infant death syndrome (SIDS), while a paediatrician,
as expert witness, testified that the chance of one child from an affluent family suffering SIDS was 1 in
8500 and concluded that the chance of two children from an affluent family suffering SIDS was 1 in 73
million, i.e.
P  E1 = E2 ¶ Gc   P  E1 ¶ Gc P  E2 ¶ Gc    1
8500 
2
 1 in 73 million.
Also, the jury mistookP  E1 = E2 ¶ Gc with the probability that Clark was innocent,P  Gc ¶ E1 = E2 ,
and concluded that
P  G ¶ E1 = E2   1  P  Gc ¶ E1 = E2  1  1
73, 000, 000  1,
so Clark was guilty “beyond reasonable doubt” and convicted for murder in November 2022.
There were both wrong assumptions and probabilistic errors involved in this case.
The first error was made by the paediatrician: medical literature showed that, if a first child dies of
SIDS then a second child from the same family is significantly more likely to die of SIDS. In other words,
susceptibility to SIDS is inherited, and therefore
P  E1 = E2 ¶ Gc j P  E1 ¶ Gc P  E2 ¶ Gc
- we do not have independent events. If we suppose that the probability of the second child dying of SIDS
given the first child died by SIDS,P  E2 ¶ E1 = Gc , is almost 0.1, then
P  E1 = E2 ¶ Gc   P  E1 ¶ E2 = Gc P  E1 ¶ Gc  1
10  1
8500   1
85, 000 9 1
73, 000, 000.
The second error was made by the jury confusingP  E1 = E2 ¶ Gc with P  Gc ¶ E1 = E2 – they should
have used Bayes’ rule to compute the latter probability.
What would a proper analysis look like?
The first step is to understand how likely the suspect is to be guilty based on just the first unexplained
death. One statistic, obtained by surveying death certificates in the UK, is that of children who die in
ways unexplained by medicine, fewer than 1 in 11 are subsequently discovered to have been murdered.
Therefore we might assume thatP  G ¶ E1 & 1
11.
Recall that we also believe thatP  E2 ¶ E1 = Gc - 1
10.
We can then try to estimateP  G ¶ E1 = E2 . By Bayes’ theorem (using the partitionr G,Gcx , and working
conditional onE1 throughout),
P  G ¶ E1 = E2   P  G ¶ E1 P  E2 ¶ G = E1
P  G ¶ E1 P  E2 ¶ G = E1  P  Gc ¶ E1 P  E2 ¶ Gc = E1 .
Dividing through by the numerator, we getP  G ¶ E1 = E2   1
1 F, where
F   P  Gc ¶ E1 P  E2 ¶ Gc = E1
P  G ¶ E1 P  E2 ¶ G = E1 .
37
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 41 =====
If P  G ¶ E1 & 1© 11 then P  Gc ¶ E1 ' 10© 11 so
P  Gc ¶ E1
P  G ¶ E1 ' 10,
and if P  E2 ¶ E1 = Gc - 1
10 then, since certainlyP  E2 ¶ G = E1 & 1 (probabilities are always between0
and 1!),
P  E2 ¶ E1 = Gc
P  E2 ¶ E1 = G - 1
10.
ThusF - 1 and therefore
P  G ¶ E1 = E2 , 1
2.
In the face of this evidence, Clark was not guilty beyond reasonable doubt. We made some assumptions
here; with different opinions on the true values ofP  G ¶ E1 and P  E2 ¶ E1 = Gc we would have to change
our calculation, but any reasonable values would still give a value ofP  G ¶ E1 = E2 that is much, much
larger than 1 in 73 million.
4 Discrete random variables
4.1 Real-valued random variables
Consider tossing a coinn times. In order to capture all the information from then tosses, the sample
space must have2n elements. However, we might only be interested in some aspects of the information,
for example the number of heads obtained over then tosses. We can encode this information in arandom
variable.
Despite the name, a random variable is neither random nor a variable. It is a function from the sample
space to (usually) a subset of the real numbers. That is,X  Ω   S for someS L R. For example,X
could be the number of heads obtained overn tosses, as mentioned above; thenX  Ω   r 0, 1, 2,...,n x .
Definition 4.1(Random variable). A (real-valued)random variable(rv) X is a function that assigns a
real-valued number to each possible outcome of an experiment, that isX is a mappingX  Ω   S L R.
The setS is called thesupport9 of X.
Remarks:
1. We typically denote random variables by capital letters such asX,Y, andZ. Prior to our experiment,
we imagine that the input of the function, i.e. the pointω in our sample space, is “unknown’’ (the
result ofn coin tosses for example). This means that the outputX  ω is also unknown. Lower case
letters, such asx, y and z, are used for possible numerical outcomes, the real numbers inS.
2. If we have a probability space  Ω, F, P , then for a random variableX, we can define events of
interest such as
r X   xx   r ω " Ω  X  ω   xx ,
r X & xx   r ω " Ω  X  ω & xx ,
r X " Ax   r ω " Ω  X  ω " Ax .
We use the more compact notation on the left hand side frequently throughout the course, even
though the right hand side is really what we mean. Moreover, we often drop the braces when
referring to the probability of such events, i.e., writeP  X " A instead of P r X " Ax or even
P r ω " Ω  X  ω " Ax . These all mean the same thing.
Example 4.1. Consider tossing a fair coin three times. The sample space is
Ω   r HHH,HHT,HTH,THH,HTT,THT,TTH,TTTx .
9In fact, the supportS¬ of X is the smallest set such thatP  X " S¬    1, but in practice in this course we will haveS¬   S.
38
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 42 =====
Let X denote the number of heads obtained in the three tosses. For eachω " Ω we can findX  ω as
follows:
ω HHH HHT HTH THH HTT THT TTH TTT
X  ω 3 2 2 2 1 1 1 0
Moreover,
P  X   1   P r ω " Ω  X  ω   1x   P r HTT, THT, TTHx   3© 8,
and
P  X ' 2   P r ω " Ω  X  ω ' 2x   P r HHH, HHT, HTH, THHx   4© 8   1© 2.
We can define many random variables onΩ. For example, we could letY denote the number of tails
obtained in the three tosses (i.e.,Y   3  X) or letZ denote the number of heads obtained on the last two
tosses, or letW denote the number of times we see either a head followed by a tail or a tail followed by a
head. In this caseX, Y, Z and W are all random variables defined on the same probability space.
Figure 14: Random variable counting the number of heads when we toss a coin three times, as a function
from the sample space to the real numbers.
4.1.1 Types of random variables: discrete and continuous
Definition 4.2(Discrete RVs). A random variableX is discrete if it has a finite or countably infinite
number of possible values, i.e. either
(a) the supportS is finite, soS   r x1,x 2,...,x nx for somex1,x 2,...,x n " R, or
(b) the supportS is countably infinite soS   r x1,x 2,... x for somex1,x 2,... " R.
Example 4.2. Examples of discrete random variables:
1. The number of heads obtained in three tosses of a fair coin described in Example 4.1 is a discrete
random variable, withS   r 0, 1, 2, 3x finite.
2. The number of meteorites greater than 1 meter diameter that strike Earth in a year is a discrete
random variable, withS   Z   r 0, 1, 2, 3,... x .
Definition 4.3(Continuous RVs). A random variableX is continuous if it has an uncountably infinite
number of possible values, i.e.,S is an un-countably infinite subset ofR. In particular,S L R could be an
interval such as  0,   ,    ,   , or   a,b  for somea $ b " R.
Example 4.3. Examples of continuous random variables:
39
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 43 =====
1. The time until the next person in the lecture hall sneezes could be modelled as a continuous random
variable taking values inS    0,   .
2. The percentage of time that Nottingham Forest have possession of the ball in their next match could
be modelled as a continuous random variable taking values inS    0, 100 .
4.1.2 Probability mass function for discrete random variables
We saw in Theorem 1.3 that to describe a finite or countable probability space, it was enough to specify a
collection   p1,p 2,...,p n or   p1,p 2,...  of non-negative numbers that sum to1. By the same logic, to
describe a discrete random variableX, it is enough to specify the non-negative numbersP  X   x for
each x " S. These numbers are encoded in what we call theprobability mass functionof the random
variable.
Definition 4.4(Probability mass function). The probability mass function(pmf) fX  R    0, 1 of a
discrete random variableX  Ω   S is defined for allx " R as
fX   x   P  X   x .
Thus < x" S P  X   x   1 and fX   x   0 for allx  S.
Example 4.4(Example 4.1 revisited). We saw in Example 4.1 howX maps the equally probable sample
points ofΩ toS   r 0, 1, 2, 3x L R. These points are not equally likely but have the probabilities calculated
in Example 4.1.
The pmf ofX is
fX   x  
~
1© 8 if x   0,
3© 8 if x   1,
3© 8 if x   2,
1© 8 if x   3,
0 if x  r 0, 1, 2, 3x .
We can check this satisfies the properties of a pmf:
1. fX   x ' 0 for allx " R, sincefX   x   0 if x  S   r 0, 1, 2, 3x and fX   x % 0 if x " S   r 0, 1, 2, 3x .
2. < x" S P  X   x   1, since
=
x" S
P  X   x   =
x" r 0,1,2,3x
P  X   x
 
3
=
i  0
P  X   i
  P  X   0  P  X   1  P  X   2  P  X   3
  1
8  3
8  3
8  1
8   1
Remark:
We can in fact think of the pmffX as inducing a new probability measure,PX, with sample spaceS
and σ-algebra F   P  S . We know this new probability measure will satisfy Kolmogorov’s axioms by
Theorem 1.3. We callPX the distribution or law of X; for anyA L S we have
PX   A   P  X " A . (34)
This is more complicated for continuous random variables as we can’t define a (useful) probability mass
function, since usually we will haveP  X   x   0 for allx " S. But it is still possible to induce a
probability measure PX, using(34) as the definition. (This is beyond the scope of this course since we
don’t have an equivalent of Theorem 1.3 for uncountable state spaces.) The point is that instead of
looking at the probability thatX is a certain value, we look at the probability that it is in a certainset.
Indeed, forany random variable, even ifP  X   x isn’t useful, the quantityP  X & x is always useful (and
corresponds to choosing the setA      ,x  in (34)). This is the idea behind thecumulative distribution
function or cdf.
40
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 44 =====
4.2 Cumulative distribution functions
The distribution of any random variable can be characterised by assigning probabilities to the events
P  X & x , for allx " R.
Definition 4.5(Cumulative distribution function). The cumulative distribution function(cdf) F  R  
 0, 1 is defined for any real valued random variableX  Ω   R as
FX   x   P  X & x .
Sometimes people drop the word “cumulative” and just call this thedistribution function.
Figure 15: The cdf of the random variableX counting the number of heads in 3 tosses of a fair coin.
Example 4.5(Example 4.4 revisited). Figure 15 shows the distribution function ofX, whereX is the
random variable counting the number of heads in 3 tosses of a fair coin from Example 4.1. For example,
FX   2   P  X & 2
  P r X   0x < r X   1x < r X   2x
  P  X   0  P  X   1  P  X   2  disjoint events
  1
8  3
8  3
8   7
8.
By Definition 4.5, ifx & y, then r X & xx L r X & yx , and by the containment rule
FX   x   P  X & x & P  X & y   FX   y ,
i.e., FX is always non-decreasing. Suppose that X  Ω   S is a discrete random variable with
S   r x1,x 2,...,x nx , withx1 $ x2 $ ... $ xn. Ifx " R is such thatxk & x $ xk 1 for somek " r 1,...,n x ,
41
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 45 =====
then
FX   x   P  X & x   P  X & xk
  P r X   x1x < r X   x2x <  < r X   xkx
  P  X   x1  P  X   x2    P  X   xk  disjoint events
 
k
=
i  1
P  X   xi .
If x % xn, then we have similarly
FX   x  
n
=
i  1
P  X   k   =
x" S
P  X   x   1,
and ifx $ x1 we haver X & xx L r X $ x1x , and thus
FX   x   P  X & x & P  X $ x1   1  P  X ' x1   1 
n
=
i  1
P  X   xi   1  1   0.
We collect these observations into a single theorem statement which is universally true forall random
variables. A rigorous proof is omitted as, although it is not too difficult, it would require the analysis of
convergent sequences, which you will not have learnt yet in your Analysis course.
Theorem 4.1(Properties of cdfs). For any random variableX, its distribution functionFX satisfies:
1. For allx $ y, FX   x & FX   y , i.e.,FX is non-decreasing.
2. Asx increases to  , FX   x approaches 1, i.e.,limx   FX   x   FX       1.
3. Asx decreases to , FX   x approaches 0, i.e.,limx   FX   x   FX       0.
4. As x approachesx0 " R from the right,FX   x approachesFX   x0 , i.e.,FX is right-continuous.
(Non-examinable)
Remark:
We do not have the mathematical tools to discuss property 4 rigorously (yet). For this course we can simply
observe that in the case of a discrete random variableX with S   r x1,...,x nx , wherex1 $ x2 $ ... $ xn
are in increasing order,
FX   x   P  X & x   P  X & xk
holds for allxk & x $ xk 1, i.e. all the wayup toxk 1 but not forx   xk 1 itself. In Figure 15, this is
highlighted by the black bullet markers.
Theorem 4.2(Probabilities of intervals). LetX be a real-valued random variable with cdfFX. Then for
any a,b " R such thata & b, we have
P  X "   a,b    FX   b  FX   a ,
(where   a,a    o ).
Proof. By using the cdfFX, we can obtain the probabilities for the event thatX takes a value in the
interval   a,b  as
P  X "   a,b    P r X % ax = r X & bx
  1  P r X & ax < r X % bx [complement + De Morgan]
  1  P r X & ax  P r X % bx [disjoint]
  P  X & b  P  X & a [complement]
  FX   b  FX   a ,
completing the proof.
Before concrete examples of well-known distributions, we need to state one more fundamental result which
essentially provides a method for defining continuous random variables, and distributions, rigorously.
42
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 46 =====
Theorem 4.3(Defining cdfs). For anyF which has the properties 1–4 of Theorem 4.1, there exists a
random variableX whose cdf isF, i.e., for allx " R, P  X & x   FX   x .
Proof. Omitted.
Thus we can take any function having properties 1–4 of Theorem 4.1, and be assured that it will be the
distribution function of some random variable.
Example 4.6. Take the cdf
FX   x  
~
0 x $ 0,
1
8 0 & x $ 1,
1
2 1 & x $ 2,
7
8 2 & x $ 3,
1 x ' 3,
illustrated in Figure 15. How can we obtain the pmf from the cdf?
We see that for anyx $ 0, FX   x   P  X & x   0, from which we conclude thatP  X $ 0   0, but
FX   0   P  X & 0   1
8, so by the containment rule, asr X   0x L r X & 0x , we have
P  X   0   P  X & 0  P r X & 0x = r X j 0x
  P  X & 0  P  X $ 0   1
8  0   1
8.
Similarly we can conclude that
P  X   1   P  X & 1  P r X & 1x = r X j 1x
  P  X & 1  P  X $ 1
  1
2  1
8   3
8,
and then similarly thatP  X   2   3
8, P  X   3   1
8, and that for anyx  r 0, 1, 2, 3x , P  X   x   0,
which gives back the pmf in Example 4.4.
4.3 Common discrete random variables
We introduce some common discrete probability distributions. (Note that this can be done by giving the
probability mass function, without any mention of the underlying probability space  Ω, F, P .)
4.3.1 Bernoulli random variables
A particularly simple experiment is one in which there are only two possible outcomes. Examples of such
pairs of random outcomes are heads or tails, success or failure, defective or not defective, and so on. It is
convenient to label the two possible outcomes as1 (usually the success) and0 (usually the failure). Such
an experiment is called aBernoulli10 trial.
Definition 4.6 (Bernoulli distribution). A discrete random variableX is said to have theBernoulli
distribution with parameterp "  0, 1 , written asX  Ber  p , if its pmf is given by
fX   x   P  X   x  
~
1  p for x   0,
p for x   1,
0 otherwise.
(35)
That is, P  X   1   p and P  X   0   1  p. The statement X  Ber  p should be read as “the
random variableX has the Bernoulli distribution with parameterp” so that “ ” corresponds to “has the
distribution”.
10Jacob Bernoulli (1654 - 1705).
43
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 47 =====
Notice that ifY   1  X then
P  Y   1   P  1  X   1   P  X   0   1  p
P  Y   0   P  1  X   0   P  X   1   p,
implying Y  Ber  1  p .
It is straightforward to compute the cumulative distribution function of a Bernoulli distribution: given
X  Ber  p ,
FX   x   P  X & x  
~
0 for x $ 0,
1  p for 0 & x $ 1,
1 for x ' 1.
(36)
4.3.2 Binomial random variables
The Binomial distribution models the number of successes inn independent Bernoulli trials, each trial
having the same success probabilityp "  0, 1 . Examples of such collections of random outcomes are the
number of heads (or tails) inn tosses of a coin, the number of successes or failures out ofn trials, the
number of defective (or non-defective) items out ofn total items, and so on.
Definition 4.7 (Binomial distribution). A discrete random variableX is said to have thebinomial
distribution with parametersn " N and p "  0, 1 , written asX  Bin  n,p  , if its pmf is given by
fX   x   P  X   x   w
 n
x px  1  p n x for x " r 0, 1,...,n x ,
0 otherwise.
(37)
Probability mass functions ofBin  n,p  for n   100 and p   1© 10, 1© 2 and 9© 10 are shown in Figure 16.
Example 4.7. Three components are made with each component independently being defective with
probability 1© 4. What is the probability of at least two of them being defective?
There aren   3 independent Bernoulli trials and each trial is a success (i.e., “defective”) with probability
p   1© 4. IfX   r Number of defective componentsx , then we have the modelX  Bin  3, 1© 4 . Hence,
P  X ' 2   P r X   2x < r X   3x
  P  X   2  P  X   3  disjoint events
   3
2  1
4 
2
 3
4 
1
  3
3  1
4 
3
 3
4 
0
 X  Bin  3, 1© 4
  3  1
16  3
4  1
64   5
32.
Remarks:
1. From the binomial expansion, i.e.,
  a  b n  
n
=
x  0
 n
x axbn x,
by settinga   p and b   1  p, we have
n
=
x  0
P  X   x  
n
=
x  0
 n
x px  1  p n x     p    1  p n   1.
2. If n   1, we have a single Bernoulli trial, i.e.,X  Bin  1,p  is equivalent toX  Ber  p .
3. If Y1,...,Y n are independent andYi  Bin  1,p  for alli " r 1,...,n x , then
X  
n
=
i  1
Yi  Bin  n,p  .
44
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 48 =====
Figure 16: The pmf of aBin  n,p  with n   100 and p   1© 10, 5© 10, 9© 10.
45
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 49 =====
4. If the eventr X   xx occurs, then there must have beenx successes andn  x failures in then trials.
As we have seen earlier, there are n
x ways of choosingx out ofn trials to be the successful ones
(the order in which we choose them does not matter). Once we have chosen whichx of the trials
should be successful, and thus whichn  x should be unsuccessful, the probability of this occurring
is px  1  p n x.
5. If X  Bin  n,p  and Y   n  X then Y  Bin  n, 1  p : X is the number of successes inn trials
and Y is the number of failures inn trials withX  Y   n.
6. Knowing the formula for the pmf, it is straightforward to compute also the cdf ofX  Bin  n,p  :
for x " R, if we write x$ for the largest integer smaller than or equal tox, i.e.x “rounded down”
to the nearest integer, then
FX   x   P  X & x  
~
0 for x $ 0,
 x$
=
i  0
 n
i  pi  1  p n i for x $ n
1 for x ' n.
(38)
4.3.3 Geometric random variables
The geometric distribution models the number of independent Bernoulli trialsup to and includingthe
first success. Examples of such collections of random outcomes are the number of coin tosses until the
first head, the number of tested items until you find the first defective one, and so on.
Definition 4.8(Geometric distribution). A discrete random variableX is said to have thegeometric
distribution with parameterp "   0, 1 , writtenX  Geom  p , if its pmf is given by
fX   x   P  X   x   w   1  p x 1p for x " r 1, 2, 3,... x
0 otherwise. (39)
Probability mass functions ofGeom  p for p   1© 10, 1© 2 and 9© 10 are illustrated in Figure 17.
Remarks:
1. If the eventr X   xx occurs, then the firstx  1 trials must have been failures, each independently
with probability 1  p, and thexth trial is a success, independently with probabilityp.
2. There are alternative formulations of the geometric distribution. For example, we might letY be
the number of independent Bernoulli trialsstrictly beforethe first success. In this case
P  Y   y     1  p yp
for eachy " r 0, 1, 2,... x . Notice that ifX  Geom  p , thenY   X  1.
Unlike for the Bernoulli or Binomial distribution, the set of possible values for a Geometric distribution is
countably infinite. This makes the verification of< 
x  1 P  X   x   1 a bit more complicated. To this end,
we need the following geometric series theorem (which you may have met before).
Theorem 4.4(Geometric series Theorem). For anyr j 1 we have
n
=
i  0
ri   1  rn 1
1  r , (40)
and if ¶ r¶ $ 1, then

=
i  0
ri   1  r  r2  r3  ...   1
1  r. (41)
Proof. The proof is omitted.
46
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 50 =====
Figure 17: The pmf of aGeom  p with p   1© 10, 5© 10, 9© 10.
47
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 51 =====
Example 4.8. Suppose thatX  Geom  p . Then

=
k  1
P  X   k  

=
k  1
  1  p k 1p  pmf of Geom  p
  p

=
k  1
  1  p k 1
  p

=
j  0
  1  p j  let j   k  1
  p  1
1    1  p 
   1.  taker   1  p "   0, 1 for Geometric Series
Thus the sum of probabilities in the pmf of a Geometric distribution is1, as it should be.
Example 4.9. Suppose thatX  Geom  1© 4 .
1. Find P  X % 2 .
As X  Geom  1© 4 , we have (Definition 4.8)
P  X   x    3
4 
x 1
 1
4 
for eachx " r 1, 2, 3,... x . By the probability of complements, we haveP  E   1  P  Ec , and if we
takeE   r X % 2x then Ec   r X & 2x yielding
P  X % 2   1  P  X & 2
  1  P r X   1x < r X   2x r X & 2x   r X   1x < r X   2x
  1    P  X   1  P  X   2  disjoint events
  1   1
4 
   3
4 
  1
4 
  pmf of Geom  1© 4 for x   1, 2
  1  1
4  7
4   9
16.
Notice that 9
16    3
4 
2
, i.e., the squared probability of failure.
2. Find P  X % 3 .
With the same reasoning as in point 1.,
P  X % 3   1  P  X & 3
  1  P r X   1x < r X   2x < r X   3x
  ...
  1    1
4 
   3
4 
  1
4 
   3
4 
2
 1
4 
 
  1  1
4  37
16   27
64    3
4 
3
,
i.e., the cubed probability of failure.
Example 4.10(Generalisation of Example 4.9). Letn be a positive integer and suppose thatX  Geom  p .
Find P  X & n and P  X % n .
As we noticed in the previous example,r X % nx is exactly equivalent to obtaining no successes in the first
n trials, so we can immediately say thatP  X % n     1  p n and therefore P  X & n   1    1  p n.
48
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 52 =====
However, to practice calculating sums and check that our logic is sound, we can do things step by step
again. Notice that r X & nx    n
x  1r X   xx which is a union of disjoint events so that
P  X & n  
n
=
x  1
P  X   x
 
n
=
x  1
  1  p x 1p  as X  Geom  p
  p
n
=
x  1
  1  p x 1
  p
n 1
=
i  0
  1  p i.  set i   x  1 (42)
The sum in Equation(42) is of the formSn 1   < n 1
i  0 ri where r   1  p. Thus, by Equation(40) and
Theorem 4.4,
P  X & n   p  1    1  p n
1    1  p 
   1    1  p n. (43)
As r X % nx   r X & nx c, we have by Equation (43),
P  X % n     1  p n.
Both results match the answers we expected.
We have thus proved the formula the cdf ofX  Geom  p : forx " R, writing  x$ for the largest integer
smaller than or equal tox, i.e.x “rounded down” to the nearest integer, we have
FX   x   P  X & x   w 0 for x $ 1,
1    1  p  x$ for x ' 1. (44)
Example 4.11. Billy Forgetful independently remembers to attend each lecture with probabilityp   0.3.
Let X be the number of lectures up to and including his first attendance.
In this caseX  Geom  0.3 and
P  X % 5     1  0.3 5   0.16807   5 dp ,
P  X & 33   1    1  0.3 33   1    0.7 33   0.99999   5 dp .
4.3.4 Poisson random variables
The Poisson distribution is used in situations where events are happening at a certain rate over a time
period. For example, we might be counting the number of people joining a queue, or the number of
radioactive decay events during a fixed time period.
Definition 4.9(Poisson distribution). A discrete random variableX is said to have a Poisson distribution
with parameterλ "   0,   , written asX  Pois  λ , if its pmf is given by
fX   x   P  X   x  
~
λx
x!e λ for x " r 0, 1, 2,... x
0 otherwise.
(45)
Figure 18 shows examples of the pmfs of Poisson distributions with different values ofλ.
49
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 53 =====
Figure 18: The pmf of aPois  λ with λ   1, 5, 10, 50.
50
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 54 =====
To see that Definition 4.9 gives a valid pmf, we check that

=
x  0
P  X   x  

=
x  0
λx
x!e λ  Poisson pmf
  e λ

=
x  0
λx
x!
  e λeλ  series expansion ofeλ
  1
Example 4.12. Freddie has freshers’ flu, and sneezes at a constant rate of1.2 sneezes per minute. He
needs 20 sneeze-less minutes to fall asleep. He goes to bed at 11pm. What is the probability that he is
asleep by 11.20pm?
We can model the number of Freddie’s sneezes between 11pm and 11.20pm by a Poisson random variable
X of parameter 20  1.2   24. Then
P  Freddie is asleep by 11.20pm   P  X   0   fX   0   e 24
(a very small number). Poor Freddie.
Remark:
Imagine that over a fixed time interval, we have a large numbern of evenly spread Bernoulli trials all
with a small probability of successp. Then we expect approximatelynp successful events over the time
interval, which will occur at roughly a constant rate. Indeed it can be shown that for largen and smallp,
Bin  n,p  and Pois  np are almost identical.
Example 4.13. A typesetter, on average, makes one error in every 500 words typeset. A typical page
contains 300 words. What is the probability that there will be no more than two errors in five pages?
If we assume that setting a word is a Bernoulli trial with success probabilityp   1© 500 (notice that we are la-
beling an error as a “success”) and that the trials are independent, thenX   r number of errors in 5 pagesx
is distributed according to a Binomial distribution with parametersn   1500 (5 pages corresponds to
5  300   1500 words) andp   1© 500. Thus
P  no more than two errors   P  X & 2
 
2
=
x  0
 1500
x   1
500 
x
 499
500 
1500 x
  0.4230   4 dp ,
which is a fairly cumbersome calculation. If we use the Poisson approximation withλ   np   1500© 500   3,
we have
P  X & 2 
2
=
x  0
e 3 3x
x!   e 3  1  3  9
2 
   0.4232   4 dp .
The distribution function of a Poisson distribution can be written as follows: forX  Pois  λ , with  x$
again representingx rounded down,
FX   x   P  X & x  
~
0 for x $ 0,
 x$
=
i  0
λx
x!e λ for x ' 0.
(46)
Remark:
We often think ofλ as the average number of successes over a time interval, but time could be replaced,
e.g., by area or volume. For example, in 1946, R. D. Clarke showed11 that in Germany’s flying-bomb
11Accessed on 27 Aug 2021: https://www.actuaries.org.uk/system/files/documents/pdf/0481.pdf
51
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 55 =====
attack on London in World War II, the number of bomb hits per1
4 square mile areas in south London were
close to a Poisson random variable with parameterλ   536
576, suggesting that the hits were not clustered,
but rather randomly scattered.
0.00
0.05
0.10
0.15
0.20
0 1 2 3 4 5 6 7 8 9 10 11
Number of accidents per day
Pmf of the number of accidents per day
Figure 19: Pmf ofPois  4.18 and scaled road accident counts per day in Westminster in 2019.
Example 4.14.The number of road accidents at a busy junction can be modelled by a Poisson distribution.
Figure 19 shows ahistogram (grey bars) of the number of road accidents per day in Westminster12 in
the year 2019. The histogram shows how many days there have been in a year with a given number of
accidents. To enable the comparison with a Poisson pmf, the day counts are divided by the total number
of days, so that they sum to 1 like a pmf. The red curve shows the pmf ofPois  4.18 . Although the fit is
not perfect, the Poisson model seems reasonable.
We do not go into the details of how the valueλ   4.18 was found (spoiler alert: wait until the second
semester), but once we have it, we can conclude that on average, just over 4 road accidents per day occur
in Westminster.
4.4 Joint distributions and independence of discrete random variables
4.4.1 Joint and marginal distributions
Suppose thatX and Y are two discrete random variables defined on the same sample spaceΩ. Then each
ω " Ω yields a valueX  ω   x for X and Y   ω   y for Y so that we can regard the outcome to be a pair
  x,y  . The probability ofX and Y taking valuesx and y is
P  X   x,Y   y   P r ω " Ω  X  ω   x, Y  ω   yx .
Example 4.15. We roll two fair dice. LetX be the sum of the two rolls, and letY be the product of the
two rolls. Then
Ω   r  a,b   a,b " r 1, 2, 3, 4, 5, 6xx
12Data can be found from (accessed on 5 Aug 2022): https://data.gov.uk/dataset/cb7ae6f0-4be6-4935-9277-
47e5ce24a11f/road-safety-data.
52
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 56 =====
and, for example,
P  X   4,Y   3   P  ω     1, 3 or ω     3, 1   2
36   1
18.
Definition 4.10(Joint probability mass function). Let X and Y be discrete random variables defined
on the sample spaceΩ with sets of possible valuesSX and SY, respectively. Thejoint probability mass
function of X and Y is defined for allx,y " R as
fX,Y   x,y    P  X   x,Y   y .
Thus
=
x" SX
=
y" SY
fX,Y   x,y    =
x" SX
=
y" SY
P  X   x,Y   y   1
and fX,Y   x,y    0 for all   x,y  such that eitherx  SX or y  SY.
If SX   r x1,x 2,...,x nx and SY   r y1,y 2,...,y mx then the double summation above can be written as
< n
i  1 < n
j  1 P  X   xi,Y   yj   P  X   x1, Y   y1    P  X   x1, Y   ym
 P  X   x2, Y   y1    P  X   x1, Y   ym  
 P  X   xn, Y   y1    P  X   xn, Y   ym ,
and this can be extended to countably infiniteSX and SY.
Notice that the eventsr Y   y1x , r Y   y2x ,..., r Y   ymx form a partition ofΩ, and thus, by the law of
total probability, we can find themarginal distribution(or marginal pmf) ofX by summingfX,Y   x,y 
over each possible value ofY:
fX   x   P  X   x   =
y" SY
P r X   xx ¶ r Y   yx P r Y   yx
  =
y" SY
P r X   xx = r Y   yx
  =
y" SY
P  X   x,Y   y
  =
y" SY
fX,Y   x,y 
The marginal pmf ofY is found analogously by summing overX.
We don’t give a formal definition ofmarginal distributionbecause there isn’t one - themarginal distribution
of X is just the distribution ofX, but using the wordmarginal implies thatX was introduced via its
joint distribution with some other random variable(s).
Example 4.16. Suppose that the discrete random variablesX and Y have a joint pmf
P  X   2, Y   0   1© 8
P  X   1, Y   1   1© 4
P  X   0, Y   2   1© 4
P  X   0, Y   1   1© 4
P  X   0, Y   0   1© 8,
with P  X   x, Y   y   0 for all other values ofx and y. Find the marginal distributions ofX and Y.
We have
P  X   2   P  X   2, Y   0   1© 8,
P  X   1   P  X   1,Y   1   1© 4
and
P  X   0   P  X   0, Y   0  P  X   0, Y   1  P  X   0, Y   2   1
8  1
4  1
4   5
8.
We also have
P  Y   2   P  X   0, Y   2   1© 4,
53
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 57 =====
P  Y   1   P  X   1, Y   1  P  X   0, Y   1   1
4  1
4   1
2
and
P  Y   0   P  X   2, Y   0  P  X   0, Y   0   1
8  1
8   1
4.
One possible way of generating random variablesX and Y with this joint distribution is to toss a fair
coin three times, and letX be the number of times we see two heads in a row, andY be the number of
times we see eitherHT or TH.
Example 4.17. Suppose that the discrete random variablesX and Y have a joint pmf
P  X   x, Y   y   w
2x y
36 if x " r 0, 1, 2x and y " r 1, 2, 3x ,
0 otherwise.
Find the marginal distributions ofX and Y.
The marginal distribution forX is, for eachx " r 0, 1, 2x ,
P  X   x  
3
=
y  1
P  X   x,Y   y
 
3
=
y  1
2x  y
36
  1
36  6x 
3
=
y  1
y
  6x  1  2  3
36   x  1
6 .
The marginal distribution forY is, for eachy " r 1, 2, 3x ,
P  Y   y  
2
=
x  0
P  X   x,Y   y
 
2
=
x  0
2x  y
36
  1
36
2
=
x  0
  2x  y
  0  2  4  3y
36   2  y
12 .
We can represent our values in ajoint distribution table:
Y
1 2 3 P  X   x
0 1
36
2
36
3
36
6
36
X 1 3
36
4
36
5
36
12
36
2 5
36
6
36
7
36
18
36
P  Y   y 9
36
12
36
15
36 1
Besides the joint pmf, we can also define the joint cdf, which will be used in the definition of independence
for random variables in the next section; and useful also for working with continuous distributions.
Definition 4.11(Joint cumulative distribution function). Let X  Ω   SX an Y  Ω   SY be random
variables defined on the same probability space. The function
FX,Y   x,y    P  X & x,Y & y
is the joint cumulative distribution function ofX and Y.
54
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 58 =====
Remark:
The joint cdf has similar properties to the standard cdf:
a. FX,Y is non-decreasing in each co-ordinate, i.e.,
FX,Y   x  a,y  b ' FX,Y   x,y 
for anya,b ' 0.
b. FX,Y    ,     1.
c. FX,Y    ,y    FX,Y   x,     0 for anyx and y.
(Be careful with b and c. For example, it isnot true thatFX,Y    ,y    FX,Y   x,     1 for anyx and
y. Why not?)
4.4.2 Independence of random variables
The independence of events can be extended to define independence between random variables.
Definition 4.12(Independent random variables). LetX  Ω   SX andY  Ω   SY be random variables
on the same sample spaceΩ. We say thatX and Y are independent if
P  X & x, Y & y   P  X & x P  Y & y for allx,y " R. (47)
Remark: We can write independence in terms of cdfs. Suppose thatX and Y have cdfsFX and FY
respectively, and joint cdfFX,Y. That is,
FX   x   P  X & x , FY   y   P  Y & y , and FX,Y   x,y    P  X & x, Y & y .
Then X and Y are independent if
FX,Y   x,y    FX   x FY   y for allx,y " R.
For discrete random variables, we have the pmf available as well as the cdf, and it is often easier to work
with the pmf. The good news is that the definition of independence for discrete random variables can also
be written easily in terms of the pmf.
Theorem 4.5(Independent discrete random variables). LetX  Ω   SX and Y  Ω   SY be discrete
random variables. ThenX and Y are independent if and only if
P  X   x,Y   y   P  X   x P  Y   y for allx " SX, y " SY. (48)
We can also write this in terms of pmfs: if the pmfs ofX and Y arefX and fY, and they have joint pmf
fX,Y, thenX and Y are independent if and only if
fX,Y   x,y    fX   x fY   y for allx,y " R.
Note that ifSX,Y   r  x,y   x " SX,y " SY x then fX,Y   x,y    0 for all   x,y   SX,Y and when this
occurs at least one ofP  X   x and P  Y   y is zero (as at least one ofx, y is not possible). This means
that we can restrict our attention to the set of possible values ofX and Y only, i.e.SX and SY, as in the
first part of the theorem.
The proof of this theorem is a little bit longer than the proofs we have seen so far. Before we carry out
the proof, we will look at some examples.
Example 4.18. Roll a fair dice twice. LetX be the result of the first roll andY be the result of the
second roll. Show thatX and Y are independent.
This is a case of showing the obvious, but lettingΩ   r  a,b   a,b " r 1, 2, 3, 4, 5, 6xx , for anyx,y "
r 1, 2, 3, 4, 5, 6x we have
P  X   x, Y   y   P  ω     x,y    1
¶ Ω¶   1
36,
55
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 59 =====
whereas
P  X   x  
6
=
y  1
P  X   x, Y   y  
6
=
y  1
1
36   1
6
and similarly P  Y   y   1© 6. Thus
P  X   x, Y   y   1
36   1
6  1
6   P  X   x P  Y   y .
By Theorem 4.5 this tells us thatX and Y are independent.
LetZ be the sum of the two rolls. Show thatX and Z are not independent.
Again this seems clear, since ifX is small,Z is likely to be small. To show it rigorously we need to findx
and z such that P  X   x, Z   z j P  X   x P  Z   z . There are plenty of possibilities, but one trivial
one is that ifX   1, thenZ can’t equal (for example) 12; thus
P  X   1, Z   12   0
but P  Z   12   P  ω     6, 6   1© 36 so
P  X   1 P  Z   12   1
6  1
36   1
216 j 0.
So indeed, by Theorem 4.5,X and Z are not independent.
Example 4.19. LetX, Y be discrete random variables taking values inr 1, 2, 3,... x with a joint pmf
P  X   x,Y   y   3x
4x y.
Show thatX and Y are independent.
Notice that
P  X   x  

=
y  1
3x
4x y    3
4 
x 
=
y  1
 1
4 
y
    3
4 
x 1
 1
4 
  

=
y  1
 1
4 
y 1
 3
4 
 
   3
4 
x 1 1
4,
where the final equality holds because the sum is over the pmf ofGeom  3© 4 and hence equal to 1. Thus,
X  Geom  1© 4 . Similarly we can show that
P  Y   y    1
4 
y 1 3
4,
so thatY  Geom  3© 4 .
For allx,y " r 1, 2, 3,... x ,
P  X   x, Y   y   3x
4x y    3
4 
x
 1
4 
y
   3
4 
x 1 3
4  1
4 
y 1 1
4
    3
4 
x 1 1
4    1
4 
y 1 3
4 
  P  X   x P  Y   y ,
so X and Y are independent by Theorem 4.5.
56
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 60 =====
Before we prove Theorem 4.5, it will be useful to have yet another alternative formulation of independence.
Theorem 4.6(Alternative formulation of independence for random variables). Random variablesX 
Ω   SX and Y  Ω   SY are independent if and only if
P  a $ X & b, c $ Y & d   P  a $ X & b P  c $ Y & d for alla $ b " R and allc $ d " R. (49)
We prove this in the case of discrete random variables with finite support. The proof in full generality is
not much more difficult, but requires a small amount of analysis.
Proof. Idea: for any random variableZ and p $ q " R,
r p $ Z & qx   r Z & qx ¯ r Z & px ,
and sincep $ q we haver Z & px L r Z & qx , so
P  p $ Z & q   P  Z & q  P  Z & p .
We will use this many times to change from probabilities likeP  a $ X & b to probabilities likeP  X & b
and P  X & a .
First we show that ifX and Y are independent, then (49) holds. Using the idea above several times,
P  a $ X & b, c$ Y & d   P  X & b, c$ Y & d  P  X & a, c$ Y & d  idea above forX
   P  X & b, Y & d  P  X & b, Y & c
  P  X & a, Y & d  P  X & a, Y & c  idea above forY, twice
   P  X & b P  Y & d  P  X & b P  Y & c
  P  X & a P  Y & d  P  X & a P  Y & c  independence, four times
  P  X & b P  c $ Y & d  P  X & a P  c $ Y & d  idea above forY, twice
  P  a $ X & b P  c $ Y & d .  idea above forX
This proves (49) (and note that it works for any random variables, not only those with finite support).
Now to show that(49) implies independence, ifX and Y are discrete with finite support then we can just
take the smallest valuesa " SX and b " SY. Then we know for sure thatX % a  1 and Y % b  1. Thus
for anyx,y " R, by (49) we have
P  X & x, Y & y   P  a  1 $ X & x, b 1 $ Y & y  since X % a  1 and Y % b  1
  P  a  1 $ X & x P  b  1 $ Y & y
  P  X & x P  Y & y .  since X % a  1 and Y % b  1
So X and Y are independent.
(If X and Y do not have finite support, then we can’t necessarily find a smallesta and b as above, so
we have to do a limiting argument. It’s still fairly straightforward - just outside the scope of this course.
If we have time at the end of the course we will learn a little bit about how probabilities interact with
limits.)
We can now prove Theorem 4.5.
Proof of equivalence of pmf formulation of independence.Again, we will carry out the proof only in the
case thatX and Y are discrete random variables with finite supportSX and SY. Again, the proof for
general X and Y is not much more complicated, but requires limits.
Let us writeSX   r x1,...,x nx and SY   r y1,...,y mx , wherex1 $ x2 $ ... $ xn and y1 $ y2 $ ... $ ym.
1. First suppose thatX and Y are independent. We want to show that (48) holds.
Idea: if we choosea and b appropriately, then we can rewriter X   xix as r a $ X & bx .
We know from Theorem 4.6 that for anya $ b " R and c $ d " R,
P  a $ X & b, c $ Y & d   P  a $ X & b P  c $ Y & d . (50)
57
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 61 =====
Note that if we choosea   xi 1 and b   xi for somei   2,...,n , then
r xi 1 $ X & xix   r X   xix ,
and similarly forj   2,...,m ,
r yj 1 $ Y & yjx   r Y   xjx .
Thus, for anyi   2,...,n and j   2,...,m , by (50) we have
P  X   xi, Y   yj   P  xi 1 $ X & xi, yj 1 $ Y & yj
  P  xi 1 $ X & xi P  yj 1 $ Y & yj
  P  X   xi P  Y   yj .
We can do the same fori   1 and/orj   1 by choosinga   x1  1 and/orc   x1  1. This completes
the proof that independence implies (48).
2. Now suppose that (48) holds. We want to show thatX and Y are independent.
Idea: Write P  X & x as a sum ofP  X   xi over the possible values ofxi that are smaller thanx.
If x $ x1 or y $ y1, then both sides of Equation(47) are zero and P  X & x,Y & y   P  X &
x P  Y & y is trivially true. Otherwise, letp " r 1,...,n x and q " r 1,...,m x be the largest values
for whichxp & x and yq & y.
In this case, by (48),
P  X & x, Y & y  
p
=
i  1
q
=
j  1
P  X   xi, Y   yj
 
p
=
i  1
q
=
j  1
P  X   xi P  Y   yj
  
p
=
i  1
P  X   xi  
q
=
j  1
P  Y   yj   P  X   xi doesn’t depend onj, we can take it out of the second sum
  P  X & x P  Y & y .
This completes the proof that (48) implies independence.
4.4.3 Sums of independent random variables
We know that the sum ofn independent and identical Bernoulli random variables with success probability
p has the Binomial distribution with parametersn and p, but what if the random variables that we add
together are not Bernoulli trials but something else, say rolls of a 6-sided dice.
Consider independentX  Ω   SX   r x1,...,x nx and Y  Ω   SY   r y1,...,y mx . Then for anyk " R
we have
P  X  Y   k   P  r X   x1 = Y   k  x1x <  < r X   xn = Y   k  xnx
 
n
=
i  1
P  X   xi,Y   k  xi  disjoint events
 
n
=
i  1
P  X   xi P  Y   k  xi ,  independence
which leads to the following general result:
Theorem 4.7(Sum of independent discrete random variables). LetX  Ω   SX and Y  Ω   SY be
independent discrete random variables. For allk " R we have
P  X  Y   k   =
x" SX
P  X   x P  Y   k  x .
58
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 62 =====
Example 4.20. LetX  Pois  λ and Y  Pois  µ , for someλ,µ % 0. Find the distribution ofX  Y.
Let k ' 0. We know thatX and Y are both non-negative, so to haveX  Y   k, the value ofX must
certainly be at mostk. Thus
P  X  Y   k  
k
=
i  0
P  X   i, Y   k  i
 
k
=
i  0
P  X   i P  Y   k  i  independence
 
k
=
i  0
e λλi
i! e µ µk i
  k  i !  pmf of Poisson rvs
  e   λ µ
k!
k
=
i  0
 k
i  λiµk i.
We now spot that the sum in the last line is equal to  λ  µ k, so that
P  X  Y   k   e   λ µ   λ  µ k
k! ,
the pmf of aPois  λ  µ random variable. SoX  Y  Pois  λ  µ .
This is not surprising if we recall our interpretation of a Poisson random variable as the number of events
that are happening at a certain rate over a time period. If we have events happening at rateλ, and
independently add on events happening at rateµ, then it intuitively makes sense that the overall rate
should beλ  µ.
Example 4.21. LetX  Bin  n,p  and Y  Bin  m,p  , withn $ m, andX, Y independent. Show that
the distribution ofX  Y is a Bin  n  m,p  .
Proof by interpretation:
Recall the interpretation of a Binomial distribution:X represents the number of successes inn independent
trials, each of which results in a success with probabilityp; similarly,Y represents the number of successes
in m independent trials, each trial being a success with probabilityp. Hence, asX and Y are assumed
independent, it follows thatX  Y represents the number of successes inn  m independent trials when
each trial has a probabilityp of being a success. Therefore,X  Y  Bin  n  m,p  .
Calculations with pmfs:
What if we try to calculate the pmf ofX  Y?
Fork " r 0, 1,...,n  mx ,
P  X  Y   k  
k
=
x  0
P  X   x P  Y   k  x .
Note that ifx % n or k  x % m, the probabilities on the right are0. To make our calculations easier
to write down, we agree on a convention that forr % N,  N
r    0. This makes sense; ifr % N then the
number of ways of choosingr items fromN without replacement is zero.
Then we can write
P  X  Y   k  
k
=
x  0
 n
x px  1  p n x  m
k  x pk x  1  p m k x
  pk  1  p n m k
k
=
x  0
 n
x m
k  x .
But we know that, ifX  Y  Bin  n  m,p  (which we convinced ourselves of above), then
P  X  Y   k   w  n m
k  pk  1  p n m k for k " r 0, 1,...,n  mx
0 otherwise.
59
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 63 =====
It must therefore be true that
k
=
x  0
 n
x m
k  x    n  m
k  .
We have thus proved a purely algebraic expression, known as Vandermonde’s identity, using only probability.
There are other proofs of Vandermonde’s identity (non-examinable):
• Algebraic proof
For anyz " R,
n m
=
k  0
 n  m
k  zk     1  z n m  binomial expansion
    1  z n  1  z m
  
n
=
i  0
 n
i  zi 
m
=
j  0
 m
j  zj  binomial expansion
   n
0 z0   n
1 z1   n
2 z2  ...   n
n zn  m
0  z0   m
1  z1   m
2  z2  ...   m
m zm
   n
0 m
0  z0   n
0 m
1    n
1 m
0  z1
  n
0 m
2    n
1 m
1    n
2 m
0  z2  ...
Looking at the coefficient ofzk in the above expansion, we see that it can be written as
 n
0 m
k    n
1 m
k  1   n
2 m
k  2  ...   n
k m
0   
k
=
x  0
 n
x m
k  x .
Since this holds for all values ofz, it must be true that
 n  m
k   
k
=
x  0
 n
x m
k  x .
• Combinatorial proof
Suppose there arem black balls andn red balls in an urn, and you want to pickk balls out of these
n  m to put in another urn, without replacement and withk " r 0, 1,...,n  mx .
– You can extract them in n m
k  ways (unordered sampling without replacement).
– Another strategy would be to first choosex black balls out ofm, withx & k, andk  x red
balls out ofn red balls, and you have n
x m
k x ways of doing this. But then you still have the
choice of whatx is, so there are< k
x  0  n
x m
k x options in total.
This is two ways of counting the same thing, and therefore
 n  m
k   
k
=
x  0
 n
x m
k  x .
5 Continuous random variables
In the previous section, we saw that pmfs are a natural way to describe discrete random variables; but
they are not useful at all for continuous random variables. Indeed, ifX is a continuous random variable,
then usually P  X   x   0 for allx, so the pmf is identically zero. However, we also saw, in Theorems 4.1,
4.2 and 4.3 that we can characteriseany random variable by simply stating its cumulative distribution
function (cdf). We will now give a review of some of the most common distributions of continuous random
variables via their cdfs.
60
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 64 =====
5.1 Common continuous random variables
5.1.1 Uniform distribution
The uniform distribution can be regarded as a continuous analogue of the equally likely outcomes in finite
sample spaces that we saw in Section 2, such as tossing a coin, rolling a fair die, or drawing a card from a
well shuffled deck. In the discrete case, the probability of an event was proportional to the number of
points in the event; similarly, the probability that a uniform random variable lies within an interval is
proportional to the length of the interval. We define it as follows (see Figure 20 for illustration):
Definition 5.1(Uniform distribution). Suppose thata,b " R satisfy a $ b. We say that the random
variableX has aUniform distribution on the interval a,b  ,X  Unif  a,b  , if its cumulative distribution
function is
FX   x   P  X & x  
~
0, x & a,
x  a
  b  a , a $ x & b,
1, x % b.
Figure 20: The cdf of aUnif  a,b  .
To verify that Definition 5.1 gives a valid cdf (recalling Theorem 4.1), we note thatFX as defined above
is continuous (we will not check this rigorously in the sense of epsilons and deltas, but it is constant on
x & a and x ' b, linear onx "  a,b  , and continuous atx   a and x   b). Moreover, for anyx,y "  a,b  ,
such thatx $ y, we have
0 & x  a
b  a $ y  a
b  a & 1,
so FX is non-decreasing. Finally, we observe thatFX       FX   b   1 and FX       FX   a   0, so
FX is a valid distribution function.
Remark: Let u,v " R satisfy a & u $ v & b. Then, by Theorem 4.2,
P  X "   u,v    FX   v  FX   u
  v  a
b  a  u  a
b  a
  v  u
b  a,
so we see thatP  X "   u,v  depends only on the lengthv  u of the interval, and not on the location of
the interval. In other words, all intervals u,v  of equal length are equally likely and in this sense the
distribution isuniform.
61
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 65 =====
Example 5.1. An important special case of uniform distribution isX  Unif  0, 1 which can be used
for constructing more complicated random variables. The cdf ofUnif  0, 1 is
FX   x  
~
0, x & 0
x, 0 $ x & 1
1, x % 1.
Example 5.2. LetX  Unif  0, 1 . Find the distribution ofY   360X.
P  Y & y   P  360X & y   P  X & y
360 	  
~
0, y & 0,
y
360, 0 $ y & 360,
1, y % 360,
so we see thatY  Unif  0, 360 .
5.1.2 Exponential distribution
Exponential random variables are often used for modelling the time one has to wait until the occurrence
of a specific event. Examples of physical phenomena that follow closely an exponential distribution are the
time between the decay of atoms in a radioactive sample, the time between the arrival of two consecutive
customers arriving at a till, or the time between phone calls to a customer service line. It can loosely
be thought of as a continuous counterpart to the geometric distribution. We define the exponential
distribution as follows (see Figure 21 for illustration).
Definition 5.2(Exponential distribution). A random variableX has anExponential distribution with
parameter λ % 0, X  Exp  λ , if its cumulative distribution function is
FX   x   P  X & x   w 0, x $ 0,
1  e λx, x ' 0.
As ex is a continuous function, andFX   0   1  e0   1  1   0, we conclude thatFX in Definition 5.2 is
continuous as well. Moreover, ase λx is decreasing inx when λ % 0, we see thatFX is non-decreasing.
Finally, FX       FX   0   0 and FX       1  limx   e λx   1, so FX is a valid cumulative
distribution function.
Example 5.3. Max the Mechanic has noticed that the numberNt of customers that have visited her
garage by timet after opening satisfiesNt  Pois  µt . Find the distribution for the (random) timeT that
Max has to wait until the arrival of the first customer of the day.
We can write
r T % tx   r No customers have arrived withint minutesx
  r Nt   0x
and therefore, for allt ' 0 we have
P  T % t   P  Nt   0   e µt,
where the final equality follows from the pmf of a Poisson distribution of parameterµt. Thus P  T & t  
1  e µt, and thereforeT  Exp  µ .
Example 5.4. Suppose thatX  Exp  λ and Y  Exp  µ are independent. LetZ   minr X,Y x . What
is the distribution ofZ?
P  Z % z   P  minr X,Y x % z   P  X % z,Y % z   P  X % z P  Y % z   e λze µz   e   λ µ z,
so P  Z & z   1  e   λ µ z, and thereforeZ  Exp  λ  µ .
62
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 66 =====
Figure 21: The cdf of anExp  λ for λ   1© 2, 1, 5, 10.
Example 5.5. Suppose thatX  Exp  λ . Letx,y % 0. Calculate P  X & x  y ¶ X % x .
P  X & x y ¶ X % x   P  x $ X & x  y
P  X % x   FX   x  y  FX   x
1  FX   x   1  e λ  x y    1  e λx
e λx   1 e λy   P  X & y .
This is called thememoryless property of the exponential distribution: ifX is exponentially distributed
with parameterλ, and we know thatX is larger thanx, thenX  x is again exponentially distributed
with parameterλ.
5.1.3 Normal distribution
One of the most frequently-used continuous random variables is thenormal or Gaussian distribution13
which we define as follows (see Figures 22, 23 and 24 for illustration).
Definition 5.3 (Normal distribution). For anyµ " R and σ2 "   0,   , a random variableX has a
Normal or Gaussian distribution with parametersµ and σ2, X  N  µ,σ 2 , if its cumulative distribution
function is
FX   x   P  X & x   E
x

1Ó
2πσ2
e 1
2σ2   u µ 2
du.
As an integral of a continuous function,FX in Definition 5.3 is continuous. Moreover, because the
13Johann Carl Friedrich Gauss (1777-1855).
63
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 67 =====
Figure 22: The cdf of anN  µ,σ 2 for µ   0 and σ2   1.
integrand is positive, we have for anyx,y " R such thatx $ y
FX   y   E
y

1Ó
2πσ2
e 1
2σ2   u µ 2
du
  E
x

1Ó
2πσ2
e 1
2σ2   u µ 2
du  E
y
x
1Ó
2πσ2
e 1
2σ2   u µ 2
du
' E
x

1Ó
2πσ2
e 1
2σ2   u µ 2
du   FX   x ,
so FX is non-decreasing. The proof of
FX       E


1Ó
2πσ2
e 1
2σ2   u µ 2
du   1, (51)
is technical and requires skills beyond this course and hence the proof is omitted. However, from this it can
also be shown thatFX       0 (the proof is omitted) and henceFX is a valid cumulative distribution
function.
Remarks:
1. Although the cumulative distribution function of a normal distribution cannot be written in terms
of common functions, it is perhaps the most commonly encountered distribution in applications,
because of itsuniversality as a limit; you will see this in the form of the Central Limit Theorem in
semester 2.
2. The distribution N  0, 1 is typically referred to as thestandard normal distributionand its
cumulative distribution function is typically denoted byΦ.
3. Accurate and efficient numerical approximations ofΦ are implemented in all major computing
software. By appropriate transformations, the distribution function for any normal distribution can
be evaluated.
5.2 Probability density functions
Cumulative distribution functions (cdfs) offer a consistent characterisation of distributions and indepen-
dence across discrete and continuous random variables. However, they are not well-suited to visualising
distributions, and are often less intuitive to use than probability mass functions (pmfs) for discrete random
variables. We would, therefore, like a suitable continuous analogue to the pmf. This is the role of the
probability density function (pdf).
64
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 68 =====
Figure 23: The cdf of anN  µ,σ 2 for µ    1, 0, 1 and σ2   1.
65
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 69 =====
Figure 24: The cdf of anN  µ,σ 2 for µ   0 and σ2   1© 16   0.0625 , 1© 4   0.25 , 1, 4.
Definition 5.4(Probability density function). Let X be a continuous random variable with supportS
and cumulative distribution functionFX. If there exists a functionf  R    0,   such thatf   x   0
for allx ©" S and
FX   x   E
x

f   u du, (52)
for allx " R, thenf is said to be aprobability density function (pdf)for X. We sometimes writefX for
the pdf of a continuous random variableX, in line with the notation for the pmf of a discrete random
variable.
Remarks:
1. By Definition 5.4, the probability density function is not unique because individual points off can
be changed without changing the value of the integral in Equation (52). Typically, the probability
density function is assumed to refer to the right-continuous functionf that satisfies Equation(52).
2. By Theorem 4.2, we see that the probability of the eventX "   a,b  can be obtained by integrating
the probability density function ofX over the interval  a,b  , i.e.,
P  X "   a,b    FX   b  FX   a   E
b

fX   u du  E
a

fX   u du   E
b
a
fX   u du. (53)
This means that the probability of the event  a,b  is thearea under the probability density
function across   a,b  , as illustrated in Figure 25.
3. We also see that
1   FX       E


f   u du,
i.e. the total area under the probability density function is always equal to1.
4. In all the cases (of continuous random variables) that we have met so far,fX is more or less
the derivative ofFX; that is, the pdf is the derivative of the cdf. This is not a coincidence; the
Fundamental Theorem of Calculus says that under certain conditions, integration and differentiation
are inverse operations. But since we haven’t met the Fundamental Theorem of Calculus yet, we
66
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 70 =====
don’t know what those conditions are. And even in the simple case of the uniform distribution,FX
is not differentiable at eithera or b, so it is notquite true to say thatfX is the derivative ofFX
(though it is true at all but those two points).
Figure 25: Integrating the probability density function over the interval  a,b  .
Following these observations, and with the convention that the pdf is the right-continuous functionfX
satisfying Equation(52), we find the following densities for uniform, exponential and normal distributions.
Theorem 5.1(PDF of a uniform distribution). If X  Unif  a,b  , then
fX   x  
~
1
b  a, a & x $ b
0, otherwise.
is the probability density function (pdf) ofX.
Proof. Let FX be the cumulative distribution function ofUnif  a,b  . We need to consider three cases:
1. x $ a,
2. a & x $ b, and
3. x ' b.
Case 1: for x $ a,
E
x

fX   u du   E
x

0 du   0   FX   x .
Case 2: for a & x $ b,
E
x

fX   u du   E
a

0 du  E
x
a
1
b  a du   0  x  a
b  a   FX   x ,
Case 3: for x ' b,
E
x

fX   u du   E
a

0 du  E
b
a
1
b  a du  E
x
b
0 du   0  b  a
b  a  0   1   FX   x ,
from which we conclude thatfX satisfies Equation (52) for the uniform distribution functionFX.
Theorem 5.2(PDF of an exponential distribution). If X  Exp  λ , then
fX   x   w λe λx, x ' 0
0, otherwise.
is the probability density function (pdf) ofX.
67
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 71 =====
Proof. Let as an exercise.
Theorem 5.3(PDF of a normal distribution). If X  N  µ,σ 2 , then
fX   x   1Ó
2πσ2
e 1
2σ2   x µ 2
¾ x " R.
is the probability density function (pdf) ofX.
Proof. Obvious from the definition of the distribution function forX.
Figure 26: Cumulative distribution functions and probability density functions ofUnif  a,b  , Exp  10
and N  0, 1 distributions.
Example 5.6(Examples of cumulative distribution and probability density functions). Consider distri-
butions Unif  a,b  , Exp  λ and N  µ,σ 2 , whereλ   10, µ   0, andσ2   1. The cumulative distribution
and probability density functions for each of these distributions are shown in Figure 26.
Example 5.7. LetX  Exp  λ , whereλ   1. Find P  X "  1, 2 .
By Equation (53),
P  X "  1, 2   E
2
1
e udu   FX   2  FX   1   e 1  e 2  0.2325   4 dp ,
68
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 72 =====
x
F X ( x )
0.00
0.25
0.50
0.75
1.00
0 1 2 3 4 5
0.632121
0.864665
x
f X ( x )
0.0
0.1
0.2
0.3
0.4
0.5
0.6
0.7
0.8
0.9
1.0
0 1 2 3 4 5
A = 0 . 2325
Figure 27: Probability of an eventX "  1, 2 for an exponential random variable of parameter1.
as illustrated in Figure 27.
Example 5.8(Example 4.14 revisited). The time between consecutive road accidents can be modelled as
an exponentially distributed random variableT  Exp  λ for someλ.
Figure 28 shows a histogram of the times between consecutive road accidents of Example 4.14. The
histogram is scaled to match probability density (i.e., the area under the histogram is equal to 1). The
picture also shows the probability density function of an exponential distribution whose parameter has
been chosen appropriately so that the density matches the histogram as well as possible14. The exponential
distribution appears to be a good model for the time between road accidents.
5.3 Joint distributions and independence of continuous random variables
5.3.1 Joint distributions
As with discrete random variables, it may be the case that we have two continuous random variablesX
and Y defined on the same probability spaceΩ and we need to calculate probabilities such as
P  X "   a,b  ,Y "   c,d  . (54)
We can do this using the joint cdf forX and Y, defined in Definition 4.11:
FX,Y   x,y    P  X & x, Y & y .
Recall that the Definition 5.4 of a probability density function for a single random variable relied on
integration. Similarly, the definition of ajoint probability density function relies on integration over a
two dimensional domain.
Definition 5.5(Joint probability density function). LetX  Ω   SX anY  Ω   SY be random variables
defined on the same probability space. A functionf which satisfies
FX,Y   x,y    P  X & x, Y & y   E
x

E
y

f   u,v  dv du, (55)
14Finding this parameter value is a topic in more advanced statistics.
69
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 73 =====
0.00
0.05
0.10
0.15
0.20
0 10 20 30 40 50
Time between accidents (hours)
Density
Figure 28: Histogram for the times between consecutive road accidents, and the probability density
function of an exponential distribution with well-chosen parameter.
is a joint probability density function ofX and Y. We sometimes writefX,Y for the joint pdf ofX and
Y, in line with the notation for the joint pmf of two discrete random variables.
One subtle issue we face is about the definition of thedouble integralin (55). In particular, it is not
at all clear whether the order of integration matters. The way it is written in(55) says that we should
take the functionf   u,v  , integrate overv (holding u fixed, i.e. imagining that it is a constant), and then
integrate the result overu. But does it matter if we first integratef   u,v  overu, holdingv fixed, and
then integrate the result overv? That is, do we have
E
x

 E
y

f   u,v  dv
 du   E
y

 E
x

f   u,v  du
 dv ??
It turns out that the answer is, essentially, yeswhen f is non-negative, but the proof of this would
require some advanced tools. In this course we won’t have to worry, but you should be wary in general
about swapping the order of integration. Integration involves taking limits, so swapping the order of
integration involves exchanging limits, which can go horribly wrong (you may have encountered this in
analysis). Some of the most useful and celebrated results ofmeasure theoryinvolve giving nice conditions
under which limits and integrals can be exchanged.
Example 5.9. Suppose thata   0, b   2, c   0, d   1, and
g  x,y    3
16x2  1
2y.
Find
E
b
a
E
d
c
g  x,y  dydx.
We integrate first with respect toy:
E
1
0
 3
16x2  1
2y
 dy    3
16x2y  1
4y2
1
0
  3
16x2  1
4.
70
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 74 =====
Figure 29: The intuition behind double integrals: as long asg  x,y  is smooth and non-negative, we can
think of the double integral ofg as approximately the sum of the volumes of all the blocks under the
surface; and then it shouldn’t matter whether we sum in thex-direction first and then they-direction, or
vice versa.
Then we integrate with respect tox:
E
2
0
 3
16x2  1
4 
 dx    1
16x3  1
4x
2
0
  1
2  1
2   1.
If we do the integration in different order, we have first
E
2
0
 3
16x2  1
2y
 dx    1
16x3  1
2xy
2
0
  1
2  y
and then
E
1
0
 1
2  y
 dy    1
2y  1
2y2
1
0
  1.
In either case the answer is 1.
Recall from the proof of Theorem 4.6 that
P  a $ X & b, c$ Y & d   P  X & b, c$ Y & d  P  X & a, c$ Y & d
   P  X & b, Y & d  P  X & b, Y & c
  P  X & a, Y & d  P  X & a, Y & c
  FX,Y   b,d   FX,Y   b,c   FX,Y   a,d   FX,Y   a,c  (56)
Moreover,
FX,Y   b,d   FX,Y   b,c    E
b

E
d

fX,Y   x,y  dy dx  E
b

E
c

fX,Y   x,y  dy dx
  E
b

 E
d

fX,Y   x,y  dy  E
c

fX,Y   x,y  dy
 dx
  E
b

E
d
c
fX,Y   x,y  dy dx (57)
and similarly we have
 FX,Y   a,d   FX,Y   a,c     E
a

E
d
c
fX,Y   x,y  dy dx. (58)
By combining Equations (56) – (58) we have
P  X "   a,b  ,Y "   c,d    E
b

E
d
c
fX,Y   x,y  dydx  E
a

E
d
c
fX,Y   x,y  dy dx
  E
b
a
E
d
c
fX,Y   x,y  dy dx,
71
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 75 =====
so we can calculate the probability that our two random variables fall in a pair of intervals by integrating
the joint probability density function over those intervals.
Remarks:
1. We have immediately that the total volume under the joint probability density function is
FX,Y    ,     E


E


fX,Y   x,y  dydx   1.
2. IfX andY have joint probability density functionfX,Y, then we can find themarginal distribution
of X by integrating just overy. That is,
P  X "   a,b    P  X "   a,b  ,Y "    ,     E
b
a
E


fX,Y   x,y  dy dx
or we can calculate themarginal probability density functionof X via
fX   x   E


fX,Y   x,y  dy. (59)
3. The discussion above on the double integrals applies torectangular events, such as
t x,y " R2  x "   a,b  ,y "   c,d z
only – see Figure 30. Non-rectangular events, such as
u x,y " R2  x "   1, 1 ,y "  
Ô
1  x2,
Ô
1  x2{ ,
illustrated in Figure 31, will be discussed in more detail in Semester 2.
Figure 30: A rectangular event.
5.3.2 Independence
Recall the definition of independence of random variables from Definition 4.12: random variablesX and
Y are independent if
P  X & x, Y & y   P  X & x P  Y & y for allx,y " R.
This definition applies to both continuous and discrete random variables. It only uses the cdf, which there
is no problem defining for any random variable.
However, Theorem 4.5 gave us an alternative characterisation of independence for discrete random
variables, in terms of their pmfs. The natural question for continuous random variables is: is there a
similar characterisation of independence in terms of pdfs? The answer is yes.
72
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 76 =====
Figure 31: A non-rectangular event.
Theorem 5.4. Suppose that random variablesX  Ω   SX and Y  Ω   SY have densitiesfX and fY
respectively, and a joint probability density functionfX,Y. If
fX,Y   x,y    fX   x fY   y for allx,y " R,
then X and Y are independent.
Conversely, if we have independent random variablesX and Y with probability density functionsfX and
fY respectively, thenf   x,y    fX   x fY   y is a joint probability density function forX and Y.
Proof. Suppose thatfX,Y   x,y    fX   x fY   y for allx,y " R. Then we have
P  X & x, Y & y   E
x

E
y

fX,Y   u,v  dv du
  E
x

E
y

fX   u fY   v dv du
  E
x

fX   u  E
y

fY   v dv
 du
  E
x

fX   u P  Y & y du
  P  X & x P  Y & y
so X and Y are independent.
On the other hand, suppose thatX and Y are independent. Then
E
x

E
y

fX   u fY   v dv du   E
x

fX   u  E
y

fY   v dv
 du
  FY   y E
x

fX   u du
  FX   x FY   y
  FX,Y   x,y  [by independence]
so fX   u fY   v is a joint pdf forX and Y.
Example 5.10. Suppose thatX  Exp  1 and Y  Exp  2 are independent. Find the joint probability
density function ofX and Y.
We know the densities ofX and Y, so by Theorem 5.4
fX,Y   x,y    fX   x fY   y   e x  2e 2y   2e x 2y,
for allx,y ' 0, and 0 otherwise.
73
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 77 =====
Example 5.11. Suppose thatX  Exp  1 and Y  Exp  2 are independent. Find P  X "   1, 2 , Y "
  1, 2 .
Because X and Y are independent, we have
P  X "   1, 2 , Y "   1, 2   P  X "   1, 2 P  Y "   1, 2
  E
2
1
fX   x dx  E
2
1
fY   y dy
   FX   2  FX   1   FY   2  FY   1
    e 2  e 1  e 4  e 2   0.0272   4 dp .
Theorem 5.5. Suppose thatX and Y are random variables on the same probability space.
(a) IfX andY are discrete with joint pmffX,Y, thenX andY are independent if and only iffX,Y   x,y 
can be written as a product of functionsg  x and h  y depending only onx and y respectively.
(b) Suppose thatX and Y are continuous and have a joint pdffX,Y, that can be written as a product of
functions g  x and h  y depending only onx and y respectively. ThenX and Y are independent.
Proof. (a) We know from Theorem 4.5 that ifX andY are independent, thenfX,Y   x,y    fX   x fY   y ,
so we are done by settingg   fX and h   fY. Now suppose conversely thatfX,Y   x,y    g  x h  y
for allx and y. Then we can calculate the marginal distributions:
fX   x   =
j" SY
fX,Y   x,j    =
j" SY
g  x h  j   g  x =
j" SY
h  j
and similarly
fY   y   h  y =
i" SX
g  i .
Multiplying these together, we get
fX   x fY   y   g  x h  y =
i" SX
g  i =
j" SY
h  j   fX,Y   x,y  =
i" SX
=
j" SY
fX,Y   i,j 
but the last double sum must equal1 by the definition of joint pmf. So
fX   x fY   y   fX,Y   x,y 
and we deduce thatX and Y are independent.
(b) The same as above but with integrals in place of sums:
fX   x   E


fX,Y   x,v  dv   E


g  x h  v dv   g  x E


h  v dv
and similarly
fY   y   h  y E


g  u du.
Multiplying these together, we get
fX   x fY   y   g  x h  y E


g  u du E


h  v dv   fX,Y   x,y  E


E


fX,Y   u,v  du dv
but the last double integral must equal1 by the definition of joint pdf. So
fX   x fY   y   fX,Y   x,y 
and we deduce from Theorem 5.4 thatX and Y are independent.
74
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 78 =====
As a final note in this section, we point out that any random variableX with a bounded probability
density function satisfiesP  X   x   0 for allx " R.
Theorem 5.6. Suppose thatX is a random variable with a bounded probability density functionfX; that
is, there existsC % 0 such thatfX   x & C for allx " R. Then P  X   x   0 for allx " R.
Proof. This proof isnon-examinable, not because it is difficult, but because it is an analysis proof rather
than a probability proof.
Suppose thatfX   x & C for allx " R. Fixε % 0. Then for anyx " R,
P  X   x & P  X "   x  ε© C,x    FX   x  FX   x  ε© C   E
x
x ε© C
fX   u du & ε
C   C   ε.
Since ε % 0 was arbitrary, and we showed thatP  X   x & ϵ, we must haveP  X   x   0.
We recall that not every continuous random variable has a probability density function, and there absolutely
are (many) continuous random variables withP  X   x % 0 for some value(s) ofx. See question 6 on
problem sheet 9 for an example. But the most common continuous random variables, such as uniform,
exponential and normal random variables, have bounded probability density functions and therefore satisfy
P  X   x   0.
6 Expectation and variance
The expectation E X of a random variableX is a measure of where we expectX to be “on average”,
according its distribution. You might think ofE X as your best guess for the value ofX before you
perform the experiment; but how realistic this is depends on the situation (for example, ifX is the
outcome of a single roll of a dice, thenE X   7© 2, but the probability thatX actually equals 7© 2 is, of
course, zero).
The varianceVar  X of a random variableX is a measure of how “spread out” the distribution ofX is,
relative to its expectation.
6.1 Expectation of a discrete random variable
Definition 6.1(Expectation of a discrete random variable). Let X be a discrete random variable with
support S. If < x" S ¶ x¶ P  X   x $  then the expectation (or expected value) ofX is
E X   =
x" S
xP  X   x . (60)
Remark: The requirement < x" S ¶ x¶ P  X   x $  ensures that the sum in(60) makes sense. You
might have seen in analysis lectures that we need to be careful with infinite sums: in some cases, adding
up terms in different orders can change the value of the sum. The requirement< x" S ¶ x¶ P  X   x $ 
ensures this can’t happen. Note that ifS is finite, sayS   r x1,...,x nx , then
E X  
n
=
i  1
xi P  X   xi
contains only a finite number of terms and so the sum is automatically finite.
Example 6.1. LetX be the score obtained on a single roll of a fair dice. That is,
P  X   x   1
6 for x " r 1, 2, 3, 4, 5, 6x
and P  X   x   0 otherwise. Find E X .
75
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 79 =====
E X  
6
=
x  1
x P  X   x
  1  1
6 
  2  1
6 
  3  1
6 
  4  1
6 
  5  1
6 
  6  1
6 
  21
6   7
2.
Example 6.2. Suppose thatX  Geom  p . Show that E X   1
p.
If X  Geom  p then P  X   x     1  p x 1p for x " r 1, 2,... x . Thus,
E X  

=
x  1
x  1  p x 1p
  p  1  2  1  p  3  1  p 2   
   p  d
dp1  d
dp   1  p  d
dp   1  p 2  d
dp   1  p 3   
   p d
dp 

=
i  0
  1  p i  see note below
   p d
dp
1
p  as ¶ 1  p¶ $ 1 for p "   0, 1
  1
p.
Note: making the fourth equality rigorous requires some analysis which is beyond the scope of this course,
but it is not too difficult: we just show that the infinite sum on the second line is withinε of the sum of
the firstn terms whenn is large, and use linearity of the derivative on the finite sum. The fourth line
then involves the derivative of a finite geometric sum, which we can calculate, take the derivative, and
then take the limit asn    . We won’t do the details here!
6.2 Expectation of a continuous random variable
The interpretation of the expectation of a continuous random variable is precisely the same as for discrete
random variables, but since the definition ofE X for discreteX relies on the pmf, a different (but
analogous) definition for continuousX is needed.
Definition 6.2(Expectation of a continuous random variable). Let X be a continuous random variable
with a probability density functionfX  R    0,   . If D

 ¶ x¶ fX   x dx $  , then
E X   E


x fX   x dx. (61)
Remarks:
1. Absolute convergence D

 ¶ x¶ fX   x dx $  is needed for the same reason as in the discrete case:
we need the integralD

 x fX   x dx to be well-defined..
2. The definition is similar to Definition 6.1, but the sum overS is replaced by an integral, and the
pmf P  X   x is replaced with a probability density functionfX   x .
Example 6.3. Suppose thatX  Exp   λ . Find E X .
By Definition 6.2 we have
E X   E

0
xλe λx dx.
76
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 80 =====
Integration by parts15 gives
E X       λx  1 e λx
λ 

0
  1
λ.
We often think of exponential random variables as “waiting times” and call the parameterλ the “rate”.
Example 5.3 gave a clue as to why: the time to the first arrival in a Poisson queue with rateλ is
exponentially distributed with parameterλ. It turns out that also the times between any pair of arrivals
are also exponentially distributed with parameterλ. For example, if we assume that customers arrive at
Fresh randomly at rate (say) 12 per minute, then the time in minutes between one customer and the next
joining the queue in Fresh is exponentially distributed with parameter 12, so we expect it to take1© 12
minutes (or 5 seconds) for the next customer to arrive. “Higher rate means less time to wait.”
6.3 Properties of expectation
6.3.1 General results
Theorem 6.1(Non-negative RVs have non-negative expectation). IfX is a non-negative random variable,
i.e. it has supportS L  0,   , then E X ' 0.
Proof. In the discrete case, we havex ' 0 for allx " S, soxP  X   x ' 0 for allx " S, so
E X   =
x" S
xP  X   x ' 0.
Similarly, ifX is continuous and has a probability density functionfX, then sinceS L  0,   , we have
(by the definition of pdf)fX   x   0 for allx $ 0. Thus
E X   E


x fX   x dx   E

0
x fX   x dx ' 0.
Theorem 6.2(The expectation of a constant is that constant). If P  X   a   1 for somea " R, then
E X   a. Thus, E a   a.
Proof. This is trivial: E X   aP  X   a   a.
Now we come to a much less trivial property, with an appropriate name. The key question is: for a random
variableX and a functiong  R   R, how do we calculateE g  X ? For example, how do we calculate
E X2 ? It is worth pointing out first of all that we absolutely doNOT have E g  X   g  E X (this
could perhaps be called the law of the incompetent statistician). But the next simplest possibilityis true.
Theorem 6.3(The law of the unconscious statistician). 1. Suppose thatX is a discrete random variable
with supportS. For any functiong  R   R such that < x" S ¶ g  x¶ P  X   x $  , we have
E g  X   =
x" S
g  x P  X   x
.
2. Suppose thatX is a continuous random variable, with a probability density functionfX. Ifg  R   R
satisfies D

 ¶ g  x¶ fX   x dx $  , then
E g  X   E


g  x fX   x dx.
15You will not need to do any difficult integrals in the exam. The exam is aiming to test your knowledge and skill in
probability, not integration. Any non-trivial integrals required will be stated as part of the question.
77
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 81 =====
3. Suppose thatX1,...,X n are discrete random variables with supportS1,...,S n respectively. For any
function g  Rn   R with
=
x1" S1
 =
xn" Sn
¶ g  x1,...,x n¶ P  X1   x1,...,X n   xn $ 
we have
E g  X1,...,X n   =
x1" S1
 =
xn" Sn
g  x1,...,x n P  X1   x1,...,X n   xn .
4. Suppose thatX1,...,X n are continuous random variables with joint probability density function
fX1,...,Xn. Ifg  Rn   R satisfies
E


 E


¶ g  x1,...,x n¶ fX1,...,Xn   x1,...,x n dx1 dxn $  ,
then
E g  X1,...,X n   E


 E


g  x1,...,x n fX1,...,Xn   x1,...,x n dx1 dxn.
Proof. We will only prove claim 1. Claim 2 will be discussed in the second semester. Claim 3 is a natural
extension of claim 1 and its proof is the same but with more notation. Similarly for claim 4 as an extension
of claim 2.
Claim 1.
Idea: Let Y   g  X , write out the definition ofE Y  and convert anything aboutY into something
about X. Will need to construct a partition ofS according to the possible values ofg  x .
LetY   g  X . Then sinceX is a discrete rv,Y is also a discrete random variable. LetSY be the support
of Y. Now,
E g  X   E Y    =
y" SY
y P  Y   y .
We want to change fromY to X on the right-hand side, so for eachy " SY we letAy be the set ofx " S
that are mapped toy byg, i.e.
Ay   r x " S  g  x   yx .
Then
P  Y   y   P  X " Ay   =
x" Ay
P  X   x .
Thus
E g  X   =
y" SY
y =
x" Ay
P  X   x   =
y" SY
=
x" Ay
yP  X   x .
Now, continuing the theme of changingy to x on the right-hand side, notice that for everyx " Ay, we
haveg  x   y, so
E g  X   =
y" SY
=
x" Ay
g  x P  X   x .
We almost have the result we want; it only remains to notice that eachx " S belongs toAy for exactly
one y, so that the double sum on the right-hand side above is actually summing over allx " S.
Example 6.4. Suppose thatX and Y are random variables with supportSX and SY respectively. IfX
and Y are both discrete, then
E X2   =
x" SX
x2P  X   x
E XY    =
x" SX
=
y" SY
xy P  X   x,Y   y .
78
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 82 =====
If X is continuous with probability density functionfX, then
E X2   E


x2fX   x dx
and ifY is also continuous andX and Y have joint probability density functionfX,Y, then
E XY    E


 E


xyfX,Y   x,y  dy
 dx.
Theorem 6.4(Linearity of expectation). If X and Y are random variables anda,b " R, then
E aX  bY    aE X  bE Y  .
Proof. We can only prove this whenboth X and Y are discrete, or whenX and Y are continuous and
have a joint probability density functionfX,Y and marginal densitiesfX andfY. It is true more generally,
but we need more advanced tools to prove it.
Idea: Apply the law of the unconscious statistician, and use linearity of sums / integrals.
LetSX be the support ofX, andSY the support ofY. For discrete random variables, we have by Theorem
6.3
E aX  bY    =
x" SX
=
y" SY
  ax  by P  X   x,Y   y
  a =
x" SX
x  =
y" SY
P  X   x,Y   y   b =
y" SY
y  =
x" SX
P  X   x,Y   y 
  a =
x" SX
xP  X   x  b =
y" SY
yP  Y   y
  aE X  bE Y  .
The proof for continuous random variables is similar, but with sums replaced by integrals. We also need
to use the formula for calculating marginals, (59). We have
E aX  bY    E


E


  ax  by fX,Y   x,y  dx dy
  a E


x  E


fX,Y   x,y  dy
 dx  b E


y  E


fX,Y   x,y  dx
 dy
  a E


xfX   x dx  b E


yfY   y dy
  aE X  bE Y  .
Remark:
We can chain Theorem 6.4 together to get linearity of a sum of many random variables:
E a1X1  a2X2  ...  anXn   a1E X1  a2E X2  ...  anE Xn ,
or written another way,
E 
n
=
i  1
aiXi  
n
=
i  1
aiE Xi .
Note that thisdoes notallow us to exchange expectations withinfinite sums. That is a much more
delicate matter.
79
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 83 =====
Example 6.5. Suppose thatX  Geom  1© 4 and Y  Exp  1© 2 . Find E 3X  Y  5 .
In Example 6.2, we saw that ifX  Geom  p , then E X   1© p. And in Example 6.3, we say that if
Y  Exp  λ then E Y    1© λ. So whenp   1© 4 and λ   1© 2, we haveE X   4 and E Y    2. We also
saw the the expectation of a constant is that constant, soE 5   5. Using the linearity of expectation,
Theorem 6.4, we have
E 3X  Y  5   3E X  E Y   E 5     3  4  2  5   15.
Example 6.6. Show that ifY  Binom  n,p  , then E Y    np.
We can do this two ways. The easier option is to writeY   < n
i  1Xi, whereXi  Ber  p is the outcome of
the ith trial. Now
E Xi   0  P  Xi   0  1  P  Xi   1   P  Xi   1   p.
By the linearity of expectation, Theorem 6.4, we have
E Y    E 
n
=
i  1
Xi  
n
=
i  1
E Xi   np.
The alternative is to do the calculation directly:
E Y   
n
=
j  0
jP  Y   j  
n
=
j  0
j n
j  pj  1  p n j
and then we have to notice that for eachj   1,...,n ,
j n
j  pj  1  p n j   np n  1
j  1 pj 1  1  p n j
so that
E Y   
n
=
j  0
j n
j  pj  1  p n j  
n
=
j  1
j n
j  pj  1  p n j
  np
n
=
j  1
 n  1
j  1 pj 1  1  p n j
  np
n 1
=
i  0
 n  1
i  pi  1  p n 1 i
  np  p    1  p n 1   np.
Using linearity of expectation is much quicker and easier!
Example 6.7. LetX  N  µ,σ 2 . Find E X .
By linearity of expectation,
E X   E X  µ  µ,
so it suffices to show thatE X  µ   0. By the law of the unconscious statistician,
E X  µ   E


  x  µÓ
2πσ2
e  x µ 2
2σ2 dx.
Letting y   x  µ gives
E X  µ   E


yÓ
2πσ2
e y2
2σ2 dy   E
0

yÓ
2πσ2
e y2
2σ2 dy  E

0
yÓ
2πσ2
e y2
2σ2 dy.
We now spot that on the right-hand side, the integral from to 0 is the negative of the integral from0
to  (e.g. by substitutingy    z in one of them), from which we conclude thatE X  µ   0. This then
implies that E X   µ.
80
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 84 =====
Corollary 6.1(expectation preserves non-strict inequalities). If X and Y are random variables on the
same sample space such thatX  ω ' Y   ω for allω, then E X ' E Y  .
Proof. Let Z   X  Y. Then since X  ω ' Y   ω for allω, we haveZ  ω ' 0 for allω, i.e. Z is a
non-negative random variable. So by Theorem 6.1,E X  Y    E Z ' 0. But by linearity of expectation,
E X  Y    E X  E Y  . So we have shown thatE X  E Y  ' 0, i.e. E X ' E Y  .
Corollary 6.2 (Expectation of the modulus' the modulus of the expectation). If E X exists then
E¶ X¶ ' ¶ E X¶ .
Proof. We consider two cases:E X ' 0 and E X $ 0. If E X ' 0, then
¶ X¶ ' X
  E X  X  E X
  ¶ E X¶  X  E X ,  sinceE X ' 0 implies E X   ¶ E X¶
and by taking the expectation throughout and using Corollary 6.1 and linearity of expectation, we have
E¶ X¶ ' ¶ E X¶  E X  E X   ¶ E X¶ .
For the caseE X $ 0 we proceed similarly:
¶ X¶ '  X    E X  X  E X   ¶ E X¶  X  E X ,
which, by taking the expectation throughout, yields the claim by Corollary 6.1 and linearity of expectation.
6.3.2 Expectation of the product of independent random variables
We have seen thatE X  Y    E X  E Y  . What about E XY  ? It isnot true(!!!) that E XY   
E X E Y  in general. But this does hold whenX and Y are independent.
Theorem 6.5 (Expected value of the product of independent random variables). If X and Y are
independent random variables and functionsg  R   R and h  R   R are such thatE¶ g  X¶ $  and
E¶ h  Y ¶ $  , then
E g  X h  Y    E g  X E h  Y  .
Proof. We do the proof only whenX andY are both discrete. The case whenX andY are both continuous
with a joint probability density function is similar. The theorem is true more generally but we would need
more advanced tools to prove it.
Idea: Use the law of the unconscious statistician and then apply independence in the form of probability
mass functions (i.e. Theorem 4.5).
Suppose thatX and Y are discrete random variables with supportSX and SY respectively. Theorem 4.5
says that ifX and Y are independent, then for allx " SX, y " SY, we have
P  X   x,Y   y   P  X   x P  Y   y .
Then, by the law of the unconscious statistician, Theorem 6.3,
E g  X h  Y    =
x" SX
=
y" SY
g  x h  y P  X   x,Y   y
  =
x" SX
=
y" SY
g  x h  y P  X   x P  Y   y
   =
x" SX
g  x P  X   x   =
y" SY
h  y P  Y   y 
  E g  X E h  Y  .
81
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 85 =====
Remarks:
1. This illustrates the intuition that “independence means multiplication”: ifX andY are independent
then
E g  X h  Y    E g  X E h  Y  ,
which is not true in general.
2. This result can be extended ton independent random variables in the obvious fashion.
3. An important application of this corollary is wheng  X   X and h  Y    Y yielding
E XY    E X E Y 
for independentX and Y. This will be especially useful later when we consider thecovariance of
two random variables.
6.4 Variance
Definition 6.3 (Variance). If X is a random variable withE X2 $  16, then thevariance of X is
defined as
Var  X   E  X  E X 2 .
The standard deviationof X is the (positive) square root ofVar  X .
Thus, for a discrete random variableX with supportSX and expectation
µX   E X   =
x" SX
xP  X   x ,
we have
Var  X   =
x" SX
  x  µX  2P  X   x .
Note that in this calculation,µX   E X is just a real number, not a random variable. Similarly, for
continuousX with pdffX we have
Var  X   E
SX
  x  µX  2fX   x dx, where µX   E X   E
SX
xfX   x dx.
Corollary 6.3(The variance is non-negative). For any random variableX, Var  X ' 0.
Proof. Let Y     X  E X 2. ThenY ' 0 so, from Theorem 6.1,Var  X   E Y  ' 0.
Theorem 6.6(Calculating the variance). If X is a random variable withE X2 $  , then
Var  X   E X2  E X 2.
Proof.
Var  X   E  X  E X 2
  E X2  2XE X  E X 2
  E X2  2E X E X  E X 2  by linearity of expectation
  E X2  E X 2.
16Note that ifE X 2 $  , then E¶ X¶ $  so that the expectationE X is well defined.
82
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 86 =====
Remark: Sometimes E X is called thefirst momentof X and E X2 is called thesecond moment(in
general E Xn is called thenth moment). The variance formula of Theorem 6.6 is sometimes called the
moment formfor the variance.
Hence, ifX is discrete then we can calculateVar  X as
Var  X   =
x" SX
x2P  X   x   =
x" SX
xP  X   x 
2
.
For continuousX this becomes
Var  X   E
SX
x2fX   x dx   E
SX
xfX   x dx
2
.
Often this is the easiest way to computeVar  X from the pmf or pdf.
Example 6.8. Suppose thatX  Geom  p . Show that Var  X   1 p
p2 .
We will use an observation similar to Example 6.2. Letq   1  p.
E X2  

=
x  1
x2  1  p x 1p
  p  12  22q  32q2     substituting q   1  p
  p  1  2q  3q2     p  2  2  1 q  3  3  1 q2   
  E X  pq  d2
dq2 1  d2
dq2q  d2
dq2q2  d2
dq2q3   
  E X  pq d2
dq2 

=
i  0
qi
  E X  pq d2
dq2
1
1  q
  1
p  pq 2
  1  q 3   1
p  2  1  p
p2   2  p
p2 .
Thus,
Var  X   E X2  E X 2   2  p
p2   1
p 
2
  1  p
p2 .
As in Example 6.2, changing the sum of derivatives to the derivative of a sum can (in this case) be made
rigorous without too much work.
Example 6.9. Suppose thatX  Unif  0, 1 . Find Var  X .
Note thatfX   x   1 for x "  0, 1 and 0 otherwise. First we findE X :
E X   E


xfX   x dx   E
1
0
x dx    1
2x2
1
0
  1
2  12  1
2  02   1
2.
Then we findE X2 :
E X2   E


x2fX   x dx   E
1
0
x2 dx    1
3x3
1
0
  1
3  13  1
3  03   1
3.
Thus
Var  X   E X2  E X 2   1
3  1
4   1
12.
83
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 87 =====
Theorem 6.7(Variance of a constant is zero). Var  X   0 if and only ifP  X   a   1 for some constant
a " R. Thus, Var  a   0.
Proof. Suppose that P  X   a   1. Then from Theorem 6.2, E X   a, and also, by the law of the
unconscious statistician,
E X2   a2P  X   a   a2
so
Var  X   E X2  E X 2   a2  a2   0.
So the variance of a constant is zero. We now want to show that the variance of any non-constant random
variable is non-zero. We can do this very easily when the random variable is discrete. However, the general
case is a bit more subtle.
It does not use any tools that you don’t already know, so I will include it here. However, it puts a number
of ingredients together and has a more advanced feel than many of the proofs in this course, so you can
consider itnon-examinable.
Suppose that we do not haveP  X   a   1 for any constanta. Leta   E X ; then sinceP  X   a $ 1,
there must existδ % 0 such that eitherP  X ' a  δ % 0 or P  X & a  δ % 0. (In fact, it must be possible
to findδ % 0 such that both these hold; why? But we won’t need this.)
Let Y be a random variable on the same sample space asX, such thatY   ω   1 if X  ω ' a  δ or
X  ω & a  δ, andY   ω   0 otherwise. ThenY & 1, so   X  a 2Y &   X  a 2. Thus
Var  X   E  X  a 2 ' E  X  a 2Y 
. We also claim that  X  a 2Y ' δ2Y. Indeed, this inequality holds ifY   1, sinceY   1 exactly when
  X  a 2 ' δ2; but it also holds ifY   0, since then both sides are0. Thus
Var  X ' E  X  a 2Y  ' E δ2Y    δ2E Y  .
Finally, by our choice ofδ we have
E Y    1P  Y   1  0P  Y   0   P  Y   1   P r X ' a  δx < r X & a  δx % 0
and therefore we have shown thatVar  X % 0.
Theorem 6.8(Variance of a linear function). If X is a random variable withE X2 $  and a,b " R
then
Var  aX  b   a2Var  X .
Proof. Note that, by the linearity of expectation,E aX  b   aE X  b so that, from Definition 6.3,
Var  aX  b   E  aX  b  E aX  b 2
  E  aX  b  aE X  b 2
  E a2  X  E X 2   a2Var  X .
Example 6.10. Fora    1 and b   0 we have immediately thatVar   X   Var  X .
If Y  Geom  1© 2 , then by Example 6.8 we have
Var  Y   
1  1
2
 1
2 
2   2
and therefore
Var  2Y  5   22Var  Y    8.
84
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 88 =====
6.4.1 Covariance
Thecovarianceof two random variables is a measure of their joint variability, or their degree of association.
Definition 6.4 (Covariance and correlation). For random variablesX and Y with E X2 $  and
E Y 2 $  , thecovariance of X and Y is defined as
Cov  X,Y    E  X  E X  Y  E Y  .
If Var  X % 0 and Var  Y  % 0 then thecorrelation of X and Y is defined as
ρXY   Corr  X,Y    Cov  X,Y Ô
Var  X Var  Y 
.
Remarks:
1. Notice that Cov  X,Y    Cov  Y,X  and Cov  X,X    Var  X .
2. The correlation is the covariance divided by the product of the standard deviations.
3. The covariance is the average value of the product of the deviation ofX from its expectationE X
and Y from its expectationE Y  .
a. If X is larger thanE X wheneverY is larger thanE Y  , and smaller thanE X wheneverY
is smaller thanE Y  , then Cov  X,Y  is positive.
b. If X is smaller thanE X wheneverY is larger thanE Y  , and larger thanE X wheneverY
is smaller thanE Y  , then Cov  X,Y  is negative.
Theorem 6.9(Calculating the covariance). The covariance ofX and Y can be calculated as
Cov  X,Y    E XY   E X E Y  .
Proof. Idea: Multiply out the definition and use linearity of expectation.
Cov  X,Y    E  X  E X  Y  E Y 
  E XY  E X Y  E Y  X  E X E Y 
  E XY   E X E Y   E Y  E X  E X E Y   linearity of expectation
  E XY   E X E Y  .
Thus, ifX and Y are discrete then we can calculateCov  X,Y  as
Cov  X,Y    =
x" SX
=
y" SY
xyP  X   x,Y   y   =
x" SX
xP  X   x   =
y" SY
yP  Y   y  .
For continuousX and Y we have
Cov  X,Y    E
SX
E
SY
xyfX,Y   x,y  dxdy   E
SX
xfX   x dx
  E
SY
yfY   y dy
 .
Corollary 6.4(Independent random variables have zero covariance). If X and Y are independent, then
Cov  X,Y    0.
Proof. From Theorem 6.5, ifX and Y are independent, thenE XY    E X E Y  and so, from Theorem
6.9, Cov  X,Y    0.
It will be useful later to note that covariance is linear in each of its arguments. Since covariance is
symmetric, it suffices to check one of the arguments.
85
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 89 =====
Corollary 6.5(Covariance is linear in each argument). For any random variablesX, Y and Z satisfying
E X2 $  , E Y 2 $  and E Z2 $  , and anya,b " R, we have
Cov  aX  bY,Z    aCov  X,Z   bCov  Y,Z  .
Proof. Idea: Write out the definition and use linearity of expectation.
Cov  aX  bY,Z    E  aX  bY  E aX  bY   Z  E Z
  E a  X  E X  Z  E Z  b  Y  E Y   Z  E Z  linearity of expectation
  aE  X  E X  Z  E Z  bE  Y  E Y   Z  E Z  linearity of expectation
  aCov  X,Z   bCov  Y,Z  .
Remark:
(Non-examinable but might be helpful!) Covariance actsalmost like aninner product(if you have
met inner products) - it is symmetric and bilinear. It’s not positive definite, so it’s not actually an inner
product, but it ispositive semi-definite- Cov  X,X  ' 0 and (by Theorem 6.7) ifCov  X,X    0 then X
is a constant.
6.4.2 The variance of a sum of random variables
We have seen that expectation is linear, and covariance is linear in each of its arguments. But variance is
not linear.
Theorem 6.10(Variance of a sum of two RVs). For random variablesX and Y, with E X2 $  and
E Y 2 $  , and constantsa,b " R,
Var  aX  bY    a2Var  X  b2Var  Y   2ab Cov  X,Y  .
Proof. We can do this two ways.
Idea 1:The direct way. Multiply out the definition, group appropriate terms together and apply linearity
of expectation.
Let E X   µX and E Y    µY then E aX  bY    aµX  bµY so that
Var  aX  bY    E  aX  bY  E aX  bY  2
  E  a  X  µX   b  Y  µY  2
  E a2  X  µX  2  b2  Y  µY  2  2ab  X  µX   Y  µY 
  a2E  X  µX  2  b2E  Y  µY  2  2ab E  X  µX   Y  µY 
  a2Var  X  b2Var  Y   2ab Cov  X,Y  .
Idea 2: Use linearity of covariance in each argument.
Var  aX  bY    Cov  aX  bY,aX  bY 
  aCov  X,aX  bY   bCov  Y,aX  bY   linearity in the first argument
  a2Cov  X,X   abCov  X,Y   baCov  Y,X   b2Cov  Y,Y   linearity in the second argument
  a2Var  X  2abCov  X,Y   b2Var  Y  .
86
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 90 =====
Example 6.11. Two important special cases are:
Var  X  Y    Var  X  Var  Y   2Cov  X,Y   taking a   b   1
Var  X  Y    Var  X  Var  Y   2Cov  X,Y  .  taking a   1 and b    1
Notice that ifX and Y are independent, thenCov  X,Y    0 and so Var  X  Y    Var  X  Var  Y   
Var  X  Y  .
In fact, essentially the same proof (at least if we use the second method) can be used to find the variance
of a sum of random variables.
Corollary 6.6(Variance of a sum ofn random variables). Suppose thatX1,...,X n are random variables
satisfying E X2
i  $  for alli   1,...,n . LetY   < n
i  1aiXi for some constantsa1,...,a n " R. Then
Var  Y   
n
=
i  1
n
=
j  1
aiajCov  Xi,Xj  
n
=
i  1
a2
i Var  Xi  2
n
=
i  1
n
=
j  i 1
aiajCov  Xi,Xj . (62)
Proof. Idea: Again use linearity of covariance in each argument.
Var  Y    Cov 
n
=
i  1
aiXi,
n
=
j  1
ajXj
 
n
=
i  1
aiCov  Xi,
n
=
j  1
ajXj  linearity in the first argument
 
n
=
i  1
n
=
j  1
aiajCov  Xi,Xj .  linearity in the second argument
This proves the first form of the statement of the corollary. We now notice that the sum overj can be
split into a sum overj $ i, the term whenj   i, and a sum overj % i. That is,
Var  Y   
n
=
i  1
i 1
=
j  1
aiajCov  Xi,Xj 
n
=
i  1
a2
i Var  Xi 
n
=
i  1
n
=
j  i 1
aiajCov  Xi,Xj .
Finally, by symmetry of the covariance, we can swap the roles ofi and j in the first double sum, and
notice that it equals the second double sum, so we obtain
Var  Y   
n
=
i  1
a2
i Var  Xi  2
n
=
i  1
n
=
j  i 1
aiajCov  Xi,Xj .
Corollary 6.7(Sum of independent random variables). If X1,...,X n are independent, then
Var  Y    Var
n
=
i  1
biXi  
n
=
i  1
b2
i Var  Xi . (63)
Proof. If X1,...,X n are independent thenCov  Xi,Xj   0 for alli j j and so Equation(62) reduces to
Equation (63).
Remarks: Corollary 6.6 is sometimes known as Bienaymé’s17 identity, and Corollary 6.7 is also known as
Bienaymé’s formula. We won’t use these names in the exam.
17Irénée-Jules Bienaymé.
87
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 91 =====
Example 6.12. Suppose thatY  Binom  n,p  . Show that Var  Y    np  1  p .
In Example 6.6 we showed that ifY  Binom  n,p  then E Y    np. This was accomplished by writing
Y   < n
i  1Xi where eachXi  Ber  p denotes the outcome of theith Bernoulli trial. We also saw in
Example 6.6 thatE Xi   p and E X2
i    p so that
Var  Xi   E X2
i   E Xi 2   p  p2   p  1  p .
As the trials, and henceX1,X 2,... , are independent, the formula for the variance of a sum of independent
random variables (Bienaymé’s formula, Corollary 6.7) gives
Var  Y    Var
n
=
i  1
Xi  
n
=
i  1
Var  Xi   np  1  p .
Example 6.13. We can use the linearity of covariance in each argument to find that
Cov  X  Y,X  Y    Cov  X,X  Y   Cov  Y,X  Y 
  Cov  X,X   Cov  X,Y   Cov  Y,X   Cov  Y,Y 
  Cov  X,X   Cov  Y,Y    Var  X  Var  Y  .
To summarise the formulas for sums of random variables,
E 
n
=
i  1
aiXi  
n
=
i  1
aiE Xi ,
Cov 
n
=
i  1
aiXi,Y   
n
=
i  1
aiCov  Xi,Y  ,
Var
n
=
i  1
aiXi  
n
=
i  1
a2
i Var  Xi  2
n
=
i  1
n
=
j  i 1
aiajCov  Xi,Xj ,
and if X1,X 2,...,X n are independentthen
Var
n
=
i  1
aiXi  
n
=
i  1
a2
i Var  Xi .
6.5 The Law of Large Numbers
Consider a sequence of independent random variablesX1,X 2,... that all have the same distribution,
with E Xi   µ and Var  Xi   σ2 for alli   1, 2,... . The(sample) average ¯Xn of the firstn of these
random variables is defined as
¯Xn   1
n
n
=
i  1
Xi.
By linearity of expectation, we immediately have
E ¯Xn   E  1
n
n
=
i  1
Xi   1
n
n
=
i  1
E  Xi   1
nnµ   µ,
so the expected value of the sample average is equal to the expectation of each individualXi. For the
variance of the sample average, we use
Var  ¯Xn   Var 1
n
n
=
i  1
Xi   1
n2
n
=
i  1
Var  Xi   nσ2
n2   σ2
n .
Thus, if we letn increase, then we clearly see thatVar  ¯Xn will tend to zero. As the variance is a measure
of the spread of a random variable, we can interpret this as suggesting that asn increases, ¯Xn will get
closer and closer to its expected value,µ.
88
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 92 =====
Example 6.14. Consider tossing a fair coinn times and assigning value 0 to heads and 1 to tails, so that
a single toss constitutes a Bernoulli trial, which we denote byXi for i " r 1,...,n x . As we know already,
n
=
i  1
Xi  Binom  n, 1
2 
 .
Thus the pmf of the sample average ofX1,...,X n is easily obtained as
P  ¯Xn   x   P  1
n
n
=
i  1
Xi   x   P 
n
=
i  1
Xi   nx ,
where the final probability is equal to the pmf ofBinom  n,p  evaluated atnx. Figure 32 shows the
pmfs, expectations and variances of¯Xn for n " r 1,..., 14x . The distribution of ¯Xn concentrates around
p   E Xi   0.5 as expected.
0.00
0.25
0.50
0.75
1.00
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25
Number of tosses
Values of ¯X n
Figure 32: Probability mass function (black lollipops), expectation (solid blue line), and expectation
standard deviation (dotted red curves) of¯Xn in Example
refexm:LLN1 forn   1,..., 14.
These observations can be made rigorous to give the following result, which we state without a proof.
Theorem 6.11((Weak) Law of Large Numbers, (W)LLN). Suppose thatX1,X 2,... are independent
and identically distributed random variables withE Xi   µ and Var  Xi   σ2 for alli   1, 2,... . Then
for anyε % 0,
lim
n  
P 
»»»»»»»»»»
1
n
n
=
i  1
Xi  µ
»»»»»»»»»»
% ε   0.
We have not covered the formal definition of limits, but Theorem 6.11 should be understood as follows.
No matter how small a margin of error (ε % 0) we choose, by taking a sufficiently large sample (i.e.n large
enough) we can make the probability that the sample average¯Xn is within distanceε of µ, arbitrarily
close to one.
89
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 93 =====
Example 6.15(Example 6.14 revisited). A typical use of the law of large numbers is the estimation of
unknown quantities. Suppose that we were not sure whether heads and tails on a coin toss where really
equally likely18. Figure 33 shows a realisation of the sample average¯Xn for n " r 1,..., 2000x tosses19.
Due to the law of large numbers, we know that for largen the distribution of ¯Xn will be concentrated
around the true probability,p, of heads and thus it is unlikely to lie far from¯Xn. In this experiment,
we have ¯X2000   0.4885 which, although not quite 0.5, is a reasonable estimate of the true probability of
heads20.
0.00
0.25
0.50
0.75
1.00
0 500 1000 1500 2000
Number of tosses
Proportion of heads
Figure 33: Realisation of ¯Xn for n " r 1,... x (red), the true probability of heads (solid), and the standard
deviation from the truep (dashed).
7 Indicator functions and applications
In this section, we introduce a new class of simple but extremely useful discrete random variables, called
indicator functions. We will then use these to prove some simple but extremely useful results: the Markov
and Chebyshev inequalities, and another formula for the expectation of a random variable.
This section was written after the exam, so there will be no material from this section in the exam. View it
as bonus material that might be interesting and good preparation if you are thinking of taking probability
courses in later years. If your aim is just to get through the exam with the minimal amount of work, you
can ignore this section.
18Persi Diaconis, a professor of Statistics and Mathematics at Stanford University, and a former magician, claims to have
trained himself to toss a coin so that it falls the desired way almost all the time. He has also studied the fairness of coin
tossing.
19For this example, a fair Bernoulli random variable was simulated 2000 times on a computer in a fraction of a second,
but the same experiment has been conducted with a real coin by many statisticians, such as Karl Pearson (1857-1936), who
famously tossed a coin 24000 times and recorded 12012 heads.
20In more advanced statistics courses you will learn to analyse this kind of estimates rigorously.
90
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 94 =====
7.1 Indicator functions
Recall that a random variable is a function from our sample space toR.
Definition 7.1(Indicator function). Suppose that we have a sample spaceΩ and aσ-algebra F on Ω.
For an eventA " F, theindicator functionof A is the discrete random variable1A  Ω   r 0, 1x such that
1A  ω   w 1 if ω " A
0 if ω ©" A.
Example 7.1. Toss a coin once. LetA be the event that we see a head. Then1A   1 if we see a head,
and 1A   0 if we see a tail.
(What is the cdf or pmf of1A? What is the cdf or pmf of1Ac?)
Since an indicator function can only take two values,0 and 1, it is very easy to calculate its expectation.
Lemma 7.1. For any eventA, E 1A   P  A .
Proof. Indeed, since the indicator function can only take values0 or 1, by the definition of expectation for
discrete random variables,
E 1A   0   P  1A   0  1   P  1A   1   P  1A   1   P r ω  1A  ω   1x .
But
r ω  1A  ω   1x   r ω  ω " Ax   A.
So E 1A   P  A .
7.2 The Markov and Chebyshev inequalities
We now come to one of the simplest, but most powerful and most-used theorems in all of probability.
Theorem 7.1(Markov’s inequality). For any non-negative random variableX, and anyx % 0,
P  X ' x & E X
x .
Proof. Idea: Note that 1r X' xx & X© x and take expectations.
We claim that1r X' xx & X© x. Indeed, ifX ' x, the left-hand side is1 and the right-hand side is at least1;
whereas ifX $ x, then the left-hand side is0, but the right-hand side is at least0, sinceX is non-negative.
Taking expectations of both sides,
E 1r X' xx  & E X© x .
We have just seen in Lemma 7.1 thatE 1r X' xx    P  X ' x , and by linearity of expectation,E X© x  
E X© x, which completes the proof.
Example 7.2. Let X  Bin  1000, 0.01 . Estimate P  X ' 35 using Markov’s inequality.
To calculateP  X ' 35 by hand would take a long time: we would have to calculate
1 
34
=
n  0
 1000
n   0.01n  0.991000 n.
Markov’s inequality gives us a bound with almost no work at all: it says that
P  X ' 35 & E X
35   1000  0.01
35   2
7.
It is reasonable to ask whether this bound is any good. In the case of the binomial random variable above,
it is not very good at all; a computer can tell us the real answer is approximately0.0000000004. But the
idea of using the expectation - which is often easy to calculate - to upper bound probabilities is a powerful
91
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 95 =====
one, and using Markov’s inequality in the right way is the key to proving many theorems in probability,
even in cutting-edge research.
Markov’s inequality gives us a way of bounding the probability that a non-negative random variable is
much bigger than its expectation. Three questions immediately spring to mind:
1. Can we improve on this bound (particularly in the binomial example above)?
2. What about the probability that a random variable is muchsmaller than its expectation?
3. What if our random variable isn’t non-negative?
One way of answering all three questions (if our random variable has a finite second moment) is to use
Chebyshev’s inequality, which is really just Markov’s inequality in disguise.
Corollary 7.1(Chebyshev’s inequality). For any random variableX with E X2 $  , and anyx % 0,
P· X  E X· ' x	 & Var  X
x2 .
Proof. Idea: Apply Markov’s inequality to¶ X  E X¶ 2.
Note that
P· X  E X· ' x	   P· X  E X·
2
' x2	 .
But ¶ X  E X¶ 2 is a non-negative random variable, andx2 % 0, so by Markov’s inequality,
P· X  E X·
2
' x2	 & 1
x2 E¶ X  E X¶ 2   1
x2 Var  X .
Example 7.3. Let X  Bin  1000, 0.01 . Estimate P  X ' 36 using Chebyshev’s inequality.
Since E X   1000  0.01   10, we have
P  X ' 36 & P· X  E X· ' 26	 & Var  X
262   9.9
676  0.015.
This estimate is about twice as good as our previous estimate, when we used Markov’s inequality. One
might then ask if we can improve even further by looking at higher moments (i.e. usingXk, or¶ X  E X¶ k,
for k % 2), and the answer is yes, in some cases this can yield even better results, and taking exponential
moments even more so (this is the basis of the theory oflarge deviations), but this is a story for another
course. Instead we apply Chebyshev’s inequality to another example.
Example 7.4. Suppose thatX1,X 2,... are independent and identically distributed random variables
with E Xi   µ and Var  Xi   σ2 for alli   1, 2,... . Let
¯Xn   1
n
n
=
i  1
Xi.
Then
E ¯Xn   E  1
n
n
=
i  1
Xi   1
n
n
=
i  1
E Xi   1
nnµ   µ,
and since theXi are independent,
Var ¯Xn   Var 1
n
n
=
i  1
Xi   1
n2
n
=
i  1
Var  Xi   1
n2nσ2   σ2
n .
Thus, for anyε % 0, by Chebyshev’s inequality,
P· ¯Xn  µ· % ε	 & Var  ¯Xn
ε   σ2
εn
which tends to0 as n    .
We have just proved the Weak Law of Large Numbers!
92
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 96 =====
7.3 Another formula for calculating the expectation
Sometimes the pmf or pdf is simpler or easier to work with than the cdf; but sometimes the cdf is
simpler or easier to work with (or easier to estimate). Thus the following formula for the expectation of a
non-negative random variable is sometimes useful.
Theorem 7.2. If X is a non-negative random variable, then
E X   E

0
P  X ' x dx.
Proof. Idea: WriteX   D
X
0 1 dx   D

0 1r x& Xx dx and take expectations.
As the idea suggests, we simply observe that sinceX is non-negative,
X   E
X
0
1 dx   E
X
0
1 dx  E

X
0 dx   E

0
1r x& Xx dx.
Taking expectations,
E X   E  E

0
1r x& Xx dx .
We now swap the expectation and the integral (we have not shown that this is allowed; it is not always
allowed; but it turns out that it is allowed as long as the integrand is non-negative, which is true in our
case) to get
E X   E

0
E  1r x& Xx  dx   E

0
P  x & X dx,
which completes the proof.
This formula can in fact be extended to give a formula for random variables that aren’t necessarily
non-negative, by writingX   X1r X' 0x  X1r X$ 0x , but we leave this as an exercise.
Example 7.5. Let X  Exp  λ for λ % 0. Calculate E X .
Using Theorem 7.2,
E X   E

0
P  X ' x dx   E

0
e λx dx   1
λ.
This is significantly easier than using the definition of expectation, for which we have to integratexe λx.
The formula in 7.2 works for any random variable, but if our random variable is discrete, then calculating
the integral is actually equivalent to calculating a sum, as we show in the following corollary.
Corollary 7.2. If X is a discrete random variable with supportSX   r 0, 1, 2,... x , then
E X  

=
j  1
P  X ' j .
Proof. Two options: we can apply Theorem 7.2, noting thatP  X ' x   P  X ' * x0 . Or we can mimic
the proof of Theorem 7.2 in the discrete setting:
X  
X
=
j  1
1  

=
j  1
1r j& Xx
so taking expectations and swapping the sum and the limit (again without worrying about whether we
are actually allowed to do this),
E X   E 

=
j  1
1r j& Xx   

=
j  1
E 1r j& Xx   

=
j  1
P  j & X .
93
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 97 =====
Example 7.6. Let X  Geom  p for p "   0, 1 . Calculate E X .
Using Corollary 7.2,
E X  

=
j  1
P  X ' j  

=
j  1
  1  p j 1  

=
i  0
  1  p i   1
p.
This is significantly easier than using the definition of expectation, for which we need to sum terms
involvingj  1  p j 1.
7.4 The expected return time to 0 for simple symmetric random walk
This section is more difficult, and you may find it easier to skip some of the details, but it
gives us a nice final application of our tools to the random walk. As with all of Section 7, it
is non-examinable.
Recall our key example, a random walkSn   < n
i  1Xn where each “step”Xn equals  1 with probability
1© 2 and  1 with probability 1© 2. That is,Sn starts from 0 and goes up with probability1© 2 and down
with probability 1© 2 at each step.
In fact, we can startSn from any integerk " Z by settingSn   k  < n
i  1Xn. Usually we will start from0
but occasionally it is useful to start from somewhere else. We writePk to signify that we are starting
from k. (When we start from0, we will sometimes just writeP and sometimes writeP0.)
Let T   minr n ' 1  Sn   0x , the first time at whichSn returns to 0. We showed in an earlier lecture
(with a little bit of hand-waving) thatSn hits 0 infinitely many times. SoP  T $     1.
What is E T  ? We use the formula from Corollary 7.2. This tells us that
E T   

=
j  1
P  T ' j .
Note that we always haveT ' 2, since our random walk cannot return to0 before time 2, so the first two
terms in our sum are both equal to1. Also,T cannot be an odd number, since the random walk cannot
hit 0 at odd times, soP  T ' 2j  1   P  T ' 2j for eachj   1, 2,... . Thus
E T    2  2

=
j  2
P  T ' 2j .
Now, at time 1, we must either step up or down, and the distribution ofT does not depend on which
choice we make, so without loss of generality suppose that we step up. The event thatT ' 2j when our
random walk starts from0 is then equal to the event thatT ' 2j  1 when our random walk starts from
1. That is,
P  T ' 2j   P1  random walk doesn’t hit0 by time 2j  2
  P1  Si % 0 for alli & 2j  2
  P1  Si % 0 for alli & 2j  2, S2j 2 ' 1 .
(For the last line above, we can add in the conditionSj 2 ' 1 for free, since ifSi % 0 for alli & 2j  2,
then the random walk certainly has to be' 1 at time 2j  2.) We now look at the complementary event
of the random walk staying positive; if it doesnot stay positive up to time2j  2, then there must be
some time at which it hits0. Thus
P  T ' 2j   P1  S2j 2 ' 1  P1  S2j 2 ' 1, there existsi $ 2j  2  Si   0 .
Now thereflection principle(we may have time to discuss this more in lectures) says that asking the
random walk (starting from1) to go down to zero and back up to1 is the same as asking it to move at
least distance 2 (it doesn’t care whether it has to go down at least 1 and back up at least 1, or up at least
2, or down at least 2). That is,
P1  S2j 2 ' 1, there existsi $ 2j  2  Si   0   P1  S2j 2 ' 3 .
94
messages.downloaded_by
lOMoARcPSD|70456888

===== PAGE 98 =====
So
P  T ' 2j   P1  S2j 2 ' 1  P1  S2j 2 ' 3 [by the argument above]
  P1  S2j 2 " r 1, 2x [containment]
  P0  S2j 2 " r 0, 1x [shift everything down by 1]
  P0  S2j 2   0 . [can only be at even positions at even times]
(This in itself is a remarkable formula: the probability that we don’t hit zero until time2j is the same as
the probability that we hit zero at time2j  2?!)
Returning to our formula forE T  , we see that
E T    2  2

=
j  2
P0  S2j 2   0   2  2

=
n  0
P0  S2n   0 .
We already calculated and estimatedP0  S2n   0 in an earlier lecture: to be at0 after 2n steps we have
to take exactlyn steps up andn steps down, which has probability
P0  S2n   0    2n
n  1
22n.
We then estimated this usingStirling’s formula(which is not part of the course) to show that
P0  S2n   0  1Ó πn.
Thus
E T   2  2

=
n  0
1Ó πn...
but this sum does not converge, soE T     .
So the random walk always returns to0, but you might be waiting a long time to see it!
95
messages.downloaded_by
lOMoARcPSD|70456888