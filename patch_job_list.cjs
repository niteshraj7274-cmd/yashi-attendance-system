const fs = require('fs');
let content = fs.readFileSync('src/components/PublicJobListScreen.tsx', 'utf8');

const oldCard = `              <h2 className="text-lg font-bold text-slate-800 leading-tight mb-1">{job.jobTitle}</h2>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold text-slate-500 mb-3">
                <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{job.jobCategory}</span>
                <span className="flex items-center gap-1"><MapPin size={12}/> {job.district || job.workLocation || 'N/A'}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-4 border-t border-slate-100 pt-3">
                <div>Experience: <span className="font-bold">{job.experience || 'Any'}</span></div>
                <div>Qualification: <span className="font-bold">{job.qualification || 'Any'}</span></div>
                <div>Salary: <span className="font-bold">{job.salary || 'Not specified'}</span></div>
                <div>Vacancies: <span className="font-bold">{job.vacancy || 1}</span></div>
              </div>`;

const newCard = `              <div className="flex justify-between items-start mb-1">
                <h2 className="text-lg font-bold text-slate-800 leading-tight">{job.jobTitle}</h2>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Open</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold text-slate-500 mb-3">
                <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{job.jobCategory}</span>
                {job.centerName && <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded">{job.centerName}</span>}
                <span className="flex items-center gap-1"><MapPin size={12}/> {job.district || job.workLocation || 'N/A'}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-slate-600 mb-4 border-t border-slate-100 pt-3">
                <div className="flex justify-between"><span>Vacancy:</span> <span className="font-bold">{job.vacancy || 1}</span></div>
                <div className="flex justify-between"><span>Salary:</span> <span className="font-bold">{job.salary || 'Not specified'}</span></div>
                <div className="flex justify-between"><span>Last Date:</span> <span className="font-bold text-rose-600">{job.lastApplyDate ? new Date(job.lastApplyDate).toLocaleDateString('en-GB') : 'Not specified'}</span></div>
              </div>`;

content = content.replace(oldCard, newCard);

fs.writeFileSync('src/components/PublicJobListScreen.tsx', content);
