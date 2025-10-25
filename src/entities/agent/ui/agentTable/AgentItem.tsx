import { useState } from "react";
import type { Agent } from "../../../../shared/types/agent";
import { CardIcon } from "../../../../shared/ui/icons/CardIcon";
import { EditIcon } from "../../../../shared/ui/icons/EditIcon";

import { EyeIcon } from "../../../../shared/ui/icons/eye-icon/EyeIcon";
import styles from "./AgentTable.module.scss";

interface AgentItemProps {
  agent: Agent;
  onDelete: (id: string) => void;
  onEdit: (agent: Agent) => void;
}

export const AgentItem = ({ agent, onDelete, onEdit }: AgentItemProps) => {
  const [showToken, setShowToken] = useState(false);

  return (
    <tr className={agent.enabled ? styles.activeRow : styles.inactiveRow}>
      <td data-label="Имя">{agent.agent_name}</td>
      <td data-label="Hostname">{agent.agent_hostname}</td>
      <td data-label="Страна">
        {agent.agent_country_name} ({agent.agent_country_iso_code})
      </td>
      <td data-label="Последний хартбит">{agent.last_heartbeat || "—"}</td>
      <td data-label="Статус">
        <span
          className={`${styles.status} ${
            agent.enabled ? styles.online : styles.offline
          }`}
        >
          {agent.enabled ? "Активно" : "Неактивно"}
        </span>
      </td>
      <td data-label="Токен" className={styles.token}>
        {showToken ? agent.token : "••••••••••"}

        <EyeIcon className={styles.eye} isOpen={showToken} onClick={() => setShowToken(!showToken)} />
      </td>
      <td data-label="Действия" className={styles.actions}>
        <button className={styles.edit} onClick={() => onEdit(agent)}>
          <EditIcon color="white" width={20} height={20} />
        </button>
        <button
          className={styles.delete}
          onClick={() => onDelete(agent.a_uuid)}
        >
          <CardIcon color="white" width={20} height={20} />
        </button>
      </td>
    </tr>
  );
};
