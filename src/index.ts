import { Hono } from 'hono';
import { sendWhatsAppMessage } from './whatsappService';

type Env = {
	AI: Ai;
	ACCOUNT_SID: string;
	AUTH_TOKEN: string;
	RECIEVER_NUMBER: string;
	SENDER_NUMBER: string;
	PROMPT_MESSAGE: string;
};

const app = new Hono<{ Bindings: Env }>();

app.get('/', async (c) => {
	return c.json({ data: 'hello world' });
});

app.post('/', async (c) => {
	const data = await c.req.parseBody();
	const recievedMessage: any = data.Body;

	const ai = c.env.AI;

	const res: any = await ai.run('@cf/mistral/mistral-7b-instruct-v0.1', { prompt: recievedMessage });

	await sendWhatsAppMessage(c.env.ACCOUNT_SID, c.env.AUTH_TOKEN, c.env.RECIEVER_NUMBER, c.env.SENDER_NUMBER, res.response);
	return c.json({ data: res });
});

export default app;
