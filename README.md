# GSAI Dashboard

KAIST GSAI(2027 봄) 입학 준비용 인터랙티브 대시보드.
3개 탭으로 커리큘럼·면접 기출·필수 논문을 한곳에서 관리한다.

## 탭 구성

- **🛠️ 커리큘럼** — Learning by Doing 방식. 국회 표결 프로젝트를 척추로
  STEP 1~10 (긁기 → 돌리기 → NumPy → 텍스트 → 딥러닝 → BERT → 확장 →
  연구화 → 지원 → Physical AI 보너스). 각 STEP: 만들 것 → 막히는 지점 →
  그때 배우는 것(링크) → 결과물.
- **📋 기출문제** — 6개 카테고리 28문항. 각 문항에 "왜 중요(맥락)" +
  "제대로 이해하려면(자료 링크)" + 답변 힌트 토글.
- **📄 논문 리스트** — 12개 카테고리. ⭐오성준 교수 본인 연구 최우선,
  JEPA 계보, AI×민주주의, 🌉교수님 연구×내 연구축 연결고리 등.

## 로컬 실행

```bash
npm install
npm run dev
```

## 빌드 / 배포

```bash
npm run build   # dist/ 생성
```

**현재 배포: GitHub Pages (공개)** → https://brbrlim.github.io/kaist/
- `main` push 시 `.github/workflows/deploy.yml`가 자동 빌드·배포.
- 서브경로(`/kaist/`)라서 `vite.config.js`에 `base: '/kaist/'` 설정됨.
- ⚠️ 임시 공개. 추후 Tailscale로 비공개(나만 보기) 전환 예정.

대안 — Cloudflare Pages:
- 빌드 명령 `npm run build`, 출력 디렉토리 `dist` (단, `base`는 `/`로 되돌려야 함)

## 기술 메모

- 메인 컴포넌트는 단일 파일 (`src/App.jsx`, `export default function App()`).
  외부 의존성은 React `useState`만.
- 스타일은 전부 inline (Tailwind 미사용) — `index.css`는 최소 리셋만.
- 데이터는 컴포넌트 내 상수 배열 (CUR_M, EXAM_CATS, PAP_C 등).
  내용 수정은 해당 배열만 편집하면 됨.
- localStorage 등 브라우저 스토리지 미사용 (상태는 세션 내 useState).

## 관련

- JOS 프로젝트 노트: `[[KAIST GSAI 준비]]`
- 연구: `[[국회 표결 연구]]`

> ⚠️ 논문 리스트의 일부 arXiv 번호·연도는 검색 기반이라 100% 보장은 아님.
> 배포 전 핵심 논문(특히 오성준 교수 본인 논문) 링크 한 번 확인 권장.
