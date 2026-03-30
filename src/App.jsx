import { useState, useRef, useCallback } from "react";

// ─── PRODUCTS ────────────────────────────────────────────────────────────────
const PRODUCTS = {
  planner:{ name:"ADHD Focus Planner", emoji:"🗂️", priceLabel:"$16.99", features:["Triage system","Dark mode","GoodNotes ready"], sub:"Executive function system for neurodivergent brains", price:"$16.99" },
  fuel:   { name:"Focus Fuel Protocol", emoji:"🍃", priceLabel:"$16.99", features:["15 quick meals","5–15 min prep","Ends the crash"], sub:"15 quick meals to eliminate brain fog", price:"$16.99" },
  bundle: { name:"Total Focus Bundle",  emoji:"✨", priceLabel:"$24.99 · Save 30%", features:["Planner + Fuel","Save $8","Complete system"], sub:"Complete system — planner + fuel protocol", price:"$24.99" }
};

// ─── PALETTES ─────────────────────────────────────────────────────────────────
const PALS = {
  sage:    {bg:"#EDF2EB",bg2:"#C8D9C4",acc:"#8FAF85",acc2:"#5A8050",txt:"#3D4A38",sub:"#5A6A54",card:"#FFFDF9",btnTxt:"#FFFDF9",dark:false},
  cream:   {bg:"#F7F2EA",bg2:"#EDE4D4",acc:"#8FAF85",acc2:"#5A8050",txt:"#3D4A38",sub:"#7A7D72",card:"#FFFDF9",btnTxt:"#FFFDF9",dark:false},
  lavender:{bg:"#F0EDF8",bg2:"#DDD5EE",acc:"#9B8EC8",acc2:"#6D5FAD",txt:"#3C3489",sub:"#534AB7",card:"#FFFDF9",btnTxt:"#FFFDF9",dark:false},
  moss:    {bg:"#3D4A38",bg2:"#4D5C48",acc:"#C8D9C4",acc2:"#8FAF85",txt:"#F7F2EA",sub:"#A8BCA4",card:"rgba(255,253,249,0.09)",btnTxt:"#3D4A38",dark:true},
  blush:   {bg:"#FBF0F0",bg2:"#F2D4D4",acc:"#C47B7B",acc2:"#A05050",txt:"#4A2828",sub:"#7A4848",card:"#FFFDF9",btnTxt:"#FFFDF9",dark:false},
  caramel: {bg:"#FDF3E3",bg2:"#F2DDB8",acc:"#C4894A",acc2:"#9A6030",txt:"#3D2800",sub:"#7A5020",card:"#FFFDF9",btnTxt:"#FFFDF9",dark:false}
};
const PAL_NAMES = {sage:"Sage",cream:"Cream",lavender:"Lavender",moss:"Moss",blush:"Blush",caramel:"Caramel"};
const PAL_HEX   = {sage:"#8FAF85",cream:"#EDE4D4",lavender:"#9B8EC8",moss:"#3D4A38",blush:"#C47B7B",caramel:"#C4894A"};

const SIZES = { pinterest:{w:1000,h:1500}, instagram:{w:1080,h:1080}, story:{w:1080,h:1920} };

