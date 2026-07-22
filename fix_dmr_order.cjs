const fs = require('fs');
let code = fs.readFileSync('src/components/AdminDmrSettingsScreen.tsx', 'utf8');

// Add move category
const moveCategory = `
  const moveCategory = (index: number, direction: 'up' | 'down') => {
    const newCategories = [...categories];
    if (direction === 'up' && index > 0) {
      [newCategories[index - 1], newCategories[index]] = [newCategories[index], newCategories[index - 1]];
    } else if (direction === 'down' && index < newCategories.length - 1) {
      [newCategories[index + 1], newCategories[index]] = [newCategories[index], newCategories[index + 1]];
    }
    // Update order values
    newCategories.forEach((c, i) => c.order = i + 1);
    setCategories(newCategories);
  };
`;

// Add move option
const moveOption = `
  const moveOption = (catId: string, index: number, direction: 'up' | 'down') => {
    setCategories(categories.map(c => {
      if (c.id === catId) {
        const newOptions = [...c.options];
        if (direction === 'up' && index > 0) {
          [newOptions[index - 1], newOptions[index]] = [newOptions[index], newOptions[index - 1]];
        } else if (direction === 'down' && index < newOptions.length - 1) {
          [newOptions[index + 1], newOptions[index]] = [newOptions[index], newOptions[index + 1]];
        }
        newOptions.forEach((o, i) => o.order = i + 1);
        return { ...c, options: newOptions };
      }
      return c;
    }));
  };
`;

code = code.replace(
  `  const toggleAutoFetch = (catId: string, optId: string) => {`,
  `${moveCategory}\n${moveOption}\n  const toggleAutoFetch = (catId: string, optId: string) => {`
);

// Category UI
code = code.replace(
  `<button onClick={() => renameCategory(cat.id, cat.name)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                      <Edit2 size={16} />
                    </button>`,
  `<button onClick={() => moveCategory(catIdx, 'up')} disabled={catIdx === 0} className="p-1.5 text-slate-500 hover:bg-slate-200 rounded disabled:opacity-30">
                      <MoveUp size={16} />
                    </button>
                    <button onClick={() => moveCategory(catIdx, 'down')} disabled={catIdx === categories.length - 1} className="p-1.5 text-slate-500 hover:bg-slate-200 rounded disabled:opacity-30">
                      <MoveDown size={16} />
                    </button>
                    <button onClick={() => renameCategory(cat.id, cat.name)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                      <Edit2 size={16} />
                    </button>`
);

// Option UI
code = code.replace(
  `<button onClick={() => renameOption(cat.id, opt.id, opt.name)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                          <Edit2 size={14} />
                        </button>`,
  `<button onClick={() => moveOption(cat.id, optIdx, 'up')} disabled={optIdx === 0} className="p-1.5 text-slate-500 hover:bg-slate-200 rounded disabled:opacity-30">
                          <MoveUp size={14} />
                        </button>
                        <button onClick={() => moveOption(cat.id, optIdx, 'down')} disabled={optIdx === cat.options.length - 1} className="p-1.5 text-slate-500 hover:bg-slate-200 rounded disabled:opacity-30">
                          <MoveDown size={14} />
                        </button>
                        <button onClick={() => renameOption(cat.id, opt.id, opt.name)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                          <Edit2 size={14} />
                        </button>`
);

fs.writeFileSync('src/components/AdminDmrSettingsScreen.tsx', code);
