import React from 'react';
import { TrendingUp, ExternalLink } from 'lucide-react';
import { VIEWS } from '../../constants/columns';

const hiringCompanies = [
  { name: 'Microsoft', role: 'SDET / QA Engineer', posted: 'Recent', link: 'https://www.linkedin.com/jobs/search/?keywords=Microsoft%20SDET&location=Hyderabad&sortBy=DD' },
  { name: 'Amazon', role: 'QA Engineer / SDET', posted: 'Recent', link: 'https://www.linkedin.com/jobs/search/?keywords=Amazon%20SDET&location=Hyderabad&sortBy=DD' },
  { name: 'Google', role: 'Test Engineer / SDET', posted: 'Recent', link: 'https://www.linkedin.com/jobs/search/?keywords=Google%20SDET&location=Hyderabad&sortBy=DD' },
  { name: 'Salesforce', role: 'SDET / QE', posted: 'Recent', link: 'https://www.linkedin.com/jobs/search/?keywords=Salesforce%20SDET&location=Hyderabad&sortBy=DD' },
  { name: 'ServiceNow', role: 'QE / SDET', posted: 'Recent', link: 'https://www.linkedin.com/jobs/search/?keywords=ServiceNow%20SDET&location=Hyderabad&sortBy=DD' },
  { name: 'JPMorgan Chase', role: 'QA Automation Lead', posted: 'Recent', link: 'https://www.linkedin.com/jobs/search/?keywords=JPMorgan%20SDET&location=Hyderabad&sortBy=DD' },
  { name: 'Oracle', role: 'QA / Test Engineer', posted: 'Recent', link: 'https://www.linkedin.com/jobs/search/?keywords=Oracle%20SDET&location=Hyderabad&sortBy=DD' },
  { name: 'Qualcomm', role: 'Test / Automation Eng', posted: 'Recent', link: 'https://www.linkedin.com/jobs/search/?keywords=Qualcomm%20SDET&location=Hyderabad&sortBy=DD' },
  { name: 'Uber', role: 'SDET', posted: 'Recent', link: 'https://www.linkedin.com/jobs/search/?keywords=Uber%20SDET&location=Hyderabad&sortBy=DD' },
  { name: 'Apple', role: 'QA / SDET', posted: 'Recent', link: 'https://www.linkedin.com/jobs/search/?keywords=Apple%20SDET&location=Hyderabad&sortBy=DD' },
  { name: 'Wells Fargo', role: 'QA Automation', posted: 'Recent', link: 'https://www.linkedin.com/jobs/search/?keywords=Wells%20Fargo%20SDET&location=Hyderabad&sortBy=DD' },
  { name: 'Goldman Sachs', role: 'QA Engineer', posted: 'Recent', link: 'https://www.linkedin.com/jobs/search/?keywords=Goldman%20Sachs%20SDET&location=Hyderabad&sortBy=DD' },
  { name: 'Cisco', role: 'Test / Automation Eng', posted: 'Recent', link: 'https://www.linkedin.com/jobs/search/?keywords=Cisco%20SDET&location=Hyderabad&sortBy=DD' },
  { name: 'Indeed', role: 'SDET / QA', posted: 'Recent', link: 'https://www.linkedin.com/jobs/search/?keywords=Indeed%20SDET&location=Hyderabad&sortBy=DD' },
  { name: 'Zscaler', role: 'QA / SDET', posted: 'Recent', link: 'https://www.linkedin.com/jobs/search/?keywords=Zscaler%20SDET&location=Hyderabad&sortBy=DD' },
];

const Sidebar = ({ jobs, currentView }) => {
  const pipelineCompanies = [...new Set(jobs.map(j => j.company))];
  const companiesList = pipelineCompanies.slice(0, 6).map(name => ({
    name,
    count: jobs.filter(j => j.company === name).length
  }));

  const renderContent = () => {
    switch(currentView) {
      case VIEWS.INTERVIEWS:
        return (
          <div className="space-y-6">
             <h3 className="text-xs font-black uppercase tracking-[0.2em] text-jobflow-text-dim mb-4">Preparation Checklist</h3>
             {['Review Technical Specs', 'Behavioral Practice', 'Portfolio Walkthrough'].map((item, i) => (
               <div key={i} className="bg-jobflow-card p-4 rounded-xl border border-jobflow-border flex items-center justify-between group cursor-pointer hover:border-jobflow-accent transition-all">
                  <span className="text-xs font-bold text-jobflow-text">{item}</span>
                  <div className="w-4 h-4 rounded border border-jobflow-border group-hover:border-jobflow-accent"></div>
               </div>
             ))}
          </div>
        );
      default:
        return (
          <>
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-jobflow-text-dim mb-6">Overview</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-jobflow-card p-4 rounded-2xl border border-jobflow-border">
                  <span className="text-3xl font-black block mb-1">{jobs.length}</span>
                  <span className="text-[11px] font-bold text-jobflow-text-dim uppercase tracking-widest block">Jobs</span>
                </div>
                <div className="bg-jobflow-card p-4 rounded-2xl border border-jobflow-border">
                  <span className="text-3xl font-black block mb-1">{jobs.filter(j => j.status === 'interviews').length}</span>
                  <span className="text-[11px] font-bold text-jobflow-text-dim uppercase tracking-widest block">Interviews</span>
                </div>
              </div>
            </div>

            {pipelineCompanies.length > 0 && (
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-jobflow-text-dim mb-3 flex items-center gap-2">
                  <TrendingUp size={12} className="text-jobflow-accent" /> Your Pipeline
                </h3>
                <div className="space-y-1">
                  {companiesList.map((company, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-xl bg-jobflow-card border border-jobflow-border/50">
                      <span className="text-xs font-bold text-jobflow-text">{company.name}</span>
                      <span className="text-xs font-bold text-jobflow-text-dim">{company.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-jobflow-text-dim mb-3 flex items-center gap-2">
                <ExternalLink size={12} className="text-jobflow-accent" /> Top Companies Hiring Now
              </h3>
              <div className="space-y-0.5 max-h-72 overflow-y-auto custom-scrollbar">
                {hiringCompanies.map((company) => (
                  <a
                    key={company.name}
                    href={company.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-jobflow-card transition-all cursor-pointer group"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-semibold text-jobflow-text group-hover:text-jobflow-accent transition-all">{company.name}</span>
                      <span className="text-[10px] font-medium text-jobflow-text-dim ml-1.5">{company.role}</span>
                    </div>
                    <span className="text-[9px] font-semibold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-md shrink-0 ml-1">{company.posted}</span>
                    <ExternalLink size={10} className="text-jobflow-text-dim group-hover:text-jobflow-accent transition-all opacity-0 group-hover:opacity-100 shrink-0 ml-1" />
                  </a>
                ))}
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <aside className="w-64 bg-jobflow-sidebar border-r border-jobflow-border flex flex-col h-full overflow-y-auto custom-scrollbar p-4 shrink-0 transition-all duration-300">
      <div className="space-y-8 animate-fade-in">
        {renderContent()}
      </div>
    </aside>
  );
};

export default Sidebar;
