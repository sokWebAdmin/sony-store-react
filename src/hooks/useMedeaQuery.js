import { useState, useEffect } from 'react';

export const useMediaQuery = (query) => {
    const mediaMatch = window.matchMedia(query);
    const [matches, setMatches] = useState(mediaMatch.matches);

    useEffect(() => {
        const handler = (e) => setMatches(e.matches);
        const listener = mediaMatch?.addEventListener ?? null; // safari 12 mediaMatch.addEventListener === undefined

        if (listener) {
            listener('change', handler);
        }

        return listener ? listener('change', handler) : () => {};
    });

    return matches;
};
