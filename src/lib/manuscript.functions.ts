import { createServerFn } from '@tanstack/react-start';
import { imageInputSchema, transcriptionPrompt, transcriptionSchema, type Transcription } from './manuscript';

type Outcome = { result: Transcription; error: null } | { result: null; error: string };

// Public, one-shot educational inference; images and results are never persisted by the app.
export const transcribeManuscript = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => imageInputSchema.parse(input))
  .handler(async ({ data }): Promise<Outcome> => {
    const { generateResponse, GatewayError } = await import('@lovable.dev/ai-gateway');
    try {
      const response = await generateResponse({
        model: 'openai/gpt-6-astra',
        instructions: transcriptionPrompt,
        reasoning: { effort: 'low' },
        input: [{ role: 'user', content: [
          { type: 'input_text', text: 'Վերծանիր միայն այս պատկերի տեսանելի հայկական տեքստը։ Return JSON.' },
          { type: 'input_image', image_url: data.image, detail: 'high' },
        ] }],
        text: { format: { type: 'json_schema', name: 'manuscript_transcription', strict: true, schema: {
          type: 'object', additionalProperties: false,
          required: ['readable', 'summary', 'lines', 'possibleErrors', 'limitations'],
          properties: {
            readable: { type: 'boolean' }, summary: { type: 'string' },
            lines: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['segments'], properties: {
              segments: { type: 'array', items: { type: 'object', additionalProperties: false,
                required: ['text', 'status', 'note', 'alternatives'], properties: {
                  text: { type: 'string' }, status: { type: 'string', enum: ['read', 'uncertain', 'unreadable'] },
                  note: { type: 'string' }, alternatives: { type: 'array', items: { type: 'string' } },
                },
              } },
            } } },
            possibleErrors: { type: 'array', items: { type: 'string' } },
            limitations: { type: 'array', items: { type: 'string' } },
          },
        } } },
      });
      let text = '';
      for (const item of response.output ?? []) {
        if (item.type !== 'message') continue;
        for (const part of item.content) {
          if (part.type === 'refusal') return { result: null, error: 'Մոդելը հրաժարվեց վերլուծել այս պատկերը։' };
          if (part.type === 'output_text') text += part.text;
        }
      }
      if (response.status !== 'completed' || !text) return { result: null, error: 'Վերծանումը չի ավարտվել․ արդյունք չի ներկայացվում որպես ամբողջական։' };
      return { result: transcriptionSchema.parse(JSON.parse(text)), error: null };
    } catch (error) {
      if (error instanceof GatewayError) {
        console.error('Manuscript inference', { code: error.code, outcome: error.outcome, ids: error.ids, remote: error.remote });
        if (error.code === 'payment_required') return { result: null, error: 'AI-ի վերծանումը հասանելի կլինի հավելվածի AI հաշվեկշիռը համալրելուց հետո։' };
        if (error.code === 'rate_limited') return { result: null, error: 'AI-ն այս պահին ծանրաբեռնված է․ սպասեք և փորձեք ավելի ուշ։' };
        if (error.code === 'permission_denied') return { result: null, error: 'AI մոդելի հասանելիությունը սահմանափակված է․ հավելվածի սեփականատերը պետք է ստուգի թույլտվությունները։' };
        if (error.outcome === 'unknown') return { result: null, error: 'Պատասխանը չհասավ․ վերծանումը կարող էր արդեն սկսված լինել։ Ավտոմատ կրկնություն չի կատարվել։' };
        return { result: null, error: 'AI ծառայությունն այս պահին անհասանելի է։ Ձեր պատկերը պահպանված է այս էջում։' };
      }
      console.error('Invalid manuscript response');
      return { result: null, error: 'Արդյունքը չհաջողվեց ստուգել․ այն չի ներկայացվում որպես վստահելի վերծանում։' };
    }
  });