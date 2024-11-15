import { createLtm, getLtm } from '$lib/flou';

export async function load({ fetch }) {
    const storedLtmId = localStorage.getItem('ltmId');
    let ltm;

    if (storedLtmId) {
        try {
            ltm = await getLtm(parseInt(storedLtmId), fetch);
            ltm.id = storedLtmId;
        } catch (error) {
            if (error instanceof Response) throw error;
            localStorage.removeItem('ltmId');
        }
    }

    if (!ltm) {
        ltm = await createLtm(fetch);
        const ltmId = ltm.id;
        localStorage.setItem('ltmId', ltmId.toString());

        ltm = await getLtm(parseInt(ltm.id), fetch);
        ltm.id = ltmId;
    }

    return {
        ltm,
    };
}

export const ssr = false;