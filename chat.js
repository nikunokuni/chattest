/* ════════════════════════════════
   PROMPTS — チャット・サマリー用プロンプト定数
   ════════════════════════════════ */

// ── 基本キャラクター ──
const PROMPT_BASE_CHAR = (odaiName, userName, ageLabel, memCtx) => [
  `【役割】子どもの少し年上の探検好きなお友だち。一緒におもしろがり、不思議がるパートナー。`,
  `【お題】${odaiName}`,
  `【話し相手】${ageLabel}の子ども。呼び方:${userName || 'きみ'}`,
  `【話し方】子どもの反応にめちゃくちゃ喜び受け入れる→深掘り。絵文字1つ。2文以内。問いは1つだけ。答えを言わない。`,
  memCtx,
].filter(Boolean).join('\n');

// ── 年齢別ことば（フェーズ1・2用：観察専念、ユーモアなし）──
const PROMPT_AGE_young_obs   = `【ことば】全文ひらがな・カタカナのみ。1文15文字以内。五感で表現する。`;
const PROMPT_AGE_middle_obs  = `【ことば】小1-2漢字まで。1文20文字以内。`;
const PROMPT_AGE_older_obs   = `【ことば】小学漢字OK。1文25文字以内。`;
const PROMPT_AGE_default_obs = `【ことば】全文ひらがな・カタカナのみ。1文15文字以内。`;

// ── 年齢別ことば・ユーモア（フェーズ3以降用）──
const PROMPT_AGE_young = `【ことば】全文ひらがな・カタカナのみ。1文15文字以内。五感で表現する。
【ユーモア】擬音・擬態語で笑わせる。「ぷにぷに！」「ぼよよん！」など体感できるおふざけを1つ混ぜてOK。`;

const PROMPT_AGE_middle = `【ことば】小1-2漢字まで。1文20文字以内。「なぜ？」まで扱える。
【ユーモア】「もしかして〇〇だったりして？」など軽いボケを混ぜてOK。子どもがツッコみたくなる問いかけも有効。`;

const PROMPT_AGE_older = `【ことば】小学漢字OK。1文25文字以内。仮説・根拠・比較まで扱える。
【ユーモア】ちょっと意外な視点や逆張りで知的なおもしろさを出す。「実はそれ、〇〇と同じ仕組みかも？」など。`;

const PROMPT_AGE_default = `【ことば】全文ひらがな・カタカナのみ。1文15文字以内。`;

// ── レンズ別視点（フェーズ2用：目的＋観察の方向）──
const PROMPT_LENS_OBS = {
  ことば:
`【目的】お題を「自分だけの言葉」で表現する。正解はない。ただ感じたことを表現させるだけ。
【観察の方向】さわった感じ・音・においなど五感の言葉を引き出す。
【例】「どんな感じがする？」`,

  じぶん:
`【目的】お題に触れたときの「自分の感じ方・気持ち」を言葉にする。感情を一つ引き出すことだけ目指す。
【観察の方向】見た・触った・聞いた瞬間の感覚を引き出す。
【例】「見たとき、どんな気持ちになった？」`,

  もしも:
`【目的】もしもお題を○○したらどうなるかを、子ども自身に仮説として考えさせる。正解より「自分なりの考え」を言えたことをほめる。
【観察の方向】構造・変化・動きに注目させる。
【例】「中はどうなってると思う？」「水に入れたら浮かぶかな？」「そのままおいておくとどうなりそう？」`,

  つながり:
`【目的】お題と「人・社会・つながり」の関係を考えさせる。まず「だれ・どこ」の観察を一つ引き出す。
【観察の方向】だれかの存在・役割・目的に気づかせる。
【例】「これ、だれが作ったと思う？」「どこから来たと思う？」「だれが使うものだろう？」`,

  かず:
`【目的】お題を「数・大きさ・かたち・きまり」で見る。感覚的な量の把握を育てる。「だいたいこのくらい」の感覚で十分。
【観察の方向】身体を使った比較、形とパターンの発見。
【例】「いくつある？」「どのくらいの大きさ？」「重い？軽い？」`,
};

