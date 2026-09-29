export type Step = {
  key: string
  n: number
  name: string
  verb: string
  essence: string
  body: string
  prompt: string
  scripture: { ref: string; text: string }
}

/** The seven movements of DIVEST 7, in order. */
export const STEPS: Step[] = [
  {
    key: 'dream',
    n: 1,
    name: 'Dream',
    verb: 'See it before you hold it',
    essence: 'Vision precedes provision.',
    body: 'A dream is not a fantasy — it is the first draft of obedience. Before anything is built in the world it is carried in someone. Give yourself permission to want the good thing again, in specific language, without apology.',
    prompt: 'Write the dream in one sentence, as though it were already true.',
    scripture: {
      ref: 'Proverbs 29:18',
      text: 'Where there is no vision, the people perish: but he that keepeth the law, happy is he.',
    },
  },
  {
    key: 'believe',
    n: 2,
    name: 'Believe',
    verb: 'Agree with the vision',
    essence: 'Faith is the hand that receives.',
    body: 'Believing is not pretending you have no doubt. It is deciding which voice gets the final word. You will not out-work a belief you have not settled, so settle it first.',
    prompt: 'Name the one lie that has been louder than the dream. Answer it with Scripture.',
    scripture: {
      ref: 'Mark 11:24',
      text: 'Therefore I say unto you, What things soever ye desire, when ye pray, believe that ye receive them, and ye shall have them.',
    },
  },
  {
    key: 'decide',
    n: 3,
    name: 'Decide',
    verb: 'Cut off the alternatives',
    essence: 'A decision closes doors on purpose.',
    body: 'To decide is to cut. Most people are not stuck — they are still keeping their options open. Choose the narrow thing, and the scattered energy of a dozen maybes returns to you as strength.',
    prompt: 'What are you willing to say no to this week so the yes can breathe?',
    scripture: {
      ref: 'Joshua 24:15',
      text: 'Choose you this day whom ye will serve... but as for me and my house, we will serve the LORD.',
    },
  },
  {
    key: 'act',
    n: 4,
    name: 'Act',
    verb: 'Move while it is small',
    essence: 'Motion converts belief into evidence.',
    body: 'The step does not have to be impressive. It has to be real, and it has to be today. Small steps compound in a direction; big intentions do not compound at all.',
    prompt: 'What is the smallest honest step you could finish in the next twenty minutes?',
    scripture: {
      ref: 'James 2:17',
      text: 'Even so faith, if it hath not works, is dead, being alone.',
    },
  },
  {
    key: 'reflect',
    n: 5,
    name: 'Reflect',
    verb: 'Look back with honesty',
    essence: 'Unexamined effort repeats itself.',
    body: 'Reflection is how experience becomes wisdom. Without it you will work hard and learn nothing. Ask what actually happened — not what you hoped would happen — and thank God for both.',
    prompt: 'Where did you see grace this week that you almost walked past?',
    scripture: {
      ref: 'Psalm 139:23',
      text: 'Search me, O God, and know my heart: try me, and know my thoughts.',
    },
  },
  {
    key: 'plan',
    n: 6,
    name: 'Plan',
    verb: 'Build the next bridge',
    essence: 'Structure protects the vision.',
    body: 'A plan is love for your future self. Write down when, where, and how — because discipline is easier than motivation, and a written step survives a hard morning.',
    prompt: 'Put tomorrow’s step on the calendar with a time attached.',
    scripture: {
      ref: 'Proverbs 16:3',
      text: 'Commit thy works unto the LORD, and thy thoughts shall be established.',
    },
  },
  {
    key: 'repeat',
    n: 7,
    name: 'Repeat',
    verb: 'Return tomorrow',
    essence: 'Consistency is the miracle no one photographs.',
    body: 'Nothing here works once. It works again. The seventh movement is the quiet one that makes the other six matter — come back tomorrow, and let the days do what a single day cannot.',
    prompt: 'What would change in a year if you did this on the ordinary days too?',
    scripture: {
      ref: 'Galatians 6:9',
      text: 'And let us not be weary in well doing: for in due season we shall reap, if we faint not.',
    },
  },
]

export const stepForDay = (dayOfYear: number): Step => STEPS[(dayOfYear - 1) % 7]
