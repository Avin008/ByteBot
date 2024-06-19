import { Hono } from 'hono';
import { sendWhatsAppMessage } from './whatsappService';

type Env = {
	AI: Ai;
	ACCOUNT_SID: string;
	AUTH_TOKEN: string;
	RECIEVER_NUMBER: string;
	SENDER_NUMBER: string;
};

const app = new Hono<{ Bindings: Env }>();

app.get('/', async (c) => {
	const ai = c.env.AI;

	const messages = [
		{
			role: 'system',
			content:
				'Present primary to secondary school level science topics one at a time by posing questions and offering four multiple-choice options for the user to select the correct answer, ensuring not to reveal yourself as an AI or interact beyond presenting the options. start with the question and end with the options no greetings or any other interaction',
		},
	];

	const res: any = await ai.run('@cf/meta/llama-3-8b-instruct', { messages });

	await sendWhatsAppMessage(c.env.ACCOUNT_SID, c.env.AUTH_TOKEN, c.env.RECIEVER_NUMBER, c.env.SENDER_NUMBER, res.response);

	return c.json({ data: res });
});

export default app;
