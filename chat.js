/* ════════════════════════════════
   PROMPTS — チャット・サマリー用プロンプト定数
   ════════════════════════════════ */

// ── 基本キャラクター ──
const PROMPT_BASE_CHAR = (odaiName, userName, memCtx) => [
  `あなたは「たからちゃん」です。お題「${odaiName}」を探索中。`,
  `【話し方】受容→深掘り。絵文字1つ。2文以内。問いは1つだけ。答えを先に言わない。`,
  `【子ども】呼び方:${userName || 'きみ'}`, 
  memCtx,
].filter(Boolean).join('\n');

// ── 年齢別ことば・ユーモア ──
const PROMPT_AGE_young = `【ことば】全文ひらがな・カタカナのみ。1文15文字以内。五感で表現する。
【ユーモア】擬音・擬態語で笑わせる。「ぷにぷに！」「ぼよよん！」など体感できるおふざけを1つ混ぜてOK。`;

const PROMPT_AGE_middle = `【ことば】小1-2漢字まで。1文20文字以内。「なぜ？」まで扱える。
【ユーモア】「もしかして〇〇だったりして？」など軽いボケを混ぜてOK。子どもがツッコみたくなる問いかけも有効。`;

const PROMPT_AGE_older = `【ことば】小学漢字OK。1文25文字以内。仮説・根拠・比較まで扱える。
【ユーモア】ちょっと意外な視点や逆張りで知的なおもしろさを出す。「実はそれ、〇〇と同じ仕組みかも？」など。`;

const PROMPT_AGE_default = `【ことば】全文ひらがな・カタカナのみ。1文15文字以内。`;

// ── レンズ別視点 ──
const PROMPT_LENS_kotoba   = `観察:色・形・五感を引き出す。深掘り:「一言で言うと？」オノマトペを一緒に作る。`;
const PROMPT_LENS_jibun    = `観察:色・形・五感を引き出す。深掘り:「好き？嫌い？なんで？」自分の感覚を掘る。`;
const PROMPT_LENS_monoshiri= `観察:名前・なかま・ちがいを引き出す。深掘り:「どんななかま？」「名前の由来は？」`;
const PROMPT_LENS_kagaku   = `観察:「中はどうなってる？」を問う。深掘り:「なんでそうなってる？」仮説を引き出す。`;
const PROMPT_LENS_shakai   = `観察:「中はどうなってる？」を問う。深掘り:「だれが作った？」「なんのため？」`;
const PROMPT_LENS_kazu     = `観察:「どのくらい？いくつ？」を問う。深掘り:「○○と比べると？」パターンに気づかせる。`;

// 引き当て用マップ（chat.jsのlens変数で使う）
const PROMPT_LENS_MAP = {
  ことば:   PROMPT_LENS_kotoba,
  じぶん:   PROMPT_LENS_jibun,
  ものしり: PROMPT_LENS_monoshiri,
  かがく:   PROMPT_LENS_kagaku,
  しゃかい: PROMPT_LENS_shakai,
  かず:     PROMPT_LENS_kazu,
};

// ── フェーズ別指示 ──
const PROMPT_PHASE_1 = `「どこで見つけたの？」場所・状況を1つ聞く。`;

const PROMPT_PHASE_2 = `レンズの視点でお題を観察させる。まだ「なぜ？」は聞かない。`;

const PROMPT_PHASE_3 = `レンズの視点で「なぜ？」を深掘りする。子どもが「〜だと思う」と言えたら成功。`;
const PROMPT_CTX_phase3_decision = `【必須ルール】今回が深掘りの最後のターンです。返答の末尾に、必ず「たからをしまう？それとももっとたんけんする？」という問いかけを書いてください。これ以外のタイミングでは絶対にこの問いかけを書かないでください。`;
const PROMPT_CTX_phase3_likes = (likes) => `【特別な指示】子どもの好きなこと「${likes}」をお題と比較したり、例え話に交えたりして問いかけてください。`;
const PROMPT_PHASE_4 = (odaiName) =>
  `「${odaiName}ってひとことで言うとどういうもの？」と聞く。答えをもらったら必ず「📦」を使って「たからをしまおう！」と誘導する。`;

