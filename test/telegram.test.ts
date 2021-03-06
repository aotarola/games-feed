import {
  testing,
} from "../deps.ts";

const { assertEquals } = testing;

import Telegram from "../lib/telegram.ts";

const fakeFetch = () => Promise.resolve(new Response("ok"));
const telegram = Telegram.build(fakeFetch);
const sendNotification = telegram.sendNotification.bind(telegram);

Deno.test("Telegram#sendNotification: return undefined when text is missing", async () => {
  assertEquals(
    await sendNotification(),
    undefined,
  );
});

Deno.test("Telegram#sendNotification: return a response when text is passed", async () => {
  const response = await sendNotification("kittens");
  assertEquals(
    await response?.text(),
    "ok",
  );
});

Deno.test("Telegram#sendNotification: return undefined when env vars are undefined", async () => {
  Deno.env.delete("TELEGRAM_BOT_TOKEN");
  Deno.env.delete("TELEGRAM_CHAT_GID");
  assertEquals(
    await sendNotification("kittens"),
    undefined,
  );
});
