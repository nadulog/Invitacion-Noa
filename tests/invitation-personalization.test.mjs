import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const script = await readFile(
  new URL("../public/invitation-personalization.js", import.meta.url),
  "utf8",
);

function createElements() {
  return {
    "nombres-invitados": { textContent: "" },
    "cantidad-lugares": { textContent: "" },
    "boton-confirmar": {
      href: "https://bloomdate-rsvp.netlify.app/r/cumple-xv-noa",
    },
  };
}

async function execute({ search, fetch }) {
  const elements = createElements();
  vm.runInNewContext(script, {
    URLSearchParams,
    window: { location: { search } },
    document: { getElementById: (id) => elements[id] || null },
    fetch,
  });
  await new Promise((resolve) => setTimeout(resolve, 0));
  return elements;
}

test("sin token conserva los campos vacíos y no consulta Supabase", async () => {
  let requests = 0;
  const elements = await execute({
    search: "",
    fetch: async () => {
      requests += 1;
      return { ok: true, json: async () => [] };
    },
  });

  assert.equal(requests, 0);
  assert.equal(elements["nombres-invitados"].textContent, "");
  assert.equal(elements["cantidad-lugares"].textContent, "");
  assert.equal(
    elements["boton-confirmar"].href,
    "https://bloomdate-rsvp.netlify.app/r/cumple-xv-noa",
  );
});

test("con token completa nombres, pases y RSVP dinámico", async () => {
  const elements = await execute({
    search: "?invite=token 123",
    fetch: async () => ({
      ok: true,
      json: async () => [{
        first_name: "Ana",
        companions: [{ first_name: "Luis" }, { first_name: "Mora" }],
        event_slug: "noa xv",
      }],
    }),
  });

  assert.equal(elements["nombres-invitados"].textContent, "Ana, Luis y Mora");
  assert.equal(elements["cantidad-lugares"].textContent, "Tenés 3 lugares reservados");
  assert.equal(
    elements["boton-confirmar"].href,
    "https://bloomdate-rsvp.netlify.app/r/noa%20xv?invite=token%20123",
  );
});
