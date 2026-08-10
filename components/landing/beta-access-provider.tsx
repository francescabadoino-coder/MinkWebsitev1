"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

/** Paid-plan context for the renewal disclosure. The free Trial passes nothing. */
export type CheckoutPlan = {
  name: string;
  monthlyPrice: number;
  /** Per-month equivalent of the annual plan, as stored on the plan record. */
  annualMonthlyPrice: number;
  isAnnual: boolean;
};

type BetaAccessContextValue = {
  open: (plan?: CheckoutPlan) => void;
};

const BetaAccessContext = createContext<BetaAccessContextValue | null>(null);

export function useBetaAccess() {
  const ctx = useContext(BetaAccessContext);
  if (!ctx) {
    throw new Error("useBetaAccess must be used within BetaAccessProvider");
  }
  return ctx;
}

const money = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 0 })}`;

/**
 * Auto-renewal disclosure. Sits directly above the submit button so it is
 * adjacent to the consent action, is visually distinct rather than fine print,
 * and uses no pre-checked consent box.
 *
 * NOTE: this modal takes no card and makes no charge. The copy therefore
 * describes what happens when the plan actually starts, instead of claiming a
 * subscription is being created right now.
 */
function RenewalDisclosure({ plan }: { plan: CheckoutPlan }) {
  const perYear = plan.annualMonthlyPrice * 12;
  const billedAmount = plan.isAnnual ? perYear : plan.monthlyPrice;
  const period = plan.isAnnual ? "year" : "month";

  return (
    <div className="rounded-xl border border-foreground/15 bg-foreground/[0.03] p-4">
      <p className="text-sm font-medium leading-relaxed text-foreground">
        When your Mink {plan.name} plan starts, it is {money(billedAmount)} per{" "}
        {period}. Your plan renews automatically each {period} until you cancel.
        Cancel any time in account settings.
      </p>

      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
        Prefer to try first? The free Trial includes 15 visualizations with no
        card required. When you subscribe to {plan.name}, billing begins at{" "}
        {money(billedAmount)} per {period}. We send a reminder before any first
        charge.
      </p>

      {/* Order summary: tax appears as its own line item before the total. */}
      <dl className="mt-4 space-y-1.5 border-t border-foreground/10 pt-3 text-sm">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-muted-foreground">
            Mink {plan.name}, billed {plan.isAnnual ? "annually" : "monthly"}
          </dt>
          <dd className="tabular-nums text-foreground">
            {money(billedAmount)}
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-muted-foreground">Tax</dt>
          <dd className="text-muted-foreground">Calculated at checkout</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 border-t border-foreground/10 pt-1.5">
          <dt className="font-medium text-foreground">
            Total per {period}, before tax
          </dt>
          <dd className="font-medium tabular-nums text-foreground">
            {money(billedAmount)}
          </dd>
        </div>
      </dl>

      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        No card is collected on this application, and nothing is charged today.
      </p>
    </div>
  );
}

export function BetaAccessProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [plan, setPlan] = useState<CheckoutPlan | undefined>(undefined);

  const open = (nextPlan?: CheckoutPlan) => {
    setPlan(nextPlan);
    setSubmitted(false);
    setIsOpen(true);
  };

  const handleOpenChange = (next: boolean) => {
    setIsOpen(next);
    // Reset the success state after the close animation finishes
    if (!next) setTimeout(() => setSubmitted(false), 300);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <BetaAccessContext.Provider value={{ open }}>
      {children}

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto rounded-2xl">
          {submitted ? (
            <div className="flex flex-col items-center py-6 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                <CheckCircle2 className="h-7 w-7" />
              </span>
              <DialogHeader className="mt-5 items-center">
                <DialogTitle className="font-display text-2xl tracking-tight">
                  Thanks for applying.
                </DialogTitle>
                <DialogDescription className="mt-2 text-base leading-relaxed">
                  Your application is in. We&apos;ll email you as soon as
                  you&apos;re approved.
                </DialogDescription>
              </DialogHeader>
              <Button
                onClick={() => handleOpenChange(false)}
                className="mt-6 rounded-full px-8"
              >
                Done
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-accent">
                  <Sparkles className="h-3 w-3" />
                  Private beta
                </span>
                <DialogTitle className="font-display text-2xl tracking-tight">
                  Apply for access
                </DialogTitle>
                <DialogDescription className="leading-relaxed">
                  Mink is in private beta. Tell us about your studio and
                  we&apos;ll be in touch.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="mt-2 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="beta-name">Name</Label>
                  <Input id="beta-name" name="name" required placeholder="Jane Designer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="beta-phone">Business phone number</Label>
                  <Input
                    id="beta-phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="(555) 000-0000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="beta-email">Email address</Label>
                  <Input
                    id="beta-email"
                    name="email"
                    type="email"
                    required
                    placeholder="jane@studio.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="beta-website">Business website</Label>
                  <Input
                    id="beta-website"
                    name="website"
                    type="url"
                    required
                    placeholder="https://studio.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="beta-linkedin">
                    LinkedIn profile{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Input
                    id="beta-linkedin"
                    name="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/jane"
                  />
                </div>

                {plan && <RenewalDisclosure plan={plan} />}

                <Button
                  type="submit"
                  className="mt-2 w-full rounded-full group h-11 bg-cta text-cta-foreground hover:bg-cta/90"
                >
                  Submit application
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </BetaAccessContext.Provider>
  );
}
