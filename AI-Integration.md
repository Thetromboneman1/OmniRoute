# AI Integration

## Integration Scope
Primary routing layer for model/provider abstraction, policies, and failover.

## Operational Notes
- Use OpenAI-compatible endpoint abstractions when possible.
- Keep secrets in environment/config, not in repository source.
- Validate model endpoint health before enabling automated workflows.

## Risks
Complex multi-provider routing can mask endpoint drift without explicit health probes.
