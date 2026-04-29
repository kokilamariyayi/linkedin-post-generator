# 💼 LinkedIn Post Generator

> Paste any topic or achievement — get a **ready-to-post LinkedIn post** in seconds, powered by Groq + Llama 3.

---


---

## ✨ Features

- 📌 **6 Post Types** — Achievement, Learning, Project Launch, Internship, Hackathon, Reflection
- 🎭 **4 Tone Modes** — Professional, Conversational, Storytelling, Motivational
- 🔁 **Generate up to 3 versions** at once — pick your favourite
- 📊 **Word & character count** shown for each post
- ⬇️ **Download posts** as `.txt` files
- 🚫 Never starts with *"Excited to"* or *"Thrilled to"*

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| `Groq` | LLM API (Llama 3 70B) |
| `Streamlit` | Web UI |

---

## 🚀 Run Locally

```bash
git clone https://github.com/kokilamariyayi/linkedin-post-generator.git
cd linkedin-post-generator
python -m venv .venv
.venv\Scripts\python -m pip install -r requirements.txt
.venv\Scripts\python -m streamlit run app.py
```

> Get a **free Groq API key** at [console.groq.com](https://console.groq.com)

### Run with your own server-side Groq key

This app is configured to use a server-side `GROQ_API_KEY`. If the key is not set, the app will show an error and will not ask visitors for a key.

Windows PowerShell:

```powershell
$env:GROQ_API_KEY = "your_groq_key_here"
.venv\Scripts\python -m streamlit run app.py
```

Linux/macOS:

```bash
export GROQ_API_KEY="your_groq_key_here"
.venv/bin/python -m streamlit run app.py
```

---

## 📁 Project Structure

```
linkedin-post-generator/
├── app.py              # Streamlit web app
├── generator.py        # Groq LLM post generation logic
├── requirements.txt    # Dependencies
├── screenshots/        # Demo screenshots
│   └── README.md
├── .gitignore
└── README.md
```

---

## 💡 Sample Output

**Input:** *Completed Microsoft Azure internship via AICTE Elevate. Built a fake image detector using MobileNetV2.*

**Output (Conversational tone):**
```
Six weeks ago, I didn't know what transfer learning meant.

Today, I shipped a fake image detector using MobileNetV2 — trained on
the CIFAKE dataset, deployed as a Streamlit app, and presented as my
capstone for the Microsoft Elevate Azure Internship (AICTE).

It's not perfect. But it works. And more importantly — I built it.

If you're sitting on a half-finished project, ship it anyway.
The learning happens in the doing, not the planning.

What's one project you've been putting off? Drop it below 👇

#MicrosoftAzure #AICTE #MachineLearning #TransferLearning
#MobileNetV2 #Streamlit #StudentDeveloper #AIProjects
#DeepLearning #Python #BuildInPublic #LinkedInLearning
```

---

## 📧 Contact

Feel free to connect for collaboration, internships, 
or project discussions.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://www.linkedin.com/in/kokila-m-ai-ds/)
[![Email](https://img.shields.io/badge/Email-Contact-red)](mailto:kokilakoki3376@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black)](https://github.com/kokilamariyayi)

---
<div align="center">⭐ Star this repo if it helped you!</div>

---

## 📄 License

MIT License — free to use and modify.
