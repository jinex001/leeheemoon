# 동영상 파일 (git 미포함)

동영상(`public/videos/*.mp4|webm|mov`)은 용량 때문에 `.gitignore`로 git에서 제외했습니다.
GitHub Actions 배포는 git에 있는 파일만 올리므로, **아래 '사용 중' 파일은 Strato 서버의 `videos/` 폴더에 직접 SFTP로 한 번 올려야** 영상이 나옵니다.
(배포 workflow는 `--delete`가 없어서 서버에 따로 올린 영상을 지우지 않습니다.)

원본 위치: `~/Downloads/leeheemoon-re-design.webflow/videos/` (로컬 `public/videos/`에도 복사되어 있음)

100MB를 넘는 파일은 없습니다 (가장 큰 파일 약 29MB).

## 사용 중 — 서버에 올려야 함 (46개, 88.5 MB)

HTML/CSS에서 참조하는 파일입니다.

| 파일 | 크기 |
|---|---:|
| `Minyo_Teaser-transcode.webm` | 5.3 MB |
| `minyo_header-transcode.webm` | 5.3 MB |
| `Minyo_Teaser-transcode.mp4` | 4.8 MB |
| `minyo_header-transcode.mp4` | 4.5 MB |
| `gannam-rainbow-pt2-mobil-transcode.webm` | 4.2 MB |
| `Comp-2_3-transcode.webm` | 3.6 MB |
| `gannam-rainbow-2-transcode.webm` | 3.5 MB |
| `tokyo_live_webm.webm` | 3.5 MB |
| `gannam-rainbow-12-transcode.webm` | 3.4 MB |
| `OBSG_teaser01-transcode.webm` | 3.3 MB |
| `korean-men_BG_video-transcode.mp4` | 2.8 MB |
| `korean-men_BG_video-transcode.webm` | 2.6 MB |
| `tokyo_live_mp4.mp4` | 2.4 MB |
| `KOREAN-MEN-COVER-transcode.webm` | 2.4 MB |
| `deeplove---trim-transcode.webm` | 2.4 MB |
| `gannam-rainbow-12-transcode.mp4` | 2.4 MB |
| `gannam-rainbow-2-transcode.mp4` | 2.3 MB |
| `Six-senses---cover_webm.webm` | 2.0 MB |
| `gannam-rainbow-pt2-mobil-transcode.mp4` | 1.8 MB |
| `deeplove---trim-transcode.mp4` | 1.7 MB |
| `Comp-2_3-transcode.mp4` | 1.7 MB |
| `minyo_teaser_web-transcode.webm` | 1.6 MB |
| `yeowoorak-transcode.webm` | 1.4 MB |
| `¿©¿́¶ô6-transcode.webm` | 1.4 MB |
| `Untitled_webm.webm` | 1.3 MB |
| `nal-transcode.webm` | 1.3 MB |
| `tiny-desk-korea-transcode.webm` | 1.2 MB |
| `OBSG_teaser01-transcode.mp4` | 1.2 MB |
| `Untitled_mp4.mp4` | 1.2 MB |
| `¿©¿́¶ô6-transcode.mp4` | 1.1 MB |
| `yeowoorak-transcode.mp4` | 1.1 MB |
| `KOREAN-MEN-COVER-transcode.mp4` | 1.1 MB |
| `티저02_남_최종-transcode.webm` | 1.0 MB |
| `Screen-Recording-2026-05-08-at-14.15.09_webm.webm` | 1.0 MB |
| `Gangnam-story_Cover_teaser-transcode.webm` | 1.0 MB |
| `Screen-Recording-2026-05-08-at-14.15.09_mp4.mp4` | 0.9 MB |
| `minyo_teaser_web-transcode.mp4` | 0.9 MB |
| `티저02_남_최종-transcode.mp4` | 0.8 MB |
| `nal-transcode.mp4` | 0.6 MB |
| `tiny-desk-korea-transcode.mp4` | 0.5 MB |
| `Gangnam-story_Cover_teaser-transcode.mp4` | 0.4 MB |
| `ego_teaser_cover-transcode.webm` | 0.4 MB |
| `yo_03-transcode.webm` | 0.4 MB |
| `Six-senses---cover_mp4.mp4` | 0.3 MB |
| `ego_teaser_cover-transcode.mp4` | 0.2 MB |
| `yo_03-transcode.mp4` | 0.2 MB |

