const TERM_FEES = {
    1: 0,
    3: 0.03,
    6: 0.05,
    9: 0.08,
    12: 0.10,
};

export const calcInstallment = (price, months, downPaymentPct) => {
    const base = Number(price) || 0;
    const fee = TERM_FEES[months] ?? 0;
    const total = Math.round(base * (1 + fee));
    const upfront = Math.round(total * downPaymentPct / 100);
    const monthly = months > 0 ? Math.ceil((total - upfront) / months) : 0;

    return { total, upfront, monthly, fee };
};
