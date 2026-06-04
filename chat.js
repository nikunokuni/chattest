/* ═══════════════════════════════════════════════════════
   chat.js — AI通信・チャット・サマリー機能
   ═══════════════════════════════════════════════════════ */

/* ── API呼び出し ── */

// Vercel にデプロイ後、実際の URL に書き換えてください
// 例: https://your-project.vercel.app/api/chat
const API_ENDPOINT = 'https://chattest-mu.vercel.app/api/chat';

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
function detectPhaseFromAI(text, userMsgCount) {
  const phase4signals = [
    'ひとことでいうと','まとめてみよう','たからをしまおう',
    'どういうものだと思う？','ひとことで','いちばんおもしろかった',
    'わかったことを','きょうのたから','下のボタン','📦',
  ];
  if (phase4signals.some(sig => text.includes(sig))) return 4;
  const phase3signals = ['なんで','どうして','なぜ','どうおもう','どう思う','かんがえてみて'];
  if (phase3signals.some(sig => text.includes(sig)) && userMsgCount >= 2) return 3;
  if (userMsgCount >= 4) return 3;
  if (userMsgCount >= 2) return 2;
  return null;
}

/* ── チャット用システムプロンプト ── */
function chatSystem() {
  const u = S.user;
  const userMsgCount = S.messages.filter(m => m.role !== 'ai').length;
  const parentDue    = userMsgCount > 0 && userMsgCount % 4 === 0;

  const baseLayer = `あなたは「たからちゃん」です。
子どもが日常で見つけたものについて、一緒に「子どもなりの答え」を作る案内役です。

【たからちゃんの話し方】
- 子どもの言葉をそのまま繰り返してから次の問いへ（受容→深掘り）
- 褒めるときは「えらい」より「気づいたね！」「おもしろい！」「そっか！」
- 間違いは否定せず「そう思うんだね、じゃあ〜はどう？」で転換する
- 「なんとなく」「わからない」も大切に受け取り、別の角度で聞き直す
- 絵文字は1つだけ使う
- 1回の返答は2文以内。問いは必ず1つだけ
- 答えを先に言わない。押しつけや説教はしない
- [${u.parentName}]に直接話しかけることは禁止。
  ただし4往復ごとのタイミングでは「${u.parentName}はどう思うか聞いてみて！」と
  子どもを通じて親に橋渡しする

【子どもの情報】
- 呼び方: ${u.name || 'きみ'}
- すきなもの: ${u.likes || 'なし'}
${u.likes ? `- 対話の中で自然なタイミングで「${u.likes}と比べてみたらどう？」と絡める` : ''}

【今回のお題】「${S.odai?.name}」
【レンズ】${S.lens}`;

  const ageLayers = {
    young:  `【ことばのルール：3〜5さい】\n- 全文ひらがな・カタカナのみ。漢字は使わない\n- 1文は15文字以内。短く、テンポよく\n- 抽象的な概念は使わず、五感で表現する`,
    middle: `【ことばのルール：6〜8さい】\n- 小学校1〜2年レベルの漢字まで使用可\n- 1文は25文字以内\n- 「なぜ？」「どう思う？」まで扱える`,
    older:  `【ことばのルール：9〜12さい】\n- 小学校全学年の漢字を使用可\n- 1文は40文字以内\n- 仮説・根拠・比較まで扱える`,
  };

  const typeLayers = {
    A: `【はっけんタイプ】フェーズ2では「色・形・さわった感じ・音・におい」を引き出す問いを使う。`,
    B: `【しらべるタイプ】フェーズ2では「名前・なかま・ほかとのちがい」を引き出す問いを使う。`,
    C: `【そうぞうタイプ】フェーズ2では「中はどうなってると思う？」「なんでそうなってる？」を使う。`,
  };

  const lensLayers = {
    ことば:  `【ことばレンズ】フェーズ3では「これを一言で言うとしたら？」「まるで〇〇みたい、はどう？」オノマトペを一緒に作る。`,
    かず:    `【かずレンズ】フェーズ3では「どのくらいの大きさ？」「○○と比べると？」「いくつある？」パターンや規則性に気づかせる。`,
    かがく:  `【かがくレンズ】フェーズ3では「なんでそうなってると思う？」「もし〜だったらどうなる？」子どもの仮説を「実験したらわかるね！」と次の行動につなげる。`,
    しゃかい:`【しゃかいレンズ】フェーズ3では「だれがつくったんだろう？」「なんのためにあるの？」「これがなかった昔はどうしてたんだろう？」`,
    じぶん:  `【じぶんレンズ】フェーズ3では「好き？嫌い？なんで？」「前に似たような経験した？」「正解はないよ。きみはどう感じた？」`,
  };

  const phaseLayer = `【会話の4フェーズ — 必ずこの順番で進める】

■ フェーズ1「いまどこ？」（1往復）
  「どこで見つけたの？」「そのとき、まわりに何があった？」
  場所・状況が掴めたら即フェーズ2へ。

■ フェーズ2「よくみると？」（1往復）
  [タイプ]の視点でお題を観察させる。まだ「なぜ？」は聞かない。

■ フェーズ3「どう思う？」（1〜2往復）
  [レンズ]の方向で「なぜ？」を深掘り。子どもが「〜だと思う」と言えたら成功。

■ フェーズ4「まとめ」（フェーズ3完了後）
  「じゃあ、${S.odai?.name}ってひとことで言うとどういうもの？」と聞く。
  子どもの答えを受け取ったあと、必ず「📦」絵文字を使って「たからをしまおう！」と誘導する。
  例：「今日のたからをしまってみよう！📦」

【重要】フェーズは順番通りに進める。飛ばさない。戻らない。
現在の会話数: ${userMsgCount}回目
${parentDue ? `→ このタイミングで「${u.parentName}はどう思うか聞いてみて！」と子どもを通じて促すこと` : ''}`;

  const finalRules = `【最重要・必ず守る】
① 1回の返答で問うのは1つだけ
② 答えを先に言わない
③ 2文以内
④ フェーズ4でまとめを促すときは必ず「📦」を使う`;

  return [
    baseLayer,
    ageLayers[u.ageGroup] || ageLayers.young,
    typeLayers[u.type]    || typeLayers.A,
    lensLayers[S.lens]    || '',
    phaseLayer,
    finalRules,
  ].filter(Boolean).join('\n\n');
}

