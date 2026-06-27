import { useState } from "react";

// ============================================================
//  KAIST GSAI 준비 통합 대시보드 (커리큘럼 / 기출 / 논문)
// ============================================================

const CUR_M = [
  {
    id: 1, stage: "긁어보기", sc: "#1a73e8", time: "1-2주",
    title: "국회 데이터 일단 긁어서 들여다보기", icon: "🔍",
    goal: "국회 의안정보시스템에서 법안 표결 데이터를 긁어와서 'pandas로 열어보는 것'까지. 모델 0개. 그냥 데이터가 어떻게 생겼는지 눈으로 보기.",
    wall: "Python으로 웹 데이터 어떻게 가져오지? 표 형태 데이터는 어떻게 다루지?",
    learn: [
      { name: "pandas 10분 입문", type: "막혔을때", detail: "DataFrame 열고, 필터, 정렬, 그룹화", url: "https://pandas.pydata.org/docs/user_guide/10min.html" },
      { name: "국회 열린국회정보 OpenAPI", type: "데이터원천", detail: "표결정보, 의안정보 API 신청", url: "https://open.assembly.go.kr/portal/openapi/main.do" },
      { name: "requests + BeautifulSoup 기초", type: "막혔을때", detail: "웹에서 데이터 긁기 (필요시)", url: "https://realpython.com/beautiful-soup-web-scraper-python/" },
    ],
    ship: "노트북 1개: '국회 표결 데이터 탐색' — 표 띄우고 간단한 그래프 몇 개"
  },
  {
    id: 2, stage: "일단 돌리기", sc: "#1a73e8", time: "1-2주",
    title: "sklearn으로 투표 예측 일단 작동시키기", icon: "⚡",
    goal: "의원 정당+법안 분야 → 찬성/반대 예측. sklearn 함수 3줄로 일단 '작동하는 모델'을 본다. 정확도가 60%든 90%든 상관없어. 굴러가는 걸 보면 재밌어짐.",
    wall: "모델이 '학습'한다는 게 뭐지? 정확도 70%가 좋은 거야 나쁜 거야? train/test는 왜 나눠?",
    learn: [
      { name: "sklearn 5분 첫 모델", type: "막혔을때", detail: "fit/predict, train_test_split", url: "https://scikit-learn.org/stable/getting_started.html" },
      { name: "Kaggle Intro to ML (무료)", type: "감잡기", detail: "모델이 학습한다는 개념을 손으로", url: "https://www.kaggle.com/learn/intro-to-machine-learning" },
      { name: "StatQuest: 평가지표", type: "막혔을때", detail: "정확도, 정밀도, 재현율이 뭔지", url: "https://www.youtube.com/watch?v=Kdsp6soqA7o" },
    ],
    ship: "작동하는 예측 모델 v0 + '내 모델 정확도 N%' 트윗할 수 있는 상태"
  },
  {
    id: 3, stage: "안을 열어보기", sc: "#ea4335", time: "3-4주",
    title: "그 모델을 NumPy로 직접 만들어보기", icon: "🔧",
    goal: "방금 sklearn이 대신 해준 걸 직접 구현. 로지스틱 회귀를 NumPy로 밑바닥부터. 여기서 '곱하고 더하기'와 '확률로 판단'이 왜 필요한지 몸으로 느낌.",
    wall: "sklearn이 내부에서 대체 뭘 한 거지? 왜 행렬 곱셈이 나오지? '조금씩 조정'은 수학적으로 어떻게?",
    learn: [
      { name: "3Blue1Brown 선형대수", type: "이제필요함", detail: "행렬 곱셈이 왜 패턴 찾기인지 직관", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab" },
      { name: "StatQuest 통계 기초", type: "이제필요함", detail: "확률, 우도, 로지스틱 회귀 직관", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9" },
      { name: "CS229 강의 (필요 부분만)", type: "더깊이", detail: "로지스틱 회귀, 경사하강 유도", url: "https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU" },
    ],
    ship: "블로그: '로지스틱 회귀를 sklearn 없이 만들어봤다' — 너의 첫 포트폴리오 글"
  },
  {
    id: 4, stage: "텍스트 넣기", sc: "#ea4335", time: "3-4주",
    title: "법안 '내용'을 모델에 먹이기 (텍스트 → 숫자)", icon: "📝",
    goal: "지금까진 정당 같은 단순 정보만 썼지. 이제 법안 제목/본문 텍스트를 넣는다. '글자를 어떻게 숫자로?' 가 이 모듈의 전부. 예측 정확도가 확 오르는 경험.",
    wall: "텍스트를 어떻게 숫자로 바꿔? 단어 의미를 컴퓨터가 어떻게 알아?",
    learn: [
      { name: "임베딩이란? (Illustrated Word2Vec)", type: "이제필요함", detail: "단어를 벡터로 바꾸는 직관", url: "https://jalammar.github.io/illustrated-word2vec/" },
      { name: "Hugging Face NLP 코스 1-3장", type: "막혔을때", detail: "토크나이저, 사전학습 모델 쓰기", url: "https://huggingface.co/learn/nlp-course" },
      { name: "한국어 모델 KoBERT/KLUE", type: "도구", detail: "한국어 텍스트 처리 모델", url: "https://klue-benchmark.com/" },
    ],
    ship: "텍스트 반영 모델 v2 + 블로그: '법안 글을 숫자로 바꿨더니 예측이 좋아졌다'"
  },
  {
    id: 5, stage: "딥러닝 전환", sc: "#fbbc04", time: "4주",
    title: "PyTorch로 옮기고 신경망으로 키우기", icon: "🧠",
    goal: "sklearn/NumPy의 한계에 부딪히면 PyTorch로 이사. 같은 문제를 신경망으로 다시 풀면서 'GPU', '자동미분', '레이어 쌓기'를 자연스럽게 익힌다.",
    wall: "데이터가 커지니 느려. 더 복잡한 패턴은 어떻게? 신경망은 뭐가 다르지?",
    learn: [
      { name: "PyTorch 60분 입문", type: "이제필요함", detail: "텐서, autograd, 학습 루프", url: "https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html" },
      { name: "Andrej Karpathy: 신경망 밑바닥", type: "더깊이", detail: "역전파를 손으로 (최고의 강의)", url: "https://www.youtube.com/watch?v=VMj-3S1tku0" },
      { name: "wandb 실험 관리", type: "도구", detail: "실험 기록·비교 자동화", url: "https://docs.wandb.ai/quickstart" },
    ],
    ship: "PyTorch 신경망 모델 v3 + wandb 실험 대시보드"
  },
  {
    id: 6, stage: "Transformer", sc: "#fbbc04", time: "5주",
    title: "Transformer & BERT로 법안 텍스트 제대로 다루기", icon: "🔡",
    goal: "이 프로젝트의 핵심 도약. 사전학습된 BERT(KoBERT)를 가져와 법안 텍스트로 파인튜닝 → 투표 예측을 한 단계 끌어올린다. '계보를 알고 쓰는 것'이 목표 — 왜 BERT가 이 자리에 있는지 설명할 수 있어야.",
    wall: "단어 임베딩(STEP4)은 문맥을 못 봤는데? Attention이 대체 뭐고 왜 혁명이야? 왜 GPT 말고 BERT지?",
    lineage: "임베딩 계보: One-hot(의미X) → Word2Vec(의미O,문맥X) → RNN/LSTM(문맥O,느림) → ★Transformer(문맥O,빠름) → BERT(이해계열·분류에 강함) / GPT(생성계열). 너의 '법안→찬반 분류'는 '이해' 작업이라 BERT 갈래가 정답.",
    learn: [
      { name: "Illustrated Transformer", type: "이제필요함", detail: "Attention(Q·K·V)을 그림으로. 계보의 대분기점", url: "https://jalammar.github.io/illustrated-transformer/" },
      { name: "Illustrated BERT", type: "이제필요함", detail: "왜 양방향·빈칸맞추기인지. '이해' 계열의 원리", url: "https://jalammar.github.io/illustrated-bert/" },
      { name: "Hugging Face NLP 코스 (파인튜닝)", type: "막혔을때", detail: "사전학습 모델 불러와 내 데이터로 미세조정", url: "https://huggingface.co/learn/nlp-course/chapter3" },
      { name: "KoBERT / KLUE", type: "도구", detail: "한국어 BERT·벤치마크 (법안 텍스트용)", url: "https://klue-benchmark.com/" },
      { name: "Attention Is All You Need", type: "더깊이", detail: "원논문. 면접 대비 수식 레벨까지", url: "https://arxiv.org/abs/1706.03762" },
    ],
    ship: "BERT 파인튜닝 투표 예측 v4 + 블로그: '임베딩의 계보와 왜 BERT를 골랐나'"
  },
  {
    id: 7, stage: "확장", sc: "#fbbc04", time: "4주",
    title: "Transformer / 다른 도메인으로 넓히기", icon: "🚀",
    goal: "이제 기초 체력이 붙음. 여기서 갈래 선택: (A) 국회 프로젝트를 Transformer로 고도화 (B) 선거구 위성이미지 같은 비전 프로젝트로 확장. 관심 가는 쪽으로.",
    wall: "최신 모델(Transformer)은 어떻게 작동하지? 비전은 텍스트와 뭐가 다르지?",
    learn: [
      { name: "Illustrated Transformer", type: "이제필요함", detail: "Attention 시각적 이해", url: "https://jalammar.github.io/illustrated-transformer/" },
      { name: "CS231n (비전 택할 시)", type: "더깊이", detail: "CNN, ViT, 전이학습", url: "https://www.youtube.com/playlist?list=PL3FW7Lu3i5JvHM8ljYj-zLfQRF3EO8sYv" },
      { name: "STAI 연구실 논문", type: "방향탐색", detail: "오성준 교수님 관심사 맛보기", url: "https://s-t-a-i.github.io/" },
    ],
    ship: "고도화된 프로젝트 v4 + 논문 리딩 노트 시작 (주 2편)"
  },
  {
    id: 8, stage: "연구화", sc: "#34a853", time: "4주",
    title: "프로젝트를 '연구 질문'으로 바꾸기", icon: "🔬",
    goal: "지금까진 '만들기'였어. 이제 '연구'로 전환. 내 프로젝트에서 '아직 아무도 안 풀어본 질문'을 뽑아낸다. 관련 논문 15편 읽고 빈틈 찾기.",
    wall: "내가 한 게 연구로서 가치가 있나? 이미 누가 다 했나? 새로운 게 뭐지?",
    learn: [
      { name: "Comp PolSci 핵심 논문들", type: "방향탐색", detail: "Gerrish & Blei, Text as Data", url: "https://press.princeton.edu/books/paperback/9780691207551/text-as-data" },
      { name: "Habermas Machine (좌우지간 연결)", type: "방향탐색", detail: "AI×민주주의 최신 연구", url: "https://www.science.org/doi/10.1126/science.adq2852" },
      { name: "How to Read a Paper", type: "방법론", detail: "논문 효율적으로 읽는 법", url: "https://web.stanford.edu/class/cs245/readings/keshav-paper-reading.pdf" },
    ],
    ship: "연구 질문 1개 + 관련 논문 15편 요약 노트 + 빈틈 정리"
  },
  {
    id: 9, stage: "지원 준비", sc: "#34a853", time: "4주",
    title: "연구계획서 + 지원 패키지 완성", icon: "📄",
    goal: "그동안 만든 모든 걸 GSAI 지원서로 묶는다. 프로젝트들이 '일관된 연구 관심'으로 보이게. 오성준 교수님 컨택은 이미 했어야 (M6쯤).",
    wall: "내 잡다한 프로젝트들을 어떻게 하나의 스토리로? 연구계획서는 어떻게 쓰지?",
    learn: [
      { name: "How to Write a Great Research Paper", type: "방법론", detail: "Simon Peyton Jones 명강연", url: "https://www.youtube.com/watch?v=VK51E3gHENc" },
      { name: "Overleaf (LaTeX)", type: "도구", detail: "학술 문서 작성", url: "https://www.overleaf.com/" },
      { name: "GSAI 면접 후기", type: "커뮤니티", detail: "면접 분위기·질문 파악", url: "https://cafe.naver.com/skyygraduate" },
    ],
    ship: "SoP + 연구계획서 + GitHub 포트폴리오 + 면접 준비 = 지원 완료"
  },
  {
    id: 10, stage: "보너스", sc: "#e91e63", time: "관심 있으면",
    title: "Physical AI 맛보기 (Jim Fan 트렌드)", icon: "🤖",
    goal: "면접 차별화용 보너스. Jim Fan의 'Great Parallel' 흐름 이해하고, Isaac Sim에서 간단히 로봇 시뮬 돌려보기. 깊이보다 '최신 트렌드 안다'는 시그널.",
    wall: "로보틱스는 완전 다른 분야 아닌가? 어디서 시작하지?",
    learn: [
      { name: "Jim Fan AI Ascent 2026", type: "트렌드", detail: "로보틱스 엔드게임 로드맵", url: "https://www.youtube.com/watch?v=3Y8aq_ofEVs" },
      { name: "DreamDojo (오픈소스)", type: "체험", detail: "World Model 체험", url: "https://github.com/NVIDIA/DreamDojo" },
      { name: "NVIDIA Isaac Sim", type: "도구", detail: "로봇 시뮬레이션", url: "https://developer.nvidia.com/isaac-sim" },
    ],
    ship: "Physical AI 서베이 노트 (면접 대비용)"
  },
];

const CUR_STAGES = [
  { l: "①긁기", c: "#1a73e8" },
  { l: "②돌리기", c: "#1a73e8" },
  { l: "③열기", c: "#ea4335" },
  { l: "④텍스트", c: "#ea4335" },
  { l: "⑤딥러닝", c: "#fbbc04" },
  { l: "⑥BERT", c: "#fbbc04" },
  { l: "⑦확장", c: "#fbbc04" },
  { l: "⑧연구화", c: "#34a853" },
  { l: "⑨지원", c: "#34a853" },
];

function CurBar({ v, c }) {
  return <div style={{ background: "#e8eaed", borderRadius: 6, height: 6, width: "100%" }}>
    <div style={{ background: c, height: "100%", width: v + "%", borderRadius: 6, transition: "width 0.3s" }} />
  </div>;
}
function CurTag({ children, c }) {
  return <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 10, fontSize: 10, fontWeight: 600, background: c + "18", color: c, marginRight: 4 }}>{children}</span>;
}

