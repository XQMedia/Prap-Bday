import { PLAYLIST } from "@/lib/data";

export default function EnhypenAudio() {
  return (
    <section className="audio" id="audio">
      <div className="filehead reveal">
        <p className="filehead__no">Evidence Log · C</p>
        <h2 className="filehead__title">recovered audio</h2>
      </div>

      <div className="player reveal" id="player">
        <span className="stamp stamp--sm player__stamp">Evidence</span>
        <div className="player__head">
          <div className="player__art">♫</div>
          <div className="player__meta">
            <p className="player__label">exhibit C · audio log</p>
            <p className="player__title">{PLAYLIST.title}</p>
            <p className="player__sub">{PLAYLIST.by}</p>
          </div>
        </div>
        <div className="player__list" id="playerList">
          {PLAYLIST.tracks.map((t, i) => (
            <div className="track" data-track={i} key={i}>
              <span className="track__no">{String(i + 1).padStart(2, "0")}</span>
              <span className="eq" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="track__body">
                <span className="track__name">
                  {t.name}
                  {t.fav ? " ♡" : ""}
                </span>
              </span>
              <span className="track__dur">{t.dur}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="audio__note reveal">
        found on repeat at the scene. suspect: excellent taste in music.
      </p>
    </section>
  );
}