// ─── CONTENT ──────────────────────────────────────────────────────────────────
const C = {
  planner:{
    product:{
      gentle:[
        {hook:"The planner that doesn't shame you for a bad brain day.",sub:"Because some days your battery is at 10% — and that's okay.",body:"High capacity → top 3 priorities.\nLow capacity → one success anchor. That's enough.\n\nNo rigid blocks. No guilt tracking.\nA gentle system that meets you where you are.",cta:"Get the ADHD Focus Planner"},
        {hook:"Stop fighting your brain. Start working with it.",sub:"A planner built for the way ADHD actually works.",body:"No rigid hourly blocks. No guilt tracking.\nNo shame for a slow day.\n\nJust a quiet system that adapts to you.",cta:"Instant Download — $16.99"},
      ],
      bold:[
        {hook:"Your old planner failed you. This one won't.",sub:"Built for ADHD. Tested for real life.",body:"Capacity check before you plan.\nSuccess anchor so one win counts.\nEmergency reset for derailed days.\n\nThis is the system that actually sticks.",cta:"Download Now — $16.99"},
        {hook:"Stop abandoning planners by week two.",sub:"The problem was never your discipline.",body:"Traditional planners assume same energy every day.\nYours doesn't work that way — and it's not a flaw.",cta:"Get the ADHD Planner"},
      ],
      empathetic:[
        {hook:"You've tried every planner. You're not the problem.",sub:"The tools weren't built for your brain.",body:"I know what it's like to buy a beautiful planner\nand feel worse by Friday.\n\nThis one was built for the hard days too.",cta:"Try a Gentler System"},
        {hook:"A love letter to every abandoned planner.",sub:"This one is different. Built for your brain.",body:"You're not bad at productivity.\nYou're using tools made for someone else.\n\nThis planner asks: what can you do today?",cta:"Get the Planner Today"},
      ],
      urgent:[{hook:"How many afternoons have you lost to brain fog?",sub:"There's a smarter, gentler way to plan your days.",body:"✦ A triage system for any battery level\n✦ Built-in emergency reset protocol\n✦ Permission to rest on every page",cta:"Download Instantly"}]
    },
    awareness:{
      gentle:[{hook:"5 signs it's executive dysfunction — not laziness.",sub:"Save this for the next time someone says 'just focus'.",body:"① You know what to do — but can't start\n② Task-switching feels physically painful\n③ You only focus near deadlines\n④ Rest doesn't actually recharge you\n⑤ Guilt spirals replace getting things done\n\nThis is brain wiring. Not character.",cta:"Save & Share This 🌿"}],
      bold:[{hook:"The ADHD shame spiral is costing you everything.",sub:"Here's how it works — and how to break it.",body:"Miss task → feel guilty → guilt blocks focus\n→ miss more → feel worse → shut down\n\nIt's dysregulation — not weakness.\nThere are systems that interrupt this cycle.",cta:"Break the Cycle →"}],
      empathetic:[{hook:"You're not lazy. You're running ADHD on a neurotypical system.",sub:"And the system was never built for you.",body:"Every tool you've tried assumes consistent daily energy,\nguilt as a motivator, and easy task transitions.\n\nYour brain does none of these.\nThat's not failure. That's a mismatch.",cta:"There's a Better Way →"}],
      urgent:[{hook:"How many hours have you lost to task paralysis this week?",sub:"Executive dysfunction is real. So are the solutions.",body:"✦ You freeze before starting tasks\n✦ Time blindness derails your days\n✦ You only work under pressure\n✦ Guilt follows every unfinished thing",cta:"Find the Right System →"}]
    },
    quote:{
      gentle:[
        {hook:"You don't need a perfect system.",sub:"You need one you'll actually use.",body:"",cta:"Gentle Focus Lab 🌿"},
        {hook:"Done imperfectly still counts.",sub:"Every single time.",body:"",cta:"Gentle Focus Lab 🌿"},
        {hook:"Rest is not the absence of productivity.",sub:"It is the foundation of it.",body:"",cta:"Gentle Focus Lab 🌿"},
        {hook:"One small thing is still one thing.",sub:"And that is always enough.",body:"",cta:"Gentle Focus Lab 🌿"},
      ],
      empathetic:[{hook:"Your bad brain day doesn't cancel your good intentions.",sub:"You are still trying. That matters.",body:"",cta:"Gentle Focus Lab 🌿"}],
      bold:[{hook:"Stop waiting to feel ready.",sub:"The system works on imperfect days too.",body:"",cta:"Start Today →"}],
      urgent:[{hook:"Every afternoon you lose to brain fog is one too many.",sub:"You deserve a system that actually works.",body:"",cta:"Fix It Today →"}]
    },
    list:{
      gentle:[{hook:"7 things your planner should have if you have ADHD.",sub:"Most don't include any of these.",body:"① A daily battery check before you plan\n② A success anchor — your bare minimum win\n③ A low-energy day protocol\n④ An emergency reset for derailed days\n⑤ A brain dump for mental clutter\n⑥ Gentle time blocks, not rigid hourly slots\n⑦ A shame-free weekly reflection",cta:"Save This 📌"}],
      bold:[{hook:"Stop using these 5 planning methods if you have ADHD.",sub:"They're making things worse.",body:"✗ Rigid hourly time-blocking\n✗ Massive to-do lists with no priority\n✗ Guilt habit tracking\n✗ Comparing output to neurotypicals\n✗ Planning rest as a reward, not a need",cta:"Get a Better System →"}],
      empathetic:[{hook:"6 gentle reminders for an ADHD hard day.",sub:"Save this. You'll need it.",body:"① Your pace is valid\n② One thing done is a win\n③ The shame spiral lies to you\n④ Tomorrow is not cancelled\n⑤ Rest is part of the work\n⑥ You are doing better than you think",cta:"Share With Someone Who Needs It"}],
      urgent:[{hook:"4 planning mistakes that tank ADHD productivity.",sub:"And what to do instead.",body:"① No priority filter → use a triage system\n② Ignoring energy levels → do a battery check\n③ No plan for bad days → build a protocol\n④ Shame tracking → track wins only",cta:"Fix Your System Today →"}]
    },
    lowenergy:{
      gentle:[{hook:"For the days when everything feels heavy.",sub:"Your success anchor today is just one thing.",body:"On a low-energy day:\n→ Find your smallest possible win\n→ Do only that\n→ Let everything else wait\n\nRest is not failure. Rest is progress.",cta:"See the Protocol →"}],
      empathetic:[{hook:"A gentle permission slip for today.",sub:"You are allowed to do less.",body:"You don't have to make up for it.\nYou don't have to work twice as hard tomorrow.\nYou don't have to apologise to yourself.\n\nOne small thing counts. Rest counts.",cta:"Be Gentle With Yourself 🌿"}],
      bold:[{hook:"Low energy days are data, not failure.",sub:"Your system should plan for them.",body:"If your system has no plan for a bad day,\nit's not a system — it's a wish.",cta:"Build a Resilient System →"}],
      urgent:[{hook:"How many good days have you lost recovering from bad ones?",sub:"There's a better way.",body:"✦ Identify ONE success anchor\n✦ Smallest possible version of it\n✦ Built-in permission to stop",cta:"Get the Protocol Today →"}]
    },
    carousel:{
      gentle:[{hook:"Stop blaming your discipline for the productivity gap.",sub:"Swipe to see what's actually happening in your brain.",body:"7 features the ADHD Focus Planner has\nthat most planners are missing.\n\nSwipe to see all →",cta:"Link in Bio"}],
      bold:[{hook:"7 features your planner is missing if you have ADHD.",sub:"Swipe to see every one.",body:"Most productivity tools were built for neurotypical brains.\nThis one wasn't. Swipe →",cta:"Get the Planner →"}],
      empathetic:[{hook:"Every planner you've abandoned had the same problem.",sub:"Swipe to find out what it was.",body:"It wasn't built for the days when you have nothing left.\nThe ADHD Focus Planner was. Swipe →",cta:"Try a Gentler System →"}],
      urgent:[{hook:"How many afternoons this week did you lose to brain fog?",sub:"Swipe — there's a system that fixes this.",body:"Swipe to see every feature →",cta:"Download Today"}]
    }
  },
  fuel:{
    product:{
      gentle:[
        {hook:"The real reason you crash at 3PM isn't willpower.",sub:"It's what you had for lunch.",body:"The Focus Fuel Protocol swaps quick energy spikes\nfor slow-burning fuel that keeps your brain online.\n\n15 meals. 5–15 minutes each. Everyday ingredients.",cta:"Get the Protocol"},
        {hook:"15 meals that keep your brain online all afternoon.",sub:"No complicated diets. No meal prep. Just better fuel.",body:"Designed for ADHD brains specifically.\nBuilt around steady blood sugar, not spikes.\n\nEverything ready in under 15 minutes.",cta:"Instant Download"},
      ],
      bold:[{hook:"Your lunch is destroying your afternoon focus.",sub:"Here's exactly how to fix it.",body:"Blood sugar spike → crash → brain fog → wasted hours.\nEvery single day. Until you change the fuel.\n\n15 quick meals that break the cycle.",cta:"Fix Your Fuel Today →"}],
      empathetic:[{hook:"You've tried everything to fix your afternoon focus.",sub:"But nobody talked about the food.",body:"I spent years chasing productivity hacks\nbefore I realised the crash was biological.\n\nThe right food, at the right time, changes everything.",cta:"Get the Focus Fuel Protocol"}],
      urgent:[{hook:"How many afternoons have you lost to the 3PM crash?",sub:"The fix takes 10 minutes to prepare.",body:"15 brain-fuelling meals designed for ADHD.\nSlow-burn energy that carries you through 6PM.",cta:"Download Now"}]
    },
    awareness:{
      gentle:[{hook:"What actually happens in your brain after most lunches.",sub:"It's not about willpower. It's about blood sugar.",body:"Simple carbs → fast glucose spike\n→ insulin response → energy crash\n→ brain fog → afternoon paralysis\n\nThis hits ADHD brains harder.\nWe're more sensitive to glucose swings.",cta:"Save This 🌿"}],
      bold:[{hook:"Stop drinking more coffee to fix the 3PM crash.",sub:"Caffeine delays it. It doesn't fix it.",body:"Caffeine masks the blood sugar drop temporarily.\nBy 4PM, you crash harder.\n\nThe fix is the fuel — not more stimulants.",cta:"Fix the Root Cause →"}],
      empathetic:[{hook:"It's not your fault you crash every afternoon.",sub:"Your brain isn't broken. Your lunch is.",body:"For years I thought I just had bad focus.\nTurns out I was spiking my blood sugar at noon\nand wondering why I couldn't think by 2PM.",cta:"Learn More →"}],
      urgent:[{hook:"Every day you eat the wrong lunch, you lose your afternoon.",sub:"Here's what to eat instead.",body:"The Focus Fuel Protocol: 15 quick meals\nthat fuel steady focus from noon to 6PM.\n\nADHD-specific. 5–15 min prep.",cta:"Fix It Today"}]
    },
    quote:{
      gentle:[
        {hook:"Your brain runs on what you feed it.",sub:"Give it something worth running on.",body:"",cta:"Gentle Focus Lab 🌿"},
        {hook:"The 3PM crash is not inevitable.",sub:"It's a design problem with a simple fix.",body:"",cta:"Gentle Focus Lab 🌿"},
      ],
      empathetic:[{hook:"You're not weak for losing focus after lunch.",sub:"You're just under-fuelled.",body:"",cta:"Gentle Focus Lab 🌿"}],
      bold:[{hook:"Stop blaming your brain for what your blood sugar is doing.",sub:"Fix the fuel. Fix the focus.",body:"",cta:"Focus Fuel Protocol →"}],
      urgent:[{hook:"Every bad afternoon starts with the wrong lunch.",sub:"Every good one starts with the right fuel.",body:"",cta:"Get the Protocol Today →"}]
    },
    list:{
      gentle:[{hook:"5 foods that support ADHD focus (and 3 that destroy it).",sub:"Save this before your next grocery run.",body:"Support focus:\n① Eggs · slow-release protein\n② Walnuts · omega-3s for dopamine\n③ Oats · steady glucose\n④ Dark chocolate · mild stimulant\n⑤ Avocado · healthy fat\n\nDestroy focus:\n✗ White bread alone\n✗ Sugary drinks\n✗ Skipping lunch entirely",cta:"Save This 📌"}],
      bold:[{hook:"4 lunch mistakes that guarantee a brain fog afternoon.",sub:"Stop making these today.",body:"① Eating simple carbs with no protein or fat\n② Skipping lunch and 'pushing through'\n③ Relying on coffee as your only afternoon fuel\n④ Eating at your desk while multitasking",cta:"Fix Your Lunch →"}],
      empathetic:[{hook:"5 gentle nutrition shifts for ADHD focus.",sub:"Small changes. Real difference.",body:"① Add protein to every meal\n② Eat before you're hungry — prevent the crash\n③ Keep healthy snacks visible and reachable\n④ Hydrate — dehydration mimics brain fog\n⑤ One slow-burn meal a day is a great start",cta:"Save for Later 🌿"}],
      urgent:[{hook:"Stop losing your afternoons to food-related brain fog.",sub:"Here's the simple fix.",body:"✦ 15 meals proven to support ADHD focus\n✦ 5–15 minute prep time\n✦ Ends the blood sugar crash cycle",cta:"Get It Now"}]
    },
    lowenergy:{
      gentle:[{hook:"On a low-energy day, nutrition matters even more.",sub:"Your brain needs the right fuel to recover.",body:"When your ADHD battery is running low,\na brain-fog lunch makes everything harder.\n\nEven one good meal can shift the afternoon.",cta:"See the Protocol →"}],
      bold:[{hook:"Low energy day? Don't reach for coffee. Reach for better fuel.",sub:"The crash is chemical. So is the fix.",body:"One slow-burn meal can turn a 10% battery day\ninto a functional one.\n\nThat's not motivation. That's biology.",cta:"Fix the Chemistry →"}],
      empathetic:[{hook:"Your low-energy days might be connected to what you're eating.",sub:"Not your mood. Not your mindset. Your fuel.",body:"Blood sugar instability is one of the most\nunderlooked triggers for ADHD shutdown days.",cta:"Learn More →"}],
      urgent:[{hook:"How many 'bad brain days' were actually bad nutrition days?",sub:"The connection is real — and fixable.",body:"The Focus Fuel Protocol: 15 meals for ADHD.\nInstant download.",cta:"Get It Today →"}]
    },
    carousel:{
      gentle:[{hook:"Why you crash at 3PM — and how to fix it in 10 minutes.",sub:"Swipe to see the full breakdown.",body:"The Focus Fuel Protocol: 15 meals designed for ADHD.\nSlow-burn energy. No crash. No brain fog.\n\nSwipe →",cta:"Link in Bio"}],
      bold:[{hook:"Your lunch is your enemy. Here's how to fix it.",sub:"Swipe for the full system.",body:"Blood sugar spike → crash → brain fog → lost afternoon.\n\nSwipe to see how to fix it →",cta:"Get the Protocol →"}],
      empathetic:[{hook:"Nobody told you the 3PM crash wasn't your fault.",sub:"Swipe to find out why it's happening.",body:"It's not willpower. It's blood sugar.\nSwipe to learn the simple fix.",cta:"Try It Today →"}],
      urgent:[{hook:"Stop losing your afternoons to brain fog.",sub:"Swipe — the fix is simpler than you think.",body:"15 meals. 5–15 minutes each.\nInstant download.",cta:"Download Now"}]
    }
  },
  bundle:{
    product:{
      gentle:[
        {hook:"The complete ADHD focus system — brain and body, together.",sub:"Two products. One gentle system that works from both sides.",body:"🗂️ ADHD Focus Planner\nShame-free executive function system\n\n🍃 Focus Fuel Protocol\n15 meals to end the afternoon brain fog\n\nSave 30% when you get both.",cta:"Get the Bundle — Save 30%"},
        {hook:"Fix the system. Fix the fuel. Fix your focus.",sub:"Most people only fix one. This bundle fixes both.",body:"The planner handles task paralysis and bad brain days.\nThe protocol handles brain fog and afternoon crashes.\n\nTogether: a complete neuro-system.",cta:"Total Focus Bundle"},
      ],
      bold:[{hook:"Two reasons ADHD productivity systems fail — and one fix.",sub:"They fix the system OR the biology. Never both.",body:"System only → still crashes at 3PM\nFuel only → still paralysed by the task list\n\nThe bundle fixes both.",cta:"Get the Complete System →"}],
      empathetic:[{hook:"What if you could tackle ADHD from both sides at once?",sub:"The system and the fuel. Together.",body:"I built both products separately and watched people\nstill struggle — because the missing piece was the other one.\n\nThe bundle gives you both.",cta:"Get the Bundle Today"}],
      urgent:[{hook:"Stop leaving half the problem unsolved.",sub:"The bundle fixes what single products miss.",body:"✦ ADHD Planner → system side\n✦ Focus Fuel Protocol → biological side\n\n$32.98 value → $24.99",cta:"Download the Bundle Now"}]
    },
    awareness:{
      gentle:[{hook:"What a full-focus day looks like — from both sides.",sub:"When your system and your fuel work together.",body:"Morning: battery check → top 3 priorities set\nLunch: slow-burn focus fuel (10 min prep)\nAfternoon: no crash, no fog, actual work done\nEvening: gentle wind-down, tomorrow anchored",cta:"See the Bundle →"}],
      bold:[{hook:"ADHD productivity has two failure points. Most fix only one.",sub:"Here's why that keeps you stuck.",body:"Failure point 1: no system → task paralysis\nFailure point 2: wrong fuel → afternoon crash\n\nFix both.",cta:"Fix Both Today →"}],
      empathetic:[{hook:"You've been working twice as hard with half the tools.",sub:"The missing piece might be the other product.",body:"The planner handles your mind.\nThe protocol handles your body.\n\nTogether, they change everything.",cta:"Get the Complete System →"}],
      urgent:[{hook:"Every day without both is a day half-solved.",sub:"The complete system is $24.99.",body:"The Total Focus Bundle gives you both.\nInstant download. Start today.",cta:"Download Now →"}]
    },
    quote:{
      gentle:[
        {hook:"Your system and your fuel are both part of the plan.",sub:"One without the other is half an answer.",body:"",cta:"Gentle Focus Lab 🌿"},
        {hook:"Fix the brain. Fix the body. Finally feel the difference.",sub:"That's what the bundle does.",body:"",cta:"Total Focus Bundle ✨"},
      ],
      bold:[{hook:"Half a system gets you half the results.",sub:"The bundle is the whole answer.",body:"",cta:"Get the Bundle →"}],
      empathetic:[{hook:"You've been trying to focus with the wrong tools.",sub:"The complete system changes everything.",body:"",cta:"Gentle Focus Lab 🌿"}],
      urgent:[{hook:"Stop patching problems. Solve them.",sub:"The Total Focus Bundle. One decision.",body:"",cta:"Get It Today"}]
    },
    list:{
      gentle:[{hook:"Everything inside the Total Focus Bundle.",sub:"Two products. Complete system. 30% off.",body:"🗂️ ADHD Focus Planner:\n✦ Triage system & battery check\n✦ Success anchor for any day\n✦ Emergency reset + Dark mode editions\n\n🍃 Focus Fuel Protocol:\n✦ 15 brain-fuelling meals\n✦ 5–15 minute prep · Ends the 3PM crash",cta:"Get the Bundle"}],
      bold:[{hook:"4 reasons the bundle beats buying separately.",sub:"The math is simple.",body:"① Save $8 (30% off)\n② System + fuel = complete ADHD toolkit\n③ No guessing which product you need first\n④ Both instant downloads — start today",cta:"Get the Bundle →"}],
      empathetic:[{hook:"5 things you'll notice in the first week with the bundle.",sub:"Both products working together.",body:"① No more 3PM crash\n② Tasks feel less paralysing\n③ Low-energy days are survivable, not shameful\n④ You stop relying on caffeine alone\n⑤ Rest becomes part of the system",cta:"Try It Today →"}],
      urgent:[{hook:"The bundle gives you the complete ADHD focus system.",sub:"Here's everything inside.",body:"$32.98 value → $24.99 (save 30%)\n\n✦ ADHD Planner (10-page PDF)\n✦ Focus Fuel Protocol (35MB guide)\n✦ Both instant downloads",cta:"Download the Bundle Now"}]
    },
    lowenergy:{
      gentle:[{hook:"On your hardest ADHD days — the bundle has you covered.",sub:"System for the chaos. Fuel for the fog.",body:"Low battery days hit different with ADHD.\nThe planner has a low-energy protocol built in.\nThe fuel guide has meals ready in 5 minutes.",cta:"Get the Bundle →"}],
      bold:[{hook:"The bundle works hardest on your worst days.",sub:"That's exactly when you need both.",body:"Bad brain day?\nPlanner: your success anchor is ONE thing.\nProtocol: a 5-minute meal to stabilise.",cta:"Get It Today"}],
      empathetic:[{hook:"Some days you need the system. Some days you need the fuel.",sub:"Most days, you need both.",body:"The bundle was designed for real ADHD life —\nthe inconsistent, unpredictable, beautiful mess of it.",cta:"Try the Complete System →"}],
      urgent:[{hook:"Stop choosing between the system and the fuel.",sub:"The bundle gives you both for less.",body:"$32.98 value → $24.99 bundle\n\nBoth instant downloads. Start today.",cta:"Download Now →"}]
    },
    carousel:{
      gentle:[{hook:"What if your focus problem was actually two problems?",sub:"Swipe to find out what both are — and how to fix them.",body:"🗂️ System problem → ADHD Planner\n🍃 Fuel problem → Focus Fuel Protocol\n\nThe bundle fixes both. Swipe to see →",cta:"Link in Bio"}],
      bold:[{hook:"Most ADHD tools fix the surface. The bundle fixes the root.",sub:"Swipe to see what the difference is.",body:"System + Fuel = complete ADHD focus toolkit.\n\nSwipe to see everything inside →",cta:"Get the Bundle →"}],
      empathetic:[{hook:"Two products. One complete system. Zero shame.",sub:"Swipe to see how they work together.",body:"Built for real ADHD life.\n\nSwipe to see what's included →",cta:"Try the Bundle Today →"}],
      urgent:[{hook:"Stop losing afternoons. Start the complete system.",sub:"Swipe to see exactly what's inside.",body:"$32.98 value → $24.99 bundle\nSwipe →",cta:"Download Now →"}]
    }
  }
};

