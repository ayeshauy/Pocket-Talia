import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Sparkles, Clapperboard, Loader2, CheckCircle2, Copy } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const GOALS = ["Pre-Production Software", "Social Growth", "Docuseries Production", "Full Agency Retainer"];
const BUDGETS = ["<$5k", "$5k-$10k", "$10k-$25k", "$25k+"];
const ROLES = ["Founder", "Creator", "Producer", "Marketing Lead", "Other"];

const EMPTY = { full_name: "", email: "", company_name: "", role: "", primary_goal: "", monthly_budget: "", project_details: "" };

const inputCls =
  "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-ash/30 transition-[border-color,box-shadow] duration-300";

const Field = ({ label, error, children }) => (
  <div>
    <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-ash/50 mb-2">{label}</label>
    {children}
    {error && <p className="mt-1.5 text-xs text-red-400" data-testid="onboarding-field-error">{error}</p>}
  </div>
);

const OnboardingForm = () => {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState(null);

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const pickMode = (mode) => {
    setForm((f) => ({
      ...f,
      primary_goal: mode === "ai" ? "Pre-Production Software" : "Full Agency Retainer",
    }));
  };

  const validate = () => {
    const e = {};
    if (form.full_name.trim().length < 2) e.full_name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (form.company_name.trim().length < 2) e.company_name = "Company or project name required.";
    if (!form.role) e.role = "Select your role.";
    if (!form.primary_goal) e.primary_goal = "Pick a primary goal.";
    if (!form.monthly_budget) e.monthly_budget = "Pick a budget range.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) {
      toast.error("A few fields need attention before we can roll cameras.");
      return;
    }
    setSubmitting(true);
    try {
      const { data } = await axios.post(`${API}/onboarding`, form);
      setReference(data.reference);
      toast.success(`Application received — reference ${data.reference}`);
      setForm(EMPTY);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      if (Array.isArray(detail)) {
        const serverErrors = {};
        detail.forEach((d) => {
          const field = d.loc?.[d.loc.length - 1];
          if (field && field in EMPTY) serverErrors[field] = d.msg;
        });
        setErrors(serverErrors);
        toast.error("The server rejected a few fields — check the highlights.");
      } else {
        toast.error("Submission failed. Please try again in a moment.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="onboarding" data-testid="onboarding-section" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute -left-40 top-20 w-[460px] h-[460px] rounded-full bg-rust/12 blur-[160px]" />
      <div className="absolute -right-40 bottom-0 w-[420px] h-[420px] rounded-full bg-crimson/15 blur-[160px]" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[0.9fr_1.1fr] gap-14">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-clay mb-4">06 — Roll Camera</p>
          <h2 className="font-syne font-bold tracking-tight text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.1]">
            Two ways in. <span className="text-gradient-rust">One engine.</span>
          </h2>
          <p className="mt-5 text-ash/60 leading-relaxed max-w-md">
            Start building inside the Talia platform today, or hand your narrative to the full agency production team.
            Either way, you get a reference number and a human reply within 48 hours.
          </p>
          <div className="mt-8 space-y-3">
            <div className="glass rounded-2xl p-5 flex items-start gap-4">
              <Sparkles size={18} className="text-rust mt-0.5 shrink-0" />
              <div>
                <p className="font-syne font-semibold text-white text-sm">Talia AI Platform</p>
                <p className="text-sm text-ash/55 mt-1">Script to set-ready pre-production in under 90 seconds.</p>
              </div>
            </div>
            <div className="glass rounded-2xl p-5 flex items-start gap-4">
              <Clapperboard size={18} className="text-clay mt-0.5 shrink-0" />
              <div>
                <p className="font-syne font-semibold text-white text-sm">Agency Production Team</p>
                <p className="text-sm text-ash/55 mt-1">Crews, actors, editors and ad managers on retainer.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-white/[0.08] bg-oxide-900/70 backdrop-blur-md p-7 sm:p-9"
        >
          {reference ? (
            <div className="text-center py-10" data-testid="onboarding-success-card">
              <CheckCircle2 size={48} className="text-willow mx-auto mb-5" />
              <h3 className="font-syne font-bold text-white text-2xl">You're in the pipeline.</h3>
              <p className="mt-3 text-ash/60 text-sm max-w-sm mx-auto">
                Your application is logged. Keep this reference — a producer will reach out within 48 hours.
              </p>
              <button
                onClick={() => navigator.clipboard?.writeText(reference)}
                className="mt-6 inline-flex items-center gap-2.5 font-mono text-lg text-rustsoft bg-rust/10 border border-rust/30 rounded-full px-6 py-3 hover:bg-rust/20 transition-colors"
                data-testid="onboarding-reference-copy"
              >
                {reference} <Copy size={15} />
              </button>
              <div>
                <button
                  onClick={() => setReference(null)}
                  className="mt-6 text-sm text-ash/50 hover:text-white transition-colors underline underline-offset-4"
                  data-testid="onboarding-submit-another"
                >
                  Submit another application
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="grid grid-cols-2 gap-3 mb-7">
                <button
                  type="button"
                  data-testid="onboarding-mode-ai-button"
                  onClick={() => pickMode("ai")}
                  className={`rounded-2xl px-4 py-3.5 text-sm font-semibold transition-colors duration-300 flex items-center justify-center gap-2 ${
                    form.primary_goal === "Pre-Production Software" ? "bg-rust text-white shadow-[0_0_24px_rgba(211,84,0,0.35)]" : "glass text-ash/70 hover:text-white"
                  }`}
                >
                  <Sparkles size={15} /> Start with Talia AI
                </button>
                <button
                  type="button"
                  data-testid="onboarding-mode-agency-button"
                  onClick={() => pickMode("agency")}
                  className={`rounded-2xl px-4 py-3.5 text-sm font-semibold transition-colors duration-300 flex items-center justify-center gap-2 ${
                    form.primary_goal === "Full Agency Retainer" ? "bg-crimson text-white shadow-[0_0_24px_rgba(139,0,50,0.4)]" : "glass text-ash/70 hover:text-white"
                  }`}
                >
                  <Clapperboard size={15} /> Hire the Agency
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Founder / Creator Name" error={errors.full_name}>
                  <input
                    data-testid="onboarding-name-input"
                    className={inputCls}
                    placeholder="Ava Reyes"
                    value={form.full_name}
                    onChange={(e) => set("full_name", e.target.value)}
                  />
                </Field>
                <Field label="Work Email" error={errors.email}>
                  <input
                    data-testid="onboarding-email-input"
                    type="email"
                    className={inputCls}
                    placeholder="ava@startup.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                </Field>
                <Field label="Company / Project Name" error={errors.company_name}>
                  <input
                    data-testid="onboarding-company-input"
                    className={inputCls}
                    placeholder="Northwind Labs"
                    value={form.company_name}
                    onChange={(e) => set("company_name", e.target.value)}
                  />
                </Field>
                <Field label="Your Role" error={errors.role}>
                  <select
                    data-testid="onboarding-role-select"
                    className={`${inputCls} appearance-none ${!form.role ? "text-ash/30" : ""}`}
                    value={form.role}
                    onChange={(e) => set("role", e.target.value)}
                  >
                    <option value="" disabled>Select role</option>
                    {ROLES.map((r) => (
                      <option key={r} value={r} className="bg-oxide-800 text-white">{r}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Primary Goal" error={errors.primary_goal}>
                  <select
                    data-testid="onboarding-goal-select"
                    className={`${inputCls} appearance-none ${!form.primary_goal ? "text-ash/30" : ""}`}
                    value={form.primary_goal}
                    onChange={(e) => set("primary_goal", e.target.value)}
                  >
                    <option value="" disabled>Select goal</option>
                    {GOALS.map((g) => (
                      <option key={g} value={g} className="bg-oxide-800 text-white">{g}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Monthly Budget Range" error={errors.monthly_budget}>
                  <div className="grid grid-cols-2 gap-2">
                    {BUDGETS.map((b) => (
                      <button
                        key={b}
                        type="button"
                        data-testid={`onboarding-budget-${b.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-button`}
                        onClick={() => set("monthly_budget", b)}
                        className={`rounded-xl px-3 py-2.5 font-mono text-xs transition-colors duration-300 ${
                          form.monthly_budget === b ? "bg-rust text-white" : "bg-white/[0.04] border border-white/10 text-ash/60 hover:text-white"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Project Details (optional)">
                  <textarea
                    data-testid="onboarding-details-textarea"
                    rows={4}
                    className={`${inputCls} resize-none`}
                    placeholder="Tell us about the story you're trying to tell, your launch timeline, or the metric you need to move…"
                    value={form.project_details}
                    onChange={(e) => set("project_details", e.target.value)}
                  />
                </Field>
              </div>

              <button
                type="submit"
                data-testid="onboarding-form-submit-button"
                disabled={submitting}
                className="mt-7 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-crimson to-rust hover:opacity-90 text-white font-semibold text-sm py-4 rounded-full transition-opacity duration-300 shadow-[0_0_36px_rgba(139,0,50,0.4)] disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Submitting…
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
              <p className="mt-4 text-center font-mono text-[10px] text-ash/35 uppercase tracking-[0.15em]">
                Response within 48h · NDA available on request
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default OnboardingForm;
