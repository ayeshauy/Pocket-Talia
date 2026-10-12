import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Clapperboard, CheckCircle2, Send, CircleCheck } from "lucide-react";

const DIRECTOR_IMG =
  "https://images.unsplash.com/photo-1587050265310-1a2d98ccce5f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxmaWxtbWFrZXIlMjBjYW1lcmElMjBwcm9kdWN0aW9uJTIwc3RhcnR1cCUyMGZvdW5kZXJ8ZW58MHx8fHwxNzkxNzgyOTY4fDA&ixlib=rb-4.1.0&q=85";

const PROMPTS = [
  { id: "docu", label: "Pitch Tech Docuseries Scene", reply: "Drafted SCENE 12 — INT. FOUNDER LOFT, NIGHT. Cold open on a whiteboard of failed pivots. VO: 'Every unicorn has a graveyard of versions.' Want a shot list and 2-day budget breakdown next?" },
  { id: "budget", label: "Budget $15k 2-Day Shoot", reply: "Budget locked: $15,000 across 2 shoot days. Crew 6, RED Komodo package, 1 location permit, talent x2. Contingency 10%. Call sheet draft generated — review in the Pipeline tab." },
  { id: "hook", label: "Rewrite Hook for TikTok Viral", reply: "3 hook variants ready. Top pick (87% predicted 3s retention): 'We burned $40k on ads before we filmed a single organic video. Here's what changed.' Push to script?" },
];

const SHOTS = [
  { scene: "SC 01 — Cold Open", shot: "Extreme CU — founder eyes", lens: "85mm", move: "Static / locked", light: "Single practical, tungsten" },
  { scene: "SC 01 — Cold Open", shot: "WS loft whiteboard pan", lens: "24mm", move: "Slow gimbal arc", light: "Window + neg fill" },
  { scene: "SC 04 — War Room", shot: "OTS laptop analytics", lens: "50mm", move: "Push-in 12s", light: "Screen glow + edge" },
  { scene: "SC 04 — War Room", shot: "Insert — phone notification", lens: "100mm macro", move: "Rack focus", light: "Low-key amber" },
  { scene: "SC 09 — Rooftop", shot: "Drone orbit reveal", lens: "21mm", move: "360° orbit", light: "Golden hour natural" },
];

const COMMENTS = [
  { time: "00:42", author: "Maya R. — Client (CEO)", text: "Love this hook. Can we tighten the pause before the reveal?", tag: "Revision" },
  { time: "01:17", author: "Daniel K. — Investor", text: "The metric overlay here is exactly what our board needs to see.", tag: "Note" },
  { time: "02:03", author: "Maya R. — Client (CEO)", text: "Approved this cut for distribution. Ship it.", tag: "Approved" },
];

const TABS = [
  { id: "chat", label: "Talia Copilot Chat", icon: Sparkles, testid: "ai-tab-chat-button" },
  { id: "shotlist", label: "Automated Shot List", icon: Clapperboard, testid: "ai-tab-shotlist-button" },
  { id: "review", label: "Client Review Workspace", icon: CheckCircle2, testid: "ai-tab-review-button" },
];

