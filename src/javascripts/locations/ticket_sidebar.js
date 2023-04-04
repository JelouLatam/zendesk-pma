// need to import basic garden css styles
import "@zendeskgarden/css-bedrock";

import App from "../modules/app";
import { callWebHook } from "../utils/postToWebhook";

const client = ZAFClient.init();

client.on("app.registered", function (appData) {
  return new App(client, appData);
});

client.on("ticket.submit.start", async function (e) {
  const isComment = await checkIsComment(client);
  console.log("IsCommnet", isComment);
  if (isComment) {
    try {
      return await callWebHook(client, "message-event");
    } catch (error) {
      console.error("=== isComment error", JSON.stringify(e));
    }
  }
});

client.on("ticket.status.changed", async (data) => {
  try {
    return await callWebHook(client, "ticket-event");
  } catch (error) {
    console.error("=== status error", JSON.stringify(e));
  }
});

async function checkIsComment(client) {
  const {
    comment: { text = "" },
  } = await client.get("comment");

  return !!text;
}
