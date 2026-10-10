# leeheemoon.com

정적 웹사이트 (Webflow CSS 기반). `main` 브랜치에 push하면 GitHub Actions가 `public/` 폴더를 Strato 웹스페이스에 SFTP로 업로드합니다.

## 폴더 구조

```
public/            ← 이 폴더 내용만 서버에 올라갑니다
  index.html
  css/             ← Webflow export의 CSS (normalize.css, webflow.css, leeheemoon.webflow.css)
  js/              ← webflow.js
  images/
.github/workflows/deploy.yml
```

Webflow에서 export한 파일 이름이 다르면 `public/index.html`의 `<link>` 경로를 맞춰주세요.

## Strato 배포 설정 (최초 1회)

1. **Strato에서 SFTP 정보 확인**
   Strato Kundenlogin → Hosting → *SFTP/SSH* (또는 *FTP-Zugänge*)
   - Host: `ssh.strato.de`
   - Benutzer: 보통 도메인 이름 (예: `leeheemoon.com`) 또는 새로 만든 SFTP 사용자
   - Passwort: 해당 계정 비밀번호

2. **GitHub 저장소 → Settings → Secrets and variables → Actions**
   - *Secrets* 탭:
     - `STRATO_HOST` = `ssh.strato.de`
     - `STRATO_USER` = SFTP 사용자 이름
     - `STRATO_PASSWORD` = SFTP 비밀번호
   - *Variables* 탭 (선택):
     - `STRATO_REMOTE_DIR` = 도메인이 연결된 웹스페이스 폴더 (기본값 `/`)
       Strato → Domains → www.leeheemoon.com → *Ziel* 에서 어떤 폴더를 가리키는지 확인하세요.

3. **배포**: `main`에 push하거나 Actions 탭에서 *Deploy to Strato* → *Run workflow*.

## 참고

- 업로드는 `--only-newer`로 바뀐 파일만 올리고, 서버에 있는 다른 파일은 **삭제하지 않습니다**.
  서버에서 오래된 파일까지 정리하려면 `deploy.yml`의 `mirror`에 `--delete`를 추가하세요 (해당 폴더에 다른 파일이 없는지 먼저 확인).
- HTTPS(SSL)는 Strato 관리화면에서 www.leeheemoon.com에 SSL 인증서를 활성화하면 됩니다.