## 미사용 (48개, 243.5 MB)

HTML/CSS 어디에서도 참조하지 않는 파일입니다 (Webflow에 업로드된 원본 등). 서버에 올릴 필요 없습니다.

| 파일 | 크기 |
|---|---:|
| `Untitled.mp4` | 28.8 MB |
| `gannam-rainbow-pt2-mobil.mp4` | 27.4 MB |
| `gannam-rainbow-2.mp4` | 25.4 MB |
| `Comp-2_3.mp4` | 24.5 MB |
| `Minyo_Teaser.mp4` | 22.6 MB |
| `KOREAN-MEN-COVER.mp4` | 14.7 MB |
| `티저02_남_최종.mov` | 13.4 MB |
| `minyo_header.webm` | 10.6 MB |
| `Screen-Recording-2026-05-08-at-14.15.09.mov` | 10.0 MB |
| `korean-men_BG_video.webm` | 6.2 MB |
| `gannam-rainbow-12.webm` | 4.1 MB |
| `tahm_02.webm` | 3.7 MB |
| `tokyo_live.mp4` | 3.5 MB |
| `sagyechuk.webm` | 3.4 MB |
| `eolssigou.webm` | 3.1 MB |
| `OBSG_teaser01.webm` | 2.5 MB |
| `¿©¿́¶ô6.mp4` | 2.5 MB |
| `yeowoorak.mp4` | 2.5 MB |
| `Six-senses---cover.mp4` | 2.1 MB |
| `ZAP_BG.webm` | 2.1 MB |
| `gipensarang1.webm` | 2.1 MB |
| `KOREAN-MEN-COVER.webm` | 1.9 MB |
| `eolssigou-transcode.webm` | 1.8 MB |
| `minyosamchuli.webm` | 1.6 MB |
| `eolssigou-transcode.mp4` | 1.6 MB |
| `sagyechuk-transcode.mp4` | 1.5 MB |
| `minyo_teaser_web.webm` | 1.5 MB |
| `gipensarang1-transcode.webm` | 1.4 MB |
| `sagyechuk-transcode.webm` | 1.3 MB |
| `ZAP_BG-transcode.webm` | 1.2 MB |
| `tahm_02-transcode.webm` | 1.2 MB |
| `tahm_02-transcode.mp4` | 1.2 MB |
| `nal.webm` | 1.1 MB |
| `tiny-desk-korea.webm` | 1.1 MB |
| `minyosamchuli-transcode.webm` | 1.1 MB |
| `gipensarang1-transcode.mp4` | 1.0 MB |
| `kkew.webm` | 1.0 MB |
| `Gangnam-story_Cover_teaser.webm` | 0.9 MB |
| `deeplove---trim.webm` | 0.8 MB |
| `emperior.webm` | 0.8 MB |
| `minyosamchuli-transcode.mp4` | 0.8 MB |
| `kkew-transcode.webm` | 0.8 MB |
| `kkew-transcode.mp4` | 0.7 MB |
| `emperior-transcode.webm` | 0.7 MB |
| `ZAP_BG-transcode.mp4` | 0.7 MB |
| `ego_teaser_cover.webm` | 0.4 MB |
| `emperior-transcode.mp4` | 0.4 MB |
| `yo_03.webm` | 0.2 MB |

참고: 일부 페이지는 영상을 `cdn.prod.website-files.com` / `uploads-ssl.webflow.com`에서 직접 불러옵니다. Webflow 사이트를 닫으면 이 링크가 끊길 수 있습니다.
