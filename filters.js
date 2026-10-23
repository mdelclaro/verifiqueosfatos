window.createFilterControls = function createFilterControls({
  candidateLabels,
  verdictLabels,
  onChange = () => {}
}) {
  const filterTools = document.querySelector('.filter-tools');
  if (!filterTools) return;

  const selected = { candidate: '', verdict: '' };

  function addFilterButtons(groupName, options) {
    const group = filterTools.querySelector(`[data-filter-group="${groupName}"]`);
    if (!group) return;

    for (const [value, label] of options) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'filter-button';
      button.dataset.filter = groupName;
      button.dataset.value = value;
      button.setAttribute('aria-pressed', value === '' ? 'true' : 'false');
      button.setAttribute('aria-controls', 'posts');
      button.textContent = label;
      group.appendChild(button);
    }
  }

  addFilterButtons('candidate', [
    ['', 'Todos'],
    ...Object.entries(candidateLabels).sort(([, a], [, b]) => a.localeCompare(b, 'pt-BR'))
  ]);
  addFilterButtons('verdict', [['', 'Todos'], ...Object.entries(verdictLabels)]);

  filterTools.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (!button || !filterTools.contains(button)) return;

    const group = button.parentElement;
    group.querySelectorAll('button[data-filter]').forEach(option => {
      option.setAttribute('aria-pressed', option === button ? 'true' : 'false');
    });

    selected[button.dataset.filter] = button.dataset.value;
    onChange({ ...selected });
  });
};
