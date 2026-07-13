"use client";

import { useState, useMemo } from "react";
import { Calculator, TrendingDown, DollarSign, Percent, Calendar } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

type ViewMode = "summary" | "amortization";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const formatShort = (value: number) => {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
};

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(1.2);
  const [insurance, setInsurance] = useState(1200);
  const [view, setView] = useState<ViewMode>("summary");

  const calc = useMemo(() => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    const monthlyPI =
      monthlyRate === 0
        ? principal / numPayments
        : (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
          (Math.pow(1 + monthlyRate, numPayments) - 1);

    const monthlyTax = (homePrice * (propertyTax / 100)) / 12;
    const monthlyInsurance = insurance / 12;
    const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance;
    const totalPaid = monthlyPI * numPayments;
    const totalInterest = totalPaid - principal;
    const downPct = ((downPayment / homePrice) * 100).toFixed(1);

    // Amortization schedule (yearly summary)
    const amortization: {
      year: number;
      principal: number;
      interest: number;
      balance: number;
    }[] = [];
    let balance = principal;
    for (let year = 1; year <= loanTerm; year++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;
      for (let m = 0; m < 12; m++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = monthlyPI - interestPayment;
        yearlyInterest += interestPayment;
        yearlyPrincipal += principalPayment;
        balance -= principalPayment;
      }
      amortization.push({
        year,
        principal: Math.round(yearlyPrincipal),
        interest: Math.round(yearlyInterest),
        balance: Math.max(0, Math.round(balance)),
      });
    }

    return {
      principal,
      monthlyPI,
      monthlyTax,
      monthlyInsurance,
      totalMonthly,
      totalPaid,
      totalInterest,
      downPct,
      amortization,
    };
  }, [homePrice, downPayment, interestRate, loanTerm, propertyTax, insurance]);

  const pieData = [
    { name: "Principal & Interest", value: Math.round(calc.monthlyPI), color: "#1c3879" },
    { name: "Property Tax", value: Math.round(calc.monthlyTax), color: "#d4af37" },
    { name: "Insurance", value: Math.round(calc.monthlyInsurance), color: "#607eaa" },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <SectionTitle
            title="Mortgage Calculator"
            subtitle="Financial Tools"
            center
          />
          <p className="text-muted-foreground max-w-xl mx-auto -mt-4">
            Estimate your monthly payments and plan your investment with our
            comprehensive mortgage calculator.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Input Panel */}
          <div className="lg:col-span-2 space-y-7">
            <SliderField
              icon={<DollarSign size={16} />}
              label="Home Price"
              value={homePrice}
              min={100000}
              max={10000000}
              step={10000}
              onChange={setHomePrice}
              display={formatShort(homePrice)}
            />
            <SliderField
              icon={<DollarSign size={16} />}
              label={`Down Payment (${calc.downPct}%)`}
              value={downPayment}
              min={0}
              max={homePrice}
              step={5000}
              onChange={setDownPayment}
              display={formatShort(downPayment)}
            />
            <SliderField
              icon={<Percent size={16} />}
              label="Interest Rate"
              value={interestRate}
              min={1}
              max={15}
              step={0.1}
              onChange={setInterestRate}
              display={`${interestRate.toFixed(1)}%`}
            />
            <SliderField
              icon={<Calendar size={16} />}
              label="Loan Term"
              value={loanTerm}
              min={5}
              max={30}
              step={5}
              onChange={setLoanTerm}
              display={`${loanTerm} yrs`}
            />
            <SliderField
              icon={<Percent size={16} />}
              label="Property Tax Rate"
              value={propertyTax}
              min={0.1}
              max={3}
              step={0.1}
              onChange={setPropertyTax}
              display={`${propertyTax.toFixed(1)}%`}
            />
            <SliderField
              icon={<DollarSign size={16} />}
              label="Annual Insurance"
              value={insurance}
              min={500}
              max={10000}
              step={100}
              onChange={setInsurance}
              display={formatShort(insurance)}
            />
          </div>

          {/* Output Panel */}
          <div className="lg:col-span-3 space-y-6">
            {/* Monthly Payment Hero */}
            <div className="relative rounded-2xl bg-royal-gradient p-8 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-royal-secondary/10 -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

              <div className="relative">
                <p className="text-white/60 text-sm uppercase tracking-[0.2em] mb-2">
                  Est. Monthly Payment
                </p>
                <p className="text-5xl md:text-6xl font-bold font-playfair text-royal-secondary mb-6">
                  {formatCurrency(calc.totalMonthly)}
                </p>

                <div className="grid grid-cols-3 gap-4">
                  <MiniStat
                    label="Principal & Interest"
                    value={formatCurrency(calc.monthlyPI)}
                  />
                  <MiniStat
                    label="Property Tax"
                    value={formatCurrency(calc.monthlyTax)}
                  />
                  <MiniStat
                    label="Insurance"
                    value={formatCurrency(calc.monthlyInsurance)}
                  />
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4">
              <SummaryCard
                label="Loan Amount"
                value={formatShort(calc.principal)}
                sub="to finance"
              />
              <SummaryCard
                label="Total Interest"
                value={formatShort(calc.totalInterest)}
                sub={`over ${loanTerm} years`}
                accent
              />
              <SummaryCard
                label="Total Cost"
                value={formatShort(calc.totalPaid + downPayment)}
                sub="total paid"
              />
            </div>

            {/* Chart Toggle */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-playfair font-bold text-lg text-foreground">
                  Payment Breakdown
                </h3>
                <div className="flex rounded-lg overflow-hidden border border-border">
                  <button
                    onClick={() => setView("summary")}
                    className={cn(
                      "px-3 py-1.5 text-xs font-medium transition-colors",
                      view === "summary"
                        ? "bg-royal-primary text-white"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    Pie
                  </button>
                  <button
                    onClick={() => setView("amortization")}
                    className={cn(
                      "px-3 py-1.5 text-xs font-medium transition-colors",
                      view === "amortization"
                        ? "bg-royal-primary text-white"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    Schedule
                  </button>
                </div>
              </div>

              {view === "summary" ? (
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={90}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {pieData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => formatCurrency(value)}
                      />
                      <Legend
                        formatter={(value) => (
                          <span className="text-xs text-muted-foreground">
                            {value}
                          </span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={calc.amortization}>
                      <defs>
                        <linearGradient
                          id="principalGrad"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#1c3879"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#1c3879"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                        <linearGradient
                          id="interestGrad"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#d4af37"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#d4af37"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                      <XAxis
                        dataKey="year"
                        tick={{ fontSize: 10 }}
                        tickFormatter={(v) => `Y${v}`}
                        stroke="#ffffff30"
                      />
                      <YAxis
                        tick={{ fontSize: 10 }}
                        tickFormatter={formatShort}
                        stroke="#ffffff30"
                      />
                      <Tooltip
                        formatter={(value: number) => formatCurrency(value)}
                        labelFormatter={(l) => `Year ${l}`}
                      />
                      <Area
                        type="monotone"
                        dataKey="principal"
                        name="Principal"
                        stroke="#1c3879"
                        fill="url(#principalGrad)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="interest"
                        name="Interest"
                        stroke="#d4af37"
                        fill="url(#interestGrad)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SliderField({
  icon,
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
          <span className="text-royal-secondary">{icon}</span>
          {label}
        </label>
        <span className="text-sm font-bold text-royal-primary dark:text-royal-secondary font-playfair tabular-nums">
          {display}
        </span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        className="[&>[data-orientation=horizontal]]:bg-border [&_[role=slider]]:bg-royal-secondary [&_[role=slider]]:border-royal-secondary"
      />
      <div className="flex justify-between mt-1">
        <span className="text-xs text-muted-foreground">{min >= 1000 ? formatShort(min) : min}</span>
        <span className="text-xs text-muted-foreground">{max >= 1000 ? formatShort(max) : max}</span>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-white/50 text-xs mb-0.5">{label}</p>
      <p className="text-white font-semibold text-sm">{value}</p>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl p-4 border text-center",
        accent
          ? "bg-royal-secondary/10 border-royal-secondary/30"
          : "bg-muted/50 border-border"
      )}
    >
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p
        className={cn(
          "font-bold text-xl font-playfair",
          accent ? "text-royal-secondary" : "text-foreground"
        )}
      >
        {value}
      </p>
      <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
    </div>
  );
}
