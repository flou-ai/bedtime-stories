import { PUBLIC_API_BASE_URL } from '$env/static/public';


export const createLtm = async (
  customFetch: typeof fetch = fetch
) => {
  const response = await customFetch(`${PUBLIC_API_BASE_URL}/api/v0/ltm`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fqn: "part2.BedtimeStoryWriter",
      payload: {},
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to create LTM: ${response.statusText}`);
  }

  const ltm = await response.json();
  console.log('ltm', ltm);
  return ltm;
};

export const getLtm = async (
  ltmId: number,
  customFetch: typeof fetch = fetch
) => {
  const response = await customFetch(`${PUBLIC_API_BASE_URL}/api/v0/ltm/${ltmId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to get LTM: ${response.statusText}`);
  }

  return await response.json();
};

export const transition = async (
  ltmId: number,
  transitionName: string,
  namespace: string,
  payload?: any,
  waitUntilTransition?: string,
  customFetch: typeof fetch = fetch
) => {
  const response = await customFetch(`${PUBLIC_API_BASE_URL}/api/v0/ltm/${ltmId}/transition`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      transition: transitionName,
      namespace: namespace,
      ...(payload && { payload }),
      ...(waitUntilTransition && { wait_until_transition: waitUntilTransition })
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to execute transition ${transitionName}: ${response.statusText}`);
  }

  console.log('transition', ltmId, transitionName, namespace, payload, waitUntilTransition);
  return await response.json();
};