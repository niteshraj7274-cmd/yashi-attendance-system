const fs = require('fs');
let content = fs.readFileSync('src/components/PublicJobApplyScreen.tsx', 'utf8');

if (!content.includes('const [showForm, setShowForm] = useState(false);')) {
  content = content.replace(
    'const [error, setError] = useState(\'\');',
    'const [error, setError] = useState(\'\');\n  const [showForm, setShowForm] = useState(false);'
  );

  const formSection = `<form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">`;
  const toggleButton = `{!showForm ? (
          <button 
            onClick={() => setShowForm(true)}
            className="w-full mt-4 py-4 bg-emerald-600 text-white font-bold uppercase tracking-wider text-base rounded-xl shadow hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={24} />
            Apply Now
          </button>
        ) : (`;

  content = content.replace(formSection, toggleButton + '\n        ' + formSection);
  
  content = content.replace('          </div>\n        </form>\n      </div>\n    </div>', '          </div>\n        </form>\n        )}      </div>\n    </div>');
}

fs.writeFileSync('src/components/PublicJobApplyScreen.tsx', content);