const AISuite = () => {
  const [tab, setTab] = useState("chat");
  const [messages, setMessages] = useState([
    { from: "talia", text: "I'm Talia — your AI copilot from raw script to on-set readiness. Pick a prompt and watch the pipeline build itself." },
  ]);
  const [typing, setTyping] = useState(false);
  const [approved, setApproved] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const runPrompt = (p) => {
    if (typing) return;
    setMessages((m) => [...m, { from: "user", text: p.label }]);
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { from: "talia", text: p.reply }]);
      setTyping(false);
    }, 1400);
  };

  return (
    <section id="ai-suite" data-testid="ai-suite-section" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full bg-crimson/15 blur-[160px]" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay mb-4">01 — The SaaS Engine</p>
          <h2 className="font-syne font-bold tracking-tight text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.1]">
            One suite. Script to <span className="text-gradient-rust">set-ready</span> in minutes.
          </h2>
          <p className="mt-5 text-ash/60 leading-relaxed">
            Talia drafts, breaks down, budgets, and schedules your production — then hands clients a review link
            they can approve with a single click.
          </p>
        </motion.div>

        <div className="mt-12 flex flex-wrap gap-3">
          {TABS.map((t) => (
            <button
              key={t.id}
              data-testid={t.testid}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${
                tab === t.id ? "bg-rust text-white shadow-[0_0_24px_rgba(211,84,0,0.35)]" : "glass text-ash/70 hover:text-white"
              }`}
            >
              <t.icon size={15} />
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            {tab === "chat" && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="grid lg:grid-cols-[1fr_320px] gap-6"
              >
                <div className="rounded-3xl border border-white/[0.08] bg-oxide-900/70 overflow-hidden">
                  <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06] bg-oxide-800/60">
                    <span className="w-2.5 h-2.5 rounded-full bg-crimson" />
                    <span className="w-2.5 h-2.5 rounded-full bg-rust" />
                    <span className="w-2.5 h-2.5 rounded-full bg-willow" />
                    <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ash/50">talia-copilot — screenplay.tsx</span>
                  </div>
                  <div ref={chatRef} className="h-[380px] overflow-y-auto p-6 space-y-4" data-testid="talia-chat-window">
                    {messages.map((m, i) => (
                      <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                            m.from === "user"
                              ? "bg-rust/90 text-white rounded-br-sm"
                              : "glass text-ash/90 rounded-bl-sm"
                          }`}
                        >
                          {m.from === "talia" && (
                            <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-rust mb-1.5">Talia AI</span>
                          )}
                          {m.text}
                        </div>
                      </div>
                    ))}
                    {typing && (
                      <div className="flex justify-start">
                        <div className="glass rounded-2xl rounded-bl-sm px-5 py-3.5 flex gap-1.5">
                          {[0, 1, 2].map((d) => (
                            <motion.span
                              key={d}
                              className="w-1.5 h-1.5 rounded-full bg-clay"
                              animate={{ opacity: [0.2, 1, 0.2] }}
                              transition={{ duration: 1, repeat: Infinity, delay: d * 0.18 }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash/50 px-1">Preset directives</p>
                  {PROMPTS.map((p) => (
                    <button
                      key={p.id}
                      data-testid={`talia-prompt-${p.id}-button`}
                      onClick={() => runPrompt(p)}
                      className="w-full text-left glass hover:bg-white/[0.07] rounded-2xl px-5 py-4 transition-colors duration-300 group"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-ash/90">{p.label}</span>
                        <Send size={14} className="text-rust shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </button>
                  ))}
                  <p className="text-xs text-ash/40 px-1 leading-relaxed">
                    Drafts, rewrites, pacing fixes and element breakdowns — generated in-editor without leaving your script.
                  </p>
                </div>
              </motion.div>
            )}

            {tab === "shotlist" && (
              <motion.div
                key="shotlist"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl border border-white/[0.08] bg-oxide-900/70 overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash/50">Auto-generated from "How to Startup" — Ep 4 draft</span>
                  <span className="font-mono text-[11px] text-rust">Generated in 87s</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left font-mono text-[10px] uppercase tracking-[0.2em] text-ash/40 border-b border-white/[0.06]">
                        <th className="px-6 py-3.5 font-medium">Scene</th>
                        <th className="px-6 py-3.5 font-medium">Shot</th>
                        <th className="px-6 py-3.5 font-medium">Lens</th>
                        <th className="px-6 py-3.5 font-medium">Movement</th>
                        <th className="px-6 py-3.5 font-medium">Lighting</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SHOTS.map((s, i) => (
                        <motion.tr
                          key={i}
                          initial={{ opacity: 0, x: -14 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.08 }}
                          className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors"
                        >
                          <td className="px-6 py-4 text-clay font-medium whitespace-nowrap">{s.scene}</td>
                          <td className="px-6 py-4 text-ash/90">{s.shot}</td>
                          <td className="px-6 py-4 font-mono text-rustsoft">{s.lens}</td>
                          <td className="px-6 py-4 text-ash/70">{s.move}</td>
                          <td className="px-6 py-4 text-ash/70">{s.light}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 flex flex-wrap gap-2">
                  {["Script tagged", "Elements broken down", "Characters mapped", "Locations scouted", "Call sheet queued"].map((chip) => (
                    <span key={chip} className="flex items-center gap-1.5 text-xs text-willow bg-willow/10 border border-willow/25 rounded-full px-3 py-1.5">
                      <CircleCheck size={12} /> {chip}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {tab === "review" && (
              <motion.div
                key="review"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6"
              >
                <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] group">
                  <img src={DIRECTOR_IMG} alt="Client review cut — Ep 4" className="w-full h-[380px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-oxide-950/95 via-oxide-950/20 to-transparent" />
                  <div className="absolute top-4 left-4 glass rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-clay">
                    Review link · view-only · expires in 6d
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <div className="h-1 rounded-full bg-white/15 overflow-hidden mb-3">
                      <div className="h-full w-[38%] bg-gradient-to-r from-crimson to-rust rounded-full" />
                    </div>
                    <div className="flex items-center justify-between font-mono text-[11px] text-ash/70">
                      <span>00:47 / 02:03 — EP4_FINAL_v3.mp4</span>
                      <span>1080p proxy</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl border border-white/[0.08] bg-oxide-900/70 p-6 flex flex-col">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash/50 mb-4">Timestamped feedback</p>
                  <div className="space-y-4 flex-1">
                    {COMMENTS.map((c, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + i * 0.12 }}
                        className="glass rounded-2xl p-4"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-mono text-[11px] text-rust">{c.time}</span>
                          <span
                            className={`text-[10px] font-mono uppercase tracking-[0.15em] px-2 py-0.5 rounded-full ${
                              c.tag === "Approved"
                                ? "bg-willow/15 text-willow border border-willow/30"
                                : c.tag === "Revision"
                                ? "bg-rust/15 text-rustsoft border border-rust/30"
                                : "bg-white/5 text-ash/60 border border-white/10"
                            }`}
                          >
                            {c.tag}
                          </span>
                        </div>
                        <p className="text-xs text-ash/50 mb-1">{c.author}</p>
                        <p className="text-sm text-ash/85 leading-relaxed">{c.text}</p>
                      </motion.div>
                    ))}
                  </div>
                  <button
                    data-testid="review-approve-button"
                    onClick={() => setApproved(!approved)}
                    className={`mt-5 w-full py-3 rounded-full text-sm font-semibold transition-colors duration-300 ${
                      approved ? "bg-willow text-white" : "bg-crimson hover:bg-crimson/80 text-white shadow-[0_0_24px_rgba(139,0,50,0.4)]"
                    }`}
                  >
                    {approved ? "Media Approved — Locked for Distribution" : "Approve Media"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AISuite;