const PROMPT_PHASE_5 = `子どもがまだ探求を続けたいと選んだ。レンズの視点でさらに深掘りする.
【必須ルール】直前の子どもの回答をそのまま受け取らず、必ず「逆から見る・別の角度に変える・ひっくり返す」で次の問いを作ること。
例：「大きい→じゃあいちばん小さいところは？」「好き→でも嫌いなところはある？」「丸い→もし四角だったら？」
同じ方向の掘り下げは禁止。毎回視点をずらすこと。`;

// ── フラグ別コンテキスト ──
const PROMPT_CTX_not_interested = `【注意】興味が薄れています。別の角度から引き直してください。`;

const PROMPT_CTX_parent_bridge = (parentName) =>
  `【今回】深い気づきが出ました。「${parentName}はどう思うか聞いてみて！」と子どもを通じて1回だけ促すこと。`;

// ── 判定系システムプロンプト ──
const PROMPT_SYS_deep_insight = `JSONのみ返してください（Markdownなし）。子どもの発言が自分なりの答えや深い気づきを含むか判定します。`;

const PROMPT_SYS_interest = `JSONのみ返してください（Markdownなし）。子どもの興味・意欲を判定するアシスタントです。`;

const PROMPT_SYS_summary_builder = `ここまでの会話の要点を箇条書きで簡潔にまとめるアシスタントです。JSONは不要です。`;

const PROMPT_SYS_tomorrow_hint = `JSONのみ返してください（Markdownなし）。子どもが実践できる具体的な行動を1文で。`;

// ── ユーザープロンプト（判定・要約用） ──
const PROMPT_USER_deep_insight = (childText) =>
  `子どもの発言:「${childText}」
これは「深い気づき・自分なりの答え」が出た瞬間か？JSONのみ: {"is_deep": true/false}`;

const PROMPT_USER_interest = (recent, childText) =>
  `以下は子どもとAIの直近の会話です。子どもの最新の返答から興味・意欲を判定してください。\n\n${recent}\n\n子どもの最新の一言:「${childText}」\n\nJSONのみ返してください: {"is_interested": true/false, "reason": "判定理由を一言で"}`;

const PROMPT_USER_phase_summary = (odaiName, conv) =>
  `以下はお題「${odaiName}」の探索会話です。ここまでの子どもの気づきと発言を3行以内で簡潔にまとめてください。\n\n${conv}`;

const PROMPT_USER_tomorrow_hint = (odaiName, lensName, findingsTxt) =>
  `子ども向けアプリで、お題「${odaiName}」をレンズ「${lensName}」で探索し、「${findingsTxt}」を発見しました。明日の日常で意識できることを、子ども（3〜9歳）向けに1文でやさしく提案してください。JSONのみ: {"hint":"ひらがな・ことばあそびで1文"}`;

const PROMPT_SYS_summary = (odaiName, lens, conv, maxFindings, maxChars, ageLabel, kidName, isYoung) =>
`あなたは「たからちゃん」です。以下の会話をもとにまとめを作ってください。
 
お題: ${odaiName}　レンズ: ${lens}
 
【会話記録】
${conv}
 
【重要ルール】
- findingsは必ず上記の会話の中で実際に出た言葉・気づき・発見のみを使う
- 会話にない言葉の補完・推測・創作は禁止
- findingsは最大${maxFindings}個まで
- 子どもが自分の言葉で言った「答え」があれば、それを最初のfindingにする
 
【宿題（mission）のルール】
- 今日の発見から自然につながる「次の物理的な行動」を1つ提案する
- 必ず「外で○○を探してみよう」「次は○○を持ってきて見せて」など、手や体を動かす具体的なミッションにする
- 子ども（${ageLabel}）が一人でできるレベルにする
- 「かんがえてみよう」「しらべてみよう」だけでは不可。実際に見る・触る・持ってくる・外へ出る行動にする
 
【出力形式】JSONのみ（Markdownなし）:
{
  "findings": ["子どもが実際に言った言葉を活かした発見（1〜${maxFindings}個）"],
  "opinion": "保護者向けの温かいコメント。${maxChars}文字以内。2〜3段落。段落区切りは\\n。${isYoung ? 'ひらがな多め。' : ''}",
  "mission": "たからちゃんから${kidName}へのミッション。1文。体を動かす具体的な行動。"
}`;
/* ═══════════════════════════════════════════════════════
   chat.js — AI通信・チャット・サマリー機能
   ═══════════════════════════════════════════════════════ */

/* ── 定数 ── */

// Vercel にデプロイ後、実際の URL に書き換えてください
const API_ENDPOINT = 'https://chattest-mu.vercel.app/api/chat';