/* ── サマリー用システムプロンプト ── */
function summarySystem() {
  const conv = S.messages.map(m => {
    const who = m.role === 'ai' ? 'たからちゃん' : m.role === 'child' ? S.user.name || 'こども' : S.user.parentName;
    return `[${who}] ${m.text}`;
  }).join('\n');
  const maxChars    = S.user.ageGroup === 'young' ? 60 : S.user.ageGroup === 'middle' ? 100 : 150;
  const maxFindings = S.user.ageGroup === 'older' ? 3 : 2;

  return `あなたは「たからちゃん」です。以下の会話をもとにまとめを作ってください。

お題: ${S.odai?.name}　レンズ: ${S.lens}

【会話記録】
${conv}

【重要ルール】
- findingsは必ず上記の会話の中で実際に出た言葉・気づき・発見のみを使う
- 会話にない言葉の補完・推測・創作は禁止
- findingsは最大${maxFindings}個まで
- 子どもが自分の言葉で言った「答え」があれば、それを最初のfindingにする

【出力形式】JSONのみ（Markdownなし）:
{
  "findings": ["子どもが実際に言った言葉を活かした発見（1〜${maxFindings}個）"],
  "opinion": "保護者向けの温かいコメント。${maxChars}文字以内。2〜3段落。段落区切りは\\n。${S.user.ageGroup === 'young' ? 'ひらがな多め。' : ''}"
}`;
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
    S.messages  = [];
    S.flow      = 'chat';
    S.isLoading = true;
    S.lastError = false;
    S.chatPhase = 1;
    S.lastLens  = S.lens;
    S.speaker   = 'child';
    render();

    const hour      = new Date().getHours();
    const timeOfDay = hour < 11 ? 'あさ' : hour < 17 ? 'ひるま' : 'よる';
    const startMsg  = `${timeOfDay}です。フェーズ1から始めてください。最初の問いかけを1つだけ。`;

    try {
      const text = await callAI([{ role:'user', content: startMsg }], chatSystem());
      S.messages.push({ role:'ai', text });
    } catch(err) {
      console.error('chat start error:', err);
      S.messages.push({ role:'ai', text: `${S.odai?.name}、どこでみつけたの？🔍` });
    }
    S.isLoading = false;
    render();
    scrollChat();
  },

  setSpeaker(sp) { S.speaker = sp; render(); },

  /* ── メッセージ送信 ── */
  async sendChat() {
    const inp = $id('chat-in');
    const txt = inp?.value?.trim();
    if (!txt || S.isLoading) return;

    const sentAs = S.speaker;
    S.messages.push({ role: sentAs, text: txt });
    S.speaker   = 'child';
    S.isLoading = true;
    S.lastError = false;
    if (inp) inp.value = '';
    render();
    scrollChat();

    const payload      = App._buildApiMsgs();
    S.lastSendPayload  = payload;
    const userMsgCount = S.messages.filter(m => m.role !== 'ai').length;

    try {
      const text = await callAI(payload, chatSystem());
      S.messages.push({ role:'ai', text });
      S.lastError = false;

      const detected = detectPhaseFromAI(text, userMsgCount);
      if (detected && detected > S.chatPhase) {
        S.chatPhase = detected;
      } else if (!detected) {
        if (userMsgCount >= 1 && S.chatPhase < 2) S.chatPhase = 2;
        if (userMsgCount >= 3 && S.chatPhase < 3) S.chatPhase = 3;
      }
    } catch(err) {
      console.error('chat error:', err);
      S.lastError = true;
    }
    S.isLoading = false;
    render();
    scrollChat();
  },

  /* ── 再送信 ── */
  async retryLastSend() {
    if (!S.lastSendPayload || S.isLoading) return;
    S.isLoading = true; S.lastError = false;
    render(); scrollChat();
    try {
      const text = await callAI(S.lastSendPayload, chatSystem());
      S.messages.push({ role:'ai', text });
      S.lastError = false;
    } catch {
      S.lastError = true;
    }
    S.isLoading = false;
    render();
    scrollChat();
  },

  /* ── APIメッセージ組み立て ── */
  _buildApiMsgs() {
    const apiMsgs = [];
    for (const m of S.messages) {
      if (m.role === 'ai') {
        apiMsgs.push({ role:'assistant', content: m.text });
      } else {
        const label = m.role === 'child' ? S.user.name || 'こども' : S.user.parentName;
        apiMsgs.push({ role:'user', content: `[${label}] ${m.text}` });
      }
    }
    if (apiMsgs[0]?.role === 'assistant') {
      apiMsgs.unshift({ role:'user', content:'はじめてください' });
    }
    return apiMsgs;
  },

  /* ── サマリー生成 ── */
  async goSummary() {
    S.flow           = 'summary';
    S.summaryItems   = [];
    S.summaryOpinion = '';
    S.opinionOpen    = false;
    S.bookmarked     = false;
    S.currentNote    = '';
    S.tomorrowHint   = '';
    render();

    try {
      const res  = await callAI([{ role:'user', content:'まとめてください。' }], summarySystem());
      const data = JSON.parse(res.replace(/```json|```/g, '').trim());
      S.summaryItems   = data.findings || [];
      S.summaryOpinion = data.opinion  || '';
    } catch(err) {
      console.error('summary error:', err);
      S.summaryItems   = ['いっぱいかんがえた！'];
      S.summaryOpinion = 'ふたりとも、すごいはっけんだったね！';
    }
    render();

    App._generateTomorrowHint();
  },

  /* ── あしたのヒント生成 ── */
  async _generateTomorrowHint() {
    if (S.tomorrowHint) return;
    try {
      const odaiName    = S.odai?.name  || '';
      const lensName    = S.lens        || '';
      const findingsTxt = (S.summaryItems || []).join('、');
      const prompt = `子ども向けアプリで、お題「${odaiName}」をレンズ「${lensName}」で探索し、「${findingsTxt}」を発見しました。明日の日常で意識できることを、子ども（3〜9歳）向けに1文でやさしく提案してください。JSONのみ: {"hint":"ひらがな・ことばあそびで1文"}`;
      const res = await callAI(
        [{ role:'user', content: prompt }],
        'JSONのみ返してください（Markdownなし）。子どもが実践できる具体的な行動を1文で。'
      );
      const data = JSON.parse(res.replace(/```json|```/g, '').trim());
      S.tomorrowHint = data.hint || '';
    } catch(err) {
      console.error('tomorrowHint error:', err);
      S.tomorrowHint = 'あしたも、まわりのものをじっくりみてみよう！';
    }
    render();
  },

});
