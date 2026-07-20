const fs = require('fs');
let content = fs.readFileSync('src/components/PublicJobApplyScreen.tsx', 'utf8');

const oldDetails = `<div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 mb-6">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Job Summary</h2>
          <div className="space-y-2 text-sm text-slate-700">
            <p><span className="font-bold">Category:</span> {job.jobCategory}</p>
            <p><span className="font-bold">Location:</span> {job.district || job.workLocation || 'Any'}</p>
            <p><span className="font-bold">Salary:</span> {job.salary || 'Not specified'}</p>
            <p><span className="font-bold">Req. Experience:</span> {job.experience || 'Any'}</p>
          </div>
          {job.description && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</h3>
              <p className="text-sm text-slate-600 whitespace-pre-wrap">{job.description}</p>
            </div>
          )}
        </div>`;

const newDetails = `<div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 mb-6">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 border-b pb-2">Job Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm text-slate-700">
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="font-bold text-slate-500">Job Title</span>
              <span className="font-semibold text-right">{job.jobTitle}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="font-bold text-slate-500">Category</span>
              <span className="font-semibold text-right">{job.jobCategory}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="font-bold text-slate-500">Vacancy</span>
              <span className="font-semibold text-right">{job.vacancy || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="font-bold text-slate-500">Center Name</span>
              <span className="font-semibold text-right">{job.centerName || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="font-bold text-slate-500">District</span>
              <span className="font-semibold text-right">{job.district || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="font-bold text-slate-500">Block</span>
              <span className="font-semibold text-right">{job.block || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="font-bold text-slate-500">Qualification</span>
              <span className="font-semibold text-right">{job.qualification || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="font-bold text-slate-500">Experience</span>
              <span className="font-semibold text-right">{job.experience || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="font-bold text-slate-500">Salary</span>
              <span className="font-semibold text-right text-emerald-600">{job.salary || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span className="font-bold text-slate-500">Job Type</span>
              <span className="font-semibold text-right">{job.jobType || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1 md:col-span-2">
              <span className="font-bold text-slate-500">Last Apply Date</span>
              <span className="font-bold text-rose-600 text-right">{job.lastApplyDate ? new Date(job.lastApplyDate).toLocaleDateString('en-GB') : 'N/A'}</span>
            </div>
          </div>
          {job.description && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Job Description</h3>
              <p className="text-sm text-slate-700 whitespace-pre-wrap bg-slate-50 p-3 rounded">{job.description}</p>
            </div>
          )}
        </div>`;

content = content.replace(oldDetails, newDetails);

fs.writeFileSync('src/components/PublicJobApplyScreen.tsx', content);
