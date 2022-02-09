const lyrics = [];
const ul = document.getElementById("lyrics");

chrome.devtools.network.onRequestFinished.addListener((req) => {
  const url = req.request.url;
  if (
    url.indexOf("https://spclient.wg.spotify.com/color-lyrics/v2/track/") !== -1
  ) {
    req.getContent((content, encoding) => {
      if (content === null) return;

      const obj = JSON.parse(content);

      const lyric = {
        id: obj.lyrics.providerLyricsId,
        word: obj.lyrics.lines[0].words,
      };

      if (!lyrics.some((l) => l.id === lyric.id)) {
        lyrics.push(lyric);

        var li = ul.appendChild(document.createElement("li"));
        li.innerHTML = `id：${lyric.id} / 歌い出し：${lyric.word} / `;

        const saveA = document.createElement("a");
        saveA.innerHTML = "Save";
        saveA.href = "#";
        saveA.download = `${lyric.id}.json`;
        saveA.addEventListener("click", () => {
          var blob = new Blob([content], { type: " application/json" });
          saveA.href = window.URL.createObjectURL(blob);
        });

        li.appendChild(saveA);
      }
    });
  }
});

const onClear = () => {
  lyrics.splice(0);
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
};
document.getElementById("clear-button").addEventListener("click", onClear);
