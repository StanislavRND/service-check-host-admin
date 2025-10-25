export interface Agent {
  a_uuid: string;
  agent_name: string;
  agent_hostname: string;
  agent_country_name: string;
  agent_country_iso_code: string;
  last_heartbeat: string | null;
  enabled: boolean;
  token: string;
}
