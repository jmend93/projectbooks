const promptInput = document.getElementById('promptInput');
const notesInput = document.getElementById('notesInput');
const stepsList = document.getElementById('steps');
const status = document.getElementById('status');

const STORAGE_KEY = 'codex-test-drive';

function renderSteps(promptText) {
  stepsList.innerHTML = '';
  if (!promptText.trim()) {
    stepsList.innerHTML = '<li>Add a request above and click "Run simulation".</li>';
    return;
  }

  const steps = [
    `Read request: "${promptText.trim()}"`,
    'Inspect project files and instructions',
    'Plan code changes',
    'Implement files and run checks',
    'Commit and prepare pull request summary'
  ];

  for (const step of steps) {
    const li = document.createElement('li');
    li.textContent = step;
    stepsList.appendChild(li);
  }
}

function loadSavedData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    renderSteps('');
    return;
  }

  const data = JSON.parse(raw);
  promptInput.value = data.prompt || '';
  notesInput.value = data.notes || '';
  renderSteps(promptInput.value);
}

function saveData() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      prompt: promptInput.value,
      notes: notesInput.value
    })
  );
  status.textContent = `Saved at ${new Date().toLocaleTimeString()}`;
}

document.getElementById('runBtn').addEventListener('click', () => {
  renderSteps(promptInput.value);
  status.textContent = 'Simulation updated. Save notes if you want to keep this run.';
});

document.getElementById('saveBtn').addEventListener('click', saveData);

document.getElementById('clearBtn').addEventListener('click', () => {
  promptInput.value = '';
  notesInput.value = '';
  localStorage.removeItem(STORAGE_KEY);
  renderSteps('');
  status.textContent = 'Cleared local data.';
});

loadSavedData();
