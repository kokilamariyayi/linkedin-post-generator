from groq import Groq

TONES = {
    "Professional": "formal, polished, industry-standard LinkedIn tone",
    "Conversational": "friendly, human, relatable — like talking to a colleague",
    "Storytelling": "narrative arc — situation, struggle, lesson, outcome",
    "Motivational": "inspiring, forward-looking, community-driven",
}

POST_TYPES = {
    "Achievement": "celebrating a milestone, win, or completion",
    "Learning": "sharing something you learned or a course completed",
    "Project Launch": "announcing a new project or product",
    "Internship / Job": "announcing an internship, job, or opportunity",
    "Hackathon": "sharing a hackathon experience or result",
    "Reflection": "sharing a lesson, failure, or growth moment",
}

SYSTEM_PROMPT = """You are an expert LinkedIn content writer who writes posts that feel human, not corporate.

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

[Hashtags]
"""

def generate_post(topic: str, post_type: str, tone: str, api_key: str) -> str:
    """Generate a LinkedIn post using Groq LLM."""
    client = Groq(api_key=api_key)

    user_prompt = f"""Write a LinkedIn post about the following:

Topic / Achievement: {topic}
Post Type: {post_type} — {POST_TYPES[post_type]}
Tone: {tone} — {TONES[tone]}

Generate the post now.
"""

    response = client.chat.completions.create(
        model="llama3-70b-8192",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.9,
        max_tokens=512
    )
    return response.choices[0].message.content
