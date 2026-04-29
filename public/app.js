// ===== Constants =====
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile';

// IMPORTANT: Set your API key via environment variable or localStorage
// Option 1: Set in localStorage from browser console: localStorage.setItem('GROQ_API_KEY', 'your-key-here')
// Option 2: Deploy with environment variable and update this line
const API_KEY = localStorage.getItem('GROQ_API_KEY') || process.env.REACT_APP_GROQ_API_KEY || '';

const TONES = {
    Professional: 'formal, polished, industry-standard LinkedIn tone',
    Conversational: 'friendly, human, relatable — like talking to a colleague',
    Storytelling: 'narrative arc — situation, struggle, lesson, outcome',
    Motivational: 'inspiring, forward-looking, community-driven',
};

const POST_TYPES = {
    Achievement: 'celebrating a milestone, win, or completion',
    Learning: 'sharing something you learned or a course completed',
    'Project Launch': 'announcing a new project or product',
    'Internship / Job': 'announcing an internship, job, or opportunity',
    Hackathon: 'sharing a hackathon experience or result',
    Reflection: 'sharing a lesson, failure, or growth moment',
};

const SYSTEM_PROMPT = `You are an expert LinkedIn content writer who writes posts that feel human, not corporate.

Rules you ALWAYS follow:
- Never start with "Excited to" or "Thrilled to" or "I am pleased to"
- Start with a strong hook — a question, bold statement, or surprising fact
- Keep sentences short and punchy
- Use line breaks generously for readability
- Add 1-2 relevant emojis max — never overdo it
- End with a call to action or open question to drive comments
- Include a hashtag block at the end (8-12 hashtags, mix of broad and niche)
- Keep the post between 150-250 words

Format:
[Hook line]

[2-3 short paragraphs of body]

[CTA or question]

[Hashtags]`;

// ===== DOM Elements =====
const postTypeSelect = document.getElementById('postType');
const toneSelect = document.getElementById('tone');
const topicInput = document.getElementById('topicInput');
const charCounter = document.getElementById('charCounter');
const versionBtns = document.querySelectorAll('.version-btn');
const generateBtn = document.getElementById('generateBtn');
const resultsSection = document.getElementById('resultsSection');
const toast = document.getElementById('toast');

let selectedVersions = 1;

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    setupEventListeners();
});

// ===== Background Particles =====
function initParticles() {
    const container = document.getElementById('bgParticles');
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (6 + Math.random() * 6) + 's';
        particle.style.opacity = 0.1 + Math.random() * 0.4;
        particle.style.width = particle.style.height = (2 + Math.random() * 3) + 'px';
        container.appendChild(particle);
    }
}

// ===== Event Listeners =====
function setupEventListeners() {
    // Character counter
    topicInput.addEventListener('input', () => {
        const len = topicInput.value.length;
        charCounter.textContent = `${len} character${len !== 1 ? 's' : ''}`;
    });

    // Version selector
    versionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            versionBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedVersions = parseInt(btn.dataset.value);
        });
    });

    // Generate button
    generateBtn.addEventListener('click', handleGenerate);
}

// ===== Toast Notifications =====
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = 'toast show toast-' + type;
    setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}

// ===== Generate Posts =====
async function handleGenerate() {
    const topic = topicInput.value.trim();
    const postType = postTypeSelect.value;
    const tone = toneSelect.value;

    // Validation
    if (!topic) {
        showToast('Please describe your topic or achievement', 'error');
        topicInput.focus();
        return;
    }

    // UI: Loading state
    setLoading(true);
    resultsSection.style.display = 'block';
    resultsSection.innerHTML = '';

    // Show loading skeletons
    for (let i = 0; i < selectedVersions; i++) {
        resultsSection.innerHTML += createSkeletonCard(i + 1);
    }

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Generate posts
    const results = [];
    for (let i = 0; i < selectedVersions; i++) {
        try {
            const post = await generatePost(topic, postType, tone, i + 1, selectedVersions);
            results.push({ success: true, content: post, index: i });
        } catch (error) {
            results.push({ success: false, error: error.message, index: i });
        }
    }

    // Render results
    resultsSection.innerHTML = '';
    results.forEach((result, i) => {
        if (result.success) {
            resultsSection.innerHTML += createResultCard(result.content, i + 1, selectedVersions);
        } else {
            resultsSection.innerHTML += createErrorCard(result.error, i + 1);
        }
    });

    // Attach event listeners to result buttons
    attachResultListeners();
    setLoading(false);
}

