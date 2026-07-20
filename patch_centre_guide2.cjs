const fs = require('fs');
let code = fs.readFileSync('src/components/CentreAttendanceGuideScreen.tsx', 'utf8');

const target = `            <div className="bg-white p-5 rounded-2xl shadow-sm border border-red-100 mb-4 overflow-hidden relative">`;
const insertion = `            {guideData.faqs && guideData.faqs.length > 0 && (
              <>
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 pl-2 mt-6">Frequently Asked Questions</h2>
                {renderRuleSection('FAQs', <Info size={20} />, guideData.faqs, 'bg-amber-500')}
              </>
            )}

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-red-100 mb-4 overflow-hidden relative">`;

if (!code.includes('Frequently Asked Questions')) {
  code = code.replace(target, insertion);
}

fs.writeFileSync('src/components/CentreAttendanceGuideScreen.tsx', code);
