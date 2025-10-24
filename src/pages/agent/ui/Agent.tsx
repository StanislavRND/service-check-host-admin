import { CardIcon } from "../../../shared/ui/icons/CardIcon";
import { EditIcon } from "../../../shared/ui/icons/EditIcon";
import { PlusIcon } from "../../../shared/ui/icons/PlusIcon";
import styles from "./Agent.module.scss";

interface AgentItem {
  id: number;
  name: string;
  location: string;
  last_seen: string;
  is_active: boolean;
}

const mockAgents: AgentItem[] = [
  {
    id: 1,
    name: "Agent Smith",
    location: "Москва, Россия",
    last_seen: "25 октября 2025, 14:32",
    is_active: true,
  },
  {
    id: 2,
    name: "Agent Johnson",
    location: "Санкт-Петербург, Россия",
    last_seen: "24 октября 2025, 20:15",
    is_active: false,
  },
  {
    id: 3,
    name: "Agent Brown",
    location: "Новосибирск, Россия",
    last_seen: "25 октября 2025, 09:50",
    is_active: true,
  },
  {
    id: 4,
    name: "Agent Brown",
    location: "Новосибирск, Россия",
    last_seen: "25 октября 2025, 09:50",
    is_active: true,
  },
];

export const Agent = () => {
  return (
    <>
      <div className={styles.bg}></div>
      <div className={styles.container}>
        <button className={styles.addBtn}>
          <PlusIcon color="rgb(230, 230, 230)" width={18} height={18} />
          Добавить агента
        </button>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>Местоположение</th>
                <th>Последняя активность</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {mockAgents.map((agent) => (
                <tr
                  key={agent.id}
                  className={agent.is_active ? styles.activeRow : styles.inactiveRow}
                >
                  <td data-label="ID">{agent.id}</td>
                  <td data-label="Имя">{agent.name}</td>
                  <td data-label="Местоположение">{agent.location}</td>
                  <td data-label="Последняя активность">{agent.last_seen}</td>
                  <td data-label="Статус">
                    <span
                      className={`${styles.status} ${
                        agent.is_active ? styles.online : styles.offline
                      }`}
                    >
                      {agent.is_active ? "Онлайн" : "Оффлайн"}
                    </span>
                  </td>
                  <td data-label="Действия" className={styles.actions}>
                    <button className={styles.edit}>
                      <EditIcon color="white" width={20} height={20} />
                    </button>
                    <button className={styles.delete}>
                      <CardIcon color="white" width={20} height={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