function CurriculumTab() {
  const [exp, setExp] = useState(1);
  const [done, setDone] = useState({});

  const toggle = (id, i) => { const k = id + "-" + i; setDone(p => ({ ...p, [k]: !p[k] })); };
  const total = () => {
    let t = 0, d = 0;
    CUR_M.forEach(m => { t += m.learn.length; m.learn.forEach((_, i) => { if (done[m.id + "-" + i]) d++; }); });
    return t > 0 ? Math.round((d / t) * 100) : 0;
  };

  return (
    <div style={{ fontFamily: "-apple-system, sans-serif", maxWidth: 680, margin: "0 auto", padding: "16px 14px 32px" }}>
      <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#202124" }}>🛠️ KAIST GSAI — Learning by Doing</h1>
      <p style={{ margin: "4px 0 14px", fontSize: 12, color: "#5f6368" }}>국회 프로젝트를 키워가며 배운다 · 이론은 막힐 때 꺼내쓰는 도구</p>

      <div style={{ background: "#fff8e1", borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 12, color: "#7a5900", lineHeight: 1.6, borderLeft: "3px solid #fbbc04" }}>
        💡 <b>읽는 법:</b> 각 모듈은 "만들 것(목표) → 여기서 막힌다 → 그때 배우는 것" 순서야. 이론을 먼저 다 떼고 시작하는 게 아니라, 프로젝트가 막히는 바로 그 지점에서 필요한 것만 배워.
      </div>

      <div style={{ background: "#fff", borderRadius: 12, padding: "12px 14px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>학습 진행률</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#1a73e8" }}>{total()}%</span>
        </div>
        <CurBar v={total()} c="#1a73e8" />
      </div>

      <div style={{ display: "flex", gap: 2, marginBottom: 16, flexWrap: "wrap" }}>
        {CUR_STAGES.map((s, i) => {
          const stepId = i + 1;
          const active = exp === stepId;
          return (
            <div key={i} onClick={() => {
              setExp(stepId);
              setTimeout(() => { const el = document.getElementById("step-" + stepId); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 50);
            }} style={{ flex: 1, minWidth: 38, background: s.c, borderRadius: 6, padding: "5px 2px", textAlign: "center", color: "#fff", fontSize: 8, fontWeight: 700, cursor: "pointer", opacity: active ? 1 : 0.7, outline: active ? "2px solid #202124" : "none", transition: "opacity 0.2s" }}>{s.l}</div>
          );
        })}
      </div>

      {CUR_M.map(m => {
        const open = exp === m.id;
        const md = m.learn.length; let dn = 0;
        m.learn.forEach((_, i) => { if (done[m.id + "-" + i]) dn++; });
        const p = md > 0 ? Math.round((dn / md) * 100) : 0;
        return (
          <div key={m.id} id={"step-" + m.id} style={{ background: "#fff", borderRadius: 12, marginBottom: 10, boxShadow: "0 1px 2px rgba(0,0,0,0.06)", border: open ? "1px solid " + m.sc + "40" : "1px solid #e8eaed", scrollMarginTop: 12 }}>
            <div onClick={() => setExp(open ? null : m.id)} style={{ padding: "12px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: m.sc + "14", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{m.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: m.sc }}>STEP {m.id} · {m.stage} · {m.time}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#202124" }}>{m.title}</div>
                <div style={{ marginTop: 5 }}><CurBar v={p} c={m.sc} /></div>
              </div>
              <span style={{ color: "#9aa0a6", transform: open ? "rotate(180deg)" : "", transition: "transform 0.2s" }}>▾</span>
            </div>
            {open && (
              <div style={{ padding: "0 14px 14px", borderTop: "1px solid #f1f3f4" }}>
                <div style={{ background: m.sc + "0a", borderRadius: 8, padding: "10px 12px", margin: "10px 0", borderLeft: "3px solid " + m.sc }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: m.sc, marginBottom: 3 }}>🎯 만들 것</div>
                  <div style={{ fontSize: 12, color: "#3c4043", lineHeight: 1.5 }}>{m.goal}</div>
                </div>

                <div style={{ background: "#fef2f0", borderRadius: 8, padding: "10px 12px", marginBottom: 12, borderLeft: "3px solid #ea4335" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#ea4335", marginBottom: 3 }}>🧱 여기서 막힌다</div>
                  <div style={{ fontSize: 12, color: "#3c4043", lineHeight: 1.5, fontStyle: "italic" }}>"{m.wall}"</div>
                </div>

                {m.lineage && (
                  <div style={{ background: "#f3e5f5", borderRadius: 8, padding: "10px 12px", marginBottom: 12, borderLeft: "3px solid #9c27b0" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#9c27b0", marginBottom: 3 }}>🧬 계보 (왜 이게 여기 있나)</div>
                    <div style={{ fontSize: 12, color: "#3c4043", lineHeight: 1.6 }}>{m.lineage}</div>
                  </div>
                )}

                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8, color: "#202124" }}>📚 그때 배우는 것 (막힐 때만)</div>
                {m.learn.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, padding: "8px 10px", marginBottom: 5, borderRadius: 8, background: done[m.id + "-" + i] ? "#e6f4ea" : "#f8f9fa" }}>
                    <span onClick={() => toggle(m.id, i)} style={{ fontSize: 15, flexShrink: 0, cursor: "pointer" }}>{done[m.id + "-" + i] ? "✅" : "⬜"}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: "#1a73e8", textDecoration: "none" }}>{item.name} ↗</a>
                        {" "}<CurTag c={m.sc}>{item.type}</CurTag>
                      </div>
                      <div style={{ fontSize: 11, color: "#5f6368", marginTop: 2 }}>{item.detail}</div>
                    </div>
                  </div>
                ))}

                <div style={{ background: "#e8f0fe", borderRadius: 8, padding: "8px 12px", marginTop: 10, fontSize: 11, color: "#1a73e8", lineHeight: 1.4 }}>🚢 결과물: {m.ship}</div>
              </div>
            )}
          </div>
        );
      })}

      <div style={{ background: "#fff", borderRadius: 12, padding: 14, marginTop: 16, boxShadow: "0 1px 2px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>⏰ 주간 리듬 (주 15-20h)</div>
        <div style={{ fontSize: 12, color: "#5f6368", lineHeight: 1.7 }}>
          <b>주중</b>: 프로젝트 손대다 막히면 → 해당 영상/문서 1개만 보기 (필요한 만큼만)<br />
          <b>주말</b>: 프로젝트 크게 진전 + 배운 것 블로그로 정리<br />
          <b>매주</b>: "이번 주에 막혔던 것 / 배운 것 / 다음에 할 것" 3줄 회고
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 12, padding: 14, marginTop: 12, boxShadow: "0 1px 2px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>📌 이 방식의 핵심 원칙</div>
        <div style={{ fontSize: 12, color: "#5f6368", lineHeight: 1.7 }}>
          1. <b>완벽 금지</b>: 이해 안 돼도 일단 다음으로. 나중에 다시 만나면 그때 이해됨<br />
          2. <b>막힐 때만 공부</b>: 안 막혔으면 이론 안 봐도 됨<br />
          3. <b>항상 작동하는 버전 유지</b>: v0→v1→v2, 매 단계 굴러가야<br />
          4. <b>배운 건 글로</b>: 설명 못 하면 모르는 것
        </div>
      </div>
    </div>
  );
}


