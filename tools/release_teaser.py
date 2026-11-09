#!/usr/bin/env python3
"""Release one Minyo Samcheonri 2026 teaser on the site.

Usage: python3 tools/release_teaser.py N /path/to/source.mp4

- Encodes the source to public/videos/minyo-samcheonlli-2026-teaser-N.{mp4,webm}
  (1080px wide) plus a poster frame.
- Marks teaser N as released in the 360-degree carousel on the KR and EN
  Minyo Samcheonri pages.
- Adds a home-slider slide for teaser N right after teaser N-1 on the
  KR and EN home pages.

Run from the repository root. Safe to re-run for the same N (it skips
steps that are already done).
"""
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
VID = PUB / "videos"
PAGES = {
    "kr": PUB / "project-subpage/album-details/deep-love/3-minyo-samcheonlli-kr.html",
    "en": PUB / "project-subpage/album-details/deep-love/minyo-samcheonlli.html",
}
HOMES = {
    "en": (PUB / "index.html", "Minyo Samcheonri Teaser #{n}",
           "project-subpage/album-details/deep-love/minyo-samcheonlli.html"),
    "kr": (PUB / "home-kr.html", "민요삼천리 티저 #{n}",
           "project-subpage/album-details/deep-love/3-minyo-samcheonlli-kr.html"),
}
ARROW = ""  # Heemoon icon-font arrow used by every slide link


def base(n):
    # Teaser #1 shipped without a number in its file name.
    return "minyo-samcheonlli-2026-teaser" + ("" if n == 1 else f"-{n}")


def run(cmd):
    print("+", " ".join(str(c) for c in cmd))
    subprocess.run(cmd, check=True)


def encode(n, src):
    b = VID / base(n)
    mp4, webm, poster = Path(f"{b}.mp4"), Path(f"{b}.webm"), Path(f"{b}-poster.jpg")
    scale = ["-vf", "scale=1080:-2"]
    if not mp4.exists():
        run(["ffmpeg", "-v", "error", "-y", "-i", src, *scale, "-c:v", "libx264", "-preset", "slow",
             "-crf", "22", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
             "-c:a", "aac", "-b:a", "128k", mp4])
    if not webm.exists():
        run(["ffmpeg", "-v", "error", "-y", "-i", src, *scale, "-c:v", "libvpx-vp9", "-crf", "33",
             "-b:v", "0", "-row-mt", "1", "-c:a", "libopus", "-b:a", "96k", webm])
    if not poster.exists():
        dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                                    "-of", "csv=p=0", src], capture_output=True, text=True,
                                   check=True).stdout)
        run(["ffmpeg", "-v", "error", "-y", "-ss", f"{dur * 0.4:.2f}", "-i", src, "-frames:v", "1",
             *scale, "-q:v", "3", poster])
    for f in (mp4, webm, poster):
        print(f"  {f.relative_to(ROOT)}  {f.stat().st_size / 1e6:.1f} MB")


def release_in_carousel(n):
    for lang, page in PAGES.items():
        s = page.read_text(encoding="utf-8")
        m = re.search(r"data-teasers='([^']*)'", s)
        items = json.loads(m.group(1))
        rel = "../../../videos/" + base(n)
        for t in items:
            if t["n"] == n:
                t.clear()
                t.update({"n": n, "mp4": rel + ".mp4", "webm": rel + ".webm", "poster": rel + "-poster.jpg"})
        new = "data-teasers='" + json.dumps(items, ensure_ascii=False, separators=(",", ":")) + "'"
        page.write_text(s.replace(m.group(0), new), encoding="utf-8")
        print(f"  carousel {lang}: teaser #{n} released")


def add_home_slide(n):
    for lang, (page, title_fmt, href) in HOMES.items():
        s = page.read_text(encoding="utf-8")
        if f"minyo-teaser-slide-{n}\"" in s:
            print(f"  home {lang}: slide #{n} already there")
            continue
        b = "videos/" + base(n)
        slide = f'''      <div class="w-slide minyo-teaser-slide minyo-teaser-slide-{n}" style="background-color:#000">
        <video class="home-teaser" muted playsinline preload="auto" poster="{b}-poster.jpg" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0">
          <source src="{b}.webm" type="video/webm">
          <source src="{b}.mp4" type="video/mp4">
        </video>
        <div class="slide-caption">
          <div class="slide-title">
            <h3 class="news-title">{title_fmt.format(n=n)}</h3>
          </div>
          <a href="{href}" class="slide-cta w-inline-block">
            <h1 class="cta-goto">{ARROW}</h1>
          </a>
        </div>
      </div>
'''
        # Insert after the last teaser slide currently on the page.
        slides = list(re.finditer(r'      <div class="w-slide minyo-teaser-slide[^"]*".*?\n      </div>\n', s, re.S))
        if not slides:
            sys.exit(f"no teaser slide found in {page}")
        end = slides[-1].end()
        s = s[:end] + slide + s[end:]
        page.write_text(s, encoding="utf-8")
        print(f"  home {lang}: slide #{n} added")


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    n, src = int(sys.argv[1]), sys.argv[2]
    if not 2 <= n <= 5:
        sys.exit("N must be 2-5")
    encode(n, src)
    release_in_carousel(n)
    add_home_slide(n)


if __name__ == "__main__":
    main()