// ===== Groq API Call =====
async function generatePost(topic, postType, tone, versionNumber = 1, totalVersions = 1) {
    const versionInstructions = {
        1: 'Focus on the journey, learning process, and personal growth. End with a CTA asking what they learned or a reflection question about growth.',
        2: 'Focus on the impact, key takeaways, and future applications. End with a CTA about challenges, opportunities, or next steps in the field.',
        3: 'Focus on networking, collaboration, and community aspects. End with a CTA asking about connections, collaborations, or community initiatives.',
    };

    const versionHint = versionInstructions[versionNumber] || versionInstructions[1];
    const uniqueInstruction = totalVersions > 1 ? `\nVersion ${versionNumber} instruction: ${versionHint}` : '';

    const userPrompt = `Write a LinkedIn post about the following:

Topic / Achievement: ${topic}
Post Type: ${postType} — ${POST_TYPES[postType]}
Tone: ${tone} — ${TONES[tone]}${uniqueInstruction}

Generate the post now.`;

    const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: MODEL,
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: userPrompt },
            ],
            temperature: totalVersions > 1 ? 1.0 : 0.9,
            max_tokens: 512,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = errorData?.error?.message || `API request failed (${response.status})`;
        throw new Error(message);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

// ===== UI Components =====
function createSkeletonCard(num) {
    return `
        <div class="result-card" style="animation-delay: ${num * 0.1}s">
            <div class="result-header">
                <div class="result-title">📋 Generating Version ${num}...</div>
            </div>
            <div class="loading-skeleton">
                <div class="skeleton-line shimmer"></div>
                <div class="skeleton-line shimmer"></div>
                <div class="skeleton-line shimmer"></div>
                <div class="skeleton-line shimmer"></div>
                <div class="skeleton-line shimmer"></div>
            </div>
        </div>`;
}

function createResultCard(content, num, total) {
    const label = total > 1 ? `Version ${num}` : 'Your Post';
    const words = content.split(/\s+/).length;
    const chars = content.length;
    const escapedContent = escapeHtml(content);

    return `
        <div class="result-card" style="animation-delay: ${num * 0.1}s">
            <div class="result-header">
                <div class="result-title">
                    📋 ${label}
                    <span class="result-badge">${postTypeSelect.value} · ${toneSelect.value}</span>
                </div>
            </div>
            <div class="result-content" id="resultContent${num}">${escapedContent}</div>
            <div class="result-actions">
                <button class="action-btn copy-btn" data-target="resultContent${num}" title="Copy to clipboard">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    Copy
                </button>
                <button class="action-btn download-btn" data-content="${btoa(unescape(encodeURIComponent(content)))}" data-filename="linkedin_post_${num}.txt" title="Download as text file">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Download
                </button>
                <div class="stats-badge">
                    📊 <span>${words}</span> words · <span>${chars}</span> chars
                </div>
            </div>
        </div>`;
}

function createErrorCard(errorMessage, num) {
    return `
        <div class="result-card error-card" style="animation-delay: ${num * 0.1}s">
            <div class="result-header">
                <div class="result-title">❌ Version ${num} — Error</div>
            </div>
            <div class="result-content" style="color: var(--error);">${escapeHtml(errorMessage)}</div>
        </div>`;
}

// ===== Result Button Listeners =====
function attachResultListeners() {
    // Copy buttons
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = document.getElementById(btn.dataset.target);
            if (target) {
                navigator.clipboard.writeText(target.textContent).then(() => {
                    showToast('✓ Copied to clipboard!');
                    btn.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        Copied!`;
                    setTimeout(() => {
                        btn.innerHTML = `
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                            </svg>
                            Copy`;
                    }, 2000);
                }).catch(() => {
                    showToast('Failed to copy', 'error');
                });
            }
        });
    });

    // Download buttons
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const content = decodeURIComponent(escape(atob(btn.dataset.content)));
            const filename = btn.dataset.filename;
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showToast('✓ Downloaded!');
        });
    });
}

// ===== Helpers =====
function setLoading(isLoading) {
    const btnContent = generateBtn.querySelector('.btn-content');
    const btnLoading = generateBtn.querySelector('.btn-loading');

    if (isLoading) {
        btnContent.style.display = 'none';
        btnLoading.style.display = 'flex';
        generateBtn.disabled = true;
    } else {
        btnContent.style.display = 'flex';
        btnLoading.style.display = 'none';
        generateBtn.disabled = false;
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
