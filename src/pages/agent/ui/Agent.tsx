import { AgentTable } from "../../../entities/agent/ui/agentTable/AgentTable";
import styles from "./Agent.module.scss";

export const Agent = () => (
  <>
    <div className={styles.bg}></div>
    <div className={styles.container}>
      <AgentTable />
    </div>
  </>
);