const EXAM_CATS = [
  {
    id: "math", title: "수학 기초", icon: "📐", color: "#1a73e8",
    desc: "선형대수, 확률, 최적화 — 칠판 풀이 가능성 있음",
    qs: [
      { q: "고유값 분해(Eigenvalue Decomposition)와 특이값 분해(SVD)의 차이를 설명하고, 각각 어떤 상황에서 사용하는지 예를 들어라.", h: "정방행렬 vs 일반 행렬, PCA에서의 SVD, 추천 시스템 행렬 분해", l: "★★",
        why: "데이터의 '본질적 구조'를 뽑아내는 도구. PCA·추천시스템·LSA가 다 이 위에 서 있어. 면접에서 '데이터 차원축소 어떻게?'의 답이 여기서 나옴.",
        ref: { name: "3Blue1Brown: 고유벡터 편", url: "https://www.youtube.com/watch?v=PFDu9oVAE-g" } },
      { q: "베이즈 정리를 수식으로 쓰고, 사전확률(prior)과 사후확률(posterior)의 관계를 의료 진단 예시로 설명하라.", h: "P(A|B) = P(B|A)P(A)/P(B), 민감도/특이도, 베이스레이트 팰러시", l: "★★",
        why: "ML의 '믿음 업데이트' 전체가 베이즈야. 교수님 불확실성 연구(HIB/PCME)도 베이지안 관점. 정치 예측에 신뢰구간 붙이는 너의 wedge의 수학적 뿌리.",
        ref: { name: "3Blue1Brown: 베이즈 정리", url: "https://www.youtube.com/watch?v=HZGCoVF3YvM" } },
      { q: "KL Divergence가 무엇인지, 왜 비대칭인지, ML에서 어디에 활용되는지 서술하라.", h: "정보 이론, VAE의 ELBO, PPO의 KL penalty", l: "★★★",
        why: "두 확률분포의 '거리'. VAE 목적함수, RLHF의 정책 제약, 지식증류가 전부 KL. 생성모델·정렬 논문 수식을 읽으려면 필수.",
        ref: { name: "Lilian Weng: VAE에서의 KL", url: "https://lilianweng.github.io/posts/2018-08-12-vae/" } },
      { q: "Cross-Entropy Loss가 무엇인지, KL Divergence·최대우도(MLE)와의 관계를 설명하고, 분류에서 왜 MSE 대신 이걸 쓰는지 서술하라.", h: "H(p,q)=H(p)+D_KL(p‖q), 음의 로그우도(NLL)와 동치, softmax와 결합, MSE는 그래디언트 소실·비볼록", l: "★★",
        why: "분류 모델 학습의 표준 손실함수. 바로 위 KL과 한 몸(H(p,q)=H(p)+KL)이고, 아래 로지스틱 회귀의 목적함수가 정확히 이것. '왜 MSE 안 쓰고 크로스엔트로피?'는 면접 단골 질문.",
        ref: { name: "StatQuest: Cross Entropy", url: "https://www.youtube.com/watch?v=6ArSys5qHAU" } },
      { q: "Gradient Descent에서 learning rate 문제와 Adam 등 Adaptive 방법의 해결 원리를 설명하라.", h: "수렴 불안정 vs 느린 수렴, 모멘텀, 2차 모멘트 추정", l: "★★",
        why: "모든 신경망 '학습'의 엔진. 학습이 왜 발산하고 왜 느린지 못 설명하면 디버깅도 못 해. 실무에서 제일 자주 만지는 손잡이.",
        ref: { name: "Adam 원논문 (Kingma & Ba)", url: "https://arxiv.org/abs/1412.6980" } },
    ]
  },
  {
    id: "ml", title: "머신러닝 이론", icon: "⚙️", color: "#ea4335",
    desc: "CS229 수준 — 알고리즘 원리와 트레이드오프 핵심",
    qs: [
      { q: "편향-분산 트레이드오프를 설명하고, 모델 선택에 미치는 영향을 서술하라.", h: "과적합/과소적합, 정규화, 앙상블이 분산 줄이는 원리", l: "★★",
        why: "ML 전체를 관통하는 가장 근본 원리. '왜 이 모델이 과적합?', '정규화 왜?'의 답이 전부 여기. 면접 단골 중 단골.",
        ref: { name: "ISL 책 2장 (무료 PDF)", url: "https://www.statlearning.com/" } },
      { q: "SVM 커널 트릭이 무엇인지, 왜 필요한지, RBF 커널 동작 원리를 설명하라.", h: "고차원 매핑 없이 내적 계산, Mercer 조건, 감마의 역할", l: "★★★",
        why: "'비선형을 선형으로 푸는' 아이디어의 정수. 딥러닝 이전 ML의 핵심이자, 커널=유사도 측정이라는 직관은 어디서나 쓰임.",
        ref: { name: "CS229 노트: 커널", url: "https://cs229.stanford.edu/main_notes.pdf" } },
      { q: "Logistic Regression과 Neural Network의 관계를 설명하라.", h: "단일 뉴런, 시그모이드 활성화, 표현력 차이", l: "★★",
        why: "신경망이 '로지스틱 회귀를 쌓은 것'이라는 통찰. 네가 STEP3에서 직접 구현할 바로 그 모델. 가장 단순한 것에서 가장 복잡한 것으로 잇는 다리.",
        ref: { name: "StatQuest: Logistic Regression", url: "https://www.youtube.com/watch?v=yIYKR4sgzI8" } },
      { q: "Decision Tree 과적합 해결과 Random Forest의 극복 방법을 설명하라.", h: "가지치기, 배깅, 피처 서브샘플링, 분산 감소", l: "★★",
        why: "테이블 데이터(국회 투표 같은)에서 여전히 최강. 앙상블이 분산을 줄이는 원리는 편향-분산과 직결. 네 첫 모델의 강력한 후보.",
        ref: { name: "StatQuest: Random Forest", url: "https://www.youtube.com/watch?v=J4Wdy0Wc_xQ" } },
      { q: "Cross-validation은 왜 필요하고, k의 선택이 편향과 분산에 어떤 영향을 미치는가?", h: "k↑ → 편향↓분산↑, LOOCV, 계층적 분할", l: "★★",
        why: "'내 모델 정확도 70%'가 믿을 만한 수치인지 보장하는 방법. 데이터 적은 정치/사회 도메인에서 특히 중요. 평가를 잘못하면 연구 전체가 무너져.",
        ref: { name: "StatQuest: Cross Validation", url: "https://www.youtube.com/watch?v=fSytzGwwBVw" } },
    ]
  },
  {
    id: "dl", title: "딥러닝 & CV", icon: "🧠", color: "#9c27b0",
    desc: "CNN, Transformer, 학습 기법 — 오성준 교수님 면접 시 깊은 이해 필요",
    qs: [
      { q: "Batch Normalization이 학습을 안정화시키는 이유와 Inference 시 동작을 설명하라.", h: "Internal Covariate Shift(논쟁), 러닝 평균/분산, Layer Norm 비교", l: "★★★",
        why: "딥러닝을 '깊게' 학습 가능하게 만든 핵심 기법. 원논문 설명(ICS)이 사실 틀렸다는 후속 연구까지 알면 '논문을 비판적으로 읽는다'는 시그널.",
        ref: { name: "BatchNorm 원논문", url: "https://arxiv.org/abs/1502.03167" } },
      { q: "ResNet Skip Connection이 딥러닝 학습에 도움 되는 이유를 수학적으로 설명하라.", h: "그래디언트 소실 완화, identity mapping, loss landscape 평탄화", l: "★★★",
        why: "교수님이 CV 출신이라 직접 물을 수 있음. '왜 깊은 망이 안 됐다가 됐는지'의 답. 그래디언트 흐름 직관은 Transformer에도 그대로 적용.",
        ref: { name: "ResNet 원논문 (He et al.)", url: "https://arxiv.org/abs/1512.03385" } },
      { q: "Self-Attention의 Q, K, V를 설명하고, O(n²) 복잡도와 이를 줄이는 방법들을 나열하라.", h: "Softmax(QK^T/√d)V, Linear/Flash/Sparse Attention", l: "★★★",
        why: "현대 AI 전부의 심장. 법안 텍스트 분석이든 LLM이든 이걸 모르면 시작도 못 함. 복잡도 문제는 실전 효율화의 핵심.",
        ref: { name: "The Illustrated Transformer", url: "https://jalammar.github.io/illustrated-transformer/" } },
      { q: "ViT가 CNN 대비 장단점은? 데이터 효율성 측면에서 논하라.", h: "Inductive bias 부재, 대규모 데이터 의존, DeiT Knowledge Distillation", l: "★★★",
        why: "'구조적 가정(inductive bias) vs 데이터로 다 배우기'라는 딥러닝의 큰 논쟁. 데이터 적은 도메인에서 뭘 쓸지 판단의 근거.",
        ref: { name: "ViT 원논문", url: "https://arxiv.org/abs/2010.11929" } },
      { q: "Dropout의 정규화 효과 이유와 Training/Inference 차이를 설명하라.", h: "앙상블 효과, co-adaptation 방지, 스케일링 팩터", l: "★★",
        why: "가장 흔한 정규화 기법. '앙상블의 근사'라는 해석이 핵심. train/inference 동작 차이를 모르면 추론 결과가 틀어짐.",
        ref: { name: "Dropout 원논문", url: "https://jmlr.org/papers/v15/srivastava14a.html" } },
      { q: "Transfer Learning이 왜 효과적인가? Layer-wise LR decay의 근거를 설명하라.", h: "하위 레이어=일반 피처, 상위=태스크 특화, catastrophic forgetting", l: "★★",
        why: "데이터 적은 연구에서 생존 전략. 한국어 법률 BERT 파인튜닝이 다 이거. 사전학습 모델을 '어떻게 내 도메인에' 옮길지의 원리.",
        ref: { name: "CS231n: Transfer Learning", url: "https://cs231n.github.io/transfer-learning/" } },
    ]
  },
  {
    id: "nlp", title: "NLP & LLM", icon: "📝", color: "#f9a825",
    desc: "Transformer 구조와 LLM — Trustworthy AI 연구와 직결",
    qs: [
      { q: "BERT와 GPT의 아키텍처 차이와 각각 적합한 태스크를 서술하라.", h: "양방향 vs 자기회귀, [MASK], 생성 vs 이해 태스크", l: "★★",
        why: "'이해(분류) vs 생성'의 갈림길. 법안 분류엔 BERT, 요약·생성엔 GPT. 네 프로젝트에서 뭘 쓸지 결정하는 기준.",
        ref: { name: "Illustrated BERT", url: "https://jalammar.github.io/illustrated-bert/" } },
      { q: "LLM Hallucination 문제를 정의하고 완화 접근법들을 설명하라.", h: "RAG, Constrained Decoding, RLHF — STAI 핵심 주제", l: "★★★",
        why: "교수님 연구실의 핵심 문제의식(신뢰성). '왜 LLM이 거짓말하나, 어떻게 막나'는 STAI의 존재 이유. 면접 차별화 1순위 주제.",
        ref: { name: "Survey of Hallucination in LLMs", url: "https://arxiv.org/abs/2311.05232" } },
      { q: "RAG 동작 원리와 파인튜닝 대비 장점을 서술하라.", h: "Knowledge-Intelligence Separation 구현, 지식 업데이트, 귀속 가능성", l: "★★★",
        why: "교수님의 'Knowledge-Intelligence 분리' 철학의 실제 구현. 지식을 외부에 두면 편집·삭제·출처추적 가능 → 법률/거버넌스와 직결.",
        ref: { name: "RAG 원논문 (Lewis et al.)", url: "https://arxiv.org/abs/2005.11401" } },
      { q: "RLHF Reward Model의 역할과 한계, DPO의 개선점을 설명하라.", h: "인간 선호도, 보상 해킹, DPO implicit reward model", l: "★★★",
        why: "AI를 '인간 의도에 정렬'시키는 방법. 교수님 연구의 'aligned with human intent'가 이것. 민주적 가치 정렬(좌우지간)과도 철학적으로 연결.",
        ref: { name: "DPO 원논문", url: "https://arxiv.org/abs/2305.18290" } },
    ]
  },
  {
    id: "trust", title: "Trustworthy AI (STAI)", icon: "🛡️", color: "#34a853",
    desc: "오성준 교수님 STAI 연구실 핵심 — 면접 차별화 포인트",
    qs: [
      { q: "Knowledge-Intelligence Separation이 AI 신뢰성 문제를 어떻게 해결하는지 논하라.", h: "1960년대 code-data 분리 비유, 외부 모듈에 지식 저장, GDPR 대응", l: "★★★",
        why: "교수님의 대표 비전. 이걸 네 언어로 설명하고 '제 도메인(법안 지식)에 이렇게'까지 잇으면 미팅에서 강력. 반드시 깊이 이해할 것.",
        ref: { name: "STAI 그룹 홈페이지", url: "https://s-t-a-i.github.io/" } },
      { q: "Machine Unlearning이 왜 필요하고 효율적 방법은 무엇인가?", h: "Right to be Forgotten, 영향 함수, SISA, 그래디언트 기반", l: "★★★",
        why: "GDPR '잊힐 권리'의 기술적 구현. 법률 배경 있는 네가 기술-법 다리를 놓을 수 있는 영역. 교수님 프라이버시 연구와 직결.",
        ref: { name: "SISA Unlearning 원논문", url: "https://arxiv.org/abs/1912.03817" } },
      { q: "Training Data Attribution이 무엇이며 대표적 방법론을 설명하라.", h: "Influence Functions, TracIn, Data Shapley — 데이터 소유권", l: "★★★",
        why: "'이 예측이 어느 학습데이터 때문인지' 추적. 교수님 '데이터 중심 신뢰성' 접근의 핵심. 저작권·책임성 등 거버넌스 이슈로 확장됨.",
        ref: { name: "Influence Functions 원논문", url: "https://arxiv.org/abs/1703.04730" } },
      { q: "Privacy 위협(멤버십 추론, 모델 인버전)과 Differential Privacy 방어를 설명하라.", h: "교수님 PhD 주제, ε-δ DP, DP-SGD, utility-privacy 트레이드오프", l: "★★★",
        why: "교수님 박사학위 바로 그 주제. ProPILE(LLM 개인정보 유출)로 이어짐. 이 영역을 알면 '교수님 연구 맥락을 안다'는 확실한 신호.",
        ref: { name: "ProPILE (교수님 논문)", url: "https://arxiv.org/abs/2307.01881" } },
      { q: "XAI에서 post-hoc 설명과 inherently interpretable 모델의 차이와 한계를 논하라.", h: "LIME, SHAP, Grad-CAM vs Decision Trees, faithfulness 문제", l: "★★",
        why: "AI 결정을 '설명'하는 두 철학. 정책·사법 등 고위험 결정에서 설명가능성은 필수. 설명이 '진짜 맞는지(faithfulness)'가 미해결 난제.",
        ref: { name: "LIME 원논문", url: "https://arxiv.org/abs/1602.04938" } },
    ]
  },
  {
    id: "res", title: "연구 역량 & 포트폴리오", icon: "🔬", color: "#ff6d00",
    desc: "자소서·우수성 기반 — 모든 지원자 핵심 질문",
    qs: [
      { q: "연구 관심 분야(Comp PolSci, Law, Urban)와 AI를 어떻게 연결할 것인지 설명하라.", h: "3개 축을 STAI Trustworthy AI와 연결, 구체적 데이터셋·방법론", l: "★★★",
        why: "합격을 가르는 핵심 질문. 후기에서도 '학부 프로젝트로 안 그치려면 분석적이고 설명 가능해야'. 막연한 관심이 아니라 구체적 방법론으로 답해야.",
        ref: { name: "논문 리스트 🌉 연결고리 탭 참고", url: "https://s-t-a-i.github.io/" } },
      { q: "가장 인상 깊은 프로젝트를 골라 문제, 기술적 챌린지를 설명하라.", h: "뽑기피디아, 좌우지간 등 시빅테크를 학술적으로 프레이밍", l: "★★",
        why: "네 시빅테크 경험을 '연구'의 언어로 재포장하는 연습. '뭘 만들었나'가 아니라 '어떤 문제를 어떤 분석으로 풀었나'로 말해야.",
        ref: { name: "How to Read/Frame Research", url: "https://web.stanford.edu/class/cs245/readings/keshav-paper-reading.pdf" } },
      { q: "왜 KAIST GSAI인가? 왜 오성준 교수님 연구실인가?", h: "Scalable Trustworthy AI ↔ 민주주의 신뢰 인프라, KIS의 civic tech 적용", l: "★★★",
        why: "커넥션 있는 너의 핵심. '교수님 신뢰성 방법론을 제 민주주의/거버넌스 도메인에 적용하고 싶다'를 구체 논문 들어 말할 수 있어야.",
        ref: { name: "교수님 연구 비전 (홈)", url: "https://seongjoonoh.com/" } },
      { q: "석사 졸업 후 5년 비전을 말해보라.", h: "GT OMSCS → PhD 경로, 한국 맥락 연구 차별화", l: "★★",
        why: "장기 일관성을 보는 질문. 너의 정치 커리어 비전과 연구를 어떻게 엮을지가 독특함이자 의심 포인트 — 내러티브를 미리 정리해야.",
        ref: { name: "(본인 SoP 내러티브로 정리)", url: "https://s-t-a-i.github.io/" } },
    ]
  },
];

