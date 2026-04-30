# 💼 LinkedIn Post Generator

<div align="center">

![Python](https://img.shields.io/badge/Python-3.10%2B-blue?style=for-the-badge&logo=python)
![Groq](https://img.shields.io/badge/Groq-Llama3_70B-red?style=for-the-badge)
![Streamlit](https://img.shields.io/badge/Streamlit-FF4B4B?style=for-the-badge&logo=streamlit)
![Firebase](https://img.shields.io/badge/Firebase-Hosting-orange?style=for-the-badge&logo=firebase)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**Paste any topic or achievement — get a ready-to-post LinkedIn post in seconds.**

🔗 [Live App](https://postin-bot.web.app)

</div>

## 🎯 What This Solves

Writing LinkedIn posts consistently is harder than it sounds. Most people either skip posting or end up with the same generic "Excited to share..." opener. This tool generates multiple unique versions of a post from a single input — different angles, different tones, ready to use.

## ✨ Features

| Feature | Details |
|---|---|
| 📌 Post Types | Achievement, Learning, Project Launch, Internship, Hackathon, Reflection |
| 🎭 Tone Modes | Professional, Conversational, Storytelling, Motivational |
| 🔁 Multiple Versions | Up to 3 unique posts per generation, each with a different CTA |
| 📊 Post Stats | Word and character count shown for each post |
| ⬇️ Download | Save any post as a `.txt` file |
| 🎨 UI | Dark theme, fully responsive |

Never starts with *"Excited to"* or *"Thrilled to"*.

## 🧠 How It Works

```
User Input (topic / achievement)
        │
        ▼
┌─────────────────┐
│  Prompt Builder │  ← Post type + tone + variation logic
└────────┬────────┘
         ▼
┌─────────────────┐
│  Groq LLM API   │  ← Llama 3 70B inference
└────────┬────────┘
         ▼
┌─────────────────┐
│ Post Formatter  │  ← 3 unique versions with hashtags + CTA
└────────┬────────┘
         ▼
┌─────────────────┐
│   UI / Output   │  ← Preview, copy, download
└─────────────────┘
```

## 📁 Project Structure

```
linkedin-post-generator/
├── public/               # Firebase-hosted frontend
│   ├── index.html
│   ├── app.js
│   └── style.css
├── app.py                # Streamlit app (local)
├── generator.py          # Post generation logic
├── requirements.txt
└── screenshots/
```


## 💡 Sample Output

**Input:** Completed Microsoft Azure internship via AICTE Elevate. Built a fake image detector using MobileNetV2.

**Output (Conversational):**

> Six weeks ago, I didn't know what transfer learning meant.
> Today, I shipped a fake image detector using MobileNetV2 — trained on the CIFAKE dataset, deployed as a Streamlit app, and presented as my capstone for the Microsoft Elevate Azure Internship.
> It's not perfect. But it works. And more importantly — I built it.

## 📧 Contact

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://www.linkedin.com/in/kokila-m-ai-ds/)
[![Email](https://img.shields.io/badge/Email-Contact-red)](mailto:kokilakoki3376@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black)](https://github.com/kokilamariyayi)

<div align="center">⭐ Star this repo if it helped you!</div>
