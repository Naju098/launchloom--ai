import { motion } from "motion/react";
import { Store, Wrench, Lightbulb, GraduationCap, Building2, BookOpen } from "lucide-react";

const audiences = [
  { icon: Store, title: "Local shop owners", description: "Create product descriptions, customer messages and a simple sales website." },
  { icon: Wrench, title: "Service businesses", description: "For salons, repair centres, consultants, agencies, clinics and similar services." },
  { icon: Lightbulb, title: "New entrepreneurs", description: "Turn an idea into a clear business identity and launch plan." },
  { icon: GraduationCap, title: "Students and freelancers", description: "Build a professional personal brand or service website." },
  { icon: Building2, title: "Small businesses", description: "Organise products, customer enquiries and follow-ups." },
  { icon: BookOpen, title: "Training centres", description: "Prepare course catalogues, admission pages and student messages." },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function WhoIsThisFor() {
  return (
    <section className="border-y border-[var(--va-border)] bg-[var(--va-panel)]/50">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--va-green)]">
            Who is this for
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[var(--va-text)] sm:text-4xl">
            Built for people starting and growing real businesses
          </h2>
          <p className="mt-3 text-base leading-7 text-[var(--va-text-secondary)]">
            No technical or design experience needed. Just describe your business and LaunchLoom does the rest.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {audiences.map(({ icon: Icon, title, description }) => (
            <motion.article
              key={title}
              variants={cardVariants}
              whileHover={{ y: -3 }}
              className="venture-card rounded-2xl p-6"
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--va-green-dim)] text-[var(--va-green)]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-bold text-[var(--va-text)]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--va-text-secondary)]">{description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
