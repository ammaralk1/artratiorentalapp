const apiBase = (process.env.LOCAL_API_BASE_URL || 'http://127.0.0.1:8080/api').replace(/\/$/, '');
const username = process.env.LOCAL_SMOKE_USERNAME || 'integration_admin';
const password = process.env.LOCAL_SMOKE_PASSWORD || 'TestPassword123!';

function extractSessionCookie(setCookieHeader) {
  if (!setCookieHeader) {
    return null;
  }

  const match = setCookieHeader.match(/art_ratio_session[^=]*=[^;]+/i);
  return match ? match[0] : null;
}

async function expectOkJson(response, label) {
  const text = await response.text();
  let payload = null;

  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`${label}: expected JSON response, received ${text.slice(0, 200)}`);
  }

  if (!response.ok || !payload?.ok) {
    throw new Error(`${label}: request failed with status ${response.status} and payload ${JSON.stringify(payload)}`);
  }

  return payload;
}

async function main() {
  const loginResponse = await fetch(`${apiBase}/auth/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const rawSetCookie = loginResponse.headers.get('set-cookie') || '';
  const sessionCookie = extractSessionCookie(rawSetCookie);
  const loginPayload = await expectOkJson(loginResponse, 'login');

  if (!sessionCookie) {
    throw new Error('login: session cookie was not returned by the API');
  }

  const authStatusResponse = await fetch(`${apiBase}/auth/`, {
    headers: {
      Accept: 'application/json',
      Cookie: sessionCookie,
    },
  });
  const authStatusPayload = await expectOkJson(authStatusResponse, 'auth status');

  const summaryResponse = await fetch(`${apiBase}/summary/`, {
    headers: {
      Accept: 'application/json',
      Cookie: sessionCookie,
    },
  });
  const summaryPayload = await expectOkJson(summaryResponse, 'summary');

  const output = {
    apiBase,
    username: loginPayload?.data?.username || authStatusPayload?.data?.username || username,
    role: loginPayload?.data?.role || authStatusPayload?.data?.role || null,
    counts: {
      customers: summaryPayload?.data?.customers?.total ?? null,
      reservations: summaryPayload?.data?.reservations?.total ?? null,
      equipment: summaryPayload?.data?.equipment?.total ?? null,
      technicians: summaryPayload?.data?.technicians?.total ?? null,
      projects: summaryPayload?.data?.projects?.total ?? null,
    },
  };

  console.log(JSON.stringify(output, null, 2));
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
