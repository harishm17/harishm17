Hi, I'm Harish, an AI engineer at [Purgo AI](https://www.purgo.ai/) in the San Francisco Bay Area. I design and build LLM agents, retrieval and evals.

**At Purgo AI, since 2025**

- **[Retrieval and code review for a data-engineering agent](https://harishmanoharan.com/work/agent-retrieval/).** Our LangGraph agent turns data-engineering tickets into PySpark, SQL and dbt code. I designed how it finds the tables a ticket needs: candidates from the ticket, a Pinecone catalog search and dbt lineage, then a check against the warehouse schema and an LLM ranker, all within a fixed context budget. Following dbt lineage cut missed tables from 79 to 24 across 103 tickets. I also built much of the review that checks its code before it ships, and moved two stages to a smaller model at 7.6x lower cost.
- **[Validation for regulated AI](https://harishmanoharan.com/work/llm-evaluation/).** I built our two validation products, which qualify a customer's LLM deployment or Databricks platform for regulated (GxP) use. Life-sciences customers use them for signed audit reports.

**On my own**

- **[ReadableSTEM](https://readablestem.com)** turns STEM course PDFs into accessible web pages, with equations as MathML a screen reader can speak. Two models read the maths, the PDF's own text checks them, and anything uncertain goes to the instructor to review. On held-out textbook sections I registered before any system ran, it reaches heading F1 0.96, and 97% of its figure descriptions pass a model judge. I also published where a chatbot still beats it on equations. Free, open-source beta ([write-up](https://harishmanoharan.com/work/readablestem/), [evaluation](https://harishmanoharan.com/work/readablestem-evaluation/), [source](https://github.com/harishm17/readablestem)).
- **[Margins](https://studymargins.com)** turns your own course files into notes, worked examples, quizzes and timed practice exams, each citing the pages it came from, plus a voice coach. Give it your exam date and it plans each day's work and tracks what you've mastered ([source](https://github.com/harishm17/margins)).
- **[Holdbrief](https://holdbrief.com)** is a daily brief on the stocks you follow, for US and Indian markets. Fixed scoring methods set each stock's stance and Claude writes the explanation; every sentence has to cite the facts behind it, and a checker rejects any that don't (source private).

**Stack:** Python, TypeScript, SQL, LangGraph, PySpark, dbt, Databricks, Pinecone, Postgres with pgvector, FastAPI, Next.js, Azure, AWS.

**Before Purgo** I interned at Digitus in 2024, where I built a text-to-SQL agent (execution accuracy from 52% to 76%) and a RAG helpdesk assistant (median time to resolution from 20 minutes to 6), and at PwC in 2023, where I built a customer analytics platform. I have an M.S. in computer science from UT Dallas (2026) and a dual degree in biological sciences and data science from IIT Madras (2024), with a master's thesis at The Jackson Laboratory on finding behaviors in mouse videos without labels.

Outside work I build at hackathons, where my team recently placed third of about 40 at the Kane CLI hackathon. I also hike, play table tennis and play chess on [Lichess](https://lichess.org/@/harishm17) and [Chess.com](https://www.chess.com/member/pika_pika17).

[harishmanoharan.com](https://harishmanoharan.com) · [LinkedIn](https://www.linkedin.com/in/harishm17/) · [Email](mailto:harish_manoharan@outlook.com)
