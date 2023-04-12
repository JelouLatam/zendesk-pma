// import dotenv from 'dotenv';
// dotenv.config();
import { parsePayload } from "./utils";

export const callWebHook = async (client, event) => {
  try {
    const { ticket } = await client.get("ticket");

    const payloadData = {
      event,
      ...ticket,
    };
    console.log(JSON.stringify(process.env.WEBHOOK_URL));
    const options = {
      url: process.env.WEBHOOK_URL,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(parsePayload(payloadData)),
      httpCompleteResponse: true,
    };
    await client.request(options);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