const CAPTIONS = {
  planner:{
    product:"Stop fighting your brain. Start working with it. 🌿\n\nMost planners are built for neurotypical brains — rigid hourly blocks, no flexibility, zero grace for a hard day.\n\nThis planner asks: what's your battery level today?\n\n🔋 High capacity → Top 3 priorities + focus blocks\n🪫 Low capacity → Your success anchor is ONE thing. That counts.\n\nBuilt-in Emergency Reset · Brain Dump · Dark Mode + Ink-Saver edition included.\n\nPDF · GoodNotes & Notability · Instant download · Link in bio →",
    awareness:"5 signs your 'lazy afternoon' is actually ADHD executive dysfunction 🧠\n\n① You know exactly what to do — but you can't start\n② Switching tasks feels physically painful\n③ You only focus when the deadline is tomorrow\n④ Rest doesn't actually recharge you\n⑤ Guilt spirals replace getting things done\n\nThis isn't a character flaw. It's brain wiring.\n\nSave this if you needed to hear it. 🌿",
    quote:"\"You don't need a perfect system. You need one you'll actually use.\" 🌿\n\nI spent years building elaborate setups I'd abandon by week two. Because they were built for an ideal version of me that doesn't exist.\n\nThe system I use now is simpler. It asks what I can do today.\n\n(It's in the shop — link in bio. No pressure.)",
    list:"7 things ADHD brains need in a planner that most don't have 🌿\n\n① Daily battery check · ② Success anchor · ③ Low-energy protocol · ④ Emergency reset · ⑤ Brain dump space · ⑥ Gentle time blocks · ⑦ Shame-free weekly reflection\n\nThe ADHD Focus Planner has all 7 — link in bio",
    lowenergy:"For the days when everything feels heavy. 🌧️\n\nOn those days: find your ONE success anchor → do the smallest possible version → let everything else wait.\n\nRest is not failure. Rest is a form of progress.\n\nADHD Focus Planner · Instant download → link in bio",
    carousel:"7 things ADHD brains need in a planner — and why most don't include them.\n\nSave this if you've ever abandoned a planner by week 2 🌿\n\n$16.99 · Instant download · Link in bio →"
  },
  fuel:{
    product:"The real reason you crash at 3PM isn't discipline. It's your lunch. 🍃\n\nBlood sugar spike → insulin response → energy crash → brain fog → wasted afternoon\n\nThe Focus Fuel Protocol: 15 quick brain-supporting meals, ready in 5–15 minutes.\n\nDesigned for ADHD brains specifically.\n\nPDF · Instant download · Link in bio →",
    awareness:"The single most overlooked ADHD productivity tool? Your lunch. 🍃\n\nSimple carb lunch → fast blood sugar spike → energy crash → brain fog → zero productivity.\n\nThis hits ADHD brains harder. The fix isn't more coffee. It's slower-burning fuel.\n\nSave this if it explains your afternoons. 🌿",
    quote:"\"Your brain runs on what you feed it. Give it something worth running on.\" 🍃\n\nFor years I thought my afternoon crashes were a focus problem. Turns out they were a fuel problem.\n\n(The Focus Fuel Protocol is in the shop — link in bio.)",
    list:"5 foods that support ADHD focus — and 3 that tank it 🍃\n\nSUPPORT: ① Eggs ② Walnuts ③ Oats ④ Dark chocolate ⑤ Avocado\n\nTANK: ✗ White bread alone ✗ Sugary drinks ✗ Skipping lunch\n\n(All 15 focus meals in the Focus Fuel Protocol — link in bio)",
    lowenergy:"On a low-energy day, nutrition matters even more. 🌧️\n\nEven one good meal can shift the afternoon. The Protocol has low-effort 5-minute options.\n\nPDF · Instant download → link in bio",
    carousel:"Why you crash at 3PM — and how to fix it in 10 minutes. 🍃\n\n$16.99 · Instant download · Link in bio →"
  },
  bundle:{
    product:"Two reasons ADHD productivity systems fail:\n\n① They only fix the system — not the biology\n② They only fix the biology — not the system\n\nThe Total Focus Bundle fixes both. ✨\n\n🗂️ ADHD Focus Planner + 🍃 Focus Fuel Protocol\n\n$32.98 value → $24.99 (save 30%)\n\nInstant download · Link in bio →",
    awareness:"What a full-focus day looks like with the right system and fuel. 🌿\n\nMorning: battery check + top 3 priorities\nLunch: 10-min slow-burn focus meal\nAfternoon: no 3PM crash, actual sustained focus\nEvening: gentle wind-down\n\nTotal Focus Bundle · $24.99 · Save 30% · Link in bio",
    quote:"\"Fix the system. Fix the fuel. Finally fix the focus.\" ✨\n\nI spent years treating these as separate problems. But they're both the same problem.\n\n(30% off when you get them together — link in bio.)",
    list:"Everything inside the Total Focus Bundle ✨\n\n🗂️ ADHD Focus Planner · 🍃 Focus Fuel Protocol\n\nTotal value: $32.98 → Bundle: $24.99 · Link in bio",
    lowenergy:"On your hardest ADHD days — the bundle has a plan for both. 🌧️\n\nPlanner: ONE success anchor · Fuel: 5-minute stabilising meal\n\nTotal Focus Bundle · $24.99 · Save 30% · Link in bio",
    carousel:"What if your focus problem was actually two problems? ✨\n\nThe bundle fixes both.\n\n$32.98 value → $24.99 (save 30%) · Link in bio"
  }
};

const HASHTAGS = {
  planner:"#ADHDplanner #neurodivergentplanner #adhdproductivity #gentleproductivity #executivefunction #adhdwomen #digitalplanner #adhdtools #focusplanner #adhdlife",
  fuel:"#brainfog #adhdnutrition #focusfood #afternooncrash #brainhealth #adhdmeals #workfromhome #mentalclarity #adhdtips #neurodivergentlife",
  bundle:"#adhdbundle #adhdproductivity #neurodivergent #adhdwomen #focussystem #adhdnutrition #gentleproductivity #digitaldownload #adhdlife #brainfog"
};

// ─── UTILITIES ────────────────────────────────────────────────────────────────
const pick = arr => arr[Math.floor(Math.random()*arr.length)];
const clamp = (v,mn,mx) => Math.max(mn,Math.min(mx,v));

function rrPath(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r);
  ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y); ctx.closePath();
}

function wrapText(ctx,text,x,y,maxW,lh){
  if(!text) return y;
  const words=text.split(' '); let line='',cy=y;
  for(const w of words){
    const t=line?line+' '+w:w;
    if(ctx.measureText(t).width>maxW&&line){ ctx.fillText(line,x,cy); line=w; cy+=lh; }
    else line=t;
  }
  ctx.fillText(line,x,cy); return cy;
}

// ─── FLAT LAY SCENE DRAWERS (programmatic — no external images needed) ────────
function drawLinenTexture(ctx,W,H,color,alpha=0.25){
  ctx.save(); ctx.strokeStyle=color; ctx.lineWidth=0.7; ctx.globalAlpha=alpha;
  for(let y=0;y<H;y+=5){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
  ctx.restore();
}

function drawMarbleVein(ctx,x1,y1,x2,y2,color,alpha=0.08){
  ctx.save(); ctx.strokeStyle=color; ctx.lineWidth=clamp((x2-x1)*0.003,0.5,2);
  ctx.globalAlpha=alpha; ctx.beginPath(); ctx.moveTo(x1,y1);
  const cp1x=x1+(x2-x1)*0.3+( Math.random()-0.5)*(x2-x1)*0.4;
  const cp1y=y1+(y2-y1)*0.3+( Math.random()-0.5)*(y2-y1)*0.4;
  const cp2x=x1+(x2-x1)*0.7+( Math.random()-0.5)*(x2-x1)*0.3;
  const cp2y=y1+(y2-y1)*0.7+( Math.random()-0.5)*(y2-y1)*0.3;
  ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x2,y2); ctx.stroke(); ctx.restore();
}