// 開始時の問いかけバリエーション（時間帯 + お題を組み込む）
const OPENING_TEMPLATES = [
  name => `${name}をどこで見つけたの？`,
  name => `${name}を見つけたのはいつ？`,
  name => `${name}って、さわったことある？`,
  name => `${name}を最初に見たとき、どう思った？`,
  name => `${name}って、なんのためにあると思う？`,
  name => `${name}を見て、なにが気になった？`,
  name => `${name}、だれかに見せたいと思う？`,
  name => `${name}と、なにかにてるものってある？`,
];

/* ── ユーティリティ ── */

/** JSONレスポンスのMarkdownフェンスを除去してパース */
function parseJSON(str) {
  return JSON.parse(str.replace(/```json|```/g, '').trim());
}

/** 会話履歴を「[話者] テキスト」形式の文字列に変換 */
function formatConversation(messages) {
  return messages.map(m => {
    const who = m.role === 'ai' ? 'たからちゃん' : S.user.name || 'こども';
    return `[${who}] ${m.text}`;
  }).join('\n');
}

/** 現在の時間帯を日本語で返す */
function getTimeOfDay() {
  const h = new Date().getHours();
  return h < 11 ? 'あさ' : h < 17 ? 'ひるま' : 'よる';
}

/* ── API呼び出し ── */

async function callAI(messages, system) {
  const res = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, system }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'API error');
  return data.text;
}

/* ── フェーズ自動判定 ── */

const PHASE4_SIGNALS = [
  'ひとことでいうと', 'まとめてみよう', 'たからをしまおう',
  'どういうものだと思う？', 'ひとことで', 'いちばんおもしろかった',
  'わかったことを', 'きょうのたから', '下のボタン', '📦',
];
const PHASE3_SIGNALS = ['なんで', 'どうして', 'なぜ', 'どうおもう', 'どう思う', 'かんがえてみて'];

function detectPhaseFromAI(text, userMsgCount) {
  if (PHASE4_SIGNALS.some(s => text.includes(s))) return 4;
  if (PHASE3_SIGNALS.some(s => text.includes(s)) && userMsgCount >= 2) return 3;
  if (userMsgCount >= 4) return 3;
  if (userMsgCount >= 2) return 2;
  return null;
}

/* ── 親への橋渡しタイミング判定（フェーズ3中の深い気づき） ── */

async function checkDeepInsight(childText) {
  try {
    const res = await callAI(
      [{ role: 'user', content: PROMPT_USER_deep_insight(childText) }],
      PROMPT_SYS_deep_insight
    );
    return parseJSON(res).is_deep === true;
  } catch {
    return false;
  }
}

/* ── チャット用システムプロンプト ──
   構成: [基本] + [年齢] + [レンズ] + [フェーズ] + [コンテキスト]
   ────────────────────────────────── */

function chatSystem({ isInterested = true, showParentBridge = false, showPhase3Decision = false, showPhase3Likes = false } = {}) {
  const u = S.user;

  const base = PROMPT_BASE_CHAR(S.odai?.name, u.name, App._buildMemoryContext?.() || '');

  const age = { young: PROMPT_AGE_young, middle: PROMPT_AGE_middle, older: PROMPT_AGE_older }[u.ageGroup]
    || PROMPT_AGE_default;

  const lens = PROMPT_LENS_MAP[S.lens] || '';

  const phase = {
    1: PROMPT_PHASE_1,
    2: PROMPT_PHASE_2,
    3: PROMPT_PHASE_3,
    4: PROMPT_PHASE_4(S.odai?.name),
    5: PROMPT_PHASE_5,
  }[S.chatPhase] || PROMPT_PHASE_1;

  const ctx = [
    S.currentSummary                  ? `【ここまでの気づき】${S.currentSummary}` : '',
    !isInterested                      ? PROMPT_CTX_not_interested               : '',
    showParentBridge                   ? PROMPT_CTX_parent_bridge(u.parentName)  : '',
    showPhase3Decision                 ? PROMPT_CTX_phase3_decision               : '',
    (showPhase3Likes && u.likes)       ? PROMPT_CTX_phase3_likes(u.likes)        : '',
  ].filter(Boolean).join('\n');

  return [base, age, lens, phase, ctx].filter(Boolean).join('\n\n');
}

/* ── サマリー用システムプロンプト ── */

