import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';

const resolver = new Resolver();

// 1. Jira Issue Panel Context Resolver
resolver.define('getIssueContext', async (req) => {
  const issueKey = req.context?.extension?.issue?.key || 'PROD-402';
  
  // Real or simulated Teamwork Graph & Confluence Architectural Decision Record (ADR) cross-link
  return {
    issueKey,
    summary: 'Refactor Payment Webhook Consumer to Async SQS Pipeline',
    status: 'In Review',
    teamworkGraphNodes: [
      {
        id: 'node-goal-01',
        type: 'Goal',
        title: 'Q4 99.99% Payment Availability & Zero Checkout Timeouts',
        owner: 'Platform Team',
        status: 'On Track'
      },
      {
        id: 'node-adr-18',
        type: 'Confluence ADR',
        title: 'ADR-048: Standardize Idempotency Keys across Microservices',
        url: 'https://confluence.company.net/wiki/spaces/ARCH/pages/849201',
        author: 'Chief Architect',
        riskLevel: 'HIGH_ATTENTION'
      },
      {
        id: 'node-pr-912',
        type: 'Bitbucket PR',
        title: 'PR #912: Migrate sync HTTP webhooks to SQS FIFO',
        checksPassed: true
      }
    ],
    conflictDetections: [
      {
        severity: 'WARNING',
        message: 'This PR modifies payment payload schema without referencing ADR-048 idempotency header requirement.',
        remedy: 'Add X-Idempotency-Key validation middleware as defined in Confluence ADR-048.'
      }
    ],
    mcpServerStatus: {
      active: true,
      protocol: 'Model Context Protocol (MCP v1.0)',
      toolsExposed: ['query_teamwork_graph', 'verify_adr_compliance', 'inspect_jira_issue_impact']
    }
  };
});

// 2. Rovo Agent & Teamwork Graph Skill Handlers
export const handler = resolver.getDefinitions();

export async function teamworkGraphHandler(payload) {
  const query = payload?.query || 'Find related architecture decisions';
  return {
    success: true,
    graphTraversal: {
      query,
      nodesVisited: 14,
      connectedDocs: [
        'ADR-048: Standardize Idempotency Keys',
        'Runbook-012: Payment Gateway Circuit Breakers'
      ],
      aiConfidence: 0.96
    }
  };
}

export async function mcpServerHandler(payload) {
  // Exposes Atlassian Forge MCP Tool capability for IDE integration
  return {
    jsonrpc: '2.0',
    result: {
      tools: [
        {
          name: 'query_teamwork_graph',
          description: 'Traverses Atlassian Teamwork Graph to link Jira goals and Confluence ADRs',
          inputSchema: { type: 'object', properties: { issueId: { type: 'string' } } }
        },
        {
          name: 'verify_adr_compliance',
          description: 'Checks PR changes against team Confluence architectural decisions',
          inputSchema: { type: 'object', properties: { diffText: { type: 'string' } } }
        }
      ]
    }
  };
}