function drawLeafSprig(ctx,cx,cy,len,angle,color,alpha=0.7){
  ctx.save(); ctx.globalAlpha=alpha; ctx.translate(cx,cy); ctx.rotate(angle);
  ctx.strokeStyle=color; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,-len); ctx.stroke();
  for(let i=1;i<=3;i++){
    const ly=-len*(i/4); const lw=len*0.13;
    ctx.fillStyle=color;
    ctx.save(); ctx.translate(0,ly); ctx.rotate(-0.6);
    ctx.beginPath(); ctx.ellipse(0,0,lw,lw*2.5,0,0,Math.PI*2); ctx.fill(); ctx.restore();
    ctx.save(); ctx.translate(0,ly); ctx.rotate(0.6);
    ctx.beginPath(); ctx.ellipse(0,0,lw,lw*2.5,0,0,Math.PI*2); ctx.fill(); ctx.restore();
  }
  ctx.restore();
}

function drawMug(ctx,cx,cy,r,bodyColor,handleColor,steamColor){
  // shadow
  ctx.save(); ctx.globalAlpha=0.08; ctx.fillStyle='#000';
  ctx.beginPath(); ctx.ellipse(cx+r*0.1,cy+r*0.1,r,r*0.35,0,0,Math.PI*2); ctx.fill();
  ctx.restore();
  // body
  ctx.fillStyle=bodyColor;
  rrPath(ctx,cx-r,cy-r*1.3,r*2,r*2.6,r*0.2); ctx.fill();
  // rim
  ctx.fillStyle=handleColor;
  ctx.beginPath(); ctx.ellipse(cx,cy-r*1.3,r,r*0.22,0,0,Math.PI*2); ctx.fill();
  // inner top
  ctx.fillStyle='rgba(0,0,0,0.06)';
  ctx.beginPath(); ctx.ellipse(cx,cy-r*1.3,r*0.82,r*0.18,0,0,Math.PI*2); ctx.fill();
  // handle
  ctx.strokeStyle=handleColor; ctx.lineWidth=r*0.18; ctx.lineCap='round';
  ctx.beginPath(); ctx.arc(cx+r*1.1,cy-r*0.3,r*0.6,Math.PI*0.3,Math.PI*1.3,false); ctx.stroke();
  // steam
  ctx.strokeStyle=steamColor; ctx.lineWidth=1.5; ctx.globalAlpha=0.35; ctx.lineCap='round';
  for(let i=-1;i<=1;i++){
    ctx.beginPath(); ctx.moveTo(cx+i*r*0.35,cy-r*1.6);
    ctx.quadraticCurveTo(cx+i*r*0.35+r*0.15,cy-r*2,cx+i*r*0.35,cy-r*2.4); ctx.stroke();
  }
  ctx.globalAlpha=1;
}

function drawNotebook(ctx,x,y,w,h,pal){
  const r=12;
  // shadow
  ctx.save(); ctx.globalAlpha=0.1; ctx.fillStyle='#000';
  rrPath(ctx,x+8,y+8,w,h,r); ctx.fill(); ctx.restore();
  // cover
  ctx.fillStyle=pal.acc;
  rrPath(ctx,x,y,w,h,r); ctx.fill();
  // inner page
  ctx.fillStyle='#FFFDF9';
  rrPath(ctx,x+w*0.06,y+h*0.04,w*0.88,h*0.92,r*0.7); ctx.fill();
  // header line
  ctx.fillStyle=pal.bg2;
  ctx.fillRect(x+w*0.1,y+h*0.07,w*0.8,h*0.07);
  // title text area
  ctx.fillStyle=pal.acc+'60';
  ctx.fillRect(x+w*0.12,y+h*0.09,w*0.4,h*0.04);
  // content lines
  for(let i=0;i<6;i++){
    const lx=x+w*0.1,ly=y+h*(0.18+i*0.13);
    const lw=w*(0.78-i*0.04*(i%2===0?1:0.5));
    ctx.fillStyle=pal.bg2+'CC';
    ctx.fillRect(lx,ly,lw,h*0.025);
    // checkbox style
    ctx.strokeStyle=pal.acc+'99'; ctx.lineWidth=1.5;
    ctx.strokeRect(lx-w*0.04,ly-h*0.005,h*0.03,h*0.03);
    if(i<4){ ctx.fillStyle=pal.acc+'CC'; ctx.fillRect(lx-w*0.039,ly-h*0.004,h*0.028,h*0.028); }
  }
  // spine dots
  ctx.fillStyle='rgba(255,255,255,0.3)';
  for(let i=0;i<4;i++){ ctx.beginPath(); ctx.arc(x+w*0.03,y+h*(0.25+i*0.18),3,0,Math.PI*2); ctx.fill(); }
  // bottom brand tag
  ctx.fillStyle=pal.acc+'DD';
  rrPath(ctx,x+w*0.1,y+h*0.87,w*0.45,h*0.07,h*0.035); ctx.fill();
  ctx.fillStyle='rgba(255,255,255,0.9)'; ctx.font=`500 ${clamp(w*0.05,9,14)}px sans-serif`;
  ctx.textAlign='left'; ctx.fillText('Gentle Focus',x+w*0.14,y+h*0.925);
}

