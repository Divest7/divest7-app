import { GoogleGenAI } from '@google/genai'
import { writeFile } from 'node:fs/promises'

const ai = new GoogleGenAI({
  apiKey: process.env.NETLIFY_AI_GATEWAY_KEY,
  httpOptions: { baseUrl: process.env.NETLIFY_AI_GATEWAY_BASE_URL?.replace(/\/$/, '') },
})

const jobs = [
  {
    file: 'public/img/sunrise-hero.png',
    prompt:
      'Cinematic wide photograph of sunrise breaking over a vast layered mountain range. Deep navy and near-black silhouetted peaks in the foreground fading into cool blue haze; a low warm gold sun sits just above the ridgeline casting long amber light and soft atmospheric mist between the ranges. Rich film grain, anamorphic lens character, subtle lens bloom, deep shadow detail. Restrained palette: midnight navy, charcoal black, warm 24k gold, pale cream light. Reverent, still, awe-inspiring, editorial quality. No people, no text, no letters, no watermark, no logo.',
    aspect: '16:9',
  },
  {
    file: 'public/img/summit-path.png',
    prompt:
      'Cinematic photograph looking up a narrow stone footpath climbing a dark mountain ridge toward a gold horizon at first light. Foreground rock in deep navy shadow, thin warm gold rim light along the ridge edge, cool blue mist in the valley below. Film grain, shallow depth, quiet and hopeful. Palette strictly midnight navy, black, warm gold, cream. No people, no text, no letters, no watermark.',
    aspect: '3:4',
  },
  {
    file: 'public/img/icon-source.png',
    prompt:
      'A premium app icon on a solid deep midnight navy background (#0A1526). Centered emblem: a minimal geometric mountain range of three triangular peaks rendered in thin warm gold lines, with a perfect gold circle sun rising behind the center peak, and seven small gold dots arranged in a gentle arc above. Flat vector style, precise thin strokes, luxury brand mark, generous padding around the emblem, perfectly square, centered composition. Gold is warm and slightly desaturated, not neon. No text, no letters, no numbers, no words.',
    aspect: '1:1',
  },
]

for (const job of jobs) {
  try {
    const res = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image',
      contents: job.prompt,
      config: { imageConfig: { aspectRatio: job.aspect } },
    })
    let saved = false
    for (const part of res.candidates?.[0]?.content?.parts ?? []) {
      if (part.inlineData?.data) {
        await writeFile(job.file, Buffer.from(part.inlineData.data, 'base64'))
        console.log('OK', job.file)
        saved = true
        break
      }
    }
    if (!saved) console.log('NO IMAGE', job.file)
  } catch (e) {
    console.log('FAIL', job.file, e?.message)
  }
}
