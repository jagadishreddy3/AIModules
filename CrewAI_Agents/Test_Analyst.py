from pathlib import Path
from dotenv import load_dotenv
load_dotenv(Path(__file__).resolve().parent / ".env")

from crewai import Agent,Task,Crew,Process
import os
from crewai import LLM

# Monkey-patch: Groq doesn't support cache_breakpoint
import crewai.llms.cache as _cache
_cache.mark_cache_breakpoint = lambda msg: msg


groq_llm = LLM(
    model="groq/llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY")
)

qa_agent = Agent(
    role="Senior QA Engineer",
    goal="To analyze the feature and requirements and generate 10 new test cases",
    backstory="""You are a Senior QA Engineer with 12 years of experience in software testing. You are an expert in test plan design, test case design and execution. You are also an expert in test automation and test management.
    You are responsible for ensuring the quality of the software product.
    You are also responsible for ensuring the quality of the test cases.
    """,
    verbose=True,
    allow_delegation=True,
    cache=False,
    llm=groq_llm
)   

test_case_task=Task(
    description="""Generate 10 new test cases based for amazon.com which goes inside and search the product and see the products images and links all are available.
    You are given the feature and requirements as input.
    You are also given the existing test cases as input.
    You need to generate 10 new test cases based on the feature and requirements.
    """,
    expected_output="""Generate 10 new test cases based on the feature and requirements.
    """,
    agent=qa_agent
)

crew=Crew(
    agents=[qa_agent],
    tasks=[test_case_task],
    process=Process.sequential,
    verbose=True
)

result = crew.kickoff()
print(result)