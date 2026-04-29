import os
from dotenv import load_dotenv
import streamlit as st
from generator import generate_post, TONES, POST_TYPES

load_dotenv()

st.set_page_config(page_title="LinkedIn Post Generator", page_icon="💼", layout="centered")

st.title("💼 LinkedIn Post Generator")
st.markdown("Paste any topic or achievement — get a **ready-to-post LinkedIn post** in seconds.")
st.divider()

# API Key
api_key = os.getenv("GROQ_API_KEY")
if api_key:
    st.info("Using the server-side Groq API key configured in GROQ_API_KEY.")
else:
    st.error("Server-side Groq API key is not configured. Set GROQ_API_KEY as an environment variable before launching the app.")

st.subheader("✏️ Tell us about your post")

col1, col2 = st.columns(2)
with col1:
    post_type = st.selectbox("📌 Post Type", list(POST_TYPES.keys()))
with col2:
    tone = st.selectbox("🎭 Tone", list(TONES.keys()))

topic = st.text_area(
    "📝 Topic / Achievement",
    height=120,
    placeholder="e.g. Completed my Microsoft Azure internship through AICTE Elevate program. Built a fake image detector using MobileNetV2. Learned about cloud AI services."
)

num_variants = st.radio("🔁 How many versions?", [1, 2, 3], horizontal=True)

st.divider()

if st.button("🚀 Generate Post", use_container_width=True, type="primary"):
    if not api_key:
        st.error("Please enter your Groq API key.")
    elif not topic.strip():
        st.error("Please describe your topic or achievement.")
    else:
        for i in range(num_variants):
            label = f"Version {i+1}" if num_variants > 1 else "Your Post"
            with st.spinner(f"Generating {label}..."):
                try:
                    post = generate_post(topic, post_type, tone, api_key)

                    st.subheader(f"📋 {label}")
                    st.text_area("", post, height=300, key=f"post_{i}")

                    col_a, col_b = st.columns(2)
                    with col_a:
                        st.download_button(
                            label=f"⬇️ Download {label}",
                            data=post,
                            file_name=f"linkedin_post_{i+1}.txt",
                            mime="text/plain",
                            key=f"dl_{i}",
                            use_container_width=True
                        )
                    with col_b:
                        char_count = len(post)
                        word_count = len(post.split())
                        st.info(f"📊 {word_count} words · {char_count} chars")

                    st.divider()

                except Exception as e:
                    st.error(f"Error: {e}")

st.caption("Built by [Kokila M](https://github.com/kokilamariyayi) | Powered by Groq + Llama 3")