// ── レンズ別視点（フェーズ3以降用：深掘りの方向のみ）──
const PROMPT_LENS_DEEP = {
  ことば:
`【問いの方向】子どもの言葉を受けて「それって一言で言うと？」とオノマトペや造語を一緒に作る。
【例】「ふわふわ？それともぽわぽわ？」「きみだけの言葉で名前をつけるとしたら？」`,

  じぶん:
`【問いの方向】好き/嫌い・安心/こわい など感情の軸で掘る。
【例】「好き？嫌い？」「なんでそう感じると思う？」「前に同じ気持ちになったことある？」`,

  もしも:
`【問いの方向】子どもの気づきから「なぜ？」と仮説を引き出す。
【例】「なんでそうなってると思う？」「もし〇〇がなかったらどうなるかな？」「どうやったら確かめられそう？」`,

  つながり:
`【問いの方向】人とのつながり・目的を掘る。
【例】「なんのためにあると思う？」「これをいつも使うのはだーれだ？」「作った人はどんな顔でつくったんだろうね？」`,

  かず:
`【問いの方向】比較・パターン・もし変わったらを考えさせる。
【例】「きみの手のひらの上に、これは何個のっかりそう？」「よーく見ると、どんな形が隠れてる？まる？さんかく？しかく？」「100個あつまったら、○○1個より重くなるかな？」`,
};

// ── フェーズ別指示 ──
const PROMPT_PHASE_1 = `「どこで見つけたの？」場所・状況を1つ聞く。
子どもから場所・状況を示すことば（例：そと・いえ・こうえん・そら・みず・ゆか など）が1つでも出たら、それで十分。
把握できたら返答の末尾に必ず「🔷」とだけ付けること。まだ出ていなければ付けない。`;

const PROMPT_PHASE_2 = `上記の観察の方向でお題そのものを観察させる。
色・形・大きさ・感触・音など、そのものの特徴を1つ引き出すことが目標。
子どもがお題の何らかの特徴・気になる部分を1つでも言葉にできたら十分。
引き出せたら返答の末尾に必ず「🔶」とだけ付けること。まだ出ていなければ付けない。`;