// ─── PROGRAMMATIC FLAT LAY BACKGROUNDS ───────────────────────────────────────
function drawFlatLayScene(ctx,W,H,pal,scene){
  if(scene==='desk'){
    // linen cream bg
    ctx.fillStyle='#F5EFE6'; ctx.fillRect(0,0,W,H);
    drawLinenTexture(ctx,W,H,'#C8B89A',0.18);
    // notebook center-top
    const nbW=W*0.55,nbH=H*0.3;
    drawNotebook(ctx,W*0.22,H*0.06,nbW,nbH,pal);
    // pen beside notebook
    ctx.save(); ctx.translate(W*0.82,H*0.12); ctx.rotate(0.15);
    ctx.fillStyle=pal.acc; rrPath(ctx,-W*0.012,-H*0.15,W*0.024,H*0.18,W*0.012); ctx.fill();
    ctx.fillStyle='#FFF'; ctx.fillRect(-W*0.006,-H*0.148,W*0.012,H*0.03);
    ctx.fillStyle='#AAA'; rrPath(ctx,-W*0.012,H*0.02,W*0.024,H*0.01,4); ctx.fill();
    ctx.restore();
    // coffee mug top-right
    drawMug(ctx,W*0.82,H*0.2,W*0.07,'#FFFDF9',pal.bg2,'#A89070');
    // eucalyptus top-left
    drawLeafSprig(ctx,W*0.1,H*0.25,H*0.12,0.2,'#8FAF85',0.7);
    drawLeafSprig(ctx,W*0.06,H*0.25,H*0.09,0.5,'#6A9060',0.5);
    // small plant bottom-right
    drawLeafSprig(ctx,W*0.88,H*0.45,H*0.09,-0.3,'#8FAF85',0.6);
    // scattered dots
    ctx.fillStyle=pal.acc; ctx.globalAlpha=0.12;
    [[0.15,0.5],[0.85,0.65],[0.1,0.8],[0.9,0.3]].forEach(([dx,dy])=>{ ctx.beginPath(); ctx.arc(W*dx,H*dy,W*0.006,0,Math.PI*2); ctx.fill(); });
    ctx.globalAlpha=1;
  } else if(scene==='marble'){
    ctx.fillStyle='#F8F6F2'; ctx.fillRect(0,0,W,H);
    // marble veins
    for(let i=0;i<12;i++) drawMarbleVein(ctx,Math.random()*W,0,Math.random()*W,H,'#9A9090',0.06+Math.random()*0.06);
    // bowl / plate
    ctx.fillStyle='rgba(255,253,249,0.95)';
    ctx.beginPath(); ctx.arc(W*0.5,H*0.22,W*0.28,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle='#EDE4D4'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.arc(W*0.5,H*0.22,W*0.25,0,Math.PI*2); ctx.stroke();
    // food items in bowl
    const foods=[['#8BC34A',W*0.18],['#FF8A65',W*0.14],['#F9A825',W*0.12],['#81C784',W*0.1],['#FF7043',W*0.09]];
    const angles=[0,1.3,2.5,3.8,5.0];
    foods.forEach(([c,r2],i)=>{ ctx.fillStyle=c; ctx.globalAlpha=0.85; ctx.beginPath(); ctx.arc(W*0.5+Math.cos(angles[i])*W*0.12,H*0.22+Math.sin(angles[i])*W*0.1,r2,0,Math.PI*2); ctx.fill(); });
    ctx.globalAlpha=1;
    // herb sprigs
    drawLeafSprig(ctx,W*0.15,H*0.38,H*0.1,0.3,'#5A9050',0.65);
    drawLeafSprig(ctx,W*0.85,H*0.36,H*0.09,-0.4,'#5A9050',0.6);
    // lemon
    ctx.fillStyle='#F9D030'; ctx.beginPath(); ctx.arc(W*0.82,H*0.18,W*0.065,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle='#E8C010'; ctx.lineWidth=1.5;
    for(let a=0;a<6;a++){ ctx.beginPath(); ctx.moveTo(W*0.82,H*0.18); ctx.lineTo(W*0.82+Math.cos(a*Math.PI/3)*W*0.055,H*0.18+Math.sin(a*Math.PI/3)*W*0.055); ctx.stroke(); }
  } else if(scene==='botanical'){
    ctx.fillStyle='#F0EDE5'; ctx.fillRect(0,0,W,H);
    // large background leaves
    const leafColors=['#8FAF85','#6A9060','#A8C898','#5A8050','#C8D9C4'];
    const leafPositions=[[0.1,0.1,H*0.35,0.3],[0.85,0.05,H*0.28,-0.4],[0.05,0.5,H*0.3,0.6],[0.9,0.45,H*0.25,-0.3],[0.15,0.85,H*0.22,0.1],[0.8,0.8,H*0.2,-0.5]];
    leafPositions.forEach(([dx,dy,len,ang],i)=>{
      ctx.save(); ctx.globalAlpha=0.55;
      drawLeafSprig(ctx,W*dx,H*dy,len,ang,leafColors[i%leafColors.length],0.7); ctx.restore();
    });
    // small flowers
    const flowerPos=[[0.5,0.08],[0.3,0.2],[0.7,0.15],[0.2,0.6],[0.78,0.55]];
    flowerPos.forEach(([dx,dy])=>{
      ctx.fillStyle='#F4C8C8'; ctx.globalAlpha=0.7;
      for(let p=0;p<5;p++){ const a=p*Math.PI*0.4; ctx.beginPath(); ctx.ellipse(W*dx+Math.cos(a)*W*0.025,H*dy+Math.sin(a)*H*0.015,W*0.018,W*0.025,a,0,Math.PI*2); ctx.fill(); }
      ctx.fillStyle='#FAEEDA'; ctx.globalAlpha=1;
      ctx.beginPath(); ctx.arc(W*dx,H*dy,W*0.012,0,Math.PI*2); ctx.fill();
    });
    ctx.globalAlpha=1;
  } else if(scene==='cozy'){
    // warm taupe base
    ctx.fillStyle='#EDE0CF'; ctx.fillRect(0,0,W,H);
    // soft blanket texture - diagonal lines
    ctx.save(); ctx.strokeStyle='#D4C4A8'; ctx.lineWidth=1; ctx.globalAlpha=0.3;
    for(let i=-H;i<W+H;i+=14){ ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i+H,H); ctx.stroke(); }
    ctx.restore();
    // journal open center
    const jW=W*0.6,jH=H*0.28;
    ctx.fillStyle='#FFFDF9'; ctx.shadowColor='rgba(0,0,0,0.08)'; ctx.shadowBlur=20;
    rrPath(ctx,W*0.2,H*0.06,jW,jH,12); ctx.fill(); ctx.shadowBlur=0;
    // spine line
    ctx.strokeStyle='#EDE4D4'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(W*0.5,H*0.06); ctx.lineTo(W*0.5,H*0.06+jH); ctx.stroke();
    // journal lines
    ctx.fillStyle='#EDE4D4';
    for(let i=0;i<5;i++){ ctx.fillRect(W*0.23,H*0.1+i*H*0.04,jW*0.43-W*0.03,3); ctx.fillRect(W*0.53,H*0.1+i*H*0.04,jW*0.43-W*0.03,3); }
    // tea mug
    drawMug(ctx,W*0.82,H*0.18,W*0.065,'#F2C9A0','#E8A870','rgba(200,180,160,0.5)');
    // eucalyptus
    drawLeafSprig(ctx,W*0.14,H*0.38,H*0.11,0.25,'#8FAF85',0.65);
    // candle
    ctx.fillStyle='#FAEEDA'; rrPath(ctx,W*0.15,H*0.1,W*0.04,H*0.1,4); ctx.fill();
    ctx.fillStyle='#E8C870'; ctx.beginPath(); ctx.arc(W*0.17,H*0.1,W*0.008,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle='rgba(255,180,0,0.4)'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(W*0.17,H*0.095); ctx.quadraticCurveTo(W*0.175,H*0.075,W*0.17,H*0.065); ctx.stroke();
  }

  // always add corner botanical accents
  ctx.save(); ctx.globalAlpha=0.12; ctx.fillStyle=pal.acc;
  for(let i=0;i<5;i++){ const a=0.3+(i/5)*Math.PI; ctx.save(); ctx.translate(W*0.9,H*0.05); ctx.rotate(a); ctx.beginPath(); ctx.ellipse(0,-W*0.055,W*0.014,W*0.055,0,0,Math.PI*2); ctx.fill(); ctx.restore(); }
  ctx.globalAlpha=0.18; ctx.fillStyle=pal.bg2;
  for(let i=0;i<4;i++){ const a=2.7+(i/4)*Math.PI; ctx.save(); ctx.translate(W*0.1,H*0.95); ctx.rotate(a); ctx.beginPath(); ctx.ellipse(0,-W*0.04,W*0.011,W*0.04,0,0,Math.PI*2); ctx.fill(); ctx.restore(); }
  ctx.restore();
}

// ─── LENA AVATAR ─────────────────────────────────────────────────────────────
function drawLenaAvatar(ctx,cx,cy,r,onDark){
  // ring
  ctx.save();
  const grad=ctx.createLinearGradient(cx-r,cy-r,cx+r,cy+r);
  grad.addColorStop(0,'#C8D9C4'); grad.addColorStop(0.5,'#DDD5EE'); grad.addColorStop(1,'#F2C9A0');
  ctx.strokeStyle=grad; ctx.lineWidth=r*0.1;
  ctx.beginPath(); ctx.arc(cx,cy,r+r*0.07,0,Math.PI*2); ctx.stroke();
  // bg circle
  ctx.fillStyle=onDark?'#4D5C48':'#F5F0EA';
  ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.fill();
  // hair background
  ctx.fillStyle='#7B5E4A';
  ctx.beginPath(); ctx.arc(cx,cy-r*0.05,r*0.82,0,Math.PI*2); ctx.fill();
  // face/skin
  ctx.fillStyle='#F5D5B0';
  ctx.beginPath(); ctx.ellipse(cx,cy+r*0.05,r*0.62,r*0.72,0,0,Math.PI*2); ctx.fill();
  // blush
  ctx.fillStyle='#F7A8A8'; ctx.globalAlpha=0.3;
  ctx.beginPath(); ctx.ellipse(cx-r*0.28,cy+r*0.15,r*0.18,r*0.1,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx+r*0.28,cy+r*0.15,r*0.18,r*0.1,0,0,Math.PI*2); ctx.fill();
  ctx.globalAlpha=1;
  // eyes (closed, gentle)
  ctx.strokeStyle='#5C3D2E'; ctx.lineWidth=r*0.05; ctx.lineCap='round';
  ctx.beginPath(); ctx.arc(cx-r*0.22,cy+r*0.0,r*0.14,Math.PI*0.1,Math.PI*0.9,false); ctx.stroke();
  ctx.beginPath(); ctx.arc(cx+r*0.22,cy+r*0.0,r*0.14,Math.PI*0.1,Math.PI*0.9,false); ctx.stroke();
  // smile
  ctx.strokeStyle='#C07B5A'; ctx.lineWidth=r*0.045;
  ctx.beginPath(); ctx.arc(cx,cy+r*0.25,r*0.2,Math.PI*0.15,Math.PI*0.85,false); ctx.stroke();
  // leaf crown
  const leafC='#8FC98A';
  [[-0.32,-0.65,0.5],[0,-0.72,0],[0.32,-0.65,-0.5]].forEach(([ox,oy,ang])=>{
    ctx.save(); ctx.fillStyle=leafC; ctx.globalAlpha=0.9;
    ctx.translate(cx+r*ox,cy+r*oy); ctx.rotate(ang);
    ctx.beginPath(); ctx.ellipse(0,0,r*0.1,r*0.22,0,0,Math.PI*2); ctx.fill();
    ctx.restore();
  });
  ctx.restore();
}

// ─── PLATFORM LINK TEXT ───────────────────────────────────────────────────────
function getLinkText(platform){
  if(platform==='instagram') return '🔗 Link in Bio';
  if(platform==='pinterest') return '🔗 Link Below';
  return '🔗 Link in Bio';
}

// ─── FONT STACK ───────────────────────────────────────────────────────────────
const FONTS = {
  serif:   { hook:(sz)=>`italic ${sz}px Georgia, 'Times New Roman', serif`, sub:(sz)=>`300 italic ${sz}px Georgia, serif`, body:(sz)=>`${sz}px Georgia, serif` },
  modern:  { hook:(sz)=>`700 ${sz*0.88}px 'Helvetica Neue', Arial, sans-serif`, sub:(sz)=>`400 ${sz*0.78}px 'Helvetica Neue', Arial, sans-serif`, body:(sz)=>`400 ${sz}px 'Helvetica Neue', Arial, sans-serif` },
  minimal: { hook:(sz)=>`300 italic ${sz*0.95}px Georgia, serif`, sub:(sz)=>`300 ${sz*0.8}px 'Helvetica Neue', Arial, sans-serif`, body:(sz)=>`300 ${sz}px 'Helvetica Neue', Arial, sans-serif` }
};

// ─── MAIN PIN RENDERER ────────────────────────────────────────────────────────
function drawPin(canvas, content, W, H, pal, product, type, bgScene, platform, opts){
  const { showLena=false, showWatermark=true, showPrice=false, fontStyle='serif', uploadedImg=null } = opts;
  canvas.width=W; canvas.height=H;
  const ctx=canvas.getContext('2d');
  const P=PRODUCTS[product];
  const sq=W===H;
  const tall=H>W*1.3;
  const F=FONTS[fontStyle]||FONTS.serif;
  ctx.clearRect(0,0,W,H);

  // ── BACKGROUND ──
  if(bgScene==='upload' && uploadedImg){
    ctx.drawImage(uploadedImg,0,0,W,H);
    // reusable overlay helper
    const ov=ctx.createLinearGradient(0,H*0.2,0,H);
    ov.addColorStop(0,'rgba(15,10,5,0)');
    ov.addColorStop(0.35,'rgba(15,10,5,0.52)');
    ov.addColorStop(1,'rgba(5,4,2,0.92)');
    ctx.fillStyle=ov; ctx.fillRect(0,0,W,H);
    const tv=ctx.createLinearGradient(0,0,0,H*0.28);
    tv.addColorStop(0,'rgba(0,0,0,0.28)'); tv.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=tv; ctx.fillRect(0,0,W,H);
  } else if(['desk','marble','botanical','cozy'].includes(bgScene)){
    drawFlatLayScene(ctx,W,H,pal,bgScene);
    // photo-like overlay on flat lay
    const ov=ctx.createLinearGradient(0,H*0.3,0,H);
    ov.addColorStop(0,'rgba(15,10,5,0)');
    ov.addColorStop(0.4,'rgba(15,10,5,0.48)');
    ov.addColorStop(1,'rgba(5,4,2,0.88)');
    ctx.fillStyle=ov; ctx.fillRect(0,0,W,H);
  } else {
    // flat colour BGs
    if(bgScene==='gradient'){
      const grd=ctx.createLinearGradient(0,0,W,H);
      grd.addColorStop(0,pal.bg2); grd.addColorStop(0.5,pal.bg); grd.addColorStop(1,pal.card==='#FFFDF9'?'#FFFDF9':pal.bg2);
      ctx.fillStyle=grd; ctx.fillRect(0,0,W,H);
    } else if(bgScene==='pattern'){
      ctx.fillStyle=pal.bg; ctx.fillRect(0,0,W,H);
      ctx.fillStyle=pal.bg2; ctx.globalAlpha=0.35;
      for(let px=W*0.06;px<W;px+=W*0.06) for(let py=W*0.06;py<H;py+=W*0.06){
        ctx.beginPath(); ctx.arc(px,py,2.2,0,Math.PI*2); ctx.fill();
      }
      ctx.globalAlpha=1;
    } else {
      ctx.fillStyle=pal.bg; ctx.fillRect(0,0,W,H);
    }
    // corner botanicals for non-photo
    ctx.save(); ctx.globalAlpha=0.13; ctx.fillStyle=pal.acc;
    for(let i=0;i<6;i++){ const a=0.3+(i/6)*Math.PI; ctx.save(); ctx.translate(W*0.89,H*0.055); ctx.rotate(a); ctx.beginPath(); ctx.ellipse(0,-W*0.06,W*0.015,W*0.06,0,0,Math.PI*2); ctx.fill(); ctx.restore(); }
    ctx.globalAlpha=0.2; ctx.fillStyle=pal.bg2;
    for(let i=0;i<4;i++){ const a=2.7+(i/4)*Math.PI; ctx.save(); ctx.translate(W*0.1,H*0.945); ctx.rotate(a); ctx.beginPath(); ctx.ellipse(0,-W*0.045,W*0.012,W*0.045,0,0,Math.PI*2); ctx.fill(); ctx.restore(); }
    ctx.restore();
  }

  const isPhoto=['desk','marble','botanical','cozy','upload'].includes(bgScene) || (bgScene==='upload' && uploadedImg!=null);
  const txtC=isPhoto?'#F7F2EA':pal.txt;
  const subC=isPhoto?'rgba(247,242,234,0.78)':pal.sub;
  const cardC=isPhoto?'rgba(30,20,10,0.45)':pal.card;

  // ── LENA AVATAR ──
  if(showLena){
    const ar=clamp(W*0.08,50,90);
    drawLenaAvatar(ctx,W*0.5,isPhoto?(tall?H*0.09:H*0.11):(tall?H*0.08:H*0.09),ar,isPhoto||pal.dark);
  }

  // ── PRODUCT PILL ──
  const pillH=W*0.05,pillR=pillH/2;
  const pillY=showLena?(tall?H*0.155:H*0.175):(tall?H*0.065:H*0.09);
  ctx.font=`500 ${clamp(W*0.02,13,21)}px sans-serif`;
  const pillLabel=P.emoji+'  '+P.name;
  const pillW=Math.min(ctx.measureText(pillLabel).width+32,W*0.65);
  ctx.fillStyle=isPhoto?'rgba(247,242,234,0.15)':pal.card;
  if(isPhoto){ctx.strokeStyle='rgba(247,242,234,0.3)'; ctx.lineWidth=1;}
  ctx.shadowColor='rgba(0,0,0,0.12)'; ctx.shadowBlur=10;
  rrPath(ctx,W/2-pillW/2,pillY-pillH/2,pillW,pillH,pillR); ctx.fill();
  if(isPhoto) ctx.stroke(); ctx.shadowBlur=0;
  ctx.fillStyle=txtC; ctx.textAlign='center';
  ctx.fillText(pillLabel,W/2,pillY+clamp(W*0.02,13,21)*0.38);

  // ── HOOK ──
  const hSz=sq?clamp(W*0.05,34,52):clamp(W*0.053,40,60);
  const hY=pillY+pillH*0.7+hSz*1.5;
  ctx.font=F.hook(hSz); ctx.fillStyle=txtC; ctx.textAlign='center';
  const hEnd=wrapText(ctx,content.hook,W/2,hY,W*0.82,hSz*1.28);

  // ── SUB ──
  const sSz=clamp(W*0.026,19,30);
  ctx.font=F.sub(sSz); ctx.fillStyle=subC;
  const sEnd=wrapText(ctx,content.sub,W/2,hEnd+sSz*1.6,W*0.76,sSz*1.5);

  // ── DIVIDER ──
  const dY=sEnd+clamp(H*0.022,14,28);
  ctx.save(); ctx.strokeStyle=isPhoto?'rgba(247,242,234,0.35)':pal.acc; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.moveTo(W/2-W*0.1,dY); ctx.lineTo(W/2+W*0.1,dY); ctx.stroke();
  ctx.fillStyle=isPhoto?'rgba(247,242,234,0.5)':pal.acc;
  ctx.save(); ctx.translate(W/2,dY); ctx.rotate(Math.PI/4); ctx.fillRect(-3,-3,6,6); ctx.restore();
  ctx.restore();

  // ── BODY ──
  const bSz=clamp(W*0.025,17,27);
  let bY=dY+bSz*2.4;
  ctx.font=F.body(bSz); ctx.fillStyle=isPhoto?'rgba(247,242,234,0.88)':pal.txt; ctx.textAlign='center';
  for(const line of (content.body?content.body.split('\n').filter(l=>l.trim()):[])){
    bY=wrapText(ctx,line,W/2,bY,W*0.8,bSz*1.58)+bSz*0.85;
  }

  // ── FEATURE TAGS (non-photo, product/carousel) ──
  if(!isPhoto && (type==='product'||type==='carousel')){
    const tSz=clamp(W*0.02,13,21),tH2=tSz*2.2,tG=8,tP=16;
    const tY=bY+bSz*2.2;
    ctx.save(); ctx.font=`${tSz}px sans-serif`;
    const tws=P.features.slice(0,3).map(f=>ctx.measureText('✦ '+f).width+tP*2);
    const tot=tws.reduce((a,b)=>a+b,0)+tG*2;
    let px=W/2-tot/2;
    P.features.slice(0,3).forEach((f,i)=>{ ctx.fillStyle=pal.bg2; rrPath(ctx,px,tY-tH2/2,tws[i],tH2,tH2/2); ctx.fill(); ctx.fillStyle=pal.txt; ctx.textAlign='left'; ctx.fillText('✦ '+f,px+tP,tY+tSz*0.38); px+=tws[i]+tG; });
    bY=tY+tH2*0.8;
    ctx.restore();
  }

  // ── PRICE CHIP (optional toggle) ──
  if(showPrice && (type==='product'||type==='carousel')){
    const prW=W*0.42, prH2=clamp(H*0.038,26,46), prY=bY+prH2*1.8;
    ctx.save(); ctx.strokeStyle=isPhoto?'rgba(247,242,234,0.45)':pal.acc; ctx.lineWidth=1.5;
    if(isPhoto){ctx.fillStyle='rgba(247,242,234,0.1)'; rrPath(ctx,W/2-prW/2,prY-prH2/2,prW,prH2,prH2/2); ctx.fill(); ctx.stroke();}
    ctx.font=`500 ${clamp(prW*0.1,11,19)}px sans-serif`;
    ctx.fillStyle=isPhoto?'#F7F2EA':pal.acc; ctx.textAlign='center';
    ctx.fillText(P.priceLabel,W/2,prY+prH2*0.2);
    ctx.restore();
  }

  // ── CTA BUTTON ──
  const ctaH=clamp(H*0.058,38,68),ctaW=W*0.68;
  const ctaY=sq?H-H*0.115:H-H*0.095;
  ctx.fillStyle=pal.acc;
  ctx.shadowColor='rgba(61,74,56,.22)'; ctx.shadowBlur=18; ctx.shadowOffsetY=5;
  rrPath(ctx,W/2-ctaW/2,ctaY-ctaH/2,ctaW,ctaH,ctaH/2); ctx.fill();
  ctx.shadowBlur=0; ctx.shadowOffsetY=0;
  ctx.font=`600 ${clamp(ctaW*0.063,12,24)}px sans-serif`;
  ctx.fillStyle=pal.btnTxt; ctx.textAlign='center';
  ctx.fillText(content.cta+' →',W/2,ctaY+ctaH*0.22);

  // ── LINK TEXT (platform specific) ──
  const linkY=ctaY+ctaH*0.7+clamp(H*0.018,10,20);
  const linkTxt=getLinkText(platform);
  ctx.font=`500 ${clamp(W*0.022,14,22)}px sans-serif`;
  ctx.fillStyle=isPhoto?'rgba(247,242,234,0.6)':pal.sub+'BB'; ctx.textAlign='center';
  ctx.fillText(linkTxt,W/2,linkY);

  // ── WATERMARK / BRAND FOOTER ──
  if(showWatermark){
    const fY=H-clamp(H*0.024,14,26);
    ctx.font=`${clamp(W*0.018,11,18)}px sans-serif`;
    ctx.fillStyle=isPhoto?'rgba(247,242,234,0.45)':pal.sub+'99'; ctx.textAlign='center';
    ctx.fillText('🌿  gentlefocuslab.gumroad.com',W/2,fY);
  }

  // ── LENA AVATAR (bottom-left corner credit) ──
  if(showLena){
    const ar=clamp(W*0.065,40,70);
    drawLenaAvatar(ctx,ar+W*0.04,H-ar-W*0.04,ar,isPhoto||pal.dark);
    ctx.font=`500 ${clamp(W*0.019,12,18)}px sans-serif`;
    ctx.fillStyle=isPhoto?'rgba(247,242,234,0.75)':pal.sub; ctx.textAlign='left';
    ctx.fillText('Lena — Gentle Focus Lab',ar*2+W*0.06,H-ar*0.7-W*0.04);
  }
}

// ─── CAROUSEL SLIDES GENERATOR ───────────────────────────────────────────────
function generateCarouselSlides(product, pal, W, H, fontStyle){
  const P=PRODUCTS[product];
  const F=FONTS[fontStyle]||FONTS.serif;
  const slides=[
    {num:'01',label:'Hook',text:product==='planner'?'Stop abandoning planners by week two.':product==='fuel'?'The real reason you crash at 3PM.':'What if your focus problem was 2 problems?',sub:'Swipe to see why →'},
    {num:'02',label:'The Problem',text:product==='planner'?'Traditional planners assume the same energy every day.\nYours doesn\'t work that way.':product==='fuel'?'Blood sugar spike → crash → brain fog.\nEvery single day until you fix the fuel.':'Most systems fix the planning OR the nutrition.\nNever both.'},
    {num:'03',label:'The Solution',text:product==='planner'?'The ADHD Focus Planner adapts to your battery level every day.\nHigh → 3 priorities.\nLow → 1 success anchor.':product==='fuel'?'15 slow-burn meals in 5–15 minutes.\nDesigned for ADHD brains specifically.':'🗂️ ADHD Planner → fixes the system.\n🍃 Fuel Protocol → fixes the biology.\nTogether: complete ADHD focus.'},
    {num:'04',label:'CTA',text:`✨ ${P.name}\n${P.priceLabel}\n\nInstant download.\n${product==='bundle'?'Save 30%.':'Gentle by design.'}`,sub:product==='planner'?'Link in Bio →':'Link in Bio →'}
  ];

  return slides.map((s,i)=>{
    const c=document.createElement('canvas');
    c.width=W; c.height=H;
    const ctx=c.getContext('2d');
    const isLast=i===3;
    // background
    if(isLast){ ctx.fillStyle=pal.acc; }
    else if(i===0){ ctx.fillStyle=pal.bg; }
    else { const g=ctx.createLinearGradient(0,0,W,H); g.addColorStop(0,pal.bg2); g.addColorStop(1,pal.bg); ctx.fillStyle=g; }
    ctx.fillRect(0,0,W,H);
    // slide number
    ctx.font=`700 ${clamp(W*0.09,50,100)}px sans-serif`;
    ctx.fillStyle=i===0?pal.acc:(isLast?'rgba(255,253,249,0.2)':pal.bg2);
    ctx.textAlign='left'; ctx.fillText(s.num,W*0.07,H*0.18);
    // label
    ctx.font=`500 ${clamp(W*0.026,14,22)}px sans-serif`;
    ctx.fillStyle=i===0?pal.sub:(isLast?'rgba(255,253,249,0.6)':pal.sub);
    ctx.fillText(s.label.toUpperCase(),W*0.07,H*0.24);
    // divider
    ctx.strokeStyle=i===0?pal.acc:'rgba(255,253,249,0.3)'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(W*0.07,H*0.27); ctx.lineTo(W*0.35,H*0.27); ctx.stroke();
    // main text
    ctx.font=F.hook(clamp(W*0.048,30,50));
    ctx.fillStyle=isLast?'#FFFDF9':pal.txt;
    ctx.textAlign='left';
    let ty=H*0.4;
    s.text.split('\n').forEach(line=>{ ty=wrapText(ctx,line,W*0.07,ty,W*0.86,clamp(W*0.048,30,50)*1.3)+clamp(W*0.048,30,50)*0.5; });
    // sub
    if(s.sub){
      ctx.font=`${clamp(W*0.028,18,26)}px sans-serif`;
      ctx.fillStyle=isLast?'rgba(255,253,249,0.75)':(i===0?pal.acc:pal.sub);
      ctx.fillText(s.sub,W*0.07,ty+clamp(W*0.028,18,26)*2);
    }
    // slide indicator dots
    for(let d=0;d<4;d++){
      ctx.beginPath(); ctx.arc(W*0.07+d*W*0.04,H*0.92,d===i?5:3,0,Math.PI*2);
      ctx.fillStyle=d===i?(isLast?'#FFFDF9':pal.acc):(isLast?'rgba(255,253,249,0.35)':pal.bg2); ctx.fill();
    }
    // watermark
    ctx.font=`${clamp(W*0.018,11,17)}px sans-serif`;
    ctx.fillStyle=isLast?'rgba(255,253,249,0.5)':pal.sub+'88'; ctx.textAlign='right';
    ctx.fillText('gentlefocuslab.gumroad.com',W*0.93,H*0.96);
    return c;
  });
}

// ─── DOWNLOAD ────────────────────────────────────────────────────────────────
function dlBlob(canvas,fname){
  canvas.toBlob(blob=>{
    if(!blob){alert('Download failed — please try again.');return;}
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a'); a.href=url; a.download=fname;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(()=>URL.revokeObjectURL(url),1500);
  },'image/png');
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App({ embedded = false }){
  const [cfg,setCfg]=useState({platform:'pinterest',product:'planner',type:'product',tone:'gentle',palette:'sage'});
  const [bgScene,setBgScene]=useState('desk');
  const [fontStyle,setFontStyle]=useState('serif');
  const [showLena,setShowLena]=useState(false);
  const [showWatermark,setShowWatermark]=useState(true);
  const [showPrice,setShowPrice]=useState(false);
  const [shown,setShown]=useState(false);
  const [animating,setAnimating]=useState(false);
  const [caption,setCaption]=useState('');
  const [tags,setTags]=useState('');
  const [copied,setCopied]=useState(false);
  const [batchItems,setBatchItems]=useState([]);
  const [carouselSlides,setCarouselSlides]=useState([]);
  const [status,setStatus]=useState('');
  const [uploadedImg,setUploadedImg]=useState(null);
  const ref=useRef(null);
  const fileRef=useRef(null);

  const {w:PW,h:PH}=SIZES[cfg.platform];
  const sc=Math.min(340/PW,500/PH);

  const getContent=useCallback(()=>{
    const pool=C[cfg.product]?.[cfg.type]?.[cfg.tone]||C[cfg.product]?.[cfg.type]?.gentle||[];
    return pool.length?pick(pool):{hook:'Gentle Focus Lab 🌿',sub:'Intentional productivity for neurodivergent minds.',body:'Designed for ADHD brains.',cta:'Explore the Shop →'};
  },[cfg]);

  const go=useCallback(()=>{
    const canvas=ref.current;
    if(!canvas){ setStatus('⚠ Canvas not ready — click again'); return; }
    // ensure canvas has correct internal resolution
    canvas.width=PW; canvas.height=PH;
    const content=getContent();
    const pal=PALS[cfg.palette];
    const scene=bgScene==='upload'?(uploadedImg?'upload':'desk'):bgScene;
    const uImg=bgScene==='upload'?uploadedImg:null;
    try{
      drawPin(canvas,content,PW,PH,pal,cfg.product,cfg.type,scene,cfg.platform,{showLena,showWatermark,showPrice,fontStyle,uploadedImg:uImg});
    }catch(e){ setStatus('⚠ Render error: '+e.message); return; }
    setCaption(CAPTIONS[cfg.product][cfg.type]||CAPTIONS[cfg.product].product);
    setTags(HASHTAGS[cfg.product]);
    setBatchItems([]); setCarouselSlides([]);
    setShown(true);
    setAnimating(false); setTimeout(()=>setAnimating(true),10);
    setStatus('');
  },[cfg,bgScene,fontStyle,showLena,showWatermark,showPrice,uploadedImg,PW,PH,getContent]);

  const goCarousel=useCallback(()=>{
    try{
      const pal=PALS[cfg.palette];
      const slides=generateCarouselSlides(cfg.product,pal,PW,PH,fontStyle);
      setCarouselSlides(slides); setBatchItems([]);
      setShown(false); setStatus('4 carousel slides ready — download each one');
    }catch(e){ setStatus('⚠ Carousel error: '+e.message); }
  },[cfg,PW,PH,fontStyle]);

  const goBatch=useCallback(()=>{
    try{
      const designs=['sage','cream','lavender','moss','blush','caramel'];
      const tones=['gentle','bold','empathetic','urgent'];
      const scenes=['desk','botanical','cozy','marble'];
      const items=[];
      for(let i=0;i<4;i++){
        const d=designs[i]; const t=tones[i]; const sc2=scenes[i];
        const pool=C[cfg.product]?.[cfg.type]?.[t]||C[cfg.product]?.[cfg.type]?.gentle||[];
        const content=pool.length?pick(pool):{hook:'Gentle Focus Lab',sub:'Focus system',body:'',cta:'Get it now'};
        const c=document.createElement('canvas');
        drawPin(c,content,PW,PH,PALS[d],cfg.product,cfg.type,sc2,cfg.platform,{showLena,showWatermark,showPrice:false,fontStyle,uploadedImg:null});
        items.push({canvas:c,label:d+' · '+sc2,fname:`gfl-${cfg.product}-${d}-${sc2}.png`});
      }
      setBatchItems(items); setCarouselSlides([]);
      setShown(false); setStatus('4 batch variations ready — click any to download');
    }catch(e){ setStatus('⚠ Batch error: '+e.message); }
  },[cfg,fontStyle,showLena,showWatermark,PW,PH]);

  const handleUpload=(e)=>{
    const file=e.target.files[0]; if(!file) return;
    const reader=new FileReader();
    reader.onload=ev=>{ const img=new Image(); img.onload=()=>{ setUploadedImg(img); setBgScene('upload'); }; img.src=ev.target.result; };
    reader.readAsDataURL(file);
  };

  const set=(k,v)=>setCfg(p=>({...p,[k]:v}));
  const dl=()=>ref.current&&dlBlob(ref.current,`gfl-${cfg.product}-${cfg.type}-${cfg.palette}.png`);
  const copyC=()=>{ navigator.clipboard.writeText(caption+'\n\n'+tags); setCopied(true); setTimeout(()=>setCopied(false),2200); };

  const toggle=(fn,val)=>fn(!val);
  const lbl={fontSize:10,fontWeight:500,textTransform:'uppercase',letterSpacing:'.08em',color:'#9A9D94',marginBottom:5,display:'block'};
  const div2={height:1,background:'#EDE4D4',margin:'4px 0'};
  const chip=(on,acc='#3D4A38')=>({padding:'4px 10px',borderRadius:20,border:`1px solid ${on?acc:'#E5DFD4'}`,background:on?acc:'white',color:on?'#FFFDF9':'#5A5D54',fontSize:11,cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'});
  const segRow={display:'flex',gap:3,background:'#F7F2EA',borderRadius:9,padding:3};
  const segB=(on)=>({flex:1,padding:'5px 3px',border:'none',borderRadius:7,fontSize:10,fontFamily:'inherit',cursor:'pointer',textAlign:'center',lineHeight:1.3,background:on?'#fff':'transparent',color:on?'#3D4A38':'#7A7D72',fontWeight:on?500:400,boxShadow:on?'0 1px 4px rgba(61,74,56,.1)':'none',transition:'all 0.15s'});

  const Toggle=({on,onToggle,label,sub})=>(
    <div onClick={onToggle} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'7px 10px',background:on?'#EDF2EB':'#F7F2EA',borderRadius:9,border:`1px solid ${on?'#8FAF85':'#E5DFD4'}`,cursor:'pointer',userSelect:'none'}}>
      <div><div style={{fontSize:11,fontWeight:500,color:'#3D4A38'}}>{label}</div>{sub&&<div style={{fontSize:9,color:'#9A9D94'}}>{sub}</div>}</div>
      <div style={{width:34,height:20,borderRadius:10,background:on?'#8FAF85':'#D0CCC5',position:'relative',flexShrink:0,transition:'all 0.2s'}}>
        <div style={{width:14,height:14,borderRadius:7,background:'white',position:'absolute',top:3,left:on?17:3,transition:'all 0.2s',boxShadow:'0 1px 3px rgba(0,0,0,0.2)'}}/>
      </div>
    </div>
  );

  return(
    <div style={{fontFamily:'sans-serif',background:'#F7F2EA',minHeight:'100vh',display:'flex',flexDirection:'column',fontSize:13}}>
      {/* HEADER */}
      {!embedded && <div style={{background:'#3D4A38',padding:'10px 18px',display:'flex',alignItems:'center',justifyContent:'space-between',flexShrink:0}}>
        <div style={{fontSize:16,color:'#FFFDF9',fontWeight:600,display:'flex',alignItems:'center',gap:8}}>
          🌿 Gentle Focus Lab <span style={{fontSize:11,fontWeight:300,color:'#A8BCA4'}}>Image Generator v5</span>
        </div>
        <div style={{background:'rgba(255,255,255,.1)',border:'1px solid rgba(255,255,255,.15)',borderRadius:20,padding:'3px 12px',fontSize:10,color:'#A8BCA4'}}>Flat-lay · Lena · Carousel · Fonts · Upload</div>
      </div>}

      <div style={{display:'grid',gridTemplateColumns:'295px 1fr',flex:1,minHeight:0}}>
        {/* ─── LEFT PANEL ─── */}
        <div style={{background:'#FFFDF9',borderRight:'1px solid #EDE4D4',padding:13,display:'flex',flexDirection:'column',gap:9,overflowY:'auto',maxHeight:'calc(100vh - 44px)'}}>

          {/* Platform */}
          <div><span style={lbl}>Platform</span>
            <div style={segRow}>
              {[['pinterest','📌 Pinterest','1000×1500'],['instagram','📷 Instagram','1080×1080'],['story','📱 Story','1080×1920']].map(([v,l,s])=>(
                <button key={v} onClick={()=>set('platform',v)} style={segB(cfg.platform===v)}>{l}<br/><span style={{fontSize:9,color:'#9A9D94'}}>{s}</span></button>
              ))}
            </div>
          </div><div style={div2}/>

          {/* Product */}
          <div><span style={lbl}>Product</span>
            <div style={{display:'flex',flexDirection:'column',gap:4}}>
              {Object.entries(PRODUCTS).map(([k,p])=>(
                <button key={k} onClick={()=>set('product',k)} style={{width:'100%',textAlign:'left',padding:'7px 9px',borderRadius:8,border:`1.5px solid ${cfg.product===k?'#8FAF85':'#E5DFD4'}`,background:cfg.product===k?'#EDF2EB':'white',cursor:'pointer',fontFamily:'inherit',transition:'all 0.15s'}}>
                  <div style={{fontSize:12,fontWeight:600,color:'#3D4A38'}}>{p.emoji} {p.name}</div>
                  <div style={{fontSize:10,color:'#9A9D94',marginTop:1}}>{p.sub}</div>
                </button>
              ))}
            </div>
          </div><div style={div2}/>

          {/* Content type */}
          <div><span style={lbl}>Content type</span>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:4}}>
              {[['product','🛍️','Product Pin'],['awareness','🧠','Awareness'],['quote','💬','Quote Card'],['list','✦','Tips List'],['lowenergy','🌧️','Low Energy'],['carousel','📑','Carousel']].map(([v,icon,l])=>(
                <button key={v} onClick={()=>set('type',v)} style={{padding:'6px 7px',borderRadius:7,border:`1.5px solid ${cfg.type===v?'#8FAF85':'#E5DFD4'}`,background:cfg.type===v?'#EDF2EB':'white',cursor:'pointer',fontFamily:'inherit',fontSize:11,color:cfg.type===v?'#3D4A38':'#5A5D54',fontWeight:cfg.type===v?500:400,textAlign:'left',transition:'all 0.15s'}}>
                  <span style={{display:'block',fontSize:13,marginBottom:1}}>{icon}</span>{l}
                </button>
              ))}
            </div>
          </div><div style={div2}/>

          {/* Tone */}
          <div><span style={lbl}>Tone</span>
            <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
              {[['gentle','Gentle 🌿'],['bold','Bold ✦'],['empathetic','Empathetic 💛'],['urgent','Urgent ⚡']].map(([v,l])=>(
                <button key={v} onClick={()=>set('tone',v)} style={chip(cfg.tone===v)}>{l}</button>
              ))}
            </div>
          </div><div style={div2}/>

          {/* Palette */}
          <div><span style={lbl}>Colour palette</span>
            <div style={{display:'flex',gap:6,flexWrap:'wrap',alignItems:'center'}}>
              {Object.entries(PAL_HEX).map(([k,c])=>(
                <button key={k} onClick={()=>set('palette',k)} title={PAL_NAMES[k]} style={{width:30,height:30,borderRadius:8,background:c,border:`3px solid ${cfg.palette===k?'#3D4A38':'transparent'}`,cursor:'pointer',transition:'all 0.15s',boxShadow:cfg.palette===k?'0 0 0 1.5px #3D4A38':'none'}}/>
              ))}
            </div>
          </div><div style={div2}/>

          {/* Background / Scene */}
          <div><span style={lbl}>Background scene</span>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:4}}>
              {[['flat','🎨','Flat colour'],['gradient','🌅','Gradient'],['pattern','⋮','Dot pattern'],['desk','📓','Desk flat-lay'],['marble','🥗','Food / Marble'],['botanical','🌿','Botanical'],['cozy','☕','Cozy'],['upload','⬆','Upload photo']].map(([v,icon,l])=>(
                <button key={v} onClick={()=>{ setBgScene(v); if(v==='upload') fileRef.current?.click(); }} style={{padding:'6px 7px',borderRadius:7,border:`1.5px solid ${bgScene===v?'#8FAF85':'#E5DFD4'}`,background:bgScene===v?'#EDF2EB':'white',cursor:'pointer',fontFamily:'inherit',fontSize:10,color:bgScene===v?'#3D4A38':'#5A5D54',fontWeight:bgScene===v?500:400,textAlign:'left',transition:'all 0.15s'}}>
                  <span style={{fontSize:12}}>{icon}</span> {l}
                </button>
              ))}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} style={{display:'none'}}/>
            {uploadedImg&&bgScene==='upload'&&<div style={{fontSize:10,color:'#5A8050',marginTop:5,textAlign:'center'}}>✓ Photo loaded — text will overlay it</div>}
          </div><div style={div2}/>

          {/* Font Style */}
          <div><span style={lbl}>Font style</span>
            <div style={segRow}>
              {[['serif','Serif'],['modern','Modern'],['minimal','Minimal']].map(([v,l])=>(
                <button key={v} onClick={()=>setFontStyle(v)} style={segB(fontStyle===v)}>{l}</button>
              ))}
            </div>
          </div><div style={div2}/>

          {/* Options toggles */}
          <div><span style={lbl}>Options</span>
            <div style={{display:'flex',flexDirection:'column',gap:5}}>
              <Toggle on={showLena} onToggle={()=>setShowLena(p=>!p)} label="Show Lena avatar" sub="Adds persona to the pin"/>
              <Toggle on={showWatermark} onToggle={()=>setShowWatermark(p=>!p)} label="Brand watermark" sub="Footer URL"/>
              <Toggle on={showPrice} onToggle={()=>setShowPrice(p=>!p)} label="Show price" sub="Subtle price tag"/>
            </div>
          </div><div style={div2}/>

          {/* Action buttons */}
          <button onClick={go} style={{width:'100%',padding:12,background:'#3D4A38',color:'white',border:'none',borderRadius:10,fontSize:13,fontWeight:700,fontFamily:'inherit',cursor:'pointer',letterSpacing:'.01em'}}>
            ✦  Generate Image
          </button>
          {cfg.type==='carousel'&&(
            <button onClick={goCarousel} style={{width:'100%',padding:9,background:'#534AB7',color:'white',border:'none',borderRadius:10,fontSize:12,fontFamily:'inherit',cursor:'pointer',fontWeight:600}}>
              📑  Generate 4 Carousel Slides
            </button>
          )}
          <button onClick={goBatch} style={{width:'100%',padding:9,background:'transparent',color:'#3D4A38',border:'1.5px solid #C8D9C4',borderRadius:10,fontSize:12,fontFamily:'inherit',cursor:'pointer'}}>
            ⚡  Batch — 4 Style Variations
          </button>
          {status&&<div style={{fontSize:11,color:'#5A8050',textAlign:'center',padding:'2px 0'}}>{status}</div>}
        </div>

        {/* ─── RIGHT / CANVAS AREA ─── */}
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:'20px 16px',gap:14,overflowY:'auto',background:'#F0EDE6'}}>

          {!shown&&batchItems.length===0&&carouselSlides.length===0&&(
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:270,height:360,background:'white',borderRadius:16,border:'2px dashed #E5DFD4',color:'#9A9D94',gap:10}}>
              <div style={{fontSize:36,opacity:.3}}>🌿</div>
              <div style={{fontSize:12,textAlign:'center',lineHeight:1.6,maxWidth:160}}>Configure your settings then click Generate Image</div>
            </div>
          )}

          {/* Single image — canvas ALWAYS mounted, NEVER remounted */}
          <div style={{display:shown?'flex':'none',flexDirection:'column',alignItems:'center',gap:12,opacity:animating?1:0,transform:animating?'translateY(0)':'translateY(14px)',transition:'opacity 0.35s ease, transform 0.35s ease'}}>
            <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
            <div style={{background:'white',borderRadius:14,padding:8,boxShadow:'0 4px 24px rgba(61,74,56,.14)'}}>
              <canvas ref={ref} style={{borderRadius:7,display:'block',width:Math.round(PW*sc),height:Math.round(PH*sc),minWidth:Math.round(PW*sc),minHeight:Math.round(PH*sc)}}/>
            </div>
            <div style={{display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center'}}>
              <button onClick={dl} style={{padding:'9px 22px',background:'#3D4A38',color:'white',border:'none',borderRadius:20,fontSize:12,fontWeight:700,fontFamily:'inherit',cursor:'pointer'}}>⬇ Download PNG</button>
              <button onClick={go} style={{padding:'9px 16px',background:'white',color:'#3D4A38',border:'1.5px solid #C8D9C4',borderRadius:20,fontSize:11,fontFamily:'inherit',cursor:'pointer'}}>↺ New Variation</button>
            </div>
            <div style={{width:'100%',maxWidth:360,background:'white',borderRadius:12,padding:13,border:'1px solid #EDE4D4'}}>
              <span style={lbl}>Caption & Hashtags</span>
              <div style={{fontSize:11,color:'#5A5D54',lineHeight:1.7,whiteSpace:'pre-line'}}>{caption}</div>
              <div style={{fontSize:11,color:'#5A8050',marginTop:6}}>{tags}</div>
              <button onClick={copyC} style={{marginTop:8,padding:'5px 13px',background:'#EDF2EB',color:'#3D4A38',border:'none',borderRadius:13,fontSize:11,fontFamily:'inherit',cursor:'pointer',fontWeight:500}}>
                {copied?'Copied ✓':'Copy Caption ↗'}
              </button>
            </div>
          </div>

          {/* Carousel slides */}
          {carouselSlides.length>0&&(
            <div style={{width:'100%',maxWidth:780}}>
              <div style={{fontSize:12,color:'#7A7D72',marginBottom:10,textAlign:'center',fontWeight:500}}>📑 4 Carousel Slides · Click any to download</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
                {carouselSlides.map((c,i)=>(
                  <div key={i} onClick={()=>dlBlob(c,`gfl-carousel-slide-${i+1}-${cfg.product}.png`)}
                    style={{background:'white',borderRadius:10,overflow:'hidden',cursor:'pointer',border:'2px solid transparent',transition:'all .15s',boxShadow:'0 2px 8px rgba(61,74,56,.08)'}}
                    onMouseEnter={e=>e.currentTarget.style.borderColor='#8FAF85'}
                    onMouseLeave={e=>e.currentTarget.style.borderColor='transparent'}>
                    <canvas ref={el=>{ if(el&&c){ const bh=Math.round(PH*(150/PW)); el.width=150; el.height=bh; el.getContext('2d').drawImage(c,0,0,150,bh); }}} style={{width:'100%',display:'block'}}/>
                    <div style={{padding:'5px 7px',fontSize:10,color:'#5A5D54',borderTop:'1px solid #EDE4D4',fontWeight:500}}>Slide {i+1}</div>
                  </div>
                ))}
              </div>
              <div style={{textAlign:'center',marginTop:8,fontSize:11,color:'#9A9D94'}}>Post these in order on Instagram for a full educational carousel</div>
            </div>
          )}

          {/* Batch */}
          {batchItems.length>0&&(
            <div style={{width:'100%',maxWidth:760}}>
              <div style={{fontSize:12,color:'#7A7D72',marginBottom:10,textAlign:'center',fontWeight:500}}>⚡ 4 Style Variations · Click any to download</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10}}>
                {batchItems.map((item,i)=>(
                  <div key={i} onClick={()=>dlBlob(item.canvas,item.fname)}
                    style={{background:'white',borderRadius:10,overflow:'hidden',cursor:'pointer',border:'2px solid transparent',transition:'all .15s',boxShadow:'0 2px 8px rgba(61,74,56,.08)'}}
                    onMouseEnter={e=>e.currentTarget.style.borderColor='#8FAF85'}
                    onMouseLeave={e=>e.currentTarget.style.borderColor='transparent'}>
                    <canvas ref={el=>{ if(el&&item.canvas){ const bh=Math.round(PH*(150/PW)); el.width=150; el.height=bh; el.getContext('2d').drawImage(item.canvas,0,0,150,bh); }}} style={{width:'100%',display:'block'}}/>
                    <div style={{padding:'5px 7px',fontSize:10,color:'#5A5D54',borderTop:'1px solid #EDE4D4'}}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