function summarySystem() {
  const u           = S.user;
  const ageKey      = u.ageGroup;
  const maxChars    = ageKey === 'young' ? 60 : ageKey === 'middle' ? 100 : 150;
  const maxFindings = ageKey === 'older' ? 3 : 2;
  const ageLabel    = ageKey === 'young' ? '3〜5さい' : ageKey === 'middle' ? '6〜8さい' : '9〜12さい';
  const kidName     = u.name || 'きみ';
  const conv        = formatConversation(S.messages);
  return PROMPT_SYS_summary(S.odai?.name, S.lens, conv, maxFindings, maxChars, ageLabel, kidName, ageKey);
}

/* ── チャットUIヘルパー ── */

function bindChatEvents() {
  const ci = $id('chat-in');
  if (ci) {
    ci.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); App.sendChat(); }
    });
  }
}

function scrollChat() {
  setTimeout(() => {
    const el = $id('chat-area');
    if (el) el.scrollTop = el.scrollHeight;
  }, 80);
}

/* ── Appにチャット・サマリーメソッドを追加 ── */
Object.assign(App, {

  /* ── チャット開始 ── */
  async startChat() {
    if (!S.lens) return;

    App.loadTakaraMemory();

    // 状態の初期化
    Object.assign(S, {
      messages:             [],
      flow:                 'chat',
      isLoading:            true,
      lastError:            false,
      chatPhase:            1,
      lastLens:             S.lens,
      speaker:              'child',
      currentSummary:       '',
      parentBridgeDone:     false,
      phase3Turns:          0,
      phase3DecisionAsked:  false,
      showDecisionButtons:  false,
    });
    render();

    // ランダムな開始文を選んで時間帯を付与
    const template = OPENING_TEMPLATES[Math.floor(Math.random() * OPENING_TEMPLATES.length)];
    const opening  = `${getTimeOfDay()}、${template(S.odai?.name)}`;
    const memNote  = S.takaraMemory?.lastTopic
      ? `前回「${S.takaraMemory.lastTopic}」を一緒に探検したよ。それも活かして自然に会話を始めてください。`
      : '';
    const startMsg = `${opening}という問いかけでフェーズ1を始めてください。最初の1文だけ。${memNote}`;

    try {
      const text = await callAI([{ role: 'user', content: startMsg }], chatSystem());
      S.messages.push({ role: 'ai', text });
    } catch (err) {
      console.error('chat start error:', err);
      S.messages.push({ role: 'ai', text: `${S.odai?.name}、どこでみつけたの？🔍` });
    }

    S.isLoading = false;
    render();
    scrollChat();
  },

  setSpeaker(sp) { S.speaker = sp; render(); },

  /* ── フェーズ3完了後：「たからをしまう」を選択 ── */
  chooseSaveNow() {
    S.chatPhase = 4;
    S.showDecisionButtons = false;
    render();
    App._triggerPhaseMessage();
  },

  /* ── フェーズ3完了後：「もっとたんけんする」を選択 ── */
  chooseKeepExploring() {
    S.chatPhase = 5;
    S.showDecisionButtons = false;
    render();
    App._triggerPhaseMessage();
  },

  /* ── フェーズ移行時にAIから次の問いかけを生成 ── */
  async _triggerPhaseMessage() {
    if (S.isLoading) return;
    S.isLoading = true;
    render();
    try {
      const label = S.chatPhase === 4 ? 'たからをしまう準備をしてください。' : 'もっとたんけんを続けてください。';
      const text  = await callAI(App._buildMinimalMsg(label), chatSystem());
      S.messages.push({ role: 'ai', text });
    } catch (err) {
      console.error('_triggerPhaseMessage error:', err);
    }
    S.isLoading = false;
    render();
    scrollChat();
  },

  /* ── メッセージ送信 ── */
  async sendChat() {
    const inp = $id('chat-in');
    const txt = inp?.value?.trim();
    if (!txt || S.isLoading) return;

    S.messages.push({ role: S.speaker, text: txt });
    S.speaker   = 'child';
    S.isLoading = true;
    S.lastError = false;
    if (inp) inp.value = '';
    render();
    scrollChat();

    const userMsgCount = S.messages.filter(m => m.role !== 'ai').length;

    try {
      // 興味判定
      const interest     = await App._checkInterest(txt);
      const isInterested = interest?.is_interested !== false;

      // フェーズ3のターン管理
      let showPhase3Decision = false;
      let showPhase3Likes    = false;
      if (S.chatPhase === 3) {
        S.phase3Turns = (S.phase3Turns || 0) + 1;
        if (S.phase3Turns === 1) showPhase3Likes = true;
        if (S.phase3Turns === 3 && !S.phase3DecisionAsked) {
          showPhase3Decision    = true;
          S.phase3DecisionAsked = true;
          S.showDecisionButtons = true;
        }
      }

      // 親への橋渡し判定（フェーズ3中のみ）
      let showParentBridge = false;
      if (S.chatPhase === 3 && !S.parentBridgeDone) {
        if (await checkDeepInsight(txt)) {
          showParentBridge   = true;
          S.parentBridgeDone = true;
        }
      }

      // フェーズ自動進行
      const detected  = detectPhaseFromAI('', userMsgCount);
      const nextPhase = (detected && detected > S.chatPhase && S.chatPhase < 3) ? detected
        : (!detected && userMsgCount >= 1 && S.chatPhase < 2) ? 2
        : (!detected && userMsgCount >= 3 && S.chatPhase < 3) ? 3
        : null;

      if (nextPhase && nextPhase > S.chatPhase) {
        S.currentSummary = await App._buildPhaseSummary();
        S.chatPhase      = nextPhase;
        if (S.chatPhase === 3) S.phase3Turns = 0;
      }

      // AI返答を取得
      const text = await callAI(
        App._buildMinimalMsg(txt),
        chatSystem({ isInterested, showParentBridge, showPhase3Decision, showPhase3Likes })
      );
      S.messages.push({ role: 'ai', text });
      S.lastError = false;

      // AIの返答からもフェーズを検出（フェーズ5は除く）
      if (S.chatPhase !== 5) {
        const detectedFromReply = detectPhaseFromAI(text, userMsgCount);
        if (detectedFromReply && detectedFromReply > S.chatPhase) {
          S.chatPhase = detectedFromReply;
        }
      }

    } catch (err) {
      console.error('chat error:', err);
      S.lastError = true;
    }

    S.isLoading = false;
    render();
    scrollChat();
  },

  /* ── 再送信 ── */
  async retryLastSend() {
    if (S.isLoading) return;
    const lastUserMsg = [...S.messages].reverse().find(m => m.role !== 'ai');
    if (!lastUserMsg) return;

    S.isLoading = true;
    S.lastError = false;
    render();
    scrollChat();

    try {
      const text = await callAI(App._buildMinimalMsg(lastUserMsg.text), chatSystem());
      S.messages.push({ role: 'ai', text });
      S.lastError = false;
    } catch {
      S.lastError = true;
    }

    S.isLoading = false;
    render();
    scrollChat();
  },

  /* ── APIメッセージ組み立て（子ども1発言分） ── */
  _buildMinimalMsg(childText) {
    return [{ role: 'user', content: `[${S.user.name || 'こども'}] ${childText}` }];
  },

  /* ── フル会話履歴の組み立て ── */
  _buildApiMsgs() {
    const msgs = S.messages.map(m => {
      if (m.role === 'ai') return { role: 'assistant', content: m.text };
      const label = m.role === 'child' ? S.user.name || 'こども' : S.user.parentName;
      return { role: 'user', content: `[${label}] ${m.text}` };
    });
    // assistantメッセージが先頭に来ないよう保証
    if (msgs[0]?.role === 'assistant') msgs.unshift({ role: 'user', content: 'はじめてください' });
    return msgs;
  },

  /* ── 興味判定 ── */
  async _checkInterest(childText) {
    try {
      const recent = formatConversation(S.messages.slice(-4));
      const res    = await callAI(
        [{ role: 'user', content: PROMPT_USER_interest(recent, childText) }],
        PROMPT_SYS_interest
      );
      return parseJSON(res);
    } catch (err) {
      console.warn('_checkInterest error:', err);
      return { is_interested: true, reason: '判定失敗のためデフォルトtrue' };
    }
  },

  /* ── フェーズ移動時の要約生成 ── */
  async _buildPhaseSummary() {
    try {
      const conv = formatConversation(S.messages);
      return await callAI(
        [{ role: 'user', content: PROMPT_USER_phase_summary(S.odai?.name, conv) }],
        PROMPT_SYS_summary_builder
      );
    } catch (err) {
      console.warn('_buildPhaseSummary error:', err);
      return '';
    }
  },

  /* ── サマリー生成 ── */
  async goSummary() {
    Object.assign(S, {
      flow:           'summary',
      summaryItems:   [],
      summaryOpinion: '',
      summaryMission: '',
      opinionOpen:    false,
      bookmarked:     false,
      currentNote:    '',
      tomorrowHint:   '',
    });
    render();

    try {
      const res  = await callAI([{ role: 'user', content: 'まとめてください。' }], summarySystem());
      const data = parseJSON(res);
      S.summaryItems   = data.findings || [];
      S.summaryOpinion = data.opinion  || '';
      S.summaryMission = data.mission  || '';
    } catch (err) {
      console.error('summary error:', err);
      S.summaryItems   = ['いっぱいかんがえた！'];
      S.summaryOpinion = 'ふたりとも、すごいはっけんだったね！';
      S.summaryMission = 'あしたそとで、なにかみつけてきてね！';
    }

    App._updateTakaraMemory();
    render();
    App._generateTomorrowHint();
  },

  /* ── あしたのヒント生成 ── */
  async _generateTomorrowHint() {
    if (S.tomorrowHint) return;
    try {
      const findingsTxt = (S.summaryItems || []).join('、');
      const res  = await callAI(
        [{ role: 'user', content: PROMPT_USER_tomorrow_hint(S.odai?.name || '', S.lens || '', findingsTxt) }],
        PROMPT_SYS_tomorrow_hint
      );
      S.tomorrowHint = parseJSON(res).hint || '';
    } catch (err) {
      console.error('tomorrowHint error:', err);
      S.tomorrowHint = 'あしたも、まわりのものをじっくりみてみよう！';
    }
    render();
  },

  /* ── 記憶を更新 ── */
  _updateTakaraMemory() {
    const mem = S.takaraMemory || {
      sessions:       0,
      lastTopic:      '',
      topicLog:       [],
      lensLog:        [],
      kidKeywords:    [],
      sharedEmotions: [],
      takaraLevel:    1,
      missionLog:     [],
    };

    mem.sessions += 1;
    mem.lastTopic = S.odai?.name || '';

    if (S.odai?.name)       mem.topicLog   = [S.odai.name,          ...(mem.topicLog   || [])].slice(0, 10);
    if (S.lens)             mem.lensLog    = [S.lens,                ...(mem.lensLog    || [])].slice(0, 10);
    if (S.summaryMission)   mem.missionLog = [S.summaryMission,      ...(mem.missionLog || [])].slice(0,  5);

    // 子どもの発言から2〜8文字のキーワードを抽出
    const childWords = S.messages
      .filter(m => m.role === 'child')
      .map(m => m.text)
      .join(' ')
      .split(/[、。！？\s]+/)
      .filter(w => w.length >= 2 && w.length <= 8);
    mem.kidKeywords = [...new Set([...childWords, ...(mem.kidKeywords || [])])].slice(0, 20);

    mem.takaraLevel = Math.floor(mem.sessions / 3) + 1;
    S.takaraMemory  = mem;

    try {
      localStorage.setItem('takaraMemory_' + (S.user?.name || 'default'), JSON.stringify(mem));
    } catch (e) {
      console.warn('memory save error:', e);
    }
  },

  /* ── 起動時に記憶を読み込む ── */
  loadTakaraMemory() {
    try {
      const raw = localStorage.getItem('takaraMemory_' + (S.user?.name || 'default'));
      S.takaraMemory = raw ? JSON.parse(raw) : null;
    } catch {
      S.takaraMemory = null;
    }
  },

  /* ── 記憶をchatSystemに渡す用テキストを生成 ── */
  _buildMemoryContext() {
    const mem = S.takaraMemory;
    if (!mem || mem.sessions === 0) return '';
    return [
      `【たからちゃんの記憶】${S.user?.name || 'この子'}とは${mem.sessions}回たんけんしたよ。`,
      mem.topicLog?.length    ? `過去のお題：${mem.topicLog.slice(0, 3).join('・')}`                      : '',
      mem.kidKeywords?.length ? `よく使うことば：${mem.kidKeywords.slice(0, 5).join('・')}`               : '',
      mem.missionLog?.[0]     ? `前回のミッション：「${mem.missionLog[0]}」（達成できたか自然に聞いてみて）` : '',
    ].filter(Boolean).join('\n');
  },

});
