# from CrewAI_Agents import Test_Analyst
# from _typeshed import AnyOrLiteralStr
# Define Your QA Team
# # Our task of BugTriage is to prioritize, analyze, find RCA (root cause analysis) for these applications. 
# In short -> Why bug occurs? 

# # Sample bug report
# bug_report = """
# Bug Title: Shopping cart total shows $0.00 after applying discount code
# Bug ID: BUG-45
# Reporter: manual_tester_jane
# Environment: Production, Chrome 120, Windows 11
# Severity (Reporter): High

# Steps to Reproduce:
# 1. Add 3+ items to shopping cart (total > $50)
# 2. Apply discount code "SAVE20" (20% off)
# 3. Observe the cart total

# Actual Result: Cart total shows $0.00 instead of discounted price
# Expected Result: Cart total should show original price minus 20%

# Additional Info:
# - Happens only when cart has 3+ items
# - Works fine with 1-2 items
# - Started after last Friday's deployment (v2.4.1)
# - No errors in browser console
# - API response shows correct discounted amount
# """

from pathlib import Path
from dotenv import load_dotenv
load_dotenv(Path(__file__).resolve().parent / ".env")

from crewai import Agent,Task,Crew,Process
import os
from crewai import LLM
import requests

# Monkey-patch: Groq doesn't support cache_breakpoint
import crewai.llms.cache as _cache
_cache.mark_cache_breakpoint = lambda msg: msg

# Groq API key loaded from .env via dotenv


groq_llm = LLM(
    model="groq/llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY")
)

#Agent1 bug traige Analyst
#Agent2 root cause investigator
#Agent3 Test Recomendation Agent

#Task1 Classify the bug
#Task2 Investigate the root cause
#Task3 Recomend tests

def fetch_jira_ticket(bug_id):
    url=f"https://jagadishgudisha.atlassian.net/rest/api/3/issue/{bug_id}"
    r=requests.get(url,auth=(os.getenv("jira_email"),os.getenv("jira_api_key")))
    r.raise_for_status()
    data=r.json()
    f=data['fields']
    desc = f.get("description")
    if isinstance(desc, dict) and "content" in desc:
        desc = desc["content"][0]["content"][0]["text"]
    else:
        desc = str(desc) if desc else ""
    return f"""bugtitle : {f['summary']}
bugid: {data['key']}
reporter:{f.get('reporter', {}).get('displayName', 'Unknown')}
{desc}
"""
print (fetch_jira_ticket("KAN-14"))
bug_report=fetch_jira_ticket("KAN-14")
print(bug_report)

bug_analyst=Agent(
    role="Senior Bug Triage Analyst",
    goal="Accurately analyze the bug based on severity, priority and category",
    backstory="""You are a Senior Bug Analyst with 12 years of experience in software testing. You are an expert in test plan design, test case design and execution. You are also an expert in test automation and test management.
    You follow strictly this severity classifications
    -P0(Blocker):system down, data loss, security breach
    -P1(Critical): Major feature broken, no workaround
    -P2(Major): Feature impaired, workaround exists
    -P3(Minor): Cosmetic issue, no impact on functionality
    -P4(Low): Enhancement request,typo
    you never inflate severity. You always justify your classification
    """,
    verbose=True,
    allow_delegation=False,
    cache=False,
    llm=groq_llm
)

root_cause_agent=Agent(
    role="Senior Root Cause Analyst",
    goal="Investigate the root cause of the bug and affected system components",
    backstory="""You are debugging expert who thinks in system layers.
    you analyze the bugs by tracing through UI API service database
    identify the issue is in frontend or backend or infra or third party integration.
    provide precise technical root cause analysis. no generic statements
    you suggest which log files or monitoring dashboards to check first
    """,
    verbose=True,
    allow_delegation=False,
    cache=False,
    llm=groq_llm
)

test_recommender_agent=Agent(
    role="Test strategy advisor",
    goal="Recommend specific tests to validate the fix and prevent regression",
    backstory="""You are a Senior Test Recommender Agent with 12 years of experience in software testing. You are an expert in test plan design, test case design and execution. You are also an expert in test automation and test management.
    for every bug, you recommend:
        immediate smoke tests to verify the fix
        regression test cases to prevent reoccurrence
        Edge cases that should be added to the test suite
        You specify tests in playwright typescript style when applicable
    """,
    verbose=True,
    allow_delegation=False,
    cache=False,
    llm=groq_llm
)

triage_task=Task(
    description=f"""Analyze and classify the bug report:
    {bug_report}
    provide:
    Severity(P0-P4) with justification
    category(UI, Functional, security, data,performance)
    Affected component/module
    business impact assessment
    recommend priority for sprint planning
    """,
    expected_output=f"""
    A structured  triage report with severity, category, component, business
    impact and sprint priority
    """,
    agent=bug_analyst,
    context=[]
)

root_cause_task=Task(
    description=f"""provide root cause analysis based on the triage analysis:
    {bug_report}
    provide:
    most likely Root cause
    system layer affected(UI/API/Service/DB/Infra)
    Affected components
    analyzation steps
    Log files/monitoring dashboards to check first
    """,
    expected_output=f"""
    A structured root cause analysis with probable cause,affected components
    and log files/monitoring dashboards to check first
    """,
    agent=root_cause_agent,
    context=[triage_task]
)

test_recommendation_task=Task(
    description=f"""Recommend tests to validate the fix and prevent regression based on triage analysis and root cause analysis:
    {bug_report}
    provide:
    Immediate smoke tests or verification tests to verify the fix
    Regression test cases to prevent reoccurence
    Edge cases to add to test suite
    suggested test automation approach(playwright with typescript)
    any load/perforamnce test ifapplicable
    """,
    expected_output=f"""
    A structured test recommendation with smoke tests,
    regression tests and edge cases and automation approach
    """,
    agent=test_recommender_agent,
    context=[triage_task,root_cause_task]
)

crew=Crew(
    agents=[bug_analyst,root_cause_agent,test_recommender_agent],
    tasks=[triage_task,root_cause_task,test_recommendation_task],
    process=Process.sequential,
    verbose=True
)

result = crew.kickoff()
print(result)
    
