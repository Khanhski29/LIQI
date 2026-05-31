const TERM_FEES = { //phi ki han %
    1: 0,
    3: 0.03,
    6: 0.05,
    9: 0.07,
    12: 0.08,
};

export const calcInstallment = (price, months, downPaymentPct) => {
    const base = Number(price) || 0;
    const fee = TERM_FEES[months] ?? 0;

    const upfront = Math.ceil(base * downPaymentPct / 100); //tra trc 
    const monthlyFee = Math.ceil(base * fee); //phi hang thang 
    const monthly = Math.ceil((base - upfront) / months) + monthlyFee; //tra hang thang
    
    const total = Math.ceil((monthly * months) + upfront);

    return { total, upfront, monthly, fee , monthlyFee};
};