function ExamTab() {
  const [open, setOpen] = useState(null);
  const [hints, setHints] = useState({});

  return (
    <div style={{ fontFamily: "-apple-system, sans-serif", maxWidth: 680, margin: "0 auto", padding: "16px 14px 32px" }}>
      <h1 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700, color: "#202124" }}>📋 GSAI 기출 · 예상 문제</h1>
      <p style={{ margin: "0 0 16px", fontSize: 12, color: "#5f6368" }}>6개 카테고리 · {EXAM_CATS.reduce((a, c) => a + c.qs.length, 0)}개 문제 · 힌트 탭으로 확인</p>

      <div style={{ background: "#fff", borderRadius: 10, padding: "10px 14px", marginBottom: 14, boxShadow: "0 1px 2px rgba(0,0,0,0.06)", fontSize: 12, color: "#5f6368", lineHeight: 1.6 }}>
        💡 석사: 자소서 기반 + 전공 검증. 석박통합: 컨택 완료 시 형식적일 수 있으나 전공 이해도 중요. 면접 10-15분, 칠판 풀이 가능.
      </div>

      {EXAM_CATS.map(cat => {
        const isOpen = open === cat.id;
        return (
          <div key={cat.id} style={{ background: "#fff", borderRadius: 12, marginBottom: 10, boxShadow: "0 1px 2px rgba(0,0,0,0.06)", border: isOpen ? "1px solid " + cat.color + "40" : "1px solid #e8eaed" }}>
            <div onClick={() => setOpen(isOpen ? null : cat.id)} style={{ padding: "12px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: cat.color + "14", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{cat.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#202124" }}>{cat.title}</div>
                <div style={{ fontSize: 11, color: "#5f6368" }}>{cat.qs.length}개 문제</div>
              </div>
              <span style={{ color: "#9aa0a6", transform: isOpen ? "rotate(180deg)" : "", transition: "transform 0.2s" }}>▾</span>
            </div>
            {isOpen && (
              <div style={{ padding: "0 14px 14px", borderTop: "1px solid #f1f3f4" }}>
                <div style={{ fontSize: 11, color: "#5f6368", padding: "8px 0 10px", lineHeight: 1.5 }}>{cat.desc}</div>
                {cat.qs.map((q, i) => {
                  const hk = cat.id + i;
                  return (
                    <div key={i} style={{ marginBottom: 10, background: "#f8f9fa", borderRadius: 8, padding: "10px 12px" }}>
                      <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: cat.color, flexShrink: 0 }}>Q{i + 1}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, color: "#202124", lineHeight: 1.5 }}>{q.q}</div>
                          {q.why && (
                            <div style={{ marginTop: 6, fontSize: 11, color: "#5f6368", lineHeight: 1.5, display: "flex", gap: 5 }}>
                              <span style={{ flexShrink: 0 }}>🎯</span><span><b style={{ color: cat.color }}>왜 중요:</b> {q.why}</span>
                            </div>
                          )}
                          {q.ref && (
                            <div style={{ marginTop: 5, fontSize: 11, lineHeight: 1.5, display: "flex", gap: 5 }}>
                              <span style={{ flexShrink: 0 }}>📖</span>
                              <span style={{ color: "#5f6368" }}>제대로 이해하려면: <a href={q.ref.url} target="_blank" rel="noopener noreferrer" style={{ color: "#1a73e8", textDecoration: "none", fontWeight: 600 }}>{q.ref.name} ↗</a></span>
                            </div>
                          )}
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                            <span style={{ fontSize: 11, color: "#9aa0a6" }}>{q.l}</span>
                            <div onClick={(e) => { e.stopPropagation(); setHints(p => ({ ...p, [hk]: !p[hk] })); }}
                              style={{ fontSize: 11, color: cat.color, border: "1px solid " + cat.color + "40", borderRadius: 6, padding: "1px 8px", cursor: "pointer", fontWeight: 600 }}>
                              {hints[hk] ? "숨기기" : "💡 답변 힌트"}
                            </div>
                          </div>
                          {hints[hk] && (
                            <div style={{ marginTop: 6, padding: "6px 10px", background: cat.color + "0a", borderRadius: 6, borderLeft: "3px solid " + cat.color, fontSize: 12, color: "#3c4043", lineHeight: 1.5 }}>{q.h}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}


const PAP_C = [
  {
    id: "ohwork", title: "⭐ 오성준 교수님 본인 연구 (최우선)", icon: "🎓", color: "#d32f2f",
    desc: "커넥션이 있으니 이게 1순위. 교수님 연구 궤적을 시간순으로 꿰면, 면접·미팅에서 '제 연구축이 교수님 OOO 연구와 이렇게 잇닿는다'를 말할 수 있어. 각 논문의 '한 줄 핵심'을 네 언어로 설명할 수 있을 때까지.",
    papers: [
      { t: "Modeling Uncertainty with Hedged Instance Embedding (HIB)", a: "S.J. Oh et al.", v: "ICLR 2019", w: "교수님 불확실성 연구의 출발점. 임베딩을 '점'이 아니라 '확률분포'로 — 입력이 모호하면 모델이 '베팅을 헷지'한다. 이 아이디어가 이후 10년 연구의 씨앗.", p: "필수", tags: ["Uncertainty", "출발점"], url: "https://arxiv.org/abs/1810.00319" },
      { t: "Probabilistic Embeddings for Cross-Modal Retrieval (PCME)", a: "Chun, Oh et al.", v: "CVPR 2021", w: "HIB를 멀티모달로 확장. 이미지↔텍스트 매칭의 일대다 모호성을 확률분포로 포착. 너의 멀티모달 정치 분석과 직접 연결 가능.", p: "필수", tags: ["Uncertainty", "Multimodal"], url: "https://arxiv.org/abs/2101.05068" },
      { t: "Probabilistic Contrastive Learning Recovers the Correct Aleatoric Uncertainty", a: "Kirchhof, Kasneci, Oh", v: "ICML 2023", w: "'그 분산이 진짜 맞는 값이냐'는 근본 질문에 수학적 답. 확률적 대조학습이 올바른 aleatoric uncertainty를 복원함을 증명. 이론적 깊이의 정수.", p: "필수", tags: ["Uncertainty", "Theory"], url: "https://arxiv.org/abs/2302.02865" },
      { t: "ProPILE: Probing Privacy Leakage in LLMs", a: "Kim, ..., Oh", v: "NeurIPS 2023", w: "LLM이 학습 데이터의 개인정보(PII)를 얼마나 흘리는지 측정. 교수님 PhD 프라이버시 주제의 LLM 버전. 법률·거버넌스 관심과 강하게 공명.", p: "필수", tags: ["Privacy", "LLM"], url: "https://arxiv.org/abs/2307.01881" },
      { t: "Trustworthy Machine Learning (교재)", a: "Kirchhof, ..., Oh", v: "Book 2023", w: "교수님 연구실의 세계관 그 자체. 신뢰성의 정의, 불확실성 종류, 평가 방법론을 체계화. 무료 공개 — 면접 전 정독 강력 추천.", p: "필수", tags: ["STAI", "교과서"], url: "https://trustworthyml.io/" },
      { t: "URL: Benchmark for Transferable Uncertainty Estimates", a: "Kirchhof, ..., Oh", v: "NeurIPS D&B 2023", w: "불확실성 추정을 '제대로 평가'하는 벤치마크. 데이터 중심 신뢰성 접근의 사례. 평가 방법론을 어떻게 설계하는지 배우기 좋음.", p: "권장", tags: ["Benchmark", "Eval"], url: "https://arxiv.org/abs/2307.03810" },
      { t: "Neglected Free Lunch: Annotation Byproducts", a: "..., Song, Oh", v: "ICCV 2023", w: "라벨링 과정에서 버려지는 부산물 데이터를 활용. '데이터 중심' 접근의 대표작. APEC 연구도 이 데이터 중심 철학의 연장.", p: "권장", tags: ["Data-Centric"], url: "https://arxiv.org/abs/2303.17595" },
      { t: "Dynamics Reveals Structure: Challenging the Linear Propagation Assumption", a: "STAI Group", v: "ICML 2026 Spotlight", w: "★최신★ reversal curse, knowledge editing, unlearning이 사실 하나의 기하학적 원인에서 나온다는 주장. 표현이 업데이트 하에서 '어떻게 움직이는지'를 봄. 면접에서 이거 언급하면 '최신 연구 follow한다' 강력 시그널.", p: "필수", tags: ["LLM", "최신", "Geometry"], url: "https://arxiv.org/abs/2601.21601" },
      { t: "STAI 그룹 홈페이지 (전체 최신 목록)", a: "STAI Lab", v: "수시 확인", w: "위 외 최신 논문은 여기서. 미팅 전 반드시 최근 3-6개월 업데이트 확인.", p: "필수", tags: ["STAI"], url: "https://s-t-a-i.github.io/" },
    ]
  },
  {
    id: "found", title: "기초 필독 논문", icon: "🏗️", color: "#1a73e8",
    desc: "AI/ML 근간 랜드마크 — 수식 레벨 이해 필수",
    papers: [
      { t: "Attention Is All You Need", a: "Vaswani et al.", v: "NeurIPS 2017", w: "Transformer 원논문. 모든 현대 AI의 출발점.", p: "필수", tags: ["Transformer"], url: "https://arxiv.org/abs/1706.03762" },
      { t: "Deep Residual Learning (ResNet)", a: "He et al.", v: "CVPR 2016", w: "Skip Connection. CV 면접 단골.", p: "필수", tags: ["CNN"], url: "https://arxiv.org/abs/1512.03385" },
      { t: "ImageNet Classification (AlexNet)", a: "Krizhevsky et al.", v: "NeurIPS 2012", w: "딥러닝 혁명의 시작.", p: "필수", tags: ["CNN"], url: "https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html" },
      { t: "BERT", a: "Devlin et al.", v: "NAACL 2019", w: "양방향 사전학습. 마스크드 언어 모델.", p: "필수", tags: ["NLP"], url: "https://arxiv.org/abs/1810.04805" },
      { t: "An Image is Worth 16x16 Words (ViT)", a: "Dosovitskiy et al.", v: "ICLR 2021", w: "Transformer의 비전 적용.", p: "필수", tags: ["CV", "Transformer"], url: "https://arxiv.org/abs/2010.11929" },
      { t: "Adam Optimizer", a: "Kingma & Ba", v: "ICLR 2015", w: "가장 널리 쓰이는 옵티마이저.", p: "권장", tags: ["Optimization"], url: "https://arxiv.org/abs/1412.6980" },
      { t: "Batch Normalization", a: "Ioffe & Szegedy", v: "ICML 2015", w: "훈련 안정화 핵심. 면접 빈출.", p: "권장", tags: ["Training"], url: "https://arxiv.org/abs/1502.03167" },
    ]
  },
  {
    id: "gen", title: "생성 모델", icon: "🎨", color: "#ea4335",
    desc: "VAE, GAN, Diffusion — 생성 AI 핵심",
    papers: [
      { t: "Denoising Diffusion (DDPM)", a: "Ho et al.", v: "NeurIPS 2020", w: "디퓨전 기초. 이미지 생성 표준.", p: "필수", tags: ["Diffusion"], url: "https://arxiv.org/abs/2006.11239" },
      { t: "VAE", a: "Kingma & Welling", v: "ICLR 2014", w: "변분 추론. ELBO, reparameterization.", p: "필수", tags: ["VAE"], url: "https://arxiv.org/abs/1312.6114" },
      { t: "Generative Adversarial Networks", a: "Goodfellow et al.", v: "NeurIPS 2014", w: "적대적 학습 원조.", p: "필수", tags: ["GAN"], url: "https://arxiv.org/abs/1406.2661" },
      { t: "Latent Diffusion (Stable Diffusion)", a: "Rombach et al.", v: "CVPR 2022", w: "잠재 공간 디퓨전.", p: "권장", tags: ["Diffusion"], url: "https://arxiv.org/abs/2112.10752" },
      { t: "Flow Matching", a: "Lipman et al.", v: "ICLR 2023", w: "디퓨전 이후 새 패러다임.", p: "선택", tags: ["Flow"], url: "https://arxiv.org/abs/2210.02747" },
    ]
  },
  {
    id: "mm", title: "멀티모달 & LLM", icon: "🔗", color: "#f9a825",
    desc: "CLIP, LLaVA, GPT — 멀티모달과 정렬",
    papers: [
      { t: "CLIP", a: "Radford et al.", v: "ICML 2021", w: "이미지-텍스트 대조학습. 제로샷 혁명.", p: "필수", tags: ["Multimodal"], url: "https://arxiv.org/abs/2103.00020" },
      { t: "LLaVA", a: "Liu et al.", v: "NeurIPS 2023", w: "비전-언어 Instruction tuning.", p: "필수", tags: ["VLM"], url: "https://arxiv.org/abs/2304.08485" },
      { t: "GPT-3", a: "Brown et al.", v: "NeurIPS 2020", w: "In-context learning. 스케일링 법칙.", p: "필수", tags: ["LLM"], url: "https://arxiv.org/abs/2005.14165" },
      { t: "InstructGPT", a: "Ouyang et al.", v: "NeurIPS 2022", w: "RLHF 실전. Alignment 이정표.", p: "필수", tags: ["RLHF"], url: "https://arxiv.org/abs/2203.02155" },
      { t: "DPO", a: "Rafailov et al.", v: "NeurIPS 2023", w: "RM 없이 직접 정렬.", p: "권장", tags: ["Alignment"], url: "https://arxiv.org/abs/2305.18290" },
      { t: "RAG", a: "Lewis et al.", v: "NeurIPS 2020", w: "STAI Knowledge-Intelligence Separation 핵심.", p: "필수", tags: ["RAG"], url: "https://arxiv.org/abs/2005.11401" },
    ]
  },
  {
    id: "trust", title: "Trustworthy AI (STAI)", icon: "🛡️", color: "#34a853",
    desc: "오성준 교수님 STAI 직접 관련 — 면접 차별화",
    papers: [
      { t: "Towards ML You Can Rely On (오성준)", a: "Oh et al.", v: "PhD Thesis", w: "교수님 박사학위. Privacy, fairness, robustness.", p: "필수", tags: ["STAI"], url: "https://coallaoh.github.io/" },
      { t: "Influence Functions", a: "Koh & Liang", v: "ICML 2017", w: "Training Data Attribution 기초.", p: "필수", tags: ["Attribution"], url: "https://arxiv.org/abs/1703.04730" },
      { t: "SISA: Machine Unlearning", a: "Bourtoule et al.", v: "IEEE S&P 2021", w: "효율적 Unlearning. GDPR 대응.", p: "필수", tags: ["Unlearning"], url: "https://arxiv.org/abs/1912.03817" },
      { t: "Deep Learning with DP (DP-SGD)", a: "Abadi et al.", v: "CCS 2016", w: "Privacy-utility 트레이드오프.", p: "권장", tags: ["Privacy"], url: "https://arxiv.org/abs/1607.00133" },
      { t: "Membership Inference Attacks", a: "Shokri et al.", v: "IEEE S&P 2017", w: "프라이버시 위협 원논문.", p: "권장", tags: ["Privacy"], url: "https://arxiv.org/abs/1610.05820" },
      { t: "LIME", a: "Ribeiro et al.", v: "KDD 2016", w: "Post-hoc 설명.", p: "권장", tags: ["XAI"], url: "https://arxiv.org/abs/1602.04938" },
      { t: "SHAP", a: "Lundberg & Lee", v: "NeurIPS 2017", w: "Shapley Value 기반 설명.", p: "권장", tags: ["XAI"], url: "https://arxiv.org/abs/1705.07874" },
      { t: "STAI Group Recent Papers", a: "STAI Lab", v: "2023-2026", w: "최신 논문 확인.", p: "필수", tags: ["STAI"], url: "https://s-t-a-i.github.io/" },
    ]
  },
  {
    id: "demo", title: "AI × 민주주의 · 숙의", icon: "🗳️", color: "#ff6d00",
    desc: "AI 민주적 숙의 — 좌우지간/뽑기피디아 직결",
    papers: [
      { t: "Habermas Machine (Science 2024)", a: "Tessler et al.", v: "Science 2024", w: "AI 중재자가 인간보다 합의를 잘 이끌어냄.", p: "필수", tags: ["Deliberation"], url: "https://www.science.org/doi/10.1126/science.adq2852" },
      { t: "Fine-tuning LLMs to Find Agreement", a: "Bakker et al.", v: "NeurIPS 2022", w: "다양한 선호 집단 공통 기반 발견.", p: "필수", tags: ["Alignment"], url: "https://arxiv.org/abs/2211.15006" },
      { t: "LLMs for Scalable Deliberation with Polis", a: "Small et al.", v: "arXiv 2023", w: "Polis+LLM. vTaiwan 스케일업.", p: "필수", tags: ["Polis"], url: "https://arxiv.org/abs/2311.02242" },
      { t: "Democratic Policy Development with AI", a: "Konya et al.", v: "arXiv 2023", w: "GPT4 기반 정책 조항 자동 생성.", p: "필수", tags: ["Policy"], url: "https://arxiv.org/abs/2311.09235" },
      { t: "AI for Democratic Discourse at Scale", a: "Argyle et al.", v: "PNAS 2023", w: "AI 챗 개입이 정치 대화 질 향상.", p: "권장", tags: ["Discourse"], url: "https://www.pnas.org/doi/10.1073/pnas.2311627120" },
      { t: "Reducing Conspiracy Beliefs via AI", a: "Costello et al.", v: "Science 2024", w: "AI 대화가 음모론 신념 지속 감소.", p: "권장", tags: ["Misinformation"], url: "https://www.science.org/doi/10.1126/science.adq1814" },
      { t: "Reimagining Democracy for AI", a: "Ovadya", v: "J. of Democracy 2023", w: "AI 시대 민주주의 재설계.", p: "권장", tags: ["Democracy"], url: "https://www.journalofdemocracy.org/articles/reimagining-democracy-for-ai/" },
    ]
  },
  {
    id: "polsci", title: "Computational Political Science", icon: "📊", color: "#7b1fa2",
    desc: "NLP/ML로 정치 현상 분석 — 의회, 선거, 미디어",
    papers: [
      { t: "Predicting Roll Calls from Text", a: "Gerrish & Blei", v: "ICML 2011", w: "법안→투표 예측. Comp PolSci 랜드마크.", p: "필수", tags: ["Congress"], url: "https://dl.acm.org/doi/10.5555/3104482.3104561" },
      { t: "Measuring Ideology in Political Texts", a: "Gentzkow & Shapiro", v: "Econometrica 2010", w: "미디어 편향 정량화.", p: "필수", tags: ["Media"], url: "https://web.stanford.edu/~gentzkow/research/biasmeas.pdf" },
      { t: "Text as Data", a: "Grimmer, Roberts & Stewart", v: "Princeton 2022", w: "텍스트→사회과학 방법론 교과서.", p: "필수", tags: ["Methods"], url: "https://press.princeton.edu/books/paperback/9780691207551/text-as-data" },
      { t: "Political Ideology Detection via RNN", a: "Iyyer et al.", v: "ACL 2014", w: "딥러닝 이념 탐지 초기 시도.", p: "권장", tags: ["Ideology"], url: "https://aclanthology.org/P14-1105/" },
      { t: "Generative Agents", a: "Park et al.", v: "UIST 2023", w: "LLM 사회 시뮬레이션 돌파구.", p: "권장", tags: ["Agents"], url: "https://arxiv.org/abs/2304.03442" },
      { t: "Can GenAI Improve Social Science?", a: "Bail", v: "PNAS 2024", w: "생성 AI의 사회과학 적용 종합 서베이.", p: "필수", tags: ["Survey"], url: "https://www.pnas.org/doi/10.1073/pnas.2314021121" },
      { t: "AI for Social Science (Survey)", a: "Xu et al.", v: "IPM 2024", w: "AI↔사회과학 양방향 체계 정리.", p: "권장", tags: ["Survey"], url: "https://arxiv.org/abs/2401.11839" },
    ]
  },
  {
    id: "law", title: "Computational Law", icon: "⚖️", color: "#00695c",
    desc: "법률 텍스트, 판례 추론, 알고리즘 공정성",
    papers: [
      { t: "LegalBERT", a: "Chalkidis et al.", v: "EMNLP 2020", w: "법률 도메인 특화 BERT.", p: "필수", tags: ["Legal"], url: "https://arxiv.org/abs/2010.02559" },
      { t: "LEXGLUE Benchmark", a: "Chalkidis et al.", v: "ACL 2022", w: "법률 NLP 벤치마크 표준.", p: "필수", tags: ["Benchmark"], url: "https://arxiv.org/abs/2110.00976" },
      { t: "Racial Bias in Health Algorithm", a: "Obermeyer et al.", v: "Science 2019", w: "알고리즘 편향 대표 사례.", p: "필수", tags: ["Bias"], url: "https://www.science.org/doi/10.1126/science.aax2342" },
      { t: "Fairness and ML (Book)", a: "Barocas, Hardt et al.", v: "2023", w: "공정성 수학→사회적 함의.", p: "필수", tags: ["Fairness"], url: "https://fairmlbook.org/" },
      { t: "ChatGPT Outperforms Crowd-Workers", a: "Gilardi et al.", v: "arXiv 2023", w: "LLM이 사회과학 코딩에서 인간 능가.", p: "권장", tags: ["LLM"], url: "https://arxiv.org/abs/2303.15056" },
      { t: "Stochastic Parrots", a: "Bender et al.", v: "FAccT 2021", w: "대규모 LM 사회적 위험.", p: "권장", tags: ["Ethics"], url: "https://dl.acm.org/doi/10.1145/3442188.3445922" },
    ]
  },
  {
    id: "urban", title: "Urban Computing", icon: "🏙️", color: "#1565c0",
    desc: "도시 데이터, 위성이미지, 모빌리티, 불평등",
    papers: [
      { t: "Urban Computing with Taxis", a: "Yuan et al.", v: "UbiComp 2010", w: "도시 데이터 AI 고전.", p: "필수", tags: ["Mobility"], url: "https://dl.acm.org/doi/10.1145/1864349.1864400" },
      { t: "Mobility Networks & Segregation", a: "Nilforoshan et al.", v: "Nature 2023", w: "도시 분리 측정. 선거구 분석 직결.", p: "필수", tags: ["Segregation"], url: "https://www.nature.com/articles/s41586-023-06757-3" },
      { t: "Predicting Poverty from Satellites", a: "Jean et al.", v: "Science 2016", w: "위성+CNN 빈곤 예측.", p: "필수", tags: ["Satellite"], url: "https://www.science.org/doi/10.1126/science.aaf7894" },
      { t: "Online Images Amplify Gender Bias", a: "Guilbeault et al.", v: "Nature 2024", w: "멀티모달 사회적 편향 증폭.", p: "권장", tags: ["Bias"], url: "https://www.nature.com/articles/s41586-024-07068-x" },
      { t: "Detecting Urban Change (Street View)", a: "Naik et al.", v: "Royal Soc. 2017", w: "스트리트뷰 도시 변화 탐지.", p: "권장", tags: ["StreetView"], url: "https://arxiv.org/abs/1608.01769" },
      { t: "Urban Computation Framework", a: "Zheng et al.", v: "ACM TKDD 2014", w: "Urban Computing 체계적 프레임워크.", p: "권장", tags: ["Framework"], url: "https://dl.acm.org/doi/10.1145/2629592" },
    ]
  },
  {
    id: "physical", title: "Physical AI & Robotics", icon: "🤖", color: "#e91e63",
    desc: "Embodied AI, World Models — Jim Fan 'Great Parallel' 2040 로드맵",
    papers: [
      { t: "Jim Fan AI Ascent 2026: Robotics Endgame", a: "Jim Fan (NVIDIA)", v: "Sequoia 2026.4.20", w: "Great Parallel 4단계, VLA→WAM, 텔레옵 종말, Physical Turing Test 2-3년 내.", p: "필수", tags: ["Keynote"], url: "https://www.youtube.com/watch?v=3Y8aq_ofEVs" },
      { t: "DreamDojo: 44k Hours World Model", a: "NVIDIA GEAR Lab", v: "2026.2", w: "Neural simulator. Simulation 2.0. 오픈소스.", p: "필수", tags: ["WorldModel"], url: "https://github.com/NVIDIA/DreamDojo" },
      { t: "DreamZero / WAM", a: "Fan et al.", v: "NVIDIA 2026", w: "VLA→WAM 전환. 비디오+모터 공동 예측.", p: "필수", tags: ["WAM"], url: "https://www.humanoidsdaily.com/news/beyond-the-vla-nvidia-s-dreamzero-and-the-gpt-2-moment-for-robotic-world-models" },
      { t: "EgoScale: Dexterity Scaling Law", a: "NVIDIA GEAR", v: "2025-2026", w: "21k시간 egocentric video. Log-linear 스케일링.", p: "필수", tags: ["Scaling"], url: "https://www.humanoidsdaily.com/news/the-human-scale-nvidia-s-egoscale-unlocks-high-dexterity-robotics-via-20-000-hours-of-human-video" },
      { t: "RT-2: Vision-Language-Action", a: "Brohan et al.", v: "arXiv 2023", w: "VLA 대표. WAM과 비교 필수.", p: "필수", tags: ["VLA"], url: "https://arxiv.org/abs/2307.15818" },
      { t: "GR00T N1.5", a: "NVIDIA", v: "2025-2026", w: "휴머노이드 foundation model.", p: "권장", tags: ["Humanoid"], url: "https://www.humanoidsdaily.com/news/nvidia-advances-humanoid-ai-with-gr00t-n15-eyeing-a-future-of-simulated-realities" },
      { t: "Cosmos: World Foundation Model", a: "NVIDIA", v: "2025", w: "DreamDojo 기반. 오픈 웨이트.", p: "권장", tags: ["Foundation"], url: "https://research.nvidia.com/labs/dir/cosmos/" },
      { t: "Genie 2", a: "DeepMind", v: "2024", w: "단일 이미지→3D 세계 생성.", p: "권장", tags: ["DeepMind"], url: "https://deepmind.google/discover/blog/genie-2-a-large-scale-foundation-world-model/" },
      { t: "V-JEPA 2", a: "Meta AI", v: "2025", w: "비디오 자기지도학습 물리 상식.", p: "권장", tags: ["Meta"], url: "https://ai.meta.com/blog/v-jepa-2-video-model-learning-physical-world/" },
      { t: "Sim-to-Real Transfer Survey", a: "Zhao et al.", v: "arXiv 2024", w: "시뮬→실세계 전이 체계 정리.", p: "권장", tags: ["Survey"], url: "https://arxiv.org/abs/2312.10764" },
      { t: "π0: VLA Flow Model", a: "Physical Intelligence", v: "2024", w: "Jim Fan이 WAM 비교 대상으로 언급.", p: "권장", tags: ["VLA"], url: "https://www.physicalintelligence.company/blog/pi0" },
    ]
  },
  {
    id: "jepa", title: "JEPA 계보 (LeCun 월드 모델)", icon: "🧩", color: "#0277bd",
    desc: "Physical AI의 또 다른 진영. NVIDIA(WAM/픽셀 생성)와 대비되는 LeCun/Meta 라인 — '픽셀 대신 잠재공간에서 예측'. 하나의 문제(표현 붕괴 막기)를 점점 단순하게 푸는 역사. 읽는 순서: ①토대 → I-JEPA → V-JEPA 2 → DINO-WM → LeJEPA.",
    papers: [
      { t: "A Path Towards Autonomous Machine Intelligence (비전 문서)", a: "LeCun", v: "2022", w: "JEPA/H-JEPA가 처음 제시된 원전. 60p지만 JEPA·H-JEPA 절만 봐도 됨. LeCun의 월드 모델 철학 전체의 출발점.", p: "필수", tags: ["비전문서", "JEPA"], url: "https://openreview.net/forum?id=BZ5a1r-kVsf" },
      { t: "I-JEPA: Self-Supervised Learning from Images", a: "Assran et al.", v: "CVPR 2023", w: "JEPA의 가장 깔끔한 첫 구현. 개념 잡기 최적. ★여기서 시작.", p: "필수", tags: ["JEPA", "이미지"], url: "https://arxiv.org/abs/2301.08243" },
      { t: "V-JEPA: Revisiting Feature Prediction from Video", a: "Bardes et al.", v: "arXiv 2024", w: "영상으로 확장. 마스킹된 시공간 영역을 잠재공간에서 예측. (2404.08471)", p: "권장", tags: ["JEPA", "비디오"], url: "https://arxiv.org/abs/2404.08471" },
      { t: "V-JEPA 2: Understanding, Prediction, Planning", a: "Assran et al.", v: "arXiv 2025", w: "현 플래그십. 100만 시간 영상 사전학습 + 소량 로봇 궤적 → 제로샷 플래닝(프랑카 로봇팔). action-free 학습 후 행동조건부(2-AC) 후처리. (2506.09985)", p: "필수", tags: ["JEPA", "Planning"], url: "https://arxiv.org/abs/2506.09985" },
      { t: "DINO-WM: World Models on DINO Features", a: "Zhou, Pan, LeCun, Pinto", v: "arXiv 2024", w: "동결 DINOv2 패치 특징 위에서 미래 예측 + MPC로 제로샷 플래닝. CS25 강의의 주 비교군. (2411.04983)", p: "필수", tags: ["WorldModel", "Planning"], url: "https://arxiv.org/abs/2411.04983" },
      { t: "LeJEPA: SIGReg로 단순화의 도착점", a: "Balestriero & LeCun", v: "arXiv 2025", w: "등방성 가우시안이 유일 최적 분포임을 증명, 무작위 1D 사영으로 강제 → 스톱그래디언트·교사학생 잔기술 전부 제거. 하이퍼파라미터 1개·1500만 파라미터·GPU 1장. ★Learning by Doing 최적 (코드: rbalestr-lab/lejepa). (2511.08544)", p: "필수", tags: ["JEPA", "단순화", "핸즈온"], url: "https://arxiv.org/abs/2511.08544" },
      { t: "[토대] VICReg / BYOL / DINO (비대조 SSL)", a: "Bardes/Grill/Caron et al.", v: "2021-2022", w: "JEPA 이해의 선수지식. VICReg는 붕괴 방지에 그대로 쓰이고, DINO는 DINO-WM의 인코더. 이거 알면 강의 절반이 풀림.", p: "권장", tags: ["SSL", "토대"], url: "https://arxiv.org/abs/2105.04906" },
      { t: "[토대] EBM 튜토리얼 (Dawid & LeCun)", a: "Dawid & LeCun", v: "arXiv 2023", w: "에너지 기반 모델이 낯설면 친절한 입구. JEPA의 이론적 배경. (2306.02572)", p: "권장", tags: ["EBM", "토대"], url: "https://arxiv.org/abs/2306.02572" },
    ]
  },
  {
    id: "bridge", title: "🌉 연결고리: 교수님 연구 × 내 연구축", icon: "🔗", color: "#6a1b9a",
    desc: "커넥션 있는 너의 진짜 무기. 교수님의 '신뢰성·불확실성' 방법론을 너의 '정치·법률·거버넌스' 도메인에 적용하는 다리. 면접·연구계획서에서 '교수님 OOO을 제 도메인에 이렇게 쓰겠다'의 근거가 됨.",
    papers: [
      { t: "Uncertainty in Political Forecasting (방법론 다리)", a: "본인 정리 노트", v: "직접 작성", w: "교수님의 불확실성 정량화(HIB/PCME)를 법안 투표 예측에 적용하면? '이 의원이 찬성할 확률 70%'에 신뢰구간을 붙이는 것. 점추정이 아니라 분포추정. 이게 너만의 연구 wedge.", p: "필수", tags: ["다리", "내연구"], url: "https://s-t-a-i.github.io/" },
      { t: "On Calibration of Modern Neural Networks", a: "Guo et al.", v: "ICML 2017", w: "모델이 '90% 확신'할 때 진짜 90% 맞는가? Calibration 개념. 정책 예측에서 신뢰도가 중요한 이유의 출발점. 교수님 불확실성 연구의 기초 배경.", p: "필수", tags: ["Calibration", "Uncertainty"], url: "https://arxiv.org/abs/1706.04599" },
      { t: "Right to be Forgotten + Machine Unlearning in Law", a: "탐색 주제", v: "조사 필요", w: "교수님 ProPILE(프라이버시)+Unlearning 연구를 GDPR/개인정보보호법 맥락으로. 법률 도메인 지식 있는 네가 기술-법 다리를 놓을 수 있는 영역.", p: "권장", tags: ["Law", "Privacy"], url: "https://arxiv.org/abs/1912.03817" },
      { t: "Fairness & Uncertainty in High-Stakes Decisions", a: "탐색 주제", v: "조사 필요", w: "정책·사법 결정에서 AI의 불확실성과 공정성. 교수님 trustworthy 프레임 + 너의 거버넌스 관심의 교집합. 연구계획서 차별화 포인트.", p: "권장", tags: ["Fairness", "Policy"], url: "https://fairmlbook.org/" },
    ]
  },
];

function PapSmTag({ children }) {
  return <span style={{ display: "inline-block", padding: "1px 6px", borderRadius: 6, fontSize: 10, background: "#e8eaed", color: "#5f6368", marginRight: 3, marginBottom: 2 }}>{children}</span>;
}

function PapersTab() {
  const [open, setOpen] = useState("ohwork");
  const [done, setDone] = useState({});
  const total = PAP_C.reduce((a, c) => a + c.papers.length, 0);
  const essential = PAP_C.reduce((a, c) => a + c.papers.filter(p => p.p === "필수").length, 0);

  return (
    <div style={{ fontFamily: "-apple-system, sans-serif", maxWidth: 680, margin: "0 auto", padding: "16px 14px 32px" }}>
      <h1 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700, color: "#202124" }}>📄 GSAI 필수 논문 리스트</h1>
      <p style={{ margin: "0 0 16px", fontSize: 12, color: "#5f6368" }}>12개 카테고리 · {total}편 · 필수 {essential}편 · ⭐교수님 연구부터 시작</p>

      <div style={{ background: "#fff", borderRadius: 10, padding: "10px 14px", marginBottom: 14, boxShadow: "0 1px 2px rgba(0,0,0,0.06)", fontSize: 12, color: "#5f6368", lineHeight: 1.6 }}>
        📖 필수: Abstract→Intro→Method 수식 이해. 권장: 핵심 아이디어+한계. 주 2편, 1p 요약 노트. STAI 논문은 교수님과 논의 가능 수준까지.
      </div>

      {PAP_C.map(cat => {
        const isOpen = open === cat.id;
        const ess = cat.papers.filter(p => p.p === "필수").length;
        return (
          <div key={cat.id} style={{ background: "#fff", borderRadius: 12, marginBottom: 10, boxShadow: "0 1px 2px rgba(0,0,0,0.06)", border: isOpen ? "1px solid " + cat.color + "40" : "1px solid #e8eaed" }}>
            <div onClick={() => setOpen(isOpen ? null : cat.id)} style={{ padding: "12px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: cat.color + "14", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{cat.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#202124" }}>{cat.title}</div>
                <div style={{ fontSize: 11, color: "#5f6368" }}>{cat.papers.length}편 · 필수 {ess}편</div>
              </div>
              <span style={{ color: "#9aa0a6", transform: isOpen ? "rotate(180deg)" : "", transition: "transform 0.2s" }}>▾</span>
            </div>
            {isOpen && (
              <div style={{ padding: "0 14px 14px", borderTop: "1px solid #f1f3f4" }}>
                <div style={{ fontSize: 11, color: "#5f6368", padding: "8px 0 10px", lineHeight: 1.5 }}>{cat.desc}</div>
                {cat.papers.map((p, i) => {
                  const k = cat.id + "-" + i;
                  return (
                    <div key={i} style={{ marginBottom: 8, borderRadius: 8, padding: "10px 12px", background: done[k] ? "#e6f4ea" : "#f8f9fa", borderLeft: "3px solid " + (p.p === "필수" ? cat.color : "#e8eaed") }}>
                      <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
                        <span onClick={() => setDone(prev => ({ ...prev, [k]: !prev[k] }))} style={{ fontSize: 15, flexShrink: 0, cursor: "pointer" }}>{done[k] ? "✅" : "📝"}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#202124", lineHeight: 1.3 }}>
                            {p.url ? <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ color: "#1a73e8", textDecoration: "none" }}>{p.t} ↗</a> : p.t}
                            {p.p === "필수" && <span style={{ display: "inline-block", padding: "1px 6px", borderRadius: 8, fontSize: 10, fontWeight: 600, background: cat.color + "18", color: cat.color, marginLeft: 5 }}>필수</span>}
                          </div>
                          <div style={{ fontSize: 11, color: "#9aa0a6", marginTop: 2 }}>{p.a} · {p.v}</div>
                          <div style={{ fontSize: 12, color: "#5f6368", marginTop: 4, lineHeight: 1.4 }}>{p.w}</div>
                          <div style={{ marginTop: 4 }}>{p.tags.map(t => <PapSmTag key={t}>{t}</PapSmTag>)}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}



// ============================================================
//  기본 학습 (면접 후기 · 기본기) — 실제 후기에서 추출
// ============================================================

// 후기들이 공통으로 말하는 '기본적으로 준비할 것'
const BASIC_CHECK = [
  {
    t: "내 프로젝트·연구를 빠짐없이, 이해 가능하게",
    d: "자기가 한 모든 프로젝트/연구를 빠짐없이 알고, 비전공자도 이해되게 설명할 수 있어야. 첫 질문이 '가장 자신 있는 연구·논문이 뭐냐'로 들어오는 경우가 많음.",
    c: "#1a73e8",
  },
  {
    t: "학부 수준 ML/DL 이론 (최소 SVD/PCA 이상)",
    d: "카이스트는 전공 면접을 깊게 묻기로 유명. '가장 쉬운 난이도'가 SVD/PCA 정도라는 후기 — 그 위로는 다 나올 수 있다고 보고 기본기를 탄탄히. → 기출문제 탭 참고.",
    c: "#ea4335",
  },
  {
    t: "최신 연구·논문 1~2편 깊이 있게",
    d: "연구 경험이 있으면 최신 논문에 대해 물어볼 가능성이 높음. 세세히 안 읽고 갔다가 후회했다는 후기. 컨택 교수님(오성준) 최신 논문은 필수. → 논문 리스트 탭 참고.",
    c: "#9c27b0",
  },
  {
    t: "지원 동기 · 석사 후 연구 방향",
    d: "자소서/프로젝트 위주 + '석사 진학해 어떤 방향으로 연구할지'를 묻는다. '공부하고 싶은 마음'만으론 부족 — 프로젝트 경험으로 진정성을 증명해야.",
    c: "#34a853",
  },
];

// 면접 관련 정보 · 후기 원천 (CSV 정리)
const BASIC_SRC = [
  {
    t: "KAIST AI대학원, 2배수 뽑아 면접으로 거른다",
    url: "https://phdkim.net/board/free/17581", tag: "후기/제도",
    take: "선발 정원의 2배수를 면접에 부르고 절반을 떨어뜨림 — 면접 비중이 결정적이라는 의미.",
  },
  {
    t: "면접 본 사람의 댓글",
    url: null, tag: "경험담",
    take: "인공지능 관련 프로젝트 수행 경험 + 인공지능 기본 개념을 물어봄. 프로젝트 없이 '공부하고 싶은 마음'만으로는 확신을 못 줘서 떨어질 정도로 망쳤다는 증언.",
    quote: "인공지능 관련된 프로젝트 수행 경험 혹은 인공지능에 관한 기본 개념도 물어봤습니다. … 프로젝트도 없는데 인공지능을 공부하고 싶은 마음만으로 어떻게 확신하냐고 하셨는데, 사람을 떨어뜨릴 정도로 정말 많이 망쳤습니다.",
  },
  {
    t: "AI 대학원 예상 면접 문제 (자료 훌륭)",
    url: "https://velog.io/@jhlim2993/Kaist-AI-%EB%8C%80%ED%95%99%EC%9B%90-%EC%98%88%EC%83%81-%EB%A9%B4%EC%A0%91-%EB%AC%B8%EC%A0%9C", tag: "예상문제",
    take: "KAIST AI대학원 예상 면접 문제를 잘 정리해 둔 자료. 기출문제 탭과 함께 보기.",
  },
  {
    t: "KAIST AI대학원 인터뷰 질문 모음",
    url: "https://jrc-park.tistory.com/259", tag: "질문모음",
    take: "실제 인터뷰에서 나온 질문들을 모아 둔 글.",
  },
  {
    t: "2023 AI대학원 합격 후기",
    url: "https://knowledgeforengineers.tistory.com/227", tag: "합격후기",
    take: "면접에서 뭐가 나올지 예상 불가 — 다들 다른 질문을 받는다. 위 '기본기 체크리스트 1~4'가 바로 이 후기에서 나온 핵심. 면접 15분, 답변이 길어 3문항 정도 오감.",
    quote: "면접 본 사람들 붙잡고 물어봐도 다들 다른 질문이라 '이것만 대비하면 된다'가 없습니다. ① 자기가 한 연구는 빠짐없이 다 알 것 ② 이해 가능하게 설명할 것 ③ 학부 수준 ML/DL 이론(SVD/PCA 정도가 제일 쉬운 수준)은 알 것 ④ 최근 연구를 아는 게 무조건 좋음. … 연구 경험이 꽤 되면 최신 논문을 물어볼 가능성이 높은데, 세세히 못 읽고 가서 후회했습니다.",
  },
  {
    t: "카이스트 대학원 후기",
    url: "https://bigdata-analyst.tistory.com/373", tag: "후기",
    take: "카이스트는 전공 면접을 많이 묻기로 유명. 단, 본인은 전공 대신 연구 주제 질문을 받음. 첫 질문이 '가장 자신 있는 논문이 뭐냐' — 첫 질문 대비가 중요.",
    quote: "카이스트 면접은 전공 면접을 많이 물어보는 곳으로 유명합니다. 그래서 전공 면접을 최대한 준비했는데, 정작 전공은 하나도 안 묻고 제 연구 주제를 많이 물으셨습니다. 첫 질문이 '가장 자신 있는 논문이 무엇이냐'였습니다.",
  },
  {
    t: "면접 후기 — 자소서·프로젝트·연구 방향",
    url: "https://jisuhan.tistory.com/210", tag: "후기",
    take: "자기소개서 작성 프로젝트 위주로, 프로젝트 개념 설명을 시키고, 석사 진학해 어떤 방향으로 연구할지를 물음.",
  },
  {
    t: "[2023년 전기] K대 인공지능 대학원 면접 기출 문제 파헤치기!",
    url: "https://www.youtube.com/watch?v=2VhN5yl2OQw", tag: "영상",
    take: "AI대학원 면접 기출 문제를 영상으로 짚어 주는 자료.",
  },
];

function BasicsTab() {
  const [open, setOpen] = useState({});
  return (
    <div style={{ fontFamily: "-apple-system, sans-serif", maxWidth: 680, margin: "0 auto", padding: "16px 14px 32px" }}>
      <h1 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700, color: "#202124" }}>📌 기본 학습 · 면접 후기에서 뽑은 기본기</h1>
      <p style={{ margin: "0 0 16px", fontSize: 12, color: "#5f6368" }}>실제 KAIST AI대학원 면접 후기·경험담 정리 · 무엇을 '기본적으로' 준비해야 하나</p>

      <div style={{ background: "#fff8e1", borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 12, color: "#7a5900", lineHeight: 1.6, borderLeft: "3px solid #fbbc04" }}>
        💡 <b>한 줄 결론:</b> 면접은 사람마다 질문이 달라 '콕 집어 대비'가 안 됨. 그래서 ①내 연구 ②학부 ML/DL 기본기 ③최신 논문 ④지원 동기 — 이 네 축을 두루 준비하는 게 정답. 아래는 후기에서 추출한 체크리스트 + 원문 링크야.
      </div>

      <div style={{ fontSize: 13, fontWeight: 700, margin: "4px 0 8px", color: "#202124" }}>✅ 기본기 체크리스트 (후기 공통)</div>
      {BASIC_CHECK.map((b, i) => (
        <div key={i} style={{ background: "#fff", borderRadius: 12, marginBottom: 8, boxShadow: "0 1px 2px rgba(0,0,0,0.06)", borderLeft: "3px solid " + b.c, padding: "11px 14px" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: b.c, flexShrink: 0 }}>{i + 1}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#202124" }}>{b.t}</div>
              <div style={{ fontSize: 12, color: "#5f6368", marginTop: 3, lineHeight: 1.5 }}>{b.d}</div>
            </div>
          </div>
        </div>
      ))}

      <div style={{ fontSize: 13, fontWeight: 700, margin: "18px 0 8px", color: "#202124" }}>📂 후기·자료 원천 ({BASIC_SRC.length}개)</div>
      {BASIC_SRC.map((s, i) => {
        const isOpen = open[i];
        return (
          <div key={i} style={{ background: "#fff", borderRadius: 12, marginBottom: 8, boxShadow: "0 1px 2px rgba(0,0,0,0.06)", border: "1px solid #e8eaed", padding: "11px 14px" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <span style={{ fontSize: 15, flexShrink: 0 }}>📝</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#202124", lineHeight: 1.35 }}>
                  {s.url ? <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: "#1a73e8", textDecoration: "none" }}>{s.t} ↗</a> : s.t}
                  <span style={{ display: "inline-block", padding: "1px 6px", borderRadius: 8, fontSize: 10, fontWeight: 600, background: "#00897b18", color: "#00897b", marginLeft: 5 }}>{s.tag}</span>
                </div>
                <div style={{ fontSize: 12, color: "#5f6368", marginTop: 4, lineHeight: 1.5 }}>{s.take}</div>
                {s.quote && (
                  <>
                    <div onClick={() => setOpen(p => ({ ...p, [i]: !p[i] }))} style={{ display: "inline-block", marginTop: 7, fontSize: 11, color: "#00897b", border: "1px solid #00897b40", borderRadius: 6, padding: "1px 8px", cursor: "pointer", fontWeight: 600 }}>
                      {isOpen ? "원문 숨기기" : "🗣️ 원문 발췌"}
                    </div>
                    {isOpen && (
                      <div style={{ marginTop: 6, padding: "8px 12px", background: "#f0f7f5", borderRadius: 8, borderLeft: "3px solid #00897b", fontSize: 12, color: "#3c4043", lineHeight: 1.6, fontStyle: "italic" }}>"{s.quote}"</div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <div style={{ background: "#e8f0fe", borderRadius: 10, padding: "10px 14px", marginTop: 14, fontSize: 11, color: "#1a73e8", lineHeight: 1.5 }}>
        🔗 체크리스트 ②는 <b>기출문제</b> 탭, ③은 <b>논문 리스트</b> 탭과 이어집니다. 여기서 '무엇을' 준비할지 잡고, 거기서 '어떻게' 채우세요.
      </div>
    </div>
  );
}


// ============================================================
//  최상위: 탭 네비게이션
// ============================================================

export default function App() {
  const [tab, setTab] = useState("cur");
  const TABS = [
    { id: "basic", label: "📌 기본 학습", sub: "면접 후기·기본기" },
    { id: "cur", label: "🛠️ 커리큘럼", sub: "Learning by Doing" },
    { id: "exam", label: "📋 기출문제", sub: "면접 예상" },
    { id: "pap", label: "📄 논문 리스트", sub: "리딩" },
  ];
  return (
    <div style={{ fontFamily: "-apple-system, sans-serif", background: "#f8f9fa", minHeight: "100vh" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: "#fff", borderBottom: "1px solid #e8eaed", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", gap: 4, padding: "8px 10px" }}>
          {TABS.map(t => (
            <div key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, textAlign: "center", padding: "8px 4px", borderRadius: 10, cursor: "pointer",
              background: tab === t.id ? "#202124" : "#f1f3f4",
              color: tab === t.id ? "#fff" : "#5f6368", transition: "all 0.15s"
            }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{t.label}</div>
              <div style={{ fontSize: 9, opacity: 0.7, marginTop: 1 }}>{t.sub}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        {tab === "basic" && <BasicsTab />}
        {tab === "cur" && <CurriculumTab />}
        {tab === "exam" && <ExamTab />}
        {tab === "pap" && <PapersTab />}
      </div>
    </div>
  );
}
