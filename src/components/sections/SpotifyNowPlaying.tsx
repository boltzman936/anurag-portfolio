"use client";

/**
 * Prepared, not wired: real playback needs a Spotify app client ID,
 * user OAuth, and Premium (Web Playback SDK), none of which exist
 * here yet. Rather than fake a "now playing" track, this shows an
 * honest disabled state so the section has a place to plug in real
 * auth later without inventing data or breaking the page.
 */
export function SpotifyNowPlaying() {
  return (
    <div className="mt-4 flex items-center justify-between gap-4 rounded-lg border border-border bg-[#0a0a0a] px-4 py-3 sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-border bg-[#111]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-muted" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.59 14.4a.62.62 0 0 1-.86.2c-2.35-1.44-5.3-1.76-8.79-.96a.62.62 0 1 1-.27-1.2c3.82-.87 7.1-.5 9.72 1.1a.62.62 0 0 1 .2.86Zm1.22-2.73a.78.78 0 0 1-1.07.26c-2.69-1.65-6.79-2.13-9.98-1.17a.78.78 0 1 1-.45-1.49c3.64-1.1 8.16-.57 11.24 1.32a.78.78 0 0 1 .26 1.08Zm.11-2.84c-3.23-1.92-8.56-2.1-11.65-1.16a.93.93 0 1 1-.54-1.78c3.54-1.08 9.42-.87 13.14 1.34a.93.93 0 0 1-.95 1.6Z" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase">Now Playing</p>
          <p className="truncate text-sm text-secondary">Spotify not connected</p>
        </div>
      </div>

      <button
        type="button"
        disabled
        aria-disabled="true"
        title="Spotify integration is prepared but not yet connected"
        className="shrink-0 rounded-full border border-border px-3 py-1.5 font-mono text-[10px] tracking-[0.1em] text-muted uppercase disabled:cursor-not-allowed"
      >
        Unavailable
      </button>
    </div>
  );
}