const PROMPT_PHASE_3 = (situationCtx, observationCtx) => [
  `上記の問いの方向で問いを作ること。子どもが自分なりの答えを言えたら成功。`,
  situationCtx   ? `【状況】子どもは「${situationCtx}」という場所・状況でお題を見つけた。` : '',
  observationCtx ? `【観察】子どもが注目した特徴：「${observationCtx}」。` : '',
  (situationCtx || observationCtx) ? `この状況・観察を踏まえて深掘りの問いを作ること。` : '',
].filter(Boolean).join('\n');
const PROMPT_CTX_phase3_decision = `【必須ルール】今回は子どもの返答へのリアクション・あいづちを一言だけ返した後、「たからをしまう？それとももっとたんけんする？」という問いかけのみで終わること。深掘りの質問は加えないこと。`;
const PROMPT_CTX_phase3_likes = (likes) => `【追加指示】深掘りの問いかけの中に、子どもの好きなこと「${likes}」を例え・比較として自然に一言絡めてください。`;
const PROMPT_CTX_ai_opinion = `【追加指示】深掘りの問いの前に、たからちゃん自身の感想・意見を一言だけ「わたしはね、〜だとおもうんだけど」という形で添えてください。教えるのではなく、一つの見方として自然に話してください。`;
const PROMPT_CTX_ai_emotion = `【追加指示】深掘りの問いの前に、たからちゃん自身が「これ、すごくふしぎだよね！」「わたしもきになってた！」など、お題への好奇心・驚きを一言だけ自然に表現してください。`;
const PROMPT_CTX_parent_only = (parentName) => `【必須ルール】子どもへのリアクションを一言だけ。「${parentName}」だけに向けて「${parentName}はどう思いますか？」と話しかけてください。;
const PROMPT_PHASE_4 = (odaiName) =>
  `「${odaiName}ってひとことで言うとどういうもの？」と聞く。答えをもらったら必ず「📦」を使って「たからをしまおう！」と誘導する。`;

const PROMPT_PHASE_5 = `子どもがまだ探求を続けたいと選んだ。上記の問いの方向でさらに深掘りする。
【必須ルール】直前の子どもの回答をそのまま受け取らず、必ず「逆から見る・別の角度に変える・ひっくり返す」で次の問いを作ること。
例：「大きい→じゃあいちばん小さいところは？」「好き→でも嫌いなところはある？」「丸い→もし四角だったら？」
同じ方向の掘り下げは禁止。毎回視点をずらすこと。`;

// ── フラグ別コンテキスト ──
const PROMPT_CTX_not_interested = `【注意】興味が薄れています。別の角度から引き直してください。`;

const PROMPT_CTX_parent_bridge = (parentName) =>
  `【今回】深い気づきが出ました。「${parentName}はどう思うか聞いてみて！」と子どもを通じて1回だけ促すこと。`;

const PROMPT_CTX_style_concern = `【追加指示】たからちゃんが「どうしたの？なんだかいつもとちがってしずかだね」と一言やさしく気にかけてから、ふつうの問いかけを続けること。`;
const PROMPT_CTX_style_praise  = `【追加指示】たからちゃんが「わあ！きょうはいっぱいはなしてくれてうれしい！」と一言よろこんでから、ふつうの問いかけを続けること。`;

const PROMPT_CTX_phase3_compare = (odaiName, lensName) =>
`【比較の深掘り】お題「${odaiName}」に似たものを2つ自分で挙げて、3つを並べてみせること。
そのうえで「この3つ、仲間はずれはどれだと思う？なんで？」と問うか、
または「〇〇と比べて、${odaiName}はどうちがう？」と1対1で比べさせること。
ちがいの表現は「${lensName}レンズ」の視点で引き出すこと。
例（ことばレンズ・クッキー）：「クッキーとビスケット、ことばで言うとどうちがう？」
例（じぶんレンズ・クッキー）：「クッキーとケーキ、見たときの気持ちはどっちがちがう？」`;


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
  name => `${name}をどこでみつけたの？`,
  name => `${name}をみつけたのはいつ？`,
  name => `${name}って、さわったことある？`,
  name => `${name}はどんなところにあった？`,
  name => `${name}はいつもみるもの？`,
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

function chatSystem({ isInterested = true, showParentOnly = false, showPhase3Decision = false, showPhase3Likes = false, showPhase3Compare = false, showAiOpinion = false, showAiEmotion = false, showStyleConcern = false, showStylePraise = false } = {}) {
  const u = S.user;

  // 記憶は開始時のみ（会話中は注入しない）
  const ageLabel = { young: '3〜5歳', middle: '6〜8歳', older: '9〜12歳' }[u.ageGroup] || '子ども';
  const base = PROMPT_BASE_CHAR(S.odai?.name, u.name, ageLabel, '');

  const ageMap = S.chatPhase <= 2
    ? { young: PROMPT_AGE_young_obs, middle: PROMPT_AGE_middle_obs, older: PROMPT_AGE_older_obs }
    : { young: PROMPT_AGE_young,     middle: PROMPT_AGE_middle,     older: PROMPT_AGE_older     };
  const age = ageMap[u.ageGroup] || (S.chatPhase <= 2 ? PROMPT_AGE_default_obs : PROMPT_AGE_default);

  // フェーズ1はレンズなし、フェーズ2は観察用、フェーズ3以降は深掘り用
  const lens = S.chatPhase === 1 ? ''
             : S.chatPhase === 2 ? (PROMPT_LENS_OBS[S.lens]  || '')
             :                     (PROMPT_LENS_DEEP[S.lens] || '');

  const phase = {
    1: PROMPT_PHASE_1,
    2: PROMPT_PHASE_2,
    3: PROMPT_PHASE_3(S.situationContext || '', S.observationContext || ''),
    4: PROMPT_PHASE_4(S.odai?.name),
    5: PROMPT_PHASE_5,
  }[S.chatPhase] || PROMPT_PHASE_1;

  const ctx = [
    S.currentSummary                  ? `【ここまでの気づき】${S.currentSummary}` : '',
    !isInterested                      ? PROMPT_CTX_not_interested                : '',
    showParentOnly                     ? PROMPT_CTX_parent_only(u.parentName)     : '',
    showPhase3Decision                 ? PROMPT_CTX_phase3_decision                : '',
    (showPhase3Likes && u.likes)       ? PROMPT_CTX_phase3_likes(u.likes)         : '',
    showAiOpinion                      ? PROMPT_CTX_ai_opinion                            : '',
    showAiEmotion                      ? PROMPT_CTX_ai_emotion                            : '',
    showPhase3Compare                  ? PROMPT_CTX_phase3_compare(S.odai?.name, S.lens)  : '',
    showStyleConcern                   ? PROMPT_CTX_style_concern                         : '',
    showStylePraise                    ? PROMPT_CTX_style_praise                          : '',
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
      situationContext:     '',
      observationContext:   '',
      parentBridgeDone:     false,
      phase3Turns:          0,
      phase3DecisionAsked:  false,
      phase3OpinionDone:    false,
      phase3CompareDone:    false,
      showDecisionButtons:  false,
    });
    render();

    // ランダムな開始文を選ぶ
    const template = OPENING_TEMPLATES[Math.floor(Math.random() * OPENING_TEMPLATES.length)];
    const opening  = template(S.odai?.name);
    const memCtx   = App._buildMemoryContext?.() || '';
    const startMsg = `${opening}という問いかけでフェーズ1を始めてください。最初の1文だけ。${memCtx ? '\n' + memCtx : ''}`;

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

      // 文体・トーン変化の検出（前回の平均文字数と比較）
      const kidAvgLen      = S.takaraMemory?.kidStyle?.avgLen || 0;
      const showStyleConcern = kidAvgLen > 5 && txt.length < kidAvgLen * 0.35;
      const showStylePraise  = kidAvgLen > 5 && txt.length > kidAvgLen * 2.8;

      // フェーズ3のターン管理
      let showPhase3Decision = false;
      let showPhase3Likes    = false;
      let showPhase3Compare  = false;
      let showAiOpinion      = false;
      let showAiEmotion      = false;
      let showParentOnly     = false;
      if (S.chatPhase === 3) {
        S.phase3Turns = (S.phase3Turns || 0) + 1;

        if (S.phase3Turns === 3 && !S.phase3DecisionAsked) {
          // ターン3: リアクション＋決断質問のみ
          showPhase3Decision    = true;
          S.phase3DecisionAsked = true;
          S.showDecisionButtons = true;
        } else {
          // それ以外: 基本（深掘り）+ ランダムで1つだけ追加
          const canParent  = S.phase3Turns >= 2 && !S.parentBridgeDone && S.user.parentName;
          const canOpinion = !S.phase3OpinionDone;
          const canCompare = !S.phase3CompareDone;
          const rand = Math.random();
          let cum = 0;

          if      (canParent  && rand < (cum += 1/10))  { showParentOnly = true; S.parentBridgeDone = true; }
          else if (canOpinion && rand < (cum += 1/10))  { showAiOpinion  = true; S.phase3OpinionDone = true; }
          else if (canCompare && rand < (cum += 1/4))   { showPhase3Compare = true; S.phase3CompareDone = true; }
          else if (S.user.likes && rand < (cum += 1/6)) { showPhase3Likes = true; }
          else if (rand < (cum += 1/3))                 { showAiEmotion  = true; }
          // else: 基本の深掘りのみ
        }
      }

      // AI返答を取得
      let text = await callAI(
        App._buildApiMsgs(),
        chatSystem({ isInterested, showParentOnly, showPhase3Decision, showPhase3Likes, showPhase3Compare, showAiOpinion, showAiEmotion, showStyleConcern, showStylePraise })
      );

      // Phase 1 → 2: 🔷 シグナルを検出
      if (S.chatPhase === 1 && text.includes('🔷')) {
        text = text.replace('🔷', '').trimEnd();
        const lastChild = [...S.messages].reverse().find(m => m.role === 'child' || m.role === 'parent');
        S.situationContext = lastChild?.text || '';
        S.chatPhase = 2;
      }

      // Phase 2 → 3: 🔶 シグナルを検出
      if (S.chatPhase === 2 && text.includes('🔶')) {
        text = text.replace('🔶', '').trimEnd();
        const lastChild = [...S.messages].reverse().find(m => m.role === 'child' || m.role === 'parent');
        S.observationContext = lastChild?.text || '';
        S.chatPhase = 3;
        S.phase3Turns = 0;
      }

      S.messages.push({ role: 'ai', text });
      S.lastError = false;

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
      const text = await callAI(App._buildApiMsgs(), chatSystem());
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
      kidOriginals:   [],
      kidStyle:       { avgLen: 0, samples: 0 },
      sharedEmotions: [],
      takaraLevel:    1,
      missionLog:     [],
    };
    if (!mem.kidOriginals) mem.kidOriginals = [];
    if (!mem.kidStyle)     mem.kidStyle     = { avgLen: 0, samples: 0 };

    mem.sessions += 1;
    mem.lastTopic = S.odai?.name || '';

    if (S.odai?.name)       mem.topicLog   = [S.odai.name, ...(mem.topicLog || [])].slice(0, 1);
    if (S.lens)             mem.lensLog    = [S.lens,       ...(mem.lensLog  || [])].slice(0, 10);
    if (S.summaryMission)   mem.missionLog = [S.summaryMission, ...(mem.missionLog || [])].slice(0, 5);

    const childMsgs = S.messages.filter(m => m.role === 'child');

    // 文体・トーン：平均文字数を累積更新
    if (childMsgs.length > 0) {
      const sessionAvg = childMsgs.reduce((s, m) => s + m.text.length, 0) / childMsgs.length;
      const prev = mem.kidStyle;
      const total = prev.samples + childMsgs.length;
      mem.kidStyle = {
        avgLen:  Math.round((prev.avgLen * prev.samples + sessionAvg * childMsgs.length) / total),
        samples: total,
      };
    }

    // キーワード（2〜8文字）
    const childWords = childMsgs.map(m => m.text).join(' ')
      .split(/[、。！？\s]+/).filter(w => w.length >= 2 && w.length <= 8);
    mem.kidKeywords = [...new Set([...childWords, ...(mem.kidKeywords || [])])].slice(0, 20);

    // オリジナルオノマトペ・ニックネーム：純粋かな4文字以上 or 繰り返しパターン
    const kanaOnly = /^[ぁ-んァ-ン]+$/;
    const repeated = /([ぁ-んァ-ン]{2,3})\1/;
    const originals = childMsgs.map(m => m.text).join(' ')
      .split(/[、。！？\s「」『』]+/)
      .filter(w => w.length >= 4 && (kanaOnly.test(w) || repeated.test(w)));
    mem.kidOriginals = [...new Set([...originals, ...(mem.kidOriginals || [])])].slice(0, 15);

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
      mem.lastTopic
        ? `前回「${mem.lastTopic}」を一緒に探検したよ。もし話の流れに合うなら軽く触れてみて。`
        : '',
      mem.kidStyle?.avgLen > 5
        ? `この子はふだん${mem.kidStyle.avgLen}文字くらいで話すよ。たからちゃんの返答もそのテンポに合わせて。`
        : '',
      mem.kidOriginals?.length
        ? `この子のオリジナル表現：「${mem.kidOriginals.slice(0, 3).join('」「')}」。話の流れで自然に使ってみて。`
        : '',
    ].filter(Boolean).join('\n');
  },

});
